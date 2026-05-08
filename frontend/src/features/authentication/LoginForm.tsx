"use client";

import { SSButton } from "@/components/common/SSButton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Eye, EyeOff, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginLoading, loginError } = useAuth();
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const handleDevLogin = () => {
    setUser({
      id: "dev-001",
      name: "Alex Rivera",
      email: "dev@stylesense.ai",
      phone: "+1 (555) 000-0000",
      role: "user",
      avatar: undefined,
      loyaltyPoints: 1250,
      membershipTier: "premium",
      createdAt: new Date().toISOString(),
    });
    setToken("dev-token-local");
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {loginError && (
        <div className="flex items-center gap-2.5 p-3.5 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl">
          <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
          <p className="text-xs text-[#EF4444]">
            {(loginError as Error)?.message ?? "Invalid email or password."}
          </p>
        </div>
      )}
      <div>
        <label className="block text-[#A1A1AA] text-sm mb-2">Email</label>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={cn(
            "w-full bg-[#1C1C22] border rounded-xl px-4 h-12 text-[#F5F5F7] text-sm",
            "placeholder:text-[#52525B] outline-none",
            "transition-colors duration-200",
            "focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/30",
            errors.email ? "border-[#EF4444]" : "border-[#27272A]",
          )}
        />
        {errors.email && (
          <p className="mt-1.5 text-[#EF4444] text-xs">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[#A1A1AA] text-sm">Password</label>
          <Link
            href="/auth/forgot-password"
            className="text-[#8B5CF6] text-xs hover:text-[#7C3AED] transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className={cn(
              "w-full bg-[#1C1C22] border rounded-xl px-4 pr-12 h-12 text-[#F5F5F7] text-sm",
              "placeholder:text-[#52525B] outline-none",
              "transition-colors duration-200",
              "focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/30",
              errors.password ? "border-[#EF4444]" : "border-[#27272A]",
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-[#A1A1AA] transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-[#EF4444] text-xs">
            {errors.password.message}
          </p>
        )}
      </div>

      <SSButton
        type="submit"
        fullWidth
        size="lg"
        loading={loginLoading}
        rightIcon={!loginLoading && <ArrowRight className="w-4 h-4" />}
      >
        Sign In
      </SSButton>

      {/* DEV ONLY — bypass auth for local preview */}
      <button
        type="button"
        onClick={handleDevLogin}
        className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-dashed border-[#8B5CF6]/40 text-[#8B5CF6] text-xs font-medium hover:bg-[#8B5CF6]/10 transition-all duration-200"
      >
        <Zap className="w-3.5 h-3.5" />
        Dev Login — skip API
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#27272A]" />
        <span className="text-[#52525B] text-xs">or continue with</span>
        <div className="flex-1 h-px bg-[#27272A]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {["Google", "Apple"].map((provider) => (
          <button
            key={provider}
            type="button"
            className="h-11 bg-[#1C1C22] border border-[#27272A] rounded-xl text-[#A1A1AA] text-sm font-medium hover:border-[#3f3f46] hover:text-[#F5F5F7] transition-all duration-200"
          >
            {provider}
          </button>
        ))}
      </div>

      <p className="text-center text-[#A1A1AA] text-sm">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors"
        >
          Sign up free
        </Link>
      </p>
    </form>
  );
}
