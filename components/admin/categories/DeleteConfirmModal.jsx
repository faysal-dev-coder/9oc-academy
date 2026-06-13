"use client";

// components/admin/categories/DeleteConfirmModal.jsx
// ═══════════════════════════════════════════
// Delete Confirmation Modal
// ═══════════════════════════════════════════
// Safety check + Beautiful warning UI
// Backend blocks if linked courses/exams exist
// ═══════════════════════════════════════════

import { useEffect } from "react";
import * as Hi2Icons from "react-icons/hi2";
import { HiXMark, HiExclamationTriangle, HiTrash, HiQuestionMarkCircle } from "react-icons/hi2";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, category, loading }) {
  // ⭐ ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, loading]);

  if (!isOpen || !category) return null;

  // ⭐ Dynamic Icon
  const Icon = Hi2Icons[category.icon] || HiQuestionMarkCircle;

  // ⭐ Check if has linked items (for warning)
  const hasLinkedItems = (category.courses_count || 0) > 0 || (category.exams_count || 0) > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-red-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <HiExclamationTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1F2937]">Category Delete?</h2>
              <p className="text-xs text-[#64748B] mt-0.5">এই কাজ undo করা যাবে না!</p>
            </div>
          </div>
          {!loading && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <HiXMark className="w-5 h-5 text-[#64748B]" />
            </button>
          )}
        </div>

        {/* ─── Body ─── */}
        <div className="p-6 space-y-4">
          {/* Category Card */}
          <div className="bg-[#FAFBFC] border border-[#E2E8F0] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${category.color}15`,
                  border: `1px solid ${category.color}30`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: category.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#1F2937]">{category.name}</div>
                <div className="text-xs text-[#94A3B8] font-mono mt-0.5">/{category.slug}</div>
              </div>
            </div>

            {/* Linked Items Info */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E2E8F0]">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1E9CD7]/10 text-[#1E9CD7] rounded-md text-xs font-semibold">
                📚 {category.courses_count || 0} Courses
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-md text-xs font-semibold">
                📝 {category.exams_count || 0} Exams
              </span>
            </div>
          </div>

          {/* Warning Message */}
          {hasLinkedItems ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex gap-3">
                <HiExclamationTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-900 mb-1">
                    ⚠️ Delete করা যাবে না!
                  </p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    এই category তে <strong>{category.courses_count || 0} টি course</strong> এবং{" "}
                    <strong>{category.exams_count || 0} টি exam</strong> আছে। আগে এগুলো অন্য
                    category তে move করুন বা delete করুন।
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex gap-3">
                <HiExclamationTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900 mb-1">আপনি কি নিশ্চিত?</p>
                  <p className="text-xs text-red-700 leading-relaxed">
                    <strong>&quot;{category.name}&quot;</strong> category টি permanently delete হয়ে
                    যাবে। এই action undo করা যাবে না!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── Footer Actions ─── */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading || hasLinkedItems}
            className="px-6 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600 flex items-center gap-2"
          >
            {loading ? (
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
                Delete হচ্ছে...
              </>
            ) : (
              <>
                <HiTrash className="w-4 h-4" />
                Yes, Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
