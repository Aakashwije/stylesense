"use client";

import { motion } from "framer-motion";
import { Info, Send, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

type Segment = "Champions" | "Loyal" | "At Risk" | "Lost" | "New";

interface Client {
  id: string;
  name: string;
  phone: string;
  recency: number; // 1–5 (5 = most recent)
  frequency: number; // 1–5
  monetary: number; // 1–5
  totalSpend: number;
  lastVisit: string;
}

function calcSegment(c: Client): Segment {
  const total = c.recency + c.frequency + c.monetary;
  if (c.recency >= 4 && c.frequency >= 4 && c.monetary >= 4) return "Champions";
  if (c.frequency >= 4 && c.monetary >= 3) return "Loyal";
  if (c.recency <= 2 && c.frequency >= 3) return "At Risk";
  if (c.recency <= 2 && c.frequency <= 2) return "Lost";
  return "New";
}

const CLIENTS: Client[] = [
  {
    id: "cl1",
    name: "Dilhani Perera",
    phone: "+94 77 123 4567",
    recency: 5,
    frequency: 5,
    monetary: 5,
    totalSpend: 182000,
    lastVisit: "14 Jan 2026",
  },
  {
    id: "cl2",
    name: "Sanduni Fernando",
    phone: "+94 71 234 5678",
    recency: 4,
    frequency: 5,
    monetary: 4,
    totalSpend: 124000,
    lastVisit: "10 Jan 2026",
  },
  {
    id: "cl3",
    name: "Thilini Silva",
    phone: "+94 76 345 6789",
    recency: 3,
    frequency: 4,
    monetary: 4,
    totalSpend: 98000,
    lastVisit: "5 Jan 2026",
  },
  {
    id: "cl4",
    name: "Nadeesha Wickramasinghe",
    phone: "+94 78 456 7890",
    recency: 5,
    frequency: 4,
    monetary: 3,
    totalSpend: 87000,
    lastVisit: "13 Jan 2026",
  },
  {
    id: "cl5",
    name: "Chamari Jayawardena",
    phone: "+94 75 567 8901",
    recency: 2,
    frequency: 4,
    monetary: 3,
    totalSpend: 76000,
    lastVisit: "20 Dec 2025",
  },
  {
    id: "cl6",
    name: "Malsha Bandara",
    phone: "+94 72 678 9012",
    recency: 2,
    frequency: 3,
    monetary: 3,
    totalSpend: 54000,
    lastVisit: "15 Dec 2025",
  },
  {
    id: "cl7",
    name: "Kushani Rajapaksa",
    phone: "+94 74 789 0123",
    recency: 1,
    frequency: 2,
    monetary: 2,
    totalSpend: 32000,
    lastVisit: "5 Nov 2025",
  },
  {
    id: "cl8",
    name: "Ayasha Dissanayake",
    phone: "+94 77 890 1234",
    recency: 1,
    frequency: 1,
    monetary: 2,
    totalSpend: 18000,
    lastVisit: "1 Oct 2025",
  },
  {
    id: "cl9",
    name: "Ruwanthi Gamage",
    phone: "+94 71 901 2345",
    recency: 5,
    frequency: 1,
    monetary: 2,
    totalSpend: 12000,
    lastVisit: "12 Jan 2026",
  },
  {
    id: "cl10",
    name: "Hiruni Senanayake",
    phone: "+94 76 012 3456",
    recency: 5,
    frequency: 1,
    monetary: 1,
    totalSpend: 5500,
    lastVisit: "11 Jan 2026",
  },
];

const SEGMENT_CONFIG: Record<
  Segment,
  {
    color: string;
    description: string;
    action: string;
    icon: typeof TrendingUp;
  }
> = {
  Champions: {
    color: "#10B981",
    description: "High value regulars who visit often and spend the most.",
    action: "Reward them with loyalty perks & early access to new services.",
    icon: TrendingUp,
  },
  Loyal: {
    color: "#8B5CF6",
    description: "Frequent visitors with solid spending — your reliable core.",
    action: "Offer exclusive member discounts to maintain loyalty.",
    icon: TrendingUp,
  },
  "At Risk": {
    color: "#F59E0B",
    description: "Past frequent visitors who haven't returned recently.",
    action: "Send re-engagement SMS with a special comeback offer.",
    icon: TrendingDown,
  },
  Lost: {
    color: "#EF4444",
    description: "Low recency, low frequency — likely churned clients.",
    action: "Win-back email campaign with a generous LKR 1,000 credit.",
    icon: TrendingDown,
  },
  New: {
    color: "#22D3EE",
    description: "Recently acquired clients still building visit habits.",
    action: "Send a welcome email and follow-up booking reminder.",
    icon: TrendingUp,
  },
};

export default function RFMPage() {
  const [segFilter, setSegFilter] = useState<Segment | "All">("All");

  const withSegment = CLIENTS.map((c) => ({ ...c, segment: calcSegment(c) }));
  const segmentCounts = (Object.keys(SEGMENT_CONFIG) as Segment[]).reduce(
    (acc, s) => {
      acc[s] = withSegment.filter((c) => c.segment === s).length;
      return acc;
    },
    {} as Record<Segment, number>,
  );

  const filtered =
    segFilter === "All"
      ? withSegment
      : withSegment.filter((c) => c.segment === segFilter);

  function ScoreBar({ val }: { val: number }) {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: i <= val ? "#8B5CF6" : "#1C1C22" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-[#F5F5F7] text-xl font-bold">
          Client RFM Segmentation
        </h1>
        <p className="text-[#52525B] text-sm">
          Understand your clients based on Recency, Frequency & Monetary value
        </p>
      </motion.div>

      {/* RFM explanation */}
      <motion.div {...fadeUp(0.05)}>
        <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/15 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#F5F5F7] text-sm font-semibold mb-1">
                What is RFM?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#A1A1AA]">
                <p>
                  <span className="text-[#8B5CF6] font-semibold">
                    Recency (R)
                  </span>{" "}
                  — How recently did the client visit? Higher = more recent.
                </p>
                <p>
                  <span className="text-[#8B5CF6] font-semibold">
                    Frequency (F)
                  </span>{" "}
                  — How often do they visit? Higher = more frequent.
                </p>
                <p>
                  <span className="text-[#8B5CF6] font-semibold">
                    Monetary (M)
                  </span>{" "}
                  — How much do they spend? Higher = bigger spender.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Segment cards */}
      <motion.div
        {...fadeUp(0.08)}
        className="grid grid-cols-2 sm:grid-cols-5 gap-3"
      >
        {(
          Object.entries(SEGMENT_CONFIG) as [
            Segment,
            (typeof SEGMENT_CONFIG)[Segment],
          ][]
        ).map(([seg, cfg]) => (
          <button
            key={seg}
            onClick={() => setSegFilter(segFilter === seg ? "All" : seg)}
            className={`bg-[#141419] border rounded-2xl p-4 text-left transition-all ${segFilter === seg ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/5" : "border-[#27272A] hover:border-[#3f3f46]"}`}
          >
            <p className="font-bold text-2xl" style={{ color: cfg.color }}>
              {segmentCounts[seg]}
            </p>
            <p className="text-[#F5F5F7] text-xs font-semibold mt-0.5">{seg}</p>
            <p className="text-[#52525B] text-[10px] mt-1 leading-tight">
              {cfg.description.split(".")[0]}.
            </p>
          </button>
        ))}
      </motion.div>

      {/* Action recommendations */}
      {segFilter !== "All" && (
        <motion.div {...fadeUp(0.05)}>
          <div className="bg-[#141419] border border-[#27272A] rounded-2xl p-4 flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${SEGMENT_CONFIG[segFilter].color}15`,
              }}
            >
              <Send
                className="w-4 h-4"
                style={{ color: SEGMENT_CONFIG[segFilter].color }}
              />
            </div>
            <div>
              <p className="text-[#F5F5F7] text-sm font-semibold">
                Recommended action for {segFilter}
              </p>
              <p className="text-[#A1A1AA] text-xs mt-0.5">
                {SEGMENT_CONFIG[segFilter].action}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Client table */}
      <motion.div {...fadeUp(0.12)}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#F5F5F7] font-semibold text-sm">
            Client Scores — {segFilter === "All" ? "All Segments" : segFilter} (
            {filtered.length})
          </h3>
          <div className="flex gap-1.5">
            {["All", ...Object.keys(SEGMENT_CONFIG)].map((s) => (
              <button
                key={s}
                onClick={() => setSegFilter(s as Segment | "All")}
                className={`text-xs px-2.5 h-7 rounded-lg border transition-colors ${segFilter === s ? "bg-[#8B5CF6] border-[#8B5CF6] text-white" : "bg-[#141419] border-[#27272A] text-[#A1A1AA] hover:border-[#3f3f46]"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#27272A]">
                  {[
                    "Client",
                    "Recency",
                    "Frequency",
                    "Monetary",
                    "Score",
                    "Total Spend",
                    "Last Visit",
                    "Segment",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[#52525B] text-xs font-semibold px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]">
                {filtered.map((c) => {
                  const cfg = SEGMENT_CONFIG[c.segment];
                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-[#1C1C22] transition-colors"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] text-xs font-bold shrink-0">
                            {c.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-[#F5F5F7] text-sm font-medium whitespace-nowrap">
                              {c.name}
                            </p>
                            <p className="text-[#52525B] text-[10px]">
                              {c.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <ScoreBar val={c.recency} />
                      </td>
                      <td className="px-4 py-3.5">
                        <ScoreBar val={c.frequency} />
                      </td>
                      <td className="px-4 py-3.5">
                        <ScoreBar val={c.monetary} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-bold text-[#F5F5F7]">
                          {c.recency + c.frequency + c.monetary}
                        </span>
                        <span className="text-[#52525B] text-xs">/15</span>
                      </td>
                      <td className="px-4 py-3.5 text-[#A1A1AA]">
                        LKR {c.totalSpend.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-[#52525B] text-xs whitespace-nowrap">
                        {c.lastVisit}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                          style={{
                            backgroundColor: `${cfg.color}15`,
                            color: cfg.color,
                          }}
                        >
                          {c.segment}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
