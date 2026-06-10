// app/(main)/dashboard/page.js
// ✅ Server Component — Correct Column Names

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata = {
  title: "Dashboard — 9OC Academy",
  description: "আপনার শেখার যাত্রার সারাংশ",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // ── Current User ──
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect("/login");
  }

  // ── Profile Data ──
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  // ── Total Completed Attempts Count ──
  const { count: attemptCount } = await supabase
    .from("attempts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "completed");

  // ── Score Stats (Completed Only) ──
  const { data: scoreData } = await supabase
    .from("attempts")
    .select("score, total_marks, is_passed, time_taken_seconds, completed_at, exam_id")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("completed_at", { ascending: false });

  // ── Calculate Stats ──
  let avgScore = 0;
  let bestScore = 0;
  let passCount = 0;
  let totalTimeTaken = 0;

  if (scoreData && scoreData.length > 0) {
    const percentages = scoreData.map((a) => {
      const total = Number(a.total_marks) || 0;
      const score = Number(a.score) || 0;
      return total > 0 ? Math.round((score / total) * 100) : 0;
    });

    avgScore = Math.round(percentages.reduce((sum, p) => sum + p, 0) / percentages.length);

    bestScore = Math.max(...percentages);

    passCount = scoreData.filter((a) => a.is_passed === true).length;

    totalTimeTaken = scoreData.reduce((sum, a) => sum + (Number(a.time_taken_seconds) || 0), 0);
  }

  // ── Pass Rate ──
  const passRate = attemptCount > 0 ? Math.round((passCount / attemptCount) * 100) : 0;

  // ── Recent Attempts (Last 5) ──
  const { data: recentAttempts } = await supabase
    .from("attempts")
    .select(
      `
      id,
      score,
      total_marks,
      is_passed,
      time_taken_seconds,
      completed_at,
      exams (
        id,
        title
      )
    `
    )
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("completed_at", { ascending: false })
    .limit(5);

  // ── Enrollments (Safe) ──
  let enrollmentCount = 0;
  try {
    const { count } = await supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    enrollmentCount = count || 0;
  } catch (err) {
    enrollmentCount = 0;
  }

  return (
    <DashboardClient
      user={user}
      profile={profile}
      stats={{
        attempts: attemptCount || 0,
        enrollments: enrollmentCount,
        avgScore: avgScore,
        bestScore: bestScore,
        passRate: passRate,
        passCount: passCount,
        totalTimeTaken: totalTimeTaken,
      }}
      recentAttempts={recentAttempts || []}
    />
  );
}
