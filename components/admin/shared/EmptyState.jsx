"use client";

// ─────────────────────────────────────────────
//  VARIANT STYLES (icon background colors)
// ─────────────────────────────────────────────
const variantStyles = {
  default: {
    iconBg: "bg-brand-50",
    iconColor: "text-brand-600",
  },
  search: {
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
  },
  error: {
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
  },
};

// ─────────────────────────────────────────────
//  SIZE STYLES
// ─────────────────────────────────────────────
const sizeStyles = {
  sm: {
    container: "py-8 px-4",
    iconWrapper: "w-12 h-12 mb-3",
    iconSize: 24,
    title: "text-base",
    description: "text-xs mt-1",
    actionMargin: "mt-4",
    maxWidth: "max-w-xs",
  },
  md: {
    container: "py-12 px-6",
    iconWrapper: "w-16 h-16 mb-4",
    iconSize: 32,
    title: "text-lg",
    description: "text-sm mt-1.5",
    actionMargin: "mt-5",
    maxWidth: "max-w-sm",
  },
  lg: {
    container: "py-16 px-8",
    iconWrapper: "w-20 h-20 mb-5",
    iconSize: 40,
    title: "text-xl",
    description: "text-base mt-2",
    actionMargin: "mt-6",
    maxWidth: "max-w-md",
  },
};

// ─────────────────────────────────────────────
//  EMPTYSTATE COMPONENT
// ─────────────────────────────────────────────
export default function EmptyState({
  // content
  icon: Icon,
  title,
  description,
  action,
  // visual
  variant = "default",
  size = "md",
  // html
  className = "",
}) {
  const variantCss = variantStyles[variant] || variantStyles.default;
  const sizeCss = sizeStyles[size] || sizeStyles.md;

  return (
    <div
      className={[
        "flex flex-col items-center justify-center text-center",
        sizeCss.container,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── ICON CIRCLE ── */}
      {Icon && (
        <div
          className={[
            "rounded-full flex items-center justify-center shrink-0",
            sizeCss.iconWrapper,
            variantCss.iconBg,
            variantCss.iconColor,
          ].join(" ")}
        >
          <Icon size={sizeCss.iconSize} />
        </div>
      )}

      {/* ── TITLE ── */}
      {title && (
        <h3 className={["font-semibold text-slate-900", sizeCss.title].join(" ")}>{title}</h3>
      )}

      {/* ── DESCRIPTION ── */}
      {description && (
        <p
          className={["text-slate-500 leading-relaxed", sizeCss.description, sizeCss.maxWidth].join(
            " "
          )}
        >
          {description}
        </p>
      )}

      {/* ── ACTION (ReactNode for flexibility) ── */}
      {action && <div className={sizeCss.actionMargin}>{action}</div>}
    </div>
  );
}
