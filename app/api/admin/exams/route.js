import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════
// GET — List all exams with filters
// ════════════════════════════════════════════════════════════
export async function GET(request) {
  try {
    const supabase = await createClient();

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

    // 3. Parse query filters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("category_id");
    const courseId = searchParams.get("course_id");
    const status = searchParams.get("status");
    const examType = searchParams.get("exam_type");

    // 4. Build query
    let query = supabase
      .from("exams")
      .select(
        `
        *,
        categories!exams_category_id_fkey (id, name),
        courses!exams_course_id_fkey (id, title)
        `
      )
      .order("created_at", { ascending: false });

    // 5. Apply filters
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }
    if (categoryId && categoryId !== "all") {
      query = query.eq("category_id", categoryId);
    }
    if (courseId && courseId !== "all") {
      if (courseId === "none") {
        query = query.is("course_id", null);
      } else {
        query = query.eq("course_id", courseId);
      }
    }
    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (examType && examType !== "all") {
      query = query.eq("exam_type", examType);
    }

    const { data, error } = await query;

    if (error) {
      console.error("GET exams error:", error);
      return NextResponse.json({ error: "পরীক্ষা লোড করতে সমস্যা হয়েছে!" }, { status: 500 });
    }

    return NextResponse.json({ exams: data || [] });
  } catch (err) {
    console.error("GET exams catch:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি!" }, { status: 500 });
  }
}

// ════════════════════════════════════════════════════════════
// POST — Create new exam
// ════════════════════════════════════════════════════════════
export async function POST(request) {
  try {
    const supabase = await createClient();

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

    // 5. Check slug uniqueness
    const { data: existing } = await supabase
      .from("exams")
      .select("id")
      .eq("slug", body.slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "এই Slug ইতিমধ্যে ব্যবহার হয়েছে!" }, { status: 400 });
    }

    // 6. Prepare insert data
    const insertData = {
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

      // Audit
      created_by: user.id,
    };

    // 7. Set published_at if status is active
    if (insertData.status === "active") {
      insertData.published_at = new Date().toISOString();
    }

    // 8. Insert
    const { data, error } = await supabase.from("exams").insert(insertData).select().single();

    if (error) {
      console.error("POST exam error:", error);
      return NextResponse.json({ error: "পরীক্ষা তৈরি করতে সমস্যা হয়েছে!" }, { status: 500 });
    }

    return NextResponse.json(
      {
        exam: data,
        message: "পরীক্ষা সফলভাবে তৈরি হয়েছে! ✅",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST exam catch:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি!" }, { status: 500 });
  }
}
