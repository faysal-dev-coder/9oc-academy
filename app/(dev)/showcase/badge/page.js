"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import {
  Tag,
  Palette,
  Layers as LayersIcon,
  Maximize2,
  Circle,
  Sparkles,
  Activity,
  Filter as FilterIcon,
  X as XIcon,
  Hash,
  ClipboardList,
  Crown,
  Zap,
  CheckCircle2,
  Star,
  Flame,
} from "lucide-react";

export default function BadgeShowcasePage() {
  const [tags, setTags] = useState(["Mathematics", "Bengali", "English", "Science"]);

  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "BCS", "Bank", "NTRCA", "Primary"];

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ╔══════════════════════════════════════════════╗
            ║  HERO HEADER                                  ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
              <Tag size={28} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="brand" size="sm">
                  UI Primitive
                </Badge>
                <Badge variant="success" size="sm" dot>
                  Ready
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-slate-900">Badge</h1>

              <p className="text-slate-500 mt-2 leading-relaxed">
                Versatile badge component for status, labels, filter chips, counts, এবং removable
                tags। 5 variants × 3 appearances = 15 combinations।
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "5 Variants",
                  "3 Appearances",
                  "3 Sizes",
                  "15 Combinations",
                  "Dot Indicator",
                  "Icon Support",
                  "Clickable",
                  "Removable",
                ].map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 1: VARIANTS (SOFT - DEFAULT)         ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Palette size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Variants — Soft (Default)</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                5 color variants — default, brand, success, warning, danger
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="brand">Brand</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 2: APPEARANCE - SOLID                ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <LayersIcon size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Appearance — Solid</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Filled background — appearance=&quot;solid&quot;
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
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
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 3: APPEARANCE - OUTLINE              ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <LayersIcon size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Appearance — Outline</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Border with transparent bg — appearance=&quot;outline&quot;
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
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
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 4: SIZES                             ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Maximize2 size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sizes</h2>
              <p className="text-sm text-slate-500 mt-0.5">3 sizes — sm, md (default), lg</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex flex-col items-center gap-2">
                <Badge size="sm" variant="brand">
                  Small
                </Badge>
                <span className="text-xs text-slate-400 font-mono">size=&quot;sm&quot;</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge size="md" variant="brand">
                  Medium
                </Badge>
                <span className="text-xs text-slate-400 font-mono">size=&quot;md&quot;</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge size="lg" variant="brand">
                  Large
                </Badge>
                <span className="text-xs text-slate-400 font-mono">size=&quot;lg&quot;</span>
              </div>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 5: WITH DOT (STATUS INDICATOR)       ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Circle size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">With Dot</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Status indicator — online, offline, pending, etc.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
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
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 6: WITH ICON                         ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">With Icon</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Lucide icon support — Premium, Pro, Hot, Verified, etc.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
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
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 7: REAL USE — EXAM STATUS            ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Activity size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Real Use — Exam Status</h2>
              <p className="text-sm text-slate-500 mt-0.5">9OC Academy এ কীভাবে use হবে</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-3">
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
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 8: CLICKABLE - FILTER CHIPS          ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <FilterIcon size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Clickable — Filter Chips</h2>
              <p className="text-sm text-slate-500 mt-0.5">Click করে filter change করো</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="space-y-3">
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
              <p className="text-xs text-slate-600">
                Selected: <strong className="text-brand-800">{activeFilter}</strong>
              </p>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 9: REMOVABLE - TAGS                  ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <XIcon size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Removable — Tags</h2>
              <p className="text-sm text-slate-500 mt-0.5">X button click করে tag remove করো</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
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
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 10: COUNT BADGES                     ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Hash size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Count Badges</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Notifications, messages, tasks counter
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap items-center gap-6">
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
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700">Pending</span>
                <Badge size="sm" variant="success" appearance="solid">
                  99+
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 11: PROPS TABLE                      ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <ClipboardList size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Props</h2>
              <p className="text-sm text-slate-500 mt-0.5">Component এ যেসব props pass করা যায়</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Prop</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Default</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  [
                    "variant",
                    "default | brand | success | warning | danger",
                    "default",
                    "Color variant",
                  ],
                  ["appearance", "soft | solid | outline", "soft", "Visual style"],
                  ["size", "sm | md | lg", "md", "Badge size"],
                  ["dot", "boolean", "false", "Show status dot indicator"],
                  ["icon", "LucideIcon", "—", "Left icon component"],
                  ["onClick", "function", "—", "Click handler (makes clickable)"],
                  ["onRemove", "function", "—", "Remove handler (shows X button)"],
                  ["children", "ReactNode", "—", "Badge content"],
                  ["className", "string", "—", "Extra Tailwind classes"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-4 py-3 font-mono text-brand-800 font-medium">{prop}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{type}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{def}</td>
                    <td className="px-4 py-3 text-slate-600">{desc}</td>
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
