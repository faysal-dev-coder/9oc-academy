// app/(main)/dashboard/history/page.js
// ✅ Server Component — All Attempts Fetch

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import HistoryClient from "@/components/dashboard/HistoryClient";

export const metadata = {
  title: "পরীক্ষার ইতিহাস — 9OC Academy",
  description: "আপনার সব পরীক্ষার ফলাফল দেখুন",
};

export default async function HistoryPage() {
  const supabase = await createClient();

  // ── Auth Check ──
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect("/login");
  }

  // ── All Completed Attempts ──
  const { data: attempts } = await supabase
    .from("attempts")
    .select(
      `
      id,
      score,
      total_marks,
      is_passed,
      time_taken_seconds,
      completed_at,
      correct_count,
      wrong_count,
      skipped_count,
      exams (
        id,
        title,
        category_id,
        categories (
          id,
          name
        )
      )
    `
    )
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("completed_at", { ascending: false });

  // ── Summary Stats ──
  const totalAttempts = attempts?.length || 0;
  let passCount = 0;
  let avgScore = 0;

  if (attempts && attempts.length > 0) {
    passCount = attempts.filter((a) => a.is_passed === true).length;

    const percentages = attempts.map((a) => {
      const total = Number(a.total_marks) || 0;
      const score = Number(a.score) || 0;
      return total > 0 ? Math.round((score / total) * 100) : 0;
    });

    avgScore = Math.round(percentages.reduce((sum, p) => sum + p, 0) / percentages.length);
  }

  return (
    <HistoryClient
      attempts={attempts || []}
      summary={{
        total: totalAttempts,
        passed: passCount,
        failed: totalAttempts - passCount,
        avgScore: avgScore,
      }}
    />
  );
}
