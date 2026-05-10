"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Gift,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { fmtLKR } from "../data";
import type { PaymentEntry, PaymentMethodType } from "../types";

interface Props {
  total: number;
  loyaltyBalance: number; // max redeemable in LKR
  onConfirm: (payments: PaymentEntry[]) => void;
  onClose: () => void;
  existing: PaymentEntry[];
}

const METHOD_META: Record<
  PaymentMethodType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  cash: {
    label: "Cash",
    icon: <Banknote className="w-4 h-4" />,
    color: "#10B981",
  },
  card: {
    label: "Card",
    icon: <CreditCard className="w-4 h-4" />,
    color: "#8B5CF6",
  },
  gift_voucher: {
    label: "Gift Voucher",
    icon: <Gift className="w-4 h-4" />,
    color: "#F59E0B",
  },
  loyalty: {
    label: "Loyalty Points",
    icon: <Star className="w-4 h-4" />,
    color: "#EC4899",
  },
  bank_transfer: {
    label: "Bank Transfer",
    icon: <Banknote className="w-4 h-4" />,
    color: "#06B6D4",
  },
};

let entryCounter = 100;
function newId() {
  return `pe-${++entryCounter}`;
}

export default function SplitPaymentModal({
  total,
  loyaltyBalance,
  onConfirm,
  onClose,
  existing,
}: Props) {
  const [payments, setPayments] = useState<PaymentEntry[]>(
    existing.length > 0
      ? existing
      : [{ id: newId(), method: "card", amount: total }],
  );
  const [addMethod, setAddMethod] = useState<PaymentMethodType>("cash");

  const totalPaid = payments.reduce((a, p) => a + p.amount, 0);
  const remaining = total - totalPaid;

  const updatePayment = (
    id: string,
    field: keyof PaymentEntry,
    value: string | number,
  ) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const addPayment = () => {
    const amt = remaining > 0 ? remaining : 0;
    if (addMethod === "loyalty") {
      const loyaltyAmt = Math.min(amt, loyaltyBalance);
      setPayments((prev) => [
        ...prev,
        { id: newId(), method: "loyalty", amount: loyaltyAmt },
      ]);
    } else {
      setPayments((prev) => [
        ...prev,
        { id: newId(), method: addMethod, amount: amt },
      ]);
    }
  };

  const removePayment = (id: string) => {
    if (payments.length === 1) return;
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  const isValid = totalPaid >= total;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
          <div>
            <h3 className="text-[#F5F5F7] font-bold">Split / Mixed Payment</h3>
            <p className="text-[#52525B] text-xs mt-0.5">
              Total due: {fmtLKR(total)}
            </p>
          </div>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        <div className="p-5 space-y-3 max-h-80 overflow-y-auto">
          {payments.map((p) => {
            const meta = METHOD_META[p.method];
            return (
              <div
                key={p.id}
                className="flex items-center gap-3 bg-[#1C1C22] rounded-xl px-3 py-2.5"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${meta.color}20`, color: meta.color }}
                >
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <select
                    value={p.method}
                    onChange={(e) =>
                      updatePayment(
                        p.id,
                        "method",
                        e.target.value as PaymentMethodType,
                      )
                    }
                    className="bg-transparent text-[#F5F5F7] text-sm outline-none w-full"
                  >
                    {(Object.keys(METHOD_META) as PaymentMethodType[]).map(
                      (m) => (
                        <option
                          key={m}
                          value={m}
                          className="bg-[#1C1C22] text-[#F5F5F7]"
                        >
                          {METHOD_META[m].label}
                        </option>
                      ),
                    )}
                  </select>
                  {p.method === "card" && (
                    <input
                      type="text"
                      placeholder="Last 4 digits"
                      maxLength={4}
                      value={p.cardLast4 ?? ""}
                      onChange={(e) =>
                        updatePayment(p.id, "cardLast4", e.target.value)
                      }
                      className="bg-transparent text-[#52525B] text-xs outline-none w-full mt-0.5"
                    />
                  )}
                  {(p.method === "gift_voucher" ||
                    p.method === "bank_transfer") && (
                    <input
                      type="text"
                      placeholder="Reference / Voucher No."
                      value={p.reference ?? ""}
                      onChange={(e) =>
                        updatePayment(p.id, "reference", e.target.value)
                      }
                      className="bg-transparent text-[#52525B] text-xs outline-none w-full mt-0.5"
                    />
                  )}
                  {p.method === "loyalty" && (
                    <p className="text-[#52525B] text-xs">
                      Max: {fmtLKR(loyaltyBalance)}
                    </p>
                  )}
                </div>
                <input
                  type="number"
                  value={p.amount}
                  min={0}
                  max={p.method === "loyalty" ? loyaltyBalance : total}
                  onChange={(e) =>
                    updatePayment(p.id, "amount", Number(e.target.value))
                  }
                  className="w-28 bg-[#141419] border border-[#27272A] rounded-lg px-2 py-1 text-sm text-[#F5F5F7] text-right outline-none focus:border-[#8B5CF6]/50"
                />
                <button
                  onClick={() => removePayment(p.id)}
                  disabled={payments.length === 1}
                  className="text-[#52525B] hover:text-[#EF4444] transition-colors disabled:opacity-30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add payment row */}
        <div className="px-5 pb-2 flex gap-2">
          <select
            value={addMethod}
            onChange={(e) => setAddMethod(e.target.value as PaymentMethodType)}
            className="flex-1 bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9 text-sm text-[#A1A1AA] outline-none"
          >
            {(Object.keys(METHOD_META) as PaymentMethodType[]).map((m) => (
              <option key={m} value={m} className="bg-[#1C1C22]">
                {METHOD_META[m].label}
              </option>
            ))}
          </select>
          <button
            onClick={addPayment}
            className="h-9 px-3 bg-[#1C1C22] border border-[#27272A] rounded-xl text-[#A1A1AA] hover:border-[#8B5CF6]/40 flex items-center gap-1 text-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        {/* Summary */}
        <div className="px-5 pb-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-[#52525B]">Total paid</span>
            <span
              className={
                totalPaid >= total ? "text-[#10B981]" : "text-[#F59E0B]"
              }
            >
              {fmtLKR(totalPaid)}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span className="text-[#52525B]">Remaining</span>
            <span
              className={remaining <= 0 ? "text-[#10B981]" : "text-[#EF4444]"}
            >
              {remaining <= 0 ? "PAID IN FULL" : fmtLKR(remaining)}
            </span>
          </div>
          {remaining < 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#52525B]">Change due</span>
              <span className="text-[#F59E0B]">
                {fmtLKR(Math.abs(remaining))}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:border-[#3f3f46]"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(payments)}
            disabled={!isValid}
            className="flex-1 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {remaining < 0
              ? `Confirm (Change: ${fmtLKR(Math.abs(remaining))})`
              : "Confirm Payment"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
