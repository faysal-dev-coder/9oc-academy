// lib/supabase/auth.js
// ====================================
// Supabase Auth Helper Functions
// সব Auth কাজ এখানে থেকে হবে
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
// 3. LOGOUT ⭐ FIXED (scope: 'local')
// ─────────────────────────────────────
// scope: 'local' use করছি কারণ:
// → 'global' (default) সব Device থেকে Logout — Hang হয়
// → 'local' শুধু এই Browser থেকে Logout — Fast + Reliable
export async function logoutUser() {
  console.log("🚀 [auth.js] logoutUser() started");
  const supabase = createClient();
  console.log("📦 [auth.js] Supabase client created");

  console.log("🔧 [auth.js] Calling signOut() with local scope...");
  const { error } = await supabase.auth.signOut({ scope: "local" });
  console.log("📋 [auth.js] signOut() done. Error:", error);

  if (error) {
    console.error("❌ [auth.js] signOut error:", error);
    throw new Error("Logout করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
  }

  console.log("✅ [auth.js] Logout successful");
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

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

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
