"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LogOut,
  Palette,
  Scissors,
  Settings,
  Sparkles,
  Star,
  Target,
  Timer,
  User,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_SECTIONS = [
  {
    label: "My Work",
    items: [
      { href: "/stylist", label: "Overview", icon: Sparkles, exact: true },
      {
        href: "/stylist/bookings",
        label: "My Bookings",
        icon: BookOpen,
        badge: 3,
      },
      { href: "/stylist/schedule", label: "My Schedule", icon: Calendar },
      { href: "/stylist/earnings", label: "My Earnings", icon: Wallet },
      { href: "/stylist/timer", label: "Service Timer", icon: Timer },
    ],
  },
  {
    label: "AI",
    items: [{ href: "/stylist/ai-insights", label: "AI Insights", icon: Zap }],
  },
  {
    label: "Clients",
    items: [
      { href: "/stylist/clients", label: "My Clients", icon: Users },
      {
        href: "/stylist/consultation",
        label: "Consultation Form",
        icon: ClipboardList,
      },
      { href: "/stylist/gallery", label: "Before / After", icon: Camera },
    ],
  },
  {
    label: "My Growth",
    items: [
      { href: "/stylist/goals", label: "Goal Tracker", icon: Target },
      { href: "/stylist/calculator", label: "Commission Calc", icon: Wallet },
    ],
  },
  {
    label: "Inspiration",
    items: [
      { href: "/stylist/trends", label: "Trending Styles", icon: Star },
      { href: "/stylist/colors", label: "Color Guide", icon: Palette },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/stylist/profile", label: "My Profile", icon: User },
      { href: "/stylist/settings", label: "Settings", icon: Settings },
    ],
  },
];

// Mocked connected salon — in production this comes from auth/session
const CONNECTED_SALON = {
  name: "Glamour Studio",
  location: "Colombo 03",
};

export function StylistSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen sticky top-0 bg-[#141419] border-r border-[#27272A] flex flex-col overflow-hidden flex-shrink-0 z-40"
    >
      {/* Logo + collapse */}
      <div className="p-4 border-b border-[#27272A] flex items-center justify-between flex-shrink-0 h-[65px]">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/stylesense_logo.png"
                  alt="StyleSense"
                  width={70}
                  height={20}
                  className="object-contain"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/15 flex items-center justify-center mx-auto">
            <Scissors className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.75} />
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center",
            "text-[#52525B] hover:text-[#A1A1AA] hover:bg-[#1C1C22]",
            "transition-colors flex-shrink-0",
            collapsed && "mx-auto mt-1",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Connected salon badge */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            key="salon-badge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mx-3 mt-3 bg-[#22D3EE]/8 border border-[#22D3EE]/20 rounded-xl px-3 py-2 flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[#22D3EE] text-[10px] font-semibold uppercase tracking-wider">
                Connected Salon
              </p>
              <p className="text-[#F5F5F7] text-xs font-medium truncate">
                {CONNECTED_SALON.name}
              </p>
              <p className="text-[#52525B] text-[10px] truncate">
                {CONNECTED_SALON.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5 scrollbar-thin">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.p
                  key="label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="text-[#52525B] text-[10px] font-semibold uppercase tracking-widest px-3 mb-1.5"
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl text-sm transition-all duration-150 relative",
                        collapsed ? "px-0 py-2 justify-center" : "px-3 py-2",
                        active
                          ? "text-[#F5F5F7]"
                          : "text-[#A1A1AA] hover:bg-[#1C1C22] hover:text-[#F5F5F7]",
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="stylist-sidebar-active"
                          className="absolute inset-0 bg-[#22D3EE]/10 rounded-xl border border-[#22D3EE]/20"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <item.icon
                        className={cn(
                          "w-4 h-4 flex-shrink-0 relative z-10",
                          active ? "text-[#22D3EE]" : "text-current",
                        )}
                        strokeWidth={1.75}
                      />
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            key="label"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.12 }}
                            className="relative z-10 flex-1 whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {"badge" in item && item.badge && !collapsed && (
                        <span className="relative z-10 bg-[#22D3EE] text-[#0B0B0F] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-[#27272A] flex-shrink-0">
        <div
          className={cn(
            "flex items-center rounded-xl p-2 hover:bg-[#1C1C22] transition-colors cursor-pointer",
            collapsed && "justify-center",
          )}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            SR
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                key="user-info"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.12 }}
                className="flex-1 min-w-0 ml-3"
              >
                <p className="text-[#F5F5F7] text-sm font-medium truncate">
                  Shenali Rodrigo
                </p>
                <p className="text-[#22D3EE] text-[10px] truncate">
                  Senior Stylist
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <Link
              href="/"
              className="text-[#52525B] hover:text-[#EF4444] transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
