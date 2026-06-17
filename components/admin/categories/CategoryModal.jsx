"use client";

// components/admin/categories/CategoryModal.jsx
// ═══════════════════════════════════════════════════════════════
// 📝 Premium Category Modal — Add/Edit Form
// ⭐ Phase 4: Categories CRUD
// ⭐ Uses: Modal + Input + Button + Card + Badge + IconPickerGrid
// ⭐ Form: React Hook Form + Zod validation
// ═══════════════════════════════════════════════════════════════

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Save, Plus } from "lucide-react";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import IconPickerGrid, { DynamicIcon } from "./IconPickerGrid";

// ─────────────────────────────────────────────
//  VALIDATION SCHEMA (Zod)
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
//  PRESET BRAND COLORS
// ─────────────────────────────────────────────
const PRESET_COLORS = [
  { hex: "#1E40AF", name: "Brand Blue" },
  { hex: "#059669", name: "Emerald" },
  { hex: "#7C3AED", name: "Purple" },
  { hex: "#D97706", name: "Amber" },
  { hex: "#DC2626", name: "Red" },
  { hex: "#EC4899", name: "Pink" },
  { hex: "#0891B2", name: "Cyan" },
  { hex: "#EAB308", name: "Yellow" },
];

// ─────────────────────────────────────────────
//  AUTO-SLUG HELPER
// ─────────────────────────────────────────────
const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

