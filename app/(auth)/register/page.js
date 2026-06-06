import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register — 9OC Academy",
  description: "9OC Academy তে নতুন Account তৈরি করো",
};

export default function RegisterPage() {
  return (
    <AuthLayout title="যোগ দাও! 🚀" subtitle="বিনামূল্যে Account তৈরি করো এবং পড়াশোনা শুরু করো">
      <RegisterForm />
    </AuthLayout>
  );
}
