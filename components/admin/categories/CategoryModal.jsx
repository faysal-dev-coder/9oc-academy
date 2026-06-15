"use client";

// components/admin/categories/CategoryModal.jsx
// ═══════════════════════════════════════════
// Category Modal — Add/Edit Form
// ═══════════════════════════════════════════
// Features:
// ├── React Hook Form + Zod validation
// ├── useWatch (Compiler friendly!)
// ├── Icon Picker integration
// ├── Color Picker (preset + custom)
// ├── Auto-slug generation
// ├── Live preview
// ├── Bengali support
// └── ⭐ Instant local state update (no refresh needed)
// ═══════════════════════════════════════════

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import * as Hi2Icons from "react-icons/hi2";
import { HiXMark, HiQuestionMarkCircle } from "react-icons/hi2";
import IconPickerGrid from "./IconPickerGrid";

// ⭐ Validation Schema
const categorySchema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে").max(100),
  slug: z
    .string()
    .min(2, "Slug কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "শুধু lowercase letter, digit, hyphen allowed"),
  description: z.string().max(500).optional().or(z.literal("")),
  icon: z.string().min(1, "Icon সিলেক্ট করুন"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Valid hex color দিন"),
  display_order: z.coerce.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

// ⭐ Preset Brand Colors
const PRESET_COLORS = [
  { hex: "#1E9CD7", name: "Brand Blue" },
  { hex: "#059669", name: "Green" },
  { hex: "#7C3AED", name: "Purple" },
  { hex: "#D97706", name: "Amber" },
  { hex: "#DC2626", name: "Red" },
  { hex: "#EC4899", name: "Pink" },
  { hex: "#0A5A8A", name: "Dark Blue" },
  { hex: "#FBBF24", name: "Yellow" },
];

// ⭐ Auto-slug helper
const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export default function CategoryModal({ isOpen, onClose, onAddSuccess, onEditSuccess, category }) {
  const isEditMode = !!category;
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      icon: "HiAcademicCap",
      color: "#1E9CD7",
      display_order: 0,
      is_active: true,
    },
  });

  // ⭐ useWatch — React Compiler friendly!
  const watchedName = useWatch({ control, name: "name" });
  const watchedIcon = useWatch({ control, name: "icon" });
  const watchedColor = useWatch({ control, name: "color" });
  const watchedIsActive = useWatch({ control, name: "is_active" });

  // ⭐ Reset form on open
  useEffect(() => {
    if (isOpen) {
      if (category) {
        reset({
          name: category.name || "",
          slug: category.slug || "",
          description: category.description || "",
          icon: category.icon || "HiAcademicCap",
          color: category.color || "#1E9CD7",
          display_order: category.display_order || 0,
          is_active: category.is_active ?? true,
        });
      } else {
        reset({
          name: "",
          slug: "",
          description: "",
          icon: "HiAcademicCap",
          color: "#1E9CD7",
          display_order: 0,
          is_active: true,
        });
      }
    }
  }, [isOpen, category, reset]);

  // ⭐ ESC key to close
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // ⭐ Submit Handler
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const url = isEditMode ? `/api/admin/categories/${category.id}` : "/api/admin/categories";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "কিছু ভুল হয়েছে!");
        return;
      }

      toast.success(
        result.message || (isEditMode ? "Category আপডেট হয়েছে!" : "Category যোগ হয়েছে!")
      );

      if (isEditMode) {
        onEditSuccess(result.category);
      } else {
        onAddSuccess(result.category);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Network error!");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const PreviewIcon = Hi2Icons[watchedIcon] || HiQuestionMarkCircle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-lg font-bold text-[#1F2937]">
              {isEditMode ? "Edit Category" : "Add New Category"}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              {isEditMode ? "ক্যাটাগরির তথ্য আপডেট করুন" : "নতুন category তৈরি করুন"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors">
            <HiXMark className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        {/* ─── Form Body (Scrollable) ─── */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* ─── Live Preview Card ─── */}
          <div className="bg-[#FAFBFC] border border-[#E2E8F0] rounded-xl p-4">
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
              Live Preview
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${watchedColor}15`,
                  border: `1px solid ${watchedColor}30`,
                  boxShadow: `0 4px 12px ${watchedColor}20`,
                }}
              >
                <PreviewIcon className="w-7 h-7" style={{ color: watchedColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#1F2937] truncate">
                  {watchedName || "Category Name"}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      watchedIsActive
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        watchedIsActive ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    {watchedIsActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Name + Slug Row ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="যেমন: BCS প্রস্তুতি"
                className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#1E9CD7] focus:ring-2 focus:ring-[#1E9CD7]/10 transition-all"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                Slug <span className="text-red-500">*</span>
                <button
                  type="button"
                  onClick={() => {
                    const generated = generateSlug(watchedName || "");
                    setValue("slug", generated, { shouldValidate: true });
                  }}
                  className="ml-2 text-xs text-[#1E9CD7] hover:underline font-normal"
                >
                  Auto Generate
                </button>
              </label>
              <input
                type="text"
                {...register("slug")}
                placeholder="bcs-preparation"
                className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#1E9CD7] focus:ring-2 focus:ring-[#1E9CD7]/10 transition-all font-mono"
              />
              {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
              <p className="text-xs text-[#94A3B8] mt-1">
                lowercase, hyphen-separated (URL এ ব্যবহার হবে)
              </p>
            </div>
          </div>

          {/* ─── Description ─── */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">Description</label>
            <textarea
              {...register("description")}
              rows={2}
              placeholder="সংক্ষিপ্ত বিবরণ (optional)"
              className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#1E9CD7] focus:ring-2 focus:ring-[#1E9CD7]/10 transition-all resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* ─── Icon Picker ─── */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
              Icon <span className="text-red-500">*</span>
            </label>
            <IconPickerGrid
              selectedIcon={watchedIcon}
              onSelect={(iconName) => setValue("icon", iconName, { shouldValidate: true })}
              color={watchedColor}
            />
            {errors.icon && <p className="text-xs text-red-500 mt-1">{errors.icon.message}</p>}
          </div>

          {/* ─── Color Picker ─── */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
              Color <span className="text-red-500">*</span>
            </label>

            {/* Preset Colors */}
            <div className="grid grid-cols-8 gap-2 mb-3">
              {PRESET_COLORS.map((preset) => (
                <button
                  key={preset.hex}
                  type="button"
                  onClick={() => setValue("color", preset.hex, { shouldValidate: true })}
                  title={preset.name}
                  className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                    watchedColor === preset.hex
                      ? "ring-2 ring-offset-2 ring-[#1E9CD7] border-white scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: preset.hex }}
                />
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={watchedColor}
                onChange={(e) => setValue("color", e.target.value, { shouldValidate: true })}
                className="w-12 h-10 border border-[#E2E8F0] rounded-lg cursor-pointer"
              />
              <input
                type="text"
                {...register("color")}
                placeholder="#1E9CD7"
                className="flex-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#1E9CD7] focus:ring-2 focus:ring-[#1E9CD7]/10 transition-all font-mono"
              />
            </div>
            {errors.color && <p className="text-xs text-red-500 mt-1">{errors.color.message}</p>}
          </div>

          {/* ─── Display Order + Active Toggle ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Display Order */}
            <div>
              <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                {...register("display_order")}
                placeholder="0"
                min={0}
                className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#1E9CD7] focus:ring-2 focus:ring-[#1E9CD7]/10 transition-all"
              />
              <p className="text-xs text-[#94A3B8] mt-1">ছোট সংখ্যা আগে দেখাবে</p>
            </div>

            {/* Active Toggle */}
            <div>
              <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">Status</label>
              <label className="flex items-center gap-3 px-3 py-2 border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-[#FAFBFC] transition-all">
                <input
                  type="checkbox"
                  {...register("is_active")}
                  className="w-4 h-4 text-[#1E9CD7] border-[#E2E8F0] rounded focus:ring-[#1E9CD7]"
                />
                <span className="text-sm text-[#1F2937]">
                  {watchedIsActive ? "Active (Public এ দেখাবে)" : "Inactive (Hidden)"}
                </span>
              </label>
            </div>
          </div>
        </form>

        {/* ─── Footer Actions ─── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC] rounded-b-2xl">
          {/* Required note — LEFT side */}
          <p className="text-xs text-[#94A3B8]">
            <span className="text-red-500">*</span> Required fields
          </p>

          {/* Buttons — RIGHT side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-semibold text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={submitting}
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  সংরক্ষণ হচ্ছে...
                </>
              ) : isEditMode ? (
                "Update Category"
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
