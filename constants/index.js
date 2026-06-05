// constants/index.js
// 9OC Academy - All Constants & Data

// ═══════════════════════════════════════════
// 🏢 Brand Info
// ═══════════════════════════════════════════

export const BRAND = {
  name: "9OC Academy",
  tagline: "সরকারি চাকরি প্রস্তুতির সেরা প্ল্যাটফর্ম",
  description: "BCS, Bank, NTRCA, Primary সহ সকল সরকারি চাকরির পরীক্ষার প্রস্তুতি নিন।",
  email: "info@9ocacademy.com",
  phone: "+880 1XXX-XXXXXX",
  website: "https://9ocacademy.com",
};

// ═══════════════════════════════════════════
// 📍 Navigation Links
// ═══════════════════════════════════════════

export const NAV_LINKS = [
  { id: 1, label: "হোম", href: "/" },
  { id: 2, label: "কোর্সসমূহ", href: "/courses" },
  { id: 3, label: "আমাদের সম্পর্কে", href: "/about" },
  { id: 4, label: "যোগাযোগ", href: "/contact" },
];

// ═══════════════════════════════════════════
// 📊 Stats Data (Homepage)
// ═══════════════════════════════════════════

export const STATS = [
  { id: 1, number: "১০,০০০+", label: "শিক্ষার্থী", icon: "👨‍🎓" },
  { id: 2, number: "৫০০+", label: "MCQ সেট", icon: "📝" },
  { id: 3, number: "৫০+", label: "কোর্স", icon: "📚" },
  { id: 4, number: "৯৫%", label: "সফলতার হার", icon: "🏆" },
];

// ═══════════════════════════════════════════
// 📂 Course Categories
// ═══════════════════════════════════════════

export const CATEGORIES = [
  {
    id: 1,
    name: "BCS প্রস্তুতি",
    slug: "bcs",
    icon: "🏛️",
    color: "#6C63FF",
    courseCount: 15,
    description: "বিসিএস প্রিলিমিনারি ও লিখিত পরীক্ষার সম্পূর্ণ প্রস্তুতি",
  },
  {
    id: 2,
    name: "ব্যাংক জব",
    slug: "bank",
    icon: "🏦",
    color: "#00D4AA",
    courseCount: 12,
    description: "বাংলাদেশ ব্যাংক, সোনালী ব্যাংক সহ সকল ব্যাংকের প্রস্তুতি",
  },
  {
    id: 3,
    name: "NTRCA",
    slug: "ntrca",
    icon: "👨‍🏫",
    color: "#FFB800",
    courseCount: 8,
    description: "বেসরকারি শিক্ষক নিবন্ধন পরীক্ষার প্রস্তুতি",
  },
  {
    id: 4,
    name: "প্রাইমারি শিক্ষক",
    slug: "primary",
    icon: "📖",
    color: "#FF6B6B",
    courseCount: 10,
    description: "প্রাথমিক বিদ্যালয়ের সহকারী শিক্ষক নিয়োগ পরীক্ষা",
  },
  {
    id: 5,
    name: "নন-ক্যাডার",
    slug: "non-cadre",
    icon: "📋",
    color: "#A855F7",
    courseCount: 7,
    description: "বিভিন্ন মন্ত্রণালয় ও অধিদপ্তরের নন-ক্যাডার পদের প্রস্তুতি",
  },
];

// ═══════════════════════════════════════════
// ✨ Features Data (Homepage)
// ═══════════════════════════════════════════

export const FEATURES = [
  {
    id: 1,
    title: "লাইভ MCQ পরীক্ষা",
    description: "প্রতিদিন লাইভ MCQ পরীক্ষায় অংশ নিন এবং নিজেকে যাচাই করুন।",
    icon: "⚡",
  },
  {
    id: 2,
    title: "বিস্তারিত ব্যাখ্যা",
    description: "প্রতিটি প্রশ্নের সাথে বিস্তারিত ব্যাখ্যা ও রেফারেন্স পাবেন।",
    icon: "📖",
  },
  {
    id: 3,
    title: "পারফরম্যান্স ট্র্যাকিং",
    description: "আপনার অগ্রগতি ট্র্যাক করুন — কোথায় দুর্বল, কোথায় শক্তিশালী।",
    icon: "📊",
  },
  {
    id: 4,
    title: "মোবাইল ফ্রেন্ডলি",
    description: "যেকোনো ডিভাইস থেকে পরীক্ষা দিন — মোবাইল, ট্যাবলেট বা কম্পিউটার।",
    icon: "📱",
  },
  {
    id: 5,
    title: "বিগত বছরের প্রশ্ন",
    description: "BCS, Bank, NTRCA সহ সকল পরীক্ষার বিগত বছরের প্রশ্ন ও সমাধান।",
    icon: "📚",
  },
  {
    id: 6,
    title: "সাশ্রয়ী মূল্য",
    description: "অনেক ফ্রি কোর্স ও কম খরচে প্রিমিয়াম কোর্সে ভর্তি হোন।",
    icon: "💰",
  },
];

