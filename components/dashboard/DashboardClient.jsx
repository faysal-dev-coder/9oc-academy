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
} from "react-icons/fa";

// ═══════════════════════════════════
// STATS CARD COMPONENT
// ═══════════════════════════════════
function StatsCard({ icon: Icon, label, value, color, delay }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
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
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8"
    >
      {/* Background Glow */}
      <div
        className={`absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-20 blur-xl`}
        style={{ backgroundColor: color }}
      />

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="text-2xl" style={{ color: color }} />
        </div>

        {/* Value + Label */}
        <div>
          <p className="text-3xl font-bold text-white">{value === 0 ? "০" : value}</p>
          <p className="mt-1 text-sm text-white/60">{label}</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// QUICK ACTION BUTTON
// ═══════════════════════════════════
function QuickAction({ icon: Icon, label, href, color, description }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="text-xl" style={{ color: color }} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-white">{label}</p>
        <p className="text-sm text-white/50">{description}</p>
      </div>
      <FaArrowRight className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/60" />
    </Link>
  );
}

// ═══════════════════════════════════
// MAIN DASHBOARD CLIENT COMPONENT
// ═══════════════════════════════════
export default function DashboardClient({ user, profile, stats }) {
  const welcomeRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  // Member Since Date Format
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "অজানা";

  // Welcome Animation
  useEffect(() => {
    if (welcomeRef.current) {
      gsap.fromTo(
        welcomeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    // Orb Animation
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
        {/* ── WELCOME SECTION ── */}
        <div
          ref={welcomeRef}
          className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(0,212,170,0.08) 100%)",
          }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Welcome Text */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-3xl">👋</span>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Welcome Back!
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                স্বাগতম,{" "}
                <span className="text-primary">
                  {profile?.full_name || user?.email?.split("@")[0] || "বন্ধু"}
                </span>
                !
              </h1>
              <p className="mt-2 text-white/60">
                আপনার শেখার যাত্রা শুরু হোক আজই। প্রতিদিন একটু একটু করে এগিয়ে যান।
              </p>
            </div>

            {/* Quick Buttons */}
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/courses"
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80 hover:shadow-lg"
                style={{ boxShadow: "0 0 20px rgba(108,99,255,0.3)" }}
              >
                <FaBook />
                কোর্স দেখুন
              </Link>
              <Link
                href="/exams"
                className="flex items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-5 py-3 text-sm font-semibold text-secondary transition-all duration-300 hover:bg-secondary/20"
              >
                <FaClipboardList />
                পরীক্ষা দিন
              </Link>
            </div>
          </div>
        </div>

        {/* ── STATS CARDS ── */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard
            icon={FaBook}
            label="ভর্তি হয়েছেন"
            value={stats.enrollments}
            color="#6C63FF"
            delay={0.1}
          />
          <StatsCard
            icon={FaClipboardList}
            label="পরীক্ষা দিয়েছেন"
            value={stats.attempts}
            color="#00D4AA"
            delay={0.2}
          />
          <StatsCard
            icon={FaTrophy}
            label="গড় স্কোর"
            value={`${stats.avgScore}%`}
            color="#FFB800"
            delay={0.3}
          />
          <StatsCard
            icon={FaCheckCircle}
            label="সম্পন্ন কোর্স"
            value={stats.completed}
            color="#FF6B6B"
            delay={0.4}
          />
        </div>

        {/* ── PROFILE + QUICK ACTIONS ── */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Profile Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">আমার প্রোফাইল</h2>
              <Link
                href="/profile"
                className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20"
              >
                <FaEdit className="text-xs" />
                Edit
              </Link>
            </div>

            {/* Avatar */}
            <div className="mb-6 flex items-center gap-4">
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
              </div>
            </div>

            {/* Info List */}
            <div className="space-y-3">
              <InfoRow icon={FaEnvelope} label="ইমেইল" value={user?.email || "—"} />
              <InfoRow icon={FaPhone} label="ফোন" value={profile?.phone || "দেওয়া হয়নি"} />
              <InfoRow icon={FaCalendarAlt} label="যোগদান" value={memberSince} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <FaBolt className="text-accent" />
              <h2 className="text-lg font-bold text-white">Quick Actions</h2>
            </div>

            <div className="space-y-3">
              <QuickAction
                icon={FaBook}
                label="কোর্সে ভর্তি হও"
                description="নতুন কোর্স খুঁজে পাও"
                href="/courses"
                color="#6C63FF"
              />
              <QuickAction
                icon={FaClipboardList}
                label="পরীক্ষা দাও"
                description="MCQ Practice শুরু করো"
                href="/exams"
                color="#00D4AA"
              />
              <QuickAction
                icon={FaTrophy}
                label="Results দেখো"
                description="আগের পরীক্ষার ফলাফল"
                href="/results"
                color="#FFB800"
              />
              <QuickAction
                icon={FaUser}
                label="Profile Update করো"
                description="ছবি ও তথ্য আপডেট করো"
                href="/profile"
                color="#FF6B6B"
              />
            </div>
          </div>
        </div>

        {/* ── RECENT ACTIVITY (Empty State) ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-lg font-bold text-white">সাম্প্রতিক Activity</h2>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(108,99,255,0.1)" }}
            >
              <FaClipboardList className="text-4xl" style={{ color: "#6C63FF" }} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">এখনো কোনো Activity নেই!</h3>
            <p className="mb-6 text-white/50">প্রথম পরীক্ষা দাও এবং তোমার যাত্রা শুরু করো 🎯</p>
            <Link
              href="/courses"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary/80"
            >
              <FaBook />
              এখনই শুরু করো
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper: InfoRow ──
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
