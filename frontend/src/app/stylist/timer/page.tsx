"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Pause,
  Play,
  RotateCcw,
  Square,
  Timer,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const CLIENTS = [
  "Dilhani Perera",
  "Sanduni Fernando",
  "Thilini Silva",
  "Nadeesha Wickramasinghe",
  "Chamari Jayawardena",
  "Malsha Bandara",
  "Walk-in Guest",
];
const SERVICES = [
  { name: "Balayage", est: 120 },
  { name: "Keratin Treatment", est: 150 },
  { name: "Highlights", est: 90 },
  { name: "Haircut & Style", est: 45 },
  { name: "Colour (Global)", est: 80 },
  { name: "Blowout", est: 30 },
  { name: "Cut & Colour", est: 100 },
];
const PRESETS = [30, 45, 60, 90, 120];

interface SessionLog {
  id: string;
  client: string;
  service: string;
  planned: number; // mins
  actual: number; // secs
  endedAt: string;
}

function fmt(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function variance(planned: number, actualSecs: number) {
  const diff = Math.round(actualSecs / 60) - planned;
  if (diff === 0) return { label: "On time", color: "#10B981" };
  if (diff > 0) return { label: `+${diff} min over`, color: "#EF4444" };
  return { label: `${Math.abs(diff)} min early`, color: "#22D3EE" };
}

export default function TimerPage() {
  const [client, setClient] = useState(CLIENTS[0]);
  const [serviceIdx, setServiceIdx] = useState(0);
  const [mode, setMode] = useState<"stopwatch" | "countdown">("stopwatch");
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(0);
  const [countdownTarget, setCountdownTarget] = useState(60 * 60); // 60min default
  const [log, setLog] = useState<SessionLog[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startSecs = useRef(0);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecs((s) => {
          if (mode === "countdown") {
            if (s <= 1) {
              setRunning(false);
              return 0;
            }
            return s - 1;
          }
          return s + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  const handleStart = () => {
    if (!running && secs === 0 && mode === "countdown")
      setSecs(countdownTarget);
    startSecs.current = secs;
    setRunning(true);
  };

  const handlePause = () => setRunning(false);

  const handleReset = () => {
    setRunning(false);
    setSecs(mode === "countdown" ? countdownTarget : 0);
  };

  const handleStop = () => {
    setRunning(false);
    const actual = mode === "stopwatch" ? secs : countdownTarget - secs;
    if (actual > 0) {
      setLog((l) => [
        {
          id: `s${Date.now()}`,
          client,
          service: SERVICES[serviceIdx].name,
          planned: SERVICES[serviceIdx].est,
          actual,
          endedAt: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...l,
      ]);
    }
    setSecs(0);
  };

  const setPreset = (mins: number) => {
    setMode("countdown");
    setCountdownTarget(mins * 60);
    setRunning(false);
    setSecs(mins * 60);
  };

  const pct =
    mode === "countdown" && countdownTarget > 0
      ? ((countdownTarget - secs) / countdownTarget) * 100
      : 0;
  const avgSecs =
    log.length > 0
      ? Math.round(log.reduce((sum, s) => sum + s.actual, 0) / log.length)
      : 0;
  const displaySecs = mode === "countdown" ? secs : secs;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-[#F5F5F7] text-xl font-bold">Service Timer</h1>
        <p className="text-[#52525B] text-sm">
          Track session durations · Shenali Rodrigo
        </p>
      </motion.div>

      {/* Client + Service selectors */}
      <motion.div {...fadeUp(0.04)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#52525B] text-xs mb-1 block">
                Client
              </label>
              <select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
              >
                {CLIENTS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#52525B] text-xs mb-1 block">
                Service
              </label>
              <select
                value={serviceIdx}
                onChange={(e) => setServiceIdx(Number(e.target.value))}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
              >
                {SERVICES.map((s, i) => (
                  <option key={s.name} value={i}>
                    {s.name} ({s.est}m est.)
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Mode toggle */}
          <div className="flex bg-[#1C1C22] rounded-xl p-1 gap-1">
            {(["stopwatch", "countdown"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setRunning(false);
                  setSecs(m === "countdown" ? countdownTarget : 0);
                }}
                className={`flex-1 h-8 rounded-lg text-xs font-semibold capitalize transition-colors ${mode === m ? "bg-[#22D3EE] text-[#0B0B0F]" : "text-[#52525B] hover:text-[#A1A1AA]"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timer face */}
      <motion.div {...fadeUp(0.08)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-8 flex flex-col items-center gap-6">
          {/* Circular progress (countdown only) */}
          {mode === "countdown" && (
            <div className="relative w-36 h-36">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 144 144">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  fill="none"
                  stroke="#1C1C22"
                  strokeWidth="8"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${2 * Math.PI * 64 * (1 - pct / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Timer className="w-6 h-6 text-[#22D3EE]" />
              </div>
            </div>
          )}

          <p className="font-mono text-6xl font-bold text-[#F5F5F7] tabular-nums tracking-tight">
            {fmt(displaySecs)}
          </p>

          {mode === "countdown" && (
            <p className="text-[#52525B] text-xs">
              Est. duration: {SERVICES[serviceIdx].est} min · Preset:{" "}
              {Math.round(countdownTarget / 60)} min
            </p>
          )}

          {/* Preset buttons */}
          <div className="flex gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setPreset(p)}
                className={`w-12 h-8 rounded-lg border text-xs font-semibold transition-colors ${countdownTarget === p * 60 && mode === "countdown" ? "bg-[#22D3EE]/10 border-[#22D3EE]/40 text-[#22D3EE]" : "border-[#27272A] text-[#52525B] hover:border-[#3f3f46]"}`}
              >
                {p}m
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="w-11 h-11 rounded-xl bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#52525B] hover:text-[#A1A1AA] hover:border-[#3f3f46] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            {!running ? (
              <button
                onClick={handleStart}
                className="w-16 h-16 rounded-2xl bg-[#22D3EE] flex items-center justify-center text-[#0B0B0F] shadow-lg hover:bg-[#06B6D4] transition-colors"
              >
                <Play className="w-7 h-7 fill-current" />
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="w-16 h-16 rounded-2xl bg-[#22D3EE] flex items-center justify-center text-[#0B0B0F] shadow-lg hover:bg-[#06B6D4] transition-colors"
              >
                <Pause className="w-7 h-7" />
              </button>
            )}
            <button
              onClick={handleStop}
              className="w-11 h-11 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] hover:bg-[#EF4444]/20 transition-colors"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[#52525B] text-xs">
            ← Reset · Start/Pause · Stop & Log →
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.12)}>
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Sessions Today",
              value: String(log.length),
              color: "#22D3EE",
            },
            {
              label: "Avg Duration",
              value: log.length > 0 ? fmt(avgSecs) : "—",
              color: "#8B5CF6",
            },
            {
              label: "Total Time",
              value:
                log.length > 0
                  ? fmt(log.reduce((sum, s) => sum + s.actual, 0))
                  : "—",
              color: "#10B981",
            },
          ].map((k) => (
            <div
              key={k.label}
              className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4 text-center"
            >
              <p className="font-bold text-xl" style={{ color: k.color }}>
                {k.value}
              </p>
              <p className="text-[#52525B] text-xs mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Session log */}
      {log.length > 0 && (
        <motion.div {...fadeUp(0.14)}>
          <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#22D3EE]" /> Today&apos;s Sessions
          </h3>
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#27272A]">
                  {[
                    "Client",
                    "Service",
                    "Planned",
                    "Actual",
                    "Variance",
                    "Time",
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
                {log.map((s) => {
                  const v = variance(s.planned, s.actual);
                  return (
                    <tr
                      key={s.id}
                      className="hover:bg-[#1C1C22] transition-colors"
                    >
                      <td className="px-4 py-3 text-[#F5F5F7] text-xs">
                        {s.client}
                      </td>
                      <td className="px-4 py-3 text-[#A1A1AA] text-xs">
                        {s.service}
                      </td>
                      <td className="px-4 py-3 text-[#52525B] text-xs">
                        {s.planned}m
                      </td>
                      <td className="px-4 py-3 text-[#F5F5F7] font-mono text-xs">
                        {fmt(s.actual)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: v.color }}
                        >
                          <CheckCircle className="w-3 h-3" /> {v.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#52525B] text-xs">
                        {s.endedAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
