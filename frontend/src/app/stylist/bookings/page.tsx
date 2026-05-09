"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Phone,
  Plus,
  Scissors,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

type BookingStatus = "upcoming" | "in-progress" | "completed" | "cancelled";

interface Booking {
  id: number;
  client: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  status: BookingStatus;
  notes?: string;
  amount: number;
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 1,
    client: "Dilhani Perera",
    phone: "+94 77 123 4567",
    service: "Balayage + Toner",
    date: "Today",
    time: "09:00 AM",
    duration: "2h 30m",
    status: "completed",
    amount: 14500,
  },
  {
    id: 2,
    client: "Sanduni Fernando",
    phone: "+94 71 234 5678",
    service: "Cut & Blow Dry",
    date: "Today",
    time: "11:45 AM",
    duration: "1h",
    status: "completed",
    amount: 3200,
  },
  {
    id: 3,
    client: "Thilini Silva",
    phone: "+94 76 345 6789",
    service: "Keratin Treatment",
    date: "Today",
    time: "01:30 PM",
    duration: "2h",
    status: "in-progress",
    amount: 18000,
    notes: "Client prefers no heat above 200°C",
  },
  {
    id: 4,
    client: "Nadeesha Wickramasinghe",
    phone: "+94 78 456 7890",
    service: "Highlights",
    date: "Today",
    time: "03:45 PM",
    duration: "2h",
    status: "upcoming",
    amount: 9500,
  },
  {
    id: 5,
    client: "Chamari Jayawardena",
    phone: "+94 75 567 8901",
    service: "Colour & Style",
    date: "Today",
    time: "05:30 PM",
    duration: "1h 30m",
    status: "upcoming",
    amount: 7800,
  },
  {
    id: 6,
    client: "Malsha Bandara",
    phone: "+94 72 678 9012",
    service: "Deep Conditioning",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "1h",
    status: "upcoming",
    amount: 4500,
  },
  {
    id: 7,
    client: "Kushani Rajapaksa",
    phone: "+94 74 789 0123",
    service: "Brazilian Blowout",
    date: "Tomorrow",
    time: "12:00 PM",
    duration: "2h 30m",
    status: "upcoming",
    amount: 22000,
  },
  {
    id: 8,
    client: "Ayasha Dissanayake",
    phone: "+94 77 890 1234",
    service: "Cut & Style",
    date: "Wed, 22 Jan",
    time: "02:00 PM",
    duration: "1h",
    status: "upcoming",
    amount: 3800,
  },
  {
    id: 9,
    client: "Sachini G.",
    phone: "+94 71 901 2345",
    service: "Full Colour",
    date: "Thu, 23 Jan",
    time: "11:00 AM",
    duration: "2h",
    status: "upcoming",
    amount: 11000,
  },
  {
    id: 10,
    client: "Dilhani Perera",
    phone: "+94 77 123 4567",
    service: "Toner Refresh",
    date: "Fri, 24 Jan",
    time: "03:00 PM",
    duration: "45m",
    status: "upcoming",
    amount: 2800,
  },
];

