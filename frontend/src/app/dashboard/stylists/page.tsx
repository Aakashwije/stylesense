"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Crown,
  Plus,
  Star,
  ToggleLeft,
  ToggleRight,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";

const STYLISTS = [
  {
    id: 1,
    name: "Shenali Rodrigo",
    avatar: "SR",
    role: "Senior Stylist",
    specialties: ["Keratin", "Balayage", "Bridal"],
    todayEarnings: 8400,
    weeklyEarnings: 24800,
    totalBookings: 48,
    rating: 4.9,
    reviews: 124,
    available: true,
    schedule: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    services: ["Hair Cut", "Keratin Treatment", "Balayage", "Bridal Styling"],
    gradient: "from-[#8B5CF6] to-[#22D3EE]",
  },
  {
    id: 2,
    name: "Kasun Perera",
    avatar: "KP",
    role: "Color Specialist",
    specialties: ["Coloring", "Highlights", "Perms"],
    todayEarnings: 5200,
    weeklyEarnings: 19600,
    totalBookings: 41,
    rating: 4.7,
    reviews: 98,
    available: true,
    schedule: ["Mon", "Wed", "Thu", "Fri", "Sat"],
    services: ["Hair Color", "Highlights", "Perm", "Hair Treatment"],
    gradient: "from-[#22D3EE] to-[#10B981]",
  },
  {
    id: 3,
    name: "Dinara Silva",
    avatar: "DS",
    role: "Beauty Expert",
    specialties: ["Bridal", "Facials", "Nails"],
    todayEarnings: 7800,
    weeklyEarnings: 22100,
    totalBookings: 37,
    rating: 4.8,
    reviews: 87,
    available: false,
    schedule: ["Tue", "Wed", "Fri", "Sat", "Sun"],
    services: ["Bridal Package", "Facial", "Nail Art", "Manicure", "Pedicure"],
    gradient: "from-[#E8B4B8] to-[#8B5CF6]",
  },
];

