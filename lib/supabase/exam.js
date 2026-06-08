// lib/supabase/exam.js
import { createClient } from "@/lib/supabase/client";

// ═══════════════════════════════════════════════════════════════
// PHASE 5 PART 1 — Existing Functions (Working!)
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────
// 1. সব Published Exams পাও (Listing Page এর জন্য)
// ─────────────────────────────────────────────────
export async function getAllExams() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("exams")
    .select(
      `
      id,
      title,
      description,
      duration_minutes,
      total_marks,
      pass_marks,
      has_negative_marking,
      negative_mark_value,
      is_free,
      is_randomized,
      max_attempts,
      category_id,
      course_id,
      created_at,
      categories (
        id,
        name
      )
    `
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Exams fetch error:", error);
    return { exams: [], error: error.message };
  }

  return { exams: data || [], error: null };
}

// ─────────────────────────────────────────────────
// 2. একটা Exam এর Full Details (Details Page)
// ─────────────────────────────────────────────────
export async function getExamById(examId) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("exams")
    .select(
      `
      id,
      title,
      description,
      duration_minutes,
      total_marks,
      pass_marks,
      has_negative_marking,
      negative_mark_value,
      is_free,
      is_randomized,
      max_attempts,
      category_id,
      course_id,
      categories (id, name),
      courses (id, title)
    `
    )
    .eq("id", examId)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Exam detail error:", error);
    return { exam: null, error: error.message };
  }

  return { exam: data, error: null };
}

// ─────────────────────────────────────────────────
// 3. Exam এর Questions + Options (Exam Start)
// ─────────────────────────────────────────────────
export async function getExamQuestions(examId) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("questions")
    .select(
      `
      id,
      question_text,
      explanation,
      marks,
      difficulty,
      order_number,
      image_url,
      options (
        id,
        option_text,
        is_correct,
        order_number
      )
    `
    )
    .eq("exam_id", examId)
    .order("order_number", { ascending: true });

  if (error) {
    console.error("Questions fetch error:", error);
    return { questions: [], error: error.message };
  }

  // Options গুলো order অনুযায়ী Sort করো
  const questions = (data || []).map((q) => ({
    ...q,
    options: (q.options || []).sort((a, b) => a.order_number - b.order_number),
  }));

  return { questions, error: null };
}

// ─────────────────────────────────────────────────
// 4. Question Count পাও (Exam Card এ দেখানোর জন্য)
// ─────────────────────────────────────────────────
export async function getExamQuestionCount(examId) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId);

  if (error) return 0;
  return count || 0;
}

// ─────────────────────────────────────────────────
// 5. User এর Previous Attempts (Details Page)
// ─────────────────────────────────────────────────
export async function getUserAttemptsForExam(userId, examId) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("attempts")
    .select("id, score, total_marks, is_passed, time_taken_seconds, completed_at, status")
    .eq("user_id", userId)
    .eq("exam_id", examId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Attempts fetch error:", error);
    return { attempts: [], error: error.message };
  }

  return { attempts: data || [], error: null };
}

// ─────────────────────────────────────────────────
// 6. সব Categories পাও (Filter এর জন্য)
// ─────────────────────────────────────────────────
export async function getAllCategories() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("id", { ascending: true });

  if (error) {
    console.error("Categories fetch error:", error);
    return { categories: [], error: error.message };
  }

  return { categories: data || [], error: null };
}

// ═══════════════════════════════════════════════════════════════
// 🆕 PHASE 5 PART 2 — Exam Interface Functions (New!)
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────
// 7. 🆕 Create Attempt (Exam Start করার সময়)
//    → DB তে নতুন Attempt Record তৈরি করে
//    → status: "in_progress"
// ─────────────────────────────────────────────────
export async function createAttempt(userId, examId) {
  const supabase = createClient();

  console.log("📝 createAttempt called:", { userId, examId });

  const { data, error } = await supabase
    .from("attempts")
    .insert({
      user_id: userId,
      exam_id: examId,
      status: "in_progress",
      started_at: new Date().toISOString(),
      score: 0,
      correct_count: 0,
      wrong_count: 0,
      skipped_count: 0,
      is_passed: false,
    })
    .select()
    .single();

  if (error) {
    console.error("❌ createAttempt error:", error);
    return { attempt: null, error: error.message };
  }

  console.log("✅ Attempt created with ID:", data.id);
  return { attempt: data, error: null };
}

// ─────────────────────────────────────────────────
// 8. 🆕 Calculate Score (Pure JS Function)
//    → Negative Marking সহ Score হিসাব করে
//    → Database Touch করে না!
// ─────────────────────────────────────────────────
export function calculateScore(questions, selectedAnswers, exam) {
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;
  let totalScore = 0;

  const answerDetails = [];

  questions.forEach((question) => {
    const selectedOptionId = selectedAnswers[question.id];
    const correctOption = question.options.find((opt) => opt.is_correct);
    const marksForQ = Number(question.marks) || 1;

    if (!selectedOptionId) {
      // 🟡 Skipped — কোনো Penalty নেই
      skippedCount++;
      answerDetails.push({
        question_id: question.id,
        selected_option_id: null,
        is_correct: false,
        marks_obtained: 0,
      });
    } else if (selectedOptionId === correctOption?.id) {
      // ✅ Correct — Full Marks
      correctCount++;
      totalScore += marksForQ;
      answerDetails.push({
        question_id: question.id,
        selected_option_id: selectedOptionId,
        is_correct: true,
        marks_obtained: marksForQ,
      });
    } else {
      // ❌ Wrong — Negative Marking যদি থাকে
      wrongCount++;
      let negativeMark = 0;
      if (exam.has_negative_marking) {
        negativeMark = Number(exam.negative_mark_value) || 0.5;
        totalScore -= negativeMark;
      }
      answerDetails.push({
        question_id: question.id,
        selected_option_id: selectedOptionId,
        is_correct: false,
        marks_obtained: -negativeMark,
      });
    }
  });

  // Score কখনো 0 এর নিচে যাবে না
  totalScore = Math.max(0, totalScore);

  return {
    score: Math.round(totalScore * 100) / 100, // 2 decimal places
    correctCount,
    wrongCount,
    skippedCount,
    answerDetails,
  };
}

