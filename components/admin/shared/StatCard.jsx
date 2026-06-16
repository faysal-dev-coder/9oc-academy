// components/admin/shared/StatCard.jsx
// ═══════════════════════════════════════════════════════════════
// 📊 Premium StatCard — Admin Dashboard Metric Card
// ⭐ Phase 2: Admin Shared Component
// ⭐ Uses: Card.jsx wrapper
// ⭐ Style: Modern dashboard (Stripe/Vercel inspired)
// ═══════════════════════════════════════════════════════════════

"use client";

import { cloneElement, isValidElement } from "react";
import { ArrowDownRight, ArrowUpRight, BarChart3, Minus } from "lucide-react";
import Card from "@/components/ui/Card";

// ─────────────────────────────────────────────
//  ICON BOX VARIANT STYLES
// ─────────────────────────────────────────────
const variantStyles = {
  default: "bg-brand-50 text-brand-800 ring-1 ring-brand-100",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  danger: "bg-red-50 text-red-700 ring-1 ring-red-100",
};

// ─────────────────────────────────────────────
//  TREND STYLES
// ─────────────────────────────────────────────
const trendStyles = {
  up: {
    icon: ArrowUpRight,
    badge: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  down: {
    icon: ArrowDownRight,
    badge: "border border-red-200 bg-red-50 text-red-700",
  },
  neutral: {
    icon: Minus,
    badge: "border border-slate-200 bg-slate-50 text-slate-600",
  },
};

// ─────────────────────────────────────────────
//  HELPER: Render Icon
//  Supports both:
//    icon={Users}      → Component reference
//    icon={<Users />}  → JSX element
// ─────────────────────────────────────────────
function renderIcon(icon) {
  if (isValidElement(icon)) {
    return cloneElement(icon, {
      className: ["h-6 w-6", icon.props.className].filter(Boolean).join(" "),
      "aria-hidden": true,
    });
  }

  if (typeof icon === "function") {
    const Icon = icon;
    return <Icon className="h-6 w-6" aria-hidden="true" />;
  }

  return <BarChart3 className="h-6 w-6" aria-hidden="true" />;
}

// ─────────────────────────────────────────────
//  STAT CARD COMPONENT
// ─────────────────────────────────────────────
function StatCard({
  title = "Untitled Metric",
  value = "0",
  icon = BarChart3,
  variant = "default",
  trend = "neutral",
  change,
  subtitle,
  href,
  onClick,
  className = "",
  ...rest
}) {
  const iconBoxStyles = variantStyles[variant] || variantStyles.default;
  const currentTrend = trendStyles[trend] || trendStyles.neutral;
  const TrendIcon = currentTrend.icon;

  return (
    <Card
      variant="elevated"
      padding="none"
      href={href}
      onClick={onClick}
      className={["h-full", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <div className="flex h-full flex-col gap-6 p-6">
        {/* ═══ Top Row: Icon + Trend Pill ═══ */}
        <div className="flex items-start justify-between gap-4">
          {/* Icon Box */}
          <div
            className={[
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
              iconBoxStyles,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {renderIcon(icon)}
          </div>

          {/* Trend Pill */}
          {change ? (
            <div
              className={[
                "tabular-nums inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold",
                currentTrend.badge,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{change}</span>
            </div>
          ) : null}
        </div>

        {/* ═══ Value (Big Number) ═══ */}
        <div className="space-y-1">
          <p className="tabular-nums text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>

        {/* ═══ Bottom: Title + Subtitle ═══ */}
        <div className="mt-auto space-y-1">
          <p className="text-sm font-medium text-slate-700">{title}</p>

          {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
