// components/home/FeaturesSection.jsx
// ═══════════════════════════════════════
// ✨ Premium Features with 3D Tilt + Scroll Reveal
// ═══════════════════════════════════════

"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  HiOutlineAcademicCap,
  HiOutlineDeviceMobile,
  HiOutlineChartBar,
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineClock,
} from "react-icons/hi";

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

    // Move glow
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

    // Remove transition after reset
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

  // Color mapping
  const colorClasses = useMemo(() => {
    const colors = {
      primary: {
        bg: "bg-primary/10",
        border: "border-primary/30",
        icon: "text-primary",
        glow: "bg-primary/30",
        hoverBorder: "group-hover:border-primary/50",
      },
      secondary: {
        bg: "bg-secondary/10",
        border: "border-secondary/30",
        icon: "text-secondary",
        glow: "bg-secondary/30",
        hoverBorder: "group-hover:border-secondary/50",
      },
      accent: {
        bg: "bg-accent/10",
        border: "border-accent/30",
        icon: "text-accent",
        glow: "bg-accent/30",
        hoverBorder: "group-hover:border-accent/50",
      },
      pink: {
        bg: "bg-pink-500/10",
        border: "border-pink-500/30",
        icon: "text-pink-400",
        glow: "bg-pink-400/30",
        hoverBorder: "group-hover:border-pink-500/50",
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        icon: "text-cyan-400",
        glow: "bg-cyan-400/30",
        hoverBorder: "group-hover:border-cyan-500/50",
      },
      orange: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        icon: "text-orange-400",
        glow: "bg-orange-400/30",
        hoverBorder: "group-hover:border-orange-500/50",
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
        className={`absolute w-40 h-40 ${colorClasses.glow} rounded-full
          blur-3xl opacity-0 -translate-x-1/2 -translate-y-1/2
          pointer-events-none transition-opacity duration-300 z-0`}
      />

      {/* Card body */}
      <div
        className={`relative z-10 p-8 rounded-2xl border ${colorClasses.border}
          bg-white/5 backdrop-blur-sm h-full
          ${colorClasses.hoverBorder}
          transition-colors duration-300 overflow-hidden`}
      >
        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div
            className={`absolute top-3 -right-6 w-20 h-6 rotate-45 ${colorClasses.bg} opacity-50`}
          />
        </div>

        {/* Icon container */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl
            ${colorClasses.bg} mb-6
            group-hover:scale-110 group-hover:rotate-3
            transition-all duration-300`}
        >
          <Icon className={`text-2xl ${colorClasses.icon}`} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
          {description}
        </p>

        {/* Bottom arrow */}
        <div
          className={`mt-6 inline-flex items-center gap-2 text-sm font-medium
            ${colorClasses.icon} opacity-0 group-hover:opacity-100
            translate-y-2 group-hover:translate-y-0 transition-all duration-300`}
        >
          <span>আরো জানুন</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        icon: HiOutlineDeviceMobile,
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
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <span className="text-lg">✨</span>
            <span className="text-sm font-medium text-secondary">কেন আমাদের বেছে নিবেন</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            যা আমাদের{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-primary">
              আলাদা করে
            </span>
          </h2>
          <div className="h-1 w-24 mx-auto rounded-full bg-linear-to-r from-secondary via-primary to-accent mb-6" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            আধুনিক প্রযুক্তি আর অভিজ্ঞ শিক্ষকদের সমন্বয়ে তৈরি একটি অনন্য প্ল্যাটফর্ম
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
