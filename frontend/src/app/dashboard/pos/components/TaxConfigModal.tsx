"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import type { TaxConfig } from "../types";

interface Props {
  config: TaxConfig;
  onSave: (cfg: TaxConfig) => void;
  onClose: () => void;
}

export default function TaxConfigModal({ config, onSave, onClose }: Props) {
  const [form, setForm] = useState<TaxConfig>({ ...config });

  const set = <K extends keyof TaxConfig>(k: K, v: TaxConfig[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
          <h3 className="text-[#F5F5F7] font-bold">Tax & Invoice Settings</h3>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Tax rate */}
          <div>
            <label className="text-[#52525B] text-xs font-semibold uppercase tracking-wider block mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={form.rate}
              onChange={(e) => set("rate", Number(e.target.value))}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
            />
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {[0, 5, 8, 15].map((r) => (
                <button
                  key={r}
                  onClick={() => set("rate", r)}
                  className={`h-8 rounded-lg text-xs font-semibold transition-colors ${form.rate === r ? "bg-[#8B5CF6] text-white" : "bg-[#1C1C22] border border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/40"}`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          {/* Tax inclusive toggle */}
          <div className="flex items-center justify-between bg-[#1C1C22] border border-[#27272A] rounded-xl px-4 py-3">
            <div>
              <p className="text-[#F5F5F7] text-sm font-medium">
                Tax Inclusive
              </p>
              <p className="text-[#52525B] text-xs">
                {form.inclusive
                  ? "Prices already include tax"
                  : "Tax added on top of prices"}
              </p>
            </div>
            <button
              onClick={() => set("inclusive", !form.inclusive)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${form.inclusive ? "bg-[#8B5CF6]" : "bg-[#27272A]"}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${form.inclusive ? "left-5" : "left-0.5"}`}
              />
            </button>
          </div>

          {/* Company info */}
          <div>
            <label className="text-[#52525B] text-xs font-semibold uppercase tracking-wider block mb-2">
              Company Details (appears on invoices)
            </label>
            <div className="space-y-2">
              {(
                [
                  { key: "companyName", label: "Business Name" },
                  { key: "companyAddress", label: "Address" },
                  { key: "companyPhone", label: "Phone" },
                  { key: "vatNumber", label: "VAT Number" },
                  { key: "tin", label: "TIN / Tax ID" },
                ] as { key: keyof TaxConfig; label: string }[]
              ).map(({ key, label }) => (
                <div key={key}>
                  <p className="text-[#3f3f46] text-[10px] mb-1">{label}</p>
                  <input
                    type="text"
                    value={form[key] as string}
                    onChange={(e) => set(key, e.target.value)}
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-5 pt-3 border-t border-[#27272A]">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:border-[#3f3f46]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="flex-1 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED]"
          >
            Save Settings
          </button>
        </div>
      </motion.div>
    </div>
  );
}
