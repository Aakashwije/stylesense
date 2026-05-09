"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Eye,
  EyeOff,
  Filter,
  Globe,
  Lock,
  Plus,
  Scissors,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

type ServiceType =
  | "Balayage"
  | "Keratin"
  | "Highlights"
  | "Haircut"
  | "Colour"
  | "Blowout"
  | "Other";

interface Transformation {
  id: string;
  clientName: string;
  service: ServiceType;
  date: string;
  notes: string;
  isPublic: boolean;
  beforeBg: string;
  afterBg: string;
}

const SERVICE_TYPES: ServiceType[] = [
  "Balayage",
  "Keratin",
  "Highlights",
  "Haircut",
  "Colour",
  "Blowout",
  "Other",
];

const BEFORE_PALETTES = [
  "#3D2B1F",
  "#1A0A00",
  "#4A3728",
  "#2C1810",
  "#5C3D2E",
  "#362718",
];
const AFTER_PALETTES = [
  "#C8A882",
  "#D4B896",
  "#E8D5C0",
  "#B8956A",
  "#F0E6D3",
  "#C4A882",
];

const INITIAL_GALLERY: Transformation[] = [
  {
    id: "g1",
    clientName: "Dilhani Perera",
    service: "Balayage",
    date: "14 Jan 2026",
    notes:
      "Achieved a gorgeous warm honey balayage with face-framing highlights. Client was thrilled!",
    isPublic: true,
    beforeBg: BEFORE_PALETTES[0],
    afterBg: AFTER_PALETTES[0],
  },
  {
    id: "g2",
    clientName: "Sanduni Fernando",
    service: "Keratin",
    date: "10 Jan 2026",
    notes:
      "Brazilian keratin treatment — smoothed frizz completely. 3–4 months lasting result.",
    isPublic: true,
    beforeBg: BEFORE_PALETTES[1],
    afterBg: AFTER_PALETTES[1],
  },
  {
    id: "g3",
    clientName: "Anonymous",
    service: "Highlights",
    date: "8 Jan 2026",
    notes: "Chunky highlights with toner. Blended beautifully.",
    isPublic: false,
    beforeBg: BEFORE_PALETTES[2],
    afterBg: AFTER_PALETTES[2],
  },
  {
    id: "g4",
    clientName: "Thilini Silva",
    service: "Colour",
    date: "5 Jan 2026",
    notes: "Full colour refresh — rich brunette with warm undertones.",
    isPublic: true,
    beforeBg: BEFORE_PALETTES[3],
    afterBg: AFTER_PALETTES[3],
  },
  {
    id: "g5",
    clientName: "Nadeesha W.",
    service: "Balayage",
    date: "2 Jan 2026",
    notes: "Subtle ash balayage for a natural sun-kissed look.",
    isPublic: true,
    beforeBg: BEFORE_PALETTES[4],
    afterBg: AFTER_PALETTES[4],
  },
  {
    id: "g6",
    clientName: "Anonymous",
    service: "Haircut",
    date: "28 Dec 2025",
    notes: "Blunt bob with curtain bangs — huge transformation!",
    isPublic: false,
    beforeBg: BEFORE_PALETTES[5],
    afterBg: AFTER_PALETTES[5],
  },
];

const SERVICE_COLORS: Record<ServiceType, string> = {
  Balayage: "#8B5CF6",
  Keratin: "#22D3EE",
  Highlights: "#F59E0B",
  Haircut: "#10B981",
  Colour: "#E8B4B8",
  Blowout: "#EC4899",
  Other: "#52525B",
};

