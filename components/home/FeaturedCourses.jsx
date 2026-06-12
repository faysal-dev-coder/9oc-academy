// components/home/FeaturedCourses.jsx
// ═══════════════════════════════════════════════════════════════
// 🎓 Featured Courses — Light Theme
// Phase 6B+ — Chat 23
// ├── Light background with subtle gradients
// ├── Light grid pattern
// ├── White CTA button with primary color
// └── Section uses CourseCard (separate file)
// ═══════════════════════════════════════════════════════════════

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineFire } from "react-icons/hi2";
import { COURSES } from "@/constants";
import CourseCard from "@/components/courses/CourseCard";
import SectionTitle from "@/components/shared/SectionTitle";

export default function FeaturedCourses() {
  // ─── Featured + Popular Top 6 ────────────
  const featuredCourses = useMemo(() => {
    const featured = COURSES.filter((c) => c.isFeatured);
    const popular = COURSES.filter((c) => c.isPopular && !c.isFeatured);
    const combined = [...featured, ...popular];
    return combined.slice(0, 6);
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-[#E2E8F0] bg-white py-20 md:py-28">
      {/* ─── Background Decoration ───────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-[#059669]/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-[#1E9CD7]/8 blur-3xl" />
      </div>

      {/* ─── Light Grid Pattern ──────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30, 156, 215, 0.05) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(30, 156, 215, 0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Content ─────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════ */}
        {/* 📌 Section Title                */}
        {/* ═══════════════════════════════ */}
        <SectionTitle
          badge={
            <span className="flex items-center gap-1.5">
              <HiOutlineFire className="h-4 w-4" />
              জনপ্রিয় কোর্স
            </span>
          }
          title={
            <>
              আমাদের{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #1E9CD7, #059669, #FBBF24)",
                }}
              >
                সেরা কোর্স
              </span>
            </>
          }
          subtitle="বিশেষজ্ঞ শিক্ষকদের দ্বারা তৈরি প্রিমিয়াম কোর্স — হাজারো শিক্ষার্থীর পছন্দের"
        />

        {/* ═══════════════════════════════ */}
        {/* 🃏 Course Cards Grid            */}
        {/* ═══════════════════════════════ */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* ═══════════════════════════════ */}
        {/* 👉 View All Button              */}
        {/* ═══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <Link
            href="/courses"
            className="group flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              backgroundImage: "linear-gradient(135deg, #1E9CD7, #0A5A8A)",
              boxShadow: "0 10px 30px -10px rgba(30, 156, 215, 0.4)",
            }}
          >
            <span>সব কোর্স দেখুন</span>
            <HiOutlineArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <p className="text-sm text-[#64748B]">১২+ কোর্স প্রস্তুত আছে আপনার জন্য</p>
        </motion.div>
      </div>
    </section>
  );
}
