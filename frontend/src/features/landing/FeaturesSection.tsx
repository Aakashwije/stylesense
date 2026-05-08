"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  BarChart3,
  Brain,
  Calendar,
  Camera,
  MessageCircle,
  Shield,
} from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    color: "#8B5CF6",
    title: "AI Hairstyle Matching",
    description:
      "Upload your photo and our AI analyzes your face shape, skin tone, and lifestyle to recommend perfect hairstyles tailored just for you.",
  },
  {
    icon: Camera,
    color: "#22D3EE",
    title: "Virtual Try-On",
    description:
      "Try hundreds of hairstyles and colors in real-time using your camera. See exactly how you'd look before committing.",
  },
  {
    icon: Calendar,
    color: "#E8B4B8",
    title: "Smart Booking",
    description:
      "Real-time availability, instant confirmations, multi-service booking, and seamless rescheduling — all in one flow.",
  },
  {
    icon: MessageCircle,
    color: "#10B981",
    title: "AI Beauty Chatbot",
    description:
      "Get personalized beauty advice 24/7 from our conversational AI. Ask anything from hair care to styling tips.",
  },
  {
    icon: BarChart3,
    color: "#F59E0B",
    title: "Beauty Analytics",
    description:
      "Track your beauty journey with intelligent reports, treatment history, and personalized progress insights.",
  },
  {
    icon: Shield,
    color: "#6366F1",
    title: "Loyalty & Rewards",
    description:
      "Earn points on every visit, unlock exclusive tier benefits, and redeem rewards for premium treatments.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp className="text-center mb-16">
          <p className="text-[#8B5CF6] text-sm font-medium tracking-wider uppercase mb-4">
            Why StyleSense AI
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F7] tracking-tight mb-5">
            Everything you need for
            <br />
            <span className="text-gradient-purple">the perfect look</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto leading-relaxed">
            A complete beauty intelligence platform designed to make every visit
            extraordinary.
          </p>
        </FadeUp>

        {/* Feature grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <SSCard hover glow className="h-full group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.color}18`,
                    border: `1px solid ${feature.color}30`,
                  }}
                >
                  <feature.icon
                    className="w-5 h-5"
                    style={{ color: feature.color }}
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="text-[#F5F5F7] font-semibold text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </SSCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
