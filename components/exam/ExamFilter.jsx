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
        {/* Label */}
        <span className="text-sm text-[#64748B] font-medium flex items-center gap-1.5 mr-2">
          <FaFilter size={11} />
          বিষয়:
        </span>

        {/* All Button */}
        <button
          onClick={() => handleCategoryChange("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
            activeCategory === "all"
              ? "bg-primary border-primary text-white shadow-sm shadow-primary/20"
              : "bg-[#F1F5F9] border-[#E2E8F0] text-[#475569] hover:border-primary/40 hover:text-primary hover:bg-primary/5"
          }`}
        >
          সব
        </button>

        {/* Category Buttons */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
              activeCategory === cat.id
                ? "bg-primary border-primary text-white shadow-sm shadow-primary/20"
                : "bg-[#F1F5F9] border-[#E2E8F0] text-[#475569] hover:border-primary/40 hover:text-primary hover:bg-primary/5"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Label */}
        <span className="text-sm text-[#64748B] font-medium mr-2">ধরন:</span>

        {/* Type Buttons */}
        {[
          { value: "all", label: "সব ধরন" },
          { value: "free", label: "বিনামূল্যে" },
          { value: "paid", label: "প্রিমিয়াম" },
        ].map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeChange(type.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
              activeType === type.value
                ? "bg-secondary border-secondary text-white shadow-sm shadow-secondary/20"
                : "bg-[#F1F5F9] border-[#E2E8F0] text-[#475569] hover:border-secondary/40 hover:text-secondary hover:bg-secondary/5"
            }`}
          >
            {type.label}
          </button>
        ))}

        {/* Clear Filter Button */}
        {hasActiveFilter && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 transition-all duration-200 cursor-pointer"
          >
            <FaTimes size={11} />
            ফিল্টার সরাও
          </button>
        )}
      </div>
    </div>
  );
}
