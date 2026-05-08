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
  Grid3X3,
  Heart,
  List,
  Scissors,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface SavedStyle {
  id: string;
  name: string;
  category: string;
  source: string;
  savedDate: string;
  tags: string[];
  gradient: [string, string];
  aiMatch: number;
}

const SAVED_STYLES: SavedStyle[] = [
  {
    id: "1",
    name: "Honey Balayage",
    category: "Color",
    source: "AI Recommendation",
    savedDate: "May 2",
    tags: ["Warm tones", "Low maintenance"],
    gradient: ["#D4A849", "#8B3A2A"],
    aiMatch: 97,
  },
  {
    id: "2",
    name: "French Bob",
    category: "Cut",
    source: "Virtual Try-On",
    savedDate: "Apr 28",
    tags: ["Classic", "Chic"],
    gradient: ["#8B5CF6", "#22D3EE"],
    aiMatch: 91,
  },
  {
    id: "3",
    name: "Beach Waves",
    category: "Texture",
    source: "Stylist Suggestion",
    savedDate: "Apr 15",
    tags: ["Effortless", "Summer"],
    gradient: ["#22D3EE", "#10B981"],
    aiMatch: 88,
  },
  {
    id: "4",
    name: "Rose Gold Highlights",
    category: "Color",
    source: "AI Recommendation",
    savedDate: "Mar 30",
    tags: ["Trendy", "Dimensional"],
    gradient: ["#E8B4B8", "#8B5CF6"],
    aiMatch: 85,
  },
  {
    id: "5",
    name: "Curtain Bangs",
    category: "Cut",
    source: "Virtual Try-On",
    savedDate: "Mar 20",
    tags: ["Fringe", "Soft"],
    gradient: ["#F59E0B", "#E8B4B8"],
    aiMatch: 80,
  },
];

export default function SavedStylesPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [saved, setSaved] = useState<Set<string>>(
    new Set(SAVED_STYLES.map((s) => s.id)),
  );

  const toggle = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = SAVED_STYLES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <FadeUp>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F5F7]">Saved Styles</h1>
            <p className="text-[#A1A1AA] mt-1">
              Styles curated by AI and saved from your try-on sessions.
            </p>
          </div>
          <SSButton
            variant="primary"
            size="sm"
            leftIcon={<Sparkles className="w-4 h-4" />}
            onClick={() => (window.location.href = "/ai/virtual-tryon")}
          >
            Try new style
          </SSButton>
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
              placeholder="Search saved styles…"
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6] transition-all"
            />
          </div>
          <div className="flex rounded-xl bg-[#1C1C22] border border-[#27272A] p-1 gap-1">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`p-2 rounded-lg transition-all ${
                  view === v
                    ? "bg-[#8B5CF6] text-white"
                    : "text-[#52525B] hover:text-[#F5F5F7]"
                }`}
              >
                {v === "grid" ? (
                  <Grid3X3 className="w-4 h-4" />
                ) : (
                  <List className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      </FadeUp>

      {view === "grid" ? (
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((style) => (
            <StaggerItem key={style.id}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#1C1C22] border border-[#27272A] hover:border-[#8B5CF6]/40 rounded-2xl overflow-hidden transition-all group"
              >
                {/* Color preview */}
                <div
                  className="h-28 w-full relative"
                  style={{
                    background: `linear-gradient(135deg, ${style.gradient[0]}, ${style.gradient[1]})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="muted"
                      size="sm"
                      className="backdrop-blur-sm bg-black/40 border-white/10 text-white"
                    >
                      {style.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggle(style.id)}
                      className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Heart
                        className={`w-4 h-4 transition-all ${
                          saved.has(style.id)
                            ? "text-[#EF4444] fill-[#EF4444]"
                            : "text-white"
                        }`}
                      />
                    </button>
                  </div>
                  {/* AI match */}
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                    <span className="text-xs font-medium text-white">
                      {style.aiMatch}% match
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-medium text-[#F5F5F7]">{style.name}</h3>
                    <p className="text-xs text-[#52525B] mt-0.5">
                      {style.source} · {style.savedDate}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {style.tags.map((t) => (
                      <Badge key={t} variant="muted" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <SSButton
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      rightIcon={<ArrowRight className="w-3 h-3" />}
                    >
                      Book this style
                    </SSButton>
                    <SSButton variant="ghost" size="sm">
                      <Scissors className="w-4 h-4" />
                    </SSButton>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="space-y-3">
          {filtered.map((style, i) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SSCard className="flex items-center gap-4 p-4">
                <div
                  className="w-12 h-12 rounded-xl shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${style.gradient[0]}, ${style.gradient[1]})`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#F5F5F7]">
                      {style.name}
                    </p>
                    <Badge variant="muted" size="sm">
                      {style.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#52525B] mt-0.5">
                    {style.source} · {style.savedDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="purple" size="sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {style.aiMatch}%
                  </Badge>
                  <button onClick={() => toggle(style.id)}>
                    <Heart
                      className={`w-4 h-4 ${
                        saved.has(style.id)
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
