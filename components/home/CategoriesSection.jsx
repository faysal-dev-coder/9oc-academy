// components/home/CategoriesSection.jsx
// ═══════════════════════════════════════════════════════════════
// 📚 Categories Section — CSS Animations, Brand Colors
// Chat 49 Rebuild — No GSAP, No hex, Tailwind v4
// ═══════════════════════════════════════════════════════════════

"use client";

import { useMemo } from "react";

// ─── Category Variant Styles (5 colors max!) ───
const categoryVariants = {
  brand: {
    gradient: "from-brand-800/10 via-brand-800/5 to-transparent",
    dot: "bg-brand-800",
    border: "hover:border-brand-800/30",
    count: "text-brand-800",
  },
  emerald: {
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    dot: "bg-emerald-500",
    border: "hover:border-emerald-500/30",
    count: "text-emerald-600",
  },
  amber: {
    gradient: "from-amber-400/10 via-amber-400/5 to-transparent",
    dot: "bg-amber-400",
    border: "hover:border-amber-400/30",
    count: "text-amber-600",
  },
  red: {
    gradient: "from-red-500/10 via-red-500/5 to-transparent",
    dot: "bg-red-500",
    border: "hover:border-red-500/30",
    count: "text-red-600",
  },
  slate: {
    gradient: "from-slate-400/10 via-slate-400/5 to-transparent",
    dot: "bg-slate-400",
    border: "hover:border-slate-400/30",
    count: "text-slate-500",
  },
};

// ─── Category Card ───
function CategoryCard({ emoji, name, count, variant, delay }) {
  const colors = categoryVariants[variant] || categoryVariants.brand;

  return (
    <div
      className="
        animate-in fade-in slide-in-from-bottom-6 duration-700
      "
      style={{ animationDelay: delay }}
    >
      <div
        className={`
          group relative cursor-pointer overflow-hidden
          rounded-xl border border-slate-200 bg-white p-6
          shadow-sm transition-all duration-300
          hover:-translate-y-2 hover:shadow-xl ${colors.border}
        `}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`
            absolute inset-0 bg-linear-to-br ${colors.gradient}
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          `}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Emoji */}
          <div className="mb-4 text-4xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125 inline-block">
            {emoji}
          </div>

          {/* Name */}
          <h3 className="mb-2 text-lg font-bold text-slate-800">{name}</h3>

          {/* Count with pulse dot */}
          <div className="flex items-center gap-2">
            <div
              className={`
                h-2 w-2 rounded-full animate-pulse ${colors.dot}
              `}
            />
            <span className={`text-sm font-medium ${colors.count}`}>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Categories Section ───
export default function CategoriesSection() {
  const categories = useMemo(
    () => [
      {
        emoji: "🏛️",
        name: "BCS প্রিলিমিনারি",
        count: "৩,৫০০+ প্রশ্ন",
        variant: "brand",
        delay: "0ms",
      },
      {
        emoji: "🏦",
        name: "ব্যাংক জব",
        count: "২,৮০০+ প্রশ্ন",
        variant: "emerald",
        delay: "100ms",
      },
      {
        emoji: "📚",
        name: "NTRCA শিক্ষক নিবন্ধন",
        count: "১,৫০০+ প্রশ্ন",
        variant: "amber",
        delay: "200ms",
      },
      {
        emoji: "🎓",
        name: "প্রাইমারি শিক্ষক",
        count: "২,০০০+ প্রশ্ন",
        variant: "red",
        delay: "300ms",
      },
      {
        emoji: "📋",
        name: "নন-ক্যাডার",
        count: "১,২০০+ প্রশ্ন",
        variant: "slate",
        delay: "400ms",
      },
    ],
    []
  );

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-800/4 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-md
              bg-amber-400/10 border border-amber-400/20 mb-6
              animate-in fade-in slide-in-from-bottom-4 duration-500
            "
          >
            <span className="text-base">📚</span>
            <span className="text-sm font-medium text-amber-600">পরীক্ষার ক্যাটাগরি</span>
          </div>

          <h2
            className="
              text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4
              animate-in fade-in slide-in-from-bottom-5 duration-600 delay-100
            "
          >
            আপনার{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-brand-800">
              লক্ষ্য বেছে নিন
            </span>
          </h2>

          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-linear-to-r from-amber-400 via-brand-800 to-emerald-500 animate-in fade-in duration-500 delay-200" />

          <p className="mx-auto max-w-2xl text-lg text-slate-500 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            সরকারি চাকরির প্রতিটি ক্যাটাগরির জন্য আলাদা প্রস্তুতি নিন
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
