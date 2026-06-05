"use client";

import { motion } from "framer-motion";
import { HiOutlineCheck, HiOutlineXMark, HiOutlineSparkles } from "react-icons/hi2";
import { PRICING_PLANS } from "@/constants";

// ═══════════════════════════════════════════
// 💎 PricingSection — 3 Plans Side by Side
// ═══════════════════════════════════════════

const toBangla = (num) => {
  const d = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((c) => (/[0-9]/.test(c) ? d[Number(c)] : c))
    .join("");
};

// ─── Pricing Card ─────────────────────────
function PricingCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className={`group relative flex flex-col rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 ${
        plan.isPopular
          ? "border-primary/50 bg-linear-to-b from-primary/20 to-primary/5 shadow-2xl shadow-primary/20 md:scale-105"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      {/* ─── Popular Badge ────────────────── */}
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full bg-linear-to-r from-primary to-secondary px-4 py-1.5 shadow-lg shadow-primary/40">
            <HiOutlineSparkles className="h-4 w-4 text-white" />
            <span className="text-xs font-bold text-white">সবচেয়ে জনপ্রিয়</span>
          </div>
        </div>
      )}

      {/* ─── Plan Name ───────────────────── */}
      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
        <p className="text-sm text-white/60">{plan.description}</p>
      </div>

      {/* ─── Price ───────────────────────── */}
      <div className="mb-6 border-b border-white/10 pb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-white">৳{toBangla(plan.price)}</span>
          {plan.price > 0 && <span className="text-sm text-white/60">/{plan.period}</span>}
        </div>
        {plan.price === 0 && <p className="mt-2 text-sm text-secondary">চিরকাল ফ্রি ✨</p>}
      </div>

      {/* ─── Features List ───────────────── */}
      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            {feature.included ? (
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ background: `${plan.color}30` }}
              >
                <HiOutlineCheck className="h-3.5 w-3.5" style={{ color: plan.color }} />
              </span>
            ) : (
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5">
                <HiOutlineXMark className="h-3.5 w-3.5 text-white/30" />
              </span>
            )}
            <span
              className={`text-sm ${
                feature.included ? "text-white/90" : "text-white/40 line-through"
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* ─── CTA Button ──────────────────── */}
      <button
        type="button"
        className={`w-full rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 cursor-pointer ${
          plan.isPopular
            ? "bg-linear-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50"
            : "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
        }`}
      >
        {plan.price === 0 ? "ফ্রি শুরু করুন" : "এখনই শুরু করুন"}
      </button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-dark py-20">
      {/* ─── Background Decoration ───────── */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-sm">
            <HiOutlineSparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              সাশ্রয়ী মূল্যে প্রিমিয়াম শিক্ষা
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            আপনার{" "}
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              প্ল্যান বেছে নিন
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
            যেকোনো প্ল্যান, যেকোনো সময় বাতিল করুন। কোনো লুকানো চার্জ নেই। সব প্ল্যানে ৭ দিনের মানি
            ব্যাক গ্যারান্টি।
          </p>
        </motion.div>

        {/* ─── Plans Grid ──────────────────── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* ─── Bottom Trust Badges ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
        >
          {["৭ দিনের মানি ব্যাক গ্যারান্টি", "যেকোনো সময় বাতিল করুন", "২৪/৭ সাপোর্ট"].map(
            (text, i) => (
              <div key={i} className="flex items-center gap-2">
                <HiOutlineCheck className="h-5 w-5 text-secondary" />
                <span>{text}</span>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
