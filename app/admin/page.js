// app/admin/page.js
// ═══════════════════════════════════════════════════════════════
// 📊 Admin Dashboard — Real Stats
// Server Component → Supabase থেকে real data fetch করে
// ⭐ admin_users_view ব্যবহার করে email + phone দুটোই আনে
// ═══════════════════════════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { HiShieldCheck, HiSparkles } from "react-icons/hi2";
import DashboardStats from "@/components/admin/stats/DashboardStats";

export const metadata = {
  title: "Admin Dashboard — 9OC Academy",
  description: "9OC Academy Admin Control Panel",
};

// ⭐ Force fresh data (no cache)
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ═══════════════════════════════════
// DATA FETCHING
// ═══════════════════════════════════
async function getDashboardData() {
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: totalCourses },
    { count: totalExams },
    { count: totalQuestions },
    { count: totalAttempts },
    { count: pendingPaymentsCount },
    { data: recentUsers, error: usersError },
    { data: recentAttempts, error: attemptsError },
    { data: pendingPayments },
  ] = await Promise.all([
    // 1. Total Users
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),

    // 2. Total Courses
    supabase.from("courses").select("*", { count: "exact", head: true }),

    // 3. Total Exams
    supabase.from("exams").select("*", { count: "exact", head: true }),

    // 4. Total Questions
    supabase.from("questions").select("*", { count: "exact", head: true }),

    // 5. Total Attempts
    supabase.from("attempts").select("*", { count: "exact", head: true }),

    // 6. Pending Payments
    supabase.from("payments").select("*", { count: "exact", head: true }).eq("status", "pending"),

    // 7. ⭐ Recent Users from VIEW (email + phone সহ)
    supabase
      .from("admin_users_view")
      .select("id, full_name, email, phone, avatar_url, role, created_at")
      .order("created_at", { ascending: false })
      .limit(6),

    //     // 8. Recent Attempts with user info — ⭐ FIXED: manual FK hint
    supabase
      .from("attempts")
      .select(
        `
        id,
        score,
        status,
        created_at,
        user_id,
        exam_id,
        profiles:user_id ( full_name, phone ),
        exams:exam_id ( title )
      `
      )
      .order("created_at", { ascending: false })
      .limit(6),

    // 9. Pending Payments list
    supabase.from("payments").select("id, status, created_at").eq("status", "pending").limit(5),
  ]);

  // 🔍 Debug logs
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔍 ADMIN DASHBOARD DEBUG:");
  console.log("📊 Total Users:", totalUsers);
  console.log("📊 Total Attempts:", totalAttempts);
  console.log("📋 Recent Users count:", recentUsers?.length || 0);
  if (usersError) console.log("❌ Users Error:", usersError);
  console.log("📋 Recent Attempts count:", recentAttempts?.length || 0);
  if (attemptsError) console.log("❌ Attempts Error:", attemptsError);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  return {
    stats: {
      totalUsers: totalUsers || 0,
      totalCourses: totalCourses || 0,
      totalExams: totalExams || 0,
      totalQuestions: totalQuestions || 0,
      totalAttempts: totalAttempts || 0,
      pendingPaymentsCount: pendingPaymentsCount || 0,
    },
    recentUsers: recentUsers || [],
    recentAttempts: recentAttempts || [],
    pendingPayments: pendingPayments || [],
  };
}

// ═══════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════
export default async function AdminDashboardPage() {
  const { stats, recentUsers, recentAttempts, pendingPayments } = await getDashboardData();

  return (
    <div className="space-y-6">
      {/* ═══ Welcome Header ═══ */}
      <div
        className="rounded-3xl border-2 border-[#1E9CD7]/20 p-6 sm:p-8 shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, rgba(30,156,215,0.08) 0%, rgba(255,255,255,1) 50%, rgba(10,90,138,0.04) 100%)",
        }}
      >
        <div className="flex items-start gap-5">
          <div
            className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
              boxShadow: "0 8px 24px rgba(30,156,215,0.3)",
            }}
          >
            <HiShieldCheck className="text-2xl sm:text-3xl" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937]">Admin Dashboard</h2>
              <HiSparkles className="text-xl sm:text-2xl text-[#FBBF24] shrink-0" />
            </div>
            <p className="text-sm sm:text-base text-[#475569] mb-4">
              9OC Academy-র সকল কার্যক্রম এখান থেকে পরিচালনা করুন।
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[#1E9CD7] animate-pulse" />
                <span className="text-xs font-semibold text-blue-700">
                  {stats.totalUsers} Students
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[#059669]" />
                <span className="text-xs font-semibold text-green-700">
                  {stats.totalExams} Exams Live
                </span>
              </div>
              {stats.pendingPaymentsCount > 0 && (
                <div className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#D97706] animate-pulse" />
                  <span className="text-xs font-semibold text-amber-700">
                    {stats.pendingPaymentsCount} Payments Pending
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Main Dashboard Stats ═══ */}
      <DashboardStats
        stats={stats}
        recentUsers={recentUsers}
        recentAttempts={recentAttempts}
        pendingPayments={pendingPayments}
      />
    </div>
  );
}
