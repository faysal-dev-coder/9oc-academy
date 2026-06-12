"use client";

import { motion } from "framer-motion";
import {
  FaUsers,
  FaTrophy,
  FaFileAlt,
  FaGraduationCap,
  FaClipboardList,
  FaHeart,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { ACHIEVEMENT_STATS } from "@/constants";

// Icon Map
const ICON_MAP = {
  users: FaUsers,
  trophy: FaTrophy,
  document: FaFileAlt,
  academic: FaGraduationCap,
  clipboard: FaClipboardList,
  heart: FaHeart,
};

export default function AchievementStats() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#F8FAFC]">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-[#F8FAFC] to-[#F0F9FF]" />

        {/* Floating Orb 1 — Blue */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
        />

        {/* Floating Orb 2 — Green */}
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-[#059669]/8 rounded-full blur-3xl"
        />

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, #1E9CD718 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-amber-50 border border-amber-200 rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <HiSparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
            <span className="text-sm font-medium text-amber-700">আমাদের অর্জন</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-4">
            সংখ্যায়{" "}
            <span className="bg-linear-to-r from-primary via-[#0A5A8A] to-amber-500 bg-clip-text text-transparent">
              9OC Academy
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#475569] text-base sm:text-lg leading-relaxed">
            বছরের পর বছর শিক্ষার্থীদের সফলতা ও আস্থায় আমরা গড়ে তুলেছি এই অসাধারণ মাইলস্টোনগুলো।
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {ACHIEVEMENT_STATS.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon] || FaUsers;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative"
              >
                {/* Hover Glow */}
                <div
                  className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: stat.color }}
                />

                {/* Card */}
                <div className="relative p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/8">
                  {/* Top Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                    }}
                  />

                  {/* Decorative Corner */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: stat.color }}
                  />

                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{
                      y: -5,
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      border: `1px solid ${stat.color}35`,
                    }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: stat.color }} />

                    {/* Pulse Ring */}
                    <span
                      className="absolute inset-0 rounded-2xl animate-ping opacity-15"
                      style={{ backgroundColor: stat.color }}
                    />
                  </motion.div>

                  {/* Big Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="text-center mb-2"
                  >
                    <div
                      className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none"
                      style={{ color: stat.color }}
                    >
                      {stat.number}
                    </div>
                  </motion.div>

                  {/* Label */}
                  <div className="text-center text-[#1F2937] font-bold text-sm sm:text-base mb-1">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-center text-[#64748B] text-xs sm:text-sm">
                    {stat.description}
                  </div>

                  {/* Bottom Line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          {/* Quote Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white border border-[#E2E8F0] rounded-full shadow-sm">
            <span className="text-2xl">🎯</span>
            <span className="text-sm font-medium text-[#475569]">আমাদের লক্ষ্য আরও বড়</span>
          </div>

          {/* Quote Text */}
          <p className="text-[#475569] text-lg sm:text-xl italic leading-relaxed">
            &ldquo;প্রতিদিন আমরা স্বপ্ন দেখি — আগামী দিনে আরও হাজারো শিক্ষার্থীকে সফল করার। আপনিও
            হয়ে উঠুন আমাদের পরবর্তী সাফল্যের গল্প।&rdquo;
          </p>

          {/* Divider with name */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-primary" />
            <span className="text-primary font-bold text-sm">9OC Academy Team</span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
