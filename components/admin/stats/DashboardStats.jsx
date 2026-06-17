"use client";

// components/admin/stats/DashboardStats.jsx
// ═══════════════════════════════════════════════════════════════
// 📊 Dashboard Stats — Premium v3 (Chat 41)
// ⭐ Hybrid: Key metrics + Activity + Top Exams + System Status
// ═══════════════════════════════════════════════════════════════

import Link from "next/link";
import Image from "next/image";
import {
  Users,
  BookOpen,
  ClipboardList,
  HelpCircle,
  CreditCard,
  BarChart3,
  ArrowRight,
  UserPlus,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Phone,
  Zap,
  Tag,
  Sparkles,
  Sun,
  TrendingUp,
  Trophy,
  Activity,
  Server,
  Database,
  HardDrive,
  ShieldCheck,
  Wifi,
} from "lucide-react";

import StatCard from "@/components/admin/shared/StatCard";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

// ═══════════════════════════════════
// HELPERS
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

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const fmt = (n) => (n || 0).toLocaleString("en-US");

// ═══════════════════════════════════
// WELCOME CARD
// ═══════════════════════════════════
function WelcomeCard({ user }) {
  const firstLetter = (user.name || "A")[0].toUpperCase();

  return (
    <Card variant="elevated" padding="none" className="overflow-hidden">
      <div className="bg-linear-to-r from-brand-50 via-white to-brand-100/40 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {user.avatar ? (
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="56px"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-linear-to-br from-brand-700 to-brand-900 text-white text-lg font-bold ring-2 ring-white shadow-md">
                {firstLetter}
              </div>
            )}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xs sm:text-sm font-medium text-brand-700 flex items-center gap-1.5">
                <Sun size={14} className="text-amber-500" />
                {getGreeting()},
              </p>
              <Badge variant="warning" size="sm" appearance="soft">
                Admin
              </Badge>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate mt-0.5">
              {user.name}
              <Sparkles size={16} className="inline-block ml-1.5 text-amber-500 -mt-1" />
            </h2>
          </div>

          <div className="hidden sm:block text-right shrink-0">
            <p className="text-xs text-slate-500">Today</p>
            <p className="text-sm font-semibold text-slate-700 tabular-nums">
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════
// LIVE BADGE — animated pulse
// ═══════════════════════════════════
function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Live Data
    </span>
  );
}

