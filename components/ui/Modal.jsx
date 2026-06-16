"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// ─── SIZE MAP ───────────────────────────────────────────────
const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

// ─── MODAL ROOT ─────────────────────────────────────────────
export default function Modal({
  isOpen,
  onClose,
  size = "md",
  closeOnBackdrop = true,
  backdropBlur = true,
  className = "",
  children,
}) {
  const panelRef = useRef(null);

  // ── Scroll Lock ────────────────────────────────────────────
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

  // ── ESC Key Close ──────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // ── Focus Trap (Option A — Simple) ────────────────────────
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    // সব focusable elements খোঁজো
    const focusableSelectors = [
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    const focusableElements = Array.from(panelRef.current.querySelectorAll(focusableSelectors));

    if (focusableElements.length === 0) return;

    // Modal open হলে প্রথম element এ focus দাও
    focusableElements[0].focus();

    const handleTabKey = (e) => {
      if (e.key !== "Tab") return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab → backward
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab → forward
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  // ── Backdrop Click ─────────────────────────────────────────
  const handleBackdropClick = useCallback(
    (e) => {
      if (closeOnBackdrop && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose]
  );

  // ── SSR Safety ─────────────────────────────────────────────
  if (typeof window === "undefined") return null;
  if (!isOpen) return null;

  return createPortal(
    // ── BACKDROP ──────────────────────────────────────────────
    <div
      role="dialog"
      aria-modal="true"
      className={[
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        backdropBlur ? "bg-slate-900/60 backdrop-blur-sm" : "bg-slate-900/70",
        "animate-in",
      ].join(" ")}
      onClick={handleBackdropClick}
    >
      {/* ── PANEL ────────────────────────────────────────── */}
      <div
        ref={panelRef}
        className={[
          "relative w-full bg-white rounded-2xl shadow-2xl",
          "flex flex-col max-h-[90vh]",
          "animate-modal-in",
          sizeMap[size] || sizeMap.md,
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// ─── MODAL HEADER ────────────────────────────────────────────
function ModalHeader({ title, onClose, showClose = true, id }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
      <h2 id={id} className="text-lg font-semibold text-slate-900 leading-snug">
        {title}
      </h2>

      {showClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className={[
            "p-1.5 rounded-lg text-slate-400",
            "hover:text-slate-600 hover:bg-slate-100",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-1",
          ].join(" ")}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

// ─── MODAL BODY ──────────────────────────────────────────────
function ModalBody({ children, className = "" }) {
  return (
    <div className={["flex-1 overflow-y-auto px-6 py-5", className].join(" ")}>{children}</div>
  );
}

// ─── MODAL FOOTER ────────────────────────────────────────────
function ModalFooter({ children, className = "" }) {
  return (
    <div
      className={[
        "flex items-center justify-end gap-3",
        "px-6 py-4 border-t border-slate-100 shrink-0",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ─── ATTACH SUB-COMPONENTS ───────────────────────────────────
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
