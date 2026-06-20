// components/about/AboutHero.jsx
// ═══════════════════════════════════════════
// 🦸 About Hero — Apple Style Premium
// ├── Eyebrow + Two-tone title
// ├── 3 stat cards
// ├── CSS animations only
// └── Lucide icons (NO emoji, NO framer!)
// ═══════════════════════════════════════════

"use client";

import { Sparkles, ArrowDown, Calendar, Users, GraduationCap } from "lucide-react";
import { COMPANY_INFO } from "@/constants";

const QUICK_STATS = [
  {
    id: 1,
    icon: Calendar,
    value: COMPANY_INFO.founded,
    label: "প্রতিষ্ঠিত",
    gradient: "from-brand-700 to-brand-900",
    bg: "bg-brand-50",
    text: "text-brand-800",
    border: "border-brand-200",
  },
  {
    id: 2,
    icon: Users,
    value: "৫০,০০০+",
    label: "শিক্ষার্থী",
    gradient: "from-emerald-600 to-emerald-800",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  {
    id: 3,
    icon: GraduationCap,
    value: "১,২০০+",
    label: "সফল চাকরি",
    gradient: "from-amber-600 to-amber-800",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
];

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-white pb-20 pt-32">
      {/* ─── Background Layers ─────────── */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-50/50 via-white to-emerald-50/30" />

        {/* Static Orbs (NO framer animation!) */}
        <div className="absolute left-10 top-20 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(30,64,175,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-slate-50 to-transparent" />
      </div>

      {/* ─── Content ───────────────────── */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              আমাদের সম্পর্কে
            </span>
          </div>

          {/* Two-tone Heading */}
          <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            বাংলাদেশের প্রথম{" "}
            <span className="block text-slate-500">AI-Powered শিক্ষা প্ল্যাটফর্ম</span>
          </h1>

          {/* Description */}
          <p
            className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl animate-in fade-in slide-in-from-bottom-6 duration-700"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            {COMPANY_INFO.description}
          </p>

          {/* ─── Quick Stats ─────────────── */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {QUICK_STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl animate-in fade-in slide-in-from-bottom-8"
                  style={{
                    animationDelay: `${400 + index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {/* Icon Box */}
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} ${stat.border} border transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-7 w-7 ${stat.text}`} />
                  </div>

                  {/* Number */}
                  <div className={`text-3xl font-black ${stat.text} sm:text-4xl`}>{stat.value}</div>

                  {/* Label */}
                  <div className="mt-1 text-sm font-medium text-slate-500">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div
            className="mt-16 flex flex-col items-center gap-2 text-slate-400 animate-in fade-in duration-1000"
            style={{ animationDelay: "1000ms", animationFillMode: "both" }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em]">স্ক্রল করুন</span>
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
