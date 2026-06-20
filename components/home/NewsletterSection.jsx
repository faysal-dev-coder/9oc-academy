// components/home/NewsletterSection.jsx
// ═══════════════════════════════════════════════════════════════
// 📧 Newsletter Section — Premium Clean WOW
// Phase 5 — Chat 50 Final
// ├── Equal height columns
// ├── Numbered premium benefits
// ├── Inline hero stats
// ├── Integrated gift design
// └── Smart, Modern, WOW!
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Gift,
  ArrowRight,
  Star,
  Users,
  Sparkles,
} from "lucide-react";

// ─── Numbered Benefits ────────────────────
const BENEFITS = [
  { num: "০১", title: "Weekly MCQ", desc: "প্রতি সোমবার নতুন প্রশ্ন সেট" },
  { num: "০২", title: "Course Updates", desc: "নতুন কোর্স ও অফার আগে" },
  { num: "০৩", title: "Expert Tips", desc: "পরীক্ষার টিপস ও ট্রিকস" },
  { num: "০৪", title: "Exclusive Deals", desc: "শুধু সাবস্ক্রাইবারদের জন্য" },
];

// ─── Bangla Digits Helper ─────────────────
const toBangla = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => banglaDigits[d]);
};

// ─── Animated Counter Hook ────────────────
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [count, counterRef] = useCountUp(50000);

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

    setTimeout(() => {
      setStatus("success");
      setMessage("সফলভাবে সাবস্ক্রাইব হয়েছেন!");
      setEmail("");

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
    <section ref={counterRef} className="relative overflow-hidden bg-slate-50 py-20">
      {/* ═══════════════════════════════════ */}
      {/* 🌟 Background                       */}
      {/* ═══════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-brand-700/8 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-amber-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Premium glow */}
          <div className="absolute -inset-px rounded-3xl bg-linear-to-r from-brand-700/30 via-amber-500/30 to-emerald-500/30 opacity-40 blur-md" />

          <div className="relative grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 md:grid-cols-12">
            {/* ═══════════════════════════════ */}
            {/* 🌑 LEFT — Dark Premium Form     */}
            {/* ═══════════════════════════════ */}
            <div className="relative overflow-hidden bg-linear-to-br from-brand-800 via-brand-900 to-slate-950 p-8 md:col-span-5 md:p-10 lg:p-12">
              {/* Background effects */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-600/30 blur-3xl" />
                <div className="absolute -bottom-32 -left-20 h-60 w-60 rounded-full bg-amber-500/15 blur-3xl" />

                {/* Subtle dot texture */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                {/* Top — Badge */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20 backdrop-blur">
                    <Mail className="h-4 w-4 text-amber-300" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-300">
                    Free Newsletter
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
                  পরীক্ষা প্রস্তুতি{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-linear-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                      সহজ করুন
                    </span>
                    <span className="absolute -bottom-1 left-0 right-0 h-o.75 rounded-full bg-linear-to-r from-amber-400 to-amber-500" />
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-5 text-sm leading-6 text-white/70">
                  সাপ্তাহিক ফ্রি MCQ সেট, কোর্স আপডেট ও এক্সপার্ট টিপস —{" "}
                  <span className="font-semibold text-white">সরাসরি ইনবক্সে</span>।
                </p>

                {/* Form — Pushed down */}
                <form onSubmit={handleSubmit} className="mt-auto space-y-3 pt-8">
                  {/* Input */}
                  <div className="group relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-amber-300">
                      <Mail className="h-4 w-4" />
                    </div>

                    <input
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      disabled={status === "loading"}
                      className={`h-12 w-full rounded-xl border bg-white/5 pl-11 pr-4 text-sm font-medium text-white placeholder-white/30 outline-none backdrop-blur transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                        status === "error"
                          ? "border-red-400/60 focus:border-red-400"
                          : "border-white/15 focus:border-amber-400/60 focus:bg-white/10"
                      }`}
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-amber-400 px-5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition-all duration-200 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-500/50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {/* Shine */}
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {status === "loading" ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
                        <span>প্রসেসিং...</span>
                      </>
                    ) : (
                      <>
                        <span>সাবস্ক্রাইব করুন</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {/* Status */}
                  {message && (
                    <div
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold backdrop-blur animate-in fade-in slide-in-from-top-1 duration-300 ${
                        status === "success"
                          ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                          : "border-red-400/40 bg-red-500/15 text-red-200"
                      }`}
                    >
                      {status === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0" />
                      )}
                      <span>{message}</span>
                    </div>
                  )}

                  {/* Trust */}
                  <div className="flex items-center gap-1.5 pt-1 text-[11px] text-white/40">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>No spam • Unsubscribe anytime</span>
                  </div>
                </form>
              </div>
            </div>

            {/* ═══════════════════════════════ */}
            {/* 🎁 RIGHT — Content              */}
            {/* ═══════════════════════════════ */}
            <div className="relative bg-white p-8 md:col-span-7 md:p-10 lg:p-12">
              {/* Subtle grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(15, 23, 42) 1px, transparent 1px), linear-gradient(90deg, rgb(15, 23, 42) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative flex h-full flex-col">
                {/* Top — Stats Strip */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  {/* Live count */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-100">
                      <Users className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-base font-black leading-none text-slate-900">
                        {toBangla(count.toLocaleString("en-US"))}+
                      </p>
                      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        Subscribers
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-10 w-px bg-slate-200" />

                  {/* Rating */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 ring-1 ring-amber-100">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-base font-black leading-none text-slate-900">৪.৯/৫</p>
                      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        Rating
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-10 w-px bg-slate-200" />

                  {/* Weekly */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 ring-1 ring-brand-100">
                      <Sparkles className="h-4 w-4 text-brand-700" />
                    </div>
                    <div>
                      <p className="text-base font-black leading-none text-slate-900">৫২+</p>
                      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        Weekly Sets
                      </p>
                    </div>
                  </div>
                </div>

                {/* Heading */}
                <div className="mt-6">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    আপনি পাবেন
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Premium content, প্রতি সপ্তাহে</p>
                </div>

                {/* Numbered Benefits — Premium */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {BENEFITS.map((benefit, index) => (
                    <div
                      key={benefit.num}
                      className="animate-in fade-in slide-in-from-right-2"
                      style={{
                        animationDelay: `${index * 80}ms`,
                        animationDuration: "500ms",
                      }}
                    >
                      <div className="group flex h-full items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-200 hover:border-brand-700/20 hover:bg-white hover:shadow-md hover:shadow-brand-700/5">
                        {/* Number */}
                        <span className="text-base font-black leading-tight text-brand-700">
                          {benefit.num}
                        </span>

                        {/* Content */}
                        <div className="flex-1">
                          <p className="text-sm font-bold leading-tight text-slate-900">
                            {benefit.title}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-1 min-h-4" />

                {/* Gift — Integrated Banner */}
                <div className="mt-6 overflow-hidden rounded-2xl bg-linear-to-r from-amber-500 to-amber-600 p-px shadow-lg shadow-amber-500/20">
                  <div className="relative overflow-hidden rounded-[15px] bg-linear-to-br from-amber-50 via-white to-amber-50 p-4">
                    {/* Shine */}
                    <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-amber-300/40 blur-2xl" />

                    <div className="relative flex items-center gap-4">
                      {/* Animated Gift */}
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 animate-ping rounded-xl bg-amber-400/40" />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-amber-600 shadow-lg ring-2 ring-white">
                          <Gift className="h-5 w-5 text-white" />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                            Bonus Gift
                          </span>
                          <span className="h-1 w-1 rounded-full bg-amber-400" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                            New User
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm font-bold leading-tight text-slate-900">
                          ১০০টি ফ্রি BCS MCQ —{" "}
                          <span className="text-amber-700">সাবস্ক্রাইব করলেই!</span>
                        </p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="h-5 w-5 shrink-0 text-amber-600" />
                    </div>
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
