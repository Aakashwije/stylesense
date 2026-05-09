"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Edit2,
  Package,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

type Category = "Colour" | "Treatment" | "Tools" | "Retail" | "Consumables";

interface Product {
  id: string;
  name: string;
  category: Category;
  stock: number;
  minStock: number;
  unit: string;
  costPrice: number;
  sellPrice: number;
  supplier: string;
  lastRestocked: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Wella Koleston 60ml (Various)",
    category: "Colour",
    stock: 48,
    minStock: 20,
    unit: "tubes",
    costPrice: 850,
    sellPrice: 1400,
    supplier: "Wella Sri Lanka",
    lastRestocked: "2 Jan 2026",
  },
  {
    id: "p2",
    name: "Redken Shades EQ 60ml",
    category: "Colour",
    stock: 22,
    minStock: 15,
    unit: "bottles",
    costPrice: 1100,
    sellPrice: 1800,
    supplier: "Redken Lanka",
    lastRestocked: "5 Jan 2026",
  },
  {
    id: "p3",
    name: "Olaplex No.1 Bond Multiplier",
    category: "Treatment",
    stock: 6,
    minStock: 8,
    unit: "litres",
    costPrice: 8500,
    sellPrice: 14000,
    supplier: "Olaplex Direct",
    lastRestocked: "20 Dec 2025",
  },
  {
    id: "p4",
    name: "Brazilian Blowout Solution",
    category: "Treatment",
    stock: 4,
    minStock: 5,
    unit: "bottles",
    costPrice: 12000,
    sellPrice: 18500,
    supplier: "BB International",
    lastRestocked: "15 Dec 2025",
  },
  {
    id: "p5",
    name: "Aluminium Foil Sheets",
    category: "Consumables",
    stock: 3,
    minStock: 5,
    unit: "packs (500)",
    costPrice: 450,
    sellPrice: 0,
    supplier: "Local Supplier",
    lastRestocked: "10 Jan 2026",
  },
  {
    id: "p6",
    name: "Wahl Professional Clippers",
    category: "Tools",
    stock: 5,
    minStock: 2,
    unit: "units",
    costPrice: 14500,
    sellPrice: 22000,
    supplier: "Wahl Lanka",
    lastRestocked: "1 Nov 2025",
  },
  {
    id: "p7",
    name: "Tigi Bed Head Shampoo 750ml",
    category: "Retail",
    stock: 12,
    minStock: 6,
    unit: "bottles",
    costPrice: 2800,
    sellPrice: 4500,
    supplier: "Tigi Distributors LK",
    lastRestocked: "8 Jan 2026",
  },
  {
    id: "p8",
    name: "Keratin Smoothing Serum 500ml",
    category: "Treatment",
    stock: 3,
    minStock: 4,
    unit: "bottles",
    costPrice: 5500,
    sellPrice: 9000,
    supplier: "KeraStraight LK",
    lastRestocked: "12 Dec 2025",
  },
  {
    id: "p9",
    name: "Disposable Gloves (M)",
    category: "Consumables",
    stock: 8,
    minStock: 10,
    unit: "boxes (100)",
    costPrice: 680,
    sellPrice: 0,
    supplier: "Medical Supplies LK",
    lastRestocked: "14 Jan 2026",
  },
  {
    id: "p10",
    name: "L'Oréal Hair Mask 500ml",
    category: "Retail",
    stock: 9,
    minStock: 5,
    unit: "pots",
    costPrice: 3200,
    sellPrice: 5200,
    supplier: "L'Oréal Lanka",
    lastRestocked: "3 Jan 2026",
  },
];

const CATEGORIES: Category[] = [
  "Colour",
  "Treatment",
  "Tools",
  "Retail",
  "Consumables",
];
const CAT_COLORS: Record<Category, string> = {
  Colour: "#8B5CF6",
  Treatment: "#22D3EE",
  Tools: "#F59E0B",
  Retail: "#10B981",
  Consumables: "#E8B4B8",
};

function getStockStatus(p: Product): "critical" | "low" | "ok" {
  if (p.stock === 0) return "critical";
  if (p.stock < p.minStock) return "low";
  return "ok";
}

