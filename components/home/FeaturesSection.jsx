// components/home/FeaturesSection.jsx
// ═══════════════════════════════════════════════════════════════
// ✨ Premium Features with 3D Tilt — Light Theme
// Phase 6B+ — Chat 23
// ├── White cards with colored borders
// ├── 3D tilt on mouse move
// ├── Soft glow follows cursor
// └── Hi2 Outline icons
// ═══════════════════════════════════════════════════════════════

"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  HiOutlineAcademicCap,
  HiOutlineDevicePhoneMobile,
  HiOutlineChartBar,
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineClock,
} from "react-icons/hi2";

// ─── Single Feature Card ───
function FeatureCard({ icon: Icon, title, description, color, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // 3D Tilt Effect
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glowRef.current) {
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
      glowRef.current.style.opacity = "1";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.transition = "transform 0.5s ease";

    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      if (card) card.style.transition = "none";
    }, 500);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 80,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  // ✅ Color mapping — Light Theme
  const colorClasses = useMemo(() => {
    const colors = {
      primary: {
        iconBg: "bg-[#1E9CD7]/10",
        iconColor: "text-[#1E9CD7]",
        glow: "bg-[#1E9CD7]/25",
        cornerBg: "bg-[#1E9CD7]/20",
        hoverBorder: "group-hover:border-[#1E9CD7]/40",
      },
      secondary: {
        iconBg: "bg-[#059669]/10",
        iconColor: "text-[#059669]",
        glow: "bg-[#059669]/25",
        cornerBg: "bg-[#059669]/20",
        hoverBorder: "group-hover:border-[#059669]/40",
      },
      accent: {
        iconBg: "bg-[#FBBF24]/15",
        iconColor: "text-[#D97706]",
        glow: "bg-[#FBBF24]/30",
        cornerBg: "bg-[#FBBF24]/25",
        hoverBorder: "group-hover:border-[#FBBF24]/40",
      },
      pink: {
        iconBg: "bg-pink-500/10",
        iconColor: "text-pink-600",
        glow: "bg-pink-400/25",
        cornerBg: "bg-pink-500/20",
        hoverBorder: "group-hover:border-pink-500/40",
      },
      cyan: {
        iconBg: "bg-cyan-500/10",
        iconColor: "text-cyan-600",
        glow: "bg-cyan-400/25",
        cornerBg: "bg-cyan-500/20",
        hoverBorder: "group-hover:border-cyan-500/40",
      },
      orange: {
        iconBg: "bg-orange-500/10",
        iconColor: "text-orange-600",
        glow: "bg-orange-400/25",
        cornerBg: "bg-orange-500/20",
        hoverBorder: "group-hover:border-orange-500/40",
      },
    };
    return colors[color] || colors.primary;
  }, [color]);

  return (
    <div
      ref={cardRef}
      className="group relative opacity-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Mouse follow glow */}
      <div
        ref={glowRef}
        className={`pointer-events-none absolute z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-300 ${colorClasses.glow}`}
      />

      {/* Card body */}
      <div
        className={`relative z-10 h-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg ${colorClasses.hoverBorder}`}
      >
        {/* Corner decoration */}
        <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
          <div
            className={`absolute -right-6 top-3 h-6 w-20 rotate-45 opacity-70 ${colorClasses.cornerBg}`}
          />
        </div>

        {/* Icon container */}
        <div
          className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 ${colorClasses.iconBg}`}
        >
          <Icon className={`text-2xl ${colorClasses.iconColor}`} />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-[#1F2937] transition-colors">{title}</h3>

        {/* Description */}
        <p className="leading-relaxed text-[#64748B] transition-colors group-hover:text-[#475569]">
          {description}
        </p>

        {/* Bottom arrow */}
        <div
          className={`mt-6 inline-flex translate-y-2 items-center gap-2 text-sm font-medium opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${colorClasses.iconColor}`}
        >
          <span>আরো জানুন</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Main Features Section ───
export default function FeaturesSection() {
  const sectionRef = useRef(null);

  const features = useMemo(
    () => [
      {
        icon: HiOutlineAcademicCap,
        title: "BCS বিশেষায়িত প্রস্তুতি",
        description:
          "BCS প্রিলি, রিটেন এবং ভাইভা — সবকিছুর জন্য আলাদা আলাদা MCQ সেট এবং মডেল টেস্ট।",
        color: "primary",
      },
      {
        icon: HiOutlineDevicePhoneMobile,
        title: "মোবাইল ফ্রেন্ডলি",
        description:
          "যেকোনো ডিভাইসে পরীক্ষা দিন — মোবাইল, ট্যাবলেট বা কম্পিউটার। সব জায়গায় একই অভিজ্ঞতা।",
        color: "secondary",
      },
      {
        icon: HiOutlineChartBar,
        title: "বিস্তারিত বিশ্লেষণ",
        description:
          "প্রতিটি পরীক্ষার পর বিস্তারিত রিপোর্ট — কোন বিষয়ে দুর্বল, কোথায় উন্নতি দরকার।",
        color: "accent",
      },
      {
        icon: HiOutlineLightBulb,
        title: "স্মার্ট প্রশ্ন ব্যাংক",
        description: "বিগত বছরের প্রশ্ন, সাজেশন এবং AI-ভিত্তিক প্রশ্ন — সব একজায়গায়।",
        color: "pink",
      },
      {
        icon: HiOutlineShieldCheck,
        title: "সার্টিফিকেট প্রদান",
        description: "কোর্স শেষ করলে ডিজিটাল সার্টিফিকেট পাবেন যা আপনার CV তে যোগ করতে পারবেন।",
        color: "cyan",
      },
      {
        icon: HiOutlineClock,
        title: "লাইভ পরীক্ষা সিস্টেম",
        description:
          "নির্দিষ্ট সময়ে লাইভ পরীক্ষা দিন, রিয়েল টাইম র‍্যাংকিং দেখুন এবং প্রতিযোগিতা করুন।",
        color: "orange",
      },
    ],
    []
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FAFBFC] py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-[#E2E8F0] to-transparent" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#1E9CD7]/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-0 h-72 w-72 rounded-full bg-[#059669]/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#059669]/30 bg-[#059669]/10 px-4 py-2">
            <span className="text-lg">✨</span>
            <span className="text-sm font-medium text-[#059669]">কেন আমাদের বেছে নিবেন</span>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-[#1F2937] md:text-4xl lg:text-5xl">
            যা আমাদের{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #059669, #1E9CD7)",
              }}
            >
              আলাদা করে
            </span>
          </h2>

          <div
            className="mx-auto mb-6 h-1 w-24 rounded-full"
            style={{
              backgroundImage: "linear-gradient(90deg, #059669, #1E9CD7, #FBBF24)",
            }}
          />

          <p className="mx-auto max-w-2xl text-lg text-[#64748B]">
            আধুনিক প্রযুক্তি আর অভিজ্ঞ শিক্ষকদের সমন্বয়ে তৈরি একটি অনন্য প্ল্যাটফর্ম
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
