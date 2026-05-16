"use client";

import { motion } from "framer-motion";
import { Clock, Play, Trash2, X } from "lucide-react";
import { fmtDateTime } from "../data";
import type { SuspendedBill } from "../types";

interface Props {
  bills: SuspendedBill[];
  onResume: (bill: SuspendedBill) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function SuspendedBillsPanel({
  bills,
  onResume,
  onDelete,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A] shrink-0">
          <div>
            <h3 className="text-[#F5F5F7] font-bold">Suspended Bills</h3>
            <p className="text-[#52525B] text-xs">
              {bills.length} bill{bills.length !== 1 ? "s" : ""} on hold
            </p>
          </div>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {bills.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-10 h-10 text-[#3f3f46] mx-auto mb-3" />
              <p className="text-[#52525B] text-sm">No suspended bills</p>
              <p className="text-[#3f3f46] text-xs mt-1">
                Hold a bill to switch between customers
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#27272A]">
              {bills.map((bill) => {
                const total = bill.items.reduce(
                  (a, i) => a + i.price * i.qty,
                  0,
                );
                return (
                  <div
                    key={bill.id}
                    className="flex items-start gap-3 px-5 py-4 hover:bg-[#1C1C22] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {bill.clientName}
                      </p>
                      {(bill.queueNumber || bill.holdLabel) && (
                        <p className="text-[#F59E0B] text-[10px] font-semibold mt-0.5">
                          {bill.queueNumber}
                          {bill.holdLabel ? ` · ${bill.holdLabel}` : ""}
                        </p>
                      )}
                      <p className="text-[#52525B] text-xs mt-0.5">
                        {bill.items.length} item
                        {bill.items.length !== 1 ? "s" : ""} · LKR{" "}
                        {total.toLocaleString()}
                      </p>
                      <p className="text-[#3f3f46] text-[10px] mt-0.5">
                        Held {fmtDateTime(bill.suspendedAt)}
                      </p>
                      {bill.notes && (
                        <p className="text-[#52525B] text-xs mt-1 italic">
                          &ldquo;{bill.notes}&rdquo;
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {bill.items.slice(0, 3).map((item) => (
                          <span
                            key={item.id}
                            className="text-[10px] bg-[#1C1C22] border border-[#27272A] px-1.5 py-0.5 rounded text-[#3f3f46]"
                          >
                            {item.name}
                          </span>
                        ))}
                        {bill.items.length > 3 && (
                          <span className="text-[10px] text-[#3f3f46]">
                            +{bill.items.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => onResume(bill)}
                        className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors"
                        title="Resume"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(bill.id)}
                        className="w-8 h-8 rounded-lg bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#52525B] hover:text-[#EF4444] hover:border-[#EF4444]/40 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-5 pt-3 border-t border-[#27272A] shrink-0">
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
