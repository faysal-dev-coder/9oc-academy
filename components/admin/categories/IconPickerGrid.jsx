"use client";

// components/admin/categories/IconPickerGrid.jsx
// ═══════════════════════════════════════════
// Icon Picker — Visual Hi2 Grid
// ═══════════════════════════════════════════
// 24 curated icons for categories
// Searchable + Visual selection
// ═══════════════════════════════════════════

import { useState } from "react";
import * as Hi2Icons from "react-icons/hi2";
import { HiMagnifyingGlass, HiCheck } from "react-icons/hi2";

// ⭐ Curated Icon List (Education/Career Theme)
const AVAILABLE_ICONS = [
  { name: "HiAcademicCap", label: "Academic" },
  { name: "HiBuildingLibrary", label: "Library" },
  { name: "HiBookOpen", label: "Book" },
  { name: "HiPencilSquare", label: "Pencil" },
  { name: "HiBriefcase", label: "Briefcase" },
  { name: "HiSparkles", label: "Sparkles" },
  { name: "HiBeaker", label: "Beaker" },
  { name: "HiChartBar", label: "Chart" },
  { name: "HiClipboardDocumentCheck", label: "Checklist" },
  { name: "HiDocumentText", label: "Document" },
  { name: "HiGlobeAlt", label: "Globe" },
  { name: "HiLightBulb", label: "Idea" },
  { name: "HiPresentationChartLine", label: "Presentation" },
  { name: "HiPuzzlePiece", label: "Puzzle" },
  { name: "HiRocketLaunch", label: "Rocket" },
  { name: "HiTrophy", label: "Trophy" },
  { name: "HiUserGroup", label: "Group" },
  { name: "HiBookmark", label: "Bookmark" },
  { name: "HiCog6Tooth", label: "Settings" },
  { name: "HiComputerDesktop", label: "Computer" },
  { name: "HiCurrencyDollar", label: "Money" },
  { name: "HiFire", label: "Fire" },
  { name: "HiHeart", label: "Heart" },
  { name: "HiStar", label: "Star" },
];

export default function IconPickerGrid({ selectedIcon, onSelect, color = "#1E9CD7" }) {
  const [search, setSearch] = useState("");

  const filteredIcons = AVAILABLE_ICONS.filter(
    (icon) =>
      icon.label.toLowerCase().includes(search.toLowerCase()) ||
      icon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Icon search..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#1E9CD7] focus:ring-2 focus:ring-[#1E9CD7]/10 transition-all"
        />
      </div>

      {/* Icon Grid */}
      <div className="max-h-60 overflow-y-auto p-2 border border-[#E2E8F0] rounded-xl bg-[#FAFBFC]">
        {filteredIcons.length === 0 ? (
          <p className="text-center text-sm text-[#94A3B8] py-8">কোনো icon পাওয়া যায়নি!</p>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {filteredIcons.map((iconObj) => {
              const Icon = Hi2Icons[iconObj.name];
              if (!Icon) return null;

              const isSelected = selectedIcon === iconObj.name;

              return (
                <button
                  key={iconObj.name}
                  type="button"
                  onClick={() => onSelect(iconObj.name)}
                  title={iconObj.label}
                  className={`relative aspect-square rounded-lg flex items-center justify-center transition-all hover:scale-110 ${
                    isSelected
                      ? "ring-2 ring-offset-2"
                      : "bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0]"
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: `${color}15`,
                          borderColor: color,
                          ringColor: color,
                        }
                      : {}
                  }
                >
                  <Icon className="w-5 h-5" style={{ color: isSelected ? color : "#64748B" }} />
                  {isSelected && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <HiCheck className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Info */}
      {selectedIcon && (
        <div className="text-xs text-[#64748B] flex items-center gap-2">
          <span>Selected:</span>
          <code className="px-2 py-0.5 bg-[#F1F5F9] rounded font-mono text-[#1F2937]">
            {selectedIcon}
          </code>
        </div>
      )}
    </div>
  );
}
