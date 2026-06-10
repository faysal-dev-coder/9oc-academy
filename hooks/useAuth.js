// hooks/useAuth.js
// ====================================
// Login, Register, Logout Actions
// ⭐ ?redirect parameter Support Added!
// ====================================

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "@/lib/supabase/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // ─── LOGIN (⭐ Redirect Support) ───
  const login = async (formData) => {
    clearMessages();
    setLoading(true);

    try {
      await loginUser(formData);

      // ⭐ ?redirect Parameter Check
      const redirectTo = searchParams.get("redirect") || "/dashboard";

      console.log("✅ [useAuth] Login successful. Redirecting to:", redirectTo);
      setSuccess(
        `Login সফল! ${redirectTo === "/dashboard" ? "Dashboard" : "পরীক্ষা পৃষ্ঠা"} এ নিয়ে যাচ্ছি...`
      );

      // ⭐ Hard Navigation — Auth State Properly Propagate হবে
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1000);

      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // ─── REGISTER ───
  const register = async (formData) => {
    clearMessages();
    setLoading(true);

    try {
      await registerUser(formData);
      setSuccess("Registration সফল! Email এ Verification Link পাঠানো হয়েছে। Inbox চেক করো।");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ─── LOGOUT ───
  const logout = async () => {
    console.log("🔓 [useAuth] logout() called");
    clearMessages();
    setLoading(true);

    try {
      const result = await logoutUser();
      console.log("📥 [useAuth] logoutUser() result:", result);
      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error("💥 [useAuth] Error caught:", err);
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // ─── FORGOT PASSWORD ───
  const sendPasswordReset = async (formData) => {
    clearMessages();
    setLoading(true);

    try {
      await forgotPassword(formData);
      setSuccess("Password Reset Link পাঠানো হয়েছে। Email Inbox চেক করো।");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ─── RESET PASSWORD ───
  const updatePassword = async (formData) => {
    clearMessages();
    setLoading(true);

    try {
      await resetPassword(formData);
      setSuccess("Password সফলভাবে পরিবর্তন হয়েছে! Login করো।");
      setTimeout(() => router.push("/login"), 2000);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    sendPasswordReset,
    updatePassword,
    loading,
    error,
    success,
    clearMessages,
  };
}
