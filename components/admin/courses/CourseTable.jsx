"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import {
  HiPlus,
  HiMagnifyingGlass,
  HiPencilSquare,
  HiTrash,
  HiPhoto,
  HiCheckCircle,
  HiClock,
  HiArchiveBox,
  HiStar,
  HiFire,
} from "react-icons/hi2";
import CourseModal from "./CourseModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

// ═══════════════════════════════════════════════════════════
// Custom Select Class (Fix dropdown arrow!)
// ═══════════════════════════════════════════════════════════
const selectClass =
  "px-4 py-2.5 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center]";

export default function CourseTable({ initialCourses, categories }) {
  const router = useRouter();

  // ═══════════════════════════════════════════════
  // State Management
  // ═══════════════════════════════════════════════
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  // ═══════════════════════════════════════════════
  // Filter Logic
  // ═══════════════════════════════════════════════
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        !search ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.slug.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = categoryFilter === "all" || course.category_id === categoryFilter;

      const matchesStatus = statusFilter === "all" || course.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [courses, search, categoryFilter, statusFilter]);

  // ═══════════════════════════════════════════════
  // Handlers
  // ═══════════════════════════════════════════════
  const handleAddClick = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (course) => {
    setDeletingCourse(course);
  };

  // Instant UI update after add
  const handleAddSuccess = (newCourse) => {
    setCourses((prev) => [...prev, newCourse]);
    setIsModalOpen(false);
    router.refresh();
  };

  // Instant UI update after edit
  const handleEditSuccess = (updatedCourse) => {
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    setIsModalOpen(false);
    setEditingCourse(null);
    router.refresh();
  };

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!deletingCourse) return;

    try {
      const res = await fetch(`/api/admin/courses/${deletingCourse.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "মুছতে সমস্যা হয়েছে");
        return;
      }

      // Instant UI update
      setCourses((prev) => prev.filter((c) => c.id !== deletingCourse.id));
      toast.success(data.message || "কোর্স মুছে ফেলা হয়েছে");
      setDeletingCourse(null);
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("সার্ভার সমস্যা");
    }
  };

  // ═══════════════════════════════════════════════
  // Helper: Get status badge
  // ═══════════════════════════════════════════════
  const getStatusBadge = (status) => {
    const config = {
      active: {
        label: "Active",
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: HiCheckCircle,
      },
      draft: {
        label: "Draft",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: HiClock,
      },
      archived: {
        label: "Archived",
        bg: "bg-slate-100",
        text: "text-slate-600",
        border: "border-slate-200",
        icon: HiArchiveBox,
      },
    };

    const cfg = config[status] || config.draft;
    const Icon = cfg.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}
      >
        <Icon className="w-3 h-3" />
        {cfg.label}
      </span>
    );
  };

  // ═══════════════════════════════════════════════
  // Helper: Format price
  // ═══════════════════════════════════════════════
  const formatPrice = (course) => {
    if (course.is_free) {
      return <span className="text-green-600 font-semibold text-sm">Free</span>;
    }

    if (course.discount_price && course.discount_price < course.price) {
      return (
        <div className="flex flex-col">
          <span className="text-slate-800 font-semibold text-sm">৳{course.discount_price}</span>
          <span className="text-slate-400 text-xs line-through">৳{course.price}</span>
        </div>
      );
    }

    return <span className="text-slate-800 font-semibold text-sm">৳{course.price}</span>;
  };

  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* Filters Bar */}
      {/* ═══════════════════════════════════════════ */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="কোর্স খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">সব ক্যাটাগরি</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">সব Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Add Button */}
          <button
            onClick={handleAddClick}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium text-sm transition-colors shrink-0"
          >
            <HiPlus className="w-5 h-5" />
            <span>নতুন কোর্স</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* Empty State */}
      {/* ═══════════════════════════════════════════ */}
      {filteredCourses.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
            <HiPhoto className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">কোনো কোর্স পাওয়া যায়নি</h3>
          <p className="text-slate-500 text-sm mb-4">
            {courses.length === 0 ? "এখনো কোনো কোর্স তৈরি হয়নি" : "ফিল্টার পরিবর্তন করে দেখুন"}
          </p>
          {courses.length === 0 && (
            <button
              onClick={handleAddClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <HiPlus className="w-5 h-5" />
              প্রথম কোর্স যোগ করুন
            </button>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* Desktop Table View (md+) */}
      {/* ═══════════════════════════════════════════ */}
      {filteredCourses.length > 0 && (
        <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    কোর্স
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    ক্যাটাগরি
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    মূল্য
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">
                    Order
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                    {/* Course (Thumbnail + Title) */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* Thumbnail */}
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                          {course.thumbnail_url ? (
                            <Image
                              src={course.thumbnail_url}
                              alt={course.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <HiPhoto className="w-6 h-6 text-slate-400" />
                            </div>
                          )}
                        </div>

                        {/* Title + Badges */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-slate-800 truncate">
                              {course.title}
                            </p>
                            {course.is_featured && (
                              <HiStar className="w-4 h-4 text-amber-500 shrink-0" />
                            )}
                            {course.is_popular && (
                              <HiFire className="w-4 h-4 text-red-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">/{course.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      {course.category ? (
                        <span
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
                          style={{
                            backgroundColor: `${course.category.color}15`,
                            color: course.category.color,
                          }}
                        >
                          {course.category.name}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3">{formatPrice(course)}</td>

                    {/* Status */}
                    <td className="px-4 py-3">{getStatusBadge(course.status)}</td>

                    {/* Order */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium text-slate-600">
                        {course.global_order || 0}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(course)}
                          className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <HiPencilSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course)}
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <HiTrash className="w-4 h-4" />
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

      {/* ═══════════════════════════════════════════ */}
      {/* Mobile Card View (< md) */}
      {/* ═══════════════════════════════════════════ */}
      {filteredCourses.length > 0 && (
        <div className="md:hidden space-y-3">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white border border-slate-200 rounded-xl p-4">
              {/* Top: Thumbnail + Title */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                  {course.thumbnail_url ? (
                    <Image
                      src={course.thumbnail_url}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <HiPhoto className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{course.title}</p>
                    {course.is_featured && <HiStar className="w-3 h-3 text-amber-500 shrink-0" />}
                    {course.is_popular && <HiFire className="w-3 h-3 text-red-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 truncate mb-2">/{course.slug}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {course.category && (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: `${course.category.color}15`,
                          color: course.category.color,
                        }}
                      >
                        {course.category.name}
                      </span>
                    )}
                    {getStatusBadge(course.status)}
                  </div>
                </div>
              </div>

              {/* Bottom: Price + Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div>{formatPrice(course)}</div>
                  <div className="text-xs text-slate-500">Order: {course.global_order || 0}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(course)}
                    className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                  >
                    <HiPencilSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(course)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* Results Count */}
      {/* ═══════════════════════════════════════════ */}
      {filteredCourses.length > 0 && (
        <div className="mt-4 text-center text-sm text-slate-500">
          মোট {filteredCourses.length} টি কোর্স দেখানো হচ্ছে
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* Modals */}
      {/* ═══════════════════════════════════════════ */}
      {isModalOpen && (
        <CourseModal
          course={editingCourse}
          categories={categories}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCourse(null);
          }}
          onAddSuccess={handleAddSuccess}
          onEditSuccess={handleEditSuccess}
        />
      )}

      {deletingCourse && (
        <DeleteConfirmModal
          course={deletingCourse}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingCourse(null)}
        />
      )}
    </>
  );
}
