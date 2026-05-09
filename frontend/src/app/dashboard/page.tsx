"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Wallet,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  Scissors,
  Sparkles,
  Crown,
} from "lucide-react";
import Link from "next/link";

const revenueData = [
  { month: "Jan", revenue: 48000, bookings: 124 },
  { month: "Feb", revenue: 52000, bookings: 138 },
  { month: "Mar", revenue: 61000, bookings: 152 },
  { month: "Apr", revenue: 55000, bookings: 141 },
  { month: "May", revenue: 73000, bookings: 178 },
  { month: "Jun", revenue: 69000, bookings: 165 },
  { month: "Jul", revenue: 81000, bookings: 196 },
];

const weeklyBookings = [
  { day: "Mon", bookings: 18 },
  { day: "Tue", bookings: 24 },
  { day: "Wed", bookings: 22 },
  { day: "Thu", bookings: 31 },
  { day: "Fri", bookings: 38 },
  { day: "Sat", bookings: 45 },
  { day: "Sun", bookings: 20 },
];

const serviceData = [
  { name: "Haircut", value: 35, color: "#8B5CF6" },
  { name: "Coloring", value: 25, color: "#22D3EE" },
  { name: "Bridal", value: 18, color: "#E8B4B8" },
  { name: "Facials", value: 12, color: "#10B981" },
  { name: "Spa", value: 10, color: "#F59E0B" },
];

const heatmapData = [
  { hour: "9am", Mon: 3, Tue: 5, Wed: 4, Thu: 7, Fri: 8, Sat: 10, Sun: 2 },
  { hour: "10am", Mon: 6, Tue: 8, Wed: 7, Thu: 9, Fri: 11, Sat: 14, Sun: 5 },
  { hour: "11am", Mon: 8, Tue: 10, Wed: 9, Thu: 12, Fri: 13, Sat: 15, Sun: 7 },
  { hour: "12pm", Mon: 5, Tue: 7, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 4 },
  { hour: "2pm", Mon: 7, Tue: 9, Wed: 8, Thu: 10, Fri: 12, Sat: 13, Sun: 6 },
  { hour: "4pm", Mon: 9, Tue: 11, Wed: 10, Thu: 13, Fri: 15, Sat: 16, Sun: 8 },
  { hour: "6pm", Mon: 4, Tue: 6, Wed: 5, Thu: 7, Fri: 9, Sat: 11, Sun: 3 },
];

const upcomingBookings = [
  { id: 1, customer: "Dilhani Perera", service: "Keratin Treatment", stylist: "Shenali R.", time: "10:00 AM", status: "confirmed" },
  { id: 2, customer: "Sanduni Fernando", service: "Balayage Color", stylist: "Kasun P.", time: "11:30 AM", status: "pending" },
  { id: 3, customer: "Thilini S.", service: "Bridal Package", stylist: "Dinara S.", time: "2:00 PM", status: "confirmed" },
  { id: 4, customer: "Chamari J.", service: "Facial + Spa", stylist: "Shenali R.", time: "3:30 PM", status: "in-progress" },
];

const recentReviews = [
  { id: 1, customer: "Dilhani P.", rating: 5, text: "Absolutely amazing experience! Shenali is a genius.", time: "2h ago" },
  { id: 2, customer: "Sanduni F.", rating: 4, text: "Great coloring job, very satisfied with results.", time: "5h ago" },
  { id: 3, customer: "Nadeesha W.", rating: 5, text: "Best bridal package in the city. Highly recommend!", time: "1d ago" },
];

const topStylists = [
  { name: "Shenali Rodrigo", bookings: 48, earnings: 24800, rating: 4.9, avatar: "SR" },
  { name: "Kasun Perera", bookings: 41, earnings: 19600, rating: 4.7, avatar: "KP" },
  { name: "Dinara Silva", bookings: 37, earnings: 22100, rating: 4.8, avatar: "DS" },
];

