"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, CheckCircle, Sparkles, Upload } from "lucide-react";
import { useState } from "react";

const RECOMMENDATIONS = [
  {
    style: "Soft Bob",
    confidence: 94,
    reason: "Complements your oval face shape",
    color: "#8B5CF6",
  },
  {
    style: "Layered Lob",
    confidence: 88,
    reason: "Enhances your natural texture",
    color: "#22D3EE",
  },
  {
    style: "French Curtain Bangs",
    confidence: 82,
    reason: "Balances your forehead proportions",
    color: "#E8B4B8",
  },
];

const HAIR_TRAITS = [
  { label: "Face Shape", value: "Oval" },
  { label: "Hair Type", value: "Type 2B Wavy" },
  { label: "Hair Density", value: "Medium-High" },
  { label: "Scalp Health", value: "Good" },
  { label: "Porosity", value: "Medium" },
  { label: "Recommended", value: "Hydrating Treatments" },
];

type Stage = "upload" | "analyzing" | "results";

export default function AIAnalysisPage() {
  const [stage, setStage] = useState<Stage>("upload");
  const [dragging, setDragging] = useState(false);

  const handleAnalyze = () => {
    setStage("analyzing");
    setTimeout(() => setStage("results"), 3000);
  };

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
                }}
                className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-200 mb-6 cursor-pointer ${
                  dragging
                    ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                    : "border-[#27272A] hover:border-[#3f3f46] bg-[#141419]"
                }`}
              >
                <Upload
                  className="w-12 h-12 text-[#52525B] mx-auto mb-4"
                  strokeWidth={1.25}
                />
                <p className="text-[#F5F5F7] font-medium mb-2">
                  Drop your photo here
                </p>
                <p className="text-[#A1A1AA] text-sm mb-4">
                  or click to browse — JPG, PNG up to 10MB
                </p>
                <SSButton
                  variant="secondary"
                  size="md"
                  leftIcon={<Camera className="w-4 h-4" />}
                >
                  Choose Photo
                </SSButton>
              </div>

              <SSButton
                fullWidth
                size="lg"
                leftIcon={<Sparkles className="w-4 h-4" />}
                onClick={handleAnalyze}
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

          {stage === "results" && (
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
                {/* Hair Traits */}
                <SSCard>
                  <h3 className="text-[#F5F5F7] font-semibold mb-4">
                    Your Hair Profile
                  </h3>
                  <div className="space-y-3">
                    {HAIR_TRAITS.map(({ label, value }) => (
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
                </SSCard>

                {/* Recommendations */}
                <div>
                  <h3 className="text-[#F5F5F7] font-semibold mb-4">
                    Recommended Styles
                  </h3>
                  <StaggerContainer className="space-y-3" staggerDelay={0.1}>
                    {RECOMMENDATIONS.map((rec) => (
                      <StaggerItem key={rec.style}>
                        <SSCard hover>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#F5F5F7] font-medium text-sm">
                              {rec.style}
                            </span>
                            <span
                              className="text-xs font-bold"
                              style={{ color: rec.color }}
                            >
                              {rec.confidence}% match
                            </span>
                          </div>
                          <div className="h-1.5 bg-[#27272A] rounded-full mb-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${rec.confidence}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{ background: rec.color }}
                            />
                          </div>
                          <p className="text-[#A1A1AA] text-xs">{rec.reason}</p>
                        </SSCard>
                      </StaggerItem>
                    ))}
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
                <SSButton
                  variant="secondary"
                  size="lg"
                  onClick={() => setStage("upload")}
                >
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