// ═══════════════════════════════════
// VIEW ALL LINK — premium pill
// ═══════════════════════════════════
function ViewAllLink({ href }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50/50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-all duration-150 hover:bg-brand-100 hover:border-brand-300 hover:shadow-sm"
    >
      View all
      <ArrowRight
        size={13}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

// ═══════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════
function SectionHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900 truncate">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

// ═══════════════════════════════════
// EMPTY MESSAGE
// ═══════════════════════════════════
function EmptyMessage({ icon: Icon, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
        <Icon size={20} />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

// ═══════════════════════════════════
// USER LIST ITEM
// ═══════════════════════════════════
function UserListItem({ user }) {
  const isRealUser = !!user.email;
  const displayName = user.full_name || "No Name";
  const firstLetter = (user.full_name || user.email || "?")[0].toUpperCase();

  return (
    <div className="flex items-center gap-3 px-5 h-22 hover:bg-slate-50 transition-colors duration-150">
      <div className="relative shrink-0">
        {user.avatar_url ? (
          <div
            className={[
              "relative h-10 w-10 rounded-full overflow-hidden border-2",
              isRealUser ? "border-brand-200" : "border-slate-200",
            ].join(" ")}
          >
            <Image
              src={user.avatar_url}
              alt={displayName}
              fill
              className="object-cover"
              unoptimized
              sizes="40px"
            />
          </div>
        ) : (
          <div
            className={[
              "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold",
              isRealUser
                ? "bg-brand-50 border-brand-200 text-brand-700"
                : "bg-slate-100 border-slate-200 text-slate-500",
            ].join(" ")}
          >
            {firstLetter}
          </div>
        )}
        <span
          className={[
            "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white",
            isRealUser ? "bg-emerald-500" : "bg-slate-300",
          ].join(" ")}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
          <Mail size={12} className="shrink-0 text-slate-400" />
          {user.email ? (
            <span className="truncate">{user.email}</span>
          ) : (
            <span className="text-slate-300 italic">No email</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
          <Phone size={12} className="shrink-0 text-slate-400" />
          {user.phone ? (
            <span>{user.phone}</span>
          ) : (
            <span className="text-slate-300 italic">No phone</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <Badge variant={user.role === "admin" ? "danger" : "success"} size="sm">
          {user.role || "student"}
        </Badge>
        <span className="text-xs text-slate-400 whitespace-nowrap">{timeAgo(user.created_at)}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// ATTEMPT LIST ITEM
// ═══════════════════════════════════
function AttemptListItem({ attempt }) {
  const scoreNum = Number(attempt.score) || 0;
  const totalNum = Number(attempt.total_marks) || 0;
  const scorePercent = totalNum > 0 ? Math.round((scoreNum / totalNum) * 100) : null;

  const scoreStyle =
    scorePercent === null
      ? "bg-slate-50 border-slate-200 text-slate-400"
      : scorePercent >= 70
        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
        : scorePercent >= 40
          ? "bg-amber-50 border-amber-200 text-amber-700"
          : "bg-red-50 border-red-200 text-red-700";

  const statusConfig = {
    completed: { variant: "success", icon: CheckCircle2, label: "Done" },
    in_progress: { variant: "warning", icon: Clock, label: "Active" },
    abandoned: { variant: "default", icon: XCircle, label: "Abandoned" },
  };
  const status = statusConfig[attempt.status] || {
    variant: "default",
    icon: XCircle,
    label: attempt.status || "—",
  };

  return (
    <div className="flex items-center gap-4 px-5 h-22 hover:bg-slate-50 transition-colors duration-150">
      <div
        className={[
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 tabular-nums",
          scoreStyle,
        ].join(" ")}
      >
        {scorePercent !== null ? `${scorePercent}%` : "—"}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate">
          {attempt.user_name || "Unknown User"}
        </p>
        <p className="text-xs text-slate-500 truncate mt-1">
          {attempt.exam_title || "Unknown Exam"}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <Badge variant={status.variant} size="sm" icon={status.icon}>
          {status.label}
        </Badge>
        <span className="text-xs text-slate-400 whitespace-nowrap">
          {timeAgo(attempt.started_at)}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// ⭐ TOP EXAMS — with horizontal bar viz
// ═══════════════════════════════════
function TopExamItem({ exam, maxAttempts, rank }) {
  const percent = maxAttempts > 0 ? (exam.attempts / maxAttempts) * 100 : 0;

  // Rank colors
  const rankColors = {
    1: "bg-amber-100 text-amber-700 border-amber-200",
    2: "bg-slate-100 text-slate-600 border-slate-200",
    3: "bg-orange-100 text-orange-700 border-orange-200",
  };
  const rankStyle = rankColors[rank] || "bg-brand-50 text-brand-700 border-brand-200";

  return (
    <div className="px-5 py-3.5 hover:bg-slate-50 transition-colors duration-150">
      <div className="flex items-center gap-3">
        {/* Rank badge */}
        <div
          className={[
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold border",
            rankStyle,
          ].join(" ")}
        >
          #{rank}
        </div>

        {/* Info + Bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <p className="text-sm font-semibold text-slate-900 truncate">{exam.title}</p>
            <span className="text-xs font-bold text-slate-700 tabular-nums shrink-0">
              {fmt(exam.attempts)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-brand-500 to-brand-700 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// ⭐ ACTIVITY CHART — 7-day CSS bars
// ═══════════════════════════════════
function ActivityChart({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const avg = Math.round(total / data.length);

  return (
    <div className="p-5">
      {/* Top stats */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-slate-500">Total attempts (7 days)</p>
          <p className="text-2xl font-bold text-slate-900 tabular-nums">{fmt(total)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Daily average</p>
          <p className="text-lg font-bold text-emerald-700 tabular-nums">{fmt(avg)}</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between gap-1.5 h-32">
        {data.map((day, idx) => {
          const height = (day.count / max) * 100;
          const isToday = idx === data.length - 1;
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
              {/* Tooltip on hover */}
              <div className="relative w-full h-full flex items-end">
                <div
                  className={[
                    "w-full rounded-md transition-all duration-300 relative",
                    isToday
                      ? "bg-linear-to-t from-brand-700 to-brand-500"
                      : "bg-linear-to-t from-brand-300 to-brand-200 group-hover:from-brand-500 group-hover:to-brand-400",
                  ].join(" ")}
                  style={{ height: `${Math.max(height, 4)}%` }}
                >
                  {/* Count label on hover */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <span className="inline-block px-1.5 py-0.5 rounded-md bg-slate-900 text-white text-xs font-semibold whitespace-nowrap tabular-nums">
                      {day.count}
                    </span>
                  </div>
                </div>
              </div>

              {/* Day label */}
              <span
                className={[
                  "text-xs font-medium tabular-nums",
                  isToday ? "text-brand-700 font-bold" : "text-slate-500",
                ].join(" ")}
              >
                {day.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// ⭐ CATEGORY BREAKDOWN
// ═══════════════════════════════════
function CategoryItem({ category, maxExams }) {
  const percent = maxExams > 0 ? (category.exams / maxExams) * 100 : 0;

  return (
    <div className="px-5 py-3 hover:bg-slate-50 transition-colors duration-150">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
          <Tag size={14} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <p className="text-sm font-semibold text-slate-900 truncate">{category.name}</p>
            <span className="text-xs text-slate-500 tabular-nums shrink-0">
              <span className="font-bold text-slate-700">{fmt(category.exams)}</span> exams
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// ⭐ SYSTEM STATUS
// ═══════════════════════════════════
const systemIcons = {
  Database: Database,
  Storage: HardDrive,
  "Auth Service": ShieldCheck,
  API: Wifi,
};

function SystemStatusItem({ item }) {
  const Icon = systemIcons[item.name] || Server;
  const isHealthy = item.status === "healthy";

  return (
    <div className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors duration-150">
      <div className="flex items-center gap-3">
        <div
          className={[
            "w-9 h-9 rounded-lg flex items-center justify-center",
            isHealthy ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
          ].join(" ")}
        >
          <Icon size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
          <p className="text-xs text-slate-500">{item.message}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={[
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              isHealthy ? "bg-emerald-400" : "bg-red-400",
            ].join(" ")}
          />
          <span
            className={[
              "relative inline-flex h-2.5 w-2.5 rounded-full",
              isHealthy ? "bg-emerald-500" : "bg-red-500",
            ].join(" ")}
          />
        </span>
        <span
          className={[
            "text-xs font-bold uppercase tracking-wide",
            isHealthy ? "text-emerald-700" : "text-red-700",
          ].join(" ")}
        >
          {isHealthy ? "Healthy" : "Down"}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// QUICK ACTIONS
// ═══════════════════════════════════
const quickActions = [
  { href: "/admin/users", label: "Manage Users", icon: Users },
  { href: "/admin/courses", label: "Add Course", icon: BookOpen },
  { href: "/admin/exams", label: "Add Exam", icon: ClipboardList },
  { href: "/admin/questions", label: "Add Question", icon: HelpCircle },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

function QuickActionCard({ action }) {
  const Icon = action.icon;
  return (
    <Link
      href={action.href}
      className="group flex flex-col items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-4 text-center transition-all duration-150 hover:border-brand-300 hover:bg-brand-50/30 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center group-hover:bg-brand-100 group-hover:scale-110 transition-all duration-150">
        <Icon size={18} />
      </div>
      <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-800 leading-tight">
        {action.label}
      </span>
    </Link>
  );
}

// ═══════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════
export default function DashboardStats({
  currentUser,
  stats,
  trends,
  recentUsers,
  recentAttempts,
  topExams,
  activity7Days,
  categoryStats,
  systemStatus,
}) {
  const {
    totalUsers = 0,
    totalCourses = 0,
    totalExams = 0,
    totalQuestions = 0,
    totalAttempts = 0,
    totalCategories = 0,
    pendingPaymentsCount = 0,
  } = stats || {};

  const maxAttempts = Math.max(...(topExams || []).map((e) => e.attempts), 1);
  const maxCatExams = Math.max(...(categoryStats || []).map((c) => c.exams), 1);

  return (
    <div className="space-y-6">
      {/* ═══════ WELCOME CARD ═══════ */}
      <WelcomeCard user={currentUser} />

      {/* ═══════ PENDING PAYMENTS ALERT ═══════ */}
      {pendingPaymentsCount > 0 && (
        <Card variant="default" padding="md" className="border-amber-300 bg-amber-50/50">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-amber-200">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {pendingPaymentsCount}টি Payment Pending!
                </p>
                <p className="text-xs text-slate-600 mt-0.5">নতুন enrollment verify করতে হবে।</p>
              </div>
            </div>
            <Link href="/admin/payments">
              <Button variant="warning" size="sm">
                Review Now
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* ═══════ SECTION 1: KEY METRICS (4 cards) ═══════ */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 size={18} className="text-brand-700" />
            Key Metrics
            <span className="text-xs font-normal text-slate-400 ml-1">
              · Last 30 days performance
            </span>
          </h2>
          <LiveBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={fmt(totalUsers)}
            subtitle="Registered students"
            icon={Users}
            variant="default"
            change={trends?.users?.value}
            trend={trends?.users?.trend}
          />
          <StatCard
            title="Active Exams"
            value={fmt(totalExams)}
            subtitle="Currently published"
            icon={ClipboardList}
            variant="success"
            change={trends?.exams?.value}
            trend={trends?.exams?.trend}
          />
          <StatCard
            title="Total Attempts"
            value={fmt(totalAttempts)}
            subtitle="All time exams taken"
            icon={Activity}
            variant="default"
            change={trends?.attempts?.value}
            trend={trends?.attempts?.trend}
          />
          <StatCard
            title="Question Bank"
            value={fmt(totalQuestions)}
            subtitle="Total questions"
            icon={HelpCircle}
            variant="default"
            change={trends?.questions?.value}
            trend={trends?.questions?.trend}
          />
        </div>
      </div>

      {/* ═══════ SECTION 2: SECONDARY STATS (3 cards) ═══════ */}
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-brand-700" />
          Platform Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Courses"
            value={fmt(totalCourses)}
            subtitle="Published courses"
            icon={BookOpen}
            variant="success"
          />
          <StatCard
            title="Categories"
            value={fmt(totalCategories)}
            subtitle="Exam categories"
            icon={Tag}
            variant="default"
          />
          <StatCard
            title="Pending Pay"
            value={fmt(pendingPaymentsCount)}
            subtitle="Needs verification"
            icon={CreditCard}
            variant={pendingPaymentsCount > 0 ? "warning" : "success"}
          />
        </div>
      </div>

      {/* ═══════ SECTION 3: ACTIVITY FEED (2 columns) ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated" padding="none">
          <div className="px-5 py-4 border-b border-slate-200">
            <SectionHeader
              icon={UserPlus}
              title="Recent Users"
              subtitle="Last 4 registered students"
              action={<ViewAllLink href="/admin/users" />}
            />
          </div>
          <div className="divide-y divide-slate-100">
            {recentUsers && recentUsers.length > 0 ? (
              recentUsers.map((user, idx) => <UserListItem key={user.id || idx} user={user} />)
            ) : (
              <EmptyMessage icon={Users} message="কোনো user নেই" />
            )}
          </div>
        </Card>

        <Card variant="elevated" padding="none">
          <div className="px-5 py-4 border-b border-slate-200">
            <SectionHeader
              icon={ClipboardList}
              title="Recent Attempts"
              subtitle="Last 4 exam attempts"
              action={<ViewAllLink href="/admin/exams" />}
            />
          </div>
          <div className="divide-y divide-slate-100">
            {recentAttempts && recentAttempts.length > 0 ? (
              recentAttempts.map((attempt, idx) => (
                <AttemptListItem key={attempt.attempt_id || idx} attempt={attempt} />
              ))
            ) : (
              <EmptyMessage icon={ClipboardList} message="কোনো attempt নেই" />
            )}
          </div>
        </Card>
      </div>

      {/* ═══════ SECTION 4: ⭐ INSIGHTS (Top Exams + Activity) ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Exams */}
        <Card variant="elevated" padding="none">
          <div className="px-5 py-4 border-b border-slate-200">
            <SectionHeader
              icon={Trophy}
              title="Top Exams"
              subtitle="Most attempted exams"
              action={<ViewAllLink href="/admin/exams" />}
            />
          </div>
          <div className="divide-y divide-slate-100">
            {topExams && topExams.length > 0 ? (
              topExams.map((exam, idx) => (
                <TopExamItem key={exam.id} exam={exam} maxAttempts={maxAttempts} rank={idx + 1} />
              ))
            ) : (
              <EmptyMessage icon={Trophy} message="কোনো exam নেই" />
            )}
          </div>
        </Card>

        {/* Activity Chart */}
        <Card variant="elevated" padding="none">
          <div className="px-5 py-4 border-b border-slate-200">
            <SectionHeader
              icon={Activity}
              title="Activity Trend"
              subtitle="Last 7 days exam attempts"
            />
          </div>
          {activity7Days && activity7Days.length > 0 ? (
            <ActivityChart data={activity7Days} />
          ) : (
            <EmptyMessage icon={Activity} message="কোনো activity নেই" />
          )}
        </Card>
      </div>

      {/* ═══════ SECTION 5: ⭐ BREAKDOWN (Categories + System) ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card variant="elevated" padding="none">
          <div className="px-5 py-4 border-b border-slate-200">
            <SectionHeader
              icon={Tag}
              title="Categories"
              subtitle="Exams per category"
              action={<ViewAllLink href="/admin/categories" />}
            />
          </div>
          <div className="divide-y divide-slate-100">
            {categoryStats && categoryStats.length > 0 ? (
              categoryStats.map((cat) => (
                <CategoryItem key={cat.id} category={cat} maxExams={maxCatExams} />
              ))
            ) : (
              <EmptyMessage icon={Tag} message="কোনো category নেই" />
            )}
          </div>
        </Card>

        {/* System Status */}
        <Card variant="elevated" padding="none">
          <div className="px-5 py-4 border-b border-slate-200">
            <SectionHeader
              icon={Server}
              title="System Status"
              subtitle="All services operational"
              action={
                <Badge variant="success" size="sm" dot>
                  All Healthy
                </Badge>
              }
            />
          </div>
          <div className="divide-y divide-slate-100">
            {systemStatus.map((item) => (
              <SystemStatusItem key={item.name} item={item} />
            ))}
          </div>
        </Card>
      </div>

      {/* ═══════ SECTION 6: QUICK ACTIONS ═══════ */}
      <Card variant="elevated" padding="lg">
        <div className="mb-5">
          <SectionHeader icon={Zap} title="Quick Actions" subtitle="Common admin tasks" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <QuickActionCard key={action.href} action={action} />
          ))}
        </div>
      </Card>
    </div>
  );
}
