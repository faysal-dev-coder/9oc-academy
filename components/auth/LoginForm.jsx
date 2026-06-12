"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { useAuth } from "@/hooks/useAuth";

// ─── Zod Validation Schema ───
const loginSchema = z.object({
  email: z.string().min(1, "Email দাও").email("সঠিক Email Format দাও (example@gmail.com)"),
  password: z.string().min(1, "Password দাও").min(6, "Password কমপক্ষে ৬ অক্ষর হতে হবে"),
  rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, success } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* ─── Success Message ─── */}
      {success && (
        <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-secondary text-sm text-center font-medium">
          ✅ {success}
        </div>
      )}

      {/* ─── Error Message ─── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm text-center font-medium">
          ❌ {error}
        </div>
      )}

      {/* ═══════════════════════════════════ */}
      {/* Email Field                        */}
      {/* ═══════════════════════════════════ */}
      <div>
        <label className="block text-[#374151] text-sm mb-2 font-semibold">Email Address</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
            <HiOutlineEnvelope size={18} />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="example@gmail.com"
            className={`w-full bg-white border rounded-xl px-4 py-3 pl-11 text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-[#E2E8F0] focus:border-primary focus:ring-primary/20"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">⚠ {errors.email.message}</p>
        )}
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Password Field                     */}
      {/* ═══════════════════════════════════ */}
      <div>
        <label className="block text-[#374151] text-sm mb-2 font-semibold">Password</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
            <HiOutlineLockClosed size={18} />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`w-full bg-white border rounded-xl px-4 py-3 pl-11 pr-12 text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:ring-2 ${
              errors.password
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-[#E2E8F0] focus:border-primary focus:ring-primary/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors cursor-pointer"
            aria-label={showPassword ? "Password লুকাও" : "Password দেখাও"}
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
            ⚠ {errors.password.message}
          </p>
        )}
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Remember Me + Forgot Password      */}
      {/* ═══════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("rememberMe")}
            type="checkbox"
            className="w-4 h-4 rounded border-[#CBD5E1] bg-white accent-primary cursor-pointer"
          />
          <span className="text-[#475569] text-sm">মনে রাখো</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
        >
          Password ভুলে গেছো?
        </Link>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Submit Button                      */}
      {/* ═══════════════════════════════════ */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-primary to-secondary text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" size={16} />
            Login হচ্ছে...
          </>
        ) : (
          "Login করো"
        )}
      </button>

      {/* ═══════════════════════════════════ */}
      {/* Divider                            */}
      {/* ═══════════════════════════════════ */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E2E8F0]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-[#64748B] font-medium">Account নেই?</span>
        </div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Register Link                      */}
      {/* ═══════════════════════════════════ */}
      <Link
        href="/register"
        className="w-full flex items-center justify-center border border-[#E2E8F0] bg-white text-[#475569] font-semibold py-3 rounded-xl shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
      >
        নতুন Account তৈরি করো
      </Link>
    </form>
  );
}
