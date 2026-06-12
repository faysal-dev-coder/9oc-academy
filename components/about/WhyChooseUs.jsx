"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaSyncAlt,
  FaStopwatch,
  FaChartLine,
  FaWallet,
  FaHeadset,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { WHY_CHOOSE_US } from "@/constants";

// Icon Map
const ICON_MAP = {
  academic: FaGraduationCap,
  refresh: FaSyncAlt,
  timer: FaStopwatch,
  chart: FaChartLine,
  wallet: FaWallet,
  support: FaHeadset,
};

// Brand Color Cycle — Light Theme
const COLORS = [
  "#1E9CD7", // Brand Blue
  "#059669", // Brand Green
  "#D97706", // Brand Amber
  "#DC2626", // Brand Red
  "#7C3AED", // Purple
  "#EA580C", // Orange
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#F8FAFC] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-[#F8FAFC] to-[#F0F9FF]" />

        {/* Center Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl" />

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #1E9CD715 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/8 border border-primary/20 rounded-full">
            <HiSparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">কেন আমাদের বেছে নিবেন</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            আমাদের{" "}
            <span className="bg-linear-to-r from-primary via-[#0A5A8A] to-amber-500 bg-clip-text text-transparent">
              বিশেষত্ব
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
            ৫০,০০০+ শিক্ষার্থীর আস্থা ও ভালোবাসায় আমরা পৌঁছেছি এখানে। জানুন কেন আমরা সেরা পরীক্ষা
            প্রস্তুতি প্ল্যাটফর্ম।
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {WHY_CHOOSE_US.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon] || FaGraduationCap;
            const color = COLORS[index % COLORS.length];

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Hover Glow */}
                <div
                  className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                  style={{ backgroundColor: color }}
                />

                {/* Card */}
                <div className="relative h-full p-7 bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden transition-all duration-300 group-hover:border-primary/25 group-hover:shadow-lg group-hover:shadow-primary/8">
                  {/* Top Right Decoration */}
                  <div
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl opacity-8 group-hover:opacity-15 transition-opacity"
                    style={{ backgroundColor: color }}
                  />

                  {/* Header — Icon + Stat */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Icon Circle */}
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${color}15`,
                        border: `1px solid ${color}35`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: color }} />

                      {/* Glow Behind Icon */}
                      <span
                        className="absolute inset-0 rounded-2xl blur-md opacity-20 group-hover:opacity-35 transition-opacity -z-10"
                        style={{ backgroundColor: color }}
                      />
                    </motion.div>

                    {/* Stat */}
                    <div className="text-right">
                      <div
                        className="text-3xl sm:text-4xl font-bold leading-none"
                        style={{ color: color }}
                      >
                        {feature.stat}
                      </div>
                      <div className="text-xs text-[#94A3B8] mt-1 font-medium">
                        {feature.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#1F2937] mb-3">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-[#64748B] text-sm leading-relaxed group-hover:text-[#475569] transition-colors">
                    {feature.description}
                  </p>

                  {/* Bottom Accent Line (Hover Expand) */}
                  <div
                    className="absolute bottom-0 left-0 h-1 rounded-tr-full transition-all duration-500 group-hover:w-full"
                    style={{
                      width: "20%",
                      background: `linear-gradient(90deg, ${color}, transparent)`,
                    }}
                  />

                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 opacity-20 group-hover:opacity-70 transition-opacity">
                    <span className="text-xs font-bold" style={{ color: color }}>
                      0{feature.id}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
            {/* Stat 1 */}
            <div className="text-center p-6 border-r border-[#E2E8F0]">
              <div className="text-2xl sm:text-3xl font-bold text-primary">৫০K+</div>
              <div className="text-xs text-[#64748B] mt-1 font-medium">শিক্ষার্থী</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center p-6 sm:border-r border-[#E2E8F0]">
              <div className="text-2xl sm:text-3xl font-bold text-[#059669]">৯৮%</div>
              <div className="text-xs text-[#64748B] mt-1 font-medium">সন্তুষ্টি</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center p-6 border-r border-t sm:border-t-0 border-[#E2E8F0]">
              <div className="text-2xl sm:text-3xl font-bold text-[#D97706]">১,২০০+</div>
              <div className="text-xs text-[#64748B] mt-1 font-medium">চাকরি</div>
            </div>

            {/* Stat 4 */}
            <div className="text-center p-6 border-t sm:border-t-0 border-[#E2E8F0]">
              <div className="text-2xl sm:text-3xl font-bold text-[#DC2626]">২৪/৭</div>
              <div className="text-xs text-[#64748B] mt-1 font-medium">সাপোর্ট</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
