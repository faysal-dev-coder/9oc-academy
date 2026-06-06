// components/layout/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaBook,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaTrophy,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import Logo from "@/components/shared/Logo";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

// ══════════════════════════════════
// NAV LINKS
// ══════════════════════════════════
const navLinks = [
  { href: "/", label: "হোম" },
  { href: "/courses", label: "কোর্সসমূহ" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
];

// ══════════════════════════════════
// PROFILE DROPDOWN MENU
// ══════════════════════════════════
const profileMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: HiAcademicCap },
  { href: "/my-courses", label: "আমার কোর্স", icon: FaBook },
  { href: "/my-results", label: "আমার Results", icon: FaTrophy },
  { href: "/attempts", label: "পরীক্ষার ইতিহাস", icon: FaClipboardList },
  { href: "/profile", label: "Profile Settings", icon: FaCog },
];

// ══════════════════════════════════
// PROFILE DROPDOWN COMPONENT
// ══════════════════════════════════
function ProfileDropdown({ user, profile, onLogout }) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const pathname = usePathname();

  // Route change হলে Close
  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Click Outside → Close
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

  // Dropdown Animation
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
  const isAdmin = profile?.role === "admin";

  // Logout Click Handler
  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    setOpen(false);
    await onLogout();
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 hover:border-primary/30 hover:bg-white/10"
      >
        {/* Avatar */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
          }}
        >
          {avatarLetter}
        </div>

        {/* Name */}
        <span className="hidden text-sm font-medium text-white/80 sm:block">
          {displayName.split(" ")[0]}
        </span>

        {/* Chevron */}
        <FaChevronDown
          className={`text-xs text-white/50 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A1A]/95 shadow-2xl backdrop-blur-xl"
        >
          {/* User Info Header */}
          <div
            className="px-4 py-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(0,212,170,0.08) 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
                }}
              >
                {avatarLetter}
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{displayName}</p>
                <p className="truncate text-xs text-white/50">{user?.email}</p>
                {isAdmin && (
                  <span className="mt-1 inline-block rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">
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
                    ? "bg-primary/20 text-primary"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="shrink-0 text-base" />
                {item.label}
              </Link>
            ))}

            {/* Admin Panel Link */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-accent transition-all duration-200 hover:bg-accent/10"
              >
                <FaCog className="shrink-0 text-base" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Divider + Logout */}
          <div className="border-t border-white/10 p-2">
            <button
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition-all duration-200 hover:bg-red-400/10 disabled:opacity-60"
            >
              {isLoggingOut ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
                  লগ আউট হচ্ছে...
                </>
              ) : (
                <>
                  <FaSignOutAlt className="shrink-0" />
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
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
      >
        <FaSignInAlt className="text-xs" />
        লগইন
      </Link>
      <Link
        href="/register"
        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80 hover:shadow-lg"
        style={{ boxShadow: "0 0 20px rgba(108,99,255,0.3)" }}
      >
        <FaUserPlus className="text-xs" />
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
  const navRef = useRef(null);

  // Auth Hooks
  const { user, profile, loading: userLoading } = useUser();
  const { logout } = useAuth();

  // Mount Check (Hydration Safe)
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Route change → Mobile Menu Close
  useEffect(() => {
    const timer = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Entrance Animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  // ⭐ LOGOUT HANDLER — WITH SAFETY TIMEOUT
  // ৩ সেকেন্ড এর মধ্যে signOut() Hang করলেও Force Redirect
  const handleLogout = async () => {
    console.log("🚪 [Navbar] handleLogout STARTED");

    // Safety: 3 sec পর Force Redirect (যদি signOut Hang করে)
    const safetyRedirect = setTimeout(() => {
      console.warn("⚠️ [Navbar] Safety timeout! Force redirect");
      window.location.href = "/";
    }, 3000);

    try {
      console.log("🔄 [Navbar] Calling logout()...");
      const result = await logout();
      console.log("✅ [Navbar] logout() returned:", result);

      clearTimeout(safetyRedirect);

      console.log("🏠 [Navbar] Redirecting to /...");
      window.location.href = "/";
    } catch (error) {
      console.error("💥 [Navbar] Logout error:", error);
      clearTimeout(safetyRedirect);
      window.location.href = "/";
    }
  };

  // Show Auth UI Logic
  const renderAuthSection = () => {
    if (!mounted || userLoading) {
      return <div className="h-10 w-32 animate-pulse rounded-xl bg-white/10" />;
    }
    if (user) {
      return <ProfileDropdown user={user} profile={profile} onLogout={handleLogout} />;
    }
    return <AuthButtons />;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#0A0A1A]/90 shadow-2xl backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* ── LOGO ── */}
            <Logo />

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "bg-primary/20 text-primary"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </div>

            {/* ── AUTH SECTION (Desktop) ── */}
            <div className="hidden items-center gap-3 md:flex">{renderAuthSection()}</div>

            {/* ── MOBILE MENU BUTTON ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 transition-all hover:text-white md:hidden"
            >
              {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#0A0A1A]/95 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden">
            {/* Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-primary/20 text-primary"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Section Mobile */}
            <div className="mt-3 border-t border-white/10 pt-3">
              {!mounted || userLoading ? (
                <div className="h-10 animate-pulse rounded-xl bg-white/10" />
              ) : user ? (
                // Logged In Mobile
                <div className="space-y-1">
                  {/* User Info */}
                  <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
                      }}
                    >
                      {(profile?.full_name || user?.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">
                        {profile?.full_name || user?.email?.split("@")[0]}
                      </p>
                      <p className="truncate text-xs text-white/50">{user?.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      <item.icon className="shrink-0" />
                      {item.label}
                    </Link>
                  ))}

                  {/* Admin Link */}
                  {profile?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-accent hover:bg-accent/10"
                    >
                      <FaCog className="shrink-0" />
                      Admin Panel
                    </Link>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10"
                  >
                    <FaSignOutAlt className="shrink-0" />
                    লগ আউট
                  </button>
                </div>
              ) : (
                // Not Logged In Mobile
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium text-white/80 hover:border-white/20 hover:text-white"
                  >
                    <FaSignInAlt className="text-xs" />
                    লগইন
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary/80"
                  >
                    <FaUserPlus className="text-xs" />
                    রেজিস্ট্রেশন
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
