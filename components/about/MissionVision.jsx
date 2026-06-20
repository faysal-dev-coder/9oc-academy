// components/about/MissionVision.jsx
// ═══════════════════════════════════════════
// 🎯 Mission & Vision — Apple Style
// ├── 2-column premium cards
// ├── Lucide icons (Target, Eye, CheckCircle2)
// ├── NO emojis in trust badge!
// └── CSS animations only
// ═══════════════════════════════════════════

"use client";

import { Target, Eye, CheckCircle2, Users, Trophy, Star } from "lucide-react";
import { MISSION_VISION } from "@/constants";

// Icon Map
const ICON_MAP = {
  target: Target,
  eye: Eye,
};

// Color Map — Brand & Emerald
const COLOR_MAP = {
  primary: {
    iconBg: "bg-brand-50",
    iconText: "text-brand-800",
    border: "border-brand-200",
    accent: "text-brand-700",
    gradient: "from-brand-700 to-brand-900",
    glow: "bg-brand-200/30",
    line: "from-brand-700 to-brand-900",
  },
  secondary: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-700",
    border: "border-emerald-200",
    accent: "text-emerald-700",
    gradient: "from-emerald-600 to-emerald-800",
    glow: "bg-emerald-200/30",
    line: "from-emerald-600 to-emerald-800",
  },
};

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* ─── Background ─────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(30,64,175,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════ */}
        {/* 📌 Apple Style Header           */}
        {/* ═══════════════════════════════ */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-700" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              আমাদের লক্ষ্য
            </p>
          </div>

          {/* Two-tone Title */}
          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            মিশন ও <span className="text-slate-500">ভিশন</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            আমরা স্বপ্ন দেখি বাংলাদেশের প্রতিটি শিক্ষার্থীর সফলতার। আমাদের লক্ষ্য ও পরিকল্পনা জানুন।
          </p>
        </div>

        {/* ═══════════════════════════════ */}
        {/* 🎯 Mission & Vision Cards       */}
        {/* ═══════════════════════════════ */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {MISSION_VISION.map((item, index) => {
            const Icon = ICON_MAP[item.icon] ?? Target;
            const colors = COLOR_MAP[item.color] ?? COLOR_MAP.primary;

            return (
              <article
                key={item.id}
                className="group relative animate-in fade-in slide-in-from-bottom-6 duration-700"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Hover Glow */}
                <div
                  className={`absolute -inset-1 rounded-3xl ${colors.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Card */}
                <div
                  className={`relative h-full overflow-hidden rounded-3xl border ${colors.border} bg-white p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl sm:p-10`}
                >
                  {/* Top Gradient Border */}
                  <div
                    className={`absolute left-0 right-0 top-0 h-1 bg-linear-to-r ${colors.line}`}
                  />

                  {/* Decorative Corner Glow */}
                  <div
                    className={`absolute -right-12 -top-12 h-40 w-40 rounded-full ${colors.glow} opacity-50 blur-2xl`}
                  />

                  {/* Icon Box */}
                  <div
                    className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${colors.iconBg} ${colors.border} border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className={`h-10 w-10 ${colors.iconText}`} />
                  </div>

                  {/* Subtitle Row */}
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-[0.2em] ${colors.accent}`}
                    >
                      {item.subtitle}
                    </span>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl font-black text-slate-900 sm:text-3xl">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-base leading-relaxed text-slate-600">
                    {item.description}
                  </p>

                  {/* Points List */}
                  <ul className="space-y-3">
                    {item.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-500"
                        style={{
                          animationDelay: `${index * 200 + idx * 80 + 400}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        <div
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${colors.iconBg}`}
                        >
                          <CheckCircle2 className={`h-5 w-5 ${colors.iconText}`} />
                        </div>
                        <span className="text-sm leading-relaxed text-slate-700 sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* ═══════════════════════════════ */}
        {/* 🏆 Trust Badge (NO emoji!)      */}
        {/* ═══════════════════════════════ */}
        <div
          className="mt-16 text-center animate-in fade-in duration-700"
          style={{ animationDelay: "600ms", animationFillMode: "both" }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 shadow-sm">
            {/* Icon Stack (NO emoji!) */}
            <span className="flex -space-x-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-linear-to-br from-brand-700 to-brand-900 text-[10px] font-black text-white">
                50K
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-linear-to-br from-emerald-600 to-emerald-800">
                <Users className="h-4 w-4 text-white" />
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-linear-to-br from-amber-500 to-amber-700">
                <Trophy className="h-4 w-4 text-white" />
              </span>
            </span>

            {/* Text */}
            <span className="text-sm text-slate-600">
              <span className="font-black text-slate-900">৫০,০০০+</span> শিক্ষার্থী আমাদের সাথে
              যুক্ত আছেন
            </span>

            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
