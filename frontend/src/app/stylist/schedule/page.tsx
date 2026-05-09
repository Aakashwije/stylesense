"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  Plus,
  Unlock,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const SHORT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

type SlotStatus = "available" | "booked" | "blocked" | "off";

interface Slot {
  day: number;
  hour: string;
  status: SlotStatus;
  client?: string;
  service?: string;
}

const INITIAL_SLOTS: Slot[] = [
  {
    day: 0,
    hour: "09:00",
    status: "booked",
    client: "Dilhani Perera",
    service: "Balayage + Toner",
  },
  {
    day: 0,
    hour: "10:00",
    status: "booked",
    client: "Dilhani Perera",
    service: "Balayage + Toner",
  },
  {
    day: 0,
    hour: "11:00",
    status: "booked",
    client: "Sanduni Fernando",
    service: "Cut & Blow Dry",
  },
  {
    day: 0,
    hour: "13:00",
    status: "booked",
    client: "Thilini Silva",
    service: "Keratin Treatment",
  },
  {
    day: 0,
    hour: "14:00",
    status: "booked",
    client: "Thilini Silva",
    service: "Keratin Treatment",
  },
  {
    day: 0,
    hour: "15:00",
    status: "booked",
    client: "Nadeesha Wickramasinghe",
    service: "Highlights",
  },
  {
    day: 0,
    hour: "16:00",
    status: "booked",
    client: "Nadeesha Wickramasinghe",
    service: "Highlights",
  },
  {
    day: 0,
    hour: "17:00",
    status: "booked",
    client: "Chamari Jayawardena",
    service: "Colour & Style",
  },
  {
    day: 1,
    hour: "10:00",
    status: "booked",
    client: "Malsha Bandara",
    service: "Deep Conditioning",
  },
  {
    day: 1,
    hour: "12:00",
    status: "booked",
    client: "Kushani Rajapaksa",
    service: "Brazilian Blowout",
  },
  {
    day: 1,
    hour: "13:00",
    status: "booked",
    client: "Kushani Rajapaksa",
    service: "Brazilian Blowout",
  },
  {
    day: 1,
    hour: "14:00",
    status: "booked",
    client: "Kushani Rajapaksa",
    service: "Brazilian Blowout",
  },
  {
    day: 2,
    hour: "14:00",
    status: "booked",
    client: "Ayasha Dissanayake",
    service: "Cut & Style",
  },
  {
    day: 3,
    hour: "11:00",
    status: "booked",
    client: "Sachini G.",
    service: "Full Colour",
  },
  {
    day: 3,
    hour: "12:00",
    status: "booked",
    client: "Sachini G.",
    service: "Full Colour",
  },
  {
    day: 4,
    hour: "15:00",
    status: "booked",
    client: "Dilhani Perera",
    service: "Toner Refresh",
  },
  { day: 5, hour: "08:00", status: "blocked" },
  { day: 5, hour: "09:00", status: "blocked" },
  { day: 6, hour: "08:00", status: "off" },
  { day: 6, hour: "09:00", status: "off" },
  { day: 6, hour: "10:00", status: "off" },
  { day: 6, hour: "11:00", status: "off" },
  { day: 6, hour: "12:00", status: "off" },
  { day: 6, hour: "13:00", status: "off" },
  { day: 6, hour: "14:00", status: "off" },
  { day: 6, hour: "15:00", status: "off" },
  { day: 6, hour: "16:00", status: "off" },
  { day: 6, hour: "17:00", status: "off" },
  { day: 6, hour: "18:00", status: "off" },
  { day: 6, hour: "19:00", status: "off" },
];

const AVAILABILITY: Record<number, boolean> = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: false,
};

// Build the week label starting from today
function getWeekDates(offset: number) {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1 + offset * 7);
  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

