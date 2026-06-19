// components/admin/users/UsersStats.jsx
// ═══════════════════════════════════════════
// Users Stats — Client Wrapper (icons!)
// ═══════════════════════════════════════════
// Total / Admins / Students / New This Week
// ═══════════════════════════════════════════

"use client";

import StatCard from "@/components/admin/shared/StatCard";
import { Users, Shield, GraduationCap, UserPlus } from "lucide-react";

export default function UsersStats({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="মোট ইউজার" value={stats.total} icon={Users} variant="default" />
      <StatCard title="Admin" value={stats.admins} icon={Shield} variant="danger" />
      <StatCard title="Student" value={stats.students} icon={GraduationCap} variant="success" />
      <StatCard
        title="এই সপ্তাহে নতুন"
        value={stats.newThisWeek}
        icon={UserPlus}
        variant="warning"
      />
    </div>
  );
}
