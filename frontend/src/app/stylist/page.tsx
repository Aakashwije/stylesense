"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const KPI_CARDS = [
  {
    label: "Today's Bookings",
    value: "6",
    sub: "2 remaining",
    icon: BookOpen,
    color: "#22D3EE",
    bg: "#22D3EE",
  },
  {
    label: "Clients This Month",
    value: "89",
    sub: "+12 vs last month",
    icon: Users,
    color: "#8B5CF6",
    bg: "#8B5CF6",
  },
  {
    label: "My Rating",
    value: "4.9",
    sub: "from 128 reviews",
    icon: Star,
    color: "#F59E0B",
    bg: "#F59E0B",
  },
  {
    label: "Tips Today",
    value: "LKR 850",
    sub: "from 4 clients",
    icon: Wallet,
    color: "#10B981",
    bg: "#10B981",
  },
];

const TODAY_APPOINTMENTS = [
  {
    id: 1,
    time: "09:00 AM",
    client: "Dilhani Perera",
    service: "Balayage + Toner",
    duration: "2h 30m",
    status: "completed",
  },
  {
    id: 2,
    time: "11:45 AM",
    client: "Sanduni Fernando",
    service: "Cut & Blow Dry",
    duration: "1h",
    status: "completed",
  },
  {
    id: 3,
    time: "01:30 PM",
    client: "Thilini Silva",
    service: "Keratin Treatment",
    duration: "2h",
    status: "in-progress",
  },
  {
    id: 4,
    time: "03:45 PM",
    client: "Nadeesha Wickramasinghe",
    service: "Highlights",
    duration: "2h",
    status: "upcoming",
  },
  {
    id: 5,
    time: "05:30 PM",
    client: "Chamari Jayawardena",
    service: "Colour & Style",
    duration: "1h 30m",
    status: "upcoming",
  },
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    client: "Malsha Bandara",
    action: "Left a 5★ review",
    time: "2h ago",
    icon: Star,
    color: "#F59E0B",
  },
  {
    id: 2,
    client: "Kushani Rajapaksa",
    action: "Booked appointment for tomorrow",
    time: "3h ago",
    icon: Calendar,
    color: "#22D3EE",
  },
  {
    id: 3,
    client: "Ayasha Dissanayake",
    action: "Rescheduled to Friday",
    time: "5h ago",
    icon: Clock,
    color: "#F59E0B",
  },
  {
    id: 4,
    client: "Dilhani Perera",
    action: "Session completed",
    time: "Today 11:00 AM",
    icon: CheckCircle,
    color: "#10B981",
  },
];

const statusStyle = (status: string) => {
  if (status === "completed")
    return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
  if (status === "in-progress")
    return "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20";
  return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
};

const statusLabel = (status: string) => {
  if (status === "completed") return "Done";
  if (status === "in-progress") return "In Progress";
  return "Upcoming";
};

export default function StylistOverviewPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <motion.div {...fadeUp(0)}>
        <h1 className="text-[#F5F5F7] text-2xl font-bold">
          Good afternoon, <span className="text-[#22D3EE]">Shenali</span> ✨
        </h1>
        <p className="text-[#52525B] text-sm mt-1">
          You have 2 upcoming appointments today. Keep up the great work!
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card, i) => (
          <motion.div key={card.label} {...fadeUp(0.05 * (i + 1))}>
            <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5 hover:border-[#3f3f46] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${card.bg}15` }}
                >
                  <card.icon
                    className="w-5 h-5"
                    style={{ color: card.color }}
                    strokeWidth={1.75}
                  />
                </div>
                <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
              </div>
              <p className="text-[#F5F5F7] text-2xl font-bold">{card.value}</p>
              <p className="text-[#52525B] text-xs mt-0.5">{card.label}</p>
              <p className="text-[#22D3EE] text-[10px] mt-1 font-medium">
                {card.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <motion.div {...fadeUp(0.2)} className="lg:col-span-2">
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
              <div className="flex items-center gap-2.5">
                <Calendar
                  className="w-4 h-4 text-[#22D3EE]"
                  strokeWidth={1.75}
                />
                <h3 className="text-[#F5F5F7] font-semibold text-sm">
                  Today&apos;s Schedule
                </h3>
              </div>
              <span className="text-[#52525B] text-xs">
                {
                  TODAY_APPOINTMENTS.filter((a) => a.status === "completed")
                    .length
                }
                /{TODAY_APPOINTMENTS.length} done
              </span>
            </div>
            <div className="divide-y divide-[#27272A]">
              {TODAY_APPOINTMENTS.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#1C1C22] transition-colors"
                >
                  <div className="text-right flex-shrink-0 w-20">
                    <p className="text-[#F5F5F7] text-xs font-medium">
                      {appt.time}
                    </p>
                    <p className="text-[#52525B] text-[10px]">
                      {appt.duration}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F5F5F7] text-sm font-medium truncate">
                      {appt.client}
                    </p>
                    <p className="text-[#A1A1AA] text-xs truncate">
                      {appt.service}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${statusStyle(appt.status)}`}
                  >
                    {statusLabel(appt.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div {...fadeUp(0.25)}>
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden h-full">
            <div className="flex items-center gap-2.5 p-5 border-b border-[#27272A]">
              <Clock className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.75} />
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                Recent Activity
              </h3>
            </div>
            <div className="divide-y divide-[#27272A]">
              {RECENT_ACTIVITY.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#1C1C22] transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon
                      className="w-3.5 h-3.5"
                      style={{ color: item.color }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F5F5F7] text-xs font-medium truncate">
                      {item.client}
                    </p>
                    <p className="text-[#A1A1AA] text-[11px]">{item.action}</p>
                    <p className="text-[#52525B] text-[10px] mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance summary strip */}
      <motion.div {...fadeUp(0.3)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <h3 className="text-[#F5F5F7] font-semibold text-sm mb-4">
            This Week at a Glance
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Appointments", value: "28", color: "#22D3EE" },
              { label: "Avg Session", value: "1h 42m", color: "#8B5CF6" },
              { label: "5★ Reviews", value: "11", color: "#F59E0B" },
              { label: "Repeat Clients", value: "73%", color: "#10B981" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#1C1C22] rounded-xl p-4 text-center"
              >
                <p
                  className="text-[#F5F5F7] text-xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-[#52525B] text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
