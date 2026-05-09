"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  Bot,
  CalendarCheck,
  ChevronRight,
  Crown,
  Heart,
  MapPin,
  Scissors,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

const STATS = [
  {
    label: "Upcoming Bookings",
    value: "2",
    sub: "Next: Tomorrow 2PM",
    icon: CalendarCheck,
    color: "#8B5CF6",
    bg: "#8B5CF6",
    href: "/client/bookings",
  },
  {
    label: "Loyalty Points",
    value: "1,250",
    sub: "+120 this week",
    icon: Crown,
    color: "#F59E0B",
    bg: "#F59E0B",
    href: "/client/loyalty",
  },
  {
    label: "Saved Stylists",
    value: "8",
    sub: "3 available today",
    icon: Heart,
    color: "#EC4899",
    bg: "#EC4899",
    href: "/client/favorites",
  },
  {
    label: "AI Suggestions",
    value: "5",
    sub: "New looks ready",
    icon: Sparkles,
    color: "#22D3EE",
    bg: "#22D3EE",
    href: "/client/ai",
  },
];

const UPCOMING_BOOKINGS = [
  {
    id: "1",
    service: "Balayage + Toner",
    stylist: "Shenali Rodrigo",
    salon: "Glamour Studio",
    date: "Tomorrow",
    time: "2:00 PM",
    status: "confirmed",
    statusColor: "#22C55E",
  },
  {
    id: "2",
    service: "Men's Fade Cut",
    stylist: "Kasun Perera",
    salon: "Urban Cuts",
    date: "May 14, 2026",
    time: "10:30 AM",
    status: "pending",
    statusColor: "#F59E0B",
  },
];

const TOP_SALONS = [
  {
    id: "1",
    name: "Glamour Studio",
    location: "Colombo 03",
    rating: 4.9,
    reviews: 312,
    speciality: "Color & Balayage",
    tag: "Top Rated",
    tagColor: "#8B5CF6",
  },
  {
    id: "2",
    name: "Urban Cuts",
    location: "Colombo 07",
    rating: 4.8,
    reviews: 208,
    speciality: "Men's Grooming",
    tag: "Trending",
    tagColor: "#22D3EE",
  },
  {
    id: "3",
    name: "Bloom Beauty",
    location: "Nugegoda",
    rating: 4.7,
    reviews: 175,
    speciality: "Bridal & Spa",
    tag: "Popular",
    tagColor: "#EC4899",
  },
];

