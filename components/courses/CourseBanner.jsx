"use client";

import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineStar, HiOutlineBookOpen } from "react-icons/hi2";

// ═══════════════════════════════════════════
// 🎬 CourseBanner — Courses Page Hero
// ═══════════════════════════════════════════

export default function CourseBanner({ totalCourses = 0 }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-linear-to-b from-primary/10 via-dark to-dark py-16 md:py-24">
      {/* ─── Background Decoration ───────── */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* ─── Grid Pattern ────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ─── Content ─────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-sm"
        >
          <HiOutlineSparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold text-accent">বাংলাদেশের সেরা কোর্স কালেকশন</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
        >
          আপনার পছন্দের{" "}
          <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            কোর্স খুঁজুন
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-base text-white/70 md:text-lg"
        >
          BCS, ব্যাংক জব, NTRCA, প্রাইমারি শিক্ষক — সব প্রস্তুতির জন্য একই জায়গায়। বিশেষজ্ঞ
          শিক্ষকদের দ্বারা তৈরি প্রিমিয়াম কোর্স।
        </motion.p>

        {/* Stats Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6"
        >
          {/* Total Courses */}
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm">
            <HiOutlineBookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-white">{totalCourses}+ কোর্স</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-sm">
            <HiOutlineStar className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-white">৪.৮ গড় রেটিং</span>
          </div>

          {/* Students */}
          <div className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-base">👥</span>
            <span className="text-sm font-semibold text-white">৫০,০০০+ শিক্ষার্থী</span>
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Fade ─────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-dark to-transparent" />
    </section>
  );
}
