// components/home/HeroContent.jsx
// ═══════════════════════════════════════
// 🎯 Hero Content with Typing Animation
// (Updated: Better Subtitle - Issue #8 Fixed)
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

  // ── Typing Effect State ──
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect এর Words (useMemo দিয়ে Cached)
  const words = useMemo(() => ["BCS পরীক্ষা", "ব্যাংক জব", "NTRCA", "প্রাইমারি", "নন-ক্যাডার"], []);

  // ── Typing Animation Effect ──
  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // টাইপ করছে
          if (typedText.length < currentWord.length) {
            setTypedText(currentWord.slice(0, typedText.length + 1));
          } else {
            setIsDeleting(true);
          }
        } else {
          // ডিলিট করছে
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

  // ── GSAP Entrance Animation ──
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
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          {/* Line 1 — White */}
          <span className="block text-white mb-2">সরকারি চাকরির</span>

          {/* Line 2 — Gradient */}
          <span
            className="block bg-clip-text text-transparent mb-2"
            style={{
              backgroundImage: "linear-gradient(135deg, #6c63ff, #00d4aa)",
            }}
          >
            MCQ প্রস্তুতি
          </span>

          {/* Line 3 — Typing Effect */}
          <span className="block text-white/90 text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
            <span className="text-accent">{typedText}</span>
            <span className="text-primary animate-pulse">|</span>
          </span>
        </h1>
      </div>

      {/* ✅ FIX #8: Better Subtitle (More Professional + Motivating) */}
      <div ref={subtitleRef} className="opacity-0 mt-6">
        <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg">
          <span className="text-white font-semibold">৫০,০০০+</span> শিক্ষার্থীর সাথে যোগ দিয়ে
          স্মার্টভাবে প্রস্তুতি নিন। প্রতিদিন{" "}
          <span className="text-secondary font-semibold">MCQ পরীক্ষা</span>, বিস্তারিত{" "}
          <span className="text-primary font-semibold">ব্যাখ্যা</span> ও লাইভ{" "}
          <span className="text-accent font-semibold">লিডারবোর্ড</span> পাবেন একই জায়গায়।
        </p>
      </div>

      {/* ── CTA Buttons ── */}
      <div ref={ctaRef} className="opacity-0 mt-8 flex flex-wrap gap-4">
        {/* Primary Button — Glowing */}
        <Link href="/register" className="group relative inline-flex">
          {/* Glow Effect Behind Button */}
          <div
            className="absolute -inset-1 rounded-xl opacity-70 blur-lg transition-all duration-500 group-hover:opacity-100"
            style={{
              backgroundImage: "linear-gradient(135deg, #6c63ff, #00d4aa)",
            }}
          />

          {/* Button Content */}
          <div
            className="relative flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-base transition-all duration-300 group-hover:scale-105"
            style={{
              backgroundImage: "linear-gradient(135deg, #6c63ff, #5a52d5)",
            }}
          >
            🚀 ফ্রি তে শুরু করুন
            <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Secondary Button — Glass */}
        <Link
          href="/courses"
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-semibold text-base backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
        >
          {/* Play Icon Circle */}
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
            <HiPlay className="w-4 h-4 text-secondary" />
          </span>
          কোর্স দেখুন
        </Link>
      </div>

      {/* ── Trust Bar ── */}
      <div ref={trustRef} className="opacity-0 mt-10">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Student Avatar Circles */}
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary border-2 border-dark flex items-center justify-center text-xs font-bold text-white">
              ফ
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary border-2 border-dark flex items-center justify-center text-xs font-bold text-white">
              র
            </div>
            <div className="w-10 h-10 rounded-full bg-accent border-2 border-dark flex items-center justify-center text-xs font-bold text-white">
              আ
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-dark flex items-center justify-center text-xs font-bold text-white">
              ম
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-dark flex items-center justify-center text-xs font-bold text-white">
              +
            </div>
          </div>

          {/* Rating & Stats Text */}
          <div>
            <div className="flex items-center gap-1">
              <span className="text-accent text-sm">★</span>
              <span className="text-accent text-sm">★</span>
              <span className="text-accent text-sm">★</span>
              <span className="text-accent text-sm">★</span>
              <span className="text-accent text-sm">★</span>
              <span className="text-white/60 text-sm ml-1">৪.৯/৫</span>
            </div>
            <p className="text-white/50 text-sm">
              <span className="text-white font-semibold">৫০,০০০+</span> শিক্ষার্থী ইতিমধ্যে যোগ
              দিয়েছে
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
