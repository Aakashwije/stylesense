"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Edit3, Sparkles, Target, TrendingUp, X } from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const MONTHS = [
  "Jan 2025",
  "Feb 2025",
  "Mar 2025",
  "Apr 2025",
  "May 2025",
  "Jun 2025",
  "Jul 2025",
  "Aug 2025",
  "Sep 2025",
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
  "Jan 2026",
];

interface Goal {
  label: string;
  unit: string;
  target: number;
  actual: number;
  prefix?: string;
}

const INITIAL_GOALS: Goal[] = [
  { label: "Sessions", unit: "sessions", target: 40, actual: 28 },
  {
    label: "Earnings",
    unit: "",
    prefix: "LKR ",
    target: 120000,
    actual: 84500,
  },
  { label: "Tips", unit: "", prefix: "LKR ", target: 15000, actual: 11200 },
  { label: "New Clients", unit: "clients", target: 8, actual: 6 },
  { label: "Avg Rating", unit: "/ 5.0", target: 4.8, actual: 4.7 },
];

const HISTORY = [
  {
    month: "Nov 2025",
    sessions: 38,
    earnings: 118000,
    tips: 13500,
    newClients: 9,
    rating: 4.9,
  },
  {
    month: "Dec 2025",
    sessions: 35,
    earnings: 108000,
    tips: 12000,
    newClients: 7,
    rating: 4.8,
  },
];

function getStatus(
  actual: number,
  target: number,
): "ahead" | "on-track" | "behind" {
  const pct = actual / target;
  if (pct >= 1) return "ahead";
  if (pct >= 0.7) return "on-track";
  return "behind";
}

const STATUS = {
  ahead: { color: "#10B981", label: "Ahead", bg: "#10B98115" },
  "on-track": { color: "#F59E0B", label: "On Track", bg: "#F59E0B15" },
  behind: { color: "#EF4444", label: "Behind", bg: "#EF444415" },
};

function GoalBar({ goal }: { goal: Goal }) {
  const pct = Math.min(100, (goal.actual / goal.target) * 100);
  const status = getStatus(goal.actual, goal.target);
  const cfg = STATUS[status];

  const fmt = (v: number) =>
    goal.prefix
      ? `${goal.prefix}${v.toLocaleString()}`
      : goal.unit
        ? `${v} ${goal.unit}`
        : `${v}`;

  return (
    <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#52525B]" />
          <span className="text-[#F5F5F7] font-semibold text-sm">
            {goal.label}
          </span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ color: cfg.color, backgroundColor: cfg.bg }}
        >
          {cfg.label}
        </span>
      </div>
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-2xl font-bold text-[#F5F5F7]">
            {fmt(goal.actual)}
          </p>
          <p className="text-[#52525B] text-xs">of {fmt(goal.target)} target</p>
        </div>
        <p className="text-[#22D3EE] font-bold text-lg">{pct.toFixed(0)}%</p>
      </div>
      <div className="h-2 bg-[#1C1C22] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ backgroundColor: cfg.color }}
        />
      </div>
    </div>
  );
}

