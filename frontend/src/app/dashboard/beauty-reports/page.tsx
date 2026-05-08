"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSCard } from "@/components/common/SSCard";
import { motion } from "framer-motion";
import {
  Activity,
  Calendar,
  Download,
  Droplets,
  Scissors,
  Sparkles,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react";

const HAIR_METRICS = [
  { label: "Moisture", value: 72, color: "#22D3EE", icon: Droplets },
  { label: "Strength", value: 85, color: "#8B5CF6", icon: Zap },
  { label: "Shine", value: 68, color: "#F59E0B", icon: Sun },
  { label: "Scalp Health", value: 91, color: "#10B981", icon: Activity },
];

const REPORTS = [
  {
    id: "1",
    title: "May 2026 Beauty Report",
    date: "May 1, 2026",
    insights: 6,
    badge: "Latest",
    color: "#8B5CF6",
  },
  {
    id: "2",
    title: "April 2026 Beauty Report",
    date: "Apr 1, 2026",
    insights: 4,
    badge: null,
    color: "#22D3EE",
  },
  {
    id: "3",
    title: "March 2026 Beauty Report",
    date: "Mar 1, 2026",
    insights: 5,
    badge: null,
    color: "#E8B4B8",
  },
];

const RECOMMENDATIONS = [
  {
    id: "1",
    title: "Switch to sulfate-free shampoo",
    description:
      "Your moisture analysis suggests your current routine is stripping natural oils.",
    priority: "high" as const,
    icon: Droplets,
  },
  {
    id: "2",
    title: "Add a weekly deep conditioning mask",
    description:
      "Targeting protein–moisture balance will reduce breakage by an estimated 40%.",
    priority: "medium" as const,
    icon: Sparkles,
  },
  {
    id: "3",
    title: "Trim ends every 8 weeks",
    description:
      "Your strand analysis shows split ends starting at 7cm. Regular trims maintain strength.",
    priority: "low" as const,
    icon: Scissors,
  },
];

const PRIORITY_MAP = {
  high: { label: "High priority", variant: "red" as const },
  medium: { label: "Suggested", variant: "cyan" as const },
  low: { label: "Routine", variant: "muted" as const },
};

export default function BeautyReportsPage() {
  return (
    <div className="p-8 space-y-10">
      {/* Header */}
      <FadeUp>
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="purple" size="sm" className="mb-3">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-powered
            </Badge>
            <h1 className="text-2xl font-bold text-[#F5F5F7]">
              Beauty Reports
            </h1>
            <p className="text-[#A1A1AA] mt-1">
              Personalized insights based on your hair analyses and visit
              history.
            </p>
          </div>
        </div>
      </FadeUp>

      {/* Hair health score */}
      <FadeUp delay={0.1}>
        <div className="relative overflow-hidden rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/10 to-[#22D3EE]/5 p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm text-[#A1A1AA] mb-2">
                Overall Hair Health Score
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-bold text-gradient-purple">
                  79
                </span>
                <span className="text-xl text-[#A1A1AA]">/ 100</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm text-[#10B981]">
                  +6 points since last month
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {HAIR_METRICS.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{ color: m.color }}
                        />
                        {m.label}
                      </div>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: m.color }}
                      >
                        {m.value}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#27272A] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.value}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.3,
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FadeUp>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Recommendations */}
        <div>
          <FadeUp>
            <h2 className="text-base font-semibold text-[#F5F5F7] mb-4">
              AI Recommendations
            </h2>
          </FadeUp>
          <div className="space-y-4">
            {RECOMMENDATIONS.map((rec, i) => {
              const Icon = rec.icon;
              const p = PRIORITY_MAP[rec.priority];
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SSCard className="flex gap-4 p-5">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-[#F5F5F7]">
                          {rec.title}
                        </h3>
                        <Badge variant={p.variant} size="sm">
                          {p.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  </SSCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Reports list */}
        <FadeUp delay={0.2}>
          <h2 className="text-base font-semibold text-[#F5F5F7] mb-4">
            Monthly reports
          </h2>
          <div className="space-y-3">
            {REPORTS.map((report) => (
              <SSCard
                key={report.id}
                className="flex items-center justify-between p-4 hover:border-[#8B5CF6]/40 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: report.color + "18" }}
                  >
                    <Sparkles
                      className="w-4 h-4"
                      style={{ color: report.color }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#F5F5F7]">
                        {report.title}
                      </p>
                      {report.badge && (
                        <Badge variant="purple" size="sm">
                          {report.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#52525B] mt-0.5">
                      {report.insights} insights · {report.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#52525B]">
                  <Download className="w-4 h-4 hover:text-[#A1A1AA] transition-colors" />
                </div>
              </SSCard>
            ))}
          </div>

          {/* Next report */}
          <div className="mt-4 bg-[#141419] rounded-xl border border-[#27272A] p-4 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-[#52525B]" />
            <div>
              <p className="text-xs text-[#A1A1AA]">Next report</p>
              <p className="text-sm font-medium text-[#F5F5F7]">June 1, 2026</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