// ═══════════════════════════════════════════
// 🔗 Footer Links
// ═══════════════════════════════════════════

export const FOOTER_LINKS = {
  company: [
    { label: "আমাদের সম্পর্কে", href: "/about" },
    { label: "যোগাযোগ", href: "/contact" },
    { label: "গোপনীয়তা নীতি", href: "/privacy" },
    { label: "শর্তাবলী", href: "/terms" },
  ],
  courses: [
    { label: "BCS প্রস্তুতি", href: "/courses?category=bcs" },
    { label: "ব্যাংক জব", href: "/courses?category=bank" },
    { label: "NTRCA", href: "/courses?category=ntrca" },
    { label: "প্রাইমারি শিক্ষক", href: "/courses?category=primary" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "হেল্প সেন্টার", href: "/help" },
    { label: "রিফান্ড পলিসি", href: "/refund" },
  ],
};

// ═══════════════════════════════════════════
// 📱 Social Links
// ═══════════════════════════════════════════

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com/9ocacademy",
    icon: "FaFacebookF",
    color: "#1877F2",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@9ocacademy",
    icon: "FaYoutube",
    color: "#FF0000",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/9ocacademy",
    icon: "FaInstagram",
    color: "#E4405F",
  },
  {
    name: "Telegram",
    href: "https://t.me/9ocacademy",
    icon: "FaTelegramPlane",
    color: "#0088CC",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/880XXXXXXXXXX",
    icon: "FaWhatsapp",
    color: "#25D366",
  },
];

// ═══════════════════════════════════════════
// 👨‍🏫 Instructors Data
// ═══════════════════════════════════════════

export const INSTRUCTORS = [
  {
    id: "inst-1",
    name: "মোহাম্মদ আরিফ হোসেন",
    shortName: "আরিফ স্যার",
    title: "BCS ক্যাডার (পুলিশ)",
    avatar: "👨‍🏫",
    courses: 5,
  },
  {
    id: "inst-2",
    name: "ফাতেমা জান্নাত",
    shortName: "ফাতেমা ম্যাডাম",
    title: "সহকারী অধ্যাপক, ঢাবি",
    avatar: "👩‍🏫",
    courses: 3,
  },
  {
    id: "inst-3",
    name: "রাকিবুল ইসলাম",
    shortName: "রাকিব স্যার",
    title: "ব্যাংকার, বাংলাদেশ ব্যাংক",
    avatar: "👨‍💼",
    courses: 4,
  },
  {
    id: "inst-4",
    name: "নুসরাত জাহান",
    shortName: "নুসরাত ম্যাডাম",
    title: "NTRCA সার্টিফাইড শিক্ষক",
    avatar: "👩‍💼",
    courses: 3,
  },
];

// ═══════════════════════════════════════════
// 📚 Courses Data (১২টা কোর্স)
// ═══════════════════════════════════════════

