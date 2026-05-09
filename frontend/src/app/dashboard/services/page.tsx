"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Crown,
  Droplets,
  Edit2,
  Flower2,
  Gem,
  Paintbrush,
  Plus,
  Scissors,
  Search,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  User2,
  X,
} from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Haircut",
  "Coloring",
  "Bridal",
  "Facials",
  "Spa",
  "Nails",
  "Grooming",
];

const SERVICES = [
  {
    id: 1,
    name: "Classic Hair Cut",
    category: "Haircut",
    price: 800,
    duration: 45,
    description:
      "Precision cut tailored to your face shape with blow dry and styling.",
    addons: ["Deep Conditioning", "Scalp Massage"],
    stylists: ["Shenali R.", "Kasun P."],
    icon: Scissors,
    iconColor: "#8B5CF6",
    iconBg: "from-[#8B5CF6]/20 to-[#8B5CF6]/5",
    active: true,
  },
  {
    id: 2,
    name: "Balayage Color",
    category: "Coloring",
    price: 4500,
    duration: 150,
    description: "Hand-painted highlights for a natural sun-kissed look.",
    addons: ["Toning", "Hair Mask", "Glossing"],
    stylists: ["Kasun P."],
    icon: Paintbrush,
    iconColor: "#F59E0B",
    iconBg: "from-[#F59E0B]/20 to-[#F59E0B]/5",
    active: true,
  },
  {
    id: 3,
    name: "Keratin Treatment",
    category: "Haircut",
    price: 3500,
    duration: 90,
    description:
      "Smoothing treatment that eliminates frizz and adds shine for 3-5 months.",
    addons: ["Deep Conditioning", "Protein Mask"],
    stylists: ["Shenali R."],
    icon: Sparkles,
    iconColor: "#22D3EE",
    iconBg: "from-[#22D3EE]/20 to-[#22D3EE]/5",
    active: true,
  },
  {
    id: 4,
    name: "Bridal Package",
    category: "Bridal",
    price: 12000,
    duration: 180,
    description:
      "Complete bridal transformation including hair, makeup, and nail art.",
    addons: ["Pre-bridal Facial", "Mehendi"],
    stylists: ["Dinara S."],
    icon: Crown,
    iconColor: "#E8B4B8",
    iconBg: "from-[#E8B4B8]/20 to-[#E8B4B8]/5",
    active: true,
  },
  {
    id: 5,
    name: "Luxury Facial",
    category: "Facials",
    price: 2200,
    duration: 60,
    description:
      "Deep cleansing facial with extraction, hydration and glow treatment.",
    addons: ["Eye Treatment", "Neck Massage"],
    stylists: ["Dinara S."],
    icon: Flower2,
    iconColor: "#10B981",
    iconBg: "from-[#10B981]/20 to-[#10B981]/5",
    active: true,
  },
  {
    id: 6,
    name: "Manicure + Pedicure",
    category: "Nails",
    price: 1800,
    duration: 75,
    description:
      "Classic manicure and pedicure with nail art and cuticle care.",
    addons: ["Gel Polish", "Nail Art", "Paraffin Wax"],
    stylists: ["Dinara S."],
    icon: Gem,
    iconColor: "#EC4899",
    iconBg: "from-[#EC4899]/20 to-[#EC4899]/5",
    active: true,
  },
  {
    id: 7,
    name: "Hot Stone Spa",
    category: "Spa",
    price: 3800,
    duration: 90,
    description:
      "Full body relaxation with hot stone therapy and aromatherapy oils.",
    addons: ["Scalp Massage", "Herbal Compress"],
    stylists: ["Shenali R.", "Dinara S."],
    icon: Droplets,
    iconColor: "#06B6D4",
    iconBg: "from-[#06B6D4]/20 to-[#06B6D4]/5",
    active: false,
  },
  {
    id: 8,
    name: "Men's Grooming",
    category: "Grooming",
    price: 1200,
    duration: 60,
    description:
      "Complete men's grooming package including haircut, beard trim and styling.",
    addons: ["Scalp Treatment", "Beard Oil"],
    stylists: ["Kasun P."],
    icon: User2,
    iconColor: "#A1A1AA",
    iconBg: "from-[#A1A1AA]/20 to-[#A1A1AA]/5",
    active: true,
  },
];

