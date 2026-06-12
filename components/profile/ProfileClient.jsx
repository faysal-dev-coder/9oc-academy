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

  const [profileData, setProfileData] = useState(profile);

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    district: profile?.district || "",
    preparation_level: profile?.preparation_level || "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setMessage({ type: "", text: "" });
  };

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

  const handleLogout = async () => {
    if (!confirm("আপনি কি সত্যিই লগআউট করতে চান?")) return;

    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

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

  const handleCloseAvatarModal = useCallback(() => {
    setShowAvatarModal(false);
  }, []);

  const handleClosePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
  }, []);

  const avatarUrl = profileData?.avatar_url;
  const firstLetter = (profileData?.full_name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white pb-20 text-[#1F2937]">
      {/* ═══════════ Soft Background Orbs ═══════════ */}
      <div className="pointer-events-none absolute top-20 left-10 h-72 w-72 rounded-full bg-primary opacity-5 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 h-96 w-96 rounded-full bg-secondary opacity-5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:py-8">
        {/* ═══════════ Back Button ═══════════ */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-[#64748B] font-medium transition hover:text-primary"
        >
          <FaArrowLeft />
          <span>ড্যাশবোর্ডে ফিরুন</span>
        </Link>

        {/* ═══════════ SECTION 1: Profile Header ═══════════ */}
        <div className="mb-8 rounded-3xl border-2 border-primary/20 bg-linear-to-br from-primary/10 via-white to-secondary/10 p-6 shadow-lg shadow-primary/10 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  width={112}
                  height={112}
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-primary/30 shadow-lg sm:h-28 sm:w-28"
                  unoptimized
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-4xl font-bold text-white ring-4 ring-primary/30 shadow-lg sm:h-28 sm:w-28">
                  {firstLetter}
                </div>
              )}

              {/* Camera Button */}
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 transition hover:bg-primary-dark hover:scale-110"
                title="ছবি পরিবর্তন করুন"
              >
                <FaCamera className="text-sm" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="mb-1 text-2xl font-bold text-[#1F2937] sm:text-3xl">
                {profileData?.full_name || "নাম দেওয়া হয়নি"}
              </h1>
              <p className="mb-3 text-sm text-[#64748B] font-medium sm:text-base">{user?.email}</p>

              {/* Role Badge */}
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark">
                  {profileData?.role === "admin" ? "👑 Admin" : "🎓 Student"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-xs text-[#475569] font-medium">
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
            color="#1E9CD7"
          />
          <StatCard
            icon={FaTrophy}
            label="সর্বোচ্চ স্কোর"
            value={`${toBangla(stats.bestScore)}%`}
            color="#D97706"
          />
          <StatCard
            icon={FaMedal}
            label="লিডারবোর্ড র‍্যাঙ্ক"
            value={stats.leaderboardRank ? `#${toBangla(stats.leaderboardRank)}` : "—"}
            color="#DC2626"
          />
          <StatCard
            icon={FaChartLine}
            label="পাস রেট"
            value={`${toBangla(stats.passRate)}%`}
            color="#059669"
          />
        </div>

        {/* ═══════════ SECTION 3: Edit Profile Form ═══════════ */}
        <div className="mb-8 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#1F2937]">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
              <FaUser className="text-primary text-sm" />
            </span>
            প্রোফাইল এডিট করুন
          </h2>

          {/* Success/Error Message */}
          {message.text && (
            <div
              className={`mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
                message.type === "success"
                  ? "border border-green-200 bg-green-50 text-green-700"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email (Read Only) */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#374151]">
                <FaEnvelope className="mr-2 inline text-[#94A3B8]" />
                ইমেইল (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-[#94A3B8]"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#374151]">
                <FaUser className="mr-2 inline text-[#94A3B8]" />
                পূর্ণ নাম
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-[#1F2937] placeholder-[#94A3B8] transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#374151]">
                <FaPhone className="mr-2 inline text-[#94A3B8]" />
                ফোন নম্বর
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-[#1F2937] placeholder-[#94A3B8] transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            {/* District */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#374151]">
                <FaMapMarkerAlt className="mr-2 inline text-[#94A3B8]" />
                জেলা
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-[#1F2937] transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
              >
                <option value="">-- জেলা নির্বাচন করুন --</option>
                {districts.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label} ({d.division})
                  </option>
                ))}
              </select>
            </div>

            {/* Preparation Level */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#374151]">
                <FaGraduationCap className="mr-2 inline text-[#94A3B8]" />
                প্রস্তুতি ক্ষেত্র
              </label>
              <select
                name="preparation_level"
                value={formData.preparation_level}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-[#1F2937] transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
              >
                <option value="">-- প্রস্তুতি ক্ষেত্র নির্বাচন করুন --</option>
                {preparationLevels.map((level) => (
                  <option key={level.id} value={level.slug}>
                    {level.icon} {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
            >
              <FaSave />
              {isPending ? "সেভ হচ্ছে..." : "সেভ করুন"}
            </button>
          </form>
        </div>

        {/* ═══════════ SECTION 4: Security ═══════════ */}
        <div className="mb-8 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#1F2937]">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 border border-amber-300">
              <FaKey className="text-amber-600 text-sm" />
            </span>
            একাউন্ট সিকিউরিটি
          </h2>

          <div className="space-y-3">
            {/* Change Password */}
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="group flex w-full items-center justify-between rounded-lg border border-[#E2E8F0] bg-white p-4 transition hover:bg-[#F8FAFC] hover:border-amber-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 border border-amber-300">
                  <FaKey className="text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[#1F2937]">পাসওয়ার্ড পরিবর্তন</div>
                  <div className="text-xs text-[#64748B]">
                    আপনার একাউন্টের পাসওয়ার্ড আপডেট করুন
                  </div>
                </div>
              </div>
              <span className="text-[#94A3B8] transition group-hover:text-amber-600 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group flex w-full items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 transition hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 border border-red-300">
                  <FaSignOutAlt className="text-red-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-red-700">লগআউট</div>
                  <div className="text-xs text-red-600/80">
                    {isLoggingOut ? "লগআউট হচ্ছে..." : "একাউন্ট থেকে বের হন"}
                  </div>
                </div>
              </div>
              <span className="text-red-500 transition group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* ═══════════ Avatar Upload Modal ═══════════ */}
        <AvatarUploadModal
          isOpen={showAvatarModal}
          onClose={handleCloseAvatarModal}
          userId={user?.id}
          currentAvatarUrl={profileData?.avatar_url || ""}
          onAvatarUpdated={handleAvatarUpdated}
        />

        {/* ═══════════ Password Change Modal ═══════════ */}
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
    <div className="relative overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div
        className="absolute -top-4 -right-4 h-20 w-20 rounded-full opacity-10 blur-xl"
        style={{ backgroundColor: color }}
      />
      <div className="relative">
        <div
          className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border"
          style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
        >
          <Icon style={{ color }} />
        </div>
        <div className="mb-0.5 text-2xl font-bold text-[#1F2937]">{value}</div>
        <div className="text-xs text-[#64748B] font-medium">{label}</div>
      </div>
    </div>
  );
}
