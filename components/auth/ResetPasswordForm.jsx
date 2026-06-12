// components/auth/ResetPasswordForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { resetPassword } from "@/lib/supabase/auth";

// ═══════════════════════════════════════════
// Zod Schema — Password Validation
// ═══════════════════════════════════════════
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে")
      .max(50, "পাসওয়ার্ড অনেক লম্বা"),
    confirmPassword: z.string().min(1, "পাসওয়ার্ড নিশ্চিত করুন"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড মিলছে না",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createClient();

  // ─── State ──────────────────────────────
  const [status, setStatus] = useState("checking"); // checking | idle | loading | success | error | invalid
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ─── React Hook Form ────────────────────
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  // ─── Session Check on Mount ─────────────
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setStatus("idle");
      } else {
        const timer = setTimeout(() => setStatus("invalid"), 0);
        return () => clearTimeout(timer);
      }
    };

    checkSession();
  }, [supabase.auth]);

  // ─── Submit Handler ─────────────────────
  const onSubmit = async (data) => {
    setStatus("loading");
    setErrorMsg("");

    try {
      await resetPassword({ newPassword: data.password });
      setStatus("success");

      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);

      return () => clearTimeout(timer);
    } catch (err) {
      setErrorMsg(err.message || "কিছু একটা সমস্যা হয়েছে।");
      setStatus("error");
    }
  };

  // ═══════════════════════════════════════════
  // CHECKING STATE (Initial Loading)
  // ═══════════════════════════════════════════
  if (status === "checking") {
    return (
      <div className="space-y-6 text-center py-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-primary" />
        </div>
        <p className="text-sm text-[#64748B] font-medium">যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // INVALID LINK STATE
  // ═══════════════════════════════════════════
  if (status === "invalid") {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-200 bg-red-50 shadow-lg shadow-red-500/10">
            <FaExclamationTriangle className="text-3xl text-red-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-[#1F2937]">লিঙ্ক মেয়াদ শেষ! ⚠️</h3>
          <p className="text-sm leading-relaxed text-[#475569]">
            এই রিসেট লিঙ্কটি আর কাজ করছে না।
            <br />
            নতুন লিঙ্কের জন্য আবার চেষ্টা করুন।
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/forgot-password")}
            className="w-full rounded-xl bg-linear-to-r from-primary to-secondary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 cursor-pointer"
          >
            নতুন লিঙ্ক পাঠাও
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full text-sm text-[#64748B] font-medium transition-colors hover:text-primary cursor-pointer"
          >
            লগইন পেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // SUCCESS STATE
  // ═══════════════════════════════════════════
  if (status === "success") {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 shadow-lg shadow-secondary/10">
            <FaCheckCircle className="text-3xl text-secondary" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-[#1F2937]">পাসওয়ার্ড পরিবর্তন হয়েছে! ✅</h3>
          <p className="text-sm leading-relaxed text-[#475569]">
            আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।
            <br />৩ সেকেন্ডে লগইন পেজে যাচ্ছেন...
          </p>
        </div>

        {/* Loading Bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
          <div
            className="h-full rounded-full bg-linear-to-r from-primary to-secondary"
            style={{ animation: "shrink 3s linear forwards" }}
          />
        </div>

        <style jsx>{`
          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}</style>
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
            <FaLock className="text-2xl text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">নতুন পাসওয়ার্ড দিন</h2>
        <p className="text-sm text-[#64748B]">আপনার নতুন পাসওয়ার্ড সেট করুন</p>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">নতুন পাসওয়ার্ড</label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
              disabled={status === "loading"}
              className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-12 text-sm text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:ring-2 disabled:opacity-50 ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                  : "border-[#E2E8F0] focus:border-primary focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors hover:text-[#475569] cursor-pointer"
              aria-label={showPassword ? "Password লুকাও" : "Password দেখাও"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 font-medium">⚠️ {errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#374151]">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]" />
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="পাসওয়ার্ড আবার দিন"
              disabled={status === "loading"}
              className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-12 text-sm text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:ring-2 disabled:opacity-50 ${
                errors.confirmPassword
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                  : "border-[#E2E8F0] focus:border-primary focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors hover:text-[#475569] cursor-pointer"
              aria-label={showConfirmPassword ? "Password লুকাও" : "Password দেখাও"}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 font-medium">⚠️ {errors.confirmPassword.message}</p>
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
              পরিবর্তন হচ্ছে...
            </>
          ) : (
            <>
              <FaLock className="text-sm" />
              পাসওয়ার্ড পরিবর্তন করুন
            </>
          )}
        </button>
      </form>
    </div>
  );
}
