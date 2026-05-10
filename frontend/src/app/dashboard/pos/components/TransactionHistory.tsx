"use client";

import { motion } from "framer-motion";
import { Eye, RefreshCcw, Search, X } from "lucide-react";
import { useState } from "react";
import { fmtDateTime } from "../data";
import type { Transaction, TransactionStatus } from "../types";

interface Props {
  transactions: Transaction[];
  onViewReceipt: (t: Transaction) => void;
  onRefund: (t: Transaction) => void;
  onClose: () => void;
}

const STATUS_META: Record<TransactionStatus, { label: string; color: string }> =
  {
    paid: { label: "Paid", color: "#10B981" },
    partial: { label: "Partial", color: "#F59E0B" },
    refunded: { label: "Refunded", color: "#EF4444" },
    voided: { label: "Voided", color: "#52525B" },
    cancelled: { label: "Cancelled", color: "#52525B" },
  };

const METHOD_LABEL: Record<string, string> = {
  cash: "Cash",
  card: "Card",
  gift_voucher: "Gift",
  loyalty: "Loyalty",
  bank_transfer: "Bank",
};

export default function TransactionHistory({
  transactions,
  onViewReceipt,
  onRefund,
  onClose,
}: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">(
    "all",
  );

  const filtered = transactions.filter((t) => {
    const matchSearch =
      !search ||
      t.clientName.toLowerCase().includes(search.toLowerCase()) ||
      t.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = filtered
    .filter((t) => t.status === "paid" || t.status === "partial")
    .reduce((a, t) => a + t.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#27272A] shrink-0">
          <div>
            <h3 className="text-[#F5F5F7] font-bold">Transaction History</h3>
            <p className="text-[#52525B] text-xs">
              {filtered.length} transactions · LKR{" "}
              {totalRevenue.toLocaleString()} revenue
            </p>
          </div>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-[#27272A] shrink-0 space-y-3">
          <div className="flex items-center gap-2 bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9">
            <Search className="w-3.5 h-3.5 text-[#52525B] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client, receipt, or ID..."
              className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {(["all", "paid", "partial", "refunded", "voided"] as const).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${statusFilter === s ? "bg-[#8B5CF6] text-white" : "bg-[#1C1C22] border border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/30"}`}
                >
                  {s === "all" ? "All" : STATUS_META[s].label}
                </button>
              ),
            )}
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 divide-y divide-[#27272A]">
          {filtered.length === 0 ? (
            <p className="text-[#52525B] text-sm text-center py-10">
              No transactions found
            </p>
          ) : (
            filtered.map((t) => {
              const sm = STATUS_META[t.status];
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-[#1C1C22] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F5F5F7] text-sm font-medium truncate">
                        {t.clientName}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase shrink-0"
                        style={{
                          background: `${sm.color}20`,
                          color: sm.color,
                        }}
                      >
                        {sm.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[#52525B] text-[10px]">
                        {t.receiptNumber}
                      </span>
                      <span className="text-[#3f3f46] text-[10px]">·</span>
                      <span className="text-[#52525B] text-[10px]">
                        {fmtDateTime(t.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                      {t.payments.map((p, i) => (
                        <span
                          key={i}
                          className="text-[#3f3f46] text-[10px] bg-[#1C1C22] px-1.5 py-0.5 rounded"
                        >
                          {METHOD_LABEL[p.method] ?? p.method}
                        </span>
                      ))}
                      {t.staffName && (
                        <span className="text-[#3f3f46] text-[10px]">
                          · {t.staffName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#8B5CF6] text-sm font-bold">
                      LKR {t.total.toLocaleString()}
                    </p>
                    <p className="text-[#52525B] text-[10px]">
                      {t.items.length} item{t.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => onViewReceipt(t)}
                      className="w-7 h-7 rounded-lg bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#52525B] hover:text-[#8B5CF6] hover:border-[#8B5CF6]/40 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                    {(t.status === "paid" || t.status === "partial") && (
                      <button
                        onClick={() => onRefund(t)}
                        className="w-7 h-7 rounded-lg bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#52525B] hover:text-[#EF4444] hover:border-[#EF4444]/40 transition-colors"
                      >
                        <RefreshCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
