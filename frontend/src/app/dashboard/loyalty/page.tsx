"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { motion } from "framer-motion";
import {
  Award,
  Check,
  ChevronRight,
  Gift,
  Lock,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const POINT_HISTORY = [
  {
    id: "1",
    description: "Balayage appointment",
    points: +220,
    date: "Apr 28",
  },
  {
    id: "2",
    description: "Referral bonus — Emma T.",
    points: +500,
    date: "Apr 15",
  },
  { id: "3", description: "Precision Haircut", points: +85, date: "Apr 10" },
  {
    id: "4",
    description: "Redeemed — Free Blowout",
    points: -400,
    date: "Mar 30",
  },
  { id: "5", description: "Hydration Facial", points: +110, date: "Mar 22" },
  {
    id: "6",
    description: "Premium membership bonus",
    points: +200,
    date: "Mar 1",
  },
];

const REWARDS = [
  {
    id: "1",
    name: "Free Blowout",
    cost: 400,
    category: "Service",
    available: true,
  },
  {
    id: "2",
    name: "LKR 2,000 Off Any Service",
    cost: 600,
    category: "Discount",
    available: true,
  },
  {
    id: "3",
    name: "Deep Conditioning Treatment",
    cost: 800,
    category: "Service",
    available: false,
  },
  {
    id: "4",
    name: "Free Facial Add-on",
    cost: 1000,
    category: "Upgrade",
    available: false,
  },
  {
    id: "5",
    name: "LKR 5,000 Gift Card",
    cost: 1500,
    category: "Gift",
    available: false,
  },
];

const TIERS = [
  { name: "Bronze", min: 0, max: 999, color: "#CD7F32" },
  { name: "Silver", min: 1000, max: 2499, color: "#C0C0C0" },
  { name: "Gold", min: 2500, max: 4999, color: "#FFD700" },
  { name: "Platinum", min: 5000, max: Infinity, color: "#8B5CF6" },
];

const CURRENT_POINTS = 1215;
const CURRENT_TIER = "Silver";

export default function LoyaltyPage() {
  const nextTier = TIERS.find((t) => t.min > CURRENT_POINTS);
  const progressToNext = nextTier
    ? ((CURRENT_POINTS -
        (TIERS.find((t) => t.name === CURRENT_TIER)?.min ?? 0)) /
        (nextTier.min -
          (TIERS.find((t) => t.name === CURRENT_TIER)?.min ?? 0))) *
      100
    : 100;

  return (
    <div className="p-8 space-y-10">
      {/* Header */}
      <FadeUp>
        <div>
          <Badge variant="cyan" size="sm" className="mb-3">
            <Star className="w-3 h-3 mr-1" />
            Loyalty Program
          </Badge>
          <h1 className="text-2xl font-bold text-[#F5F5F7]">
            Loyalty & Rewards
          </h1>
          <p className="text-[#A1A1AA] mt-1">
            Earn points with every visit and redeem for exclusive rewards.
          </p>
        </div>
      </FadeUp>

      {/* Points card */}
      <FadeUp delay={0.1}>
        <div className="relative overflow-hidden rounded-2xl border border-[#22D3EE]/30 bg-gradient-to-br from-[#22D3EE]/10 via-[#8B5CF6]/5 to-transparent p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#22D3EE]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-[#A1A1AA] mb-1">Your points</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-[#F5F5F7]">
                    {CURRENT_POINTS.toLocaleString()}
                  </span>
                  <span className="text-[#22D3EE] font-medium">pts</span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 flex items-center justify-center mb-1">
                  <Award className="w-6 h-6 text-[#FFD700]" />
                </div>
                <p className="text-xs text-[#A1A1AA]">{CURRENT_TIER} tier</p>
              </div>
            </div>

            {/* Progress to next tier */}
            {nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#A1A1AA]">
                  <span>{CURRENT_TIER}</span>
                  <span>
                    {nextTier.min - CURRENT_POINTS} pts to {nextTier.name}
                  </span>
                </div>
                <div className="h-2 bg-[#27272A] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNext}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeUp>

      {/* Tier levels */}
      <FadeUp>
        <h2 className="text-base font-semibold text-[#F5F5F7] mb-4">
          Tier levels
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {TIERS.map((tier) => {
            const isCurrent = tier.name === CURRENT_TIER;
            return (
              <div
                key={tier.name}
                className={`rounded-xl p-4 border text-center ${
                  isCurrent
                    ? "border-[#22D3EE]/40 bg-[#22D3EE]/5"
                    : "border-[#27272A] bg-[#141419] opacity-60"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: tier.color + "20" }}
                >
                  <Star className="w-4 h-4" style={{ color: tier.color }} />
                </div>
                <p className="text-xs font-medium text-[#F5F5F7]">
                  {tier.name}
                </p>
                <p className="text-[10px] text-[#52525B] mt-0.5">
                  {tier.min === 0 ? "0" : tier.min.toLocaleString()}
                  {tier.max !== Infinity
                    ? `–${tier.max.toLocaleString()}`
                    : "+"}
                </p>
                {isCurrent && (
                  <Badge variant="cyan" size="sm" className="mt-2 text-[9px]">
                    You are here
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </FadeUp>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Rewards */}
        <FadeUp>
          <h2 className="text-base font-semibold text-[#F5F5F7] mb-4 flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#E8B4B8]" />
            Redeem rewards
          </h2>
          <div className="space-y-3">
            {REWARDS.map((reward) => (
              <SSCard
                key={reward.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      reward.available ? "bg-[#10B981]/10" : "bg-[#27272A]"
                    }`}
                  >
                    {reward.available ? (
                      <Check className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <Lock className="w-4 h-4 text-[#52525B]" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#F5F5F7]">
                      {reward.name}
                    </p>
                    <p className="text-xs text-[#52525B]">{reward.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#22D3EE]">
                    {reward.cost.toLocaleString()} pts
                  </span>
                  <SSButton
                    variant={reward.available ? "primary" : "ghost"}
                    size="sm"
                    disabled={!reward.available}
                  >
                    {reward.available ? "Redeem" : "Locked"}
                  </SSButton>
                </div>
              </SSCard>
            ))}
          </div>
        </FadeUp>

        {/* History */}
        <FadeUp delay={0.1}>
          <h2 className="text-base font-semibold text-[#F5F5F7] mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
            Points history
          </h2>
          <SSCard className="divide-y divide-[#27272A] p-0">
            {POINT_HISTORY.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <div>
                  <p className="text-sm text-[#F5F5F7]">{item.description}</p>
                  <p className="text-xs text-[#52525B] mt-0.5">{item.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    item.points > 0 ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}
                >
                  {item.points > 0 ? "+" : ""}
                  {item.points} pts
                </span>
              </div>
            ))}
          </SSCard>
        </FadeUp>
      </div>

      {/* Referral CTA */}
      <FadeUp>
        <div className="relative overflow-hidden rounded-2xl border border-[#8B5CF6]/20 bg-[#141419] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <p className="font-medium text-[#F5F5F7]">
                Refer a friend — earn 500 pts
              </p>
              <p className="text-xs text-[#52525B] mt-0.5">
                Share your unique link and earn when they book.
              </p>
            </div>
          </div>
          <SSButton
            variant="primary"
            size="sm"
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Share link
          </SSButton>
        </div>
      </FadeUp>
    </div>
  );
}
