"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Scissors,
  Search,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const ALL_BOOKINGS = [
  {
    id: "BK-001",
    customer: "Dilhani Perera",
    phone: "+94 77 123 4567",
    service: "Keratin Treatment",
    stylist: "Shenali Rodrigo",
    date: "Today",
    time: "10:00 AM",
    duration: "90 min",
    amount: 3500,
    status: "confirmed",
  },
  {
    id: "BK-002",
    customer: "Sanduni Fernando",
    phone: "+94 75 678 9012",
    service: "Balayage Color",
    stylist: "Kasun Perera",
    date: "Today",
    time: "11:30 AM",
    duration: "120 min",
    amount: 4200,
    status: "pending",
  },
  {
    id: "BK-003",
    customer: "Thilini Silva",
    phone: "+94 77 987 6543",
    service: "Bridal Package",
    stylist: "Dinara Silva",
    date: "Today",
    time: "2:00 PM",
    duration: "180 min",
    amount: 12000,
    status: "in-progress",
  },
  {
    id: "BK-004",
    customer: "Chamari Jayawardena",
    phone: "+94 71 876 5432",
    service: "Facial + Spa",
    stylist: "Shenali Rodrigo",
    date: "Today",
    time: "3:30 PM",
    duration: "60 min",
    amount: 2200,
    status: "confirmed",
  },
  {
    id: "BK-005",
    customer: "Nadeesha Wickramasinghe",
    phone: "+94 76 765 4321",
    service: "Hair Color + Cut",
    stylist: "Kasun Perera",
    date: "Yesterday",
    time: "11:00 AM",
    duration: "90 min",
    amount: 2800,
    status: "completed",
  },
  {
    id: "BK-006",
    customer: "Kushani Rajapaksa",
    phone: "+94 78 654 3210",
    service: "Nail Art",
    stylist: "Dinara Silva",
    date: "Yesterday",
    time: "4:00 PM",
    duration: "45 min",
    amount: 800,
    status: "cancelled",
  },
  {
    id: "BK-007",
    customer: "Ayasha Dissanayake",
    phone: "+94 72 543 2109",
    service: "Hair Cut + Style",
    stylist: "Shenali Rodrigo",
    date: "Tomorrow",
    time: "9:00 AM",
    duration: "60 min",
    amount: 1500,
    status: "pending",
  },
  {
    id: "BK-008",
    customer: "Sachini G.",
    phone: "+94 75 432 1098",
    service: "Manicure + Pedicure",
    stylist: "Dinara Silva",
    date: "Tomorrow",
    time: "12:00 PM",
    duration: "75 min",
    amount: 1800,
    status: "confirmed",
  },
];

