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

// Color Cycle
const COLORS = [
  "#6C63FF", // Primary
  "#00D4AA", // Secondary
  "#FFB800", // Accent
  "#FF6B6B", // Red
  "#A855F7", // Purple
];

export default function JourneyTimeline() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-dark via-primary/5 to-dark" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-secondary/10 border border-secondary/20 rounded-full">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-secondary">আমাদের যাত্রা</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            আমাদের{" "}
            <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
              জার্নি
            </span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            ২০২৩ থেকে আজ পর্যন্ত আমাদের অর্জন ও মাইলস্টোনগুলো দেখুন। প্রতিটা পদক্ষেপ আমাদের
            শিক্ষার্থীদের সাফল্যের জন্য।
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-linear-to-b from-transparent via-primary/30 to-transparent" />

          {/* Left Line (Mobile) */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-primary/30 to-transparent" />

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

                    {/* Right Side Placeholder */}
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
                    {/* Center Icon */}
                    <div className="relative shrink-0 z-10">
                      <CenterIcon Icon={Icon} color={color} highlight={item.highlight} />
                    </div>

                    {/* Card */}
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
            <div className="flex items-center gap-3 px-6 py-3 bg-linear-to-r from-primary/20 to-secondary/20 backdrop-blur-md border border-primary/30 rounded-full">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm font-bold text-white">আরও অনেক কিছু আসছে...</span>
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
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
      {/* Pulse Ring (Highlight only) */}
      {highlight && (
        <>
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: color }}
          />
          <span
            className="absolute -inset-2 rounded-full blur-md opacity-50"
            style={{ backgroundColor: color }}
          />
        </>
      )}

      {/* Icon Container */}
      <div
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 border-dark"
        style={{
          backgroundColor: `${color}20`,
          borderColor: highlight ? color : `${color}50`,
          boxShadow: highlight ? `0 0 30px ${color}50` : "none",
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
      className="group relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/20 transition-all"
      style={{
        boxShadow: `0 0 0 1px ${color}10`,
      }}
    >
      {/* Top Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />

      {/* Arrow Pointer (Desktop) */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white/5 border-white/10 ${
          isRightAlign ? "-right-2 border-r border-t" : "-left-2 border-l border-b"
        }`}
      />

      {/* Badges Wrapper (Year + Highlight) */}
      <div
        className={`flex flex-wrap items-center gap-2 mb-3 ${isRightAlign ? "md:justify-end" : ""}`}
      >
        {/* Year + Month Badge */}
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            backgroundColor: `${color}20`,
            color: color,
            border: `1px solid ${color}40`,
          }}
        >
          <span>{item.year}</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-50" />
          <span>{item.month}</span>
        </span>

        {/* Highlight Badge */}
        {item.highlight && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-accent/20 text-accent border border-accent/30">
            <span>⭐</span>
            <span>মাইলস্টোন</span>
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`text-xl sm:text-2xl font-bold text-white mb-2 ${
          isRightAlign ? "md:text-right" : ""
        }`}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        className={`text-white/70 text-sm sm:text-base leading-relaxed ${
          isRightAlign ? "md:text-right" : ""
        }`}
      >
        {item.description}
      </p>

      {/* Bottom Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
        style={{ backgroundColor: `${color}10` }}
      />
    </motion.div>
  );
}
