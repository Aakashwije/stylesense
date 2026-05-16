"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SSButton } from "@/components/common/SSButton";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[#141419]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden border border-[#27272A] p-12 lg:p-20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#22D3EE]/8" />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-[#8B5CF6] rounded-full blur-[80px] opacity-[0.08]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#22D3EE] rounded-full blur-[80px] opacity-[0.06]"
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 mb-6">
                <Sparkles className="w-7 h-7 text-[#8B5CF6]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F7] tracking-tight mb-5">
                Ready for your
                <br />
                <span className="text-gradient-purple">best look ever?</span>
              </h2>
              <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto mb-10">
                Join 50,000+ clients who&apos;ve transformed their beauty routine
                with AI-powered personalization.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SSButton
                  size="xl"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  asChild
                >
                  <Link href="/auth/signup">Start Free Today</Link>
                </SSButton>
                <SSButton size="xl" variant="ghost" asChild>
                  <Link href="/booking">Book a Session</Link>
                </SSButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