function StylistCard({
  stylist,
  onSelect,
}: {
  stylist: (typeof STYLISTS)[0];
  onSelect: () => void;
}) {
  const [available, setAvailable] = useState(stylist.available);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden hover:border-[#3f3f46] transition-colors cursor-pointer group"
      onClick={onSelect}
    >
      {/* Gradient header */}
      <div
        className={`h-20 bg-gradient-to-r ${stylist.gradient} opacity-20 relative`}
      />
      <div className="px-5 pb-5 -mt-10 relative">
        {/* Avatar + status */}
        <div className="flex items-end justify-between mb-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stylist.gradient} flex items-center justify-center text-white font-bold text-lg border-2 border-[#141419] shadow-lg`}
          >
            {stylist.avatar}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${available ? "bg-[#10B981]" : "bg-[#52525B]"}`}
            />
            <span
              className={`text-xs font-medium ${available ? "text-[#10B981]" : "text-[#52525B]"}`}
            >
              {available ? "Available" : "Unavailable"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAvailable(!available);
              }}
              className="text-[#52525B] hover:text-[#A1A1AA] transition-colors"
            >
              {available ? (
                <ToggleRight className="w-5 h-5 text-[#10B981]" />
              ) : (
                <ToggleLeft className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <p className="text-[#F5F5F7] font-semibold text-base mb-0.5">
          {stylist.name}
        </p>
        <p className="text-[#52525B] text-xs mb-3">{stylist.role}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${s <= Math.floor(stylist.rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#27272A]"}`}
              />
            ))}
          </div>
          <span className="text-[#F5F5F7] text-xs font-semibold">
            {stylist.rating}
          </span>
          <span className="text-[#52525B] text-xs">
            ({stylist.reviews} reviews)
          </span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {stylist.specialties.map((sp) => (
            <span
              key={sp}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20"
            >
              {sp}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-[#1C1C22] rounded-xl p-3 text-center">
            <p className="text-[#F5F5F7] text-sm font-bold">
              LKR {(stylist.todayEarnings / 1000).toFixed(1)}k
            </p>
            <p className="text-[#52525B] text-[10px] mt-0.5">Today</p>
          </div>
          <div className="bg-[#1C1C22] rounded-xl p-3 text-center">
            <p className="text-[#F5F5F7] text-sm font-bold">
              LKR {(stylist.weeklyEarnings / 1000).toFixed(0)}k
            </p>
            <p className="text-[#52525B] text-[10px] mt-0.5">This Week</p>
          </div>
          <div className="bg-[#1C1C22] rounded-xl p-3 text-center">
            <p className="text-[#F5F5F7] text-sm font-bold">
              {stylist.totalBookings}
            </p>
            <p className="text-[#52525B] text-[10px] mt-0.5">Bookings</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span
              key={d}
              className={`flex-1 text-center text-[9px] font-semibold py-1 rounded-md ${
                stylist.schedule.includes(d)
                  ? "bg-[#8B5CF6]/15 text-[#8B5CF6]"
                  : "bg-[#1C1C22] text-[#3f3f46]"
              }`}
            >
              {d[0]}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function StylistsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<(typeof STYLISTS)[0] | null>(null);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#52525B] text-sm">
            {STYLISTS.length} stylists · 2 available now
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#141419] border border-[#27272A] rounded-xl px-4 py-2 text-sm text-[#A1A1AA]">
            <span className="text-[#F5F5F7] font-semibold">3</span> / 3 stylists
            <span className="text-[#52525B] ml-1">(Base plan)</span>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 h-9 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add Stylist
          </button>
        </div>
      </div>

      {/* Leaderboard banner */}
      <div className="bg-gradient-to-r from-[#8B5CF6]/10 via-[#1C1C22] to-[#22D3EE]/10 border border-[#8B5CF6]/20 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 flex items-center justify-center flex-shrink-0">
          <Crown className="w-5 h-5 text-[#F59E0B]" />
        </div>
        <div className="flex-1">
          <p className="text-[#F5F5F7] font-semibold">
            Top Performer This Month
          </p>
          <p className="text-[#A1A1AA] text-sm">
            Shenali Rodrigo · LKR 24,800 earned · 48 bookings · 4.9★ rating
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[#F59E0B] font-bold text-lg">LKR 24,800</p>
          <p className="text-[#52525B] text-xs">Combined salon: LKR 66,500</p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {STYLISTS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StylistCard stylist={s} onSelect={() => setSelected(s)} />
          </motion.div>
        ))}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-lg p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selected.gradient} flex items-center justify-center text-white font-bold`}
                  >
                    {selected.avatar}
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] font-semibold">
                      {selected.name}
                    </p>
                    <p className="text-[#52525B] text-xs">{selected.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center hover:bg-[#27272A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-[#1C1C22] rounded-xl p-3 text-center">
                  <p className="text-[#8B5CF6] text-lg font-bold">
                    LKR {(selected.todayEarnings / 1000).toFixed(1)}k
                  </p>
                  <p className="text-[#52525B] text-xs">Today</p>
                </div>
                <div className="bg-[#1C1C22] rounded-xl p-3 text-center">
                  <p className="text-[#22D3EE] text-lg font-bold">
                    LKR {(selected.weeklyEarnings / 1000).toFixed(0)}k
                  </p>
                  <p className="text-[#52525B] text-xs">This Week</p>
                </div>
                <div className="bg-[#1C1C22] rounded-xl p-3 text-center">
                  <p className="text-[#10B981] text-lg font-bold">
                    {selected.totalBookings}
                  </p>
                  <p className="text-[#52525B] text-xs">Bookings</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-[#52525B] text-xs uppercase tracking-wider mb-2">
                  Assigned Services
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.services.map((svc) => (
                    <span
                      key={svc}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA]"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                  Edit Profile
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-sm hover:text-[#F5F5F7] transition-colors">
                  View Schedule
                </button>
                <button className="py-2.5 px-3 rounded-xl bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 text-sm hover:bg-[#EF4444]/20 transition-colors">
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Stylist modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAdd(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-[#F5F5F7] font-semibold">Add New Stylist</p>
                <button
                  onClick={() => setShowAdd(false)}
                  className="w-8 h-8 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-[#1C1C22] border border-dashed border-[#3f3f46] flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#8B5CF6]/50 transition-colors">
                  <Upload className="w-5 h-5 text-[#52525B]" />
                  <span className="text-[#52525B] text-xs">Photo</span>
                </div>
              </div>
              <div className="space-y-3">
                {["Full Name", "Role / Title", "Phone Number", "Email"].map(
                  (label) => (
                    <div key={label}>
                      <label className="text-[#52525B] text-xs mb-1 block">
                        {label}
                      </label>
                      <input
                        className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] placeholder:text-[#3f3f46] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                        placeholder={label}
                      />
                    </div>
                  ),
                )}
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Specialties
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Haircut",
                      "Coloring",
                      "Bridal",
                      "Nails",
                      "Facial",
                      "Spa",
                    ].map((sp) => (
                      <button
                        key={sp}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#1C1C22] border border-[#27272A] text-[#52525B] hover:border-[#8B5CF6]/40 hover:text-[#8B5CF6] transition-all"
                      >
                        {sp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 p-3 bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl">
                <p className="text-[#F59E0B] text-xs">
                  Adding a 4th stylist will charge an additional{" "}
                  <strong>LKR 300/month</strong>
                </p>
              </div>
              <button className="w-full mt-4 py-3 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                Add Stylist
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
