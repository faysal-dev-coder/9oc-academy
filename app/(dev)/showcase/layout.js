"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  MousePointerClick,
  TextCursorInput,
  Tag,
  Square,
  Layers,
  FormInput,
  Filter,
  Inbox,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────
//  COMPONENT NAVIGATION LIST
// ─────────────────────────────────────────────
const navSections = [
  {
    title: "Overview",
    items: [{ href: "/showcase", label: "All Components", icon: LayoutGrid }],
  },
  {
    title: "UI Primitives",
    items: [
      { href: "/showcase/button", label: "Button", icon: MousePointerClick, status: "ready" },
      { href: "/showcase/input", label: "Input", icon: TextCursorInput, status: "ready" },
      { href: "/showcase/badge", label: "Badge", icon: Tag, status: "ready" },
      { href: "/showcase/card", label: "Card", icon: Square, status: "ready" },
      { href: "/showcase/modal", label: "Modal", icon: Layers, status: "soon" },
    ],
  },
  {
    title: "Admin Shared",
    items: [
      { href: "/showcase/stat-card", label: "StatCard", icon: LayoutGrid, status: "soon" },
      { href: "/showcase/page-header", label: "PageHeader", icon: FormInput, status: "soon" },
      { href: "/showcase/filter-bar", label: "FilterBar", icon: Filter, status: "soon" },
      { href: "/showcase/empty-state", label: "EmptyState", icon: Inbox, status: "soon" },
      {
        href: "/showcase/confirm-dialog",
        label: "ConfirmDialog",
        icon: AlertCircle,
        status: "soon",
      },
    ],
  },
];

export default function ShowcaseLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        {/* Logo / Title */}
        <div className="p-5 border-b border-slate-200">
          <Link href="/showcase" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              9
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">9OC Showcase</div>
              <div className="text-xs text-slate-500">Component Library</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
                {section.title}
              </h3>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const isReady = item.status === "ready" || !item.status;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={isReady ? item.href : "#"}
                      onClick={(e) => !isReady && e.preventDefault()}
                      className={[
                        "flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                        isActive
                          ? "bg-brand-50 text-brand-800 font-medium"
                          : isReady
                            ? "text-slate-700 hover:bg-slate-100"
                            : "text-slate-400 cursor-not-allowed",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-2">
                        <Icon size={16} />
                        {item.label}
                      </span>
                      {item.status === "soon" && (
                        <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          Soon
                        </span>
                      )}
                      {item.status === "ready" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-slate-700">Phase 2</span>
            </div>
            <div className="mt-1">Building Components...</div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
