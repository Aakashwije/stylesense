"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  ArrowRight,
  Award,
  Check,
  CreditCard,
  Gem,
  Gift,
  History,
  Palette,
  Sparkles,
  Star,
  Ticket,
  Trophy,
  Wind,
  Zap,
} from "lucide-react";
import { useState } from "react";

const TIERS = [
  {
    id: "bronze",
    label: "Bronze",
    minPts: 0,
    maxPts: 999,
    color: "#CD7F32",
    Icon: Award,
  },
  {
    id: "silver",
    label: "Silver",
    minPts: 1000,
    maxPts: 2499,
    color: "#A0A0A0",
    Icon: Star,
  },
  {
    id: "gold",
    label: "Gold",
    minPts: 2500,
    maxPts: 4999,
    color: "#F59E0B",
    Icon: Trophy,
  },
  {
    id: "platinum",
    label: "Platinum",
    minPts: 5000,
    maxPts: Infinity,
    color: "#22D3EE",
    Icon: Gem,
  },
];

const REWARDS = [
  {
    id: "rw1",
    title: "10% Off Next Booking",
    points: 500,
    category: "Discount",
    Icon: Ticket,
    color: "#8B5CF6",
  },
  {
    id: "rw2",
    title: "Free Blowout",
    points: 800,
    category: "Service",
    Icon: Wind,
    color: "#22D3EE",
  },
  {
    id: "rw3",
    title: "Hair Mask Treatment",
    points: 650,
    category: "Service",
    Icon: Sparkles,
    color: "#EC4899",
  },
  {
    id: "rw4",
    title: "LKR 500 Gift Voucher",
    points: 1000,
    category: "Voucher",
    Icon: CreditCard,
    color: "#F59E0B",
  },
  {
    id: "rw5",
    title: "Priority Booking Access",
    points: 1500,
    category: "Perk",
    Icon: Zap,
    color: "#22C55E",
  },
  {
    id: "rw6",
    title: "Free Color Touch-Up",
    points: 1200,
    category: "Service",
    Icon: Palette,
    color: "#F97316",
  },
];

const HISTORY = [
  { date: "May 10, 2026", action: "Balayage service", pts: +350, type: "earn" },
  {
    date: "Apr 22, 2026",
    action: "Redeemed 10% Discount",
    pts: -500,
    type: "redeem",
  },
  {
    date: "Apr 22, 2026",
    action: "High Fade service",
    pts: +150,
    type: "earn",
  },
  {
    date: "Apr 5, 2026",
    action: "HydraFacial service",
    pts: +300,
    type: "earn",
  },
  {
    date: "Mar 18, 2026",
    action: "Referral bonus (Kavya)",
    pts: +200,
    type: "bonus",
  },
  { date: "Mar 1, 2026", action: "Birthday bonus", pts: +100, type: "bonus" },
];

const USER_POINTS = 1820;
const USER_TIER =
  TIERS.find((t) => USER_POINTS >= t.minPts && USER_POINTS <= t.maxPts) ??
  TIERS[0];
const NEXT_TIER = TIERS[TIERS.indexOf(USER_TIER) + 1];

