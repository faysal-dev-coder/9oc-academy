"use client";

import { useCallback, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AvatarUploadModal from "@/components/profile/AvatarUploadModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
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
  // Local Profile State (live avatar update)
  // ─────────────────────────────────────────
  const [profileData, setProfileData] = useState(profile);

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
  // Form Handler (React 19 Compiler auto-optimizes)
  // ─────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
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
  // Avatar Update Callback (Modal এ pass — useCallback)
  // ─────────────────────────────────────────
  const handleAvatarUpdated = useCallback(
    (nextAvatarUrl) => {
      setProfileData((current) => ({
        ...current,
        avatar_url: nextAvatarUrl,
      }));
      router.refresh();
    },
    [router]
  );

  // ─────────────────────────────────────────
  // Modal Close Handlers (Modal এ pass — useCallback)
  // ─────────────────────────────────────────
  const handleCloseAvatarModal = useCallback(() => {
    setShowAvatarModal(false);
  }, []);

  const handleClosePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
  }, []);

  // ─────────────────────────────────────────
  // Avatar URL + First Letter
  // ─────────────────────────────────────────
  const avatarUrl = profileData?.avatar_url;
  const firstLetter = (profileData?.full_name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A1A] pb-20 text-white">
      {/* ═══════════ Background Orbs ═══════════ */}
      <div className="pointer-events-none absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:py-8">
        {/* ═══════════ Back Button ═══════════ */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-gray-400 transition hover:text-white"
        >
          <FaArrowLeft />
          <span>ড্যাশবোর্ডে ফিরুন</span>
        </Link>

        {/* ═══════════ SECTION 1: Profile Header ═══════════ */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-linear-to-br from-purple-600/15 to-pink-600/10 p-6 backdrop-blur-sm sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  width={112}
                  height={112}
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-purple-500/30 sm:h-28 sm:w-28"
                  unoptimized
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 text-4xl font-bold text-white ring-4 ring-purple-500/30 sm:h-28 sm:w-28">
                  {firstLetter}
                </div>
              )}

              {/* Camera Button */}
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-600 to-pink-600 shadow-lg transition hover:scale-110"
                title="ছবি পরিবর্তন করুন"
              >
                <FaCamera className="text-sm" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="mb-1 text-2xl font-bold sm:text-3xl">
                {profileData?.full_name || "নাম দেওয়া হয়নি"}
              </h1>
              <p className="mb-3 text-sm text-gray-400 sm:text-base">{user?.email}</p>

              {/* Role Badge */}
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
                  {profileData?.role === "admin" ? "👑 Admin" : "🎓 Student"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  <FaCalendarAlt className="text-xs" />
                  যোগদান: {formatDate(profileData?.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ SECTION 2: Quick Stats ═══════════ */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
            <FaUser className="text-purple-400" />
            প্রোফাইল এডিট করুন
          </h2>

          {/* Success/Error Message */}
          {message.text && (
            <div
              className={`mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                message.type === "success"
                  ? "border border-green-500/30 bg-green-500/10 text-green-400"
                  : "border border-red-500/30 bg-red-500/10 text-red-400"
              }`}
            >
              {message.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email (Read Only) */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <FaEnvelope className="mr-2 inline text-gray-400" />
                ইমেইল (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-gray-400"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <FaUser className="mr-2 inline text-gray-400" />
                পূর্ণ নাম
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <FaPhone className="mr-2 inline text-gray-400" />
                ফোন নম্বর
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* District */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <FaMapMarkerAlt className="mr-2 inline text-gray-400" />
                জেলা
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white transition focus:border-purple-500 focus:outline-none"
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
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <FaGraduationCap className="mr-2 inline text-gray-400" />
                প্রস্তুতি ক্ষেত্র
              </label>
              <select
                name="preparation_level"
                value={formData.preparation_level}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white transition focus:border-purple-500 focus:outline-none"
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:w-auto"
            >
              <FaSave />
              {isPending ? "সেভ হচ্ছে..." : "সেভ করুন"}
            </button>
          </form>
        </div>

        {/* ═══════════ SECTION 4: Security ═══════════ */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
            <FaKey className="text-yellow-400" />
            একাউন্ট সিকিউরিটি
          </h2>

          <div className="space-y-3">
            {/* Change Password */}
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="group flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                  <FaKey className="text-yellow-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">পাসওয়ার্ড পরিবর্তন</div>
                  <div className="text-xs text-gray-400">আপনার একাউন্টের পাসওয়ার্ড আপডেট করুন</div>
                </div>
              </div>
              <span className="text-gray-400 transition group-hover:text-white">→</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group flex w-full items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 p-4 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                  <FaSignOutAlt className="text-red-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-red-400">লগআউট</div>
                  <div className="text-xs text-gray-400">
                    {isLoggingOut ? "লগআউট হচ্ছে..." : "একাউন্ট থেকে বের হন"}
                  </div>
                </div>
              </div>
              <span className="text-red-400 transition group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* ═══════════ Avatar Upload Modal (Real) ═══════════ */}
        <AvatarUploadModal
          isOpen={showAvatarModal}
          onClose={handleCloseAvatarModal}
          userId={user?.id}
          currentAvatarUrl={profileData?.avatar_url || ""}
          onAvatarUpdated={handleAvatarUpdated}
        />

        {/* ═══════════ Password Change Modal (Real — Task H) ═══════════ */}
        <ChangePasswordModal isOpen={showPasswordModal} onClose={handleClosePasswordModal} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 📊 Stat Card Component
// ═══════════════════════════════════════════════════════════
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div
        className="absolute -top-4 -right-4 h-20 w-20 rounded-full opacity-20 blur-xl"
        style={{ backgroundColor: color }}
      />
      <div className="relative">
        <div
          className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon style={{ color }} />
        </div>
        <div className="mb-0.5 text-2xl font-bold">{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </div>
    </div>
  );
}