function AddModal({
  onAdd,
  onClose,
}: {
  onAdd: (t: Transformation) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    clientName: "",
    service: "Balayage" as ServiceType,
    date: "",
    notes: "",
    isPublic: true,
  });
  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));
  const idx = Math.floor(Math.random() * BEFORE_PALETTES.length);

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
        <div className="flex items-center justify-between p-5 border-b border-[#27272A]">
          <h3 className="text-[#F5F5F7] font-semibold">Add Transformation</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#52525B] hover:bg-[#1C1C22]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {/* Before/After preview */}
          <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden h-32">
            <div
              className="flex flex-col items-center justify-center rounded-xl"
              style={{ backgroundColor: BEFORE_PALETTES[idx] }}
            >
              <Camera className="w-5 h-5 text-white/30 mb-1" />
              <p className="text-white/40 text-xs">Before Photo</p>
            </div>
            <div
              className="flex flex-col items-center justify-center rounded-xl"
              style={{ backgroundColor: AFTER_PALETTES[idx] }}
            >
              <Sparkles className="w-5 h-5 text-white/30 mb-1" />
              <p className="text-white/40 text-xs">After Photo</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="h-8 text-xs rounded-xl border border-[#27272A] text-[#52525B] hover:border-[#22D3EE]/40 hover:text-[#22D3EE] transition-colors flex items-center justify-center gap-1.5">
              <Camera className="w-3.5 h-3.5" /> Upload Before
            </button>
            <button className="h-8 text-xs rounded-xl border border-[#27272A] text-[#52525B] hover:border-[#22D3EE]/40 hover:text-[#22D3EE] transition-colors flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Upload After
            </button>
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">
              Client Name (or "Anonymous")
            </label>
            <input
              value={form.clientName}
              onChange={(e) => set("clientName", e.target.value)}
              placeholder="Dilhani Perera"
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#52525B] text-xs mb-1 block">
                Service
              </label>
              <select
                value={form.service}
                onChange={(e) => set("service", e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
              >
                {SERVICE_TYPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#52525B] text-xs mb-1 block">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50"
              />
            </div>
          </div>
          <div>
            <label className="text-[#52525B] text-xs mb-1 block">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 resize-none"
            />
          </div>
          <button
            onClick={() => set("isPublic", !form.isPublic)}
            className={`w-full h-10 rounded-xl border text-sm font-medium transition-colors flex items-center justify-center gap-2 ${form.isPublic ? "border-[#22D3EE]/30 bg-[#22D3EE]/5 text-[#22D3EE]" : "border-[#27272A] text-[#52525B]"}`}
          >
            {form.isPublic ? (
              <>
                <Globe className="w-3.5 h-3.5" /> Public — visible on profile
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" /> Private — only you can see
              </>
            )}
          </button>
        </div>
        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-[#27272A] text-[#A1A1AA] text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAdd({
                id: `g${Date.now()}`,
                clientName: form.clientName || "Anonymous",
                service: form.service,
                date: form.date
                  ? new Date(form.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Today",
                notes: form.notes,
                isPublic: form.isPublic,
                beforeBg: BEFORE_PALETTES[idx],
                afterBg: AFTER_PALETTES[idx],
              });
              onClose();
            }}
            className="flex-1 h-10 rounded-xl bg-[#22D3EE] text-[#0B0B0F] text-sm font-bold hover:bg-[#06B6D4] transition-colors"
          >
            Add to Gallery
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<Transformation[]>(INITIAL_GALLERY);
  const [filter, setFilter] = useState<ServiceType | "All">("All");
  const [showPrivate, setShowPrivate] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const displayed = gallery.filter((t) => {
    if (!showPrivate && !t.isPublic) return false;
    if (filter !== "All" && t.service !== filter) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <motion.div
        {...fadeUp(0)}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">
            Before / After Gallery
          </h1>
          <p className="text-[#52525B] text-sm">
            Shenali Rodrigo · {gallery.length} transformations
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#22D3EE] text-[#0B0B0F] text-sm font-bold hover:bg-[#06B6D4] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Transformation
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        {...fadeUp(0.05)}
        className="flex flex-wrap gap-2 items-center"
      >
        <div className="flex items-center gap-1.5 mr-1">
          <Filter className="w-3.5 h-3.5 text-[#52525B]" />
          <span className="text-[#52525B] text-xs">Filter:</span>
        </div>
        {(["All", ...SERVICE_TYPES] as (ServiceType | "All")[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 h-8 rounded-xl border transition-colors font-medium ${filter === s ? "bg-[#22D3EE] border-[#22D3EE] text-[#0B0B0F]" : "bg-[#141419] border-[#27272A] text-[#A1A1AA] hover:border-[#3f3f46]"}`}
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => setShowPrivate((v) => !v)}
          className={`ml-auto flex items-center gap-1.5 text-xs h-8 px-3 rounded-xl border transition-colors ${showPrivate ? "border-[#22D3EE]/30 bg-[#22D3EE]/5 text-[#22D3EE]" : "border-[#27272A] text-[#52525B]"}`}
        >
          {showPrivate ? (
            <Eye className="w-3.5 h-3.5" />
          ) : (
            <EyeOff className="w-3.5 h-3.5" />
          )}
          {showPrivate ? "Showing private" : "Hiding private"}
        </button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {displayed.map((t, i) => (
            <motion.div key={t.id} layout {...fadeUp(0.04 * i)}>
              <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden hover:border-[#3f3f46] transition-colors group">
                {/* Before/After split */}
                <div className="grid grid-cols-2 h-36 relative">
                  <div
                    className="flex flex-col items-center justify-end pb-2"
                    style={{ backgroundColor: t.beforeBg }}
                  >
                    <span className="text-white/50 text-[9px] font-semibold uppercase tracking-wider">
                      Before
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center justify-end pb-2"
                    style={{ backgroundColor: t.afterBg }}
                  >
                    <span className="text-white/50 text-[9px] font-semibold uppercase tracking-wider">
                      After
                    </span>
                  </div>
                  {/* Divider line */}
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#0B0B0F] flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#0B0B0F] border border-[#27272A] flex items-center justify-center">
                      <Scissors className="w-2.5 h-2.5 text-[#52525B]" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    {t.isPublic ? (
                      <span className="bg-[#22D3EE]/20 border border-[#22D3EE]/30 rounded-full px-1.5 py-0.5 text-[8px] text-[#22D3EE] flex items-center gap-0.5">
                        <Globe className="w-2.5 h-2.5" /> Public
                      </span>
                    ) : (
                      <span className="bg-[#52525B]/20 border border-[#52525B]/30 rounded-full px-1.5 py-0.5 text-[8px] text-[#52525B] flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> Private
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[#F5F5F7] text-sm font-semibold">
                      {t.clientName}
                    </p>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0"
                      style={{
                        backgroundColor: `${SERVICE_COLORS[t.service]}15`,
                        color: SERVICE_COLORS[t.service],
                      }}
                    >
                      {t.service}
                    </span>
                  </div>
                  <p className="text-[#52525B] text-xs">{t.date}</p>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed line-clamp-2">
                    {t.notes}
                  </p>
                  <button
                    onClick={() =>
                      setGallery((g) =>
                        g.map((x) =>
                          x.id === t.id ? { ...x, isPublic: !x.isPublic } : x,
                        ),
                      )
                    }
                    className="text-xs text-[#52525B] hover:text-[#22D3EE] transition-colors flex items-center gap-1 mt-1"
                  >
                    {t.isPublic ? (
                      <>
                        <EyeOff className="w-3 h-3" /> Make private
                      </>
                    ) : (
                      <>
                        <Globe className="w-3 h-3" /> Make public
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-12">
          <Camera className="w-8 h-8 text-[#52525B] mx-auto mb-3" />
          <p className="text-[#52525B] text-sm">
            No transformations match your filter.
          </p>
        </div>
      )}

      <AnimatePresence>
        {showAdd && (
          <AddModal
            onAdd={(t) => setGallery((g) => [t, ...g])}
            onClose={() => setShowAdd(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
