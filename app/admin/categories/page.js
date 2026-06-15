// app/admin/categories/page.js
// ═══════════════════════════════════════════
// Admin Categories — Main List Page
// ═══════════════════════════════════════════
// Server Component → Fetch data → Pass to Client
// ⭐ Real-time counts from courses + exams
// ⭐ Matches Exam page pattern exactly (consistency!)
// ═══════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CategoryTable from "@/components/admin/categories/CategoryTable";
import {
  HiOutlineFolder,
  HiOutlineCheckCircle,
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";

// Force dynamic — always fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ──────────────────────────────────────────
// Data Fetch Function
// ──────────────────────────────────────────
async function getCategoriesWithCounts() {
  const supabase = await createClient();

  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (catError) {
    console.error("Categories fetch error:", catError);
    return [];
  }

  const { data: courses } = await supabase
    .from("courses")
    .select("category_id")
    .neq("status", "archived");

  const { data: exams } = await supabase.from("exams").select("category_id");

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

  // ════════════════════════════════════════════════════════════
  // 1. AUTH CHECK
  // ════════════════════════════════════════════════════════════
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // ════════════════════════════════════════════════════════════
  // 2. ADMIN CHECK
  // ════════════════════════════════════════════════════════════
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/");

  // ════════════════════════════════════════════════════════════
  // 3. FETCH DATA
  // ════════════════════════════════════════════════════════════
  const categories = await getCategoriesWithCounts();

  // ════════════════════════════════════════════════════════════
  // 4. CALCULATE STATS
  // ════════════════════════════════════════════════════════════
  const stats = {
    total: categories.length,
    active: categories.filter((c) => c.is_active).length,
    courses: categories.reduce((sum, c) => sum + c.courses_count, 0),
    exams: categories.reduce((sum, c) => sum + c.exams_count, 0),
  };

  // ════════════════════════════════════════════════════════════
  // 5. RENDER
  // ════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Category Management</h1>
          <p className="mt-1 text-sm text-slate-600 md:text-base">
            সকল exam category তৈরি, সম্পাদনা এবং পরিচালনা করুন
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {/* Total Categories */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 md:text-sm">Categories</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">{stats.total}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                <HiOutlineFolder className="size-5 text-blue-600 md:size-6" />
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 md:text-sm">Active</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600 md:text-3xl">
                  {stats.active}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-2 md:p-3">
                <HiOutlineCheckCircle className="size-5 text-emerald-600 md:size-6" />
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 md:text-sm">Courses</p>
                <p className="mt-1 text-2xl font-bold text-amber-600 md:text-3xl">
                  {stats.courses}
                </p>
              </div>
              <div className="rounded-lg bg-amber-50 p-2 md:p-3">
                <HiOutlineBookOpen className="size-5 text-amber-600 md:size-6" />
              </div>
            </div>
          </div>

          {/* Exams */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 md:text-sm">Exams</p>
                <p className="mt-1 text-2xl font-bold text-purple-600 md:text-3xl">{stats.exams}</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-2 md:p-3">
                <HiOutlineClipboardDocumentList className="size-5 text-purple-600 md:size-6" />
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY TABLE */}
        <CategoryTable initialCategories={categories} />
      </div>
    </div>
  );
}
