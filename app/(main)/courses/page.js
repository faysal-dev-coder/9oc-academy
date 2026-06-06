"use client";

import { useState, useMemo } from "react";
import { COURSES } from "@/constants";
import CourseBanner from "@/components/courses/CourseBanner";
import CourseFilter from "@/components/courses/CourseFilter";
import CourseGrid from "@/components/courses/CourseGrid";
import PricingSection from "@/components/courses/PricingSection";

// ═══════════════════════════════════════════
// 📄 Courses Page
// ═══════════════════════════════════════════

// ─── Initial Filter State ─────────────────
const INITIAL_FILTERS = {
  search: "",
  category: "all",
  price: "all",
  level: "all",
};

export default function CoursesPage() {
  // ─── State ───────────────────────────────
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState("popular");

  // ─── Filter + Sort Logic ──────────────────
  const filteredCourses = useMemo(() => {
    let result = [...COURSES];

    // 🔍 Search Filter
    if (filters.search.trim() !== "") {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.shortDesc.toLowerCase().includes(searchLower) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // 📂 Category Filter
    if (filters.category !== "all") {
      result = result.filter((course) => course.category === filters.category);
    }

    // 💰 Price Filter
    if (filters.price === "free") {
      result = result.filter((course) => course.isFree);
    } else if (filters.price === "paid") {
      result = result.filter((course) => !course.isFree);
    }

    // 📊 Level Filter
    if (filters.level !== "all") {
      result = result.filter((course) => course.level === filters.level);
    }

    // 🔄 Sort
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.students - a.students);
        break;
      case "newest":
        result.reverse();
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  // ─── Handlers ────────────────────────────
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  return (
    <main className="min-h-screen bg-dark">
      {/* ─── Hero Banner ─────────────────── */}
      <CourseBanner totalCourses={COURSES.length} />

      {/* ─── Main Content ────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ─── Left: Filter Sidebar ──────── */}
          <aside className="w-full lg:w-72 lg:shrink-0">
            <CourseFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              totalResults={filteredCourses.length}
            />
          </aside>

          {/* ─── Right: Course Grid ────────── */}
          <div className="flex-1 min-w-0">
            <CourseGrid
              courses={filteredCourses}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onReset={handleReset}
            />
          </div>
        </div>
      </section>

      {/* ─── Pricing Section ─────────────── */}
      <PricingSection />
    </main>
  );
}
