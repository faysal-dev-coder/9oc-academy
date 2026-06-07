// app/(auth)/forgot-password/page.js
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "পাসওয়ার্ড ভুলে গেছেন | 9OC Academy",
  description: "আপনার পাসওয়ার্ড রিসেট করুন",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
