import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login — 9OC Academy",
  description: "9OC Academy তে Login করো",
};

export default function LoginPage() {
  return (
    <AuthLayout title="স্বাগতম! 👋" subtitle="তোমার Account এ Login করো">
      <LoginForm />
    </AuthLayout>
  );
}