// ─────────────────────────────────────────────────
// 9. 🆕 Submit Exam Attempt (Final Save)
//    → Attempt Update + Answers Save
// ─────────────────────────────────────────────────
export async function submitExamAttempt(
  attemptId,
  userId,
  questions,
  selectedAnswers,
  exam,
  timeTakenSeconds
) {
  const supabase = createClient();

  console.log("📤 submitExamAttempt called:", { attemptId, examId: exam.id });

  // Step 1: Score Calculate করো
  const { score, correctCount, wrongCount, skippedCount, answerDetails } = calculateScore(
    questions,
    selectedAnswers,
    exam
  );

  const isPassed = score >= Number(exam.pass_marks || 0);

  console.log("📊 Calculated:", {
    score,
    correctCount,
    wrongCount,
    skippedCount,
    isPassed,
  });

  // Step 2: Attempt Update করো
  const { error: attemptError } = await supabase
    .from("attempts")
    .update({
      status: "completed",
      score: score,
      total_marks: exam.total_marks || 0,
      correct_count: correctCount,
      wrong_count: wrongCount,
      skipped_count: skippedCount,
      is_passed: isPassed,
      completed_at: new Date().toISOString(),
      time_taken_seconds: timeTakenSeconds,
    })
    .eq("id", attemptId)
    .eq("user_id", userId);

  if (attemptError) {
    console.error("❌ Attempt update error:", attemptError);
    return { success: false, error: attemptError.message };
  }

  // Step 3: Answers Save করো (Batch Insert)
  if (answerDetails.length > 0) {
    const answersToInsert = answerDetails.map((ans) => ({
      attempt_id: attemptId,
      question_id: ans.question_id,
      selected_option_id: ans.selected_option_id,
      is_correct: ans.is_correct,
      marks_obtained: ans.marks_obtained,
    }));

    const { error: answersError } = await supabase.from("answers").insert(answersToInsert);

    if (answersError) {
      console.error("⚠️ Answers save error:", answersError);
      // Attempt already saved — Result দেখানো যাবে
    } else {
      console.log("✅ All answers saved:", answersToInsert.length);
    }
  }

  console.log("🎉 Exam submitted successfully!");
  return { success: true, score, isPassed, error: null };
}

// ─────────────────────────────────────────────────
// 10. 🆕 Get Attempt Result (Result Page এর জন্য)
//     → Attempt + Exam + Answers + Questions Fetch
// ─────────────────────────────────────────────────
export async function getAttemptResult(attemptId, userId) {
  const supabase = createClient();

  console.log("🔍 getAttemptResult:", { attemptId, userId });

  // Attempt Fetch
  const { data: attempt, error: aError } = await supabase
    .from("attempts")
    .select("*")
    .eq("id", attemptId)
    .eq("user_id", userId)
    .maybeSingle();

  if (aError || !attempt) {
    console.error("❌ Attempt not found:", aError);
    return {
      result: null,
      error: aError?.message || "Result not found",
    };
  }

  // Exam Info Fetch
  const { data: exam } = await supabase
    .from("exams")
    .select("*")
    .eq("id", attempt.exam_id)
    .maybeSingle();

  // Answers Fetch
  const { data: answers } = await supabase.from("answers").select("*").eq("attempt_id", attemptId);

  // Questions + Options Fetch (Answer Review এর জন্য)
  const { questions } = await getExamQuestions(attempt.exam_id);

  console.log("✅ Result loaded:", {
    score: attempt.score,
    answers: answers?.length || 0,
    questions: questions?.length || 0,
  });

  return {
    result: {
      attempt,
      exam,
      answers: answers || [],
      questions: questions || [],
    },
    error: null,
  };
}

// ─────────────────────────────────────────────────
// 11. 🆕 Check Attempt Limit
//     → Max Attempts Reached কিনা Check করে
// ─────────────────────────────────────────────────
export async function checkAttemptLimit(userId, examId, maxAttempts) {
  if (!maxAttempts) {
    return {
      canAttempt: true,
      attemptsUsed: 0,
      attemptsLeft: Infinity,
    };
  }

  const { attempts } = await getUserAttemptsForExam(userId, examId);
  const completedAttempts = attempts.filter((a) => a.status === "completed").length;

  return {
    canAttempt: completedAttempts < maxAttempts,
    attemptsUsed: completedAttempts,
    attemptsLeft: maxAttempts - completedAttempts,
  };
}
