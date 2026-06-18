"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import {
  BookOpen,
  DollarSign,
  ImageIcon,
  Settings,
  Upload,
  Trash2,
  Star,
  CheckCircle2,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

// ════════════════════════════════════════════════════════════
// Zod Schema (matches DB exactly!)
// ════════════════════════════════════════════════════════════
const courseSchema = z.object({
  title: z.string().trim().min(1, "টাইটেল আবশ্যক").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug আবশ্যক")
    .regex(/^[a-z0-9-]+$/, "শুধু lowercase letter, number, hyphen"),
  short_description: z.string().max(300).optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  category_id: z.string().min(1, "Category সিলেক্ট করুন"),
  thumbnail_url: z.string().optional().or(z.literal("")),
  is_free: z.boolean().optional(),
  price: z.coerce.number().min(0).optional(),
  discount_price: z.coerce.number().min(0).optional(),
  validity_days: z.coerce.number().min(1).optional(),
  expiry_date: z.string().optional().or(z.literal("")),
  global_order: z.coerce.number().min(0).optional(),
  category_order: z.coerce.number().min(0).optional(),
  is_featured: z.boolean().optional(),
  status: z.enum(["active", "draft", "archived"]),
  instructor_name: z.string().optional().or(z.literal("")),
  instructor_image: z.string().optional().or(z.literal("")),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  total_lessons: z.coerce.number().min(0).optional(),
  duration_minutes: z.coerce.number().min(0).optional(),
});

// ════════════════════════════════════════════════════════════
// Slug Generator
// ════════════════════════════════════════════════════════════
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 60);
};

// ════════════════════════════════════════════════════════════
// Tab Configuration
// ════════════════════════════════════════════════════════════
const TABS = [
  { id: "basic", label: "Basic", icon: BookOpen },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "display", label: "Display", icon: ImageIcon },
  { id: "status", label: "Status", icon: Settings },
];

