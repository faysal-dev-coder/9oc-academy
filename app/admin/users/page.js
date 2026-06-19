// app/admin/users/page.js
// ═══════════════════════════════════════════
// Admin Users Page — Server Component
// ═══════════════════════════════════════════
// Auth + Admin check → fetch profiles → stats → render
// ═══════════════════════════════════════════

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/shared/PageHeader";
import UsersStats from "@/components/admin/users/UsersStats";
import UserTable from "@/components/admin/users/UserTable";

export const metadata = {
  title: "ইউজার ব্যবস্থাপনা | অ্যাডমিন",
  description: "সকল ইউজার দেখুন, edit করুন ও role পরিবর্তন করুন",
};

export default async function UsersPage() {
  const supabase = await createClient();

  // ═══════════════════════════════════════════════
  // 1. Auth check
  // ═══════════════════════════════════════════════
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/users");
  }

  // ═══════════════════════════════════════════════
  // 2. Admin check
  // ═══════════════════════════════════════════════
  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // ═══════════════════════════════════════════════
  // 3. Fetch users (profiles)
  // ═══════════════════════════════════════════════
  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const usersList = users || [];

  // ═══════════════════════════════════════════════
  // 4. Calculate stats (plain numbers!)
  // ═══════════════════════════════════════════════
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const stats = {
    total: usersList.length,
    admins: usersList.filter((u) => u.role === "admin").length,
    students: usersList.filter((u) => u.role === "student").length,
    newThisWeek: usersList.filter((u) => new Date(u.created_at) >= oneWeekAgo).length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="ইউজার ব্যবস্থাপনা"
        description="সকল ইউজার দেখুন, edit করুন ও role পরিবর্তন করুন"
        badge={{ label: `${stats.total} জন`, variant: "brand" }}
      />

      <UsersStats stats={stats} />

      <UserTable initialUsers={usersList} currentUserId={user.id} />
    </div>
  );
}
