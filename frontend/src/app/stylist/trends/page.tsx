"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Translations } from "@/lib/i18n/translations";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  ImageIcon,
  Scissors,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

type Tab = "mens" | "womens" | "colors" | "techniques";

const buildTabs = (t: Translations): { id: Tab; label: string }[] => [
  { id: "mens", label: t.trends.tabMens },
  { id: "womens", label: t.trends.tabWomens },
  { id: "colors", label: t.trends.tabColors },
  { id: "techniques", label: t.trends.tabTechniques },
];

const MENS_CUTS = [
  {
    name: "Low Fade",
    image: "/images/trends/men/low-fade.jpg?v=20260516b",
    popularity: 98,
    tag: "Trending",
    description:
      "A gradual fade starting below the temples. Works on all face shapes. Client-favourite for clean, polished everyday looks.",
    tips: "Use a 0.5 guard at the baseline and blend up with a 1, then 2. Keep the top textured with scissors.",
  },
  {
    name: "Mid Fade",
    image: "/images/trends/men/mid-fade.jpg?v=20260516b",
    popularity: 94,
    tag: "Classic",
    description:
      "Fade begins at the temples. Gives more contrast than a low fade. Pairs perfectly with quiffs, pompadours, and textured tops.",
    tips: "Work fast between guards to create a seamless blend. The mid fade suits oval and square faces best.",
  },
  {
    name: "High Fade",
    image: "/images/trends/men/high-fade.jpg?v=20260516b",
    popularity: 88,
    tag: "Bold",
    description:
      "Starts above the temples — very high contrast and sharp. Popular with clients wanting a modern barbershop look.",
    tips: "Taper line should be crisp. Freehand clippers for the temple line. Use a razor for sharp edges.",
  },
  {
    name: "Textured Quiff",
    image: "/images/trends/men/textured-quiff.jpg?v=20260516b",
    popularity: 91,
    tag: "Trending",
    description:
      "Volume at the front with a relaxed, textured finish. Best with medium-length hair on top. Effortlessly styled.",
    tips: "Scissor-over-comb for the top. Use point cutting for texture. Recommend matte clay to clients for hold without shine.",
  },
  {
    name: "French Crop",
    image: "/images/trends/men/french-crop.jpg?v=20260516b",
    popularity: 85,
    tag: "Modern",
    description:
      "Horizontal fringe cut across the forehead. Usually paired with a fade. Very on-trend and low-maintenance for clients.",
    tips: "Cut the fringe straight across then point-cut for a natural edge. Keep it above the eyebrows.",
  },
  {
    name: "Buzz Cut",
    image: "/images/trends/men/buzz-cut.jpg?v=20260516b",
    popularity: 76,
    tag: "Minimal",
    description:
      "Uniform short length all over. Easy, low-maintenance, and timeless. Great upsell for scalp treatments.",
    tips: "Grade 1–3 depending on preference. Always go with the grain first, then against for evenness.",
  },
  {
    name: "Pompadour",
    image: "/images/trends/men/pompadour.jpg?v=20260516b",
    popularity: 80,
    tag: "Classic",
    description:
      "Volume swept back from the forehead. Timeless style with a modern edge when paired with a fade.",
    tips: "Recommend strong-hold pomade. Use a comb and dryer to create lift at the root before styling.",
  },
  {
    name: "Curtain Bangs (Men)",
    image: "/images/trends/men/curtain-bangs-men.jpg?v=20260516b",
    popularity: 82,
    tag: "Trending",
    description:
      "Centre-parted fringe that falls naturally to each side. Very popular among younger male clients in 2025.",
    tips: "Cut dry. Part in the middle and cut diagonally from the centre outward. Recommend air-drying for a natural look.",
  },
];

