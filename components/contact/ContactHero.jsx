"use client";

import { motion } from "framer-motion";
import { HiSparkles, HiArrowDown, HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const QUICK_CONTACTS = [
  {
    id: 1,
    icon: FaEnvelope,
    label: "ইমেইল",
    value: "info@9ocacademy.com",
    color: "#6C63FF",
    action: "mailto:info@9ocacademy.com",
  },
  {
    id: 2,
    icon: FaPhoneAlt,
    label: "ফোন",
    value: "+৮৮০ ১৭XX-XXXXXX",
    color: "#00D4AA",
    action: "tel:+8801XXXXXXXXX",
  },
  {
    id: 3,
    icon: FaMapMarkerAlt,
    label: "ঠিকানা",
    value: "ঢাকা, বাংলাদেশ",
    color: "#FFB800",
    action: null,
  },
];

export default function ContactHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-24 pb-16">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-linear-to-br from-dark via-secondary/10 to-dark" />

        {/* Floating Orb 1 */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"
        />

        {/* Floating Orb 2 */}
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
        />

        {/* Floating Orb 3 */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/10 rounded-full blur-3xl"
        />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,170,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,212,170,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-dark/50 via-transparent to-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/5 backdrop-blur-md border border-secondary/30 rounded-full"
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
            <span className="text-sm font-medium text-white">আমাদের সাথে যোগাযোগ করুন</span>
            <span className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs font-bold rounded-full">
              Contact
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white mb-2">আছে কোনো প্রশ্ন?</span>
            <span className="block bg-linear-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              আমরা সাহায্য করতে প্রস্তুত
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            কোর্স, পেমেন্ট, টেকনিক্যাল সমস্যা — যেকোনো বিষয়ে আমাদের সাথে যোগাযোগ করুন। আমরা ২৪
            ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।
          </motion.p>

          {/* Quick Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {QUICK_CONTACTS.map((contact, index) => {
              const Icon = contact.icon;
              const CardWrapper = contact.action ? motion.a : motion.div;
              const wrapperProps = contact.action ? { href: contact.action } : {};

              return (
                <CardWrapper
                  key={contact.id}
                  {...wrapperProps}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.1,
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-secondary/50 transition-all cursor-pointer block"
                >
                  {/* Hover Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity -z-10"
                    style={{ backgroundColor: `${contact.color}30` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${contact.color}20`,
                      border: `1px solid ${contact.color}40`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: contact.color }} />
                  </div>

                  {/* Label */}
                  <div className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">
                    {contact.label}
                  </div>

                  {/* Value */}
                  <div
                    className="text-sm sm:text-base font-bold break-all"
                    style={{ color: contact.color }}
                  >
                    {contact.value}
                  </div>
                </CardWrapper>
              );
            })}
          </motion.div>

          {/* Floating Chat Icon (Decorative) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute top-32 right-10 hidden lg:block"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-20 h-20 bg-linear-to-br from-secondary/30 to-primary/30 backdrop-blur-md border border-secondary/40 rounded-3xl flex items-center justify-center">
                <HiChatBubbleLeftRight className="w-10 h-10 text-secondary" />
              </div>
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-dark text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                ৩
              </span>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2 text-white/50"
            >
              <span className="text-xs font-medium uppercase tracking-wider">নিচে স্ক্রল করুন</span>
              <HiArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