export const COURSES = [
  {
    id: "course-1",
    title: "BCS প্রিলিমিনারি কমপ্লিট গাইড",
    shortDesc:
      "৪৬তম BCS প্রিলিমিনারি পরীক্ষার সম্পূর্ণ প্রস্তুতি। বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান সব বিষয়।",
    category: "bcs",
    categoryLabel: "BCS",
    instructor: "inst-1",
    price: 0,
    originalPrice: 0,
    isFree: true,
    rating: 4.8,
    totalRatings: 234,
    students: 12500,
    lessons: 120,
    duration: "৪৫ ঘণ্টা",
    level: "beginner",
    levelLabel: "শিক্ষার্থী",
    thumbnail: "bcs",
    color: "#6C63FF",
    tags: ["বাংলা", "ইংরেজি", "গণিত", "সাধারণ জ্ঞান"],
    isFeatured: true,
    isPopular: true,
  },
  {
    id: "course-2",
    title: "ব্যাংক জব MCQ মাস্টারক্লাস",
    shortDesc: "সব সরকারি ও বেসরকারি ব্যাংকের নিয়োগ পরীক্ষার জন্য কমপ্লিট MCQ প্রস্তুতি।",
    category: "bank",
    categoryLabel: "ব্যাংক",
    instructor: "inst-3",
    price: 299,
    originalPrice: 599,
    isFree: false,
    rating: 4.9,
    totalRatings: 189,
    students: 8200,
    lessons: 85,
    duration: "৩০ ঘণ্টা",
    level: "intermediate",
    levelLabel: "মাধ্যমিক",
    thumbnail: "bank",
    color: "#00D4AA",
    tags: ["গণিত", "ইংরেজি", "কম্পিউটার", "সাধারণ জ্ঞান"],
    isFeatured: true,
    isPopular: true,
  },
  {
    id: "course-3",
    title: "NTRCA শিক্ষক নিবন্ধন প্রস্তুতি",
    shortDesc: "স্কুল ও কলেজ পর্যায়ে NTRCA শিক্ষক নিবন্ধন পরীক্ষার সম্পূর্ণ গাইডলাইন।",
    category: "ntrca",
    categoryLabel: "NTRCA",
    instructor: "inst-4",
    price: 199,
    originalPrice: 399,
    isFree: false,
    rating: 4.7,
    totalRatings: 156,
    students: 6300,
    lessons: 65,
    duration: "২৫ ঘণ্টা",
    level: "beginner",
    levelLabel: "শিক্ষার্থী",
    thumbnail: "ntrca",
    color: "#FFB800",
    tags: ["শিক্ষাবিজ্ঞান", "বাংলা", "ইংরেজি", "গণিত"],
    isFeatured: true,
    isPopular: false,
  },
  {
    id: "course-4",
    title: "প্রাইমারি শিক্ষক নিয়োগ MCQ",
    shortDesc: "প্রাথমিক বিদ্যালয়ে সহকারী শিক্ষক পদে নিয়োগ পরীক্ষার কমপ্লিট MCQ ব্যাংক।",
    category: "primary",
    categoryLabel: "প্রাইমারি",
    instructor: "inst-4",
    price: 0,
    originalPrice: 0,
    isFree: true,
    rating: 4.6,
    totalRatings: 312,
    students: 15800,
    lessons: 90,
    duration: "৩৫ ঘণ্টা",
    level: "beginner",
    levelLabel: "শিক্ষার্থী",
    thumbnail: "primary",
    color: "#FF6B8A",
    tags: ["বাংলা", "গণিত", "ইংরেজি", "সাধারণ জ্ঞান"],
    isFeatured: false,
    isPopular: true,
  },
  {
    id: "course-5",
    title: "নন-ক্যাডার সরকারি চাকরি গাইড",
    shortDesc: "মন্ত্রণালয়, অধিদপ্তর ও বিভিন্ন সরকারি সংস্থার নন-ক্যাডার পদের প্রস্তুতি।",
    category: "non-cadre",
    categoryLabel: "নন-ক্যাডার",
    instructor: "inst-1",
    price: 149,
    originalPrice: 299,
    isFree: false,
    rating: 4.5,
    totalRatings: 98,
    students: 4100,
    lessons: 55,
    duration: "২০ ঘণ্টা",
    level: "intermediate",
    levelLabel: "মাধ্যমিক",
    thumbnail: "noncadre",
    color: "#8B5CF6",
    tags: ["বাংলা", "ইংরেজি", "গণিত", "কম্পিউটার"],
    isFeatured: false,
    isPopular: false,
  },
  {
    id: "course-6",
    title: "বাংলা ভাষা ও সাহিত্য MCQ",
    shortDesc: "সকল প্রতিযোগিতামূলক পরীক্ষার জন্য বাংলা ভাষা ও সাহিত্যের বিস্তারিত MCQ।",
    category: "bcs",
    categoryLabel: "BCS",
    instructor: "inst-2",
    price: 0,
    originalPrice: 0,
    isFree: true,
    rating: 4.9,
    totalRatings: 421,
    students: 18900,
    lessons: 75,
    duration: "২৮ ঘণ্টা",
    level: "beginner",
    levelLabel: "শিক্ষার্থী",
    thumbnail: "bangla",
    color: "#06B6D4",
    tags: ["ব্যাকরণ", "সাহিত্য", "কবি পরিচিতি", "ছন্দ"],
    isFeatured: true,
    isPopular: true,
  },
  {
    id: "course-7",
    title: "English Grammar & Composition",
    shortDesc: "Parts of Speech থেকে শুরু করে Transformation পর্যন্ত সকল Grammar Topic।",
    category: "bcs",
    categoryLabel: "BCS",
    instructor: "inst-2",
    price: 199,
    originalPrice: 499,
    isFree: false,
    rating: 4.7,
    totalRatings: 267,
    students: 9800,
    lessons: 100,
    duration: "৪০ ঘণ্টা",
    level: "intermediate",
    levelLabel: "মাধ্যমিক",
    thumbnail: "english",
    color: "#10B981",
    tags: ["Grammar", "Vocabulary", "Composition", "Translation"],
    isFeatured: false,
    isPopular: true,
  },
  {
    id: "course-8",
    title: "গণিত ও মানসিক দক্ষতা",
    shortDesc: "পাটিগণিত, বীজগণিত, জ্যামিতি এবং মানসিক দক্ষতার সম্পূর্ণ MCQ ব্যাংক।",
    category: "bank",
    categoryLabel: "ব্যাংক",
    instructor: "inst-3",
    price: 249,
    originalPrice: 499,
    isFree: false,
    rating: 4.8,
    totalRatings: 198,
    students: 7600,
    lessons: 110,
    duration: "৩৮ ঘণ্টা",
    level: "advanced",
    levelLabel: "উন্নত",
    thumbnail: "math",
    color: "#F59E0B",
    tags: ["পাটিগণিত", "বীজগণিত", "জ্যামিতি", "মানসিক দক্ষতা"],
    isFeatured: false,
    isPopular: false,
  },
  {
    id: "course-9",
    title: "কম্পিউটার ও তথ্যপ্রযুক্তি MCQ",
    shortDesc: "BCS, ব্যাংক ও সকল চাকরি পরীক্ষার জন্য কম্পিউটার ও ICT বিষয়ক MCQ।",
    category: "bcs",
    categoryLabel: "BCS",
    instructor: "inst-1",
    price: 0,
    originalPrice: 0,
    isFree: true,
    rating: 4.6,
    totalRatings: 176,
    students: 11200,
    lessons: 60,
    duration: "২২ ঘণ্টা",
    level: "beginner",
    levelLabel: "শিক্ষার্থী",
    thumbnail: "computer",
    color: "#EF4444",
    tags: ["হার্ডওয়্যার", "সফটওয়্যার", "নেটওয়ার্ক", "সাইবার সিকিউরিটি"],
    isFeatured: false,
    isPopular: false,
  },
  {
    id: "course-10",
    title: "সাধারণ জ্ঞান — বাংলাদেশ বিষয়াবলী",
    shortDesc: "বাংলাদেশের ইতিহাস, ভূগোল, সংবিধান, মুক্তিযুদ্ধ এবং সাম্প্রতিক বিষয়াবলী।",
    category: "bcs",
    categoryLabel: "BCS",
    instructor: "inst-1",
    price: 149,
    originalPrice: 299,
    isFree: false,
    rating: 4.8,
    totalRatings: 345,
    students: 14300,
    lessons: 95,
    duration: "৩৫ ঘণ্টা",
    level: "beginner",
    levelLabel: "শিক্ষার্থী",
    thumbnail: "bangladesh",
    color: "#6C63FF",
    tags: ["ইতিহাস", "ভূগোল", "সংবিধান", "মুক্তিযুদ্ধ"],
    isFeatured: true,
    isPopular: true,
  },
  {
    id: "course-11",
    title: "আন্তর্জাতিক বিষয়াবলী MCQ",
    shortDesc: "জাতিসংঘ, আন্তর্জাতিক সংস্থা, ভূরাজনীতি এবং সাম্প্রতিক আন্তর্জাতিক ইস্যু।",
    category: "bcs",
    categoryLabel: "BCS",
    instructor: "inst-2",
    price: 99,
    originalPrice: 199,
    isFree: false,
    rating: 4.5,
    totalRatings: 134,
    students: 5600,
    lessons: 50,
    duration: "১৮ ঘণ্টা",
    level: "intermediate",
    levelLabel: "মাধ্যমিক",
    thumbnail: "international",
    color: "#00D4AA",
    tags: ["জাতিসংঘ", "সংস্থা", "ভূরাজনীতি", "সাম্প্রতিক"],
    isFeatured: false,
    isPopular: false,
  },
  {
    id: "course-12",
    title: "ব্যাংক Written + Viva প্রস্তুতি",
    shortDesc: "ব্যাংক পরীক্ষার Written ও Viva অংশের জন্য বিশেষ প্রস্তুতি কোর্স।",
    category: "bank",
    categoryLabel: "ব্যাংক",
    instructor: "inst-3",
    price: 499,
    originalPrice: 999,
    isFree: false,
    rating: 4.9,
    totalRatings: 87,
    students: 3200,
    lessons: 45,
    duration: "১৫ ঘণ্টা",
    level: "advanced",
    levelLabel: "উন্নত",
    thumbnail: "bankviva",
    color: "#8B5CF6",
    tags: ["Written", "Viva", "প্রেজেন্টেশন", "কেস স্টাডি"],
    isFeatured: true,
    isPopular: false,
  },
];

