"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Camera,
  Check,
  ChevronRight,
  CircleUser,
  Droplets,
  Loader2,
  Sparkles,
  Upload,
  User,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

const MEN_HAIRSTYLES = [
  {
    id: "m1",
    name: "Classic Taper Fade",
    match: 97,
    faceShapes: ["oval", "square"],
    description:
      "A timeless cut that works with your strong jawline. Clean sides with natural top length.",
    tags: ["Low Maintenance", "Professional", "Versatile"],
    gradient: "from-[#8B5CF6] to-[#7C3AED]",
  },
  {
    id: "m2",
    name: "Textured Quiff",
    match: 93,
    faceShapes: ["oval", "heart", "diamond"],
    description:
      "Adds height to elongate your face while keeping the sides clean and sharp.",
    tags: ["Trendy", "Medium Length", "Styling Required"],
    gradient: "from-[#22D3EE] to-[#0EA5E9]",
  },
  {
    id: "m3",
    name: "French Crop",
    match: 89,
    faceShapes: ["round", "square", "oval"],
    description:
      "A bold European-inspired cut that flatters your bone structure with a defined fringe.",
    tags: ["Bold", "Low Fade", "Modern"],
    gradient: "from-[#10B981] to-[#059669]",
  },
  {
    id: "m4",
    name: "Slick Back Undercut",
    match: 85,
    faceShapes: ["oval", "square"],
    description:
      "Sleek and sophisticated. Works great for formal settings with your face shape.",
    tags: ["Formal", "Pomade Required", "High Contrast"],
    gradient: "from-[#F59E0B] to-[#D97706]",
  },
  {
    id: "m5",
    name: "Buzz Cut with Line Up",
    match: 82,
    faceShapes: ["square", "oval", "heart"],
    description:
      "Ultra-clean and masculine. The lineup accentuates your natural features.",
    tags: ["Minimal", "No Styling", "Bold"],
    gradient: "from-[#EC4899] to-[#DB2777]",
  },
];

const WOMEN_COLORS = [
  {
    id: "wc1",
    name: "Honey Balayage",
    needsBleach: false,
    match: 96,
    tone: "Warm",
    swatch: "linear-gradient(135deg, #B8860B, #DAA520, #F5DEB3)",
    description:
      "Sun-kissed warmth that transitions from your natural base. No bleach needed.",
    maintenance: "Every 3–4 months",
    tags: ["Natural Look", "Low Damage", "Warm Tones"],
  },
  {
    id: "wc2",
    name: "Platinum Blonde",
    needsBleach: true,
    match: 84,
    tone: "Cool",
    swatch: "linear-gradient(135deg, #E8E8E8, #F5F5DC, #FFFAFA)",
    description:
      "Striking and high-fashion. Requires full bleach process — best done over multiple sessions.",
    maintenance: "Every 6–8 weeks",
    tags: ["High Impact", "Full Bleach", "Cool Tones"],
  },
  {
    id: "wc3",
    name: "Chocolate Cherry",
    needsBleach: false,
    match: 94,
    tone: "Rich",
    swatch: "linear-gradient(135deg, #4A0404, #8B0000, #C0392B)",
    description:
      "Deep, dimensional red-brown. Gorgeous on darker bases without any bleach required.",
    maintenance: "Every 6–8 weeks",
    tags: ["Rich Tones", "No Bleach", "Bold"],
  },
  {
    id: "wc4",
    name: "Ash Lilac Highlights",
    needsBleach: true,
    match: 79,
    tone: "Cool/Pastel",
    swatch: "linear-gradient(135deg, #9B59B6, #C39BD3, #E8DAEF)",
    description:
      "Dreamy pastel purple woven through your hair. Requires bleach to lift enough for the color to show.",
    maintenance: "Every 4–6 weeks (toner)",
    tags: ["Pastel", "Bleach Required", "Fantasy Color"],
  },
  {
    id: "wc5",
    name: "Caramel Money Piece",
    needsBleach: false,
    match: 91,
    tone: "Warm",
    swatch: "linear-gradient(135deg, #C68642, #E8975A, #F5C87E)",
    description:
      "Face-framing caramel highlights that brighten your complexion instantly.",
    maintenance: "Every 8–10 weeks",
    tags: ["Face Framing", "Partial Bleach", "Warm Glow"],
  },
  {
    id: "wc6",
    name: "Jet Black with Blue Sheen",
    needsBleach: false,
    match: 88,
    tone: "Cool/Dark",
    swatch: "linear-gradient(135deg, #0A0A0A, #1a1a2e, #16213e)",
    description:
      "Deep, lustrous black with a subtle blue shimmer. No bleach needed.",
    maintenance: "Every 8 weeks",
    tags: ["Dark Tones", "No Bleach", "Shine"],
  },
];

