// components/admin/AdminHeader.jsx
// ═══════════════════════════════════════════════════════════════
// 🎨 Admin Header — Premium Light Theme
// Phase 7 — Chat 27
// ├── Mobile menu toggle
// ├── Dynamic page title (from route)
// ├── Notification bell with count
// ├── Admin profile dropdown
// └── Logout functionality
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import {
  HiBars3,
  HiBell,
  HiChevronDown,
  HiArrowRightOnRectangle,
  HiHome,
  HiCog6Tooth,
  HiShieldCheck,
} from "react-icons/hi2";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

// ═══════════════════════════════════
// PAGE TITLE MAPPER
// ═══════════════════════════════════
const pageTitles = {
  "/admin": { title: "Dashboard", subtitle: "Welcome back" },
  "/admin/users": { title: "Users", subtitle: "Manage all users" },
  "/admin/courses": { title: "Courses", subtitle: "Manage courses" },
  "/admin/exams": { title: "Exams", subtitle: "Manage exams" },
  "/admin/questions": { title: "Questions", subtitle: "Question bank" },
  "/admin/categories": { title: "Categories", subtitle: "Manage categories" },
  "/admin/payments": { title: "Payments", subtitle: "Payment requests" },
  "/admin/notifications": { title: "Notifications", subtitle: "System notifications" },
};

const getPageTitle = (pathname) => {
  // Exact match first
  if (pageTitles[pathname]) return pageTitles[pathname];

  // Partial match for nested routes
  const match = Object.keys(pageTitles)
    .filter((key) => pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];

  return pageTitles[match] || { title: "Admin Panel", subtitle: "9OC Academy" };
};

// ═══════════════════════════════════
// USER AVATAR COMPONENT
// ═══════════════════════════════════
function UserAvatar({ avatarUrl, letter, size = "sm" }) {
  const sizeClasses = size === "lg" ? "h-10 w-10 text-base" : "h-8 w-8 text-sm";

  if (avatarUrl) {
    return (
      <div className={`relative ${sizeClasses} shrink-0 overflow-hidden rounded-lg`}>
        <Image
          src={avatarUrl}
          alt="Avatar"
          fill
          className="object-cover"
          unoptimized
          sizes={size === "lg" ? "40px" : "32px"}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-lg font-bold text-white`}
      style={{
        background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
      }}
    >
      {letter}
    </div>
  );
}

// ═══════════════════════════════════
// NOTIFICATION BELL
// ═══════════════════════════════════
function NotificationBell({ count = 0 }) {
  return (
    <Link
      href="/admin/notifications"
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#475569] transition-all hover:border-[#1E9CD7]/30 hover:bg-[#F8FAFC] hover:text-[#1E9CD7]"
      aria-label="Notifications"
    >
      <HiBell className="text-lg" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#DC2626] px-1 text-[10px] font-bold text-white shadow-sm">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

// ═══════════════════════════════════
// ADMIN PROFILE DROPDOWN
// ═══════════════════════════════════
function AdminProfileDropdown({ user, profile, onLogout }) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

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

  // Animate dropdown
  useEffect(() => {
    if (open && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
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
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 transition-all hover:border-[#1E9CD7]/30 hover:bg-[#F8FAFC]"
      >
        <UserAvatar avatarUrl={avatarUrl} letter={avatarLetter} size="sm" />
        <span className="hidden text-sm font-medium text-[#1F2937] sm:block">
          {displayName.split(" ")[0]}
        </span>
        <HiChevronDown
          className={`text-sm text-[#64748B] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xl"
        >
          {/* User Info Header */}
          <div
            className="px-4 py-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,156,215,0.08) 0%, rgba(10,90,138,0.04) 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <UserAvatar avatarUrl={avatarUrl} letter={avatarLetter} size="lg" />
              <div className="min-w-0">
                <p className="truncate font-bold text-[#1F2937]">{displayName}</p>
                <p className="truncate text-xs text-[#64748B]">{user?.email}</p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#FBBF24]/15 px-2 py-0.5 text-xs font-medium text-[#D97706]">
                  <HiShieldCheck className="text-xs" />
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#475569] transition-all hover:bg-[#F1F5F9] hover:text-[#1F2937]"
            >
              <HiHome className="shrink-0 text-lg" />
              View Public Site
            </Link>
            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#475569] transition-all hover:bg-[#F1F5F9] hover:text-[#1F2937]"
            >
              <HiCog6Tooth className="shrink-0 text-lg" />
              Profile Settings
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-[#E2E8F0] p-2">
            <button
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#DC2626] transition-all hover:bg-[#DC2626]/8 disabled:opacity-60"
            >
              {isLoggingOut ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#DC2626]/30 border-t-[#DC2626]" />
                  Logging out...
                </>
              ) : (
                <>
                  <HiArrowRightOnRectangle className="shrink-0 text-lg" />
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

// ═══════════════════════════════════
// MAIN HEADER COMPONENT
// ═══════════════════════════════════
export default function AdminHeader({ onMenuClick }) {
  const pathname = usePathname();
  const { user, profile } = useUser();
  const { logout } = useAuth();
  const [notificationCount] = useState(0); // Will be dynamic later

  const { title, subtitle } = getPageTitle(pathname);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.warn("Logout error (ignored):", error);
    }
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* ═══ Left: Mobile Menu + Title ═══ */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="rounded-xl border border-[#E2E8F0] bg-white p-2.5 text-[#475569] transition-all hover:border-[#1E9CD7]/30 hover:bg-[#F8FAFC] hover:text-[#1E9CD7] lg:hidden"
            aria-label="Open menu"
          >
            <HiBars3 className="text-xl" />
          </button>

          {/* Page Title */}
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[#1F2937] sm:text-xl truncate">{title}</h1>
            <p className="text-xs text-[#64748B] sm:text-sm truncate">
              {subtitle}
              {profile?.full_name && pathname === "/admin" && <span>, {profile.full_name}</span>}
            </p>
          </div>
        </div>

        {/* ═══ Right: Notifications + Profile ═══ */}
        <div className="flex items-center gap-3">
          <NotificationBell count={notificationCount} />
          <AdminProfileDropdown user={user} profile={profile} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}