const WOMENS_STYLES = [
  {
    name: "Balayage",
    image: "/images/trends/womens/balayage.jpg",
    popularity: 99,
    tag: "Trending",
    description:
      "Hand-painted highlights blended naturally from root to tip. Looks sun-kissed and grows out gracefully with minimal maintenance.",
    tips: "Use Wella Illumina for a soft, natural look. Always do a strand test. Keep the sections random — no foils.",
  },
  {
    name: "Curtain Bangs",
    image: "/images/trends/womens/curtain-bangs.jpg",
    popularity: 96,
    tag: "Viral",
    description:
      "Centre-parted fringe that frames the face. Works for all face shapes and hair textures. Extremely popular request in 2025.",
    tips: "Cut longer in the centre, shorter on the sides. Always cut dry for accuracy. Client should avoid heavy product at roots.",
  },
  {
    name: "Wolf Cut",
    image: "/images/trends/womens/wolf-cut.jpg",
    popularity: 94,
    tag: "Gen Z Favourite",
    description:
      "Shaggy layers with a mullet-inspired shape. Maximum volume and movement. Great for thick and wavy hair.",
    tips: "Use razor for raw texture. Heavy layers through mid-length. Leave long at the back. Recommend diffusing for wavy clients.",
  },
  {
    name: "Butterfly Cut",
    image: "/images/trends/womens/butterfly-cut.jpg",
    popularity: 89,
    tag: "Trending",
    description:
      "Long layers starting from the shoulders that create a butterfly wing shape when hair is parted. Very flattering and feminine.",
    tips: "Longest layer from chin to shoulder. Cut freehand with long, sweeping sections. Works best on long, straight or wavy hair.",
  },
  {
    name: "Blunt Bob",
    image: "/images/trends/womens/blunt-bob.jpg",
    popularity: 88,
    tag: "Timeless",
    description:
      "One-length bob cut flat and straight across. Ultra clean and chic. Works on straight and slightly wavy hair types.",
    tips: "Use a fine-tooth comb for precision. Cut one section at a time. Guide cut at the nape, then work upward.",
  },
  {
    name: "Textured Bob",
    image: "/images/trends/womens/textured-bob.jpg",
    popularity: 85,
    tag: "Modern",
    description:
      "Blunt bob with added texture and movement using point cutting or razoring. More relaxed than the classic bob.",
    tips: "Point-cut the ends after the initial blunt cut. Use a razor sparingly for the outer layer. Great for fine hair.",
  },
  {
    name: "Shag Cut",
    image: "/images/trends/womens/shag-cut.jpg",
    popularity: 83,
    tag: "Retro Revival",
    description:
      "Heavy layering with a fringe — inspired by the 1970s. Maximum movement and volume. Very flattering on round faces.",
    tips: "Heavy graduation through mid-length. Always cut damp. Use thinning shears sparingly to remove bulk without losing shape.",
  },
  {
    name: "Long Layers",
    image: "/images/trends/womens/long-layers.jpg",
    popularity: 91,
    tag: "Classic",
    description:
      "Subtle layering throughout long hair to create movement and reduce bulk. The most-requested long-hair cut.",
    tips: "Freehand layers — hold hair at 90° from the head. Use scissors with a 20% angle upward for soft graduation.",
  },

  {
    name: "Short Layers",
    image: "/images/trends/womens/short-layers.jpg",
    popularity: 85,
    tag: "Classic",
    description:
      "Subtle layering throughout short hair to create movement and reduce bulk. The most-requested short-hair cut.",
    tips: "Freehand layers — For short layers, the hair is usually lifted at a 90° angle to create volume and movement while keeping the layers soft and blended.",
  },
];

