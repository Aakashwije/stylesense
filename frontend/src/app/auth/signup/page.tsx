import { AuthLayout } from "@/components/layouts/AuthLayout";
import { SignupForm } from "@/features/authentication/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join 50,000+ clients transforming their beauty journey"
    >
      <SignupForm />
    </AuthLayout>
  );
}
