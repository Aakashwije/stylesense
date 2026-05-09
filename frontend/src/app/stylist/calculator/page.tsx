"use client";

import { motion } from "framer-motion";
import { Calculator, Info, TrendingUp } from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const SERVICES = [
  { name: "Balayage", price: 18000 },
  { name: "Keratin Treatment", price: 22000 },
  { name: "Haircut & Style", price: 2500 },
  { name: "Highlights", price: 14000 },
  { name: "Colour (Global)", price: 9500 },
  { name: "Blowout", price: 1800 },
  { name: "Cut & Colour", price: 12000 },
];

const STYLIST_PCT = 0.7;
const SALON_PCT = 0.3;

function LKR(n: number) {
  return `LKR ${Math.round(n).toLocaleString()}`;
}

export default function CalculatorPage() {
  const [serviceIdx, setServiceIdx] = useState(0);
  const [qty, setQty] = useState(4);
  const [tips, setTips] = useState(0);
  const [projQty, setProjQty] = useState(10);

  const svc = SERVICES[serviceIdx];
  const gross = svc.price * qty;
  const salon = gross * SALON_PCT;
  const stylistNet = gross * STYLIST_PCT;
  const total = stylistNet + tips;

  const projGross = svc.price * projQty;
  const projNet = projGross * STYLIST_PCT;
  const monthlyProjection = projNet * 4; // ×4 weeks

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-[#F5F5F7] text-xl font-bold">
          Commission Calculator
        </h1>
        <p className="text-[#52525B] text-sm">
          Shenali Rodrigo · 70% stylist / 30% salon split
        </p>
      </motion.div>

      {/* Commission info banner */}
      <motion.div {...fadeUp(0.04)}>
        <div className="bg-[#22D3EE]/5 border border-[#22D3EE]/15 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#F5F5F7] text-sm font-semibold">
              Commission Structure
            </p>
            <p className="text-[#A1A1AA] text-xs mt-0.5">
              You earn <span className="text-[#22D3EE] font-semibold">70%</span>{" "}
              of every service. The salon retains{" "}
              <span className="text-[#52525B] font-semibold">30%</span>. Tips
              are yours to keep entirely.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main inputs */}
      <motion.div {...fadeUp(0.06)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5 space-y-5">
          <h3 className="text-[#F5F5F7] font-semibold text-sm">
            Session Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    {s.name}
                  </option>
                ))}
              </select>
              <p className="text-[#52525B] text-[11px] mt-1">
                Price:{" "}
                <span className="text-[#A1A1AA]">
                  LKR {svc.price.toLocaleString()}
                </span>
              </p>
            </div>
            <div>
              <label className="text-[#52525B] text-xs mb-1 block">
                Number of Sessions
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
              />
            </div>
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Tips Received (LKR)
            </label>
            <input
              type="number"
              min={0}
              value={tips}
              onChange={(e) => setTips(Math.max(0, Number(e.target.value)))}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Breakdown cards */}
      <motion.div {...fadeUp(0.08)}>
        <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3">
          Earnings Breakdown
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4">
            <p className="text-[#52525B] text-xs mb-1">Gross Revenue</p>
            <p className="font-bold text-lg text-[#F5F5F7]">
              LKR {gross.toLocaleString()}
            </p>
            <p className="text-[#52525B] text-[10px] mt-1">
              {qty} × LKR {svc.price.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#EF4444]/5 border border-[#EF4444]/15 rounded-2xl p-4">
            <p className="text-[#52525B] text-xs mb-1">Salon Cut (30%)</p>
            <p className="font-bold text-lg text-[#EF4444]">{LKR(salon)}</p>
            <p className="text-[#52525B] text-[10px] mt-1">
              Deducted from gross
            </p>
          </div>
          <div className="bg-[#22D3EE]/5 border border-[#22D3EE]/15 rounded-2xl p-4">
            <p className="text-[#52525B] text-xs mb-1">Your Net (70%)</p>
            <p className="font-bold text-lg text-[#22D3EE]">
              {LKR(stylistNet)}
            </p>
            <p className="text-[#52525B] text-[10px] mt-1">Before tips</p>
          </div>
        </div>
      </motion.div>

      {/* Grand total */}
      <motion.div {...fadeUp(0.1)}>
        <div className="bg-[#141419] border border-[#22D3EE]/20 rounded-2xl p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-[#52525B] text-sm">
                Total Earnings (net + tips)
              </p>
              <p className="text-4xl font-bold text-[#22D3EE] mt-1">
                {LKR(total)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                  <span className="text-[#52525B] text-xs">Commission</span>
                  <span className="text-[#F5F5F7] text-xs font-semibold">
                    {LKR(stylistNet)}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-[#52525B] text-xs">Tips</span>
                  <span className="text-[#F5F5F7] text-xs font-semibold">
                    {LKR(tips)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Split visual */}
          <div className="mt-4">
            <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
              <div
                className="rounded-full bg-[#22D3EE]"
                style={{ width: `${(stylistNet / (total || 1)) * 100}%` }}
              />
              {tips > 0 && (
                <div
                  className="rounded-full bg-[#10B981]"
                  style={{ width: `${(tips / (total || 1)) * 100}%` }}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* "What if" slider */}
      <motion.div {...fadeUp(0.12)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#22D3EE]" />
            <h3 className="text-[#F5F5F7] font-semibold text-sm">
              Monthly Projection — What If?
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[#52525B] text-xs">
                Sessions per week:{" "}
                <span className="text-[#F5F5F7] font-bold">{projQty}</span>
              </label>
              <p className="text-[#22D3EE] font-semibold text-sm">
                {LKR(monthlyProjection)} / mo
              </p>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={projQty}
              onChange={(e) => setProjQty(Number(e.target.value))}
              className="w-full accent-[#22D3EE] h-1.5 rounded-full bg-[#1C1C22] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#52525B]">
              <span>1 session/wk</span>
              <span>15 sessions/wk</span>
              <span>30 sessions/wk</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#27272A] grid grid-cols-3 gap-3">
            {[
              { label: "Weekly Gross", value: LKR(svc.price * projQty) },
              {
                label: "Weekly Net (70%)",
                value: LKR(svc.price * projQty * STYLIST_PCT),
              },
              { label: "Monthly Projection", value: LKR(monthlyProjection) },
            ].map((k) => (
              <div key={k.label}>
                <p className="text-[#52525B] text-[10px]">{k.label}</p>
                <p className="text-[#F5F5F7] font-semibold text-sm mt-0.5">
                  {k.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Service reference table */}
      <motion.div {...fadeUp(0.14)}>
        <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#22D3EE]" /> Service Price
          Reference
        </h3>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272A]">
                {[
                  "Service",
                  "Price (LKR)",
                  "Your 70% (LKR)",
                  "Salon 30% (LKR)",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[#52525B] text-xs font-semibold px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {SERVICES.map((s, i) => (
                <tr
                  key={s.name}
                  className={`hover:bg-[#1C1C22] transition-colors ${i === serviceIdx ? "bg-[#22D3EE]/3" : ""}`}
                >
                  <td className="px-4 py-3 text-[#F5F5F7] text-xs font-medium">
                    {s.name}
                  </td>
                  <td className="px-4 py-3 text-[#A1A1AA] text-xs">
                    {s.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[#22D3EE] text-xs font-semibold">
                    {Math.round(s.price * 0.7).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[#52525B] text-xs">
                    {Math.round(s.price * 0.3).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