const COLOR_PALETTE = [
  {
    name: "Cherry Mocha",
    hex: "#4A1F2B",
    category: "Trendy",
    description:
      "Deep cherry-toned brunette with glossy richness. One of the biggest 2026 trends.",
  },
  {
    name: "Burnt Copper",
    hex: "#B55239",
    category: "Trendy",
    description:
      "Warm copper-orange blend with dimensional shine. Perfect for bold transformations.",
  },
  {
    name: "Champagne Brunette",
    hex: "#8B6B5A",
    category: "Trendy",
    description:
      "Soft brunette with champagne beige reflections. Luxurious and modern.",
  },
  {
    name: "Teddy Bear Blonde",
    hex: "#C89B6D",
    category: "Trendy",
    description:
      "Warm caramel blonde with soft depth. Extremely popular for soft glam looks.",
  },
  {
    name: "Buttercream Blonde",
    hex: "#F5ECD7",
    category: "Trendy",
    description:
      "Creamy warm blonde with buttery golden tones. Bright yet wearable.",
  },
  {
    name: "Smokey Silver",
    hex: "#B7B7B7",
    category: "Trendy",
    description:
      "Cool silver-grey tone with a smoky finish. Futuristic and edgy.",
  },
  {
    name: "Jet Black",
    hex: "#0F0F0F",
    category: "Popular",
    description:
      "Classic deep black with high shine. Timeless and elegant.",
  },
  {
    name: "Chocolate Brown",
    hex: "#5A3A2E",
    category: "Popular",
    description:
      "Rich chocolate brunette with natural warmth. A salon favourite.",
  },
  {
    name: "Chestnut Brown",
    hex: "#6B3F2A",
    category: "Popular",
    description:
      "Natural red-brown blend with soft warmth. Low maintenance and versatile.",
  },
  {
    name: "Golden Blonde",
    hex: "#FBE7A1",
    category: "Popular",
    description:
      "Warm golden blonde that enhances glow and dimension beautifully.",
  },
  {
    name: "Dirty Blonde",
    hex: "#B79B6C",
    category: "Popular",
    description:
      "Natural dark blonde with soft ash and beige undertones.",
  },
  {
    name: "Auburn Red",
    hex: "#7A2F24",
    category: "Popular",
    description:
      "Classic reddish-brown shade with rich depth and warmth.",
  },
  {
    name: "Cinnamon Brown",
    hex: "#8A4B2A",
    category: "Popular",
    description:
      "Spicy medium brown with subtle cinnamon warmth and shine.",
  },
  {
    name: "Beige Blonde",
    hex: "#D7C0A8",
    category: "Popular",
    description:
      "Balanced neutral blonde with soft creamy beige tones.",
  },
  {
    name: "Honey Blonde",
    hex: "#CFB695",
    category: "Both",
    description:
      "Warm honey-toned blonde that suits a wide range of skin tones.",
  },
  {
    name: "Caramel Brown",
    hex: "#A56B46",
    category: "Both",
    description:
      "Golden caramel brunette with glossy ribbons of warmth.",
  },
  {
    name: "Rose Gold",
    hex: "#D89A8C",
    category: "Both",
    description:
      "Pink-copper blend with a luxurious metallic finish.",
  },
  {
    name: "Mocha Brown",
    hex: "#7B5748",
    category: "Both",
    description:
      "Smooth medium brunette with cool mocha undertones.",
  },
  {
    name: "Bronde Blend",
    hex: "#9A7458",
    category: "Both",
    description:
      "Perfect balance between brunette and blonde for a natural sunkissed effect.",
  },
  {
    name: "Copper Red",
    hex: "#B55A30",
    category: "Both",
    description:
      "Vibrant copper-red tone with fiery warmth and shine.",
  },
];

