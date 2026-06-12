// components/shared/SectionTitle.jsx
// ═══════════════════════════════════════
// 🎬 Animated Section Title with Scroll Reveal
// ═══════════════════════════════════════

"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SectionTitle({
  badge,
  badgeIcon,
  title,
  highlightText,
  subtitle,
  center = true,
}) {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
      }

      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.3"
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`mb-16 ${center ? "text-center" : "text-left"}`}>
      {/* Badge */}
      {badge && (
        <div
          ref={badgeRef}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-primary/10 border border-primary/20 mb-6 opacity-0`}
        >
          {badgeIcon && <span className="text-lg">{badgeIcon}</span>}
          <span className="text-sm font-medium text-primary">{badge}</span>
        </div>
      )}

      {/* Title */}
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] mb-4 opacity-0"
      >
        {title}{" "}
        {highlightText && (
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
            {highlightText}
          </span>
        )}
      </h2>

      {/* Animated Underline */}
      <div className={`${center ? "mx-auto" : ""} mb-6`}>
        <div
          ref={lineRef}
          className="h-1 w-24 mx-auto rounded-full bg-linear-to-r from-primary via-secondary to-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p ref={subtitleRef} className="text-lg text-[#475569] max-w-2xl mx-auto opacity-0">
          {subtitle}
        </p>
      )}
    </div>
  );
}
