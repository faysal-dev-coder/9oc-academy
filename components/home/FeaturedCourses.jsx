"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineFire } from "react-icons/hi2";
import { COURSES } from "@/constants";
import CourseCard from "@/components/courses/CourseCard";
import SectionTitle from "@/components/shared/SectionTitle";

// ═══════════════════════════════════════════
// 🏠 FeaturedCourses — Homepage Section
// ═══════════════════════════════════════════

export default function FeaturedCourses() {
  // ─── Featured + Popular Top 6 ────────────
  const featuredCourses = useMemo(() => {
    // First: Featured courses, then fill with Popular if needed
    const featured = COURSES.filter((c) => c.isFeatured);
    const popular = COURSES.filter((c) => c.isPopular && !c.isFeatured);

    const combined = [...featured, ...popular];
    return combined.slice(0, 6);
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-dark py-20 md:py-28">
      {/* ─── Background Decoration ───────── */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* ─── Grid Pattern ────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
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
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
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
            className="group flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-primary/80 px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50"
          >
            <span>সব কোর্স দেখুন</span>
            <HiOutlineArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <p className="text-sm text-white/40">১২+ কোর্স প্রস্তুত আছে আপনার জন্য</p>
        </motion.div>
      </div>
    </section>
  );
}
