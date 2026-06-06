// hooks/useUser.js
// ====================================
// Current User এর Info পাওয়ার Hook
// ⭐ Optimized — Faster Initial Load
// ====================================

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useUser() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Safety Timeout — 3 sec পর Force Loading false
    const safetyTimer = setTimeout(() => {
      console.warn("⚠️ [useUser] Safety timeout — forcing loading=false");
      setLoading(false);
    }, 3000);

    const loadProfile = async (userId, supabaseClient) => {
      try {
        const { data, error } = await supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle();

        if (error) {
          console.error("Profile error:", error);
        }
        if (data) {
          setProfile(data);
        }
      } catch (err) {
        console.error("loadProfile crash:", err);
      }
    };

    // ⭐ getSession() ব্যবহার করি (Faster than getUser())
    // getUser() → Server এ Validate করে (Slow)
    // getSession() → Local Storage থেকে নেয় (Fast)
    const getInitialUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          await loadProfile(session.user.id, supabase);
        }
      } catch (err) {
        console.error("getInitialUser crash:", err);
      } finally {
        clearTimeout(safetyTimer);
        setTimeout(() => setLoading(false), 0);
      }
    };

    getInitialUser();

    // Auth State Change Listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔔 Auth event:", event);

      if (event === "SIGNED_OUT" || !session?.user) {
        setUser(null);
        setProfile(null);
      } else if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user.id, supabase);
      }

      clearTimeout(safetyTimer);
      setTimeout(() => setLoading(false), 0);
    });

    return () => {
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    loading,
    isLoggedIn: !!user,
    isAdmin: profile?.role === "admin",
  };
}
