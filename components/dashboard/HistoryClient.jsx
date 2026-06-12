// components/dashboard/HistoryClient.jsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaCalendarAlt,
  FaFilter,
  FaSort,
} from "react-icons/fa";

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
function toBangla(num) {
  if (num === null || num === undefined || isNaN(num)) return "০";
  return String(num).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
}

function formatTime(seconds) {
  if (!seconds || seconds === 0) return "০ সেকেন্ড";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${toBangla(h)} ঘণ্টা ${toBangla(m)} মিনিট`;
  if (m > 0) return `${toBangla(m)} মিনিট ${toBangla(s)} সেকেন্ড`;
  return `${toBangla(s)} সেকেন্ড`;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ═══════════════════════════════════════════════
// COMPONENT: Summary Card
// ═══════════════════════════════════════════════
function SummaryCard({ icon: Icon, label, value, color, bgColor, suffix = "" }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        className={`absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-20 blur-xl ${bgColor}`}
      />
      <div className="relative flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
          style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
        >
          <Icon className="text-xl" style={{ color }} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#1F2937]">
            {toBangla(value)}
            {suffix}
          </p>
          <p className="text-xs text-[#64748B] font-medium">{label}</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COMPONENT: Attempt Card
// ═══════════════════════════════════════════════
function AttemptCard({ attempt, index }) {
  const total = Number(attempt.total_marks) || 0;
  const score = Number(attempt.score) || 0;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPassed = attempt.is_passed;
  const categoryName = attempt.exams?.categories?.name || "সাধারণ";

  return (
    <Link
      href={`/exams/${attempt.exams?.id}/result/${attempt.id}`}
      className="group block rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-sm font-bold text-primary-dark">
          {toBangla(index)}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#1F2937] truncate group-hover:text-primary transition-colors">
            {attempt.exams?.title || "পরীক্ষা"}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-xs" />
              {formatDate(attempt.completed_at)}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-xs" />
              {formatTime(attempt.time_taken_seconds)}
            </span>
            <span className="rounded-full bg-[#F1F5F9] border border-[#E2E8F0] px-2 py-0.5 text-xs text-[#475569]">
              {categoryName}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            <span className="text-green-600 font-medium">
              ✓ সঠিক: {toBangla(attempt.correct_count || 0)}
            </span>
            <span className="text-red-600 font-medium">
              ✗ ভুল: {toBangla(attempt.wrong_count || 0)}
            </span>
            <span className="text-amber-600 font-medium">
              − বাদ: {toBangla(attempt.skipped_count || 0)}
            </span>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: isPassed ? "#059669" : "#DC2626" }}>
              {toBangla(percentage)}%
            </p>
            <p className="text-xs text-[#94A3B8]">
              {toBangla(score)}/{toBangla(total)}
            </p>
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold border"
            style={{
              backgroundColor: isPassed ? "#D1FAE5" : "#FEE2E2",
              color: isPassed ? "#059669" : "#DC2626",
              borderColor: isPassed ? "#A7F3D0" : "#FECACA",
            }}
          >
            {isPassed ? "✓ পাস" : "✗ ফেল"}
          </span>
        </div>

        <FaArrowRight className="hidden sm:block shrink-0 text-[#CBD5E1] transition-all group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════
const ITEMS_PER_PAGE = 10;

export default function HistoryClient({ attempts, summary }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const orb1Ref = useRef(null);

  // ── Orb Animation ──
  useEffect(() => {
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
  }, []);

  // ── Filter + Search + Sort ──
  const filteredAttempts = useMemo(() => {
    let result = [...attempts];

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((a) => (a.exams?.title || "").toLowerCase().includes(term));
    }

    if (filter === "passed") {
      result = result.filter((a) => a.is_passed === true);
    } else if (filter === "failed") {
      result = result.filter((a) => a.is_passed === false);
    }

    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.completed_at) - new Date(a.completed_at);
      }
      if (sortBy === "oldest") {
        return new Date(a.completed_at) - new Date(b.completed_at);
      }
      const aPercent = a.total_marks > 0 ? (Number(a.score) / Number(a.total_marks)) * 100 : 0;
      const bPercent = b.total_marks > 0 ? (Number(b.score) / Number(b.total_marks)) * 100 : 0;
      if (sortBy === "highest") return bPercent - aPercent;
      if (sortBy === "lowest") return aPercent - bPercent;
      return 0;
    });

    return result;
  }, [attempts, search, filter, sortBy]);

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(filteredAttempts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedAttempts = filteredAttempts.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // ── Handlers ──
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white pb-20 pt-8">
      {/* Soft Background Orb */}
      <div
        ref={orb1Ref}
        className="pointer-events-none fixed left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary opacity-5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="mb-3 inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-primary transition-colors font-medium"
            >
              <FaArrowLeft className="text-xs" />
              Dashboard এ ফিরে যান
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] flex items-center gap-3">
              <FaClipboardList className="text-primary" />
              পরীক্ষার ইতিহাস
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">আপনার সব পরীক্ষার ফলাফল এক জায়গায়</p>
          </div>
        </div>

        {/* SUMMARY STATS */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <SummaryCard
            icon={FaClipboardList}
            label="মোট পরীক্ষা"
            value={summary.total}
            color="#1E9CD7"
            bgColor="bg-primary"
          />
          <SummaryCard
            icon={FaCheckCircle}
            label="পাস"
            value={summary.passed}
            color="#059669"
            bgColor="bg-green-500"
          />
          <SummaryCard
            icon={FaTimesCircle}
            label="ফেল"
            value={summary.failed}
            color="#DC2626"
            bgColor="bg-red-500"
          />
          <SummaryCard
            icon={FaChartLine}
            label="গড় স্কোর"
            value={summary.avgScore}
            suffix="%"
            color="#D97706"
            bgColor="bg-amber-500"
          />
        </div>

        {/* FILTER BAR */}
        {attempts.length > 0 && (
          <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm" />
                <input
                  type="text"
                  placeholder="পরীক্ষার নাম খুঁজুন..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1F2937] placeholder-[#94A3B8] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs z-10" />
                <select
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-full sm:w-auto rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-8 text-sm text-[#1F2937] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none font-medium"
                >
                  <option value="all">সব দেখুন</option>
                  <option value="passed">শুধু পাস</option>
                  <option value="failed">শুধু ফেল</option>
                </select>
              </div>

              {/* Sort */}
              <div className="relative">
                <FaSort className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs z-10" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full sm:w-auto rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-8 text-sm text-[#1F2937] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none font-medium"
                >
                  <option value="newest">নতুন আগে</option>
                  <option value="oldest">পুরাতন আগে</option>
                  <option value="highest">বেশি স্কোর আগে</option>
                  <option value="lowest">কম স্কোর আগে</option>
                </select>
              </div>
            </div>

            {(search || filter !== "all") && (
              <div className="mt-3 text-xs text-[#64748B] font-medium">
                {toBangla(filteredAttempts.length)} টি পরীক্ষা পাওয়া গেছে
              </div>
            )}
          </div>
        )}

        {/* ATTEMPTS LIST */}
        {paginatedAttempts.length > 0 ? (
          <div className="space-y-3">
            {paginatedAttempts.map((attempt, idx) => (
              <AttemptCard key={attempt.id} attempt={attempt} index={startIdx + idx + 1} />
            ))}
          </div>
        ) : attempts.length === 0 ? (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-12 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/30 shadow-sm shadow-primary/10">
                <FaClipboardList className="text-4xl text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#1F2937]">এখনো কোনো পরীক্ষা দেননি!</h3>
              <p className="mb-6 text-sm text-[#64748B]">
                প্রথম পরীক্ষা দিয়ে আপনার যাত্রা শুরু করুন 🎯
              </p>
              <Link
                href="/exams"
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                <FaClipboardList />
                পরীক্ষা দিন
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-12 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <FaSearch className="text-4xl text-[#CBD5E1] mb-3" />
              <h3 className="mb-2 text-lg font-bold text-[#1F2937]">কোনো ফলাফল পাওয়া যায়নি</h3>
              <p className="text-sm text-[#64748B]">অন্য Search Term বা Filter দিয়ে চেষ্টা করুন</p>
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm text-[#475569] font-medium shadow-sm transition-all hover:bg-[#F1F5F9] hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaArrowLeft className="text-xs" />
              <span className="hidden sm:inline">পূর্ববর্তী</span>
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                .map((page, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && page - prev > 1;

                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && <span className="text-[#94A3B8] px-1">...</span>}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          safePage === page
                            ? "bg-primary text-white shadow-lg shadow-primary/25"
                            : "border border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F1F5F9] hover:border-primary/30"
                        }`}
                      >
                        {toBangla(page)}
                      </button>
                    </div>
                  );
                })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm text-[#475569] font-medium shadow-sm transition-all hover:bg-[#F1F5F9] hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">পরবর্তী</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
