"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  Calendar,
  Heart,
  MapPin,
  Scissors,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SAVED_STYLISTS = [
  {
    id: "st1",
    name: "Shenali Rodrigo",
    initials: "SR",
    salon: "Glamour Studio",
    specialty: "Balayage & Color",
    rating: 4.9,
    reviews: 312,
    price: "LKR 3,500+",
    available: true,
    nextSlot: "Tomorrow 2pm",
    avatarGrad: "from-[#8B5CF6] to-[#6D28D9]",
    savedOn: "May 2, 2026",
  },
  {
    id: "st2",
    name: "Priya Navaratnam",
    initials: "PN",
    salon: "Bloom Beauty Lounge",
    specialty: "Bridal & Makeup",
    rating: 4.8,
    reviews: 198,
    price: "LKR 5,000+",
    available: false,
    nextSlot: "May 20",
    avatarGrad: "from-[#EC4899] to-[#DB2777]",
    savedOn: "Apr 28, 2026",
  },
  {
    id: "st3",
    name: "Dilini Wijesinghe",
    initials: "DW",
    salon: "Serenity Spa & Salon",
    specialty: "HydraFacial & Skin",
    rating: 4.7,
    reviews: 145,
    price: "LKR 4,200+",
    available: true,
    nextSlot: "Today 4pm",
    avatarGrad: "from-[#22D3EE] to-[#0EA5E9]",
    savedOn: "Apr 15, 2026",
  },
  {
    id: "st4",
    name: "Kasun Perera",
    initials: "KP",
    salon: "Urban Cuts",
    specialty: "Fades & Men's Cuts",
    rating: 4.6,
    reviews: 289,
    price: "LKR 1,200+",
    available: true,
    nextSlot: "Today 6pm",
    avatarGrad: "from-[#F59E0B] to-[#D97706]",
    savedOn: "Apr 10, 2026",
  },
];

export default function FavoritesPage() {
  const [saved, setSaved] = useState(SAVED_STYLISTS.map((s) => s.id));
  const [search, setSearch] = useState("");

  const unsave = (id: string) =>
    setSaved((prev) => prev.filter((x) => x !== id));

  const visible = SAVED_STYLISTS.filter(
    (s) =>
      saved.includes(s.id) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.specialty.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <FadeUp className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">
            Saved Stylists
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            {saved.length} stylist{saved.length !== 1 ? "s" : ""} saved ·
            Quick-book any time
          </p>
        </div>
        <Link
          href="/client/stylists"
          className="flex items-center gap-2 px-4 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors"
        >
          <Search className="w-4 h-4" />
          Browse More
        </Link>
      </FadeUp>

      {/* Search */}
      <FadeUp delay={0.07}>
        <div className="flex items-center gap-2 bg-[#1C1C22] border border-[#38383F] rounded-xl px-4 h-11 focus-within:border-[#8B5CF6]/50 transition-colors">
          <Search className="w-4 h-4 text-[#52525B] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved stylists..."
            className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
          />
        </div>
      </FadeUp>

      {/* Grid */}
      {visible.length > 0 ? (
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          staggerDelay={0.07}
        >
          {visible.map((stylist) => (
            <StaggerItem key={stylist.id}>
              <SSCard hover className="relative h-full">
                {/* Remove button */}
                <button
                  onClick={() => unsave(stylist.id)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#27272A] border border-[#38383F] flex items-center justify-center hover:border-[#EF4444]/50 hover:text-[#EF4444] text-[#52525B] transition-all"
                  title="Remove from saved"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Avatar + Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-linear-to-br ${stylist.avatarGrad} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                  >
                    {stylist.initials}
                  </div>
                  <div className="min-w-0 pr-10">
                    <h3 className="text-[#F5F5F7] font-semibold text-sm truncate">
                      {stylist.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[#71717A] text-xs mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{stylist.salon}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#71717A] text-xs mt-0.5">
                      <Scissors className="w-3 h-3 shrink-0" />
                      <span className="truncate">{stylist.specialty}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-[#0B0B0F]/50 border border-[#38383F]/50">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-[#F5F5F7] text-xs font-bold">
                      {stylist.rating}
                    </span>
                    <span className="text-[#52525B] text-xs">
                      ({stylist.reviews})
                    </span>
                  </div>
                  <div className="w-px h-4 bg-[#38383F]" />
                  <span className="text-[#F5F5F7] text-xs font-medium">
                    {stylist.price}
                  </span>
                  <div className="w-px h-4 bg-[#38383F]" />
                  <span
                    className={`text-xs font-medium ${stylist.available ? "text-[#22C55E]" : "text-[#71717A]"}`}
                  >
                    {stylist.available ? "Available" : "Busy"}
                  </span>
                </div>

                {/* Next slot + saved date */}
                <div className="flex items-center justify-between text-xs text-[#71717A] mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Next: {stylist.nextSlot}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#EC4899]" />
                    Saved {stylist.savedOn}
                  </span>
                </div>

                <Link
                  href={`/client/bookings/new?stylist=${stylist.id}`}
                  className="flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Link>
              </SSCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 text-[#3f3f46] mx-auto mb-4" />
          <h3 className="text-[#F5F5F7] font-semibold mb-2">
            {search ? "No matches found" : "No saved stylists yet"}
          </h3>
          <p className="text-[#71717A] text-sm mb-4">
            {search
              ? "Try a different search term"
              : "Browse stylists and tap the heart icon to save them here"}
          </p>
          {!search && (
            <Link
              href="/client/stylists"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors"
            >
              <Search className="w-4 h-4" />
              Browse Stylists
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
