"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Search, X } from "lucide-react";
import { useState } from "react";
import type { PaymentMethodType, RefundEntry, Transaction } from "../types";

interface Props {
  transaction: Transaction;
  onRefund: (entry: RefundEntry) => void;
  onVoid: () => void;
  onClose: () => void;
  managerName: string;
}

const REFUND_REASONS = [
  "Service quality issue",
  "Client changed mind",
  "Incorrect charge",
  "Duplicate payment",
  "Product defect",
  "Other",
];

const METHOD_LABEL: Record<PaymentMethodType, string> = {
  cash: "Cash",
  card: "Card",
  card_terminal: "Card Terminal",
  payhere: "PayHere",
  hela_pay: "Hela Pay",
  qr_payment: "QR Payment",
  gift_voucher: "Gift Voucher",
  loyalty: "Loyalty Points",
  bank_transfer: "Bank Transfer",
};

let refundCounter = 1;

export default function RefundModal({
  transaction: t,
  onRefund,
  onVoid,
  onClose,
  managerName,
}: Props) {
  const [mode, setMode] = useState<"full" | "partial">("full");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState(REFUND_REASONS[0]);
  const [customReason, setCustomReason] = useState("");
  const [refundMethod, setRefundMethod] = useState<PaymentMethodType>(
    t.payments[0]?.method ?? "cash",
  );
  const [confirmed, setConfirmed] = useState(false);

  const alreadyRefunded = t.refunds.reduce((a, r) => a + r.amount, 0);
  const maxRefund = t.total - alreadyRefunded;

  const partialAmt = selectedItems.reduce((a, id) => {
    const item = t.items.find((i) => i.id === id);
    return a + (item ? item.price * item.qty : 0);
  }, 0);

  const refundAmount = mode === "full" ? maxRefund : partialAmt;
  const finalReason = reason === "Other" ? customReason : reason;

  const toggleItem = (id: string) =>
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const submit = () => {
    if (!finalReason || refundAmount <= 0) return;
    const entry: RefundEntry = {
      id: `REF-${++refundCounter}`,
      itemIds: mode === "full" ? [] : selectedItems,
      amount: refundAmount,
      reason: finalReason,
      method: refundMethod,
      timestamp: new Date(),
      authorizedBy: managerName,
    };
    onRefund(entry);
  };

  if (confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-sm p-6 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
          </div>
          <h3 className="text-[#F5F5F7] font-bold mb-1">Refund Processed</h3>
          <p className="text-[#52525B] text-sm mb-1">
            LKR {refundAmount.toLocaleString()}
          </p>
          <p className="text-[#3f3f46] text-xs">
            via {METHOD_LABEL[refundMethod]}
          </p>
          <p className="text-[#3f3f46] text-xs mt-1">
            Authorised by {managerName}
          </p>
          <button
            onClick={onClose}
            className="mt-5 w-full h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED]"
          >
            Close
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
          <div>
            <h3 className="text-[#F5F5F7] font-bold">Refund / Void</h3>
            <p className="text-[#52525B] text-xs">
              {t.receiptNumber} · {t.clientName}
            </p>
          </div>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Max refund info */}
          <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl px-4 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#52525B]">Original total</span>
              <span className="text-[#F5F5F7]">
                LKR {t.total.toLocaleString()}
              </span>
            </div>
            {alreadyRefunded > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#52525B]">Already refunded</span>
                <span className="text-[#EF4444]">
                  LKR {alreadyRefunded.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold mt-1 border-t border-[#27272A] pt-2">
              <span className="text-[#52525B]">Available to refund</span>
              <span className="text-[#10B981]">
                LKR {maxRefund.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Mode */}
          {t.status !== "voided" && (
            <>
              <div className="flex gap-2">
                {(["full", "partial"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setSelectedItems([]);
                    }}
                    className={`flex-1 h-9 rounded-xl border text-sm font-semibold transition-colors capitalize ${mode === m ? "bg-[#8B5CF6] border-[#8B5CF6] text-white" : "border-[#27272A] text-[#A1A1AA] hover:border-[#8B5CF6]/40"}`}
                  >
                    {m === "full" ? "Full Refund" : "Line Items"}
                  </button>
                ))}
              </div>

              {/* Partial — item selection */}
              {mode === "partial" && (
                <div className="space-y-1">
                  <p className="text-[#52525B] text-xs">
                    Select items to refund
                  </p>
                  {t.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-colors ${selectedItems.includes(item.id) ? "border-[#8B5CF6] bg-[#8B5CF6]/10" : "border-[#27272A] bg-[#1C1C22] hover:border-[#8B5CF6]/30"}`}
                    >
                      <div className="text-left">
                        <p className="text-[#F5F5F7] text-xs font-medium">
                          {item.name}
                        </p>
                        <p className="text-[#52525B] text-[10px]">
                          × {item.qty}
                        </p>
                      </div>
                      <span className="text-[#8B5CF6] text-sm font-semibold">
                        LKR {(item.price * item.qty).toLocaleString()}
                      </span>
                    </button>
                  ))}
                  {selectedItems.length > 0 && (
                    <div className="flex justify-between text-sm font-bold mt-2 px-1">
                      <span className="text-[#52525B]">Refund amount</span>
                      <span className="text-[#EF4444]">
                        LKR {partialAmt.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="text-[#52525B] text-xs block mb-2">
                  Refund Reason
                </label>
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  {REFUND_REASONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setReason(r)}
                      className={`py-2 px-2.5 rounded-lg border text-xs text-left transition-colors ${reason === r ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#F5F5F7]" : "border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/30"}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {reason === "Other" && (
                  <input
                    type="text"
                    placeholder="Specify reason..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
                  />
                )}
              </div>

              {/* Refund method */}
              <div>
                <label className="text-[#52525B] text-xs block mb-2">
                  Refund Via
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    ["cash", "card", "bank_transfer"] as PaymentMethodType[]
                  ).map((m) => (
                    <button
                      key={m}
                      onClick={() => setRefundMethod(m)}
                      className={`h-9 rounded-lg border text-xs font-semibold capitalize transition-colors ${refundMethod === m ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#F5F5F7]" : "border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/30"}`}
                    >
                      {METHOD_LABEL[m]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Refund summary */}
              {refundAmount > 0 && (
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl px-4 py-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="text-[#F5F5F7] font-semibold">
                      Refund LKR {refundAmount.toLocaleString()} via{" "}
                      {METHOD_LABEL[refundMethod]}
                    </p>
                    <p className="text-[#52525B] mt-0.5">
                      Authorised by {managerName}. This action cannot be undone.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Void option (only if not yet finalized with payments) */}
          <div className="border-t border-[#27272A] pt-3">
            <p className="text-[#52525B] text-xs mb-2">
              Void entire transaction
            </p>
            <button
              onClick={() => {
                onVoid();
                onClose();
              }}
              className="w-full h-9 rounded-xl border border-[#EF4444]/30 text-[#EF4444] text-sm hover:bg-[#EF4444]/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" /> Void Transaction
            </button>
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
              submit();
              setConfirmed(true);
            }}
            disabled={
              refundAmount <= 0 ||
              !finalReason ||
              (mode === "partial" && selectedItems.length === 0)
            }
            className="flex-1 h-10 rounded-xl bg-[#EF4444] text-white text-sm font-semibold hover:bg-[#DC2626] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Process Refund · LKR {refundAmount.toLocaleString()}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
