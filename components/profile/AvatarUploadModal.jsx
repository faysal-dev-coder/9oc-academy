"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaCloudUploadAlt,
  FaImage,
  FaTimes,
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "user-avatars";
const MAX_FILE_SIZE = 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const AvatarUploadModal = ({ isOpen, onClose, userId, currentAvatarUrl, onAvatarUpdated }) => {
  const supabase = useMemo(() => createClient(), []);
  const fileInputRef = useRef(null);
  const previewUrlRef = useRef("");

  // ✅ SSR-safe mount check (no setState in effect)
  const [mounted] = useState(() => typeof window !== "undefined");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const isBusy = isUploading || isRemoving;

  const cleanupObjectUrl = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupObjectUrl();
    };
  }, [cleanupObjectUrl]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const clearSelectionOnly = useCallback(() => {
    cleanupObjectUrl();
    setSelectedFile(null);
    setPreviewUrl("");
    setIsDragging(false);
  }, [cleanupObjectUrl]);

  const resetLocalState = useCallback(() => {
    clearSelectionOnly();
    setError("");
    setSuccess("");
  }, [clearSelectionOnly]);

  const handleClose = useCallback(() => {
    if (isBusy) {
      return;
    }

    resetLocalState();
    onClose?.();
  }, [isBusy, onClose, resetLocalState]);

  const validateFile = useCallback((file) => {
    if (!file) {
      return "একটি ছবি সিলেক্ট করুন।";
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const isValidType = ALLOWED_MIME_TYPES.has(file.type) || ALLOWED_EXTENSIONS.has(extension);

    if (!isValidType) {
      return "শুধু JPG, PNG অথবা WEBP ছবি আপলোড করা যাবে।";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "ফাইল সাইজ সর্বোচ্চ ১ MB হতে হবে।";
    }

    return "";
  }, []);

  const setFilePreview = useCallback(
    (file) => {
      cleanupObjectUrl();

      const localUrl = URL.createObjectURL(file);
      previewUrlRef.current = localUrl;
      setPreviewUrl(localUrl);
    },
    [cleanupObjectUrl]
  );

  const applySelectedFile = useCallback(
    (file) => {
      const validationMessage = validateFile(file);

      setError("");
      setSuccess("");

      if (validationMessage) {
        clearSelectionOnly();
        setError(validationMessage);
        return;
      }

      setSelectedFile(file);
      setFilePreview(file);
    },
    [clearSelectionOnly, setFilePreview, validateFile]
  );

  const handleFileInputChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      applySelectedFile(file);
      event.target.value = "";
    },
    [applySelectedFile]
  );

  const openFilePicker = useCallback(() => {
    if (isBusy) {
      return;
    }

    fileInputRef.current?.click();
  }, [isBusy]);

  const handleDragOver = useCallback(
    (event) => {
      event.preventDefault();

      if (isBusy) {
        return;
      }

      setIsDragging(true);
    },
    [isBusy]
  );

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);

      if (isBusy) {
        return;
      }

      const file = event.dataTransfer.files?.[0];

      if (!file) {
        return;
      }

      applySelectedFile(file);
    },
    [applySelectedFile, isBusy]
  );

  const cleanupFolderFiles = useCallback(
    async (keepFileName = null) => {
      if (!userId) {
        return;
      }

      const { data, error: listError } = await supabase.storage.from(BUCKET_NAME).list(userId, {
        limit: 100,
        offset: 0,
      });

      if (listError) {
        throw listError;
      }

      const removablePaths = (data ?? [])
        .filter((item) => item.name && item.name !== keepFileName)
        .map((item) => `${userId}/${item.name}`);

      if (removablePaths.length === 0) {
        return;
      }

      const { error: removeError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove(removablePaths);

      if (removeError) {
        throw removeError;
      }
    },
    [supabase, userId]
  );

  const handleUpload = useCallback(async () => {
    if (!userId) {
      setError("ইউজার তথ্য পাওয়া যায়নি। আবার লগইন করুন।");
      return;
    }

    if (!selectedFile) {
      setError("আপলোড করার আগে একটি ছবি সিলেক্ট করুন।");
      return;
    }

    const validationMessage = validateFile(selectedFile);

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      const filePath = `${userId}/avatar.jpg`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, selectedFile, {
          upsert: true,
          cacheControl: "3600",
          contentType: selectedFile.type || "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      await cleanupFolderFiles("avatar.jpg");

      const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

      const nextAvatarUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          avatar_url: nextAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (profileError) {
        throw profileError;
      }

      clearSelectionOnly();
      setSuccess("অ্যাভাটার সফলভাবে আপডেট হয়েছে! ✨");
      onAvatarUpdated?.(nextAvatarUrl);
    } catch (uploadError) {
      setError(uploadError.message || "অ্যাভাটার আপলোড করা যায়নি।");
    } finally {
      setIsUploading(false);
    }
  }, [
    clearSelectionOnly,
    cleanupFolderFiles,
    onAvatarUpdated,
    selectedFile,
    supabase,
    userId,
    validateFile,
  ]);

  const handleRemoveAvatar = useCallback(async () => {
    if (!userId) {
      setError("ইউজার তথ্য পাওয়া যায়নি। আবার লগইন করুন।");
      return;
    }

    if (!currentAvatarUrl) {
      setError("মুছে ফেলার জন্য কোনো অ্যাভাটার নেই।");
      return;
    }

    setIsRemoving(true);
    setError("");
    setSuccess("");

    try {
      await cleanupFolderFiles();

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          avatar_url: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (profileError) {
        throw profileError;
      }

      clearSelectionOnly();
      setSuccess("অ্যাভাটার মুছে ফেলা হয়েছে।");
      onAvatarUpdated?.(null);
    } catch (removeError) {
      setError(removeError.message || "অ্যাভাটার মুছে ফেলা যায়নি।");
    } finally {
      setIsRemoving(false);
    }
  }, [clearSelectionOnly, cleanupFolderFiles, currentAvatarUrl, onAvatarUpdated, supabase, userId]);

  const handleClearSelectedFile = useCallback(() => {
    clearSelectionOnly();
    setError("");
    setSuccess("");
  }, [clearSelectionOnly]);

  if (!isOpen || !mounted) {
    return null;
  }

  const previewSource = previewUrl || currentAvatarUrl || "";
  const isBlobPreview = previewSource.startsWith("blob:");
  const hasSelection = Boolean(selectedFile);

  const modalContent = (
    <div
      className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-md sm:items-center sm:py-12"
      style={{ zIndex: 99999 }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-pink-500/30 blur-3xl" />

        {/* ═══════════ Header ═══════════ */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">অ্যাভাটার আপলোড</h2>
            <p className="mt-0.5 text-xs text-slate-400">JPG, PNG, WEBP • সর্বোচ্চ ১ MB</p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* ═══════════ Body ═══════════ */}
        <div className="relative px-6 py-6">
          {/* ─── Circular Avatar Preview ─── */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative">
              {/* Gradient ring */}
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-purple-500 via-pink-500 to-orange-400 p-1">
                <div className="h-full w-full rounded-full bg-slate-950" />
              </div>

              {/* Avatar circle */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-slate-950">
                {previewSource ? (
                  <Image
                    src={previewSource}
                    alt="Avatar preview"
                    fill
                    className="object-cover"
                    unoptimized={isBlobPreview}
                    sizes="128px"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-linear-to-br from-slate-800 to-slate-900 text-slate-500">
                    <FaImage className="text-2xl" />
                    <span className="text-[10px]">No image</span>
                  </div>
                )}
              </div>

              {/* Status badge */}
              {hasSelection && (
                <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-500 shadow-lg">
                  <FaCheckCircle className="text-xs text-white" />
                </div>
              )}
            </div>

            {/* Status text */}
            <div className="mt-3 text-center">
              {hasSelection ? (
                <p className="text-xs text-slate-300">
                  <span className="font-semibold text-emerald-400">নতুন:</span> {selectedFile.name}
                </p>
              ) : currentAvatarUrl ? (
                <p className="text-xs text-slate-400">বর্তমান অ্যাভাটার</p>
              ) : (
                <p className="text-xs text-slate-400">নতুন ছবি নির্বাচন করুন</p>
              )}

              {hasSelection && (
                <p className="mt-0.5 text-[10px] text-slate-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              )}
            </div>
          </div>

          {/* ─── Drop Zone ─── */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={openFilePicker}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            disabled={isBusy}
            className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-5 text-center transition-all ${
              isDragging
                ? "scale-[1.02] border-purple-400 bg-purple-500/20"
                : "border-white/15 bg-white/5 hover:border-purple-400/50 hover:bg-white/10"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 shadow-lg">
              <FaCloudUploadAlt className="text-xl text-white" />
            </div>

            <p className="text-sm font-semibold text-white">ছবি drag & drop করুন</p>
            <p className="mt-0.5 text-xs text-slate-400">অথবা ক্লিক করে file বাছাই করুন</p>
          </button>

          {/* ─── Status Messages ─── */}
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-200">
              <FaExclamationCircle className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-200">
              <FaCheckCircle className="mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* ─── Secondary Actions ─── */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {hasSelection && (
              <button
                type="button"
                onClick={handleClearSelectedFile}
                disabled={isBusy}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                বাতিল করুন
              </button>
            )}

            {currentAvatarUrl && !hasSelection && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                disabled={isBusy}
                className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaTrash className="text-[10px]" />
                {isRemoving ? "মুছে ফেলা হচ্ছে..." : "অ্যাভাটার মুছুন"}
              </button>
            )}
          </div>

          {/* ─── Info Note ─── */}
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 px-3 py-2.5">
            <FaInfoCircle className="mt-0.5 shrink-0 text-xs text-blue-400" />
            <p className="text-[11px] leading-relaxed text-slate-400">
              নতুন ছবি আপলোড করলে আগের অ্যাভাটার automatic replace হয়ে যাবে।
            </p>
          </div>
        </div>

        {/* ═══════════ Footer ═══════════ */}
        <div className="relative flex gap-3 border-t border-white/10 bg-slate-950/50 px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpload}
            disabled={!hasSelection || isBusy}
            className="flex-1 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:from-purple-500 hover:to-pink-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Uploading...
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // ✅ Portal rendering — Modal কে <body> এর সরাসরি child বানাচ্ছি
  return createPortal(modalContent, document.body);
};

export default AvatarUploadModal;
