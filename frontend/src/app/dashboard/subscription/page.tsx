"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  CreditCard,
  Crown,
  Download,
  Scissors,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";

const INVOICES = [
  { id: "INV-2025-007", date: "May 1, 2025", amount: 1500, status: "Paid" },
  { id: "INV-2025-006", date: "Apr 1, 2025", amount: 1500, status: "Paid" },
  { id: "INV-2025-005", date: "Mar 1, 2025", amount: 1800, status: "Paid" },
  { id: "INV-2025-004", date: "Feb 1, 2025", amount: 1500, status: "Paid" },
  { id: "INV-2025-003", date: "Jan 1, 2025", amount: 1500, status: "Paid" },
];

const FEATURES = {
  base: [
    "Up to 3 stylists",
    "Booking management",
    "Customer CRM",
    "Basic earnings reports",
    "Email notifications",
    "Mobile-friendly dashboard",
  ],
  pro: [
    "Up to 10 stylists",
    "Everything in Base",
    "AI Analytics & Insights",
    "Advanced revenue reports",
    "SMS notifications",
    "Priority support",
    "Custom branding",
    "API access",
  ],
};

export default function SubscriptionPage() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const stylistCount = 3;
  const baseStylists = 3;
  const extraStylists = Math.max(0, stylistCount - baseStylists);
  const monthlyTotal = 1500 + extraStylists * 300;
  const trialDaysLeft = 0;
  const currentPlan = "Base";
  const renewalDate = "Jun 1, 2025";

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Current plan card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-gradient-to-br from-[#8B5CF6]/10 via-[#141419] to-[#141419] border border-[#8B5CF6]/20 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#8B5CF6]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex items-start justify-between mb-5 relative">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-[#8B5CF6]" />
                <span className="text-[#8B5CF6] text-sm font-semibold">
                  Active Subscription
                </span>
              </div>
              <p className="text-[#F5F5F7] text-2xl font-bold">
                {currentPlan} Plan
              </p>
              <p className="text-[#A1A1AA] text-sm mt-1">
                LKR {monthlyTotal.toLocaleString()}/month · Renews {renewalDate}
              </p>
            </div>
            <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl px-3 py-1.5">
              <span className="text-[#10B981] text-xs font-semibold">
                Active
              </span>
            </div>
          </div>

          {/* Stylist usage */}
          <div className="bg-[#1C1C22] rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#52525B]" />
                <span className="text-[#A1A1AA] text-sm">Stylist Usage</span>
              </div>
              <span className="text-[#F5F5F7] font-semibold text-sm">
                {stylistCount} / 3 base slots
              </span>
            </div>
            <div className="w-full bg-[#27272A] rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full bg-[#8B5CF6]"
                style={{ width: `${(stylistCount / 3) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#52525B]">
                Base plan: 3 stylists included
              </span>
              <span className="text-[#A1A1AA]">
                +LKR 300 per extra stylist/month
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#A1A1AA]">Base plan (3 stylists)</span>
              <span className="text-[#F5F5F7] font-medium">LKR 1,500</span>
            </div>
            {extraStylists > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#A1A1AA]">
                  +{extraStylists} extra stylist(s) × LKR 300
                </span>
                <span className="text-[#F5F5F7] font-medium">
                  LKR {(extraStylists * 300).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold border-t border-[#27272A] pt-2 mt-2">
              <span className="text-[#F5F5F7]">Monthly Total</span>
              <span className="text-[#8B5CF6]">
                LKR {monthlyTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setShowUpgrade(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors"
            >
              <Zap className="w-4 h-4" />
              Upgrade to Pro
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-sm hover:text-[#F5F5F7] transition-colors">
              Manage Payment
            </button>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {[
            {
              label: "Next Renewal",
              value: renewalDate,
              icon: CreditCard,
              color: "#22D3EE",
            },
            {
              label: "Amount Due",
              value: `LKR ${monthlyTotal.toLocaleString()}`,
              icon: Crown,
              color: "#8B5CF6",
            },
            {
              label: "Member Since",
              value: "May 1, 2024",
              icon: Shield,
              color: "#10B981",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#141419] border border-[#27272A] rounded-2xl p-4 flex items-center gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}15` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-[#52525B] text-xs">{s.label}</p>
                <p className="text-[#F5F5F7] font-semibold">{s.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Plan comparison */}
      <div>
        <p className="text-[#F5F5F7] font-semibold mb-5">Plan Comparison</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Base */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141419] border-2 border-[#8B5CF6]/40 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-[#F5F5F7] font-bold text-lg">Base Plan</p>
              <span className="text-[10px] bg-[#8B5CF6]/15 text-[#8B5CF6] px-2 py-0.5 rounded-full font-semibold border border-[#8B5CF6]/30">
                CURRENT
              </span>
            </div>
            <p className="text-[#8B5CF6] text-3xl font-bold mb-0.5">
              LKR 1,500
              <span className="text-base text-[#52525B] font-normal">/mo</span>
            </p>
            <p className="text-[#52525B] text-xs mb-5">
              +LKR 300 per extra stylist beyond 3
            </p>
            <div className="space-y-2.5">
              {FEATURES.base.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#10B981]/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#10B981]" />
                  </div>
                  <span className="text-[#A1A1AA] text-sm">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 p-3 bg-[#1C1C22] rounded-xl">
              <p className="text-[#52525B] text-xs text-center">
                1 month free trial included for new salons
              </p>
            </div>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-gradient-to-br from-[#141419] to-[#1C1C22] border border-[#27272A] rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#22D3EE]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex items-center justify-between mb-1">
              <p className="text-[#F5F5F7] font-bold text-lg">Pro Plan</p>
              <span className="text-[10px] bg-[#22D3EE]/10 text-[#22D3EE] px-2 py-0.5 rounded-full font-semibold border border-[#22D3EE]/20">
                RECOMMENDED
              </span>
            </div>
            <p className="text-[#22D3EE] text-3xl font-bold mb-0.5">
              LKR 3,500
              <span className="text-base text-[#52525B] font-normal">/mo</span>
            </p>
            <p className="text-[#52525B] text-xs mb-5">
              +LKR 300 per extra stylist beyond 10
            </p>
            <div className="space-y-2.5">
              {FEATURES.pro.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#22D3EE]/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#22D3EE]" />
                  </div>
                  <span className="text-[#A1A1AA] text-sm">{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowUpgrade(true)}
              className="w-full mt-5 py-3 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-sm font-medium hover:bg-[#22D3EE]/20 transition-colors flex items-center justify-center gap-2"
            >
              Upgrade Now <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Billing history */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden"
      >
        <div className="p-5 border-b border-[#27272A]">
          <p className="text-[#F5F5F7] font-semibold">Billing History</p>
        </div>
        <div className="divide-y divide-[#27272A]/50">
          {INVOICES.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#1C1C22] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-4 h-4 text-[#10B981]" />
              </div>
              <div className="flex-1">
                <p className="text-[#F5F5F7] text-sm font-medium">{inv.id}</p>
                <p className="text-[#52525B] text-xs">{inv.date}</p>
              </div>
              <span className="text-[#F5F5F7] text-sm font-semibold">
                LKR {inv.amount.toLocaleString()}
              </span>
              <span className="text-[#10B981] text-xs bg-[#10B981]/10 px-2 py-0.5 rounded-lg">
                {inv.status}
              </span>
              <button className="w-7 h-7 rounded-lg bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] flex items-center justify-center hover:text-[#F5F5F7] transition-colors">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Upgrade modal */}
      <AnimatePresence>
        {showUpgrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpgrade(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md p-6"
            >
              <p className="text-[#F5F5F7] font-semibold text-lg mb-2">
                Upgrade to Pro
              </p>
              <p className="text-[#52525B] text-sm mb-5">
                You'll be billed LKR 3,500/month starting June 1, 2025.
              </p>
              <div className="bg-[#1C1C22] rounded-xl p-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A1A1AA]">
                    Pro plan (up to 10 stylists)
                  </span>
                  <span className="text-[#F5F5F7] font-semibold">LKR 3,500</span>
                </div>
                <div className="flex justify-between text-sm border-t border-[#27272A] pt-2">
                  <span className="text-[#F5F5F7] font-semibold">
                    Total per month
                  </span>
                  <span className="text-[#22D3EE] font-bold">LKR 3,500</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-[#22D3EE] text-[#0B0B0F] font-semibold text-sm hover:opacity-90 transition-opacity">
                  Confirm Upgrade
                </button>
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="flex-1 py-3 rounded-xl bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-sm hover:text-[#F5F5F7]"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
