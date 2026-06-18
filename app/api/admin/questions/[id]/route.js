import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════
// PUT — Update question + replace options
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

    // 4. Validation
    if (!body.question_text || body.question_text.trim().length < 5) {
      return NextResponse.json({ error: "প্রশ্ন কমপক্ষে ৫ অক্ষরের হতে হবে!" }, { status: 400 });
    }

    if (!body.exam_id) {
      return NextResponse.json({ error: "পরীক্ষা নির্বাচন করুন!" }, { status: 400 });
    }

    if (!Array.isArray(body.options) || body.options.length < 2) {
      return NextResponse.json({ error: "কমপক্ষে ২টি অপশন দিতে হবে!" }, { status: 400 });
    }

    const emptyOption = body.options.find((opt) => !opt.option_text?.trim());
    if (emptyOption) {
      return NextResponse.json({ error: "সব অপশন পূরণ করুন!" }, { status: 400 });
    }

    const correctCount = body.options.filter((opt) => opt.is_correct).length;
    if (correctCount !== 1) {
      return NextResponse.json({ error: "ঠিক ১টি সঠিক উত্তর নির্বাচন করুন!" }, { status: 400 });
    }

    // 5. Check question exists
    const { data: existing, error: fetchError } = await supabase
      .from("questions")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: "প্রশ্ন পাওয়া যায়নি!" }, { status: 404 });
    }

    // 6. Update question
    const updateData = {
      exam_id: parseInt(body.exam_id),
      question_text: body.question_text.trim(),
      explanation: body.explanation?.trim() || null,
      marks: parseFloat(body.marks) || 1,
      difficulty: body.difficulty || "medium",
      order_number: parseInt(body.order_number) || 0,
      image_url: body.image_url?.trim() || null,
    };

    const { data: question, error: qError } = await supabase
      .from("questions")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (qError) {
      console.error("PUT question error:", qError);
      return NextResponse.json({ error: "প্রশ্ন আপডেট করতে সমস্যা হয়েছে!" }, { status: 500 });
    }

    // 7. Delete old options
    const { error: delError } = await supabase.from("options").delete().eq("question_id", id);

    if (delError) {
      console.error("DELETE old options error:", delError);
      return NextResponse.json({ error: "পুরাতন অপশন মুছতে সমস্যা!" }, { status: 500 });
    }

    // 8. Insert new options
    const optionsData = body.options.map((opt, idx) => ({
      question_id: parseInt(id),
      option_text: opt.option_text.trim(),
      is_correct: opt.is_correct || false,
      order_number: idx + 1,
    }));

    const { data: options, error: oError } = await supabase
      .from("options")
      .insert(optionsData)
      .select();

    if (oError) {
      console.error("INSERT new options error:", oError);
      return NextResponse.json({ error: "অপশন সংরক্ষণে সমস্যা!" }, { status: 500 });
    }

    return NextResponse.json({
      question: { ...question, options },
      message: "প্রশ্ন সফলভাবে আপডেট হয়েছে! ✅",
    });
  } catch (err) {
    console.error("PUT question catch:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি!" }, { status: 500 });
  }
}

// ════════════════════════════════════════════════════════════
// DELETE — Delete question (options CASCADE auto delete!)
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

    // 3. Check question exists
    const { data: question, error: fetchError } = await supabase
      .from("questions")
      .select("id, question_text")
      .eq("id", id)
      .single();

    if (fetchError || !question) {
      return NextResponse.json({ error: "প্রশ্ন পাওয়া যায়নি!" }, { status: 404 });
    }

    // 4. Delete (options auto deleted via CASCADE!)
    const { error: deleteError } = await supabase.from("questions").delete().eq("id", id);

    if (deleteError) {
      console.error("DELETE question error:", deleteError);
      return NextResponse.json({ error: "প্রশ্ন ডিলিট করতে সমস্যা হয়েছে!" }, { status: 500 });
    }

    return NextResponse.json({
      message: "প্রশ্ন সফলভাবে ডিলিট হয়েছে! ✅",
    });
  } catch (err) {
    console.error("DELETE question catch:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি!" }, { status: 500 });
  }
}
