"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MONTHS = [
  "January 2025",
  "February 2025",
  "March 2025",
  "April 2025",
  "May 2025",
  "June 2025",
  "July 2025",
  "August 2025",
  "September 2025",
  "October 2025",
  "November 2025",
  "December 2025",
  "January 2026",
];

const MONTHLY_DATA: Record<
  string,
  {
    gross: number;
    commission: number;
    tips: number;
    sessions: number;
    avgPerSession: number;
    byService: { name: string; amount: number; sessions: number }[];
    payouts: {
      date: string;
      amount: number;
      method: string;
      status: "paid" | "pending";
    }[];
  }
> = {
  "January 2026": {
    gross: 184200,
    commission: 55260,
    tips: 12400,
    sessions: 89,
    avgPerSession: 2069,
    byService: [
      { name: "Balayage", amount: 68400, sessions: 18 },
      { name: "Keratin Treatment", amount: 42000, sessions: 14 },
      { name: "Colour Correction", amount: 36000, sessions: 9 },
      { name: "Curtain Bangs + Cut", amount: 21600, sessions: 24 },
      { name: "Highlights", amount: 16200, sessions: 24 },
    ],
    payouts: [
      {
        date: "31 Jan 2026",
        amount: 128940,
        method: "Bank Transfer",
        status: "paid",
      },
      {
        date: "15 Jan 2026",
        amount: 57660,
        method: "Bank Transfer",
        status: "paid",
      },
    ],
  },
  "December 2025": {
    gross: 196500,
    commission: 58950,
    tips: 18600,
    sessions: 96,
    avgPerSession: 2047,
    byService: [
      { name: "Balayage", amount: 72000, sessions: 19 },
      { name: "Bridal Styling", amount: 54000, sessions: 9 },
      { name: "Keratin Treatment", amount: 36000, sessions: 12 },
      { name: "Curtain Bangs + Cut", amount: 22500, sessions: 25 },
      { name: "Colour Correction", amount: 12000, sessions: 3 },
    ],
    payouts: [
      {
        date: "31 Dec 2025",
        amount: 137550,
        method: "Bank Transfer",
        status: "paid",
      },
      {
        date: "15 Dec 2025",
        amount: 59550,
        method: "Bank Transfer",
        status: "paid",
      },
    ],
  },
};

const WEEK_BARS = [
  { day: "Mon", amount: 8400 },
  { day: "Tue", amount: 12600 },
  { day: "Wed", amount: 6300 },
  { day: "Thu", amount: 18900 },
  { day: "Fri", amount: 21600 },
  { day: "Sat", amount: 15300 },
  { day: "Sun", amount: 0 },
];

// ─── Component ────────────────────────────────────────────────────────────────

const COMMISSION_RATE = 0.3; // salon takes 30%

