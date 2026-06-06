// app/contact/page.js
// ═══════════════════════════════════════════
// 📞 Contact Page — 9OC Academy
// (Phase 2G — Complete Contact Page)
// ═══════════════════════════════════════════

import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import WorkingHoursCard from "@/components/contact/WorkingHoursCard";
import SocialLinks from "@/components/contact/SocialLinks";

export const metadata = {
  title: "যোগাযোগ | 9OC Academy",
  description:
    "9OC Academy এর সাথে যোগাযোগ করুন। কোর্স, পেমেন্ট বা যেকোনো সমস্যার জন্য আমাদের টিম ২৪/৭ আপনার সেবায় প্রস্তুত।",
  keywords: [
    "9OC Academy Contact",
    "যোগাযোগ",
    "Support",
    "BCS Coaching Contact",
    "Online Course Help",
    "Bangladesh",
  ],
};

export default function ContactPage() {
  return (
    <main className="bg-dark">
      {/* ══════════════════════════════════════════ */}
      {/* ██  HERO SECTION — Banner + Quick Cards  */}
      {/* ══════════════════════════════════════════ */}
      <ContactHero />

      {/* ══════════════════════════════════════════ */}
      {/* ██  CONTACT FORM — Send Message          */}
      {/* ══════════════════════════════════════════ */}
      <ContactForm />

      {/* ══════════════════════════════════════════ */}
      {/* ██  CONTACT INFO — Address Cards         */}
      {/* ══════════════════════════════════════════ */}
      <ContactInfo />

      {/* ══════════════════════════════════════════ */}
      {/* ██  WORKING HOURS — Live Office Status   */}
      {/* ══════════════════════════════════════════ */}
      <WorkingHoursCard />

      {/* ══════════════════════════════════════════ */}
      {/* ██  SOCIAL LINKS — Social Media + Map    */}
      {/* ══════════════════════════════════════════ */}
      <SocialLinks />
    </main>
  );
}
