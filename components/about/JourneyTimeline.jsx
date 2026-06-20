// components/about/JourneyTimeline.jsx
// ═══════════════════════════════════════════
// 🛤️ Journey Timeline — Apple Style
// ├── Center vertical line + colored dots
// ├── Alternating left/right cards (desktop)
// ├── Lucide icons (NO react-icons!)
// └── CSS animations only
// ═══════════════════════════════════════════

"use client";

import { Rocket, Users, Star, Trophy, Brain } from "lucide-react";
import { TIMELINE_DATA } from "@/constants";

const ICON_MAP = {
  rocket: Rocket,
  users: Users,
  star: Star,
  trophy: Trophy,
  brain: Brain,
};

// 5-color cycle (Tailwind safe)
const COLOR_VARIANTS = [
  {
    bg: "bg-brand-50",
    border: "border-brand-200",
    text: "text-brand-800",
    ring: "ring-brand-200",
    shadow: "shadow-brand-200/50",
    gradient: "from-brand-700 to-brand-900",
  },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    shadow: "shadow-emerald-200/50",
    gradient: "from-emerald-600 to-emerald-800",
  },
  {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    ring: "ring-amber-200",
    shadow: "shadow-amber-200/50",
    gradient: "from-amber-600 to-amber-800",
  },
  {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    ring: "ring-rose-200",
    shadow: "shadow-rose-200/50",
    gradient: "from-rose-600 to-rose-800",
  },
  {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    ring: "ring-violet-200",
    shadow: "shadow-violet-200/50",
    gradient: "from-violet-600 to-violet-800",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* ─── Background ─────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-brand-50/30 via-white to-slate-50" />
        <div className="absolute left-0 top-1/2 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              আমাদের যাত্রা
            </p>
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            আমাদের <span className="text-slate-500">জার্নি</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            ২০২৩ থেকে আজ পর্যন্ত আমাদের অর্জন ও মাইলস্টোনগুলো দেখুন। প্রতিটা পদক্ষেপ আমাদের
            শিক্ষার্থীদের সাফল্যের জন্য।
          </p>
        </div>

        {/* ═══ Timeline ═══════════════════ */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          {/* Center Line (Desktop) */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-linear-to-b from-transparent via-slate-200 to-transparent md:block" />

          {/* Left Line (Mobile) */}
          <div className="absolute bottom-0 left-7 top-0 w-0.5 bg-linear-to-b from-transparent via-slate-200 to-transparent md:hidden" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-20">
            {TIMELINE_DATA.map((item, index) => {
              const Icon = ICON_MAP[item.icon] ?? Rocket;
              const colors = COLOR_VARIANTS[index % COLOR_VARIANTS.length];
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative animate-in fade-in slide-in-from-bottom-6 duration-700"
                  style={{
                    animationDelay: `${index * 120}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {/* ── Desktop Layout ── */}
                  <div className="hidden items-center justify-between gap-8 md:flex">
                    {isLeft && (
                      <div className="w-5/12">
                        <TimelineCard item={item} colors={colors} align="right" />
                      </div>
                    )}
                    {!isLeft && <div className="w-5/12" />}

                    <div className="relative z-10 shrink-0">
                      <CenterDot Icon={Icon} colors={colors} highlight={item.highlight} />
                    </div>

                    {!isLeft && (
                      <div className="w-5/12">
                        <TimelineCard item={item} colors={colors} align="left" />
                      </div>
                    )}
                    {isLeft && <div className="w-5/12" />}
                  </div>

                  {/* ── Mobile Layout ── */}
                  <div className="flex gap-5 md:hidden">
                    <div className="relative z-10 shrink-0">
                      <CenterDot Icon={Icon} colors={colors} highlight={item.highlight} />
                    </div>
                    <div className="flex-1">
                      <TimelineCard item={item} colors={colors} align="left" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End Marker */}
          <div
            className="relative mt-16 flex justify-center animate-in fade-in zoom-in-95 duration-700"
            style={{ animationDelay: "800ms", animationFillMode: "both" }}
          >
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />
              <span className="text-sm font-bold text-slate-900">আরও অনেক কিছু আসছে...</span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// Sub-Component: Center Dot (Timeline)
// ═══════════════════════════════════════════
function CenterDot({ Icon, colors, highlight }) {
  return (
    <div className="relative">
      {highlight && (
        <>
          <span className={`absolute inset-0 animate-ping rounded-full ${colors.bg} opacity-50`} />
          <span className={`absolute -inset-2 rounded-full ${colors.bg} opacity-30 blur-md`} />
        </>
      )}
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white ${colors.bg} ${
          highlight ? `shadow-lg ${colors.shadow}` : ""
        } transition-transform duration-300 hover:scale-110 md:h-16 md:w-16`}
      >
        <Icon className={`h-6 w-6 ${colors.text} md:h-7 md:w-7`} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Sub-Component: Timeline Card
// ═══════════════════════════════════════════
function TimelineCard({ item, colors, align }) {
  const isRight = align === "right";

  return (
    <div
      className={`group relative rounded-2xl border ${colors.border} bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      {/* Top Accent */}
      <div
        className={`absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-linear-to-r ${colors.gradient}`}
      />

      {/* Arrow Pointer (Desktop) */}
      <div
        className={`absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-slate-200 bg-white md:block ${
          isRight ? "-right-1.5 border-r border-t" : "-left-1.5 border-b border-l"
        }`}
      />

      {/* Badges Row */}
      <div className={`mb-3 flex flex-wrap items-center gap-2 ${isRight ? "md:justify-end" : ""}`}>
        {/* Year + Month */}
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${colors.bg} ${colors.border} ${colors.text}`}
        >
          <span>{item.year}</span>
          <span className="h-1 w-1 rounded-full bg-current opacity-50" />
          <span>{item.month}</span>
        </span>

        {/* Highlight Badge (Lucide Star, NO emoji!) */}
        {item.highlight && (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>মাইলস্টোন</span>
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`mb-2 text-xl font-black text-slate-900 sm:text-2xl ${
          isRight ? "md:text-right" : ""
        }`}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed text-slate-600 sm:text-base ${
          isRight ? "md:text-right" : ""
        }`}
      >
        {item.description}
      </p>
    </div>
  );
}
