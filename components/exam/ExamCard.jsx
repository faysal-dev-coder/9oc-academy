// components/exam/ExamCard.jsx
"use client";

import Link from "next/link";
import {
  FaClock,
  FaQuestionCircle,
  FaTrophy,
  FaLock,
  FaExclamationTriangle,
  FaRandom,
} from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

export default function ExamCard({ exam, questionCount = 0 }) {
  // Time Format Helper
  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} মিনিট`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h} ঘণ্টা ${m} মিনিট` : `${h} ঘণ্টা`;
  };

  return (
    <div className="group relative bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-primary/40 hover:bg-[#F8FAFC] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
      {/* Top Row: Category + Free/Paid Badge */}
      <div className="flex items-center justify-between mb-4">
        {/* Category Badge */}
        <span className="flex items-center gap-1.5 text-xs text-[#64748B] bg-[#F1F5F9] px-3 py-1 rounded-full border border-[#E2E8F0]">
          <HiAcademicCap size={12} />
          {exam.categories?.name || "সাধারণ"}
        </span>

        {/* Free/Paid Badge */}
        {exam.is_free ? (
          <span className="text-xs font-semibold text-secondary bg-secondary/10 border border-secondary/30 px-3 py-1 rounded-full">
            বিনামূল্যে
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs font-semibold text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
            <FaLock size={10} />
            প্রিমিয়াম
          </span>
        )}
      </div>

      {/* Exam Title */}
      <h3 className="text-lg font-bold text-[#1F2937] mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
        {exam.title}
      </h3>

      {/* Description */}
      {exam.description && (
        <p className="text-sm text-[#64748B] mb-4 leading-relaxed line-clamp-2">
          {exam.description}
        </p>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
        {/* Questions */}
        <div className="flex flex-col items-center gap-1 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <FaQuestionCircle size={14} className="text-primary" />
          <span className="text-[#1F2937] font-semibold">{questionCount}</span>
          <span className="text-xs text-[#94A3B8]">প্রশ্ন</span>
        </div>
        {/* Duration */}
        <div className="flex flex-col items-center gap-1 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <FaClock size={14} className="text-secondary" />
          <span className="text-[#1F2937] font-semibold">{exam.duration_minutes}</span>
          <span className="text-xs text-[#94A3B8]">মিনিট</span>
        </div>
        {/* Total Marks */}
        <div className="flex flex-col items-center gap-1 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <FaTrophy size={14} className="text-accent" />
          <span className="text-[#1F2937] font-semibold">{exam.total_marks}</span>
          <span className="text-xs text-[#94A3B8]">নম্বর</span>
        </div>
      </div>

      {/* Special Badges Row */}
      <div className="flex flex-wrap gap-2 mb-5">
        {/* Negative Marking */}
        {exam.has_negative_marking && (
          <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
            <FaExclamationTriangle size={10} />-{exam.negative_mark_value} নেগেটিভ
          </span>
        )}

        {/* Randomized */}
        {exam.is_randomized && (
          <span className="flex items-center gap-1 text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
            <FaRandom size={10} />
            এলোমেলো প্রশ্ন
          </span>
        )}

        {/* Pass Marks */}
        <span className="text-xs text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] px-2.5 py-1 rounded-full">
          পাস: {exam.pass_marks}
        </span>
      </div>

      {/* CTA Button */}
      <Link href={`/exams/${exam.id}`}>
        <button className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 cursor-pointer">
          বিস্তারিত দেখুন →
        </button>
      </Link>

      {/* Subtle Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
