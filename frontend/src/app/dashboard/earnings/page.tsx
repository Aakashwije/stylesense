"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Scissors,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const REVENUE_DATA = [
  {
    month: "Jan",
    salon: 48000,
    stylist1: 18000,
    stylist2: 16000,
    stylist3: 14000,
  },
  {
    month: "Feb",
    salon: 52000,
    stylist1: 20000,
    stylist2: 17000,
    stylist3: 15000,
  },
  {
    month: "Mar",
    salon: 61000,
    stylist1: 23000,
    stylist2: 20000,
    stylist3: 18000,
  },
  {
    month: "Apr",
    salon: 55000,
    stylist1: 21000,
    stylist2: 18000,
    stylist3: 16000,
  },
  {
    month: "May",
    salon: 73000,
    stylist1: 27000,
    stylist2: 24000,
    stylist3: 22000,
  },
  {
    month: "Jun",
    salon: 69000,
    stylist1: 26000,
    stylist2: 22000,
    stylist3: 21000,
  },
  {
    month: "Jul",
    salon: 81000,
    stylist1: 31000,
    stylist2: 26000,
    stylist3: 24000,
  },
];

const DAILY_DATA = [
  { day: "Mon", revenue: 9200 },
  { day: "Tue", revenue: 11400 },
  { day: "Wed", revenue: 8800 },
  { day: "Thu", revenue: 13200 },
  { day: "Fri", revenue: 16800 },
  { day: "Sat", revenue: 19400 },
  { day: "Sun", revenue: 7600 },
];

const SERVICE_REVENUE = [
  { service: "Keratin", revenue: 28000, count: 8 },
  { service: "Bridal", revenue: 36000, count: 3 },
  { service: "Coloring", revenue: 22500, count: 5 },
  { service: "Facial", revenue: 13200, count: 6 },
  { service: "Nails", revenue: 7200, count: 4 },
];

const STYLISTS = [
  {
    name: "Shenali Rodrigo",
    today: 8400,
    week: 24800,
    month: 81200,
    commission: 20,
    tips: 2200,
    bookings: 48,
  },
  {
    name: "Kasun Perera",
    today: 5200,
    week: 19600,
    month: 64800,
    commission: 20,
    tips: 1400,
    bookings: 41,
  },
  {
    name: "Dinara Silva",
    today: 7800,
    week: 22100,
    month: 72500,
    commission: 20,
    tips: 1800,
    bookings: 37,
  },
];

const TRANSACTIONS = [
  {
    id: "TXN-1098",
    customer: "Dilhani Perera",
    service: "Keratin Treatment",
    stylist: "Shenali R.",
    amount: 3500,
    type: "credit",
    date: "Today, 10:00 AM",
  },
  {
    id: "TXN-1097",
    customer: "Sanduni Fernando",
    service: "Bridal Package",
    stylist: "Dinara S.",
    amount: 12000,
    type: "credit",
    date: "Today, 9:30 AM",
  },
  {
    id: "TXN-1096",
    customer: "Thilini Silva",
    service: "Balayage Color",
    stylist: "Kasun P.",
    amount: 4200,
    type: "credit",
    date: "Yesterday, 4:00 PM",
  },
  {
    id: "TXN-1095",
    customer: "Nadeesha Wickramasinghe",
    service: "Facial + Spa",
    stylist: "Dinara S.",
    amount: 2200,
    type: "credit",
    date: "Yesterday, 3:00 PM",
  },
  {
    id: "TXN-1094",
    customer: "Chamari Jayawardena",
    service: "Hair Cut",
    stylist: "Shenali R.",
    amount: 800,
    type: "refund",
    date: "May 7, 12:00 PM",
  },
];

