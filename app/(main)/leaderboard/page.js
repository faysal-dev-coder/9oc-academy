// ═══════════════════════════════════════════════════════════
// 🏆 LEADERBOARD PAGE (Server Component)
// ═══════════════════════════════════════════════════════════
// Purpose: Fetch all completed attempts, rank them,
// find current user position, pass to client component
// ═══════════════════════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LeaderboardClient from "@/components/leaderboard/LeaderboardClient";

export const metadata = {
  title: "লিডারবোর্ড | 9OC Academy",
  description: "শীর্ষ পরীক্ষার্থীদের তালিকা দেখুন",
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  // ─────────────────────────────────────────
  // 1️⃣ Auth Check
  // ─────────────────────────────────────────
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/leaderboard");
  }

  // ─────────────────────────────────────────
  // 2️⃣ Fetch all completed attempts
  // ─────────────────────────────────────────
  const { data: attempts, error } = await supabase
    .from("attempts")
    .select("id, user_id, score, wrong_count, time_taken_seconds, completed_at")
    .eq("status", "completed")
    .order("score", { ascending: false })
    .order("wrong_count", { ascending: true })
    .order("time_taken_seconds", { ascending: true });

  if (error) {
    console.error("Leaderboard fetch error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-24 pb-16">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">😓</div>
          <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
            লিডারবোর্ড লোড করতে সমস্যা হয়েছে!
          </h2>
          <p className="text-[#64748B]">কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // 3️⃣ Keep only FIRST attempt per user
  // ─────────────────────────────────────────
  const firstAttemptsMap = new Map();
  attempts.forEach((attempt) => {
    if (!firstAttemptsMap.has(attempt.user_id)) {
      firstAttemptsMap.set(attempt.user_id, attempt);
    }
  });

  const rankedAttempts = Array.from(firstAttemptsMap.values()).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.wrong_count !== b.wrong_count) return a.wrong_count - b.wrong_count;
    return a.time_taken_seconds - b.time_taken_seconds;
  });

  // ─────────────────────────────────────────
  // 4️⃣ Add rank + anonymous ID
  // ─────────────────────────────────────────
  const leaderboard = rankedAttempts.map((attempt, index) => ({
    rank: index + 1,
    user_id: attempt.user_id,
    anonymous_id: `#${String(index + 1).padStart(4, "0")}`,
    score: Number(attempt.score),
    wrong_count: attempt.wrong_count,
    time_taken_seconds: attempt.time_taken_seconds,
    is_current_user: attempt.user_id === user.id,
  }));

  // ─────────────────────────────────────────
  // 5️⃣ Find current user position
  // ─────────────────────────────────────────
  const currentUserEntry = leaderboard.find((entry) => entry.is_current_user);

  // ─────────────────────────────────────────
  // 6️⃣ Pass data to Client Component
  // ─────────────────────────────────────────
  return (
    <LeaderboardClient
      leaderboard={leaderboard}
      currentUser={currentUserEntry}
      totalParticipants={leaderboard.length}
    />
  );
}
