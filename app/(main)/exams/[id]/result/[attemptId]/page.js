"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { getAttemptResult } from "@/lib/supabase/exam";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaRedo,
  FaList,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp,
  FaClock,
} from "react-icons/fa";

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════

const toBanglaNumber = (num) => {
  if (num === null || num === undefined || num === "" || isNaN(num)) {
    return "০";
  }

  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const numStr = String(Math.round(Number(num) * 100) / 100);

  return numStr
    .split("")
    .map((d) => {
      const digit = parseInt(d);
      return isNaN(digit) ? d : banglaDigits[digit];
    })
    .join("");
};

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "০ সেকেন্ড";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${toBanglaNumber(secs)} সেকেন্ড`;
  return `${toBanglaNumber(mins)} মিনিট ${toBanglaNumber(secs)} সেকেন্ড`;
};

const BANGLA_LETTERS = ["ক", "খ", "গ", "ঘ", "ঙ"];

// ═══════════════════════════════════════════════════════════
// Score Circle Component
// ═══════════════════════════════════════════════════════════
function ScoreCircle({ score, totalMarks, isPassed }) {
  const safeScore = Number(score) || 0;
  const safeTotal = Number(totalMarks) || 0;
  const percentage = safeTotal > 0 ? Math.round((safeScore / safeTotal) * 100) : 0;

  return (
    <div
      className={`
        w-36 h-36 rounded-full flex flex-col items-center justify-center
        border-4 mx-auto bg-white shadow-xl
        ${isPassed ? "border-green-400" : "border-red-400"}
      `}
    >
      <span className={`text-3xl font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
        {toBanglaNumber(safeScore)}
      </span>
      <span className="text-sm text-[#64748B]">/ {toBanglaNumber(safeTotal)}</span>
      <span className={`text-lg font-bold mt-1 ${isPassed ? "text-green-600" : "text-red-600"}`}>
        {toBanglaNumber(percentage)}%
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Question Review Item Component
// ═══════════════════════════════════════════════════════════
function QuestionReviewItem({ question, answer, index }) {
  const [showExplanation, setShowExplanation] = useState(false);

  const selectedOptionId = answer?.selected_option_id;
  const isCorrect = answer?.is_correct;
  const isSkipped = !selectedOptionId;

  // 🎨 Card Border & Background — 3 STATES
  let borderColor = "border-[#E2E8F0]";
  let bgColor = "bg-white";

  if (isCorrect) {
    // ✅ Correct Answer
    borderColor = "border-green-300";
    bgColor = "bg-green-50/30";
  } else if (isSkipped) {
    // ⚠️ Skipped — AMBER WARNING!
    borderColor = "border-amber-300";
    bgColor = "bg-amber-50/40";
  } else {
    // ❌ Wrong Answer
    borderColor = "border-red-300";
    bgColor = "bg-red-50/30";
  }

  return (
    <div className={`rounded-2xl border-2 overflow-hidden shadow-sm ${borderColor} ${bgColor}`}>
      {/* ── Header ─────────────────────────────────────── */}
      <div className="px-4 py-3 flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {isCorrect ? (
            <FaCheckCircle className="text-green-500 text-lg" />
          ) : isSkipped ? (
            // ⚠️ Warning icon for skipped
            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-sm shadow-amber-500/30">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          ) : (
            <FaTimesCircle className="text-red-500 text-lg" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-medium text-[#64748B]">
              প্রশ্ন {toBanglaNumber(index + 1)}
            </span>
            {/* 🟡 Skip Badge */}
            {isSkipped && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold border border-amber-200">
                উত্তর দেওয়া হয়নি
              </span>
            )}
          </div>
          <p className="text-[#1F2937] font-medium text-sm leading-relaxed">
            {question.question_text}
          </p>
        </div>
      </div>

      {/* ── Options ─────────────────────────────────────── */}
      <div className="px-4 pb-3 flex flex-col gap-1.5">
        {question.options?.map((opt, idx) => {
          const letter = BANGLA_LETTERS[idx] || String(idx + 1);
          const isSelected = opt.id === selectedOptionId;
          const isCorrectOpt = opt.is_correct;

          // 🎨 Option Styling — Default
          let optStyle = "border-[#E2E8F0] bg-white text-[#475569]";

          // ⚠️ SKIPPED + Correct Option → AMBER WARNING!
          if (isSkipped && isCorrectOpt) {
            optStyle =
              "border-amber-400 bg-amber-100 text-amber-900 shadow-sm shadow-amber-500/20 font-semibold";
          }
          // ✅ Correct Option (when answered)
          else if (isCorrectOpt && !isSkipped) {
            optStyle = "border-green-400 bg-green-50 text-green-800";
          }
          // ❌ Wrong Selected Option
          if (isSelected && !isCorrectOpt) {
            optStyle = "border-red-400 bg-red-50 text-red-800";
          }

          return (
            <div
              key={opt.id}
              className={`flex items-start gap-2 px-3 py-2 rounded-xl border-2 transition-all ${optStyle} text-sm`}
            >
              <span className="font-bold shrink-0">{letter}.</span>
              <span className="flex-1">{opt.option_text}</span>

              {/* ⚠️ Skipped + Correct → Warning label */}
              {isSkipped && isCorrectOpt && (
                <div className="shrink-0 mt-0.5 flex items-center gap-1.5">
                  <span className="text-amber-700 text-[10px] font-bold uppercase tracking-wide">
                    সঠিক উত্তর
                  </span>
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">!</span>
                  </div>
                </div>
              )}

              {/* ✅ Answered + Correct → Green check */}
              {isCorrectOpt && !isSkipped && (
                <FaCheckCircle className="text-green-500 shrink-0 mt-0.5" />
              )}

              {/* ❌ Wrong Selected → Red cross */}
              {isSelected && !isCorrectOpt && (
                <FaTimesCircle className="text-red-500 shrink-0 mt-0.5" />
              )}
            </div>
          );
        })}

        {/* 🟡 Skipped Warning Banner */}
        {isSkipped && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="shrink-0 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <p className="text-xs text-amber-800 font-medium">
              এই প্রশ্নের উত্তর দেননি — উপরে হলুদ চিহ্নিত সঠিক উত্তর দেখুন
            </p>
          </div>
        )}
      </div>

      {/* ── Explanation Toggle ──────────────────────────── */}
      {question.explanation && (
        <div className="border-t border-[#E2E8F0]">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full px-4 py-2.5 flex items-center justify-between
                       text-sm text-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <FaLightbulb className="text-amber-500" />
              <span>ব্যাখ্যা দেখুন</span>
            </span>
            {showExplanation ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
          </button>

          {showExplanation && (
            <div className="px-4 pb-4">
              <div className="bg-primary/5 rounded-xl p-3 text-sm text-[#1F2937] leading-relaxed border border-primary/20">
                {question.explanation}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Loading Screen
// ═══════════════════════════════════════════════════════════
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#64748B] font-medium">ফলাফল লোড হচ্ছে...</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Error Screen
// ═══════════════════════════════════════════════════════════
function ErrorScreen({ message, onBack }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full shadow-md border border-[#E2E8F0]">
        <div className="text-5xl mb-4">😕</div>
        <p className="text-[#475569] mb-4">{message}</p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white
                     rounded-xl font-medium transition-all duration-200
                     shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30
                     hover:-translate-y-0.5 cursor-pointer"
        >
          ফিরে যান
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN: Result Page
// ═══════════════════════════════════════════════════════════
export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const examId = params.id;
  const attemptId = params.attemptId;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      router.replace(`/exams/${examId}`);
      return;
    }

    let cancelled = false;

    async function loadResult() {
      try {
        const { result: data, error: err } = await getAttemptResult(attemptId, user.id);

        if (cancelled) return;

        if (err) {
          setError("ফলাফল লোড করা যায়নি: " + err);
          setLoading(false);
          return;
        }
        if (!data) {
          setError("ফলাফল পাওয়া যায়নি।");
          setLoading(false);
          return;
        }

        setResult(data);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error("❌ Fetch error:", err);
        setError(err.message || "অপ্রত্যাশিত সমস্যা হয়েছে।");
        setLoading(false);
      }
    }

    loadResult();

    return () => {
      cancelled = true;
    };
  }, [user, userLoading, examId, attemptId, router]);

  if (userLoading || loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} onBack={() => router.push(`/exams/${examId}`)} />;
  }

  if (!result) return null;

  const { attempt, exam, answers, questions } = result;
  const isPassed = attempt?.is_passed || false;

  const answerMap = {};
  (answers || []).forEach((ans) => {
    answerMap[ans.question_id] = ans;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      {/* HEADER SECTION */}
      <div
        className={`
          py-8 px-4 text-center text-white
          ${
            isPassed
              ? "bg-linear-to-br from-green-400 to-green-600"
              : "bg-linear-to-br from-red-400 to-red-600"
          }
        `}
      >
        <div className="max-w-lg mx-auto">
          <div className="text-5xl mb-3">{isPassed ? "🏆" : "📖"}</div>

          <h1 className="text-2xl font-bold mb-1">
            {isPassed ? "অভিনন্দন!" : "চেষ্টা চালিয়ে যান!"}
          </h1>
          <p className="text-white/90 text-sm mb-6">
            {isPassed ? "আপনি পরীক্ষায় উত্তীর্ণ হয়েছেন।" : "আরো পড়াশোনা করুন, পরের বার পারবেন।"}
          </p>

          <ScoreCircle
            score={attempt?.score}
            totalMarks={attempt?.total_marks || exam?.total_marks}
            isPassed={isPassed}
          />

          <div
            className={`
              inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full
              text-sm font-bold shadow-md
              ${isPassed ? "bg-white text-green-600" : "bg-white text-red-600"}
            `}
          >
            {isPassed ? <FaCheckCircle /> : <FaTimesCircle />}
            <span>{isPassed ? "উত্তীর্ণ" : "অকৃতকার্য"}</span>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="max-w-lg mx-auto px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] p-4 grid grid-cols-3 gap-3">
          {/* Correct */}
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {toBanglaNumber(attempt?.correct_count)}
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 font-medium">সঠিক</div>
          </div>

          {/* Wrong */}
          <div className="text-center border-x border-[#E2E8F0]">
            <div className="text-2xl font-bold text-red-500">
              {toBanglaNumber(attempt?.wrong_count)}
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 font-medium">ভুল</div>
          </div>

          {/* Skipped — Amber color now! */}
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-500">
              {toBanglaNumber(attempt?.skipped_count)}
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 font-medium">বাদ</div>
          </div>
        </div>

        {/* Details Card */}
        <div className="mt-3 bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#64748B]">পাস মার্ক:</span>
            <span className="font-semibold text-[#1F2937]">{toBanglaNumber(exam?.pass_marks)}</span>
          </div>
          {exam?.has_negative_marking && (
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">নেগেটিভ মার্কিং:</span>
              <span className="font-semibold text-red-500">
                -{toBanglaNumber(exam?.negative_mark_value)}
              </span>
            </div>
          )}
          {attempt?.time_taken_seconds && (
            <div className="flex items-center justify-between">
              <span className="text-[#64748B] flex items-center gap-1.5">
                <FaClock className="text-xs" />
                সময় নিয়েছেন:
              </span>
              <span className="font-semibold text-[#1F2937]">
                {formatTime(attempt.time_taken_seconds)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="max-w-lg mx-auto px-4 mt-4 flex gap-3">
        <button
          onClick={() => router.push("/exams")}
          className="flex-1 py-3 border-2 border-[#E2E8F0] bg-white rounded-xl
                     text-[#475569] font-medium flex items-center justify-center gap-2
                     hover:bg-[#F1F5F9] hover:border-[#CBD5E1] transition-all duration-200
                     cursor-pointer"
        >
          <FaList className="text-sm" />
          <span>সব পরীক্ষা</span>
        </button>

        <button
          onClick={() => router.push(`/exams/${examId}`)}
          className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white
                     rounded-xl font-medium flex items-center justify-center gap-2
                     shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30
                     hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <FaRedo className="text-sm" />
          <span>আবার দিন</span>
        </button>
      </div>

      {/* QUESTION REVIEW */}
      <div className="max-w-lg mx-auto px-4 mt-6">
        <h2 className="text-lg font-bold text-[#1F2937] mb-3 flex items-center gap-2">
          <FaList className="text-primary" />
          <span>প্রশ্নের বিশ্লেষণ</span>
        </h2>

        <div className="flex flex-col gap-4">
          {(questions || []).map((question, idx) => (
            <QuestionReviewItem
              key={question.id}
              question={question}
              answer={answerMap[question.id]}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
