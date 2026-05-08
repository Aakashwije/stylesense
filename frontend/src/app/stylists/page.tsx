"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ChevronDown,
  Clock,
  MapPin,
  Scissors,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";

const STYLISTS = [
  {
    id: "maya",
    name: "Maya Chen",
    title: "Master Colorist",
    location: "Downtown",
    rating: 4.9,
    reviews: 312,
    experience: 9,
    specialties: ["Balayage", "Color Correction", "Highlights"],
    bio: "Award-winning colorist specializing in lived-in hair and multi-dimensional color. Trained in Paris and NYC.",
    available: true,
    nextSlot: "Today 2:30 PM",
    gradient: ["#8B5CF6", "#22D3EE"],
    initials: "MC",
    badge: "Top Rated",
    price: 6500,
  },
  {
    id: "jordan",
    name: "Jordan Rivera",
    title: "Precision Cut Specialist",
    location: "Midtown",
    rating: 4.8,
    reviews: 247,
    experience: 7,
    specialties: ["Precision Cut", "Blowout", "Textured Hair"],
    bio: "Expert in structural cuts with a focus on face-framing techniques and lived-in styles for all hair types.",
    available: true,
    nextSlot: "Tomorrow 10:00 AM",
    gradient: ["#22D3EE", "#10B981"],
    initials: "JR",
    badge: null,
    price: 4500,
  },
  {
    id: "priya",
    name: "Priya Sharma",
    title: "Skin & Beauty Expert",
    location: "Downtown",
    rating: 4.9,
    reviews: 389,
    experience: 11,
    specialties: ["Facials", "Skin Analysis", "Lash Extensions"],
    bio: "Certified esthetician with expertise in skin rejuvenation, customized facials, and non-invasive beauty treatments.",
    available: false,
    nextSlot: "May 20 at 11:00 AM",
    gradient: ["#E8B4B8", "#8B5CF6"],
    initials: "PS",
    badge: "Fan Favorite",
    price: 7000,
  },
  {
    id: "alex",
    name: "Alex Kim",
    title: "Color & Texture Artist",
    location: "Uptown",
    rating: 4.7,
    reviews: 178,
    experience: 5,
    specialties: ["Root Touch-Up", "Keratin", "Brazilian Blowout"],
    bio: "Texture and treatment specialist focused on hair health, smoothing, and transformative color results.",
    available: true,
    nextSlot: "Today 4:00 PM",
    gradient: ["#F59E0B", "#EF4444"],
    initials: "AK",
    badge: "Rising Star",
    price: 4500,
  },
  {
    id: "sam",
    name: "Sam Okafor",
    title: "Braid & Natural Hair Artist",
    location: "Uptown",
    rating: 4.8,
    reviews: 203,
    experience: 8,
    specialties: ["Box Braids", "Natural Styles", "Protective Styles"],
    bio: "Culturally-informed natural hair specialist with deep expertise in protective styling and curl management.",
    available: true,
    nextSlot: "May 18 at 9:00 AM",
    gradient: ["#10B981", "#22D3EE"],
    initials: "SO",
    badge: null,
    price: 5500,
  },
  {
    id: "lucia",
    name: "Lucia Bianchi",
    title: "Luxury Beauty Stylist",
    location: "Midtown",
    rating: 5.0,
    reviews: 94,
    experience: 14,
    specialties: ["Bridal", "Event Styling", "Color Transformation"],
    bio: "Luxury stylist with 14 years of experience in editorial, bridal, and transformative color artistry.",
    available: false,
    nextSlot: "May 22 at 1:00 PM",
    gradient: ["#8B5CF6", "#E8B4B8"],
    initials: "LB",
    badge: "Elite",
    price: 10500,
  },
];

const LOCATIONS = ["All locations", "Downtown", "Midtown", "Uptown"];
const SPECIALTIES = [
  "All specialties",
  "Color",
  "Cut",
  "Skin",
  "Natural Hair",
  "Bridal",
];

