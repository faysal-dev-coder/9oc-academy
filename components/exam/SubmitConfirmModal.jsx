"use client";

import { FaExclamationTriangle, FaCheckCircle, FaTimes } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";

// ─────────────────────────────────────────────────────────
// বাংলা সংখ্যা convert
// ─────────────────────────────────────────────────────────
const toBanglaNumber = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .split("")
    .map((d) => banglaDigits[parseInt(d)] ?? d)
    .join("");
};

// ─────────────────────────────────────────────────────────
// Props:
//   isOpen, isAutoSubmit, stats, onConfirm, onCancel, isSubmitting
// ─────────────────────────────────────────────────────────

export default function SubmitConfirmModal({
  isOpen,
  isAutoSubmit = false,
  stats = {},
  onConfirm,
  onCancel,
  isSubmitting = false,
}) {
  if (!isOpen) return null;

  const { total = 0, answered = 0, skipped = 0, marked = 0 } = stats;
  const hasSkipped = skipped > 0;
  const allAnswered = answered === total;

  return (
    // ── Backdrop (Background overlay) ─────────────────────
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isAutoSubmit && !isSubmitting ? onCancel : undefined}
      />

      {/* ── Modal Panel ───────────────────────────────────── */}
      <div className="relative w-full sm:max-w-md mx-0 sm:mx-4 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden">
        {/* ══ HEADER ════════════════════════════════════════ */}
        <div
          className={`
            px-6 py-5 flex items-start justify-between
            ${
              isAutoSubmit
                ? "bg-red-50 border-b border-red-200"
                : "bg-primary/5 border-b border-primary/20"
            }
          `}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            {isAutoSubmit ? (
              <div className="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-sm">
                <FaExclamationTriangle className="text-red-600 text-lg" />
              </div>
            ) : (
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
                <HiOutlineClipboardList className="text-primary text-xl" />
              </div>
            )}

            {/* Title + Subtitle */}
            <div>
              <h2
                className={`text-lg font-bold ${
                  isAutoSubmit ? "text-red-700" : "text-primary-dark"
                }`}
              >
                {isAutoSubmit ? "সময় শেষ!" : "পরীক্ষা জমা দিন"}
              </h2>
              <p className={`text-sm mt-0.5 ${isAutoSubmit ? "text-red-600" : "text-[#475569]"}`}>
                {isAutoSubmit
                  ? "সময় শেষ হয়ে গেছে। পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হচ্ছে।"
                  : "পরীক্ষা জমা দেওয়ার আগে নিচের তথ্য দেখুন।"}
              </p>
            </div>
          </div>

          {/* Close button (শুধু manual submit এর সময়) */}
          {!isAutoSubmit && !isSubmitting && (
            <button
              onClick={onCancel}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#1F2937]
                         hover:bg-white transition-colors cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* ══ STATS SECTION ═════════════════════════════════ */}
        <div className="px-6 py-5">
          <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">
            পরীক্ষার সারসংক্ষেপ
          </h3>

          {/* 4 Stat Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatCard label="মোট প্রশ্ন" value={toBanglaNumber(total)} color="slate" />
            <StatCard label="উত্তর দিয়েছেন" value={toBanglaNumber(answered)} color="green" />
            <StatCard
              label="এড়িয়ে গেছেন"
              value={toBanglaNumber(skipped)}
              color={hasSkipped ? "red" : "slate"}
            />
            <StatCard
              label="Review এ আছে"
              value={toBanglaNumber(marked)}
              color={marked > 0 ? "amber" : "slate"}
            />
          </div>

          {/* ── Warning: Skipped Questions ─────────────────── */}
          {hasSkipped && !isAutoSubmit && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-3">
              <FaExclamationTriangle className="text-amber-600 text-sm mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">
                <strong>{toBanglaNumber(skipped)}টি</strong> প্রশ্নের উত্তর দেননি। এখনো সময় আছে,
                ফিরে যান।
              </p>
            </div>
          )}

          {/* ── Success: All Answered ──────────────────────── */}
          {allAnswered && !isAutoSubmit && (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mb-3">
              <FaCheckCircle className="text-green-600 text-sm mt-0.5 shrink-0" />
              <p className="text-sm text-green-800">সব প্রশ্নের উত্তর দিয়েছেন! জমা দিতে পারেন।</p>
            </div>
          )}

          {/* ── Info: Marked for Review ────────────────────── */}
          {marked > 0 && !isAutoSubmit && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-amber-600 text-sm shrink-0">⭐</span>
              <p className="text-sm text-amber-800">
                <strong>{toBanglaNumber(marked)}টি</strong> প্রশ্ন review এ আছে। জমা দিলে সেগুলো
                final হয়ে যাবে।
              </p>
            </div>
          )}
        </div>

        {/* ══ ACTION BUTTONS ════════════════════════════════ */}
        <div className="px-6 pb-6 flex gap-3">
          {/* Cancel Button (auto submit এ নেই) */}
          {!isAutoSubmit && (
            <button
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-[#E2E8F0]
                         bg-white text-[#475569] font-medium text-base
                         hover:bg-[#F1F5F9] hover:border-[#CBD5E1] active:scale-[0.98]
                         transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         cursor-pointer"
            >
              ফিরে যাই
            </button>
          )}

          {/* Confirm Submit Button */}
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className={`
              flex-1 py-3 px-4 rounded-xl font-medium text-base text-white
              flex items-center justify-center gap-2
              active:scale-[0.98] transition-all duration-200
              disabled:opacity-70 disabled:cursor-not-allowed
              cursor-pointer shadow-md
              ${
                isAutoSubmit
                  ? "bg-red-600 hover:bg-red-700 shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/30"
                  : "bg-primary hover:bg-primary-dark shadow-primary/25 hover:shadow-lg hover:shadow-primary/30"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>জমা হচ্ছে...</span>
              </>
            ) : (
              <>
                <FaCheckCircle />
                <span>{isAutoSubmit ? "ঠিক আছে" : "জমা দিন"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Helper Component: StatCard (Light Theme)
// ─────────────────────────────────────────────────────────
function StatCard({ label, value, color }) {
  const colorMap = {
    slate: "bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]",
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
  };

  return (
    <div className={`p-3 rounded-xl border-2 transition-all ${colorMap[color] || colorMap.slate}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs mt-0.5 opacity-80 font-medium">{label}</div>
    </div>
  );
}
