// components/layout/Navbar.jsx
// ═══════════════════════════════════════════════════════════════
// 🧭 Premium Navbar — Light Theme
// ✅ Lucide React icons
// ✅ Brand-800 color system
// ✅ Tailwind v4 standards
// ✅ All features preserved (dropdown, mobile, auth)
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  ClipboardList,
  Trophy,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Shield,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

// ══════════════════════════════════
// NAV LINKS
// ══════════════════════════════════
const navLinks = [
  { href: "/", label: "হোম" },
  { href: "/courses", label: "কোর্সসমূহ" },
  { href: "/exams", label: "পরীক্ষাসমূহ" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
];

// ══════════════════════════════════
// PROFILE DROPDOWN MENU
// ══════════════════════════════════
const profileMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: GraduationCap },
  { href: "/dashboard/history", label: "পরীক্ষার ইতিহাস", icon: ClipboardList },
  { href: "/dashboard/analytics", label: "আমার Results", icon: Trophy },
  { href: "/leaderboard", label: "লিডারবোর্ড", icon: Trophy },
  { href: "/dashboard/profile", label: "Profile Settings", icon: Settings },
];

// ══════════════════════════════════
// AVATAR COMPONENT
// ══════════════════════════════════
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
      className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-brand-700 to-brand-900 font-bold text-white`}
    >
      {letter}
    </div>
  );
}

// ══════════════════════════════════
// PROFILE DROPDOWN COMPONENT
// ══════════════════════════════════
function ProfileDropdown({ user, profile, onLogout }) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
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

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const avatarUrl = profile?.avatar_url;
  const isAdmin = profile?.role === "admin";

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
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition-all duration-150 hover:border-brand-300 hover:bg-slate-100"
      >
        <UserAvatar avatarUrl={avatarUrl} letter={avatarLetter} size="sm" />
        <span className="hidden text-sm font-medium text-slate-900 sm:block">
          {displayName.split(" ")[0]}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-500 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Info Header */}
          <div className="bg-linear-to-br from-brand-50 to-brand-100/50 px-4 py-4">
            <div className="flex items-center gap-3">
              <UserAvatar avatarUrl={avatarUrl} letter={avatarLetter} size="lg" />
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-900">{displayName}</p>
                <p className="truncate text-xs text-slate-600">{user?.email}</p>
                {isAdmin && (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                    <Shield className="h-3 w-3" />
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {profileMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-brand-50 font-medium text-brand-700"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-amber-700 transition-all duration-150 hover:bg-amber-50"
              >
                <Shield className="h-4 w-4 shrink-0" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Logout */}
          <div className="border-t border-slate-200 p-2">
            <button
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-all duration-150 hover:bg-red-50 disabled:opacity-60"
            >
              {isLoggingOut ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                  লগ আউট হচ্ছে...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4 shrink-0" />
                  লগ আউট
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════
// AUTH BUTTONS (Not Logged In)
// ══════════════════════════════════
function AuthButtons() {
  return (
    <>
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-150 hover:border-brand-300 hover:bg-slate-50 hover:text-slate-900"
      >
        <LogIn className="h-4 w-4" />
        লগইন
      </Link>
      <Link
        href="/register"
        className="flex items-center gap-2 rounded-lg bg-linear-to-br from-brand-700 to-brand-900 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-800/20 transition-all duration-150 hover:shadow-lg hover:shadow-brand-800/40"
      >
        <UserPlus className="h-4 w-4" />
        রেজিস্ট্রেশন
      </Link>
    </>
  );
}

// ══════════════════════════════════
// MAIN NAVBAR
// ══════════════════════════════════
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { user, profile, loading: userLoading } = useUser();
  const { logout } = useAuth();

  // Mount check
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.warn("Logout error (ignored):", error);
    }
    window.location.href = "/";
  };

  // Auth section renderer
  const renderAuthSection = () => {
    if (!mounted || userLoading) {
      return <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />;
    }
    if (user) {
      return <ProfileDropdown user={user} profile={profile} onLogout={handleLogout} />;
    }
    return <AuthButtons />;
  };

  const mobileAvatarLetter = (profile?.full_name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <>
      {/* ═══ NAVBAR ═══ */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav Links */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand-700" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth / Profile */}
            <div className="hidden items-center gap-3 md:flex">{renderAuthSection()}</div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-700 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ═══ Mobile Menu ═══ */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
            {/* Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Auth Section (Mobile) */}
            <div className="mt-3 border-t border-slate-200 pt-3">
              {!mounted || userLoading ? (
                <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
              ) : user ? (
                <div className="space-y-1">
                  {/* User Info Card */}
                  <div className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                    <UserAvatar
                      avatarUrl={profile?.avatar_url}
                      letter={mobileAvatarLetter}
                      size="lg"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {profile?.full_name || user?.email?.split("@")[0]}
                      </p>
                      <p className="truncate text-xs text-slate-600">{user?.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  {profileMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-all duration-150 ${
                          isActive
                            ? "bg-brand-50 font-medium text-brand-700"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}

                  {/* Admin Link */}
                  {profile?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-amber-700 transition-all duration-150 hover:bg-amber-50"
                    >
                      <Shield className="h-4 w-4 shrink-0" />
                      Admin Panel
                    </Link>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-600 transition-all duration-150 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    লগ আউট
                  </button>
                </div>
              ) : (
                /* Guest Auth Buttons */
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 text-sm font-medium text-slate-700 transition-all duration-150 hover:border-brand-300 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <LogIn className="h-4 w-4" />
                    লগইন
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-brand-700 to-brand-900 py-3 text-sm font-semibold text-white shadow-md shadow-brand-800/20"
                  >
                    <UserPlus className="h-4 w-4" />
                    রেজিস্ট্রেশন
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer — Navbar height */}
      <div className="h-16" />
    </>
  );
}
