"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Banknote,
  BookOpen,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Gift,
  History,
  Minus,
  Pause,
  Percent,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Smile,
  Star,
  Sunset,
  Tag,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CLIENTS,
  DEFAULT_TAX_CONFIG,
  LOW_STOCK_THRESHOLD,
  LOYALTY_REDEEM_RATE,
  PRODUCTS,
  QUICK_SERVICES,
  SAMPLE_TRANSACTIONS,
  SERVICE_CHARGE_RATE,
  STYLISTS,
  fmtLKR,
  generateReceiptNumber,
  generateTxnId,
} from "./data";
import type {
  Client,
  DiscountConfig,
  LineItem,
  PaymentEntry,
  PaymentMethodType,
  RefundEntry,
  Stylist,
  SuspendedBill,
  TaxConfig,
  Transaction,
} from "./types";

import DiscountModal from "./components/DiscountModal";
import EndOfDayModal from "./components/EndOfDayModal";
import ManagerPinModal from "./components/ManagerPinModal";
import ReceiptModal from "./components/ReceiptModal";
import RefundModal from "./components/RefundModal";
import SplitPaymentModal from "./components/SplitPaymentModal";
import SuspendedBillsPanel from "./components/SuspendedBillsPanel";
import TaxConfigModal from "./components/TaxConfigModal";
import TipsServiceModal from "./components/TipsServiceModal";
import TransactionHistory from "./components/TransactionHistory";

// ── Product stock tracker ──────────────────────────────────────────────────────
type StockMap = Record<string, number>;
const initStock = (): StockMap => {
  const m: StockMap = {};
  PRODUCTS.forEach((p) => {
    m[p.id] = p.stock;
  });
  return m;
};

// ── Walk-in sentinel ───────────────────────────────────────────────────────────
const WALK_IN: Client = CLIENTS.find((c) => c.id === "walk-in")!;

// ── Payment method options ─────────────────────────────────────────────────────
const PAYMENT_METHODS: {
  id: PaymentMethodType | "split";
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "cash", label: "Cash", icon: <Banknote className="w-3.5 h-3.5" /> },
  { id: "card", label: "Card", icon: <CreditCard className="w-3.5 h-3.5" /> },
  {
    id: "gift_voucher",
    label: "Voucher",
    icon: <Gift className="w-3.5 h-3.5" />,
  },
  { id: "loyalty", label: "Loyalty", icon: <Star className="w-3.5 h-3.5" /> },
  { id: "split", label: "Split", icon: <Zap className="w-3.5 h-3.5" /> },
];

// ── Member badge colours ───────────────────────────────────────────────────────
const MEMBER_COLORS: Record<string, string> = {
  bronze: "#CD7F32",
  silver: "#9CA3AF",
  gold: "#F59E0B",
  platinum: "#8B5CF6",
};

// ── Animation preset ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay },
});

// ── ID counters ────────────────────────────────────────────────────────────────
let suspendCounter = 0;
let payEntryCounter = 0;
const newPayId = () => `pe-${++payEntryCounter}`;

