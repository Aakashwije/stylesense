"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { formatCurrency } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    tier: "essential",
    name: "Essential",
    price: 2900,
    description: "Perfect for occasional salon visits",
    features: [
      "5 AI style recommendations/month",
      "Basic booking & scheduling",
      "Loyalty points earning",
      "Service history tracking",
      "Email support",
    ],
    cta: "Get Started",
    href: "/auth/signup?plan=essential",
    highlight: false,
  },
  {
    tier: "premium",
    name: "Premium",
    price: 5900,
    description: "For the true beauty enthusiast",
    features: [
      "Unlimited AI recommendations",
      "Virtual hair try-on",
      "Priority booking",
      "AI skin & hair analysis",
      "Beauty reports & insights",
      "2× loyalty points",
      "Priority support",
    ],
    cta: "Start Premium",
    href: "/auth/signup?plan=premium",
    highlight: true,
  },
  {
    tier: "elite",
    name: "Elite",
    price: 9900,
    description: "The ultimate beauty experience",
    features: [
      "Everything in Premium",
      "Dedicated personal stylist",
      "Monthly complimentary treatment",
      "Early access to new services",
      "Exclusive member events",
      "3× loyalty points",
      "Concierge support",
      "Free cancellation anytime",
    ],
    cta: "Go Elite",
    href: "/auth/signup?plan=elite",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-[#8B5CF6] text-sm font-medium tracking-wider uppercase mb-4">
            Pricing
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F7] tracking-tight mb-5">
            Simple, transparent pricing
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto">
            Choose the plan that fits your beauty journey. Upgrade or cancel
            anytime.
          </p>
        </FadeUp>

        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.1}
        >
          {PLANS.map((plan) => (
            <StaggerItem key={plan.tier}>
              <div
                className={
                  plan.highlight
                    ? "relative bg-gradient-to-b from-[#8B5CF6]/10 to-[#1C1C22] border-2 border-[#8B5CF6]/50 rounded-2xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]"
                    : "relative card-3d bg-[#1C1C22] border border-[#27272A] rounded-2xl p-8 hover:border-[#3f3f46] transition-colors duration-200"
                }
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="purple" className="gap-1 px-3 py-1">
                      <Zap className="w-3 h-3 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-[#F5F5F7] font-semibold text-lg mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-[#A1A1AA] text-sm mb-5">
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-[#F5F5F7]">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-[#A1A1AA] text-sm mb-1.5">
                      /month
                    </span>
                  </div>
                </div>

                <SSButton
                  variant={plan.highlight ? "primary" : "outline"}
                  fullWidth
                  size="lg"
                  className="mb-7"
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </SSButton>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{
                          color: plan.highlight ? "#8B5CF6" : "#10B981",
                        }}
                      />
                      <span className="text-[#A1A1AA] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
