"use client";

import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi2";
import { FaBullseye, FaEye } from "react-icons/fa";
import { MISSION_VISION } from "@/constants";

// Icon Map
const ICON_MAP = {
  target: FaBullseye,
  eye: FaEye,
};

// Color Map (Tailwind v4 — Direct Color Values)
const COLOR_MAP = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    hex: "#6C63FF",
    gradient: "from-primary/20 via-primary/5 to-transparent",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    text: "text-secondary",
    hex: "#00D4AA",
    gradient: "from-secondary/20 via-secondary/5 to-transparent",
  },
};

export default function MissionVision() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">আমাদের লক্ষ্য</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            মিশন ও{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              ভিশন
            </span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            আমরা স্বপ্ন দেখি বাংলাদেশের প্রতিটি শিক্ষার্থীর সফলতার। আমাদের লক্ষ্য ও পরিকল্পনা জানুন।
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {MISSION_VISION.map((item, index) => {
            const Icon = ICON_MAP[item.icon];
            const colors = COLOR_MAP[item.color];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-linear-to-r ${colors.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Card */}
                <div
                  className={`relative h-full p-8 sm:p-10 bg-white/5 backdrop-blur-md border ${colors.border} rounded-3xl overflow-hidden transition-all duration-500`}
                >
                  {/* Top Gradient Border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${colors.hex}, transparent)`,
                    }}
                  />

                  {/* Decorative Corner Pattern */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full blur-2xl"
                    style={{ backgroundColor: colors.hex }}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-20 h-20 ${colors.bg} ${colors.border} border rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-10 h-10 ${colors.text}`} style={{ color: colors.hex }} />

                    {/* Pulse Ring */}
                    <span
                      className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                      style={{ backgroundColor: colors.hex }}
                    />
                  </motion.div>

                  {/* Subtitle */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-sm font-bold uppercase tracking-wider ${colors.text}`}
                      style={{ color: colors.hex }}
                    >
                      {item.subtitle}
                    </span>
                    <span className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{item.title}</h3>

                  {/* Description */}
                  <p className="text-white/70 text-base leading-relaxed mb-6">{item.description}</p>

                  {/* Points */}
                  <ul className="space-y-3">
                    {item.points.map((point, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + idx * 0.1,
                        }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div
                          className={`shrink-0 w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform`}
                        >
                          <HiCheckCircle className="w-5 h-5" style={{ color: colors.hex }} />
                        </div>
                        <span className="text-white/80 text-sm sm:text-base leading-relaxed">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Bottom Accent Line */}
                  <div
                    className="absolute bottom-0 left-0 h-1 rounded-b-3xl transition-all duration-500 group-hover:w-full"
                    style={{
                      width: "30%",
                      background: `linear-gradient(90deg, ${colors.hex}, transparent)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <span className="flex -space-x-2">
              <span className="w-8 h-8 bg-primary rounded-full border-2 border-dark flex items-center justify-center text-xs text-white">
                ৫০K+
              </span>
              <span className="w-8 h-8 bg-secondary rounded-full border-2 border-dark flex items-center justify-center text-xs text-white">
                👥
              </span>
              <span className="w-8 h-8 bg-accent rounded-full border-2 border-dark flex items-center justify-center text-xs text-dark">
                🏆
              </span>
            </span>
            <span className="text-sm text-white/70">
              <span className="text-white font-bold">৫০,০০০+</span> শিক্ষার্থী আমাদের সাথে যুক্ত
              আছেন
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
