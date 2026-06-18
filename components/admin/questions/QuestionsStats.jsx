"use client";

import { HelpCircle, Smile, Activity, Flame } from "lucide-react";
import StatCard from "@/components/admin/shared/StatCard";

export default function QuestionsStats({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="মোট প্রশ্ন" value={stats.total} icon={HelpCircle} color="brand" />
      <StatCard title="সহজ" value={stats.easy} icon={Smile} color="emerald" />
      <StatCard title="মাঝারি" value={stats.medium} icon={Activity} color="amber" />
      <StatCard title="কঠিন" value={stats.hard} icon={Flame} color="red" />
    </div>
  );
}
