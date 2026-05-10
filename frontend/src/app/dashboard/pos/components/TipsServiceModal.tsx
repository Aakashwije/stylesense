"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { SERVICE_CHARGE_RATE } from "../data";
import type { Stylist } from "../types";

interface Props {
  subtotal: number;
  serviceChargeEnabled: boolean;
  tipAmount: number;
  stylists: Stylist[];
  onUpdateTip: (amount: number) => void;
  onToggleServiceCharge: (enabled: boolean) => void;
  onClose: () => void;
}

const TIP_PRESETS = [10, 15, 20];

export default function TipsServiceModal({
  subtotal,
  serviceChargeEnabled,
  tipAmount,
  onUpdateTip,
  onToggleServiceCharge,
  onClose,
}: Props) {
  const [tipMode, setTipMode] = useState<"percent" | "fixed">(
    tipAmount > 0 ? "fixed" : "percent",
  );
  const [customTip, setCustomTip] = useState(
    tipAmount > 0 ? String(tipAmount) : "",
  );

  const serviceChargeAmt = Math.round(subtotal * (SERVICE_CHARGE_RATE / 100));

  const applyPercent = (pct: number) => {
    const amt = Math.round((subtotal * pct) / 100);
    setCustomTip(String(amt));
    onUpdateTip(amt);
  };

  const applyCustom = () => {
    const v = Number(customTip);
    if (v >= 0) onUpdateTip(v);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-sm"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
          <h3 className="text-[#F5F5F7] font-bold">Tips & Service Charge</h3>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Tip section */}
          <div>
            <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-3">
              Tip
            </p>

            <div className="flex gap-2 mb-3">
              {(["percent", "fixed"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setTipMode(m)}
                  className={`flex-1 h-8 rounded-lg text-xs font-semibold transition-colors ${tipMode === m ? "bg-[#8B5CF6] text-white" : "bg-[#1C1C22] border border-[#27272A] text-[#52525B]"}`}
                >
                  {m === "percent" ? "By %" : "Fixed Amount"}
                </button>
              ))}
            </div>

            {tipMode === "percent" && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {TIP_PRESETS.map((p) => {
                  const amt = Math.round((subtotal * p) / 100);
                  return (
                    <button
                      key={p}
                      onClick={() => applyPercent(p)}
                      className={`py-2.5 rounded-xl border text-center transition-colors ${tipAmount === amt ? "border-[#8B5CF6] bg-[#8B5CF6]/10" : "border-[#27272A] bg-[#1C1C22] hover:border-[#8B5CF6]/40"}`}
                    >
                      <p className="text-[#F5F5F7] text-sm font-bold">{p}%</p>
                      <p className="text-[#52525B] text-[10px]">
                        LKR {amt.toLocaleString()}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="number"
                placeholder={
                  tipMode === "percent" ? "Custom %" : "Amount (LKR)"
                }
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                min={0}
                className="flex-1 bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
              />
              <button
                onClick={() => {
                  if (tipMode === "percent") applyPercent(Number(customTip));
                  else applyCustom();
                }}
                className="h-10 px-4 bg-[#8B5CF6] text-white text-sm font-semibold rounded-xl hover:bg-[#7C3AED]"
              >
                Set
              </button>
              {tipAmount > 0 && (
                <button
                  onClick={() => {
                    setCustomTip("");
                    onUpdateTip(0);
                  }}
                  className="h-10 px-3 border border-[#27272A] rounded-xl text-[#52525B] text-sm hover:border-[#EF4444]/40 hover:text-[#EF4444]"
                >
                  Clear
                </button>
              )}
            </div>

            {tipAmount > 0 && (
              <div className="mt-2 flex items-center justify-between bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl px-3 py-2">
                <span className="text-[#10B981] text-xs font-semibold">
                  Tip applied
                </span>
                <span className="text-[#F5F5F7] text-sm font-bold">
                  LKR {tipAmount.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Service charge */}
          <div className="border-t border-[#27272A] pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F5F5F7] text-sm font-medium">
                  Service Charge ({SERVICE_CHARGE_RATE}%)
                </p>
                <p className="text-[#52525B] text-xs">
                  LKR {serviceChargeAmt.toLocaleString()} on subtotal after
                  discount
                </p>
              </div>
              <button
                onClick={() => onToggleServiceCharge(!serviceChargeEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative ${serviceChargeEnabled ? "bg-[#8B5CF6]" : "bg-[#27272A]"}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${serviceChargeEnabled ? "left-5" : "left-0.5"}`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED]"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
