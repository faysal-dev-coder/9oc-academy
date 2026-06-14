"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HiXMark, HiExclamationTriangle, HiTrash, HiPhoto, HiArchiveBox } from "react-icons/hi2";

export default function DeleteConfirmModal({ course, onConfirm, onClose }) {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Confirmation text must match
  const isConfirmed = confirmText.toLowerCase() === "delete";

  // ═══════════════════════════════════════════════
  // ESC key to close
  // ═══════════════════════════════════════════════
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, loading]);

  // ═══════════════════════════════════════════════
  // Confirm Delete Handler
  // ═══════════════════════════════════════════════
  const handleConfirm = async () => {
    if (!isConfirmed) return;
    setLoading(true);
    await onConfirm();
    // Note: onConfirm handles closing modal
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={loading ? undefined : onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ═══════════════════════════════════════════ */}
        {/* Header (Red Warning) */}
        {/* ═══════════════════════════════════════════ */}
        <div className="bg-linear-to-br from-red-500 to-red-600 p-5 text-white relative">
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-3 right-3 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <HiXMark className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <HiExclamationTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold">কোর্স মুছে ফেলবেন?</h2>
              <p className="text-xs text-white/80 mt-0.5">এই কাজ undo করা যাবে না</p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Body */}
        {/* ═══════════════════════════════════════════ */}
        <div className="p-5 space-y-4">
          {/* Course Preview Card */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            {/* Thumbnail */}
            <div className="w-14 h-14 rounded-lg bg-slate-200 overflow-hidden shrink-0 relative">
              {course.thumbnail_url ? (
                <Image
                  src={course.thumbnail_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <HiPhoto className="w-7 h-7 text-slate-400" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">{course.title}</p>
              <p className="text-xs text-slate-500 truncate">/{course.slug}</p>
              <div className="flex items-center gap-2 mt-1">
                {course.category && (
                  <span
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${course.category.color}15`,
                      color: course.category.color,
                    }}
                  >
                    {course.category.name}
                  </span>
                )}
                <span className="text-xs text-slate-500">
                  {course.is_free ? "Free" : `৳${course.price}`}
                </span>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 font-medium mb-2">⚠️ যা মুছে যাবে:</p>
            <ul className="text-xs text-red-600 space-y-1 ml-4 list-disc">
              <li>কোর্সের সকল তথ্য</li>
              <li>Thumbnail image (storage থেকে)</li>
              <li>ভবিষ্যতে কোর্সটি কোথাও দেখা যাবে না</li>
            </ul>
            <p className="text-xs text-red-600 mt-2">
              💡 এই কোর্সে enrollment থাকলে delete হবে না — সেক্ষেত্রে Archive করুন।
            </p>
          </div>

          {/* Archive Suggestion */}
          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <HiArchiveBox className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-800 mb-0.5">বিকল্প: Archive করুন</p>
              <p className="text-xs text-blue-700">
                Delete না করে Status থেকে &quot;Archived&quot; করলে কোর্স সংরক্ষিত থাকবে কিন্তু site
                এ দেখাবে না।
              </p>
            </div>
          </div>

          {/* Confirmation Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              নিশ্চিত করতে{" "}
              <span className="font-mono bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-xs">
                delete
              </span>{" "}
              লিখুন:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete"
              disabled={loading}
              autoFocus
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Footer Buttons */}
        {/* ═══════════════════════════════════════════ */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isConfirmed || loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                মুছছে...
              </>
            ) : (
              <>
                <HiTrash className="w-4 h-4" />
                Delete Course
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
