"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Pencil,
  Trash2,
  Plus,
  BookOpen,
  ImageIcon,
  Star,
  CheckCircle2,
  FileEdit,
  Archive,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FilterBar from "@/components/admin/shared/FilterBar";
import EmptyState from "@/components/admin/shared/EmptyState";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import CourseModal from "./CourseModal";

// ════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════
const statusConfig = {
  active: { label: "Active", color: "success", icon: CheckCircle2 },
  draft: { label: "Draft", color: "warning", icon: FileEdit },
  archived: { label: "Archived", color: "default", icon: Archive },
};

function truncate(text, len = 60) {
  if (!text) return "";
  return text.length > len ? text.substring(0, len) + "..." : text;
}

// ════════════════════════════════════════════════════════════
// Price Display Component
// ════════════════════════════════════════════════════════════
function PriceDisplay({ course }) {
  if (course.is_free) {
    return <span className="text-emerald-600 font-semibold text-sm">Free</span>;
  }

  if (course.discount_price && course.discount_price < course.price) {
    return (
      <div className="flex flex-col">
        <span className="text-slate-900 font-semibold text-sm">৳{course.discount_price}</span>
        <span className="text-slate-400 text-xs line-through">৳{course.price}</span>
      </div>
    );
  }

  return <span className="text-slate-900 font-semibold text-sm">৳{course.price || 0}</span>;
}

