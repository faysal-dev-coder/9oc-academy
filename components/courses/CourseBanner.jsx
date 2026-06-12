"use client";

import { motion } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

// ═══════════════════════════════════════════
// 🎬 CourseBanner V2 — Premium Light Hero
// ═══════════════════════════════════════════

export default function CourseBanner({ totalCourses = 0 }) {
  return (
    <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-linear-to-br from-primary/10 via-white to-secondary/10 py-20 md:py-28">
      {/* ─── Animated Gradient Orbs ─────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top-Left Primary Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
        />

        {/* Bottom-Right Secondary Orb */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-secondary/30 blur-3xl"
        />

        {/* Center Accent Glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
        />
      </div>

      {/* ─── Dot Pattern Background ─────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(30,156,215,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ─── Floating Shapes ─────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top Right Sparkle */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-20 top-32 h-3 w-3 rounded-full bg-accent opacity-60"
        />
        {/* Left Sparkle */}
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-32 top-1/3 h-2 w-2 rounded-full bg-primary opacity-50"
        />
        {/* Bottom Right Sparkle */}
        <motion.div
          animate={{ y: [-15, 5, -15], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-40 bottom-32 h-4 w-4 rounded-full bg-secondary opacity-40"
        />
      </div>

      {/* ─── Content ─────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-2.5 shadow-md shadow-amber-200/30"
        >
          <HiOutlineSparkles className="h-4 w-4 text-amber-500" />
          <span className="bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-sm font-bold text-transparent">
            বাংলাদেশের সেরা কোর্স কালেকশন
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-extrabold leading-tight text-[#1F2937] md:text-5xl lg:text-6xl"
        >
          আপনার পছন্দের{" "}
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              কোর্স খুঁজুন
            </span>
            {/* Underline accent */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-linear-to-r from-primary via-secondary to-accent opacity-30"
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[#475569] md:text-lg"
        >
          BCS, ব্যাংক জব, NTRCA, প্রাইমারি শিক্ষক — সব প্রস্তুতির জন্য একই জায়গায়। বিশেষজ্ঞ
          শিক্ষকদের দ্বারা তৈরি প্রিমিয়াম কোর্স।
        </motion.p>

        {/* Stats Pills — Premium Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Total Courses */}
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex items-center gap-2.5 rounded-full border border-primary/20 bg-white px-5 py-3 shadow-lg shadow-primary/10 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <HiOutlineBookOpen className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-bold text-[#1F2937]">{totalCourses}+ কোর্স</span>
          </motion.div>

          {/* Rating */}
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex items-center gap-2.5 rounded-full border border-amber-200 bg-white px-5 py-3 shadow-lg shadow-amber-200/30 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-200/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors">
              <HiOutlineStar className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-sm font-bold text-[#1F2937]">৪.৮ গড় রেটিং</span>
          </motion.div>

          {/* Students */}
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex items-center gap-2.5 rounded-full border border-secondary/20 bg-white px-5 py-3 shadow-lg shadow-secondary/10 hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/20"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
              <HiOutlineAcademicCap className="h-4 w-4 text-secondary" />
            </div>
            <span className="text-sm font-bold text-[#1F2937]">৫০,০০০+ শিক্ষার্থী</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Bottom Wave Decoration ──────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent" />
    </section>
  );
}
