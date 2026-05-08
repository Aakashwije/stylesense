import { AuthLayout } from "@/components/layouts/AuthLayout";
import { LoginForm } from "@/features/authentication/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your StyleSense AI account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
