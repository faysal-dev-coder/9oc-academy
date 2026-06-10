import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login — 9OC Academy",
  description: "9OC Academy তে Login করো",
};

// ⭐ Loading Fallback
function LoginLoading() {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white/60 text-sm">লোড হচ্ছে...</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout title="স্বাগতম! 👋" subtitle="তোমার Account এ Login করো">
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
