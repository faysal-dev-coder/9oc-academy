"use client";

import { X } from "lucide-react";

// ─────────────────────────────────────────────
//  VARIANT × APPEARANCE STYLES
// ─────────────────────────────────────────────
const variantStyles = {
  default: {
    soft: "bg-slate-100 text-slate-700",
    solid: "bg-slate-700 text-white",
    outline: "bg-transparent border border-slate-300 text-slate-700",
  },
  brand: {
    soft: "bg-brand-50 text-brand-700",
    solid: "bg-brand-800 text-white",
    outline: "bg-transparent border border-brand-300 text-brand-700",
  },
  success: {
    soft: "bg-emerald-50 text-emerald-700",
    solid: "bg-emerald-600 text-white",
    outline: "bg-transparent border border-emerald-300 text-emerald-700",
  },
  warning: {
    soft: "bg-amber-50 text-amber-700",
    solid: "bg-amber-500 text-white",
    outline: "bg-transparent border border-amber-300 text-amber-700",
  },
  danger: {
    soft: "bg-red-50 text-red-700",
    solid: "bg-red-600 text-white",
    outline: "bg-transparent border border-red-300 text-red-700",
  },
};

// ─────────────────────────────────────────────
//  DOT COLOR (matches variant)
// ─────────────────────────────────────────────
const dotStyles = {
  default: "bg-slate-500",
  brand: "bg-brand-600",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

// ─────────────────────────────────────────────
//  HOVER STYLES (only for clickable)
// ─────────────────────────────────────────────
const hoverStyles = {
  default: {
    soft: "hover:bg-slate-200",
    solid: "hover:bg-slate-800",
    outline: "hover:bg-slate-50",
  },
  brand: {
    soft: "hover:bg-brand-100",
    solid: "hover:bg-brand-700",
    outline: "hover:bg-brand-50",
  },
  success: {
    soft: "hover:bg-emerald-100",
    solid: "hover:bg-emerald-700",
    outline: "hover:bg-emerald-50",
  },
  warning: {
    soft: "hover:bg-amber-100",
    solid: "hover:bg-amber-600",
    outline: "hover:bg-amber-50",
  },
  danger: {
    soft: "hover:bg-red-100",
    solid: "hover:bg-red-700",
    outline: "hover:bg-red-50",
  },
};

// ─────────────────────────────────────────────
//  SIZE STYLES
// ─────────────────────────────────────────────
const sizeStyles = {
  sm: "h-5 px-1.5 text-xs gap-1",
  md: "h-6 px-2 text-xs gap-1.5",
  lg: "h-7 px-2.5 text-sm gap-1.5",
};

const iconSizes = {
  sm: 10,
  md: 12,
  lg: 14,
};

const dotSizes = {
  sm: "w-1.5 h-1.5",
  md: "w-1.5 h-1.5",
  lg: "w-2 h-2",
};

// ─────────────────────────────────────────────
//  BADGE COMPONENT
// ─────────────────────────────────────────────
export default function Badge({
  // content
  children,
  // visual
  variant = "default",
  appearance = "soft",
  size = "md",
  // features
  icon: Icon,
  dot = false,
  // interactions
  onClick,
  onRemove,
  // html
  className = "",
}) {
  const isClickable = !!onClick;
  const iconSize = iconSizes[size];

  // base classes
  const baseClasses = [
    "inline-flex items-center justify-center",
    "font-medium rounded-md",
    "transition-all duration-150 ease-out",
    "select-none whitespace-nowrap",
    sizeStyles[size],
    variantStyles[variant][appearance],
    isClickable ? `cursor-pointer ${hoverStyles[variant][appearance]} active:scale-95` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // ── Inner content (icon + dot + text) ──
  const innerContent = (
    <>
      {/* Dot indicator */}
      {dot && (
        <span
          className={[
            "rounded-full shrink-0",
            dotSizes[size],
            appearance === "solid" ? "bg-white/80" : dotStyles[variant],
          ].join(" ")}
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      {Icon && <Icon size={iconSize} className="shrink-0" />}

      {/* Text */}
      {children && <span className="leading-none">{children}</span>}

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove"
          className={[
            "ml-0.5 -mr-0.5 rounded-sm shrink-0",
            "inline-flex items-center justify-center",
            "transition-colors duration-150",
            "cursor-pointer",
            appearance === "solid" ? "hover:bg-white/20" : "hover:bg-black/10",
          ].join(" ")}
        >
          <X size={iconSize} />
        </button>
      )}
    </>
  );

  // ── Render as button (clickable) or span ──
  if (isClickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={
          baseClasses +
          " outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2"
        }
      >
        {innerContent}
      </button>
    );
  }

  return <span className={baseClasses}>{innerContent}</span>;
}
