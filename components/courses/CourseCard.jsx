// components/courses/CourseCard.jsx
// ═══════════════════════════════════════════════════════════════
// 🎓 CourseCard — Apple Style Premium
// ├── NO emojis (Lucide icons + Initials avatar)
// ├── NO framer-motion (CSS animations only)
// ├── Lucide icons (NO react-icons/hi2)
// └── Brand colors (brand-800 primary)
// ═══════════════════════════════════════════════════════════════

"use client";

import Link from "next/link";
import {
  Star,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
  Flame,
  Sparkles,
  Landmark,
  Building2,
  GraduationCap,
  FileText,
  Calculator,
  Monitor,
  Map,
  Globe,
  Mic,
  Languages,
  Library,
} from "lucide-react";
import { INSTRUCTORS, toBanglaNumber, getDiscountPercent } from "@/constants";

// ═══════════════════════════════════════════
// 🗺️ Thumbnail Icon Map (NO emoji!)
// ═══════════════════════════════════════════
const THUMBNAIL_ICONS = {
  bcs: Landmark,
  bank: Building2,
  ntrca: GraduationCap,
  primary: BookOpen,
  noncadre: FileText,
  bangla: Languages,
  english: Languages,
  math: Calculator,
  computer: Monitor,
  bangladesh: Map,
  international: Globe,
  bankviva: Mic,
};

// ═══════════════════════════════════════════
// 🎨 Gradient Map (Lucide colors)
// ═══════════════════════════════════════════
const THUMBNAIL_BG = {
  bcs: "from-indigo-500 to-indigo-700",
  bank: "from-emerald-500 to-emerald-700",
  ntrca: "from-amber-500 to-amber-700",
  primary: "from-rose-500 to-rose-700",
  noncadre: "from-violet-500 to-violet-700",
  bangla: "from-cyan-500 to-cyan-700",
  english: "from-emerald-500 to-emerald-700",
  math: "from-amber-500 to-amber-700",
  computer: "from-red-500 to-red-700",
  bangladesh: "from-indigo-500 to-indigo-700",
  international: "from-emerald-500 to-emerald-700",
  bankviva: "from-violet-500 to-violet-700",
};

// ═══════════════════════════════════════════
// 🛠️ Helpers
// ═══════════════════════════════════════════
const formatStudents = (num) => {
  if (num >= 1000) {
    const k = (num / 1000).toFixed(1);
    return `${toBanglaNumber(k)}k`;
  }
  return toBanglaNumber(num);
};

const getInitials = (name) => {
  if (!name) return "??";
  const words = name.trim().split(/\s+/);
  const first = words[0]?.charAt(0) ?? "";
  const second = words[1]?.charAt(0) ?? "";
  return first + second || "??";
};

// Initials avatar gradient rotation (5 colors)
const AVATAR_GRADIENTS = [
  "from-brand-700 to-brand-900",
  "from-emerald-600 to-emerald-800",
  "from-amber-600 to-amber-800",
  "from-rose-600 to-rose-800",
  "from-violet-600 to-violet-800",
];

