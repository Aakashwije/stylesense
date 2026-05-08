"use client";

import { SSButton } from "@/components/common/SSButton";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We sent a 6-digit code to your email address"
    >
      <div className="space-y-6">
        <div className="flex gap-3 justify-center">
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "w-12 h-14 text-center text-xl font-bold text-[#F5F5F7] rounded-xl",
                "bg-[#1C1C22] border outline-none transition-all duration-200",
                "focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/30",
                digit ? "border-[#8B5CF6]/50" : "border-[#27272A]",
              )}
            />
          ))}
        </div>

        {error && <p className="text-center text-[#EF4444] text-sm">{error}</p>}

        <SSButton fullWidth size="lg" loading={loading} onClick={handleVerify}>
          Verify Code
        </SSButton>

        <p className="text-center text-[#A1A1AA] text-sm">
          Didn't receive a code?{" "}
          <button className="text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors">
            Resend
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
