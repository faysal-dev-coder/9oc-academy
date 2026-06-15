import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ExamTable from "@/components/admin/exams/ExamTable";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineGift,
  HiOutlineStar,
} from "react-icons/hi2";

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
  // 4. CALCULATE STATS
  // ════════════════════════════════════════════════════════════
  const stats = {
    total: exams.length,
    active: exams.filter((e) => e.status === "active").length,
    free: exams.filter((e) => e.exam_type === "free").length,
    premium: exams.filter((e) => e.exam_type === "premium").length,
  };

  // ════════════════════════════════════════════════════════════
  // 5. RENDER
  // ════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Exam Management</h1>
          <p className="mt-1 text-sm text-slate-600 md:text-base">
            পরীক্ষা তৈরি, সম্পাদনা ও পরিচালনা করুন
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {/* Total Exams */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 md:text-sm">Total Exams</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">{stats.total}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                <HiOutlineClipboardDocumentList className="size-5 text-blue-600 md:size-6" />
              </div>
            </div>
          </div>

          {/* Active Exams */}
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

          {/* Free Exams */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 md:text-sm">Free</p>
                <p className="mt-1 text-2xl font-bold text-amber-600 md:text-3xl">{stats.free}</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-2 md:p-3">
                <HiOutlineGift className="size-5 text-amber-600 md:size-6" />
              </div>
            </div>
          </div>

          {/* Premium Exams */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600 md:text-sm">Premium</p>
                <p className="mt-1 text-2xl font-bold text-purple-600 md:text-3xl">
                  {stats.premium}
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-2 md:p-3">
                <HiOutlineStar className="size-5 text-purple-600 md:size-6" />
              </div>
            </div>
          </div>
        </div>

        {/* EXAM TABLE */}
        <ExamTable initialExams={exams} categories={categories} courses={courses} />
      </div>
    </div>
  );
}
