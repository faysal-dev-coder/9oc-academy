// components/home/FeaturesSection.jsx
// ═══════════════════════════════════════════════════════════════
// ✨ Features Section — CSS Animations, Lucide Icons
// Chat 49 Rebuild — No GSAP, No hi2, Brand Colors
// ═══════════════════════════════════════════════════════════════

"use client";

import { useMemo } from "react";
import {
  GraduationCap,
  Smartphone,
  BarChart3,
  Lightbulb,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

// ─── Color Variants (5 colors max!) ───
const variantClasses = {
  brand: {
    iconBg: "bg-brand-800/10",
    iconColor: "text-brand-800",
    border: "hover:border-brand-800/30",
    badge: "bg-brand-800/5",
    arrow: "text-brand-800",
  },
  emerald: {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    border: "hover:border-emerald-500/30",
    badge: "bg-emerald-500/5",
    arrow: "text-emerald-600",
  },
  amber: {
    iconBg: "bg-amber-400/10",
    iconColor: "text-amber-600",
    border: "hover:border-amber-400/30",
    badge: "bg-amber-400/5",
    arrow: "text-amber-600",
  },
  slate: {
    iconBg: "bg-slate-200",
    iconColor: "text-slate-600",
    border: "hover:border-slate-400/30",
    badge: "bg-slate-100",
    arrow: "text-slate-600",
  },
  red: {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600",
    border: "hover:border-red-500/30",
    badge: "bg-red-500/5",
    arrow: "text-red-600",
  },
};

// ─── Single Feature Card ───
function FeatureCard({ icon: Icon, title, description, variant, delay }) {
  const colors = variantClasses[variant] || variantClasses.brand;

  return (
    <div
      className={`
        group relative bg-white rounded-xl border border-slate-200 p-8
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg ${colors.border}
        animate-in fade-in slide-in-from-bottom-6 duration-700
      `}
      style={{ animationDelay: delay }}
    >
      {/* Corner Decoration */}
      <div
        className={`
          absolute top-0 right-0 w-16 h-16 rounded-bl-3xl rounded-tr-xl
          ${colors.badge} opacity-60 transition-opacity duration-300
          group-hover:opacity-100
        `}
      />

      {/* Icon */}
      <div
        className={`
          mb-6 inline-flex h-14 w-14 items-center justify-center
          rounded-xl ${colors.iconBg}
          transition-transform duration-300
          group-hover:scale-110 group-hover:rotate-3
        `}
      >
        <Icon size={24} className={colors.iconColor} />
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-slate-800 transition-colors">{title}</h3>

      {/* Description */}
      <p className="leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors">
        {description}
      </p>

      {/* Arrow CTA */}
      <div
        className={`
          mt-6 inline-flex items-center gap-2 text-sm font-medium
          opacity-0 translate-y-2 transition-all duration-300
          group-hover:opacity-100 group-hover:translate-y-0
          ${colors.arrow}
        `}
      >
        <span>আরো জানুন</span>
        <ArrowRight
          size={16}
          className="transition-transform duration-150 group-hover:translate-x-1"
        />
      </div>
    </div>
  );
}

// ─── Main Features Section ───
export default function FeaturesSection() {
  const features = useMemo(
    () => [
      {
        icon: GraduationCap,
        title: "BCS বিশেষায়িত প্রস্তুতি",
        description:
          "BCS প্রিলি, রিটেন এবং ভাইভা — সবকিছুর জন্য আলাদা আলাদা MCQ সেট এবং মডেল টেস্ট।",
        variant: "brand",
        delay: "0ms",
      },
      {
        icon: Smartphone,
        title: "মোবাইল ফ্রেন্ডলি",
        description:
          "যেকোনো ডিভাইসে পরীক্ষা দিন — মোবাইল, ট্যাবলেট বা কম্পিউটার। সব জায়গায় একই অভিজ্ঞতা।",
        variant: "emerald",
        delay: "100ms",
      },
      {
        icon: BarChart3,
        title: "বিস্তারিত বিশ্লেষণ",
        description:
          "প্রতিটি পরীক্ষার পর বিস্তারিত রিপোর্ট — কোন বিষয়ে দুর্বল, কোথায় উন্নতি দরকার।",
        variant: "amber",
        delay: "200ms",
      },
      {
        icon: Lightbulb,
        title: "স্মার্ট প্রশ্ন ব্যাংক",
        description: "বিগত বছরের প্রশ্ন, সাজেশন এবং AI-ভিত্তিক প্রশ্ন — সব একজায়গায়।",
        variant: "slate",
        delay: "300ms",
      },
      {
        icon: ShieldCheck,
        title: "সার্টিফিকেট প্রদান",
        description: "কোর্স শেষ করলে ডিজিটাল সার্টিফিকেট পাবেন যা আপনার CV তে যোগ করতে পারবেন।",
        variant: "emerald",
        delay: "400ms",
      },
      {
        icon: Clock,
        title: "লাইভ পরীক্ষা সিস্টেম",
        description:
          "নির্দিষ্ট সময়ে লাইভ পরীক্ষা দিন, রিয়েল টাইম র‍্যাংকিং দেখুন এবং প্রতিযোগিতা করুন।",
        variant: "brand",
        delay: "500ms",
      },
    ],
    []
  );

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 md:py-32">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-brand-800/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header — inline (SectionTitle pattern) */}
        <div className="mb-16 text-center">
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-md
              bg-emerald-500/10 border border-emerald-500/20 mb-6
              animate-in fade-in slide-in-from-bottom-4 duration-500
            "
          >
            <span className="text-base">✨</span>
            <span className="text-sm font-medium text-emerald-600">কেন আমাদের বেছে নিবেন</span>
          </div>

          <h2
            className="
              text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4
              animate-in fade-in slide-in-from-bottom-5 duration-600 delay-100
            "
          >
            যা আমাদের{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-brand-800">
              আলাদা করে
            </span>
          </h2>

          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-linear-to-r from-emerald-500 via-brand-800 to-amber-400 animate-in fade-in duration-500 delay-200" />

          <p className="mx-auto max-w-2xl text-lg text-slate-500 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            আধুনিক প্রযুক্তি আর অভিজ্ঞ শিক্ষকদের সমন্বয়ে তৈরি একটি অনন্য প্ল্যাটফর্ম
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
