"use client";

import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Translations } from "@/lib/i18n/translations";
import { motion } from "framer-motion";
import { Bell, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getTitle(pathname: string, t: Translations) {
  const n = t.navbar;
  const map: Record<string, string> = {
    "/stylist": n.overview,
    "/stylist/bookings": n.bookings,
    "/stylist/schedule": n.schedule,
    "/stylist/earnings": n.earnings,
    "/stylist/timer": n.timer,
    "/stylist/ai-insights": n.aiInsights,
    "/stylist/clients": n.clients,
    "/stylist/consultation": n.consultation,
    "/stylist/gallery": n.gallery,
    "/stylist/goals": n.goals,
    "/stylist/calculator": n.calculator,
    "/stylist/trends": n.trends,
    "/stylist/colors": n.colors,
    "/stylist/profile": n.profile,
    "/stylist/settings": n.settings,
  };
  return map[pathname] ?? n.portal;
}

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  si: "si-LK",
  ta: "ta-LK",
};

export function StylistNavbar() {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const title = getTitle(pathname, t);

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
          {new Date().toLocaleDateString(DATE_LOCALE[lang] ?? "en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 w-56 focus-within:border-[#22D3EE]/50 transition-colors">
        <Search className="w-3.5 h-3.5 text-[#52525B] shrink-0" />
        <input
          type="text"
          placeholder={t.common.searchClients}
          className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1 min-w-0"
        />
      </div>

      {/* Language switcher */}
      <LanguageSwitcher />

      {/* Notifications */}
      <Link href="/stylist/bookings">
        <button className="relative w-9 h-9 rounded-xl bg-[#141419] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#22D3EE] rounded-full border border-[#0B0B0F]" />
        </button>
      </Link>

      {/* Profile */}
      <div className="flex items-center gap-2.5 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 cursor-pointer hover:border-[#3f3f46] transition-all">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          SR
        </div>
        <span className="text-[#F5F5F7] text-sm font-medium hidden sm:block">
          Shenali Rodrigo
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-[#52525B]" />
      </div>
    </motion.header>
  );
}
