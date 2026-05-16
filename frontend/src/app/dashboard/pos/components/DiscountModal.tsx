"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Percent,
  Tag,
  Ticket,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { LARGE_DISCOUNT_THRESHOLD, PROMO_CODES } from "../data";
import type { DiscountConfig, DiscountType } from "../types";

interface Props {
  subtotal: number;
  memberLevel: string | null;
  onApply: (cfg: DiscountConfig) => void;
  onClear: () => void;
  onClose: () => void;
  onNeedApproval: (cfg: DiscountConfig) => void;
  current: DiscountConfig | null;
}

const TABS: { id: DiscountType; label: string; icon: React.ReactNode }[] = [
  { id: "percent", label: "% Off", icon: <Percent className="w-3.5 h-3.5" /> },
  { id: "amount", label: "Amount", icon: <Tag className="w-3.5 h-3.5" /> },
  {
    id: "promo",
    label: "Promo Code",
    icon: <Ticket className="w-3.5 h-3.5" />,
  },
  { id: "member", label: "Member", icon: <Check className="w-3.5 h-3.5" /> },
  {
    id: "happy_hour",
    label: "Happy Hour",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    id: "bundle",
    label: "Bundle",
    icon: <Tag className="w-3.5 h-3.5" />,
  },
];

const PERCENT_PRESETS = [5, 10, 15, 20, 25, 30];
const MEMBER_DISCOUNTS: Record<string, { value: number; label: string }> = {
  bronze: { value: 5, label: "5% Bronze Member" },
  silver: { value: 10, label: "10% Silver Member" },
  gold: { value: 15, label: "15% Gold Member" },
  platinum: { value: 20, label: "20% Platinum Member" },
};
const HAPPY_HOUR_PRESETS = [
  { value: 10, label: "10% — Morning (9–11am)" },
  { value: 15, label: "15% — Midday (12–2pm)" },
  { value: 20, label: "20% — Quiet Hours (3–5pm)" },
];
const BUNDLE_PRESETS = [
  { value: 12, label: "12% — Cut + Blowout Bundle" },
  { value: 18, label: "18% — Colour Care Bundle" },
  { value: 22, label: "22% — Bridal Prep Bundle" },
];

