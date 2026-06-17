// app/admin/exams/page.js
// ═══════════════════════════════════════════════════════════════
// 📋 Admin Exams Page — Server Component
// ⭐ Phase 4: Exams CRUD
// ⭐ Auth check + DB queries + Pass plain data to Client components
// ═══════════════════════════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PageHeader from "@/components/admin/shared/PageHeader";
import ExamsStats from "@/components/admin/exams/ExamsStats";
import ExamTable from "@/components/admin/exams/ExamTable";

// Force dynamic — always fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminExamsPage() {
  const supabase = await createClient();

  // ════════════════════════════════════════════════════════════
  // 1. AUTH CHECK
  // ════════════════════════════════════════════════════════════
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ════════════════════════════════════════════════════════════
  // 2. ADMIN CHECK
  // ════════════════════════════════════════════════════════════
  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    redirect("/");
  }

  // ════════════════════════════════════════════════════════════
  // 3. FETCH DATA — Parallel for speed
  // ════════════════════════════════════════════════════════════
  const [examsResult, categoriesResult, coursesResult] = await Promise.all([
    supabase
      .from("exams")
      .select(
        `
        *,
        categories!exams_category_id_fkey (id, name),
        courses!exams_course_id_fkey (id, title)
        `
      )
      .order("created_at", { ascending: false }),

    supabase.from("categories").select("id, name").order("name", { ascending: true }),

    supabase.from("courses").select("id, title").order("title", { ascending: true }),
  ]);

  const exams = examsResult.data || [];
  const categories = categoriesResult.data || [];
  const courses = coursesResult.data || [];

  // ════════════════════════════════════════════════════════════
  // 4. CALCULATE STATS (Plain numbers only!)
  // ════════════════════════════════════════════════════════════
  const stats = {
    total: exams.length,
    active: exams.filter((e) => e.status === "active").length,
    free: exams.filter((e) => e.exam_type === "free").length,
    premium: exams.filter((e) => e.exam_type === "premium").length,
  };

  // ════════════════════════════════════════════════════════════
  // 5. RENDER (No icon props from Server!)
  // ════════════════════════════════════════════════════════════
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Exam Management"
        description="পরীক্ষা তৈরি, সম্পাদনা ও পরিচালনা করুন"
        badge={`${stats.total} Total`}
      />

      {/* Stats Cards (Client wrapper for icons) */}
      <ExamsStats stats={stats} />

      {/* Exams Table (Client component) */}
      <ExamTable initialExams={exams} categories={categories} courses={courses} />
    </div>
  );
}
