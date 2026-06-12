"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash, FaSpinner, FaCheckCircle } from "react-icons/fa";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhone,
} from "react-icons/hi2";
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

  // ═══════════════════════════════════
  // Registration Success View
  // ═══════════════════════════════════
  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="flex justify-center">
          <FaCheckCircle size={60} className="text-secondary" />
        </div>
        <h3 className="text-[#1F2937] text-xl font-bold">Registration সফল! 🎉</h3>
        <p className="text-[#475569] text-sm leading-relaxed">
          তোমার Account তৈরি হয়েছে। এখন Login করো এবং পড়াশোনা শুরু করো।
        </p>
        <Link
          href="/login"
          className="inline-block bg-linear-to-r from-primary to-secondary text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
        >
          Login Page এ যাও
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* ─── Error Message ─── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm text-center font-medium">
          ❌ {error}
        </div>
      )}

      {/* ═══════════════════════════════════ */}
      {/* Full Name                          */}
      {/* ═══════════════════════════════════ */}
      <div>
        <label className="block text-[#374151] text-sm mb-2 font-semibold">পূর্ণ নাম</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
            <HiOutlineUser size={18} />
          </div>
          <input
            {...register("fullName")}
            type="text"
            placeholder="তোমার পূর্ণ নাম লেখো"
            className={`w-full bg-white border rounded-xl px-4 py-3 pl-11 text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:ring-2 ${
              errors.fullName
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-[#E2E8F0] focus:border-primary focus:ring-primary/20"
            }`}
          />
        </div>
        {errors.fullName && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
            ⚠ {errors.fullName.message}
          </p>
        )}
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Phone                              */}
      {/* ═══════════════════════════════════ */}
      <div>
        <label className="block text-[#374151] text-sm mb-2 font-semibold">মোবাইল নম্বর</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
            <HiOutlinePhone size={18} />
          </div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="01XXXXXXXXX"
            className={`w-full bg-white border rounded-xl px-4 py-3 pl-11 text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:ring-2 ${
              errors.phone
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-[#E2E8F0] focus:border-primary focus:ring-primary/20"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">⚠ {errors.phone.message}</p>
        )}
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Email                              */}
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
      {/* Password                           */}
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
            placeholder="কমপক্ষে ৬ অক্ষর"
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

        {/* Password Strength Bar */}
        {password && (
          <div className="mt-2 space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i <= pwStrength.strength ? pwStrength.color : "bg-[#E2E8F0]"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-[#64748B]">
              Password শক্তি:{" "}
              <span className="text-[#374151] font-semibold">{pwStrength.label}</span>
            </p>
          </div>
        )}

        {errors.password && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
            ⚠ {errors.password.message}
          </p>
        )}
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Confirm Password                   */}
      {/* ═══════════════════════════════════ */}
      <div>
        <label className="block text-[#374151] text-sm mb-2 font-semibold">
          Password নিশ্চিত করো
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
            <HiOutlineLockClosed size={18} />
          </div>
          <input
            {...register("confirmPassword")}
            type={showConfirm ? "text" : "password"}
            placeholder="আবার একই Password দাও"
            className={`w-full bg-white border rounded-xl px-4 py-3 pl-11 pr-12 text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-[#E2E8F0] focus:border-primary focus:ring-primary/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors cursor-pointer"
            aria-label={showConfirm ? "Password লুকাও" : "Password দেখাও"}
          >
            {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
            ⚠ {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Terms & Conditions                 */}
      {/* ═══════════════════════════════════ */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register("agreeTerms")}
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-[#CBD5E1] bg-white accent-primary shrink-0 cursor-pointer"
          />
          <span className="text-[#475569] text-sm leading-relaxed">
            আমি{" "}
            <Link href="/terms" className="text-primary font-medium hover:underline">
              Terms & Conditions
            </Link>{" "}
            এবং{" "}
            <Link href="/privacy" className="text-primary font-medium hover:underline">
              Privacy Policy
            </Link>{" "}
            পড়েছি এবং সম্মতি দিচ্ছি।
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="text-red-500 text-xs mt-1.5 ml-7 font-medium">
            ⚠ {errors.agreeTerms.message}
          </p>
        )}
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
            Registration হচ্ছে...
          </>
        ) : (
          "Account তৈরি করো"
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
          <span className="bg-white px-3 text-[#64748B] font-medium">Account আছে?</span>
        </div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* Login Link                         */}
      {/* ═══════════════════════════════════ */}
      <Link
        href="/login"
        className="w-full flex items-center justify-center border border-[#E2E8F0] bg-white text-[#475569] font-semibold py-3 rounded-xl shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
      >
        Login করো
      </Link>
    </form>
  );
}
