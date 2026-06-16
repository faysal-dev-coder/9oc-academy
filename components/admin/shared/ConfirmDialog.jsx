"use client";

import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────
//  VARIANT CONFIG (icon + colors + button)
// ─────────────────────────────────────────────
const variantConfig = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    confirmVariant: "danger",
    defaultConfirmLabel: "Delete",
  },
  warning: {
    icon: AlertCircle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    confirmVariant: "warning",
    defaultConfirmLabel: "Continue",
  },
  info: {
    icon: Info,
    iconBg: "bg-brand-50",
    iconColor: "text-brand-600",
    confirmVariant: "primary",
    defaultConfirmLabel: "Confirm",
  },
  success: {
    icon: CheckCircle2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    confirmVariant: "success",
    defaultConfirmLabel: "OK",
  },
};

// ─────────────────────────────────────────────
//  CONFIRMDIALOG COMPONENT
// ─────────────────────────────────────────────
export default function ConfirmDialog({
  // ── State ──
  isOpen,
  onClose,

  // ── Content ──
  title,
  description,
  icon: IconOverride,

  // ── Variant ──
  variant = "danger",

  // ── Actions ──
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  loading = false,

  // ── Visual ──
  size = "sm",
}) {
  const config = variantConfig[variant] || variantConfig.danger;
  const Icon = IconOverride || config.icon;
  const finalConfirmLabel = confirmLabel || config.defaultConfirmLabel;

  // ── Handlers ──
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
  };

  // loading চলাকালে backdrop/ESC দিয়ে close না হোক
  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={size} closeOnBackdrop={!loading}>
      {/* ── BODY (custom — no Modal.Header for tighter design) ── */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start gap-4">
          {/* Icon Circle */}
          <div
            className={[
              "w-11 h-11 rounded-full shrink-0",
              "flex items-center justify-center",
              config.iconBg,
              config.iconColor,
            ].join(" ")}
          >
            <Icon size={22} />
          </div>

          {/* Title + Description */}
          <div className="flex-1 min-w-0 pt-0.5">
            {title && (
              <h3 className="text-base font-semibold text-slate-900 leading-snug">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-slate-500 leading-relaxed mt-1.5">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── FOOTER (actions) — rounded-b-2xl for smooth corners ── */}
      <div className="flex items-center justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
        <Button variant="outline" onClick={handleClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant={config.confirmVariant} onClick={handleConfirm} loading={loading}>
          {finalConfirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