const AI_FEATURES = [
  {
    title: "Face Shape Analysis",
    desc: "Upload your photo — AI detects your face shape and recommends the best cuts for you.",
    icon: Bot,
    href: "/client/ai",
    gradient: "from-[#8B5CF6] to-[#7C3AED]",
    badge: "Men & Women",
  },
  {
    title: "Hair Color Simulator",
    desc: "See how different colors look on you — with and without bleach options.",
    icon: Sparkles,
    href: "/client/ai",
    gradient: "from-[#EC4899] to-[#8B5CF6]",
    badge: "Women",
  },
  {
    title: "Hairstyle Look-Alikes",
    desc: "Match celebrity hairstyles to your face and get a list of compatible looks.",
    icon: Zap,
    href: "/client/ai",
    gradient: "from-[#22D3EE] to-[#0EA5E9]",
    badge: "Men",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ClientHome() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Greeting */}
      <FadeUp className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">
            Welcome back!
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            Discover stylists, book appointments, and explore AI hair insights.
          </p>
        </div>
        <Link
          href="/client/salons"
          className="hidden sm:flex items-center gap-2 px-4 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors"
        >
          <Store className="w-4 h-4" />
          Find a Salon
        </Link>
      </FadeUp>

      {/* Stats */}
      <StaggerContainer
        className="grid grid-cols-2 xl:grid-cols-4 gap-4"
        staggerDelay={0.08}
      >
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.label}>
              <Link href={s.href}>
                <SSCard hover glow className="h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `${s.bg}18`,
                      border: `1px solid ${s.bg}28`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: s.color }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-2xl font-bold text-[#F5F5F7] mb-0.5">
                    {s.value}
                  </p>
                  <p className="text-xs text-[#A1A1AA] font-medium mb-1">
                    {s.label}
                  </p>
                  <p className="text-[10px] text-[#52525B]">{s.sub}</p>
                </SSCard>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Upcoming Bookings */}
      <FadeUp delay={0.1}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#F5F5F7] font-semibold text-base">
            Upcoming Bookings
          </h2>
          <Link
            href="/client/bookings"
            className="flex items-center gap-1 text-[#8B5CF6] text-xs hover:text-[#7C3AED] transition-colors"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {UPCOMING_BOOKINGS.map((b) => (
            <SSCard key={b.id} hover padding="sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                  <Scissors
                    className="w-4 h-4 text-[#8B5CF6]"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F7] text-sm font-semibold truncate">
                    {b.service}
                  </p>
                  <p className="text-[#71717A] text-xs">
                    {b.stylist} · {b.salon}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#F5F5F7] text-sm font-medium">{b.date}</p>
                  <p className="text-[#71717A] text-xs">{b.time}</p>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize shrink-0"
                  style={{
                    color: b.statusColor,
                    background: `${b.statusColor}20`,
                  }}
                >
                  {b.status}
                </span>
              </div>
            </SSCard>
          ))}
        </div>
      </FadeUp>

      {/* AI Features */}
      <FadeUp delay={0.18}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#F5F5F7] font-semibold text-base">
            AI Hair Studio
          </h2>
          <Link
            href="/client/ai"
            className="flex items-center gap-1 text-[#8B5CF6] text-xs hover:text-[#7C3AED] transition-colors"
          >
            Explore <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          staggerDelay={0.06}
        >
          {AI_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <Link href={f.href}>
                  <SSCard hover className="h-full overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${f.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`}
                    />
                    <div
                      className={`w-10 h-10 rounded-xl bg-linear-to-br ${f.gradient} flex items-center justify-center mb-3`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#27272A] text-[#A1A1AA] text-[10px] font-medium mb-2">
                      {f.badge}
                    </span>
                    <h3 className="text-[#F5F5F7] text-sm font-semibold mb-1">
                      {f.title}
                    </h3>
                    <p className="text-[#71717A] text-xs leading-relaxed">
                      {f.desc}
                    </p>
                  </SSCard>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </FadeUp>

      {/* Top Salons Quick View */}
      <FadeUp delay={0.24}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#F5F5F7] font-semibold text-base">
            Top Salons Near You
          </h2>
          <Link
            href="/client/salons"
            className="flex items-center gap-1 text-[#8B5CF6] text-xs hover:text-[#7C3AED] transition-colors"
          >
            See all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          staggerDelay={0.06}
        >
          {TOP_SALONS.map((salon) => (
            <StaggerItem key={salon.id}>
              <Link href="/client/salons">
                <SSCard hover className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                      <Store
                        className="w-5 h-5 text-[#8B5CF6]"
                        strokeWidth={1.75}
                      />
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{
                        color: salon.tagColor,
                        background: `${salon.tagColor}20`,
                      }}
                    >
                      {salon.tag}
                    </span>
                  </div>
                  <h3 className="text-[#F5F5F7] text-sm font-semibold mb-1">
                    {salon.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[#71717A] text-xs mb-2">
                    <MapPin className="w-3 h-3" />
                    {salon.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                      <span className="text-[#F5F5F7] text-xs font-medium">
                        {salon.rating}
                      </span>
                      <span className="text-[#52525B] text-xs">
                        ({salon.reviews})
                      </span>
                    </div>
                    <span className="text-[#71717A] text-xs">
                      {salon.speciality}
                    </span>
                  </div>
                </SSCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeUp>

      {/* Quick Actions */}
      <FadeUp delay={0.3}>
        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          staggerDelay={0.05}
        >
          {[
            {
              label: "Browse Salons",
              icon: Store,
              href: "/client/salons",
              color: "#8B5CF6",
            },
            {
              label: "Top Stylists",
              icon: Scissors,
              href: "/client/stylists",
              color: "#22D3EE",
            },
            {
              label: "AI Analysis",
              icon: Bot,
              href: "/client/ai",
              color: "#EC4899",
            },
            {
              label: "My Progress",
              icon: TrendingUp,
              href: "/client/loyalty",
              color: "#F59E0B",
            },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <StaggerItem key={a.label}>
                <Link href={a.href}>
                  <SSCard
                    hover
                    className="flex flex-col items-center gap-2 text-center h-full"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${a.color}18`,
                        border: `1px solid ${a.color}28`,
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: a.color }}
                        strokeWidth={1.75}
                      />
                    </div>
                    <span className="text-[#A1A1AA] text-xs font-medium">
                      {a.label}
                    </span>
                  </SSCard>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </FadeUp>
    </div>
  );
}
