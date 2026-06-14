import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CourseTable from "@/components/admin/courses/CourseTable";
import { HiBookOpen, HiCheckCircle, HiPencilSquare, HiArchiveBox } from "react-icons/hi2";

// ✅ Force dynamic rendering (no cache)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminCoursesPage() {
  const supabase = await createClient();

  // ═══════════════════════════════════════════════
  // 1. Auth Check
  // ═══════════════════════════════════════════════
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ═══════════════════════════════════════════════
  // 2. Admin Check
  // ═══════════════════════════════════════════════
  const { data: isAdminData } = await supabase.rpc("is_admin");
  if (!isAdminData) {
    redirect("/dashboard");
  }

  // ═══════════════════════════════════════════════
  // 3. Fetch Courses (with category join)
  // ═══════════════════════════════════════════════
  const { data: courses } = await supabase
    .from("courses")
    .select(
      `
      *,
      category:categories(id, name, slug, color, icon)
    `
    )
    .order("global_order", { ascending: true });

  // ═══════════════════════════════════════════════
  // 4. Fetch Categories (for filter dropdown)
  // ═══════════════════════════════════════════════
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, color, icon")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  // ═══════════════════════════════════════════════
  // 5. Calculate Stats
  // ═══════════════════════════════════════════════
  const coursesList = courses || [];
  const totalCount = coursesList.length;
  const activeCount = coursesList.filter((c) => c.status === "active").length;
  const draftCount = coursesList.filter((c) => c.status === "draft").length;
  const archivedCount = coursesList.filter((c) => c.status === "archived").length;

  const stats = [
    {
      label: "মোট কোর্স",
      value: totalCount,
      icon: HiBookOpen,
      color: "#1E9CD7",
      bgColor: "#EFF8FF",
    },
    {
      label: "Active",
      value: activeCount,
      icon: HiCheckCircle,
      color: "#059669",
      bgColor: "#ECFDF5",
    },
    {
      label: "Draft",
      value: draftCount,
      icon: HiPencilSquare,
      color: "#D97706",
      bgColor: "#FFFBEB",
    },
    {
      label: "Archived",
      value: archivedCount,
      icon: HiArchiveBox,
      color: "#64748B",
      bgColor: "#F8FAFC",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ═══════════════════════════════════════════ */}
      {/* Header */}
      {/* ═══════════════════════════════════════════ */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">📚 Course Management</h1>
        <p className="text-slate-600 text-sm md:text-base">
          সকল কোর্স ম্যানেজ করুন — Add, Edit, Delete, Archive
        </p>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* Stats Cards */}
      {/* ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* Course Table (Client Component) */}
      {/* ═══════════════════════════════════════════ */}
      <CourseTable initialCourses={coursesList} categories={categories || []} />
    </div>
  );
}
