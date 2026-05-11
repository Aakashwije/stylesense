"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import {
  aiService,
  type HairAnalysisResult,
  type StyleRecommendation,
} from "@/services/ai";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Camera, CheckCircle, Sparkles, Upload } from "lucide-react";
import { useRef, useState } from "react";

type Stage = "upload" | "analyzing" | "results";

const REC_COLORS = ["#8B5CF6", "#22D3EE", "#E8B4B8", "#10B981", "#F59E0B"];

export default function AIAnalysisPage() {
  const [stage, setStage] = useState<Stage>("upload");
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<HairAnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG or PNG).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }
    setError(null);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Choose a photo first.");
      return;
    }
    setError(null);
    setStage("analyzing");
    try {
      const result = await aiService.analyzeHair(selectedFile);
      setAnalysis(result);
      const recs = await aiService.getRecommendations(result.id);
      setRecommendations(recs);
      setStage("results");
    } catch {
      setError(
        "Couldn't analyze the photo. Please check that the backend is running and try again.",
      );
      setStage("upload");
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setAnalysis(null);
    setRecommendations([]);
    setError(null);
    setStage("upload");
  };

  const traits = analysis
    ? [
        { label: "Hair Type", value: analysis.hairType },
        { label: "Overall Score", value: `${analysis.overallScore}/100` },
        { label: "Moisture", value: `${analysis.metrics.moisture}/100` },
        { label: "Strength", value: `${analysis.metrics.strength}/100` },
        { label: "Shine", value: `${analysis.metrics.shine}/100` },
        { label: "Scalp Health", value: `${analysis.metrics.scalpHealth}/100` },
      ]
    : [];

  const topRecs = recommendations.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0B0B0F] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <h1 className="text-2xl font-bold text-[#F5F5F7]">
              AI Hair Analysis
            </h1>
          </div>
          <p className="text-[#A1A1AA] text-sm ml-13">
            Upload a photo and our AI will analyze your hair type, face shape,
            and recommend personalized styles.
          </p>
        </FadeUp>

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
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  const f = e.dataTransfer.files[0];
                  if (f) handleFile(f);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-200 mb-6 cursor-pointer ${
                  dragging
                    ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                    : "border-[#27272A] hover:border-[#3f3f46] bg-[#141419]"
                }`}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Selected"
                    className="mx-auto max-h-48 rounded-xl mb-4 object-cover"
                  />
                ) : (
                  <Upload
                    className="w-12 h-12 text-[#52525B] mx-auto mb-4"
                    strokeWidth={1.25}
                  />
                )}
                <p className="text-[#F5F5F7] font-medium mb-2">
                  {selectedFile
                    ? selectedFile.name
                    : "Drop your photo here"}
                </p>
                <p className="text-[#A1A1AA] text-sm mb-4">
                  {selectedFile
                    ? "Click to choose a different photo"
                    : "or click to browse — JPG, PNG up to 10MB"}
                </p>
                <SSButton
                  variant="secondary"
                  size="md"
                  leftIcon={<Camera className="w-4 h-4" />}
                >
                  {selectedFile ? "Change Photo" : "Choose Photo"}
                </SSButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </div>

              <SSButton
                fullWidth
                size="lg"
                leftIcon={<Sparkles className="w-4 h-4" />}
                onClick={handleAnalyze}
                disabled={!selectedFile}
              >
                Analyze with AI
              </SSButton>
            </motion.div>
          )}

          {stage === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-[#8B5CF6]/20 border-t-[#8B5CF6] mx-auto mb-6"
              />
              <h2 className="text-[#F5F5F7] font-semibold text-lg mb-2">
                Analyzing your photo…
              </h2>
              <p className="text-[#A1A1AA] text-sm">
                Our AI is detecting face shape, hair texture, and more
              </p>
              <div className="flex justify-center gap-2 mt-8">
                {[
                  "Detecting face shape",
                  "Analyzing hair texture",
                  "Generating recommendations",
                ].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    className="text-[#A1A1AA] text-xs"
                  >
                    {step}
                    {i < 2 && " →"}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "results" && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-6 text-[#10B981]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Analysis Complete</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <SSCard>
                  <h3 className="text-[#F5F5F7] font-semibold mb-4">
                    Your Hair Profile
                  </h3>
                  <div className="space-y-3">
                    {traits.map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-2 border-b border-[#27272A] last:border-0"
                      >
                        <span className="text-[#A1A1AA] text-sm">{label}</span>
                        <Badge variant="purple" size="sm">
                          {value}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {analysis.recommendations.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-[#27272A]">
                      <p className="text-[#A1A1AA] text-xs font-medium mb-2">
                        Care recommendations
                      </p>
                      <ul className="space-y-1.5">
                        {analysis.recommendations.map((tip) => (
                          <li
                            key={tip}
                            className="text-[#F5F5F7] text-xs leading-relaxed flex gap-2"
                          >
                            <span className="text-[#8B5CF6]">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.concerns.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#27272A]">
                      <p className="text-[#A1A1AA] text-xs font-medium mb-2">
                        Concerns to watch
                      </p>
                      <ul className="space-y-1.5">
                        {analysis.concerns.map((c) => (
                          <li
                            key={c}
                            className="text-[#FCA5A5] text-xs flex gap-2"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </SSCard>

                <div>
                  <h3 className="text-[#F5F5F7] font-semibold mb-4">
                    Recommended Styles
                  </h3>
                  <StaggerContainer className="space-y-3" staggerDelay={0.1}>
                    {topRecs.map((rec, idx) => {
                      const color = REC_COLORS[idx % REC_COLORS.length];
                      return (
                        <StaggerItem key={rec.id}>
                          <SSCard hover>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#F5F5F7] font-medium text-sm">
                                {rec.name}
                              </span>
                              <span
                                className="text-xs font-bold"
                                style={{ color }}
                              >
                                {rec.matchScore}% match
                              </span>
                            </div>
                            <div className="h-1.5 bg-[#27272A] rounded-full mb-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${rec.matchScore}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full rounded-full"
                                style={{ background: color }}
                              />
                            </div>
                            <p className="text-[#A1A1AA] text-xs">
                              {rec.description}
                            </p>
                          </SSCard>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                </div>
              </div>

              <div className="flex gap-3">
                <SSButton
                  variant="primary"
                  size="lg"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                  className="flex-1"
                >
                  Book This Style
                </SSButton>
                <SSButton variant="secondary" size="lg" onClick={reset}>
                  Try Another Photo
                </SSButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