function ServiceCard({
  service,
  onEdit,
}: {
  service: (typeof SERVICES)[0];
  onEdit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`bg-[#141419] border rounded-2xl overflow-hidden transition-colors group ${service.active ? "border-[#27272A] hover:border-[#3f3f46]" : "border-[#27272A]/50 opacity-60"}`}
    >
      {/* Icon banner */}
      <div
        className={`h-32 bg-gradient-to-br ${service.iconBg} flex items-center justify-center`}
      >
        <service.icon
          className="w-12 h-12"
          style={{ color: service.iconColor }}
          strokeWidth={1.5}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 mb-2 block w-fit">
              {service.category}
            </span>
            <h3 className="text-[#F5F5F7] font-semibold text-base">
              {service.name}
            </h3>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              className="w-7 h-7 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center hover:bg-[#27272A] hover:text-[#F5F5F7]"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center hover:bg-[#EF4444]/20">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="text-[#52525B] text-xs leading-relaxed mb-3 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#52525B]" />
            <span className="text-[#A1A1AA] text-xs">
              {service.duration} min
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#52525B]" />
            <span className="text-[#F5F5F7] text-sm font-semibold">
              LKR {service.price.toLocaleString()}
            </span>
          </div>
        </div>
        {service.addons.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {service.addons.map((a) => (
              <span
                key={a}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#1C1C22] border border-[#27272A] text-[#52525B]"
              >
                +{a}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-1.5 pt-3 border-t border-[#27272A]">
          <span className="text-[#52525B] text-[10px]">Assigned to:</span>
          {service.stylists.map((s) => (
            <span
              key={s}
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-[#1C1C22] text-[#A1A1AA]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editService, setEditService] = useState<(typeof SERVICES)[0] | null>(
    null,
  );

  const filtered = SERVICES.filter((s) => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch =
      !search || s.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-[#52525B] text-sm">
          {SERVICES.length} services · {SERVICES.filter((s) => s.active).length}{" "}
          active
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 card-3d bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 focus-within:border-[#8B5CF6]/50 transition-colors">
            <Search className="w-4 h-4 text-[#52525B] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none w-40"
            />
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 h-9 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 h-8 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30"
                : "bg-[#141419] border border-[#27272A] text-[#52525B] hover:text-[#A1A1AA]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <ServiceCard service={s} onEdit={() => setEditService(s)} />
          </motion.div>
        ))}
      </div>

      {/* Add / Edit modal */}
      <AnimatePresence>
        {(showAdd || editService) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAdd(false);
              setEditService(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-[#F5F5F7] font-semibold">
                  {editService ? "Edit Service" : "Add New Service"}
                </p>
                <button
                  onClick={() => {
                    setShowAdd(false);
                    setEditService(null);
                  }}
                  className="w-8 h-8 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center hover:bg-[#27272A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image upload */}
              <div className="mb-4">
                <div className="h-32 bg-[#1C1C22] border border-dashed border-[#3f3f46] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#8B5CF6]/50 transition-colors">
                  <Upload className="w-6 h-6 text-[#52525B]" />
                  <span className="text-[#52525B] text-sm">
                    Upload service image
                  </span>
                  <span className="text-[#3f3f46] text-xs">
                    PNG, JPG up to 5MB
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      Service Name
                    </label>
                    <input
                      defaultValue={editService?.name}
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] placeholder:text-[#3f3f46] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                      placeholder="e.g. Balayage"
                    />
                  </div>
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        defaultValue={editService?.category}
                        className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors appearance-none"
                      >
                        {CATEGORIES.filter((c) => c !== "All").map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B] pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Description
                  </label>
                  <textarea
                    defaultValue={editService?.description}
                    rows={3}
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2.5 text-sm text-[#F5F5F7] placeholder:text-[#3f3f46] outline-none focus:border-[#8B5CF6]/50 transition-colors resize-none"
                    placeholder="Describe this service..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      Price (LKR)
                    </label>
                    <input
                      defaultValue={editService?.price}
                      type="number"
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                      placeholder="1500"
                    />
                  </div>
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      Duration (min)
                    </label>
                    <input
                      defaultValue={editService?.duration}
                      type="number"
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                      placeholder="60"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Add-ons (comma separated)
                  </label>
                  <input
                    defaultValue={editService?.addons.join(", ")}
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    placeholder="Deep Conditioning, Scalp Massage"
                  />
                </div>
              </div>
              <button className="w-full mt-5 py-3 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                {editService ? "Save Changes" : "Add Service"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