const FACE_SHAPES = [
  {
    id: "oval",
    label: "Oval",
    desc: "Balanced proportions, slightly wider at cheekbones",
  },
  {
    id: "round",
    label: "Round",
    desc: "Similar width and length, soft jawline",
  },
  {
    id: "square",
    label: "Square",
    desc: "Strong jawline, similar width across face",
  },
  { id: "heart", label: "Heart", desc: "Wider forehead, narrower chin" },
  {
    id: "diamond",
    label: "Diamond",
    desc: "Narrow forehead and jaw, wide cheekbones",
  },
  {
    id: "oblong",
    label: "Oblong",
    desc: "Longer than wide, similar width throughout",
  },
];

type Gender = "men" | "women" | null;
type AnalysisState = "idle" | "uploading" | "analyzing" | "done";

export default function AIHairAnalysisPage() {
  const [gender, setGender] = useState<Gender>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [detectedFaceShape, setDetectedFaceShape] = useState<string | null>(
    null,
  );
  const [bleachFilter, setBleachFilter] = useState<"all" | "with" | "without">(
    "all",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        setAnalysisState("uploading");
        setTimeout(() => setAnalysisState("analyzing"), 800);
        setTimeout(() => {
          setAnalysisState("done");
          setDetectedFaceShape("oval");
        }, 2800);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisState("idle");
    setDetectedFaceShape(null);
    setGender(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const filteredColors = WOMEN_COLORS.filter((c) =>
    bleachFilter === "with"
      ? c.needsBleach
      : bleachFilter === "without"
        ? !c.needsBleach
        : true,
  );
  const filteredStyles = detectedFaceShape
    ? MEN_HAIRSTYLES.filter((s) =>
        s.faceShapes.includes(detectedFaceShape),
      ).sort((a, b) => b.match - a.match)
    : MEN_HAIRSTYLES.sort((a, b) => b.match - a.match);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <FadeUp>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#F5F5F7]">
              AI Hair Studio
            </h1>
            <p className="text-[#A1A1AA] text-sm">
              Face shape analysis · Hairstyle matching · Color simulation
            </p>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.08}>
        <SSCard>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-[#F5F5F7] font-semibold text-sm">
              Who is this analysis for?
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                {
                  id: "men",
                  label: "Men",
                  desc: "Face shape analysis + hairstyle matching",
                  Icon: User,
                  border: "#22D3EE",
                },
                {
                  id: "women",
                  label: "Women",
                  desc: "Color simulation with & without bleach",
                  Icon: CircleUser,
                  border: "#EC4899",
                },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setGender(opt.id)}
                className="p-5 rounded-2xl text-left transition-all duration-200 border-2"
                style={{
                  background: gender === opt.id ? `${opt.border}12` : "#1C1C22",
                  borderColor: gender === opt.id ? opt.border : "#38383F",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${opt.border}20` }}
                >
                  <opt.Icon className="w-6 h-6" style={{ color: opt.border }} />
                </div>
                <p className="text-[#F5F5F7] font-semibold text-sm mb-1">
                  {opt.label}
                </p>
                <p className="text-[#71717A] text-xs">{opt.desc}</p>
                {gender === opt.id && (
                  <div
                    className="mt-2 flex items-center gap-1 text-xs font-medium"
                    style={{ color: opt.border }}
                  >
                    <Check className="w-3 h-3" />
                    Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        </SSCard>
      </FadeUp>

      <AnimatePresence>
        {gender && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <SSCard>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <h2 className="text-[#F5F5F7] font-semibold text-sm">
                  Upload your photo
                </h2>
              </div>
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
                  className="w-full border-2 border-dashed border-[#38383F] hover:border-[#8B5CF6]/50 rounded-2xl p-10 flex flex-col items-center gap-3 transition-all duration-200 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#1C1C22] border border-[#38383F] flex items-center justify-center group-hover:border-[#8B5CF6]/30 transition-colors">
                    <Camera className="w-6 h-6 text-[#52525B] group-hover:text-[#8B5CF6] transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-[#F5F5F7] text-sm font-medium mb-1">
                      Drop your photo here or click to browse
                    </p>
                    <p className="text-[#52525B] text-xs">
                      JPG, PNG, WEBP · Max 10MB · Face clearly visible
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B5CF6] text-white text-xs font-medium">
                    <Upload className="w-3.5 h-3.5" />
                    Choose Photo
                  </div>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="relative w-full sm:w-48 shrink-0">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full sm:w-48 h-48 object-cover rounded-2xl border border-[#38383F]"
                    />
                    <button
                      onClick={resetAnalysis}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0B0B0F]/80 backdrop-blur flex items-center justify-center text-[#A1A1AA] hover:text-[#EF4444] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <AnimatePresence mode="wait">
                      {analysisState === "uploading" && (
                        <motion.div
                          key="uploading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-[#1C1C22] border border-[#38383F] mb-3"
                        >
                          <Loader2 className="w-4 h-4 text-[#8B5CF6] animate-spin" />
                          <p className="text-[#A1A1AA] text-sm">
                            Processing image...
                          </p>
                        </motion.div>
                      )}
                      {analysisState === "analyzing" && (
                        <motion.div
                          key="analyzing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-2"
                        >
                          {[
                            "Detecting facial landmarks...",
                            "Measuring face proportions...",
                            "Matching hairstyle database...",
                          ].map((step, i) => (
                            <div
                              key={step}
                              className="flex items-center gap-3 p-3 rounded-xl bg-[#1C1C22] border border-[#38383F]"
                            >
                              <Loader2
                                className="w-3.5 h-3.5 text-[#8B5CF6] animate-spin"
                                style={{ animationDelay: `${i * 0.2}s` }}
                              />
                              <p className="text-[#71717A] text-xs">{step}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                      {analysisState === "done" && (
                        <motion.div
                          key="done"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30">
                            <Check className="w-4 h-4 text-[#22C55E]" />
                            <p className="text-[#22C55E] text-xs font-medium">
                              Analysis complete!
                            </p>
                          </div>
                          {gender === "men" && detectedFaceShape && (
                            <div className="p-4 rounded-xl bg-[#1C1C22] border border-[#38383F]">
                              <p className="text-[#52525B] text-xs mb-1">
                                Detected Face Shape
                              </p>
                              <p className="text-[#F5F5F7] text-lg font-bold capitalize mb-0.5">
                                {
                                  FACE_SHAPES.find(
                                    (f) => f.id === detectedFaceShape,
                                  )?.label
                                }
                              </p>
                              <p className="text-[#71717A] text-xs">
                                {
                                  FACE_SHAPES.find(
                                    (f) => f.id === detectedFaceShape,
                                  )?.desc
                                }
                              </p>
                            </div>
                          )}
                          {gender === "women" && (
                            <div className="p-4 rounded-xl bg-[#1C1C22] border border-[#38383F]">
                              <p className="text-[#52525B] text-xs mb-1">
                                Skin Tone Analysis
                              </p>
                              <p className="text-[#F5F5F7] text-sm font-semibold mb-0.5">
                                Warm Undertone · Medium Depth
                              </p>
                              <p className="text-[#71717A] text-xs">
                                Best matches: honey, caramel, and auburn shades
                              </p>
                            </div>
                          )}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-1.5 text-[#8B5CF6] text-xs hover:underline"
                          >
                            <Upload className="w-3 h-3" />
                            Upload different photo
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </SSCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gender === "men" && analysisState === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SSCard>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <h2 className="text-[#F5F5F7] font-semibold text-sm">
                  Recommended hairstyles for your{" "}
                  <span className="text-[#8B5CF6]">
                    {FACE_SHAPES.find((f) => f.id === detectedFaceShape)?.label}
                  </span>{" "}
                  face shape
                </h2>
              </div>
              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                staggerDelay={0.07}
              >
                {filteredStyles.map((style) => (
                  <StaggerItem key={style.id}>
                    <div className="p-4 rounded-2xl bg-[#1C1C22] border border-[#38383F] hover:border-[#52525B] transition-colors h-full flex flex-col">
                      <div
                        className={`w-10 h-10 rounded-xl bg-linear-to-br ${style.gradient} flex items-center justify-center mb-3`}
                      >
                        <Wand2
                          className="w-5 h-5 text-white"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-[#F5F5F7] font-semibold text-sm">
                          {style.name}
                        </h3>
                        <span className="text-[#8B5CF6] text-xs font-bold shrink-0">
                          {style.match}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#27272A] overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${style.match}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full bg-linear-to-r from-[#8B5CF6] to-[#22D3EE]"
                        />
                      </div>
                      <p className="text-[#71717A] text-xs leading-relaxed mb-3 flex-1">
                        {style.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {style.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full bg-[#27272A] text-[#A1A1AA] text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <button className="w-full flex items-center justify-center gap-1.5 h-9 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] text-xs font-medium hover:bg-[#8B5CF6]/25 transition-colors">
                        <Sparkles className="w-3.5 h-3.5" />
                        Find stylists for this cut
                        <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                      </button>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </SSCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gender === "women" && analysisState === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SSCard>
              <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <h2 className="text-[#F5F5F7] font-semibold text-sm">
                    Color recommendations for your skin tone
                  </h2>
                </div>
                <div className="flex gap-1">
                  {(["all", "without", "with"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setBleachFilter(f)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${bleachFilter === f ? "bg-[#EC4899] text-white" : "bg-[#1C1C22] border border-[#38383F] text-[#71717A] hover:text-[#F5F5F7]"}`}
                    >
                      {f === "all"
                        ? "All"
                        : f === "without"
                          ? "No Bleach"
                          : "Bleach"}
                    </button>
                  ))}
                </div>
              </div>
              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                staggerDelay={0.07}
              >
                {filteredColors.map((color, idx) => (
                  <StaggerItem key={color.id}>
                    <div className="p-4 rounded-2xl bg-[#1C1C22] border border-[#38383F] hover:border-[#52525B] transition-colors h-full flex flex-col">
                      <div
                        className="w-full h-16 rounded-xl mb-3"
                        style={{ background: color.swatch }}
                      />
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-[#F5F5F7] font-semibold text-sm">
                          {color.name}
                        </h3>
                        <span className="text-[#EC4899] text-xs font-bold shrink-0">
                          {color.match}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#27272A] text-[#A1A1AA] text-[10px]">
                          {color.tone}
                        </span>
                        {color.needsBleach ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] text-[10px]">
                            Bleach Required
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-[10px]">
                            No Bleach
                          </span>
                        )}
                      </div>
                      <p className="text-[#71717A] text-xs leading-relaxed mb-2 flex-1">
                        {color.description}
                      </p>
                      <p className="text-[#52525B] text-[10px] mb-3">
                        Touch-up: {color.maintenance}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {color.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full bg-[#27272A] text-[#A1A1AA] text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 h-1.5 rounded-full bg-[#27272A] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${color.match}%` }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3 + idx * 0.07,
                            }}
                            className="h-full rounded-full bg-linear-to-r from-[#EC4899] to-[#8B5CF6]"
                          />
                        </div>
                        <span className="text-[#52525B] text-[10px] w-8 text-right">
                          {color.match}%
                        </span>
                      </div>
                      <button className="w-full flex items-center justify-center gap-1.5 h-9 rounded-xl bg-[#EC4899]/15 text-[#EC4899] text-xs font-medium hover:bg-[#EC4899]/25 transition-colors">
                        <Sparkles className="w-3.5 h-3.5" />
                        Find colorists for this look
                        <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                      </button>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </SSCard>
          </motion.div>
        )}
      </AnimatePresence>

      {!gender && (
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          staggerDelay={0.08}
        >
          {[
            {
              icon: User,
              title: "Face Shape AI",
              desc: "Our model analyzes 68 facial landmarks to identify your face shape in seconds.",
              color: "#8B5CF6",
            },
            {
              icon: Zap,
              title: "Style Matching",
              desc: "Over 200 hairstyles scored and ranked specifically for your unique features.",
              color: "#22D3EE",
            },
            {
              icon: Droplets,
              title: "Color Simulation",
              desc: "See how any color will look on you — with or without bleach — before booking.",
              color: "#EC4899",
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <SSCard hover className="h-full">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${f.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-[#F5F5F7] font-semibold text-sm mb-1">
                    {f.title}
                  </h3>
                  <p className="text-[#71717A] text-xs leading-relaxed">
                    {f.desc}
                  </p>
                </SSCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
