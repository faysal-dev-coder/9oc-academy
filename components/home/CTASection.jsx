// components/home/CTASection.jsx
// ═══════════════════════════════════════
// 🎯 Premium CTA Section (Light Theme)
// ═══════════════════════════════════════

"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";

export default function CTASection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden bg-[#F8FAFC]">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Top subtle divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#E2E8F0] to-transparent" />

        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-secondary/5" />

        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-float-delayed" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center opacity-0"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <span className="text-lg">🚀</span>
          <span className="text-sm font-semibold text-primary">আজই শুরু করুন</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] mb-6 leading-tight">
          আপনার সরকারি চাকরির স্বপ্ন
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">
            পূরণ করুন আজই
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg text-[#475569] mb-10 max-w-2xl mx-auto leading-relaxed">
          <span className="text-secondary font-bold">৫০,০০০+</span> শিক্ষার্থী ইতিমধ্যে তাদের
          প্রস্তুতি শুরু করেছে।
          <br className="hidden sm:block" />
          আপনি কি পিছিয়ে থাকবেন?
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button — Premium */}
          <Link
            href="/register"
            className="group relative px-10 py-4 rounded-xl font-bold text-base text-white
              bg-linear-to-r from-primary via-primary to-primary/90
              shadow-xl shadow-primary/40 overflow-hidden
              transition-all duration-300 hover:shadow-2xl hover:shadow-primary/60
              hover:-translate-y-1 hover:scale-[1.02]
              border border-white/20"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-lg">🚀</span>
              <span>ফ্রি রেজিস্ট্রেশন করুন</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {/* Shine effect */}
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
          </Link>

          {/* Secondary Button — Light Outline */}
          <Link
            href="/courses"
            className="px-10 py-4 rounded-xl font-semibold text-[#475569]
              border border-[#E2E8F0] bg-white shadow-sm
              hover:border-primary/40 hover:bg-primary/5 hover:text-primary
              transition-all duration-300
              hover:-translate-y-1"
          >
            কোর্স দেখুন
          </Link>
        </div>

        {/* Trust Note */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <span className="text-secondary font-bold">✓</span>
            <span>কোনো ক্রেডিট কার্ড লাগবে না</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-secondary font-bold">✓</span>
            <span>সম্পূর্ণ ফ্রি শুরু করুন</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-secondary font-bold">✓</span>
            <span>যেকোনো সময় বাতিল করুন</span>
          </span>
        </div>
      </div>
    </section>
  );
}
