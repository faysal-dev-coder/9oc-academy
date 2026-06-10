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
//   question       → current question object
//   questionIndex  → 0-based index
//   totalQuestions → total count
//   selectedAnswer → currently selected option id (or null)
//   isMarked       → boolean (marked for review?)
//   onAnswerSelect → fn(questionId, optionId)
//   onMarkToggle   → fn(questionId)
//   onPrevious     → fn()
//   onNext         → fn()
//   isFirst        → boolean
//   isLast         → boolean
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
  // Question বা Options না থাকলে
  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <p className="text-gray-400 text-lg">প্রশ্ন লোড হচ্ছে...</p>
      </div>
    );
  }

  const options = question.options || [];

  return (
    <div className="flex flex-col gap-0">
      {/* ── Question Header ─────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        {/* প্রশ্ন নম্বর */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">প্রশ্ন</span>
          <span className="text-base font-bold text-gray-800">
            {toBanglaNumber(questionIndex + 1)}/{toBanglaNumber(totalQuestions)}
          </span>
        </div>

        {/* Mark for Review Button */}
        <button
          onClick={() => onMarkToggle(question.id)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
            transition-all duration-200
            ${
              isMarked
                ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-yellow-50 hover:text-yellow-600"
            }
          `}
        >
          {isMarked ? (
            <FaStar className="text-yellow-500 text-xs" />
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
          <div className="mb-4 rounded-xl overflow-hidden border border-gray-200 relative w-full h-64 bg-gray-50">
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
        <p className="text-gray-900 text-base md:text-lg leading-relaxed font-medium mb-6">
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
                      ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
                      : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                  }
                `}
              >
                {/* Option Letter Badge */}
                <span
                  className={`
                    shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    text-sm font-bold transition-colors duration-200
                    ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}
                  `}
                >
                  {letter}
                </span>

                {/* Option Text */}
                <span
                  className={`
                    flex-1 pt-0.5 text-base leading-relaxed
                    ${isSelected ? "text-blue-800 font-medium" : "text-gray-700"}
                  `}
                >
                  {option.option_text}
                </span>

                {/* Selected Indicator */}
                {isSelected && (
                  <span className="shrink-0 pt-0.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
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
          <div className="mt-4 flex gap-4 text-xs text-gray-400">
            <span>মার্ক: {toBanglaNumber(question.marks)}</span>
            {question.negative_marks > 0 && (
              <span className="text-red-400">নেগেটিভ: -{question.negative_marks}</span>
            )}
          </div>
        )}
      </div>

      {/* ── Navigation Buttons ───────────────────────────── */}
      <div
        className="sticky bottom-0 px-4 py-3 bg-white border-t border-gray-100
                      flex gap-3"
      >
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`
            flex-1 flex items-center justify-center gap-2 py-3 px-4
            rounded-xl font-medium text-base transition-all duration-200
            ${
              isFirst
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.98]"
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
            active:scale-[0.98]
            ${
              isLast
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
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
