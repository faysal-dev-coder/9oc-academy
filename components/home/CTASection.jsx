// components/home/CTASection.jsx
// ═══════════════════════════════════════════════════════════════
// 🎯 CTA Section — CSS Animations, Brand Colors
// Chat 49 Rebuild — No GSAP, No animate-float, Tailwind v4
// ═══════════════════════════════════════════════════════════════

import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 md:py-24">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        {/* Soft gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-brand-800/5 via-transparent to-emerald-500/5" />

        {/* Floating orbs — animate-pulse instead of animate-float */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-800/10 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div
        className="
          relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center
          animate-in fade-in slide-in-from-bottom-8 duration-700
        "
      >
        {/* Badge */}
        <div
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-md
            bg-brand-800/10 border border-brand-800/20 mb-8
          "
        >
          <Rocket size={16} className="text-brand-800 shrink-0" />
          <span className="text-sm font-semibold text-brand-800">আজই শুরু করুন</span>
        </div>

        {/* Title */}
        <h2
          className="
            text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800
            mb-6 leading-tight
            animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100
          "
        >
          আপনার সরকারি চাকরির স্বপ্ন
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-800 via-brand-700 to-emerald-600">
            পূরণ করুন আজই
          </span>
        </h2>

        {/* Description */}
        <p
          className="
            text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed
            animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200
          "
        >
          <span className="text-emerald-600 font-bold">৫০,০০০+</span> শিক্ষার্থী ইতিমধ্যে তাদের
          প্রস্তুতি শুরু করেছে।
          <br className="hidden sm:block" />
          আপনি কি পিছিয়ে থাকবেন?
        </p>

        {/* CTA Buttons */}
        <div
          className="
            flex flex-col sm:flex-row items-center justify-center gap-4
            animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300
          "
        >
          {/* Primary Button */}
          <Link
            href="/register"
            className="
              group relative px-10 py-4 rounded-lg font-bold text-base text-white
              bg-linear-to-r from-brand-800 to-brand-700
              shadow-lg shadow-brand-800/30 overflow-hidden
              transition-all duration-300
              hover:shadow-xl hover:shadow-brand-800/40
              hover:-translate-y-0.5
              border border-brand-700/20
            "
          >
            {/* Shine effect */}
            <span
              className="
                absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent
                -translate-x-full group-hover:translate-x-full
                transition-transform duration-700
              "
            />
            <span className="relative z-10 flex items-center gap-3">
              <Rocket size={18} className="shrink-0" />
              <span>ফ্রি রেজিস্ট্রেশন করুন</span>
              <ArrowRight
                size={18}
                className="shrink-0 transition-transform duration-150 group-hover:translate-x-1"
              />
            </span>
          </Link>

          {/* Secondary Button */}
          <Link
            href="/courses"
            className="
              px-10 py-4 rounded-lg font-semibold text-slate-600
              border border-slate-200 bg-white shadow-sm
              hover:border-brand-800/40 hover:bg-brand-800/5 hover:text-brand-800
              transition-all duration-300 hover:-translate-y-0.5
            "
          >
            কোর্স দেখুন
          </Link>
        </div>

        {/* Trust Notes */}
        <div
          className="
            mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2
            text-sm text-slate-500
            animate-in fade-in duration-700 delay-500
          "
        >
          {["কোনো ক্রেডিট কার্ড লাগবে না", "সম্পূর্ণ ফ্রি শুরু করুন", "যেকোনো সময় বাতিল করুন"].map(
            (note) => (
              <span key={note} className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{note}</span>
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
