// contexts/UserContext.jsx
// ====================================
// Global User State Provider
// ⭐ DEADLOCK FIX VERSION
// onAuthStateChange এর ভিতর await supabase করা যাবে না!
// setTimeout(0) দিয়ে async work defer করি
// ====================================

"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const UserContext = createContext({
  user: null,
  profile: null,
  loading: true,
  isLoggedIn: false,
  isAdmin: false,
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMountedRef = useRef(true);

  useEffect(() => {
    const supabase = createClient();
    isMountedRef.current = true;
    let hasFinished = false;

    const finishLoading = () => {
      if (hasFinished || !isMountedRef.current) return;
      hasFinished = true;
      setLoading(false);
      console.log("🏁 [UserContext] Loading = false");
    };

    const safetyTimer = setTimeout(() => {
      if (!hasFinished) {
        console.warn("⚠️ [UserContext] Safety timeout — forcing loading=false");
        finishLoading();
      }
    }, 5000);

    // ─── Load Profile (Separate function — NOT inside auth callback) ───
    const loadProfile = async (userId) => {
      try {
        console.log("📥 [UserContext] Loading profile for:", userId);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle();

        if (error) {
          console.error("❌ [UserContext] Profile error:", error);
          return null;
        }
        console.log("✅ [UserContext] Profile loaded");
        return data;
      } catch (err) {
        console.error("💥 [UserContext] loadProfile crash:", err);
        return null;
      }
    };

    // ⭐ Auth State Change Listener
    // 🚨 CRITICAL: Callback এর ভিতর await supabase.* কখনো করো না!
    // 🚨 এটা DEADLOCK তৈরি করে
    console.log("🔍 [UserContext] Setting up auth listener...");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔔 [UserContext] Auth event:", event, "→", session?.user?.email || "no-user");

      if (!isMountedRef.current) return;

      // ⭐ Synchronous state updates only (safe)
      if (session?.user) {
        setUser(session.user);
        console.log("✅ [UserContext] User set:", session.user.email);
      } else {
        setUser(null);
        setProfile(null);
        console.log("👤 [UserContext] Guest mode");
      }

      // ⭐ Loading শেষ — immediately
      clearTimeout(safetyTimer);
      finishLoading();

      // 🔥 FIX: Async work কে DEFER করি setTimeout(0) দিয়ে
      // এটা Supabase auth lock release হবার পর run করবে
      if (session?.user) {
        setTimeout(async () => {
          if (!isMountedRef.current) return;
          const profileData = await loadProfile(session.user.id);
          if (isMountedRef.current && profileData) {
            setProfile(profileData);
          }
        }, 0);
      }
    });

    // ─── Cleanup ───
    return () => {
      isMountedRef.current = false;
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
    isLoggedIn: !!user,
    isAdmin: profile?.role === "admin",
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// ⭐ Custom Hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
