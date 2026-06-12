// components/home/CategoriesSection.jsx
// ═══════════════════════════════════════════════════════════════
// 📚 Premium Categories with Scroll Animation — Light Theme
// Phase 6B+ — Chat 23
// ├── White cards with colored hover gradient
// ├── Pulsing dot indicator
// ├── Scroll-triggered animations
// └── Mobile responsive grid
// ═══════════════════════════════════════════════════════════════

"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// ─── Category Card ───
function CategoryCard({ emoji, name, count, gradient, accentColor, index }) {
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
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#1E9CD7]/30 hover:shadow-xl"
        style={{
          // CSS variable for hover shadow
          "--accent-color": accentColor,
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Emoji */}
          <div className="mb-4 inline-block text-4xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125">
            {emoji}
          </div>

          {/* Name */}
          <h3 className="mb-2 text-lg font-bold text-[#1F2937]">{name}</h3>

          {/* Count */}
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: accentColor }}
            />
            <span className="text-sm text-[#64748B] transition-colors group-hover:text-[#475569]">
              {count}
            </span>
          </div>
        </div>
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
        gradient: "from-[#1E9CD7]/15 via-[#1E9CD7]/5 to-transparent",
        accentColor: "#1E9CD7",
      },
      {
        emoji: "🏦",
        name: "ব্যাংক জব",
        count: "২,৮০০+ প্রশ্ন",
        gradient: "from-[#059669]/15 via-[#059669]/5 to-transparent",
        accentColor: "#059669",
      },
      {
        emoji: "📚",
        name: "NTRCA শিক্ষক নিবন্ধন",
        count: "১,৫০০+ প্রশ্ন",
        gradient: "from-[#FBBF24]/15 via-[#FBBF24]/5 to-transparent",
        accentColor: "#D97706",
      },
      {
        emoji: "🎓",
        name: "প্রাইমারি শিক্ষক",
        count: "২,০০০+ প্রশ্ন",
        gradient: "from-pink-500/15 via-pink-500/5 to-transparent",
        accentColor: "#EC4899",
      },
      {
        emoji: "📋",
        name: "নন-ক্যাডার",
        count: "১,২০০+ প্রশ্ন",
        gradient: "from-cyan-500/15 via-cyan-500/5 to-transparent",
        accentColor: "#06B6D4",
      },
    ],
    []
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20 md:py-24">
      {/* Background — Subtle */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-[#E2E8F0] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#E2E8F0] to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E9CD7]/4 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10 px-4 py-2">
            <span className="text-lg">📚</span>
            <span className="text-sm font-medium text-[#D97706]">পরীক্ষার ক্যাটাগরি</span>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-[#1F2937] md:text-4xl lg:text-5xl">
            আপনার{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #D97706, #1E9CD7)",
              }}
            >
              লক্ষ্য বেছে নিন
            </span>
          </h2>

          <div
            className="mx-auto mb-6 h-1 w-24 rounded-full"
            style={{
              backgroundImage: "linear-gradient(90deg, #FBBF24, #1E9CD7, #059669)",
            }}
          />

          <p className="mx-auto max-w-2xl text-lg text-[#64748B]">
            সরকারি চাকরির প্রতিটি ক্যাটাগরির জন্য আলাদা প্রস্তুতি নিন
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <CategoryCard key={index} index={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