export default function DiscountModal({
  subtotal,
  memberLevel,
  onApply,
  onClear,
  onClose,
  onNeedApproval,
  current,
}: Props) {
  const [tab, setTab] = useState<DiscountType>(
    current?.type ?? (memberLevel ? "member" : "percent"),
  );
  const [percentVal, setPercentVal] = useState(
    current?.type === "percent" ? String(current.value) : "",
  );
  const [amountVal, setAmountVal] = useState(
    current?.type === "amount" ? String(current.value) : "",
  );
  const [promoCode, setPromoCode] = useState(current?.code ?? "");
  const [promoError, setPromoError] = useState("");

  const tryApply = (cfg: DiscountConfig) => {
    // Require manager approval for discounts > LARGE_DISCOUNT_THRESHOLD%
    const pct =
      cfg.type === "percent" ||
      cfg.type === "member" ||
      cfg.type === "bundle" ||
      cfg.type === "happy_hour"
        ? cfg.value
        : cfg.type === "promo" &&
            PROMO_CODES[cfg.code ?? ""]?.type === "percent"
          ? cfg.value
          : (cfg.value / subtotal) * 100;

    if (pct >= LARGE_DISCOUNT_THRESHOLD && !cfg.approvedBy) {
      onNeedApproval(cfg);
    } else {
      onApply(cfg);
    }
  };

  const applyPercent = (val: number) => {
    tryApply({ type: "percent", value: val, label: `${val}% Discount` });
  };

  const applyAmount = () => {
    const v = Number(amountVal);
    if (!v || v <= 0 || v > subtotal) return;
    tryApply({
      type: "amount",
      value: v,
      label: `LKR ${v.toLocaleString()} Off`,
    });
  };

  const applyPromo = () => {
    setPromoError("");
    const code = promoCode.trim().toUpperCase();
    const promo = PROMO_CODES[code];
    if (!promo) {
      setPromoError("Invalid promo code");
      return;
    }
    const cfg: DiscountConfig = {
      type: "promo",
      value: promo.value,
      code,
      label: promo.label,
    };
    tryApply(cfg);
  };

  const applyMember = () => {
    if (!memberLevel) return;
    const d = MEMBER_DISCOUNTS[memberLevel];
    if (!d) return;
    tryApply({ type: "member", value: d.value, label: d.label });
  };

  const applyHappyHour = (val: number, label: string) => {
    tryApply({ type: "happy_hour", value: val, label });
  };

  const applyBundle = (val: number, label: string) => {
    tryApply({ type: "bundle", value: val, label });
  };

  const discountAmount = current
    ? current.type === "percent" ||
      current.type === "member" ||
      current.type === "bundle" ||
      current.type === "happy_hour"
      ? Math.round((subtotal * current.value) / 100)
      : current.type === "promo"
        ? PROMO_CODES[current.code ?? ""]?.type === "percent"
          ? Math.round((subtotal * current.value) / 100)
          : Math.min(current.value, subtotal)
        : Math.min(current.value, subtotal)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
          <h3 className="text-[#F5F5F7] font-bold">Discounts & Promotions</h3>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        {/* Current discount banner */}
        {current && (
          <div className="mx-5 mt-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 px-4 py-2.5 flex items-center justify-between">
            <div>
              <p className="text-[#10B981] text-xs font-semibold">Applied</p>
              <p className="text-[#F5F5F7] text-sm font-medium">
                {current.label}
              </p>
              <p className="text-[#10B981] text-xs">
                − LKR {discountAmount.toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClear}
              className="text-[#52525B] hover:text-[#EF4444] text-xs border border-[#27272A] px-2 py-1 rounded-lg"
            >
              Remove
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mx-5 mt-4 p-1 bg-[#1C1C22] rounded-xl">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold transition-colors ${tab === t.id ? "bg-[#8B5CF6] text-white" : "text-[#52525B] hover:text-[#A1A1AA]"}`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {/* Percent tab */}
              {tab === "percent" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {PERCENT_PRESETS.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPercentVal(String(p));
                          applyPercent(p);
                        }}
                        className={`h-10 rounded-xl border text-sm font-semibold transition-colors ${current?.type === "percent" && current.value === p ? "bg-[#8B5CF6] border-[#8B5CF6] text-white" : "border-[#27272A] text-[#A1A1AA] hover:border-[#8B5CF6]/40"}`}
                      >
                        {p}%
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Custom %"
                      value={percentVal}
                      onChange={(e) => setPercentVal(e.target.value)}
                      min={1}
                      max={100}
                      className="flex-1 bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
                    />
                    <button
                      onClick={() =>
                        percentVal && applyPercent(Number(percentVal))
                      }
                      className="h-10 px-4 bg-[#8B5CF6] text-white text-sm font-semibold rounded-xl hover:bg-[#7C3AED]"
                    >
                      Apply
                    </button>
                  </div>
                  {Number(percentVal) >= LARGE_DISCOUNT_THRESHOLD && (
                    <p className="text-[#F59E0B] text-xs flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> Requires manager
                      approval
                    </p>
                  )}
                </div>
              )}

              {/* Amount tab */}
              {tab === "amount" && (
                <div className="space-y-3">
                  <p className="text-[#52525B] text-xs">
                    Enter flat discount amount (LKR)
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={amountVal}
                      onChange={(e) => setAmountVal(e.target.value)}
                      className="flex-1 bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
                    />
                    <button
                      onClick={applyAmount}
                      className="h-10 px-4 bg-[#8B5CF6] text-white text-sm font-semibold rounded-xl hover:bg-[#7C3AED]"
                    >
                      Apply
                    </button>
                  </div>
                  {amountVal && subtotal > 0 && (
                    <p className="text-[#52525B] text-xs">
                      ≈ {Math.round((Number(amountVal) / subtotal) * 100)}% of
                      subtotal
                      {Math.round((Number(amountVal) / subtotal) * 100) >=
                        LARGE_DISCOUNT_THRESHOLD && (
                        <span className="text-[#F59E0B] ml-2">
                          — requires manager approval
                        </span>
                      )}
                    </p>
                  )}
                </div>
              )}

              {/* Promo code tab */}
              {tab === "promo" && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        setPromoError("");
                      }}
                      className="flex-1 bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 uppercase"
                    />
                    <button
                      onClick={applyPromo}
                      className="h-10 px-4 bg-[#8B5CF6] text-white text-sm font-semibold rounded-xl hover:bg-[#7C3AED]"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[#EF4444] text-xs">{promoError}</p>
                  )}
                  <div className="space-y-1">
                    <p className="text-[#3f3f46] text-[10px] font-semibold uppercase tracking-wider">
                      Available codes
                    </p>
                    {Object.entries(PROMO_CODES).map(([code, p]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setPromoCode(code);
                          setPromoError("");
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg bg-[#1C1C22] hover:bg-[#27272A] transition-colors"
                      >
                        <span className="text-[#8B5CF6] font-mono text-xs mr-2">
                          {code}
                        </span>
                        <span className="text-[#A1A1AA] text-xs">
                          {p.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Member tab */}
              {tab === "member" && (
                <div className="space-y-3">
                  {memberLevel ? (
                    <>
                      <div className="rounded-xl bg-[#1C1C22] border border-[#27272A] p-4">
                        <p className="text-[#A1A1AA] text-xs mb-1">
                          Client tier
                        </p>
                        <p className="text-[#F5F5F7] font-semibold capitalize">
                          {memberLevel}
                        </p>
                        <p className="text-[#8B5CF6] text-sm font-bold mt-1">
                          {MEMBER_DISCOUNTS[memberLevel]?.value}% discount
                        </p>
                      </div>
                      <button
                        onClick={applyMember}
                        className="w-full h-10 bg-[#8B5CF6] text-white text-sm font-semibold rounded-xl hover:bg-[#7C3AED]"
                      >
                        Apply Member Discount
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-[#52525B] text-sm">
                        No member selected
                      </p>
                      <p className="text-[#3f3f46] text-xs mt-1">
                        Select a client with a membership to see member
                        discounts
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Happy hour tab */}
              {tab === "happy_hour" && (
                <div className="space-y-2">
                  {HAPPY_HOUR_PRESETS.map((h) => (
                    <button
                      key={h.value}
                      onClick={() => applyHappyHour(h.value, h.label)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${current?.type === "happy_hour" && current.value === h.value ? "border-[#8B5CF6] bg-[#8B5CF6]/10" : "border-[#27272A] bg-[#1C1C22] hover:border-[#8B5CF6]/40"}`}
                    >
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {h.label}
                      </p>
                      <p className="text-[#52525B] text-xs">
                        − LKR{" "}
                        {Math.round(
                          (subtotal * h.value) / 100,
                        ).toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* Bundle tab */}
              {tab === "bundle" && (
                <div className="space-y-2">
                  {BUNDLE_PRESETS.map((b) => (
                    <button
                      key={b.label}
                      onClick={() => applyBundle(b.value, b.label)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${current?.type === "bundle" && current.value === b.value ? "border-[#8B5CF6] bg-[#8B5CF6]/10" : "border-[#27272A] bg-[#1C1C22] hover:border-[#8B5CF6]/40"}`}
                    >
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {b.label}
                      </p>
                      <p className="text-[#52525B] text-xs">
                        − LKR{" "}
                        {Math.round(
                          (subtotal * b.value) / 100,
                        ).toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:border-[#3f3f46]"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
