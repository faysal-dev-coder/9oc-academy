"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { TEAM_MEMBERS } from "@/constants";

export default function TeamSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-accent/10 border border-accent/20 rounded-full">
            <HiSparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">আমাদের টিম</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            পরিচিত হোন আমাদের{" "}
            <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
              টিমের সাথে
            </span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
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
              {/* Glow on Hover */}
              <div
                className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: member.color }}
              />

              {/* Card */}
              <div className="relative h-full p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-white/20">
                {/* Top Color Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
                  }}
                />

                {/* Decorative Circle */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20"
                  style={{ backgroundColor: member.color }}
                />

                {/* Avatar */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${member.color}, ${member.color}aa)`,
                    boxShadow: `0 10px 40px ${member.color}40`,
                  }}
                >
                  {member.avatar}

                  {/* Pulse Ring */}
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ backgroundColor: member.color }}
                  />
                </motion.div>

                {/* Name (Bangla) */}
                <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>

                {/* Name (English) */}
                <p className="text-xs text-white/40 text-center mb-3 font-medium">
                  {member.nameEn}
                </p>

                {/* Role Badge */}
                <div className="flex justify-center mb-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${member.color}20`,
                      color: member.color,
                      border: `1px solid ${member.color}40`,
                    }}
                  >
                    {member.role}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-white/60 text-sm text-center leading-relaxed mb-6 min-h-20">
                  {member.bio}
                </p>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-4" />

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-3">
                  <motion.a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </motion.a>

                  <motion.a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Bottom Accent Line (Hover Expand) */}
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <div className="text-left">
              <p className="text-white font-bold text-base sm:text-lg">আমাদের টিমে যোগ দিতে চান?</p>
              <p className="text-white/60 text-sm">আমরা সব সময় ট্যালেন্টেড মানুষ খুঁজছি</p>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition-shadow"
            >
              আবেদন করুন →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
