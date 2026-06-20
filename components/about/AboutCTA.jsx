// components/about/AboutCTA.jsx
// ═══════════════════════════════════════════
// 🚀 About CTA — Apple Style Premium
// ├── Brand-800 → brand-900 gradient bg
// ├── NO emojis anywhere!
// ├── Lucide icons only
// ├── Initials in avatar stack
// └── CSS animations only
// ═══════════════════════════════════════════

"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Rocket,
  CheckCircle2,
  Star,
  ShieldCheck,
  Users,
  Gift,
  Flame,
  User,
} from "lucide-react";

const TRUST_ITEMS = [
  { id: 1, icon: CheckCircle2, text: "১০০% ফ্রি ট্রায়াল" },
  { id: 2, icon: ShieldCheck, text: "কোনো ক্রেডিট কার্ড লাগবে না" },
  { id: 3, icon: Star, text: "৪.৯/৫ রেটিং" },
];

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* ─── Background ─────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(30,64,175,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* ═══ Premium Gradient CTA Box ═══ */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-700 via-brand-800 to-brand-900 p-8 shadow-2xl shadow-brand-800/40 animate-in fade-in zoom-in-95 duration-700 sm:p-12 md:p-16">
            {/* Static Decorative Orbs */}
            <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

            {/* Grid Overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Top Amber Accent */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-transparent via-amber-300 to-transparent" />

            {/* ─── Content ─────────────────── */}
            <div className="relative z-10 text-center">
              {/* Eyebrow Badge */}
              <div
                className="inline-flex animate-in fade-in slide-in-from-top-4 items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2 backdrop-blur-md duration-500"
                style={{ animationDelay: "100ms", animationFillMode: "both" }}
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  বিশেষ অফার চলছে
                </span>
                <span className="flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-brand-900">
                  <Flame className="h-3 w-3" />
                  HOT
                </span>
              </div>

              {/* Heading */}
              <h2
                className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-700"
                style={{ animationDelay: "200ms", animationFillMode: "both" }}
              >
                আপনার স্বপ্নের চাকরির
                <br />
                <span className="bg-linear-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                  জার্নি শুরু করুন আজই!
                </span>
              </h2>

              {/* Description */}
              <p
                className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl animate-in fade-in slide-in-from-bottom-6 duration-700"
                style={{ animationDelay: "300ms", animationFillMode: "both" }}
              >
                ৫০,০০০+ শিক্ষার্থীর সাথে যুক্ত হন। আমাদের AI-powered শেখার প্ল্যাটফর্মে সম্পূর্ণ
                বিনামূল্যে কোর্স শুরু করুন।
              </p>

              {/* CTA Buttons */}
              <div
                className="mt-10 flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 sm:flex-row"
                style={{ animationDelay: "400ms", animationFillMode: "both" }}
              >
                {/* Primary Button */}
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-brand-800 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <Rocket className="h-5 w-5" />
                  <span>ফ্রি শুরু করুন</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {/* Secondary Button */}
                <Link
                  href="/courses"
                  style={{ color: "#ffffff" }}
                  className="group inline-flex items-center gap-3 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 font-bold backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
                >
                  <span style={{ color: "#ffffff" }}>সব কোর্স দেখুন</span>
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: "#ffffff" }}
                  />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div
                className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 animate-in fade-in duration-700"
                style={{ animationDelay: "500ms", animationFillMode: "both" }}
              >
                {TRUST_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-center gap-2 text-sm text-white/90">
                      <Icon className="h-4 w-4 text-amber-300" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* ─── Social Proof ──────────── */}
              <div
                className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-white/20 pt-6 sm:flex-row animate-in fade-in duration-700"
                style={{ animationDelay: "600ms", animationFillMode: "both" }}
              >
                {/* Avatar Stack (NO emoji!) */}
                <div className="flex -space-x-2">
                  {/* Initials Avatars */}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-linear-to-br from-brand-500 to-brand-700 text-xs font-black text-white shadow-md">
                    RA
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-linear-to-br from-emerald-500 to-emerald-700 text-xs font-black text-white shadow-md">
                    FB
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-linear-to-br from-rose-500 to-rose-700 text-xs font-black text-white shadow-md">
                    MH
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-amber-400 text-[10px] font-black text-brand-900 shadow-md">
                    50K+
                  </span>
                </div>

                {/* Rating + Text */}
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center gap-0.5 text-amber-300 sm:justify-start">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-amber-300" />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-white/85 sm:text-sm">
                    <span className="font-black text-white">৫০,০০০+</span> শিক্ষার্থী আমাদের ভরসা
                    করেন
                  </p>
                </div>
              </div>

              {/* Bonus Note */}
              <div
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/20 px-4 py-2 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: "700ms", animationFillMode: "both" }}
              >
                <Gift className="h-4 w-4 text-amber-200" />
                <span className="text-xs font-medium text-amber-50 sm:text-sm">
                  আজই সাইন আপ করলে পাবেন ফ্রি Welcome Bonus!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
