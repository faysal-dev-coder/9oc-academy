// app/admin/categories/page.js
// ═══════════════════════════════════════════════════════════════
// 📁 Admin Categories — Main List Page
// ═══════════════════════════════════════════════════════════════
// Server Component → Fetch data → Pass to Client
// ⭐ Uses: PageHeader (server) + CategoriesStats (client) + CategoryTable (client)
// ⭐ Pattern: Server fetches DB → Pure data passed to Client components
// ═══════════════════════════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import PageHeader from "@/components/admin/shared/PageHeader";
import CategoriesStats from "@/components/admin/categories/CategoriesStats";
import CategoryTable from "@/components/admin/categories/CategoryTable";

// ─────────────────────────────────────────────
//  PAGE CONFIG (always fresh data)
// ─────────────────────────────────────────────
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ─────────────────────────────────────────────
//  DATA FETCHING
// ─────────────────────────────────────────────
async function getCategoriesWithCounts() {
  const supabase = await createClient();

  // Fetch all categories (ordered)
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (catError) {
    console.error("Categories fetch error:", catError);
    return [];
  }

  // Fetch related counts
  const { data: courses } = await supabase
    .from("courses")
    .select("category_id")
    .neq("status", "archived");

  const { data: exams } = await supabase.from("exams").select("category_id");

  // Merge counts into categories
  return categories.map((cat) => ({
    ...cat,
    courses_count: courses?.filter((c) => c.category_id === cat.id).length || 0,
    exams_count: exams?.filter((e) => e.category_id === cat.id).length || 0,
  }));
}

// ─────────────────────────────────────────────
//  PAGE COMPONENT
// ─────────────────────────────────────────────
export default async function CategoriesPage() {
  const supabase = await createClient();

  // ── 1. Auth Check ──
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // ── 2. Admin Check ──
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/");

  // ── 3. Fetch Data ──
  const categories = await getCategoriesWithCounts();

  // ── 4. Calculate Stats (plain numbers — safe to pass!) ──
  const stats = {
    total: categories.length,
    active: categories.filter((c) => c.is_active).length,
    courses: categories.reduce((sum, c) => sum + c.courses_count, 0),
    exams: categories.reduce((sum, c) => sum + c.exams_count, 0),
  };

  // ── 5. Render ──
  return (
    <div className="space-y-6">
      {/* ═══ Page Header (Server-safe — no icon props) ═══ */}
      <PageHeader
        title="Category Management"
        description="সকল exam category তৈরি, সম্পাদনা এবং পরিচালনা করুন"
        badge={{
          label: `${stats.total} Total`,
          variant: "brand",
          appearance: "soft",
        }}
      />

      {/* ═══ Stats Grid (Client Component — icons inside) ═══ */}
      <CategoriesStats stats={stats} />

      {/* ═══ Category Table (Client Component) ═══ */}
      <CategoryTable initialCategories={categories} />
    </div>
  );
}
