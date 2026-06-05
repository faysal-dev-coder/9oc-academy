"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { TESTIMONIALS } from "../../constants";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
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

  const activeTestimonial = useMemo(() => {
    return TESTIMONIALS[currentIndex];
  }, [currentIndex]);

  const previewTestimonials = useMemo(() => {
    return Array.from({ length: 3 }, (_, offset) => {
      const index = (currentIndex + offset + 1) % totalTestimonials;
      return TESTIMONIALS[index];
    });
  }, [currentIndex, totalTestimonials]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalTestimonials) % totalTestimonials);
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isPaused, totalTestimonials]);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/3 to-transparent" />
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
              💬 সফলদের গল্প
            </span>

            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              আমাদের শিক্ষার্থীদের{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                সাফল্যের অভিজ্ঞতা
              </span>
            </h2>

            <p className="mt-4 text-base leading-8 text-white/70 sm:text-lg">
              9OC Academy থেকে প্রস্তুতি নিয়ে অনেক শিক্ষার্থী BCS, ব্যাংক জব, NTRCA, প্রাইমারি ও
              Non-Cadre পরীক্ষায় সফল হয়েছে। তাদের বাস্তব অভিজ্ঞতা থেকেই দেখুন — সঠিক গাইডলাইন
              কিভাবে আপনার ক্যারিয়ার বদলে দিতে পারে।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="আগের রিভিউ"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <HiArrowLeft className="text-xl" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="পরের রিভিউ"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <HiArrowRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="grid gap-6 lg:grid-cols-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Active Card */}
          <div className="lg:col-span-2">
            <div className="relative min-h-110 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className={`absolute inset-0 bg-linear-to-br ${activeTestimonial.bgGradient}`} />
              <div className="absolute inset-0 bg-black/20" />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.article
                  key={activeTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8"
                >
                  <div>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/15 px-4 py-2 text-sm font-semibold text-accent">
                          🏆 {activeTestimonial.examPassed}
                        </span>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl">
                        “
                      </div>
                    </div>

                    <div className="mb-6 flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < activeTestimonial.rating ? "text-accent" : "text-white/20"
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-white/60">
                        {activeTestimonial.rating}.০ / ৫.০
                      </span>
                    </div>

                    <blockquote className="text-xl leading-9 text-white sm:text-2xl sm:leading-10">
                      {activeTestimonial.quote}
                    </blockquote>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-3xl shadow-lg shadow-primary/10">
                          {activeTestimonial.avatar}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white">{activeTestimonial.name}</h3>
                          <p className="text-sm text-white/60">{activeTestimonial.designation}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                          📚 {activeTestimonial.courseTaken}
                        </span>

                        <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                          ✅ সফল প্রার্থী
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {TESTIMONIALS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  aria-label={`${item.name} রিভিউ দেখুন`}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? "h-3 w-10 rounded-full bg-primary"
                      : "h-3 w-3 rounded-full bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Preview Side Cards */}
          <div className="space-y-4">
            {previewTestimonials.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePreviewClick(item.id)}
                className="group w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-2xl">
                    {item.avatar}
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">{item.name}</h4>
                    <p className="text-sm text-white/50">{item.designation}</p>
                  </div>
                </div>

                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      className={index < item.rating ? "text-accent" : "text-white/20"}
                    />
                  ))}
                </div>

                <p className="text-sm leading-7 text-white/65">
                  {item.quote.length > 110 ? `${item.quote.slice(0, 110)}...` : item.quote}
                </p>

                <div className="mt-4">
                  <span className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary">
                    {item.examPassed}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Trust Row */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md">
            <div className="text-2xl font-bold text-white">৫০,০০০+</div>
            <p className="mt-2 text-sm text-white/60">মোট শিক্ষার্থী</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md">
            <div className="text-2xl font-bold text-white">১০,০০০+</div>
            <p className="mt-2 text-sm text-white/60">দৈনিক MCQ প্র্যাক্টিস</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md">
            <div className="text-2xl font-bold text-white">৯৫%</div>
            <p className="mt-2 text-sm text-white/60">শিক্ষার্থী সন্তুষ্টি</p>
          </div>
        </div>
      </div>
    </section>
  );
}
