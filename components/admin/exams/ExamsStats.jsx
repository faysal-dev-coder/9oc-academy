"use client";

// components/admin/exams/ExamsStats.jsx
// ═══════════════════════════════════════════════════════════════
// 📊 Exams Stats Cards (Client Component)
// ⭐ Phase 4: Exams CRUD
// ⭐ Why Client? Lucide icons can't pass Server→Client boundary
// ⭐ Pattern: Server fetches data → Client renders with icons
// ═══════════════════════════════════════════════════════════════

import { ClipboardList, CheckCircle2, Gift, Star } from "lucide-react";
import StatCard from "@/components/admin/shared/StatCard";

// ─────────────────────────────────────────────
//  EXAMS STATS COMPONENT
// ─────────────────────────────────────────────
export default function ExamsStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Exams"
        value={stats.total}
        icon={ClipboardList}
        variant="default"
        subtitle="সকল পরীক্ষা"
      />

      <StatCard
        title="Active Exams"
        value={stats.active}
        icon={CheckCircle2}
        variant="success"
        subtitle={`${stats.total - stats.active} draft/archived`}
      />

      <StatCard
        title="Free Exams"
        value={stats.free}
        icon={Gift}
        variant="success"
        subtitle="সবার জন্য উন্মুক্ত"
      />

      <StatCard
        title="Premium Exams"
        value={stats.premium}
        icon={Star}
        variant="warning"
        subtitle="Paid পরীক্ষা"
      />
    </div>
  );
}
