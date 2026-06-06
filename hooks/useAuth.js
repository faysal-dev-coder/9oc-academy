// hooks/useAuth.js
// ====================================
// Login, Register, Logout Actions
// Form এ ব্যবহার করা যাবে
// ====================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  // Error Clear করো
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // ─── LOGIN ───
  const login = async (formData) => {
    clearMessages();
    setLoading(true);

    try {
      await loginUser(formData);
      setSuccess("Login সফল হয়েছে! Dashboard এ নিয়ে যাচ্ছি...");
      setTimeout(() => router.push("/dashboard"), 1000);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
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

  // ─── LOGOUT ⭐ DEBUG VERSION ───
  const logout = async () => {
    console.log("🔓 [useAuth] logout() called");
    clearMessages();
    setLoading(true);

    try {
      console.log("📤 [useAuth] Calling logoutUser()...");
      const result = await logoutUser();
      console.log("📥 [useAuth] logoutUser() result:", result);

      setLoading(false);
      console.log("✅ [useAuth] Returning success");
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
