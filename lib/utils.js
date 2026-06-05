// lib/utils.js
// ═══════════════════════════════════════════
// 9OC Academy — Utility Functions
// ═══════════════════════════════════════════

// ─── cn() — Class Name Merger ───────────
// একাধিক CSS class কে একসাথে জোড়া লাগায়
// ব্যবহার: cn("text-white", isActive && "bg-blue-500")
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ─── বাংলা সংখ্যা Converter ─────────────
// 12345 → ১২৩৪৫
const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaNumber(num) {
  if (num === null || num === undefined) return '';
  return String(num).replace(/[0-9]/g, (digit) => banglaDigits[digit]);
}

// ─── টাকা Format করা ────────────────────
// 1500 → ৳১,৫০০
export function formatPrice(price) {
  if (!price && price !== 0) return '৳০';
  const formatted = Number(price).toLocaleString('bn-BD');
  return `৳${formatted}`;
}

// ─── তারিখ Format করা ───────────────────
// 2025-01-15 → ১৫ জানুয়ারি, ২০২৫
const banglaMonths = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = toBanglaNumber(date.getDate());
  const month = banglaMonths[date.getMonth()];
  const year = toBanglaNumber(date.getFullYear());
  return `${day} ${month}, ${year}`;
}

// ─── সময় Format করা ────────────────────
// 90 → ১ ঘণ্টা ৩০ মিনিট
export function formatDuration(minutes) {
  if (!minutes) return '০ মিনিট';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${toBanglaNumber(mins)} মিনিট`;
  if (mins === 0) return `${toBanglaNumber(hours)} ঘণ্টা`;
  return `${toBanglaNumber(hours)} ঘণ্টা ${toBanglaNumber(mins)} মিনিট`;
}

// ─── Slug তৈরি করা ──────────────────────
// "BCS প্রস্তুতি" → "bcs-প্রস্তুতি"
export function createSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u0980-\u09FF]+/g, '')
    .replace(/\-\-+/g, '-');
}

// ─── Truncate Text ──────────────────────
// লম্বা Text কে ছোট করা
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