const TECHNIQUES = [
  {
    name: "Balayage",
    level: "Advanced",
    time: "3–4h",
    icon: "🎨",
    description:
      "Freehand colour painting technique for natural-looking highlights. Sections are hand-selected for a seamless sun-kissed effect.",
    steps: [
      "Section hair loosely",
      "Apply lightener freehand from mid-length",
      "Feather upward for fade effect",
      "Process 30–50 mins",
      "Tone with Wella T18 or Redken Shades EQ",
    ],
  },
  {
    name: "Foilayage",
    level: "Advanced",
    time: "3h",
    icon: "✦",
    description:
      "Balayage placed into foils for more lift and defined highlights. Best for darker bases wanting visible highlights.",
    steps: [
      "Paint balayage sections as normal",
      "Place in foils for extra lift",
      "Process 35–45 mins",
      "Open foils to check lift",
      "Tone to remove brassiness",
    ],
  },
  {
    name: "Root Smudge",
    level: "Intermediate",
    time: "45m",
    icon: "◆",
    description:
      "Technique to soften the root line of a balayage for a more blended, low-maintenance grow-out.",
    steps: [
      "Mix shadow root colour 1 shade lighter than base",
      "Apply to root area only",
      "Smudge downward 2–4cm",
      "Process 20 mins",
      "Remove and tone",
    ],
  },
  {
    name: "Toning",
    level: "Beginner",
    time: "20–30m",
    icon: "◇",
    description:
      "Removes unwanted warmth/brassiness from lightened hair. Essential step after bleaching or balayage.",
    steps: [
      "Identify target tone (ash, beige, pearl, etc.)",
      "Mix toner with developer (6–20 vol)",
      "Apply to towel-dried hair",
      "Process 20–30 mins (check every 5)",
      "Remove immediately when target is reached",
    ],
  },
  {
    name: "Keratin Treatment",
    level: "Intermediate",
    time: "2–3h",
    icon: "◈",
    description:
      "Smoothing treatment that eliminates frizz and adds shine for 3–5 months. Very popular in Sri Lanka's humidity.",
    steps: [
      "Wash hair 2x with clarifying shampoo",
      "Blow dry 80% dry",
      "Apply keratin in thin sections",
      "Blow dry completely",
      "Flat iron at 230°C section by section",
    ],
  },
  {
    name: "Colour Correction",
    level: "Expert",
    time: "4–8h",
    icon: "⬡",
    description:
      "Multi-step process to fix unwanted colour results. Requires careful analysis and strand tests before proceeding.",
    steps: [
      "Assess current level and tone",
      "Identify target result",
      "Do strand test",
      "Apply colour remover or lightener",
      "Re-tone to desired shade",
      "Deep condition before styling",
    ],
  },
];

type TrendStyle = (typeof MENS_CUTS)[number] | (typeof WOMENS_STYLES)[number];

function StyleImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="w-full bg-[#0B0B0F] border-b border-[#27272A] overflow-hidden group">
      <div className="h-52 bg-white flex items-center justify-center">
        {!failed ? (
          <Image
            src={src}
            alt={alt}
            width={1536}
            height={1024}
            unoptimized
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
            <ImageIcon className="w-7 h-7 text-[#3f3f46]" strokeWidth={1.25} />
            <p className="text-[#3f3f46] text-[9px] font-mono leading-relaxed break-all">
              {src}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PopularityBar({ value }: { value: number }) {
  const color =
    value >= 95
      ? "#22D3EE"
      : value >= 85
        ? "#10B981"
        : value >= 75
          ? "#F59E0B"
          : "#8B5CF6";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#27272A] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-[#52525B] text-[10px] w-7 text-right">
        {value}%
      </span>
    </div>
  );
}

function ColorSwatch({ color }: { color: (typeof COLOR_PALETTE)[0] }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };

  const label =
    color.category === "Both" ? "Popular + Trendy" : color.category;

  const badgeClass =
  color.category === "Both"
    ? "bg-[#2563EB]/15 text-[#F9A8D4] border-[#DB2777]/35 shadow-[0_0_18px_rgba(219,39,119,0.22)]"
    : color.category === "Popular"
      ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
      : "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20";
      
  return (
    <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden hover:border-[#3f3f46] transition-colors group">
      <div
        className="h-20 w-full flex items-center justify-center cursor-pointer relative"
        style={{ backgroundColor: color.hex }}
        onClick={copy}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div
            className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${isLight(color.hex) ? "bg-black/60 text-white" : "bg-white/80 text-black"}`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" /> {t.common.copied}
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> {color.hex}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[#F5F5F7] text-sm font-medium">{color.name}</p>
          <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold leading-none ${badgeClass}`}>
            {label}
          </span>
        </div>
        <p className="text-[#52525B] text-[10px] mt-0.5">{color.hex}</p>
        <p className="text-[#A1A1AA] text-[10px] mt-1 leading-relaxed">
          {color.description}
        </p>
      </div>
    </div>
  );
}

