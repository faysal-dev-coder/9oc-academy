"use client";

import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// ════════════════════════════════════════════════════════════
// Zod Schema
// ════════════════════════════════════════════════════════════
const optionSchema = z.object({
  option_text: z.string().trim().min(1, "অপশন খালি রাখা যাবে না"),
  is_correct: z.boolean(),
});

const questionSchema = z
  .object({
    exam_id: z.string().min(1, "পরীক্ষা নির্বাচন করুন"),
    question_text: z.string().trim().min(5, "প্রশ্ন কমপক্ষে ৫ অক্ষরের হতে হবে"),
    explanation: z.string().optional(),
    marks: z.coerce.number().min(0.25, "মার্ক্স কমপক্ষে 0.25").max(100),
    difficulty: z.enum(["easy", "medium", "hard"]),
    order_number: z.coerce.number().int().min(0),
    image_url: z.string().optional(),
    options: z.array(optionSchema).min(2, "কমপক্ষে ২টি অপশন দিন").max(6, "সর্বোচ্চ ৬টি অপশন"),
  })
  .refine((data) => data.options.filter((o) => o.is_correct).length === 1, {
    message: "ঠিক ১টি সঠিক উত্তর নির্বাচন করুন",
    path: ["options"],
  });

// ════════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════════
export default function QuestionModal({ isOpen, onClose, editingQuestion, exams, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const isEdit = !!editingQuestion;

  // ──────────────────────────────────────────────────────────
  // Default values
  // ──────────────────────────────────────────────────────────
  const defaultValues = isEdit
    ? {
        exam_id: String(editingQuestion.exam_id || ""),
        question_text: editingQuestion.question_text || "",
        explanation: editingQuestion.explanation || "",
        marks: editingQuestion.marks || 1,
        difficulty: editingQuestion.difficulty || "medium",
        order_number: editingQuestion.order_number || 0,
        image_url: editingQuestion.image_url || "",
        options:
          editingQuestion.options?.length > 0
            ? editingQuestion.options
                .sort((a, b) => a.order_number - b.order_number)
                .map((o) => ({
                  option_text: o.option_text,
                  is_correct: o.is_correct,
                }))
            : [
                { option_text: "", is_correct: true },
                { option_text: "", is_correct: false },
                { option_text: "", is_correct: false },
                { option_text: "", is_correct: false },
              ],
      }
    : {
        exam_id: "",
        question_text: "",
        explanation: "",
        marks: 1,
        difficulty: "medium",
        order_number: 0,
        image_url: "",
        options: [
          { option_text: "", is_correct: true },
          { option_text: "", is_correct: false },
          { option_text: "", is_correct: false },
          { option_text: "", is_correct: false },
        ],
      };

  // ──────────────────────────────────────────────────────────
  // Form setup
  // ──────────────────────────────────────────────────────────
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  // ✅ useWatch — React Compiler safe (not watch()!)
  const watchedOptions = useWatch({ control, name: "options" });

  // ──────────────────────────────────────────────────────────
  // Submit
  // ──────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/questions/${editingQuestion.id}` : "/api/admin/questions";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "সমস্যা হয়েছে!");
        return;
      }

      toast.success(json.message);
      onSuccess?.(json.question);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("সার্ভার ত্রুটি!");
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────
  // Set single correct (radio behavior)
  // ──────────────────────────────────────────────────────────
  const setCorrectOption = (idx) => {
    fields.forEach((_, i) => {
      setValue(`options.${i}.is_correct`, i === idx, { shouldValidate: true });
    });
  };

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Header
        title={isEdit ? "প্রশ্ন এডিট করুন" : "নতুন প্রশ্ন যোগ করুন"}
        onClose={onClose}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Exam Select */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              পরীক্ষা <span className="text-red-500">*</span>
            </label>
            <select
              {...register("exam_id")}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-150"
            >
              <option value="">পরীক্ষা নির্বাচন করুন</option>
              {exams?.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
            {errors.exam_id && (
              <p className="mt-1 text-xs text-red-600">{errors.exam_id.message}</p>
            )}
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              প্রশ্ন <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("question_text")}
              rows={3}
              placeholder="আপনার প্রশ্ন লিখুন..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-150 resize-none"
            />
            {errors.question_text && (
              <p className="mt-1 text-xs text-red-600">{errors.question_text.message}</p>
            )}
          </div>

          {/* Options Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">
                অপশনসমূহ <span className="text-red-500">*</span>
                <span className="ml-2 text-xs text-slate-500">(সঠিক উত্তরে ক্লিক করুন)</span>
              </label>
              {fields.length < 6 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ option_text: "", is_correct: false })}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  অপশন যোগ
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {fields.map((field, idx) => {
                const isCorrect = watchedOptions?.[idx]?.is_correct;
                return (
                  <div
                    key={field.id}
                    className={[
                      "flex items-center gap-2 p-2 rounded-lg border-2 transition-all duration-150",
                      isCorrect ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white",
                    ].join(" ")}
                  >
                    {/* Correct toggle */}
                    <button
                      type="button"
                      onClick={() => setCorrectOption(idx)}
                      className="shrink-0 text-slate-400 hover:text-emerald-600 transition-colors"
                      title="সঠিক উত্তর হিসেবে চিহ্নিত করুন"
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>

                    {/* Order label */}
                    <span className="shrink-0 w-7 h-7 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">
                      {String.fromCharCode(65 + idx)}
                    </span>

                    {/* Option text */}
                    <input
                      {...register(`options.${idx}.option_text`)}
                      type="text"
                      placeholder={`অপশন ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 px-2 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-150"
                    />

                    {/* Hidden is_correct field */}
                    <input type="hidden" {...register(`options.${idx}.is_correct`)} />

                    {/* Remove button */}
                    {fields.length > 2 && (
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="shrink-0 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="অপশন মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {errors.options && (
              <p className="mt-2 text-xs text-red-600">
                {errors.options.message || errors.options.root?.message}
              </p>
            )}
          </div>

          {/* Difficulty + Marks + Order */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">ডিফিকাল্টি</label>
              <select
                {...register("difficulty")}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-150"
              >
                <option value="easy">সহজ</option>
                <option value="medium">মাঝারি</option>
                <option value="hard">কঠিন</option>
              </select>
            </div>

            <Input
              type="number"
              step="0.25"
              label="মার্ক্স"
              {...register("marks")}
              error={errors.marks?.message}
            />

            <Input
              type="number"
              label="অর্ডার"
              {...register("order_number")}
              error={errors.order_number?.message}
            />
          </div>

          {/* Image URL */}
          <Input
            label="ছবির URL (Optional)"
            placeholder="https://..."
            {...register("image_url")}
            error={errors.image_url?.message}
          />

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              ব্যাখ্যা (Optional)
            </label>
            <textarea
              {...register("explanation")}
              rows={2}
              placeholder="সঠিক উত্তরের ব্যাখ্যা..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-150 resize-none"
            />
          </div>
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
