"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiExclamationCircle, HiMail } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { NEWSLETTER_BENEFITS } from "../../constants";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (status === "loading") return;

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setMessage("দয়া করে আপনার ইমেইল ঠিকানা দিন");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus("error");
      setMessage("সঠিক ইমেইল ঠিকানা দিন");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Simulate API call (Phase 3 এ Supabase যুক্ত হবে)
    setTimeout(() => {
      setStatus("success");
      setMessage("ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।");
      setEmail("");

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }, 1500);
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);

    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/3 to-transparent" />
      <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-1/3 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          {/* Animated Background Layers */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-secondary/15" />
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(108,99,255,0.08),transparent_50%)]" />

          {/* Content */}
          <div className="relative grid gap-10 p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
            {/* Left Side — Form */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <HiMail className="text-base" />
                নিউজলেটার
              </span>

              <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                পাচ্ছেন{" "}
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ফ্রি MCQ সেট
                </span>{" "}
                প্রতি সপ্তাহে
              </h2>

              <p className="mt-4 text-base leading-8 text-white/70 sm:text-lg">
                সাবস্ক্রাইব করুন এবং পান এক্সক্লুসিভ পরীক্ষার টিপস, ফ্রি MCQ সেট, কোর্স আপডেট এবং
                স্পেশাল ডিসকাউন্ট অফার — সরাসরি আপনার ইমেইলে।
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                      <HiMail className="text-xl" />
                    </div>

                    <input
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                      disabled={status === "loading"}
                      className={`h-14 w-full rounded-full border bg-white/5 pl-12 pr-5 text-base text-white placeholder-white/40 backdrop-blur-md outline-none transition-all duration-300 focus:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 ${
                        status === "error"
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/15 focus:border-primary"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex h-14 items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-7 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        <span>অপেক্ষা করুন...</span>
                      </>
                    ) : (
                      <>
                        <span>সাবস্ক্রাইব</span>
                        <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {message && (
                    <motion.div
                      key={status}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium ${
                        status === "success"
                          ? "border-secondary/30 bg-secondary/10 text-secondary"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {status === "success" ? (
                        <HiCheckCircle className="text-lg shrink-0" />
                      ) : (
                        <HiExclamationCircle className="text-lg shrink-0" />
                      )}
                      <span>{message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Trust Indicators */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/50">
                <div className="flex items-center gap-1.5">
                  <HiCheckCircle className="text-secondary" />
                  <span>কোনো স্প্যাম নেই</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <HiCheckCircle className="text-secondary" />
                  <span>১০০% ফ্রি</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <HiCheckCircle className="text-secondary" />
                  <span>যখন ইচ্ছা Unsubscribe</span>
                </div>
              </div>
            </div>

            {/* Right Side — Benefits */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  সাবস্ক্রাইব করলে যা পাবেন:
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  ৫০,০০০+ শিক্ষার্থী ইতিমধ্যে আমাদের নিউজলেটার পাচ্ছেন
                </p>
              </div>

              <div className="space-y-3">
                {NEWSLETTER_BENEFITS.map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/20">
                      {benefit.icon}
                    </div>

                    <div className="flex-1">
                      <p className="text-base font-medium text-white">{benefit.text}</p>
                    </div>

                    <HiCheckCircle className="text-xl text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>

              {/* Bottom Note */}
              <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/5 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-sm font-semibold text-accent">স্পেশাল গিফট!</p>
                    <p className="mt-1 text-sm text-white/70">
                      প্রথম সাবস্ক্রাইব করলেই পাবেন{" "}
                      <span className="font-bold text-white">১০০টি ফ্রি BCS MCQ</span> একদম ফ্রি!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
