// ═══════════════════════════════════════════════════════════
// 👤 PROFILE PAGE (Server Component)
// ═══════════════════════════════════════════════════════════
// Purpose: Fetch profile, stats, leaderboard rank,
// preparation levels → pass to client
// ═══════════════════════════════════════════════════════════

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileClient from "@/components/profile/ProfileClient";
import { BANGLADESH_DISTRICTS } from "@/constants/districts";

export const metadata = {
  title: "প্রোফাইল | 9OC Academy",
  description: "আপনার প্রোফাইল ম্যানেজ করুন",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  // ─────────────────────────────────────────
  // 1️⃣ Auth Check
  // ─────────────────────────────────────────
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard/profile");
  }

  // ─────────────────────────────────────────
  // 2️⃣ Fetch Profile
  // ─────────────────────────────────────────
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  // ─────────────────────────────────────────
  // 3️⃣ Stats Calculation
  // ─────────────────────────────────────────
  const { count: attemptCount } = await supabase
    .from("attempts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "completed");

  const { data: scoreData } = await supabase
    .from("attempts")
    .select("score, total_marks, is_passed")
    .eq("user_id", user.id)
    .eq("status", "completed");

  let bestScore = 0;
  let passCount = 0;

  if (scoreData && scoreData.length > 0) {
    const percentages = scoreData.map((a) => {
      const total = Number(a.total_marks) || 0;
      const score = Number(a.score) || 0;
      return total > 0 ? Math.round((score / total) * 100) : 0;
    });
    bestScore = Math.max(...percentages);
    passCount = scoreData.filter((a) => a.is_passed === true).length;
  }

  const passRate = attemptCount > 0 ? Math.round((passCount / attemptCount) * 100) : 0;

  // ─────────────────────────────────────────
  // 4️⃣ Find Leaderboard Rank
  // ─────────────────────────────────────────
  const { data: allAttempts } = await supabase
    .from("attempts")
    .select("user_id, score, wrong_count, time_taken_seconds")
    .eq("status", "completed")
    .order("score", { ascending: false })
    .order("wrong_count", { ascending: true })
    .order("time_taken_seconds", { ascending: true });

  let userRank = null;
  if (allAttempts && allAttempts.length > 0) {
    // Keep only first attempt per user
    const firstAttempts = new Map();
    allAttempts.forEach((a) => {
      if (!firstAttempts.has(a.user_id)) {
        firstAttempts.set(a.user_id, a);
      }
    });

    const sorted = Array.from(firstAttempts.values()).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.wrong_count !== b.wrong_count) return a.wrong_count - b.wrong_count;
      return a.time_taken_seconds - b.time_taken_seconds;
    });

    const index = sorted.findIndex((a) => a.user_id === user.id);
    if (index !== -1) {
      userRank = index + 1;
    }
  }

  // ─────────────────────────────────────────
  // 5️⃣ Fetch Active Preparation Levels
  // ─────────────────────────────────────────
  const { data: preparationLevels } = await supabase
    .from("preparation_levels")
    .select("id, name, slug, icon")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  // ─────────────────────────────────────────
  // 6️⃣ Pass to Client Component
  // ─────────────────────────────────────────
  return (
    <ProfileClient
      user={user}
      profile={profile}
      stats={{
        attempts: attemptCount || 0,
        bestScore,
        passRate,
        leaderboardRank: userRank,
      }}
      districts={BANGLADESH_DISTRICTS}
      preparationLevels={preparationLevels || []}
    />
  );
}
