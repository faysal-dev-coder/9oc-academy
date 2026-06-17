"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FileText, Settings, Link as LinkIcon, Palette, RefreshCw } from "lucide-react";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// ════════════════════════════════════════════════════════════
// ZOD SCHEMA — Validation Rules
// ════════════════════════════════════════════════════════════
const examSchema = z.object({
  // ── Basic ──
  title: z.string().min(3, "কমপক্ষে ৩ অক্ষর হতে হবে").max(200, "সর্বোচ্চ ২০০ অক্ষর"),
  slug: z
    .string()
    .min(3, "Slug কমপক্ষে ৩ অক্ষর")
    .max(200, "সর্বোচ্চ ২০০ অক্ষর")
    .regex(/^[a-z0-9\u0980-\u09FF-]+$/, "শুধু lowercase, সংখ্যা এবং hyphen"),
  description: z.string().max(1000, "সর্বোচ্চ ১০০০ অক্ষর").optional().or(z.literal("")),
  thumbnail_url: z.string().url("সঠিক URL দিন").optional().or(z.literal("")),
  instructions: z.string().max(2000, "সর্বোচ্চ ২০০০ অক্ষর").optional().or(z.literal("")),

  // ── Settings ──
  duration_minutes: z.coerce.number().int().min(1, "কমপক্ষে ১ মিনিট"),
  total_questions: z.coerce.number().int().min(0),
  total_marks: z.coerce.number().int().min(0),
  passing_marks: z.coerce.number().int().min(0),
  has_negative_marking: z.boolean(),
  negative_marking: z.coerce.number().min(0).max(10),
  is_randomized: z.boolean(),
  max_attempts: z
    .union([z.coerce.number().int().min(1), z.literal("").transform(() => null), z.null()])
    .optional(),

  // ── Linking ──
  category_id: z.coerce
    .number({ invalid_type_error: "ক্যাটাগরি নির্বাচন করুন" })
    .int()
    .min(1, "ক্যাটাগরি নির্বাচন করুন"),
  course_id: z
    .union([z.coerce.number().int().min(1), z.literal("").transform(() => null), z.null()])
    .optional(),
  exam_type: z.enum(["free", "premium"]),

  // ── Display ──
  status: z.enum(["draft", "active", "archived"]),
  display_order: z.coerce.number().int().min(0),
  is_featured: z.boolean(),
  is_popular: z.boolean(),
});

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════
const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9\u0980-\u09FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const TABS = [
  { id: "basic", label: "Basic", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "linking", label: "Linking", icon: LinkIcon },
  { id: "display", label: "Display", icon: Palette },
];

// Brand-styled select
const selectClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 outline-none transition-colors duration-150 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-no-repeat";

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
  backgroundSize: "1.25rem",
  backgroundPosition: "right 0.5rem center",
};

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
const helperClass = "mt-1 text-xs text-slate-500";
const errorClass = "mt-1 text-xs text-red-600";

