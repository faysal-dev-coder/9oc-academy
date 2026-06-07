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
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-secondary/30 bg-secondary/20">
            <FaPaperPlane className="text-3xl text-secondary" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">ইমেইল পাঠানো হয়েছে! ✅</h3>
          <p className="text-sm leading-relaxed text-white/60">
            <span className="font-medium text-secondary">{sentEmail}</span> এই ঠিকানায় একটি
            পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে।
            <br />
            আপনার ইনবক্স চেক করুন।
          </p>
          <p className="text-xs text-white/40">💡 ইমেইল না পেলে Spam/Junk ফোল্ডার চেক করুন</p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Back Link */}
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <FaArrowLeft className="text-xs" />
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
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
            <FaEnvelope className="text-2xl text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">পাসওয়ার্ড ভুলে গেছেন?</h2>
        <p className="text-sm text-white/50">আপনার ইমেইল দিন, আমরা রিসেট লিঙ্ক পাঠাবো</p>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
          <p className="text-sm text-red-400">{errorMsg}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/70">ইমেইল ঠিকানা</label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30" />
            <input
              {...register("email")}
              type="email"
              placeholder="আপনার ইমেইল দিন"
              disabled={status === "loading"}
              className={`w-full rounded-xl border bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.email
                  ? "border-red-500/50 focus:ring-red-500/20"
                  : "border-white/10 focus:border-primary/50 focus:ring-primary/20"
              }`}
            />
          </div>
          {errors.email && (
            <p className="flex items-center gap-1 text-xs text-red-400">
              <span>⚠️</span> {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
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
          className="flex items-center justify-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80"
        >
          <FaArrowLeft className="text-xs" />
          লগইন পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
