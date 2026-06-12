"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { TEAM_MEMBERS } from "@/constants";

export default function TeamSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#F8FAFC] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `radial-gradient(circle, #1E9CD715 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Orbs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
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
            <HiSparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">আমাদের টিম</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            পরিচিত হোন আমাদের{" "}
            <span className="bg-linear-to-r from-amber-500 to-primary bg-clip-text text-transparent">
              টিমের সাথে
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
            অভিজ্ঞ শিক্ষক, BCS ক্যাডার এবং টেকনোলজি বিশেষজ্ঞদের নিয়ে গঠিত আমাদের টিম। প্রত্যেকেই
            তাদের ক্ষেত্রে দক্ষ ও নিবেদিতপ্রাণ।
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
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
                style={{ backgroundColor: member.color }}
              />

              {/* Card */}
              <div className="relative h-full p-8 bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden transition-all duration-300 group-hover:border-primary/25 group-hover:shadow-xl group-hover:shadow-primary/8">
                {/* Top Color Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
                  }}
                />

                {/* Decorative Corner */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-8"
                  style={{ backgroundColor: member.color }}
                />

                {/* Avatar */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)`,
                    boxShadow: `0 8px 32px ${member.color}35`,
                  }}
                >
                  {member.avatar}

                  {/* Pulse Ring */}
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-15"
                    style={{ backgroundColor: member.color }}
                  />
                </motion.div>

                {/* Name — Bangla Only */}
                <h3 className="text-xl font-bold text-[#1F2937] text-center mb-3">{member.name}</h3>

                {/* Role Badge */}
                <div className="flex justify-center mb-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${member.color}15`,
                      color: member.color,
                      border: `1px solid ${member.color}35`,
                    }}
                  >
                    {member.role}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-[#64748B] text-sm text-center leading-relaxed mb-6 min-h-20">
                  {member.bio}
                </p>

                {/* Divider */}
                <div className="h-px bg-[#E2E8F0] mb-4" />

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-3">
                  <motion.a
                    href={member.social?.facebook || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </motion.a>

                  <motion.a
                    href={member.social?.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-t-full transition-all duration-500 group-hover:w-full"
                  style={{
                    width: "30%",
                    background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm">
            {/* Text */}
            <div className="text-left">
              <p className="text-[#1F2937] font-bold text-base sm:text-lg">
                আমাদের টিমে যোগ দিতে চান?
              </p>
              <p className="text-[#64748B] text-sm">আমরা সব সময় ট্যালেন্টেড মানুষ খুঁজছি</p>
            </div>

            {/* Button */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-linear-to-r from-primary to-[#0A5A8A] text-white font-bold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-200"
            >
              আবেদন করুন →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
