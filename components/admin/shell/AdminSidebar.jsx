"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  HelpCircle,
  Tag,
  CreditCard,
  Bell,
  Home,
  ShieldCheck,
  X,
  ChevronRight,
  Sparkles,
  Check,
} from "lucide-react";

// ─────────────────────────────────────────────
//  NAV MENU — Grouped structure
// ─────────────────────────────────────────────
const menuGroups = [
  {
    title: null,
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
    ],
  },
  {
    title: "Management",
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/exams", label: "Exams", icon: ClipboardList },
      { href: "/admin/questions", label: "Questions", icon: HelpCircle },
      { href: "/admin/categories", label: "Categories", icon: Tag },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        href: "/admin/payments",
        label: "Payments",
        icon: CreditCard,
        badge: 0,
      },
    ],
  },
  {
    title: "System",
    items: [{ href: "/admin/notifications", label: "Notifications", icon: Bell }],
  },
];

// ─────────────────────────────────────────────
//  SECTION HEADER — Premium with dot + line accent
// ─────────────────────────────────────────────
function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 px-3 mb-3">
      <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
        {title}
      </span>
      <span
        className="flex-1 h-px bg-linear-to-r from-slate-200 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
//  NAV ITEM — Premium with hover/active states
// ─────────────────────────────────────────────
function NavItem({ item, isActive, onItemClick }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onItemClick}
      className={[
        "group relative flex items-center justify-between gap-3",
        "px-3 py-2.5 rounded-lg",
        "text-sm font-medium",
        "transition-all duration-200 ease-out",
        isActive
          ? "bg-linear-to-r from-brand-50 to-brand-100/40 text-brand-800 font-semibold"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:pl-4",
      ].join(" ")}
    >
      {/* ── Active left gradient bar ── */}
      {isActive && (
        <span
          className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-linear-to-b from-brand-700 to-brand-500 shadow-sm shadow-brand-800/30"
          aria-hidden="true"
        />
      )}

      {/* ── Icon + Label ── */}
      <div className="flex items-center gap-3">
        <Icon
          size={18}
          className={[
            "shrink-0 transition-all duration-200",
            isActive
              ? "text-brand-700 drop-shadow-sm"
              : "text-slate-400 group-hover:text-slate-700 group-hover:scale-110",
          ].join(" ")}
        />
        <span>{item.label}</span>
      </div>

      {/* ── Right side: Badge OR Active arrow ── */}
      {item.badge > 0 ? (
        <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white shadow-sm shadow-red-600/30">
          {item.badge}
        </span>
      ) : isActive ? (
        <ChevronRight
          size={14}
          className="text-brand-700 transition-transform duration-200"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}

// ─────────────────────────────────────────────
//  ADMIN SIDEBAR — Main Component
// ─────────────────────────────────────────────
export default function AdminSidebar({ isOpen = false, onClose }) {
  const pathname = usePathname();

  const isActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* ── Mobile Backdrop ── */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden animate-in"
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={[
          "fixed left-0 top-0 z-50",
          "flex h-screen w-72 flex-col",
          "bg-white border-r border-slate-200",
          "transition-transform duration-300 ease-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* ═══════════════════════════════════════════
            BRAND HEADER — h-16 (match topbar)
            ═══════════════════════════════════════════ */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-200">
          <Link href="/admin" className="flex items-center gap-3 group" onClick={onClose}>
            {/* Icon with gradient + glow */}
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-brand-700 to-brand-900 text-white shadow-md shadow-brand-900/30 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-900/40">
                <ShieldCheck size={18} className="drop-shadow-sm" />
              </div>
              {/* Sparkle accent */}
              <div
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-500/50 animate-pulse"
                aria-hidden="true"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight tracking-tight">
                9OC Admin
              </h1>
              <p className="text-xs text-slate-500 leading-tight">Control Panel</p>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-150"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* ═══════════════════════════════════════════
            NAVIGATION
            ═══════════════════════════════════════════ */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className={groupIdx > 0 ? "mt-6" : ""}>
              {group.title && <SectionHeader title={group.title} />}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={isActive(item)}
                    onItemClick={onClose}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* ═══════════════════════════════════════════
            PREMIUM FOOTER CARD — Library status
            ═══════════════════════════════════════════ */}
        <div className="px-4 pb-3">
          <div className="relative overflow-hidden rounded-xl border border-brand-200 bg-linear-to-br from-brand-50 via-white to-brand-100/50 p-4 shadow-sm">
            {/* Decorative sparkle */}
            <div className="absolute top-2 right-2 opacity-40">
              <Sparkles size={14} className="text-brand-600" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-800 text-white shadow-sm shadow-brand-800/30">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-900 leading-tight">
                  Component Library
                </div>
                <div className="text-xs text-brand-700 font-medium leading-tight">
                  100% Complete
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-brand-600 to-brand-800 rounded-full shadow-sm"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-brand-700 font-medium">
                <span>10/10 Components</span>
                <span>Ready</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/showcase"
              className="flex items-center justify-between text-xs font-semibold text-brand-800 hover:text-brand-900 transition-colors duration-150 group"
            >
              <span>View Showcase</span>
              <ChevronRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            FOOTER: Back to Website
            ═══════════════════════════════════════════ */}
        <div className="border-t border-slate-200 p-4">
          <Link
            href="/"
            onClick={onClose}
            className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
          >
            <Home
              size={16}
              className="text-slate-400 group-hover:text-brand-700 group-hover:scale-110 transition-all duration-200"
            />
            <span>Back to Website</span>
            <ChevronRight
              size={14}
              className="ml-auto text-slate-400 group-hover:text-brand-700 group-hover:translate-x-0.5 transition-all duration-200"
            />
          </Link>
        </div>
      </aside>
    </>
  );
}