// ════════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════════
export default function CourseTable({ initialCourses, categories }) {
  const [courses, setCourses] = useState(initialCourses || []);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ──────────────────────────────────────────────────────────
  // Filter logic
  // ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        !search ||
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.slug?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "all" || String(c.category_id) === categoryFilter;
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [courses, search, categoryFilter, statusFilter]);

  // ──────────────────────────────────────────────────────────
  // Handlers
  // ──────────────────────────────────────────────────────────
  const handleCreate = () => {
    setEditingCourse(null);
    setModalOpen(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setModalOpen(true);
  };

  const handleSuccess = (savedCourse, isEdit) => {
    if (isEdit) {
      setCourses((prev) => prev.map((c) => (c.id === savedCourse.id ? savedCourse : c)));
    } else {
      setCourses((prev) => [savedCourse, ...prev]);
    }
  };

  const handleDelete = async () => {
    if (!deletingCourse) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/courses/${deletingCourse.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error);
        return;
      }
      toast.success(json.message);
      setCourses((prev) => prev.filter((c) => c.id !== deletingCourse.id));
      setDeletingCourse(null);
    } catch (err) {
      console.error(err);
      toast.error("সার্ভার ত্রুটি!");
    } finally {
      setDeleting(false);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  // ──────────────────────────────────────────────────────────
  // Filter options (FilterBar API: { id, label })
  // ──────────────────────────────────────────────────────────
  const categoryOptions = [
    { id: "all", label: "সব ক্যাটাগরি" },
    ...(categories || []).map((c) => ({ id: String(c.id), label: c.name })),
  ];

  const statusOptions = [
    { id: "all", label: "সব Status" },
    { id: "active", label: "Active" },
    { id: "draft", label: "Draft" },
    { id: "archived", label: "Archived" },
  ];

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────
  return (
    <Card>
      <Card.Body>
        {/* ════════════════════════════════════════════ */}
        {/* Top Bar: Filters + Add Button                */}
        {/* ════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <div className="flex-1">
            <FilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="কোর্স খুঁজুন (title/slug)..."
              filterOptions={categoryOptions}
              filterValue={categoryFilter}
              onFilterChange={setCategoryFilter}
              sortOptions={statusOptions}
              sortValue={statusFilter}
              onSortChange={setStatusFilter}
              onClear={handleClearFilters}
            />
          </div>
          <Button variant="primary" icon={Plus} onClick={handleCreate}>
            নতুন কোর্স
          </Button>
        </div>

        {/* ════════════════════════════════════════════ */}
        {/* List / Empty State                           */}
        {/* ════════════════════════════════════════════ */}
        {courses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="এখনো কোনো কোর্স নেই"
            description="প্রথম কোর্স যোগ করে শুরু করুন!"
            action={
              <Button variant="primary" icon={Plus} onClick={handleCreate}>
                প্রথম কোর্স যোগ করুন
              </Button>
            }
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            variant="search"
            icon={BookOpen}
            title="কোনো কোর্স পাওয়া যায়নি"
            description="ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।"
          />
        ) : (
          <>
            {/* ═══════════════════════════════════════ */}
            {/* Desktop Table (lg+)                     */}
            {/* ═══════════════════════════════════════ */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3">
                      কোর্স
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-32">
                      ক্যাটাগরি
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-24">
                      মূল্য
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-28">
                      Status
                    </th>
                    <th className="text-center text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-16">
                      Order
                    </th>
                    <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-24">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((course) => {
                    const status = statusConfig[course.status] || statusConfig.draft;
                    const StatusIcon = status.icon;
                    return (
                      <tr
                        key={course.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        {/* Course (Thumbnail + Title) */}
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
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
                                  <ImageIcon className="w-5 h-5 text-slate-400" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <p className="text-sm font-semibold text-slate-900 truncate">
                                  {course.title}
                                </p>
                                {course.is_featured && (
                                  <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-amber-500" />
                                )}
                              </div>
                              <p className="text-xs text-slate-500 truncate">/{course.slug}</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-3 py-3">
                          {course.category ? (
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
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
                        <td className="px-3 py-3">
                          <PriceDisplay course={course} />
                        </td>

                        {/* Status */}
                        <td className="px-3 py-3">
                          <Badge variant={status.color} size="sm" icon={StatusIcon}>
                            {status.label}
                          </Badge>
                        </td>

                        {/* Order */}
                        <td className="px-3 py-3 text-center text-sm text-slate-600">
                          {course.global_order || 0}
                        </td>

                        {/* Actions */}
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconOnly
                              icon={Pencil}
                              onClick={() => handleEdit(course)}
                              title="এডিট"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              iconOnly
                              icon={Trash2}
                              onClick={() => setDeletingCourse(course)}
                              title="ডিলিট"
                              className="text-red-600 hover:bg-red-50"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ═══════════════════════════════════════ */}
            {/* Mobile Cards (< lg)                     */}
            {/* ═══════════════════════════════════════ */}
            <div className="lg:hidden space-y-3">
              {filtered.map((course) => {
                const status = statusConfig[course.status] || statusConfig.draft;
                const StatusIcon = status.icon;
                return (
                  <div key={course.id} className="p-3 border border-slate-200 rounded-lg bg-white">
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
                            <ImageIcon className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {course.title}
                          </p>
                          {course.is_featured && (
                            <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-amber-500" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate mb-2">/{course.slug}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {course.category && (
                            <span
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium"
                              style={{
                                backgroundColor: `${course.category.color}15`,
                                color: course.category.color,
                              }}
                            >
                              {course.category.name}
                            </span>
                          )}
                          <Badge variant={status.color} size="sm" icon={StatusIcon}>
                            {status.label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Price + Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <PriceDisplay course={course} />
                        <span className="text-xs text-slate-500">
                          Order: {course.global_order || 0}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconOnly
                          icon={Pencil}
                          onClick={() => handleEdit(course)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconOnly
                          icon={Trash2}
                          onClick={() => setDeletingCourse(course)}
                          className="text-red-600 hover:bg-red-50"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center text-xs text-slate-500">
              মোট {filtered.length} টি কোর্স দেখানো হচ্ছে
            </div>
          </>
        )}
      </Card.Body>

      {/* ════════════════════════════════════════════ */}
      {/* Modal — Key prop for Compiler-safe reset    */}
      {/* ════════════════════════════════════════════ */}
      {modalOpen && (
        <CourseModal
          key={editingCourse?.id || "new"}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingCourse(null);
          }}
          editingCourse={editingCourse}
          categories={categories}
          onSuccess={handleSuccess}
        />
      )}

      {/* ════════════════════════════════════════════ */}
      {/* Delete Confirm Dialog                        */}
      {/* ════════════════════════════════════════════ */}
      <ConfirmDialog
        isOpen={!!deletingCourse}
        onClose={() => setDeletingCourse(null)}
        onConfirm={handleDelete}
        title="কোর্স ডিলিট করবেন?"
        description={
          deletingCourse
            ? `"${truncate(deletingCourse.title, 50)}" — এই কোর্সটি স্থায়ীভাবে মুছে যাবে! Enrollment থাকলে delete হবে না — সেক্ষেত্রে Archive করুন।`
            : ""
        }
        confirmLabel="ডিলিট করুন"
        cancelLabel="বাতিল"
        variant="danger"
        loading={deleting}
      />
    </Card>
  );
}
