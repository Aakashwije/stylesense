"use client";

import { motion } from "framer-motion";
import { Bell, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/bookings": "Bookings",
  "/dashboard/calendar": "Calendar",
  "/dashboard/stylists": "Stylists",
  "/dashboard/services": "Services",
  "/dashboard/customers": "Customers",
  "/dashboard/earnings": "Earnings",
  "/dashboard/analytics": "AI Analytics",
  "/dashboard/reviews": "Reviews & Rankings",
  "/dashboard/notifications": "Notifications",
  "/dashboard/subscription": "Subscription",
  "/dashboard/settings": "Settings",
};

export function DashboardNavbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 h-[65px] bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-[#27272A] flex items-center px-6 gap-4"
    >
      {/* Title */}
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
          placeholder="Search..."
          className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1 min-w-0"
        />
      </div>

      {/* Notifications */}
      <Link href="/dashboard/notifications">
        <button className="relative w-9 h-9 rounded-xl bg-[#141419] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8B5CF6] rounded-full border border-[#0B0B0F]" />
        </button>
      </Link>

      {/* Profile */}
      <div className="flex items-center gap-2.5 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 cursor-pointer hover:border-[#3f3f46] transition-all">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
          S
        </div>
        <span className="text-[#F5F5F7] text-sm font-medium hidden sm:block">
          Glamour Studio
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-[#52525B]" />
      </div>
    </motion.header>
  );
}
