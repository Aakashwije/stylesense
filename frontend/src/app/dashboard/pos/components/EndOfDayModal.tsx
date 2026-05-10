"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  BarChart3,
  CreditCard,
  RefreshCcw,
  Tag,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { fmtDate } from "../data";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  onClose: () => void;
}

function isToday(d: Date) {
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export default function EndOfDayModal({ transactions, onClose }: Props) {
  const todayTxns = transactions.filter((t) => isToday(t.timestamp));
  const paid = todayTxns.filter(
    (t) => t.status === "paid" || t.status === "partial",
  );

  const totalSales = paid.reduce((a, t) => a + t.total, 0);
  const cashTotal = paid.reduce(
    (a, t) =>
      a +
      t.payments
        .filter((p) => p.method === "cash")
        .reduce((s, p) => s + p.amount, 0),
    0,
  );
  const cardTotal = paid.reduce(
    (a, t) =>
      a +
      t.payments
        .filter((p) => p.method === "card")
        .reduce((s, p) => s + p.amount, 0),
    0,
  );
  const otherTotal = totalSales - cashTotal - cardTotal;

  const totalRefunds = todayTxns.reduce(
    (a, t) => a + t.refunds.reduce((s, r) => s + r.amount, 0),
    0,
  );
  const totalDiscount = paid.reduce((a, t) => a + t.discountAmount, 0);
  const totalTips = paid.reduce((a, t) => a + t.tipAmount, 0);
  const totalTax = paid.reduce((a, t) => a + t.taxAmount, 0);

  // Service vs product split
  const serviceRevenue = paid.reduce((a, t) => {
    return (
      a +
      t.items
        .filter((i) => i.type === "service")
        .reduce((s, i) => s + i.price * i.qty, 0)
    );
  }, 0);
  const productRevenue = paid.reduce((a, t) => {
    return (
      a +
      t.items
        .filter((i) => i.type === "product")
        .reduce((s, i) => s + i.price * i.qty, 0)
    );
  }, 0);

  // Top services
  const serviceCount: Record<
    string,
    { name: string; qty: number; revenue: number }
  > = {};
  paid.forEach((t) => {
    t.items
      .filter((i) => i.type === "service")
      .forEach((i) => {
        if (!serviceCount[i.id]) {
          serviceCount[i.id] = { name: i.name, qty: 0, revenue: 0 };
        }
        serviceCount[i.id].qty += i.qty;
        serviceCount[i.id].revenue += i.price * i.qty;
      });
  });
  const topServices = Object.values(serviceCount)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Stylist breakdown
  const stylistMap: Record<
    string,
    { name: string; revenue: number; txns: number }
  > = {};
  paid.forEach((t) => {
    const key = t.staffName || "Unassigned";
    if (!stylistMap[key]) stylistMap[key] = { name: key, revenue: 0, txns: 0 };
    stylistMap[key].revenue += t.total;
    stylistMap[key].txns++;
  });
  const stylistBreakdown = Object.values(stylistMap).sort(
    (a, b) => b.revenue - a.revenue,
  );

  const statCard = (
    label: string,
    value: string,
    icon: React.ReactNode,
    sub?: string,
    color = "#8B5CF6",
  ) => (
    <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl p-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[#52525B] text-xs">{label}</p>
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: `${color}20`, color }}
        >
          {icon}
        </div>
      </div>
      <p className="text-[#F5F5F7] font-bold text-base">{value}</p>
      {sub && <p className="text-[#52525B] text-[10px] mt-0.5">{sub}</p>}
    </div>
  );

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
            <h3 className="text-[#F5F5F7] font-bold">End-of-Day Report</h3>
            <p className="text-[#52525B] text-xs">{fmtDate(new Date())}</p>
          </div>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          {/* Summary grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {statCard(
              "Total Sales",
              `LKR ${totalSales.toLocaleString()}`,
              <TrendingUp className="w-3.5 h-3.5" />,
              `${paid.length} transactions`,
            )}
            {statCard(
              "Cash",
              `LKR ${cashTotal.toLocaleString()}`,
              <Banknote className="w-3.5 h-3.5" />,
              "Expected in drawer",
              "#10B981",
            )}
            {statCard(
              "Card / Digital",
              `LKR ${(cardTotal + otherTotal).toLocaleString()}`,
              <CreditCard className="w-3.5 h-3.5" />,
              "Non-cash payments",
              "#06B6D4",
            )}
            {statCard(
              "Refunds",
              `LKR ${totalRefunds.toLocaleString()}`,
              <RefreshCcw className="w-3.5 h-3.5" />,
              `${todayTxns.filter((t) => t.refunds.length > 0).length} transactions`,
              "#EF4444",
            )}
          </div>

          {/* Secondary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {statCard(
              "Discounts Given",
              `LKR ${totalDiscount.toLocaleString()}`,
              <Tag className="w-3.5 h-3.5" />,
              undefined,
              "#F59E0B",
            )}
            {statCard(
              "Tips Collected",
              `LKR ${totalTips.toLocaleString()}`,
              <Users className="w-3.5 h-3.5" />,
              undefined,
              "#EC4899",
            )}
            {statCard(
              "Tax Collected",
              `LKR ${totalTax.toLocaleString()}`,
              <BarChart3 className="w-3.5 h-3.5" />,
              undefined,
              "#8B5CF6",
            )}
            {statCard(
              "Net Revenue",
              `LKR ${(totalSales - totalRefunds).toLocaleString()}`,
              <TrendingUp className="w-3.5 h-3.5" />,
              "After refunds",
              "#10B981",
            )}
          </div>

          {/* Service vs product */}
          <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl p-4">
            <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-3">
              Revenue Breakdown
            </p>
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-[#8B5CF6] text-sm font-bold">
                  LKR {serviceRevenue.toLocaleString()}
                </p>
                <p className="text-[#52525B] text-xs">Services</p>
              </div>
              <div className="flex-1">
                <p className="text-[#06B6D4] text-sm font-bold">
                  LKR {productRevenue.toLocaleString()}
                </p>
                <p className="text-[#52525B] text-xs">Products / Retail</p>
              </div>
            </div>
            {/* Bar */}
            {totalSales > 0 && (
              <div className="mt-3 h-2 bg-[#27272A] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#8B5CF6] rounded-l-full"
                  style={{ width: `${(serviceRevenue / totalSales) * 100}%` }}
                />
                <div className="h-full bg-[#06B6D4] rounded-r-full flex-1" />
              </div>
            )}
          </div>

          {/* Top services */}
          {topServices.length > 0 && (
            <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl p-4">
              <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-3">
                Top Services
              </p>
              <div className="space-y-2">
                {topServices.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-[#3f3f46] text-xs w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-[#F5F5F7] text-xs truncate">
                          {s.name}
                        </span>
                        <span className="text-[#8B5CF6] text-xs font-semibold">
                          LKR {s.revenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1 bg-[#27272A] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#8B5CF6] rounded-full"
                          style={{
                            width: `${(s.revenue / (topServices[0]?.revenue ?? 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-[#52525B] text-[10px] w-8 text-right">
                      ×{s.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stylist breakdown */}
          {stylistBreakdown.length > 0 && (
            <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl p-4">
              <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-3">
                Stylist Revenue
              </p>
              <div className="space-y-2">
                {stylistBreakdown.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[#F5F5F7] text-sm">{s.name}</p>
                      <p className="text-[#52525B] text-xs">
                        {s.txns} transaction{s.txns !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span className="text-[#8B5CF6] font-semibold text-sm">
                      LKR {s.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cash drawer closing */}
          <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-4">
            <p className="text-[#10B981] text-xs font-semibold uppercase tracking-wider mb-2">
              Expected Cash Drawer
            </p>
            <p className="text-[#F5F5F7] text-2xl font-bold">
              LKR {cashTotal.toLocaleString()}
            </p>
            <p className="text-[#52525B] text-xs mt-1">
              Opening float + cash received − cash refunded
            </p>
          </div>
        </div>

        <div className="p-5 pt-3 border-t border-[#27272A] shrink-0">
          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED]"
          >
            Close Report
          </button>
        </div>
      </motion.div>
    </div>
  );
}
