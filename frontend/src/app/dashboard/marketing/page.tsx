"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Plus,
  Send,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

type CampaignType = "SMS" | "Email";
type CampaignStatus = "Active" | "Scheduled" | "Draft" | "Completed";

interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  audience: string;
  sent: number;
  opened: number;
  bookings: number;
  date: string;
}

const STATUS_COLORS: Record<CampaignStatus, string> = {
  Active: "#10B981",
  Scheduled: "#22D3EE",
  Draft: "#52525B",
  Completed: "#8B5CF6",
};

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    name: "January New Year Offer",
    type: "SMS",
    status: "Completed",
    audience: "All Clients",
    sent: 342,
    opened: 342,
    bookings: 28,
    date: "2 Jan 2026",
  },
  {
    id: "c2",
    name: "Balayage Spring Promo",
    type: "Email",
    status: "Active",
    audience: "Premium Members",
    sent: 185,
    opened: 112,
    bookings: 14,
    date: "10 Jan 2026",
  },
  {
    id: "c3",
    name: "Re-Engagement: 30-Day Inactive",
    type: "SMS",
    status: "Active",
    audience: "Inactive (30d)",
    sent: 67,
    opened: 67,
    bookings: 8,
    date: "8 Jan 2026",
  },
  {
    id: "c4",
    name: "Birthday Month Treat",
    type: "Email",
    status: "Scheduled",
    audience: "Jan Birthdays",
    sent: 0,
    opened: 0,
    bookings: 0,
    date: "15 Jan 2026",
  },
  {
    id: "c5",
    name: "Post-Visit Review Request",
    type: "Email",
    status: "Active",
    audience: "Recent Visitors",
    sent: 203,
    opened: 89,
    bookings: 0,
    date: "Ongoing",
  },
  {
    id: "c6",
    name: "Valentine's Day Package",
    type: "Email",
    status: "Draft",
    audience: "All Clients",
    sent: 0,
    opened: 0,
    bookings: 0,
    date: "—",
  },
];

interface AutoCampaign {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: CampaignType;
}

const INITIAL_AUTO: AutoCampaign[] = [
  {
    id: "a1",
    name: "Birthday Reminder",
    description:
      "Send a birthday message + 15% discount voucher to clients on their birthday.",
    enabled: true,
    type: "SMS",
  },
  {
    id: "a2",
    name: "30-Day Re-engagement",
    description:
      "Automatically SMS clients who haven't booked in 30 days with an incentive.",
    enabled: true,
    type: "SMS",
  },
  {
    id: "a3",
    name: "Post-Visit Review Request",
    description:
      "Email clients 24 hours after their appointment asking for a Google review.",
    enabled: true,
    type: "Email",
  },
  {
    id: "a4",
    name: "Appointment Reminder",
    description: "SMS reminder 2 hours before each scheduled appointment.",
    enabled: false,
    type: "SMS",
  },
  {
    id: "a5",
    name: "Loyalty Milestone",
    description:
      "Notify clients when they reach a new loyalty tier with a bonus reward.",
    enabled: false,
    type: "Email",
  },
];

const AUDIENCE_OPTIONS = [
  "All Clients",
  "Premium Members",
  "Inactive (30d)",
  "New Clients (90d)",
  "Loyalty Members",
  "Jan Birthdays",
  "Recent Visitors",
];
const TEMPLATES = [
  "Hi {name}, enjoy 15% off your next visit at Glamour Studio this month! Book at stylsense.lk",
  "Happy Birthday {name}! 🎂 Treat yourself — 20% off any service this month. Call +94 11 234 5678.",
  "We miss you at Glamour Studio! It's been a while since your last visit. Book now and get LKR 500 off. Reply STOP to unsubscribe.",
];

function CampaignModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (c: Campaign) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    type: "SMS" as CampaignType,
    audience: AUDIENCE_OPTIONS[0],
    date: "",
    body: TEMPLATES[0],
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A] sticky top-0 bg-[#141419]">
          <h3 className="text-[#F5F5F7] font-semibold">New Campaign</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#F5F5F7] hover:bg-[#1C1C22]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Campaign Name
            </label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Valentine's Day Offer"
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#52525B] text-xs mb-1 block">Type</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
              >
                <option>SMS</option>
                <option>Email</option>
              </select>
            </div>
            <div>
              <label className="text-[#52525B] text-xs mb-1 block">
                Audience
              </label>
              <select
                value={form.audience}
                onChange={(e) => set("audience", e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
              >
                {AUDIENCE_OPTIONS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Schedule Date
            </label>
            <input
              type="datetime-local"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
            />
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-2 block">
              Message Body
            </label>
            <textarea
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              rows={4}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 resize-none"
            />
            <p className="text-[#52525B] text-xs mt-1">Quick templates:</p>
            <div className="space-y-1 mt-1">
              {TEMPLATES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => set("body", t)}
                  className="w-full text-left text-xs text-[#52525B] hover:text-[#A1A1AA] bg-[#0B0B0F] rounded-lg px-2 py-1.5 transition-colors truncate"
                >
                  {t.slice(0, 70)}…
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({
                id: `c${Date.now()}`,
                name: form.name || "Untitled Campaign",
                type: form.type,
                status: form.date ? "Scheduled" : "Draft",
                audience: form.audience,
                sent: 0,
                opened: 0,
                bookings: 0,
                date: form.date
                  ? new Date(form.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "—",
              });
              onClose();
            }}
            className="flex-1 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Save Campaign
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [auto, setAuto] = useState<AutoCampaign[]>(INITIAL_AUTO);
  const [showModal, setShowModal] = useState(false);

  const totalSent = campaigns.reduce((a, c) => a + c.sent, 0);
  const totalOpen = campaigns
    .filter((c) => c.sent > 0)
    .reduce((a, c) => a + c.opened, 0);
  const totalSentNZ = campaigns
    .filter((c) => c.sent > 0)
    .reduce((a, c) => a + c.sent, 0);
  const avgOpenRate =
    totalSentNZ > 0 ? Math.round((totalOpen / totalSentNZ) * 100) : 0;
  const totalBookings = campaigns.reduce((a, c) => a + c.bookings, 0);

  const toggleAuto = (id: string) =>
    setAuto((a) =>
      a.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)),
    );

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">Marketing Hub</h1>
          <p className="text-[#52525B] text-sm">
            SMS & email campaigns to grow your salon
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        {...fadeUp(0.05)}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {[
          {
            label: "Total Sent This Month",
            value: totalSent.toLocaleString(),
            icon: Send,
            color: "#8B5CF6",
          },
          {
            label: "Avg Open Rate",
            value: `${avgOpenRate}%`,
            icon: TrendingUp,
            color: "#22D3EE",
          },
          {
            label: "Bookings from Campaigns",
            value: totalBookings,
            icon: Users,
            color: "#10B981",
          },
        ].map((k, i) => (
          <motion.div key={k.label} {...fadeUp(0.04 * i)}>
            <div className="bg-[#141419] border border-[#27272A] rounded-2xl p-4 hover:border-[#3f3f46] transition-colors">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${k.color}15` }}
              >
                <k.icon
                  className="w-4 h-4"
                  style={{ color: k.color }}
                  strokeWidth={1.75}
                />
              </div>
              <p className="text-[#F5F5F7] font-bold text-2xl">{k.value}</p>
              <p className="text-[#52525B] text-xs mt-0.5">{k.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Campaigns table */}
      <motion.div {...fadeUp(0.1)}>
        <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3">
          All Campaigns
        </h3>
        <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#27272A]">
                  {[
                    "Campaign",
                    "Type",
                    "Status",
                    "Audience",
                    "Sent",
                    "Open Rate",
                    "Bookings",
                    "Date",
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
                {campaigns.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-[#1C1C22] transition-colors"
                  >
                    <td className="px-4 py-3.5 font-medium text-[#F5F5F7] whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1.5 text-[#A1A1AA] text-xs">
                        {c.type === "SMS" ? (
                          <MessageSquare className="w-3.5 h-3.5" />
                        ) : (
                          <Mail className="w-3.5 h-3.5" />
                        )}
                        {c.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${STATUS_COLORS[c.status]}15`,
                          color: STATUS_COLORS[c.status],
                        }}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#A1A1AA] text-xs whitespace-nowrap">
                      {c.audience}
                    </td>
                    <td className="px-4 py-3.5 text-[#F5F5F7]">
                      {c.sent.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-[#A1A1AA]">
                      {c.sent > 0
                        ? `${Math.round((c.opened / c.sent) * 100)}%`
                        : "—"}
                    </td>
                    <td className="px-4 py-3.5 text-[#10B981] font-medium">
                      {c.bookings > 0 ? c.bookings : "—"}
                    </td>
                    <td className="px-4 py-3.5 text-[#52525B] text-xs whitespace-nowrap">
                      {c.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Automated campaigns */}
      <motion.div {...fadeUp(0.15)}>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-[#8B5CF6]" />
          <h3 className="text-[#F5F5F7] font-semibold text-sm">
            Automated Campaigns
          </h3>
        </div>
        <div className="space-y-2">
          {auto.map((a, i) => (
            <motion.div key={a.id} {...fadeUp(0.05 * i)}>
              <div
                className={`bg-[#141419] border rounded-2xl p-4 flex items-start gap-4 transition-colors ${a.enabled ? "border-[#8B5CF6]/20" : "border-[#27272A]"}`}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#8B5CF6]/10">
                  {a.type === "SMS" ? (
                    <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
                  ) : (
                    <Mail className="w-4 h-4 text-[#8B5CF6]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F7] text-sm font-medium">{a.name}</p>
                  <p className="text-[#52525B] text-xs mt-0.5">
                    {a.description}
                  </p>
                  <span className="text-[#52525B] text-[10px] mt-1 inline-block">
                    {a.type}
                  </span>
                </div>
                <button onClick={() => toggleAuto(a.id)} className="shrink-0">
                  {a.enabled ? (
                    <ToggleRight className="w-8 h-8 text-[#8B5CF6]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[#52525B]" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <CampaignModal
            onClose={() => setShowModal(false)}
            onSave={(c) => setCampaigns((cs) => [c, ...cs])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
