"use client";

// components/admin/categories/CategoryTable.jsx
// ═══════════════════════════════════════════════════════════════
// 📋 Premium Category Table — List + Actions
// ⭐ Phase 4: Categories CRUD
// ⭐ Uses: Card + FilterBar + EmptyState + Button + Badge
// ⭐ Uses: ConfirmDialog + CategoryModal + DynamicIcon
// ═══════════════════════════════════════════════════════════════

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, FolderOpen, SearchX } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FilterBar from "@/components/admin/shared/FilterBar";
import EmptyState from "@/components/admin/shared/EmptyState";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import CategoryModal from "./CategoryModal";
import { DynamicIcon } from "./IconPickerGrid";

// ─────────────────────────────────────────────
//  FILTER OPTIONS
// ─────────────────────────────────────────────
const STATUS_FILTERS = [
  { id: "all", label: "All Status" },
  { id: "active", label: "Active Only" },
  { id: "inactive", label: "Inactive Only" },
];

// ─────────────────────────────────────────────
//  CATEGORY TABLE COMPONENT
// ─────────────────────────────────────────────
export default function CategoryTable({ initialCategories }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  // ── Filter States ──
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // ── Modal States ──
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, category: null });

  // ─────────────────────────────────────────────
  //  FILTERED CATEGORIES (useMemo)
  // ─────────────────────────────────────────────
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchSearch =
        searchQuery === "" ||
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.slug && cat.slug.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && cat.is_active) ||
        (filterStatus === "inactive" && !cat.is_active);

      return matchSearch && matchStatus;
    });
  }, [categories, searchQuery, filterStatus]);

  // ─────────────────────────────────────────────
  //  HANDLERS
  // ─────────────────────────────────────────────

  // Open Add Modal
  const handleAddNew = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
  };

  // Add Success
  const handleAddSuccess = (newCategory) => {
    setCategories((prev) => [...prev, { ...newCategory, courses_count: 0, exams_count: 0 }]);
    handleCloseModal();
    router.refresh();
  };

  // Edit Success
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
    handleCloseModal();
    router.refresh();
  };

  // Toggle Active
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
      console.error(err);
      toast.error("কিছু ভুল হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  // Reorder
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
      console.error(err);
      toast.error("কিছু ভুল হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  // Delete Handlers
  const handleDelete = (category) => {
    setDeleteModal({ open: true, category });
  };

  const closeDeleteModal = () => {
    if (loading) return;
    setDeleteModal({ open: false, category: null });
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
        return;
      }

      setCategories((prev) => prev.filter((c) => c.id !== category.id));
      toast.success(data.message || "Category delete হয়েছে!");
      setDeleteModal({ open: false, category: null });
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("কিছু ভুল হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
  };

  // ─────────────────────────────────────────────
  //  COMPUTED: Delete dialog content
  // ─────────────────────────────────────────────
  const deleteCategory = deleteModal.category;
  const hasLinkedItems =
    deleteCategory &&
    ((deleteCategory.courses_count || 0) > 0 || (deleteCategory.exams_count || 0) > 0);

  const deleteDialogDescription = deleteCategory
    ? hasLinkedItems
      ? `এই category তে ${deleteCategory.courses_count || 0} টি course এবং ${
          deleteCategory.exams_count || 0
        } টি exam আছে। আগে এগুলো অন্য category তে move করুন বা delete করুন।`
      : `"${deleteCategory.name}" category টি permanently delete হয়ে যাবে। এই action undo করা যাবে না!`
    : "";

  // ─────────────────────────────────────────────
  //  EMPTY STATE (no categories at all)
  // ─────────────────────────────────────────────
  if (categories.length === 0) {
    return (
      <>
        <Card variant="elevated" padding="none">
          <EmptyState
            icon={FolderOpen}
            title="কোনো Category নেই!"
            description="প্রথম category টি যোগ করে শুরু করুন।"
            size="lg"
            action={
              <Button variant="primary" icon={Plus} onClick={handleAddNew}>
                New Category
              </Button>
            }
          />
        </Card>

        {/* Add Modal */}
        {modalOpen && (
          <CategoryModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            onAddSuccess={handleAddSuccess}
            onEditSuccess={handleEditSuccess}
            category={editingCategory}
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
          {/* Filter Bar (search + status) */}
          <div className="flex-1">
            <FilterBar
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Category name বা slug দিয়ে খুঁজুন..."
              filterOptions={STATUS_FILTERS}
              filterValue={filterStatus}
              onFilterChange={setFilterStatus}
              onClear={handleClearFilters}
            />
          </div>

          {/* New Category Button */}
          <Button variant="primary" icon={Plus} onClick={handleAddNew}>
            New Category
          </Button>
        </div>

        {/* Results count */}
        {(searchQuery || filterStatus !== "all") && (
          <p className="mt-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{filteredCategories.length}</span> টি
            result পাওয়া গেছে
          </p>
        )}
      </Card>

      {/* ═══ Table Card ═══ */}
      <Card variant="elevated" padding="none">
        {/* ─── Desktop Table ─── */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Name & Slug
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Courses
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Exams
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Order
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12">
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
                filteredCategories.map((cat, index) => (
                  <tr key={cat.id} className="transition-colors hover:bg-slate-50">
                    {/* ─── Icon ─── */}
                    <td className="px-6 py-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${cat.color}15`,
                          border: `1px solid ${cat.color}30`,
                          boxShadow: `0 4px 12px ${cat.color}20`,
                        }}
                      >
                        <DynamicIcon name={cat.icon} size={24} style={{ color: cat.color }} />
                      </div>
                    </td>

                    {/* ─── Name & Slug ─── */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{cat.name}</div>
                      <div className="mt-0.5 font-mono text-xs text-slate-500">/{cat.slug}</div>
                    </td>

                    {/* ─── Courses Count ─── */}
                    <td className="px-6 py-4 text-center">
                      <Badge variant="brand" appearance="soft" size="md">
                        {cat.courses_count}
                      </Badge>
                    </td>

                    {/* ─── Exams Count ─── */}
                    <td className="px-6 py-4 text-center">
                      <Badge variant="warning" appearance="soft" size="md">
                        {cat.exams_count}
                      </Badge>
                    </td>

                    {/* ─── Status Toggle ─── */}
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant={cat.is_active ? "success" : "default"}
                        appearance="soft"
                        size="md"
                        dot
                        onClick={() => handleToggleActive(cat)}
                      >
                        {cat.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>

                    {/* ─── Order ─── */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleReorder(cat, "up")}
                          disabled={loading || index === 0}
                          className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                          title="উপরে নিন"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-slate-700">
                          {cat.display_order}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleReorder(cat, "down")}
                          disabled={loading || index === filteredCategories.length - 1}
                          className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                          title="নিচে নিন"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </td>

                    {/* ─── Actions ─── */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Pencil}
                          iconOnly
                          onClick={() => handleEdit(cat)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          iconOnly
                          onClick={() => handleDelete(cat)}
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
          {filteredCategories.length === 0 ? (
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
            filteredCategories.map((cat, index) => (
              <div key={cat.id} className="space-y-3 p-4">
                {/* Top: Icon + Name + Actions */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      border: `1px solid ${cat.color}30`,
                    }}
                  >
                    <DynamicIcon name={cat.icon} size={24} style={{ color: cat.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-slate-900">{cat.name}</div>
                    <div className="font-mono text-xs text-slate-500">/{cat.slug}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Pencil}
                      iconOnly
                      onClick={() => handleEdit(cat)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      iconOnly
                      onClick={() => handleDelete(cat)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand" appearance="soft" size="sm">
                    {cat.courses_count} Courses
                  </Badge>
                  <Badge variant="warning" appearance="soft" size="sm">
                    {cat.exams_count} Exams
                  </Badge>
                  <Badge
                    variant={cat.is_active ? "success" : "default"}
                    appearance="soft"
                    size="sm"
                    dot
                    onClick={() => handleToggleActive(cat)}
                  >
                    {cat.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {/* Order Controls */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <span className="text-xs text-slate-500">
                    Order: <strong className="text-slate-700">{cat.display_order}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReorder(cat, "up")}
                      disabled={loading || index === 0}
                      className="rounded-md bg-slate-100 p-1.5 text-slate-500 transition-colors hover:bg-slate-200 disabled:opacity-30"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReorder(cat, "down")}
                      disabled={loading || index === filteredCategories.length - 1}
                      className="rounded-md bg-slate-100 p-1.5 text-slate-500 transition-colors hover:bg-slate-200 disabled:opacity-30"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* ═══ Add/Edit Modal ═══ */}
      {modalOpen && (
        <CategoryModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onAddSuccess={handleAddSuccess}
          onEditSuccess={handleEditSuccess}
          category={editingCategory}
        />
      )}

      {/* ═══ Delete Confirm Dialog ═══ */}
      <ConfirmDialog
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        title={hasLinkedItems ? "Delete করা যাবে না!" : "Delete Category?"}
        description={deleteDialogDescription}
        variant={hasLinkedItems ? "warning" : "danger"}
        confirmLabel={hasLinkedItems ? "OK" : "Yes, Delete"}
        cancelLabel="Cancel"
        onConfirm={hasLinkedItems ? closeDeleteModal : confirmDelete}
        loading={loading}
      />
    </div>
  );
}
