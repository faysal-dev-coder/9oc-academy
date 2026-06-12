// components/admin/stats/StatCard.jsx
// ═══════════════════════════════════════════════════════════════
// 📊 Reusable Stat Card — Admin Dashboard
// Server Component (pure display, no interactivity)
// ═══════════════════════════════════════════════════════════════

export default function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  color = "blue",
  trend = null, // { value: "+12%", positive: true }
}) {
  // ═══ Color Config ═══
  const colorConfig = {
    blue: {
      iconBg: "bg-[#1E9CD7]/10",
      iconBorder: "border-[#1E9CD7]/20",
      iconText: "text-[#1E9CD7]",
      iconShadow: "shadow-[#1E9CD7]/10",
      valueShadow: "text-[#1E9CD7]",
    },
    green: {
      iconBg: "bg-[#059669]/10",
      iconBorder: "border-[#059669]/20",
      iconText: "text-[#059669]",
      iconShadow: "shadow-[#059669]/10",
      valueShadow: "text-[#059669]",
    },
    amber: {
      iconBg: "bg-[#D97706]/10",
      iconBorder: "border-[#D97706]/20",
      iconText: "text-[#D97706]",
      iconShadow: "shadow-[#D97706]/10",
      valueShadow: "text-[#D97706]",
    },
    purple: {
      iconBg: "bg-[#7C3AED]/10",
      iconBorder: "border-[#7C3AED]/20",
      iconText: "text-[#7C3AED]",
      iconShadow: "shadow-[#7C3AED]/10",
      valueShadow: "text-[#7C3AED]",
    },
    red: {
      iconBg: "bg-[#DC2626]/10",
      iconBorder: "border-[#DC2626]/20",
      iconText: "text-[#DC2626]",
      iconShadow: "shadow-[#DC2626]/10",
      valueShadow: "text-[#DC2626]",
    },
  };

  const c = colorConfig[color] || colorConfig.blue;

  return (
    <div className="group relative rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      {/* ═══ Background Decoration ═══ */}
      <div
        className={`absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-5 ${c.iconBg}`}
        style={{ filter: "blur(8px)" }}
      />

      {/* ═══ Top Row: Icon + Trend ═══ */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon Circle */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm ${c.iconBg} ${c.iconBorder} ${c.iconShadow}`}
        >
          {Icon && <Icon className={`text-xl ${c.iconText}`} />}
        </div>

        {/* Trend Badge */}
        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              trend.positive
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>

      {/* ═══ Value ═══ */}
      <div className="mb-1">
        <p className="text-3xl font-bold text-[#1F2937] tabular-nums">
          {value === null || value === undefined ? (
            <span className="text-[#94A3B8]">—</span>
          ) : (
            value.toLocaleString()
          )}
        </p>
      </div>

      {/* ═══ Label ═══ */}
      <p className="text-sm font-semibold text-[#1F2937] mb-1">{label}</p>

      {/* ═══ Subtext ═══ */}
      {subtext && <p className="text-xs text-[#94A3B8]">{subtext}</p>}
    </div>
  );
}
