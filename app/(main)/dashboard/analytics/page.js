import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AnalyticsClient from "@/components/dashboard/AnalyticsClient";

export const metadata = {
  title: "পারফরম্যান্স এনালিটিক্স - 9OC Academy",
  description: "আপনার পরীক্ষার বিস্তারিত বিশ্লেষণ দেখুন",
};

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all completed attempts
  const { data: attempts, error } = await supabase
    .from("attempts")
    .select(
      `
      id,
      exam_id,
      score,
      total_marks,
      is_passed,
      time_taken_seconds,
      correct_count,
      wrong_count,
      skipped_count,
      completed_at,
      exams (
        title,
        category_id,
        categories (
          name
        )
      )
    `
    )
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("completed_at", { ascending: true });

  if (error) {
    console.error("Analytics fetch error:", error);
  }

  return <AnalyticsClient attempts={attempts || []} />;
}
