// components/dashboard/DashboardClient.jsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import {
  FaBook,
  FaClipboardList,
  FaTrophy,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEdit,
  FaArrowRight,
  FaBolt,
  FaClock,
  FaMedal,
  FaChartLine,
  FaFire,
} from "react-icons/fa";

// ═══════════════════════════════════════════════
// HELPER: বাংলা Number
// ═══════════════════════════════════════════════
function toBangla(num) {
  if (num === null || num === undefined || isNaN(num)) return "০";
  return String(num).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
}

// ═══════════════════════════════════════════════
// HELPER: সময় Format (seconds → ঘণ্টা/মিনিট)
// ═══════════════════════════════════════════════
function formatTime(seconds) {
  if (!seconds || seconds === 0) return "০ মিনিট";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${toBangla(h)} ঘণ্টা ${toBangla(m)} মিনিট`;
  return `${toBangla(m)} মিনিট`;
}

// ═══════════════════════════════════════════════
// HELPER: Date Format বাংলায়
// ═══════════════════════════════════════════════
function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ═══════════════════════════════════════════════
// COMPONENT: Stats Card
// ═══════════════════════════════════════════════
function StatsCard({ icon: Icon, label, value, color, delay, suffix = "" }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: delay,
        ease: "back.out(1.7)",
      }
    );
  }, [delay]);

  // Value Display Logic
  const displayValue = typeof value === "string" ? value : toBangla(value);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:-translate-y-1"
    >
      {/* Background Glow */}
      <div
        className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-20 blur-xl"
        style={{ backgroundColor: color }}
      />

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="text-xl" style={{ color }} />
        </div>

        {/* Value + Label */}
        <div className="min-w-0">
          <p className="text-2xl font-bold text-white">
            {displayValue}
            {suffix}
          </p>
          <p className="mt-0.5 truncate text-xs text-white/60">{label}</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Quick Action Button
// ═══════════════════════════════════════════════
function QuickAction({ icon: Icon, label, href, color, description }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:-translate-y-0.5"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="text-lg" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm">{label}</p>
        <p className="text-xs text-white/50 truncate">{description}</p>
      </div>
      <FaArrowRight className="shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/60" />
    </Link>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Recent Attempt Row
// ═══════════════════════════════════════════════
function AttemptRow({ attempt, index }) {
  const total = Number(attempt.total_marks) || 0;
  const score = Number(attempt.score) || 0;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const isPassed = attempt.is_passed;

  return (
    <Link
      href={`/exams/${attempt.exams?.id}/result/${attempt.id}`}
      className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 p-3 transition-all duration-200 hover:border-white/15 hover:bg-white/8"
    >
      {/* Index */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white/60">
        {toBangla(index + 1)}
      </div>

      {/* Exam Title */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-white">
          {attempt.exams?.title || "পরীক্ষা"}
        </p>
        <p className="text-xs text-white/40">{formatDate(attempt.completed_at)}</p>
      </div>

      {/* Score */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold" style={{ color: isPassed ? "#00D4AA" : "#FF6B6B" }}>
          {toBangla(percentage)}%
        </p>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-0.5"
          style={{
            backgroundColor: isPassed ? "rgba(0,212,170,0.15)" : "rgba(255,107,107,0.15)",
            color: isPassed ? "#00D4AA" : "#FF6B6B",
          }}
        >
          {isPassed ? "পাস ✓" : "ফেল ✗"}
        </span>
      </div>

      <FaArrowRight className="shrink-0 text-xs text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-white/50" />
    </Link>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Info Row (Profile Card)
// ═══════════════════════════════════════════════
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-4 py-3">
      <Icon className="shrink-0 text-sm text-white/40" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/40">{label}</p>
        <p className="truncate text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN: DashboardClient
// ═══════════════════════════════════════════════
export default function DashboardClient({ user, profile, stats, recentAttempts = [] }) {
  const welcomeRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  // Member Since
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "অজানা";

  // Greeting by Time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "শুভ সকাল" : hour < 17 ? "শুভ বিকাল" : "শুভ সন্ধ্যা";

  // GSAP Animations
  useEffect(() => {
    if (welcomeRef.current) {
      gsap.fromTo(
        welcomeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        x: 30,
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        x: -20,
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A1A] pb-20 pt-8">
      {/* ── Background Orbs ── */}
      <div
        ref={orb1Ref}
        className="pointer-events-none fixed left-1/4 top-1/4 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "#6C63FF" }}
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none fixed bottom-1/4 right-1/4 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "#00D4AA" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ════════════════════════════════════
            WELCOME SECTION
        ════════════════════════════════════ */}
        <div
          ref={welcomeRef}
          className="mb-8 overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8 backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(0,212,170,0.08) 100%)",
          }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Welcome Text */}
            <div>
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <span className="text-2xl">👋</span>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {greeting}!
                </span>
                {stats.attempts > 0 && (
                  <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 flex items-center gap-1">
                    <FaFire className="text-xs" />
                    {toBangla(stats.attempts)} পরীক্ষা দিয়েছেন
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                স্বাগতম,{" "}
                <span className="text-primary">
                  {profile?.full_name || user?.email?.split("@")[0] || "বন্ধু"}
                </span>
                !
              </h1>
              <p className="mt-2 text-sm text-white/60">
                আপনার শেখার যাত্রা চলছে। প্রতিদিন একটু একটু করে এগিয়ে যান। 🎯
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/exams"
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80 hover:shadow-lg hover:-translate-y-0.5"
                style={{ boxShadow: "0 0 20px rgba(108,99,255,0.3)" }}
              >
                <FaClipboardList />
                পরীক্ষা দিন
              </Link>
              <Link
                href="/courses"
                className="flex items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-5 py-2.5 text-sm font-semibold text-secondary transition-all duration-300 hover:bg-secondary/20 hover:-translate-y-0.5"
              >
                <FaBook />
                কোর্স দেখুন
              </Link>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            STATS CARDS (6 Cards)
        ════════════════════════════════════ */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          <StatsCard
            icon={FaClipboardList}
            label="মোট পরীক্ষা দিয়েছেন"
            value={stats.attempts}
            color="#6C63FF"
            delay={0.1}
          />
          <StatsCard
            icon={FaChartLine}
            label="গড় স্কোর"
            value={stats.avgScore}
            suffix="%"
            color="#00D4AA"
            delay={0.15}
          />
          <StatsCard
            icon={FaTrophy}
            label="সর্বোচ্চ স্কোর"
            value={stats.bestScore}
            suffix="%"
            color="#FFB800"
            delay={0.2}
          />
          <StatsCard
            icon={FaCheckCircle}
            label="পাস রেট"
            value={stats.passRate}
            suffix="%"
            color="#00D4AA"
            delay={0.25}
          />
          <StatsCard
            icon={FaMedal}
            label="পাস করেছেন"
            value={stats.passCount}
            color="#FF6B6B"
            delay={0.3}
          />
          <StatsCard
            icon={FaClock}
            label="মোট পড়ার সময়"
            value={formatTime(stats.totalTimeTaken)}
            color="#A855F7"
            delay={0.35}
          />
        </div>

        {/* ════════════════════════════════════
            PROFILE + QUICK ACTIONS
        ════════════════════════════════════ */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* ── Profile Card ── */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">আমার প্রোফাইল</h2>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20"
              >
                <FaEdit className="text-xs" />
                Edit
              </Link>
            </div>

            {/* Avatar */}
            <div className="mb-5 flex items-center gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
                }}
              >
                {(profile?.full_name || user?.email || "U").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-white">{profile?.full_name || "নাম দেওয়া হয়নি"}</p>
                <p className="text-sm text-white/50">
                  {profile?.role === "admin" ? "👑 Admin" : "🎓 Student"}
                </p>
                {stats.attempts > 0 && (
                  <p className="text-xs text-primary mt-0.5">
                    {toBangla(stats.attempts)} পরীক্ষা • {toBangla(stats.avgScore)}% গড়
                  </p>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2.5">
              <InfoRow icon={FaEnvelope} label="ইমেইল" value={user?.email || "—"} />
              <InfoRow icon={FaPhone} label="ফোন" value={profile?.phone || "দেওয়া হয়নি"} />
              <InfoRow icon={FaCalendarAlt} label="যোগদান" value={memberSince} />
            </div>
          </div>

          {/* ── Quick Actions ── */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <FaBolt className="text-yellow-400" />
              <h2 className="text-base font-bold text-white">Quick Actions</h2>
            </div>

            <div className="space-y-2.5">
              <QuickAction
                icon={FaClipboardList}
                label="পরীক্ষা দাও"
                description="MCQ Practice শুরু করো"
                href="/exams"
                color="#6C63FF"
              />
              <QuickAction
                icon={FaChartLine}
                label="পরীক্ষার ইতিহাস"
                description="সব পরীক্ষার ফলাফল দেখো"
                href="/dashboard/history"
                color="#00D4AA"
              />
              <QuickAction
                icon={FaTrophy}
                label="লিডারবোর্ড"
                description="Top পরীক্ষার্থীদের দেখো"
                href="/leaderboard"
                color="#FFB800"
              />
              <QuickAction
                icon={FaUser}
                label="Profile আপডেট"
                description="তথ্য ও ছবি আপডেট করো"
                href="/dashboard/profile"
                color="#FF6B6B"
              />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            RECENT ATTEMPTS
        ════════════════════════════════════ */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaClipboardList className="text-primary" />
              <h2 className="text-base font-bold text-white">সাম্প্রতিক পরীক্ষা</h2>
            </div>
            {recentAttempts.length > 0 && (
              <Link
                href="/dashboard/history"
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                সব দেখুন
                <FaArrowRight className="text-xs" />
              </Link>
            )}
          </div>

          {/* Attempts List */}
          {recentAttempts.length > 0 ? (
            <div className="space-y-2.5">
              {recentAttempts.map((attempt, index) => (
                <AttemptRow key={attempt.id} attempt={attempt} index={index} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(108,99,255,0.1)" }}
              >
                <FaClipboardList className="text-3xl" style={{ color: "#6C63FF" }} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">এখনো কোনো পরীক্ষা দেননি!</h3>
              <p className="mb-5 text-sm text-white/50">
                প্রথম পরীক্ষা দাও এবং তোমার যাত্রা শুরু করো 🎯
              </p>
              <Link
                href="/exams"
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/80 hover:-translate-y-0.5"
              >
                <FaClipboardList />
                পরীক্ষা দিন
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
