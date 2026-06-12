"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
} from "react-icons/hi2";
import { FILTER_CATEGORIES, FILTER_PRICES } from "@/constants";

// ═══════════════════════════════════════════
// 🔍 CourseFilter — Sidebar Filter (Light Theme)
// ═══════════════════════════════════════════

export default function CourseFilter({ filters, onFilterChange, onReset, totalResults = 0 }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const hasActiveFilters =
    filters.search !== "" || filters.category !== "all" || filters.price !== "all";

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <>
      {/* ─── Mobile Toggle Button ────────── */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#1F2937] shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md lg:hidden cursor-pointer"
      >
        <HiOutlineAdjustmentsHorizontal className="h-5 w-5 text-primary" />
        <span>ফিল্টার দেখুন</span>
        {hasActiveFilters && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white shadow-sm shadow-primary/30">
            সক্রিয়
          </span>
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
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
            className="fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1F2937]">ফিল্টার</h3>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="rounded-full bg-[#F1F5F9] p-2 text-[#475569] transition-colors hover:bg-[#E2E8F0] cursor-pointer"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

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
// 🔹 Filter Content (Shared)
// ═══════════════════════════════════════════

function FilterContent({ filters, handleChange, hasActiveFilters, onReset, totalResults }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      {/* ─── Header ──────────────────────── */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-[#1F2937]">
          <HiOutlineAdjustmentsHorizontal className="h-5 w-5 text-primary" />
          ফিল্টার
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-red-600 transition-colors duration-300 hover:text-red-700 cursor-pointer"
          >
            <HiOutlineArrowPath className="h-3.5 w-3.5" />
            রিসেট
          </button>
        )}
      </div>

      {/* ─── Results Count ───────────────── */}
      <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
        <p className="text-xs text-[#64748B] font-medium">মোট কোর্স</p>
        <p className="text-2xl font-bold text-primary">{totalResults}টা</p>
      </div>

      {/* ─── Search Bar ──────────────────── */}
      <div className="mb-6">
        <label htmlFor="course-search" className="mb-2 block text-sm font-semibold text-[#374151]">
          🔍 খুঁজুন
        </label>
        <div className="relative">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
          <input
            id="course-search"
            type="text"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="কোর্স খুঁজুন..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pl-10 pr-3 text-sm text-[#1F2937] placeholder:text-[#94A3B8] outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
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

      {/* ─── Price Filter (Last!) ────────── */}
      <FilterGroup
        title="💰 মূল্য"
        options={FILTER_PRICES}
        selected={filters.price}
        onChange={(value) => handleChange("price", value)}
        isLast
      />

      {/* ─── Reset Button (Bottom) ───────── */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-primary/80 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 cursor-pointer"
        >
          <HiOutlineArrowPath className="h-4 w-4" />
          সব ফিল্টার রিসেট করুন
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// 🔹 Filter Group (Reusable - Light)
// ═══════════════════════════════════════════

function FilterGroup({ title, options, selected, onChange, isLast = false }) {
  return (
    <div className={isLast ? "mb-0" : "mb-6"}>
      <p className="mb-3 text-sm font-semibold text-[#374151]">{title}</p>
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
                  ? "border-primary bg-primary/10 text-primary-dark shadow-sm shadow-primary/10 font-semibold"
                  : "border-[#E2E8F0] bg-white text-[#475569] hover:border-primary/30 hover:bg-[#F8FAFC] hover:text-[#1F2937]"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary"
                    : "border-[#CBD5E1] group-hover:border-primary/50"
                }`}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>

              {option.icon && <span className="text-base">{option.icon}</span>}

              <span className="flex-1 text-left font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
