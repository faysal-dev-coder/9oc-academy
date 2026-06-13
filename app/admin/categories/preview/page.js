import { createClient } from "@/lib/supabase/server";
import * as Hi2Icons from "react-icons/hi2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CategoriesPreviewPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
          🎨 Categories — Premium Icon Preview
        </h1>
        <p className="text-[#64748B]">
          Database থেকে fetch করা real data — Premium Hi2 Icons + Brand Colors
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((cat) => {
          // Dynamic Icon Render
          const IconComponent = Hi2Icons[cat.icon] || Hi2Icons.HiQuestionMarkCircle;

          return (
            <div
              key={cat.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Circle */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                style={{
                  backgroundColor: `${cat.color}15`,
                  border: `1px solid ${cat.color}30`,
                }}
              >
                <IconComponent className="w-8 h-8" style={{ color: cat.color }} />
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-[#1F2937] mb-1">{cat.name}</h3>

              {/* Slug */}
              <p className="text-sm text-[#94A3B8] mb-3 font-mono">/{cat.slug}</p>

              {/* Description */}
              <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                {cat.description || "No description"}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#94A3B8]">Order:</span>
                  <span className="text-sm font-semibold text-[#1F2937]">#{cat.display_order}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      cat.is_active ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <span className="text-xs font-medium text-[#64748B]">
                    {cat.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Icon Info (Dev) */}
              <div className="mt-4 pt-4 border-t border-dashed border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Icon:</span>
                  <code className="bg-[#F1F5F9] px-2 py-1 rounded text-[#1E9CD7] font-mono">
                    {cat.icon}
                  </code>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-[#94A3B8]">Color:</span>
                  <code
                    className="bg-[#F1F5F9] px-2 py-1 rounded font-mono"
                    style={{ color: cat.color }}
                  >
                    {cat.color}
                  </code>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-10 p-6 bg-white border border-[#E2E8F0] rounded-2xl">
        <h2 className="text-lg font-bold text-[#1F2937] mb-3">📊 Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-[#64748B]">Total Categories</p>
            <p className="text-2xl font-bold text-[#1E9CD7]">{categories?.length || 0}</p>
          </div>
          <div>
            <p className="text-sm text-[#64748B]">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {categories?.filter((c) => c.is_active).length || 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#64748B]">With Icons</p>
            <p className="text-2xl font-bold text-purple-600">
              {categories?.filter((c) => c.icon).length || 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#64748B]">With Colors</p>
            <p className="text-2xl font-bold text-amber-600">
              {categories?.filter((c) => c.color).length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
