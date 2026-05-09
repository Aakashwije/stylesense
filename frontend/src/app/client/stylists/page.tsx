"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  Award,
  Calendar,
  Heart,
  Scissors,
  Search,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const CATEGORIES = [
  { id: "all", label: "All Stylists", icon: Scissors },
  { id: "haircut", label: "Haircut", icon: Scissors },
  { id: "coloring", label: "Coloring", icon: Sparkles },
  { id: "bridal", label: "Bridal", icon: Award },
  { id: "men", label: "Men's Grooming", icon: Scissors },
  { id: "nails", label: "Nails", icon: Star },
  { id: "spa", label: "Spa & Facial", icon: Heart },
];

const STYLISTS = [
  {
    id: "st1",
    name: "Shenali Rodrigo",
    salon: "Glamour Studio",
    salonId: "s1",
    location: "Colombo 03",
    avatar: null,
    initials: "SR",
    avatarGrad: "from-[#8B5CF6] to-[#EC4899]",
    rating: 4.97,
    reviews: 243,
    yearsExp: 7,
    specialties: ["coloring", "bridal"],
    specialtyLabels: ["Balayage", "Color Correction", "Bridal Updo"],
    price: "LKR 3,500",
    available: true,
    nextSlot: "Today 3PM",
    badge: "Top Rated",
    badgeColor: "#8B5CF6",
    bookings: 1240,
  },
  {
    id: "st2",
    name: "Kasun Perera",
    salon: "Urban Cuts",
    salonId: "s2",
    location: "Colombo 07",
    avatar: null,
    initials: "KP",
    avatarGrad: "from-[#22D3EE] to-[#0EA5E9]",
    rating: 4.92,
    reviews: 187,
    yearsExp: 5,
    specialties: ["men", "haircut"],
    specialtyLabels: ["Fade", "Taper", "Beard Sculpting"],
    price: "LKR 1,500",
    available: true,
    nextSlot: "Tomorrow 10AM",
    badge: "Men's Expert",
    badgeColor: "#22D3EE",
    bookings: 890,
  },
  {
    id: "st3",
    name: "Priya Navaratnam",
    salon: "Bloom Beauty Lounge",
    salonId: "s3",
    location: "Nugegoda",
    avatar: null,
    initials: "PN",
    avatarGrad: "from-[#EC4899] to-[#DB2777]",
    rating: 4.95,
    reviews: 312,
    yearsExp: 9,
    specialties: ["bridal", "coloring"],
    specialtyLabels: ["Bridal Makeup", "Saree Draping", "Balayage"],
    price: "LKR 6,000",
    available: false,
    nextSlot: "May 13",
    badge: "Bridal Specialist",
    badgeColor: "#EC4899",
    bookings: 1680,
  },
  {
    id: "st4",
    name: "Nilufar Hashim",
    salon: "The Nail Bar",
    salonId: "s4",
    location: "Colombo 05",
    avatar: null,
    initials: "NH",
    avatarGrad: "from-[#F59E0B] to-[#D97706]",
    rating: 4.88,
    reviews: 128,
    yearsExp: 4,
    specialties: ["nails"],
    specialtyLabels: ["Gel Extensions", "Nail Art", "French Manicure"],
    price: "LKR 2,000",
    available: true,
    nextSlot: "Today 5PM",
    badge: "Nail Artist",
    badgeColor: "#F59E0B",
    bookings: 620,
  },
  {
    id: "st5",
    name: "Dilini Wijesinghe",
    salon: "Serenity Spa & Salon",
    salonId: "s5",
    location: "Rajagiriya",
    avatar: null,
    initials: "DW",
    avatarGrad: "from-[#10B981] to-[#059669]",
    rating: 4.85,
    reviews: 94,
    yearsExp: 6,
    specialties: ["spa", "coloring"],
    specialtyLabels: ["HydraFacial", "Body Wraps", "Highlights"],
    price: "LKR 4,000",
    available: true,
    nextSlot: "Today 4PM",
    badge: "Wellness Expert",
    badgeColor: "#10B981",
    bookings: 480,
  },
  {
    id: "st6",
    name: "Amara Silva",
    salon: "Glamour Studio",
    salonId: "s1",
    location: "Colombo 03",
    avatar: null,
    initials: "AS",
    avatarGrad: "from-[#A78BFA] to-[#8B5CF6]",
    rating: 4.91,
    reviews: 156,
    yearsExp: 5,
    specialties: ["haircut", "coloring"],
    specialtyLabels: ["Bob Cut", "Highlights", "Keratin Treatment"],
    price: "LKR 2,800",
    available: true,
    nextSlot: "Tomorrow 11AM",
    badge: "Rising Star",
    badgeColor: "#A78BFA",
    bookings: 712,
  },
];

const SORT_OPTIONS = [
  { id: "rating", label: "Top Rated" },
  { id: "bookings", label: "Most Booked" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "available", label: "Available Today" },
];

