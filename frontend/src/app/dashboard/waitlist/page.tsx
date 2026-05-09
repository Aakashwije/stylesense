"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, BookOpen, Clock, Plus, Trash2, Users, X } from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

interface WaitlistEntry {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  preferredStylist: string;
  preferredDate: string;
  addedOn: string;
  position: number;
  notified: boolean;
}

const SERVICES = [
  "Balayage",
  "Keratin Treatment",
  "Highlights",
  "Cut & Colour",
  "Haircut & Style",
  "Blowout",
  "Colour (Global)",
  "Deep Conditioning",
];
const STYLISTS = [
  "Any Available",
  "Shenali Rodrigo",
  "Kasun Perera",
  "Dinara Silva",
];

const INITIAL_WAITLIST: WaitlistEntry[] = [
  {
    id: "w1",
    clientName: "Dilhani Perera",
    phone: "+94 77 123 4567",
    service: "Balayage",
    preferredStylist: "Shenali Rodrigo",
    preferredDate: "20 Jan 2026",
    addedOn: "10 Jan 2026",
    position: 1,
    notified: false,
  },
  {
    id: "w2",
    clientName: "Sanduni Fernando",
    phone: "+94 71 234 5678",
    service: "Keratin Treatment",
    preferredStylist: "Shenali Rodrigo",
    preferredDate: "21 Jan 2026",
    addedOn: "11 Jan 2026",
    position: 2,
    notified: true,
  },
  {
    id: "w3",
    clientName: "Thilini Silva",
    phone: "+94 76 345 6789",
    service: "Highlights",
    preferredStylist: "Any Available",
    preferredDate: "22 Jan 2026",
    addedOn: "12 Jan 2026",
    position: 3,
    notified: false,
  },
  {
    id: "w4",
    clientName: "Nadeesha Wickramasinghe",
    phone: "+94 78 456 7890",
    service: "Cut & Colour",
    preferredStylist: "Kasun Perera",
    preferredDate: "23 Jan 2026",
    addedOn: "13 Jan 2026",
    position: 4,
    notified: false,
  },
  {
    id: "w5",
    clientName: "Chamari Jayawardena",
    phone: "+94 75 567 8901",
    service: "Balayage",
    preferredStylist: "Shenali Rodrigo",
    preferredDate: "24 Jan 2026",
    addedOn: "14 Jan 2026",
    position: 5,
    notified: false,
  },
];

