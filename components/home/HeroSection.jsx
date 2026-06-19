// components/home/HeroSection.jsx
// ═══════════════════════════════════
// 🏠 Hero Section — Main Wrapper
// No changes to structure | fix 3 hex colors
// ═══════════════════════════════════

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Background Layer */}
      <HeroBackground />

      {/* Main Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            <HeroContent />
          </div>

          {/* Right — Visual */}
          <div className="order-1 lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2">
        <span className="text-xs text-slate-500">স্ক্রল করুন</span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-brand-800/30 pt-2">
          <div className="h-3 w-1.5 animate-pulse rounded-full bg-brand-800/60" />
        </div>
      </div>
    </section>
  );
}
