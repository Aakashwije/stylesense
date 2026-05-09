"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const STYLISTS = ["Shenali Rodrigo", "Kasun Perera", "Dinara Silva"];
const STYLIST_INITIALS = ["SR", "KP", "DS"];
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
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type SlotState = "booked" | "available" | "off";

interface Slot {
  state: SlotState;
  client?: string;
  service?: string;
}

// Generate a realistic weekly schedule
function genSchedule(): Record<string, Record<string, Record<string, Slot>>> {
  const bookings = [
    {
      stylist: 0,
      day: 0,
      hour: "09:00",
      client: "Dilhani Perera",
      service: "Balayage",
    },
    {
      stylist: 0,
      day: 0,
      hour: "10:00",
      client: "Dilhani Perera",
      service: "Balayage (cont.)",
    },
    {
      stylist: 0,
      day: 0,
      hour: "11:00",
      client: "Dilhani Perera",
      service: "Balayage (cont.)",
    },
    {
      stylist: 0,
      day: 0,
      hour: "13:00",
      client: "Sanduni Fernando",
      service: "Haircut & Style",
    },
    {
      stylist: 0,
      day: 1,
      hour: "09:00",
      client: "Thilini Silva",
      service: "Colour",
    },
    {
      stylist: 0,
      day: 1,
      hour: "10:00",
      client: "Thilini Silva",
      service: "Colour (cont.)",
    },
    {
      stylist: 0,
      day: 1,
      hour: "14:00",
      client: "Nadeesha W.",
      service: "Highlights",
    },
    {
      stylist: 0,
      day: 1,
      hour: "15:00",
      client: "Nadeesha W.",
      service: "Highlights (cont.)",
    },
    {
      stylist: 0,
      day: 2,
      hour: "09:00",
      client: "Chamari J.",
      service: "Blowout",
    },
    {
      stylist: 0,
      day: 2,
      hour: "11:00",
      client: "Malsha Bandara",
      service: "Keratin",
    },
    {
      stylist: 0,
      day: 2,
      hour: "12:00",
      client: "Malsha Bandara",
      service: "Keratin (cont.)",
    },
    {
      stylist: 0,
      day: 4,
      hour: "10:00",
      client: "Kushani R.",
      service: "Cut & Colour",
    },
    {
      stylist: 0,
      day: 4,
      hour: "11:00",
      client: "Kushani R.",
      service: "Cut & Colour (cont.)",
    },
    {
      stylist: 0,
      day: 5,
      hour: "09:00",
      client: "Ayasha D.",
      service: "Balayage",
    },
    {
      stylist: 0,
      day: 5,
      hour: "10:00",
      client: "Ayasha D.",
      service: "Balayage (cont.)",
    },
    {
      stylist: 0,
      day: 5,
      hour: "11:00",
      client: "Walk-in",
      service: "Haircut",
    },
    {
      stylist: 0,
      day: 5,
      hour: "13:00",
      client: "Dilhani Perera",
      service: "Colour",
    },
    {
      stylist: 1,
      day: 0,
      hour: "09:00",
      client: "Walk-in",
      service: "Haircut",
    },
    {
      stylist: 1,
      day: 0,
      hour: "11:00",
      client: "Sanduni Fernando",
      service: "Highlights",
    },
    {
      stylist: 1,
      day: 0,
      hour: "12:00",
      client: "Sanduni Fernando",
      service: "Highlights (cont.)",
    },
    {
      stylist: 1,
      day: 1,
      hour: "10:00",
      client: "Walk-in",
      service: "Blowout",
    },
    {
      stylist: 1,
      day: 1,
      hour: "14:00",
      client: "Thilini Silva",
      service: "Haircut",
    },
    {
      stylist: 1,
      day: 2,
      hour: "09:00",
      client: "Walk-in",
      service: "Haircut",
    },
    { stylist: 1, day: 2, hour: "10:00", client: "Walk-in", service: "Style" },
    {
      stylist: 1,
      day: 3,
      hour: "11:00",
      client: "Chamari J.",
      service: "Colour",
    },
    {
      stylist: 1,
      day: 3,
      hour: "12:00",
      client: "Chamari J.",
      service: "Colour (cont.)",
    },
    {
      stylist: 1,
      day: 5,
      hour: "09:00",
      client: "Walk-in",
      service: "Haircut",
    },
    {
      stylist: 1,
      day: 5,
      hour: "11:00",
      client: "Nadeesha W.",
      service: "Blowout",
    },
    {
      stylist: 2,
      day: 0,
      hour: "10:00",
      client: "Thilini Silva",
      service: "Keratin",
    },
    {
      stylist: 2,
      day: 0,
      hour: "11:00",
      client: "Thilini Silva",
      service: "Keratin (cont.)",
    },
    {
      stylist: 2,
      day: 0,
      hour: "12:00",
      client: "Thilini Silva",
      service: "Keratin (cont.)",
    },
    {
      stylist: 2,
      day: 1,
      hour: "09:00",
      client: "Malsha Bandara",
      service: "Colour",
    },
    {
      stylist: 2,
      day: 2,
      hour: "13:00",
      client: "Walk-in",
      service: "Haircut",
    },
    {
      stylist: 2,
      day: 3,
      hour: "10:00",
      client: "Kushani R.",
      service: "Highlights",
    },
    {
      stylist: 2,
      day: 3,
      hour: "11:00",
      client: "Kushani R.",
      service: "Highlights (cont.)",
    },
    {
      stylist: 2,
      day: 4,
      hour: "09:00",
      client: "Ayasha D.",
      service: "Blowout",
    },
    {
      stylist: 2,
      day: 5,
      hour: "10:00",
      client: "Dilhani Perera",
      service: "Colour",
    },
    {
      stylist: 2,
      day: 5,
      hour: "11:00",
      client: "Dilhani Perera",
      service: "Colour (cont.)",
    },
  ];

  const schedule: Record<string, Record<string, Record<string, Slot>>> = {};
  // Sunday off for all
  const offDays = [
    [6], // Shenali: Sun off
    [6], // Kasun: Sun off
    [3, 6], // Dinara: Thu, Sun off
  ];

  for (let s = 0; s < 3; s++) {
    schedule[s] = {};
    for (let d = 0; d < 7; d++) {
      schedule[s][d] = {};
      for (const h of HOURS) {
        if (h < "08:00" || h >= "19:00") continue;
        if (offDays[s].includes(d)) {
          schedule[s][d][h] = { state: "off" };
        } else if (h === "12:00" && d < 5) {
          // Lunch break
          schedule[s][d][h] = { state: "off" };
        } else {
          schedule[s][d][h] = { state: "available" };
        }
      }
    }
  }

  for (const b of bookings) {
    if (schedule[b.stylist][b.day][b.hour]) {
      schedule[b.stylist][b.day][b.hour] = {
        state: "booked",
        client: b.client,
        service: b.service,
      };
    }
  }

  return schedule;
}