// ════════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════════
export default function CourseModal({ isOpen, onClose, editingCourse, categories, onSuccess }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const isEdit = !!editingCourse;
  const supabase = createClient();

  // ──────────────────────────────────────────────────────────
  // Default values
  // ──────────────────────────────────────────────────────────
  const defaultValues = isEdit
    ? {
        title: editingCourse.title || "",
        slug: editingCourse.slug || "",
        short_description: editingCourse.short_description || "",
        description: editingCourse.description || "",
        category_id: String(editingCourse.category_id || ""),
        thumbnail_url: editingCourse.thumbnail_url || "",
        is_free: editingCourse.is_free || false,
        price: editingCourse.price || 0,
        discount_price: editingCourse.discount_price || 0,
        validity_days: editingCourse.validity_days || 365,
        expiry_date: editingCourse.expiry_date
          ? new Date(editingCourse.expiry_date).toISOString().slice(0, 16)
          : "",
        global_order: editingCourse.global_order || 0,
        category_order: editingCourse.category_order || 0,
        is_featured: editingCourse.is_featured || false,
        status: editingCourse.status || "draft",
        instructor_name: editingCourse.instructor_name || "",
        instructor_image: editingCourse.instructor_image || "",
        level: editingCourse.level || "beginner",
        total_lessons: editingCourse.total_lessons || 0,
        duration_minutes: editingCourse.duration_minutes || 0,
      }
    : {
        title: "",
        slug: "",
        short_description: "",
        description: "",
        category_id: "",
        thumbnail_url: "",
        is_free: false,
        price: 0,
        discount_price: 0,
        validity_days: 365,
        expiry_date: "",
        global_order: 0,
        category_order: 0,
        is_featured: false,
        status: "draft",
        instructor_name: "",
        instructor_image: "",
        level: "beginner",
        total_lessons: 0,
        duration_minutes: 0,
      };

  // ──────────────────────────────────────────────────────────
  // Form setup
  // ──────────────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues,
  });

  // ✅ useWatch (React Compiler safe!)
  const watchTitle = useWatch({ control, name: "title" });
  const watchIsFree = useWatch({ control, name: "is_free" });
  const watchThumbnail = useWatch({ control, name: "thumbnail_url" });
  const watchSlug = useWatch({ control, name: "slug" });

  // ──────────────────────────────────────────────────────────
  // Auto-generate slug (Add mode only)
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isEdit && watchTitle) {
      setValue("slug", generateSlug(watchTitle));
    }
  }, [watchTitle, isEdit, setValue]);

  // ──────────────────────────────────────────────────────────
  // Thumbnail Upload
  // ──────────────────────────────────────────────────────────
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("ফাইল 5MB এর বেশি হতে পারবে না");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("শুধু JPG, PNG, WebP allowed");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `course-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("course-thumbnails")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("course-thumbnails").getPublicUrl(fileName);

      setValue("thumbnail_url", publicUrl);
      toast.success("Thumbnail upload হয়েছে!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload করতে সমস্যা: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // ──────────────────────────────────────────────────────────
  // Submit
  // ──────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    setLoading(true);

    const submitData = {
      ...data,
      expiry_date: data.expiry_date ? new Date(data.expiry_date).toISOString() : null,
    };

    try {
      const url = isEdit ? `/api/admin/courses/${editingCourse.id}` : "/api/admin/courses";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "সমস্যা হয়েছে");
        return;
      }

      toast.success(json.message || "সফল!");
      onSuccess?.(json.course, isEdit);
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("সার্ভার সমস্যা");
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────
  // Common select className
  // ──────────────────────────────────────────────────────────
  const selectClass =
    "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-700 transition-all duration-150 bg-white";

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Header title={isEdit ? "কোর্স এডিট করুন" : "নতুন কোর্স যোগ করুন"} onClose={onClose} />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ════════════════════════════════════════════ */}
        {/* TABS NAVIGATION                              */}
        {/* ════════════════════════════════════════════ */}
        <div className="flex border-b border-slate-200 px-6 overflow-x-auto shrink-0">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "border-brand-800 text-brand-800"
                    : "border-transparent text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <Modal.Body className="space-y-5 max-h-[60vh]">
          {/* ════════════════════════════════════════════ */}
          {/* TAB 1: BASIC INFO                            */}
          {/* ════════════════════════════════════════════ */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <Input
                label="Title"
                required
                placeholder="যেমন: বিসিএস প্রিলিমিনারি ফুল কোর্স"
                {...register("title")}
                error={errors.title?.message}
              />

              <Input
                label="Slug"
                required
                placeholder="bcs-prelim-full"
                helper="URL এ দেখাবে। শুধু lowercase letter, number, hyphen"
                {...register("slug")}
                error={errors.slug?.message}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select {...register("category_id")} className={selectClass}>
                  <option value="">-- ক্যাটাগরি সিলেক্ট করুন --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.category_id.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Short Description
                </label>
                <textarea
                  {...register("short_description")}
                  rows={2}
                  placeholder="সংক্ষিপ্ত পরিচয় (Card এ দেখাবে)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-700 transition-all duration-150 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full Description
                </label>
                <textarea
                  {...register("description")}
                  rows={5}
                  placeholder="কোর্সের বিস্তারিত বিবরণ (Detail page এ দেখাবে)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-700 transition-all duration-150 resize-none"
                />
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════ */}
          {/* TAB 2: PRICING                               */}
          {/* ════════════════════════════════════════════ */}
          {activeTab === "pricing" && (
            <div className="space-y-4">
              {/* Free Toggle */}
              <label className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Free Course?</p>
                    <p className="text-xs text-slate-600">ON করলে price 0 হয়ে যাবে</p>
                  </div>
                </div>
                <input type="checkbox" {...register("is_free")} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-emerald-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5"></div>
              </label>

              {!watchIsFree && (
                <>
                  <Input
                    type="number"
                    label="Original Price (৳)"
                    placeholder="999"
                    {...register("price")}
                    error={errors.price?.message}
                  />

                  <Input
                    type="number"
                    label="Discount Price (৳)"
                    placeholder="499"
                    helper="Discount দিলে original price strikethrough দেখাবে"
                    {...register("discount_price")}
                    error={errors.discount_price?.message}
                  />
                </>
              )}

              <Input
                type="number"
                label="Validity Days"
                placeholder="365"
                helper="Enrollment কত দিন valid থাকবে (Default: 365)"
                {...register("validity_days")}
                error={errors.validity_days?.message}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Expiry Date
                </label>
                <input
                  type="datetime-local"
                  {...register("expiry_date")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-700 transition-all duration-150"
                />
                <p className="text-xs text-slate-500 mt-1.5">
                  💡 Date set না করলে কোর্স unlimited থাকবে
                </p>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════ */}
          {/* TAB 3: DISPLAY                               */}
          {/* ════════════════════════════════════════════ */}
          {activeTab === "display" && (
            <div className="space-y-4">
              {/* Thumbnail Preview */}
              {watchThumbnail && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={watchThumbnail}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <button
                    type="button"
                    onClick={() => setValue("thumbnail_url", "")}
                    className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              <Input
                label="Thumbnail URL"
                placeholder="https://... অথবা নিচে থেকে upload"
                {...register("thumbnail_url")}
                error={errors.thumbnail_url?.message}
              />

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-xs text-slate-400 font-medium">অথবা</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Upload Image
                  <span className="text-xs text-slate-500 ml-2">(JPG, PNG, WebP, max 5MB)</span>
                </label>
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-brand-700 hover:bg-brand-50 transition-colors">
                  <Upload size={18} className="text-slate-500" />
                  <span className="text-sm text-slate-600">
                    {uploading ? "Uploading..." : "ফাইল সিলেক্ট করুন"}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  label="Global Order"
                  placeholder="0"
                  {...register("global_order")}
                />
                <Input
                  type="number"
                  label="Category Order"
                  placeholder="0"
                  {...register("category_order")}
                />
              </div>

              {/* Featured Toggle */}
              <label className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Featured Course</p>
                    <p className="text-xs text-slate-600">Home page এ feature section এ দেখাবে</p>
                  </div>
                </div>
                <input type="checkbox" {...register("is_featured")} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-amber-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5"></div>
              </label>
            </div>
          )}

          {/* ════════════════════════════════════════════ */}
          {/* TAB 4: STATUS & META                         */}
          {/* ════════════════════════════════════════════ */}
          {activeTab === "status" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>
                <select {...register("status")} className={selectClass}>
                  <option value="draft">📝 Draft (লুকানো)</option>
                  <option value="active">✅ Active (দৃশ্যমান)</option>
                  <option value="archived">📦 Archived (সংরক্ষিত)</option>
                </select>
                <p className="text-xs text-slate-500 mt-1.5">
                  Active না হলে public site এ দেখাবে না
                </p>
              </div>

              <Input
                label="Instructor Name"
                placeholder="যেমন: জাহিদুল ইসলাম"
                {...register("instructor_name")}
              />

              <Input
                label="Instructor Image URL"
                placeholder="https://..."
                {...register("instructor_image")}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Difficulty Level
                </label>
                <select {...register("level")} className={selectClass}>
                  <option value="beginner">🌱 Beginner</option>
                  <option value="intermediate">🌿 Intermediate</option>
                  <option value="advanced">🌳 Advanced</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  label="Total Lessons"
                  placeholder="50"
                  {...register("total_lessons")}
                />
                <Input
                  type="number"
                  label="Duration (minutes)"
                  placeholder="3000"
                  {...register("duration_minutes")}
                />
              </div>

              {/* URL Preview */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">URL Preview:</p>
                <p className="text-sm font-mono text-slate-700 break-all">
                  /courses/{watchSlug || "your-slug"}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            বাতিল
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {isEdit ? "আপডেট করুন" : "তৈরি করুন"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
