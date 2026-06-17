"use client";

// components/admin/categories/IconPickerGrid.jsx
// ═══════════════════════════════════════════════════════════════
// 🎨 Premium Icon Picker — Lucide Grid
// ⭐ Phase 4: Categories CRUD
// ⭐ 24 curated icons (Education/Career theme)
// ⭐ Searchable + Visual selection
// ═══════════════════════════════════════════════════════════════

import { useState } from "react";
import {
  // Education
  GraduationCap,
  Library,
  BookOpen,
  PenSquare,
  Briefcase,
  Sparkles,
  FlaskConical,
  BarChart3,
  ClipboardCheck,
  FileText,
  Globe,
  Lightbulb,
  LineChart,
  Puzzle,
  Rocket,
  Trophy,
  Users,
  Bookmark,
  Settings,
  Monitor,
  DollarSign,
  Flame,
  Heart,
  Star,
  // Fallback
  HelpCircle,
  Check,
} from "lucide-react";
import Input from "@/components/ui/Input";

// ─────────────────────────────────────────────
//  ICON REGISTRY (name → Component map)
// ─────────────────────────────────────────────
export const ICON_REGISTRY = {
  GraduationCap,
  Library,
  BookOpen,
  PenSquare,
  Briefcase,
  Sparkles,
  FlaskConical,
  BarChart3,
  ClipboardCheck,
  FileText,
  Globe,
  Lightbulb,
  LineChart,
  Puzzle,
  Rocket,
  Trophy,
  Users,
  Bookmark,
  Settings,
  Monitor,
  DollarSign,
  Flame,
  Heart,
  Star,
};

// ─────────────────────────────────────────────
//  HELPER: Get icon component by name
// ─────────────────────────────────────────────
export function getIcon(name) {
  return ICON_REGISTRY[name] || HelpCircle;
}

// ─────────────────────────────────────────────
//  ⭐ DynamicIcon Component
//  ⭐ React Compiler safe alternative
//  ⭐ Usage: <DynamicIcon name="Star" size={20} />
// ─────────────────────────────────────────────
export function DynamicIcon({ name, ...props }) {
  const Icon = ICON_REGISTRY[name] || HelpCircle;
  return <Icon {...props} />;
}

// ─────────────────────────────────────────────
//  AVAILABLE ICONS (with labels for picker)
// ─────────────────────────────────────────────
const AVAILABLE_ICONS = [
  { name: "GraduationCap", label: "Academic" },
  { name: "Library", label: "Library" },
  { name: "BookOpen", label: "Book" },
  { name: "PenSquare", label: "Pencil" },
  { name: "Briefcase", label: "Briefcase" },
  { name: "Sparkles", label: "Sparkles" },
  { name: "FlaskConical", label: "Beaker" },
  { name: "BarChart3", label: "Chart" },
  { name: "ClipboardCheck", label: "Checklist" },
  { name: "FileText", label: "Document" },
  { name: "Globe", label: "Globe" },
  { name: "Lightbulb", label: "Idea" },
  { name: "LineChart", label: "Presentation" },
  { name: "Puzzle", label: "Puzzle" },
  { name: "Rocket", label: "Rocket" },
  { name: "Trophy", label: "Trophy" },
  { name: "Users", label: "Group" },
  { name: "Bookmark", label: "Bookmark" },
  { name: "Settings", label: "Settings" },
  { name: "Monitor", label: "Computer" },
  { name: "DollarSign", label: "Money" },
  { name: "Flame", label: "Fire" },
  { name: "Heart", label: "Heart" },
  { name: "Star", label: "Star" },
];

// ─────────────────────────────────────────────
//  ICON PICKER GRID COMPONENT
// ─────────────────────────────────────────────
export default function IconPickerGrid({ selectedIcon, onSelect, color = "#1E40AF" }) {
  const [search, setSearch] = useState("");

  const filteredIcons = AVAILABLE_ICONS.filter(
    (icon) =>
      icon.label.toLowerCase().includes(search.toLowerCase()) ||
      icon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* ─── Search Input ─── */}
      <Input
        variant="search"
        size="sm"
        placeholder="Search icons..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ─── Icon Grid Container ─── */}
      <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
        {filteredIcons.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">কোনো icon পাওয়া যায়নি!</p>
        ) : (
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
            {filteredIcons.map((iconObj) => {
              const Icon = ICON_REGISTRY[iconObj.name];
              if (!Icon) return null;

              const isSelected = selectedIcon === iconObj.name;

              return (
                <button
                  key={iconObj.name}
                  type="button"
                  onClick={() => onSelect(iconObj.name)}
                  title={iconObj.label}
                  className={[
                    "relative aspect-square rounded-lg",
                    "flex items-center justify-center",
                    "transition-all duration-150 ease-out",
                    "hover:scale-110 cursor-pointer",
                    "outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2",
                    isSelected
                      ? ""
                      : "bg-white border border-slate-200 hover:bg-brand-50 hover:border-brand-300",
                  ].join(" ")}
                  style={
                    isSelected
                      ? {
                          backgroundColor: `${color}15`,
                          borderColor: color,
                          boxShadow: `0 0 0 2px ${color}`,
                        }
                      : {}
                  }
                >
                  <Icon
                    size={20}
                    style={{ color: isSelected ? color : undefined }}
                    className={isSelected ? "" : "text-slate-600"}
                  />

                  {isSelected && (
                    <div
                      className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full"
                      style={{ backgroundColor: color }}
                    >
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Selected Info ─── */}
      {selectedIcon && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Selected:</span>
          <code className="rounded bg-slate-100 px-2 py-0.5 font-mono text-slate-700">
            {selectedIcon}
          </code>
        </div>
      )}
    </div>
  );
}
