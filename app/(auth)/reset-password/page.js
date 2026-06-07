// app/(auth)/reset-password/page.js
import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "নতুন পাসওয়ার্ড দিন | 9OC Academy",
  description: "আপনার নতুন পাসওয়ার্ড সেট করুন",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
