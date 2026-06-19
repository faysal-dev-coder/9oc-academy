// components/home/StatsSection.jsx
// ═══════════════════════════════════════════════════════════════
// 📊 Stats Section — Pure JS Counter, Lucide Icons
// Chat 49 Rebuild — No GSAP, No hi2, Brand Colors
// ⭐ Bangla number conversion PRESERVED!
// ═══════════════════════════════════════════════════════════════

"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Users, FileText, CheckCircle, Star } from "lucide-react";

// ─── Pure JS Bangla Counter Hook ───
function useBanglaCounter(targetValue, duration = 2000) {
  const [display, setDisplay] = useState("০");
  const startedRef = useRef(false);

  // Bangla digit converter
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

  const formatDisplay = (val) => {
    const isDecimal = targetValue % 1 !== 0;
    const displayValue = isDecimal ? val.toFixed(1) : Math.floor(val).toLocaleString("en-US");
    return toBangla(displayValue);
  };

  const startCounter = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const startVal = 0;

    const tick = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (targetValue - startVal) * eased;
      setDisplay(formatDisplay(current));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(formatDisplay(targetValue));
      }
    };

    requestAnimationFrame(tick);
  };

  return { display, startCounter };
}

// ─── Variant Styles ───
const statVariants = {
  brand: {
    iconBg: "bg-brand-800/10",
    iconColor: "text-brand-800",
    numberColor: "text-brand-800",
    cardHover: "hover:border-brand-800/30 hover:shadow-brand-800/10",
  },
  emerald: {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    numberColor: "text-emerald-600",
    cardHover: "hover:border-emerald-500/30 hover:shadow-emerald-500/10",
  },
  amber: {
    iconBg: "bg-amber-400/10",
    iconColor: "text-amber-600",
    numberColor: "text-amber-600",
    cardHover: "hover:border-amber-400/30 hover:shadow-amber-400/10",
  },
  red: {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600",
    numberColor: "text-red-600",
    cardHover: "hover:border-red-500/30 hover:shadow-red-500/10",
  },
};

// ─── Single Stat Card ───
function StatCard({ icon: Icon, value, suffix, label, variant, delay }) {
  const colors = statVariants[variant] || statVariants.brand;
  const { display, startCounter } = useBanglaCounter(value);
  const cardRef = useRef(null);
  const observerRef = useRef(null);

  // IntersectionObserver → counter শুরু হবে scroll এ!
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounter();
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observerRef.current.observe(cardRef.current);
    }

    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={cardRef}
      className="
        animate-in fade-in slide-in-from-bottom-6 duration-700
      "
      style={{ animationDelay: delay }}
    >
      <div
        className={`
          group relative rounded-xl border border-slate-200 bg-white p-8
          shadow-sm transition-all duration-300
          hover:-translate-y-2 hover:shadow-lg ${colors.cardHover}
        `}
      >
        {/* Corner Decoration */}
        <div
          className={`
            absolute bottom-3 right-3 w-8 h-8 rounded-lg
            ${colors.iconBg} opacity-50
            transition-opacity duration-300 group-hover:opacity-80
          `}
        />

        {/* Icon */}
        <div
          className={`
            mb-5 inline-flex h-16 w-16 items-center justify-center
            rounded-xl ${colors.iconBg}
            transition-transform duration-300 group-hover:scale-110
          `}
        >
          <Icon size={28} className={colors.iconColor} />
        </div>

        {/* Number + Suffix */}
        <div className="mb-2 flex flex-wrap items-baseline gap-0.5">
          <span className="text-4xl font-bold tabular-nums text-slate-800 md:text-5xl">
            {display}
          </span>
          <span className={`text-2xl font-bold md:text-3xl ${colors.numberColor}`}>{suffix}</span>
        </div>

        {/* Label */}
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">{label}</p>
      </div>
    </div>
  );
}

// ─── Main Stats Section ───
export default function StatsSection() {
  const stats = useMemo(
    () => [
      {
        icon: Users,
        value: 50000,
        suffix: "+",
        label: "সক্রিয় শিক্ষার্থী",
        variant: "brand",
        delay: "0ms",
      },
      {
        icon: FileText,
        value: 10000,
        suffix: "+",
        label: "MCQ প্রশ্ন",
        variant: "emerald",
        delay: "150ms",
      },
      {
        icon: CheckCircle,
        value: 95,
        suffix: "%",
        label: "পাশের হার",
        variant: "amber",
        delay: "300ms",
      },
      {
        icon: Star,
        value: 4.9,
        suffix: " /৫",
        label: "গড় রেটিং",
        variant: "red",
        delay: "450ms",
      },
    ],
    []
  );

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(148 163 184 / 0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full bg-brand-800/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            className="
              text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4
              animate-in fade-in slide-in-from-bottom-5 duration-600
            "
          >
            আমাদের{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-800 to-brand-700">
              সাফল্যের গল্প
            </span>
          </h2>

          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-linear-to-r from-brand-800 via-emerald-500 to-amber-400 animate-in fade-in duration-500 delay-100" />

          <p className="mx-auto max-w-2xl text-lg text-slate-500 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
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
