// components/admin/AdminGuard.jsx
// ═══════════════════════════════════════════════════════════════
// 🛡️ Admin Guard — Role-Based Route Protection
// Phase 7 — Chat 27
// ├── Login check (redirect to /login if not logged in)
// ├── Admin role check (redirect to / if not admin)
// ├── Premium loading state
// └── Access denied screen with auto-redirect
// ═══════════════════════════════════════════════════════════════

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { HiShieldExclamation, HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";

export default function AdminGuard({ children }) {
  const { user, profile, loading, isLoggedIn, isAdmin } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Mount check (React 19 safe)
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Not logged in → redirect to login
  useEffect(() => {
    if (mounted && !loading && !isLoggedIn) {
      router.push("/login?redirect=/admin");
    }
  }, [mounted, loading, isLoggedIn, router]);

  // Logged in but not admin → countdown + redirect
  useEffect(() => {
    if (mounted && !loading && isLoggedIn && !isAdmin) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [mounted, loading, isLoggedIn, isAdmin, router]);

  // ─── Loading State ──────────────────────────────
  if (!mounted || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          {/* Premium Spinner */}
          <div className="relative mx-auto mb-6 h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-[#E2E8F0]" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#1E9CD7]" />
          </div>
          <p className="text-sm font-medium text-[#64748B]">Admin Panel লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // ─── Not Logged In ──────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#1E9CD7]" />
          <p className="text-sm text-[#64748B]">Login page এ পাঠানো হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // ─── Logged In But Not Admin ────────────────────
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-8 text-center shadow-xl">
          {/* Warning Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#DC2626]/10 border-2 border-[#DC2626]/30">
            <HiShieldExclamation className="h-10 w-10 text-[#DC2626]" />
          </div>

          {/* Title */}
          <h2 className="mb-2 text-2xl font-bold text-[#1F2937]">Access Denied</h2>
          <p className="mb-1 text-sm text-[#64748B]">
            দুঃখিত, এই পেজ access করার অনুমতি আপনার নেই।
          </p>
          <p className="mb-6 text-xs text-[#94A3B8]">
            শুধুমাত্র Admin রা এই panel access করতে পারবে।
          </p>

          {/* User Info Card */}
          <div className="mb-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 text-left">
            <p className="text-xs font-medium text-[#64748B] mb-1">Logged in as:</p>
            <p className="text-sm font-semibold text-[#1F2937] truncate">
              {profile?.full_name || user?.email}
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">
              Role: <span className="font-medium text-[#475569]">{profile?.role || "student"}</span>
            </p>
          </div>

          {/* Auto Redirect Countdown */}
          <div className="mb-6 rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/30 p-3">
            <p className="text-xs text-[#D97706] font-medium">
              ⏱️ {countdown} সেকেন্ডে Home page এ redirect হবে...
            </p>
          </div>

          {/* Back Home Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
              boxShadow: "0 4px 15px rgba(30,156,215,0.3)",
            }}
          >
            <HiArrowLeft className="text-base" />
            Home এ ফিরে যাও
          </Link>
        </div>
      </div>
    );
  }

  // ─── Admin Verified — Show Content ──────────────
  return <>{children}</>;
}
