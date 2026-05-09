"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
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

const PEAK_FORECAST = [
  { hour: "9am", actual: 4, predicted: 5 },
  { hour: "10am", actual: 7, predicted: 8 },
  { hour: "11am", actual: 9, predicted: 10 },
  { hour: "12pm", actual: 6, predicted: 7 },
  { hour: "1pm", actual: 4, predicted: 4 },
  { hour: "2pm", actual: 8, predicted: 9 },
  { hour: "3pm", actual: 11, predicted: 12 },
  { hour: "4pm", actual: 14, predicted: 13 },
  { hour: "5pm", actual: 12, predicted: 11 },
  { hour: "6pm", actual: 9, predicted: 8 },
  { hour: "7pm", actual: 6, predicted: 5 },
];

const DEMAND_FORECAST = [
  { week: "W1", haircut: 18, coloring: 9, bridal: 2, spa: 5 },
  { week: "W2", haircut: 22, coloring: 11, bridal: 3, spa: 6 },
  { week: "W3", haircut: 19, coloring: 13, bridal: 5, spa: 7 },
  { week: "W4", haircut: 25, coloring: 15, bridal: 4, spa: 8 },
];

const RETENTION_DATA = [
  { month: "Jan", rate: 78 },
  { month: "Feb", rate: 81 },
  { month: "Mar", rate: 83 },
  { month: "Apr", rate: 80 },
  { month: "May", rate: 86 },
  { month: "Jun", rate: 88 },
  { month: "Jul", rate: 91 },
];

const AI_INSIGHTS = [
  {
    type: "warning",
    icon: AlertTriangle,
    color: "#F59E0B",
    title: "Peak demand approaching",
    body: "AI predicts 40% higher booking volume next Saturday (May 17). Consider extending hours or adding a 4th stylist temporarily.",
  },
  {
    type: "success",
    icon: TrendingUp,
    color: "#10B981",
    title: "Revenue growth on track",
    body: "At the current trajectory, July revenue is projected to exceed LKR 120K — a 28% YoY increase. Bridal season is the key driver.",
  },
  {
    type: "info",
    icon: Users,
    color: "#22D3EE",
    title: "Customer retention opportunity",
    body: "18 customers haven't visited in 60+ days. Sending a personalized 15% discount could recover LKR 24,000 in potential revenue.",
  },
  {
    type: "purple",
    icon: Sparkles,
    color: "#8B5CF6",
    title: "Service gap detected",
    body: "AI analysis shows a demand for 'Hair Extensions' not currently offered. Nearby salons offering it see 22% higher revenue per customer.",
  },
];

const HEATMAP_DATA = [
  { day: "Mon", slots: [2, 4, 6, 8, 9, 7, 5, 3, 2, 1, 1] },
  { day: "Tue", slots: [3, 5, 7, 9, 10, 8, 6, 4, 3, 2, 1] },
  { day: "Wed", slots: [2, 3, 5, 7, 9, 8, 7, 5, 3, 2, 1] },
  { day: "Thu", slots: [4, 6, 8, 10, 11, 9, 7, 5, 4, 3, 2] },
  { day: "Fri", slots: [5, 7, 9, 12, 14, 13, 11, 8, 6, 4, 2] },
  { day: "Sat", slots: [6, 9, 12, 14, 14, 13, 12, 10, 8, 6, 3] },
  { day: "Sun", slots: [2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0] },
];

