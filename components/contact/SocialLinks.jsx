"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaYoutube,
  FaTelegramPlane,
  FaWhatsapp,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { HiSparkles, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { CONTACT_SOCIAL_LINKS, COMPANY_INFO } from "@/constants";

// Icon Map
const ICON_MAP = {
  facebook: FaFacebookF,
  youtube: FaYoutube,
  telegram: FaTelegramPlane,
  whatsapp: FaWhatsapp,
};

export default function SocialLinks() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-dark via-primary/5 to-dark" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full">
            <HiSparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">সোশ্যাল মিডিয়া</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            আমাদের সাথে{" "}
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              যুক্ত থাকুন
            </span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            নিয়মিত আপডেট, ফ্রি কুইজ এবং বিশেষ অফার পেতে আমাদের সোশ্যাল মিডিয়ায় ফলো করুন।
          </p>
        </motion.div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {CONTACT_SOCIAL_LINKS.map((social, index) => {
            const Icon = ICON_MAP[social.icon] || FaFacebookF;

            return (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative block"
              >
                {/* Glow on Hover */}
                <div
                  className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: social.color }}
                />

                {/* Card */}
                <div className="relative h-full p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-white/20">
                  {/* Top Color Border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${social.color}, transparent)`,
                    }}
                  />

                  {/* Big Decorative Icon (Background) */}
                  <div
                    className="absolute -top-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{ color: social.color }}
                  >
                    <Icon className="w-32 h-32" />
                  </div>

                  {/* External Link Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <HiArrowTopRightOnSquare className="w-4 h-4" style={{ color: social.color }} />
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: `${social.color}20`,
                      border: `1px solid ${social.color}40`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: social.color }} />

                    {/* Pulse Ring */}
                    <span
                      className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                      style={{ backgroundColor: social.color }}
                    />
                  </motion.div>

                  {/* Platform Name */}
                  <h3 className="text-lg font-bold text-white mb-1">{social.name}</h3>

                  {/* Description */}
                  <p className="text-xs text-white/50 mb-4 leading-relaxed">{social.description}</p>

                  {/* Followers Count */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <div
                        className="text-2xl font-bold leading-none"
                        style={{ color: social.color }}
                      >
                        {social.followers}
                      </div>
                      <div className="text-xs text-white/40 mt-1">{social.label}</div>
                    </div>

                    {/* Follow Badge */}
                    <div
                      className="px-3 py-1.5 rounded-full text-xs font-bold transition-all group-hover:scale-110"
                      style={{
                        backgroundColor: `${social.color}20`,
                        color: social.color,
                        border: `1px solid ${social.color}40`,
                      }}
                    >
                      Follow →
                    </div>
                  </div>

                  {/* Bottom Accent Line (Hover Expand) */}
                  <div
                    className="absolute bottom-0 left-0 h-1 rounded-tr-full transition-all duration-500 group-hover:w-full"
                    style={{
                      width: "20%",
                      background: `linear-gradient(90deg, ${social.color}, transparent)`,
                    }}
                  />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════ */}
        {/* MAP SECTION (Placeholder)              */}
        {/* ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative group">
            {/* Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Map Container */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              {/* Map Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 border border-primary/40 rounded-xl flex items-center justify-center">
                    <FaMapMarkedAlt className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">আমাদের অবস্থান</h3>
                    <p className="text-xs text-white/50">{COMPANY_INFO.address}</p>
                  </div>
                </div>

                {/* Get Directions Button */}
                <motion.a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    COMPANY_INFO.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 text-primary text-xs font-bold rounded-full hover:bg-primary/30 transition-colors"
                >
                  <span>দিকনির্দেশনা</span>
                  <HiArrowTopRightOnSquare className="w-3 h-3" />
                </motion.a>
              </div>

              {/* Map Placeholder (Beautiful Gradient + Pin) */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-linear-to-br from-primary/10 via-dark to-secondary/10">
                {/* Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(rgba(108,99,255,0.2) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(108,99,255,0.2) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Decorative Roads (Lines) */}
                <div className="absolute top-1/3 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute top-2/3 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-linear-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 bottom-0 right-1/3 w-1 bg-linear-to-b from-transparent via-white/10 to-transparent" />

                {/* Center Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    {/* Pulse Ring */}
                    <span className="absolute -inset-4 bg-primary/30 rounded-full animate-ping" />
                    <span className="absolute -inset-2 bg-primary/40 rounded-full animate-ping" />

                    {/* Pin */}
                    <div className="relative w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50">
                      <FaMapMarkedAlt className="w-8 h-8 text-white" />
                    </div>

                    {/* Pin Tail (Triangle) — Inline Style for Pixel Accuracy */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
                      style={{
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderTop: "15px solid #00D4AA",
                      }}
                    />
                  </motion.div>

                  {/* Location Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-full mt-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="px-4 py-2 bg-dark/80 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl">
                      <p className="text-sm font-bold text-white">9OC Academy</p>
                      <p className="text-xs text-white/60">মিরপুর-১০, ঢাকা</p>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Decorative Dots (Other Places) */}
                {[
                  { top: "20%", left: "25%", color: "#00D4AA" },
                  { top: "75%", left: "20%", color: "#FFB800" },
                  { top: "30%", right: "20%", color: "#FF6B6B" },
                  { top: "70%", right: "25%", color: "#A855F7" },
                ].map((dot, i) => (
                  <motion.div
                    key={i}
                    style={{
                      top: dot.top,
                      left: dot.left,
                      right: dot.right,
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                    className="absolute w-3 h-3 rounded-full"
                  >
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: dot.color }}
                    />
                    <span
                      className="absolute -inset-1 rounded-full animate-ping opacity-50"
                      style={{ backgroundColor: dot.color }}
                    />
                  </motion.div>
                ))}

                {/* Overlay Notice */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:w-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark/80 backdrop-blur-md border border-white/20 rounded-full text-xs">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-white/80">বিস্তারিত ম্যাপ শীঘ্রই যোগ হবে</span>
                  </div>
                </div>
              </div>

              {/* Map Footer (Mobile Get Directions) */}
              <div className="p-4 border-t border-white/10 sm:hidden">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    COMPANY_INFO.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary/20 border border-primary/40 text-primary text-sm font-bold rounded-xl hover:bg-primary/30 transition-colors"
                >
                  <FaMapMarkedAlt className="w-4 h-4" />
                  <span>Google Maps এ দিকনির্দেশনা</span>
                  <HiArrowTopRightOnSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Total Followers Count */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-md border border-white/10 rounded-2xl">
            <span className="text-2xl">🎉</span>
            <p className="text-white/80 text-sm sm:text-base">
              মোট{" "}
              <span className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                ৫৫,০০০+
              </span>{" "}
              ফলোয়ার সব প্ল্যাটফর্ম মিলিয়ে
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
