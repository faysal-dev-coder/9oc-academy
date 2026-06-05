// components/home/StatsSection.jsx
// ═══════════════════════════════════════
// 📊 Premium Stats with Counter Animation
// (Updated: All 3 Issues Fixed)
// ├── Issue #1: Decimal support (4.9 শো করবে)
// ├── Issue #2: Number + Suffix inline (/৫ break হবে না)
// └── Issue #3: Bangla Numbers (৫০,০০০+)
// ═══════════════════════════════════════

"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineStar,
} from "react-icons/hi";

// ─── Single Stat Card ───
function StatCard({ icon: Icon, value, suffix, label, color, delay }) {
  const cardRef = useRef(null);
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: delay,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ✅ FIX #1: Number counter animation with decimal support
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: value,
        duration: 2.5,
        delay: delay + 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          // Decimal number হলে .toFixed(1), otherwise Math.floor()
          const isDecimal = value % 1 !== 0;
          setDisplayNumber(
            isDecimal ? parseFloat(counterObj.val.toFixed(1)) : Math.floor(counterObj.val)
          );
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [value, delay]);

  // Color mapping
  const colorClasses = useMemo(() => {
    const colors = {
      primary: {
        bg: "bg-primary/10",
        border: "border-primary/20",
        icon: "text-primary",
        glow: "shadow-primary/20",
        gradient: "from-primary/20 to-transparent",
      },
      secondary: {
        bg: "bg-secondary/10",
        border: "border-secondary/20",
        icon: "text-secondary",
        glow: "shadow-secondary/20",
        gradient: "from-secondary/20 to-transparent",
      },
      accent: {
        bg: "bg-accent/10",
        border: "border-accent/20",
        icon: "text-accent",
        glow: "shadow-accent/20",
        gradient: "from-accent/20 to-transparent",
      },
      pink: {
        bg: "bg-pink-500/10",
        border: "border-pink-500/20",
        icon: "text-pink-400",
        glow: "shadow-pink-500/20",
        gradient: "from-pink-500/20 to-transparent",
      },
    };
    return colors[color] || colors.primary;
  }, [color]);

  // ✅ FIX #3: Format number with English → Bangla conversion
  const formattedNumber = useMemo(() => {
    // English digits → Bangla digits converter
    const toBangla = (num) => {
      const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return num
        .toString()
        .split("")
        .map((char) => {
          // "," এবং "." অপরিবর্তিত রাখো
          if (char === "," || char === ".") return char;
          // Digit হলে Bangla তে convert করো
          const digit = parseInt(char);
          return isNaN(digit) ? char : banglaDigits[digit];
        })
        .join("");
    };

    // Decimal number কিনা check
    const isDecimal = value % 1 !== 0;
    const displayValue = isDecimal
      ? displayNumber.toFixed(1)
      : displayNumber.toLocaleString("en-US");

    return toBangla(displayValue);
  }, [displayNumber, value]);

  return (
    <div ref={cardRef} className="group relative opacity-0">
      {/* Glow effect behind card */}
      <div
        className={`absolute -inset-1 rounded-2xl bg-linear-to-b ${colorClasses.gradient}
          opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
      />

      {/* Card */}
      <div
        className={`relative p-8 rounded-2xl border ${colorClasses.border}
          bg-white/5 backdrop-blur-sm
          hover:bg-white/10 transition-all duration-500
          hover:border-opacity-50 hover:shadow-lg ${colorClasses.glow}
          hover:-translate-y-2`}
      >
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-xl
            ${colorClasses.bg} mb-5 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`text-3xl ${colorClasses.icon}`} />
        </div>

        {/* ✅ FIX #2: Number + Suffix Inline (no break) */}
        <div className="mb-2 flex items-baseline flex-wrap">
          <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">
            {formattedNumber}
          </span>
          <span className={`text-2xl md:text-3xl font-bold ${colorClasses.icon} ml-1`}>
            {suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-white/50 text-sm font-medium uppercase tracking-wider">{label}</p>

        {/* Bottom corner decoration */}
        <div
          className={`absolute bottom-3 right-3 w-8 h-8 rounded-lg ${colorClasses.bg}
            opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
        />
      </div>
    </div>
  );
}

// ─── Main Stats Section ───
export default function StatsSection() {
  const sectionRef = useRef(null);

  const stats = useMemo(
    () => [
      {
        icon: HiOutlineUsers,
        value: 50000,
        suffix: "+",
        label: "সক্রিয় শিক্ষার্থী",
        color: "primary",
        delay: 0,
      },
      {
        icon: HiOutlineDocumentText,
        value: 10000,
        suffix: "+",
        label: "MCQ প্রশ্ন",
        color: "secondary",
        delay: 0.15,
      },
      {
        icon: HiOutlineCheckCircle,
        value: 95,
        suffix: "%",
        label: "পাশের হার",
        color: "accent",
        delay: 0.3,
      },
      {
        icon: HiOutlineStar,
        value: 4.9,
        suffix: " /৫",
        label: "গড় রেটিং",
        color: "pink",
        delay: 0.45,
      },
    ],
    []
  );

  return (
    <section ref={sectionRef} className="relative py-20 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(108,99,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108,99,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            আমাদের{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              সাফল্যের গল্প
            </span>
          </h2>
          <div className="h-1 w-24 mx-auto rounded-full bg-linear-to-r from-primary via-secondary to-accent mb-6" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            সংখ্যা নিজেই কথা বলে — আমাদের প্ল্যাটফর্মের সাফল্য
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