// ═══════════════════════════════════════════
// 🔍 Filter Options
// ═══════════════════════════════════════════

export const FILTER_CATEGORIES = [
  { value: "all", label: "সব ক্যাটেগরি", icon: "📚" },
  { value: "bcs", label: "BCS", icon: "🏛️" },
  { value: "bank", label: "ব্যাংক", icon: "🏦" },
  { value: "ntrca", label: "NTRCA", icon: "👨‍🏫" },
  { value: "primary", label: "প্রাইমারি", icon: "📖" },
  { value: "non-cadre", label: "নন-ক্যাডার", icon: "🏢" },
];

export const FILTER_PRICES = [
  { value: "all", label: "সব মূল্য", icon: "💰" },
  { value: "free", label: "ফ্রি কোর্স", icon: "🎁" },
  { value: "paid", label: "পেইড কোর্স", icon: "💎" },
];

export const FILTER_LEVELS = [
  { value: "all", label: "সব লেভেল", icon: "📊" },
  { value: "beginner", label: "শিক্ষার্থী", icon: "🌱" },
  { value: "intermediate", label: "মাধ্যমিক", icon: "🌿" },
  { value: "advanced", label: "উন্নত", icon: "🌳" },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "জনপ্রিয়" },
  { value: "newest", label: "নতুন" },
  { value: "rating", label: "রেটিং" },
  { value: "price-low", label: "মূল্য (কম)" },
  { value: "price-high", label: "মূল্য (বেশি)" },
];

// ═══════════════════════════════════════════
// 💎 Pricing Plans
// ═══════════════════════════════════════════

