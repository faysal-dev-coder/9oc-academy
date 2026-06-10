// lib/supabase/exam.js
import { createClient } from "@/lib/supabase/client";

// ═══════════════════════════════════════════════════════════════
// Helper: Error Formatter (Empty object error fix)
// ═══════════════════════════════════════════════════════════════
function formatError(error, context = "") {
  if (!error) return "Unknown error";

  // Empty object check
  if (typeof error === "object" && Object.keys(error).length === 0) {
    return `${context}: Permission denied (RLS Policy might be missing)`;
  }

  // Standard error message
  return error.message || error.hint || JSON.stringify(error) || "Unknown error";
}

// ═══════════════════════════════════════════════════════════════
// PHASE 5 PART 1 — Existing Functions
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
    console.error("❌ Exams fetch error:", formatError(error, "getAllExams"));
    return { exams: [], error: formatError(error, "getAllExams") };
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
    console.error("❌ Exam detail error:", formatError(error, "getExamById"));
    return { exam: null, error: formatError(error, "getExamById") };
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
    console.error("❌ Questions fetch error:", formatError(error, "getExamQuestions"));
    return { questions: [], error: formatError(error, "getExamQuestions") };
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
  if (!userId || !examId) {
    return { attempts: [], error: null };
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("attempts")
    .select(
      "id, score, total_marks, is_passed, time_taken_seconds, completed_at, started_at, status"
    )
    .eq("user_id", userId)
    .eq("exam_id", examId)
    .order("started_at", { ascending: false })
    .limit(5);

  if (error) {
    const errMsg = formatError(error, "getUserAttemptsForExam");
    console.error("❌ Attempts fetch error:", errMsg);
    return { attempts: [], error: errMsg };
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
    console.error("❌ Categories fetch error:", formatError(error, "getAllCategories"));
    return { categories: [], error: formatError(error, "getAllCategories") };
  }

  return { categories: data || [], error: null };
}

// ═══════════════════════════════════════════════════════════════
// PHASE 5 PART 2 — Exam Interface Functions
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────
// 7. Create Attempt (Exam Start করার সময়)
// ─────────────────────────────────────────────────
export async function createAttempt(userId, examId) {
  const supabase = createClient();

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
    const errMsg = formatError(error, "createAttempt");
    console.error("❌ createAttempt error:", errMsg);
    return { attempt: null, error: errMsg };
  }

  return { attempt: data, error: null };
}

// ─────────────────────────────────────────────────
// 8. Calculate Score (Pure JS Function)
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
      // Skipped — কোনো Penalty নেই
      skippedCount++;
      answerDetails.push({
        question_id: question.id,
        selected_option_id: null,
        is_correct: false,
        marks_obtained: 0,
      });
    } else if (selectedOptionId === correctOption?.id) {
      // Correct — Full Marks
      correctCount++;
      totalScore += marksForQ;
      answerDetails.push({
        question_id: question.id,
        selected_option_id: selectedOptionId,
        is_correct: true,
        marks_obtained: marksForQ,
      });
    } else {
      // Wrong — Negative Marking যদি থাকে
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
    score: Math.round(totalScore * 100) / 100,
    correctCount,
    wrongCount,
    skippedCount,
    answerDetails,
  };
}

// ─────────────────────────────────────────────────
// 9. Submit Exam Attempt (Final Save)
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

  // Step 1: Score Calculate করো
  const { score, correctCount, wrongCount, skippedCount, answerDetails } = calculateScore(
    questions,
    selectedAnswers,
    exam
  );

  const isPassed = score >= Number(exam.pass_marks || 0);

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
    const errMsg = formatError(attemptError, "submitExamAttempt");
    console.error("❌ Attempt update error:", errMsg);
    return { success: false, error: errMsg };
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
      console.error("⚠️ Answers save error:", formatError(answersError, "submitExamAttempt"));
      // Attempt already saved — Result দেখানো যাবে
    }
  }

  return { success: true, score, isPassed, error: null };
}

// ─────────────────────────────────────────────────
// 10. Get Attempt Result (Result Page এর জন্য)
// ─────────────────────────────────────────────────
export async function getAttemptResult(attemptId, userId) {
  const supabase = createClient();

  // Attempt Fetch
  const { data: attempt, error: aError } = await supabase
    .from("attempts")
    .select("*")
    .eq("id", attemptId)
    .eq("user_id", userId)
    .maybeSingle();

  if (aError || !attempt) {
    const errMsg = formatError(aError, "getAttemptResult") || "Result not found";
    console.error("❌ Attempt not found:", errMsg);
    return {
      result: null,
      error: errMsg,
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
// 11. Check Attempt Limit
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
