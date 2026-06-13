"use client";

// components/admin/categories/CategoryTable.jsx
// ═══════════════════════════════════════════
// Category Table — List + Actions (Client)
// ═══════════════════════════════════════════
// Features:
// ├── Display table with dynamic icons
// ├── Add/Edit/Delete buttons
// ├── Active toggle (instant)
// ├── Reorder (↑↓)
// ├── ⭐ Instant local state update (no refresh!)
// └── Empty state
// ═══════════════════════════════════════════

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Hi2Icons from "react-icons/hi2";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiChevronUp,
  HiChevronDown,
  HiQuestionMarkCircle,
  HiArchiveBox,
} from "react-icons/hi2";
import CategoryModal from "./CategoryModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function CategoryTable({ initialCategories }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, category: null });

  // ──────────────────────────────────────────
  // Open Add Modal
  // ──────────────────────────────────────────
  const handleAddNew = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  // ──────────────────────────────────────────
  // Open Edit Modal
  // ──────────────────────────────────────────
  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  // ──────────────────────────────────────────
  // Add Success Callback (Instant local update)
  // ──────────────────────────────────────────
  const handleAddSuccess = (newCategory) => {
    setCategories((prev) => [...prev, { ...newCategory, courses_count: 0, exams_count: 0 }]);
    setModalOpen(false);
    setEditingCategory(null);
    router.refresh(); // Background sync
  };

  // ──────────────────────────────────────────
  // Edit Success Callback (Instant local update)
  // ──────────────────────────────────────────
  const handleEditSuccess = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === updatedCategory.id
          ? {
              ...updatedCategory,
              courses_count: c.courses_count,
              exams_count: c.exams_count,
            }
          : c
      )
    );
    setModalOpen(false);
    setEditingCategory(null);
    router.refresh(); // Background sync
  };

  // ──────────────────────────────────────────
  // Toggle Active Status
  // ──────────────────────────────────────────
  const handleToggleActive = async (category) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !category.is_active }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Update failed!");
        return;
      }

      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? { ...c, is_active: !c.is_active } : c))
      );

      toast.success(category.is_active ? "Category inactive করা হলো!" : "Category active করা হলো!");
    } catch (err) {
      toast.error("কিছু ভুল হয়েছে!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────
  // Reorder (↑↓)
  // ──────────────────────────────────────────
  const handleReorder = async (category, direction) => {
    const currentIndex = categories.findIndex((c) => c.id === category.id);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= categories.length) return;

    const swapWith = categories[newIndex];
    setLoading(true);

    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/admin/categories/${category.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ display_order: swapWith.display_order }),
        }),
        fetch(`/api/admin/categories/${swapWith.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ display_order: category.display_order }),
        }),
      ]);

      if (!res1.ok || !res2.ok) {
        toast.error("Reorder failed!");
        return;
      }

      const newCategories = [...categories];
      [newCategories[currentIndex], newCategories[newIndex]] = [
        { ...newCategories[newIndex], display_order: category.display_order },
        { ...newCategories[currentIndex], display_order: swapWith.display_order },
      ];
      setCategories(newCategories);

      toast.success("Order সফলভাবে পরিবর্তন হলো!");
    } catch (err) {
      toast.error("কিছু ভুল হয়েছে!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────
  // Delete Handler
  // ──────────────────────────────────────────
  const handleDelete = (category) => {
    setDeleteModal({ open: true, category });
  };

  const confirmDelete = async () => {
    const category = deleteModal.category;
    if (!category) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Delete failed!");
        setDeleteModal({ open: false, category: null });
        return;
      }

      setCategories((prev) => prev.filter((c) => c.id !== category.id));
      toast.success(data.message || "Category delete হয়েছে!");
      setDeleteModal({ open: false, category: null });
      router.refresh();
    } catch (err) {
      toast.error("কিছু ভুল হয়েছে!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────
  // Helper: Render Dynamic Icon
  // ──────────────────────────────────────────
  const renderIcon = (iconName, color, size = "w-6 h-6") => {
    const Icon = Hi2Icons[iconName] || HiQuestionMarkCircle;
    return <Icon className={size} style={{ color }} />;
  };

  // ──────────────────────────────────────────
  // EMPTY STATE
  // ──────────────────────────────────────────
  if (categories.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-12 text-center">
        <HiArchiveBox className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-[#1F2937] mb-2">কোনো Category নেই!</h3>
        <p className="text-sm text-[#64748B] mb-6">প্রথম category টি যোগ করে শুরু করুন।</p>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E9CD7] text-white rounded-xl font-semibold hover:bg-[#0A5A8A] transition-all shadow-md hover:shadow-lg"
        >
          <HiPlus className="w-5 h-5" />
          প্রথম Category যোগ করুন
        </button>

        {/* Modal */}
        {modalOpen && (
          <CategoryModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onAddSuccess={handleAddSuccess}
            onEditSuccess={handleEditSuccess}
            category={editingCategory}
          />
        )}
      </div>
    );
  }

  // ──────────────────────────────────────────
  // MAIN TABLE
  // ──────────────────────────────────────────
  return (
    <>
      <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#FAFBFC]">
          <div>
            <h2 className="text-lg font-bold text-[#1F2937]">সকল Categories</h2>
            <p className="text-xs text-[#64748B] mt-0.5">{categories.length} টি category রয়েছে</p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E9CD7] text-white rounded-xl font-semibold text-sm hover:bg-[#0A5A8A] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <HiPlus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Name & Slug
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Exams
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {categories.map((cat, index) => (
                <tr key={cat.id} className="hover:bg-[#FAFBFC] transition-colors">
                  {/* Icon */}
                  <td className="px-6 py-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${cat.color}15`,
                        border: `1px solid ${cat.color}30`,
                        boxShadow: `0 4px 12px ${cat.color}20`,
                      }}
                    >
                      {renderIcon(cat.icon, cat.color, "w-6 h-6")}
                    </div>
                  </td>

                  {/* Name & Slug */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#1F2937]">{cat.name}</div>
                    <div className="text-xs text-[#94A3B8] font-mono mt-0.5">/{cat.slug}</div>
                  </td>

                  {/* Courses Count */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center h-7 px-3 bg-[#1E9CD7]/10 text-[#1E9CD7] rounded-lg text-sm font-semibold">
                      {cat.courses_count}
                    </span>
                  </td>

                  {/* Exams Count */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center h-7 px-3 bg-[#7C3AED]/10 text-[#7C3AED] rounded-lg text-sm font-semibold">
                      {cat.exams_count}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleActive(cat)}
                      disabled={loading}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all disabled:opacity-50 ${
                        cat.is_active
                          ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          cat.is_active ? "bg-green-500 animate-pulse" : "bg-gray-400"
                        }`}
                      />
                      {cat.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  {/* Order with Up/Down */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleReorder(cat, "up")}
                        disabled={loading || index === 0}
                        className="p-1 rounded-md hover:bg-[#E2E8F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="উপরে নিন"
                      >
                        <HiChevronUp className="w-4 h-4 text-[#64748B]" />
                      </button>
                      <span className="text-sm font-semibold text-[#1F2937] w-6 text-center">
                        {cat.display_order}
                      </span>
                      <button
                        onClick={() => handleReorder(cat, "down")}
                        disabled={loading || index === categories.length - 1}
                        className="p-1 rounded-md hover:bg-[#E2E8F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="নিচে নিন"
                      >
                        <HiChevronDown className="w-4 h-4 text-[#64748B]" />
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-2 rounded-lg bg-[#1E9CD7]/10 hover:bg-[#1E9CD7]/20 transition-all"
                        title="Edit"
                      >
                        <HiPencil className="w-4 h-4 text-[#1E9CD7]" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all"
                        title="Delete"
                      >
                        <HiTrash className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-[#E2E8F0]">
          {categories.map((cat, index) => (
            <div key={cat.id} className="p-4 space-y-3">
              {/* Top Row: Icon + Name + Actions */}
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${cat.color}15`,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  {renderIcon(cat.icon, cat.color, "w-6 h-6")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#1F2937] truncate">{cat.name}</div>
                  <div className="text-xs text-[#94A3B8] font-mono">/{cat.slug}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-2 rounded-lg bg-[#1E9CD7]/10"
                  >
                    <HiPencil className="w-4 h-4 text-[#1E9CD7]" />
                  </button>
                  <button onClick={() => handleDelete(cat)} className="p-2 rounded-lg bg-red-50">
                    <HiTrash className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1E9CD7]/10 text-[#1E9CD7] rounded-md text-xs font-semibold">
                  📚 {cat.courses_count} Courses
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-md text-xs font-semibold">
                  📝 {cat.exams_count} Exams
                </span>
                <button
                  onClick={() => handleToggleActive(cat)}
                  disabled={loading}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border ${
                    cat.is_active
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      cat.is_active ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {cat.is_active ? "Active" : "Inactive"}
                </button>
              </div>

              {/* Order Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
                <span className="text-xs text-[#64748B]">
                  Order: <strong>{cat.display_order}</strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReorder(cat, "up")}
                    disabled={loading || index === 0}
                    className="p-1.5 rounded-md bg-[#F1F5F9] disabled:opacity-30"
                  >
                    <HiChevronUp className="w-4 h-4 text-[#64748B]" />
                  </button>
                  <button
                    onClick={() => handleReorder(cat, "down")}
                    disabled={loading || index === categories.length - 1}
                    className="p-1.5 rounded-md bg-[#F1F5F9] disabled:opacity-30"
                  >
                    <HiChevronDown className="w-4 h-4 text-[#64748B]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Add/Edit Modal ─── */}
      {modalOpen && (
        <CategoryModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingCategory(null);
          }}
          onAddSuccess={handleAddSuccess}
          onEditSuccess={handleEditSuccess}
          category={editingCategory}
        />
      )}

      {/* ─── Delete Confirm Modal ─── */}
      {deleteModal.open && (
        <DeleteConfirmModal
          isOpen={deleteModal.open}
          onClose={() => setDeleteModal({ open: false, category: null })}
          onConfirm={confirmDelete}
          category={deleteModal.category}
          loading={loading}
        />
      )}
    </>
  );
}
