"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import { FaRocket, FaCheckCircle, FaUsers, FaStar, FaShieldAlt } from "react-icons/fa";

const TRUST_ITEMS = [
  { id: 1, icon: FaCheckCircle, text: "১০০% ফ্রি ট্রায়াল" },
  { id: 2, icon: FaShieldAlt, text: "কোনো ক্রেডিট কার্ড লাগবে না" },
  { id: 3, icon: FaStar, text: "৪.৯/৫ রেটিং" },
];

export default function AboutCTA() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-dark to-secondary/30" />

        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-150 h-150 bg-primary/30 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-150 h-150 bg-secondary/30 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-dark/40" />
      </div>

      {/* Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative p-8 sm:p-12 md:p-16 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden"
          >
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent" />

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

            {/* Floating Sparkles */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-8 right-8 text-accent text-3xl"
            >
              ✨
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 left-8 text-primary text-3xl"
            >
              🚀
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 mb-6 bg-linear-to-r from-accent/20 to-primary/20 backdrop-blur-md border border-accent/30 rounded-full"
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
                <span className="text-sm font-bold text-white">বিশেষ অফার চলছে</span>
                <span className="px-2 py-0.5 bg-accent text-dark text-xs font-bold rounded-full">
                  HOT 🔥
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                আপনার স্বপ্নের চাকরির
                <br />
                <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  জার্নি শুরু করুন আজই!
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                ৫০,০০০+ শিক্ষার্থীর সাথে যুক্ত হন। আমাদের AI-powered শেখার প্ল্যাটফর্মে সম্পূর্ণ
                বিনামূল্যে কোর্স শুরু করুন।
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
              >
                {/* Primary Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-full shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-shadow overflow-hidden"
                  >
                    {/* Shimmer Effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent" />

                    <FaRocket className="w-5 h-5" />
                    <span className="relative z-10">ফ্রি শুরু করুন</span>
                    <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Secondary Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/courses"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/20 hover:border-white/40 transition-all"
                  >
                    <span>সব কোর্স দেখুন</span>
                    <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8"
              >
                {TRUST_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-center gap-2 text-white/70 text-sm">
                      <Icon className="w-4 h-4 text-secondary" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center justify-center gap-3 pt-6 border-t border-white/10"
              >
                <div className="flex -space-x-2">
                  <span className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-full border-2 border-dark flex items-center justify-center text-sm text-white font-bold">
                    👨
                  </span>
                  <span className="w-10 h-10 bg-linear-to-br from-secondary to-accent rounded-full border-2 border-dark flex items-center justify-center text-sm text-white font-bold">
                    👩
                  </span>
                  <span className="w-10 h-10 bg-linear-to-br from-accent to-primary rounded-full border-2 border-dark flex items-center justify-center text-sm text-white font-bold">
                    👨
                  </span>
                  <span className="w-10 h-10 bg-primary rounded-full border-2 border-dark flex items-center justify-center text-xs text-white font-bold">
                    ৫০K+
                  </span>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1 text-accent">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="w-3 h-3" />
                    ))}
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm mt-1">
                    <span className="text-white font-bold">৫০,০০০+</span> শিক্ষার্থী আমাদের ভরসা
                    করেন
                  </p>
                </div>
              </motion.div>

              {/* Bonus Note */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full"
              >
                <FaUsers className="w-4 h-4 text-accent" />
                <span className="text-xs sm:text-sm text-accent font-medium">
                  🎁 আজই সাইন আপ করলে পাবেন ফ্রি Welcome Bonus!
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
