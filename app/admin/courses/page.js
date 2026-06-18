import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/shared/PageHeader";
import CoursesStats from "@/components/admin/courses/CoursesStats";
import CourseTable from "@/components/admin/courses/CourseTable";

export const metadata = {
  title: "কোর্স ব্যবস্থাপনা | অ্যাডমিন",
  description: "কোর্স তৈরি, এডিট ও ব্যবস্থাপনা করুন",
};

export default async function CoursesPage() {
  const supabase = await createClient();

  // ═══════════════════════════════════════════════
  // 1. Auth check
  // ═══════════════════════════════════════════════
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/courses");
  }

  // ═══════════════════════════════════════════════
  // 2. Admin check
  // ═══════════════════════════════════════════════
  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // ═══════════════════════════════════════════════
  // 3. Parallel DB queries
  // ═══════════════════════════════════════════════
  const [coursesRes, categoriesRes] = await Promise.all([
    supabase
      .from("courses")
      .select(
        `
        *,
        category:categories(id, name, slug, color, icon)
        `
      )
      .order("global_order", { ascending: true }),

    supabase
      .from("categories")
      .select("id, name, slug, color, icon")
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
  ]);

  const courses = coursesRes.data || [];
  const categories = categoriesRes.data || [];

  // ═══════════════════════════════════════════════
  // 4. Calculate stats (plain numbers!)
  // ═══════════════════════════════════════════════
  const stats = {
    total: courses.length,
    active: courses.filter((c) => c.status === "active").length,
    draft: courses.filter((c) => c.status === "draft").length,
    archived: courses.filter((c) => c.status === "archived").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="কোর্স ব্যবস্থাপনা"
        description="সকল কোর্স তৈরি, এডিট ও ব্যবস্থাপনা করুন"
        badge={{ label: `${stats.total} টি কোর্স`, variant: "brand" }}
      />

      <CoursesStats stats={stats} />

      <CourseTable initialCourses={courses} categories={categories} />
    </div>
  );
}
