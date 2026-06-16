"use client";

import { Loader2 } from "lucide-react";

/// ─────────────────────────────────────────────
//  VARIANT STYLES
// ─────────────────────────────────────────────
const variantStyles = {
  primary:
    "bg-brand-800 text-white shadow-sm " +
    "hover:bg-brand-700 active:bg-brand-900 " +
    "focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2",

  secondary:
    "bg-white text-brand-800 border border-brand-200 shadow-sm " +
    "hover:bg-brand-50 hover:border-brand-300 active:bg-brand-100 " +
    "focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2",

  ghost:
    "bg-transparent text-slate-600 " +
    "hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 " +
    "focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",

  danger:
    "bg-red-600 text-white shadow-sm " +
    "hover:bg-red-500 active:bg-red-700 " +
    "focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",

  outline:
    "bg-white text-slate-700 border border-slate-300 shadow-sm " +
    "hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 " +
    "focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",

  warning:
    "bg-yellow-500 text-slate-900 shadow-sm " +
    "hover:bg-yellow-600 active:bg-yellow-700 " +
    "focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2",

  success:
    "bg-emerald-600 text-white shadow-sm " +
    "hover:bg-emerald-500 active:bg-emerald-700 " +
    "focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
};

// ─────────────────────────────────────────────
//  SIZE STYLES
// ─────────────────────────────────────────────
const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

// icon-only এ square করার জন্য px override
const iconOnlySizeStyles = {
  sm: "h-8 w-8 px-0",
  md: "h-10 w-10 px-0",
  lg: "h-12 w-12 px-0",
};

// ─────────────────────────────────────────────
//  ICON SIZES
// ─────────────────────────────────────────────
const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
};

// ─────────────────────────────────────────────
//  BUTTON COMPONENT
// ─────────────────────────────────────────────
export default function Button({
  // content
  children,
  // variants & size
  variant = "primary",
  size = "md",
  // icon props
  icon: Icon,
  iconPosition = "left",
  iconOnly = false,
  // states
  loading = false,
  disabled = false,
  fullWidth = false,
  // html attrs
  type = "button",
  onClick,
  className = "",
}) {
  // loading হলে disabled ও treat করবো
  const isDisabled = disabled || loading;
  const iconSize = iconSizes[size];

  // icon element (loading হলে spinner, নাহলে passed icon)
  const iconElement = loading ? (
    <Loader2 size={iconSize} className="animate-spin shrink-0" />
  ) : Icon ? (
    <Icon size={iconSize} className="shrink-0" />
  ) : null;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        // ── Base styles ──
        "inline-flex items-center justify-center",
        "font-medium rounded-lg whitespace-nowrap",
        "transition-all duration-150 ease-out",
        "outline-none select-none",
        "cursor-pointer",

        // ── Variant ──
        variantStyles[variant],

        // ── Size ──
        iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],

        // ── Full width ──
        fullWidth ? "w-full" : "",

        // ── Disabled state ──
        isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "active:scale-95",

        // ── Custom className ──
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Icon Left OR loading spinner */}
      {(iconPosition === "left" || iconOnly) && iconElement}

      {/* Text — icon-only হলে hide */}
      {!iconOnly && children && <span className="leading-none">{children}</span>}

      {/* Icon Right */}
      {iconPosition === "right" && !iconOnly && iconElement}
    </button>
  );
}
