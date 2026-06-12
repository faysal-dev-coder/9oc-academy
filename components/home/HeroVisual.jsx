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

  const mcqOptions = useMemo(
    () => [
      { letter: "ক", text: "৪ নভেম্বর ১৯৭২", status: "correct" },
      { letter: "খ", text: "১৬ ডিসেম্বর ১৯৭২", status: "wrong" },
      { letter: "গ", text: "২৬ মার্চ ১৯৭১", status: "default" },
      { letter: "ঘ", text: "১৭ এপ্রিল ১৯৭১", status: "default" },
    ],
    []
  );

  // Entrance Animation
  useEffect(() => {
    const mcqCard = mcqCardRef.current;
    const statCardElements = statCardsRef.current;
    if (!mcqCard) return;

    const tl = gsap.timeline({ delay: 1 });
    tl.fromTo(
      mcqCard,
      { opacity: 0, scale: 0.8, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" }
    );
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

  // Floating Animation
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

  // Progress Bar Animation
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
    <div ref={containerRef} className="relative mx-auto w-full max-w-lg lg:mx-0">
      {/* ══════════════════════════════════════════ */}
      {/* ██  MCQ Card Preview — Light             */}
      {/* ══════════════════════════════════════════ */}
      <div
        ref={mcqCardRef}
        className="relative rounded-2xl border border-[#E2E8F0] bg-white p-6 opacity-0 shadow-xl"
        style={{
          boxShadow: "0 20px 50px -12px rgba(30, 156, 215, 0.15)",
        }}
      >
        {/* ── Card Header ── */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Question Icon Box */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{
                backgroundImage: "linear-gradient(135deg, #1E9CD7, #0A5A8A)",
              }}
            >
              Q
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1F2937]">বাংলাদেশ বিষয়াবলি</p>
              <p className="text-xs text-[#64748B]">
                প্রশ্ন {toBanglaNumber(15)}/{toBanglaNumber(50)}
              </p>
            </div>
          </div>

          {/* Timer Badge */}
          <div className="flex items-center gap-1 rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10 px-3 py-1">
            <span className="text-xs font-bold text-[#D97706]">
              ⏱ {toBanglaNumber(24)}:{toBanglaNumber(35)}
            </span>
          </div>
        </div>

        {/* ── Question Text ── */}
        <div className="mb-4">
          <p className="text-sm font-medium leading-relaxed text-[#1F2937]">
            বাংলাদেশের সংবিধান কত তারিখে গণপরিষদে গৃহীত হয়?
          </p>
        </div>

        {/* ── Options List ── */}
        <div className="space-y-2">
          {mcqOptions.map((option, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
                option.status === "correct"
                  ? "border-[#059669]/40 bg-[#059669]/8"
                  : option.status === "wrong"
                    ? "border-[#DC2626]/40 bg-[#DC2626]/8"
                    : "border-[#E2E8F0] bg-[#F8FAFC]"
              }`}
            >
              {/* Option Letter */}
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                  option.status === "correct"
                    ? "bg-[#059669]/15 text-[#059669]"
                    : option.status === "wrong"
                      ? "bg-[#DC2626]/15 text-[#DC2626]"
                      : "bg-[#E2E8F0] text-[#64748B]"
                }`}
              >
                {option.letter}
              </span>

              {/* Option Text */}
              <span
                className={`flex-1 text-sm ${
                  option.status === "correct"
                    ? "font-medium text-[#059669]"
                    : option.status === "wrong"
                      ? "font-medium text-[#DC2626]"
                      : "text-[#475569]"
                }`}
              >
                {option.text}
              </span>

              {/* Status Icon */}
              {option.status === "correct" && <HiCheckCircle className="h-5 w-5 text-[#059669]" />}
              {option.status === "wrong" && <HiXCircle className="h-5 w-5 text-[#DC2626]" />}
            </div>
          ))}
        </div>

        {/* ── Progress Bar ── */}
        <div className="mt-4 border-t border-[#E2E8F0] pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-[#64748B]">অগ্রগতি</span>
            <span className="text-xs font-bold text-[#059669]">{toBanglaNumber(78)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
            <div
              ref={progressRef}
              className="h-full rounded-full"
              style={{
                backgroundImage: "linear-gradient(90deg, #1E9CD7, #059669)",
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
        className="absolute -right-4 -top-4 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 opacity-0 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#059669]/15">
            <span className="text-lg">✅</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1F2937]">{toBanglaNumber(85)}%</p>
            <p className="text-[10px] text-[#64748B]">সঠিক উত্তর</p>
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
        className="absolute -bottom-4 -left-4 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 opacity-0 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E9CD7]/15">
            <span className="text-lg">🏆</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1F2937]">#{toBanglaNumber(12)}</p>
            <p className="text-[10px] text-[#64748B]">লিডারবোর্ড</p>
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
        className="absolute -left-8 top-1/3 hidden rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 opacity-0 shadow-lg lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FBBF24]/15">
            <span className="text-lg">🔥</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1F2937]">{toBanglaNumber(7)} দিন</p>
            <p className="text-[10px] text-[#64748B]">ধারাবাহিক</p>
          </div>
        </div>
      </div>
    </div>
  );
}
