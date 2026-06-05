// app/page.js
// ═══════════════════════════════════════
// 🏠 Homepage — 9OC Academy
// (Updated for Phase 2E — Course Preview Added)
// ═══════════════════════════════════════

import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <main className="bg-dark">
      {/* ══════════════════════════════════════════ */}
      {/* ██  HERO SECTION — Premium                */}
      {/* ══════════════════════════════════════════ */}
      <HeroSection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  STATS SECTION — Counter Animation     */}
      {/* ══════════════════════════════════════════ */}
      <StatsSection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  CATEGORIES SECTION — Slide Animation  */}
      {/* ══════════════════════════════════════════ */}
      <CategoriesSection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  FEATURES SECTION — 3D Tilt            */}
      {/* ══════════════════════════════════════════ */}
      <FeaturesSection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  FEATURED COURSES — Top 6 Cards        */}
      {/* ══════════════════════════════════════════ */}
      <FeaturedCourses />

      {/* ══════════════════════════════════════════ */}
      {/* ██  CTA SECTION — Scale Animation         */}
      {/* ══════════════════════════════════════════ */}
      <CTASection />
    </main>
  );
}
