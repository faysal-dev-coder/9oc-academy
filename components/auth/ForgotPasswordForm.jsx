// components/auth/ForgotPasswordForm.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { forgotPassword } from "@/lib/supabase/auth";

// ═══════════════════════════════════════════
// Zod Schema — Email Validation
// ═══════════════════════════════════════════
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "ইমেইল দিন").email("সঠিক ইমেইল দিন"),
});

export default function ForgotPasswordForm() {
  // ─── State ──────────────────────────────
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [sentEmail, setSentEmail] = useState("");

  // ─── React Hook Form Setup ──────────────
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // ─── Submit Handler ─────────────────────
  const onSubmit = async (data) => {
    setStatus("loading");
    setErrorMsg("");

    try {
      await forgotPassword({ email: data.email });
      setSentEmail(data.email);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "কিছু একটা সমস্যা হয়েছে।");
      setStatus("error");
    }
  };

  // ═══════════════════════════════════════════
  // SUCCESS STATE UI
  // ═══════════════════════════════════════════
  if (status === "success") {
    return (
      <div className="space-y-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 shadow-lg shadow-secondary/10">
            <FaPaperPlane className="text-3xl text-secondary" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-[#1F2937]">ইমেইল পাঠানো হয়েছে! ✅</h3>
          <p className="text-sm leading-relaxed text-[#475569]">
            <span className="font-semibold text-secondary">{sentEmail}</span> এই ঠিকানায় একটি
            পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে।
            <br />
            আপনার ইনবক্স চেক করুন।
          </p>
          <p className="text-xs text-[#64748B]">💡 ইমেইল না পেলে Spam/Junk ফোল্ডার চেক করুন</p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E2E8F0]" />

        {/* Back Link */}
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 group"
        >
          <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
          লগইন পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // MAIN FORM UI
  // ═══════════════════════════════════════════
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-lg shadow-primary/10">
            <FaEnvelope className="text-2xl text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">পাসওয়ার্ড ভুলে গেছেন?</h2>
        <p className="text-sm text-[#64748B]">আপনার ইমেইল দিন, আমরা রিসেট লিঙ্ক পাঠাবো</p>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">ইমেইল ঠিকানা</label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]" />
            <input
              {...register("email")}
              type="email"
              placeholder="আপনার ইমেইল দিন"
              disabled={status === "loading"}
              className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                  : "border-[#E2E8F0] focus:border-primary focus:ring-primary/20"
              }`}
            />
          </div>
          {errors.email && (
            <p className="flex items-center gap-1 text-xs text-red-500 font-medium">
              <span>⚠️</span> {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] disabled:hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {status === "loading" ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              পাঠানো হচ্ছে...
            </>
          ) : (
            <>
              <FaPaperPlane className="text-sm" />
              রিসেট লিঙ্ক পাঠাও
            </>
          )}
        </button>
      </form>

      {/* Back Link */}
      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 text-sm text-[#64748B] transition-colors hover:text-primary group"
        >
          <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
          লগইন পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
