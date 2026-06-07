// lib/supabase/exam.js
import { createClient } from "@/lib/supabase/client";

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
    .eq("status", "completed")
    .order("completed_at", { ascending: false })
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