function AddModal({
  onAdd,
  onClose,
}: {
  onAdd: (e: WaitlistEntry) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    clientName: "",
    phone: "",
    service: SERVICES[0],
    preferredStylist: STYLISTS[0],
    preferredDate: "",
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
        className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
          <h3 className="text-[#F5F5F7] font-semibold">Add to Waitlist</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#F5F5F7] hover:bg-[#1C1C22]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-3">
          {(
            [
              ["clientName", "Full Name"],
              ["phone", "Phone Number"],
            ] as [string, string][]
          ).map(([k, label]) => (
            <div key={k}>
              <label className="text-[#52525B] text-xs mb-1 block">
                {label}
              </label>
              <input
                value={form[k as keyof typeof form]}
                onChange={(e) => set(k, e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
              />
            </div>
          ))}
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Service Requested
            </label>
            <select
              value={form.service}
              onChange={(e) => set("service", e.target.value)}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
            >
              {SERVICES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Preferred Stylist
            </label>
            <select
              value={form.preferredStylist}
              onChange={(e) => set("preferredStylist", e.target.value)}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
            >
              {STYLISTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Preferred Date
            </label>
            <input
              type="date"
              value={form.preferredDate}
              onChange={(e) => set("preferredDate", e.target.value)}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
            />
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
              onAdd({
                id: `w${Date.now()}`,
                ...form,
                preferredDate: form.preferredDate
                  ? new Date(form.preferredDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Flexible",
                addedOn: new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
                position: 99,
                notified: false,
              });
              onClose();
            }}
            className="flex-1 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED]"
          >
            Add to Waitlist
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>(INITIAL_WAITLIST);
  const [showAdd, setShowAdd] = useState(false);
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());

  const notify = (id: string) =>
    setEntries((e) =>
      e.map((x) => (x.id === id ? { ...x, notified: true } : x)),
    );
  const remove = (id: string) =>
    setEntries((e) => e.filter((x) => x.id !== id));
  const book = (id: string) => {
    setBookedIds((s) => new Set([...s, id]));
    setTimeout(() => remove(id), 1200);
  };

  const addEntry = (entry: WaitlistEntry) =>
    setEntries((e) => [...e, { ...entry, position: e.length + 1 }]);

  const notifiedToday = entries.filter((e) => e.notified).length;
  const avgWait = Math.round(
    entries.reduce((a, _, i) => a + i * 2, 0) / Math.max(entries.length, 1),
  );

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">Waitlist Manager</h1>
          <p className="text-[#52525B] text-sm">
            Manage clients waiting for an opening
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add to Waitlist
        </button>
      </motion.div>

      {/* KPI strip */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-3 gap-3">
        {[
          {
            label: "On Waitlist",
            value: entries.length,
            icon: Users,
            color: "#8B5CF6",
          },
          {
            label: "Notified Today",
            value: notifiedToday,
            icon: Bell,
            color: "#22D3EE",
          },
          {
            label: "Avg Wait (days)",
            value: `~${avgWait}d`,
            icon: Clock,
            color: "#F59E0B",
          },
        ].map((k, i) => (
          <motion.div key={k.label} {...fadeUp(0.04 * i)}>
            <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4">
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

      {/* Waitlist */}
      <motion.div {...fadeUp(0.1)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          {entries.length === 0 && (
            <p className="text-[#52525B] text-sm text-center py-12">
              Waitlist is empty.
            </p>
          )}
          <AnimatePresence>
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: bookedIds.has(entry.id) ? 0.3 : 1 }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div
                  className={`px-5 py-4 border-b border-[#27272A] last:border-none hover:bg-[#1C1C22] transition-colors ${bookedIds.has(entry.id) ? "pointer-events-none" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[#F5F5F7] font-semibold text-sm">
                          {entry.clientName}
                        </p>
                        {entry.notified && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] flex items-center gap-1">
                            <Bell className="w-2.5 h-2.5" /> Notified
                          </span>
                        )}
                        {bookedIds.has(entry.id) && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
                            Booked ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[#52525B] text-xs mt-0.5">
                        {entry.phone}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5">
                        <span className="text-[#A1A1AA] text-xs">
                          <span className="text-[#52525B]">Service: </span>
                          {entry.service}
                        </span>
                        <span className="text-[#A1A1AA] text-xs">
                          <span className="text-[#52525B]">Stylist: </span>
                          {entry.preferredStylist}
                        </span>
                        <span className="text-[#A1A1AA] text-xs">
                          <span className="text-[#52525B]">Date: </span>
                          {entry.preferredDate}
                        </span>
                        <span className="text-[#52525B] text-xs">
                          Added {entry.addedOn}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {!entry.notified && (
                        <button
                          onClick={() => notify(entry.id)}
                          title="Notify client"
                          className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-xs font-semibold hover:bg-[#22D3EE]/20 transition-colors"
                        >
                          <Bell className="w-3.5 h-3.5" /> Notify
                        </button>
                      )}
                      <button
                        onClick={() => book(entry.id)}
                        title="Convert to booking"
                        className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-semibold hover:bg-[#10B981]/20 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Book
                      </button>
                      <button
                        onClick={() => remove(entry.id)}
                        title="Remove"
                        className="w-8 h-8 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-center justify-center text-[#EF4444] hover:bg-[#EF4444]/20 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {showAdd && (
          <AddModal onAdd={addEntry} onClose={() => setShowAdd(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
