"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Minus,
  Plus,
  Printer,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

interface LineItem {
  id: string;
  name: string;
  type: "service" | "product";
  price: number;
  qty: number;
}

const QUICK_SERVICES = [
  { id: "qs1", name: "Haircut & Style", price: 2500, type: "service" as const },
  { id: "qs2", name: "Balayage", price: 18000, type: "service" as const },
  { id: "qs3", name: "Blowout", price: 1800, type: "service" as const },
  {
    id: "qs4",
    name: "Keratin Treatment",
    price: 22000,
    type: "service" as const,
  },
  { id: "qs5", name: "Highlights", price: 14000, type: "service" as const },
  { id: "qs6", name: "Colour (Global)", price: 9500, type: "service" as const },
  {
    id: "qs7",
    name: "Deep Conditioning",
    price: 3500,
    type: "service" as const,
  },
  { id: "qs8", name: "Scalp Treatment", price: 4000, type: "service" as const },
];

const SEARCH_CATALOG = [
  ...QUICK_SERVICES,
  {
    id: "pr1",
    name: "Olaplex No.3 150ml",
    price: 7500,
    type: "product" as const,
  },
  {
    id: "pr2",
    name: "Tigi Bed Head Shampoo",
    price: 4500,
    type: "product" as const,
  },
  {
    id: "pr3",
    name: "L'Oréal Hair Mask",
    price: 5200,
    type: "product" as const,
  },
  {
    id: "pr4",
    name: "Keratin Serum 100ml",
    price: 3800,
    type: "product" as const,
  },
];

const CLIENTS = [
  "Dilhani Perera",
  "Sanduni Fernando",
  "Thilini Silva",
  "Nadeesha Wickramasinghe",
  "Chamari Jayawardena",
  "Walk-in Guest",
];

const TAX_RATE = 0.08;

type PaymentMethod = "cash" | "card" | "split";

