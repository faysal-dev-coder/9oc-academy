// components/admin/stats/DashboardStats.jsx
// ═══════════════════════════════════════════════════════════════
// 📊 Dashboard Stats Section — Admin Panel
// ⭐ Recent Attempts → RPC field names (user_name, exam_title)
// ═══════════════════════════════════════════════════════════════

import Link from "next/link";
import {
  HiUsers,
  HiBookOpen,
  HiClipboardDocumentList,
  HiQuestionMarkCircle,
  HiCreditCard,
  HiChartBar,
  HiArrowRight,
  HiUserPlus,
  HiCheckCircle,
  HiClock,
  HiXCircle,
  HiEnvelope,
  HiPhone,
  HiBeaker,
} from "react-icons/hi2";
import StatCard from "./StatCard";

// ═══════════════════════════════════
// HELPER: Time Ago (Bangla)
// ═══════════════════════════════════
function timeAgo(dateStr) {
  if (!dateStr) return "";
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "এইমাত্র";
  if (diffMins < 60) return `${diffMins} মিনিট আগে`;
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
  if (diffDays < 7) return `${diffDays} দিন আগে`;
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ═══════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════
export default function DashboardStats({ stats, recentUsers, recentAttempts, pendingPayments }) {
  const {
    totalUsers = 0,
    totalCourses = 0,
    totalExams = 0,
    totalQuestions = 0,
    totalAttempts = 0,
    pendingPaymentsCount = 0,
  } = stats || {};

  const realUsersInList = recentUsers?.filter((u) => u.email).length || 0;
  const demoUsersInList = (recentUsers?.length || 0) - realUsersInList;

  return (
    <div className="space-y-6">
      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 1: STAT CARDS GRID                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1F2937] flex items-center gap-2">
            <HiChartBar className="text-[#1E9CD7]" />
            Overview Stats
          </h2>
          <span className="text-xs text-[#94A3B8]">Live Data</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            label="Total Users"
            value={totalUsers}
            subtext="Registered students"
            icon={HiUsers}
            color="blue"
          />
          <StatCard
            label="Courses"
            value={totalCourses}
            subtext="Published courses"
            icon={HiBookOpen}
            color="green"
          />
          <StatCard
            label="Exams"
            value={totalExams}
            subtext="Active exams"
            icon={HiClipboardDocumentList}
            color="purple"
          />
          <StatCard
            label="Questions"
            value={totalQuestions}
            subtext="In question bank"
            icon={HiQuestionMarkCircle}
            color="blue"
          />
          <StatCard
            label="Attempts"
            value={totalAttempts}
            subtext="Total exam attempts"
            icon={HiChartBar}
            color="green"
          />
          <StatCard
            label="Pending Pay"
            value={pendingPaymentsCount}
            subtext="Needs verification"
            icon={HiCreditCard}
            color={pendingPaymentsCount > 0 ? "amber" : "green"}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 2: TWO COLUMN LAYOUT                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Recent Users ── */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#FAFBFC]">
            <h3 className="font-bold text-[#1F2937] flex items-center gap-2">
              <HiUserPlus className="text-[#1E9CD7]" />
              Recent Users
            </h3>
            <div className="flex items-center gap-2">
              {realUsersInList > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs font-semibold text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  {realUsersInList} Real
                </span>
              )}
              {demoUsersInList > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  <HiBeaker className="text-[10px]" />
                  {demoUsersInList} Demo
                </span>
              )}
              <Link
                href="/admin/users"
                className="flex items-center gap-1 text-xs font-medium text-[#1E9CD7] hover:text-[#0A5A8A] transition-colors ml-1"
              >
                View all <HiArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-[#F1F5F9]">
            {recentUsers && recentUsers.length > 0 ? (
              recentUsers.map((user, idx) => {
                const isRealUser = !!user.email;
                return (
                  <div
                    key={user.id || idx}
                    className={`flex items-start gap-3 px-6 py-3.5 transition-colors ${
                      isRealUser ? "hover:bg-[#1E9CD7]/5" : "hover:bg-[#FAFBFC]"
                    }`}
                  >
                    <div className="relative shrink-0 mt-0.5">
                      {user.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatar_url}
                          alt={user.full_name || "User"}
                          className={`h-10 w-10 rounded-full object-cover border-2 ${
                            isRealUser ? "border-[#1E9CD7]/30" : "border-[#E2E8F0]"
                          }`}
                        />
                      ) : (
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                            isRealUser
                              ? "bg-[#1E9CD7]/10 border-[#1E9CD7]/20 text-[#1E9CD7]"
                              : "bg-slate-100 border-slate-200 text-slate-500"
                          }`}
                        >
                          {(user.full_name || user.email || "?")[0].toUpperCase()}
                        </div>
                      )}
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                          isRealUser ? "bg-green-500" : "bg-slate-300"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-[#1F2937] truncate">
                          {user.full_name || "No Name"}
                        </p>
                        {!isRealUser && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                            <HiBeaker className="text-[10px]" />
                            Demo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#64748B] truncate flex items-center gap-1 mt-0.5">
                        <HiEnvelope className="text-[#94A3B8] shrink-0 text-sm" />
                        {user.email ? (
                          <span className="truncate text-[#475569]">{user.email}</span>
                        ) : (
                          <span className="text-[#CBD5E1] italic">No email</span>
                        )}
                      </p>
                      <p className="text-xs text-[#64748B] truncate flex items-center gap-1 mt-0.5">
                        <HiPhone className="text-[#94A3B8] shrink-0 text-sm" />
                        {user.phone ? (
                          <span className="text-[#475569]">{user.phone}</span>
                        ) : (
                          <span className="text-[#CBD5E1] italic">No phone</span>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20"
                            : "bg-[#059669]/10 text-[#059669] border border-[#059669]/20"
                        }`}
                      >
                        {user.role || "student"}
                      </span>
                      <span className="text-xs text-[#94A3B8] whitespace-nowrap">
                        {timeAgo(user.created_at)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-[#94A3B8]">
                <HiUsers className="text-4xl mb-2 opacity-30" />
                <p className="text-sm">কোনো user নেই</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Recent Exam Attempts ── ⭐ UPDATED with RPC fields */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#FAFBFC]">
            <h3 className="font-bold text-[#1F2937] flex items-center gap-2">
              <HiClipboardDocumentList className="text-[#7C3AED]" />
              Recent Attempts
            </h3>
            <Link
              href="/admin/exams"
              className="flex items-center gap-1 text-xs font-medium text-[#1E9CD7] hover:text-[#0A5A8A] transition-colors"
            >
              View all <HiArrowRight className="text-sm" />
            </Link>
          </div>

          <div className="divide-y divide-[#F1F5F9]">
            {recentAttempts && recentAttempts.length > 0 ? (
              recentAttempts.map((attempt, idx) => {
                // ⭐ Calculate percentage from score + total_marks
                const scoreNum = Number(attempt.score) || 0;
                const totalNum = Number(attempt.total_marks) || 0;
                const scorePercent = totalNum > 0 ? Math.round((scoreNum / totalNum) * 100) : null;

                return (
                  <div
                    key={attempt.attempt_id || idx}
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#FAFBFC] transition-colors"
                  >
                    {/* Score Circle */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 ${
                        scorePercent === null
                          ? "bg-slate-50 border-slate-200 text-slate-400"
                          : scorePercent >= 70
                            ? "bg-green-50 border-green-200 text-green-700"
                            : scorePercent >= 40
                              ? "bg-amber-50 border-amber-200 text-amber-700"
                              : "bg-red-50 border-red-200 text-red-700"
                      }`}
                    >
                      {scorePercent !== null ? `${scorePercent}%` : "—"}
                    </div>

                    {/* Info — ⭐ NEW FIELD NAMES from RPC */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1F2937] truncate">
                        {attempt.user_name || "Unknown User"}
                      </p>
                      <p className="text-xs text-[#94A3B8] truncate">
                        {attempt.exam_title || "Unknown Exam"}
                      </p>
                    </div>

                    {/* Status + Time */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          attempt.status === "completed"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : attempt.status === "in_progress"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-50 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {attempt.status === "completed" ? (
                          <HiCheckCircle className="text-sm" />
                        ) : attempt.status === "in_progress" ? (
                          <HiClock className="text-sm" />
                        ) : (
                          <HiXCircle className="text-sm" />
                        )}
                        {attempt.status === "completed"
                          ? "Done"
                          : attempt.status === "in_progress"
                            ? "Active"
                            : attempt.status || "—"}
                      </span>
                      <span className="text-xs text-[#94A3B8] whitespace-nowrap">
                        {timeAgo(attempt.started_at)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-[#94A3B8]">
                <HiClipboardDocumentList className="text-4xl mb-2 opacity-30" />
                <p className="text-sm">কোনো attempt নেই</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 3: PENDING PAYMENTS ALERT                   */}
      {/* ═══════════════════════════════════════════════════ */}
      {pendingPaymentsCount > 0 && (
        <div className="rounded-2xl border-2 border-[#D97706]/30 bg-[#D97706]/5 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D97706]/10 border border-[#D97706]/20">
                <HiCreditCard className="text-xl text-[#D97706]" />
              </div>
              <div>
                <p className="font-bold text-[#1F2937]">
                  {pendingPaymentsCount}টি Payment Pending!
                </p>
                <p className="text-sm text-[#64748B]">নতুন enrollment verify করতে হবে।</p>
              </div>
            </div>
            <Link
              href="/admin/payments"
              className="shrink-0 rounded-xl bg-[#D97706] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#B45309] transition-colors"
            >
              Review Now
            </Link>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 4: QUICK ACTIONS                           */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm p-6">
        <h3 className="font-bold text-[#1F2937] mb-4 flex items-center gap-2">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { href: "/admin/users", label: "Manage Users", icon: HiUsers, color: "blue" },
            { href: "/admin/courses", label: "Add Course", icon: HiBookOpen, color: "green" },
            {
              href: "/admin/exams",
              label: "Add Exam",
              icon: HiClipboardDocumentList,
              color: "purple",
            },
            {
              href: "/admin/questions",
              label: "Add Question",
              icon: HiQuestionMarkCircle,
              color: "amber",
            },
            { href: "/admin/categories", label: "Categories", icon: HiChartBar, color: "blue" },
          ].map((action, idx) => {
            const colorMap = {
              blue: "text-[#1E9CD7] bg-[#1E9CD7]/8 border-[#1E9CD7]/15 hover:bg-[#1E9CD7]/15 hover:border-[#1E9CD7]/30",
              green:
                "text-[#059669] bg-[#059669]/8 border-[#059669]/15 hover:bg-[#059669]/15 hover:border-[#059669]/30",
              purple:
                "text-[#7C3AED] bg-[#7C3AED]/8 border-[#7C3AED]/15 hover:bg-[#7C3AED]/15 hover:border-[#7C3AED]/30",
              amber:
                "text-[#D97706] bg-[#D97706]/8 border-[#D97706]/15 hover:bg-[#D97706]/15 hover:border-[#D97706]/30",
            };
            return (
              <Link
                key={idx}
                href={action.href}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${colorMap[action.color]}`}
              >
                <action.icon className="text-2xl" />
                <span className="text-xs font-semibold leading-tight">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