const slotStyle = (status: SlotStatus) => {
  if (status === "booked")
    return "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-[#22D3EE]";
  if (status === "blocked")
    return "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]";
  if (status === "off")
    return "bg-[#27272A]/60 border-[#27272A] text-[#52525B]";
  return "bg-[#1C1C22] border-[#27272A] text-[#52525B] hover:bg-[#22D3EE]/5 hover:border-[#22D3EE]/20 cursor-pointer";
};

export default function StylistSchedulePage() {
  const [slots, setSlots] = useState<Slot[]>(INITIAL_SLOTS);
  const [weekOffset, setWeekOffset] = useState(0);
  const [availability, setAvailability] = useState(AVAILABILITY);
  const [tooltip, setTooltip] = useState<Slot | null>(null);

  const weekDates = getWeekDates(weekOffset);

  const getSlot = (day: number, hour: string) =>
    slots.find((s) => s.day === day && s.hour === hour);

  const toggleBlock = (day: number, hour: string) => {
    const existing = getSlot(day, hour);
    if (existing && (existing.status === "booked" || existing.status === "off"))
      return;
    if (existing && existing.status === "blocked") {
      setSlots((p) => p.filter((s) => !(s.day === day && s.hour === hour)));
    } else if (!existing) {
      setSlots((p) => [...p, { day, hour, status: "blocked" }]);
    }
  };

  const toggleDayAvailability = (day: number) => {
    setAvailability((p) => {
      const next = { ...p, [day]: !p[day] };
      if (!next[day]) {
        setSlots((s) => [
          ...s.filter((sl) => !(sl.day === day && sl.status === "available")),
          ...HOURS.filter(
            (h) => !slots.find((sl) => sl.day === day && sl.hour === h),
          ).map((h) => ({ day, hour: h, status: "off" as SlotStatus })),
        ]);
      } else {
        setSlots((s) =>
          s.filter((sl) => !(sl.day === day && sl.status === "off")),
        );
      }
      return next;
    });
  };

  const stats = {
    booked: slots.filter((s) => s.status === "booked").length,
    available:
      DAYS.length * HOURS.length -
      slots.filter(
        (s) =>
          s.status === "booked" || s.status === "blocked" || s.status === "off",
      ).length,
    blocked: slots.filter((s) => s.status === "blocked").length,
    daysOff: DAYS.filter((_, i) => !availability[i]).length,
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Booked Slots",
            value: stats.booked,
            color: "#22D3EE",
            icon: Clock,
          },
          {
            label: "Available Slots",
            value: stats.available,
            color: "#10B981",
            icon: Plus,
          },
          {
            label: "Blocked Slots",
            value: stats.blocked,
            color: "#EF4444",
            icon: Lock,
          },
          {
            label: "Days Off",
            value: stats.daysOff,
            color: "#52525B",
            icon: Unlock,
          },
        ].map((s, i) => (
          <motion.div key={s.label} {...fadeUp(0.05 * i)}>
            <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4 flex items-center gap-3 hover:border-[#3f3f46] transition-colors">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${s.color}15` }}
              >
                <s.icon
                  className="w-4 h-4"
                  style={{ color: s.color }}
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <p className="text-[#F5F5F7] text-xl font-bold">{s.value}</p>
                <p className="text-[#52525B] text-[10px]">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Week navigation */}
      <motion.div {...fadeUp(0.2)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#27272A]">
            <button
              onClick={() => setWeekOffset((w) => w - 1)}
              className="w-8 h-8 rounded-lg bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center">
              <p className="text-[#F5F5F7] text-sm font-semibold">
                {weekDates[0].toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}{" "}
                –{" "}
                {weekDates[6].toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              {weekOffset === 0 && (
                <p className="text-[#22D3EE] text-[10px]">This week</p>
              )}
            </div>
            <button
              onClick={() => setWeekOffset((w) => w + 1)}
              className="w-8 h-8 rounded-lg bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-5 py-2 border-b border-[#27272A] bg-[#0B0B0F]/30 flex-wrap">
            {[
              { color: "#22D3EE", label: "Booked" },
              { color: "#10B981", label: "Available (click to block)" },
              { color: "#EF4444", label: "Blocked (click to unblock)" },
              { color: "#52525B", label: "Day off" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: l.color }}
                />
                <span className="text-[#52525B] text-[10px]">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Day headers */}
              <div
                className="grid border-b border-[#27272A]"
                style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}
              >
                <div className="py-2" />
                {DAYS.map((day, i) => (
                  <div
                    key={day}
                    className="py-2 px-2 border-l border-[#27272A]"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#F5F5F7] text-xs font-medium">
                          {SHORT_DAYS[i]}
                        </p>
                        <p className="text-[#52525B] text-[10px]">
                          {weekDates[i].toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleDayAvailability(i)}
                        title={
                          availability[i]
                            ? "Mark as day off"
                            : "Mark as working day"
                        }
                        className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                          availability[i]
                            ? "text-[#10B981] hover:text-[#EF4444]"
                            : "text-[#52525B] hover:text-[#10B981]"
                        }`}
                      >
                        {availability[i] ? (
                          <Unlock className="w-3 h-3" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Time rows */}
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="grid border-b border-[#27272A] last:border-b-0"
                  style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}
                >
                  <div className="flex items-center justify-end pr-3 py-1.5">
                    <span className="text-[#52525B] text-[10px]">{hour}</span>
                  </div>
                  {DAYS.map((_, dayIdx) => {
                    const slot = getSlot(dayIdx, hour);
                    const status: SlotStatus = slot?.status ?? "available";
                    return (
                      <div
                        key={dayIdx}
                        className={`border-l border-[#27272A] py-1 px-1.5`}
                        onClick={() =>
                          (status === "available" || status === "blocked") &&
                          toggleBlock(dayIdx, hour)
                        }
                      >
                        <div
                          className={`h-7 rounded border text-[10px] font-medium flex items-center justify-center transition-all ${slotStyle(status)}`}
                          onMouseEnter={() =>
                            slot && slot.status === "booked"
                              ? setTooltip(slot)
                              : undefined
                          }
                          onMouseLeave={() => setTooltip(null)}
                        >
                          {status === "booked" && (
                            <span className="truncate px-1">
                              {slot?.client?.split(" ")[0]}
                            </span>
                          )}
                          {status === "blocked" && (
                            <Lock className="w-2.5 h-2.5" />
                          )}
                          {status === "off" && "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tooltip */}
      {tooltip && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1C1C22] border border-[#27272A] rounded-xl px-4 py-2.5 shadow-xl z-50 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#22D3EE] flex-shrink-0" />
          <div>
            <p className="text-[#F5F5F7] text-xs font-semibold">
              {tooltip.client}
            </p>
            <p className="text-[#A1A1AA] text-[10px]">
              {tooltip.service} · Day {tooltip.day + 1}, {tooltip.hour}
            </p>
          </div>
        </div>
      )}

      {/* Availability toggle cards */}
      <motion.div {...fadeUp(0.3)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <h3 className="text-[#F5F5F7] font-semibold text-sm mb-4">
            Weekly Availability
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {DAYS.map((day, i) => (
              <button
                key={day}
                onClick={() => toggleDayAvailability(i)}
                className={`rounded-xl p-3 border text-center transition-all ${
                  availability[i]
                    ? "bg-[#22D3EE]/10 border-[#22D3EE]/30 text-[#22D3EE]"
                    : "bg-[#1C1C22] border-[#27272A] text-[#52525B]"
                }`}
              >
                <p className="text-xs font-semibold">{SHORT_DAYS[i]}</p>
                <p
                  className={`text-[10px] mt-0.5 ${availability[i] ? "text-[#22D3EE]" : "text-[#52525B]"}`}
                >
                  {availability[i] ? "Working" : "Day off"}
                </p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
