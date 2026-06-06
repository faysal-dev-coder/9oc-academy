"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { HiMail, HiLockClosed } from "react-icons/hi";
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
      {/* Success Message */}
      {success && (
        <div className="bg-secondary/20 border border-secondary/40 rounded-xl p-4 text-secondary text-sm text-center">
          ✅ {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4 text-red-400 text-sm text-center">
          ❌ {error}
        </div>
      )}

      {/* Email Field */}
      <div>
        <label className="block text-white/70 text-sm mb-2 font-medium">Email Address</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <HiMail size={18} />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="example@gmail.com"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 pl-11 text-white placeholder-white/30 outline-none transition-all focus:bg-white/10 ${
              errors.email
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-primary/60"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1.5 ml-1">⚠ {errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-white/70 text-sm mb-2 font-medium">Password</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <HiLockClosed size={18} />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 pl-11 pr-12 text-white placeholder-white/30 outline-none transition-all focus:bg-white/10 ${
              errors.password
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-primary/60"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1.5 ml-1">⚠ {errors.password.message}</p>
        )}
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("rememberMe")}
            type="checkbox"
            className="w-4 h-4 rounded border-white/20 bg-white/5 accent-primary"
          />
          <span className="text-white/60 text-sm">মনে রাখো</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-primary text-sm hover:text-primary/80 transition-colors"
        >
          Password ভুলে গেছো?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-primary to-secondary text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
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

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#0A0A1A] px-3 text-white/40">Account নেই?</span>
        </div>
      </div>

      {/* Register Link */}
      <Link
        href="/register"
        className="w-full flex items-center justify-center border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-all hover:bg-white/5 hover:border-white/20"
      >
        নতুন Account তৈরি করো
      </Link>
    </form>
  );
}
