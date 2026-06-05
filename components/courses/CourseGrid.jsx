"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowPath } from "react-icons/hi2";
import CourseCard from "@/components/courses/CourseCard";
import { SORT_OPTIONS } from "@/constants";

// ═══════════════════════════════════════════
// 📦 CourseGrid — Grid + Sort + Empty State
// ═══════════════════════════════════════════

// ─── Empty State ──────────────────────────
function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-20 text-center backdrop-blur-sm"
    >
      {/* Icon */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-5xl">
        🔍
      </div>

      {/* Title */}
      <h3 className="mb-2 text-2xl font-bold text-white">কোনো কোর্স পাওয়া যায়নি!</h3>

      {/* Description */}
      <p className="mb-6 max-w-md text-sm text-white/60">
        আপনার ফিল্টার অনুযায়ী কোনো কোর্স খুঁজে পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা
        করুন।
      </p>

      {/* Reset Button */}
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-primary/80 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/50 cursor-pointer"
      >
        <HiOutlineArrowPath className="h-4 w-4" />
        ফিল্টার রিসেট করুন
      </button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════

export default function CourseGrid({ courses = [], sortBy, onSortChange, onReset }) {
  const courseList = useMemo(() => courses, [courses]);

  return (
    <div>
      {/* ─── Top Bar: Results + Sort ──────── */}
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        {/* Result Count */}
        <p className="text-sm text-white/70">
          মোট <span className="font-bold text-white">{courseList.length}টা</span> কোর্স পাওয়া গেছে
        </p>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="course-sort" className="text-sm font-semibold text-white/70">
            সাজান:
          </label>
          <select
            id="course-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm outline-none transition-all duration-300 hover:bg-white/10 focus:border-primary/50"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#1A1A3E] text-white">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── Grid / Empty State ───────────── */}
      <AnimatePresence mode="wait">
        {courseList.length === 0 ? (
          <EmptyState key="empty" onReset={onReset} />
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {courseList.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
