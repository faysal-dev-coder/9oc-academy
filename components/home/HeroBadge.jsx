// components/home/HeroBadge.jsx
// ═══════════════════════════════════
// 🏅 Hero Badge — Live Pulse Indicator
// No GSAP | CSS animations | brand colors
// ═══════════════════════════════════

export default function HeroBadge() {
  return (
    <div className="mb-6 inline-flex animate-in fade-in slide-in-from-bottom-4 items-center gap-2 rounded-full border border-brand-800/20 bg-brand-800/5 px-4 py-2 duration-700 backdrop-blur-sm">
      {/* ── Live Pulsing Dot ── */}
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-600" />
      </span>

      {/* ── Badge Text ── */}
      <span className="text-sm font-medium text-slate-800">
        🏆 বাংলাদেশের <span className="font-bold text-brand-800">#১</span> MCQ পরীক্ষা প্ল্যাটফর্ম
      </span>
    </div>
  );
}
