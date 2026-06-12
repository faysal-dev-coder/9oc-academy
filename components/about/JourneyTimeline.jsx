"use client";

import { motion } from "framer-motion";
import { FaRocket, FaUsers, FaStar, FaTrophy, FaBrain } from "react-icons/fa";
import { TIMELINE_DATA } from "@/constants";

// Icon Map
const ICON_MAP = {
  rocket: FaRocket,
  users: FaUsers,
  star: FaStar,
  trophy: FaTrophy,
  brain: FaBrain,
};

// Brand Color Cycle — Light Theme
const COLORS = [
  "#1E9CD7", // Brand Blue
  "#059669", // Brand Green
  "#D97706", // Brand Amber
  "#DC2626", // Brand Red
  "#7C3AED", // Purple
];

export default function JourneyTimeline() {
  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/4 via-white to-[#F8FAFC]" />

        {/* Orbs */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#059669]/6 rounded-full blur-3xl" />

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-25"
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
          className="text-center max-w-3xl mx-auto mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[#059669]/8 border border-[#059669]/20 rounded-full">
            <span className="w-2 h-2 bg-[#059669] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#059669]">আমাদের যাত্রা</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            আমাদের{" "}
            <span className="bg-linear-to-r from-[#059669] to-primary bg-clip-text text-transparent">
              জার্নি
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
            ২০২৩ থেকে আজ পর্যন্ত আমাদের অর্জন ও মাইলস্টোনগুলো দেখুন। প্রতিটা পদক্ষেপ আমাদের
            শিক্ষার্থীদের সাফল্যের জন্য।
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-linear-to-b from-transparent via-primary/20 to-transparent" />

          {/* Left Line (Mobile) */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-primary/20 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-20">
            {TIMELINE_DATA.map((item, index) => {
              const Icon = ICON_MAP[item.icon] || FaRocket;
              const color = COLORS[index % COLORS.length];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative"
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between gap-8">
                    {/* Left Card */}
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-5/12"
                      >
                        <TimelineCard item={item} color={color} align="right" />
                      </motion.div>
                    )}

                    {/* Right Placeholder */}
                    {!isLeft && <div className="w-5/12" />}

                    {/* Center Icon */}
                    <div className="relative shrink-0 z-10">
                      <CenterIcon Icon={Icon} color={color} highlight={item.highlight} />
                    </div>

                    {/* Right Card */}
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-5/12"
                      >
                        <TimelineCard item={item} color={color} align="left" />
                      </motion.div>
                    )}

                    {/* Left Placeholder */}
                    {isLeft && <div className="w-5/12" />}
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden flex gap-4">
                    <div className="relative shrink-0 z-10">
                      <CenterIcon Icon={Icon} color={color} highlight={item.highlight} />
                    </div>
                    <div className="flex-1">
                      <TimelineCard item={item} color={color} align="left" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* End Marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mt-12 flex justify-center"
          >
            <div className="flex items-center gap-3 px-6 py-3 bg-white border border-[#E2E8F0] rounded-full shadow-sm">
              <span className="w-2 h-2 bg-[#059669] rounded-full animate-pulse" />
              <span className="text-sm font-bold text-[#1F2937]">আরও অনেক কিছু আসছে...</span>
              <span className="w-2 h-2 bg-[#059669] rounded-full animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// Sub-Component: Center Icon (Timeline Dot)
// ═══════════════════════════════════════════

function CenterIcon({ Icon, color, highlight }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Pulse Ring — Highlight only */}
      {highlight && (
        <>
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-25"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -inset-2 rounded-full blur-md opacity-30"
            style={{ backgroundColor: color }}
          />
        </>
      )}

      {/* Icon Container */}
      <div
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 border-white"
        style={{
          backgroundColor: `${color}15`,
          borderColor: highlight ? color : `${color}40`,
          boxShadow: highlight ? `0 0 24px ${color}40` : `0 0 0 1px ${color}20`,
        }}
      >
        <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: color }} />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// Sub-Component: Timeline Card
// ═══════════════════════════════════════════

function TimelineCard({ item, color, align }) {
  const isRightAlign = align === "right";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative p-6 bg-white border border-[#E2E8F0] rounded-2xl hover:border-primary/25 hover:shadow-md hover:shadow-primary/8 transition-all duration-300"
      style={{
        boxShadow: `0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px ${color}10`,
      }}
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />

      {/* Arrow Pointer (Desktop) */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-[#E2E8F0] ${
          isRightAlign ? "-right-2 border-r border-t" : "-left-2 border-l border-b"
        }`}
      />

      {/* Badges Row */}
      <div
        className={`flex flex-wrap items-center gap-2 mb-3 ${isRightAlign ? "md:justify-end" : ""}`}
      >
        {/* Year + Month Badge */}
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            backgroundColor: `${color}12`,
            color: color,
            border: `1px solid ${color}30`,
          }}
        >
          <span>{item.year}</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-50" />
          <span>{item.month}</span>
        </span>

        {/* Highlight Badge */}
        {item.highlight && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span>⭐</span>
            <span>মাইলস্টোন</span>
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`text-xl sm:text-2xl font-bold text-[#1F2937] mb-2 ${
          isRightAlign ? "md:text-right" : ""
        }`}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        className={`text-[#475569] text-sm sm:text-base leading-relaxed ${
          isRightAlign ? "md:text-right" : ""
        }`}
      >
        {item.description}
      </p>

      {/* Hover Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
        style={{ backgroundColor: `${color}8` }}
      />
    </motion.div>
  );
}
