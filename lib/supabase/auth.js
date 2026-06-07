// lib/supabase/auth.js
// ====================================
// Supabase Auth Helper Functions
// ====================================

import { createClient } from "@/lib/supabase/client";

// ─────────────────────────────────────
// 1. REGISTER — নতুন User তৈরি করো
// ─────────────────────────────────────
export async function registerUser({ email, password, fullName, phone }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
      },
      emailRedirectTo: `${window.location.origin}/verify-email`,
    },
  });

  if (error) {
    throw new Error(getAuthErrorMessage(error.message));
  }

  return data;
}

// ─────────────────────────────────────
// 2. LOGIN — Email + Password দিয়ে
// ─────────────────────────────────────
export async function loginUser({ email, password }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(getAuthErrorMessage(error.message));
  }

  return data;
}

// ─────────────────────────────────────
// 3. LOGOUT ⭐ HYBRID APPROACH (Guaranteed Work!)
// ─────────────────────────────────────
// Problem: signOut() sometimes hangs (slow internet)
// Solution:
//   1. Fire signOut() in background (don't wait)
//   2. Manually clear localStorage + cookies (instant)
//   3. Let caller do hard reload (proxy.js will refresh)
export async function logoutUser() {
  const supabase = createClient();

  // Step 1: Fire signOut() — Don't wait for response
  // .catch() — যদি Hang করে, Error হলেও Continue করবে
  supabase.auth.signOut({ scope: "global" }).catch((err) => {
    console.warn("signOut() background error:", err);
  });

  // Step 2: Manual Clear localStorage (Instant!)
  if (typeof window !== "undefined") {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.includes("supabase") || key.includes("sb-")) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn("localStorage clear error:", e);
    }

    // Step 3: Manual Clear Cookies (Instant!)
    try {
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        if (name.includes("supabase") || name.includes("sb-")) {
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      });
    } catch (e) {
      console.warn("Cookie clear error:", e);
    }
  }

  // Always return success — Manual Clear hoyeche
  return true;
}

// ─────────────────────────────────────
// 4. FORGOT PASSWORD — Reset Email পাঠাও
// ─────────────────────────────────────
export async function forgotPassword({ email }) {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new Error(getAuthErrorMessage(error.message));
  }

  return true;
}

// ─────────────────────────────────────
// 5. RESET PASSWORD — নতুন Password Set
// ─────────────────────────────────────
export async function resetPassword({ newPassword }) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(getAuthErrorMessage(error.message));
  }

  return true;
}

// ─────────────────────────────────────
// 6. GET CURRENT USER — কে Login আছে?
// ─────────────────────────────────────
export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

// ─────────────────────────────────────
// 7. GET USER PROFILE — DB থেকে Profile
// ─────────────────────────────────────
export async function getUserProfile(userId) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle(); // ⭐ .single() → .maybeSingle() (Safer)

  if (error) {
    return null;
  }

  return data;
}

// ─────────────────────────────────────
// 8. ERROR MESSAGES — Bangla তে
// ─────────────────────────────────────
function getAuthErrorMessage(message) {
  const errorMessages = {
    "Invalid login credentials": "Email বা Password ভুল। আবার চেষ্টা করো।",
    "Email not confirmed": "Email Verify করা হয়নি। Inbox চেক করো।",
    "User already registered": "এই Email দিয়ে আগেই Account আছে। Login করো।",
    "Password should be at least 6 characters": "Password কমপক্ষে ৬ অক্ষর হতে হবে।",
    "Unable to validate email address: invalid format": "সঠিক Email দাও।",
    "Email rate limit exceeded": "অনেকবার চেষ্টা করেছো। কিছুক্ষণ পরে আবার চেষ্টা করো।",
    "For security purposes, you can only request this once every 60 seconds":
      "৬০ সেকেন্ড পরে আবার চেষ্টা করো।",
    "New password should be different from the old password":
      "নতুন Password আগেরটার মতো হওয়া যাবে না।",
    "signup is disabled": "Registration বর্তমানে বন্ধ আছে।",
    "Email link is invalid or has expired": "Link টি মেয়াদ শেষ। আবার চেষ্টা করো।",
  };

  if (errorMessages[message]) {
    return errorMessages[message];
  }

  for (const [key, value] of Object.entries(errorMessages)) {
    if (message.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।";
}
