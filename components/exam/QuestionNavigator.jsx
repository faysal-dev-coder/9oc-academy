// components/exam/QuestionNavigator.jsx
// 🔢 Question Navigator — Horizontal Top Bar
// Mobile-friendly with horizontal scroll
// Compact stats + legend

"use client";

import { useEffect, useRef } from "react";

// English number → Bangla
const toBanglaNumber = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .split("")
    .map((d) => banglaDigits[d] ?? d)
    .join("");
};

export default function QuestionNavigator({
  questions,
  currentIndex,
  selectedAnswers,
  markedForReview,
  onQuestionClick,
}) {
  const scrollRef = useRef(null);
  const buttonRefs = useRef([]);

  // ─── Stats ───
  const answeredCount = Object.keys(selectedAnswers).filter((qId) => selectedAnswers[qId]).length;
  const markedCount = markedForReview.size;

  // ─── Auto-scroll to current question ───
  useEffect(() => {
    const currentBtn = buttonRefs.current[currentIndex];
    if (currentBtn && scrollRef.current) {
      currentBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // ─── Get Question Status ───
  const getStatus = (questionId, index) => {
    const isAnswered = !!selectedAnswers[questionId];
    const isMarked = markedForReview.has(questionId);
    const isCurrent = index === currentIndex;

    if (isCurrent) return "current";
    if (isMarked && isAnswered) return "marked-answered";
    if (isMarked) return "marked";
    if (isAnswered) return "answered";
    return "not-visited";
  };

  // ─── Status to Styles (Light Theme) ───
  const getStyles = (status) => {
    switch (status) {
      case "current":
        return "bg-primary text-white border-primary ring-2 ring-primary/30 scale-110 shadow-md shadow-primary/30";
      case "answered":
        return "bg-green-50 text-green-700 border-green-300 hover:bg-green-100 hover:border-green-400";
      case "marked":
        return "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100 hover:border-amber-400";
      case "marked-answered":
        return "bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100 hover:border-purple-400";
      default:
        return "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0] hover:bg-[#E2E8F0] hover:border-[#CBD5E1]";
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] sticky top-0 z-30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3">
        {/* Top Stats Bar */}
        <div className="flex items-center justify-between mb-2 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[#64748B]">
              প্রশ্ন:{" "}
              <span className="text-[#1F2937] font-semibold">
                {toBanglaNumber(questions.length)}
              </span>
            </span>
            <span className="text-green-600 font-medium">
              ● উত্তর দেওয়া: <span className="font-semibold">{toBanglaNumber(answeredCount)}</span>
            </span>
            {markedCount > 0 && (
              <span className="text-amber-600 font-medium">
                ⚐ চিহ্নিত: <span className="font-semibold">{toBanglaNumber(markedCount)}</span>
              </span>
            )}
          </div>
          <div className="text-[#94A3B8] hidden sm:block font-medium">
            {toBanglaNumber(Math.round((answeredCount / questions.length) * 100))}% সম্পন্ন
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-linear-to-r from-primary to-green-500 transition-all duration-500 rounded-full"
            style={{
              width: `${(answeredCount / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question Number Grid — Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E1 transparent",
          }}
        >
          {questions.map((q, idx) => {
            const status = getStatus(q.id, idx);
            const styles = getStyles(status);

            return (
              <button
                key={q.id}
                ref={(el) => (buttonRefs.current[idx] = el)}
                onClick={() => onQuestionClick(idx)}
                className={`shrink-0 w-10 h-10 rounded-lg border font-semibold text-sm transition-all duration-200 cursor-pointer ${styles}`}
                title={`প্রশ্ন ${idx + 1}`}
              >
                {toBanglaNumber(idx + 1)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
