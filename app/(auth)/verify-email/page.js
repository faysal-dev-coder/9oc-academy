// app/(auth)/verify-email/page.js
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

export const metadata = {
  title: "ইমেইল ভেরিফিকেশন | 9OC Academy",
  description: "আপনার ইমেইল ভেরিফাই করুন",
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <div className="space-y-6 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/20">
            <FaEnvelope className="text-4xl text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">ইমেইল চেক করুন! 📬</h2>
          <p className="text-sm leading-relaxed text-white/60">
            আপনার রেজিস্ট্রেশন সম্পন্ন হয়েছে।
            <br />
            আপনার ইমেইলে একটি ভেরিফিকেশন লিঙ্ক পাঠানো হয়েছে।
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-5 text-left">
          <p className="text-sm font-medium text-white/70">পরবর্তী পদক্ষেপ:</p>
          {[
            "📧 আপনার ইনবক্স খুলুন",
            '🔗 "Confirm your email" লিঙ্কে ক্লিক করুন',
            "✅ ভেরিফিকেশন হলে লগইন করুন",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/60">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                {["১", "২", "৩"][i]}
              </span>
              {step}
            </div>
          ))}
        </div>

        {/* Spam Note */}
        <p className="text-xs text-white/30">💡 ইমেইল না পেলে Spam/Junk ফোল্ডার চেক করুন</p>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Back Link */}
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <FaArrowLeft className="text-xs" />
          লগইন পেজে যান
        </Link>
      </div>
    </AuthLayout>
  );
}
