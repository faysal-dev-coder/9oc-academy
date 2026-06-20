// components/home/TestimonialsSection.jsx
// ═══════════════════════════════════════════════════════════════
// 💬 Testimonials Section — Apple Style Premium (NO EMOJIS!)
// Phase 5 — Chat 50 FINAL
// ├── Single line title (NO subtitle!)
// ├── Centered hero card layout
// ├── NO avatar carousel (only arrows!)
// ├── Initials avatar (no emojis)
// └── Lucide icons everywhere
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Users,
  Trophy,
  TrendingUp,
  Award,
  BookOpen,
} from "lucide-react";
import { TESTIMONIALS } from "@/constants";

// ─── Avatar Color Palette ─────────────────
const AVATAR_GRADIENTS = [
  "from-brand-700 to-brand-900",
  "from-emerald-600 to-emerald-800",
  "from-amber-600 to-amber-800",
  "from-red-600 to-red-800",
  "from-slate-700 to-slate-900",
];

// ─── Get initials from Bengali name ───────
const getInitials = (name) => {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return words[0].charAt(0) + words[1].charAt(0);
  }
  return words[0].charAt(0) + (words[0].charAt(1) || "");
};

// ─── Get gradient based on ID ─────────────
const getGradient = (id) => {
  return AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length];
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalTestimonials = TESTIMONIALS.length;
  const activeTestimonial = useMemo(() => TESTIMONIALS[currentIndex], [currentIndex]);

  // ─── Auto-rotate ──────────────────────────
  useEffect(() => {
    if (isPaused || totalTestimonials <= 1) return undefined;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [isPaused, totalTestimonials]);

  // ─── Handlers ─────────────────────────────
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* ═══════════════════════════════════ */}
      {/* 🌟 Subtle Background                 */}
      {/* ═══════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-brand-700/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════ */}
        {/* 🎯 Header — Eyebrow + Title ONLY   */}
        {/* ═══════════════════════════════════ */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Eyebrow */}
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
            Testimonials
          </p>

          {/* Title — ONE LINE, two-tone */}
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            কৃতীদের কণ্ঠে <span className="text-slate-500">সাফল্যের গল্প</span>
          </h2>
          {/* ❌ NO subtitle! */}
        </div>

        {/* ═══════════════════════════════════ */}
        {/* 🎴 Main Testimonial Card             */}
        {/* ═══════════════════════════════════ */}
        <div
          className="relative mt-20 animate-in fade-in slide-in-from-bottom-6 duration-1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote Icon — Floating */}
          <div className="absolute -top-7 left-1/2 z-10 -translate-x-1/2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-700 to-brand-900 shadow-xl shadow-brand-800/30 ring-4 ring-slate-50">
              <Quote className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-8 pt-16 pb-10 shadow-xl shadow-slate-900/5 sm:px-12 sm:pt-20 sm:pb-12">
            {/* Decorative blurs */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-700/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-amber-500/5 blur-3xl" />

            <div className="relative" key={activeTestimonial.id}>
              {/* Stars Row */}
              <div className="flex justify-center gap-1 animate-in fade-in zoom-in-50 duration-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= activeTestimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mx-auto mt-6 max-w-3xl text-center text-xl font-medium leading-9 text-slate-700 sm:text-2xl sm:leading-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="mx-auto mt-10 h-px w-16 bg-slate-200" />

              {/* Author Info */}
              <div className="mt-8 flex flex-col items-center gap-4 animate-in fade-in duration-700">
                {/* Initials Avatar */}
                <div className="relative">
                  {/* Glow */}
                  <div
                    className={`absolute -inset-1 rounded-full bg-linear-to-br ${getGradient(
                      activeTestimonial.id
                    )} opacity-30 blur-md`}
                  />

                  {/* Avatar Circle */}
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br ${getGradient(
                      activeTestimonial.id
                    )} text-xl font-black text-white shadow-lg ring-4 ring-white`}
                  >
                    {getInitials(activeTestimonial.name)}
                  </div>
                </div>

                {/* Name + Title */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900">{activeTestimonial.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{activeTestimonial.designation}</p>
                </div>

                {/* Badges with Lucide Icons */}
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    <Award className="h-3.5 w-3.5" />
                    {activeTestimonial.examPassed}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">
                    <BookOpen className="h-3.5 w-3.5" />
                    {activeTestimonial.courseTaken}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════ */}
          {/* ⬅️ ➡️ Navigation Arrows              */}
          {/* ═══════════════════════════════════ */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="আগের রিভিউ"
            className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-slate-200 bg-white p-3 shadow-md transition-all duration-200 hover:border-brand-700/40 hover:bg-brand-50 hover:shadow-lg sm:p-4"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="পরের রিভিউ"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border border-slate-200 bg-white p-3 shadow-md transition-all duration-200 hover:border-brand-700/40 hover:bg-brand-50 hover:shadow-lg sm:p-4"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* ═══════════════════════════════════ */}
        {/* 📊 Trust Stats Strip                 */}
        {/* ═══════════════════════════════════ */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {/* Stat 1 — Users (Lucide!) */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-brand-700/30 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-200 group-hover:scale-110">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">৫০,০০০+</p>
                <p className="mt-0.5 text-sm font-medium text-slate-500">সফল শিক্ষার্থী</p>
              </div>
            </div>
          </div>

          {/* Stat 2 — Trophy (Lucide!) */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-emerald-500/30 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-200 group-hover:scale-110">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">১,২০০+</p>
                <p className="mt-0.5 text-sm font-medium text-slate-500">সরকারি চাকরিপ্রাপ্ত</p>
              </div>
            </div>
          </div>

          {/* Stat 3 — TrendingUp (Lucide!) */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-amber-500/30 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-all duration-200 group-hover:scale-110">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">৯৫%</p>
                <p className="mt-0.5 text-sm font-medium text-slate-500">সন্তুষ্টি হার</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
