// components/shared/Logo.jsx
// ═══════════════════════════════════════════════════════════
// 9OC Academy — Premium Logo Component
// ✅ Brand color: #1E40AF (brand-800)
// ✅ Lucide icon for visual identity
// ✅ Tailwind v4 standards
// ═══════════════════════════════════════════════════════════

import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Logo({ size = "default" }) {
  // ─── Size variants ─────────────────
  const sizes = {
    small: {
      container: "gap-2",
      icon: "h-9 w-9",
      iconInner: "h-5 w-5",
      text: "text-lg",
      tagline: "hidden",
    },
    default: {
      container: "gap-2.5",
      icon: "h-10 w-10",
      iconInner: "h-5 w-5",
      text: "text-xl",
      tagline: "text-[10px]",
    },
    large: {
      container: "gap-3",
      icon: "h-14 w-14",
      iconInner: "h-7 w-7",
      text: "text-3xl",
      tagline: "text-xs",
    },
  };

  const s = sizes[size] || sizes.default;

  return (
    <Link
      href="/"
      className={`group flex items-center ${s.container}`}
      aria-label="9OC Academy Home"
    >
      {/* ─── Logo Icon Box ─── */}
      <div
        className={`${s.icon} flex shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-700 to-brand-900 shadow-md shadow-brand-800/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-800/40`}
      >
        <GraduationCap className={`${s.iconInner} text-white`} strokeWidth={2.5} />
      </div>

      {/* ─── Logo Text + Tagline ─── */}
      <div className="flex flex-col leading-tight">
        <span
          className={`${s.text} font-bold text-brand-800 transition-colors duration-300 group-hover:text-brand-900`}
        >
          9OC Academy
        </span>

        {s.tagline !== "hidden" && (
          <span className={`${s.tagline} font-medium uppercase tracking-wider text-slate-500`}>
            সরকারি চাকরি প্রস্তুতি
          </span>
        )}
      </div>
    </Link>
  );
}
