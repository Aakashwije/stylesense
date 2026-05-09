"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Plus,
  Scissors,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

type QueueStatus = "waiting" | "in-service" | "done";

interface QueueEntry {
  id: string;
  name: string;
  phone: string;
  service: string;
  stylist: string;
  arrivedAt: string;
  estWait: number; // minutes
  status: QueueStatus;
  elapsed: number; // seconds in-service
}

const STYLISTS = [
  "Shenali Rodrigo",
  "Kasun Perera",
  "Dinara Silva",
  "Ayasha Dissanayake",
];
const SERVICES = [
  "Haircut & Style",
  "Balayage",
  "Keratin Treatment",
  "Blowout",
  "Colour",
  "Highlights",
  "Cut & Colour",
];

const INITIAL_QUEUE: QueueEntry[] = [
  {
    id: "q1",
    name: "Dilhani Perera",
    phone: "+94 77 123 4567",
    service: "Balayage",
    stylist: "Shenali Rodrigo",
    arrivedAt: "09:12",
    estWait: 0,
    status: "in-service",
    elapsed: 1823,
  },
  {
    id: "q2",
    name: "Sanduni Fernando",
    phone: "+94 71 234 5678",
    service: "Haircut & Style",
    stylist: "Kasun Perera",
    arrivedAt: "09:35",
    estWait: 0,
    status: "in-service",
    elapsed: 642,
  },
  {
    id: "q3",
    name: "Thilini Silva",
    phone: "+94 76 345 6789",
    service: "Keratin Treatment",
    stylist: "Dinara Silva",
    arrivedAt: "10:05",
    estWait: 15,
    status: "waiting",
    elapsed: 0,
  },
  {
    id: "q4",
    name: "Nadeesha Wickramasinghe",
    phone: "+94 78 456 7890",
    service: "Highlights",
    stylist: "Shenali Rodrigo",
    arrivedAt: "10:18",
    estWait: 55,
    status: "waiting",
    elapsed: 0,
  },
  {
    id: "q5",
    name: "Chamari Jayawardena",
    phone: "+94 75 567 8901",
    service: "Blowout",
    stylist: "Kasun Perera",
    arrivedAt: "10:30",
    estWait: 35,
    status: "waiting",
    elapsed: 0,
  },
  {
    id: "q6",
    name: "Malsha Bandara",
    phone: "+94 72 678 9012",
    service: "Cut & Colour",
    stylist: "Ayasha Dissanayake",
    arrivedAt: "10:45",
    estWait: 20,
    status: "waiting",
    elapsed: 0,
  },
];

