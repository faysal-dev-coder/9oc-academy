"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiClock, HiCalendarDays, HiSparkles, HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { FaHeadset, FaWhatsapp } from "react-icons/fa";
import { WORKING_HOURS } from "@/constants";

export default function WorkingHoursCard() {
  const [currentTime, setCurrentTime] = useState(null);
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  // ═══════════════════════════════════════════
  // Live Clock + Office Status
  // ═══════════════════════════════════════════

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const day = now.getDay();

      setCurrentTime(now);

      let isOpen = false;
      if (day === 5) {
        isOpen = hours >= 15 && hours < 22;
      } else {
        isOpen = hours >= 9 && hours < 22;
      }

      setIsOfficeOpen(isOpen);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // ═══════════════════════════════════════════
  // Format Bangla Time
  // ═══════════════════════════════════════════

  const formatBanglaTime = (date) => {
    if (!date) return "...";

    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const banglaDays = [
      "রবিবার",
      "সোমবার",
      "মঙ্গলবার",
      "বুধবার",
      "বৃহস্পতিবার",
      "শুক্রবার",
      "শনিবার",
    ];

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = banglaDays[date.getDay()];

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

    const timeStr = `${displayHours}:${minutes < 10 ? "0" + minutes : minutes}`;
    const banglaTime = timeStr.replace(/[0-9]/g, (d) => banglaDigits[d]);

    return { time: banglaTime, day, period };
  };

  const formatted = formatBanglaTime(currentTime);

  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-linear-to-br from-amber-50/40 via-white to-[#F8FAFC]" />
        {/* Orbs */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #D9770618 1px, transparent 1px)`,
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-amber-50 border border-amber-200 rounded-full">
            <HiSparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">অফিস সময়সূচি</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            আমাদের{" "}
            <span className="bg-linear-to-r from-amber-500 to-primary bg-clip-text text-transparent">
              কর্মঘণ্টা
            </span>
          </h2>

          <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
            আমরা সপ্তাহের প্রায় প্রতিদিন উপলব্ধ। যেকোনো সময় যোগাযোগ করুন।
          </p>
        </motion.div>

        {/* Main Container */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ═════════════════════════════════════ */}
          {/* LEFT — Working Hours List              */}
          {/* ═════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Card */}
            <div className="relative h-full p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-400 to-transparent rounded-t-3xl" />

              {/* Corner Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center"
                >
                  <HiCalendarDays className="w-7 h-7 text-amber-600" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F2937]">সাপ্তাহিক সময়সূচি</h3>
                  <p className="text-xs text-[#94A3B8]">Weekly Schedule</p>
                </div>
              </div>

              {/* Hours List */}
              <div className="space-y-3">
                {WORKING_HOURS.map((schedule, index) => (
                  <motion.div
                    key={schedule.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + index * 0.1,
                    }}
                    className={`relative p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
                      schedule.isOpen ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* Day Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {schedule.isOpen ? (
                            <HiCheckCircle className="w-4 h-4 text-[#059669] shrink-0" />
                          ) : (
                            <HiXCircle className="w-4 h-4 text-[#DC2626] shrink-0" />
                          )}
                          <h4 className="font-bold text-[#1F2937] text-sm sm:text-base">
                            {schedule.day}
                          </h4>
                        </div>
                        <p className="text-xs text-[#94A3B8] ml-6">{schedule.dayEn}</p>
                      </div>

                      {/* Time */}
                      <div className="text-right shrink-0">
                        <p
                          className={`text-sm sm:text-base font-bold ${
                            schedule.isOpen ? "text-[#059669]" : "text-[#DC2626]"
                          }`}
                        >
                          {schedule.time}
                        </p>
                        <p className="text-xs text-[#94A3B8]">{schedule.timeEn}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═════════════════════════════════════ */}
          {/* RIGHT — Live Status + Quick Contact   */}
          {/* ═════════════════════════════════════ */}
          <div className="space-y-6">
            {/* Live Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Top Border (Status Color) */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl ${
                    isOfficeOpen
                      ? "bg-linear-to-r from-transparent via-[#059669] to-transparent"
                      : "bg-linear-to-r from-transparent via-[#DC2626] to-transparent"
                  }`}
                />

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className={`relative w-4 h-4 rounded-full ${
                        isOfficeOpen ? "bg-[#059669]" : "bg-[#DC2626]"
                      }`}
                    >
                      <span
                        className={`absolute inset-0 rounded-full animate-ping ${
                          isOfficeOpen ? "bg-[#059669]" : "bg-[#DC2626]"
                        }`}
                      />
                    </motion.div>
                    <span
                      className={`text-sm font-bold uppercase tracking-wider ${
                        isOfficeOpen ? "text-[#059669]" : "text-[#DC2626]"
                      }`}
                    >
                      {isOfficeOpen ? "এখন খোলা" : "এখন বন্ধ"}
                    </span>
                  </div>

                  <HiClock className="w-6 h-6 text-[#94A3B8]" />
                </div>

                {/* Live Time Display */}
                <div className="text-center mb-6">
                  <div className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2 font-medium">
                    বর্তমান সময়
                  </div>

                  {currentTime ? (
                    <>
                      <div className="text-5xl sm:text-6xl font-bold text-[#1F2937] mb-2 font-mono">
                        {formatted.time}
                        <span className="text-2xl text-amber-600 ml-2">{formatted.period}</span>
                      </div>
                      <div className="text-base text-[#475569]">{formatted.day}</div>
                    </>
                  ) : (
                    <div className="text-2xl text-[#94A3B8]">লোড হচ্ছে...</div>
                  )}
                </div>

                {/* Status Message */}
                <div
                  className={`p-4 rounded-2xl text-center ${
                    isOfficeOpen
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      isOfficeOpen ? "text-[#047857]" : "text-[#B91C1C]"
                    }`}
                  >
                    {isOfficeOpen
                      ? "🎉 আমাদের টিম এখন আপনার সেবায় প্রস্তুত!"
                      : "😴 আমরা এখন অফলাইনে আছি, পরবর্তী কর্মদিবসে যোগাযোগ করবো।"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* Support Button */}
              <motion.a
                href="mailto:support@9ocacademy.com"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-4 bg-white border border-[#E2E8F0] rounded-2xl hover:border-primary/40 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                    <FaHeadset className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">সাপোর্ট</p>
                    <p className="text-xs text-[#64748B]">ইমেইল করুন</p>
                  </div>
                </div>
              </motion.a>

              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/8801XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-4 bg-white border border-[#E2E8F0] rounded-2xl hover:border-[#25D366]/40 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#25D366]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-[#25D366]/10 border border-[#25D366]/25 rounded-xl flex items-center justify-center">
                    <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">WhatsApp</p>
                    <p className="text-xs text-[#64748B]">চ্যাট করুন</p>
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Holiday Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
            {/* Icon */}
            <div className="shrink-0 w-10 h-10 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center">
              <span className="text-xl">📢</span>
            </div>
            {/* Text */}
            <div>
              <p className="text-sm font-bold text-amber-900 mb-1">বিশেষ ছুটির নোটিশ</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                ঈদ, পূজা ও বিশেষ সরকারি ছুটির দিনে অফিস বন্ধ থাকবে। জরুরি প্রয়োজনে ইমেইল করুন —
                আমরা ছুটি শেষে দ্রুত যোগাযোগ করবো।
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