export default function LoyaltyPage() {
  const [redeemedIds, setRedeemedIds] = useState<string[]>([]);

  const redeem = (id: string, pts: number) => {
    if (pts > USER_POINTS || redeemedIds.includes(id)) return;
    setRedeemedIds((prev) => [...prev, id]);
  };

  const tierProgress = NEXT_TIER
    ? Math.min(
        100,
        Math.round(
          ((USER_POINTS - USER_TIER.minPts) /
            (NEXT_TIER.minPts - USER_TIER.minPts)) *
            100,
        ),
      )
    : 100;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <FadeUp>
        <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">
          Loyalty & Rewards
        </h1>
        <p className="text-[#A1A1AA] text-sm">
          Earn points on every booking and redeem exclusive rewards
        </p>
      </FadeUp>

      {/* Points Hero */}
      <FadeUp delay={0.07}>
        <SSCard glow>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Points balance */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${USER_TIER.color}20` }}
              >
                <USER_TIER.Icon
                  className="w-8 h-8"
                  style={{ color: USER_TIER.color }}
                />
              </div>
              <div>
                <p className="text-[#71717A] text-xs mb-0.5 uppercase tracking-wider">
                  Total Points
                </p>
                <p className="text-4xl font-black text-[#F5F5F7]">
                  {USER_POINTS.toLocaleString()}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: USER_TIER.color }}
                >
                  {USER_TIER.label} Member
                </p>
              </div>
            </div>

            <div className="hidden md:block w-px h-16 bg-[#38383F]" />

            {/* Tier progress */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-2">
                <span
                  style={{ color: USER_TIER.color }}
                  className="font-semibold"
                >
                  {USER_TIER.label}
                </span>
                {NEXT_TIER ? (
                  <span className="text-[#71717A]">
                    {NEXT_TIER.minPts - USER_POINTS} pts to{" "}
                    <span style={{ color: NEXT_TIER.color }}>
                      {NEXT_TIER.label}
                    </span>
                  </span>
                ) : (
                  <span className="text-[#22D3EE]">Max tier reached!</span>
                )}
              </div>
              <div className="w-full h-3 rounded-full bg-[#1C1C22] border border-[#38383F] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${tierProgress}%`,
                    background: `linear-gradient(90deg, ${USER_TIER.color}, ${NEXT_TIER?.color ?? USER_TIER.color})`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#52525B] mt-1">
                <span>{USER_TIER.minPts}</span>
                {NEXT_TIER && <span>{NEXT_TIER.minPts}</span>}
              </div>
            </div>

            <div className="hidden md:block w-px h-16 bg-[#38383F]" />

            {/* Quick stats */}
            <div className="flex md:flex-col gap-4">
              <div className="text-center">
                <p className="text-[#F5F5F7] font-bold text-lg">LKR 500</p>
                <p className="text-[#52525B] text-[10px] uppercase tracking-wider">
                  Est. value
                </p>
              </div>
              <div className="text-center">
                <p className="text-[#F5F5F7] font-bold text-lg">6</p>
                <p className="text-[#52525B] text-[10px] uppercase tracking-wider">
                  Transactions
                </p>
              </div>
            </div>
          </div>
        </SSCard>
      </FadeUp>

      {/* Tiers overview */}
      <FadeUp delay={0.1}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#F59E0B]" />
            Membership Tiers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIERS.map((tier) => {
              const isActive = tier.id === USER_TIER.id;
              return (
                <div
                  key={tier.id}
                  className={`p-3 rounded-xl border transition-all ${isActive ? "border-2" : "border-[#38383F] bg-[#1C1C22]"}`}
                  style={
                    isActive
                      ? {
                          borderColor: tier.color,
                          background: `${tier.color}12`,
                        }
                      : {}
                  }
                >
                  <div className="mb-1">
                    <tier.Icon
                      className="w-5 h-5"
                      style={{ color: isActive ? tier.color : "#52525B" }}
                    />
                  </div>
                  <p
                    className="text-[#F5F5F7] text-xs font-semibold"
                    style={isActive ? { color: tier.color } : {}}
                  >
                    {tier.label}
                  </p>
                  <p className="text-[#52525B] text-[10px] mt-0.5">
                    {tier.maxPts === Infinity
                      ? `${tier.minPts.toLocaleString()}+`
                      : `${tier.minPts.toLocaleString()}–${tier.maxPts.toLocaleString()}`}{" "}
                    pts
                  </p>
                  {isActive && (
                    <p
                      className="text-[10px] mt-1 font-medium"
                      style={{ color: tier.color }}
                    >
                      Current
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </SSCard>
      </FadeUp>

      {/* Rewards Catalog */}
      <div>
        <FadeUp delay={0.12}>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#EC4899]" />
            Redeem Rewards
          </h2>
        </FadeUp>
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          staggerDelay={0.07}
        >
          {REWARDS.map((reward) => {
            const canAfford = USER_POINTS >= reward.points;
            const redeemed = redeemedIds.includes(reward.id);
            return (
              <StaggerItem key={reward.id}>
                <SSCard
                  hover={canAfford && !redeemed}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${reward.color}20` }}
                    >
                      <reward.Icon
                        className="w-5 h-5"
                        style={{ color: reward.color }}
                      />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#27272A] text-[#71717A]">
                      {reward.category}
                    </span>
                  </div>
                  <h3 className="text-[#F5F5F7] font-semibold text-sm mb-1">
                    {reward.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <Sparkles
                      className="w-3.5 h-3.5"
                      style={{ color: reward.color }}
                    />
                    <span
                      className="font-bold text-sm"
                      style={{ color: reward.color }}
                    >
                      {reward.points.toLocaleString()} pts
                    </span>
                    {!canAfford && (
                      <span className="text-[#52525B] text-[10px]">
                        (need {(reward.points - USER_POINTS).toLocaleString()}{" "}
                        more)
                      </span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => redeem(reward.id, reward.points)}
                      disabled={!canAfford || redeemed}
                      className="w-full h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={
                        redeemed
                          ? { background: "#22C55E20", color: "#22C55E" }
                          : canAfford
                            ? { background: reward.color, color: "#fff" }
                            : {
                                background: "#1C1C22",
                                border: "1px solid #38383F",
                                color: "#52525B",
                              }
                      }
                    >
                      {redeemed ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Redeemed
                        </>
                      ) : canAfford ? (
                        <>
                          <ArrowRight className="w-3.5 h-3.5" />
                          Redeem
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          Not enough points
                        </>
                      )}
                    </button>
                  </div>
                </SSCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Points History */}
      <FadeUp delay={0.14}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
            <History className="w-4 h-4 text-[#22D3EE]" />
            Points History
          </h2>
          <div className="space-y-0 divide-y divide-[#27272A]">
            {HISTORY.map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      entry.type === "earn"
                        ? "bg-[#22C55E]/20"
                        : entry.type === "redeem"
                          ? "bg-[#EF4444]/20"
                          : "bg-[#F59E0B]/20"
                    }`}
                  >
                    {entry.type === "earn" ? (
                      <Star className="w-3.5 h-3.5 text-[#22C55E]" />
                    ) : entry.type === "redeem" ? (
                      <Gift className="w-3.5 h-3.5 text-[#EF4444]" />
                    ) : (
                      <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                    )}
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] text-xs font-medium">
                      {entry.action}
                    </p>
                    <p className="text-[#52525B] text-[10px]">{entry.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold ${
                    entry.pts > 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                  }`}
                >
                  {entry.pts > 0 ? "+" : ""}
                  {entry.pts.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        </SSCard>
      </FadeUp>
    </div>
  );
}
