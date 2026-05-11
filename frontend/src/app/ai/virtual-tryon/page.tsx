"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { aiService } from "@/services/ai";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  RefreshCw,
  Share2,
  Sparkles,
  Upload,
  Wand2,
  ZoomIn,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

const HAIRSTYLE_OPTIONS = [
  { id: "bob", name: "Classic Bob", category: "Short", color: "#E8B4B8" },
  { id: "pixie", name: "Pixie Cut", category: "Short", color: "#8B5CF6" },
  { id: "lob", name: "Long Bob", category: "Medium", color: "#22D3EE" },
  { id: "waves", name: "Beach Waves", category: "Medium", color: "#F59E0B" },
  {
    id: "curtain",
    name: "Curtain Bangs",
    category: "Medium",
    color: "#10B981",
  },
  { id: "blowout", name: "Blowout", category: "Long", color: "#8B5CF6" },
  { id: "braids", name: "Box Braids", category: "Long", color: "#22D3EE" },
  { id: "curls", name: "Natural Curls", category: "Long", color: "#E8B4B8" },
];

const COLOR_OPTIONS = [
  { id: "natural", name: "Natural", hex: "#4A3728" },
  { id: "blonde", name: "Blonde", hex: "#D4A849" },
  { id: "ash", name: "Ash Brown", hex: "#8B7355" },
  { id: "red", name: "Auburn Red", hex: "#8B3A2A" },
  { id: "platinum", name: "Platinum", hex: "#E8E0D0" },
  { id: "purple", name: "Violet", hex: "#8B5CF6" },
  { id: "blue", name: "Midnight Blue", hex: "#1E40AF" },
  { id: "pink", name: "Rose Gold", hex: "#E8B4B8" },
];

type Stage = "upload" | "selecting" | "result";

