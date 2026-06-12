"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaTrophy,
  FaMedal,
  FaCrown,
  FaUser,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

// ═══════════════════════════════════════════════════════════
// 🔢 Helper: Convert English number to Bangla
// ═══════════════════════════════════════════════════════════
const toBangla = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => banglaDigits[d]);
};

// ═══════════════════════════════════════════════════════════
// ⏱️ Helper: Format seconds to MM:SS
// ═══════════════════════════════════════════════════════════
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${toBangla(String(mins).padStart(2, "0"))}:${toBangla(String(secs).padStart(2, "0"))}`;
};

// ═══════════════════════════════════════════════════════════
// 🏆 Main Component
// ═══════════════════════════════════════════════════════════
export default function LeaderboardClient({ leaderboard, currentUser, totalParticipants }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // ─────────────────────────────────────────
  // Split: Top 3 vs Others (rank 4+)
  // ─────────────────────────────────────────
  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  // ─────────────────────────────────────────
  // Pagination logic for "others"
  // ─────────────────────────────────────────
  const totalPages = Math.ceil(others.length / ITEMS_PER_PAGE);
  const paginatedOthers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return others.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, others]);

  // ─────────────────────────────────────────
  // Empty State
  // ─────────────────────────────────────────
  if (leaderboard.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          {/* Trophy Icon */}
          <div className="w-24 h-24 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-5">
            <FaTrophy className="text-4xl text-amber-500 opacity-60" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">কোনো ডাটা নেই!</h2>
          <p className="text-slate-500 mb-6">এখনো কেউ পরীক্ষা সম্পন্ন করেনি।</p>

          <Link
            href="/exams"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            পরীক্ষা শুরু করুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] relative overflow-hidden">
      {/* ═══════════ Background Orbs (Light) ═══════════ */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* ═══════════ Back Button ═══════════ */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition-colors duration-200 font-medium"
        >
          <FaArrowLeft className="text-sm" />
          <span>ড্যাশবোর্ডে ফিরুন</span>
        </Link>

        {/* ═══════════ Header ═══════════ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <FaTrophy className="text-4xl text-amber-500" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-amber-500 via-primary to-secondary bg-clip-text text-transparent">
              লিডারবোর্ড
            </h1>
            <FaTrophy className="text-4xl text-amber-500" />
          </div>
          <p className="text-slate-500 text-sm sm:text-base">
            মোট <span className="font-semibold text-primary">{toBangla(totalParticipants)}</span> জন
            অংশগ্রহণকারী
          </p>
        </div>

        {/* ═══════════ SECTION 1: Top 3 Podium ═══════════ */}
        {top3.length > 0 && (
          <div className="mb-10">
            {/* Section Title */}
            <h2 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-800">
              <HiSparkles className="text-amber-500" />
              <span>শীর্ষ ৩ জন</span>
              <HiSparkles className="text-amber-500" />
            </h2>

            {/* Podium Card bg wrapper */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm mb-4">
              {/* Podium Layout */}
              <div className="flex justify-center items-end gap-2 sm:gap-4">
                {/* 🥈 2nd Place (Left) */}
                {top3[1] && (
                  <PodiumCard
                    entry={top3[1]}
                    position={2}
                    height="h-40 sm:h-48"
                    gradient="from-slate-300 to-slate-500"
                    icon={<FaMedal className="text-3xl sm:text-4xl text-slate-400" />}
                  />
                )}

                {/* 🥇 1st Place (Center, Tallest) */}
                <PodiumCard
                  entry={top3[0]}
                  position={1}
                  height="h-52 sm:h-64"
                  gradient="from-yellow-400 to-orange-500"
                  icon={<FaCrown className="text-4xl sm:text-5xl text-yellow-400" />}
                />

                {/* 🥉 3rd Place (Right) */}
                {top3[2] && (
                  <PodiumCard
                    entry={top3[2]}
                    position={3}
                    height="h-36 sm:h-44"
                    gradient="from-orange-500 to-orange-700"
                    icon={<FaMedal className="text-3xl sm:text-4xl text-orange-500" />}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ SECTION 2: Your Position Card ═══════════ */}
        {currentUser && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                <FaUser className="text-primary text-xs" />
              </div>
              আপনার অবস্থান
            </h2>

            {/* Your Position Card */}
            <div className="relative bg-linear-to-r from-primary/8 via-white to-secondary/8 border-2 border-primary/30 rounded-2xl p-5 sm:p-6 shadow-md shadow-primary/10">
              {/* "You" Badge */}
              <div className="absolute -top-3 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm shadow-primary/30">
                আপনি (You)
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Left: Rank + ID */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                    #{toBangla(String(currentUser.rank).padStart(2, "0"))}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-0.5">আপনার ID</div>
                    <div className="text-lg font-bold text-gray-900">
                      {currentUser.anonymous_id.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d])}
                    </div>
                  </div>
                </div>

                {/* Right: Score */}
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600">
                    {toBangla(currentUser.score)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    ভুল:{" "}
                    <span className="text-red-500 font-medium">
                      {toBangla(currentUser.wrong_count)}
                    </span>{" "}
                    | সময়:{" "}
                    <span className="font-medium text-slate-600">
                      {formatTime(currentUser.time_taken_seconds)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ SECTION 3: Other Participants ═══════════ */}
        {others.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              অন্যান্য অংশগ্রহণকারী (#{toBangla(4)} - #{toBangla(leaderboard.length)})
            </h2>

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-[#F1F5F9] rounded-t-xl text-sm text-slate-500 font-semibold border border-[#E2E8F0] border-b-0">
              <div className="col-span-2">র‍্যাঙ্ক</div>
              <div className="col-span-5">ইউজার ID</div>
              <div className="col-span-2 text-center">স্কোর</div>
              <div className="col-span-3 text-right">সময়</div>
            </div>

            {/* Participants List */}
            <div className="space-y-2 mb-6">
              {paginatedOthers.map((entry) => (
                <ListCard key={entry.user_id} entry={entry} />
              ))}
            </div>

            {/* ═══════════ Pagination ═══════════ */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                {/* Prev Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 text-slate-600"
                >
                  <FaChevronLeft />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : "bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-slate-600"
                    }`}
                  >
                    {toBangla(page)}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 text-slate-600"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 🏅 Podium Card Component (Top 3)
