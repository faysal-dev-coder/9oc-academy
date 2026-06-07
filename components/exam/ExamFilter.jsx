// components/exam/ExamFilter.jsx
"use client";

import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function ExamFilter({ categories, onFilter }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    onFilter({ category: categoryId, type: activeType });
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    onFilter({ category: activeCategory, type });
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveType("all");
    onFilter({ category: "all", type: "all" });
  };

  const hasActiveFilter = activeCategory !== "all" || activeType !== "all";

  return (
    <div className="mb-8 space-y-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-white/40 flex items-center gap-1.5 mr-2">
          <FaFilter size={11} />
          বিষয়:
        </span>

        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
            activeCategory === "all"
              ? "bg-primary border-primary text-white"
              : "bg-white/5 border-white/10 text-white/60 hover:border-primary/50 hover:text-white"
          }`}
        >
          সব
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
              activeCategory === cat.id
                ? "bg-primary border-primary text-white"
                : "bg-white/5 border-white/10 text-white/60 hover:border-primary/50 hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-white/40 mr-2">ধরন:</span>

        {[
          { value: "all", label: "সব ধরন" },
          { value: "free", label: "বিনামূল্যে" },
          { value: "paid", label: "প্রিমিয়াম" },
        ].map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeChange(type.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
              activeType === type.value
                ? "bg-secondary border-secondary text-white"
                : "bg-white/5 border-white/10 text-white/60 hover:border-secondary/50 hover:text-white"
            }`}
          >
            {type.label}
          </button>
        ))}

        {hasActiveFilter && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <FaTimes size={11} />
            ফিল্টার সরাও
          </button>
        )}
      </div>
    </div>
  );
}
