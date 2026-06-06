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
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Base */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-dark to-secondary/20" />

        {/* Floating Orbs */}
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
          className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />

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
          className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-dark/40" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-accent/10 border border-accent/30 rounded-full backdrop-blur-md">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <HiSparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm font-medium text-accent">আমাদের অর্জন</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            সংখ্যায়{" "}
            <span className="bg-linear-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              9OC Academy
            </span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
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
                {/* Glow on Hover */}
                <div
                  className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: stat.color }}
                />

                {/* Card */}
                <div className="relative p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/15">
                  {/* Top Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                    }}
                  />

                  {/* Decorative Corner Glow */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: stat.color }}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      y: -5,
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${stat.color}25`,
                      border: `1px solid ${stat.color}50`,
                    }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: stat.color }} />

                    {/* Pulse Ring */}
                    <span
                      className="absolute inset-0 rounded-2xl animate-ping opacity-20"
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
                  <div className="text-center text-white font-bold text-sm sm:text-base mb-1">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-center text-white/50 text-xs sm:text-sm">
                    {stat.description}
                  </div>

                  {/* Bottom Glow Effect */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)`,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <span className="text-2xl">🎯</span>
            <span className="text-sm font-medium text-white/80">আমাদের লক্ষ্য আরও বড়</span>
          </div>

          <p className="text-white/70 text-lg sm:text-xl italic leading-relaxed">
            &ldquo;প্রতিদিন আমরা স্বপ্ন দেখি — আগামী দিনে আরও হাজারো শিক্ষার্থীকে সফল করার। আপনিও
            হয়ে উঠুন আমাদের পরবর্তী সাফল্যের গল্প।&rdquo;
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-primary" />
            <span className="text-primary font-bold text-sm">9OC Academy Team</span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
