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
  ArrowRight,
  Check,
  ChevronRight,
  Crown,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const TIERS = [
  {
    id: "essential",
    name: "Essential",
    price: 2900,
    color: "#22D3EE",
    icon: Zap,
    features: [
      "5 AI analyses per month",
      "Basic style recommendations",
      "Appointment booking",
      "Service history",
    ],
    current: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 5900,
    color: "#8B5CF6",
    icon: Star,
    features: [
      "Unlimited AI analyses",
      "Virtual try-on access",
      "Priority booking slots",
      "AI chatbot support",
      "10% service discount",
      "Monthly beauty report",
    ],
    current: true,
    recommended: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 9900,
    color: "#E8B4B8",
    icon: Crown,
    features: [
      "Everything in Premium",
      "Dedicated stylist concierge",
      "15% service discount",
      "First access to new features",
      "Quarterly beauty consultation",
      "Free product samples monthly",
    ],
    current: false,
  },
];

const PERKS = [
  {
    icon: Shield,
    title: "Cancel anytime",
    description: "No lock-in. Cancel or change your plan with one click.",
  },
  {
    icon: Sparkles,
    title: "AI-powered",
    description: "Every tier unlocks progressively more AI features.",
  },
  {
    icon: Star,
    title: "Loyalty points",
    description: "Premium members earn 2× points on every visit.",
  },
];

export default function MembershipPage() {
  return (
    <div className="p-8 space-y-10">
      {/* Header */}
      <FadeUp>
        <div>
          <Badge variant="purple" size="sm" className="mb-3">
            <Crown className="w-3 h-3 mr-1" />
            Membership
          </Badge>
          <h1 className="text-2xl font-bold text-[#F5F5F7]">
            Your plan & billing
          </h1>
          <p className="text-[#A1A1AA] mt-1">
            Manage your StyleSense membership and unlock premium features.
          </p>
        </div>
      </FadeUp>

      {/* Current plan banner */}
      <FadeUp delay={0.1}>
        <div className="relative overflow-hidden rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/10 to-[#22D3EE]/5 p-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#8B5CF6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center">
                <Star className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#F5F5F7]">
                    Premium Plan
                  </h2>
                  <Badge variant="green" size="sm">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-[#A1A1AA]">
                  Next billing: June 1, 2026 · $59/month
                </p>
              </div>
            </div>
            <SSButton variant="outline" size="sm">
              Manage billing
            </SSButton>
          </div>
        </div>
      </FadeUp>

      {/* Plan grid */}
      <div>
        <FadeUp>
          <h2 className="text-lg font-semibold text-[#F5F5F7] mb-6">
            Compare plans
          </h2>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <StaggerItem key={tier.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`relative rounded-2xl border p-6 h-full flex flex-col transition-all ${
                    tier.recommended
                      ? "border-[#8B5CF6]/60 bg-[#8B5CF6]/5"
                      : "border-[#27272A] bg-[#141419]"
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="purple" size="sm">
                        Current plan
                      </Badge>
                    </div>
                  )}
                  <div
                    className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                    style={{ backgroundColor: tier.color + "20" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: tier.color }} />
                  </div>
                  <h3 className="font-semibold text-[#F5F5F7] mb-1">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-3xl font-bold text-[#F5F5F7]">
                      LKR {tier.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#52525B]">/month</span>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-[#A1A1AA]"
                      >
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: tier.color }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tier.current ? (
                    <div className="text-center py-2.5 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] text-sm font-medium">
                      Current plan
                    </div>
                  ) : (
                    <SSButton
                      variant={tier.recommended ? "primary" : "outline"}
                      size="sm"
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {tier.price > 59 ? "Upgrade" : "Downgrade"}
                    </SSButton>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Perks */}
      <FadeUp>
        <h2 className="text-lg font-semibold text-[#F5F5F7] mb-4">
          Membership perks
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <SSCard key={perk.title} className="flex items-start gap-4 p-5">
                <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F5F5F7]">
                    {perk.title}
                  </p>
                  <p className="text-xs text-[#52525B] mt-0.5">
                    {perk.description}
                  </p>
                </div>
              </SSCard>
            );
          })}
        </div>
      </FadeUp>

      {/* Cancel / manage */}
      <FadeUp>
        <div className="border border-[#27272A] rounded-2xl p-6 flex items-center justify-between bg-[#141419]">
          <div>
            <p className="text-sm font-medium text-[#F5F5F7]">
              Cancel subscription
            </p>
            <p className="text-xs text-[#52525B] mt-0.5">
              Your access continues until June 1, 2026.
            </p>
          </div>
          <SSButton variant="ghost" size="sm">
            Cancel plan
            <ChevronRight className="ml-1 w-4 h-4" />
          </SSButton>
        </div>
      </FadeUp>
    </div>
  );
}
