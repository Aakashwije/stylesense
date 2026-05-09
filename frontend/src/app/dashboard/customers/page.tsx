"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, Search, X } from "lucide-react";
import { useState } from "react";

const TIER_CONFIG: Record<string, { color: string; bg: string }> = {
  Bronze: { color: "#CD7F32", bg: "#CD7F32" },
  Silver: { color: "#A1A1AA", bg: "#A1A1AA" },
  Gold: { color: "#F59E0B", bg: "#F59E0B" },
  Platinum: { color: "#22D3EE", bg: "#22D3EE" },
};

const CUSTOMERS = [
  {
    id: 1,
    name: "Dilhani Perera",
    avatar: "DP",
    phone: "+94 77 123 4567",
    email: "dilhani@email.com",
    visits: 28,
    totalSpent: 84200,
    loyaltyPoints: 842,
    tier: "Gold",
    lastVisit: "Today",
    favStylest: "Shenali R.",
    tags: ["VIP", "Bridal"],
    joined: "Feb 2023",
    retentionRate: 94,
  },
  {
    id: 2,
    name: "Sanduni Fernando",
    avatar: "SF",
    phone: "+94 71 234 5678",
    email: "sanduni@email.com",
    visits: 41,
    totalSpent: 128000,
    loyaltyPoints: 1280,
    tier: "Platinum",
    lastVisit: "Yesterday",
    favStylest: "Dinara S.",
    tags: ["Regular", "Bridal", "VIP"],
    joined: "Oct 2022",
    retentionRate: 97,
  },
  {
    id: 3,
    name: "Thilini Silva",
    avatar: "TS",
    phone: "+94 76 345 6789",
    email: "thilini@email.com",
    visits: 12,
    totalSpent: 32600,
    loyaltyPoints: 326,
    tier: "Silver",
    lastVisit: "3 days ago",
    favStylest: "Kasun P.",
    tags: ["Regular"],
    joined: "Jan 2024",
    retentionRate: 82,
  },
  {
    id: 4,
    name: "Nadeesha Wickramasinghe",
    avatar: "NW",
    phone: "+94 78 456 7890",
    email: "nadeesha@email.com",
    visits: 7,
    totalSpent: 16400,
    loyaltyPoints: 164,
    tier: "Bronze",
    lastVisit: "1 week ago",
    favStylest: "Shenali R.",
    tags: ["New"],
    joined: "Apr 2024",
    retentionRate: 71,
  },
  {
    id: 5,
    name: "Chamari Jayawardena",
    avatar: "CJ",
    phone: "+94 72 567 8901",
    email: "chamari@email.com",
    visits: 19,
    totalSpent: 52800,
    loyaltyPoints: 528,
    tier: "Gold",
    lastVisit: "2 days ago",
    favStylest: "Shenali R.",
    tags: ["Regular"],
    joined: "Jun 2023",
    retentionRate: 89,
  },
  {
    id: 6,
    name: "Malsha Bandara",
    avatar: "MB",
    phone: "+94 75 678 9012",
    email: "malsha@email.com",
    visits: 33,
    totalSpent: 97600,
    loyaltyPoints: 976,
    tier: "Platinum",
    lastVisit: "Today",
    favStylest: "Kasun P.",
    tags: ["VIP", "Regular"],
    joined: "Mar 2023",
    retentionRate: 96,
  },
];

