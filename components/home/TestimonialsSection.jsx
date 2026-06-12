"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { TESTIMONIALS } from "../../constants";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
  }),
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const totalTestimonials = TESTIMONIALS.length;

  const activeTestimonial = useMemo(() => TESTIMONIALS[currentIndex], [currentIndex]);

  const previewTestimonials = useMemo(() => {
    return Array.from({ length: 3 }, (_, offset) => {
      const index = (currentIndex + offset + 1) % totalTestimonials;
      return TESTIMONIALS[index];
    });
  }, [currentIndex, totalTestimonials]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  };

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handlePreviewClick = (id) => {
    const nextIndex = TESTIMONIALS.findIndex((item) => item.id === id);
    if (nextIndex === -1 || nextIndex === currentIndex) return;
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    if (isPaused || totalTestimonials <= 1) return undefined;
    const intervalId = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isPaused, totalTestimonials]);

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20">
      {/* Background Blobs */}
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-secondary/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════ */}
        {/* Header — Compact                   */}
        {/* ═══════════════════════════════════ */}
        <div className="mb-10 flex flex-col gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
              💬 সফলদের গল্প
            </span>

            <h2 className="mt-4 text-3xl font-bold text-[#1F2937] sm:text-4xl lg:text-5xl">
              আমাদের শিক্ষার্থীদের{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                সাফল্যের অভিজ্ঞতা
              </span>
            </h2>

            <p className="mt-3 text-base leading-7 text-[#475569]">
              BCS, ব্যাংক, NTRCA, প্রাইমারি ও Non-Cadre — সফল শিক্ষার্থীদের বাস্তব অভিজ্ঞতা থেকে
              দেখুন কীভাবে সঠিক গাইডলাইন ক্যারিয়ার বদলে দেয়।
            </p>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-center gap-3 lg:justify-end">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="আগের রিভিউ"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#475569] shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary cursor-pointer"
            >
              <HiArrowLeft className="text-lg" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="পরের রিভিউ"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#475569] shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary cursor-pointer"
            >
              <HiArrowRight className="text-lg" />
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════ */}
        {/* Content Grid — Compact Layout      */}
        {/* ═══════════════════════════════════ */}
        <div
          className="grid gap-5 lg:grid-cols-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ─── Main Active Card ─────────── */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-[#E2E8F0] shadow-lg">
              {/* Colorful gradient background */}
              <div className={`absolute inset-0 bg-linear-to-br ${activeTestimonial.bgGradient}`} />
              <div className="absolute inset-0 bg-black/15" />

              {/* Decorative quote icon */}
              <div className="absolute top-6 right-6 text-7xl font-serif text-white/15 leading-none select-none">
                &ldquo;
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.article
                  key={activeTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="relative z-10 flex h-full flex-col p-6 sm:p-8"
                >
                  {/* Top: Exam badge + Stars */}
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent backdrop-blur-sm">
                      🏆 {activeTestimonial.examPassed}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, index) => (
                          <FaStar
                            key={index}
                            className={`h-3.5 w-3.5 ${
                              index < activeTestimonial.rating ? "text-accent" : "text-white/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-white/85">
                        {activeTestimonial.rating}.০
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="flex-1 text-lg leading-8 text-white sm:text-xl sm:leading-9">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </blockquote>

                  {/* Footer: Avatar + Course Badge */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-2xl shadow-lg backdrop-blur-sm">
                        {activeTestimonial.avatar}
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white">{activeTestimonial.name}</h3>
                        <p className="text-xs text-white/75">{activeTestimonial.designation}</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      📚 {activeTestimonial.courseTaken}
                    </span>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {TESTIMONIALS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  aria-label={`${item.name} রিভিউ দেখুন`}
                  className={`transition-all duration-300 cursor-pointer ${
                    index === currentIndex
                      ? "h-2.5 w-8 rounded-full bg-primary"
                      : "h-2.5 w-2.5 rounded-full bg-[#CBD5E1] hover:bg-[#94A3B8]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ─── Preview Side Cards ───────── */}
          <div className="flex flex-col gap-4">
            {previewTestimonials.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePreviewClick(item.id)}
                className="group flex-1 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-left shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-1 cursor-pointer"
              >
                {/* Avatar Row */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-xl">
                    {item.avatar}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-[#1F2937]">{item.name}</h4>
                    <p className="truncate text-xs text-[#64748B]">{item.designation}</p>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaStar
                        key={index}
                        className={`h-3 w-3 ${
                          index < item.rating ? "text-accent" : "text-[#CBD5E1]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote preview */}
                <p className="mb-3 line-clamp-3 text-xs leading-6 text-[#475569]">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Exam badge */}
                <span className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-1 text-[10px] font-semibold text-secondary">
                  🎯 {item.examPassed}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════ */}
        {/* Bottom Stats — Premium Cards       */}
        {/* ═══════════════════════════════════ */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HiOutlineUsers className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1F2937]">৫০,০০০+</div>
                <p className="text-sm text-[#64748B]">মোট শিক্ষার্থী</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-secondary/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <HiOutlineAcademicCap className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1F2937]">১০,০০০+</div>
                <p className="text-sm text-[#64748B]">দৈনিক MCQ প্র্যাক্টিস</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <HiOutlineSparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1F2937]">৯৫%</div>
                <p className="text-sm text-[#64748B]">শিক্ষার্থী সন্তুষ্টি</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
