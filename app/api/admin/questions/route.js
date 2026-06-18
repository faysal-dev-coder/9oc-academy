import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════
// GET — List all questions with filters
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
    const examId = searchParams.get("exam_id");
    const difficulty = searchParams.get("difficulty");

    // 4. Build query — include exam + options
    let query = supabase
      .from("questions")
      .select(
        `
        *,
        exams!questions_exam_id_fkey (id, title),
        options (id, option_text, is_correct, order_number)
        `
      )
      .order("created_at", { ascending: false });

    // 5. Apply filters
    if (search) {
      query = query.ilike("question_text", `%${search}%`);
    }
    if (examId && examId !== "all") {
      query = query.eq("exam_id", examId);
    }
    if (difficulty && difficulty !== "all") {
      query = query.eq("difficulty", difficulty);
    }

    const { data, error } = await query;

    if (error) {
      console.error("GET questions error:", error);
      return NextResponse.json({ error: "প্রশ্ন লোড করতে সমস্যা হয়েছে!" }, { status: 500 });
    }

    return NextResponse.json({ questions: data || [] });
  } catch (err) {
    console.error("GET questions catch:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি!" }, { status: 500 });
  }
}

// ════════════════════════════════════════════════════════════
// POST — Create new question + 4 options (atomic!)
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

    // Check all options have text
    const emptyOption = body.options.find((opt) => !opt.option_text?.trim());
    if (emptyOption) {
      return NextResponse.json({ error: "সব অপশন পূরণ করুন!" }, { status: 400 });
    }

    // Check exactly one correct answer
    const correctCount = body.options.filter((opt) => opt.is_correct).length;
    if (correctCount !== 1) {
      return NextResponse.json({ error: "ঠিক ১টি সঠিক উত্তর নির্বাচন করুন!" }, { status: 400 });
    }

    // 5. Insert question first
    const questionData = {
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
      .insert(questionData)
      .select()
      .single();

    if (qError) {
      console.error("POST question error:", qError);
      return NextResponse.json({ error: "প্রশ্ন তৈরি করতে সমস্যা হয়েছে!" }, { status: 500 });
    }

    // 6. Insert options for this question
    const optionsData = body.options.map((opt, idx) => ({
      question_id: question.id,
      option_text: opt.option_text.trim(),
      is_correct: opt.is_correct || false,
      order_number: idx + 1,
    }));

    const { data: options, error: oError } = await supabase
      .from("options")
      .insert(optionsData)
      .select();

    if (oError) {
      // ROLLBACK — delete the question we just created
      console.error("POST options error:", oError);
      await supabase.from("questions").delete().eq("id", question.id);
      return NextResponse.json(
        { error: "অপশন সংরক্ষণে সমস্যা! প্রশ্ন বাতিল করা হলো।" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        question: { ...question, options },
        message: "প্রশ্ন সফলভাবে তৈরি হয়েছে! ✅",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST question catch:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি!" }, { status: 500 });
  }
}
