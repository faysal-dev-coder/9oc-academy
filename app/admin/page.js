// app/admin/page.js
// ═══════════════════════════════════════════════════════════════
// 📊 Admin Dashboard — Premium v3 (Chat 41)
// ⭐ HYBRID: 60% new sections + 40% existing
// ⭐ Top Exams + Activity Chart + Categories + System Status
// ═══════════════════════════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/shared/PageHeader";
import DashboardStats from "@/components/admin/stats/DashboardStats";

export const metadata = {
  title: "Admin Dashboard — 9OC Academy",
  description: "9OC Academy Admin Control Panel",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ═══════════════════════════════════
// HELPER: 30-day trend calculation
// ═══════════════════════════════════
async function getTrend(supabase, table, dateField = "created_at", filter = null) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  let q1 = supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .gte(dateField, thirtyDaysAgo.toISOString());

  let q2 = supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .gte(dateField, sixtyDaysAgo.toISOString())
    .lt(dateField, thirtyDaysAgo.toISOString());

  if (filter) {
    q1 = q1.eq(filter.col, filter.val);
    q2 = q2.eq(filter.col, filter.val);
  }

  const [{ count: current }, { count: previous }] = await Promise.all([q1, q2]);
  const curr = current || 0;
  const prev = previous || 0;

  if (prev === 0 && curr === 0) return { value: "0.0%", trend: "neutral" };
  if (prev === 0) return { value: `+${curr}`, trend: "up" };

  const change = ((curr - prev) / prev) * 100;
  const sign = change >= 0 ? "+" : "";
  const trend = change > 0 ? "up" : change < 0 ? "down" : "neutral";
  return { value: `${sign}${change.toFixed(1)}%`, trend };
}

// ═══════════════════════════════════
// HELPER: Group attempts by day (last 7 days)
// ═══════════════════════════════════
async function getLast7DaysActivity(supabase) {
  const days = [];
  const now = new Date();

  // Build day labels (last 7 days)
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    days.push({
      date: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      count: 0,
    });
  }

  // Fetch attempts in this range
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const { data: attempts } = await supabase
    .from("attempts")
    .select("started_at")
    .gte("started_at", sevenDaysAgo.toISOString());

  // Group by day
  if (attempts) {
    attempts.forEach((a) => {
      const day = a.started_at?.split("T")[0];
      const found = days.find((d) => d.date === day);
      if (found) found.count++;
    });
  }

  return days;
}

// ═══════════════════════════════════
// HELPER: Top 5 exams by attempts
// ═══════════════════════════════════
async function getTopExams(supabase) {
  const { data: exams } = await supabase.from("exams").select("id, title").limit(20);

  if (!exams || exams.length === 0) return [];

  // Get attempts count for each exam
  const results = await Promise.all(
    exams.map(async (exam) => {
      const { count } = await supabase
        .from("attempts")
        .select("*", { count: "exact", head: true })
        .eq("exam_id", exam.id);
      return { ...exam, attempts: count || 0 };
    })
  );

  // Sort by attempts and take top 5
  return results.sort((a, b) => b.attempts - a.attempts).slice(0, 5);
}

// ═══════════════════════════════════
// HELPER: Category breakdown
// ═══════════════════════════════════
async function getCategoryStats(supabase) {
  const { data: categories } = await supabase.from("categories").select("id, name").limit(10);

  if (!categories || categories.length === 0) return [];

  const results = await Promise.all(
    categories.map(async (cat) => {
      const { count } = await supabase
        .from("exams")
        .select("*", { count: "exact", head: true })
        .eq("category_id", cat.id);
      return { ...cat, exams: count || 0 };
    })
  );

  return results.sort((a, b) => b.exams - a.exams).slice(0, 5);
}

// ═══════════════════════════════════
// MAIN DATA FETCH
// ═══════════════════════════════════
async function getDashboardData() {
  const supabase = await createClient();

  // Current admin user
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  let currentProfile = null;
  if (currentUser) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", currentUser.id)
      .single();
    currentProfile = data;
  }

  const [
    { count: totalUsers },
    { count: totalCourses },
    { count: totalExams },
    { count: totalQuestions },
    { count: totalAttempts },
    { count: totalCategories },
    { count: pendingPaymentsCount },
    { data: recentUsers },
    { data: recentAttempts },
    // Trends
    usersTrend,
    examsTrend,
    attemptsTrend,
    questionsTrend,
    // New sections
    topExams,
    activity7Days,
    categoryStats,
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("exams").select("*", { count: "exact", head: true }),
    supabase.from("questions").select("*", { count: "exact", head: true }),
    supabase.from("attempts").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase
      .from("admin_users_view")
      .select("id, full_name, email, phone, avatar_url, role, created_at")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase.rpc("get_recent_attempts", { limit_count: 4 }),
    // Trends
    getTrend(supabase, "profiles", "created_at", { col: "role", val: "student" }),
    getTrend(supabase, "exams"),
    getTrend(supabase, "attempts", "started_at"),
    getTrend(supabase, "questions"),
    // New sections
    getTopExams(supabase),
    getLast7DaysActivity(supabase),
    getCategoryStats(supabase),
  ]);

  // System status (mock — would be real health checks in production)
  const systemStatus = [
    { name: "Database", status: "healthy", message: "Connected" },
    { name: "Storage", status: "healthy", message: "Available" },
    { name: "Auth Service", status: "healthy", message: "Operational" },
    { name: "API", status: "healthy", message: "Responsive" },
  ];

  return {
    currentUser: {
      name: currentProfile?.full_name || currentUser?.email?.split("@")[0] || "Admin",
      email: currentUser?.email || "",
      avatar: currentProfile?.avatar_url || null,
    },
    stats: {
      totalUsers: totalUsers || 0,
      totalCourses: totalCourses || 0,
      totalExams: totalExams || 0,
      totalQuestions: totalQuestions || 0,
      totalAttempts: totalAttempts || 0,
      totalCategories: totalCategories || 0,
      pendingPaymentsCount: pendingPaymentsCount || 0,
    },
    trends: {
      users: usersTrend,
      exams: examsTrend,
      attempts: attemptsTrend,
      questions: questionsTrend,
    },
    recentUsers: recentUsers || [],
    recentAttempts: recentAttempts || [],
    topExams: topExams || [],
    activity7Days: activity7Days || [],
    categoryStats: categoryStats || [],
    systemStatus,
  };
}

// ═══════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════
export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="9OC Academy-র সকল কার্যক্রম এক নজরে — real-time insights."
      />

      <DashboardStats {...data} />
    </div>
  );
}
