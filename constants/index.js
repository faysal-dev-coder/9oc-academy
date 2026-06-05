// constants/index.js
// ═══════════════════════════════════════════
// 9OC Academy — সব Constants এখানে থাকবে
// ═══════════════════════════════════════════

// ─── Brand Info ──────────────────────────
export const BRAND = {
  name: '9OC Academy',
  tagline: 'সরকারি চাকরি প্রস্তুতির সেরা প্ল্যাটফর্ম',
  description: 'BCS, Bank, NTRCA, Primary সহ সকল সরকারি চাকরির পরীক্ষার প্রস্তুতি নিন।',
  email: 'info@9ocacademy.com',
  phone: '+880 1XXX-XXXXXX',
  website: 'https://9ocacademy.com',
};

// ─── Navigation Links ───────────────────
export const NAV_LINKS = [
  {
    id: 1,
    label: 'হোম',
    href: '/',
  },
  {
    id: 2,
    label: 'কোর্সসমূহ',
    href: '/courses',
  },
  {
    id: 3,
    label: 'আমাদের সম্পর্কে',
    href: '/about',
  },
  {
    id: 4,
    label: 'যোগাযোগ',
    href: '/contact',
  },
];

// ─── Stats Data ─────────────────────────
export const STATS = [
  {
    id: 1,
    number: '১০,০০০+',
    label: 'শিক্ষার্থী',
    icon: '👨‍🎓',
  },
  {
    id: 2,
    number: '৫০০+',
    label: 'MCQ সেট',
    icon: '📝',
  },
  {
    id: 3,
    number: '৫০+',
    label: 'কোর্স',
    icon: '📚',
  },
  {
    id: 4,
    number: '৯৫%',
    label: 'সফলতার হার',
    icon: '🏆',
  },
];

// ─── Course Categories ──────────────────
export const CATEGORIES = [
  {
    id: 1,
    name: 'BCS প্রস্তুতি',
    slug: 'bcs',
    icon: '🏛️',
    color: '#6C63FF',
    courseCount: 15,
    description: 'বিসিএস প্রিলিমিনারি ও লিখিত পরীক্ষার সম্পূর্ণ প্রস্তুতি',
  },
  {
    id: 2,
    name: 'ব্যাংক জব',
    slug: 'bank',
    icon: '🏦',
    color: '#00D4AA',
    courseCount: 12,
    description: 'বাংলাদেশ ব্যাংক, সোনালী ব্যাংক সহ সকল ব্যাংকের প্রস্তুতি',
  },
  {
    id: 3,
    name: 'NTRCA',
    slug: 'ntrca',
    icon: '👨‍🏫',
    color: '#FFB800',
    courseCount: 8,
    description: 'বেসরকারি শিক্ষক নিবন্ধন পরীক্ষার প্রস্তুতি',
  },
  {
    id: 4,
    name: 'প্রাইমারি শিক্ষক',
    slug: 'primary',
    icon: '📖',
    color: '#FF6B6B',
    courseCount: 10,
    description: 'প্রাথমিক বিদ্যালয়ের সহকারী শিক্ষক নিয়োগ পরীক্ষা',
  },
  {
    id: 5,
    name: 'নন-ক্যাডার',
    slug: 'non-cadre',
    icon: '📋',
    color: '#A855F7',
    courseCount: 7,
    description: 'বিভিন্ন মন্ত্রণালয় ও অধিদপ্তরের নন-ক্যাডার পদের প্রস্তুতি',
  },
];

// ─── Features ───────────────────────────
export const FEATURES = [
  {
    id: 1,
    title: 'লাইভ MCQ পরীক্ষা',
    description: 'প্রতিদিন লাইভ MCQ পরীক্ষায় অংশ নিন এবং নিজেকে যাচাই করুন।',
    icon: '⚡',
  },
  {
    id: 2,
    title: 'বিস্তারিত ব্যাখ্যা',
    description: 'প্রতিটি প্রশ্নের সাথে বিস্তারিত ব্যাখ্যা ও রেফারেন্স পাবেন।',
    icon: '📖',
  },
  {
    id: 3,
    title: 'পারফরম্যান্স ট্র্যাকিং',
    description: 'আপনার অগ্রগতি ট্র্যাক করুন — কোথায় দুর্বল, কোথায় শক্তিশালী।',
    icon: '📊',
  },
  {
    id: 4,
    title: 'মোবাইল ফ্রেন্ডলি',
    description: 'যেকোনো ডিভাইস থেকে পরীক্ষা দিন — মোবাইল, ট্যাবলেট বা কম্পিউটার।',
    icon: '📱',
  },
  {
    id: 5,
    title: 'বিগত বছরের প্রশ্ন',
    description: 'BCS, Bank, NTRCA সহ সকল পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান।',
    icon: '📚',
  },
  {
    id: 6,
    title: 'সাশ্রয়ী মূল্য',
    description: 'অনেক ফ্রি কোর্স ও কম খরচে প্রিমিয়াম কোর্সে ভর্তি হোন।',
    icon: '💰',
  },
];

// ─── Footer Links ───────────────────────
export const FOOTER_LINKS = {
  company: [
    { label: 'আমাদের সম্পর্কে', href: '/about' },
    { label: 'যোগাযোগ', href: '/contact' },
    { label: 'গোপনীয়তা নীতি', href: '/privacy' },
    { label: 'শর্তাবলী', href: '/terms' },
  ],
  courses: [
    { label: 'BCS প্রস্তুতি', href: '/courses?category=bcs' },
    { label: 'ব্যাংক জব', href: '/courses?category=bank' },
    { label: 'NTRCA', href: '/courses?category=ntrca' },
    { label: 'প্রাইমারি শিক্ষক', href: '/courses?category=primary' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'হেল্প সেন্টার', href: '/help' },
    { label: 'রিফান্ড পলিসি', href: '/refund' },
  ],
};

// ─── Social Links ───────────────────────
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/9ocacademy',
    icon: 'FaFacebookF',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@9ocacademy',
    icon: 'FaYoutube',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/9ocacademy',
    icon: 'FaTelegramPlane',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/880XXXXXXXXXX',
    icon: 'FaWhatsapp',
  },
];
