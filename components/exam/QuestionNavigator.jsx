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

  // ─── Status to Styles ───
  const getStyles = (status) => {
    switch (status) {
      case "current":
        return "bg-primary text-white border-primary ring-2 ring-primary/50 scale-110";
      case "answered":
        return "bg-green-500/20 text-green-300 border-green-500/50 hover:bg-green-500/30";
      case "marked":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50 hover:bg-yellow-500/30";
      case "marked-answered":
        return "bg-purple-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30";
      default:
        return "bg-white/5 text-white/60 border-white/10 hover:bg-white/10";
    }
  };

  return (
    <div className="bg-dark/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 py-3">
        {/* Top Stats Bar */}
        <div className="flex items-center justify-between mb-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-white/50">
              প্রশ্ন:{" "}
              <span className="text-white font-semibold">{toBanglaNumber(questions.length)}</span>
            </span>
            <span className="text-green-400">
              ● উত্তর দেওয়া: <span className="font-semibold">{toBanglaNumber(answeredCount)}</span>
            </span>
            {markedCount > 0 && (
              <span className="text-yellow-400">
                ⚐ চিহ্নিত: <span className="font-semibold">{toBanglaNumber(markedCount)}</span>
              </span>
            )}
          </div>
          <div className="text-white/40 hidden sm:block">
            {toBanglaNumber(Math.round((answeredCount / questions.length) * 100))}% সম্পন্ন
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-linear-to-r from-primary to-green-500 transition-all duration-500"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Number Grid — Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.1) transparent",
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
                className={`shrink-0 w-10 h-10 rounded-lg border font-semibold text-sm transition-all cursor-pointer ${styles}`}
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
