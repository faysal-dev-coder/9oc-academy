// app/page.js
// ═══════════════════════════════════════════
// 9OC Academy — Homepage
// (Fixed — Server Component Compatible)
// ═══════════════════════════════════════════

import { STATS, FEATURES, CATEGORIES } from '../constants';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A1A]">
      {/* ═══════════════════════════════════ */}
      {/* ═══ HERO SECTION ═════════════════ */}
      {/* ═══════════════════════════════════ */}
      <section className="relative px-4 pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Background Glowing Orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#6C63FF]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-[#00D4AA]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* ─── Badge ─── */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-[#6C63FF]/10 border border-[#6C63FF]/20
                          text-[#6C63FF] text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
            Phase 2B Complete — Navbar ও Cursor যোগ হয়েছে!
          </div>

          {/* ─── Main Title ─── */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="bg-linear-to-r from-[#6C63FF] via-[#00D4AA] to-[#FFB800] bg-clip-text text-transparent">
              9OC Academy
            </span>
          </h1>

          {/* ─── Subtitle ─── */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            সরকারি চাকরি প্রস্তুতির সেরা প্ল্যাটফর্ম। BCS, Bank, NTRCA, Primary সহ সকল পরীক্ষার MCQ
            প্র্যাকটিস করুন।
          </p>

          {/* ─── CTA Buttons ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-8 py-3.5 rounded-xl text-white font-semibold
                              bg-linear-to-r from-[#6C63FF] to-[#6C63FF]/80
                              hover:from-[#6C63FF] hover:to-[#00D4AA]
                              shadow-lg shadow-[#6C63FF]/25
                              hover:shadow-[#6C63FF]/40
                              hover:scale-105
                              transition-all duration-300
                              text-sm sm:text-base"
            >
              ফ্রি তে শুরু করুন →
            </button>

            <button
              className="px-8 py-3.5 rounded-xl text-gray-300 font-semibold
                              border border-white/10
                              hover:border-[#6C63FF]/50 hover:text-white
                              hover:bg-[#6C63FF]/5
                              transition-all duration-300
                              text-sm sm:text-base"
            >
              কোর্স দেখুন
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* ═══ STATS SECTION ════════════════ */}
      {/* ═══════════════════════════════════ */}
      <section className="px-4 py-16 border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-6 rounded-2xl
                           bg-white/5 border border-white/5
                           hover:border-[#6C63FF]/20 hover:bg-white/10
                           transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* ═══ CATEGORIES SECTION ═══════════ */}
      {/* ═══════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">পরীক্ষার ক্যাটাগরি</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              আপনার লক্ষ্য অনুযায়ী ক্যাটাগরি বেছে নিন
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="group p-6 rounded-2xl
                           bg-white/5 border border-white/5
                           hover:bg-white/10 hover:border-[#6C63FF]/30
                           transition-all duration-300 cursor-pointer"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{cat.description}</p>
                <span
                  className="inline-block text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: cat.color + '20',
                    color: cat.color,
                  }}
                >
                  {cat.courseCount}+ কোর্স
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* ═══ FEATURES SECTION ═════════════ */}
      {/* ═══════════════════════════════════ */}
      <section className="px-4 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">কেন 9OC Academy?</h2>
            <p className="text-gray-400 max-w-lg mx-auto">আমাদের প্ল্যাটফর্মের বিশেষ সুবিধাসমূহ</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="p-6 rounded-2xl
                           bg-white/5 border border-white/5
                           hover:border-[#6C63FF]/20 hover:bg-white/10
                           transition-all duration-300"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* ═══ SIMPLE FOOTER ════════════════ */}
      {/* ═══════════════════════════════════ */}
      <footer className="px-4 py-8 border-t border-white/5 text-center">
        <p className="text-sm text-gray-500">© 2025 9OC Academy. সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-xs text-gray-600 mt-2">
          🚧 Phase 2B Complete — Chat 5 এ Hero Section বানাবো
        </p>
      </footer>
    </div>
  );
}
