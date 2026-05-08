"use client";

import { SSButton } from "@/components/common/SSButton";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you reset instructions"
    >
      {isSubmitSuccessful ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981]/25 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h3 className="text-[#F5F5F7] font-semibold mb-2">
            Check your inbox
          </h3>
          <p className="text-[#A1A1AA] text-sm mb-6">
            We've sent password reset instructions to your email.
          </p>
          <Link
            href="/auth/login"
            className="text-[#8B5CF6] text-sm font-medium hover:text-[#7C3AED]"
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[#A1A1AA] text-sm mb-2">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={cn(
                "w-full bg-[#1C1C22] border rounded-xl px-4 h-12 text-[#F5F5F7] text-sm",
                "placeholder:text-[#52525B] outline-none transition-colors duration-200",
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

          <SSButton type="submit" fullWidth size="lg" loading={isSubmitting}>
            Send Reset Link
          </SSButton>

          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-2 text-[#A1A1AA] text-sm hover:text-[#F5F5F7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
