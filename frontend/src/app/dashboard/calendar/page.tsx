"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Scissors,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 12 }, (_, i) => `${i + 9}:00`);

const EVENTS: Record<
  string,
  {
    id: number;
    customer: string;
    service: string;
    stylist: string;
    color: string;
    duration: number;
  }[]
> = {
  "2025-05-08": [
    {
      id: 1,
      customer: "Dilhani Perera",
      service: "Keratin Treatment",
      stylist: "Shenali R.",
      color: "#8B5CF6",
      duration: 90,
    },
    {
      id: 2,
      customer: "Sanduni Fernando",
      service: "Bridal Package",
      stylist: "Dinara S.",
      color: "#E8B4B8",
      duration: 180,
    },
  ],
  "2025-05-09": [
    {
      id: 3,
      customer: "Thilini Silva",
      service: "Balayage Color",
      stylist: "Kasun P.",
      color: "#22D3EE",
      duration: 150,
    },
    {
      id: 4,
      customer: "Nadeesha Wickramasinghe",
      service: "Facial",
      stylist: "Dinara S.",
      color: "#10B981",
      duration: 60,
    },
  ],
  "2025-05-10": [
    {
      id: 5,
      customer: "Malsha Bandara",
      service: "Hair Cut",
      stylist: "Shenali R.",
      color: "#8B5CF6",
      duration: 45,
    },
  ],
  "2025-05-12": [
    {
      id: 6,
      customer: "Chamari Jayawardena",
      service: "Manicure + Pedicure",
      stylist: "Dinara S.",
      color: "#F59E0B",
      duration: 75,
    },
    {
      id: 7,
      customer: "Dilhani Perera",
      service: "Hair Color",
      stylist: "Kasun P.",
      color: "#22D3EE",
      duration: 120,
    },
  ],
  "2025-05-14": [
    {
      id: 8,
      customer: "Sanduni Fernando",
      service: "Spa Treatment",
      stylist: "Shenali R.",
      color: "#8B5CF6",
      duration: 90,
    },
  ],
  "2025-05-17": [
    {
      id: 9,
      customer: "Thilini Silva",
      service: "Keratin",
      stylist: "Shenali R.",
      color: "#8B5CF6",
      duration: 90,
    },
    {
      id: 10,
      customer: "Malsha Bandara",
      service: "Bridal Trial",
      stylist: "Dinara S.",
      color: "#E8B4B8",
      duration: 120,
    },
    {
      id: 11,
      customer: "Nadeesha Wickramasinghe",
      service: "Hair Cut",
      stylist: "Kasun P.",
      color: "#22D3EE",
      duration: 45,
    },
  ],
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(4); // May
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState<string | null>("2025-05-08");
  const [showNew, setShowNew] = useState(false);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1,
  );

  const prevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else setMonth((m) => m + 1);
  };

  const dateKey = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const selectedEvents = selectedDate ? EVENTS[selectedDate] || [] : [];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar */}
        <div className="flex-1 min-w-0">
          {/* Controls */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="w-8 h-8 rounded-xl bg-[#141419] border border-[#27272A] text-[#A1A1AA] flex items-center justify-center hover:border-[#3f3f46]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <p className="text-[#F5F5F7] font-semibold text-lg min-w-[160px] text-center">
                {MONTH_NAMES[month]} {year}
              </p>
              <button
                onClick={nextMonth}
                className="w-8 h-8 rounded-xl bg-[#141419] border border-[#27272A] text-[#A1A1AA] flex items-center justify-center hover:border-[#3f3f46]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 bg-[#141419] border border-[#27272A] rounded-xl p-1">
                {(["month", "week"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 h-7 rounded-lg text-xs font-medium capitalize transition-all ${view === v ? "bg-[#8B5CF6]/15 text-[#8B5CF6]" : "text-[#52525B] hover:text-[#A1A1AA]"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowNew(true)}
                className="flex items-center gap-1.5 px-3 h-9 rounded-xl bg-[#8B5CF6] text-white text-xs font-medium hover:bg-[#7C3AED] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                New Booking
              </button>
            </div>
          </div>

          {/* Month grid */}
          <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-7 border-b border-[#27272A]">
              {DAYS_SHORT.map((d) => (
                <div
                  key={d}
                  className="py-3 text-center text-[#52525B] text-xs font-medium"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                if (!day)
                  return (
                    <div
                      key={`e-${i}`}
                      className="min-h-[100px] border-b border-r border-[#27272A]/40"
                    />
                  );
                const dk = dateKey(day);
                const events = EVENTS[dk] || [];
                const isToday = dk === todayKey;
                const isSelected = dk === selectedDate;
                return (
                  <motion.div
                    key={dk}
                    whileHover={{ backgroundColor: "#1C1C22" }}
                    onClick={() => setSelectedDate(dk)}
                    className={`min-h-[100px] border-b border-r border-[#27272A]/40 p-2 cursor-pointer transition-colors ${isSelected ? "bg-[#8B5CF6]/5 border-[#8B5CF6]/20" : ""}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${isToday ? "bg-[#8B5CF6] text-white" : "text-[#A1A1AA]"}`}
                    >
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {events.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="text-[9px] font-medium px-1.5 py-0.5 rounded truncate"
                          style={{
                            background: `${ev.color}20`,
                            color: ev.color,
                          }}
                        >
                          {ev.customer.split(" ")[0]}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <p className="text-[#52525B] text-[9px] pl-1">
                          +{events.length - 2} more
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Day detail panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-80 flex-shrink-0"
        >
          <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden sticky top-6">
            <div className="p-4 border-b border-[#27272A]">
              <p className="text-[#F5F5F7] font-semibold">
                {selectedDate
                  ? new Date(selectedDate + "T00:00:00").toLocaleDateString(
                      "en-IN",
                      { weekday: "long", month: "short", day: "numeric" },
                    )
                  : "Select a date"}
              </p>
              <p className="text-[#52525B] text-xs">
                {selectedEvents.length} appointment
                {selectedEvents.length !== 1 ? "s" : ""}
              </p>
            </div>

            {selectedEvents.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#1C1C22] flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-[#52525B]" />
                </div>
                <p className="text-[#52525B] text-sm">
                  No bookings on this day
                </p>
                <button
                  onClick={() => setShowNew(true)}
                  className="mt-3 text-[#8B5CF6] text-xs hover:underline"
                >
                  + Add booking
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#27272A]/50 max-h-[500px] overflow-y-auto">
                {selectedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 hover:bg-[#1C1C22] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: ev.color }}
                      />
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {ev.customer}
                      </p>
                    </div>
                    <div className="ml-4 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Scissors className="w-3 h-3 text-[#52525B]" />
                        <span className="text-[#A1A1AA] text-xs">
                          {ev.service}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-[#52525B]" />
                        <span className="text-[#A1A1AA] text-xs">
                          {ev.stylist}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#52525B]" />
                        <span className="text-[#A1A1AA] text-xs">
                          {ev.duration} min
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 ml-4 flex gap-1.5">
                      <button className="text-[10px] px-2 py-0.5 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/20 transition-colors">
                        Reschedule
                      </button>
                      <button className="text-[10px] px-2 py-0.5 rounded-lg bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/20 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Slot blocking legend */}
          <div className="mt-4 bg-[#141419] border border-[#27272A] rounded-2xl p-4">
            <p className="text-[#52525B] text-xs uppercase tracking-wider mb-3">
              Slot Status
            </p>
            <div className="space-y-2">
              {[
                { color: "#8B5CF6", label: "Shenali Rodrigo — 2 slots free" },
                { color: "#22D3EE", label: "Kasun Perera — 3 slots free" },
                { color: "#E8B4B8", label: "Dinara Silva — 1 slot free" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: s.color }}
                  />
                  <span className="text-[#A1A1AA] text-xs">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[#52525B] text-[10px] mt-3">
              Booked slots are automatically blocked to prevent double-bookings.
            </p>
          </div>
        </motion.div>
      </div>

      {/* New booking modal */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNew(false)}
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
                <p className="text-[#F5F5F7] font-semibold">New Booking</p>
                <button
                  onClick={() => setShowNew(false)}
                  className="w-8 h-8 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {["Customer Name", "Phone Number"].map((label) => (
                  <div key={label}>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      {label}
                    </label>
                    <input
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] placeholder:text-[#3f3f46] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                      placeholder={label}
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      Date
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedDate || ""}
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      Time
                    </label>
                    <input
                      type="time"
                      defaultValue="10:00"
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Service
                  </label>
                  <select className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors appearance-none">
                    <option>Keratin Treatment</option>
                    <option>Hair Cut</option>
                    <option>Balayage Color</option>
                    <option>Bridal Package</option>
                    <option>Luxury Facial</option>
                    <option>Manicure + Pedicure</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Stylist
                  </label>
                  <select className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors appearance-none">
                    <option>Shenali Rodrigo</option>
                    <option>Kasun Perera</option>
                    <option>Dinara Silva</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 p-3 bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl">
                <p className="text-[#10B981] text-xs">
                  Slot availability is automatically checked. Conflicting times
                  will be blocked.
                </p>
              </div>
              <button className="w-full mt-4 py-3 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                Confirm Booking
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