const SCHEDULE = genSchedule();

function calcUtilisation(stylistIdx: number): number {
  let booked = 0,
    available = 0;
  for (let d = 0; d < 7; d++) {
    for (const h of HOURS) {
      const slot = SCHEDULE[stylistIdx]?.[d]?.[h];
      if (!slot) continue;
      if (slot.state === "booked") booked++;
      if (slot.state === "available") available++;
    }
  }
  if (available + booked === 0) return 0;
  return Math.round((booked / (available + booked)) * 100);
}

export default function UtilisationPage() {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Mon view
  const [tooltip, setTooltip] = useState<{
    stylist: string;
    hour: string;
    slot: Slot;
  } | null>(null);

  const weekLabel = "13–19 Jan 2026";

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">
            Staff Utilisation
          </h1>
          <p className="text-[#52525B] text-sm">
            Hourly heatmap · Week of {weekLabel}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-xs">
            {[
              ["#10B981", "Booked"],
              ["#1C1C22", "Available"],
              ["#EF4444", "Off / Break"],
            ].map(([color, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[#52525B]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Utilisation KPIs */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-3 gap-3">
        {STYLISTS.map((name, i) => {
          const pct = calcUtilisation(i);
          return (
            <div
              key={name}
              className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[#F5F5F7] text-sm font-medium">
                    {name.split(" ")[0]}
                  </p>
                  <p className="text-[#52525B] text-xs">{name.split(" ")[1]}</p>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{
                    color:
                      pct >= 70 ? "#10B981" : pct >= 40 ? "#F59E0B" : "#EF4444",
                  }}
                >
                  {pct}%
                </span>
              </div>
              <div className="h-1.5 bg-[#1C1C22] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor:
                      pct >= 70 ? "#10B981" : pct >= 40 ? "#F59E0B" : "#EF4444",
                  }}
                />
              </div>
              <p className="text-[#52525B] text-[10px] mt-1">
                utilisation this week
              </p>
            </div>
          );
        })}
      </motion.div>

      {/* Day selector */}
      <motion.div {...fadeUp(0.08)}>
        <div className="flex gap-1.5 flex-wrap">
          {DAYS.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className={`h-9 px-4 rounded-xl border text-xs font-semibold transition-colors ${selectedDay === i ? "bg-[#8B5CF6] border-[#8B5CF6] text-white" : "bg-[#141419] border-[#27272A] text-[#A1A1AA] hover:border-[#3f3f46]"}`}
            >
              {day}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Heatmap grid */}
      <motion.div {...fadeUp(0.1)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#27272A]">
                  <th className="text-left text-[#52525B] font-semibold px-4 py-3 w-16">
                    Time
                  </th>
                  {STYLISTS.map((s, i) => (
                    <th
                      key={s}
                      className="text-center text-[#52525B] font-semibold px-2 py-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] text-[10px] font-bold mx-auto mb-1">
                        {STYLIST_INITIALS[i]}
                      </div>
                      <span className="text-[10px] whitespace-nowrap">
                        {s.split(" ")[0]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]">
                {HOURS.map((hour) => (
                  <tr
                    key={hour}
                    className="hover:bg-[#0B0B0F]/30 transition-colors"
                  >
                    <td className="px-4 py-2 text-[#52525B] font-mono">
                      {hour}
                    </td>
                    {STYLISTS.map((stylist, si) => {
                      const slot = SCHEDULE[si]?.[selectedDay]?.[hour] ?? {
                        state: "off" as SlotState,
                      };
                      const bg =
                        slot.state === "booked"
                          ? "#10B981"
                          : slot.state === "available"
                            ? "#1C1C22"
                            : "#EF4444";
                      const opacity = slot.state === "available" ? "30" : "20";
                      return (
                        <td key={stylist} className="px-2 py-1.5 text-center">
                          <div
                            className="h-8 rounded-lg flex items-center justify-center mx-auto cursor-pointer transition-all hover:scale-105 relative"
                            style={{
                              backgroundColor: `${bg}${opacity}`,
                              border: `1px solid ${bg}30`,
                              minWidth: 80,
                            }}
                            onMouseEnter={() =>
                              setTooltip({ stylist, hour, slot })
                            }
                            onMouseLeave={() => setTooltip(null)}
                          >
                            {slot.state === "booked" && (
                              <span className="text-[#10B981] text-[9px] font-medium truncate px-1">
                                {slot.client?.split(" ")[0]}
                              </span>
                            )}
                            {slot.state === "off" && (
                              <span className="text-[#EF4444]/60 text-[9px]">
                                off
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Tooltip display */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 card-3d bg-[#141419] border border-[#27272A] rounded-xl px-4 py-3 z-20 shadow-xl max-w-xs"
        >
          <div className="flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-[#8B5CF6] mt-0.5 shrink-0" />
            <div>
              <p className="text-[#F5F5F7] text-xs font-semibold">
                {tooltip.stylist} · {tooltip.hour}
              </p>
              {tooltip.slot.state === "booked" && (
                <>
                  <p className="text-[#A1A1AA] text-xs mt-0.5">
                    Client: {tooltip.slot.client}
                  </p>
                  <p className="text-[#52525B] text-[10px]">
                    {tooltip.slot.service}
                  </p>
                </>
              )}
              {tooltip.slot.state === "available" && (
                <p className="text-[#10B981] text-xs mt-0.5">
                  Available for booking
                </p>
              )}
              {tooltip.slot.state === "off" && (
                <p className="text-[#EF4444] text-xs mt-0.5">Off / Break</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
