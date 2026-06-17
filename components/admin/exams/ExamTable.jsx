"use client";

// components/admin/exams/ExamTable.jsx
// ═══════════════════════════════════════════════════════════════
// 📋 Premium Exam Table — List + Filter + CRUD
// ⭐ Phase 4: Exams CRUD
// ⭐ Uses: Card + FilterBar + EmptyState + Button + Badge
// ⭐ Uses: ConfirmDialog + ExamModal
// ═══════════════════════════════════════════════════════════════

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  ClipboardList,
  SearchX,
  Clock,
  HelpCircle,
  BookOpen,
  Star,
  Gift,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FilterBar from "@/components/admin/shared/FilterBar";
import EmptyState from "@/components/admin/shared/EmptyState";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import ExamModal from "./ExamModal";

// ─────────────────────────────────────────────
//  FILTER OPTIONS (static)
// ─────────────────────────────────────────────
const STATUS_FILTERS = [
  { id: "all", label: "All Status" },
  { id: "active", label: "✅ Active" },
  { id: "draft", label: "📝 Draft" },
  { id: "archived", label: "📦 Archived" },
];

const TYPE_FILTERS = [
  { id: "all", label: "All Types" },
  { id: "free", label: "🎁 Free" },
  { id: "premium", label: "⭐ Premium" },
];

const COURSE_EXTRA = [
  { id: "all", label: "All Courses" },
  { id: "none", label: "Standalone Only" },
];