// ═══════════════════════════════════════════════════════════
function PodiumCard({ entry, position, height, gradient, icon }) {
  const anonymousId = entry.anonymous_id.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

  return (
    <div className="flex flex-col items-center flex-1 max-w-35">
      {/* Icon Above */}
      <div className="mb-2">{icon}</div>

      {/* User ID */}
      <div className="text-xs sm:text-sm text-slate-600 mb-1 font-semibold text-center">
        {anonymousId}
      </div>

      {/* Score */}
      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {toBangla(entry.score)}
      </div>

      {/* Podium Block */}
      <div
        className={`w-full ${height} bg-linear-to-t ${gradient} rounded-t-xl flex items-start justify-center pt-3 shadow-md ${
          entry.is_current_user ? "ring-4 ring-primary ring-offset-2" : ""
        }`}
      >
        <span className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
          {toBangla(position)}
        </span>
      </div>

      {/* "You" Indicator */}
      {entry.is_current_user && (
        <div className="mt-2 px-2 py-1 bg-primary text-white rounded-full text-xs font-bold shadow-sm">
          আপনি
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 📋 List Card Component (Rank 4+)
// ═══════════════════════════════════════════════════════════
function ListCard({ entry }) {
  const anonymousId = entry.anonymous_id.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

  return (
    <div
      className={`border rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 ${
        entry.is_current_user
          ? "bg-primary/5 border-primary/30 shadow-sm shadow-primary/10"
          : "bg-white border-[#E2E8F0] hover:shadow-sm hover:border-primary/20"
      }`}
    >
      {/* Mobile Layout */}
      <div className="sm:hidden flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Rank Circle */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              entry.is_current_user ? "bg-primary/15 text-primary" : "bg-[#F1F5F9] text-slate-600"
            }`}
          >
            {toBangla(entry.rank)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{anonymousId}</div>
            <div className="text-xs text-slate-500">
              সময়: {formatTime(entry.time_taken_seconds)}
            </div>
          </div>
        </div>
        {/* Score */}
        <div className="text-xl font-bold text-amber-600">{toBangla(entry.score)}</div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
        <div
          className={`col-span-2 font-bold ${
            entry.is_current_user ? "text-primary" : "text-slate-500"
          }`}
        >
          #{toBangla(entry.rank)}
        </div>
        <div className="col-span-5 font-semibold text-gray-900">{anonymousId}</div>
        <div className="col-span-2 text-center text-xl font-bold text-amber-600">
          {toBangla(entry.score)}
        </div>
        <div className="col-span-3 text-right text-sm text-slate-500">
          {formatTime(entry.time_taken_seconds)}
        </div>
      </div>
    </div>
  );
}
