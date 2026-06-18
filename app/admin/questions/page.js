import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/shared/PageHeader";
import QuestionsStats from "@/components/admin/questions/QuestionsStats";
import QuestionTable from "@/components/admin/questions/QuestionTable";

export const metadata = {
  title: "প্রশ্ন ব্যবস্থাপনা | অ্যাডমিন",
  description: "MCQ প্রশ্ন তৈরি ও ব্যবস্থাপনা করুন",
};

export default async function QuestionsPage() {
  const supabase = await createClient();

  // 1. Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/questions");
  }

  // 2. Admin check
  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // 3. Parallel DB queries
  const [questionsRes, examsRes] = await Promise.all([
    supabase
      .from("questions")
      .select(
        `
        *,
        exams!questions_exam_id_fkey (id, title),
        options (id, option_text, is_correct, order_number)
        `
      )
      .order("created_at", { ascending: false }),

    supabase.from("exams").select("id, title").order("title", { ascending: true }),
  ]);

  const questions = questionsRes.data || [];
  const exams = examsRes.data || [];

  // 4. Calculate stats (plain numbers!)
  const stats = {
    total: questions.length,
    easy: questions.filter((q) => q.difficulty === "easy").length,
    medium: questions.filter((q) => q.difficulty === "medium").length,
    hard: questions.filter((q) => q.difficulty === "hard").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="প্রশ্ন ব্যবস্থাপনা"
        description="MCQ প্রশ্ন তৈরি, এডিট ও ব্যবস্থাপনা করুন"
        badge={{ label: `${stats.total} টি প্রশ্ন`, variant: "brand" }}
      />

      <QuestionsStats stats={stats} />

      <QuestionTable initialQuestions={questions} exams={exams} />
    </div>
  );
}
