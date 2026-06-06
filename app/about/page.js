// app/about/page.js
// ═══════════════════════════════════════════
// 🏢 About Page — 9OC Academy
// (Phase 2G — Complete About Page)
// ═══════════════════════════════════════════

import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import AchievementStats from "@/components/about/AchievementStats";
import TeamSection from "@/components/about/TeamSection";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "আমাদের সম্পর্কে | 9OC Academy",
  description:
    "9OC Academy — বাংলাদেশের প্রথম AI-powered MCQ পরীক্ষা প্রস্তুতি প্ল্যাটফর্ম। আমাদের মিশন, ভিশন, টিম এবং অর্জন সম্পর্কে জানুন।",
  keywords: [
    "9OC Academy",
    "About Us",
    "BCS Preparation",
    "Bank Job",
    "NTRCA",
    "Online Course",
    "Bangladesh",
  ],
};

export default function AboutPage() {
  return (
    <main className="bg-dark">
      {/* ══════════════════════════════════════════ */}
      {/* ██  HERO SECTION — Big Banner             */}
      {/* ══════════════════════════════════════════ */}
      <AboutHero />

      {/* ══════════════════════════════════════════ */}
      {/* ██  MISSION & VISION — Core Values        */}
      {/* ══════════════════════════════════════════ */}
      <MissionVision />

      {/* ══════════════════════════════════════════ */}
      {/* ██  JOURNEY TIMELINE — Our Story          */}
      {/* ══════════════════════════════════════════ */}
      <JourneyTimeline />

      {/* ══════════════════════════════════════════ */}
      {/* ██  WHY CHOOSE US — 6 Reasons             */}
      {/* ══════════════════════════════════════════ */}
      <WhyChooseUs />

      {/* ══════════════════════════════════════════ */}
      {/* ██  ACHIEVEMENT STATS — Big Numbers       */}
      {/* ══════════════════════════════════════════ */}
      <AchievementStats />

      {/* ══════════════════════════════════════════ */}
      {/* ██  TEAM SECTION — Meet Our Team          */}
      {/* ══════════════════════════════════════════ */}
      <TeamSection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  ABOUT CTA — Join Now Section          */}
      {/* ══════════════════════════════════════════ */}
      <AboutCTA />
    </main>
  );
}
