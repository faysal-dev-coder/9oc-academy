"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  MousePointerClick,
  TextCursorInput,
  Tag,
  Square,
  Layers,
  LayoutGrid,
  FormInput,
  Filter,
  Inbox,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const components = [
  {
    href: "/showcase/button",
    name: "Button",
    description: "5 variants, 3 sizes, icons, loading states",
    icon: MousePointerClick,
    status: "ready",
    variants: "5",
  },
  {
    href: "/showcase/input",
    name: "Input",
    description: "Forms input with label, helper, error, password toggle",
    icon: TextCursorInput,
    status: "ready",
    variants: "2",
  },
  {
    href: "/showcase/badge",
    name: "Badge",
    description: "Status, labels, filter chips, removable tags",
    icon: Tag,
    status: "ready",
    variants: "15",
  },
  {
    href: "/showcase/card",
    name: "Card",
    description: "Container with Header, Body, Footer sub-components",
    icon: Square,
    status: "ready",
    variants: "4",
  },
  {
    href: "/showcase/modal",
    name: "Modal",
    description: "Overlay dialogs with focus trap and animations",
    icon: Layers,
    status: "soon",
  },
  {
    href: "/showcase/stat-card",
    name: "StatCard",
    description: "Dashboard metrics with trend indicators",
    icon: LayoutGrid,
    status: "soon",
  },
  {
    href: "/showcase/page-header",
    name: "PageHeader",
    description: "Page title with breadcrumbs and actions",
    icon: FormInput,
    status: "soon",
  },
  {
    href: "/showcase/filter-bar",
    name: "FilterBar",
    description: "Search + filter chips combo",
    icon: Filter,
    status: "soon",
  },
  {
    href: "/showcase/empty-state",
    name: "EmptyState",
    description: "No data placeholder with action button",
    icon: Inbox,
    status: "soon",
  },
  {
    href: "/showcase/confirm-dialog",
    name: "ConfirmDialog",
    description: "Delete/action confirmation dialog",
    icon: AlertCircle,
    status: "soon",
  },
];

export default function ShowcaseIndex() {
  const readyCount = components.filter((c) => c.status === "ready").length;
  const totalCount = components.length;
  const progress = Math.round((readyCount / totalCount) * 100);

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto">
        {/* ── HEADER ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="sm">
              Phase 2
            </Badge>
            <Badge variant="success" size="sm" dot>
              In Progress
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Component Showcase</h1>
          <p className="text-slate-500 mt-2">
            9OC Academy এর সব reusable components এক জায়গায়। Click করে individual component দেখো।
          </p>
        </div>

        {/* ── PROGRESS CARD ── */}
        <Card variant="elevated" padding="lg" className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Build Progress</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {readyCount} of {totalCount} components ready
              </p>
            </div>
            <div className="text-3xl font-bold text-brand-800">{progress}%</div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-800 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {/* ── COMPONENTS GRID ── */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            All Components ({totalCount})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((comp) => {
              const Icon = comp.icon;
              const isReady = comp.status === "ready";

              return (
                <Link
                  key={comp.href}
                  href={isReady ? comp.href : "#"}
                  onClick={(e) => !isReady && e.preventDefault()}
                  className={isReady ? "" : "cursor-not-allowed"}
                >
                  <Card
                    variant="default"
                    padding="md"
                    className={[
                      "h-full transition-all duration-150",
                      isReady
                        ? "hover:border-brand-400 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                        : "opacity-60",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      {isReady ? (
                        <Badge variant="success" size="sm" dot>
                          Ready
                        </Badge>
                      ) : (
                        <Badge variant="default" size="sm">
                          Soon
                        </Badge>
                      )}
                    </div>
                    <Card.Title>{comp.name}</Card.Title>
                    <Card.Description className="mt-1">{comp.description}</Card.Description>
                    {comp.variants && (
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-500">{comp.variants} variants</span>
                        {isReady && <ArrowRight size={14} className="text-brand-600" />}
                      </div>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