export default function VirtualTryOnPage() {
  const [stage, setStage] = useState<Stage>("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("lob");
  const [selectedColor, setSelectedColor] = useState<string>("natural");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"style" | "color">("style");
  const [styleIndex, setStyleIndex] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }
    setError(null);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setStage("selecting");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleApply = async () => {
    if (!selectedFile) {
      setError("Choose a photo first.");
      return;
    }
    setError(null);
    setIsProcessing(true);
    try {
      const res = await aiService.virtualTryOn(
        selectedFile,
        selectedStyle,
        selectedColor,
      );
      setResultUrl(res.resultUrl);
      setStage("result");
    } catch {
      setError(
        "Try-on failed. Please check that the backend is running and try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const visibleStyles = HAIRSTYLE_OPTIONS.slice(styleIndex, styleIndex + 4);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F5F5F7]">
      {/* Header */}
      <div className="border-b border-[#27272A] px-6 py-4 flex items-center gap-4 sticky top-0 z-20 bg-[#0B0B0F]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-[#F5F5F7]">Virtual Try-On</h1>
            <p className="text-xs text-[#52525B]">AI-powered style preview</p>
          </div>
        </div>
        <Badge variant="purple" size="sm" className="ml-2">
          Beta
        </Badge>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-start gap-2 rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/10 px-3 py-2.5 text-sm text-[#FCA5A5]"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
        <AnimatePresence mode="wait">
          {/* ─── Stage: Upload ─── */}
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <FadeUp className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3">
                  See yourself{" "}
                  <span className="text-gradient-purple">transformed</span>
                </h2>
                <p className="text-[#A1A1AA]">
                  Upload a clear, front-facing photo and our AI will overlay
                  hundreds of styles in seconds.
                </p>
              </FadeUp>

              {/* Drop zone */}
              <motion.div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                animate={{ borderColor: isDragging ? "#8B5CF6" : "#27272A" }}
                className="relative border-2 border-dashed rounded-2xl p-16 cursor-pointer flex flex-col items-center gap-5 bg-[#141419] hover:bg-[#1C1C22] transition-colors"
              >
                {isDragging && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-[#8B5CF6]/5 pointer-events-none"
                  />
                )}
                <div className="w-20 h-20 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-[#8B5CF6]" />
                </div>
                <div className="text-center">
                  <p className="text-[#F5F5F7] font-medium mb-1">
                    Drop your photo here
                  </p>
                  <p className="text-sm text-[#52525B]">
                    or click to browse — JPG, PNG up to 10MB
                  </p>
                </div>
                <SSButton
                  variant="outline"
                  size="sm"
                  className="pointer-events-none"
                >
                  Choose photo
                </SSButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </motion.div>

              {/* Tips */}
              <StaggerContainer className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: "📸", tip: "Front-facing, neutral expression" },
                  { icon: "💡", tip: "Good, even lighting preferred" },
                  { icon: "🔲", tip: "Hair fully visible in frame" },
                ].map((t) => (
                  <StaggerItem key={t.tip}>
                    <div className="bg-[#1C1C22] rounded-xl p-4 text-center border border-[#27272A]">
                      <span className="text-2xl block mb-2">{t.icon}</span>
                      <p className="text-xs text-[#A1A1AA]">{t.tip}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          )}

          {/* ─── Stage: Selecting ─── */}
          {stage === "selecting" && (
            <motion.div
              key="selecting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-[1fr_360px] gap-8"
            >
              {/* Preview */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-[#141419] border border-[#27272A] aspect-[3/4] flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Your photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-[#52525B]" />
                  )}
                  {/* Overlay badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="purple" size="sm">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Preview
                    </Badge>
                  </div>
                  {/* Zoom hint */}
                  <div className="absolute bottom-4 right-4 bg-[#0B0B0F]/80 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-[#A1A1AA] backdrop-blur-sm">
                    <ZoomIn className="w-3 h-3" />
                    Tap to zoom
                  </div>
                </div>

                <div className="flex gap-3">
                  <SSButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setStage("upload")}
                    leftIcon={<Upload className="w-4 h-4" />}
                  >
                    Change photo
                  </SSButton>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                {/* Tabs */}
                <div className="flex rounded-xl bg-[#141419] border border-[#27272A] p-1">
                  {(["style", "color"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                        activeTab === tab
                          ? "bg-[#8B5CF6] text-white"
                          : "text-[#A1A1AA] hover:text-[#F5F5F7]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "style" ? (
                    <motion.div
                      key="style-panel"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-[#A1A1AA]">
                          Choose style
                        </h3>
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              setStyleIndex(Math.max(0, styleIndex - 4))
                            }
                            className="p-1 rounded-lg hover:bg-[#27272A] text-[#52525B] hover:text-[#F5F5F7] transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              setStyleIndex(
                                Math.min(
                                  HAIRSTYLE_OPTIONS.length - 4,
                                  styleIndex + 4,
                                ),
                              )
                            }
                            className="p-1 rounded-lg hover:bg-[#27272A] text-[#52525B] hover:text-[#F5F5F7] transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {visibleStyles.map((s) => (
                          <motion.button
                            key={s.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedStyle(s.id)}
                            className={`relative p-3 rounded-xl border text-left transition-all ${
                              selectedStyle === s.id
                                ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                                : "border-[#27272A] bg-[#1C1C22] hover:border-[#8B5CF6]/50"
                            }`}
                          >
                            <div
                              className="w-8 h-8 rounded-lg mb-2"
                              style={{ backgroundColor: s.color + "33" }}
                            >
                              <div
                                className="w-full h-full rounded-lg opacity-60"
                                style={{ backgroundColor: s.color }}
                              />
                            </div>
                            <p className="text-xs font-medium text-[#F5F5F7]">
                              {s.name}
                            </p>
                            <p className="text-[10px] text-[#52525B]">
                              {s.category}
                            </p>
                            {selectedStyle === s.id && (
                              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="color-panel"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      <h3 className="text-sm font-medium text-[#A1A1AA]">
                        Choose color
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        {COLOR_OPTIONS.map((c) => (
                          <motion.button
                            key={c.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedColor(c.id)}
                            className="flex flex-col items-center gap-1.5"
                          >
                            <div
                              className={`w-10 h-10 rounded-full border-2 transition-all ${
                                selectedColor === c.id
                                  ? "border-[#8B5CF6] scale-110"
                                  : "border-[#27272A]"
                              }`}
                              style={{ backgroundColor: c.hex }}
                            />
                            <span className="text-[10px] text-[#A1A1AA]">
                              {c.name}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Apply button */}
                <SSButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleApply}
                  loading={isProcessing}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  {isProcessing ? "Applying AI magic…" : "Apply style"}
                </SSButton>

                <div className="flex items-start gap-2 bg-[#1C1C22] rounded-xl p-3 border border-[#27272A]">
                  <Info className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#A1A1AA]">
                    Our AI generates a photorealistic preview. For best results
                    use a clear front-facing photo.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Stage: Result ─── */}
          {stage === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <FadeUp className="text-center mb-8">
                <Badge variant="cyan" size="sm" className="mb-4 inline-flex">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Result Ready
                </Badge>
                <h2 className="text-3xl font-bold mb-2">
                  Your new{" "}
                  <span className="text-gradient-purple">
                    {
                      HAIRSTYLE_OPTIONS.find((s) => s.id === selectedStyle)
                        ?.name
                    }
                  </span>
                </h2>
                <p className="text-[#A1A1AA]">
                  Looking amazing! Ready to book this style?
                </p>
              </FadeUp>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <SSCard className="overflow-hidden p-0">
                  <div className="px-4 pt-4 pb-2">
                    <Badge variant="muted" size="sm">
                      Before
                    </Badge>
                  </div>
                  <div className="aspect-[3/4] bg-[#141419]">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </SSCard>

                {/* After — image returned by ai-service */}
                <SSCard className="overflow-hidden p-0">
                  <div className="px-4 pt-4 pb-2">
                    <Badge variant="purple" size="sm">
                      After — AI Preview
                    </Badge>
                  </div>
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#8B5CF6]/20 to-[#22D3EE]/10 relative overflow-hidden">
                    {resultUrl ? (
                      <img
                        src={resultUrl}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      imagePreview && (
                        <img
                          src={imagePreview}
                          alt="After"
                          className="w-full h-full object-cover opacity-90"
                          style={{ filter: "saturate(1.2) contrast(1.05)" }}
                        />
                      )
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/20 to-transparent pointer-events-none" />
                  </div>
                </SSCard>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <SSButton
                  variant="primary"
                  size="lg"
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  onClick={() => (window.location.href = "/booking")}
                >
                  Book this style
                </SSButton>
                <SSButton
                  variant="outline"
                  size="lg"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Save result
                </SSButton>
                <SSButton
                  variant="ghost"
                  size="lg"
                  leftIcon={<Share2 className="w-4 h-4" />}
                >
                  Share
                </SSButton>
                <SSButton
                  variant="ghost"
                  size="lg"
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                  onClick={() => setStage("selecting")}
                >
                  Try another style
                </SSButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
