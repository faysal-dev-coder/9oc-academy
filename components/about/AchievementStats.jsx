// components/about/AchievementStats.jsx
// ═══════════════════════════════════════════
// 🏆 Achievement Stats — Apple Style
// ├── 6 stats grid (3-col on lg)
// ├── Big numbers with color accents
// ├── Bottom inspirational quote
// └── Lucide icons (NO emoji!)
// ═══════════════════════════════════════════

"use client";

import {
  Users,
  Trophy,
  FileText,
  GraduationCap,
  ClipboardList,
  Heart,
  Sparkles,
  Target,
} from "lucide-react";
import { ACHIEVEMENT_STATS } from "@/constants";

const ICON_MAP = {
  users: Users,
  trophy: Trophy,
  document: FileText,
  academic: GraduationCap,
  clipboard: ClipboardList,
  heart: Heart,
};

const COLOR_VARIANTS = [
  {
    bg: "bg-brand-50",
    border: "border-brand-200",
    text: "text-brand-800",
    line: "from-brand-700 to-brand-900",
  },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    line: "from-emerald-600 to-emerald-800",
  },
  {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    line: "from-amber-600 to-amber-800",
  },
  {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    line: "from-rose-600 to-rose-800",
  },
  {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    line: "from-violet-600 to-violet-800",
  },
  {
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
    line: "from-cyan-600 to-cyan-800",
  },
];

export default function AchievementStats() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* ─── Background ─────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-brand-50/30 via-white to-emerald-50/20" />
        <div className="absolute left-10 top-10 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(30,64,175,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══ Apple Header ═══════════════ */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              আমাদের অর্জন
            </p>
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            সংখ্যায় <span className="text-slate-500">9OC Academy</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            বছরের পর বছর শিক্ষার্থীদের সফলতা ও আস্থায় আমরা গড়ে তুলেছি এই অসাধারণ মাইলস্টোনগুলো।
          </p>
        </div>

        {/* ═══ Stats Grid ════════════════ */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {ACHIEVEMENT_STATS.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon] ?? Users;
            const colors = COLOR_VARIANTS[index % COLOR_VARIANTS.length];

            return (
              <article
                key={stat.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-brand-300 hover:shadow-xl sm:p-8 animate-in fade-in zoom-in-95"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Top Accent Line */}
                <div
                  className={`absolute left-0 right-0 top-0 h-1 rounded-t-3xl bg-linear-to-r ${colors.line}`}
                />

                {/* Icon Box (centered) */}
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border ${colors.bg} ${colors.border} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-20 sm:w-20`}
                >
                  <Icon className={`h-8 w-8 ${colors.text} sm:h-10 sm:w-10`} />
                </div>

                {/* Big Number */}
                <div
                  className={`text-center text-3xl font-black leading-none ${colors.text} sm:text-4xl md:text-5xl`}
                >
                  {stat.number}
                </div>

                {/* Label */}
                <div className="mt-3 text-center text-sm font-black text-slate-900 sm:text-base">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="mt-1 text-center text-xs text-slate-500 sm:text-sm">
                  {stat.description}
                </div>

                {/* Bottom Hairline */}
                <div
                  className={`absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-slate-300 to-transparent`}
                />
              </article>
            );
          })}
        </div>

        {/* ═══ Inspirational Quote ══════ */}
        <div
          className="mx-auto mt-16 max-w-3xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: "700ms", animationFillMode: "both" }}
        >
          {/* Quote Pill (Target icon, NO emoji!) */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Target className="h-4 w-4 text-brand-700" />
            <span className="text-sm font-semibold text-slate-700">আমাদের লক্ষ্য আরও বড়</span>
          </div>

          {/* Quote Text */}
          <p className="text-lg italic leading-relaxed text-slate-700 sm:text-xl">
            &ldquo;প্রতিদিন আমরা স্বপ্ন দেখি — আগামী দিনে আরও হাজারো শিক্ষার্থীকে সফল করার। আপনিও
            হয়ে উঠুন আমাদের পরবর্তী সাফল্যের গল্প।&rdquo;
          </p>

          {/* Divider */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-brand-700" />
            <span className="text-sm font-bold text-brand-800">9OC Academy Team</span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-brand-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
