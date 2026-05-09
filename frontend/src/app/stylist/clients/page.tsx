"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Edit2,
  Mail,
  Phone,
  Plus,
  Search,
  Tag,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

type HairType = "Straight" | "Wavy" | "Curly" | "Coily" | "Fine" | "Thick";
type Tier = "Regular" | "Loyal" | "VIP";

interface ClientHistory {
  date: string;
  service: string;
  amount: number;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  hairType: HairType;
  notes: string;
  tier: Tier;
  totalVisits: number;
  lastVisit: string;
  history: ClientHistory[];
  tags: string[];
}

const INITIAL_CLIENTS: Client[] = [
  {
    id: 1,
    name: "Dilhani Perera",
    phone: "+94 77 123 4567",
    email: "dilhani@gmail.com",
    hairType: "Wavy",
    notes:
      "Prefers cooler tones. Allergic to ammonia-based dyes. Always wants extra conditioning.",
    tier: "VIP",
    totalVisits: 24,
    lastVisit: "Today",
    history: [
      { date: "20 Jan 2025", service: "Balayage + Toner", amount: 14500 },
      { date: "10 Dec 2024", service: "Toner Refresh", amount: 2800 },
      { date: "15 Nov 2024", service: "Cut & Blow Dry", amount: 3200 },
    ],
    tags: ["Balayage", "Colour"],
  },
  {
    id: 2,
    name: "Sanduni Fernando",
    phone: "+94 71 234 5678",
    email: "sanduni@yahoo.com",
    hairType: "Straight",
    notes: "Always wants a trim — never more than 2cm off. Prefers dry cut.",
    tier: "Loyal",
    totalVisits: 11,
    lastVisit: "Today",
    history: [
      { date: "20 Jan 2025", service: "Cut & Blow Dry", amount: 3200 },
      { date: "12 Dec 2024", service: "Cut & Style", amount: 3800 },
    ],
    tags: ["Cut", "Regular Trim"],
  },
  {
    id: 3,
    name: "Thilini Silva",
    phone: "+94 76 345 6789",
    email: "thilini.silva@gmail.com",
    hairType: "Curly",
    notes:
      "Curly girl method client. No sulphates or silicones. Uses Devacurl products.",
    tier: "VIP",
    totalVisits: 18,
    lastVisit: "Today",
    history: [
      { date: "20 Jan 2025", service: "Keratin Treatment", amount: 18000 },
      { date: "15 Nov 2024", service: "Curl Cut", amount: 5500 },
      { date: "01 Oct 2024", service: "Deep Conditioning", amount: 4500 },
    ],
    tags: ["Curly", "Keratin"],
  },
  {
    id: 4,
    name: "Nadeesha Wickramasinghe",
    phone: "+94 78 456 7890",
    email: "nadeesha.w@gmail.com",
    hairType: "Fine",
    notes: "Fine hair — avoid heavy products. Highlights only, no full colour.",
    tier: "Loyal",
    totalVisits: 9,
    lastVisit: "Today",
    history: [
      { date: "20 Jan 2025", service: "Highlights", amount: 9500 },
      { date: "05 Nov 2024", service: "Highlights + Toner", amount: 11000 },
    ],
    tags: ["Highlights", "Fine Hair"],
  },
  {
    id: 5,
    name: "Chamari Jayawardena",
    phone: "+94 75 567 8901",
    email: "chamari.j@gmail.com",
    hairType: "Thick",
    notes:
      "Very thick hair — add 30 mins to all colour services. Loves bold colours.",
    tier: "Regular",
    totalVisits: 5,
    lastVisit: "Today",
    history: [
      { date: "20 Jan 2025", service: "Colour & Style", amount: 7800 },
      { date: "18 Nov 2024", service: "Full Colour", amount: 11000 },
    ],
    tags: ["Colour", "Thick Hair"],
  },
  {
    id: 6,
    name: "Malsha Bandara",
    phone: "+94 72 678 9012",
    email: "malsha.b@gmail.com",
    hairType: "Wavy",
    notes: "Always wants soft waves after styling. Books every 6 weeks.",
    tier: "Loyal",
    totalVisits: 14,
    lastVisit: "5 days ago",
    history: [
      { date: "15 Jan 2025", service: "Cut & Blow Dry", amount: 3200 },
      { date: "03 Dec 2024", service: "Blow Dry & Style", amount: 2500 },
    ],
    tags: ["Waves", "Regular"],
  },
];

const TIER_STYLE: Record<Tier, string> = {
  VIP: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  Loyal: "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20",
  Regular: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20",
};

const HAIR_TYPES: HairType[] = [
  "Straight",
  "Wavy",
  "Curly",
  "Coily",
  "Fine",
  "Thick",
];

