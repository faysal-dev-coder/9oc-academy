// app/admin/page.js
// ═══════════════════════════════════════════════════════════════
// 📊 Admin Dashboard — Phase 7 Test Page
// (Simple welcome page — পূর্ণ dashboard পরবর্তী step এ)
// ═══════════════════════════════════════════════════════════════

import { HiShieldCheck, HiSparkles } from "react-icons/hi2";

export const metadata = {
  title: "Admin Dashboard",
  description: "9OC Academy Admin Panel",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* ═══ Welcome Card ═══ */}
      <div
        className="rounded-3xl border-2 border-[#1E9CD7]/20 p-8 shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, rgba(30,156,215,0.08) 0%, rgba(255,255,255,1) 50%, rgba(10,90,138,0.04) 100%)",
        }}
      >
        <div className="flex items-start gap-5">
          {/* Icon */}
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
              boxShadow: "0 8px 24px rgba(30,156,215,0.3)",
            }}
          >
            <HiShieldCheck className="text-3xl" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-[#1F2937]">Welcome to Admin Panel!</h2>
              <HiSparkles className="text-2xl text-[#FBBF24]" />
            </div>
            <p className="text-base text-[#475569] mb-4">
              অভিনন্দন! আপনি successfully Admin Panel এ login হয়েছেন।
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-medium text-green-700">
                ✅ Authentication Working
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-700">
                🛡️ Role Verified (Admin)
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-700">
                🎨 Light Theme
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Quick Stats Placeholder ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "—", color: "blue" },
          { label: "Total Courses", value: "—", color: "green" },
          { label: "Pending Payments", value: "—", color: "amber" },
          { label: "Total Exams", value: "—", color: "purple" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-[#1F2937]">{stat.value}</p>
            <p className="mt-1 text-xs text-[#94A3B8]">Coming soon...</p>
          </div>
        ))}
      </div>

      {/* ═══ Phase 7 Roadmap Card ═══ */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#1F2937] mb-4">🎯 Phase 7 Progress</h3>
        <div className="space-y-3">
          {[
            { task: "Database Setup (Migrations)", status: "done" },
            { task: "Admin User Promotion", status: "done" },
            { task: "AdminGuard (Route Protection)", status: "done" },
            { task: "AdminSidebar (Navigation)", status: "done" },
            { task: "AdminHeader (Top Bar)", status: "done" },
            { task: "Admin Layout (Combined)", status: "done" },
            { task: "Dashboard with Real Stats", status: "next" },
            { task: "User Management", status: "pending" },
            { task: "Course Management", status: "pending" },
            { task: "Payment System", status: "pending" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  item.status === "done"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : item.status === "next"
                      ? "bg-amber-100 text-amber-700 border border-amber-200 animate-pulse"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                }`}
              >
                {item.status === "done" ? "✓" : item.status === "next" ? "→" : "○"}
              </span>
              <span
                className={`text-sm ${
                  item.status === "done"
                    ? "text-[#1F2937] line-through opacity-60"
                    : item.status === "next"
                      ? "text-[#1F2937] font-semibold"
                      : "text-[#94A3B8]"
                }`}
              >
                {item.task}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