function StylistsContent() {
  const searchParams = useSearchParams();
  const preselectedSalon = searchParams.get("salon");

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const filtered = STYLISTS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.salon.toLowerCase().includes(search.toLowerCase()) ||
      s.specialtyLabels.some((l) =>
        l.toLowerCase().includes(search.toLowerCase()),
      );
    const matchCat =
      activeCategory === "all" || s.specialties.includes(activeCategory);
    const matchSalon = !preselectedSalon || s.salonId === preselectedSalon;
    return matchSearch && matchCat && matchSalon;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "bookings") return b.bookings - a.bookings;
    if (sortBy === "available")
      return a.available === b.available ? 0 : a.available ? -1 : 1;
    return 0;
  });

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <FadeUp className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">
            Top Stylists
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            {STYLISTS.length} stylists across{" "}
            {new Set(STYLISTS.map((s) => s.salonId)).size} salons · Filter by
            specialty
          </p>
        </div>
      </FadeUp>

      {/* Search + Sort */}
      <FadeUp delay={0.08}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-[#1C1C22] border border-[#38383F] rounded-xl px-4 h-11 flex-1 focus-within:border-[#8B5CF6]/50 transition-colors">
            <Search className="w-4 h-4 text-[#52525B] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, salon, specialty..."
              className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-11 px-4 rounded-xl bg-[#1C1C22] border border-[#38383F] text-[#A1A1AA] text-sm outline-none hover:border-[#52525B] transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </FadeUp>

      {/* Category Filter */}
      <FadeUp delay={0.12}>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-[#1C1C22] border border-[#38383F] text-[#A1A1AA] hover:border-[#52525B] hover:text-[#F5F5F7]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </FadeUp>

      {preselectedSalon && (
        <div className="flex items-center gap-2 p-3 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-xl">
          <Store className="w-4 h-4 text-[#8B5CF6]" />
          <p className="text-[#8B5CF6] text-xs font-medium">
            Showing stylists from selected salon
          </p>
          <Link
            href="/client/stylists"
            className="ml-auto text-[#71717A] text-xs hover:text-[#A1A1AA]"
          >
            Clear filter
          </Link>
        </div>
      )}

      <p className="text-[#52525B] text-xs">
        {filtered.length} stylist{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Stylists Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        staggerDelay={0.07}
      >
        {filtered.map((stylist) => (
          <StaggerItem key={stylist.id}>
            <SSCard hover className="relative h-full group">
              {/* Save */}
              <button
                onClick={() => toggleSave(stylist.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#27272A] border border-[#38383F] flex items-center justify-center transition-all hover:border-[#EC4899]/50 z-10"
              >
                <Heart
                  className="w-3.5 h-3.5 transition-colors"
                  style={{
                    color: savedIds.includes(stylist.id)
                      ? "#EC4899"
                      : "#52525B",
                    fill: savedIds.includes(stylist.id)
                      ? "#EC4899"
                      : "transparent",
                  }}
                />
              </button>

              {/* Avatar + Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-linear-to-br ${stylist.avatarGrad} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                >
                  {stylist.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[#F5F5F7] font-semibold text-sm truncate">
                    {stylist.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[#71717A] text-xs mt-0.5">
                    <Store className="w-3 h-3 shrink-0" />
                    <span className="truncate">{stylist.salon}</span>
                  </div>
                  <span
                    className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      color: stylist.badgeColor,
                      background: `${stylist.badgeColor}20`,
                    }}
                  >
                    {stylist.badge}
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-[#0B0B0F]/50 border border-[#38383F]/50">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-0.5 mb-0.5">
                    <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-[#F5F5F7] text-xs font-bold">
                      {stylist.rating}
                    </span>
                  </div>
                  <p className="text-[#52525B] text-[10px]">
                    {stylist.reviews} reviews
                  </p>
                </div>
                <div className="text-center border-x border-[#38383F]/50">
                  <p className="text-[#F5F5F7] text-xs font-bold mb-0.5">
                    {stylist.yearsExp}y
                  </p>
                  <p className="text-[#52525B] text-[10px]">Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-[#F5F5F7] text-xs font-bold mb-0.5">
                    {stylist.bookings.toLocaleString()}
                  </p>
                  <p className="text-[#52525B] text-[10px]">Bookings</p>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {stylist.specialtyLabels.map((sp) => (
                  <span
                    key={sp}
                    className="px-2 py-0.5 rounded-full bg-[#27272A] text-[#A1A1AA] text-[10px]"
                  >
                    {sp}
                  </span>
                ))}
              </div>

              {/* Price + Availability */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[#F5F5F7] text-xs font-semibold">
                    {stylist.price}
                  </p>
                  <p className="text-[#52525B] text-[10px]">per session</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xs font-medium ${stylist.available ? "text-[#22C55E]" : "text-[#71717A]"}`}
                  >
                    {stylist.available ? "Available" : "Busy"}
                  </p>
                  <p className="text-[#52525B] text-[10px]">
                    Next: {stylist.nextSlot}
                  </p>
                </div>
              </div>

              <Link
                href={`/client/bookings/new?stylist=${stylist.id}&salon=${stylist.salonId}`}
                className="flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </SSCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Scissors className="w-10 h-10 text-[#3f3f46] mx-auto mb-3" />
          <p className="text-[#A1A1AA] text-sm">
            No stylists match your search
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("all");
            }}
            className="mt-3 text-[#8B5CF6] text-xs hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function StylistsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#A1A1AA]">Loading...</div>}>
      <StylistsContent />
    </Suspense>
  );
}
