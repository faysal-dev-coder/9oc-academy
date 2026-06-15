"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
  HiOutlineXMark,
  HiOutlineDocumentText,
  HiOutlineCog6Tooth,
  HiOutlineLink,
  HiOutlinePaintBrush,
  HiOutlineArrowPath,
} from "react-icons/hi2";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

const errorClass = "mt-1 text-xs text-red-600";

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-no-repeat bg-right";

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
  backgroundSize: "1.25rem",
  backgroundPosition: "right 0.5rem center",
};

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
  { id: "basic", label: "Basic", icon: HiOutlineDocumentText },
  { id: "settings", label: "Settings", icon: HiOutlineCog6Tooth },
  { id: "linking", label: "Linking", icon: HiOutlineLink },
  { id: "display", label: "Display", icon: HiOutlinePaintBrush },
];

export default function ExamModal({
  exam,
  categories,
  courses,
  onClose,
  onAddSuccess,
  onEditSuccess,
}) {
  const isEditing = !!exam;
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
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
      is_featured: exam?.is_featured || false,
      is_popular: exam?.is_popular || false,
      display_order: exam?.display_order || 0,
    },
  });

  const watchedTitle = useWatch({ control, name: "title" });
  const watchedNegative = useWatch({ control, name: "has_negative_marking" });

  useEffect(() => {
    if (autoSlug && watchedTitle) {
      setValue("slug", generateSlug(watchedTitle));
    }
  }, [watchedTitle, autoSlug, setValue]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const url = isEditing ? `/api/admin/exams/${exam.id}` : "/api/admin/exams";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "সমস্যা হয়েছে!");
        setIsSubmitting(false);
        return;
      }

      toast.success(result.message || "সফল!");

      if (isEditing) {
        onEditSuccess(result.exam);
      } else {
        onAddSuccess(result.exam);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("সার্ভার ত্রুটি!");
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? "Edit Exam" : "Create New Exam"}
            </h2>
            <p className="text-xs text-slate-600">
              {isEditing ? "পরীক্ষার তথ্য আপডেট করুন" : "পরীক্ষার বিস্তারিত তথ্য পূরণ করুন"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          >
            <HiOutlineXMark className="size-5" />
          </button>
        </div>

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
                className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-3 text-xs font-medium transition md:gap-2 md:text-sm ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5">
            {/* TAB 1: BASIC */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("title", {
                      required: "নাম আবশ্যক!",
                      minLength: {
                        value: 3,
                        message: "কমপক্ষে ৩ অক্ষর হতে হবে",
                      },
                    })}
                    placeholder="যেমন: BCS প্রিলিমিনারি মক টেস্ট - ১"
                    className={inputClass}
                  />
                  {errors.title && <p className={errorClass}>{errors.title.message}</p>}
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className={labelClass + " mb-0"}>
                      Slug <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAutoSlug(true);
                        setValue("slug", generateSlug(watchedTitle));
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      <HiOutlineArrowPath className="size-3" />
                      Auto Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    {...register("slug", {
                      required: "Slug আবশ্যক!",
                      minLength: { value: 3, message: "কমপক্ষে ৩ অক্ষর" },
                    })}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setValue("slug", e.target.value);
                    }}
                    placeholder="bcs-preliminary-mock-test-1"
                    className={inputClass}
                  />
                  {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
                  <p className="mt-1 text-xs text-slate-500">URL এ ব্যবহার হবে — unique হতে হবে</p>
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="পরীক্ষা সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Thumbnail URL</label>
                  <input
                    type="url"
                    {...register("thumbnail_url")}
                    placeholder="https://example.com/image.jpg"
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-slate-500">Optional — পরীক্ষা card এ দেখাবে</p>
                </div>

                <div>
                  <label className={labelClass}>Instructions</label>
                  <textarea
                    {...register("instructions")}
                    rows={4}
                    placeholder="পরীক্ষা শুরুর আগে নিয়মাবলী দেখাবে..."
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: SETTINGS */}
            {activeTab === "settings" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      Duration (minutes) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      {...register("duration_minutes", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Total Questions</label>
                    <input
                      type="number"
                      min="0"
                      {...register("total_questions", {
                        valueAsNumber: true,
                      })}
                      className={inputClass}
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Manual input — পরে প্রশ্ন থেকে calculate হবে
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Total Marks</label>
                    <input
                      type="number"
                      min="0"
                      {...register("total_marks", { valueAsNumber: true })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Passing Marks</label>
                    <input
                      type="number"
                      min="0"
                      {...register("passing_marks", { valueAsNumber: true })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("has_negative_marking")}
                      className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Enable Negative Marking
                    </span>
                  </label>

                  {watchedNegative && (
                    <div className="mt-3">
                      <label className={labelClass}>Marks Deducted per Wrong Answer</label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        {...register("negative_marking", {
                          valueAsNumber: true,
                        })}
                        className={inputClass}
                      />
                      <p className="mt-1 text-xs text-slate-500">
                        যেমন: 0.25 = প্রতি ভুল উত্তরে ০.২৫ নম্বর কাটা যাবে
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("is_randomized")}
                      className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Randomize Questions</span>
                  </label>
                  <p className="mt-1 ml-6 text-xs text-slate-500">
                    প্রতিবার পরীক্ষার্থী আলাদা ক্রমে প্রশ্ন পাবে
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Max Attempts</label>
                  <input
                    type="number"
                    min="1"
                    {...register("max_attempts")}
                    placeholder="খালি রাখলে unlimited"
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Optional — একজন user কতবার পরীক্ষা দিতে পারবে
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: LINKING */}
            {activeTab === "linking" && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("category_id", {
                      required: "ক্যাটাগরি নির্বাচন করুন!",
                    })}
                    className={selectClass}
                    style={selectStyle}
                  >
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
                  <p className="mt-1 text-xs text-slate-500">
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

            {/* TAB 4: DISPLAY */}
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
                  <p className="mt-1 text-xs text-slate-500">
                    শুধু Active পরীক্ষা ছাত্ররা দেখতে পাবে
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Display Order</label>
                  <input
                    type="number"
                    min="0"
                    {...register("display_order", { valueAsNumber: true })}
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-slate-500">কম সংখ্যা আগে দেখাবে (0 = প্রথম)</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("is_featured")}
                      className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
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
                      className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      🔥 Popular (Show in Trending)
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-3">
            <p className="text-xs text-slate-500">
              <span className="text-red-500">*</span> Required fields
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting && (
                  <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
                )}
                {isSubmitting ? "Saving..." : isEditing ? "Update Exam" : "Create Exam"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