export default function StylistTrendsPage() {
  const { t } = useLanguage();
  const TABS = buildTabs(t);
  const [activeTab, setActiveTab] = useState<Tab>("mens");
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(
    null,
  );
  const [selectedStyle, setSelectedStyle] = useState<TrendStyle | null>(null);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-[#F5F5F7] text-xl font-bold">
              {t.trends.title}
            </h1>
            <p className="text-[#52525B] text-xs">{t.trends.subtitle}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div {...fadeUp(0.05)}>
        <div className="flex items-center gap-1 card-3d bg-[#141419] border border-[#27272A] rounded-xl p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "text-[#0B0B0F]"
                  : "text-[#A1A1AA] hover:text-[#F5F5F7]"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="trends-tab"
                  className="absolute inset-0 bg-[#22D3EE] rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedStyle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6"
            onClick={() => setSelectedStyle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-2xl border border-[#27272A] bg-[#0B0B0F] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#27272A] px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[#F5F5F7] text-sm font-semibold truncate">
                    {selectedStyle.name}
                  </p>
                  <p className="text-[#52525B] text-[11px]">
                    {selectedStyle.tag} · {selectedStyle.popularity}% demand
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStyle(null)}
                  className="w-9 h-9 rounded-lg border border-[#27272A] bg-[#141419] text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#3F3F46] flex items-center justify-center transition-colors"
                  aria-label="Close image preview"
                >
                  <X className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
              <div className="max-h-[calc(92vh-74px)] overflow-y-auto">
                <div className="bg-white p-2 sm:p-3">
                  <Image
                    src={selectedStyle.image}
                    alt={`${selectedStyle.name} front side back haircut reference`}
                    width={1536}
                    height={1024}
                    unoptimized
                    className="w-full max-h-[68vh] object-contain"
                  />
                </div>
                <div className="grid gap-4 border-t border-[#27272A] p-4 sm:grid-cols-[1fr_1fr] sm:p-5">
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">
                    {selectedStyle.description}
                  </p>
                  <div>
                    <p className="text-[#52525B] text-[10px] uppercase tracking-wider mb-1.5">
                      {t.trends.proTip}
                    </p>
                    <p className="text-[#A1A1AA] text-xs leading-relaxed">
                      {selectedStyle.tips}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Men's Cuts */}
      {activeTab === "mens" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {MENS_CUTS.map((cut, i) => (
            <motion.div key={cut.name} {...fadeUp(0.05 * i)}>
              <button
                type="button"
                className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl hover:border-[#3f3f46] transition-colors h-full overflow-hidden text-left cursor-zoom-in w-full"
                onClick={() => setSelectedStyle(cut)}
                aria-label={`Open ${cut.name} reference image`}
              >
                <StyleImage src={cut.image} alt={cut.name} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center flex-shrink-0">
                        <Scissors
                          className="w-4 h-4 text-[#22D3EE]"
                          strokeWidth={1.75}
                        />
                      </div>
                      <h3 className="text-[#F5F5F7] font-semibold">{cut.name}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        cut.tag === "Trending"
                          ? "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20"
                          : cut.tag === "Bold"
                            ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20"
                            : "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
                      }`}
                    >
                      {cut.tag}
                    </span>
                  </div>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed mb-3">
                    {cut.description}
                  </p>
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#52525B] text-[10px]">
                        {t.trends.clientDemand}
                      </span>
                      <Star className="w-3 h-3 text-[#F59E0B]" />
                    </div>
                    <PopularityBar value={cut.popularity} />
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#27272A]">
                    <p className="text-[#52525B] text-[10px] uppercase tracking-wider mb-1.5">
                      {t.trends.proTip}
                    </p>
                    <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                      {cut.tips}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Women's Styles */}
      {activeTab === "womens" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {WOMENS_STYLES.map((style, i) => (
            <motion.div key={style.name} {...fadeUp(0.05 * i)}>
              <button
                type="button"
                className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl hover:border-[#3f3f46] transition-colors h-full overflow-hidden text-left cursor-zoom-in w-full"
                onClick={() => setSelectedStyle(style)}
                aria-label={`Open ${style.name} reference image`}
              >
                <StyleImage src={style.image} alt={style.name} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                        <Sparkles
                          className="w-4 h-4 text-[#8B5CF6]"
                          strokeWidth={1.75}
                        />
                      </div>
                      <h3 className="text-[#F5F5F7] font-semibold">
                        {style.name}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
                        style.tag === "Trending" || style.tag === "Viral"
                          ? "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20"
                          : style.tag === "Gen Z Favourite"
                            ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20"
                            : "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
                      }`}
                    >
                      {style.tag}
                    </span>
                  </div>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed mb-3">
                    {style.description}
                  </p>
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#52525B] text-[10px]">
                        {t.trends.clientDemand}
                      </span>
                      <Star className="w-3 h-3 text-[#F59E0B]" />
                    </div>
                    <PopularityBar value={style.popularity} />
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#27272A]">
                    <p className="text-[#52525B] text-[10px] uppercase tracking-wider mb-1.5">
                      {t.trends.proTip}
                    </p>
                    <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                      {style.tips}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Colour Palette */}
      {activeTab === "colors" && (
        <div className="space-y-4">
          <motion.div
            {...fadeUp(0)}
            className="bg-[#141419] border border-[#22D3EE]/20 rounded-2xl p-4 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center flex-shrink-0">
              <Copy className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[#22D3EE] text-sm font-medium">
                {t.trends.copyHint}
              </p>
              <p className="text-[#52525B] text-xs">{t.trends.copyHintSub}</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {COLOR_PALETTE.map((color, i) => (
              <motion.div key={color.hex} {...fadeUp(0.04 * i)}>
                <ColorSwatch color={color} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Techniques */}
      {activeTab === "techniques" && (
        <div className="space-y-3">
          {TECHNIQUES.map((tech, i) => (
            <motion.div key={tech.name} {...fadeUp(0.05 * i)}>
              <div
                className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden hover:border-[#3f3f46] transition-colors cursor-pointer"
                onClick={() =>
                  setExpandedTechnique(
                    expandedTechnique === tech.name ? null : tech.name,
                  )
                }
              >
                <div className="flex items-center gap-4 p-5">
                  <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center text-lg flex-shrink-0">
                    {tech.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[#F5F5F7] font-semibold">
                        {tech.name}
                      </p>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          tech.level === "Expert"
                            ? "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20"
                            : tech.level === "Advanced"
                              ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
                              : tech.level === "Intermediate"
                                ? "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20"
                                : "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
                        }`}
                      >
                        {tech.level === "Expert"
                          ? t.trends.levelExpert
                          : tech.level === "Advanced"
                            ? t.trends.levelAdvanced
                            : tech.level === "Intermediate"
                              ? t.trends.levelIntermediate
                              : t.trends.levelBeginner}
                      </span>
                    </div>
                    <p className="text-[#A1A1AA] text-xs truncate">
                      {tech.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                    <div className="text-right hidden sm:block">
                      <p className="text-[#52525B] text-[10px]">{t.trends.avgTime}</p>
                      <p className="text-[#F5F5F7] text-xs font-medium">
                        {tech.time}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border border-[#27272A] flex items-center justify-center text-[#52525B] transition-transform duration-200 ${expandedTechnique === tech.name ? "rotate-45" : ""}`}
                    >
                      <span className="text-sm">+</span>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedTechnique === tech.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#27272A] px-5 py-4">
                        <p className="text-[#52525B] text-[10px] uppercase tracking-wider mb-3">
                          {t.trends.stepGuide}
                        </p>
                        <ol className="space-y-2">
                          {tech.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="text-[#A1A1AA] text-xs leading-relaxed">
                                {step}
                              </p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
