"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  Camera,
  ChevronRight,
  Layers,
  Sparkles,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const STYLE_CATEGORIES = [
  { id: "cuts", label: "Hair Cuts", count: 42, color: "#8B5CF6" },
  { id: "colors", label: "Hair Colors", count: 38, color: "#EC4899" },
  { id: "updos", label: "Updos & Styling", count: 24, color: "#22D3EE" },
  { id: "extensions", label: "Extensions", count: 16, color: "#F59E0B" },
  { id: "treatments", label: "Treatments", count: 11, color: "#22C55E" },
];

const FEATURED_STYLES = [
  {
    id: "s1",
    name: "Bob Cut",
    category: "cuts",
    gradient: "from-[#8B5CF6] to-[#6D28D9]",
    popularity: 94,
  },
  {
    id: "s2",
    name: "Balayage Blonde",
    category: "colors",
    gradient: "from-[#F59E0B] to-[#D97706]",
    popularity: 91,
  },
  {
    id: "s3",
    name: "Beach Waves",
    category: "updos",
    gradient: "from-[#22D3EE] to-[#0EA5E9]",
    popularity: 88,
  },
  {
    id: "s4",
    name: "Chocolate Brown",
    category: "colors",
    gradient: "from-[#92400E] to-[#78350F]",
    popularity: 87,
  },
  {
    id: "s5",
    name: "Layered Cut",
    category: "cuts",
    gradient: "from-[#EC4899] to-[#DB2777]",
    popularity: 85,
  },
  {
    id: "s6",
    name: "Curtain Bangs",
    category: "cuts",
    gradient: "from-[#10B981] to-[#059669]",
    popularity: 82,
  },
];

export default function VirtualTryOnPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const filteredStyles =
    activeCategory === "all"
      ? FEATURED_STYLES
      : FEATURED_STYLES.filter((s) => s.category === activeCategory);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <FadeUp className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#EC4899] to-[#8B5CF6] flex items-center justify-center">
              <Wand2 className="w-4.5 h-4.5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#F5F5F7]">
              Virtual Try-On
            </h1>
          </div>
          <p className="text-[#A1A1AA] text-sm ml-12">
            Upload your photo and preview any hairstyle before booking
          </p>
        </div>
        <Link
          href="/client/ai"
          className="text-[#8B5CF6] text-xs hover:underline flex items-center gap-1"
        >
          AI Hair Studio <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Panel */}
        <FadeUp delay={0.08}>
          <SSCard className="h-full">
            <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#8B5CF6]" />
              Your Photo
            </h2>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {!uploadedImage ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-[#38383F] hover:border-[#8B5CF6]/50 rounded-2xl p-12 flex flex-col items-center gap-3 transition-all duration-200 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#1C1C22] border border-[#38383F] flex items-center justify-center group-hover:border-[#8B5CF6]/30 transition-colors">
                  <Upload className="w-7 h-7 text-[#52525B] group-hover:text-[#8B5CF6] transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-[#F5F5F7] text-sm font-medium mb-1">
                    Upload your selfie
                  </p>
                  <p className="text-[#52525B] text-xs">
                    JPG, PNG, WEBP · Face clearly visible · Good lighting
                    recommended
                  </p>
                </div>
                <span className="px-5 py-2 rounded-xl bg-[#8B5CF6] text-white text-xs font-medium">
                  Choose Photo
                </span>
              </button>
            ) : (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Your photo"
                  className="w-full h-72 object-cover rounded-2xl border border-[#38383F]"
                />
                {selectedStyle && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-sm">
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 text-[#8B5CF6] mx-auto mb-2" />
                      <p className="text-white text-sm font-semibold">
                        {
                          FEATURED_STYLES.find((s) => s.id === selectedStyle)
                            ?.name
                        }
                      </p>
                      <p className="text-white/60 text-xs mt-0.5">
                        Virtual preview applied
                      </p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    setSelectedStyle(null);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0B0B0F]/80 backdrop-blur flex items-center justify-center text-[#A1A1AA] hover:text-[#EF4444] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {uploadedImage && selectedStyle && (
              <div className="mt-4 flex gap-3">
                <Link
                  href="/client/stylists"
                  className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                  Book This Style
                </Link>
                <button
                  onClick={() => setSelectedStyle(null)}
                  className="px-4 h-10 rounded-xl bg-[#1C1C22] border border-[#38383F] text-[#A1A1AA] text-sm hover:border-[#52525B] transition-colors"
                >
                  Try Another
                </button>
              </div>
            )}
          </SSCard>
        </FadeUp>

        {/* Style Picker */}
        <FadeUp delay={0.12}>
          <SSCard className="h-full">
            <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#EC4899]" />
              Choose a Style
            </h2>

            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
              <button
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-[#1C1C22] border border-[#38383F] text-[#71717A] hover:text-[#F5F5F7]"
                }`}
              >
                All Styles
              </button>
              {STYLE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? "text-white"
                      : "bg-[#1C1C22] border border-[#38383F] text-[#71717A] hover:text-[#F5F5F7]"
                  }`}
                  style={
                    activeCategory === cat.id ? { background: cat.color } : {}
                  }
                >
                  {cat.label}
                  <span className="ml-1 text-[10px] opacity-70">
                    ({cat.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Style Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() =>
                    setSelectedStyle(
                      selectedStyle === style.id ? null : style.id,
                    )
                  }
                  className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 ${
                    selectedStyle === style.id
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                      : "border-[#38383F] bg-[#1C1C22] hover:border-[#52525B]"
                  }`}
                >
                  <div
                    className={`w-full h-14 rounded-xl bg-linear-to-br ${style.gradient} mb-2 flex items-center justify-center`}
                  >
                    <Sparkles className="w-5 h-5 text-white/70" />
                  </div>
                  <p className="text-[#F5F5F7] text-xs font-semibold mb-0.5">
                    {style.name}
                  </p>
                  <p className="text-[#52525B] text-[10px]">
                    {style.popularity}% match
                  </p>
                  {selectedStyle === style.id && (
                    <div className="mt-1 flex items-center gap-1 text-[#8B5CF6] text-[10px] font-medium">
                      <Sparkles className="w-3 h-3" />
                      Selected
                    </div>
                  )}
                </button>
              ))}
            </div>

            {!uploadedImage && (
              <div className="mt-4 p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/25">
                <p className="text-[#8B5CF6] text-xs">
                  Upload your photo first to preview any style on yourself
                </p>
              </div>
            )}
          </SSCard>
        </FadeUp>
      </div>

      {/* Tips */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        staggerDelay={0.07}
      >
        {[
          {
            tip: "Use a front-facing selfie in good lighting for the best try-on results.",
            label: "Best Results",
          },
          {
            tip: "Select a style then tap 'Book This Style' to find stylists who specialize in it.",
            label: "Next Steps",
          },
          {
            tip: "The AI Hair Studio also provides face shape analysis and personalized recommendations.",
            label: "Pro Tip",
          },
        ].map((t) => (
          <StaggerItem key={t.label}>
            <SSCard padding="sm" className="h-full">
              <p className="text-[#8B5CF6] text-[10px] font-semibold uppercase tracking-wider mb-1">
                {t.label}
              </p>
              <p className="text-[#A1A1AA] text-xs leading-relaxed">{t.tip}</p>
            </SSCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