function EditModal({
  goals,
  onSave,
  onClose,
}: {
  goals: Goal[];
  onSave: (g: Goal[]) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<Goal[]>(goals.map((g) => ({ ...g })));
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
          <h3 className="text-[#F5F5F7] font-semibold">Set Monthly Targets</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:bg-[#1C1C22]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-3">
          {local.map((g, i) => (
            <div key={g.label}>
              <label className="text-[#52525B] text-xs mb-1 block">
                {g.label} Target{" "}
                {g.prefix ? `(${g.prefix})` : g.unit ? `(${g.unit})` : ""}
              </label>
              <input
                type="number"
                value={g.target}
                onChange={(e) =>
                  setLocal((ls) =>
                    ls.map((l, j) =>
                      j === i ? { ...l, target: Number(e.target.value) } : l,
                    ),
                  )
                }
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
              />
            </div>
          ))}
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
              onSave(local);
              onClose();
            }}
            className="flex-1 h-10 rounded-xl bg-[#22D3EE] text-[#0B0B0F] text-sm font-bold"
          >
            Save Targets
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GoalsPage() {
  const [month, setMonth] = useState(MONTHS[MONTHS.length - 1]);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [showEdit, setShowEdit] = useState(false);

  const overallPct =
    (goals.reduce((sum, g) => sum + Math.min(1, g.actual / g.target), 0) /
      goals.length) *
    100;
  const overallStatus = getStatus(overallPct, 100);
  const allAhead = goals.every(
    (g) => getStatus(g.actual, g.target) !== "behind",
  );

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">Goal Tracker</h1>
          <p className="text-[#52525B] text-sm">
            Shenali Rodrigo · Track your monthly targets
          </p>
        </div>
        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-xl bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-sm hover:border-[#3f3f46] hover:text-[#F5F5F7] transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Targets
        </button>
      </motion.div>

      {/* Month selector */}
      <motion.div {...fadeUp(0.04)}>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {MONTHS.map((m) => (
            <button
              key={m}
              onClick={() => setMonth(m)}
              className={`text-xs px-3 h-8 rounded-xl border whitespace-nowrap transition-colors shrink-0 ${month === m ? "bg-[#22D3EE] border-[#22D3EE] text-[#0B0B0F] font-bold" : "bg-[#141419] border-[#27272A] text-[#52525B] hover:border-[#3f3f46]"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overall progress */}
      <motion.div {...fadeUp(0.06)}>
        <div
          className={`rounded-2xl p-5 border ${allAhead ? "bg-[#10B981]/5 border-[#10B981]/20" : overallStatus === "on-track" ? "bg-[#F59E0B]/5 border-[#F59E0B]/20" : "bg-[#22D3EE]/5 border-[#22D3EE]/20"}`}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#22D3EE15" }}
            >
              <Sparkles
                className="w-4.5 h-4.5 text-[#22D3EE]"
                style={{ width: 18, height: 18 }}
              />
            </div>
            <div className="flex-1">
              <p className="text-[#F5F5F7] text-sm font-semibold">
                Overall Progress — {overallPct.toFixed(0)}%
              </p>
              <p className="text-[#A1A1AA] text-xs mt-0.5">
                {allAhead
                  ? "You're on pace to exceed your goals this month! Keep the momentum going."
                  : overallStatus === "on-track"
                    ? "You're on track! A strong final push will help you hit all targets."
                    : "Some targets need attention. Focus on the areas highlighted in red."}
              </p>
            </div>
            <p className="text-[#22D3EE] font-bold text-xl shrink-0">
              {overallPct.toFixed(0)}%
            </p>
          </div>
          <div className="mt-3 h-2 bg-[#1C1C22] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#22D3EE]"
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Goal bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {goals.map((g, i) => (
          <motion.div key={g.label} {...fadeUp(0.05 * i)}>
            <GoalBar goal={g} />
          </motion.div>
        ))}
      </div>

      {/* Historical comparison */}
      <motion.div {...fadeUp(0.2)}>
        <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#22D3EE]" /> Historical
          Comparison
        </h3>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272A]">
                {[
                  "Month",
                  "Sessions",
                  "Earnings (LKR)",
                  "Tips (LKR)",
                  "New Clients",
                  "Rating",
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
              {HISTORY.map((h) => (
                <tr
                  key={h.month}
                  className="hover:bg-[#1C1C22] transition-colors"
                >
                  <td className="px-4 py-3 text-[#A1A1AA] text-xs font-medium">
                    {h.month}
                  </td>
                  <td className="px-4 py-3 text-[#F5F5F7]">{h.sessions}</td>
                  <td className="px-4 py-3 text-[#F5F5F7]">
                    {h.earnings.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[#F5F5F7]">
                    {h.tips.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[#F5F5F7]">{h.newClients}</td>
                  <td className="px-4 py-3 text-[#F5F5F7]">{h.rating}</td>
                </tr>
              ))}
              <tr className="bg-[#22D3EE]/3 border-t border-[#22D3EE]/10">
                <td className="px-4 py-3 text-[#22D3EE] text-xs font-bold">
                  Jan 2026 (current)
                </td>
                {[
                  goals[0].actual,
                  goals[1].actual,
                  goals[2].actual,
                  goals[3].actual,
                  goals[4].actual,
                ].map((v, i) => (
                  <td
                    key={i}
                    className="px-4 py-3 text-[#22D3EE] font-semibold"
                  >
                    {i === 0 ? v : i === 4 ? v : v.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {showEdit && (
          <EditModal
            goals={goals}
            onSave={setGoals}
            onClose={() => setShowEdit(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
