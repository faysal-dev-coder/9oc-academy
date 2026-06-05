// app/page.js
// ═══════════════════════════════════════
// 🏠 Homepage — 9OC Academy
// (Updated for Phase 2F — Testimonials + FAQ + Newsletter Added)
// ═══════════════════════════════════════

import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import NewsletterSection from "@/components/home/NewsletterSection";

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
      {/* ██  TESTIMONIALS — Auto Slider + Preview  */}
      {/* ══════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  FAQ SECTION — Accordion + Categories  */}
      {/* ══════════════════════════════════════════ */}
      <FAQSection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  CTA SECTION — Scale Animation         */}
      {/* ══════════════════════════════════════════ */}
      <CTASection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  NEWSLETTER — Email Subscribe + Gift   */}
      {/* ══════════════════════════════════════════ */}
      <NewsletterSection />
    </main>
  );
}
