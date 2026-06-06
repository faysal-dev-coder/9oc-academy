"use client";

import { motion } from "framer-motion";
import { HiSparkles, HiArrowDown } from "react-icons/hi2";
import { FaGraduationCap, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { COMPANY_INFO } from "@/constants";

const QUICK_STATS = [
  {
    id: 1,
    icon: FaCalendarAlt,
    value: COMPANY_INFO.founded,
    label: "প্রতিষ্ঠিত",
    color: "#6C63FF",
  },
  {
    id: 2,
    icon: FaUsers,
    value: "৫০,০০০+",
    label: "শিক্ষার্থী",
    color: "#00D4AA",
  },
  {
    id: 3,
    icon: FaGraduationCap,
    value: "১,২০০+",
    label: "সফল চাকরি",
    color: "#FFB800",
  },
];

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-24 pb-16">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-linear-to-br from-dark via-primary/10 to-dark" />

        {/* Floating Orb 1 */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
        />

        {/* Floating Orb 2 */}
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"
        />

        {/* Floating Orb 3 */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/10 rounded-full blur-3xl"
        />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(108,99,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(108,99,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-dark/50 via-transparent to-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/5 backdrop-blur-md border border-primary/30 rounded-full"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <HiSparkles className="w-5 h-5 text-accent" />
            </motion.div>
            <span className="text-sm font-medium text-white">আমাদের সম্পর্কে জানুন</span>
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full">
              About Us
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white mb-2">বাংলাদেশের প্রথম</span>
            <span className="block bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI-Powered শিক্ষা প্ল্যাটফর্ম
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {COMPANY_INFO.description}
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto"
          >
            {QUICK_STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.1,
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-primary/50 transition-all"
                >
                  {/* Hover Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity -z-10"
                    style={{ backgroundColor: `${stat.color}30` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      border: `1px solid ${stat.color}40`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: stat.color }} />
                  </div>

                  {/* Number */}
                  <div
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-sm text-white/60 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2 text-white/50"
            >
              <span className="text-xs font-medium uppercase tracking-wider">স্ক্রল করুন</span>
              <HiArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