const STATUS_FILTERS: { value: BookingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const statusStyle = (status: BookingStatus) => {
  if (status === "completed")
    return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
  if (status === "in-progress")
    return "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20";
  if (status === "cancelled")
    return "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20";
  return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
};

const statusLabel = (status: BookingStatus) => {
  if (status === "in-progress") return "In Progress";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function StylistBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all",
  );
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    client: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
    amount: "",
  });

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.client.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const markStatus = (id: number, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
    setSelectedBooking(null);
  };

  const addBooking = () => {
    if (
      !newBooking.client ||
      !newBooking.service ||
      !newBooking.date ||
      !newBooking.time
    )
      return;
    const next: Booking = {
      id: Date.now(),
      client: newBooking.client,
      phone: newBooking.phone || "+94 7X XXX XXXX",
      service: newBooking.service,
      date: newBooking.date,
      time: newBooking.time,
      duration: newBooking.duration || "1h",
      status: "upcoming",
      notes: newBooking.notes,
      amount: parseInt(newBooking.amount) || 0,
    };
    setBookings((prev) => [next, ...prev]);
    setNewBooking({
      client: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      duration: "",
      notes: "",
      amount: "",
    });
    setShowAddModal(false);
  };

  const stats = {
    today: bookings.filter((b) => b.date === "Today").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    inProgress: bookings.filter((b) => b.status === "in-progress").length,
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Today's Bookings",
            value: stats.today,
            color: "#22D3EE",
            icon: Calendar,
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            color: "#22D3EE",
            icon: Scissors,
          },
          {
            label: "Completed",
            value: stats.completed,
            color: "#10B981",
            icon: CheckCircle,
          },
          {
            label: "Upcoming",
            value: stats.upcoming,
            color: "#F59E0B",
            icon: Clock,
          },
        ].map((s, i) => (
          <motion.div key={s.label} {...fadeUp(0.05 * i)}>
            <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4 flex items-center gap-4 hover:border-[#3f3f46] transition-colors">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${s.color}15` }}
              >
                <s.icon
                  className="w-5 h-5"
                  style={{ color: s.color }}
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <p className="text-[#F5F5F7] text-2xl font-bold">{s.value}</p>
                <p className="text-[#52525B] text-xs">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <motion.div
        {...fadeUp(0.2)}
        className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
      >
        <div className="flex items-center gap-2 card-3d bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 w-full sm:w-64 focus-within:border-[#22D3EE]/50 transition-colors">
          <Search className="w-3.5 h-3.5 text-[#52525B] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search clients or services…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                statusFilter === f.value
                  ? "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/30"
                  : "bg-[#141419] text-[#A1A1AA] border-[#27272A] hover:border-[#3f3f46]"
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-[#22D3EE] text-[#0B0B0F] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#22D3EE]/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Booking
          </button>
        </div>
      </motion.div>

      {/* Bookings table */}
      <motion.div {...fadeUp(0.25)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#27272A]">
                  <th className="text-left text-[#52525B] font-medium text-xs uppercase tracking-wider px-5 py-3">
                    Client
                  </th>
                  <th className="text-left text-[#52525B] font-medium text-xs uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                    Service
                  </th>
                  <th className="text-left text-[#52525B] font-medium text-xs uppercase tracking-wider px-5 py-3">
                    Date & Time
                  </th>
                  <th className="text-left text-[#52525B] font-medium text-xs uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                    Duration
                  </th>
                  <th className="text-left text-[#52525B] font-medium text-xs uppercase tracking-wider px-5 py-3">
                    Status
                  </th>
                  <th className="text-right text-[#52525B] font-medium text-xs uppercase tracking-wider px-5 py-3 hidden lg:table-cell">
                    Amount
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]">
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-[#52525B] py-12 text-sm"
                    >
                      No bookings found
                    </td>
                  </tr>
                )}
                {filtered.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-[#1C1C22] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {booking.client.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[#F5F5F7] font-medium">
                            {booking.client}
                          </p>
                          <p className="text-[#52525B] text-[10px] flex items-center gap-1">
                            <Phone className="w-2.5 h-2.5" />
                            {booking.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#A1A1AA] hidden sm:table-cell">
                      {booking.service}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[#F5F5F7] text-xs">{booking.date}</p>
                      <p className="text-[#52525B] text-[10px]">
                        {booking.time}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-[#A1A1AA] text-xs hidden md:table-cell">
                      {booking.duration}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyle(booking.status)}`}
                      >
                        {statusLabel(booking.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-[#F5F5F7] text-xs font-medium hidden lg:table-cell">
                      LKR {booking.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-[#52525B] hover:text-[#22D3EE] transition-colors"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Booking detail modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
                <h3 className="text-[#F5F5F7] font-semibold">
                  Booking Details
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-[#52525B] hover:text-[#F5F5F7] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center text-white text-lg font-bold">
                    {selectedBooking.client.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] font-semibold">
                      {selectedBooking.client}
                    </p>
                    <p className="text-[#A1A1AA] text-xs">
                      {selectedBooking.phone}
                    </p>
                  </div>
                  <span
                    className={`ml-auto text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyle(selectedBooking.status)}`}
                  >
                    {statusLabel(selectedBooking.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Service", value: selectedBooking.service },
                    { label: "Date", value: selectedBooking.date },
                    { label: "Time", value: selectedBooking.time },
                    { label: "Duration", value: selectedBooking.duration },
                    {
                      label: "Amount",
                      value: `LKR ${selectedBooking.amount.toLocaleString()}`,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="bg-[#1C1C22] rounded-xl p-3"
                    >
                      <p className="text-[#52525B] text-[10px] uppercase tracking-wider">
                        {row.label}
                      </p>
                      <p className="text-[#F5F5F7] text-sm font-medium mt-0.5">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
                {selectedBooking.notes && (
                  <div className="bg-[#1C1C22] rounded-xl p-3">
                    <p className="text-[#52525B] text-[10px] uppercase tracking-wider mb-1">
                      Notes
                    </p>
                    <p className="text-[#A1A1AA] text-xs">
                      {selectedBooking.notes}
                    </p>
                  </div>
                )}
                {selectedBooking.status !== "completed" &&
                  selectedBooking.status !== "cancelled" && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() =>
                          markStatus(selectedBooking.id, "completed")
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 rounded-xl py-2.5 text-sm font-medium hover:bg-[#10B981]/20 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" /> Mark Complete
                      </button>
                      <button
                        onClick={() =>
                          markStatus(selectedBooking.id, "cancelled")
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 rounded-xl py-2.5 text-sm font-medium hover:bg-[#EF4444]/20 transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add booking modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
                <h3 className="text-[#F5F5F7] font-semibold">New Booking</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-[#52525B] hover:text-[#F5F5F7] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {[
                  {
                    key: "client",
                    label: "Client Name",
                    placeholder: "e.g. Dilhani Perera",
                  },
                  {
                    key: "phone",
                    label: "Phone",
                    placeholder: "+94 7X XXX XXXX",
                  },
                  {
                    key: "service",
                    label: "Service",
                    placeholder: "e.g. Balayage + Toner",
                  },
                  { key: "date", label: "Date", placeholder: "e.g. Tomorrow" },
                  { key: "time", label: "Time", placeholder: "e.g. 10:00 AM" },
                  {
                    key: "duration",
                    label: "Duration",
                    placeholder: "e.g. 1h 30m",
                  },
                  {
                    key: "amount",
                    label: "Amount (LKR)",
                    placeholder: "e.g. 5000",
                  },
                  {
                    key: "notes",
                    label: "Notes (optional)",
                    placeholder: "Any special instructions…",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={newBooking[field.key as keyof typeof newBooking]}
                      onChange={(e) =>
                        setNewBooking((p) => ({
                          ...p,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none focus:border-[#22D3EE]/50 transition-colors"
                    />
                  </div>
                ))}
                <button
                  onClick={addBooking}
                  className="w-full bg-[#22D3EE] text-[#0B0B0F] font-semibold py-2.5 rounded-xl hover:bg-[#22D3EE]/90 transition-colors mt-2"
                >
                  Add Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
