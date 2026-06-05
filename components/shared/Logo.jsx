// components/shared/Logo.jsx
// ═══════════════════════════════════════════
// 9OC Academy — Logo Component
// (Fixed for Tailwind v4 — Zero Warnings)
// ═══════════════════════════════════════════

import Link from 'next/link';

export default function Logo({ size = 'default' }) {
  // ─── Size অনুযায়ী Style বদলাবে ─────
  const sizes = {
    small: {
      container: 'gap-2',
      icon: 'w-9 h-9 text-xs',
      text: 'text-lg',
      tagline: 'hidden',
    },
    default: {
      container: 'gap-2.5',
      icon: 'w-10 h-10 text-sm',
      text: 'text-xl',
      tagline: 'text-[10px]',
    },
    large: {
      container: 'gap-3',
      icon: 'w-14 h-14 text-xl',
      text: 'text-3xl',
      tagline: 'text-xs',
    },
  };

  const s = sizes[size] || sizes.default;

  return (
    <Link href="/" className={`flex items-center ${s.container} group`}>
      {/* ─── Logo Icon (গ্রেডিয়েন্ট বক্স) ─── */}
      <div
        className={`
          ${s.icon}
          rounded-xl
          bg-linear-to-br from-[#6C63FF] to-[#00D4AA]
          flex items-center justify-center
          font-bold text-white
          shadow-lg shadow-[#6C63FF]/30
          group-hover:shadow-[#6C63FF]/50
          group-hover:scale-110
          group-hover:rotate-3
          transition-all duration-300
        `}
      >
        9OC
      </div>

      {/* ─── Logo Text (নাম + Tagline) ─── */}
      <div className="flex flex-col leading-tight">
        <span
          className={`
            ${s.text}
            font-bold
            bg-linear-to-r from-[#6C63FF] via-[#00D4AA] to-[#FFB800]
            bg-clip-text text-transparent
            group-hover:opacity-90
            transition-opacity duration-300
          `}
        >
          9OC Academy
        </span>

        {/* Tagline — Small size এ লুকানো থাকবে */}
        {s.tagline !== 'hidden' && (
          <span className={`${s.tagline} text-gray-500 tracking-wider uppercase`}>
            সরকারি চাকরি প্রস্তুতি
          </span>
        )}
      </div>
    </Link>
  );
}
