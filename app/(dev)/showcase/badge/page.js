"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import {
  Sparkles,
  Crown,
  Zap,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Star,
  Flame,
} from "lucide-react";

export default function TestBadgePage() {
  const [tags, setTags] = useState(["Mathematics", "Bengali", "English", "Science"]);

  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "BCS", "Bank", "NTRCA", "Primary"];

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Badge Component Test</h1>
          <p className="text-slate-500 text-sm mt-1">
            সব variants, appearances, sizes এবং features এখানে দেখো
          </p>
        </div>

        {/* ── 1. VARIANTS (Soft — Default) ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Variants — Soft (Default)
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </section>

        {/* ── 2. APPEARANCE: SOLID ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Appearance — Solid
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" appearance="solid">
              Default
            </Badge>
            <Badge variant="brand" appearance="solid">
              Brand
            </Badge>
            <Badge variant="success" appearance="solid">
              Success
            </Badge>
            <Badge variant="warning" appearance="solid">
              Warning
            </Badge>
            <Badge variant="danger" appearance="solid">
              Danger
            </Badge>
          </div>
        </section>

        {/* ── 3. APPEARANCE: OUTLINE ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Appearance — Outline
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" appearance="outline">
              Default
            </Badge>
            <Badge variant="brand" appearance="outline">
              Brand
            </Badge>
            <Badge variant="success" appearance="outline">
              Success
            </Badge>
            <Badge variant="warning" appearance="outline">
              Warning
            </Badge>
            <Badge variant="danger" appearance="outline">
              Danger
            </Badge>
          </div>
        </section>

        {/* ── 4. SIZES ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sizes</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge size="sm" variant="brand">
              Small
            </Badge>
            <Badge size="md" variant="brand">
              Medium
            </Badge>
            <Badge size="lg" variant="brand">
              Large
            </Badge>
          </div>
        </section>

        {/* ── 5. WITH DOT (Status Indicator) ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            With Dot — Status Indicator
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success" dot>
              Active
            </Badge>
            <Badge variant="warning" dot>
              Pending
            </Badge>
            <Badge variant="danger" dot>
              Offline
            </Badge>
            <Badge variant="default" dot>
              Inactive
            </Badge>
            <Badge variant="brand" dot>
              Live
            </Badge>
          </div>
        </section>

        {/* ── 6. WITH ICON ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            With Icon
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand" icon={Sparkles}>
              Premium
            </Badge>
            <Badge variant="warning" icon={Crown}>
              Pro
            </Badge>
            <Badge variant="danger" icon={Flame}>
              Hot
            </Badge>
            <Badge variant="success" icon={CheckCircle2}>
              Verified
            </Badge>
            <Badge variant="default" icon={Star}>
              Featured
            </Badge>
            <Badge variant="brand" appearance="solid" icon={Zap}>
              NEW
            </Badge>
          </div>
        </section>

        {/* ── 7. REAL EXAM STATUS ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Real Use — Exam Status
          </h2>
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">BCS 45th Preliminary</span>
              <Badge variant="success" dot>
                Published
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Bank Job MCQ Set 12</span>
              <Badge variant="warning" dot>
                Draft
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">NTRCA Practice Test</span>
              <Badge variant="danger" dot>
                Archived
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Primary Teacher Mock</span>
              <Badge variant="brand" icon={Sparkles}>
                Premium
              </Badge>
            </div>
          </div>
        </section>

        {/* ── 8. CLICKABLE — FILTER CHIPS ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Clickable — Filter Chips
          </h2>
          <p className="text-xs text-slate-500">Click করে filter change করো</p>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Badge
                key={filter}
                variant={activeFilter === filter ? "brand" : "default"}
                appearance={activeFilter === filter ? "solid" : "soft"}
                size="lg"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Selected: <strong className="text-brand-800">{activeFilter}</strong>
          </p>
        </section>

        {/* ── 9. REMOVABLE — TAGS ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Removable — Tags
          </h2>
          <p className="text-xs text-slate-500">X button click করে tag remove করো</p>
          <div className="flex flex-wrap gap-2 min-h-8">
            {tags.length === 0 ? (
              <p className="text-xs text-slate-400 italic">সব tags removed! Refresh করো।</p>
            ) : (
              tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="brand"
                  appearance="soft"
                  onRemove={() => setTags(tags.filter((t) => t !== tag))}
                >
                  {tag}
                </Badge>
              ))
            )}
          </div>
        </section>

        {/* ── 10. COUNTS ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Count Badges
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-700">Notifications</span>
              <Badge size="sm" variant="danger" appearance="solid">
                5
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-700">Messages</span>
              <Badge size="sm" variant="brand" appearance="solid">
                12
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-700">Tasks</span>
              <Badge size="sm" variant="warning" appearance="solid">
                3
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
