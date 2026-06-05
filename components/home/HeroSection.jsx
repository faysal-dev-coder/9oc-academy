import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* ══════════════════════════════════════════ */}
      {/* ██  Background Layer                      */}
      {/* ══════════════════════════════════════════ */}
      <HeroBackground />

      {/* ══════════════════════════════════════════ */}
      {/* ██  Main Content Container                */}
      {/* ══════════════════════════════════════════ */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Left Side: Text Content ── */}
          <div className="order-2 lg:order-1">
            <HeroContent />
          </div>

          {/* ── Right Side: Visual ── */}
          <div className="order-1 lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* ██  Scroll Indicator (Bottom Center)      */}
      {/* ══════════════════════════════════════════ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs">স্ক্রল করুন</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
