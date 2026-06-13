// app/admin/categories/page.js
// ═══════════════════════════════════════════
// Admin Categories — Main List Page
// ═══════════════════════════════════════════
// Server Component → Fetch data → Pass to Client
// ⭐ Real-time counts from courses + exams
// ═══════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CategoryTable from "@/components/admin/categories/CategoryTable";

// ⭐ Force dynamic — Always fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ──────────────────────────────────────────
// Data Fetch Function
// ──────────────────────────────────────────
async function getCategoriesWithCounts() {
  const supabase = await createClient();

  // Fetch all categories ordered by display_order
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (catError) {
    console.error("Categories fetch error:", catError);
    return [];
  }

  // Get course counts (active only)
  const { data: courses } = await supabase
    .from("courses")
    .select("category_id")
    .neq("status", "archived");

  // Get exam counts
  const { data: exams } = await supabase.from("exams").select("category_id");

  // Merge counts
  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    courses_count: courses?.filter((c) => c.category_id === cat.id).length || 0,
    exams_count: exams?.filter((e) => e.category_id === cat.id).length || 0,
  }));

  return categoriesWithCounts;
}

// ──────────────────────────────────────────
// Page Component
// ──────────────────────────────────────────
export default async function CategoriesPage() {
  const supabase = await createClient();

  // ⭐ Auth Check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ⭐ Admin Check
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    redirect("/");
  }

  // ⭐ Fetch Data
  const categories = await getCategoriesWithCounts();

  // ⭐ Stats Summary
  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => c.is_active).length;
  const totalCourses = categories.reduce((sum, c) => sum + c.courses_count, 0);
  const totalExams = categories.reduce((sum, c) => sum + c.exams_count, 0);

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937]">🏷️ Category Management</h1>
          <p className="text-sm text-[#64748B] mt-1">
            সকল exam category manage করুন (Add, Edit, Delete, Reorder)
          </p>
        </div>
      </div>

      {/* ─── Stats Cards ─────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Categories */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 hover:shadow-md transition-all">
          <p className="text-xs text-[#64748B] mb-1">মোট Category</p>
          <p className="text-2xl font-bold text-[#1F2937]">{totalCategories}</p>
        </div>

        {/* Active */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 hover:shadow-md transition-all">
          <p className="text-xs text-[#64748B] mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">{activeCategories}</p>
        </div>

        {/* Total Courses */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 hover:shadow-md transition-all">
          <p className="text-xs text-[#64748B] mb-1">মোট Course</p>
          <p className="text-2xl font-bold text-[#1E9CD7]">{totalCourses}</p>
        </div>

        {/* Total Exams */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 hover:shadow-md transition-all">
          <p className="text-xs text-[#64748B] mb-1">মোট Exam</p>
          <p className="text-2xl font-bold text-[#7C3AED]">{totalExams}</p>
        </div>
      </div>

      {/* ─── Category Table (Client Component) ───── */}
      <CategoryTable initialCategories={categories} />
    </div>
  );
}
