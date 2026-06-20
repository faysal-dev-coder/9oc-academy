// components/about/WhyChooseUs.jsx
// ═══════════════════════════════════════════
// ⭐ Why Choose Us — Apple Style
// ├── 6-feature grid (3-col on lg)
// ├── Number badge (01-06)
// ├── Bottom stats bar
// └── Lucide icons only
// ═══════════════════════════════════════════

"use client";

import {
  GraduationCap,
  RefreshCw,
  Timer,
  LineChart,
  Wallet,
  Headset,
  Sparkles,
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/constants";

const ICON_MAP = {
  academic: GraduationCap,
  refresh: RefreshCw,
  timer: Timer,
  chart: LineChart,
  wallet: Wallet,
  support: Headset,
};

const COLOR_VARIANTS = [
  {
    bg: "bg-brand-50",
    border: "border-brand-200",
    text: "text-brand-800",
    accent: "text-brand-700",
    line: "from-brand-700 to-brand-900",
  },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    accent: "text-emerald-700",
    line: "from-emerald-600 to-emerald-800",
  },
  {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    accent: "text-amber-700",
    line: "from-amber-600 to-amber-800",
  },
  {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    accent: "text-rose-700",
    line: "from-rose-600 to-rose-800",
  },
  {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    accent: "text-violet-700",
    line: "from-violet-600 to-violet-800",
  },
  {
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
    accent: "text-cyan-700",
    line: "from-cyan-600 to-cyan-800",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* ─── Background ─────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-brand-50/40 via-slate-50 to-emerald-50/20" />
        <div className="absolute left-1/2 top-1/2 h-144 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(30,64,175,0.08) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══ Apple Header ═══════════════ */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-brand-700" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              কেন আমাদের বেছে নিবেন
            </p>
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            আমাদের <span className="text-slate-500">বিশেষত্ব</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            ৫০,০০০+ শিক্ষার্থীর আস্থা ও ভালোবাসায় আমরা পৌঁছেছি এখানে। জানুন কেন আমরা সেরা পরীক্ষা
            প্রস্তুতি প্ল্যাটফর্ম।
          </p>
        </div>

        {/* ═══ Features Grid ══════════════ */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon] ?? GraduationCap;
            const colors = COLOR_VARIANTS[index % COLOR_VARIANTS.length];

            return (
              <article
                key={feature.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-brand-300 hover:shadow-xl animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Number Badge (top-left) */}
                <span
                  className={`absolute left-4 top-4 text-xs font-black opacity-30 group-hover:opacity-70 transition-opacity ${colors.accent}`}
                >
                  ০{feature.id}
                </span>

                {/* Header — Icon + Stat */}
                <div className="mb-5 flex items-start justify-between">
                  {/* Icon Box */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${colors.bg} ${colors.border} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon className={`h-7 w-7 ${colors.text}`} />
                  </div>

                  {/* Stat */}
                  <div className="text-right">
                    <div
                      className={`text-3xl font-black leading-none sm:text-4xl ${colors.accent}`}
                    >
                      {feature.stat}
                    </div>
                    <div className="mt-1 text-xs font-medium text-slate-500">
                      {feature.statLabel}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-black text-slate-900">{feature.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>

                {/* Bottom Accent (Expand on hover) */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-1/5 rounded-tr-full bg-linear-to-r ${colors.line} transition-all duration-500 group-hover:w-full`}
                />
              </article>
            );
          })}
        </div>

        {/* ═══ Bottom Stats Bar ══════════ */}
        <div
          className="mx-auto mt-16 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: "700ms", animationFillMode: "both" }}
        >
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-4">
            <div className="border-r border-slate-200 p-6 text-center">
              <div className="text-2xl font-black text-brand-800 sm:text-3xl">৫০K+</div>
              <div className="mt-1 text-xs font-medium text-slate-500">শিক্ষার্থী</div>
            </div>
            <div className="border-slate-200 p-6 text-center sm:border-r">
              <div className="text-2xl font-black text-emerald-700 sm:text-3xl">৯৮%</div>
              <div className="mt-1 text-xs font-medium text-slate-500">সন্তুষ্টি</div>
            </div>
            <div className="border-r border-t border-slate-200 p-6 text-center sm:border-t-0">
              <div className="text-2xl font-black text-amber-700 sm:text-3xl">১,২০০+</div>
              <div className="mt-1 text-xs font-medium text-slate-500">চাকরি</div>
            </div>
            <div className="border-t border-slate-200 p-6 text-center sm:border-t-0">
              <div className="text-2xl font-black text-rose-700 sm:text-3xl">২৪/৭</div>
              <div className="mt-1 text-xs font-medium text-slate-500">সাপোর্ট</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
