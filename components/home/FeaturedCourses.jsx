// components/home/FeaturedCourses.jsx
// ═══════════════════════════════════════════════════════════════
// 🎓 FeaturedCourses Section — Apple Style
// ├── Centered eyebrow + two-tone title
// ├── 3-column premium grid
// ├── CSS animations only (NO framer-motion!)
// └── Lucide icons everywhere
// ═══════════════════════════════════════════════════════════════

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Flame, ArrowRight, BookOpen } from "lucide-react";
import { COURSES } from "@/constants";
import CourseCard from "@/components/courses/CourseCard";

export default function FeaturedCourses() {
  // ─── Featured + Popular Top 6 ────────────
  const featuredCourses = useMemo(() => {
    const featured = COURSES.filter((c) => c.isFeatured);
    const popular = COURSES.filter((c) => c.isPopular && !c.isFeatured);
    const combined = [...featured, ...popular];
    return combined.slice(0, 6);
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-24">
      {/* ─── Background Decoration ───────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      {/* ─── Content ─────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════ */}
        {/* 📌 Apple Style Header           */}
        {/* ═══════════════════════════════ */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5">
            <Flame className="h-4 w-4 text-brand-700" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              জনপ্রিয় কোর্স
            </p>
          </div>

          {/* Two-tone Title */}
          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            আমাদের <span className="text-slate-500">সেরা কোর্স সমূহ</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            বিশেষজ্ঞ শিক্ষকদের দ্বারা তৈরি প্রিমিয়াম কোর্স — হাজারো শিক্ষার্থীর পছন্দের
          </p>
        </div>

        {/* ═══════════════════════════════ */}
        {/* 🃏 Course Cards Grid            */}
        {/* ═══════════════════════════════ */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* ═══════════════════════════════ */}
        {/* 👉 View All CTA                  */}
        {/* ═══════════════════════════════ */}
        <div className="mt-16 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link
            href="/courses"
            style={{ color: "#ffffff" }}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-800 px-8 py-4 text-base font-bold shadow-lg shadow-brand-800/30 transition-all duration-200 hover:bg-brand-900 hover:shadow-xl hover:shadow-brand-800/40"
          >
            <span style={{ color: "#ffffff" }}>সব কোর্স দেখুন</span>
            <ArrowRight
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: "#ffffff" }}
            />
          </Link>

          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            <BookOpen className="h-4 w-4" />
            <span>{COURSES.length}+ কোর্স প্রস্তুত আছে আপনার জন্য</span>
          </p>
        </div>
      </div>
    </section>
  );
}
