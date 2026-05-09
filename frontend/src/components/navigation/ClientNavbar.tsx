"use client";

import { motion } from "framer-motion";
import { Bell, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/client": "My Home",
  "/client/salons": "Browse Salons",
  "/client/stylists": "Top Stylists",
  "/client/ai": "AI Hair Analysis",
  "/client/ai/virtual-tryon": "Virtual Try-On",
  "/client/bookings": "My Bookings",
  "/client/favorites": "Saved Stylists",
  "/client/reviews": "My Reviews",
  "/client/loyalty": "Loyalty & Rewards",
  "/client/profile": "My Profile",
  "/client/settings": "Settings",
};

export function ClientNavbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Client Portal";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 h-[65px] bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-[#27272A] flex items-center px-6 gap-4"
    >
      <div className="flex-1">
        <h2 className="text-[#F5F5F7] font-semibold text-lg">{title}</h2>
        <p className="text-[#52525B] text-xs">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 w-56 focus-within:border-[#8B5CF6]/50 transition-colors">
        <Search className="w-3.5 h-3.5 text-[#52525B] flex-shrink-0" />
        <input
          type="text"
          placeholder="Search salons, stylists..."
          className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1 min-w-0"
        />
      </div>

      {/* AI CTA */}
      <Link
        href="/client/ai"
        className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-gradient-to-r from-[#8B5CF6]/20 to-[#22D3EE]/20 border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-medium hover:from-[#8B5CF6]/30 hover:to-[#22D3EE]/30 transition-all duration-200"
      >
        <Sparkles className="w-3.5 h-3.5" />
        AI Analysis
      </Link>

      {/* Notifications */}
      <button className="relative w-9 h-9 rounded-xl bg-[#141419] border border-[#27272A] flex items-center justify-center text-[#71717A] hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#8B5CF6] rounded-full" />
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-sm font-bold cursor-pointer">
        C
      </div>
    </motion.header>
  );
}