// ─────────────────────────────────────────────
//  EXAM TABLE COMPONENT
// ─────────────────────────────────────────────
export default function ExamTable({ initialExams, categories, courses }) {
  const router = useRouter();
  const [exams, setExams] = useState(initialExams);
  const [loading, setLoading] = useState(false);

  // ── Filter States ──
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // ── Modal States ──
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, exam: null });

  // ─────────────────────────────────────────────
  //  CATEGORY OPTIONS (dynamic from props)
  // ─────────────────────────────────────────────
  const categoryOptions = useMemo(
    () => [
      { id: "all", label: "All Categories" },
      ...categories.map((cat) => ({ id: String(cat.id), label: cat.name })),
    ],
    [categories]
  );

  const courseOptions = useMemo(
    () => [...COURSE_EXTRA, ...courses.map((c) => ({ id: String(c.id), label: c.title }))],
    [courses]
  );

  // ─────────────────────────────────────────────
  //  FILTERED EXAMS (useMemo)
  // ─────────────────────────────────────────────
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = exam.title?.toLowerCase().includes(q);
        const matchSlug = exam.slug?.toLowerCase().includes(q);
        if (!matchTitle && !matchSlug) return false;
      }

      // Category
      if (filterCategory !== "all" && String(exam.category_id) !== filterCategory) {
        return false;
      }

      // Course
      if (filterCourse === "none" && exam.course_id !== null) return false;
      if (
        filterCourse !== "all" &&
        filterCourse !== "none" &&
        String(exam.course_id) !== filterCourse
      ) {
        return false;
      }

      // Status
      if (filterStatus !== "all" && exam.status !== filterStatus) return false;

      // Type
      if (filterType !== "all" && exam.exam_type !== filterType) return false;

      return true;
    });
  }, [exams, searchQuery, filterCategory, filterCourse, filterStatus, filterType]);

  // ─────────────────────────────────────────────
  //  HANDLERS — Modal
  // ─────────────────────────────────────────────
  const handleAddNew = () => {
    setEditingExam(null);
    setModalOpen(true);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingExam(null);
  };

  // ─────────────────────────────────────────────
  //  HANDLERS — Success Callbacks
  // ─────────────────────────────────────────────
  const enrichExam = (exam) => {
    const category = categories.find((c) => c.id === exam.category_id);
    const course = courses.find((c) => c.id === exam.course_id);
    return {
      ...exam,
      categories: category ? { id: category.id, name: category.name } : null,
      courses: course ? { id: course.id, title: course.title } : null,
    };
  };

  const handleAddSuccess = (newExam) => {
    setExams((prev) => [enrichExam(newExam), ...prev]);
    handleCloseModal();
    router.refresh();
  };

  const handleEditSuccess = (updatedExam) => {
    setExams((prev) => prev.map((e) => (e.id === updatedExam.id ? enrichExam(updatedExam) : e)));
    handleCloseModal();
    router.refresh();
  };

  // ─────────────────────────────────────────────
  //  HANDLERS — Delete
  // ─────────────────────────────────────────────
  const handleDelete = (exam) => {
    setDeleteModal({ open: true, exam });
  };

  const closeDeleteModal = () => {
    if (loading) return;
    setDeleteModal({ open: false, exam: null });
  };

  const confirmDelete = async () => {
    const exam = deleteModal.exam;
    if (!exam) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/exams/${exam.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Delete failed!");
        return;
      }

      setExams((prev) => prev.filter((e) => e.id !== exam.id));
      toast.success(data.message || "Exam deleted!");
      setDeleteModal({ open: false, exam: null });
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("কিছু ভুল হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  //  CLEAR FILTERS
  // ─────────────────────────────────────────────
  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterCourse("all");
    setFilterStatus("all");
    setFilterType("all");
  };

  // ─────────────────────────────────────────────
  //  COMPUTED: Filter active flag + Delete dialog
  // ─────────────────────────────────────────────
  const isFiltering =
    searchQuery !== "" ||
    filterCategory !== "all" ||
    filterCourse !== "all" ||
    filterStatus !== "all" ||
    filterType !== "all";

  const deleteExam = deleteModal.exam;

  const deleteDialogDescription = deleteExam
    ? [
        `"${deleteExam.title}" পরীক্ষাটি permanently delete হবে।`,
        "",
        deleteExam.status !== "archived"
          ? "💡 Better Option: Archive করলে data সংরক্ষিত থাকবে এবং student দের দেখাবে না।"
          : "",
        "",
        "⚠️ Note: যদি কোনো প্রশ্ন বা student attempt থাকে — delete হবে না।",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  // ─────────────────────────────────────────────
  //  BADGE HELPERS
  // ─────────────────────────────────────────────
  const renderStatusBadge = (status) => {
    const config = {
      active: { variant: "success", label: "Active" },
      draft: { variant: "warning", label: "Draft" },
      archived: { variant: "default", label: "Archived" },
    };
    const { variant, label } = config[status] || config.draft;
    return (
      <Badge variant={variant} appearance="soft" size="sm" dot>
        {label}
      </Badge>
    );
  };

  const renderTypeBadge = (type) => {
    if (type === "free") {
      return (
        <Badge variant="success" appearance="soft" size="sm" icon={Gift}>
          Free
        </Badge>
      );
    }
    return (
      <Badge variant="warning" appearance="soft" size="sm" icon={Star}>
        Premium
      </Badge>
    );
  };

  // ─────────────────────────────────────────────
  //  EMPTY STATE (no exams at all)
  // ─────────────────────────────────────────────
  if (exams.length === 0) {
    return (
      <>
        <Card variant="elevated" padding="none">
          <EmptyState
            icon={ClipboardList}
            title="কোনো Exam নেই!"
            description="প্রথম পরীক্ষা টি তৈরি করে শুরু করুন।"
            size="lg"
            action={
              <Button variant="primary" icon={Plus} onClick={handleAddNew}>
                Create First Exam
              </Button>
            }
          />
        </Card>

        {/* Add Modal */}
        {modalOpen && (
          <ExamModal
            key="new"
            isOpen={modalOpen}
            onClose={handleCloseModal}
            exam={editingExam}
            categories={categories}
            courses={courses}
            onAddSuccess={handleAddSuccess}
            onEditSuccess={handleEditSuccess}
          />
        )}
      </>
    );
  }

  // ─────────────────────────────────────────────
  //  MAIN RENDER
  // ─────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* ═══ Filter Bar Section ═══ */}
      <Card variant="elevated" padding="sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <FilterBar
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Exam title বা slug দিয়ে খুঁজুন..."
              filterOptions={categoryOptions}
              filterValue={filterCategory}
              onFilterChange={setFilterCategory}
              sortOptions={STATUS_FILTERS}
              sortValue={filterStatus}
              onSortChange={setFilterStatus}
              onClear={handleClearFilters}
            />
          </div>

          <Button variant="primary" icon={Plus} onClick={handleAddNew}>
            New Exam
          </Button>
        </div>

        {/* Secondary Filter Row (Course + Type) */}
        <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center">
          <span className="text-xs font-semibold text-slate-500">More Filters:</span>

          {/* Course Filter */}
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="h-9 cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white bg-no-repeat px-3 pr-8 text-xs font-medium text-slate-700 outline-none transition-colors duration-150 hover:border-slate-400 focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1rem",
            }}
          >
            {courseOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-9 cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white bg-no-repeat px-3 pr-8 text-xs font-medium text-slate-700 outline-none transition-colors duration-150 hover:border-slate-400 focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1rem",
            }}
          >
            {TYPE_FILTERS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Results count */}
          {isFiltering && (
            <p className="ml-auto text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{filteredExams.length}</span> টি result
            </p>
          )}
        </div>
      </Card>

      {/* ═══ Table Card ═══ */}
      <Card variant="elevated" padding="none">
        {/* ─── Desktop Table ─── */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Course
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Duration
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Questions
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Type
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredExams.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12">
                    <EmptyState
                      icon={SearchX}
                      title="কোনো result পাওয়া যায়নি"
                      description="অন্য filter বা search keyword ব্যবহার করুন"
                      variant="search"
                      size="sm"
                    />
                  </td>
                </tr>
              ) : (
                filteredExams.map((exam) => (
                  <tr key={exam.id} className="transition-colors hover:bg-slate-50">
                    {/* ─── Title + Slug ─── */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{exam.title}</div>
                      <div className="mt-0.5 font-mono text-xs text-slate-500">/{exam.slug}</div>
                    </td>

                    {/* ─── Category ─── */}
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {exam.categories?.name || "—"}
                    </td>

                    {/* ─── Course ─── */}
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {exam.courses?.title ? (
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <BookOpen size={12} className="text-brand-600" />
                          <span className="truncate">{exam.courses.title}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Standalone</span>
                      )}
                    </td>

                    {/* ─── Duration ─── */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-700">
                        <Clock size={12} className="text-slate-400" />
                        {exam.duration_minutes} min
                      </span>
                    </td>

                    {/* ─── Questions ─── */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-700">
                        <HelpCircle size={12} className="text-slate-400" />
                        {exam.total_questions}
                      </span>
                    </td>

                    {/* ─── Type ─── */}
                    <td className="px-6 py-4 text-center">{renderTypeBadge(exam.exam_type)}</td>

                    {/* ─── Status ─── */}
                    <td className="px-6 py-4 text-center">{renderStatusBadge(exam.status)}</td>

                    {/* ─── Actions ─── */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Pencil}
                          iconOnly
                          onClick={() => handleEdit(exam)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          iconOnly
                          onClick={() => handleDelete(exam)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ─── Mobile Cards ─── */}
        <div className="divide-y divide-slate-200 md:hidden">
          {filteredExams.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon={SearchX}
                title="কোনো result পাওয়া যায়নি"
                description="অন্য filter বা search keyword ব্যবহার করুন"
                variant="search"
                size="sm"
              />
            </div>
          ) : (
            filteredExams.map((exam) => (
              <div key={exam.id} className="space-y-3 p-4">
                {/* Top: Title + Actions */}
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-slate-900">{exam.title}</div>
                    <div className="font-mono text-xs text-slate-500">/{exam.slug}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Pencil}
                      iconOnly
                      onClick={() => handleEdit(exam)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      iconOnly
                      onClick={() => handleDelete(exam)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    />
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {renderTypeBadge(exam.exam_type)}
                  {renderStatusBadge(exam.status)}
                </div>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-slate-400" />
                    <span>{exam.duration_minutes} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HelpCircle size={12} className="text-slate-400" />
                    <span>{exam.total_questions} questions</span>
                  </div>
                  <div className="col-span-2 truncate">
                    <span className="text-slate-500">📚 </span>
                    {exam.categories?.name || "—"}
                  </div>
                  {exam.courses?.title && (
                    <div className="col-span-2 truncate">
                      <span className="text-slate-500">🎓 </span>
                      {exam.courses.title}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* ═══ Add/Edit Modal — key prop fixes form reset! ═══ */}
      {modalOpen && (
        <ExamModal
          key={editingExam?.id || "new"}
          isOpen={modalOpen}
          onClose={handleCloseModal}
          exam={editingExam}
          categories={categories}
          courses={courses}
          onAddSuccess={handleAddSuccess}
          onEditSuccess={handleEditSuccess}
        />
      )}

      {/* ═══ Delete Confirm Dialog (Rich description!) ═══ */}
      <ConfirmDialog
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        title={deleteExam ? `Delete "${deleteExam.title}"?` : "Delete Exam?"}
        description={deleteDialogDescription}
        variant="danger"
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        loading={loading}
      />
    </div>
  );
}
