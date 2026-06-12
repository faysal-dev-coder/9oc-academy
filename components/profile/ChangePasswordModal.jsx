"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaTimes,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

// ═══════════════════════════════════════════════════════════
// 🔐 Password Strength Calculator
// ═══════════════════════════════════════════════════════════
const calculateStrength = (password) => {
  if (!password) {
    return { score: 0, label: "", color: "" };
  }

  let score = 0;

  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { score: 1, label: "দুর্বল", color: "bg-red-500" };
  }

  if (score <= 4) {
    return { score: 2, label: "মোটামুটি", color: "bg-amber-500" };
  }

  if (score <= 5) {
    return { score: 3, label: "ভালো", color: "bg-primary" };
  }

  return { score: 4, label: "শক্তিশালী", color: "bg-green-500" };
};

// ═══════════════════════════════════════════════════════════
// 🔐 Main Component
// ═══════════════════════════════════════════════════════════
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const supabase = useMemo(() => createClient(), []);

  const [mounted] = useState(() => typeof window !== "undefined");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const strength = calculateStrength(newPassword);
  const passwordsMatch =
    newPassword.length > 0 && confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetForm = useCallback(() => {
    setNewPassword("");
    setConfirmPassword("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setError("");
    setSuccess("");
  }, []);

  const handleClose = useCallback(() => {
    if (isSubmitting) {
      return;
    }

    resetForm();
    onClose?.();
  }, [isSubmitting, onClose, resetForm]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      if (!newPassword.trim()) {
        setError("নতুন পাসওয়ার্ড দিন।");
        return;
      }

      if (newPassword.length < 6) {
        setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
        return;
      }

      if (!confirmPassword.trim()) {
        setError("পাসওয়ার্ড নিশ্চিত করুন।");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("পাসওয়ার্ড দুটি মিলছে না।");
        return;
      }

      setIsSubmitting(true);

      try {
        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateError) {
          throw updateError;
        }

        resetForm();
        setSuccess("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে! ✅");
      } catch (updateError) {
        setError(updateError.message || "পাসওয়ার্ড পরিবর্তন করা যায়নি। আবার চেষ্টা করুন।");
      } finally {
        setIsSubmitting(false);
      }
    },
    [confirmPassword, newPassword, resetForm, supabase]
  );

  if (!isOpen || !mounted) {
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-slate-900/60 px-4 py-8 backdrop-blur-md sm:items-center sm:py-12"
      style={{ zIndex: 99999 }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-2xl shadow-slate-900/20"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Decorative soft amber blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-orange-300/30 blur-3xl" />

        {/* ═══════════ Header ═══════════ */}
        <div className="relative flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4 bg-linear-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30">
              <FaShieldAlt className="text-sm text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1F2937]">পাসওয়ার্ড পরিবর্তন</h2>
              <p className="mt-0.5 text-xs text-[#64748B] font-medium">নতুন পাসওয়ার্ড সেট করুন</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#1F2937] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* ═══════════ Body ═══════════ */}
        <form onSubmit={handleSubmit} className="relative px-6 py-6">
          {/* ─── New Password ─── */}
          <div className="mb-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#374151]">
              <FaLock className="text-xs text-amber-600" />
              নতুন পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                placeholder="কমপক্ষে ৬ অক্ষর"
                disabled={isSubmitting}
                autoComplete="new-password"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 pr-12 text-sm text-[#1F2937] placeholder-[#94A3B8] transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-[#F8FAFC]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-[#94A3B8] transition hover:text-[#1F2937]"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <FaEyeSlash className="text-sm" />
                ) : (
                  <FaEye className="text-sm" />
                )}
              </button>
            </div>

            {/* Password Strength Meter */}
            {newPassword.length > 0 && (
              <div className="mt-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B] font-medium">পাসওয়ার্ড শক্তি</span>
                  <span
                    className={`text-[11px] font-bold ${
                      strength.score <= 1
                        ? "text-red-600"
                        : strength.score === 2
                          ? "text-amber-600"
                          : strength.score === 3
                            ? "text-primary"
                            : "text-green-600"
                    }`}
                  >
                    {strength.label}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        level <= strength.score ? strength.color : "bg-[#E2E8F0]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Confirm Password ─── */}
          <div className="mb-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#374151]">
              <FaLock className="text-xs text-amber-600" />
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                placeholder="আবার পাসওয়ার্ড লিখুন"
                disabled={isSubmitting}
                autoComplete="new-password"
                className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm text-[#1F2937] placeholder-[#94A3B8] transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-[#F8FAFC] ${
                  passwordsMatch
                    ? "border-green-500 focus:border-green-600 focus:ring-green-500/20"
                    : passwordsMismatch
                      ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
                      : "border-[#E2E8F0] focus:border-amber-500 focus:ring-amber-500/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-[#94A3B8] transition hover:text-[#1F2937]"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-sm" />
                ) : (
                  <FaEye className="text-sm" />
                )}
              </button>
            </div>

            {/* Match Status */}
            {passwordsMatch && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                <FaCheckCircle className="text-[10px]" />
                <span>পাসওয়ার্ড মিলেছে</span>
              </div>
            )}

            {passwordsMismatch && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                <FaExclamationCircle className="text-[10px]" />
                <span>পাসওয়ার্ড মিলছে না</span>
              </div>
            )}
          </div>

          {/* ─── Status Messages ─── */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 font-medium">
              <FaExclamationCircle className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2.5 text-xs text-green-700 font-medium">
              <FaCheckCircle className="mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* ─── Info Note ─── */}
          <div className="mb-6 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5">
            <FaInfoCircle className="mt-0.5 shrink-0 text-xs text-primary" />
            <div className="text-[11px] leading-relaxed text-[#475569] font-medium">
              <p>• কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন</p>
              <p>• বড় হাতের, ছোট হাতের অক্ষর, সংখ্যা ও বিশেষ চিহ্ন মিলিয়ে দিলে শক্তিশালী হবে</p>
            </div>
          </div>

          {/* ─── Action Buttons ─── */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] transition hover:bg-[#F1F5F9] hover:border-[#CBD5E1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isSubmitting || !newPassword.trim() || !confirmPassword.trim() || passwordsMismatch
              }
              className="flex-1 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ChangePasswordModal;
