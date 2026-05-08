"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Crown,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const STATS = [
  {
    label: "Total Bookings",
    value: "24",
    change: "+3 this month",
    icon: Calendar,
    color: "#8B5CF6",
  },
  {
    label: "AI Recommendations",
    value: "47",
    change: "5 new today",
    icon: Sparkles,
    color: "#22D3EE",
  },
  {
    label: "Loyalty Points",
    value: "2,340",
    change: "+120 this week",
    icon: Star,
    color: "#F59E0B",
  },
  {
    label: "Membership",
    value: "Premium",
    change: "Active until Dec 2025",
    icon: Crown,
    color: "#E8B4B8",
  },
];

const UPCOMING = [
  {
    id: "1",
    service: "Keratin Treatment",
    stylist: "Aria Johnson",
    date: "Tomorrow",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: "2",
    service: "Balayage Color",
    stylist: "Marcus Chen",
    date: "Dec 28, 2025",
    time: "11:00 AM",
    status: "pending",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <FadeUp className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">
              Good morning! 👋
            </h1>
            <p className="text-[#A1A1AA] text-sm">
              Here's what's happening with your beauty journey
            </p>
          </div>
          <SSButton
            size="md"
            leftIcon={<Calendar className="w-4 h-4" />}
            asChild
          >
            <Link href="/booking">Book Now</Link>
          </SSButton>
        </div>
      </FadeUp>

      {/* Stats */}
      <StaggerContainer
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
        staggerDelay={0.08}
      >
        {STATS.map((stat) => (
          <StaggerItem key={stat.label}>
            <SSCard hover>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}25`,
                  }}
                >
                  <stat.icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                    strokeWidth={1.75}
                  />
                </div>
              </div>
              <p className="text-[#F5F5F7] text-2xl font-bold mb-0.5">
                {stat.value}
              </p>
              <p className="text-[#A1A1AA] text-xs">{stat.label}</p>
              <p className="text-[#52525B] text-xs mt-1">{stat.change}</p>
            </SSCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <FadeUp>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#F5F5F7] font-semibold">
                Upcoming Appointments
              </h2>
              <Link
                href="/dashboard/appointments"
                className="text-[#8B5CF6] text-sm hover:text-[#7C3AED] transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-3">
              {UPCOMING.map((appt) => (
                <SSCard key={appt.id} hover>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <Clock
                        className="w-5 h-5 text-[#8B5CF6]"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F7] text-sm font-medium truncate">
                        {appt.service}
                      </p>
                      <p className="text-[#A1A1AA] text-xs">
                        with {appt.stylist} · {appt.date} at {appt.time}
                      </p>
                    </div>
                    <Badge
                      variant={appt.status === "confirmed" ? "green" : "yellow"}
                      size="sm"
                    >
                      {appt.status}
                    </Badge>
                  </div>
                </SSCard>
              ))}

              {UPCOMING.length === 0 && (
                <SSCard>
                  <p className="text-[#A1A1AA] text-sm text-center py-4">
                    No upcoming appointments
                  </p>
                </SSCard>
              )}
            </div>
          </FadeUp>
        </div>

        {/* Quick Actions */}
        <div>
          <FadeUp>
            <h2 className="text-[#F5F5F7] font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                {
                  label: "AI Hair Analysis",
                  icon: Sparkles,
                  href: "/ai/analysis",
                  color: "#8B5CF6",
                },
                {
                  label: "Virtual Try-On",
                  icon: TrendingUp,
                  href: "/ai/virtual-tryon",
                  color: "#22D3EE",
                },
                {
                  label: "Browse Services",
                  icon: Star,
                  href: "/services",
                  color: "#E8B4B8",
                },
                {
                  label: "My Membership",
                  icon: Crown,
                  href: "/dashboard/membership",
                  color: "#F59E0B",
                },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-3 p-3.5 bg-[#1C1C22] border border-[#27272A] rounded-xl hover:border-[#3f3f46] transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${action.color}15` }}
                    >
                      <action.icon
                        className="w-4 h-4"
                        style={{ color: action.color }}
                        strokeWidth={1.75}
                      />
                    </div>
                    <span className="text-[#A1A1AA] text-sm group-hover:text-[#F5F5F7]">
                      {action.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
