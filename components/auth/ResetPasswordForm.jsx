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
  // Reset Password Link থেকে এলে Session থাকবে
  // Direct URL দিলে Session থাকবে না
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setStatus("idle"); // Form দেখাও
      } else {
        // Session নাই — Invalid Link
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

      // ৩ সেকেন্ড পর Login এ Redirect
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
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-primary" />
        </div>
        <p className="text-sm text-white/50">যাচাই করা হচ্ছে...</p>
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
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20">
            <FaExclamationTriangle className="text-3xl text-red-400" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">লিঙ্ক মেয়াদ শেষ! ⚠️</h3>
          <p className="text-sm leading-relaxed text-white/60">
            এই রিসেট লিঙ্কটি আর কাজ করছে না।
            <br />
            নতুন লিঙ্কের জন্য আবার চেষ্টা করুন।
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/forgot-password")}
            className="w-full rounded-xl border border-primary/30 bg-primary/20 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/30"
          >
            নতুন লিঙ্ক পাঠাও
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full text-sm text-white/50 transition-colors hover:text-white/80"
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
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-secondary/30 bg-secondary/20">
            <FaCheckCircle className="text-3xl text-secondary" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">পাসওয়ার্ড পরিবর্তন হয়েছে! ✅</h3>
          <p className="text-sm leading-relaxed text-white/60">
            আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।
            <br />৩ সেকেন্ডে লগইন পেজে যাচ্ছেন...
          </p>
        </div>

        {/* Loading Bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-secondary"
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
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
            <FaLock className="text-2xl text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">নতুন পাসওয়ার্ড দিন</h2>
        <p className="text-sm text-white/50">আপনার নতুন পাসওয়ার্ড সেট করুন</p>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
          <p className="text-sm text-red-400">{errorMsg}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/70">নতুন পাসওয়ার্ড</label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
              disabled={status === "loading"}
              className={`w-full rounded-xl border bg-white/5 py-3.5 pl-11 pr-12 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 ${
                errors.password
                  ? "border-red-500/50 focus:ring-red-500/20"
                  : "border-white/10 focus:border-primary/50 focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-400">⚠️ {errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/70">পাসওয়ার্ড নিশ্চিত করুন</label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30" />
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="পাসওয়ার্ড আবার দিন"
              disabled={status === "loading"}
              className={`w-full rounded-xl border bg-white/5 py-3.5 pl-11 pr-12 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 ${
                errors.confirmPassword
                  ? "border-red-500/50 focus:ring-red-500/20"
                  : "border-white/10 focus:border-primary/50 focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">⚠️ {errors.confirmPassword.message}</p>
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
