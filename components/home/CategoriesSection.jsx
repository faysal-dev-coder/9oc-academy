// components/home/CategoriesSection.jsx
// ═══════════════════════════════════════
// 📚 Premium Categories with Scroll Animation
// (Updated: Clean Cards - Issue #10 Fixed)
// ═══════════════════════════════════════

"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// ─── Category Card ───
function CategoryCard({ emoji, name, count, gradient, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: "back.out(1.5)",
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

  return (
    <div ref={cardRef} className="group relative opacity-0">
      <div
        className={`relative p-6 rounded-2xl border border-white/10
          bg-white/5 backdrop-blur-sm overflow-hidden
          hover:border-white/20 hover:-translate-y-2
          transition-all duration-500 cursor-pointer`}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${gradient}
            opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Emoji */}
          <div
            className="text-4xl mb-4 group-hover:scale-125 group-hover:-rotate-12
              transition-transform duration-300 inline-block"
          >
            {emoji}
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-white mb-2">{name}</h3>

          {/* Count */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
              {count}
            </span>
          </div>
        </div>

        {/* ✅ FIX #10: Corner Decoration Removed (Clean Card) */}
      </div>
    </div>
  );
}

// ─── Main Categories Section ───
export default function CategoriesSection() {
  const sectionRef = useRef(null);

  const categories = useMemo(
    () => [
      {
        emoji: "🏛️",
        name: "BCS প্রিলিমিনারি",
        count: "৩,৫০০+ প্রশ্ন",
        gradient: "from-primary/20 via-primary/5 to-transparent",
      },
      {
        emoji: "🏦",
        name: "ব্যাংক জব",
        count: "২,৮০০+ প্রশ্ন",
        gradient: "from-secondary/20 via-secondary/5 to-transparent",
      },
      {
        emoji: "📚",
        name: "NTRCA শিক্ষক নিবন্ধন",
        count: "১,৫০০+ প্রশ্ন",
        gradient: "from-accent/20 via-accent/5 to-transparent",
      },
      {
        emoji: "🎓",
        name: "প্রাইমারি শিক্ষক",
        count: "২,০০০+ প্রশ্ন",
        gradient: "from-pink-500/20 via-pink-500/5 to-transparent",
      },
      {
        emoji: "📋",
        name: "নন-ক্যাডার",
        count: "১,২০০+ প্রশ্ন",
        gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
      },
    ],
    []
  );

  return (
    <section ref={sectionRef} className="relative py-20 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-lg">📚</span>
            <span className="text-sm font-medium text-accent">পরীক্ষার ক্যাটাগরি</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            আপনার{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-primary">
              লক্ষ্য বেছে নিন
            </span>
          </h2>
          <div className="h-1 w-24 mx-auto rounded-full bg-linear-to-r from-accent via-primary to-secondary mb-6" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            সরকারি চাকরির প্রতিটি ক্যাটাগরির জন্য আলাদা প্রস্তুতি নিন
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} index={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