export const PRICING_PLANS = [
  {
    id: "free",
    name: "ফ্রি",
    nameEn: "Free",
    price: 0,
    period: "চিরকাল",
    description: "শেখা শুরু করুন — বিনামূল্যে",
    color: "#00D4AA",
    isPopular: false,
    features: [
      { text: "ফ্রি কোর্স অ্যাক্সেস", included: true },
      { text: "সীমিত MCQ প্র্যাক্টিস", included: true },
      { text: "বেসিক পরীক্ষা", included: true },
      { text: "কমিউনিটি সাপোর্ট", included: true },
      { text: "সার্টিফিকেট", included: false },
      { text: "লাইভ ক্লাস", included: false },
      { text: "ডাউনলোড অপশন", included: false },
      { text: "ব্যক্তিগত মেন্টরিং", included: false },
    ],
  },
  {
    id: "premium",
    name: "প্রিমিয়াম",
    nameEn: "Premium",
    price: 299,
    period: "মাসিক",
    description: "সব কোর্স আনলিমিটেড অ্যাক্সেস",
    color: "#6C63FF",
    isPopular: true,
    features: [
      { text: "সব কোর্স আনলিমিটেড", included: true },
      { text: "আনলিমিটেড MCQ প্র্যাক্টিস", included: true },
      { text: "সব পরীক্ষা অ্যাক্সেস", included: true },
      { text: "প্রায়োরিটি সাপোর্ট", included: true },
      { text: "সার্টিফিকেট", included: true },
      { text: "লাইভ ক্লাস", included: true },
      { text: "ডাউনলোড অপশন", included: false },
      { text: "ব্যক্তিগত মেন্টরিং", included: false },
    ],
  },
  {
    id: "pro",
    name: "প্রো",
    nameEn: "Pro",
    price: 699,
    period: "মাসিক",
    description: "সম্পূর্ণ অ্যাক্সেস + ব্যক্তিগত গাইডেন্স",
    color: "#FFB800",
    isPopular: false,
    features: [
      { text: "সব কোর্স আনলিমিটেড", included: true },
      { text: "আনলিমিটেড MCQ প্র্যাক্টিস", included: true },
      { text: "সব পরীক্ষা অ্যাক্সেস", included: true },
      { text: "VIP সাপোর্ট", included: true },
      { text: "সার্টিফিকেট", included: true },
      { text: "লাইভ ক্লাস + রেকর্ডিং", included: true },
      { text: "ডাউনলোড অপশন", included: true },
      { text: "ব্যক্তিগত মেন্টরিং", included: true },
    ],
  },
];

// ═══════════════════════════════════════════
// 🎨 Thumbnail Gradient Map
// ═══════════════════════════════════════════

export const THUMBNAIL_GRADIENTS = {
  bcs: { from: "#6C63FF", to: "#4834D4", emoji: "🏛️" },
  bank: { from: "#00D4AA", to: "#00A886", emoji: "🏦" },
  ntrca: { from: "#FFB800", to: "#E6A600", emoji: "👨‍🏫" },
  primary: { from: "#FF6B8A", to: "#E0557F", emoji: "📖" },
  noncadre: { from: "#8B5CF6", to: "#6D3FD4", emoji: "📋" },
  bangla: { from: "#06B6D4", to: "#0891B2", emoji: "📝" },
  english: { from: "#10B981", to: "#059669", emoji: "🔤" },
  math: { from: "#F59E0B", to: "#D97706", emoji: "🔢" },
  computer: { from: "#EF4444", to: "#DC2626", emoji: "💻" },
  bangladesh: { from: "#6C63FF", to: "#4834D4", emoji: "🗺️" },
  international: { from: "#00D4AA", to: "#00A886", emoji: "🌍" },
  bankviva: { from: "#8B5CF6", to: "#6D3FD4", emoji: "🎤" },
};

// ═══════════════════════════════════════════
// 🛠️ Utility Functions
// ═══════════════════════════════════════════

const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBanglaNumber(num) {
  return String(num).replace(/[0-9]/g, (d) => BANGLA_DIGITS[d]);
}

export function toBanglaPrice(price) {
  if (price === 0) return "ফ্রি";
  return "৳" + toBanglaNumber(price.toLocaleString("en-IN"));
}

export function getDiscountPercent(original, current) {
  if (!original || !current || original === 0) return 0;
  return Math.round(((original - current) / original) * 100);
}

export function getInstructor(instructorId) {
  return INSTRUCTORS.find((inst) => inst.id === instructorId) ?? null;
}

export function getFeaturedCourses() {
  return COURSES.filter((c) => c.isFeatured);
}

export function getPopularCourses() {
  return COURSES.filter((c) => c.isPopular);
}

export function getCoursesByCategory(category) {
  if (category === "all") return COURSES;
  return COURSES.filter((c) => c.category === category);
}
// ═══════════════════════════════════════════════════════════
// 📦 PHASE 2F — TESTIMONIALS DATA
// ═══════════════════════════════════════════════════════════

