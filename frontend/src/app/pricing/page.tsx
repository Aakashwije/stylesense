"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Crown,
  HelpCircle,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const TIERS = [
  {
    id: "essential",
    name: "Essential",
    price: 29,
    yearly: 23,
    description: "Perfect for casual beauty enthusiasts exploring AI tools.",
    color: "#22D3EE",
    icon: Zap,
    features: [
      "5 AI hair analyses/month",
      "Basic style recommendations",
      "Appointment booking",
      "Service & stylist browsing",
      "Loyalty points earning",
    ],
    cta: "Start Essential",
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 59,
    yearly: 47,
    description:
      "The complete beauty intelligence platform for committed clients.",
    color: "#8B5CF6",
    icon: Star,
    features: [
      "Unlimited AI analyses",
      "Virtual try-on (unlimited)",
      "Priority booking slots",
      "AI chatbot support 24/7",
      "10% off all services",
      "Monthly beauty report",
      "2× loyalty points",
    ],
    cta: "Start Premium",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "elite",
    name: "Elite",
    price: 99,
    yearly: 79,
    description: "White-glove experience with a dedicated concierge stylist.",
    color: "#E8B4B8",
    icon: Crown,
    features: [
      "Everything in Premium",
      "Dedicated concierge stylist",
      "15% off all services",
      "First access to new features",
      "Quarterly private consultation",
      "Monthly product samples",
      "3× loyalty points",
    ],
    cta: "Start Elite",
    highlighted: false,
  },
];

const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your dashboard with one click. You retain access until the end of your billing period with no cancellation fees.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your analyses, reports, and history are always preserved regardless of plan. You'll simply lose access to premium-tier features.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — every plan includes a 7-day free trial with full access. No credit card required to start.",
  },
  {
    q: "How does the 10% service discount work?",
    a: "Discounts apply automatically at checkout for all in-app bookings. No coupon codes needed.",
  },
  {
    q: "Can I switch plans mid-month?",
    a: "Absolutely. Upgrades take effect immediately and you're prorated. Downgrades take effect at the next renewal.",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-[#0B0B0F] pt-32 pb-16 px-6 text-center">
        <FadeUp>
          <Badge variant="purple" size="sm" className="mb-5 inline-flex">
            <Sparkles className="w-3 h-3 mr-1" />
            Simple pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
            Invest in your{" "}
            <span className="text-gradient-purple">beauty journey</span>
          </h1>
          <p className="text-[#A1A1AA] max-w-xl mx-auto mb-10">
            Transparent plans with no hidden fees. Upgrade, downgrade, or cancel
            at any time.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 bg-[#141419] border border-[#27272A] rounded-xl p-1">
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  billing === b
                    ? "bg-[#8B5CF6] text-white"
                    : "text-[#A1A1AA] hover:text-[#F5F5F7]"
                }`}
              >
                {b}
                {b === "yearly" && (
                  <span className="ml-2 text-[10px] bg-[#10B981]/20 text-[#10B981] px-1.5 py-0.5 rounded-full">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Tiers */}
      <section className="bg-[#0B0B0F] py-8 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              const price = billing === "yearly" ? tier.yearly : tier.price;
              return (
                <StaggerItem key={tier.id}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className={`relative rounded-2xl border p-7 h-full flex flex-col ${
                      tier.highlighted
                        ? "border-[#8B5CF6]/60 bg-gradient-to-b from-[#8B5CF6]/8 to-transparent"
                        : "border-[#27272A] bg-[#141419]"
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="absolute inset-0 rounded-2xl bg-[#8B5CF6]/5 pointer-events-none" />
                    )}
                    {tier.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <Badge variant="purple" size="sm">
                          <Star className="w-2.5 h-2.5 mr-1" />
                          {tier.badge}
                        </Badge>
                      </div>
                    )}

                    {/* Icon + name */}
                    <div
                      className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center"
                      style={{ backgroundColor: tier.color + "20" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: tier.color }} />
                    </div>
                    <h2 className="text-xl font-bold text-[#F5F5F7] mb-1">
                      {tier.name}
                    </h2>
                    <p className="text-sm text-[#52525B] mb-5">
                      {tier.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-[#F5F5F7]">
                          ${price}
                        </span>
                        <span className="text-sm text-[#52525B]">/month</span>
                      </div>
                      {billing === "yearly" && (
                        <p className="text-xs text-[#52525B] mt-0.5">
                          Billed annually · Save $
                          {(tier.price - tier.yearly) * 12}/yr
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 flex-1 mb-7">
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

                    <SSButton
                      asChild
                      variant={tier.highlighted ? "primary" : "outline"}
                      size="lg"
                      className="w-full"
                    >
                      <Link href="/auth/signup">
                        {tier.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </SSButton>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Free trial note */}
          <FadeUp delay={0.4} className="text-center mt-8">
            <p className="text-sm text-[#52525B]">
              All plans include a{" "}
              <span className="text-[#10B981]">7-day free trial</span>. No
              credit card required.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#141419] border-t border-[#27272A] py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <FadeUp className="text-center mb-12">
            <Badge variant="muted" size="sm" className="mb-4">
              <HelpCircle className="w-3 h-3 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold text-[#F5F5F7]">
              Common questions
            </h2>
          </FadeUp>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 bg-[#1C1C22] border border-[#27272A] rounded-xl text-left hover:border-[#8B5CF6]/30 transition-all"
                >
                  <span className="text-sm font-medium text-[#F5F5F7]">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#52525B] shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-4 -mt-1 bg-[#1C1C22] border border-t-0 border-[#27272A] rounded-b-xl"
                  >
                    <p className="text-sm text-[#A1A1AA] leading-relaxed pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