function ReceiptModal({
  items,
  subtotal,
  discount,
  tax,
  total,
  client,
  method,
  onClose,
}: {
  items: LineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  client: string;
  method: PaymentMethod;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-sm"
      >
        <div className="p-5 text-center border-b border-[#27272A]">
          <div className="w-12 h-12 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-[#10B981]" />
          </div>
          <h3 className="text-[#F5F5F7] font-bold text-lg">
            Payment Successful
          </h3>
          <p className="text-[#52525B] text-sm">Glamour Studio · Colombo 03</p>
        </div>
        <div className="p-5 space-y-2">
          <div className="flex justify-between text-xs text-[#52525B] mb-3">
            <span>Client: {client}</span>
            <span>
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-[#A1A1AA]">
                {item.name} × {item.qty}
              </span>
              <span className="text-[#F5F5F7]">
                LKR {(item.price * item.qty).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="border-t border-[#27272A] pt-2 mt-2 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-[#52525B]">Subtotal</span>
              <span className="text-[#A1A1AA]">
                LKR {subtotal.toLocaleString()}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#52525B]">Discount</span>
                <span className="text-[#10B981]">
                  − LKR {discount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-[#52525B]">Tax (8%)</span>
              <span className="text-[#A1A1AA]">LKR {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-1">
              <span className="text-[#F5F5F7]">Total</span>
              <span className="text-[#8B5CF6]">
                LKR {total.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="text-[#52525B] text-xs text-center mt-2 capitalize">
            Paid via {method === "split" ? "Split Payment" : method}
          </p>
        </div>
        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:border-[#3f3f46] flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED]"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function POSPage() {
  const [bill, setBill] = useState<LineItem[]>([]);
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);
  const [payMethod, setPayMethod] = useState<PaymentMethod>("card");
  const [client, setClient] = useState("Walk-in Guest");
  const [showReceipt, setShowReceipt] = useState(false);
  const [showClientDD, setShowClientDD] = useState(false);

  const results =
    search.length > 1
      ? SEARCH_CATALOG.filter((x) =>
          x.name.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  const addItem = (item: (typeof SEARCH_CATALOG)[number]) => {
    setBill((b) => {
      const existing = b.find((x) => x.id === item.id);
      if (existing)
        return b.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      return [...b, { ...item, qty: 1 }];
    });
    setSearch("");
  };

  const changeQty = (id: string, delta: number) =>
    setBill((b) =>
      b
        .map((x) =>
          x.id === id ? { ...x, qty: Math.max(0, x.qty + delta) } : x,
        )
        .filter((x) => x.qty > 0),
    );

  const subtotal = bill.reduce((a, x) => a + x.price * x.qty, 0);
  const discounted = subtotal - discount;
  const tax = Math.round(discounted * TAX_RATE);
  const total = discounted + tax;

  const processPayment = () => {
    if (bill.length === 0) return;
    setShowReceipt(true);
  };

  const clearBill = () => {
    setBill([]);
    setDiscount(0);
    setShowReceipt(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div {...fadeUp(0)} className="mb-5">
        <h1 className="text-[#F5F5F7] text-xl font-bold">POS / Checkout</h1>
        <p className="text-[#52525B] text-sm">
          Create bills, process payments, and print receipts
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        {/* Left panel */}
        <div className="space-y-5">
          {/* Quick services */}
          <motion.div {...fadeUp(0.05)}>
            <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-3">
              Quick Add — Services
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUICK_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => addItem(s)}
                  className="card-3d bg-[#141419] border border-[#27272A] rounded-xl px-3 py-3 text-left hover:border-[#8B5CF6]/40 hover:bg-[#1C1C22] transition-colors group"
                >
                  <p className="text-[#F5F5F7] text-xs font-medium leading-tight group-hover:text-[#8B5CF6] transition-colors">
                    {s.name}
                  </p>
                  <p className="text-[#52525B] text-[10px] mt-1">
                    LKR {s.price.toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Search */}
          <motion.div {...fadeUp(0.08)}>
            <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-2">
              Search Catalog
            </p>
            <div className="relative">
              <div className="flex items-center gap-2 card-3d bg-[#141419] border border-[#27272A] rounded-xl px-3 h-10 focus-within:border-[#8B5CF6]/50">
                <Search className="w-3.5 h-3.5 text-[#52525B] shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search services & products..."
                  className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
                />
              </div>
              {results.length > 0 && (
                <div className="absolute top-12 left-0 right-0 card-3d bg-[#141419] border border-[#27272A] rounded-xl overflow-hidden z-10 shadow-lg">
                  {results.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => addItem(r)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#1C1C22] transition-colors text-left"
                    >
                      <div>
                        <p className="text-[#F5F5F7] text-sm">{r.name}</p>
                        <p className="text-[#52525B] text-xs capitalize">
                          {r.type}
                        </p>
                      </div>
                      <span className="text-[#8B5CF6] text-sm font-semibold">
                        LKR {r.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right panel — Bill */}
        <motion.div {...fadeUp(0.06)} className="space-y-4">
          {/* Client selector */}
          <div className="relative">
            <button
              onClick={() => setShowClientDD((v) => !v)}
              className="w-full card-3d bg-[#141419] border border-[#27272A] rounded-xl px-4 h-11 flex items-center justify-between hover:border-[#3f3f46] transition-colors"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#52525B]" />
                <span className="text-sm text-[#F5F5F7]">{client}</span>
              </div>
              {showClientDD ? (
                <ChevronUp className="w-4 h-4 text-[#52525B]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#52525B]" />
              )}
            </button>
            {showClientDD && (
              <div className="absolute top-12 left-0 right-0 card-3d bg-[#141419] border border-[#27272A] rounded-xl overflow-hidden z-10 shadow-lg">
                {CLIENTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setClient(c);
                      setShowClientDD(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#F5F5F7] hover:bg-[#1C1C22] transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bill items */}
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#27272A] flex items-center justify-between">
              <p className="text-[#F5F5F7] text-sm font-semibold">
                Bill ({bill.length} items)
              </p>
              {bill.length > 0 && (
                <button
                  onClick={clearBill}
                  className="text-[#52525B] text-xs hover:text-[#EF4444] transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            {bill.length === 0 ? (
              <p className="text-[#52525B] text-sm text-center py-8">
                Add services or products to begin.
              </p>
            ) : (
              <div className="divide-y divide-[#27272A] max-h-64 overflow-y-auto">
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
                        LKR {item.price.toLocaleString()} each
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
                      LKR {(item.price * item.qty).toLocaleString()}
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

          {/* Summary */}
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#52525B]">Subtotal</span>
              <span className="text-[#A1A1AA]">
                LKR {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#52525B] text-sm">Discount (LKR)</span>
              <input
                type="number"
                value={discount}
                onChange={(e) =>
                  setDiscount(Math.max(0, Number(e.target.value)))
                }
                className="w-32 bg-[#1C1C22] border border-[#27272A] rounded-lg px-2 py-1 text-sm text-[#F5F5F7] text-right outline-none focus:border-[#8B5CF6]/50"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#52525B]">Tax (8%)</span>
              <span className="text-[#A1A1AA]">LKR {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-[#27272A] pt-3">
              <span className="text-[#F5F5F7]">Total</span>
              <span className="text-[#8B5CF6]">
                LKR {total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <p className="text-[#52525B] text-xs mb-2">Payment Method</p>
            <div className="grid grid-cols-3 gap-2">
              {(["cash", "card", "split"] as PaymentMethod[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setPayMethod(m)}
                  className={`h-10 rounded-xl border text-xs font-semibold capitalize transition-colors ${payMethod === m ? "bg-[#8B5CF6] border-[#8B5CF6] text-white" : "bg-[#141419] border-[#27272A] text-[#A1A1AA] hover:border-[#3f3f46]"}`}
                >
                  {m === "card" && (
                    <CreditCard className="w-3.5 h-3.5 inline mr-1.5" />
                  )}
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={processPayment}
            disabled={bill.length === 0}
            className="w-full h-12 rounded-xl bg-[#8B5CF6] text-white font-bold text-sm hover:bg-[#7C3AED] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Process Payment · LKR {total.toLocaleString()}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showReceipt && (
          <ReceiptModal
            items={bill}
            subtotal={subtotal}
            discount={discount}
            tax={tax}
            total={total}
            client={client}
            method={payMethod}
            onClose={clearBill}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