export default function StylistClientsPage() {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
    hairType: "Wavy" as HairType,
    notes: "",
    tags: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null,
  );

  const filtered = clients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchTier = tierFilter === "all" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const addClient = () => {
    if (!newClient.name || !newClient.phone) return;
    const next: Client = {
      id: Date.now(),
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email,
      hairType: newClient.hairType,
      notes: newClient.notes,
      tier: "Regular",
      totalVisits: 0,
      lastVisit: "Never",
      history: [],
      tags: newClient.tags
        ? newClient.tags.split(",").map((t) => t.trim())
        : [],
    };
    setClients((prev) => [next, ...prev]);
    setNewClient({
      name: "",
      phone: "",
      email: "",
      hairType: "Wavy",
      notes: "",
      tags: "",
    });
    setShowAddModal(false);
  };

  const saveEdit = () => {
    if (!editingClient) return;
    setClients((prev) =>
      prev.map((c) => (c.id === editingClient.id ? editingClient : c)),
    );
    if (selectedClient?.id === editingClient.id)
      setSelectedClient(editingClient);
    setEditingClient(null);
  };

  const deleteClient = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    if (selectedClient?.id === id) setSelectedClient(null);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">My Clients</h1>
          <p className="text-[#52525B] text-sm mt-0.5">
            {clients.length} clients in your list
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#22D3EE] text-[#0B0B0F] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#22D3EE]/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        {...fadeUp(0.05)}
        className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
      >
        <div className="flex items-center gap-2 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 w-full sm:w-64 focus-within:border-[#22D3EE]/50 transition-colors">
          <Search className="w-3.5 h-3.5 text-[#52525B] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name, email, tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "VIP", "Loyal", "Regular"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                tierFilter === t
                  ? "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/30"
                  : "bg-[#141419] text-[#A1A1AA] border-[#27272A] hover:border-[#3f3f46]"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Client grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <motion.div key={client.id} {...fadeUp(0.05 * (i + 1))}>
            <div
              className="bg-[#141419] border border-[#27272A] rounded-2xl p-5 hover:border-[#3f3f46] transition-colors cursor-pointer"
              onClick={() => setSelectedClient(client)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] font-semibold text-sm">
                      {client.name}
                    </p>
                    <p className="text-[#52525B] text-[10px] flex items-center gap-1">
                      <Phone className="w-2.5 h-2.5" />
                      {client.phone}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${TIER_STYLE[client.tier]}`}
                >
                  {client.tier}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#A1A1AA] text-xs mb-3">
                <Calendar className="w-3 h-3" />
                <span>
                  {client.totalVisits} visits · Last {client.lastVisit}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap mb-3">
                <span className="bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-[10px] px-2 py-0.5 rounded-full">
                  {client.hairType}
                </span>
                {client.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#22D3EE]/8 text-[#22D3EE] text-[10px] px-2 py-0.5 rounded-full border border-[#22D3EE]/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className="flex items-center justify-end gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setEditingClient({ ...client });
                  }}
                  className="w-7 h-7 rounded-lg bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#52525B] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(client.id)}
                  className="w-7 h-7 rounded-lg bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#52525B] hover:text-[#EF4444] hover:border-[#EF4444]/30 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Client detail modal */}
      <AnimatePresence>
        {selectedClient && !editingClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
                <h3 className="text-[#F5F5F7] font-semibold">Client Profile</h3>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="text-[#52525B] hover:text-[#F5F5F7] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-5">
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#F5F5F7] font-semibold text-lg">
                      {selectedClient.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[#A1A1AA] text-xs flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {selectedClient.phone}
                      </span>
                      <span className="text-[#A1A1AA] text-xs flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {selectedClient.email}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${TIER_STYLE[selectedClient.tier]}`}
                  >
                    {selectedClient.tier}
                  </span>
                </div>
                {/* Info grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Total Visits",
                      value: selectedClient.totalVisits,
                    },
                    { label: "Last Visit", value: selectedClient.lastVisit },
                    { label: "Hair Type", value: selectedClient.hairType },
                  ].map((info) => (
                    <div
                      key={info.label}
                      className="bg-[#1C1C22] rounded-xl p-3 text-center"
                    >
                      <p className="text-[#F5F5F7] font-bold">{info.value}</p>
                      <p className="text-[#52525B] text-[10px] mt-0.5">
                        {info.label}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Tags */}
                <div>
                  <p className="text-[#52525B] text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Tags
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-xs px-2.5 py-1 rounded-full">
                      {selectedClient.hairType}
                    </span>
                    {selectedClient.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#22D3EE]/8 text-[#22D3EE] text-xs px-2.5 py-1 rounded-full border border-[#22D3EE]/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Notes */}
                <div>
                  <p className="text-[#52525B] text-xs uppercase tracking-wider mb-2">
                    Stylist Notes
                  </p>
                  <div className="bg-[#1C1C22] rounded-xl p-3">
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">
                      {selectedClient.notes || "No notes added yet."}
                    </p>
                  </div>
                </div>
                {/* History */}
                <div>
                  <p className="text-[#52525B] text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Appointment History
                  </p>
                  <div className="space-y-2">
                    {selectedClient.history.length === 0 && (
                      <p className="text-[#52525B] text-sm">No history yet.</p>
                    )}
                    {selectedClient.history.map((h, idx) => (
                      <div
                        key={idx}
                        className="bg-[#1C1C22] rounded-xl px-4 py-3 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-[#F5F5F7] text-sm font-medium">
                            {h.service}
                          </p>
                          <p className="text-[#52525B] text-xs">{h.date}</p>
                        </div>
                        <p className="text-[#22D3EE] text-sm font-semibold">
                          LKR {h.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setEditingClient({ ...selectedClient })}
                  className="w-full flex items-center justify-center gap-2 bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20 rounded-xl py-2.5 text-sm font-medium hover:bg-[#22D3EE]/20 transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit Client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit client modal */}
      <AnimatePresence>
        {editingClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditingClient(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
                <h3 className="text-[#F5F5F7] font-semibold">Edit Client</h3>
                <button
                  onClick={() => setEditingClient(null)}
                  className="text-[#52525B] hover:text-[#F5F5F7] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { key: "name", label: "Name" },
                  { key: "phone", label: "Phone" },
                  { key: "email", label: "Email" },
                  { key: "notes", label: "Notes" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={editingClient[field.key as keyof Client] as string}
                      onChange={(e) =>
                        setEditingClient((p) =>
                          p ? { ...p, [field.key]: e.target.value } : p,
                        )
                      }
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Hair Type
                  </label>
                  <select
                    value={editingClient.hairType}
                    onChange={(e) =>
                      setEditingClient((p) =>
                        p ? { ...p, hairType: e.target.value as HairType } : p,
                      )
                    }
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 transition-colors"
                  >
                    {HAIR_TYPES.map((ht) => (
                      <option key={ht} value={ht}>
                        {ht}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingClient.tags.join(", ")}
                    onChange={(e) =>
                      setEditingClient((p) =>
                        p
                          ? {
                              ...p,
                              tags: e.target.value
                                .split(",")
                                .map((t) => t.trim()),
                            }
                          : p,
                      )
                    }
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 transition-colors"
                  />
                </div>
                <button
                  onClick={saveEdit}
                  className="w-full bg-[#22D3EE] text-[#0B0B0F] font-semibold py-2.5 rounded-xl hover:bg-[#22D3EE]/90 transition-colors mt-2"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add client modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.75} />
                  <h3 className="text-[#F5F5F7] font-semibold">
                    Add New Client
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-[#52525B] hover:text-[#F5F5F7] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {[
                  {
                    key: "name",
                    label: "Full Name *",
                    placeholder: "e.g. Dilhani Perera",
                  },
                  {
                    key: "phone",
                    label: "Phone *",
                    placeholder: "+94 7X XXX XXXX",
                  },
                  {
                    key: "email",
                    label: "Email",
                    placeholder: "client@example.com",
                  },
                  {
                    key: "notes",
                    label: "Notes",
                    placeholder: "Hair preferences, allergies, special needs…",
                  },
                  {
                    key: "tags",
                    label: "Tags (comma separated)",
                    placeholder: "e.g. Balayage, Colour, Fine Hair",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={newClient[field.key as keyof typeof newClient]}
                      onChange={(e) =>
                        setNewClient((p) => ({
                          ...p,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none focus:border-[#22D3EE]/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Hair Type
                  </label>
                  <select
                    value={newClient.hairType}
                    onChange={(e) =>
                      setNewClient((p) => ({
                        ...p,
                        hairType: e.target.value as HairType,
                      }))
                    }
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 transition-colors"
                  >
                    {HAIR_TYPES.map((ht) => (
                      <option key={ht} value={ht}>
                        {ht}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={addClient}
                  className="w-full bg-[#22D3EE] text-[#0B0B0F] font-semibold py-2.5 rounded-xl hover:bg-[#22D3EE]/90 transition-colors mt-2"
                >
                  Add Client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {showDeleteConfirm !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-sm p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-5 h-5 text-[#EF4444]" />
              </div>
              <p className="text-[#F5F5F7] font-semibold mb-1">
                Remove client?
              </p>
              <p className="text-[#52525B] text-sm mb-5">
                This client and all their notes will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm hover:border-[#3f3f46] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteClient(showDeleteConfirm)}
                  className="flex-1 py-2.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-sm font-medium hover:bg-[#EF4444]/20 transition-colors"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
