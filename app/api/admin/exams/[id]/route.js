import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════
// PUT — Update exam
// ════════════════════════════════════════════════════════════
export async function PUT(request, { params }) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "লগইন প্রয়োজন!" }, { status: 401 });
    }

    // 2. Admin check
    const { data: isAdmin } = await supabase.rpc("is_admin");

    if (!isAdmin) {
      return NextResponse.json({ error: "অ্যাডমিন অনুমতি প্রয়োজন!" }, { status: 403 });
    }

    // 3. Get body
    const body = await request.json();

    // 4. Basic validation
    if (!body.title || body.title.trim().length < 3) {
      return NextResponse.json(
        { error: "পরীক্ষার নাম কমপক্ষে ৩ অক্ষরের হতে হবে!" },
        { status: 400 }
      );
    }

    if (!body.slug || body.slug.trim().length < 3) {
      return NextResponse.json({ error: "Slug কমপক্ষে ৩ অক্ষরের হতে হবে!" }, { status: 400 });
    }

    if (!body.category_id) {
      return NextResponse.json({ error: "ক্যাটাগরি নির্বাচন করুন!" }, { status: 400 });
    }

    // 5. Check exam exists
    const { data: currentExam, error: fetchError } = await supabase
      .from("exams")
      .select("id, slug, status")
      .eq("id", id)
      .single();

    if (fetchError || !currentExam) {
      return NextResponse.json({ error: "পরীক্ষা পাওয়া যায়নি!" }, { status: 404 });
    }

    // 6. Check slug uniqueness (only if changed)
    if (body.slug !== currentExam.slug) {
      const { data: existing } = await supabase
        .from("exams")
        .select("id")
        .eq("slug", body.slug)
        .neq("id", id)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ error: "এই Slug ইতিমধ্যে ব্যবহার হয়েছে!" }, { status: 400 });
      }
    }

    // 7. Prepare update data
    const updateData = {
      title: body.title.trim(),
      slug: body.slug.trim(),
      description: body.description?.trim() || null,
      category_id: parseInt(body.category_id),
      course_id: body.course_id ? parseInt(body.course_id) : null,
      thumbnail_url: body.thumbnail_url?.trim() || null,
      instructions: body.instructions?.trim() || null,

      // Settings
      duration_minutes: parseInt(body.duration_minutes) || 60,
      total_questions: parseInt(body.total_questions) || 0,
      total_marks: parseInt(body.total_marks) || 0,
      passing_marks: parseInt(body.passing_marks) || 0,
      has_negative_marking: body.has_negative_marking || false,
      negative_marking: parseFloat(body.negative_marking) || 0,
      is_randomized: body.is_randomized || false,
      max_attempts: body.max_attempts ? parseInt(body.max_attempts) : null,

      // Type & Display
      exam_type: body.exam_type || "free",
      status: body.status || "draft",
      is_featured: body.is_featured || false,
      is_popular: body.is_popular || false,
      display_order: parseInt(body.display_order) || 0,

      updated_at: new Date().toISOString(),
    };

    // 8. Handle status transitions (timestamps)
    if (updateData.status === "active" && currentExam.status !== "active") {
      updateData.published_at = new Date().toISOString();
      updateData.archived_at = null;
    }
    if (updateData.status === "archived" && currentExam.status !== "archived") {
      updateData.archived_at = new Date().toISOString();
    }

    // 9. Update
    const { data, error } = await supabase
      .from("exams")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("PUT exam error:", error);
      return NextResponse.json({ error: "পরীক্ষা আপডেট করতে সমস্যা হয়েছে!" }, { status: 500 });
    }

    return NextResponse.json({
      exam: data,
      message: "পরীক্ষা সফলভাবে আপডেট হয়েছে! ✅",
    });
  } catch (err) {
    console.error("PUT exam catch:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি!" }, { status: 500 });
  }
}

// ════════════════════════════════════════════════════════════
// DELETE — Safe delete (block if attempts/questions exist)
// ════════════════════════════════════════════════════════════
export async function DELETE(request, { params }) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "লগইন প্রয়োজন!" }, { status: 401 });
    }

    // 2. Admin check
    const { data: isAdmin } = await supabase.rpc("is_admin");

    if (!isAdmin) {
      return NextResponse.json({ error: "অ্যাডমিন অনুমতি প্রয়োজন!" }, { status: 403 });
    }

    // 3. Check if exam exists
    const { data: exam, error: fetchError } = await supabase
      .from("exams")
      .select("id, title")
      .eq("id", id)
      .single();

    if (fetchError || !exam) {
      return NextResponse.json({ error: "পরীক্ষা পাওয়া যায়নি!" }, { status: 404 });
    }

    // 4. SAFETY CHECK 1 — Block if attempts exist
    const { count: attemptCount, error: attemptError } = await supabase
      .from("attempts")
      .select("*", { count: "exact", head: true })
      .eq("exam_id", id);

    if (attemptError) {
      console.error("Attempts check error:", attemptError);
    }

    if (attemptCount && attemptCount > 0) {
      return NextResponse.json(
        {
          error: `এই পরীক্ষায় ${attemptCount}টি অংশগ্রহণ আছে! Delete করা যাবে না। Archive করুন।`,
        },
        { status: 400 }
      );
    }

    // 5. SAFETY CHECK 2 — Block if questions linked
    const { count: questionCount, error: questionError } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true })
      .eq("exam_id", id);

    if (questionError) {
      console.error("Questions check error:", questionError);
    }

    if (questionCount && questionCount > 0) {
      return NextResponse.json(
        {
          error: `এই পরীক্ষায় ${questionCount}টি প্রশ্ন আছে! আগে প্রশ্ন ডিলিট করুন।`,
        },
        { status: 400 }
      );
    }

    // 6. Safe to delete
    const { error: deleteError } = await supabase.from("exams").delete().eq("id", id);

    if (deleteError) {
      console.error("DELETE exam error:", deleteError);
      return NextResponse.json({ error: "পরীক্ষা ডিলিট করতে সমস্যা হয়েছে!" }, { status: 500 });
    }

    return NextResponse.json({
      message: `"${exam.title}" সফলভাবে ডিলিট হয়েছে! ✅`,
    });
  } catch (err) {
    console.error("DELETE exam catch:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি!" }, { status: 500 });
  }
}