// ═══════════════════════════════════════════════════════════════════════════════
export default function POSPage() {
  // ── Bill ──────────────────────────────────────────────────────────────────
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  const [bill, setBill] = useState<LineItem[]>([]);
  const [client, setClient] = useState<Client>(WALK_IN);
  const [staff, setStaff] = useState<Stylist>(STYLISTS[0]);
  const [discountConfig, setDiscountConfig] = useState<DiscountConfig | null>(
    null,
  );
  const [tipAmount, setTipAmount] = useState(0);
  const [serviceChargeEnabled, setServiceChargeEnabled] = useState(false);
  const [loyaltyRedeemed, setLoyaltyRedeemed] = useState(0);
  const [taxConfig, setTaxConfig] = useState<TaxConfig>(DEFAULT_TAX_CONFIG);
  const [billNotes, setBillNotes] = useState("");
  const [nextService, setNextService] = useState("");
  const [rebookDate, setRebookDate] = useState("");
  const [splitPayments, setSplitPayments] = useState<PaymentEntry[]>([]);
  const [payMethod, setPayMethod] = useState<PaymentMethodType | "split">(
    "card",
  );

  // ── Catalog & inventory ────────────────────────────────────────────────────
  const [catalogTab, setCatalogTab] = useState<"services" | "products">(
    "services",
  );
  const [search, setSearch] = useState("");
  const [stock, setStock] = useState<StockMap>(initStock);

  // ── App data ───────────────────────────────────────────────────────────────
  const [transactions, setTransactions] =
    useState<Transaction[]>(SAMPLE_TRANSACTIONS);
  const [suspendedBills, setSuspendedBills] = useState<SuspendedBill[]>([]);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(
    null,
  );

  // ── UI state ───────────────────────────────────────────────────────────────
  const [showClientDD, setShowClientDD] = useState(false);
  const [showStaffDD, setShowStaffDD] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showEOD, setShowEOD] = useState(false);
  const [showSuspended, setShowSuspended] = useState(false);
  const [showTaxConfig, setShowTaxConfig] = useState(false);
  const [showManagerPin, setShowManagerPin] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [completedTxn, setCompletedTxn] = useState<Transaction | null>(null);
  const [refundTarget, setRefundTarget] = useState<Transaction | null>(null);
  const [managerPinCallback, setManagerPinCallback] = useState<
    (() => void) | null
  >(null);
  const [managerPinTitle, setManagerPinTitle] = useState("Manager Approval");
  const [pendingDiscount, setPendingDiscount] = useState<DiscountConfig | null>(
    null,
  );

  // ── Computed totals ────────────────────────────────────────────────────────
  const subtotal = useMemo(
    () => bill.reduce((a, i) => a + i.price * i.qty, 0),
    [bill],
  );

  const discountAmount = useMemo(() => {
    if (!discountConfig) return 0;
    const { type, value } = discountConfig;
    if (["percent", "member", "happy_hour", "bundle"].includes(type)) {
      return Math.round((subtotal * value) / 100);
    }
    // promo stores already-resolved amount in value
    return Math.min(value, subtotal);
  }, [discountConfig, subtotal]);

  const afterDiscount = subtotal - discountAmount - loyaltyRedeemed;

  const serviceChargeAmt = serviceChargeEnabled
    ? Math.round((afterDiscount * SERVICE_CHARGE_RATE) / 100)
    : 0;

  const preTaxTotal = afterDiscount + serviceChargeAmt + tipAmount;

  const taxAmount = useMemo(() => {
    if (taxConfig.rate === 0) return 0;
    if (taxConfig.inclusive) {
      return Math.round(preTaxTotal - preTaxTotal / (1 + taxConfig.rate / 100));
    }
    return Math.round((preTaxTotal * taxConfig.rate) / 100);
  }, [taxConfig, preTaxTotal]);

  const total = taxConfig.inclusive ? preTaxTotal : preTaxTotal + taxAmount;

  const loyaltyMax = Math.min(
    client.loyaltyPoints * LOYALTY_REDEEM_RATE,
    Math.max(0, total),
  );

  // ── Catalog helpers ────────────────────────────────────────────────────────
  const catalogItems = catalogTab === "services" ? QUICK_SERVICES : PRODUCTS;

  const searchResults =
    search.length > 1
      ? [...QUICK_SERVICES, ...PRODUCTS].filter((x) =>
          x.name.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  const addItem = (
    item: (typeof QUICK_SERVICES)[number] | (typeof PRODUCTS)[number],
  ) => {
    const isProduct = item.type === "product";
    const currentStock = isProduct ? (stock[item.id] ?? 0) : Infinity;
    const inBill = bill.find((x) => x.id === item.id);
    const billQty = inBill?.qty ?? 0;

    if (isProduct && currentStock - billQty <= 0) return;

    setBill((b) => {
      const existing = b.find((x) => x.id === item.id);
      if (existing)
        return b.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      return [
        ...b,
        {
          id: item.id,
          name: item.name,
          type: item.type,
          price: item.price,
          qty: 1,
          stylistId: staff.id,
          stylistName: staff.name,
        },
      ];
    });
    setSearch("");
  };

  const changeQty = (id: string, delta: number) => {
    const item = bill.find((x) => x.id === id);
    if (!item) return;
    const isProduct = item.type === "product";
    const currentStock = isProduct ? (stock[id] ?? 0) : Infinity;
    if (delta > 0 && isProduct && item.qty >= currentStock) return;
    setBill((b) =>
      b
        .map((x) =>
          x.id === id ? { ...x, qty: Math.max(0, x.qty + delta) } : x,
        )
        .filter((x) => x.qty > 0),
    );
  };

  // ── Discount helpers ───────────────────────────────────────────────────────
  const handleDiscountApply = (cfg: DiscountConfig) => {
    setDiscountConfig(cfg);
    setShowDiscount(false);
  };

  const handleDiscountNeedApproval = (cfg: DiscountConfig) => {
    setPendingDiscount(cfg);
    setManagerPinTitle("Approve Large Discount");
    setManagerPinCallback(() => () => {
      setDiscountConfig({ ...cfg, approvedBy: "Manager" });
      setShowDiscount(false);
      setPendingDiscount(null);
    });
    setShowManagerPin(true);
  };

  // ── Loyalty toggle ─────────────────────────────────────────────────────────
  const handleRedeemLoyalty = () => {
    setLoyaltyRedeemed((v) => (v > 0 ? 0 : loyaltyMax));
  };

  // ── Clear bill ─────────────────────────────────────────────────────────────
  const clearBill = () => {
    setBill([]);
    setDiscountConfig(null);
    setTipAmount(0);
    setServiceChargeEnabled(false);
    setLoyaltyRedeemed(0);
    setBillNotes("");
    setNextService("");
    setRebookDate("");
    setSplitPayments([]);
    setPayMethod("card");
    setClient(WALK_IN);
  };

  // ── Process payment ────────────────────────────────────────────────────────
  const processPayment = (overridePayments?: PaymentEntry[]) => {
    if (bill.length === 0) return;

    let payments: PaymentEntry[];
    if (payMethod === "split") {
      payments = overridePayments ?? splitPayments;
    } else {
      payments = [
        {
          id: newPayId(),
          method: payMethod as PaymentMethodType,
          amount: total,
        },
      ];
    }

    const amountPaid = payments.reduce((a, p) => a + p.amount, 0);
    const status = amountPaid >= total ? "paid" : "partial";

    const txn: Transaction = {
      id: generateTxnId(),
      receiptNumber: generateReceiptNumber(),
      status,
      clientName: client.name,
      clientPhone: client.phone,
      clientEmail: client.email,
      isWalkIn: client.id === "walk-in",
      items: [...bill],
      subtotal,
      discountConfig,
      discountAmount,
      serviceCharge: serviceChargeAmt,
      tipAmount,
      taxAmount,
      taxRate: taxConfig.rate,
      taxInclusive: taxConfig.inclusive,
      total,
      payments,
      amountPaid,
      balance: total - amountPaid,
      staffName: staff.name,
      cashierName: "Admin",
      notes: billNotes,
      nextService,
      rebookDate,
      loyaltyPointsEarned:
        client.id !== "walk-in" ? Math.floor(total / 100) : 0,
      loyaltyPointsRedeemed: loyaltyRedeemed,
      refunds: [],
      timestamp: new Date(),
    };

    // Deduct product stock
    bill.forEach((item) => {
      if (item.type === "product") {
        setStock((s) => ({
          ...s,
          [item.id]: Math.max(0, (s[item.id] ?? 0) - item.qty),
        }));
      }
    });

    setTransactions((prev) => [txn, ...prev]);
    setLastTransaction(txn);
    setCompletedTxn(txn);
    clearBill();
    setShowReceipt(true);
  };

  // ── Suspend bill ───────────────────────────────────────────────────────────
  const suspendBill = () => {
    if (bill.length === 0) return;
    const held: SuspendedBill = {
      id: `hold-${++suspendCounter}`,
      clientName: client.name,
      clientPhone: client.phone,
      clientEmail: client.email,
      clientLoyaltyPoints: client.loyaltyPoints,
      items: [...bill],
      discountConfig,
      tipAmount,
      serviceChargeEnabled,
      notes: billNotes,
      payments: [...splitPayments],
      loyaltyRedeemed,
      suspendedAt: new Date(),
    };
    setSuspendedBills((prev) => [...prev, held]);
    clearBill();
  };

  const resumeBill = (held: SuspendedBill) => {
    setBill(held.items);
    setDiscountConfig(held.discountConfig);
    setTipAmount(held.tipAmount);
    setServiceChargeEnabled(held.serviceChargeEnabled);
    setBillNotes(held.notes);
    setSplitPayments(held.payments);
    setLoyaltyRedeemed(held.loyaltyRedeemed);
    const found = CLIENTS.find((c) => c.name === held.clientName);
    setClient(found ?? WALK_IN);
    setSuspendedBills((prev) => prev.filter((b) => b.id !== held.id));
    setShowSuspended(false);
  };

  // ── Refund flow ────────────────────────────────────────────────────────────
  const handleRefundRequest = (t: Transaction) => {
    setRefundTarget(t);
    setManagerPinTitle("Manager PIN — Authorise Refund");
    setManagerPinCallback(() => () => {
      setShowRefund(true);
      setShowManagerPin(false);
    });
    setShowManagerPin(true);
  };

  const handleRefundProcess = (entry: RefundEntry) => {
    if (!refundTarget) return;
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id !== refundTarget.id) return t;
        const refunds = [...t.refunds, entry];
        const refunded = refunds.reduce((a, r) => a + r.amount, 0);
        return {
          ...t,
          refunds,
          status: refunded >= t.total ? "refunded" : "partial",
        };
      }),
    );
    setShowRefund(false);
    setRefundTarget(null);
  };

  const handleVoid = () => {
    if (!refundTarget) return;
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === refundTarget.id ? { ...t, status: "voided" } : t,
      ),
    );
    setShowRefund(false);
    setRefundTarget(null);
  };

  // ── Manager PIN success ────────────────────────────────────────────────────
  const handlePinSuccess = () => {
    setShowManagerPin(false);
    managerPinCallback?.();
    setManagerPinCallback(null);
  };

  // ── Low-stock indicator ────────────────────────────────────────────────────
  const hasLowStock = PRODUCTS.some(
    (p) => (stock[p.id] ?? 0) > 0 && (stock[p.id] ?? 0) <= LOW_STOCK_THRESHOLD,
  );

  // ═════════════════════════════════════════════════════════════════════════
  return (
    <div className="p-4 lg:p-6 max-w-[1440px] mx-auto">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between mb-5 flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">POS / Checkout</h1>
          <p className="text-[#52525B] text-sm">{today}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {suspendedBills.length > 0 && (
            <button
              onClick={() => setShowSuspended(true)}
              className="h-8 px-3 rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#F59E0B]/15 transition-colors"
            >
              <Pause className="w-3 h-3" />
              {suspendedBills.length} Held
            </button>
          )}
          {lastTransaction && (
            <button
              onClick={() => {
                setCompletedTxn(lastTransaction);
                setShowReceipt(true);
              }}
              className="h-8 px-3 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs flex items-center gap-1.5 hover:border-[#8B5CF6]/40 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reprint
            </button>
          )}
          <button
            onClick={() => setShowHistory(true)}
            className="h-8 px-3 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs flex items-center gap-1.5 hover:border-[#8B5CF6]/40 transition-colors"
          >
            <History className="w-3 h-3" /> History
          </button>
          <button
            onClick={() => setShowEOD(true)}
            className="h-8 px-3 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs flex items-center gap-1.5 hover:border-[#8B5CF6]/40 transition-colors"
          >
            <Sunset className="w-3 h-3" /> EOD Report
          </button>
          <button
            onClick={() => setShowTaxConfig(true)}
            className="h-8 px-3 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs flex items-center gap-1.5 hover:border-[#8B5CF6]/40 transition-colors"
          >
            <Settings className="w-3 h-3" /> Tax & Invoice
          </button>
        </div>
      </motion.div>

      {/* Low-stock alert */}
      {hasLowStock && (
        <motion.div
          {...fadeUp(0.02)}
          className="mb-4 flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl px-4 py-2.5"
        >
          <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />
          <p className="text-[#F59E0B] text-xs">
            Low stock alert — some products are running low. Switch to the
            Products tab to check.
          </p>
        </motion.div>
      )}

      {/* ── Main 2-column grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5">
        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* LEFT: Catalog                                                      */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          {/* Tabs */}
          <motion.div {...fadeUp(0.04)}>
            <div className="flex gap-2 p-1 bg-[#141419] border border-[#27272A] rounded-xl w-fit">
              {(["services", "products"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setCatalogTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${catalogTab === t ? "bg-[#8B5CF6] text-white" : "text-[#52525B] hover:text-[#A1A1AA]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quick-add grid */}
          <motion.div {...fadeUp(0.06)}>
            <p className="text-[#52525B] text-[10px] font-semibold uppercase tracking-wider mb-2">
              Quick Add
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
              {catalogItems.map((item) => {
                const isProduct = item.type === "product";
                const currentStock = isProduct
                  ? (stock[item.id] ?? 0)
                  : Infinity;
                const billQty = bill.find((x) => x.id === item.id)?.qty ?? 0;
                const outOfStock = isProduct && currentStock - billQty <= 0;
                const lowStock =
                  isProduct &&
                  currentStock > 0 &&
                  currentStock <= LOW_STOCK_THRESHOLD;

                return (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    disabled={outOfStock}
                    className={`border rounded-xl px-3 py-3 text-left transition-colors group relative ${outOfStock ? "opacity-40 cursor-not-allowed bg-[#141419] border-[#27272A]" : "bg-[#141419] border-[#27272A] hover:border-[#8B5CF6]/40 hover:bg-[#1C1C22]"}`}
                  >
                    <p className="text-[#F5F5F7] text-xs font-medium leading-tight group-hover:text-[#8B5CF6] transition-colors line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-[#52525B] text-[10px] mt-1">
                      {fmtLKR(item.price)}
                    </p>
                    {isProduct && (
                      <p
                        className={`text-[9px] mt-0.5 font-semibold ${outOfStock ? "text-[#EF4444]" : lowStock ? "text-[#F59E0B]" : "text-[#3f3f46]"}`}
                      >
                        {outOfStock ? "Out of stock" : `Stock: ${currentStock}`}
                      </p>
                    )}
                    {billQty > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#8B5CF6] text-white text-[9px] flex items-center justify-center font-bold">
                        {billQty}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Search */}
          <motion.div {...fadeUp(0.08)} className="relative">
            <p className="text-[#52525B] text-[10px] font-semibold uppercase tracking-wider mb-2">
              Search All Items
            </p>
            <div className="flex items-center gap-2 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-10 focus-within:border-[#8B5CF6]/50 transition-colors">
              <Search className="w-3.5 h-3.5 text-[#52525B] shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services & products..."
                className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-[#52525B] hover:text-[#A1A1AA] text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-[#141419] border border-[#27272A] rounded-xl overflow-hidden z-20 shadow-xl">
                {searchResults.slice(0, 8).map((r) => {
                  const isProduct = r.type === "product";
                  const currentStock = isProduct
                    ? (stock[r.id] ?? 0)
                    : Infinity;
                  const outOfStock = isProduct && currentStock <= 0;
                  return (
                    <button
                      key={r.id}
                      onClick={() => addItem(r)}
                      disabled={outOfStock}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#1C1C22] transition-colors text-left disabled:opacity-40"
                    >
                      <div>
                        <p className="text-[#F5F5F7] text-sm">{r.name}</p>
                        <p className="text-[#52525B] text-xs capitalize">
                          {r.type}
                          {isProduct && ` · Stock: ${currentStock}`}
                        </p>
                      </div>
                      <span className="text-[#8B5CF6] text-sm font-semibold">
                        {fmtLKR(r.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* RIGHT: Bill panel                                                  */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <motion.div {...fadeUp(0.05)} className="space-y-3">
          {/* Client selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowClientDD((v) => !v);
                setShowStaffDD(false);
              }}
              className="w-full bg-[#141419] border border-[#27272A] rounded-xl px-4 h-11 flex items-center justify-between hover:border-[#3f3f46] transition-colors"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#52525B]" />
                <span className="text-sm text-[#F5F5F7]">{client.name}</span>
                {client.memberLevel && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase"
                    style={{
                      background: `${MEMBER_COLORS[client.memberLevel]}20`,
                      color: MEMBER_COLORS[client.memberLevel],
                    }}
                  >
                    {client.memberLevel}
                  </span>
                )}
                {client.loyaltyPoints > 0 && (
                  <span className="text-[9px] text-[#F59E0B] flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5" /> {client.loyaltyPoints} pts
                  </span>
                )}
              </div>
              {showClientDD ? (
                <ChevronUp className="w-4 h-4 text-[#52525B]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#52525B]" />
              )}
            </button>
            {showClientDD && (
              <div className="absolute top-12 left-0 right-0 bg-[#141419] border border-[#27272A] rounded-xl overflow-hidden z-30 shadow-xl">
                {CLIENTS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setClient(c);
                      setShowClientDD(false);
                      setLoyaltyRedeemed(0);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#1C1C22] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[#F5F5F7] text-sm">{c.name}</p>
                      {c.phone && (
                        <p className="text-[#52525B] text-xs">{c.phone}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {c.memberLevel && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase"
                          style={{
                            background: `${MEMBER_COLORS[c.memberLevel]}20`,
                            color: MEMBER_COLORS[c.memberLevel],
                          }}
                        >
                          {c.memberLevel}
                        </span>
                      )}
                      {c.loyaltyPoints > 0 && (
                        <span className="text-[#F59E0B] text-xs flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5" /> {c.loyaltyPoints}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stylist selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowStaffDD((v) => !v);
                setShowClientDD(false);
              }}
              className="w-full bg-[#141419] border border-[#27272A] rounded-xl px-4 h-9 flex items-center justify-between hover:border-[#3f3f46] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Smile className="w-3.5 h-3.5 text-[#52525B]" />
                <span className="text-xs text-[#A1A1AA]">
                  Stylist: {staff.name}
                </span>
              </div>
              {showStaffDD ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#52525B]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#52525B]" />
              )}
            </button>
            {showStaffDD && (
              <div className="absolute top-10 left-0 right-0 bg-[#141419] border border-[#27272A] rounded-xl overflow-hidden z-30 shadow-xl">
                {STYLISTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setStaff(s);
                      setShowStaffDD(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#F5F5F7] hover:bg-[#1C1C22] transition-colors"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bill items */}
          <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#27272A] flex items-center justify-between">
              <p className="text-[#F5F5F7] text-sm font-semibold">
                Bill
                <span className="text-[#52525B] font-normal ml-1">
                  ({bill.length} {bill.length === 1 ? "item" : "items"})
                </span>
              </p>
              <div className="flex gap-3">
                {bill.length > 0 && (
                  <button
                    onClick={suspendBill}
                    className="text-[#52525B] text-xs hover:text-[#F59E0B] transition-colors flex items-center gap-1"
                  >
                    <Pause className="w-3 h-3" /> Hold
                  </button>
                )}
                {bill.length > 0 && (
                  <button
                    onClick={clearBill}
                    className="text-[#52525B] text-xs hover:text-[#EF4444] transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {bill.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-[#52525B] text-sm">
                  Add services or products to begin
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#27272A] max-h-56 overflow-y-auto">
                {bill.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F7] text-xs font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-[#52525B] text-[10px]">
                        {fmtLKR(item.price)} each
                        {item.stylistName && ` · ${item.stylistName}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-[#1C1C22] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[#F5F5F7] text-xs w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-[#1C1C22] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-[#8B5CF6] text-xs font-semibold w-20 text-right">
                      {fmtLKR(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() =>
                        setBill((b) => b.filter((x) => x.id !== item.id))
                      }
                      className="text-[#52525B] hover:text-[#EF4444] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discount / Tips / Loyalty */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setShowDiscount(true)}
              className={`h-9 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${discountConfig ? "border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981]" : "border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/40 hover:text-[#A1A1AA]"}`}
            >
              <Percent className="w-3 h-3" />
              {discountConfig ? `−${fmtLKR(discountAmount)}` : "Discount"}
            </button>
            <button
              onClick={() => setShowTips(true)}
              className={`h-9 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${tipAmount > 0 || serviceChargeEnabled ? "border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B]" : "border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/40 hover:text-[#A1A1AA]"}`}
            >
              <Tag className="w-3 h-3" />
              {tipAmount > 0 ? `Tip ${fmtLKR(tipAmount)}` : "Tips & SC"}
            </button>
            <button
              onClick={handleRedeemLoyalty}
              disabled={
                client.loyaltyPoints === 0 ||
                client.id === "walk-in" ||
                total === 0
              }
              className={`h-9 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${loyaltyRedeemed > 0 ? "border-[#EC4899]/40 bg-[#EC4899]/10 text-[#EC4899]" : "border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/40 hover:text-[#A1A1AA]"}`}
            >
              <Star className="w-3 h-3" />
              {loyaltyRedeemed > 0 ? `−${fmtLKR(loyaltyRedeemed)}` : "Loyalty"}
            </button>
          </div>

          {/* Summary */}
          <div className="bg-[#141419] border border-[#27272A] rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#52525B]">Subtotal</span>
              <span className="text-[#A1A1AA]">{fmtLKR(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#52525B]">
                  Discount
                  {discountConfig?.label && (
                    <span className="text-[#3f3f46] ml-1 text-[11px]">
                      ({discountConfig.label})
                    </span>
                  )}
                </span>
                <span className="text-[#10B981]">
                  − {fmtLKR(discountAmount)}
                </span>
              </div>
            )}
            {loyaltyRedeemed > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#52525B]">Loyalty Redemption</span>
                <span className="text-[#EC4899]">
                  − {fmtLKR(loyaltyRedeemed)}
                </span>
              </div>
            )}
            {serviceChargeAmt > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#52525B]">
                  Service Charge ({SERVICE_CHARGE_RATE}%)
                </span>
                <span className="text-[#A1A1AA]">
                  {fmtLKR(serviceChargeAmt)}
                </span>
              </div>
            )}
            {tipAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#52525B]">Tip</span>
                <span className="text-[#A1A1AA]">{fmtLKR(tipAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-[#52525B]">
                Tax ({taxConfig.rate}%{taxConfig.inclusive ? " incl." : ""})
              </span>
              <span className="text-[#A1A1AA]">{fmtLKR(taxAmount)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-[#27272A] pt-2 mt-1">
              <span className="text-[#F5F5F7]">Total</span>
              <span className="text-[#8B5CF6]">{fmtLKR(total)}</span>
            </div>
            {client.id !== "walk-in" && total > 0 && (
              <p className="text-[#3f3f46] text-[10px] text-right">
                +{Math.floor(total / 100)} loyalty points on checkout
              </p>
            )}
          </div>

          {/* Notes & rebook collapsible */}
          <div className="bg-[#141419] border border-[#27272A] rounded-xl overflow-hidden">
            <button
              onClick={() => setShowExtras((v) => !v)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-[#1C1C22] transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#52525B]" />
                <span className="text-[#52525B] text-xs">
                  Notes & Rebook Extras
                  {(billNotes || nextService || rebookDate) && (
                    <span className="ml-1 text-[#8B5CF6]">●</span>
                  )}
                </span>
              </div>
              {showExtras ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#52525B]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#52525B]" />
              )}
            </button>
            <AnimatePresence>
              {showExtras && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3 border-t border-[#27272A] pt-3">
                    <div>
                      <label className="text-[#3f3f46] text-[10px] block mb-1">
                        Bill Notes
                      </label>
                      <textarea
                        rows={2}
                        value={billNotes}
                        onChange={(e) => setBillNotes(e.target.value)}
                        placeholder="Internal notes, special requests..."
                        className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-[#F5F5F7] placeholder:text-[#3f3f46] outline-none focus:border-[#8B5CF6]/50 resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#3f3f46] text-[10px] block mb-1">
                        Recommended Next Service
                      </label>
                      <input
                        type="text"
                        value={nextService}
                        onChange={(e) => setNextService(e.target.value)}
                        placeholder="e.g. Deep Conditioning"
                        className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9 text-xs text-[#F5F5F7] placeholder:text-[#3f3f46] outline-none focus:border-[#8B5CF6]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[#3f3f46] text-[10px] flex items-center gap-1 mb-1">
                        <CalendarCheck className="w-3 h-3" /> Rebook Date
                      </label>
                      <input
                        type="date"
                        value={rebookDate}
                        onChange={(e) => setRebookDate(e.target.value)}
                        className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9 text-xs text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Payment method */}
          <div>
            <p className="text-[#52525B] text-[10px] font-semibold uppercase tracking-wider mb-2">
              Payment Method
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setPayMethod(m.id);
                    if (m.id === "split") setShowSplit(true);
                  }}
                  disabled={
                    m.id === "loyalty" &&
                    (client.loyaltyPoints === 0 || client.id === "walk-in")
                  }
                  className={`h-12 rounded-xl border text-[10px] font-semibold flex flex-col items-center justify-center gap-0.5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${payMethod === m.id ? "bg-[#8B5CF6] border-[#8B5CF6] text-white" : "bg-[#141419] border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/40 hover:text-[#A1A1AA]"}`}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
            {payMethod === "split" && splitPayments.length > 0 && (
              <div className="mt-2 space-y-1 px-1">
                {splitPayments.map((p) => (
                  <div key={p.id} className="flex justify-between text-xs">
                    <span className="text-[#52525B] capitalize">
                      {p.method.replace(/_/g, " ")}
                      {p.cardLast4 && ` ••••${p.cardLast4}`}
                    </span>
                    <span className="text-[#A1A1AA]">{fmtLKR(p.amount)}</span>
                  </div>
                ))}
                <button
                  onClick={() => setShowSplit(true)}
                  className="text-[10px] text-[#8B5CF6] hover:underline"
                >
                  Edit split
                </button>
              </div>
            )}
          </div>

          {/* Charge button */}
          <button
            onClick={() => processPayment()}
            disabled={bill.length === 0}
            className="w-full h-12 rounded-xl bg-[#8B5CF6] text-white font-bold text-sm hover:bg-[#7C3AED] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Charge {fmtLKR(total)}
          </button>
        </motion.div>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showDiscount && (
          <DiscountModal
            subtotal={subtotal}
            memberLevel={client.memberLevel}
            current={discountConfig}
            onApply={handleDiscountApply}
            onClear={() => {
              setDiscountConfig(null);
              setShowDiscount(false);
            }}
            onClose={() => setShowDiscount(false)}
            onNeedApproval={handleDiscountNeedApproval}
          />
        )}

        {showTips && (
          <TipsServiceModal
            subtotal={afterDiscount}
            serviceChargeEnabled={serviceChargeEnabled}
            tipAmount={tipAmount}
            stylists={STYLISTS}
            onUpdateTip={setTipAmount}
            onToggleServiceCharge={setServiceChargeEnabled}
            onClose={() => setShowTips(false)}
          />
        )}

        {showSplit && (
          <SplitPaymentModal
            total={total}
            loyaltyBalance={loyaltyMax}
            existing={splitPayments}
            onConfirm={(payments) => {
              setSplitPayments(payments);
              setShowSplit(false);
              setPayMethod("split");
            }}
            onClose={() => {
              setShowSplit(false);
              if (splitPayments.length === 0) setPayMethod("card");
            }}
          />
        )}

        {showReceipt && completedTxn && (
          <ReceiptModal
            transaction={completedTxn}
            taxConfig={taxConfig}
            onClose={() => {
              setShowReceipt(false);
              setCompletedTxn(null);
            }}
            onReprint={
              lastTransaction
                ? () => {
                    setCompletedTxn(lastTransaction);
                    setShowReceipt(true);
                  }
                : undefined
            }
          />
        )}

        {showHistory && (
          <TransactionHistory
            transactions={transactions}
            onViewReceipt={(t) => {
              setCompletedTxn(t);
              setShowHistory(false);
              setShowReceipt(true);
            }}
            onRefund={handleRefundRequest}
            onClose={() => setShowHistory(false)}
          />
        )}

        {showRefund && refundTarget && (
          <RefundModal
            transaction={refundTarget}
            onRefund={handleRefundProcess}
            onVoid={handleVoid}
            onClose={() => {
              setShowRefund(false);
              setRefundTarget(null);
            }}
            managerName="Manager"
          />
        )}

        {showEOD && (
          <EndOfDayModal
            transactions={transactions}
            onClose={() => setShowEOD(false)}
          />
        )}

        {showSuspended && (
          <SuspendedBillsPanel
            bills={suspendedBills}
            onResume={resumeBill}
            onDelete={(id) =>
              setSuspendedBills((prev) => prev.filter((b) => b.id !== id))
            }
            onClose={() => setShowSuspended(false)}
          />
        )}

        {showTaxConfig && (
          <TaxConfigModal
            config={taxConfig}
            onSave={(cfg) => {
              setTaxConfig(cfg);
              setShowTaxConfig(false);
            }}
            onClose={() => setShowTaxConfig(false)}
          />
        )}

        {showManagerPin && (
          <ManagerPinModal
            title={managerPinTitle}
            onSuccess={handlePinSuccess}
            onClose={() => {
              setShowManagerPin(false);
              setManagerPinCallback(null);
              setPendingDiscount(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
