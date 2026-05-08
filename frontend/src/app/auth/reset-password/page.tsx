"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SSButton } from "@/components/common/SSButton";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const password = watch("password", "");

  const strength = (() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "",
    "bg-[#EF4444]",
    "bg-[#F59E0B]",
    "bg-[#22D3EE]",
    "bg-[#10B981]",
  ][strength];

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Reset password:", data);
    setSubmitted(true);
  };

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Choose a strong password to secure your StyleSense account."
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#F5F5F7] mb-2">
                Password updated!
              </h3>
              <p className="text-[#A1A1AA] text-sm">
                Your password has been reset successfully. You can now sign in
                with your new credentials.
              </p>
            </div>
            <SSButton asChild variant="primary" size="lg" className="w-full">
              <Link href="/auth/login">
                Sign in now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </SSButton>
          </motion.div>
        ) : (
          <motion.div key="form">
            <FadeUp>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* New password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A1A1AA]">
                    New password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl pl-10 pr-10 py-3 text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/30 transition-all"
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
                  {/* Strength meter */}
                  {password.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1.5"
                    >
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength ? strengthColor : "bg-[#27272A]"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[#A1A1AA]">
                        Strength:{" "}
                        <span
                          className={
                            strength >= 3
                              ? "text-[#10B981]"
                              : strength >= 2
                                ? "text-[#22D3EE]"
                                : "text-[#EF4444]"
                          }
                        >
                          {strengthLabel}
                        </span>
                      </p>
                    </motion.div>
                  )}
                  {errors.password && (
                    <p className="text-xs text-[#EF4444]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A1A1AA]">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
                    <input
                      {...register("confirmPassword")}
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your password"
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl pl-10 pr-10 py-3 text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-[#A1A1AA] transition-colors"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-[#EF4444]">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <SSButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-2"
                  loading={isSubmitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Reset password
                </SSButton>

                <p className="text-center text-sm text-[#52525B]">
                  Remember your password?{" "}
                  <Link
                    href="/auth/login"
                    className="text-[#8B5CF6] hover:text-[#A78BFA] transition-colors font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </FadeUp>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
