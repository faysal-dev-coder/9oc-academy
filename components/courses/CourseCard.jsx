"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { INSTRUCTORS, THUMBNAIL_GRADIENTS, getDiscountPercent } from "@/constants";

// ═══════════════════════════════════════════
// 🛠️ Utility Functions
// ═══════════════════════════════════════════

const toBangla = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((d) => (/[0-9]/.test(d) ? banglaDigits[Number(d)] : d))
    .join("");
};

const formatStudents = (num) => {
  if (num >= 1000) {
    const k = (num / 1000).toFixed(1);
    return `${toBangla(k)}k`;
  }
  return toBangla(num);
};

// ═══════════════════════════════════════════
// 🃏 CourseCard Component
// ═══════════════════════════════════════════

export default function CourseCard({ course, index = 0 }) {
  const cardRef = useRef(null);

  // ─── Instructor খুঁজে বের করো ────────────
  const instructor = INSTRUCTORS.find((i) => i.id === course.instructor);

  // ─── Thumbnail Gradient ───────────────────
  const gradient = THUMBNAIL_GRADIENTS[course.thumbnail] ?? {
    from: "#6C63FF",
    to: "#4834D4",
    emoji: "📚",
  };

  // ─── Discount হিসাব ──────────────────────
  const discount = getDiscountPercent(course.originalPrice, course.price);

  // ─── Rating Stars ─────────────────────────
  const renderStars = useCallback((rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return Array.from({ length: 5 }, (_, i) => {
      let opacity = "text-white/20";
      if (i < fullStars) opacity = "text-[#FFB800]";
      else if (i === fullStars && hasHalf) opacity = "text-[#FFB800]/50";

      return (
        <HiOutlineStar
          key={i}
          className={`h-3.5 w-3.5 ${opacity} ${i < fullStars ? "fill-[#FFB800]" : ""}`}
        />
      );
    });
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8"
    >
      {/* ─── Outer Glow (Hover) ───────────── */}
      <div
        className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${gradient.from}25, ${gradient.to}15)`,
        }}
      />

      {/* ─── Inner Glow (Hover) ───────────── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `0 20px 60px -10px ${gradient.from}35`,
        }}
      />

      {/* ═══════════════════════════════════ */}
      {/* 🖼️ Thumbnail Area                  */}
      {/* ═══════════════════════════════════ */}
      <div className="relative h-48 overflow-hidden">
        {/* Gradient Background */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
          }}
        />

        {/* Dot Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.4) 1px, transparent 1px)," +
              "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "28px 28px, 38px 38px",
          }}
        />

        {/* Radial Glow Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.25), transparent 65%)`,
          }}
        />

        {/* Center Emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:opacity-50">
            {gradient.emoji}
          </span>
        </div>

        {/* ─── Top Badges ──────────────────── */}
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
          {/* Category Badge */}
          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {course.categoryLabel}
          </span>

          {/* Free / Discount Badge */}
          {course.isFree ? (
            <span className="rounded-full bg-[#00D4AA] px-3 py-1 text-xs font-bold text-[#0A0A1A] shadow-lg">
              ফ্রি ✨
            </span>
          ) : discount > 0 ? (
            <span className="rounded-full bg-[#FF6B6B] px-3 py-1 text-xs font-bold text-white shadow-lg">
              {toBangla(discount)}% ছাড়
            </span>
          ) : null}
        </div>

        {/* ─── Bottom Left: Popular / Level ── */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          {course.isPopular && (
            <span className="flex items-center gap-1 rounded-full border border-[#FFB800]/50 bg-[#FFB800]/20 px-2.5 py-1 text-xs font-semibold text-[#FFB800] backdrop-blur-md">
              🔥 জনপ্রিয়
            </span>
          )}
          {!course.isPopular && (
            <span className="rounded-md bg-black/30 px-2 py-0.5 text-[10px] font-semibold text-white/80 backdrop-blur-sm">
              {course.levelLabel}
            </span>
          )}
        </div>

        {/* ─── Bottom Right: Lessons ───────── */}
        <div className="absolute bottom-3 right-3">
          <span className="flex items-center gap-1 rounded-md bg-black/30 px-2 py-0.5 text-[10px] text-white/70 backdrop-blur-sm">
            <HiOutlineBookOpen className="h-3 w-3" />
            {toBangla(course.lessons)} পাঠ
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* 📝 Content Area                    */}
      {/* ═══════════════════════════════════ */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#6C63FF]">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/55">
          {course.shortDesc}
        </p>

        {/* ─── Rating Row ──────────────────── */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">{renderStars(course.rating)}</div>
          <span className="text-sm font-bold text-[#FFB800]">{toBangla(course.rating)}</span>
          <span className="text-xs text-white/40">({toBangla(course.totalRatings)} রিভিউ)</span>
        </div>

        {/* ─── Stats Row ───────────────────── */}
        <div className="mb-4 flex items-center gap-4 text-xs text-white/50">
          <div className="flex items-center gap-1">
            <HiOutlineUsers className="h-3.5 w-3.5" />
            <span>{formatStudents(course.students)}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineClock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
              style={{
                background: `${gradient.from}25`,
                color: gradient.from,
              }}
            >
              {course.levelLabel}
            </span>
          </div>
        </div>

        {/* ─── Instructor ──────────────────── */}
        {instructor && (
          <div className="mb-4 flex items-center gap-2 border-t border-white/8 pt-4">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-base"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}40, ${gradient.to}25)`,
                border: `1px solid ${gradient.from}30`,
              }}
            >
              {instructor.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-semibold text-white/80">{instructor.shortName}</p>
              <p className="truncate text-[10px] text-white/45">{instructor.title}</p>
            </div>
          </div>
        )}

        {/* ─── Price + CTA ─────────────────── */}
        <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-4">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            {course.isFree ? (
              <span className="text-xl font-bold text-[#00D4AA]">ফ্রি</span>
            ) : (
              <>
                <span className="text-xl font-bold text-white">৳{toBangla(course.price)}</span>
                {course.originalPrice > course.price && (
                  <span className="text-sm text-white/35 line-through">
                    ৳{toBangla(course.originalPrice)}
                  </span>
                )}
              </>
            )}
          </div>

          {/* CTA Button */}
          <button
            type="button"
            className="group/btn flex items-center gap-1.5 rounded-full bg-white/8 px-4 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:bg-[#6C63FF] hover:text-white hover:shadow-lg hover:shadow-[#6C63FF]/30 cursor-pointer"
          >
            <span>দেখুন</span>
            <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* ─── Bottom Gradient Line (Hover) ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
        }}
      />
    </motion.article>
  );
}
