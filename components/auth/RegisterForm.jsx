"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash, FaSpinner, FaCheckCircle } from "react-icons/fa";
import { HiMail, HiLockClosed, HiUser, HiPhone } from "react-icons/hi";
import { useAuth } from "@/hooks/useAuth";

// ─── Zod Validation Schema ───
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "পূর্ণ নাম দাও")
      .min(3, "নাম কমপক্ষে ৩ অক্ষর হতে হবে")
      .max(50, "নাম সর্বোচ্চ ৫০ অক্ষর হবে"),
    phone: z
      .string()
      .min(1, "মোবাইল নম্বর দাও")
      .regex(/^(?:\+88)?01[3-9]\d{8}$/, "সঠিক বাংলাদেশী মোবাইল নম্বর দাও (01XXXXXXXXX)"),
    email: z.string().min(1, "Email দাও").email("সঠিক Email Format দাও"),
    password: z.string().min(1, "Password দাও").min(6, "Password কমপক্ষে ৬ অক্ষর হতে হবে"),
    confirmPassword: z.string().min(1, "Password আবার দাও"),
    agreeTerms: z.boolean().refine((val) => val === true, "Terms এ সম্মতি দিতে হবে"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password মিলছে না",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser, loading, error, success } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  // ─── useWatch — ESLint Friendly Alternative ───
  const password = useWatch({ control, name: "password" });

  // Password Strength Check
  const getPasswordStrength = (pass) => {
    if (!pass) return { strength: 0, label: "", color: "" };
    if (pass.length < 6) return { strength: 1, label: "দুর্বল", color: "bg-red-500" };
    if (pass.length < 8) return { strength: 2, label: "মাঝারি", color: "bg-yellow-500" };
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass))
      return { strength: 4, label: "শক্তিশালী", color: "bg-secondary" };
    return { strength: 3, label: "ভালো", color: "bg-blue-500" };
  };

  const pwStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    await registerUser({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      phone: data.phone,
    });
  };

  // Registration Success হলে আলাদা View
  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="flex justify-center">
          <FaCheckCircle size={60} className="text-secondary" />
        </div>
        <h3 className="text-white text-xl font-bold">Registration সফল! 🎉</h3>
        <p className="text-white/60 text-sm leading-relaxed">
          তোমার Account তৈরি হয়েছে। এখন Login করো এবং পড়াশোনা শুরু করো।
        </p>
        <Link
          href="/login"
          className="inline-block bg-linear-to-r from-primary to-secondary text-white font-semibold py-3 px-8 rounded-xl transition-all hover:opacity-90"
        >
          Login Page এ যাও
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4 text-red-400 text-sm text-center">
          ❌ {error}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block text-white/70 text-sm mb-2 font-medium">পূর্ণ নাম</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <HiUser size={18} />
          </div>
          <input
            {...register("fullName")}
            type="text"
            placeholder="তোমার পূর্ণ নাম লেখো"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 pl-11 text-white placeholder-white/30 outline-none transition-all focus:bg-white/10 ${
              errors.fullName
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-primary/60"
            }`}
          />
        </div>
        {errors.fullName && (
          <p className="text-red-400 text-xs mt-1.5 ml-1">⚠ {errors.fullName.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-white/70 text-sm mb-2 font-medium">মোবাইল নম্বর</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <HiPhone size={18} />
          </div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="01XXXXXXXXX"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 pl-11 text-white placeholder-white/30 outline-none transition-all focus:bg-white/10 ${
              errors.phone
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-primary/60"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1.5 ml-1">⚠ {errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
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

      {/* Password */}
      <div>
        <label className="block text-white/70 text-sm mb-2 font-medium">Password</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <HiLockClosed size={18} />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="কমপক্ষে ৬ অক্ষর"
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
        {/* Password Strength Bar */}
        {password && (
          <div className="mt-2 space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    i <= pwStrength.strength ? pwStrength.color : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-white/40">
              Password শক্তি: <span className="text-white/70">{pwStrength.label}</span>
            </p>
          </div>
        )}
        {errors.password && (
          <p className="text-red-400 text-xs mt-1.5 ml-1">⚠ {errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-white/70 text-sm mb-2 font-medium">Password নিশ্চিত করো</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <HiLockClosed size={18} />
          </div>
          <input
            {...register("confirmPassword")}
            type={showConfirm ? "text" : "password"}
            placeholder="আবার একই Password দাও"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 pl-11 pr-12 text-white placeholder-white/30 outline-none transition-all focus:bg-white/10 ${
              errors.confirmPassword
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-primary/60"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
          >
            {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-400 text-xs mt-1.5 ml-1">⚠ {errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Terms */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register("agreeTerms")}
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 accent-primary shrink-0"
          />
          <span className="text-white/60 text-sm leading-relaxed">
            আমি{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms & Conditions
            </Link>{" "}
            এবং{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            পড়েছি এবং সম্মতি দিচ্ছি।
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="text-red-400 text-xs mt-1.5 ml-7">⚠ {errors.agreeTerms.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-primary to-secondary text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" size={16} />
            Registration হচ্ছে...
          </>
        ) : (
          "Account তৈরি করো"
        )}
      </button>

      {/* Login Link */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#0A0A1A] px-3 text-white/40">Account আছে?</span>
        </div>
      </div>

      <Link
        href="/login"
        className="w-full flex items-center justify-center border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-all hover:bg-white/5 hover:border-white/20"
      >
        Login করো
      </Link>
    </form>
  );
}
