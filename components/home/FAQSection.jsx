"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import { FaQuestionCircle } from "react-icons/fa";
import { FAQ_CATEGORIES, FAQ_DATA } from "../../constants";

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

  const getCategoryCount = (categoryId) => {
    return FAQ_DATA.filter((item) => item.category === categoryId).length;
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/3 to-transparent" />
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            ❓ প্রশ্ন ও উত্তর
          </span>

          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            প্রায়ই জিজ্ঞাসিত{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              প্রশ্নসমূহ
            </span>
          </h2>

          <p className="mt-4 text-base leading-8 text-white/70 sm:text-lg">
            আমাদের প্ল্যাটফর্ম, কোর্স, পরীক্ষা ও পেমেন্ট সম্পর্কিত সবচেয়ে সাধারণ প্রশ্নগুলোর উত্তর
            এখানে পাবেন। আপনার প্রশ্ন না থাকলে নিচে যোগাযোগ করুন।
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {FAQ_CATEGORIES.map((category) => {
            const isActive = category.id === activeCategory;
            const count = getCategoryCount(category.id);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`group flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-primary/40 hover:bg-primary/10 hover:text-white"
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.label}</span>
                <span
                  className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/60 group-hover:bg-primary/20 group-hover:text-white"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFAQs.map((faq, index) => {
                const isOpen = openQuestionId === faq.id;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                    className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                      isOpen
                        ? "border-primary/40 bg-primary/5"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleQuestionToggle(faq.id)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                            isOpen ? "bg-primary text-white" : "bg-white/10 text-white/70"
                          }`}
                        >
                          <FaQuestionCircle className="text-lg" />
                        </div>

                        <h3
                          className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
                            isOpen ? "text-white" : "text-white/90"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? "bg-primary text-white" : "bg-white/10 text-white/60"
                        }`}
                      >
                        <HiChevronDown className="text-xl" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/10 px-5 pb-6 pt-4 sm:px-6">
                            <div className="ml-0 sm:ml-14">
                              <p className="text-base leading-8 text-white/75">{faq.answer}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                  💬 আরও সাহায্য দরকার?
                </div>

                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  আপনার প্রশ্নের উত্তর পাননি?
                </h3>

                <p className="mt-3 text-base text-white/70 sm:text-lg">
                  আমাদের সাপোর্ট টিম ২৪/৭ আপনাকে সাহায্য করতে প্রস্তুত। সরাসরি যোগাযোগ করুন, দ্রুত
                  সমাধান পান।
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  <span>যোগাযোগ করুন</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <a
                  href="mailto:support@9ocacademy.com"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                >
                  <span>📧</span>
                  <span>ইমেইল করুন</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
