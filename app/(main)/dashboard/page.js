// app/(main)/dashboard/page.js
// ✅ Server Component

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server"; // ⭐ FIXED: createClient
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata = {
  title: "Dashboard — 9OC Academy",
  description: "আপনার শেখার যাত্রার সারাংশ",
};

export default async function DashboardPage() {
  // ⭐ FIXED: createClient() use করো
  const supabase = await createClient();

  // Current User চেক
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // Not Logged In → /login
  if (!user || userError) {
    redirect("/login");
  }

  // Profile Data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  // Stats
  const { count: enrollmentCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: attemptCount } = await supabase
    .from("attempts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return (
    <DashboardClient
      user={user}
      profile={profile}
      stats={{
        enrollments: enrollmentCount || 0,
        attempts: attemptCount || 0,
        avgScore: 0,
        completed: 0,
      }}
    />
  );
}
