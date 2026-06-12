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

    gsap.fromTo(
      badge,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.3,
      }
    );

    gsap.to(dot, {
      scale: 1.5,
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      gsap.killTweensOf(badge);
      gsap.killTweensOf(dot);
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1E9CD7]/20 bg-[#1E9CD7]/8 px-4 py-2 opacity-0 backdrop-blur-sm"
    >
      {/* ── Live Pulsing Dot ── */}
      <span className="relative flex items-center justify-center">
        <span ref={dotRef} className="absolute h-3 w-3 rounded-full bg-[#059669]" />
        <span className="relative h-2 w-2 rounded-full bg-[#059669]" />
      </span>

      {/* ── Badge Text ── */}
      <span className="text-sm font-medium text-[#1F2937]">
        🏆 বাংলাদেশের <span className="font-bold text-[#1E9CD7]">#১</span> MCQ পরীক্ষা প্ল্যাটফর্ম
      </span>
    </div>
  );
}
