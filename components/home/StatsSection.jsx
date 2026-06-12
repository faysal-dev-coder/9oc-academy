// components/home/StatsSection.jsx
// ═══════════════════════════════════════════════════════════════
// 📊 Premium Stats with Counter Animation — Light Theme
// Phase 6B+ — Chat 23
// ├── Light background with subtle effects
// ├── White cards with colored shadows
// ├── Hi2 Outline icons
// ├── Bangla number support
// └── Decimal counter preserved
// ═══════════════════════════════════════════════════════════════

"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineStar,
} from "react-icons/hi2";

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

      // Number counter with decimal support
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
          const isDecimal = value % 1 !== 0;
          setDisplayNumber(
            isDecimal ? parseFloat(counterObj.val.toFixed(1)) : Math.floor(counterObj.val)
          );
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [value, delay]);

  // ✅ Color mapping — Light Theme
  const colorClasses = useMemo(() => {
    const colors = {
      primary: {
        iconBg: "bg-[#1E9CD7]/10",
        iconColor: "text-[#1E9CD7]",
        numberColor: "text-[#1E9CD7]",
        glowColor: "rgba(30, 156, 215, 0.15)",
        decoBg: "bg-[#1E9CD7]/10",
      },
      secondary: {
        iconBg: "bg-[#059669]/10",
        iconColor: "text-[#059669]",
        numberColor: "text-[#059669]",
        glowColor: "rgba(5, 150, 105, 0.15)",
        decoBg: "bg-[#059669]/10",
      },
      accent: {
        iconBg: "bg-[#FBBF24]/15",
        iconColor: "text-[#D97706]",
        numberColor: "text-[#D97706]",
        glowColor: "rgba(251, 191, 36, 0.15)",
        decoBg: "bg-[#FBBF24]/15",
      },
      pink: {
        iconBg: "bg-pink-500/10",
        iconColor: "text-pink-600",
        numberColor: "text-pink-600",
        glowColor: "rgba(236, 72, 153, 0.15)",
        decoBg: "bg-pink-500/10",
      },
    };
    return colors[color] || colors.primary;
  }, [color]);

  // ✅ Format number with English → Bangla conversion
  const formattedNumber = useMemo(() => {
    const toBangla = (num) => {
      const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return num
        .toString()
        .split("")
        .map((char) => {
          if (char === "," || char === ".") return char;
          const digit = parseInt(char);
          return isNaN(digit) ? char : banglaDigits[digit];
        })
        .join("");
    };

    const isDecimal = value % 1 !== 0;
    const displayValue = isDecimal
      ? displayNumber.toFixed(1)
      : displayNumber.toLocaleString("en-US");

    return toBangla(displayValue);
  }, [displayNumber, value]);

  return (
    <div ref={cardRef} className="group relative opacity-0">
      {/* Card */}
      <div
        className="relative rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2"
        style={{
          // Subtle hover shadow with color
          "--hover-shadow": colorClasses.glowColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 20px 40px -10px ${colorClasses.glowColor}`;
          e.currentTarget.style.borderColor = colorClasses.glowColor.replace("0.15", "0.3");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.borderColor = "";
        }}
      >
        {/* Icon */}
        <div
          className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-xl ${colorClasses.iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`text-3xl ${colorClasses.iconColor}`} />
        </div>

        {/* Number + Suffix Inline */}
        <div className="mb-2 flex flex-wrap items-baseline">
          <span className="text-4xl font-bold tabular-nums text-[#1F2937] md:text-5xl">
            {formattedNumber}
          </span>
          <span className={`ml-1 text-2xl font-bold md:text-3xl ${colorClasses.numberColor}`}>
            {suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-sm font-medium uppercase tracking-wider text-[#64748B]">{label}</p>

        {/* Bottom corner decoration */}
        <div
          className={`absolute bottom-3 right-3 h-8 w-8 rounded-lg ${colorClasses.decoBg} opacity-50 transition-opacity duration-300 group-hover:opacity-80`}
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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FAFBFC] py-20 md:py-24">
      {/* Background Effects — Subtle Light */}
      <div className="absolute inset-0">
        {/* Light Grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 156, 215, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 156, 215, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Subtle gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#1E9CD7]/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#059669]/6 blur-3xl" />

        {/* Top divider */}
        <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-[#E2E8F0] to-transparent" />
        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#E2E8F0] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1F2937] md:text-4xl lg:text-5xl">
            আমাদের{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #1E9CD7, #0A5A8A)",
              }}
            >
              সাফল্যের গল্প
            </span>
          </h2>
          <div
            className="mx-auto mb-6 h-1 w-24 rounded-full"
            style={{
              backgroundImage: "linear-gradient(90deg, #1E9CD7, #059669, #FBBF24)",
            }}
          />
          <p className="mx-auto max-w-2xl text-lg text-[#64748B]">
            সংখ্যা নিজেই কথা বলে — আমাদের প্ল্যাটফর্মের সাফল্য
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
