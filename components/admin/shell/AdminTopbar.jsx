"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Home,
  Settings,
  ShieldCheck,
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  HelpCircle,
  Tag,
  CreditCard,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

// ─────────────────────────────────────────────
//  PAGE CONFIG — Title + Subtitle + Icon
// ─────────────────────────────────────────────
const pageConfig = {
  "/admin": { title: "Dashboard", subtitle: "Welcome back", icon: LayoutDashboard },
  "/admin/users": { title: "Users", subtitle: "Manage all users", icon: Users },
  "/admin/courses": { title: "Courses", subtitle: "Manage courses", icon: BookOpen },
  "/admin/exams": { title: "Exams", subtitle: "Manage exams", icon: ClipboardList },
  "/admin/questions": { title: "Questions", subtitle: "Question bank", icon: HelpCircle },
  "/admin/categories": { title: "Categories", subtitle: "Manage categories", icon: Tag },
  "/admin/payments": { title: "Payments", subtitle: "Payment requests", icon: CreditCard },
  "/admin/notifications": {
    title: "Notifications",
    subtitle: "System notifications",
    icon: Bell,
  },
};

function getPageConfig(pathname) {
  if (pageConfig[pathname]) return pageConfig[pathname];

  const match = Object.keys(pageConfig)
    .filter((key) => pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];

  return (
    pageConfig[match] || {
      title: "Admin Panel",
      subtitle: "9OC Academy",
      icon: LayoutDashboard,
    }
  );
}