const TABS = ["Daily", "Weekly", "Monthly"];

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2.5 shadow-xl">
      <p className="text-[#A1A1AA] text-xs mb-1.5">{label}</p>
      {payload.map((p) => (
        <p
          key={p.name}
          className="text-sm font-semibold"
          style={{ color: p.color }}
        >
          LKR {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function EarningsPage() {
  const [period, setPeriod] = useState("Monthly");

  const totalSalon = STYLISTS.reduce((a, s) => a + s.month, 0);
  const totalCommission = STYLISTS.reduce(
    (a, s) => a + Math.round((s.month * s.commission) / 100),
    0,
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Period tabs + export */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-[#141419] border border-[#27272A] rounded-xl p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setPeriod(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${period === t ? "bg-[#8B5CF6]/15 text-[#8B5CF6]" : "text-[#52525B] hover:text-[#A1A1AA]"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 h-9 rounded-xl bg-[#141419] border border-[#27272A] text-[#A1A1AA] text-sm hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Combined Revenue",
            value: `LKR ${(totalSalon / 1000).toFixed(0)}k`,
            change: "+18%",
            color: "#8B5CF6",
            icon: Wallet,
          },
          {
            label: "Total Commission",
            value: `LKR ${(totalCommission / 1000).toFixed(0)}k`,
            change: "20% avg",
            color: "#22D3EE",
            icon: TrendingUp,
          },
          {
            label: "Today's Revenue",
            value: "LKR 21,400",
            change: "+12%",
            color: "#10B981",
            icon: ArrowUpRight,
          },
          {
            label: "Weekly Revenue",
            value: "LKR 66,500",
            change: "+8%",
            color: "#F59E0B",
            icon: TrendingUp,
          },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-[#141419] border border-[#27272A] rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${c.color}15` }}
              >
                <c.icon
                  className="w-4 h-4"
                  style={{ color: c.color }}
                  strokeWidth={1.75}
                />
              </div>
              <span className="text-[#10B981] text-xs font-medium bg-[#10B981]/10 px-2 py-0.5 rounded-lg">
                {c.change}
              </span>
            </div>
            <p className="text-[#52525B] text-xs mb-1">{c.label}</p>
            <p className="text-[#F5F5F7] text-2xl font-bold">{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#141419] border border-[#27272A] rounded-2xl p-5"
        >
          <p className="text-[#F5F5F7] font-semibold mb-1">Revenue Trends</p>
          <p className="text-[#52525B] text-xs mb-5">
            Combined salon + per-stylist breakdown
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={REVENUE_DATA}
              margin={{ top: 5, right: 5, bottom: 0, left: 0 }}
            >
              <defs>
                {[
                  ["salonGrad", "#8B5CF6"],
                  ["s1Grad", "#22D3EE"],
                  ["s2Grad", "#10B981"],
                  ["s3Grad", "#F59E0B"],
                ].map(([id, color]) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272A"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#52525B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#52525B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `LKR ${v / 1000}k`}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="salon"
                name="Salon Total"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#salonGrad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="stylist1"
                name="Shenali R."
                stroke="#22D3EE"
                strokeWidth={1.5}
                fill="url(#s1Grad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="stylist2"
                name="Kasun P."
                stroke="#10B981"
                strokeWidth={1.5}
                fill="url(#s2Grad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="stylist3"
                name="Dinara S."
                stroke="#F59E0B"
                strokeWidth={1.5}
                fill="url(#s3Grad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-[#141419] border border-[#27272A] rounded-2xl p-5"
        >
          <p className="text-[#F5F5F7] font-semibold mb-1">Daily Revenue</p>
          <p className="text-[#52525B] text-xs mb-5">This week</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={DAILY_DATA}
              barSize={24}
              margin={{ top: 5, right: 5, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272A"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "#52525B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#52525B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `LKR ${v / 1000}k`}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#8B5CF6"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Stylist earnings + service profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Per-stylist earnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141419] border border-[#27272A] rounded-2xl p-5"
        >
          <p className="text-[#F5F5F7] font-semibold mb-4">Stylist Earnings</p>
          <div className="space-y-4">
            {STYLISTS.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {s.name}
                      </p>
                      <p className="text-[#52525B] text-xs">
                        Commission: {s.commission}% · Tips: LKR 
                        {s.tips.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#F5F5F7] text-sm font-bold">
                      LKR {(s.month / 1000).toFixed(0)}k
                    </p>
                    <p className="text-[#52525B] text-xs">
                      {s.bookings} bookings
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#1C1C22] rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${(s.month / Math.max(...STYLISTS.map((x) => x.month))) * 100}%`,
                      background: ["#8B5CF6", "#22D3EE", "#10B981"][i],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Service profitability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-[#141419] border border-[#27272A] rounded-2xl p-5"
        >
          <p className="text-[#F5F5F7] font-semibold mb-4">
            Service Profitability
          </p>
          <div className="space-y-3">
            {SERVICE_REVENUE.sort((a, b) => b.revenue - a.revenue).map(
              (s, i) => (
                <div key={s.service} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1C1C22] flex items-center justify-center text-sm flex-shrink-0">
                    {["💇‍♀️", "👰", "🎨", "🌸", "💅"][i]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#F5F5F7] text-sm font-medium">
                        {s.service}
                      </span>
                      <span className="text-[#F5F5F7] text-sm font-bold">
                        LKR {(s.revenue / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="w-full bg-[#1C1C22] rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-[#8B5CF6]"
                        style={{
                          width: `${(s.revenue / Math.max(...SERVICE_REVENUE.map((x) => x.revenue))) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-[#52525B] text-xs mt-0.5">
                      {s.count} bookings this month
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden"
      >
        <div className="p-5 border-b border-[#27272A] flex items-center justify-between">
          <p className="text-[#F5F5F7] font-semibold">Recent Transactions</p>
          <button className="text-[#8B5CF6] text-xs hover:underline">
            View all
          </button>
        </div>
        <div className="divide-y divide-[#27272A]/50">
          {TRANSACTIONS.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#1C1C22] transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${t.type === "credit" ? "bg-[#10B981]/10" : "bg-[#EF4444]/10"}`}
              >
                <Scissors
                  className={`w-4 h-4 ${t.type === "credit" ? "text-[#10B981]" : "text-[#EF4444]"}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#F5F5F7] text-sm font-medium truncate">
                  {t.customer} · {t.service}
                </p>
                <p className="text-[#52525B] text-xs">
                  {t.stylist} · {t.date}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p
                  className={`text-sm font-bold ${t.type === "credit" ? "text-[#10B981]" : "text-[#EF4444]"}`}
                >
                  {t.type === "credit" ? "+" : "-"}LKR {t.amount.toLocaleString()}
                </p>
                <p className="text-[#52525B] text-xs">{t.id}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