// ─────────────────────────────────────────────
//  CATEGORY MODAL COMPONENT
// ─────────────────────────────────────────────
export default function CategoryModal({ isOpen, onClose, onAddSuccess, onEditSuccess, category }) {
  const isEditMode = !!category;
  const [submitting, setSubmitting] = useState(false);

  // ── React Hook Form ──
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
      icon: "GraduationCap",
      color: "#1E40AF",
      display_order: 0,
      is_active: true,
    },
  });

  // ── Watch values (React Compiler friendly) ──
  const watchedName = useWatch({ control, name: "name" });
  const watchedIcon = useWatch({ control, name: "icon" });
  const watchedColor = useWatch({ control, name: "color" });
  const watchedIsActive = useWatch({ control, name: "is_active" });

  // ── Reset form when modal opens ──
  useEffect(() => {
    if (!isOpen) return;

    if (category) {
      reset({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        icon: category.icon || "GraduationCap",
        color: category.color || "#1E40AF",
        display_order: category.display_order || 0,
        is_active: category.is_active ?? true,
      });
    } else {
      reset({
        name: "",
        slug: "",
        description: "",
        icon: "GraduationCap",
        color: "#1E40AF",
        display_order: 0,
        is_active: true,
      });
    }
  }, [isOpen, category, reset]);

  // ── Submit Handler ──
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" closeOnBackdrop={!submitting}>
      {/* ─── HEADER ─── */}
      <Modal.Header title={isEditMode ? "Edit Category" : "Add New Category"} onClose={onClose} />

      {/* ─── BODY (Scrollable Form) ─── */}
      <Modal.Body className="space-y-5">
        <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* ═══ Live Preview Card ═══ */}
          <Card variant="default" padding="sm" className="bg-slate-50">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Live Preview
            </p>

            <div className="flex items-center gap-3">
              {/* Icon Box */}
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${watchedColor}15`,
                  border: `1px solid ${watchedColor}30`,
                  boxShadow: `0 4px 12px ${watchedColor}20`,
                }}
              >
                <DynamicIcon name={watchedIcon} size={28} style={{ color: watchedColor }} />
              </div>

              {/* Name + Status */}
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-slate-900">
                  {watchedName || "Category Name"}
                </div>
                <div className="mt-1.5">
                  <Badge
                    variant={watchedIsActive ? "success" : "default"}
                    appearance="soft"
                    size="sm"
                    dot
                  >
                    {watchedIsActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* ═══ Name + Slug Row ═══ */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Name */}
            <Input
              label="Name"
              required
              placeholder="যেমন: BCS প্রস্তুতি"
              {...register("name")}
              error={errors.name?.message}
            />

            {/* Slug */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Slug
                  <span className="ml-0.5 text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const generated = generateSlug(watchedName || "");
                    setValue("slug", generated, { shouldValidate: true });
                  }}
                  className="text-xs font-medium text-brand-700 hover:text-brand-800 hover:underline"
                >
                  Auto Generate
                </button>
              </div>
              <Input
                placeholder="bcs-preparation"
                {...register("slug")}
                error={errors.slug?.message}
                helper={
                  !errors.slug ? "lowercase, hyphen-separated (URL এ ব্যবহার হবে)" : undefined
                }
                className="font-mono"
              />
            </div>
          </div>

          {/* ═══ Description ═══ */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              {...register("description")}
              rows={2}
              placeholder="সংক্ষিপ্ত বিবরণ (optional)"
              className={[
                "w-full resize-none rounded-lg border bg-white px-3.5 py-2 text-sm text-slate-900",
                "transition-all duration-150 outline-none",
                "placeholder:text-slate-400",
                errors.description
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 hover:border-slate-400 focus:border-brand-700 focus:ring-2 focus:ring-brand-100",
              ].join(" ")}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* ═══ Icon Picker ═══ */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Icon
              <span className="ml-0.5 text-red-500">*</span>
            </label>
            <IconPickerGrid
              selectedIcon={watchedIcon}
              onSelect={(iconName) => setValue("icon", iconName, { shouldValidate: true })}
              color={watchedColor}
            />
            {errors.icon && <p className="mt-1.5 text-xs text-red-600">{errors.icon.message}</p>}
          </div>

          {/* ═══ Color Picker ═══ */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Color
              <span className="ml-0.5 text-red-500">*</span>
            </label>

            {/* Preset Colors */}
            <div className="mb-3 grid grid-cols-8 gap-2">
              {PRESET_COLORS.map((preset) => (
                <button
                  key={preset.hex}
                  type="button"
                  onClick={() => setValue("color", preset.hex, { shouldValidate: true })}
                  title={preset.name}
                  className={[
                    "aspect-square rounded-lg border-2 transition-all duration-150",
                    "hover:scale-110 cursor-pointer",
                    "outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2",
                    watchedColor === preset.hex
                      ? "scale-110 border-white ring-2 ring-offset-2 ring-brand-800"
                      : "border-transparent",
                  ].join(" ")}
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
                className="h-10 w-12 cursor-pointer rounded-lg border border-slate-300"
              />
              <div className="flex-1">
                <Input
                  placeholder="#1E40AF"
                  {...register("color")}
                  error={errors.color?.message}
                  className="font-mono"
                />
              </div>
            </div>
          </div>

          {/* ═══ Display Order + Active Toggle ═══ */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Display Order */}
            <Input
              label="Display Order"
              type="number"
              min={0}
              placeholder="0"
              {...register("display_order")}
              helper="ছোট সংখ্যা আগে দেখাবে"
            />

            {/* Active Toggle */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
              <label
                className={[
                  "flex h-10 cursor-pointer items-center gap-3 rounded-lg border px-3",
                  "transition-all duration-150",
                  "border-slate-300 hover:border-slate-400 hover:bg-slate-50",
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  {...register("is_active")}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-brand-800 focus:ring-brand-800"
                />
                <span className="text-sm text-slate-700">
                  {watchedIsActive ? "Active (Public এ দেখাবে)" : "Inactive (Hidden)"}
                </span>
              </label>
            </div>
          </div>
        </form>
      </Modal.Body>

      {/* ─── FOOTER ─── */}
      <Modal.Footer className="justify-between">
        {/* Required note — LEFT */}
        <p className="text-xs text-slate-500">
          <span className="text-red-500">*</span> Required fields
        </p>

        {/* Buttons — RIGHT */}
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={isEditMode ? Save : Plus}
            loading={submitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isEditMode ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
