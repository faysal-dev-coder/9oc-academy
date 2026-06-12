"use client";

import { motion } from "framer-motion";
import {
  HiMapPin,
  HiPhone,
  HiEnvelope,
  HiLifebuoy,
  HiSparkles,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";
import { CONTACT_INFO_CARDS } from "@/constants";

// Icon Map
const ICON_MAP = {
  location: HiMapPin,
  phone: HiPhone,
  email: HiEnvelope,
  support: HiLifebuoy,
};

export default function ContactInfo() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#F8FAFC] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `radial-gradient(circle, #05966915 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[#059669]/8 border border-[#059669]/20 rounded-full">
            <HiSparkles className="w-4 h-4 text-[#059669]" />
            <span className="text-sm font-medium text-[#059669]">যোগাযোগের তথ্য</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
            আমাদের{" "}
            <span className="bg-linear-to-r from-[#059669] to-primary bg-clip-text text-transparent">
              ঠিকানা
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
            যেকোনো প্রয়োজনে নিচের যেকোনো মাধ্যমে আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন।
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {CONTACT_INFO_CARDS.map((info, index) => {
            const Icon = ICON_MAP[info.icon] || HiEnvelope;
            const isClickable = info.action !== null;

            const CardWrapper = isClickable ? motion.a : motion.div;
            const wrapperProps = isClickable ? { href: info.action } : {};

            return (
              <CardWrapper
                key={info.id}
                {...wrapperProps}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className={`group relative block ${isClickable ? "cursor-pointer" : ""}`}
              >
                {/* Hover Glow */}
                <div
                  className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                  style={{ backgroundColor: info.color }}
                />

                {/* Card */}
                <div className="relative h-full p-6 bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden transition-all duration-300 group-hover:border-primary/25 group-hover:shadow-lg group-hover:shadow-primary/8">
                  {/* Top Color Border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${info.color}, transparent)`,
                    }}
                  />

                  {/* Decorative Corner Glow */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-8 group-hover:opacity-15 transition-opacity"
                    style={{ backgroundColor: info.color }}
                  />

                  {/* External Link Icon */}
                  {isClickable && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <HiArrowTopRightOnSquare className="w-4 h-4" style={{ color: info.color }} />
                    </div>
                  )}

                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: `${info.color}12`,
                      border: `1px solid ${info.color}30`,
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: info.color }} />

                    {/* Pulse Ring */}
                    <span
                      className="absolute inset-0 rounded-2xl animate-ping opacity-15"
                      style={{ backgroundColor: info.color }}
                    />
                  </motion.div>

                  {/* Title (Bangla) */}
                  <h3 className="text-lg font-bold text-[#1F2937] mb-1">{info.title}</h3>

                  {/* Title (English) */}
                  <p className="text-xs text-[#94A3B8] mb-4 font-medium uppercase tracking-wider">
                    {info.titleEn}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-[#E2E8F0] mb-4" />

                  {/* Value */}
                  <p
                    className="text-sm leading-relaxed wrap-break-word font-medium"
                    style={{ color: info.color }}
                  >
                    {info.value}
                  </p>

                  {/* Bottom Accent Line */}
                  <div
                    className="absolute bottom-0 left-0 h-1 rounded-tr-full transition-all duration-500 group-hover:w-full"
                    style={{
                      width: "20%",
                      background: `linear-gradient(90deg, ${info.color}, transparent)`,
                    }}
                  />
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Bottom Note — Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-[#E2E8F0] rounded-full shadow-sm">
            {/* Online Status */}
            <span className="flex items-center gap-2 text-[#475569] text-sm">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
              </span>
              <span className="font-medium">এখনই উপলব্ধ</span>
            </span>

            {/* Divider */}
            <span className="h-4 w-px bg-[#E2E8F0]" />

            {/* Response Time */}
            <span className="text-sm text-[#64748B]">
              গড় রেসপন্স টাইম: <span className="text-amber-600 font-bold">২ ঘণ্টা</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