export default function StylistsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [specialty, setSpecialty] = useState("All specialties");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = STYLISTS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.specialties.some((sp) =>
        sp.toLowerCase().includes(search.toLowerCase()),
      );
    const matchLocation =
      location === "All locations" || s.location === location;
    const matchSpecialty =
      specialty === "All specialties" ||
      s.specialties.some((sp) =>
        sp.toLowerCase().includes(specialty.toLowerCase()),
      );
    const matchAvailable = !showAvailableOnly || s.available;
    return matchSearch && matchLocation && matchSpecialty && matchAvailable;
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-[#0B0B0F] pt-32 pb-16 px-6 text-center">
        <FadeUp>
          <Badge variant="purple" size="sm" className="mb-5 inline-flex">
            <Scissors className="w-3 h-3 mr-1" />
            Our Team
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
            Meet our{" "}
            <span className="text-gradient-purple">expert stylists</span>
          </h1>
          <p className="text-[#A1A1AA] max-w-xl mx-auto">
            World-class talent. Hand-selected for skill, artistry, and
            dedication to transformative results.
          </p>
        </FadeUp>
      </section>

      {/* Filters */}
      <section className="bg-[#141419] border-y border-[#27272A] px-6 py-5 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or specialty…"
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6] transition-all"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="appearance-none bg-[#1C1C22] border border-[#27272A] text-sm text-[#F5F5F7] rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-[#8B5CF6] transition-all"
            >
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B] pointer-events-none" />
          </div>

          {/* Available toggle */}
          <button
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              showAvailableOnly
                ? "border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981]"
                : "border-[#27272A] text-[#A1A1AA] hover:text-[#F5F5F7]"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                showAvailableOnly ? "bg-[#10B981]" : "bg-[#27272A]"
              }`}
            />
            Available now
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-[#0B0B0F] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-[#52525B] mb-8">
            {filtered.length} stylist{filtered.length !== 1 ? "s" : ""} found
          </p>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((stylist) => (
              <StaggerItem key={stylist.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-[#1C1C22] border border-[#27272A] hover:border-[#8B5CF6]/40 rounded-2xl overflow-hidden transition-all group"
                >
                  {/* Avatar header */}
                  <div
                    className="h-28 relative flex items-end px-5 pb-4"
                    style={{
                      background: `linear-gradient(135deg, ${stylist.gradient[0]}40, ${stylist.gradient[1]}20)`,
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg absolute -bottom-6 left-5 border-4 border-[#1C1C22]"
                      style={{
                        background: `linear-gradient(135deg, ${stylist.gradient[0]}, ${stylist.gradient[1]})`,
                      }}
                    >
                      {stylist.initials}
                    </div>
                    {stylist.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="purple" size="sm">
                          <Award className="w-2.5 h-2.5 mr-1" />
                          {stylist.badge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 pb-5 px-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#F5F5F7]">
                          {stylist.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-[#A1A1AA]">
                          <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                          {stylist.rating}
                          <span className="text-[#52525B]">
                            ({stylist.reviews})
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#A1A1AA]">{stylist.title}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {stylist.specialties.map((sp) => (
                        <Badge key={sp} variant="muted" size="sm">
                          {sp}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                      {stylist.bio}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#52525B]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {stylist.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {stylist.experience}y exp
                      </span>
                      <span className="font-semibold text-[#F5F5F7]">
                        from LKR {stylist.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Availability */}
                    <div
                      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                        stylist.available
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-[#27272A] text-[#52525B]"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          stylist.available
                            ? "bg-[#10B981] animate-pulse"
                            : "bg-[#52525B]"
                        }`}
                      />
                      Next available: {stylist.nextSlot}
                    </div>

                    <SSButton
                      variant="primary"
                      size="sm"
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => (window.location.href = "/booking")}
                    >
                      Book with {stylist.name.split(" ")[0]}
                    </SSButton>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </PublicLayout>
  );
}
