"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Play, Sparkles, Star } from "lucide-react";
import Link from "next/link";

const STATS = [
  { value: "50K+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "200+", label: "Expert Stylists" },
  { value: "98%", label: "Satisfaction Rate" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6] rounded-full blur-[120px] opacity-[0.12]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#22D3EE] rounded-full blur-[120px] opacity-[0.08]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#E8B4B8] rounded-full blur-[100px] opacity-[0.07]"
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Announcement badge */}
        <FadeUp delay={0.1}>
          <div className="inline-flex mb-6">
            <Badge variant="purple" className="text-xs px-3 py-1.5 gap-2">
              <Sparkles className="w-3 h-3" />
              Introducing AI Hair Analysis 2.0
              <ChevronRight className="w-3 h-3 opacity-60" />
            </Badge>
          </div>
        </FadeUp>

        {/* Headline */}
        <FadeUp delay={0.2}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#F5F5F7] leading-[1.05] mb-6">
            Beauty powered
            <br />
            <span className="text-gradient-purple">by intelligence</span>
          </h1>
        </FadeUp>

        {/* Subheadline */}
        <FadeUp delay={0.3}>
          <p className="text-[#A1A1AA] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            StyleSense AI transforms your salon experience with personalized AI
            recommendations, real-time booking, and expert stylists who
            understand you.
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <SSButton
              size="xl"
              variant="primary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              <Link href="/booking">Book Your Session</Link>
            </SSButton>
            <SSButton
              size="xl"
              variant="outline"
              leftIcon={<Play className="w-4 h-4 fill-current" />}
            >
              <Link href="/ai-demo">See AI Demo</Link>
            </SSButton>
          </div>
        </FadeUp>

        {/* Social proof */}
        <FadeUp delay={0.5}>
          <div className="flex items-center justify-center gap-2 mb-16">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] border-2 border-[#0B0B0F] flex items-center justify-center text-white text-[10px] font-bold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                />
              ))}
            </div>
            <p className="text-[#A1A1AA] text-sm ml-1">
              <span className="text-[#F5F5F7] font-medium">50,000+</span>{" "}
              clients trust us
            </p>
          </div>
        </FadeUp>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#27272A] rounded-2xl overflow-hidden border border-[#27272A]">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="bg-[#0B0B0F] px-6 py-6 text-center hover:bg-[#141419] transition-colors duration-200">
                <div className="text-3xl font-bold text-[#F5F5F7] mb-1">
                  {stat.value}
                </div>
                <div className="text-[#A1A1AA] text-sm">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
