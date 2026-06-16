// components/admin/shared/PageHeader.jsx
// ═══════════════════════════════════════════════════════════════
// 📰 Premium PageHeader — Admin Page Title Bar
// ⭐ Phase 2: Admin Shared Component
// ⭐ Style: Linear/Notion inspired (clean & minimal)
// ⭐ Features: Breadcrumbs + Title + Badge + Actions
// ═══════════════════════════════════════════════════════════════

"use client";

import Link from "next/link";
import { Fragment } from "react";
import Badge from "@/components/ui/Badge";

// ─────────────────────────────────────────────
//  BREADCRUMBS SUB-COMPONENT
// ─────────────────────────────────────────────
function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-3">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <Fragment key={`${item.label}-${idx}`}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-brand-700 transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "text-slate-700 font-medium" : ""}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>

              {!isLast && (
                <li aria-hidden="true" className="text-slate-300">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

// ─────────────────────────────────────────────
//  PAGE HEADER COMPONENT
// ─────────────────────────────────────────────
export default function PageHeader({
  title = "Untitled Page",
  description,
  breadcrumbs,
  badge,
  actions,
  className = "",
}) {
  return (
    <header
      className={["pb-6 mb-6 border-b border-slate-200", className].filter(Boolean).join(" ")}
    >
      {/* ═══ Breadcrumbs (optional) ═══ */}
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

      {/* ═══ Main Row: Title + Actions ═══ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* LEFT: Title + Badge + Description */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>

            {badge && (
              <Badge
                variant={badge.variant || "default"}
                appearance={badge.appearance || "soft"}
                size={badge.size || "md"}
                dot={badge.dot}
                icon={badge.icon}
              >
                {badge.label}
              </Badge>
            )}
          </div>

          {description && (
            <p className="mt-1.5 text-sm text-slate-500 sm:text-base">{description}</p>
          )}
        </div>

        {/* RIGHT: Actions */}
        {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
