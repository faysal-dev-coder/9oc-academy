// components/home/HeroContent.jsx
// ═══════════════════════════════════════
// 🎯 Hero Content — Light Theme
// Phase 6B+ — Chat 23
// ═══════════════════════════════════════

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { HiArrowRight, HiPlay } from "react-icons/hi2";
import HeroBadge from "./HeroBadge";

export default function HeroContent() {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);

  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = useMemo(() => ["BCS পরীক্ষা", "ব্যাংক জব", "NTRCA", "প্রাইমারি", "নন-ক্যাডার"], []);

  // Typing Animation
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

  // GSAP Entrance Animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        trustRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={contentRef} className="relative max-w-2xl">
      {/* ── Animated Badge ── */}
      <HeroBadge />

      {/* ── Main Title ── */}
      <div ref={titleRef} className="opacity-0">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {/* Line 1 — Dark */}
          <span className="mb-2 block text-[#1F2937]">সরকারি চাকরির</span>

          {/* Line 2 — Gradient (Blue → Cyan) */}
          <span
            className="mb-2 block bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #1E9CD7, #0A5A8A)",
            }}
          >
            MCQ প্রস্তুতি
          </span>

          {/* Line 3 — Typing Effect */}
          <span className="mt-2 block text-2xl font-bold text-[#475569] sm:text-3xl lg:text-4xl">
            <span className="text-[#D97706]">{typedText}</span>
            <span className="animate-pulse text-[#1E9CD7]">|</span>
          </span>
        </h1>
      </div>

      {/* ── Subtitle ── */}
      <div ref={subtitleRef} className="mt-6 opacity-0">
        <p className="max-w-lg text-base leading-relaxed text-[#64748B] sm:text-lg">
          <span className="font-semibold text-[#1F2937]">৫০,০০০+</span> শিক্ষার্থীর সাথে যোগ দিয়ে
          স্মার্টভাবে প্রস্তুতি নিন। প্রতিদিন{" "}
          <span className="font-semibold text-[#059669]">MCQ পরীক্ষা</span>, বিস্তারিত{" "}
          <span className="font-semibold text-[#1E9CD7]">ব্যাখ্যা</span> ও লাইভ{" "}
          <span className="font-semibold text-[#D97706]">লিডারবোর্ড</span> পাবেন একই জায়গায়।
        </p>
      </div>

      {/* ── CTA Buttons ── */}
      <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4 opacity-0">
        {/* Primary Button — Glowing Blue */}
        <Link href="/register" className="group relative inline-flex">
          {/* Glow Effect */}
          <div
            className="absolute -inset-1 rounded-xl opacity-60 blur-lg transition-all duration-500 group-hover:opacity-90"
            style={{
              backgroundImage: "linear-gradient(135deg, #1E9CD7, #0A5A8A)",
            }}
          />
          {/* Button Content */}
          <div
            className="relative flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all duration-300 group-hover:scale-105"
            style={{
              backgroundImage: "linear-gradient(135deg, #1E9CD7, #0A5A8A)",
            }}
          >
            🚀 ফ্রি তে শুরু করুন
            <HiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Secondary Button — Light Glass */}
        <Link
          href="/courses"
          className="group relative inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-8 py-4 text-base font-semibold text-[#1F2937] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#1E9CD7]/30 hover:bg-[#F1F5F9]"
        >
          {/* Play Icon Circle */}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#059669]/10 transition-colors duration-300 group-hover:bg-[#059669]/20">
            <HiPlay className="h-4 w-4 text-[#059669]" />
          </span>
          কোর্স দেখুন
        </Link>
      </div>

      {/* ── Trust Bar ── */}
      <div ref={trustRef} className="mt-10 opacity-0">
        <div className="flex flex-wrap items-center gap-4">
          {/* Student Avatar Circles */}
          <div className="flex -space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#1E9CD7] text-xs font-bold text-white shadow-sm">
              ফ
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#059669] text-xs font-bold text-white shadow-sm">
              র
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#D97706] text-xs font-bold text-white shadow-sm">
              আ
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-xs font-bold text-white shadow-sm">
              ম
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#F1F5F9] text-xs font-bold text-[#475569] shadow-sm">
              +
            </div>
          </div>

          {/* Rating & Stats Text */}
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-[#FBBF24]">★</span>
              <span className="text-sm text-[#FBBF24]">★</span>
              <span className="text-sm text-[#FBBF24]">★</span>
              <span className="text-sm text-[#FBBF24]">★</span>
              <span className="text-sm text-[#FBBF24]">★</span>
              <span className="ml-1 text-sm text-[#475569]">৪.৯/৫</span>
            </div>
            <p className="text-sm text-[#64748B]">
              <span className="font-semibold text-[#1F2937]">৫০,০০০+</span> শিক্ষার্থী ইতিমধ্যে যোগ
              দিয়েছে
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