export const TESTIMONIALS = [
  {
    id: 1,
    name: "রাফিউল ইসলাম",
    designation: "৩৮তম BCS (সাধারণ শিক্ষা)",
    avatar: "👨‍🎓",
    rating: 5,
    quote:
      "9OC Academy এর MCQ প্র্যাক্টিস সেট আমার BCS প্রিলিমিনারি পাস করতে অনেক সাহায্য করেছে। বিশেষ করে বাংলা ও ইংরেজি সাহিত্যের প্রশ্নগুলো অসাধারণ ছিল।",
    examPassed: "৩৮তম BCS প্রিলি",
    courseTaken: "BCS Complete Guide",
    bgGradient: "from-purple-500/20 to-indigo-500/20",
  },
  {
    id: 2,
    name: "ফাতেমা আক্তার",
    designation: "সিনিয়র অফিসার, সোনালী ব্যাংক",
    avatar: "👩‍💼",
    rating: 5,
    quote:
      "ব্যাংক জবের Math আর Reasoning এর জন্য এই প্ল্যাটফর্ম সেরা। প্রতিদিন ২০টা করে MCQ সলভ করতাম, ৩ মাসেই ব্যাংকে চাকরি পেয়ে গেছি!",
    examPassed: "সোনালী ব্যাংক সিনিয়র অফিসার",
    courseTaken: "Bank Job Preparation",
    bgGradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 3,
    name: "মোহাম্মদ হাসান",
    designation: "প্রাথমিক বিদ্যালয় শিক্ষক",
    avatar: "👨‍🏫",
    rating: 5,
    quote:
      "প্রাইমারি শিক্ষক নিয়োগের প্রস্তুতি এখানেই নিয়েছি। পেডাগজি আর শিশু মনোবিজ্ঞানের MCQ গুলো পরীক্ষায় হুবহু কমন পেয়েছি। ধন্যবাদ 9OC Academy!",
    examPassed: "প্রাথমিক শিক্ষক নিয়োগ ২০২৪",
    courseTaken: "Primary Teacher Guide",
    bgGradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 4,
    name: "সাবরিনা চৌধুরী",
    designation: "NTRCA সার্টিফিকেটধারী",
    avatar: "👩‍🎓",
    rating: 4,
    quote:
      "NTRCA পরীক্ষার জন্য সবচেয়ে ভালো প্রিপারেশন প্ল্যাটফর্ম। টপিক ভিত্তিক MCQ আর মডেল টেস্ট দিয়ে নিজেকে যাচাই করতে পারি। Highly recommended!",
    examPassed: "১৮তম NTRCA (কলেজ পর্যায়)",
    courseTaken: "NTRCA Preparation",
    bgGradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: 5,
    name: "আবদুল করিম",
    designation: "উপজেলা পরিবার পরিকল্পনা কর্মকর্তা",
    avatar: "👨‍⚕️",
    rating: 5,
    quote:
      "Non-Cadre পরীক্ষার জন্য আলাদা সেকশন থাকায় খুব সুবিধা হয়েছে। সাধারণ জ্ঞান আর কারেন্ট অ্যাফেয়ার্সের আপডেট MCQ পেয়ে পরীক্ষায় এগিয়ে ছিলাম।",
    examPassed: "নন-ক্যাডার ১ম/২য় শ্রেণি",
    courseTaken: "Non-Cadre Complete",
    bgGradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 6,
    name: "নুসরাত জাহান",
    designation: "অফিসার (ক্যাশ), জনতা ব্যাংক",
    avatar: "👩‍💻",
    rating: 5,
    quote:
      "ফ্রি কোর্সগুলো দিয়ে শুরু করেছিলাম, পরে Premium নিয়েছি। ব্যাংকের Written আর Viva এর টিপস অনেক কাজে এসেছে। এখন নিজেই বন্ধুদের সাজেস্ট করি!",
    examPassed: "জনতা ব্যাংক অফিসার (ক্যাশ)",
    courseTaken: "Bank Job Preparation",
    bgGradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: 7,
    name: "তানভীর আহমেদ",
    designation: "৪৩তম BCS (পুলিশ)",
    avatar: "🧑‍✈️",
    rating: 5,
    quote:
      "দিনে মাত্র ১ ঘণ্টা সময় দিতে পারতাম। 9OC Academy এর শর্ট MCQ সেট ও টাইমড টেস্ট সিস্টেম আমার মতো ব্যস্ত মানুষদের জন্য পারফেক্ট।",
    examPassed: "৪৩তম BCS (পুলিশ ক্যাডার)",
    courseTaken: "BCS Complete Guide",
    bgGradient: "from-sky-500/20 to-indigo-500/20",
  },
  {
    id: 8,
    name: "রিমা বেগম",
    designation: "সহকারী শিক্ষক, মাধ্যমিক",
    avatar: "👩‍🏫",
    rating: 4,
    quote:
      "গ্রামে থাকি, কোচিং এ যাওয়ার সুযোগ ছিল না। 9OC Academy মোবাইলেই সব প্রশ্ন প্র্যাক্টিস করেছি। মোবাইল ফ্রেন্ডলি ডিজাইনের জন্য ধন্যবাদ!",
    examPassed: "DSHE সহকারী শিক্ষক নিয়োগ",
    courseTaken: "NTRCA Preparation",
    bgGradient: "from-lime-500/20 to-green-500/20",
  },
  {
    id: 9,
    name: "শাকিল আহমেদ",
    designation: "প্রবেশনারি অফিসার, রূপালী ব্যাংক",
    avatar: "👨‍💼",
    rating: 5,
    quote:
      "মাত্র ৯৯ টাকায় Pro Plan নিয়ে ৫০০০+ MCQ প্র্যাক্টিস করেছি। কোচিং এ ৫০,০০০ টাকা খরচ না করে একই রেজাল্ট পেয়েছি। Best investment ever!",
    examPassed: "রূপালী ব্যাংক প্রবেশনারি অফিসার",
    courseTaken: "Bank Job Preparation",
    bgGradient: "from-fuchsia-500/20 to-pink-500/20",
  },
  {
    id: 10,
    name: "আয়েশা সিদ্দিকা",
    designation: "৪৪তম BCS (শিক্ষা)",
    avatar: "👩‍🎓",
    rating: 5,
    quote:
      "BCS এর International Affairs আর Science বিষয়ের MCQ গুলো অসাধারণ ছিল। বিগত সালের প্রশ্ন বিশ্লেষণ থেকে প্যাটার্ন বুঝতে পেরেছি। সবাইকে রেকমেন্ড করছি!",
    examPassed: "৪৪তম BCS প্রিলি + রিটেন",
    courseTaken: "BCS Complete Guide",
    bgGradient: "from-teal-500/20 to-cyan-500/20",
  },
];

