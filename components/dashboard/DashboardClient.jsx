"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import {
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineTrophy,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlinePencilSquare,
  HiOutlineArrowRight,
  HiOutlineBolt,
  HiOutlineFire,
  HiOutlineStar,
  HiOutlineRocketLaunch,
  HiOutlineAcademicCap,
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineCheckBadge,
  HiOutlineBookOpen,
  HiOutlineChartPie,
  HiOutlineSquares2X2,
  HiOutlineEye,
} from "react-icons/hi2";

// ═══════════════════════════════════════════════
// 🎨 COLOR PALETTE
// ═══════════════════════════════════════════════
const COLORS = {
  background: "#FAFBFC",
  card: "#FFFFFF",
  primary: "#1E9CD7",
  primaryDark: "#0A5A8A",
  accent: "#FBBF24",
  textPrimary: "#1F2937",
  textSecondary: "#475569",
  textMuted: "#64748B",
  border: "#E2E8F0",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  dark: "#0F172A",
  lightOnDark: "#F1F5F9",
};

// ═══════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════
const RECENT_ATTEMPTS_LIMIT = 5;

// ═══════════════════════════════════════════════
// HELPER: Format Time (English)
// ═══════════════════════════════════════════════
function formatTime(seconds) {
  if (!seconds || seconds === 0) return "0 min";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

// ═══════════════════════════════════════════════
// HELPER: Date Format (English)
// ═══════════════════════════════════════════════
function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ═══════════════════════════════════════════════
// COMPONENT: User Avatar
// ═══════════════════════════════════════════════
function UserAvatar({ avatarUrl, letter, size = 64, ring = true }) {
  const ringClass = ring ? "ring-4 ring-white shadow-lg" : "";

  if (avatarUrl) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full ${ringClass}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src={avatarUrl}
          alt="Avatar"
          fill
          className="object-cover"
          unoptimized
          sizes={`${size}px`}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${ringClass}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2.5}px`,
        background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
      }}
    >
      {letter}
    </div>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Featured Stat Card (FIXED Layout)
// ═══════════════════════════════════════════════
function FeaturedStatCard({ icon: Icon, label, value, color, bgColor, delay, suffix = "" }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: delay,
        ease: "power3.out",
      }
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderColor: COLORS.border,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: color }} />

      {/* Icon Top */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="text-2xl" style={{ color, strokeWidth: 2 }} />
      </div>

      {/* Big Number */}
      <p
        className="text-3xl font-bold leading-none sm:text-4xl"
        style={{ color: COLORS.textPrimary }}
      >
        {value}
        <span className="text-lg font-semibold sm:text-xl" style={{ color: COLORS.textSecondary }}>
          {suffix}
        </span>
      </p>

      {/* Label Below */}
      <p
        className="mt-2 text-xs font-semibold uppercase tracking-wider"
        style={{ color: COLORS.textMuted }}
      >
        {label}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Progress Ring
// ═══════════════════════════════════════════════
function ProgressRing({ percentage, passCount, totalCount }) {
  const ringRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    if (!ringRef.current) return;

    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (percentage / 100) * circumference;

    gsap.fromTo(
      ringRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: offset,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    gsap.fromTo(
      numberRef.current,
      { textContent: 0 },
      {
        textContent: percentage,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3,
        snap: { textContent: 1 },
        onUpdate: function () {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(this.targets()[0].textContent);
          }
        },
      }
    );
  }, [percentage]);

  return (
    <div
      className="flex h-full flex-col rounded-2xl border bg-white p-6"
      style={{
        borderColor: COLORS.border,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <p
        className="mb-2 text-xs font-semibold uppercase tracking-wider"
        style={{ color: COLORS.textMuted }}
      >
        Pass Rate
      </p>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative aspect-square w-full max-w-45">
          <svg viewBox="0 0 176 176" className="h-full w-full -rotate-90 transform">
            <circle cx="88" cy="88" r="70" stroke={COLORS.border} strokeWidth="12" fill="none" />
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.primary} />
                <stop offset="100%" stopColor={COLORS.primaryDark} />
              </linearGradient>
            </defs>
            <circle
              ref={ringRef}
              cx="88"
              cy="88"
              r="70"
              stroke="url(#ringGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              ref={numberRef}
              className="text-4xl font-bold sm:text-5xl"
              style={{ color: COLORS.textPrimary }}
            >
              0
            </span>
            <span className="text-sm font-semibold" style={{ color: COLORS.textMuted }}>
              %
            </span>
          </div>
        </div>
      </div>

      <div
        className="mt-4 flex w-full items-center justify-around border-t pt-4"
        style={{ borderColor: COLORS.border }}
      >
        <div className="text-center">
          <p className="text-2xl font-bold" style={{ color: COLORS.success }}>
            {passCount}
          </p>
          <p
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: COLORS.textMuted }}
          >
            Passed
          </p>
        </div>
        <div className="h-8 w-px" style={{ backgroundColor: COLORS.border }} />
        <div className="text-center">
          <p className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>
            {totalCount}
          </p>
          <p
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: COLORS.textMuted }}
          >
            Total
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Achievement Card
// ═══════════════════════════════════════════════
function AchievementCard({ icon: Icon, title, value, subtitle, color, bgColor }) {
  return (
    <div
      className="flex h-full items-center gap-4 rounded-2xl border bg-white p-5 transition-all hover:shadow-md"
      style={{ borderColor: COLORS.border }}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="text-2xl" style={{ color, strokeWidth: 2 }} />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: COLORS.textMuted }}
        >
          {title}
        </p>
        <p className="mt-1 text-xl font-bold leading-tight" style={{ color: COLORS.textPrimary }}>
          {value}
        </p>
        {subtitle && (
          <p className="mt-0.5 text-xs" style={{ color: COLORS.textSecondary }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Quick Action Card
// ═══════════════════════════════════════════════
function QuickActionCard({ icon: Icon, label, href, color, bgColor }) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center rounded-2xl border bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ borderColor: COLORS.border }}
    >
      <div
        className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="text-2xl" style={{ color, strokeWidth: 2 }} />
      </div>
      <p className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
        {label}
      </p>
    </Link>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Modern Attempt Row
// ═══════════════════════════════════════════════
function AttemptRow({ attempt, index }) {
  const total = Number(attempt.total_marks) || 0;
  const score = Number(attempt.score) || 0;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPassed = attempt.is_passed;

  const statusColor = isPassed ? COLORS.success : COLORS.danger;
  const statusBg = isPassed ? "#ECFDF5" : "#FEF2F2";

  return (
    <Link
      href={`/exams/${attempt.exams?.id}/result/${attempt.id}`}
      className="group block rounded-xl border bg-white p-4 transition-all duration-200 hover:shadow-md"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold"
          style={{
            backgroundColor: statusBg,
            color: statusColor,
          }}
        >
          {index + 1}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" style={{ color: COLORS.textPrimary }}>
            {attempt.exams?.title || "Exam"}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: COLORS.textMuted }}>
            <HiOutlineClock className="text-sm" />
            <span>{formatDate(attempt.completed_at)}</span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xl font-bold" style={{ color: statusColor }}>
            {percentage}%
          </p>
          <span
            className="mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold"
            style={{
              backgroundColor: statusBg,
              color: statusColor,
            }}
          >
            {isPassed ? "PASS" : "FAIL"}
          </span>
        </div>

        <HiOutlineArrowRight
          className="shrink-0 text-base transition-all group-hover:translate-x-1"
          style={{ color: COLORS.textMuted }}
        />
      </div>

      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full"
        style={{ backgroundColor: COLORS.border }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${Math.max(percentage, 2)}%`,
            backgroundColor: statusColor,
          }}
        />
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════
// MAIN: DashboardClient
// ═══════════════════════════════════════════════
export default function DashboardClient({ user, profile, stats, recentAttempts = [] }) {
  const heroRef = useRef(null);

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Unknown";

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const greetingEmoji = hour < 12 ? "☀️" : hour < 17 ? "🌤️" : "🌙";

  const avatarUrl = profile?.avatar_url;
  const avatarLetter = (profile?.full_name || user?.email || "U").charAt(0).toUpperCase();
  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Friend";

  // Limit recent attempts to 5
  const limitedAttempts = recentAttempts.slice(0, RECENT_ATTEMPTS_LIMIT);

  // Achievement Logic
  const currentLevel =
    stats.avgScore >= 80
      ? { name: "Expert", emoji: "⭐" }
      : stats.avgScore >= 60
        ? { name: "Advanced", emoji: "🎯" }
        : stats.avgScore >= 40
          ? { name: "Intermediate", emoji: "📚" }
          : { name: "Beginner", emoji: "🌱" };

  const achievementBadge =
    stats.passCount >= 10
      ? { name: "Champion", emoji: "🏆" }
      : stats.passCount >= 5
        ? { name: "Achiever", emoji: "🎖️" }
        : stats.passCount >= 1
          ? { name: "Starter", emoji: "🚀" }
          : { name: "Newbie", emoji: "🌟" };

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen pt-8 pb-20" style={{ backgroundColor: COLORS.background }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ════════════════════════════════════════════════════
            🎯 HERO WELCOME CARD
        ════════════════════════════════════════════════════ */}
        <div
          ref={heroRef}
          className="mb-6 overflow-hidden rounded-3xl border bg-white shadow-sm"
          style={{ borderColor: COLORS.border }}
        >
          <div
            className="h-2"
            style={{
              background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 50%, ${COLORS.accent} 100%)`,
            }}
          />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <UserAvatar avatarUrl={avatarUrl} letter={avatarLetter} size={84} />

                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <span
                      className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: COLORS.border,
                        backgroundColor: COLORS.background,
                        color: COLORS.textSecondary,
                      }}
                    >
                      <span>{greetingEmoji}</span>
                      {greeting}
                    </span>

                    {stats.attempts > 0 && (
                      <span
                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: "#FEF3C7",
                          color: COLORS.warning,
                        }}
                      >
                        <HiOutlineFire className="text-sm" />
                        {stats.attempts} Exams
                      </span>
                    )}

                    {profile?.role === "admin" && (
                      <span
                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: "#FEF3C7",
                          color: COLORS.warning,
                        }}
                      >
                        <HiOutlineSparkles className="text-sm" />
                        Admin
                      </span>
                    )}
                  </div>

                  <h1
                    className="text-2xl font-bold sm:text-3xl"
                    style={{ color: COLORS.textPrimary }}
                  >
                    Welcome, <span style={{ color: COLORS.primary }}>{displayName}</span>
                  </h1>

                  <p className="mt-1.5 text-sm" style={{ color: COLORS.textSecondary }}>
                    Continue your learning journey today 🎯
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap justify-center gap-3 lg:justify-end">
                {/* ✅ TAKE EXAM — Stronger contrast */}
                <Link
                  href="/exams"
                  className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                    boxShadow: `0 4px 14px rgba(30, 156, 215, 0.4)`,
                  }}
                >
                  <HiOutlineRocketLaunch className="text-lg" />
                  Take Exam
                </Link>

                <Link
                  href="/leaderboard"
                  className="flex items-center gap-2 rounded-xl border-2 bg-white px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    borderColor: COLORS.border,
                    color: COLORS.textPrimary,
                  }}
                >
                  <HiOutlineTrophy className="text-lg" style={{ color: COLORS.accent }} />
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            📊 FEATURED STATS (4 Cards)
        ════════════════════════════════════════════════════ */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <FeaturedStatCard
            icon={HiOutlineDocumentText}
            label="Total Exams"
            value={stats.attempts}
            color={COLORS.primary}
            bgColor="#E0F2FE"
            delay={0.1}
          />
          <FeaturedStatCard
            icon={HiOutlineChartBar}
            label="Avg Score"
            value={stats.avgScore}
            suffix="%"
            color={COLORS.success}
            bgColor="#ECFDF5"
            delay={0.15}
          />
          <FeaturedStatCard
            icon={HiOutlineTrophy}
            label="Best Score"
            value={stats.bestScore}
            suffix="%"
            color={COLORS.warning}
            bgColor="#FEF3C7"
            delay={0.2}
          />
          <FeaturedStatCard
            icon={HiOutlineClock}
            label="Study Time"
            value={formatTime(stats.totalTimeTaken)}
            color="#7C3AED"
            bgColor="#F3E8FF"
            delay={0.25}
          />
        </div>

        {/* ════════════════════════════════════════════════════
            ⭕ PROGRESS RING + ACHIEVEMENTS
        ════════════════════════════════════════════════════ */}
        <div className="mb-6 grid gap-4 lg:grid-cols-[340px_1fr]">
          <ProgressRing
            percentage={stats.passRate || 0}
            passCount={stats.passCount || 0}
            totalCount={stats.attempts || 0}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AchievementCard
              icon={HiOutlineCheckBadge}
              title="Pass Count"
              value={`${stats.passCount} Exams`}
              subtitle="Total passed"
              color={COLORS.success}
              bgColor="#ECFDF5"
            />
            <AchievementCard
              icon={HiOutlineStar}
              title="Current Level"
              value={currentLevel.name}
              subtitle={`${currentLevel.emoji} Based on avg score`}
              color={COLORS.accent}
              bgColor="#FEF3C7"
            />
            <AchievementCard
              icon={HiOutlineFire}
              title="Active Streak"
              value={`${stats.attempts} Exams`}
              subtitle="Keep it going!"
              color={COLORS.danger}
              bgColor="#FEF2F2"
            />
            <AchievementCard
              icon={HiOutlineSparkles}
              title="Achievement"
              value={achievementBadge.name}
              subtitle={`${achievementBadge.emoji} Your current badge`}
              color={COLORS.primary}
              bgColor="#E0F2FE"
            />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            👤 PROFILE CARD + ⚡ QUICK ACTIONS
        ════════════════════════════════════════════════════ */}
        <div className="mb-6 grid gap-4 lg:grid-cols-[400px_1fr]">
          {/* Profile Card */}
          <div
            className="overflow-hidden rounded-2xl border bg-white"
            style={{
              borderColor: COLORS.border,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="relative h-24"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
              }}
            >
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                  <pattern
                    id="dots"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>
            </div>

            <div className="relative -mt-12 px-6">
              <UserAvatar avatarUrl={avatarUrl} letter={avatarLetter} size={80} />
            </div>

            <div className="px-6 pt-4 pb-6">
              <div className="mb-4 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold" style={{ color: COLORS.textPrimary }}>
                    {profile?.full_name || "Name not set"}
                  </h3>
                  <p className="text-xs" style={{ color: COLORS.textMuted }}>
                    {profile?.role === "admin" ? "👑 Admin" : "🎓 Student"}
                  </p>
                </div>

                {/* ✅ EDIT BUTTON — Stronger contrast */}
                <Link
                  href="/dashboard/profile"
                  className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                    boxShadow: `0 2px 8px rgba(30, 156, 215, 0.3)`,
                  }}
                >
                  <HiOutlinePencilSquare className="text-sm" />
                  Edit
                </Link>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs">
                  <HiOutlineEnvelope
                    className="shrink-0 text-base"
                    style={{ color: COLORS.textMuted }}
                  />
                  <span className="truncate" style={{ color: COLORS.textSecondary }}>
                    {user?.email}
                  </span>
                </div>

                {profile?.phone && (
                  <div className="flex items-center gap-2.5 text-xs">
                    <HiOutlinePhone
                      className="shrink-0 text-base"
                      style={{ color: COLORS.textMuted }}
                    />
                    <span style={{ color: COLORS.textSecondary }}>{profile.phone}</span>
                  </div>
                )}

                {profile?.district && (
                  <div className="flex items-center gap-2.5 text-xs">
                    <HiOutlineMapPin
                      className="shrink-0 text-base"
                      style={{ color: COLORS.textMuted }}
                    />
                    <span className="capitalize" style={{ color: COLORS.textSecondary }}>
                      {profile.district}
                    </span>
                  </div>
                )}

                {profile?.preparation_level && (
                  <div className="flex items-center gap-2.5 text-xs">
                    <HiOutlineAcademicCap
                      className="shrink-0 text-base"
                      style={{ color: COLORS.textMuted }}
                    />
                    <span className="capitalize" style={{ color: COLORS.textSecondary }}>
                      {profile.preparation_level}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2.5 text-xs">
                  <HiOutlineCalendar
                    className="shrink-0 text-base"
                    style={{ color: COLORS.textMuted }}
                  />
                  <span style={{ color: COLORS.textSecondary }}>Joined: {memberSince}</span>
                </div>
              </div>

              {stats.attempts > 0 && (
                <div
                  className="mt-5 grid grid-cols-3 gap-2 rounded-xl border p-3"
                  style={{
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.background,
                  }}
                >
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: COLORS.primary }}>
                      {stats.attempts}
                    </p>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wide"
                      style={{ color: COLORS.textMuted }}
                    >
                      Exams
                    </p>
                  </div>
                  <div className="border-x text-center" style={{ borderColor: COLORS.border }}>
                    <p className="text-lg font-bold" style={{ color: COLORS.success }}>
                      {stats.avgScore}%
                    </p>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wide"
                      style={{ color: COLORS.textMuted }}
                    >
                      Avg
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: COLORS.warning }}>
                      {stats.bestScore}%
                    </p>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wide"
                      style={{ color: COLORS.textMuted }}
                    >
                      Best
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="rounded-2xl border bg-white p-6"
            style={{
              borderColor: COLORS.border,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="mb-5 flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#FEF3C7" }}
              >
                <HiOutlineBolt className="text-lg" style={{ color: COLORS.accent }} />
              </div>
              <h2 className="text-base font-bold" style={{ color: COLORS.textPrimary }}>
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <QuickActionCard
                icon={HiOutlineDocumentText}
                label="Take Exam"
                href="/exams"
                color={COLORS.primary}
                bgColor="#E0F2FE"
              />
              <QuickActionCard
                icon={HiOutlineBookOpen}
                label="Courses"
                href="/courses"
                color={COLORS.success}
                bgColor="#ECFDF5"
              />
              <QuickActionCard
                icon={HiOutlineChartPie}
                label="Analytics"
                href="/dashboard/analytics"
                color="#7C3AED"
                bgColor="#F3E8FF"
              />
              <QuickActionCard
                icon={HiOutlineSquares2X2}
                label="History"
                href="/dashboard/history"
                color={COLORS.warning}
                bgColor="#FEF3C7"
              />
              <QuickActionCard
                icon={HiOutlineTrophy}
                label="Leaderboard"
                href="/leaderboard"
                color={COLORS.danger}
                bgColor="#FEF2F2"
              />
              <QuickActionCard
                icon={HiOutlineUser}
                label="Profile"
                href="/dashboard/profile"
                color="#0891B2"
                bgColor="#CFFAFE"
              />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            📋 RECENT ATTEMPTS (Limited to 5)
        ════════════════════════════════════════════════════ */}
        <div
          className="rounded-2xl border bg-white p-6"
          style={{
            borderColor: COLORS.border,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#E0F2FE" }}
              >
                <HiOutlineDocumentText className="text-lg" style={{ color: COLORS.primary }} />
              </div>
              <div>
                <h2 className="text-base font-bold" style={{ color: COLORS.textPrimary }}>
                  Recent Attempts
                </h2>
                {limitedAttempts.length > 0 && (
                  <p className="text-xs" style={{ color: COLORS.textMuted }}>
                    Showing last {limitedAttempts.length} attempts
                  </p>
                )}
              </div>
            </div>

            {recentAttempts.length > 0 && (
              <Link
                href="/dashboard/history"
                className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-all hover:shadow-sm"
                style={{
                  borderColor: COLORS.border,
                  color: COLORS.primary,
                }}
              >
                <HiOutlineEye className="text-sm" />
                View All
                <HiOutlineArrowRight className="text-xs" />
              </Link>
            )}
          </div>

          {limitedAttempts.length > 0 ? (
            <div className="space-y-3">
              {limitedAttempts.map((attempt, index) => (
                <AttemptRow key={attempt.id} attempt={attempt} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E0F2FE" }}
              >
                <HiOutlineDocumentText className="text-4xl" style={{ color: COLORS.primary }} />
              </div>
              <h3 className="mb-2 text-lg font-bold" style={{ color: COLORS.textPrimary }}>
                No exams taken yet!
              </h3>
              <p className="mb-5 max-w-sm text-sm" style={{ color: COLORS.textSecondary }}>
                Take your first exam and start your learning journey 🎯
              </p>
              <Link
                href="/exams"
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                  boxShadow: `0 4px 14px rgba(30, 156, 215, 0.4)`,
                }}
              >
                <HiOutlineRocketLaunch className="text-lg" />
                Start Exam
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
