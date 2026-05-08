"use client";

import { cn, getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import {
  BarChart2,
  Bell,
  Calendar,
  Crown,
  Heart,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Scissors,
  Settings,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      {
        href: "/dashboard/appointments",
        label: "Appointments",
        icon: Calendar,
      },
      {
        href: "/dashboard/notifications",
        label: "Notifications",
        icon: Bell,
        badge: 3,
      },
    ],
  },
  {
    label: "AI Features",
    items: [
      { href: "/ai/analysis", label: "AI Analysis", icon: Sparkles },
      { href: "/ai/virtual-tryon", label: "Virtual Try-On", icon: ImageIcon },
      { href: "/ai/chatbot", label: "AI Chatbot", icon: Scissors },
    ],
  },
  {
    label: "My Beauty",
    items: [
      { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
      { href: "/dashboard/saved-styles", label: "Saved Styles", icon: Star },
      {
        href: "/dashboard/beauty-reports",
        label: "Beauty Reports",
        icon: BarChart2,
      },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/membership", label: "Membership", icon: Crown },
      { href: "/dashboard/loyalty", label: "Loyalty", icon: Star },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#141419] border-r border-[#27272A] flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-[#27272A]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <span className="text-[#F5F5F7] font-semibold text-sm">
            StyleSense AI
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="text-[#52525B] text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "group flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150 relative",
                        active
                          ? "bg-[#8B5CF6]/12 text-[#F5F5F7]"
                          : "text-[#A1A1AA] hover:bg-[#1C1C22] hover:text-[#F5F5F7]",
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="sidebar-active"
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
                          "w-4 h-4 flex-shrink-0 relative z-10",
                          active ? "text-[#8B5CF6]" : "text-current",
                        )}
                        strokeWidth={1.75}
                      />
                      <span className="relative z-10 flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="relative z-10 bg-[#8B5CF6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
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

      {/* User */}
      <div className="p-4 border-t border-[#27272A]">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#1C1C22] transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user ? getInitials(user.name) : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#F5F5F7] text-sm font-medium truncate">
              {user?.name ?? "Guest"}
            </p>
            <p className="text-[#A1A1AA] text-xs truncate">
              {user?.email ?? ""}
            </p>
          </div>
          <button
            onClick={logout}
            className="text-[#52525B] hover:text-[#EF4444] transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