function fmt(secs: number) {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function AddModal({
  onAdd,
  onClose,
}: {
  onAdd: (e: Omit<QueueEntry, "id" | "elapsed">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: SERVICES[0],
    stylist: STYLISTS[0],
    arrivedAt: new Date().toTimeString().slice(0, 5),
    estWait: 20,
  });
  const set = (k: string, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));
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
          <h3 className="text-[#F5F5F7] font-semibold">Add Walk-in</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#F5F5F7] hover:bg-[#1C1C22] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-3">
          {[
            ["name", "Full Name", "text"],
            ["phone", "Phone", "text"],
            ["arrivedAt", "Arrived At", "time"],
          ].map(([k, label, type]) => (
            <div key={k}>
              <label className="text-[#52525B] text-xs mb-1 block">
                {label}
              </label>
              <input
                type={type}
                value={String(form[k as keyof typeof form])}
                onChange={(e) => set(k, e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">Service</label>
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
              Assign Stylist
            </label>
            <select
              value={form.stylist}
              onChange={(e) => set("stylist", e.target.value)}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
            >
              {STYLISTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Est. Wait (min)
            </label>
            <input
              type="number"
              value={form.estWait}
              onChange={(e) => set("estWait", Number(e.target.value))}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
            />
          </div>
        </div>
        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:border-[#3f3f46] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAdd({ ...form, status: "waiting" });
              onClose();
            }}
            className="flex-1 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] transition-colors"
          >
            Add to Queue
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueEntry[]>(INITIAL_QUEUE);
  const [showAdd, setShowAdd] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tick in-service timers every second
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setQueue((q) =>
        q.map((e) =>
          e.status === "in-service" ? { ...e, elapsed: e.elapsed + 1 } : e,
        ),
      );
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const markInService = (id: string) =>
    setQueue((q) =>
      q.map((e) =>
        e.id === id
          ? { ...e, status: "in-service", elapsed: 0, estWait: 0 }
          : e,
      ),
    );
  const markDone = (id: string) =>
    setQueue((q) => q.map((e) => (e.id === id ? { ...e, status: "done" } : e)));
  const remove = (id: string) => setQueue((q) => q.filter((e) => e.id !== id));

  const addEntry = (entry: Omit<QueueEntry, "id" | "elapsed">) =>
    setQueue((q) => [...q, { ...entry, id: `q${Date.now()}`, elapsed: 0 }]);

  const waiting = queue.filter((e) => e.status === "waiting");
  const inService = queue.filter((e) => e.status === "in-service");
  const done = queue.filter((e) => e.status === "done");

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">Live Queue</h1>
          <p className="text-[#52525B] text-sm">
            Real-time walk-in management ·{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Walk-in
        </button>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        {...fadeUp(0.05)}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          {
            label: "In Queue",
            value: waiting.length,
            icon: Users,
            color: "#F59E0B",
          },
          {
            label: "In Service",
            value: inService.length,
            icon: Scissors,
            color: "#22D3EE",
          },
          {
            label: "Completed Today",
            value: done.length,
            icon: CheckCircle,
            color: "#10B981",
          },
          {
            label: "Avg Wait",
            value: waiting.length
              ? `${Math.round(waiting.reduce((a, b) => a + b.estWait, 0) / waiting.length)}m`
              : "—",
            icon: Clock,
            color: "#8B5CF6",
          },
        ].map((k, i) => (
          <motion.div key={k.label} {...fadeUp(0.05 * i)}>
            <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4 hover:border-[#3f3f46] transition-colors">
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

      {/* In Service */}
      <motion.div {...fadeUp(0.1)}>
        <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse inline-block" />{" "}
          In Service ({inService.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {inService.map((entry) => (
            <motion.div key={entry.id} layout>
              <div className="bg-[#141419] border border-[#22D3EE]/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[#F5F5F7] font-semibold text-sm">
                      {entry.name}
                    </p>
                    <p className="text-[#52525B] text-xs">{entry.phone}</p>
                  </div>
                  <div className="bg-[#22D3EE]/10 border border-[#22D3EE]/20 rounded-lg px-2 py-1 text-center shrink-0">
                    <p className="text-[#22D3EE] text-sm font-mono font-bold">
                      {fmt(entry.elapsed)}
                    </p>
                    <p className="text-[#52525B] text-[9px]">elapsed</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[#A1A1AA] text-xs">
                    <span className="text-[#52525B]">Service: </span>
                    {entry.service}
                  </p>
                  <p className="text-[#A1A1AA] text-xs">
                    <span className="text-[#52525B]">Stylist: </span>
                    {entry.stylist}
                  </p>
                  <p className="text-[#A1A1AA] text-xs">
                    <span className="text-[#52525B]">Arrived: </span>
                    {entry.arrivedAt}
                  </p>
                </div>
                <button
                  onClick={() => markDone(entry.id)}
                  className="w-full h-8 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-semibold hover:bg-[#10B981]/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Mark Complete
                </button>
              </div>
            </motion.div>
          ))}
          {inService.length === 0 && (
            <p className="text-[#52525B] text-sm col-span-3">
              No clients in service right now.
            </p>
          )}
        </div>
      </motion.div>

      {/* Waiting Queue */}
      <motion.div {...fadeUp(0.15)}>
        <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] inline-block" />{" "}
          Waiting ({waiting.length})
        </h3>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          {waiting.length === 0 && (
            <p className="text-[#52525B] text-sm p-5">
              Queue is empty — no one waiting.
            </p>
          )}
          <div className="divide-y divide-[#27272A]">
            <AnimatePresence>
              {waiting.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center gap-4 px-5 py-4 hover:bg-[#1C1C22] transition-colors">
                    <div className="w-7 h-7 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {entry.name}
                      </p>
                      <p className="text-[#52525B] text-xs">
                        {entry.service} · {entry.stylist}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[#F59E0B] text-sm font-semibold">
                        ~{entry.estWait}m
                      </p>
                      <p className="text-[#52525B] text-[10px]">est. wait</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => markInService(entry.id)}
                        title="Start service"
                        className="w-8 h-8 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Completed */}
      {done.length > 0 && (
        <motion.div {...fadeUp(0.2)}>
          <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />{" "}
            Completed Today ({done.length})
          </h3>
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl divide-y divide-[#27272A]">
            {done.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 px-5 py-3 opacity-60"
              >
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F7] text-sm">{entry.name}</p>
                  <p className="text-[#52525B] text-xs">
                    {entry.service} · {entry.stylist}
                  </p>
                </div>
                <span className="text-[#52525B] text-xs">
                  {fmt(entry.elapsed)} total
                </span>
                <button
                  onClick={() => remove(entry.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showAdd && (
          <AddModal onAdd={addEntry} onClose={() => setShowAdd(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