const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
  },
  pending: {
    label: "Pending",
    icon: AlertCircle,
    className: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    className: "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-[#52525B]/20 text-[#A1A1AA] border-[#52525B]/20",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg =
    STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ??
    STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${cfg.className}`}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

const TABS = [
  "All",
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<
    (typeof ALL_BOOKINGS)[0] | null
  >(null);

  const filtered = ALL_BOOKINGS.filter((b) => {
    const matchTab =
      activeTab === "All" ||
      b.status === activeTab.toLowerCase().replace(" ", "-");
    const matchSearch =
      !search ||
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    All: ALL_BOOKINGS.length,
    Pending: ALL_BOOKINGS.filter((b) => b.status === "pending").length,
    Confirmed: ALL_BOOKINGS.filter((b) => b.status === "confirmed").length,
    "In Progress": ALL_BOOKINGS.filter((b) => b.status === "in-progress")
      .length,
    Completed: ALL_BOOKINGS.filter((b) => b.status === "completed").length,
    Cancelled: ALL_BOOKINGS.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <p className="text-[#52525B] text-sm">
            {ALL_BOOKINGS.length} total bookings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 h-9 rounded-xl bg-[#141419] border border-[#27272A] text-[#A1A1AA] text-sm hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 h-9 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Today", value: "4", color: "#8B5CF6" },
          {
            label: "Pending",
            value: counts.Pending.toString(),
            color: "#F59E0B",
          },
          {
            label: "Confirmed",
            value: counts.Confirmed.toString(),
            color: "#10B981",
          },
          {
            label: "In Progress",
            value: counts["In Progress"].toString(),
            color: "#22D3EE",
          },
          {
            label: "Cancelled",
            value: counts.Cancelled.toString(),
            color: "#EF4444",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#141419] border border-[#27272A] rounded-xl p-4"
          >
            <p className="text-[#52525B] text-xs mb-1">{s.label}</p>
            <p
              className="text-[#F5F5F7] text-2xl font-bold"
              style={{ color: s.color }}
            >
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Search + Tabs */}
      <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#27272A] flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-[#0B0B0F] border border-[#27272A] rounded-xl px-3 h-9 flex-1 max-w-xs focus-within:border-[#8B5CF6]/50 transition-colors">
            <Search className="w-4 h-4 text-[#52525B] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30"
                    : "text-[#52525B] hover:text-[#A1A1AA]"
                }`}
              >
                {tab}{" "}
                <span className="ml-1 opacity-60">
                  {counts[tab as keyof typeof counts]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272A]">
                {[
                  "Booking ID",
                  "Customer",
                  "Service",
                  "Stylist",
                  "Date & Time",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[#52525B] text-xs font-semibold uppercase tracking-wider px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-[#27272A]/50 hover:bg-[#1C1C22] transition-colors group"
                  >
                    <td className="px-4 py-3.5">
                      <span className="text-[#8B5CF6] text-sm font-medium">
                        {b.id}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B5CF6]/30 to-[#22D3EE]/30 flex items-center justify-center text-[#F5F5F7] text-xs font-bold flex-shrink-0">
                          {b.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[#F5F5F7] text-sm font-medium">
                            {b.customer}
                          </p>
                          <p className="text-[#52525B] text-xs">{b.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-[#F5F5F7] text-sm">{b.service}</p>
                      <p className="text-[#52525B] text-xs">{b.duration}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Scissors className="w-3.5 h-3.5 text-[#52525B]" />
                        <span className="text-[#A1A1AA] text-sm">
                          {b.stylist}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-[#F5F5F7] text-sm">{b.date}</p>
                      <p className="text-[#52525B] text-xs">{b.time}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[#F5F5F7] text-sm font-semibold">
                        LKR {b.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {b.status === "pending" && (
                          <>
                            <button
                              className="w-7 h-7 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center hover:bg-[#10B981]/20 transition-colors"
                              title="Confirm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              className="w-7 h-7 rounded-lg bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center hover:bg-[#EF4444]/20 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="w-7 h-7 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center hover:bg-[#27272A] transition-colors"
                        >
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Calendar className="w-10 h-10 text-[#27272A] mx-auto mb-3" />
              <p className="text-[#52525B] text-sm">No bookings found</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[#F5F5F7] font-semibold">
                    {selectedBooking.id}
                  </p>
                  <StatusBadge status={selectedBooking.status} />
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-8 h-8 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center hover:bg-[#27272A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: User,
                    label: "Customer",
                    value: selectedBooking.customer,
                  },
                  {
                    icon: Scissors,
                    label: "Service",
                    value: `${selectedBooking.service} (${selectedBooking.duration})`,
                  },
                  {
                    icon: Scissors,
                    label: "Stylist",
                    value: selectedBooking.stylist,
                  },
                  {
                    icon: Calendar,
                    label: "Date & Time",
                    value: `${selectedBooking.date} at ${selectedBooking.time}`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 bg-[#1C1C22] rounded-xl"
                  >
                    <item.icon className="w-4 h-4 text-[#52525B] flex-shrink-0" />
                    <div>
                      <p className="text-[#52525B] text-xs">{item.label}</p>
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-[#27272A] flex items-center justify-between">
                <span className="text-[#F5F5F7] font-bold text-xl">
                  LKR {selectedBooking.amount.toLocaleString()}
                </span>
                <div className="flex gap-2">
                  {selectedBooking.status === "pending" && (
                    <button className="px-4 py-2 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                      Confirm
                    </button>
                  )}
                  <button className="px-4 py-2 rounded-xl bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-sm hover:text-[#F5F5F7] transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
