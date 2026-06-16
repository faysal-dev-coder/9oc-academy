"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import FilterBar from "@/components/admin/shared/FilterBar";
import {
  Filter,
  Search,
  ArrowUpDown,
  SlidersHorizontal,
  BookOpen,
  Users,
  HelpCircle,
  FolderOpen,
  Sparkles,
} from "lucide-react";

// ─────────────────────────────────────────────
//  DEMO DATA
// ─────────────────────────────────────────────
const categoryFilterOptions = [
  { id: "all", label: "All Categories" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
];

const examFilterOptions = [
  { id: "all", label: "All Exams" },
  { id: "published", label: "Published" },
  { id: "draft", label: "Draft" },
  { id: "archived", label: "Archived" },
];

const questionFilterOptions = [
  { id: "all", label: "All Types" },
  { id: "bcs", label: "BCS" },
  { id: "bank", label: "Bank" },
  { id: "ntrca", label: "NTRCA" },
  { id: "primary", label: "Primary" },
];

const userFilterOptions = [
  { id: "all", label: "All Users" },
  { id: "admin", label: "Admin" },
  { id: "student", label: "Student" },
  { id: "inactive", label: "Inactive" },
];

const sortNewest = [
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
  { id: "name-az", label: "Name A-Z" },
  { id: "name-za", label: "Name Z-A" },
];

const examSortOptions = [
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
  { id: "most-attempts", label: "Most Attempts" },
  { id: "title-az", label: "Title A-Z" },
];

// ─────────────────────────────────────────────
//  SHOWCASE PAGE
// ─────────────────────────────────────────────
export default function FilterBarShowcase() {
  // ── State for interactive demos ──
  const [search1, setSearch1] = useState("");

  const [search2, setSearch2] = useState("");
  const [filter2, setFilter2] = useState("all");

  const [search3, setSearch3] = useState("");
  const [filter3, setFilter3] = useState("all");
  const [sort3, setSort3] = useState("newest");

  const [search4, setSearch4] = useState("");
  const [sort4, setSort4] = useState("newest");

  // ── Real world states ──
  const [rwSearch1, setRwSearch1] = useState("");
  const [rwFilter1, setRwFilter1] = useState("all");
  const [rwSort1, setRwSort1] = useState("newest");

  const [rwSearch2, setRwSearch2] = useState("");
  const [rwFilter2, setRwFilter2] = useState("all");
  const [rwSort2, setRwSort2] = useState("newest");

  const [rwSearch3, setRwSearch3] = useState("");
  const [rwFilter3, setRwFilter3] = useState("all");
  const [rwSort3, setRwSort3] = useState("newest");

  const [rwSearch4, setRwSearch4] = useState("");
  const [rwFilter4, setRwFilter4] = useState("all");

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ═══════════════════════════════════════════ */}
        {/*  HERO HEADER                                */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
              <Filter size={28} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="brand" size="sm">
                  Layer 2
                </Badge>
                <Badge variant="success" size="sm" dot>
                  Ready
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">FilterBar</h1>
              <p className="text-slate-500 mt-1.5">
                Search, filter dropdown, and sort — all in one clean bar for admin list pages.
              </p>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Uses Input
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Uses Button
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Native Select
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Smart Clear
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Mobile Responsive
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 1: Search Only                     */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Search size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Search Only</h2>
              <p className="text-sm text-slate-500">Simplest usage — just a search bar</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <FilterBar
              searchValue={search1}
              onSearchChange={setSearch1}
              searchPlaceholder="Search categories..."
              onClear={() => setSearch1("")}
            />
            {search1 && (
              <p className="text-xs text-slate-500 mt-3">Searching: &quot;{search1}&quot;</p>
            )}
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 2: Search + Filter Dropdown        */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Filter size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Search + Filter</h2>
              <p className="text-sm text-slate-500">Search bar with a filter dropdown</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <FilterBar
              searchValue={search2}
              onSearchChange={setSearch2}
              searchPlaceholder="Search categories..."
              filterOptions={categoryFilterOptions}
              filterValue={filter2}
              onFilterChange={setFilter2}
              onClear={() => {
                setSearch2("");
                setFilter2("all");
              }}
            />
            <p className="text-xs text-slate-500 mt-3">
              Filter: {filter2} | Search: &quot;{search2 || "—"}&quot;
            </p>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 3: Full Featured                   */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Full Featured</h2>
              <p className="text-sm text-slate-500">
                Search + filter dropdown + sort dropdown + smart clear
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <FilterBar
              searchValue={search3}
              onSearchChange={setSearch3}
              searchPlaceholder="Search exams..."
              filterOptions={examFilterOptions}
              filterValue={filter3}
              onFilterChange={setFilter3}
              sortOptions={examSortOptions}
              sortValue={sort3}
              onSortChange={setSort3}
              onClear={() => {
                setSearch3("");
                setFilter3("all");
                setSort3("newest");
              }}
            />
            <p className="text-xs text-slate-500 mt-3">
              Filter: {filter3} | Sort: {sort3} | Search: &quot;{search3 || "—"}&quot;
            </p>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 4: Search + Sort Only              */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <ArrowUpDown size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Search + Sort</h2>
              <p className="text-sm text-slate-500">No filter — just search and sort</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <FilterBar
              searchValue={search4}
              onSearchChange={setSearch4}
              searchPlaceholder="Search..."
              sortOptions={sortNewest}
              sortValue={sort4}
              onSortChange={setSort4}
              onClear={() => {
                setSearch4("");
                setSort4("newest");
              }}
            />
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 5: ⭐ Real World — 9OC Admin       */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">⭐ Real World — 9OC Admin Pages</h2>
              <p className="text-sm text-slate-500">
                How FilterBar will look on actual admin list pages
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* ── Exams Page ── */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-brand-700" />
                <h3 className="text-sm font-semibold text-slate-700">Exams Page</h3>
              </div>
              <FilterBar
                searchValue={rwSearch1}
                onSearchChange={setRwSearch1}
                searchPlaceholder="Search exams by title..."
                filterOptions={examFilterOptions}
                filterValue={rwFilter1}
                onFilterChange={setRwFilter1}
                sortOptions={examSortOptions}
                sortValue={rwSort1}
                onSortChange={setRwSort1}
                onClear={() => {
                  setRwSearch1("");
                  setRwFilter1("all");
                  setRwSort1("newest");
                }}
              />
            </div>

            {/* ── Users Page ── */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-brand-700" />
                <h3 className="text-sm font-semibold text-slate-700">Users Page</h3>
              </div>
              <FilterBar
                searchValue={rwSearch2}
                onSearchChange={setRwSearch2}
                searchPlaceholder="Search by name or email..."
                filterOptions={userFilterOptions}
                filterValue={rwFilter2}
                onFilterChange={setRwFilter2}
                sortOptions={sortNewest}
                sortValue={rwSort2}
                onSortChange={setRwSort2}
                onClear={() => {
                  setRwSearch2("");
                  setRwFilter2("all");
                  setRwSort2("newest");
                }}
              />
            </div>

            {/* ── Questions Page ── */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={16} className="text-brand-700" />
                <h3 className="text-sm font-semibold text-slate-700">Questions Page</h3>
              </div>
              <FilterBar
                searchValue={rwSearch3}
                onSearchChange={setRwSearch3}
                searchPlaceholder="Search questions..."
                filterOptions={questionFilterOptions}
                filterValue={rwFilter3}
                onFilterChange={setRwFilter3}
                sortOptions={sortNewest}
                sortValue={rwSort3}
                onSortChange={setRwSort3}
                onClear={() => {
                  setRwSearch3("");
                  setRwFilter3("all");
                  setRwSort3("newest");
                }}
              />
            </div>

            {/* ── Categories Page (no sort) ── */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen size={16} className="text-brand-700" />
                <h3 className="text-sm font-semibold text-slate-700">Categories Page (No Sort)</h3>
              </div>
              <FilterBar
                searchValue={rwSearch4}
                onSearchChange={setRwSearch4}
                searchPlaceholder="Search categories..."
                filterOptions={categoryFilterOptions}
                filterValue={rwFilter4}
                onFilterChange={setRwFilter4}
                onClear={() => {
                  setRwSearch4("");
                  setRwFilter4("all");
                }}
              />
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  PROPS TABLE                                */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Filter size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Props Reference</h2>
              <p className="text-sm text-slate-500">All available props for FilterBar</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Default</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["searchValue", "string", '""', "Controlled search input value"],
                  ["onSearchChange", "(value) => void", "—", "Search change handler"],
                  ["searchPlaceholder", "string", '"Search..."', "Input placeholder text"],
                  ["filterOptions", "[{id, label}]", "[]", "Filter dropdown options"],
                  ["filterValue", "string", '""', "Currently selected filter id"],
                  ["onFilterChange", "(id) => void", "—", "Filter change handler"],
                  ["sortOptions", "[{id, label}]", "[]", "Sort dropdown options"],
                  ["sortValue", "string", '""', "Currently selected sort id"],
                  ["onSortChange", "(id) => void", "—", "Sort change handler"],
                  ["onClear", "() => void", "—", "Clear all filters handler"],
                  ["size", '"sm" | "md"', '"md"', "Component size"],
                  ["className", "string", '""', "Additional CSS classes"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="py-3 px-4">
                      <code className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-brand-700">
                        {prop}
                      </code>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-xs">{type}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-xs">{def}</td>
                    <td className="py-3 px-4 text-slate-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
