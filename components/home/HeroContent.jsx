// components/home/HeroContent.jsx
// ═══════════════════════════════════
// 🎯 Hero Content — Text + CTA
// Lucide icons | CSS animations | brand colors
// ═══════════════════════════════════

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import HeroBadge from "./HeroBadge";

export default function HeroContent() {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = useMemo(() => ["BCS পরীক্ষা", "ব্যাংক জব", "NTRCA", "প্রাইমারি", "নন-ক্যাডার"], []);

  // ── Typing Animation (pure JS — no lib needed!) ──
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < currentWord.length) {
            setTypedText(currentWord.slice(0, typedText.length + 1));
          } else {
            setIsDeleting(true);
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(currentWord.slice(0, typedText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : typedText === currentWord ? 2000 : 100
    );
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentWordIndex, words]);

  return (
    <div className="relative max-w-2xl">
      {/* ── Badge ── */}
      <HeroBadge />

      {/* ── Main Title ── */}
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {/* Line 1 */}
          <span className="mb-2 block text-slate-900">সরকারি চাকরির</span>

          {/* Line 2 — Brand Gradient */}
          <span className="mb-2 block bg-linear-to-r from-brand-800 to-brand-600 bg-clip-text text-transparent">
            MCQ প্রস্তুতি
          </span>

          {/* Line 3 — Typing Effect */}
          <span className="mt-2 block text-2xl font-bold text-slate-500 sm:text-3xl lg:text-4xl">
            <span className="text-amber-600">{typedText}</span>
            <span className="animate-pulse text-brand-800">|</span>
          </span>
        </h1>
      </div>

      {/* ── Subtitle ── */}
      <div className="animate-in fade-in slide-in-from-bottom-6 mt-6 duration-700 delay-200">
        <p className="max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
          <span className="font-semibold text-slate-900">৫০,০০০+</span> শিক্ষার্থীর সাথে যোগ দিয়ে
          স্মার্টভাবে প্রস্তুতি নিন। প্রতিদিন{" "}
          <span className="font-semibold text-emerald-600">MCQ পরীক্ষা</span>, বিস্তারিত{" "}
          <span className="font-semibold text-brand-800">ব্যাখ্যা</span> ও লাইভ{" "}
          <span className="font-semibold text-amber-600">লিডারবোর্ড</span> পাবেন একই জায়গায়।
        </p>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="animate-in fade-in slide-in-from-bottom-6 mt-8 flex flex-wrap gap-4 duration-700 delay-300">
        {/* Primary Button */}
        <Link
          href="/register"
          className="group inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand-800 to-brand-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-800/25 transition-all duration-150 hover:scale-105 hover:shadow-xl hover:shadow-brand-800/30"
        >
          🚀 ফ্রি তে শুরু করুন
          <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
        </Link>

        {/* Secondary Button */}
        <Link
          href="/courses"
          className="group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-800 transition-all duration-150 hover:scale-105 hover:border-brand-800/30 hover:bg-slate-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 transition-colors duration-150 group-hover:bg-emerald-500/20">
            <Play className="h-4 w-4 text-emerald-600" />
          </span>
          কোর্স দেখুন
        </Link>
      </div>

      {/* ── Trust Bar ── */}
      <div className="animate-in fade-in slide-in-from-bottom-6 mt-10 duration-700 delay-500">
        <div className="flex flex-wrap items-center gap-4">
          {/* Avatar Stack */}
          <div className="flex -space-x-3">
            {[
              { char: "ফ", bg: "bg-brand-800" },
              { char: "র", bg: "bg-emerald-600" },
              { char: "আ", bg: "bg-amber-500" },
              { char: "ম", bg: "bg-violet-500" },
              { char: "+", bg: "bg-slate-100", text: "text-slate-500" },
            ].map((avatar, i) => (
              <div
                key={i}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white text-xs font-bold shadow-sm ${avatar.bg} ${avatar.text ?? "text-white"}`}
              >
                {avatar.char}
              </div>
            ))}
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm text-amber-400">
                  ★
                </span>
              ))}
              <span className="ml-1 text-sm text-slate-500">৪.৯/৫</span>
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">৫০,০০০+</span> শিক্ষার্থী ইতিমধ্যে যোগ
              দিয়েছে
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