function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product?: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const blank: Product = {
    id: "",
    name: "",
    category: "Colour",
    stock: 0,
    minStock: 5,
    unit: "",
    costPrice: 0,
    sellPrice: 0,
    supplier: "",
    lastRestocked: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
  const [form, setForm] = useState<Product>(product ?? blank);
  const set = (k: keyof Product, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

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
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#27272A] sticky top-0 bg-[#141419]">
          <h3 className="text-[#F5F5F7] font-semibold">
            {product ? "Edit Product" : "Add Product"}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#F5F5F7] hover:bg-[#1C1C22]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-3">
          {(
            [
              ["name", "Product Name"],
              ["supplier", "Supplier"],
              ["unit", "Unit (e.g. bottles, tubes)"],
              ["lastRestocked", "Last Restocked"],
            ] as [keyof Product, string][]
          ).map(([k, label]) => (
            <div key={k}>
              <label className="text-[#52525B] text-xs mb-1 block">
                {label}
              </label>
              <input
                value={String(form[k])}
                onChange={(e) => set(k, e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
              />
            </div>
          ))}
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as Category)}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ["stock", "Current Stock"],
                ["minStock", "Min Stock Alert"],
                ["costPrice", "Cost Price (LKR)"],
                ["sellPrice", "Sell Price (LKR)"],
              ] as [keyof Product, string][]
            ).map(([k, label]) => (
              <div key={k}>
                <label className="text-[#52525B] text-xs mb-1 block">
                  {label}
                </label>
                <input
                  type="number"
                  value={Number(form[k])}
                  onChange={(e) => set(k, Number(e.target.value))}
                  className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:border-[#3f3f46]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ ...form, id: form.id || `p${Date.now()}` });
              onClose();
            }}
            className="flex-1 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED]"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<Category | "All">("All");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Product | undefined>();

  const lowStock = products.filter((p) => getStockStatus(p) !== "ok");

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const saveProduct = (p: Product) => {
    setProducts((ps) =>
      ps.some((x) => x.id === p.id)
        ? ps.map((x) => (x.id === p.id ? p : x))
        : [...ps, p],
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">Inventory</h1>
          <p className="text-[#52525B] text-sm">
            {products.length} products · {lowStock.length} low stock alerts
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(undefined);
            setModal("add");
          }}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </motion.div>

      {/* Low stock alerts */}
      {lowStock.length > 0 && (
        <motion.div {...fadeUp(0.05)}>
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              <p className="text-[#F59E0B] text-sm font-semibold">
                Low Stock Alerts ({lowStock.length})
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {lowStock.map((p) => (
                <span
                  key={p.id}
                  className={`text-xs px-3 py-1 rounded-full border ${p.stock === 0 ? "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]" : "bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]"}`}
                >
                  {p.name} —{" "}
                  {p.stock === 0 ? "Out of stock" : `${p.stock} ${p.unit} left`}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Search + filter */}
      <motion.div {...fadeUp(0.08)} className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-10 w-64 focus-within:border-[#8B5CF6]/50 transition-colors">
          <Search className="w-3.5 h-3.5 text-[#52525B] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["All", ...CATEGORIES] as (Category | "All")[]).map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`text-xs px-3 h-10 rounded-xl border transition-colors font-medium ${catFilter === c ? "bg-[#8B5CF6] border-[#8B5CF6] text-white" : "bg-[#141419] border-[#27272A] text-[#A1A1AA] hover:border-[#3f3f46]"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPI strip */}
      <motion.div
        {...fadeUp(0.1)}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: "Total Products", value: products.length, color: "#8B5CF6" },
          {
            label: "Low / Out of Stock",
            value: lowStock.length,
            color: "#EF4444",
          },
          {
            label: "Total Cost Value",
            value: `LKR ${products.reduce((a, p) => a + p.costPrice * p.stock, 0).toLocaleString()}`,
            color: "#22D3EE",
          },
          {
            label: "Retail Sell Value",
            value: `LKR ${products
              .filter((p) => p.sellPrice > 0)
              .reduce((a, p) => a + p.sellPrice * p.stock, 0)
              .toLocaleString()}`,
            color: "#10B981",
          },
        ].map((k, i) => (
          <motion.div key={k.label} {...fadeUp(0.04 * i)}>
            <div className="bg-[#141419] border border-[#27272A] rounded-2xl p-4">
              <p
                className="text-[#F5F5F7] font-bold text-lg leading-tight"
                style={{ color: k.color }}
              >
                {k.value}
              </p>
              <p className="text-[#52525B] text-xs mt-0.5">{k.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div {...fadeUp(0.15)}>
        <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#27272A]">
                  {[
                    "Product",
                    "Category",
                    "Stock",
                    "Cost Price",
                    "Sell Price",
                    "Supplier",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[#52525B] text-xs font-semibold px-5 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]">
                {filtered.map((p) => {
                  const status = getStockStatus(p);
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-[#1C1C22] transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${CAT_COLORS[p.category]}15`,
                            }}
                          >
                            <Package
                              className="w-3.5 h-3.5"
                              style={{ color: CAT_COLORS[p.category] }}
                            />
                          </div>
                          <div>
                            <p className="text-[#F5F5F7] font-medium whitespace-nowrap">
                              {p.name}
                            </p>
                            <p className="text-[#52525B] text-[10px]">
                              Restocked: {p.lastRestocked}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: `${CAT_COLORS[p.category]}15`,
                            color: CAT_COLORS[p.category],
                          }}
                        >
                          {p.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold ${status === "critical" ? "text-[#EF4444]" : status === "low" ? "text-[#F59E0B]" : "text-[#F5F5F7]"}`}
                          >
                            {p.stock} {p.unit}
                          </span>
                          {status !== "ok" && (
                            <AlertTriangle
                              className={`w-3.5 h-3.5 ${status === "critical" ? "text-[#EF4444]" : "text-[#F59E0B]"}`}
                            />
                          )}
                        </div>
                        <p className="text-[#52525B] text-[10px]">
                          min: {p.minStock}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-[#A1A1AA]">
                        LKR {p.costPrice.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5 text-[#A1A1AA]">
                        {p.sellPrice > 0
                          ? `LKR ${p.sellPrice.toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-[#52525B] text-xs whitespace-nowrap">
                        {p.supplier}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditing(p);
                              setModal("edit");
                            }}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setProducts((ps) =>
                                ps.filter((x) => x.id !== p.id),
                              )
                            }
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {(modal === "add" || modal === "edit") && (
          <ProductModal
            product={editing}
            onClose={() => setModal(null)}
            onSave={saveProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
