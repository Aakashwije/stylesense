"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Grid3X3,
  Heart,
  List,
  Scissors,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";

interface FavoriteService {
  id: string;
  name: string;
  category: string;
  stylist: string;
  price: number;
  duration: number;
  rating: number;
  reviews: number;
  lastBooked?: string;
  tags: string[];
}

const FAVORITES: FavoriteService[] = [
  {
    id: "1",
    name: "Balayage + Gloss Treatment",
    category: "Color",
    stylist: "Kasun Perera",
    price: 220,
    duration: 180,
    rating: 4.9,
    reviews: 128,
    lastBooked: "Apr 28",
    tags: ["Popular", "Premium"],
  },
  {
    id: "2",
    name: "Precision Haircut",
    category: "Cut",
    stylist: "Jordan Rivera",
    price: 65,
    duration: 45,
    rating: 4.8,
    reviews: 84,
    lastBooked: "Mar 15",
    tags: ["Quick"],
  },
  {
    id: "3",
    name: "Hydration Facial",
    category: "Skin",
    stylist: "Shenali Rodrigo",
    price: 110,
    duration: 60,
    rating: 4.9,
    reviews: 202,
    tags: ["Relaxing"],
  },
  {
    id: "4",
    name: "Deep Conditioning Treatment",
    category: "Treatment",
    stylist: "Alex Kim",
    price: 75,
    duration: 45,
    rating: 4.7,
    reviews: 56,
    tags: ["Restorative"],
  },
  {
    id: "5",
    name: "Scalp Massage + Serum",
    category: "Treatment",
    stylist: "Kasun Perera",
    price: 55,
    duration: 30,
    rating: 4.6,
    reviews: 39,
    tags: ["Quick", "Relaxing"],
  },
];

export default function FavoritesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [favorited, setFavorited] = useState<Set<string>>(
    new Set(FAVORITES.map((f) => f.id)),
  );

  const toggle = (id: string) =>
    setFavorited((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const displayed = FAVORITES.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <FadeUp>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F5F7]">Favorites</h1>
            <p className="text-[#A1A1AA] mt-1">
              {favorited.size} saved service{favorited.size !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </FadeUp>

      {/* Controls */}
      <FadeUp>
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search favorites…"
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6] transition-all"
            />
          </div>
          <div className="flex rounded-xl bg-[#1C1C22] border border-[#27272A] p-1 gap-1">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-all ${
                view === "grid"
                  ? "bg-[#8B5CF6] text-white"
                  : "text-[#52525B] hover:text-[#F5F5F7]"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-all ${
                view === "list"
                  ? "bg-[#8B5CF6] text-white"
                  : "text-[#52525B] hover:text-[#F5F5F7]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </FadeUp>

      {/* Grid view */}
      {view === "grid" ? (
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((service) => (
            <StaggerItem key={service.id}>
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-[#1C1C22] border border-[#27272A] hover:border-[#8B5CF6]/40 rounded-2xl p-5 flex flex-col gap-3 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <button
                    onClick={() => toggle(service.id)}
                    className="transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        favorited.has(service.id)
                          ? "text-[#EF4444] fill-[#EF4444]"
                          : "text-[#52525B]"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <h3 className="font-medium text-[#F5F5F7] leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-[#52525B] mt-0.5">
                    {service.stylist}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="muted" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                    {service.rating} ({service.reviews})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.duration}min
                  </span>
                  <span className="font-semibold text-[#F5F5F7]">
                    LKR {service.price.toLocaleString()}
                  </span>
                </div>

                <SSButton
                  variant="primary"
                  size="sm"
                  className="w-full mt-auto"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Book now
                </SSButton>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="space-y-3">
          {displayed.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SSCard className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                  <Scissors className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#F5F5F7] truncate">
                      {service.name}
                    </p>
                    <Badge variant="muted" size="sm">
                      {service.category}
                    </Badge>
                  </div>
                  <div className="flex gap-3 mt-1 text-xs text-[#52525B]">
                    <span>{service.stylist}</span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                      {service.rating}
                    </span>
                    <span>{service.duration}min</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#F5F5F7]">
                    LKR {service.price.toLocaleString()}
                  </span>
                  <button onClick={() => toggle(service.id)}>
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        favorited.has(service.id)
                          ? "text-[#EF4444] fill-[#EF4444]"
                          : "text-[#52525B]"
                      }`}
                    />
                  </button>
                  <SSButton variant="outline" size="sm">
                    Book
                  </SSButton>
                </div>
              </SSCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