// ─────────────────────────────────────────────
//  USER AVATAR — With online indicator
// ─────────────────────────────────────────────
function UserAvatar({ avatarUrl, letter, size = "sm", showOnline = false, ring = false }) {
  const sizeClass = size === "lg" ? "h-11 w-11 text-base" : "h-7 w-7 text-xs";
  const dotSize = size === "lg" ? "w-3 h-3" : "w-2 h-2";

  return (
    <div className="relative shrink-0">
      {avatarUrl ? (
        <div
          className={[
            "relative overflow-hidden rounded-full",
            sizeClass,
            ring ? "ring-2 ring-brand-200 ring-offset-2 ring-offset-white" : "",
          ].join(" ")}
        >
          <Image
            src={avatarUrl}
            alt="Avatar"
            fill
            className="object-cover"
            unoptimized
            sizes={size === "lg" ? "44px" : "28px"}
          />
        </div>
      ) : (
        <div
          className={[
            "flex items-center justify-center rounded-full",
            "bg-linear-to-br from-brand-700 to-brand-900",
            "font-bold text-white shadow-sm shadow-brand-900/20",
            sizeClass,
            ring ? "ring-2 ring-brand-200 ring-offset-2 ring-offset-white" : "",
          ].join(" ")}
        >
          {letter}
        </div>
      )}

      {/* Online indicator */}
      {showOnline && (
        <span
          className={[
            "absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-2 ring-white",
            dotSize,
          ].join(" ")}
          aria-label="Online"
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  NOTIFICATION BELL — Ghost style modern
// ─────────────────────────────────────────────
function NotificationBell({ count = 0 }) {
  const hasCount = count > 0;

  return (
    <Link
      href="/admin/notifications"
      className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
      aria-label="Notifications"
    >
      <Bell
        size={18}
        className={[
          "transition-transform duration-300",
          hasCount ? "group-hover:rotate-12" : "group-hover:scale-110",
        ].join(" ")}
      />
      {hasCount && (
        <>
          {/* Pulse ring + badge */}
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-700 px-1 text-[10px] font-bold text-white shadow-sm shadow-red-600/40">
              {count > 99 ? "99+" : count}
            </span>
          </span>
        </>
      )}
    </Link>
  );
}

// ─────────────────────────────────────────────
//  PROFILE DROPDOWN — Pill style trigger
// ─────────────────────────────────────────────
function ProfileDropdown({ user, profile, onLogout }) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on ESC key
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Admin";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const avatarUrl = profile?.avatar_url;

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    setOpen(false);
    await onLogout();
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* ── Trigger Button — Pill shape, name first ── */}
      <button
        onClick={() => setOpen(!open)}
        className={[
          "flex items-center gap-2 rounded-full pl-3 pr-2 py-1.5",
          "transition-all duration-200",
          open ? "bg-brand-50 ring-1 ring-brand-200" : "bg-slate-50 hover:bg-slate-100",
        ].join(" ")}
      >
        <span className="hidden text-sm font-semibold text-slate-900 sm:block">
          {displayName.split(" ")[0]}
        </span>
        <UserAvatar avatarUrl={avatarUrl} letter={avatarLetter} size="sm" showOnline />
        <ChevronDown
          size={14}
          className={[
            "text-slate-500 transition-transform duration-200",
            open ? "rotate-180 text-brand-700" : "",
          ].join(" ")}
        />
      </button>

      {/* ── Dropdown Menu ── */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 animate-in">
          {/* ═══ User Info Header — Gradient ═══ */}
          <div className="relative overflow-hidden bg-linear-to-br from-brand-50 via-white to-brand-100/40 px-4 py-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <UserAvatar avatarUrl={avatarUrl} letter={avatarLetter} size="lg" showOnline ring />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-slate-900 leading-tight">{displayName}</p>
                <p className="truncate text-xs text-slate-500 mt-0.5">{user?.email}</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-linear-to-r from-amber-100 to-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-700 shadow-sm">
                  <ShieldCheck size={11} />
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* ═══ Menu Items ═══ */}
          <div className="p-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-all duration-150 hover:bg-slate-50 hover:text-slate-900"
            >
              <div className="flex items-center gap-3">
                <Home
                  size={16}
                  className="shrink-0 text-slate-400 group-hover:text-brand-700 group-hover:scale-110 transition-all duration-200"
                />
                <span className="font-medium">View Public Site</span>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-300 group-hover:text-brand-700 group-hover:translate-x-0.5 transition-all duration-200"
              />
            </Link>
            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-all duration-150 hover:bg-slate-50 hover:text-slate-900"
            >
              <div className="flex items-center gap-3">
                <Settings
                  size={16}
                  className="shrink-0 text-slate-400 group-hover:text-brand-700 group-hover:scale-110 transition-all duration-200"
                />
                <span className="font-medium">Profile Settings</span>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-300 group-hover:text-brand-700 group-hover:translate-x-0.5 transition-all duration-200"
              />
            </Link>
          </div>

          {/* ═══ Logout ═══ */}
          <div className="border-t border-slate-200 p-2 bg-slate-50/50">
            <button
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-150 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut
                    size={16}
                    className="shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200"
                  />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  ADMIN TOPBAR — Main Component
// ─────────────────────────────────────────────
export default function AdminTopbar({ onMenuClick }) {
  const pathname = usePathname();
  const { user, profile } = useUser();
  const { logout } = useAuth();
  const [notificationCount] = useState(0);

  const { title, subtitle, icon: PageIcon } = getPageConfig(pathname);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.warn("Logout error (ignored):", error);
    }
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════════
            LEFT: Mobile Menu + Page Title with Icon
            ═══════════════════════════════════════════ */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={onMenuClick}
            className="lg:hidden rounded-lg p-2 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Page Icon */}
          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-brand-50 to-brand-100/60 border border-brand-100 shadow-sm shrink-0">
            <PageIcon size={16} className="text-brand-700" />
          </div>

          {/* Page Title + Subtitle */}
          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-900 sm:text-lg truncate leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-xs text-slate-500 truncate leading-tight mt-0.5">
              {subtitle}
              {profile?.full_name && pathname === "/admin" && <span>, {profile.full_name}</span>}
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            RIGHT: Bell │ User Trigger (with divider)
            ═══════════════════════════════════════════ */}
        <div className="flex items-center gap-2">
          <NotificationBell count={notificationCount} />

          {/* ── Vertical Divider ── */}
          <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

          <ProfileDropdown user={user} profile={profile} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}
