"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
} from "react-icons/hi2";
import { FILTER_CATEGORIES, FILTER_PRICES, FILTER_LEVELS } from "@/constants";

// ═══════════════════════════════════════════
// 🔍 CourseFilter — Sidebar Filter Component
// ═══════════════════════════════════════════

export default function CourseFilter({ filters, onFilterChange, onReset, totalResults = 0 }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ─── Active Filter Check ──────────────
  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.price !== "all" ||
    filters.level !== "all";

  // ─── Handle Change ────────────────────
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <>
      {/* ─── Mobile Toggle Button ────────── */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 lg:hidden cursor-pointer"
      >
        <HiOutlineAdjustmentsHorizontal className="h-5 w-5" />
        <span>ফিল্টার দেখুন</span>
        {hasActiveFilters && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs">সক্রিয়</span>
        )}
      </button>

      {/* ─── Mobile Overlay ──────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ─── Mobile Sidebar Drawer ───────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto bg-dark p-6 lg:hidden"
          >
            {/* Mobile Header */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">ফিল্টার</h3>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 cursor-pointer"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Content (Mobile) */}
            <FilterContent
              filters={filters}
              handleChange={handleChange}
              hasActiveFilters={hasActiveFilters}
              onReset={onReset}
              totalResults={totalResults}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ─── Desktop Sidebar ─────────────── */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <FilterContent
            filters={filters}
            handleChange={handleChange}
            hasActiveFilters={hasActiveFilters}
            onReset={onReset}
            totalResults={totalResults}
          />
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════
// 🔹 Filter Content (Mobile + Desktop Shared)
// ═══════════════════════════════════════════

function FilterContent({ filters, handleChange, hasActiveFilters, onReset, totalResults }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      {/* ─── Header ──────────────────────── */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white">
          <HiOutlineAdjustmentsHorizontal className="h-5 w-5 text-primary" />
          ফিল্টার
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-accent transition-colors duration-300 hover:text-accent/80 cursor-pointer"
          >
            <HiOutlineArrowPath className="h-3.5 w-3.5" />
            রিসেট
          </button>
        )}
      </div>

      {/* ─── Results Count ───────────────── */}
      <div className="mb-6 rounded-xl border border-primary/30 bg-primary/10 p-3 text-center">
        <p className="text-xs text-white/70">মোট কোর্স</p>
        <p className="text-2xl font-bold text-primary">{totalResults}টা</p>
      </div>

      {/* ─── Search Bar ──────────────────── */}
      <div className="mb-6">
        <label htmlFor="course-search" className="mb-2 block text-sm font-semibold text-white/80">
          🔍 খুঁজুন
        </label>
        <div className="relative">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          <input
            id="course-search"
            type="text"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="কোর্স খুঁজুন..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/10"
          />
        </div>
      </div>

      {/* ─── Category Filter ─────────────── */}
      <FilterGroup
        title="📂 ক্যাটেগরি"
        options={FILTER_CATEGORIES}
        selected={filters.category}
        onChange={(value) => handleChange("category", value)}
      />

      {/* ─── Price Filter ────────────────── */}
      <FilterGroup
        title="💰 মূল্য"
        options={FILTER_PRICES}
        selected={filters.price}
        onChange={(value) => handleChange("price", value)}
      />

      {/* ─── Level Filter ────────────────── */}
      <FilterGroup
        title="📊 লেভেল"
        options={FILTER_LEVELS}
        selected={filters.level}
        onChange={(value) => handleChange("level", value)}
        isLast
      />

      {/* ─── Reset Button (Bottom) ───────── */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-primary/80 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/50 cursor-pointer"
        >
          <HiOutlineArrowPath className="h-4 w-4" />
          সব ফিল্টার রিসেট করুন
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// 🔹 Filter Group (Reusable)
// ═══════════════════════════════════════════

function FilterGroup({ title, options, selected, onChange, isLast = false }) {
  return (
    <div className={isLast ? "mb-0" : "mb-6"}>
      <p className="mb-3 text-sm font-semibold text-white/80">{title}</p>
      <div className="space-y-2">
        {options.map((option) => {
          const isActive = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border-primary/50 bg-primary/20 text-white shadow-md shadow-primary/20"
                  : "border-white/5 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {/* Radio Indicator */}
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary"
                    : "border-white/30 group-hover:border-white/50"
                }`}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>

              {/* Icon */}
              {option.icon && <span className="text-base">{option.icon}</span>}

              {/* Label */}
              <span className="flex-1 text-left font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
