"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Crown,
  Heart,
  LayoutDashboard,
  LogOut,
  Scissors,
  Settings,
  Sparkles,
  Star,
  Store,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_SECTIONS = [
  {
    label: "Explore",
    items: [
      { href: "/client", label: "Home", icon: LayoutDashboard, exact: true },
      { href: "/client/salons", label: "Browse Salons", icon: Store },
      { href: "/client/stylists", label: "Top Stylists", icon: Scissors },
    ],
  },
  {
    label: "AI Studio",
    items: [
      { href: "/client/ai", label: "AI Hair Analysis", icon: Bot },
      {
        href: "/client/ai/virtual-tryon",
        label: "Virtual Try-On",
        icon: Sparkles,
      },
    ],
  },
  {
    label: "My Activity",
    items: [
      {
        href: "/client/bookings",
        label: "My Bookings",
        icon: CalendarCheck,
        badge: 2,
      },
      { href: "/client/favorites", label: "Saved Stylists", icon: Heart },
      { href: "/client/reviews", label: "My Reviews", icon: Star },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/client/loyalty", label: "Loyalty & Rewards", icon: Crown },
      { href: "/client/profile", label: "Profile", icon: User },
      { href: "/client/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function ClientSidebar() {
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
      className="h-screen sticky top-0 bg-[#141419] border-r border-[#27272A] flex flex-col overflow-hidden shrink-0 z-40"
    >
      {/* Logo + collapse toggle */}
      <div className="p-4 border-b border-[#27272A] flex items-center justify-between shrink-0 h-[65px]">
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
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center mx-auto">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" strokeWidth={1.75} />
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center",
            "text-[#52525B] hover:text-[#A1A1AA] hover:bg-[#1C1C22]",
            "transition-colors shrink-0",
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
                const active = isActive(
                  item.href,
                  "exact" in item ? item.exact : undefined,
                );
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
                          layoutId="client-sidebar-active"
                          className="absolute inset-0 bg-[#8B5CF6]/10 rounded-xl border border-[#8B5CF6]/20"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <item.icon
                        className={cn(
                          "w-4 h-4 shrink-0 relative z-10",
                          active ? "text-[#8B5CF6]" : "text-current",
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
                        <span className="relative z-10 bg-[#8B5CF6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
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
      <div className="p-3 border-t border-[#27272A] shrink-0">
        <div
          className={cn(
            "flex items-center rounded-xl p-2 hover:bg-[#1C1C22] transition-colors cursor-pointer",
            collapsed && "justify-center",
          )}
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#EC4899] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold shrink-0">
            AW
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
                  Aakash Wijesekara
                </p>
                <p className="text-[#8B5CF6] text-[10px] truncate">
                  Premium Member
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <Link
              href="/auth/login"
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
