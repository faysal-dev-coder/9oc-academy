"use client";

// components/admin/categories/CategoriesStats.jsx
// ═══════════════════════════════════════════════════════════════
// 📊 Categories Stats Cards (Client Component)
// ⭐ Phase 4: Categories CRUD
// ⭐ Why Client? Lucide icons can't pass Server→Client boundary
// ⭐ Pattern: Server fetches data → Client renders with icons
// ═══════════════════════════════════════════════════════════════

import { FolderTree, CheckCircle2, BookOpen, ClipboardList } from "lucide-react";
import StatCard from "@/components/admin/shared/StatCard";

// ─────────────────────────────────────────────
//  CATEGORIES STATS COMPONENT
// ─────────────────────────────────────────────
export default function CategoriesStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Categories"
        value={stats.total}
        icon={FolderTree}
        variant="default"
        subtitle="সকল categories"
      />

      <StatCard
        title="Active Categories"
        value={stats.active}
        icon={CheckCircle2}
        variant="success"
        subtitle={`${stats.total - stats.active} inactive`}
      />

      <StatCard
        title="Total Courses"
        value={stats.courses}
        icon={BookOpen}
        variant="warning"
        subtitle="সকল categories জুড়ে"
      />

      <StatCard
        title="Total Exams"
        value={stats.exams}
        icon={ClipboardList}
        variant="default"
        subtitle="সকল categories জুড়ে"
      />
    </div>
  );
}
