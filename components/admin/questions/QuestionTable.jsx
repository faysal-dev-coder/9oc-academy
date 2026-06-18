"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, HelpCircle, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FilterBar from "@/components/admin/shared/FilterBar";
import EmptyState from "@/components/admin/shared/EmptyState";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import QuestionModal from "./QuestionModal";

// ════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════
const difficultyConfig = {
  easy: { label: "সহজ", color: "success" },
  medium: { label: "মাঝারি", color: "warning" },
  hard: { label: "কঠিন", color: "danger" },
};

function truncate(text, len = 80) {
  if (!text) return "";
  return text.length > len ? text.substring(0, len) + "..." : text;
}

// ════════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════════
export default function QuestionTable({ initialQuestions, exams }) {
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ──────────────────────────────────────────────────────────
  // Filtered list
  // ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const matchSearch = !search || q.question_text?.toLowerCase().includes(search.toLowerCase());
      const matchExam = examFilter === "all" || String(q.exam_id) === examFilter;
      const matchDiff = difficultyFilter === "all" || q.difficulty === difficultyFilter;
      return matchSearch && matchExam && matchDiff;
    });
  }, [questions, search, examFilter, difficultyFilter]);

  // ──────────────────────────────────────────────────────────
  // Handlers
  // ──────────────────────────────────────────────────────────
  const handleCreate = () => {
    setEditingQuestion(null);
    setModalOpen(true);
  };

  const handleEdit = (q) => {
    setEditingQuestion(q);
    setModalOpen(true);
  };

  const handleSuccess = (savedQuestion) => {
    if (editingQuestion) {
      // Update existing
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === savedQuestion.id
            ? {
                ...savedQuestion,
                exams: q.exams, // preserve exam join
              }
            : q
        )
      );
    } else {
      // Add new — find exam info
      const exam = exams.find((e) => String(e.id) === String(savedQuestion.exam_id));
      setQuestions((prev) => [
        { ...savedQuestion, exams: exam ? { id: exam.id, title: exam.title } : null },
        ...prev,
      ]);
    }
  };

  const handleDelete = async () => {
    if (!deletingQuestion) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/questions/${deletingQuestion.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error);
        return;
      }
      toast.success(json.message);
      setQuestions((prev) => prev.filter((q) => q.id !== deletingQuestion.id));
      setDeletingQuestion(null);
    } catch (err) {
      console.error(err);
      toast.error("সার্ভার ত্রুটি!");
    } finally {
      setDeleting(false);
    }
  };

  // ──────────────────────────────────────────────────────────
  // Filter options
  // ──────────────────────────────────────────────────────────
  const examOptions = [
    { value: "all", label: "সব পরীক্ষা" },
    ...(exams || []).map((e) => ({ value: String(e.id), label: e.title })),
  ];

  const difficultyOptions = [
    { value: "all", label: "সব ধরন" },
    { value: "easy", label: "সহজ" },
    { value: "medium", label: "মাঝারি" },
    { value: "hard", label: "কঠিন" },
  ];

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────
  return (
    <Card>
      <Card.Body>
        {/* Top Bar — Filter + Add */}
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <div className="flex-1">
            <FilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="প্রশ্ন খুঁজুন..."
              filters={[
                {
                  value: examFilter,
                  onChange: setExamFilter,
                  options: examOptions,
                },
                {
                  value: difficultyFilter,
                  onChange: setDifficultyFilter,
                  options: difficultyOptions,
                },
              ]}
            />
          </div>
          <Button variant="primary" onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-1" />
            নতুন প্রশ্ন
          </Button>
        </div>

        {/* List */}
        {questions.length === 0 ? (
          <EmptyState
            icon={HelpCircle}
            title="এখনো কোনো প্রশ্ন নেই"
            description="প্রথম প্রশ্ন যোগ করে শুরু করুন!"
            action={
              <Button variant="primary" onClick={handleCreate}>
                <Plus className="w-4 h-4 mr-1" />
                নতুন প্রশ্ন
              </Button>
            }
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={HelpCircle}
            title="কোনো প্রশ্ন পাওয়া যায়নি"
            description="ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।"
          />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-12">
                      #
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3">
                      প্রশ্ন
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3">
                      পরীক্ষা
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-24">
                      ডিফিকাল্টি
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-20">
                      মার্ক্স
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-20">
                      অপশন
                    </th>
                    <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-24">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q, i) => {
                    const diff = difficultyConfig[q.difficulty] || difficultyConfig.medium;
                    const correctOpt = q.options?.find((o) => o.is_correct);
                    return (
                      <tr
                        key={q.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-3 py-3 text-sm text-slate-500">{i + 1}</td>
                        <td className="px-3 py-3">
                          <p className="text-sm font-medium text-slate-900">
                            {truncate(q.question_text, 70)}
                          </p>
                          {correctOpt && (
                            <p className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {truncate(correctOpt.option_text, 40)}
                            </p>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-sm text-slate-700">{q.exams?.title || "—"}</span>
                        </td>
                        <td className="px-3 py-3">
                          <Badge variant={diff.color} size="sm">
                            {diff.label}
                          </Badge>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-700">
                          {Number(q.marks).toFixed(2)}
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-700">
                          {q.options?.length || 0}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconOnly
                              onClick={() => handleEdit(q)}
                              title="এডিট"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconOnly
                              onClick={() => setDeletingQuestion(q)}
                              title="ডিলিট"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {filtered.map((q, i) => {
                const diff = difficultyConfig[q.difficulty] || difficultyConfig.medium;
                const correctOpt = q.options?.find((o) => o.is_correct);
                return (
                  <div key={q.id} className="p-3 border border-slate-200 rounded-lg bg-white">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs text-slate-500">#{i + 1}</span>
                      <Badge variant={diff.color} size="sm">
                        {diff.label}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      {truncate(q.question_text, 100)}
                    </p>
                    {correctOpt && (
                      <p className="text-xs text-emerald-600 mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {truncate(correctOpt.option_text, 50)}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="text-xs text-slate-600">
                        <span>{q.exams?.title || "—"}</span>
                        <span className="mx-1">•</span>
                        <span>{Number(q.marks).toFixed(2)} মার্ক্স</span>
                        <span className="mx-1">•</span>
                        <span>{q.options?.length || 0} অপশন</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" iconOnly onClick={() => handleEdit(q)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconOnly
                          onClick={() => setDeletingQuestion(q)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card.Body>

      {/* Modal — Key prop for compiler-safe reset */}
      {modalOpen && (
        <QuestionModal
          key={editingQuestion?.id || "new"}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          editingQuestion={editingQuestion}
          exams={exams}
          onSuccess={handleSuccess}
        />
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deletingQuestion}
        onClose={() => setDeletingQuestion(null)}
        onConfirm={handleDelete}
        title="প্রশ্ন ডিলিট করবেন?"
        description={
          deletingQuestion
            ? `"${truncate(deletingQuestion.question_text, 60)}" — এই প্রশ্নটি এবং এর সব অপশন স্থায়ীভাবে মুছে যাবে! পুনরুদ্ধার করা যাবে না।`
            : ""
        }
        confirmText="ডিলিট করুন"
        cancelText="বাতিল"
        variant="danger"
        loading={deleting}
      />
    </Card>
  );
}
