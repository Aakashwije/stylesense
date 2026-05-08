"use client";

import { SSButton } from "@/components/common/SSButton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

type SignupFormData = z.infer<typeof signupSchema>;

const inputClass = (hasError?: boolean) =>
  cn(
    "w-full bg-[#1C1C22] border rounded-xl px-4 h-12 text-[#F5F5F7] text-sm",
    "placeholder:text-[#52525B] outline-none",
    "transition-colors duration-200",
    "focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/30",
    hasError ? "border-[#EF4444]" : "border-[#27272A]",
  );

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, signupLoading, signupError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data: SignupFormData) => {
    // confirmPassword matches password (form shows "By signing up you agree" notice)
    signup({ ...data, confirmPassword: data.password, acceptTerms: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {signupError && (
        <div className="flex items-center gap-2.5 p-3.5 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl">
          <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
          <p className="text-xs text-[#EF4444]">
            {(signupError as Error)?.message ??
              "Something went wrong. Please try again."}
          </p>
        </div>
      )}
      {[
        {
          id: "name",
          label: "Full Name",
          type: "text",
          placeholder: "Aakash Wijesekara",
          autoComplete: "name",
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "you@gmail.com",
          autoComplete: "email",
        },
        {
          id: "phone",
          label: "Phone Number",
          type: "tel",
          placeholder: "+94 70 15 66345",
          autoComplete: "tel",
        },
      ].map(({ id, label, type, placeholder, autoComplete }) => (
        <div key={id}>
          <label className="block text-[#A1A1AA] text-sm mb-2">{label}</label>
          <input
            {...register(id as keyof SignupFormData)}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={inputClass(!!(errors as Record<string, unknown>)[id])}
          />
          {(errors as Record<string, { message?: string }>)[id] && (
            <p className="mt-1.5 text-[#EF4444] text-xs">
              {(errors as Record<string, { message?: string }>)[id]?.message}
            </p>
          )}
        </div>
      ))}

      <div>
        <label className="block text-[#A1A1AA] text-sm mb-2">Password</label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            className={inputClass(!!errors.password)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-[#A1A1AA]"
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
        loading={signupLoading}
        rightIcon={!signupLoading && <ArrowRight className="w-4 h-4" />}
        className="mt-2"
      >
        Create Account
      </SSButton>

      <p className="text-center text-[#A1A1AA] text-xs">
        By signing up you agree to our{" "}
        <Link href="/legal/terms" className="text-[#8B5CF6] hover:underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/legal/privacy" className="text-[#8B5CF6] hover:underline">
          Privacy Policy
        </Link>
      </p>

      <p className="text-center text-[#A1A1AA] text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-[#8B5CF6] font-medium hover:text-[#7C3AED]"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