// ═══════════════════════════════════════════════════════════
// ❓ PHASE 2F — FAQ DATA
// ═══════════════════════════════════════════════════════════

export const FAQ_CATEGORIES = [
  { id: "general", label: "সাধারণ", icon: "📋" },
  { id: "course", label: "কোর্স", icon: "📚" },
  { id: "exam", label: "পরীক্ষা", icon: "📝" },
  { id: "payment", label: "পেমেন্ট", icon: "💳" },
];

export const FAQ_DATA = [
  // === সাধারণ ===
  {
    id: 1,
    category: "general",
    question: "9OC Academy কী?",
    answer:
      "9OC Academy হলো বাংলাদেশের একটি অনলাইন MCQ পরীক্ষা প্ল্যাটফর্ম। এখানে BCS, ব্যাংক জব, NTRCA, প্রাইমারি শিক্ষক নিয়োগ এবং Non-Cadre সহ সকল সরকারি চাকরির পরীক্ষার জন্য MCQ প্র্যাক্টিস করা যায়। আমাদের লক্ষ্য হলো সবার জন্য সুলভ মূল্যে মানসম্পন্ন পরীক্ষার প্রস্তুতি নিশ্চিত করা।",
  },
  {
    id: 2,
    category: "general",
    question: "এটি কি সম্পূর্ণ ফ্রি?",
    answer:
      "আমাদের প্ল্যাটফর্মে ফ্রি এবং প্রিমিয়াম — দুই ধরনের কোর্স আছে। ফ্রি প্ল্যানে আপনি প্রতিদিন ১০টি MCQ প্র্যাক্টিস করতে পারবেন এবং বেসিক কোর্সগুলো অ্যাক্সেস করতে পারবেন। আরও বেশি MCQ, মডেল টেস্ট এবং বিস্তারিত ব্যাখ্যার জন্য Premium বা Pro প্ল্যান নিতে পারেন।",
  },
  {
    id: 3,
    category: "general",
    question: "মোবাইল দিয়ে ব্যবহার করা যাবে?",
    answer:
      "হ্যাঁ, অবশ্যই! 9OC Academy সম্পূর্ণ মোবাইল ফ্রেন্ডলি। আপনার Android বা iPhone এর ব্রাউজার থেকেই সব কোর্স ও পরীক্ষায় অংশ নিতে পারবেন। আলাদা কোনো অ্যাপ ডাউনলোড করার দরকার নেই। ইন্টারনেট কানেকশন থাকলেই যেকোনো জায়গা থেকে প্র্যাক্টিস করুন।",
  },
  // === কোর্স ===
  {
    id: 4,
    category: "course",
    question: "কোর্সগুলো কত দিনের?",
    answer:
      "বিভিন্ন কোর্সের সময়কাল বিভিন্ন। সাধারণত একটি সম্পূর্ণ কোর্স ৩০ থেকে ৯০ দিনের হয়ে থাকে। তবে একবার কোর্সে ভর্তি হলে আপনি আজীবন অ্যাক্সেস পাবেন, তাই নিজের সুবিধামতো সময়ে শেষ করতে পারবেন।",
  },
  {
    id: 5,
    category: "course",
    question: "কোর্সের MCQ গুলো কোথা থেকে তৈরি?",
    answer:
      "আমাদের MCQ গুলো তৈরি করেন অভিজ্ঞ শিক্ষক ও BCS/Bank ক্যাডাররা। বিগত সালের প্রশ্ন বিশ্লেষণ, জাতীয় পাঠ্যক্রম এবং সাম্প্রতিক সিলেবাস অনুযায়ী প্রশ্ন তৈরি হয়। প্রতিটি প্রশ্নের সাথে বিস্তারিত ব্যাখ্যা ও রেফারেন্স দেওয়া থাকে।",
  },
  {
    id: 6,
    category: "course",
    question: "একটি কোর্সে কতগুলো MCQ থাকে?",
    answer:
      "প্রতিটি কোর্সে সাধারণত ৫০০ থেকে ৫০০০+ MCQ থাকে। কোর্সভেদে এটি ভিন্ন হতে পারে। এছাড়াও প্রতি সপ্তাহে নতুন MCQ যোগ করা হয়, তাই কনটেন্ট সবসময় আপডেটেড থাকে।",
  },
  // === পরীক্ষা ===
  {
    id: 7,
    category: "exam",
    question: "পরীক্ষায় কি টাইমার থাকবে?",
    answer:
      "হ্যাঁ, প্রতিটি মডেল টেস্টে কাউন্টডাউন টাইমার থাকবে। এটি আপনাকে প্রকৃত পরীক্ষার পরিবেশে প্র্যাক্টিস করতে সাহায্য করবে। তবে টপিক ভিত্তিক প্র্যাক্টিস মোডে কোনো সময়সীমা থাকবে না, আপনি চিন্তা করে উত্তর দিতে পারবেন।",
  },
  {
    id: 8,
    category: "exam",
    question: "পরীক্ষার পর কি ব্যাখ্যা দেখা যাবে?",
    answer:
      "অবশ্যই! প্রতিটি পরীক্ষা শেষে আপনি বিস্তারিত রেজাল্ট দেখতে পাবেন। কোন প্রশ্নের উত্তর সঠিক, কোনটি ভুল — সব ব্যাখ্যাসহ দেখানো হবে। Premium ব্যবহারকারীরা আরও বিস্তারিত পারফরম্যান্স অ্যানালাইসিস ও দুর্বল টপিক চিহ্নিত করতে পারবেন।",
  },
  {
    id: 9,
    category: "exam",
    question: "নেগেটিভ মার্কিং কি আছে?",
    answer:
      "হ্যাঁ, BCS ও ব্যাংক জবের মডেল টেস্টে নেগেটিভ মার্কিং সিস্টেম আছে (প্রতিটি ভুল উত্তরে ০.২৫ নম্বর কাটা যাবে)। এটি প্রকৃত পরীক্ষার মতো অভিজ্ঞতা দেবে। তবে প্র্যাক্টিস মোডে নেগেটিভ মার্কিং বন্ধ রাখা যাবে।",
  },
  // === পেমেন্ট ===
  {
    id: 10,
    category: "payment",
    question: "পেমেন্ট কিভাবে করবো?",
    answer:
      "বর্তমানে আমরা bKash এর মাধ্যমে ম্যানুয়াল পেমেন্ট গ্রহণ করি। কোর্স কেনার সময় আমাদের bKash নম্বরে Send Money করে Transaction ID সাবমিট করবেন। ১-২ ঘণ্টার মধ্যে আপনার অ্যাকাউন্ট অ্যাক্টিভ করে দেওয়া হবে। ভবিষ্যতে আরও পেমেন্ট অপশন যোগ হবে।",
  },
  {
    id: 11,
    category: "payment",
    question: "রিফান্ড পলিসি কী?",
    answer:
      "কোর্স কেনার ৭ দিনের মধ্যে যদি সন্তুষ্ট না হন, পুরো টাকা রিফান্ড পাবেন — কোনো প্রশ্ন করা হবে না। শুধু আমাদের সাপোর্টে জানান, ২৪ ঘণ্টার মধ্যে bKash এ টাকা ফেরত পাঠানো হবে।",
  },
  {
    id: 12,
    category: "payment",
    question: "কোর্সের মেয়াদ কতদিন?",
    answer:
      "একবার কোর্স কিনলে আজীবন অ্যাক্সেস পাবেন। কোনো মেয়াদ শেষ হওয়ার ঝামেলা নেই। ভবিষ্যতে কোর্সে নতুন MCQ যোগ হলে সেগুলোও ফ্রিতে পাবেন। তবে Pro প্ল্যান মাসিক/বার্ষিক সাবস্ক্রিপশন ভিত্তিক।",
  },
];

// ═══════════════════════════════════════════════════════════
// 📧 PHASE 2F — NEWSLETTER DATA
// ═══════════════════════════════════════════════════════════

export const NEWSLETTER_BENEFITS = [
  {
    id: 1,
    icon: "📝",
    text: "প্রতি সপ্তাহে ফ্রি MCQ সেট",
  },
  {
    id: 2,
    icon: "📢",
    text: "নতুন কোর্স ও অফারের আপডেট",
  },
  {
    id: 3,
    icon: "📊",
    text: "পরীক্ষার টিপস ও ট্রিকস",
  },
  {
    id: 4,
    icon: "🎁",
    text: "সাবস্ক্রাইবারদের এক্সক্লুসিভ ডিসকাউন্ট",
  },
];