const HOURS = [
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

function getHeatColor(v: number): string {
  if (v === 0) return "#1C1C22";
  if (v <= 3) return "rgba(139,92,246,0.15)";
  if (v <= 6) return "rgba(139,92,246,0.35)";
  if (v <= 9) return "rgba(139,92,246,0.6)";
  return "rgba(139,92,246,0.9)";
}

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
    <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[#A1A1AA] text-xs mb-1">{label}</p>
      {payload.map((p) => (
        <p
          key={p.name}
          className="text-xs font-semibold"
          style={{ color: p.color }}
        >
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
      {/* AI banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#8B5CF6]/10 via-[#141419] to-[#22D3EE]/10 border border-[#8B5CF6]/20 rounded-2xl p-5 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 flex items-center justify-center flex-shrink-0">
          <Brain className="w-6 h-6 text-[#8B5CF6]" />
        </div>
        <div>
          <p className="text-[#F5F5F7] font-semibold">AI-Powered Analytics</p>
          <p className="text-[#A1A1AA] text-sm">
            Predictions are updated daily based on your booking history,
            seasonal trends, and customer behavior patterns.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[#10B981] text-xs font-medium">Live</span>
        </div>
      </motion.div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Predicted Revenue (Jul)",
            value: "LKR 120K",
            change: "+28%",
            color: "#8B5CF6",
          },
          {
            label: "Peak Hour Today",
            value: "4:00 PM",
            sub: "14 bookings predicted",
            color: "#F59E0B",
          },
          {
            label: "Retention Rate",
            value: "91%",
            change: "+13% YoY",
            color: "#10B981",
          },
          {
            label: "AI Confidence",
            value: "94%",
            sub: "Based on 2,300+ data pts",
            color: "#22D3EE",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-[#141419] border border-[#27272A] rounded-2xl p-5"
          >
            <p className="text-[#52525B] text-xs mb-2">{s.label}</p>
            <p className="text-[#F5F5F7] text-2xl font-bold mb-0.5">
              {s.value}
            </p>
            {s.change && <p className="text-[#10B981] text-xs">{s.change}</p>}
            {s.sub && <p className="text-[#52525B] text-xs">{s.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak hour forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#141419] border border-[#27272A] rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-[#F5F5F7] font-semibold">
              Booking Peak Forecast
            </p>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] inline-block" />
                Actual
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] inline-block" />
                Predicted
              </span>
            </div>
          </div>
          <p className="text-[#52525B] text-xs mb-5">
            Today's booking demand (actual vs AI prediction)
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={PEAK_FORECAST}
              margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272A"
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                tick={{ fill: "#52525B", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#52525B", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#actualGrad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                name="Predicted"
                stroke="#22D3EE"
                strokeWidth={2}
                strokeDasharray="4 3"
                fill="url(#predGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Service demand forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-[#141419] border border-[#27272A] rounded-2xl p-5"
        >
          <p className="text-[#F5F5F7] font-semibold mb-1">
            Service Demand Forecast
          </p>
          <p className="text-[#52525B] text-xs mb-5">
            Weekly predicted bookings by category
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={DEMAND_FORECAST}
              barSize={10}
              margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272A"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fill: "#52525B", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#52525B", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="haircut"
                name="Haircut"
                fill="#8B5CF6"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="coloring"
                name="Coloring"
                fill="#22D3EE"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="bridal"
                name="Bridal"
                fill="#E8B4B8"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="spa"
                name="Spa"
                fill="#10B981"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Customer retention + heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141419] border border-[#27272A] rounded-2xl p-5"
        >
          <p className="text-[#F5F5F7] font-semibold mb-1">
            Customer Retention Trend
          </p>
          <p className="text-[#52525B] text-xs mb-5">
            Monthly returning customers %
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart
              data={RETENTION_DATA}
              margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272A"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#52525B", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[70, 100]}
                tick={{ fill: "#52525B", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="rate"
                name="Retention %"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#retGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-[#141419] border border-[#27272A] rounded-2xl p-5"
        >
          <p className="text-[#F5F5F7] font-semibold mb-1">Booking Heatmap</p>
          <p className="text-[#52525B] text-xs mb-5">
            Average bookings by day × hour
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-10" />
                  {HOURS.map((h) => (
                    <th
                      key={h}
                      className="text-[#52525B] text-[10px] font-normal pb-2 text-center"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HEATMAP_DATA.map((row) => (
                  <tr key={row.day}>
                    <td className="text-[#52525B] text-xs pr-3 py-1">
                      {row.day}
                    </td>
                    {row.slots.map((v, j) => (
                      <td key={j} className="py-0.5 px-0.5">
                        <div
                          className="w-full aspect-square rounded-md min-w-[18px] flex items-center justify-center"
                          style={{ background: getHeatColor(v) }}
                        >
                          {v > 8 && (
                            <span className="text-[8px] text-white font-bold">
                              {v}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[#8B5CF6]" />
          <p className="text-[#F5F5F7] font-semibold">AI Growth Insights</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {AI_INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="bg-[#141419] border border-[#27272A] rounded-2xl p-5 flex gap-4 hover:border-[#3f3f46] transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${insight.color}15` }}
              >
                <insight.icon
                  className="w-5 h-5"
                  style={{ color: insight.color }}
                />
              </div>
              <div>
                <p className="text-[#F5F5F7] font-medium text-sm mb-1">
                  {insight.title}
                </p>
                <p className="text-[#A1A1AA] text-xs leading-relaxed">
                  {insight.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
