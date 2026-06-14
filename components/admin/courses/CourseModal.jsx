"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import {
  HiXMark,
  HiBookOpen,
  HiCurrencyBangladeshi,
  HiPhoto,
  HiCog6Tooth,
  HiArrowUpTray,
  HiTrash,
  HiStar,
  HiFire,
  HiCheckCircle,
} from "react-icons/hi2";

// ═══════════════════════════════════════════════════════════
// Custom Select Class (Reusable - Fix dropdown arrow!)
// ═══════════════════════════════════════════════════════════
const selectClass =
  "w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center]";

// ═══════════════════════════════════════════════════════════
// Zod Validation Schema
// ═══════════════════════════════════════════════════════════
const courseSchema = z.object({
  title: z.string().min(1, "Title আবশ্যক").max(200),
  slug: z
    .string()
    .min(1, "Slug আবশ্যক")
    .regex(/^[a-z0-9-]+$/, "শুধু lowercase letter, number, hyphen"),
  short_description: z.string().max(300).optional(),
  description: z.string().optional(),
  category_id: z.string().min(1, "Category সিলেক্ট করুন"),
  thumbnail_url: z.string().optional(),
  is_free: z.boolean().optional(),
  price: z.coerce.number().min(0).optional(),
  discount_price: z.coerce.number().min(0).optional(),
  validity_days: z.coerce.number().min(1).optional(),
  expiry_date: z.string().optional().nullable(),
  global_order: z.coerce.number().min(0).optional(),
  category_order: z.coerce.number().min(0).optional(),
  is_featured: z.boolean().optional(),
  is_popular: z.boolean().optional(),
  status: z.enum(["active", "draft", "archived"]).optional(),
  instructor_name: z.string().optional(),
  difficulty_level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  total_lessons: z.coerce.number().min(0).optional(),
  total_duration: z.coerce.number().min(0).optional(),
});

// ═══════════════════════════════════════════════════════════
// Auto Slug Generator (Bengali → English)
// ═══════════════════════════════════════════════════════════
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 60);
};

// ═══════════════════════════════════════════════════════════
// Tab Configuration
// ═══════════════════════════════════════════════════════════
const TABS = [
  { id: "basic", label: "Basic", icon: HiBookOpen },
  { id: "pricing", label: "Pricing", icon: HiCurrencyBangladeshi },
  { id: "display", label: "Display", icon: HiPhoto },
  { id: "status", label: "Status", icon: HiCog6Tooth },
];

