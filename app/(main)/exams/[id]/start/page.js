"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

import ExamInterface from "@/components/exam/ExamInterface";
import {
  getExamById,
  getExamQuestions,
  createAttempt,
  submitExamAttempt,
  checkAttemptLimit,
} from "@/lib/supabase/exam";

// ═══════════════════════════════════════════════════════════
// Loading Screen Component
// ═══════════════════════════════════════════════════════════
function LoadingScreen({ message }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div
          className="w-14 h-14 border-4 border-blue-500/30 border-t-blue-500
                        rounded-full animate-spin mx-auto mb-4"
        />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Error Screen Component
// ═══════════════════════════════════════════════════════════
function ErrorScreen({ message, onBack, backLabel = "ফিরে যান" }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">সমস্যা হয়েছে</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white
                     rounded-xl font-medium transition-colors"
        >
          {backLabel}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function ExamStartPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const examId = params.id;

  // ══ STATE ═══════════════════════════════════════════════
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // একবারই init হবে (StrictMode double-call avoid)
  const initDoneRef = useRef(false);

  // ══ EXAM INITIALIZATION ═════════════════════════════════
  const initExam = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Step 1: Exam Details Fetch
      const { exam: examData, error: examErr } = await getExamById(examId);

      if (examErr) {
        throw new Error("পরীক্ষার তথ্য লোড করা যায়নি: " + examErr);
      }
      if (!examData) {
        throw new Error("পরীক্ষা পাওয়া যায়নি।");
      }
      setExam(examData);

      // Step 2: Attempt Limit Check
      const { canAttempt } = await checkAttemptLimit(user.id, examId, examData.max_attempts);

      if (!canAttempt) {
        throw new Error(`সর্বোচ্চ ${examData.max_attempts} বার পরীক্ষা দিয়েছেন। আর সুযোগ নেই।`);
      }

      // Step 3: Questions Fetch
      const { questions: questionsData, error: qErr } = await getExamQuestions(examId);

      if (qErr) {
        throw new Error("প্রশ্ন লোড করা যায়নি: " + qErr);
      }
      if (!questionsData || questionsData.length === 0) {
        throw new Error("এই পরীক্ষায় কোনো প্রশ্ন নেই।");
      }
      setQuestions(questionsData);

      // Step 4: Create Attempt
      const { attempt, error: attemptErr } = await createAttempt(user.id, examId);

      if (attemptErr) {
        throw new Error("পরীক্ষা শুরু করতে সমস্যা হয়েছে: " + attemptErr);
      }
      if (!attempt) {
        throw new Error("Attempt তৈরি হয়নি।");
      }

      setAttemptId(attempt.id);
      setStartedAt(attempt.started_at);
    } catch (err) {
      console.error("❌ initExam error:", err);
      setError(err.message || "অপ্রত্যাশিত সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }, [user, examId]);

  // ══ INIT EFFECT ═════════════════════════════════════════
  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      router.replace(`/exams/${examId}?login=required`);
      return;
    }

    if (initDoneRef.current) return;
    initDoneRef.current = true;

    initExam();
  }, [user, userLoading, examId, router, initExam]);

  // ══ SUBMIT HANDLER ══════════════════════════════════════
  const handleSubmit = useCallback(
    async (selectedAnswers, timeTakenSeconds) => {
      const { success, error: submitErr } = await submitExamAttempt(
        attemptId,
        user.id,
        questions,
        selectedAnswers,
        exam,
        timeTakenSeconds
      );

      if (!success) {
        console.error("❌ Submit failed:", submitErr);
        throw new Error("জমা দিতে সমস্যা হয়েছে: " + submitErr);
      }

      return { attemptId };
    },
    [attemptId, user, questions, exam]
  );

  // ══ RENDER STATES ═══════════════════════════════════════
  if (userLoading) {
    return <LoadingScreen message="ব্যবহারকারী যাচাই করা হচ্ছে..." />;
  }

  if (loading) {
    return <LoadingScreen message="পরীক্ষা প্রস্তুত করা হচ্ছে..." />;
  }

  if (error) {
    return (
      <ErrorScreen
        message={error}
        onBack={() => router.push(`/exams/${examId}`)}
        backLabel="পরীক্ষার পাতায় ফিরে যান"
      />
    );
  }

  if (!exam || !attemptId || questions.length === 0) {
    return (
      <ErrorScreen
        message="পরীক্ষার তথ্য পাওয়া যায়নি।"
        onBack={() => router.push(`/exams/${examId}`)}
      />
    );
  }

  return (
    <ExamInterface
      exam={exam}
      questions={questions}
      attemptId={attemptId}
      startedAt={startedAt}
      onSubmit={handleSubmit}
    />
  );
}
