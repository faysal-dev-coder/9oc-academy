"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCalendarAlt,
  FaTrophy,
  FaMedal,
  FaChartLine,
  FaClipboardList,
  FaArrowLeft,
  FaSave,
  FaSignOutAlt,
  FaKey,
  FaCamera,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

// ═══════════════════════════════════════════════════════════
// 🔢 Helper: English → বাংলা
// ═══════════════════════════════════════════════════════════
const toBangla = (num) => {
  if (num === null || num === undefined) return "—";
  return String(num).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
};

// ═══════════════════════════════════════════════════════════
// 📅 Helper: Date format
// ═══════════════════════════════════════════════════════════
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ═══════════════════════════════════════════════════════════
// 🏆 Main Component
// ═══════════════════════════════════════════════════════════
export default function ProfileClient({ user, profile, stats, districts, preparationLevels }) {
  const router = useRouter();
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  // ─────────────────────────────────────────
  // Form State
  // ─────────────────────────────────────────
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    district: profile?.district || "",
    preparation_level: profile?.preparation_level || "",
  });

  // ─────────────────────────────────────────
  // UI State
  // ─────────────────────────────────────────
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ─────────────────────────────────────────
  // Form Handler
  // ─────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: "", text: "" });
  };

  // ─────────────────────────────────────────
  // Save Profile
  // ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    startTransition(async () => {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: formData.full_name.trim() || null,
            phone: formData.phone.trim() || null,
            district: formData.district || null,
            preparation_level: formData.preparation_level || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (error) {
          setMessage({
            type: "error",
            text: "প্রোফাইল আপডেট করতে সমস্যা হয়েছে!",
          });
          return;
        }

        setMessage({
          type: "success",
          text: "প্রোফাইল সফলভাবে আপডেট হয়েছে! ✅",
        });

        // Refresh page data
        router.refresh();
      } catch (err) {
        setMessage({
          type: "error",
          text: "একটি সমস্যা হয়েছে! আবার চেষ্টা করুন।",
        });
      }
    });
  };

  // ─────────────────────────────────────────
  // Logout
  // ─────────────────────────────────────────
  const handleLogout = async () => {
    if (!confirm("আপনি কি সত্যিই লগআউট করতে চান?")) return;

    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // ─────────────────────────────────────────
  // Avatar URL
  // ─────────────────────────────────────────
  const avatarUrl = profile?.avatar_url;
  const firstLetter = (profile?.full_name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A1A] text-white pb-20">
      {/* ═══════════ Background Orbs ═══════════ */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* ═══════════ Back Button ═══════════ */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
        >
          <FaArrowLeft />
          <span>ড্যাশবোর্ডে ফিরুন</span>
        </Link>

        {/* ═══════════ SECTION 1: Profile Header ═══════════ */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-linear-to-br from-purple-600/15 to-pink-600/10 backdrop-blur-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  width={112}
                  height={112}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-purple-500/30"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white ring-4 ring-purple-500/30">
                  {firstLetter}
                </div>
              )}

              {/* Camera Button */}
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-linear-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg"
                title="ছবি পরিবর্তন করুন"
              >
                <FaCamera className="text-sm" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                {profile?.full_name || "নাম দেওয়া হয়নি"}
              </h1>
              <p className="text-gray-400 mb-3 text-sm sm:text-base">{user?.email}</p>

              {/* Role Badge */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {profile?.role === "admin" ? "👑 Admin" : "🎓 Student"}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs text-gray-300 bg-white/5 border border-white/10">
                  <FaCalendarAlt className="text-xs" />
                  যোগদান: {formatDate(profile?.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ SECTION 2: Quick Stats ═══════════ */}
        <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={FaClipboardList}
            label="মোট পরীক্ষা"
            value={toBangla(stats.attempts)}
            color="#6C63FF"
          />
          <StatCard
            icon={FaTrophy}
            label="সর্বোচ্চ স্কোর"
            value={`${toBangla(stats.bestScore)}%`}
            color="#FFB800"
          />
          <StatCard
            icon={FaMedal}
            label="লিডারবোর্ড র‍্যাঙ্ক"
            value={stats.leaderboardRank ? `#${toBangla(stats.leaderboardRank)}` : "—"}
            color="#FF6B6B"
          />
          <StatCard
            icon={FaChartLine}
            label="পাস রেট"
            value={`${toBangla(stats.passRate)}%`}
            color="#00D4AA"
          />
        </div>

        {/* ═══════════ SECTION 3: Edit Profile Form ═══════════ */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <FaUser className="text-purple-400" />
            প্রোফাইল এডিট করুন
          </h2>

          {/* Success/Error Message */}
          {message.text && (
            <div
              className={`mb-4 px-4 py-3 rounded-lg flex items-center gap-2 text-sm ${
                message.type === "success"
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {message.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email (Read Only) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaEnvelope className="inline mr-2 text-gray-400" />
                ইমেইল (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaUser className="inline mr-2 text-gray-400" />
                পূর্ণ নাম
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaPhone className="inline mr-2 text-gray-400" />
                ফোন নম্বর
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-gray-400" />
                জেলা
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="" className="bg-[#0A0A1A]">
                  -- জেলা নির্বাচন করুন --
                </option>
                {districts.map((d) => (
                  <option key={d.value} value={d.value} className="bg-[#0A0A1A]">
                    {d.label} ({d.division})
                  </option>
                ))}
              </select>
            </div>

            {/* Preparation Level */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaGraduationCap className="inline mr-2 text-gray-400" />
                প্রস্তুতি ক্ষেত্র
              </label>
              <select
                name="preparation_level"
                value={formData.preparation_level}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="" className="bg-[#0A0A1A]">
                  -- প্রস্তুতি ক্ষেত্র নির্বাচন করুন --
                </option>
                {preparationLevels.map((level) => (
                  <option key={level.id} value={level.slug} className="bg-[#0A0A1A]">
                    {level.icon} {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FaSave />
              {isPending ? "সেভ হচ্ছে..." : "সেভ করুন"}
            </button>
          </form>
        </div>

        {/* ═══════════ SECTION 4: Security ═══════════ */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <FaKey className="text-yellow-400" />
            একাউন্ট সিকিউরিটি
          </h2>

          <div className="space-y-3">
            {/* Change Password */}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <FaKey className="text-yellow-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">পাসওয়ার্ড পরিবর্তন</div>
                  <div className="text-xs text-gray-400">আপনার একাউন্টের পাসওয়ার্ড আপডেট করুন</div>
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-white transition">→</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <FaSignOutAlt className="text-red-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-red-400">লগআউট</div>
                  <div className="text-xs text-gray-400">
                    {isLoggingOut ? "লগআউট হচ্ছে..." : "একাউন্ট থেকে বের হন"}
                  </div>
                </div>
              </div>
              <span className="text-red-400 group-hover:translate-x-1 transition">→</span>
            </button>
          </div>
        </div>

        {/* ═══════════ Modals (Placeholder for now) ═══════════ */}
        {showAvatarModal && (
          <PlaceholderModal
            title="ছবি আপলোড করুন"
            message="এই feature টি শীঘ্রই আসছে! (Task G)"
            onClose={() => setShowAvatarModal(false)}
          />
        )}

        {showPasswordModal && (
          <PlaceholderModal
            title="পাসওয়ার্ড পরিবর্তন"
            message="এই feature টি শীঘ্রই আসছে! (Task H)"
            onClose={() => setShowPasswordModal(false)}
          />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 📊 Stat Card Component
// ═══════════════════════════════════════════════════════════
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
      <div
        className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-20 blur-xl"
        style={{ backgroundColor: color }}
      />
      <div className="relative">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon style={{ color }} />
        </div>
        <div className="text-2xl font-bold mb-0.5">{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 🔔 Placeholder Modal (Temporary)
// ═══════════════════════════════════════════════════════════
function PlaceholderModal({ title, message, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0A0A1A] border border-white/10 rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 mb-5">{message}</p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition"
        >
          ঠিক আছে
        </button>
      </div>
    </div>
  );
}