export default function CourseModal({ course, categories, onClose, onAddSuccess, onEditSuccess }) {
  const isEditMode = !!course;
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  // ═══════════════════════════════════════════════
  // React Hook Form Setup
  // ═══════════════════════════════════════════════
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title || "",
      slug: course?.slug || "",
      short_description: course?.short_description || "",
      description: course?.description || "",
      category_id: course?.category_id || "",
      thumbnail_url: course?.thumbnail_url || "",
      is_free: course?.is_free || false,
      price: course?.price || 0,
      discount_price: course?.discount_price || 0,
      validity_days: course?.validity_days || 365,
      expiry_date: course?.expiry_date
        ? new Date(course.expiry_date).toISOString().slice(0, 16)
        : "",
      global_order: course?.global_order || 0,
      category_order: course?.category_order || 0,
      is_featured: course?.is_featured || false,
      is_popular: course?.is_popular || false,
      status: course?.status || "draft",
      instructor_name: course?.instructor_name || "",
      difficulty_level: course?.difficulty_level || "beginner",
      total_lessons: course?.total_lessons || 0,
      total_duration: course?.total_duration || 0,
    },
  });

  // ═══════════════════════════════════════════════
  // Watch fields (Compiler safe!)
  // ═══════════════════════════════════════════════
  const watchTitle = useWatch({ control, name: "title" });
  const watchIsFree = useWatch({ control, name: "is_free" });
  const watchThumbnail = useWatch({ control, name: "thumbnail_url" });
  const watchSlug = useWatch({ control, name: "slug" });

  // ═══════════════════════════════════════════════
  // Auto-generate slug from title (Add mode only)
  // ═══════════════════════════════════════════════
  useEffect(() => {
    if (!isEditMode && watchTitle) {
      setValue("slug", generateSlug(watchTitle));
    }
  }, [watchTitle, isEditMode, setValue]);

  // ═══════════════════════════════════════════════
  // ESC key to close
  // ═══════════════════════════════════════════════
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ═══════════════════════════════════════════════
  // Thumbnail Upload Handler
  // ═══════════════════════════════════════════════
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
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
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `course-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("course-thumbnails")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
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

  // ═══════════════════════════════════════════════
  // Remove Thumbnail
  // ═══════════════════════════════════════════════
  const handleRemoveThumbnail = () => {
    setValue("thumbnail_url", "");
  };

  // ═══════════════════════════════════════════════
  // Form Submit Handler
  // ═══════════════════════════════════════════════
  const onSubmit = async (data) => {
    setLoading(true);

    // Convert empty expiry_date to null
    const submitData = {
      ...data,
      expiry_date: data.expiry_date ? new Date(data.expiry_date).toISOString() : null,
    };

    try {
      const url = isEditMode ? `/api/admin/courses/${course.id}` : "/api/admin/courses";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "সমস্যা হয়েছে");
        setLoading(false);
        return;
      }

      toast.success(result.message || "সফল!");

      // Instant UI update via callback
      if (isEditMode) {
        onEditSuccess(result.course);
      } else {
        onAddSuccess(result.course);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("সার্ভার সমস্যা");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ═══════════════════════════════════════════ */}
        {/* Header */}
        {/* ═══════════════════════════════════════════ */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {isEditMode ? "✏️ Edit Course" : "➕ Add New Course"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditMode ? `Editing: ${course?.title}` : "নতুন কোর্স তৈরি করুন"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <HiXMark className="w-6 h-6" />
          </button>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Tabs Navigation */}
        {/* ═══════════════════════════════════════════ */}
        <div className="flex border-b border-slate-200 shrink-0 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-sky-500 text-sky-600 bg-sky-50"
                    : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Form Body (Scrollable) */}
        {/* ═══════════════════════════════════════════ */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto">
          <div className="p-5">
            {/* ═════════════════════════════════════ */}
            {/* TAB 1: BASIC INFO */}
            {/* ═════════════════════════════════════ */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="যেমন: বিসিএস প্রিলিমিনারি ফুল কোর্স"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Slug <span className="text-red-500">*</span>
                    <span className="text-xs text-slate-400 ml-2">(URL এ দেখাবে)</span>
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-sm text-slate-500">
                      /courses/
                    </span>
                    <input
                      type="text"
                      {...register("slug")}
                      placeholder="bcs-prelim-full"
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  {errors.slug && (
                    <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>
                  )}
                </div>

                {/* Category */}
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
                    <p className="text-xs text-red-500 mt-1">{errors.category_id.message}</p>
                  )}
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Short Description
                    <span className="text-xs text-slate-400 ml-2">(1-2 lines, card এ দেখাবে)</span>
                  </label>
                  <textarea
                    {...register("short_description")}
                    rows={2}
                    placeholder="সংক্ষিপ্ত পরিচয়..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-none"
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full Description
                    <span className="text-xs text-slate-400 ml-2">(Detail page এ দেখাবে)</span>
                  </label>
                  <textarea
                    {...register("description")}
                    rows={5}
                    placeholder="কোর্সের বিস্তারিত বিবরণ..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* ═════════════════════════════════════ */}
            {/* TAB 2: PRICING */}
            {/* ═════════════════════════════════════ */}
            {activeTab === "pricing" && (
              <div className="space-y-4">
                {/* Free Toggle */}
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <HiCheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Free Course?</p>
                      <p className="text-xs text-slate-500">ON করলে price 0 হয়ে যাবে</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register("is_free")} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                {/* Price Fields (only if not free) */}
                {!watchIsFree && (
                  <>
                    {/* Original Price */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Original Price (৳)
                      </label>
                      <input
                        type="number"
                        {...register("price")}
                        placeholder="999"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>

                    {/* Discount Price */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Discount Price (৳)
                        <span className="text-xs text-slate-400 ml-2">(Optional)</span>
                      </label>
                      <input
                        type="number"
                        {...register("discount_price")}
                        placeholder="499"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Discount দিলে original price strikethrough দেখাবে
                      </p>
                    </div>
                  </>
                )}

                {/* Validity Days */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Validity Days
                    <span className="text-xs text-slate-400 ml-2">(Enrollment কত দিন থাকবে)</span>
                  </label>
                  <input
                    type="number"
                    {...register("validity_days")}
                    placeholder="365"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Default: 365 দিন (1 বছর)</p>
                </div>

                {/* Expiry Date (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Expiry Date
                    <span className="text-xs text-slate-400 ml-2">
                      (Optional - কোর্স কবে expire হবে)
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    {...register("expiry_date")}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    💡 Date set না করলে কোর্স unlimited থাকবে
                  </p>
                </div>
              </div>
            )}

            {/* ═════════════════════════════════════ */}
            {/* TAB 3: DISPLAY */}
            {/* ═════════════════════════════════════ */}
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
                      onClick={handleRemoveThumbnail}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Thumbnail URL Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Thumbnail URL
                  </label>
                  <input
                    type="text"
                    {...register("thumbnail_url")}
                    placeholder="https://... অথবা নিচে থেকে upload করুন"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                {/* OR Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-xs text-slate-400 font-medium">অথবা</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Upload Image
                    <span className="text-xs text-slate-400 ml-2">(JPG, PNG, WebP, max 5MB)</span>
                  </label>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-colors">
                    <HiArrowUpTray className="w-5 h-5 text-slate-500" />
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

                {/* Order Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Global Order
                    </label>
                    <input
                      type="number"
                      {...register("global_order")}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Category Order
                    </label>
                    <input
                      type="number"
                      {...register("category_order")}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <HiStar className="w-6 h-6 text-amber-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Featured Course</p>
                      <p className="text-xs text-slate-500">Home page এ feature section এ দেখাবে</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register("is_featured")} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* Popular Toggle */}
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <HiFire className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Popular Course</p>
                      <p className="text-xs text-slate-500">Popular badge দেখাবে</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register("is_popular")} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
            )}

            {/* ═════════════════════════════════════ */}
            {/* TAB 4: STATUS & META */}
            {/* ═════════════════════════════════════ */}
            {activeTab === "status" && (
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select {...register("status")} className={selectClass}>
                    <option value="draft">📝 Draft (লুকানো)</option>
                    <option value="active">✅ Active (দৃশ্যমান)</option>
                    <option value="archived">📦 Archived (সংরক্ষিত)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">
                    Active না হলে public site এ দেখাবে না
                  </p>
                </div>

                {/* Instructor Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Instructor Name
                  </label>
                  <input
                    type="text"
                    {...register("instructor_name")}
                    placeholder="যেমন: জাহিদুল ইসলাম"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Difficulty Level
                  </label>
                  <select {...register("difficulty_level")} className={selectClass}>
                    <option value="beginner">🌱 Beginner</option>
                    <option value="intermediate">🌿 Intermediate</option>
                    <option value="advanced">🌳 Advanced</option>
                  </select>
                </div>

                {/* Lessons + Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Total Lessons
                    </label>
                    <input
                      type="number"
                      {...register("total_lessons")}
                      placeholder="50"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      {...register("total_duration")}
                      placeholder="3000"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Slug Preview */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">URL Preview:</p>
                  <p className="text-sm font-mono text-slate-700 break-all">
                    /courses/{watchSlug || "your-slug"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* Footer Buttons */}
          {/* ═══════════════════════════════════════════ */}
          <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              )}
              {loading ? "সেভ হচ্ছে..." : isEditMode ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