// ═══════════════════════════════════════════
// 🃏 CourseCard Component
// ═══════════════════════════════════════════
export default function CourseCard({ course, index = 0 }) {
  const instructor = INSTRUCTORS.find((i) => i.id === course.instructor);
  const ThumbIcon = THUMBNAIL_ICONS[course.thumbnail] ?? BookOpen;
  const thumbBg = THUMBNAIL_BG[course.thumbnail] ?? "from-slate-600 to-slate-800";
  const discount = getDiscountPercent(course.originalPrice, course.price);

  // Instructor avatar gradient (deterministic)
  const avatarGradient = instructor
    ? AVATAR_GRADIENTS[
        Math.abs(instructor.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) %
          AVATAR_GRADIENTS.length
      ]
    : AVATAR_GRADIENTS[0];

  // Render rating stars (Lucide)
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return Array.from({ length: 5 }, (_, i) => {
      const isFull = i < full;
      const isHalf = i === full && hasHalf;
      return (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            isFull
              ? "fill-amber-400 text-amber-400"
              : isHalf
                ? "fill-amber-400/50 text-amber-400"
                : "text-slate-300"
          }`}
        />
      );
    });
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
    >
      {/* ═══════════════════════════════════ */}
      {/* 🖼️ Thumbnail Area (Lucide icon!)   */}
      {/* ═══════════════════════════════════ */}
      <div className="relative h-44 overflow-hidden">
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${thumbBg} transition-transform duration-500 group-hover:scale-110`}
        />

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Radial Glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.25), transparent 65%)",
          }}
        />

        {/* Center Lucide Icon (NO emoji!) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ThumbIcon
            className="h-20 w-20 text-white/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-white/50"
            strokeWidth={1.5}
          />
        </div>

        {/* ─── Top Badges ──────────────────── */}
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
          {/* Category Badge */}
          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {course.categoryLabel}
          </span>

          {/* Free / Discount */}
          {course.isFree ? (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              <Sparkles className="h-3 w-3" />
              ফ্রি
            </span>
          ) : discount > 0 ? (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              {toBanglaNumber(discount)}% ছাড়
            </span>
          ) : null}
        </div>

        {/* ─── Bottom Left: Popular Badge ─── */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          {course.isPopular ? (
            <span className="flex items-center gap-1 rounded-full border border-amber-300/60 bg-amber-400/20 px-2.5 py-1 text-xs font-semibold text-amber-100 backdrop-blur-md">
              <Flame className="h-3 w-3" />
              জনপ্রিয়
            </span>
          ) : (
            <span className="rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
              {course.levelLabel}
            </span>
          )}
        </div>

        {/* ─── Bottom Right: Lessons ───────── */}
        <div className="absolute bottom-3 right-3">
          <span className="flex items-center gap-1 rounded-md bg-black/40 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm">
            <BookOpen className="h-3 w-3" />
            {toBanglaNumber(course.lessons)} পাঠ
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* 📝 Content Area                    */}
      {/* ═══════════════════════════════════ */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-brand-800">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {course.shortDesc}
        </p>

        {/* ─── Rating Row ──────────────────── */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">{renderStars(course.rating)}</div>
          <span className="text-sm font-bold text-amber-600">{toBanglaNumber(course.rating)}</span>
          <span className="text-xs text-slate-400">
            ({toBanglaNumber(course.totalRatings)} রিভিউ)
          </span>
        </div>

        {/* ─── Stats Row ───────────────────── */}
        <div className="mb-4 flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{formatStudents(course.students)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* ─── Instructor (Initials!) ──────── */}
        {instructor && (
          <div className="mb-4 flex items-center gap-2 border-t border-slate-100 pt-4">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${avatarGradient} text-xs font-black text-white shadow-sm ring-2 ring-white`}
            >
              {getInitials(instructor.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-700">
                {instructor.shortName}
              </p>
              <p className="truncate text-[10px] text-slate-500">{instructor.title}</p>
            </div>
          </div>
        )}

        {/* ─── Price + CTA ─────────────────── */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            {course.isFree ? (
              <span className="text-xl font-black text-emerald-600">ফ্রি</span>
            ) : (
              <>
                <span className="text-xl font-black text-slate-900">
                  ৳{toBanglaNumber(course.price)}
                </span>
                {course.originalPrice > course.price && (
                  <span className="text-sm text-slate-400 line-through">
                    ৳{toBanglaNumber(course.originalPrice)}
                  </span>
                )}
              </>
            )}
          </div>

          {/* CTA Button */}
          <Link
            href={`/courses/${course.id}`}
            className="group/btn flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-brand-800 hover:text-white hover:shadow-lg"
          >
            <span>দেখুন</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ─── Bottom Gradient Line (Hover) ─── */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${thumbBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
    </article>
  );
}
