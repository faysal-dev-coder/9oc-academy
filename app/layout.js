// app/layout.js
// ═══════════════════════════════════════════
// 9OC Academy — Root Layout (Minimal)
// ═══════════════════════════════════════════
// শুধু HTML Wrapper + Fonts + Metadata
// Navbar/Footer Sub-Layout এ Move হয়েছে
// ⭐ UserProvider Wrap — Global Auth State
// ⭐ LIGHT THEME — Phase 6B
// ═══════════════════════════════════════════

import { Plus_Jakarta_Sans, Inter, Hind_Siliguri } from "next/font/google";
import { UserProvider } from "@/contexts/UserContext";
import "./globals.css";

// ─── Font Setup ─────────────────────────
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ─── SEO Metadata ───────────────────────
export const metadata = {
  metadataBase: new URL("https://9ocacademy.com"),
  title: {
    default: "9OC Academy — সরকারি চাকরি প্রস্তুতির সেরা প্ল্যাটফর্ম",
    template: "%s | 9OC Academy",
  },
  description:
    "BCS, Bank, NTRCA, Primary সহ সকল সরকারি চাকরির MCQ পরীক্ষার প্রস্তুতি নিন। ১০,০০০+ প্রশ্ন, লাইভ পরীক্ষা, বিস্তারিত ব্যাখ্যা।",
  keywords: [
    "9OC Academy",
    "BCS প্রস্তুতি",
    "সরকারি চাকরি",
    "Bank Job",
    "NTRCA",
    "প্রাইমারি শিক্ষক",
    "MCQ পরীক্ষা",
    "অনলাইন পরীক্ষা",
    "বিসিএস",
    "ব্যাংক জব প্রস্তুতি",
    "নন-ক্যাডার",
    "সরকারি চাকরি প্রস্তুতি বাংলা",
    "BCS Preliminary",
    "BCS Written",
    "Bangladesh Government Job",
  ],
  authors: [{ name: "9OC Academy Team" }],
  creator: "9OC Academy",
  publisher: "9OC Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
    url: "https://9ocacademy.com",
    siteName: "9OC Academy",
    title: "9OC Academy — সরকারি চাকরি প্রস্তুতির সেরা প্ল্যাটফর্ম",
    description: "BCS, Bank, NTRCA, Primary পরীক্ষার প্রস্তুতি নিন। ১০,০০০+ MCQ, লাইভ পরীক্ষা।",
  },
  twitter: {
    card: "summary_large_image",
    title: "9OC Academy — সরকারি চাকরি প্রস্তুতি",
    description: "বাংলাদেশের সেরা অনলাইন MCQ পরীক্ষা প্ল্যাটফর্ম",
  },
  other: {
    "geo.region": "BD",
    "geo.placename": "Bangladesh",
    "geo.position": "23.685;90.3563",
    "content-language": "bn-BD",
  },
  manifest: "/manifest.json",
};

// ─── Viewport Config ──────────────────
export const viewport = {
  themeColor: "#1E9CD7", // ⭐ Brand Blue (updated from purple)
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root Layout Component ────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${inter.variable} ${hind.variable}`}
    >
      <body
        className="bg-white text-[#1F2937] antialiased overflow-x-hidden"
        style={{ fontFamily: "var(--font-hind), sans-serif" }}
      >
        {/* ⭐ Global User Provider — সব Route এ Auth State Available */}
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
