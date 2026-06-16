"use client";

import { X } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────
//  SELECT SIZE STYLES
// ─────────────────────────────────────────────
const selectSizeStyles = {
  sm: "h-8 text-xs px-2.5 pr-7",
  md: "h-10 text-sm px-3 pr-8",
};

// ─────────────────────────────────────────────
//  CHEVRON SVG for <select>
// ─────────────────────────────────────────────
const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

// ─────────────────────────────────────────────
//  REUSABLE SELECT COMPONENT (internal)
// ─────────────────────────────────────────────
function FilterSelect({ value, onChange, options, size = "md" }) {
  if (!options || options.length === 0) return null;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={[
        // base
        "bg-white text-slate-700 font-medium",
        "border border-slate-300 rounded-lg",
        "transition-all duration-150 ease-out",
        "outline-none cursor-pointer shrink-0",
        // hover & focus
        "hover:border-slate-400",
        "focus:border-brand-700 focus:ring-2 focus:ring-brand-100",
        // reset native arrow
        "appearance-none bg-no-repeat",
        // size
        selectSizeStyles[size] || selectSizeStyles.md,
      ].join(" ")}
      style={{
        backgroundImage: chevronSvg,
        backgroundPosition: "right 0.5rem center",
        backgroundSize: "1rem",
      }}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────
//  FILTERBAR COMPONENT
// ─────────────────────────────────────────────
export default function FilterBar({
  // ── Search ──
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",

  // ── Filter dropdown ──
  filterOptions = [],
  filterValue = "",
  onFilterChange,

  // ── Sort dropdown ──
  sortOptions = [],
  sortValue = "",
  onSortChange,

  // ── Actions ──
  onClear,

  // ── Visual ──
  size = "md",
  className = "",
}) {
  // ── is any filter/search active? ──
  const hasActiveSearch = searchValue.trim().length > 0;
  const hasActiveFilter =
    filterValue && filterOptions.length > 0 && filterValue !== filterOptions[0]?.id;
  const hasActiveSort = sortValue && sortOptions.length > 0 && sortValue !== sortOptions[0]?.id;
  const isFiltering = hasActiveSearch || hasActiveFilter || hasActiveSort;

  return (
    <div className={className}>
      {/* ── DESKTOP: Single Row | MOBILE: Wrap ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input — takes remaining space */}
        {onSearchChange && (
          <div className="flex-1 min-w-0">
            <Input
              variant="search"
              size={size === "md" ? "md" : "sm"}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {/* Dropdowns + Clear — right side */}
        <div className="flex items-center gap-2">
          {/* Filter Dropdown */}
          {filterOptions.length > 0 && onFilterChange && (
            <FilterSelect
              value={filterValue}
              onChange={onFilterChange}
              options={filterOptions}
              size={size}
            />
          )}

          {/* Sort Dropdown */}
          {sortOptions.length > 0 && onSortChange && (
            <FilterSelect
              value={sortValue}
              onChange={onSortChange}
              options={sortOptions}
              size={size}
            />
          )}

          {/* Clear Button — only when filtering */}
          {isFiltering && onClear && (
            <Button variant="ghost" size={size === "md" ? "md" : "sm"} icon={X} onClick={onClear}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
