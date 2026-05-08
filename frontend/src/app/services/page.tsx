"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSCard } from "@/components/common/SSCard";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Hair",
  "Color",
  "Treatments",
  "Facials",
  "Spa",
  "Nails",
  "Grooming",
];

const SERVICES = [
  {
    id: "haircut-style",
    name: "Haircut & Style",
    category: "Hair",
    price: 65,
    duration: "60 min",
    desc: "Precision cut tailored to your face shape and lifestyle.",
    popular: true,
  },
  {
    id: "balayage",
    name: "Balayage",
    category: "Color",
    price: 220,
    duration: "180 min",
    desc: "Sun-kissed, natural-looking color with seamless blending.",
    popular: true,
  },
  {
    id: "keratin",
    name: "Keratin Treatment",
    category: "Treatments",
    price: 280,
    duration: "180 min",
    desc: "Smooth, frizz-free hair that lasts up to 4 months.",
    popular: false,
  },
  {
    id: "blowout",
    name: "Luxury Blowout",
    category: "Hair",
    price: 55,
    duration: "45 min",
    desc: "Flawless blowdry finish with premium styling products.",
    popular: true,
  },
  {
    id: "highlights",
    name: "Full Highlights",
    category: "Color",
    price: 200,
    duration: "150 min",
    desc: "Multi-dimensional color that enhances your natural tone.",
    popular: false,
  },
  {
    id: "facial",
    name: "Signature Facial",
    category: "Facials",
    price: 120,
    duration: "75 min",
    desc: "Deep cleansing and rejuvenating facial for glowing skin.",
    popular: true,
  },
  {
    id: "scalp-treatment",
    name: "Scalp Treatment",
    category: "Treatments",
    price: 85,
    duration: "60 min",
    desc: "Restore scalp health with a customized treatment plan.",
    popular: false,
  },
  {
    id: "manicure",
    name: "Luxury Manicure",
    category: "Nails",
    price: 50,
    duration: "60 min",
    desc: "Premium nail care with long-lasting gel polish.",
    popular: false,
  },
  {
    id: "hot-stone",
    name: "Hot Stone Massage",
    category: "Spa",
    price: 160,
    duration: "90 min",
    desc: "Deep relaxation with heated volcanic stone therapy.",
    popular: true,
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = SERVICES.filter(
    (s) =>
      (activeCategory === "All" || s.category === activeCategory) &&
      s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#0B0B0F]">
        {/* Header */}
        <div className="bg-[#141419] border-b border-[#27272A] py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <FadeUp>
              <p className="text-[#8B5CF6] text-sm font-medium tracking-wider uppercase mb-3">
                Services
              </p>
              <h1 className="text-4xl font-bold text-[#F5F5F7] mb-4">
                Everything beauty, in one place
              </h1>
              <p className="text-[#A1A1AA] text-lg max-w-xl">
                From quick trims to full transformations — book any service in
                seconds.
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Filters */}
          <FadeUp className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services…"
                className="w-full pl-10 pr-4 h-11 bg-[#1C1C22] border border-[#27272A] rounded-xl text-[#F5F5F7] text-sm outline-none placeholder:text-[#52525B] focus:border-[#8B5CF6]/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 h-11 rounded-xl text-sm transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50 text-[#8B5CF6]"
                      : "bg-[#1C1C22] border-[#27272A] text-[#A1A1AA] hover:border-[#3f3f46]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Grid */}
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.05}
          >
            {filtered.map((service) => (
              <StaggerItem key={service.id}>
                <Link href={`/services/${service.id}`}>
                  <SSCard hover className="h-full flex flex-col group">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="purple" size="sm">
                        {service.category}
                      </Badge>
                      {service.popular && (
                        <Badge variant="cyan" size="sm">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-[#F5F5F7] font-semibold mb-2 group-hover:text-[#8B5CF6] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed flex-1 mb-4">
                      {service.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[#F5F5F7] font-bold">
                          ${service.price}
                        </span>
                        <span className="text-[#52525B] text-xs ml-1.5">
                          · {service.duration}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#52525B] group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all" />
                    </div>
                  </SSCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#A1A1AA]">No services found for "{search}"</p>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
