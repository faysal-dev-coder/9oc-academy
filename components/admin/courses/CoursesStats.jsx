"use client";

import StatCard from "@/components/admin/shared/StatCard";
import { BookOpen, CheckCircle2, FileEdit, Archive } from "lucide-react";

export default function CoursesStats({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="মোট কোর্স" value={stats.total} icon={BookOpen} variant="default" />
      <StatCard title="Active" value={stats.active} icon={CheckCircle2} variant="success" />
      <StatCard title="Draft" value={stats.draft} icon={FileEdit} variant="warning" />
      <StatCard title="Archived" value={stats.archived} icon={Archive} variant="default" />
    </div>
  );
}
