// components/layout/Navbar.jsx
// ═══════════════════════════════════════════════════════════════
// 🧭 Premium Navbar — Light Theme
// Phase 6B — Chat 23
// ├── White background with subtle shadow on scroll
// ├── Hi2 Icons (Heroicons v2 Outline)
// ├── Light dropdown & mobile menu
// ├── Avatar integration
// └── All functionality preserved
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import {
  HiBars3,
  HiXMark,
  HiChevronDown,
  HiAcademicCap,
  HiClipboardDocumentList,
  HiTrophy,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiArrowLeftOnRectangle,
  HiUserPlus,
} from "react-icons/hi2";
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
  { href: "/dashboard", label: "Dashboard", icon: HiAcademicCap },
  { href: "/dashboard/history", label: "পরীক্ষার ইতিহাস", icon: HiClipboardDocumentList },
  { href: "/dashboard/analytics", label: "আমার Results", icon: HiTrophy },
  { href: "/leaderboard", label: "লিডারবোর্ড", icon: HiTrophy },
  { href: "/dashboard/profile", label: "Profile Settings", icon: HiCog6Tooth },
];

// ══════════════════════════════════
// AVATAR COMPONENT (Image or Letter)
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
      className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-lg font-bold text-white`}
      style={{
        background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
      }}
    >
      {letter}
    </div>
  );
}

// ══════════════════════════════════
// PROFILE DROPDOWN COMPONENT (Light)
// ══════════════════════════════════
function ProfileDropdown({ user, profile, onLogout }) {
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
      {/* Trigger Button — Light */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 transition-all duration-300 hover:border-[#1E9CD7]/30 hover:bg-[#F1F5F9]"
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

      {/* Dropdown Menu — Light */}
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
                {isAdmin && (
                  <span className="mt-1 inline-block rounded-full bg-[#FBBF24]/15 px-2 py-0.5 text-xs font-medium text-[#D97706]">
                    👑 Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {profileMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-[#1E9CD7]/10 font-medium text-[#1E9CD7]"
                    : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1F2937]"
                }`}
              >
                <item.icon className="shrink-0 text-lg" />
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#D97706] transition-all duration-200 hover:bg-[#FBBF24]/10"
              >
                <HiCog6Tooth className="shrink-0 text-lg" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Logout */}
          <div className="border-t border-[#E2E8F0] p-2">
            <button
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#DC2626] transition-all duration-200 hover:bg-[#DC2626]/8 disabled:opacity-60"
            >
              {isLoggingOut ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#DC2626]/30 border-t-[#DC2626]" />
                  লগ আউট হচ্ছে...
                </>
              ) : (
                <>
                  <HiArrowRightOnRectangle className="shrink-0 text-lg" />
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
// AUTH BUTTONS (Not Logged In — Light)
// ══════════════════════════════════
function AuthButtons() {
  return (
    <>
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-all hover:border-[#1E9CD7]/30 hover:bg-[#F1F5F9] hover:text-[#1F2937]"
      >
        <HiArrowLeftOnRectangle className="text-base" />
        লগইন
      </Link>
      <Link
        href="/register"
        className="flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg"
        style={{
          background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
          boxShadow: "0 4px 15px rgba(30,156,215,0.3)",
        }}
      >
        <HiUserPlus className="text-base" />
        রেজিস্ট্রেশন
      </Link>
    </>
  );
}

// ══════════════════════════════════
// MAIN NAVBAR — Light Theme
// ══════════════════════════════════
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

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

  // Entry animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

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
      return <div className="h-10 w-32 animate-pulse rounded-xl bg-[#E2E8F0]" />;
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
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#E2E8F0] bg-white/95 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* ═══ Logo ═══ */}
            <Logo />

            {/* ═══ Desktop Nav Links ═══ */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "bg-[#1E9CD7]/10 text-[#1E9CD7]"
                      : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1F2937]"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#1E9CD7]" />
                  )}
                </Link>
              ))}
            </div>

            {/* ═══ Desktop Auth / Profile ═══ */}
            <div className="hidden items-center gap-3 md:flex">{renderAuthSection()}</div>

            {/* ═══ Mobile Menu Button ═══ */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 text-[#475569] transition-all hover:bg-[#F1F5F9] hover:text-[#1F2937] md:hidden"
            >
              {mobileOpen ? <HiXMark className="text-xl" /> : <HiBars3 className="text-xl" />}
            </button>
          </div>
        </div>

        {/* ═══ Mobile Menu — Light ═══ */}
        {mobileOpen && (
          <div className="border-t border-[#E2E8F0] bg-white px-4 pb-4 pt-2 md:hidden">
            {/* Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-[#1E9CD7]/10 text-[#1E9CD7]"
                      : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1F2937]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Section (Mobile) */}
            <div className="mt-3 border-t border-[#E2E8F0] pt-3">
              {!mounted || userLoading ? (
                <div className="h-10 animate-pulse rounded-xl bg-[#E2E8F0]" />
              ) : user ? (
                <div className="space-y-1">
                  {/* User Info Card */}
                  <div className="mb-2 flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">
                    <UserAvatar
                      avatarUrl={profile?.avatar_url}
                      letter={mobileAvatarLetter}
                      size="lg"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#1F2937]">
                        {profile?.full_name || user?.email?.split("@")[0]}
                      </p>
                      <p className="truncate text-xs text-[#64748B]">{user?.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all ${
                        pathname === item.href
                          ? "bg-[#1E9CD7]/10 font-medium text-[#1E9CD7]"
                          : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1F2937]"
                      }`}
                    >
                      <item.icon className="shrink-0 text-lg" />
                      {item.label}
                    </Link>
                  ))}

                  {/* Admin Link */}
                  {profile?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-[#D97706] hover:bg-[#FBBF24]/10"
                    >
                      <HiCog6Tooth className="shrink-0 text-lg" />
                      Admin Panel
                    </Link>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-[#DC2626] hover:bg-[#DC2626]/8"
                  >
                    <HiArrowRightOnRectangle className="shrink-0 text-lg" />
                    লগ আউট
                  </button>
                </div>
              ) : (
                /* Guest Auth Buttons */
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] py-3 text-sm font-medium text-[#475569] hover:border-[#1E9CD7]/30 hover:bg-[#F1F5F9] hover:text-[#1F2937]"
                  >
                    <HiArrowLeftOnRectangle className="text-base" />
                    লগইন
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
                    style={{
                      background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
                    }}
                  >
                    <HiUserPlus className="text-base" />
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
