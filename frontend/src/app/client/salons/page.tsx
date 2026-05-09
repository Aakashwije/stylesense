"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  Clock,
  MapPin,
  Phone,
  Scissors,
  Search,
  SlidersHorizontal,
  Star,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Hair & Color",
  "Men's Grooming",
  "Bridal",
  "Nails",
  "Spa & Facial",
  "Lashes & Brows",
];

const SALONS = [
  {
    id: "s1",
    name: "Glamour Studio",
    location: "Colombo 03",
    address: "45 Galle Road, Colombo 03",
    phone: "+94 11 234 5678",
    rating: 4.9,
    reviews: 312,
    category: "Hair & Color",
    openNow: true,
    hours: "9 AM – 7 PM",
    price: "LKR 2,500+",
    specialties: ["Balayage", "Keratin", "Color Correction"],
    stylistCount: 8,
    tag: "Top Rated",
    tagColor: "#8B5CF6",
    gradient: "from-[#8B5CF6]/20 to-[#7C3AED]/10",
  },
  {
    id: "s2",
    name: "Urban Cuts",
    location: "Colombo 07",
    address: "12 Havelock Road, Colombo 07",
    phone: "+94 11 456 7890",
    rating: 4.8,
    reviews: 208,
    category: "Men's Grooming",
    openNow: true,
    hours: "8 AM – 8 PM",
    price: "LKR 1,200+",
    specialties: ["Fade", "Beard Styling", "Hot Towel Shave"],
    stylistCount: 5,
    tag: "Trending",
    tagColor: "#22D3EE",
    gradient: "from-[#22D3EE]/20 to-[#0EA5E9]/10",
  },
  {
    id: "s3",
    name: "Bloom Beauty Lounge",
    location: "Nugegoda",
    address: "78 High Level Rd, Nugegoda",
    phone: "+94 11 567 8901",
    rating: 4.7,
    reviews: 175,
    category: "Bridal",
    openNow: false,
    hours: "10 AM – 6 PM",
    price: "LKR 5,000+",
    specialties: ["Bridal Makeup", "Saree Draping", "Pre-Bridal Package"],
    stylistCount: 6,
    tag: "Popular",
    tagColor: "#EC4899",
    gradient: "from-[#EC4899]/20 to-[#DB2777]/10",
  },
  {
    id: "s4",
    name: "The Nail Bar",
    location: "Colombo 05",
    address: "22 Duplication Road, Colombo 05",
    phone: "+94 11 678 9012",
    rating: 4.8,
    reviews: 142,
    category: "Nails",
    openNow: true,
    hours: "10 AM – 8 PM",
    price: "LKR 1,800+",
    specialties: ["Gel Nails", "Nail Art", "Manicure & Pedicure"],
    stylistCount: 4,
    tag: "Best Value",
    tagColor: "#F59E0B",
    gradient: "from-[#F59E0B]/20 to-[#D97706]/10",
  },
  {
    id: "s5",
    name: "Serenity Spa & Salon",
    location: "Rajagiriya",
    address: "55 Parliament Rd, Rajagiriya",
    phone: "+94 11 789 0123",
    rating: 4.6,
    reviews: 98,
    category: "Spa & Facial",
    openNow: true,
    hours: "9 AM – 9 PM",
    price: "LKR 3,500+",
    specialties: ["HydraFacial", "Aromatherapy", "Body Wraps"],
    stylistCount: 7,
    tag: "Luxury",
    tagColor: "#10B981",
    gradient: "from-[#10B981]/20 to-[#059669]/10",
  },
  {
    id: "s6",
    name: "Lash & Brow Lab",
    location: "Colombo 04",
    address: "8 Bauddhaloka Mawatha, Colombo 04",
    phone: "+94 11 890 1234",
    rating: 4.9,
    reviews: 267,
    category: "Lashes & Brows",
    openNow: false,
    hours: "10 AM – 7 PM",
    price: "LKR 2,000+",
    specialties: ["Lash Extensions", "Brow Lamination", "Microblading"],
    stylistCount: 3,
    tag: "Specialist",
    tagColor: "#A78BFA",
    gradient: "from-[#A78BFA]/20 to-[#8B5CF6]/10",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SalonsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openOnly, setOpenOnly] = useState(false);

  const filtered = SALONS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.specialties.some((sp) =>
        sp.toLowerCase().includes(search.toLowerCase()),
      );
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchOpen = !openOnly || s.openNow;
    return matchSearch && matchCat && matchOpen;
  });

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <FadeUp>
        <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">
          Browse Salons
        </h1>
        <p className="text-[#A1A1AA] text-sm">
          {SALONS.length} salons available · Find your perfect match
        </p>
      </FadeUp>

      {/* Search + Filter Bar */}
      <FadeUp delay={0.08}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-[#1C1C22] border border-[#38383F] rounded-xl px-4 h-11 flex-1 focus-within:border-[#8B5CF6]/50 transition-colors">
            <Search className="w-4 h-4 text-[#52525B] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location, specialty..."
              className="bg-transparent text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none flex-1"
            />
          </div>
          <button
            onClick={() => setOpenOnly(!openOnly)}
            className={`flex items-center gap-2 px-4 h-11 rounded-xl border text-sm font-medium transition-all duration-200 ${
              openOnly
                ? "bg-[#22C55E]/15 border-[#22C55E]/40 text-[#22C55E]"
                : "bg-[#1C1C22] border-[#38383F] text-[#A1A1AA] hover:border-[#52525B]"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Open Now
          </button>
        </div>
      </FadeUp>

      {/* Category Tabs */}
      <FadeUp delay={0.12}>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#1C1C22] border border-[#38383F] text-[#A1A1AA] hover:border-[#52525B] hover:text-[#F5F5F7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Results count */}
      <p className="text-[#52525B] text-xs">
        Showing {filtered.length} salon{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Salon Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        staggerDelay={0.07}
      >
        {filtered.map((salon) => (
          <StaggerItem key={salon.id}>
            <SSCard hover className="h-full group overflow-hidden">
              {/* Subtle gradient tint */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.06]"
                style={{
                  background: `linear-gradient(135deg, ${salon.tagColor}80, transparent 60%)`,
                }}
              />
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${salon.tagColor}18`,
                    border: `1px solid ${salon.tagColor}28`,
                  }}
                >
                  <Store
                    className="w-5 h-5"
                    style={{ color: salon.tagColor }}
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      color: salon.tagColor,
                      background: `${salon.tagColor}20`,
                    }}
                  >
                    {salon.tag}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      salon.openNow
                        ? "text-[#22C55E] bg-[#22C55E]/15"
                        : "text-[#71717A] bg-[#27272A]"
                    }`}
                  >
                    {salon.openNow ? "Open Now" : "Closed"}
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-[#F5F5F7] font-semibold text-sm mb-1">
                {salon.name}
              </h3>
              <div className="flex items-center gap-1 text-[#71717A] text-xs mb-1">
                <MapPin className="w-3 h-3 shrink-0" />
                {salon.address}
              </div>
              <div className="flex items-center gap-3 text-[#71717A] text-xs mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {salon.hours}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {salon.phone}
                </span>
              </div>

              {/* Rating + Stylists */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-[#F5F5F7] text-xs font-semibold">
                    {salon.rating}
                  </span>
                  <span className="text-[#52525B] text-xs">
                    ({salon.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#71717A] text-xs">
                  <Scissors className="w-3 h-3" />
                  {salon.stylistCount} stylists
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {salon.specialties.map((sp) => (
                  <span
                    key={sp}
                    className="px-2 py-0.5 rounded-full bg-[#27272A] text-[#A1A1AA] text-[10px]"
                  >
                    {sp}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between">
                <span className="text-[#F5F5F7] text-xs font-medium">
                  From <span className="text-[#8B5CF6]">{salon.price}</span>
                </span>
                <Link
                  href={`/client/stylists?salon=${salon.id}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8B5CF6] text-white text-xs font-semibold hover:bg-[#7C3AED] transition-colors"
                >
                  View Stylists
                </Link>
              </div>
            </SSCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Store className="w-10 h-10 text-[#3f3f46] mx-auto mb-3" />
          <p className="text-[#A1A1AA] text-sm">No salons match your search</p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
              setOpenOnly(false);
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
