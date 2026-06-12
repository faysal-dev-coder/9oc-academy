"use client";

import Image from "next/image";
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ─────────────────────────────────────────────────────────
// বাংলা অক্ষর map (ক, খ, গ, ঘ...)
// ─────────────────────────────────────────────────────────
const BANGLA_LETTERS = ["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ"];

// বাংলা সংখ্যা convert
const toBanglaNumber = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .split("")
    .map((d) => banglaDigits[parseInt(d)] ?? d)
    .join("");
};

// ─────────────────────────────────────────────────────────
// Props:
//   question, questionIndex, totalQuestions, selectedAnswer,
//   isMarked, onAnswerSelect, onMarkToggle,
//   onPrevious, onNext, isFirst, isLast
// ─────────────────────────────────────────────────────────

export default function QuestionRenderer({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  isMarked,
  onAnswerSelect,
  onMarkToggle,
  onPrevious,
  onNext,
  isFirst,
  isLast,
}) {
  // Question না থাকলে
  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <p className="text-[#94A3B8] text-lg">প্রশ্ন লোড হচ্ছে...</p>
      </div>
    );
  }

  const options = question.options || [];

  return (
    <div className="flex flex-col gap-0">
      {/* ── Question Header ─────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E2E8F0]">
        {/* প্রশ্ন নম্বর */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#64748B]">প্রশ্ন</span>
          <span className="text-base font-bold text-[#1F2937]">
            {toBanglaNumber(questionIndex + 1)}/{toBanglaNumber(totalQuestions)}
          </span>
        </div>

        {/* Mark for Review Button */}
        <button
          onClick={() => onMarkToggle(question.id)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
            transition-all duration-200 cursor-pointer
            ${
              isMarked
                ? "bg-amber-50 text-amber-700 border border-amber-200 shadow-sm"
                : "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
            }
          `}
        >
          {isMarked ? (
            <FaStar className="text-amber-500 text-xs" />
          ) : (
            <FaRegStar className="text-xs" />
          )}
          <span>{isMarked ? "Marked" : "Mark"}</span>
        </button>
      </div>

      {/* ── Question Body ────────────────────────────────── */}
      <div className="px-4 py-5 bg-white">
        {/* Question Image (যদি থাকে) */}
        {question.image_url && (
          <div className="mb-4 rounded-xl overflow-hidden border border-[#E2E8F0] relative w-full h-64 bg-[#F8FAFC]">
            <Image
              src={question.image_url}
              alt="প্রশ্নের ছবি"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />
          </div>
        )}

        {/* Question Text */}
        <p className="text-[#1F2937] text-base md:text-lg leading-relaxed font-medium mb-6">
          {question.question_text}
        </p>

        {/* ── Options ────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {options.map((option, idx) => {
            const isSelected = selectedAnswer === option.id;
            const letter = BANGLA_LETTERS[idx] || String(idx + 1);

            return (
              <button
                key={option.id}
                onClick={() => onAnswerSelect(question.id, option.id)}
                className={`
                  w-full flex items-start gap-3 px-4 py-3.5 rounded-xl
                  border-2 text-left transition-all duration-200
                  active:scale-[0.99] cursor-pointer
                  ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-[#E2E8F0] bg-white hover:border-primary/40 hover:bg-primary/5"
                  }
                `}
              >
                {/* Option Letter Badge */}
                <span
                  className={`
                    shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    text-sm font-bold transition-all duration-200
                    ${
                      isSelected
                        ? "bg-primary text-white shadow-sm shadow-primary/30"
                        : "bg-[#F1F5F9] text-[#475569]"
                    }
                  `}
                >
                  {letter}
                </span>

                {/* Option Text */}
                <span
                  className={`
                    flex-1 pt-0.5 text-base leading-relaxed
                    ${isSelected ? "text-primary-dark font-semibold" : "text-[#475569]"}
                  `}
                >
                  {option.option_text}
                </span>

                {/* Selected Indicator */}
                {isSelected && (
                  <span className="shrink-0 pt-0.5">
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-sm shadow-primary/30">
                      <span className="text-white text-xs">✓</span>
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Marks Info */}
        {question.marks && (
          <div className="mt-4 flex gap-4 text-xs text-[#94A3B8] font-medium">
            <span>মার্ক: {toBanglaNumber(question.marks)}</span>
            {question.negative_marks > 0 && (
              <span className="text-red-500">নেগেটিভ: -{question.negative_marks}</span>
            )}
          </div>
        )}
      </div>

      {/* ── Navigation Buttons ───────────────────────────── */}
      <div className="sticky bottom-0 px-4 py-3 bg-white border-t border-[#E2E8F0] flex gap-3">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`
            flex-1 flex items-center justify-center gap-2 py-3 px-4
            rounded-xl font-medium text-base transition-all duration-200
            ${
              isFirst
                ? "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
                : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] active:scale-[0.98] cursor-pointer"
            }
          `}
        >
          <FaChevronLeft className="text-sm" />
          <span>আগের প্রশ্ন</span>
        </button>

        {/* Next / Last Button */}
        <button
          onClick={onNext}
          className={`
            flex-1 flex items-center justify-center gap-2 py-3 px-4
            rounded-xl font-medium text-base transition-all duration-200
            active:scale-[0.98] cursor-pointer shadow-md
            ${
              isLast
                ? "bg-green-600 text-white hover:bg-green-700 shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/30"
                : "bg-primary text-white hover:bg-primary-dark shadow-primary/25 hover:shadow-lg hover:shadow-primary/30"
            }
          `}
        >
          <span>{isLast ? "শেষ প্রশ্ন" : "পরবর্তী প্রশ্ন"}</span>
          {!isLast && <FaChevronRight className="text-sm" />}
        </button>
      </div>
    </div>
  );
}
