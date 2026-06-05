"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { toBanglaNumber } from "@/lib/utils";

export default function HeroVisual() {
  const containerRef = useRef(null);
  const mcqCardRef = useRef(null);
  const statCardsRef = useRef([]);
  const progressRef = useRef(null);

  // ── MCQ Options Data (useMemo দিয়ে Cached) ──
  const mcqOptions = useMemo(
    () => [
      { letter: "ক", text: "৪ নভেম্বর ১৯৭২", status: "correct" },
      { letter: "খ", text: "১৬ ডিসেম্বর ১৯৭২", status: "wrong" },
      { letter: "গ", text: "২৬ মার্চ ১৯৭১", status: "default" },
      { letter: "ঘ", text: "১৭ এপ্রিল ১৯৭১", status: "default" },
    ],
    []
  );

  // ── Main Entrance Animation ──
  useEffect(() => {
    const mcqCard = mcqCardRef.current;
    const statCardElements = statCardsRef.current;

    if (!mcqCard) return;

    const tl = gsap.timeline({ delay: 1 });

    // MCQ Card Entrance
    tl.fromTo(
      mcqCard,
      { opacity: 0, scale: 0.8, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" }
    );

    // Stat Cards Stagger Entrance
    statCardElements.forEach((card) => {
      if (!card) return;
      tl.fromTo(
        card,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.3"
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  // ── Floating Animation for Stat Cards ──
  useEffect(() => {
    const cards = statCardsRef.current;

    cards.forEach((card, index) => {
      if (!card) return;

      gsap.to(card, {
        y: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      });
    });

    return () => {
      cards.forEach((card) => {
        if (card) gsap.killTweensOf(card);
      });
    };
  }, []);

  // ── Progress Bar Animation ──
  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    gsap.fromTo(
      progress,
      { width: "0%" },
      { width: "78%", duration: 2, ease: "power2.out", delay: 1.8 }
    );

    return () => {
      gsap.killTweensOf(progress);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* ══════════════════════════════════════════ */}
      {/* ██  MCQ Card Preview                      */}
      {/* ══════════════════════════════════════════ */}
      <div
        ref={mcqCardRef}
        className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 opacity-0"
      >
        {/* ── Card Header ── */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* Question Icon Box */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{
                backgroundImage: "linear-gradient(135deg, #6c63ff, #00d4aa)",
              }}
            >
              Q
            </div>
            <div>
              <p className="text-white text-sm font-semibold">বাংলাদেশ বিষয়াবলি</p>
              <p className="text-white/40 text-xs">
                প্রশ্ন {toBanglaNumber(15)}/{toBanglaNumber(50)}
              </p>
            </div>
          </div>

          {/* Timer Badge */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-accent text-xs font-bold">
              ⏱ {toBanglaNumber(24)}:{toBanglaNumber(35)}
            </span>
          </div>
        </div>

        {/* ── Question Text ── */}
        <div className="mb-4">
          <p className="text-white/90 text-sm font-medium leading-relaxed">
            বাংলাদেশের সংবিধান কত তারিখে গণপরিষদে গৃহীত হয়?
          </p>
        </div>

        {/* ── Options List ── */}
        <div className="space-y-2">
          {mcqOptions.map((option, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                option.status === "correct"
                  ? "border-secondary/50 bg-secondary/10"
                  : option.status === "wrong"
                    ? "border-error/50 bg-error/10"
                    : "border-white/5 bg-white/2"
              }`}
            >
              {/* Option Letter */}
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  option.status === "correct"
                    ? "bg-secondary/20 text-secondary"
                    : option.status === "wrong"
                      ? "bg-error/20 text-error"
                      : "bg-white/10 text-white/50"
                }`}
              >
                {option.letter}
              </span>

              {/* Option Text */}
              <span
                className={`text-sm flex-1 ${
                  option.status === "correct"
                    ? "text-secondary"
                    : option.status === "wrong"
                      ? "text-error"
                      : "text-white/60"
                }`}
              >
                {option.text}
              </span>

              {/* Status Icon */}
              {option.status === "correct" && <HiCheckCircle className="w-5 h-5 text-secondary" />}
              {option.status === "wrong" && <HiXCircle className="w-5 h-5 text-error" />}
            </div>
          ))}
        </div>

        {/* ── Progress Bar ── */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/40 text-xs">অগ্রগতি</span>
            <span className="text-secondary text-xs font-bold">{toBanglaNumber(78)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full"
              style={{
                backgroundImage: "linear-gradient(90deg, #6c63ff, #00d4aa)",
                width: "0%",
              }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* ██  Floating Stat Card 1 — Top Right     */}
      {/* ══════════════════════════════════════════ */}
      <div
        ref={(el) => {
          statCardsRef.current[0] = el;
        }}
        className="absolute -top-4 -right-4 rounded-xl border border-white/10 bg-dark-200/90 backdrop-blur-md px-4 py-3 opacity-0"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
            <span className="text-secondary text-lg">✅</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold">{toBanglaNumber(85)}%</p>
            <p className="text-white/40 text-[10px]">সঠিক উত্তর</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* ██  Floating Stat Card 2 — Bottom Left   */}
      {/* ══════════════════════════════════════════ */}
      <div
        ref={(el) => {
          statCardsRef.current[1] = el;
        }}
        className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-dark-200/90 backdrop-blur-md px-4 py-3 opacity-0"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-lg">🏆</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold">#{toBanglaNumber(12)}</p>
            <p className="text-white/40 text-[10px]">লিডারবোর্ড</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* ██  Floating Stat Card 3 — Middle Left   */}
      {/* ══════════════════════════════════════════ */}
      <div
        ref={(el) => {
          statCardsRef.current[2] = el;
        }}
        className="absolute top-1/3 -left-8 rounded-xl border border-white/10 bg-dark-200/90 backdrop-blur-md px-4 py-3 opacity-0 hidden lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent text-lg">🔥</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold">{toBanglaNumber(7)} দিন</p>
            <p className="text-white/40 text-[10px]">ধারাবাহিক</p>
          </div>
        </div>
      </div>
    </div>
  );
}
