"use client";

import Link from "next/link";

// ─────────────────────────────────────────────
//  VARIANT STYLES
// ─────────────────────────────────────────────
const variantStyles = {
  default: "bg-white border border-slate-200 shadow-sm",
  elevated: "bg-white shadow-md",
  outlined: "bg-white border border-slate-300",
  ghost: "bg-transparent",
};

// ─────────────────────────────────────────────
//  HOVER STYLES (only for clickable)
// ─────────────────────────────────────────────
const hoverStyles = {
  default: "hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5",
  elevated: "hover:shadow-lg hover:-translate-y-0.5",
  outlined: "hover:border-brand-400 hover:shadow-sm hover:-translate-y-0.5",
  ghost: "hover:bg-slate-50",
};

// ─────────────────────────────────────────────
//  PADDING STYLES (full card)
// ─────────────────────────────────────────────
const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

// ─────────────────────────────────────────────
//  CARD COMPONENT (Root)
// ─────────────────────────────────────────────
function Card({
  // visual
  variant = "default",
  padding = "md",
  // interactions
  onClick,
  href,
  // html
  className = "",
  children,
  ...rest
}) {
  const isInteractive = !!onClick || !!href;

  const classes = [
    // base
    "rounded-xl overflow-hidden",
    "transition-all duration-150 ease-out",
    // variant
    variantStyles[variant],
    // padding
    paddingStyles[padding],
    // interactive
    isInteractive
      ? `cursor-pointer ${hoverStyles[variant]} ` +
        "focus-visible:outline-none focus-visible:ring-2 " +
        "focus-visible:ring-brand-800 focus-visible:ring-offset-2"
      : "",
    // custom
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // ── As Link (Next.js navigation) ──
  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // ── As Button (onClick) ──
  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(e);
          }
        }}
        className={classes}
        {...rest}
      >
        {children}
      </div>
    );
  }

  // ── Plain card ──
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
//  SUB-COMPONENT: Card.Header
// ─────────────────────────────────────────────
function CardHeader({ divider = false, className = "", children, ...rest }) {
  return (
    <div
      className={[
        "flex flex-col gap-1",
        divider ? "pb-4 mb-4 border-b border-slate-200" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
//  SUB-COMPONENT: Card.Title
// ─────────────────────────────────────────────
function CardTitle({ as: Tag = "h3", className = "", children, ...rest }) {
  return (
    <Tag
      className={["text-base font-semibold text-slate-900 leading-snug", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────
//  SUB-COMPONENT: Card.Description
// ─────────────────────────────────────────────
function CardDescription({ className = "", children, ...rest }) {
  return (
    <p
      className={["text-sm text-slate-500 leading-relaxed", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────
//  SUB-COMPONENT: Card.Body
//  ⚠️ NO vertical padding — Header/Footer dividers handle spacing
// ─────────────────────────────────────────────
function CardBody({ className = "", children, ...rest }) {
  return (
    <div
      className={["text-sm text-slate-700 leading-relaxed", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
//  SUB-COMPONENT: Card.Footer
// ─────────────────────────────────────────────
function CardFooter({ divider = false, className = "", children, ...rest }) {
  return (
    <div
      className={[
        "flex items-center gap-2",
        divider ? "pt-4 mt-4 border-t border-slate-200" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
//  ATTACH SUB-COMPONENTS
// ─────────────────────────────────────────────
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
