"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineQuestionMarkCircle,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineStar,
  HiOutlineGift,
} from "react-icons/hi2";
import ExamModal from "./ExamModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

// ════════════════════════════════════════════════════════════
// Custom Dropdown Style
// ════════════════════════════════════════════════════════════
const selectClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-no-repeat bg-right";

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
  backgroundSize: "1.25rem",
  backgroundPosition: "right 0.5rem center",
};

export default function ExamTable({ initialExams, categories, courses }) {
  const router = useRouter();

  // STATE
  const [exams, setExams] = useState(initialExams);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [deletingExam, setDeletingExam] = useState(null);

  // ════════════════════════════════════════════════════════════
  // FILTERED EXAMS
  // ════════════════════════════════════════════════════════════
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      if (search && !exam.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (filterCategory !== "all" && exam.category_id !== parseInt(filterCategory)) {
        return false;
      }
      if (filterCourse === "none" && exam.course_id !== null) {
        return false;
      }
      if (
        filterCourse !== "all" &&
        filterCourse !== "none" &&
        exam.course_id !== parseInt(filterCourse)
      ) {
        return false;
      }
      if (filterStatus !== "all" && exam.status !== filterStatus) {
        return false;
      }
      if (filterType !== "all" && exam.exam_type !== filterType) {
        return false;
      }
      return true;
    });
  }, [exams, search, filterCategory, filterCourse, filterStatus, filterType]);

  // ════════════════════════════════════════════════════════════
  // HANDLERS — Modal
  // ════════════════════════════════════════════════════════════
  const handleAddClick = () => {
    setEditingExam(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (exam) => {
    setEditingExam(exam);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExam(null);
  };

  // ════════════════════════════════════════════════════════════
  // HANDLERS — Success Callbacks
  // ════════════════════════════════════════════════════════════
  const handleAddSuccess = (newExam) => {
    const category = categories.find((c) => c.id === newExam.category_id);
    const course = courses.find((c) => c.id === newExam.course_id);

    const examWithRelations = {
      ...newExam,
      categories: category ? { id: category.id, name: category.name } : null,
      courses: course ? { id: course.id, title: course.title } : null,
    };

    setExams([examWithRelations, ...exams]);
    handleCloseModal();
    router.refresh();
  };

  const handleEditSuccess = (updatedExam) => {
    const category = categories.find((c) => c.id === updatedExam.category_id);
    const course = courses.find((c) => c.id === updatedExam.course_id);

    const examWithRelations = {
      ...updatedExam,
      categories: category ? { id: category.id, name: category.name } : null,
      courses: course ? { id: course.id, title: course.title } : null,
    };

    setExams(exams.map((e) => (e.id === updatedExam.id ? examWithRelations : e)));
    handleCloseModal();
    router.refresh();
  };

  // ════════════════════════════════════════════════════════════
  // HANDLERS — Delete
  // ════════════════════════════════════════════════════════════
  const handleDeleteClick = (exam) => {
    setDeletingExam(exam);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingExam) return;

    try {
      const res = await fetch(`/api/admin/exams/${deletingExam.id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "ডিলিট করতে সমস্যা হয়েছে!");
        return;
      }

      setExams(exams.filter((e) => e.id !== deletingExam.id));
      toast.success(result.message || "সফলভাবে ডিলিট হয়েছে!");
      setDeletingExam(null);
      router.refresh();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("সার্ভার ত্রুটি!");
    }
  };

  // ════════════════════════════════════════════════════════════
  // BADGE HELPERS
  // ════════════════════════════════════════════════════════════
  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-emerald-100 text-emerald-700 border-emerald-200",
      draft: "bg-amber-100 text-amber-700 border-amber-200",
      archived: "bg-slate-100 text-slate-700 border-slate-200",
    };
    const labels = {
      active: "Active",
      draft: "Draft",
      archived: "Archived",
    };
    return (
      <span
        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    if (type === "free") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
          <HiOutlineGift className="size-3" />
          Free
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
        <HiOutlineStar className="size-3" />
        Premium
      </span>
    );
  };

  // ════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════
  return (
    <div className="space-y-4">
      {/* ════════ FILTERS + ADD BUTTON ════════ */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3">
          {/* Search + Add */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <HiOutlineMagnifyingGlass className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by exam title..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-3 pl-10 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              onClick={handleAddClick}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
            >
              <HiOutlinePlus className="size-4" />
              New Exam
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={selectClass}
              style={selectStyle}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className={selectClass}
              style={selectStyle}
            >
              <option value="all">All Courses</option>
              <option value="none">Standalone Only</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectClass}
              style={selectStyle}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={selectClass}
              style={selectStyle}
            >
              <option value="all">All Types</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
      </div>

      {/* ════════ EMPTY STATE ════════ */}
      {filteredExams.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <HiOutlineClipboardDocumentList className="mx-auto size-12 text-slate-300" />
          <h3 className="mt-3 text-base font-semibold text-slate-900">No exams found</h3>
          <p className="mt-1 text-sm text-slate-600">
            {exams.length === 0
              ? "প্রথম পরীক্ষা তৈরি করে শুরু করুন!"
              : "Filter পরিবর্তন করে আবার চেষ্টা করুন"}
          </p>
          {exams.length === 0 && (
            <button
              onClick={handleAddClick}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <HiOutlinePlus className="size-4" />
              Create First Exam
            </button>
          )}
        </div>
      )}

      {/* ════════ DESKTOP TABLE ════════ */}
      {filteredExams.length > 0 && (
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold text-slate-600 uppercase">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Questions</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="text-sm transition hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{exam.title}</div>
                      <div className="text-xs text-slate-500">{exam.slug}</div>
                    </td>

                    <td className="px-4 py-3 text-slate-700">{exam.categories?.name || "—"}</td>

                    <td className="px-4 py-3 text-slate-700">
                      {exam.courses?.title ? (
                        <span className="inline-flex items-center gap-1 text-xs">
                          <HiOutlineBookOpen className="size-3 text-blue-600" />
                          {exam.courses.title}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Standalone</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      <span className="inline-flex items-center gap-1 text-xs">
                        <HiOutlineClock className="size-3" />
                        {exam.duration_minutes} min
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      <span className="inline-flex items-center gap-1 text-xs">
                        <HiOutlineQuestionMarkCircle className="size-3" />
                        {exam.total_questions}
                      </span>
                    </td>

                    <td className="px-4 py-3">{getTypeBadge(exam.exam_type)}</td>
                    <td className="px-4 py-3">{getStatusBadge(exam.status)}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(exam)}
                          className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                          title="Edit"
                        >
                          <HiOutlinePencilSquare className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(exam)}
                          className="rounded-lg p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <HiOutlineTrash className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════ MOBILE CARDS ════════ */}
      {filteredExams.length > 0 && (
        <div className="space-y-3 md:hidden">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-slate-900">{exam.title}</h3>
                  <p className="truncate text-xs text-slate-500">{exam.slug}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => handleEditClick(exam)}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <HiOutlinePencilSquare className="size-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(exam)}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <HiOutlineTrash className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {getTypeBadge(exam.exam_type)}
                {getStatusBadge(exam.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <HiOutlineAcademicCap className="size-3 text-slate-400" />
                  <span className="truncate">{exam.categories?.name || "—"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineBookOpen className="size-3 text-slate-400" />
                  <span className="truncate">{exam.courses?.title || "Standalone"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineClock className="size-3 text-slate-400" />
                  <span>{exam.duration_minutes} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineQuestionMarkCircle className="size-3 text-slate-400" />
                  <span>{exam.total_questions} questions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════ MODALS ════════ */}
      {isModalOpen && (
        <ExamModal
          exam={editingExam}
          categories={categories}
          courses={courses}
          onClose={handleCloseModal}
          onAddSuccess={handleAddSuccess}
          onEditSuccess={handleEditSuccess}
        />
      )}

      {deletingExam && (
        <DeleteConfirmModal
          exam={deletingExam}
          onCancel={() => setDeletingExam(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
