// components/home/FAQSection.jsx
// ═══════════════════════════════════════════════════════════════
// ❓ FAQ Section — Apple Style with Brand Color
// Phase 5 — Chat 50 Rebuild
// ├── Centered single column layout
// ├── Pill tab filters at top
// ├── Clean CSS-only accordion
// ├── Brand color (brand-800) throughout
// └── Apple-inspired aesthetic
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { FAQ_DATA, FAQ_CATEGORIES } from "@/constants";

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
    setOpenQuestionId(null);
  };

  const handleQuestionToggle = (questionId) => {
    setOpenQuestionId((prevId) => (prevId === questionId ? null : questionId));
  };

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Minimal Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-700/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">FAQ</p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            প্রায়শই জিজ্ঞাসিত
            <br />
            <span className="text-slate-500">প্রশ্নসমূহ</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            আপনার সব প্রশ্নের উত্তর এক জায়গায়। আরও কিছু জানার থাকলে যোগাযোগ করুন।
          </p>
        </div>

        {/* Category Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 animate-in fade-in duration-700 delay-200">
          {FAQ_CATEGORIES.map((category) => {
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-brand-800 text-white shadow-lg shadow-brand-800/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-3">
          {filteredFAQs.map((faq, index) => {
            const isOpen = openQuestionId === faq.id;

            return (
              <div
                key={faq.id}
                className="animate-in fade-in slide-in-from-bottom-2"
                style={{
                  animationDelay: `${index * 60}ms`,
                  animationDuration: "400ms",
                }}
              >
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                    isOpen
                      ? "border-brand-700/30 shadow-md"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Question Button */}
                  <button
                    type="button"
                    onClick={() => handleQuestionToggle(faq.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                      {faq.question}
                    </h3>

                    {/* Plus → X Icon */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-brand-800 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-base leading-7 text-slate-600">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Divider */}
          <div className="mx-auto mb-12 h-px w-24 bg-slate-200" />

          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
            <MessageCircle className="h-6 w-6 text-brand-700" />
          </div>

          {/* Title */}
          <h3 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">আরও প্রশ্ন আছে?</h3>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-md text-base text-slate-500">
            আমাদের সাপোর্ট টিম ২৪/৭ আপনাকে সাহায্য করতে প্রস্তুত।
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Primary CTA — Brand Color */}
            <Link
              href="/contact"
              style={{ color: "#ffffff" }}
              className="inline-flex 45 items-center justify-center gap-2 rounded-full bg-brand-800 px-7 py-3.5 text-sm font-semibold shadow-lg shadow-brand-800/30 transition-all duration-200 hover:bg-brand-900 hover:shadow-xl"
            >
              <MessageCircle className="h-4 w-4" style={{ color: "#ffffff" }} />
              <span style={{ color: "#ffffff" }}>যোগাযোগ করুন</span>
              <ArrowRight className="h-4 w-4" style={{ color: "#ffffff" }} />
            </Link>

            {/* Secondary CTA */}
            <a
              href="mailto:support@9ocacademy.com"
              className="inline-flex 45 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md"
            >
              <Mail className="h-4 w-4" />
              <span>ইমেইল করুন</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