const APPT_HISTORY = [
  {
    date: "Today",
    service: "Keratin Treatment",
    stylist: "Shenali R.",
    amount: 3500,
    status: "Completed",
  },
  {
    date: "Apr 20",
    service: "Hair Cut + Styling",
    stylist: "Shenali R.",
    amount: 1200,
    status: "Completed",
  },
  {
    date: "Apr 5",
    service: "Balayage Color",
    stylist: "Kasun P.",
    amount: 4500,
    status: "Completed",
  },
  {
    date: "Mar 18",
    service: "Luxury Facial",
    stylist: "Dinara S.",
    amount: 2200,
    status: "Completed",
  },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [selected, setSelected] = useState<(typeof CUSTOMERS)[0] | null>(null);

  const tiers = ["All", "Platinum", "Gold", "Silver", "Bronze"];

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      !search || c.name.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === "All" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const totalCustomers = CUSTOMERS.length;
  const totalRevenue = CUSTOMERS.reduce((a, c) => a + c.totalSpent, 0);
  const avgSpend = Math.round(totalRevenue / totalCustomers);
  const vipCount = CUSTOMERS.filter((c) => c.tags.includes("VIP")).length;

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Customers",
            value: totalCustomers,
            suffix: "",
            color: "#8B5CF6",
          },
          {
            label: "Total Revenue",
            value: `LKR ${(totalRevenue / 1000).toFixed(0)}K`,
            suffix: "",
            color: "#22D3EE",
          },
          {
            label: "Avg. Spend",
            value: `LKR ${avgSpend.toLocaleString()}`,
            suffix: "",
            color: "#10B981",
          },
          {
            label: "VIP Clients",
            value: vipCount,
            suffix: "",
            color: "#F59E0B",
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
            <p className="text-[#F5F5F7] text-2xl font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 flex-1 focus-within:border-[#8B5CF6]/50 transition-colors">
          <Search className="w-4 h-4 text-[#52525B] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none w-full"
          />
        </div>
        <div className="flex gap-2">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3 h-9 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                tierFilter === t
                  ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30"
                  : "bg-[#141419] border border-[#27272A] text-[#52525B] hover:text-[#A1A1AA]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Customer table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272A]">
                {[
                  "Customer",
                  "Contact",
                  "Tier",
                  "Visits",
                  "Total Spent",
                  "Loyalty Pts",
                  "Last Visit",
                  "Retention",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-[#52525B] text-xs font-medium text-left px-4 py-3 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]/50">
              {filtered.map((c) => {
                const tier = TIER_CONFIG[c.tier];
                return (
                  <tr
                    key={c.id}
                    className="hover:bg-[#1C1C22]/60 transition-colors group cursor-pointer"
                    onClick={() => setSelected(c)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {c.avatar}
                        </div>
                        <div>
                          <p className="text-[#F5F5F7] text-sm font-medium">
                            {c.name}
                          </p>
                          <p className="text-[#52525B] text-xs">
                            Since {c.joined}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[#A1A1AA] text-xs">{c.phone}</p>
                      <p className="text-[#52525B] text-xs">{c.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          color: tier.color,
                          background: `${tier.bg}15`,
                          border: `1px solid ${tier.bg}30`,
                        }}
                      >
                        {c.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#F5F5F7] text-sm font-medium">
                      {c.visits}
                    </td>
                    <td className="px-4 py-3 text-[#F5F5F7] text-sm font-semibold">
                      LKR {(c.totalSpent / 1000).toFixed(0)}k
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#8B5CF6] text-sm font-medium">
                        {c.loyaltyPoints}
                      </span>
                      <span className="text-[#52525B] text-xs ml-1">pts</span>
                    </td>
                    <td className="px-4 py-3 text-[#A1A1AA] text-sm">
                      {c.lastVisit}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#1C1C22] rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-[#10B981]"
                            style={{ width: `${c.retentionRate}%` }}
                          />
                        </div>
                        <span className="text-[#10B981] text-xs font-medium">
                          {c.retentionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="h-7 px-2.5 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs border border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/20">
                          Promo
                        </button>
                        <button className="h-7 px-2.5 rounded-lg bg-[#1C1C22] text-[#A1A1AA] text-xs border border-[#27272A] hover:text-[#F5F5F7]">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Customer detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white font-bold">
                    {selected.avatar}
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] font-semibold">
                      {selected.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: TIER_CONFIG[selected.tier].color }}
                      >
                        {selected.tier}
                      </span>
                      {selected.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-[#1C1C22] text-[#52525B]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  {
                    label: "Total Spent",
                    value: `LKR ${(selected.totalSpent / 1000).toFixed(0)}k`,
                  },
                  { label: "Loyalty Pts", value: selected.loyaltyPoints },
                  { label: "Visits", value: selected.visits },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#1C1C22] rounded-xl p-3 text-center"
                  >
                    <p className="text-[#F5F5F7] font-bold text-lg">
                      {s.value}
                    </p>
                    <p className="text-[#52525B] text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Contact */}
              <div className="flex gap-3 mb-5">
                <div className="flex-1 bg-[#1C1C22] rounded-xl p-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#52525B]" />
                  <span className="text-[#A1A1AA] text-xs">
                    {selected.phone}
                  </span>
                </div>
                <div className="flex-1 bg-[#1C1C22] rounded-xl p-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#52525B]" />
                  <span className="text-[#A1A1AA] text-xs">
                    {selected.email}
                  </span>
                </div>
              </div>
              {/* Appointment history */}
              <p className="text-[#52525B] text-xs uppercase tracking-wider mb-3">
                Appointment History
              </p>
              <div className="space-y-2 mb-5">
                {APPT_HISTORY.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#1C1C22] rounded-xl px-3 py-2.5"
                  >
                    <span className="text-[#52525B] text-xs w-16 flex-shrink-0">
                      {a.date}
                    </span>
                    <span className="text-[#A1A1AA] text-xs flex-1">
                      {a.service} · {a.stylist}
                    </span>
                    <span className="text-[#10B981] text-xs font-semibold">
                      LKR {a.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                  Send Promo
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-sm hover:text-[#F5F5F7] transition-colors">
                  Add Loyalty Points
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