export default function StylistEarningsPage() {
  const { t } = useLanguage();
  const [monthIdx, setMonthIdx] = useState(MONTHS.length - 1);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const month = MONTHS[monthIdx];
  const data = MONTHLY_DATA[month] ?? MONTHLY_DATA["January 2026"];

  const net = data.gross - data.commission + data.tips;
  const prevMonth = MONTHS[monthIdx - 1];
  const prevData = prevMonth ? MONTHLY_DATA[prevMonth] : null;
  const prevNet = prevData
    ? prevData.gross - prevData.commission + prevData.tips
    : null;
  const growthPct = prevNet
    ? (((net - prevNet) / prevNet) * 100).toFixed(1)
    : null;

  const maxService = Math.max(...data.byService.map((s) => s.amount));
  const maxBar = Math.max(...WEEK_BARS.map((b) => b.amount));

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header + Month Selector */}
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">{t.earnings.title}</h1>
          <p className="text-[#52525B] text-sm">{t.earnings.subtitle}</p>
        </div>
        {/* Month picker */}
        <div className="relative">
          <button
            onClick={() => setShowMonthPicker((p) => !p)}
            className="flex items-center gap-2 card-3d bg-[#141419] border border-[#27272A] rounded-xl px-4 h-10 text-[#F5F5F7] text-sm hover:border-[#3f3f46] transition-colors"
          >
            {month}
            <ChevronDown className="w-4 h-4 text-[#52525B]" />
          </button>
          <AnimatePresence>
            {showMonthPicker && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 z-50 card-3d bg-[#141419] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl w-48"
              >
                <div className="max-h-60 overflow-y-auto py-1">
                  {[...MONTHS].reverse().map((m, i) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMonthIdx(MONTHS.length - 1 - i);
                        setShowMonthPicker(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        m === month
                          ? "bg-[#22D3EE]/10 text-[#22D3EE]"
                          : "text-[#A1A1AA] hover:bg-[#1C1C22] hover:text-[#F5F5F7]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Net earnings hero */}
      <motion.div {...fadeUp(0.05)}>
        <div className="bg-gradient-to-br from-[#22D3EE]/10 via-[#141419] to-[#8B5CF6]/5 border border-[#22D3EE]/20 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-[#52525B] text-sm mb-1">
                {t.earnings.netEarnings} — {month}
              </p>
              <p className="text-[#F5F5F7] text-4xl font-bold tracking-tight">
                LKR {net.toLocaleString()}
              </p>
              {growthPct && (
                <p
                  className={`text-sm mt-1.5 font-medium ${Number(growthPct) >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}
                >
                  {Number(growthPct) >= 0 ? "↑" : "↓"}{" "}
                  {Math.abs(Number(growthPct))}% {t.earnings.vsLast} {prevMonth}
                </p>
              )}
            </div>
            <div className="text-right space-y-1.5">
              <div className="text-xs text-[#52525B]">{t.earnings.grossRevenue}</div>
              <div className="text-[#F5F5F7] font-semibold text-lg">
                LKR {data.gross.toLocaleString()}
              </div>
              <div className="text-xs text-[#52525B]">
                {t.earnings.salonCommission}
              </div>
              <div className="text-[#EF4444] font-medium">
                − LKR {data.commission.toLocaleString()}
              </div>
              <div className="text-xs text-[#52525B]">{t.earnings.tipsReceived}</div>
              <div className="text-[#10B981] font-medium">
                + LKR {data.tips.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Commission breakdown bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-[#52525B] mb-1.5">
              <span>{t.earnings.yourCut}</span>
              <span>{t.earnings.salonCut}</span>
            </div>
            <div className="h-2.5 rounded-full bg-[#1C1C22] overflow-hidden flex">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((net / (data.gross + data.tips)) * 100).toFixed(1)}%`,
                }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#22D3EE] to-[#10B981] rounded-l-full"
              />
              <div className="h-full flex-1 bg-[#EF4444]/20 rounded-r-full" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        {...fadeUp(0.1)}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          {
            label: t.earnings.sessionsCompleted,
            value: data.sessions,
            icon: Clock,
            color: "#22D3EE",
            suffix: "",
          },
          {
            label: t.earnings.avgPerSession,
            value: `LKR ${data.avgPerSession.toLocaleString()}`,
            icon: TrendingUp,
            color: "#10B981",
            suffix: "",
          },
          {
            label: t.earnings.tipsReceived,
            value: `LKR ${data.tips.toLocaleString()}`,
            icon: Star,
            color: "#F59E0B",
            suffix: "",
          },
          {
            label: t.earnings.netPayout,
            value: `LKR ${net.toLocaleString()}`,
            icon: Wallet,
            color: "#8B5CF6",
            suffix: "",
          },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} {...fadeUp(0.05 * i)}>
            <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4 hover:border-[#3f3f46] transition-colors">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${kpi.color}15` }}
              >
                <kpi.icon
                  className="w-4 h-4"
                  style={{ color: kpi.color }}
                  strokeWidth={1.75}
                />
              </div>
              <p className="text-[#F5F5F7] font-bold text-lg leading-tight">
                {kpi.value}
              </p>
              <p className="text-[#52525B] text-xs mt-0.5">{kpi.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings by service */}
        <motion.div {...fadeUp(0.15)}>
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#27272A]">
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                {t.earnings.earningsByService}
              </h3>
              <p className="text-[#52525B] text-xs mt-0.5">{month}</p>
            </div>
            <div className="p-5 space-y-4">
              {data.byService.map((service, i) => (
                <div key={service.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[#F5F5F7] text-sm">
                      {service.name}
                    </span>
                    <div className="text-right">
                      <span className="text-[#F5F5F7] text-sm font-semibold">
                        LKR {service.amount.toLocaleString()}
                      </span>
                      <span className="text-[#52525B] text-xs ml-2">
                        {service.sessions} {t.earnings.sessions}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-[#1C1C22] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(service.amount / maxService) * 100}%`,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 * i,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          i === 0
                            ? "#22D3EE"
                            : i === 1
                              ? "#8B5CF6"
                              : i === 2
                                ? "#10B981"
                                : i === 3
                                  ? "#F59E0B"
                                  : "#E8B4B8",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* This week day bars */}
        <motion.div {...fadeUp(0.2)}>
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#27272A]">
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                {t.earnings.weekDaily}
              </h3>
              <p className="text-[#52525B] text-xs mt-0.5">
                Mon 3 – Sun 9 Feb 2026
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-3 h-40">
                {WEEK_BARS.map((bar, i) => (
                  <div
                    key={bar.day}
                    className="flex-1 flex flex-col items-center gap-1.5"
                  >
                    <span className="text-[#52525B] text-[10px]">
                      {bar.amount > 0
                        ? `${(bar.amount / 1000).toFixed(1)}k`
                        : "—"}
                    </span>
                    <div
                      className="w-full flex items-end"
                      style={{ height: "100px" }}
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height:
                            maxBar > 0
                              ? `${(bar.amount / maxBar) * 100}%`
                              : "4px",
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.05 * i,
                          ease: "easeOut",
                        }}
                        className="w-full rounded-t-lg"
                        style={{
                          background:
                            bar.amount > 0
                              ? "linear-gradient(to top, #22D3EE, #8B5CF6)"
                              : "#1C1C22",
                          minHeight: "4px",
                        }}
                      />
                    </div>
                    <span className="text-[#52525B] text-xs">{bar.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#27272A] flex justify-between text-sm">
                <div>
                  <p className="text-[#52525B] text-xs">{t.earnings.weekTotal}</p>
                  <p className="text-[#F5F5F7] font-semibold">
                    LKR{" "}
                    {WEEK_BARS.reduce(
                      (a, b) => a + b.amount,
                      0,
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#52525B] text-xs">{t.earnings.bestDay}</p>
                  <p className="text-[#22D3EE] font-semibold">
                    {
                      WEEK_BARS.reduce((a, b) => (b.amount > a.amount ? b : a))
                        .day
                    }{" "}
                    — LKR{" "}
                    {Math.max(
                      ...WEEK_BARS.map((b) => b.amount),
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payout history */}
      <motion.div {...fadeUp(0.25)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
            <div>
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                {t.earnings.payoutHistory}
              </h3>
              <p className="text-[#52525B] text-xs mt-0.5">
                {t.earnings.biMonthly}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
                disabled={monthIdx === 0}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#F5F5F7] hover:bg-[#1C1C22] transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setMonthIdx((i) => Math.min(MONTHS.length - 1, i + 1))
                }
                disabled={monthIdx === MONTHS.length - 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#F5F5F7] hover:bg-[#1C1C22] transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-[#27272A]">
            {data.payouts.map((payout) => (
              <div
                key={payout.date}
                className="flex items-center justify-between px-5 py-4 hover:bg-[#1C1C22] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${payout.status === "paid" ? "bg-[#10B981]" : "bg-[#F59E0B]"}`}
                  />
                  <div>
                    <p className="text-[#F5F5F7] text-sm font-medium">
                      {payout.date}
                    </p>
                    <p className="text-[#52525B] text-xs">{payout.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#F5F5F7] font-semibold text-sm">
                    LKR {payout.amount.toLocaleString()}
                  </p>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      payout.status === "paid"
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : "bg-[#F59E0B]/10 text-[#F59E0B]"
                    }`}
                  >
                    {payout.status === "paid"
                      ? t.earnings.statusPaid
                      : t.earnings.statusPending}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-[#1C1C22]/50 border-t border-[#27272A]">
            <p className="text-[#52525B] text-xs">
              {t.earnings.commissionSplit}{" "}
              <span className="text-[#22D3EE]">{t.earnings.yourShare}</span> ·{" "}
              <span className="text-[#A1A1AA]">{t.earnings.salonShare}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