function KPICard({ label, value, change, positive, icon: Icon, color, delay = 0 }: {
  label: string; value: string; change: string; positive: boolean;
  icon: React.ElementType; color: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:border-[#3f3f46] transition-colors"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 0% 0%, ${color}08 0%, transparent 70%)` }} />
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.75} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${positive ? "bg-[#10B981]/10 text-[#10B981]" : "bg-[#EF4444]/10 text-[#EF4444]"}`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p className="text-[#A1A1AA] text-xs mb-1">{label}</p>
      <p className="text-[#F5F5F7] text-2xl font-bold tracking-tight">{value}</p>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string; icon: React.ElementType }> = {
    confirmed: { label: "Confirmed", className: "bg-[#10B981]/10 text-[#10B981]", icon: CheckCircle2 },
    pending: { label: "Pending", className: "bg-[#F59E0B]/10 text-[#F59E0B]", icon: AlertCircle },
    "in-progress": { label: "In Progress", className: "bg-[#22D3EE]/10 text-[#22D3EE]", icon: Clock },
    cancelled: { label: "Cancelled", className: "bg-[#EF4444]/10 text-[#EF4444]", icon: XCircle },
  };
  const s = map[status] ?? map.pending;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg ${s.className}`}>
      <Icon className="w-3 h-3" />{s.label}
    </span>
  );
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[#A1A1AA] text-xs mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-[#F5F5F7] text-sm font-semibold">
          {p.name === "revenue" ? `LKR ${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
}

function getHeatColor(value: number) {
  if (value >= 14) return "#8B5CF6";
  if (value >= 10) return "#8B5CF6aa";
  if (value >= 7) return "#8B5CF666";
  if (value >= 4) return "#8B5CF633";
  return "#1C1C22";
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardOverviewPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Today's Revenue" value="LKR 8,420" change="+12%" positive icon={Wallet} color="#8B5CF6" delay={0} />
        <KPICard label="Monthly Revenue" value="LKR 81,200" change="+18%" positive icon={TrendingUp} color="#22D3EE" delay={0.05} />
        <KPICard label="Total Bookings" value="196" change="+24" positive icon={Calendar} color="#10B981" delay={0.1} />
        <KPICard label="Active Customers" value="1,240" change="+8%" positive icon={Users} color="#F59E0B" delay={0.15} />
        <KPICard label="Cancellation Rate" value="4.2%" change="-1.1%" positive icon={XCircle} color="#EF4444" delay={0.2} />
        <KPICard label="Top Stylist" value="Shenali R." change="4.9★" positive icon={Scissors} color="#E8B4B8" delay={0.25} />
        <KPICard label="Salon Rating" value="4.8 / 5" change="+0.2" positive icon={Star} color="#F59E0B" delay={0.3} />
        <KPICard label="Monthly Growth" value="+18.4%" change="vs last mo." positive icon={ArrowUpRight} color="#8B5CF6" delay={0.35} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[#F5F5F7] font-semibold">Revenue Analytics</p>
              <p className="text-[#52525B] text-xs mt-0.5">Monthly performance overview</p>
            </div>
            <span className="text-[#10B981] text-xs font-semibold bg-[#10B981]/10 px-2.5 py-1 rounded-lg">+18% this month</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `LKR ${v / 1000}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} fill="url(#revGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <p className="text-[#F5F5F7] font-semibold mb-1">Service Popularity</p>
          <p className="text-[#52525B] text-xs mb-4">Distribution by type</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={serviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value">
                {serviceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, "Share"]}
                contentStyle={{ background: "#1C1C22", border: "1px solid #27272A", borderRadius: 12 }} itemStyle={{ color: "#F5F5F7" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {serviceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-[#A1A1AA] text-xs">{s.name}</span>
                </div>
                <span className="text-[#F5F5F7] text-xs font-semibold">{s.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <p className="text-[#F5F5F7] font-semibold mb-1">Weekly Bookings</p>
          <p className="text-[#52525B] text-xs mb-5">This week at a glance</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyBookings} barSize={28} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="bookings" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <p className="text-[#F5F5F7] font-semibold mb-1">Peak Hour Heatmap</p>
          <p className="text-[#52525B] text-xs mb-4">Busiest times of the week</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-[#52525B] font-medium text-left pr-3 pb-2 w-12"></th>
                  {DAYS.map((d) => <th key={d} className="text-[#52525B] font-medium pb-2 text-center">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row) => (
                  <tr key={row.hour}>
                    <td className="text-[#52525B] pr-3 py-0.5 whitespace-nowrap">{row.hour}</td>
                    {DAYS.map((d) => {
                      const val = row[d as keyof typeof row] as number;
                      return (
                        <td key={d} className="py-0.5 px-0.5">
                          <div title={`${val} bookings`}
                            className="w-full h-7 rounded-md flex items-center justify-center text-[10px] font-semibold"
                            style={{ background: getHeatColor(val), color: val >= 10 ? "#fff" : "#52525B" }}>
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#F5F5F7] font-semibold">Today&apos;s Appointments</p>
            <Link href="/dashboard/bookings" className="text-[#8B5CF6] text-xs hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingBookings.map((b) => (
              <div key={b.id} className="flex items-start gap-3 p-3 bg-[#1C1C22] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6]/30 to-[#22D3EE]/30 flex items-center justify-center text-[#F5F5F7] text-xs font-bold flex-shrink-0">
                  {b.customer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F7] text-sm font-medium truncate">{b.customer}</p>
                  <p className="text-[#52525B] text-xs">{b.service} · {b.stylist}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#A1A1AA] text-xs mb-1">{b.time}</p>
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#F5F5F7] font-semibold">Top Stylists</p>
            <Link href="/dashboard/stylists" className="text-[#8B5CF6] text-xs hover:underline">Manage</Link>
          </div>
          <div className="space-y-4">
            {topStylists.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-sm font-bold">
                    {s.avatar}
                  </div>
                  {i === 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <Crown className="w-2.5 h-2.5 text-white" />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F7] text-sm font-medium truncate">{s.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[#52525B] text-xs">{s.bookings} bookings</span>
                    <span className="w-1 h-1 bg-[#27272A] rounded-full" />
                    <span className="text-[#F59E0B] text-xs flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-[#F59E0B]" />{s.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#F5F5F7] text-sm font-semibold">LKR {s.earnings.toLocaleString()}</p>
                  <p className="text-[#52525B] text-xs">this month</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5 space-y-4">
          <div className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#22D3EE]/10 border border-[#8B5CF6]/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-[#8B5CF6] text-xs font-semibold uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-[#F5F5F7] text-sm font-medium mb-1">Peak demand expected Friday</p>
            <p className="text-[#A1A1AA] text-xs leading-relaxed">
              Based on booking trends, this Friday 4–6 PM will have 42% higher demand. Consider adding an extra stylist.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#F5F5F7] font-semibold text-sm">Recent Reviews</p>
              <Link href="/dashboard/reviews" className="text-[#8B5CF6] text-xs hover:underline">View all</Link>
            </div>
            <div className="space-y-2.5">
              {recentReviews.map((r) => (
                <div key={r.id} className="flex items-start gap-2.5 p-2.5 bg-[#1C1C22] rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E8B4B8]/30 to-[#8B5CF6]/30 flex items-center justify-center text-[#F5F5F7] text-[10px] font-bold flex-shrink-0">
                    {r.customer.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                      <span className="text-[#52525B] text-[10px] ml-1">{r.time}</span>
                    </div>
                    <p className="text-[#A1A1AA] text-xs leading-relaxed line-clamp-1">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