// ════════════════════════════════════════════════════════════
// COMPONENT
// ════════════════════════════════════════════════════════════
export default function ExamModal({
  isOpen,
  onClose,
  exam,
  categories,
  courses,
  onAddSuccess,
  onEditSuccess,
}) {
  const isEditing = !!exam;
  const [activeTab, setActiveTab] = useState("basic");
  const [submitting, setSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: exam?.title || "",
      slug: exam?.slug || "",
      description: exam?.description || "",
      thumbnail_url: exam?.thumbnail_url || "",
      instructions: exam?.instructions || "",
      duration_minutes: exam?.duration_minutes || 60,
      total_questions: exam?.total_questions || 0,
      total_marks: exam?.total_marks || 0,
      passing_marks: exam?.passing_marks || 0,
      has_negative_marking: exam?.has_negative_marking || false,
      negative_marking: exam?.negative_marking || 0.25,
      is_randomized: exam?.is_randomized || false,
      max_attempts: exam?.max_attempts || "",
      category_id: exam?.category_id || "",
      course_id: exam?.course_id || "",
      exam_type: exam?.exam_type || "free",
      status: exam?.status || "draft",
      display_order: exam?.display_order || 0,
      is_featured: exam?.is_featured || false,
      is_popular: exam?.is_popular || false,
    },
  });

  // Watched fields (Compiler-friendly!)
  const watchedTitle = useWatch({ control, name: "title" });
  const watchedNegative = useWatch({ control, name: "has_negative_marking" });

  // Auto-slug effect (this is a side-effect synced to external state — OK!)
  useEffect(() => {
    if (autoSlug && watchedTitle) {
      setValue("slug", generateSlug(watchedTitle));
    }
  }, [watchedTitle, autoSlug, setValue]);

  // ── SUBMIT ──
  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      // Normalize empty strings to null for optional fields
      const payload = {
        ...data,
        course_id: data.course_id === "" || data.course_id === undefined ? null : data.course_id,
        max_attempts:
          data.max_attempts === "" || data.max_attempts === undefined ? null : data.max_attempts,
        thumbnail_url: data.thumbnail_url || null,
        description: data.description || null,
        instructions: data.instructions || null,
      };

      const url = isEditing ? `/api/admin/exams/${exam.id}` : "/api/admin/exams";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "সমস্যা হয়েছে!");
        setSubmitting(false);
        return;
      }

      toast.success(result.message || (isEditing ? "Updated!" : "Created!"));

      if (isEditing) {
        onEditSuccess?.(result.exam);
      } else {
        onAddSuccess?.(result.exam);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("সার্ভার ত্রুটি!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" closeOnBackdrop={!submitting}>
      <Modal.Header
        title={isEditing ? "Edit Exam" : "Create New Exam"}
        subtitle={isEditing ? "পরীক্ষার তথ্য আপডেট করুন" : "পরীক্ষার বিস্তারিত তথ্য পূরণ করুন"}
        onClose={onClose}
      />

      {/* TABS */}
      <div className="flex border-b border-slate-200 bg-white">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                "flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-3",
                "text-xs font-medium transition-colors duration-150 md:gap-2 md:text-sm",
                isActive
                  ? "border-brand-600 text-brand-700"
                  : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {/* ════════ TAB 1: BASIC ════════ */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <Input
                label="Title"
                required
                placeholder="যেমন: BCS প্রিলিমিনারি মক টেস্ট - ১"
                error={errors.title?.message}
                {...register("title")}
              />

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoSlug(true);
                      setValue("slug", generateSlug(watchedTitle));
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 transition hover:text-brand-700"
                  >
                    <RefreshCw size={12} />
                    Auto Generate
                  </button>
                </div>
                <Input
                  placeholder="bcs-preliminary-mock-test-1"
                  helper="URL এ ব্যবহার হবে — unique হতে হবে"
                  error={errors.slug?.message}
                  {...register("slug", {
                    onChange: () => setAutoSlug(false),
                  })}
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={3}
                  placeholder="পরীক্ষা সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors duration-150 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  {...register("description")}
                />
                {errors.description && <p className={errorClass}>{errors.description.message}</p>}
              </div>

              <Input
                label="Thumbnail URL"
                type="url"
                placeholder="https://example.com/image.jpg"
                helper="Optional — পরীক্ষা card এ দেখাবে"
                error={errors.thumbnail_url?.message}
                {...register("thumbnail_url")}
              />

              <div>
                <label className={labelClass}>Instructions</label>
                <textarea
                  rows={4}
                  placeholder="পরীক্ষা শুরুর আগে নিয়মাবলী দেখাবে..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors duration-150 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  {...register("instructions")}
                />
                {errors.instructions && <p className={errorClass}>{errors.instructions.message}</p>}
              </div>
            </div>
          )}

          {/* ════════ TAB 2: SETTINGS ════════ */}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input
                  label="Duration (minutes)"
                  required
                  type="number"
                  min="1"
                  error={errors.duration_minutes?.message}
                  {...register("duration_minutes")}
                />
                <Input
                  label="Total Questions"
                  type="number"
                  min="0"
                  helper="Manual input — পরে calculate হবে"
                  error={errors.total_questions?.message}
                  {...register("total_questions")}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input
                  label="Total Marks"
                  type="number"
                  min="0"
                  error={errors.total_marks?.message}
                  {...register("total_marks")}
                />
                <Input
                  label="Passing Marks"
                  type="number"
                  min="0"
                  error={errors.passing_marks?.message}
                  {...register("passing_marks")}
                />
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("has_negative_marking")}
                    className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Enable Negative Marking
                  </span>
                </label>

                {watchedNegative && (
                  <div className="mt-3">
                    <Input
                      label="Marks Deducted per Wrong Answer"
                      type="number"
                      step="0.25"
                      min="0"
                      helper="যেমন: 0.25 = প্রতি ভুল উত্তরে ০.২৫ নম্বর কাটা যাবে"
                      error={errors.negative_marking?.message}
                      {...register("negative_marking")}
                    />
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("is_randomized")}
                    className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Randomize Questions</span>
                </label>
                <p className="mt-1 ml-6 text-xs text-slate-500">
                  প্রতিবার পরীক্ষার্থী আলাদা ক্রমে প্রশ্ন পাবে
                </p>
              </div>

              <Input
                label="Max Attempts"
                type="number"
                min="1"
                placeholder="খালি রাখলে unlimited"
                helper="Optional — একজন user কতবার পরীক্ষা দিতে পারবে"
                error={errors.max_attempts?.message}
                {...register("max_attempts")}
              />
            </div>
          )}

          {/* ════════ TAB 3: LINKING ════════ */}
          {activeTab === "linking" && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>
                  Category <span className="text-red-500">*</span>
                </label>
                <select {...register("category_id")} className={selectClass} style={selectStyle}>
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className={errorClass}>{errors.category_id.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Course (Optional)</label>
                <select {...register("course_id")} className={selectClass} style={selectStyle}>
                  <option value="">None (Standalone Exam)</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <p className={helperClass}>
                  কোনো course select করলে — সেই course এর সাথে যুক্ত হবে
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Exam Type <span className="text-red-500">*</span>
                </label>
                <select {...register("exam_type")} className={selectClass} style={selectStyle}>
                  <option value="free">🎁 Free (Open to All)</option>
                  <option value="premium">⭐ Premium (Paid)</option>
                </select>
              </div>
            </div>
          )}

          {/* ════════ TAB 4: DISPLAY ════════ */}
          {activeTab === "display" && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>
                  Status <span className="text-red-500">*</span>
                </label>
                <select {...register("status")} className={selectClass} style={selectStyle}>
                  <option value="draft">📝 Draft</option>
                  <option value="active">✅ Active</option>
                  <option value="archived">📦 Archived</option>
                </select>
                <p className={helperClass}>শুধু Active পরীক্ষা ছাত্ররা দেখতে পাবে</p>
              </div>

              <Input
                label="Display Order"
                type="number"
                min="0"
                helper="কম সংখ্যা আগে দেখাবে (0 = প্রথম)"
                error={errors.display_order?.message}
                {...register("display_order")}
              />

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("is_featured")}
                    className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    ⭐ Featured (Show on Homepage)
                  </span>
                </label>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("is_popular")}
                    className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    🔥 Popular (Show in Trending)
                  </span>
                </label>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <div className="flex w-full items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              <span className="text-red-500">*</span> Required fields
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={submitting}>
                {isEditing ? "Update Exam" : "Create Exam"}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
