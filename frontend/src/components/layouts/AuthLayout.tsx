"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/stylesense_logo.png"
              alt="StyleSense"
              width={180}
              height={54}
              className="object-contain"
              priority
            />
          </div>
          <p className="text-[#A1A1AA] text-lg leading-relaxed">
            AI-powered beauty platform built for the modern salon experience.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { label: "AI-Powered", desc: "Style recommendations" },
              { label: "Virtual", desc: "Try-on technology" },
              { label: "Smart", desc: "Instant booking" },
              { label: "Built for", desc: "Sri Lanka" },
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
          <Link href="/" className="flex items-center mb-8 lg:hidden">
            <Image
              src="/stylesense_logo.png"
              alt="StyleSense"
              width={120}
              height={36}
              className="object-contain"
            />
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
