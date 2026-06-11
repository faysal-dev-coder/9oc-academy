// components/layout/Footer.jsx
// ═══════════════════════════════════════════════════════════════
// 🦶 Premium Footer — Light Theme (FIXED)
// Phase 6B — Chat 23
// ├── Server Component (no "use client")
// ├── Pure Tailwind classes (no event handlers)
// ├── Brand color hover for each social icon
// └── All functionality preserved
// ═══════════════════════════════════════════════════════════════

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { FaFacebookF, FaYoutube, FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  // ✅ Auto year with fallback
  const browserYear = new Date().getFullYear();
  const currentYear = browserYear < 2024 || browserYear > 2050 ? 2024 : browserYear;

  const footerLinks = {
    platform: [
      { name: "কোর্সসমূহ", href: "/courses" },
      { name: "মডেল টেস্ট", href: "/courses" },
      { name: "প্রশ্ন ব্যাংক", href: "/courses" },
      { name: "লিডারবোর্ড", href: "/leaderboard" },
    ],
    exams: [
      { name: "BCS প্রিলি", href: "/exams" },
      { name: "ব্যাংক জব", href: "/exams" },
      { name: "NTRCA", href: "/exams" },
      { name: "প্রাইমারি", href: "/exams" },
    ],
    company: [
      { name: "আমাদের সম্পর্কে", href: "/about" },
      { name: "যোগাযোগ", href: "/contact" },
      { name: "গোপনীয়তা নীতি", href: "/about" },
      { name: "শর্তাবলী", href: "/about" },
    ],
  };

  // ✅ Each social with Tailwind hover classes
  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/9ocacademy/",
      label: "Facebook",
      hoverClass: "hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-600",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@9oc-academy",
      label: "YouTube",
      hoverClass: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-600",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/9ocacademy/",
      label: "Instagram",
      hoverClass: "hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-600",
    },
    {
      icon: FaTelegramPlane,
      href: "https://t.me/+8801962714066",
      label: "Telegram",
      hoverClass: "hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-600",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/8801962714066",
      label: "WhatsApp",
      hoverClass: "hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-600",
    },
  ];

  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══ Main Footer Grid ═══ */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* ═══ Brand Column ═══ */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-6 text-sm leading-relaxed text-[#64748B]">
              বাংলাদেশের সবচেয়ে বড় অনলাইন MCQ পরীক্ষা প্ল্যাটফর্ম। স্মার্টভাবে প্রস্তুতি নিন আপনার
              স্বপ্নের সরকারি চাকরির জন্য।
            </p>

            {/* Social Icons — Pure Tailwind Hover */}
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] transition-all duration-300 hover:scale-110 hover:shadow-md ${social.hoverClass}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ═══ Platform Links ═══ */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#1F2937]">
              প্ল্যাটফর্ম
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-[#64748B] transition-all duration-200 hover:translate-x-1 hover:text-[#1E9CD7]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ═══ Exam Links ═══ */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#1F2937]">
              পরীক্ষাসমূহ
            </h4>
            <ul className="space-y-3">
              {footerLinks.exams.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-[#64748B] transition-all duration-200 hover:translate-x-1 hover:text-[#1E9CD7]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ═══ Company Links ═══ */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#1F2937]">
              কোম্পানি
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-[#64748B] transition-all duration-200 hover:translate-x-1 hover:text-[#1E9CD7]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ═══ Bottom Bar ═══ */}
        <div className="border-t border-[#E2E8F0] py-6">
          <p className="text-center text-sm text-[#94A3B8]">
            © {currentYear} 9OC Academy. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
