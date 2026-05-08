"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] flex">
      {/* Left decorative panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#141419] to-[#0B0B0F] border-r border-[#27272A] flex-col items-center justify-center p-12">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#22D3EE] rounded-full blur-[100px]"
        />

        <div className="relative z-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          <h1 className="text-4xl font-bold text-[#F5F5F7] mb-4">
            StyleSense AI
          </h1>
          <p className="text-[#A1A1AA] text-lg leading-relaxed">
            AI-powered beauty platform built for the modern salon experience.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { label: "50K+", desc: "Happy clients" },
              { label: "4.9★", desc: "Average rating" },
              { label: "200+", desc: "Expert stylists" },
              { label: "98%", desc: "Satisfaction rate" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#1C1C22]/60 border border-[#27272A] rounded-2xl p-4 text-center backdrop-blur-sm"
              >
                <p className="text-[#8B5CF6] font-bold text-xl">{stat.label}</p>
                <p className="text-[#A1A1AA] text-xs mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <span className="text-[#F5F5F7] font-semibold text-sm">
              StyleSense AI
            </span>
          </Link>

          <div className="mb-8">
            <h2 className="text-[#F5F5F7] text-2xl font-bold mb-2">{title}</h2>
            <p className="text-[#A1A1AA] text-sm">{subtitle}</p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
