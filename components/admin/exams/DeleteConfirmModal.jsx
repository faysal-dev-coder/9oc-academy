"use client";

import { useEffect, useState } from "react";
import {
  HiOutlineXMark,
  HiOutlineExclamationTriangle,
  HiOutlineArchiveBox,
  HiOutlineTrash,
} from "react-icons/hi2";

export default function DeleteConfirmModal({ exam, onCancel, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = confirmText.trim().toUpperCase() === "DELETE";

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !isDeleting) onCancel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel, isDeleting]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isDeleting) onCancel();
  };

  const handleConfirm = async () => {
    if (!isConfirmed) return;
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  const statusLabels = {
    active: { text: "Active", color: "bg-emerald-100 text-emerald-700" },
    draft: { text: "Draft", color: "bg-amber-100 text-amber-700" },
    archived: { text: "Archived", color: "bg-slate-100 text-slate-700" },
  };

  const typeLabels = {
    free: { text: "🎁 Free", color: "bg-amber-100 text-amber-700" },
    premium: { text: "⭐ Premium", color: "bg-purple-100 text-purple-700" },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-red-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-2">
              <HiOutlineExclamationTriangle className="size-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Delete Exam</h2>
              <p className="text-xs text-slate-600">এই কাজ undo করা যাবে না!</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-100 hover:text-slate-900 disabled:opacity-50"
          >
            <HiOutlineXMark className="size-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5">
          {/* Exam Info Card */}
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 font-semibold text-slate-900">{exam.title}</h3>
            <p className="mb-3 text-xs text-slate-500">{exam.slug}</p>
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeLabels[exam.exam_type]?.color}`}
              >
                {typeLabels[exam.exam_type]?.text}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusLabels[exam.status]?.color}`}
              >
                {statusLabels[exam.status]?.text}
              </span>
              {exam.categories?.name && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  📚 {exam.categories.name}
                </span>
              )}
              {exam.courses?.title && (
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                  🎓 {exam.courses.title}
                </span>
              )}
            </div>
          </div>

          {/* Archive Suggestion */}
          {exam.status !== "archived" && (
            <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
              <div className="flex gap-2">
                <HiOutlineArchiveBox className="size-5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Consider Archiving Instead</p>
                  <p className="mt-0.5 text-xs text-blue-700">
                    Delete করার বদলে Archive করলে data সংরক্ষিত থাকবে এবং student দের দেখাবে না।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm font-medium text-red-900">⚠️ Warning:</p>
            <ul className="mt-1 space-y-1 text-xs text-red-700">
              <li>• এই পরীক্ষা স্থায়ীভাবে মুছে যাবে</li>
              <li>• যদি কোনো প্রশ্ন থাকে, delete হবে না</li>
              <li>• যদি কোনো student অংশগ্রহণ করে থাকে, delete হবে না</li>
            </ul>
          </div>

          {/* Confirmation Input */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Type &quot;DELETE&quot; to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              disabled={isDeleting}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:opacity-50"
              autoFocus
            />
            {confirmText && !isConfirmed && (
              <p className="mt-1 text-xs text-red-600">
                Please type &quot;DELETE&quot; in capital letters
              </p>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isConfirmed || isDeleting}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? (
              <>
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
                Deleting...
              </>
            ) : (
              <>
                <HiOutlineTrash className="size-4" />
                Delete Permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
