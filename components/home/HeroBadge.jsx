"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroBadge() {
  const badgeRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const badge = badgeRef.current;
    const dot = dotRef.current;

    if (!badge || !dot) return;

    // ── Badge Entrance Animation ──
    // নিচ থেকে উপরে আসবে + Scale Up
    gsap.fromTo(
      badge,
      {
        opacity: 0,
        y: 20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.3,
      }
    );

    // ── Pulsing Dot Animation ──
    // সবুজ Dot ধীরে ধীরে বড়-ছোট হবে (Live Effect)
    gsap.to(dot, {
      scale: 1.5,
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // ── Cleanup ──
    return () => {
      gsap.killTweensOf(badge);
      gsap.killTweensOf(dot);
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 opacity-0"
    >
      {/* ── Live Pulsing Dot ── */}
      <span className="relative flex items-center justify-center">
        {/* Outer Pulsing Circle */}
        <span ref={dotRef} className="absolute w-3 h-3 rounded-full bg-secondary" />
        {/* Inner Solid Dot */}
        <span className="relative w-2 h-2 rounded-full bg-secondary" />
      </span>

      {/* ── Badge Text ── */}
      <span className="text-sm font-medium text-white/80">
        🏆 বাংলাদেশের <span className="text-secondary font-bold">#১</span> MCQ পরীক্ষা প্ল্যাটফর্ম
      </span>
    </div>
  );
}
