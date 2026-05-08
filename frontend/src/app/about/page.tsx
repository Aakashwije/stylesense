"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Heart,
  MapPin,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Happy clients", value: "50,000+", icon: Users, color: "#8B5CF6" },
  {
    label: "AI analyses done",
    value: "200K+",
    icon: Sparkles,
    color: "#22D3EE",
  },
  { label: "Expert stylists", value: "120+", icon: Star, color: "#E8B4B8" },
  { label: "Cities served", value: "12", icon: MapPin, color: "#10B981" },
];

const VALUES = [
  {
    icon: Heart,
    title: "Client-first always",
    description:
      "Every feature, every decision is made with one question: does this make our clients' lives better? Our NPS of 78 speaks for itself.",
    color: "#E8B4B8",
  },
  {
    icon: Sparkles,
    title: "AI with purpose",
    description:
      "We believe AI should amplify human expertise, not replace it. Our models work alongside stylists to deliver insights no human or machine could alone.",
    color: "#8B5CF6",
  },
  {
    icon: TrendingUp,
    title: "Radical transparency",
    description:
      "From pricing to AI confidence scores, we surface everything. You always know exactly what you're getting and why.",
    color: "#22D3EE",
  },
  {
    icon: Globe,
    title: "Inclusive beauty",
    description:
      "Beauty is for everyone. Our AI is trained on the broadest dataset of hair types, skin tones, and styles in the industry.",
    color: "#10B981",
  },
];

const TEAM = [
  {
    name: "Aisha Patel",
    role: "CEO & Co-founder",
    bio: "Former beauty director at Vogue. 15+ years in luxury beauty.",
    gradient: ["#8B5CF6", "#E8B4B8"],
    initials: "AP",
  },
  {
    name: "James Luo",
    role: "CTO & Co-founder",
    bio: "Ex-Google AI. Built computer vision systems used by 500M users.",
    gradient: ["#22D3EE", "#8B5CF6"],
    initials: "JL",
  },
  {
    name: "Sofia Reyes",
    role: "Chief Beauty Officer",
    bio: "20 years as a master colorist. Trained over 300 stylists globally.",
    gradient: ["#E8B4B8", "#F59E0B"],
    initials: "SR",
  },
  {
    name: "Marcus Webb",
    role: "Head of AI",
    bio: "PhD in Computer Vision, MIT. Pioneered hair texture analysis models.",
    gradient: ["#10B981", "#22D3EE"],
    initials: "MW",
  },
];

const TIMELINE = [
  {
    year: "2022",
    title: "Founded in San Francisco",
    description: "Started with 3 stylists, a laptop, and an idea.",
  },
  {
    year: "2023",
    title: "AI hair analysis v1 launched",
    description:
      "First model to analyze hair porosity, texture, and health from a photo.",
  },
  {
    year: "2024",
    title: "Raised Series A — $12M",
    description: "Backed by top beauty and consumer tech investors.",
  },
  {
    year: "2025",
    title: "Virtual Try-On released",
    description:
      "Photorealistic style previews powered by our custom diffusion model.",
  },
  {
    year: "2026",
    title: "50,000 clients and growing",
    description: "Expanding to 12 cities with 120+ hand-selected stylists.",
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative bg-[#0B0B0F] pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <FadeUp>
            <Badge variant="purple" size="sm" className="mb-5 inline-flex">
              <Heart className="w-3 h-3 mr-1" />
              Our story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-[#F5F5F7] mb-6">
              We believe{" "}
              <span className="text-gradient-purple">beauty should be</span>
              <br />
              effortless and personal
            </h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
              StyleSense AI was born from a simple frustration: finding the
              right stylist, right style, and right routine felt like guesswork.
              We fixed that with AI.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#141419] border-y border-[#27272A] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.label}>
                  <div className="text-center">
                    <div
                      className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: stat.color + "18" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <p className="text-2xl font-bold text-[#F5F5F7]">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[#52525B] mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#0B0B0F] py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <Badge variant="cyan" size="sm" className="mb-4">
              Our mission
            </Badge>
            <h2 className="text-3xl font-bold text-[#F5F5F7] mb-5">
              Putting intelligence behind every beauty decision
            </h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-5">
              For too long, getting the perfect look relied on luck — stumbling
              upon the right stylist, hoping a recommendation would suit you.
              StyleSense AI changes that by giving clients the tools to arrive
              informed, inspired, and ready.
            </p>
            <p className="text-[#A1A1AA] leading-relaxed">
              We pair the world's most advanced hair AI with hand-curated salon
              talent so every appointment ends exactly as imagined.
            </p>
          </FadeUp>

          {/* Values grid */}
          <StaggerContainer className="grid grid-cols-2 gap-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <SSCard className="p-4">
                    <div
                      className="w-9 h-9 rounded-xl mb-3 flex items-center justify-center"
                      style={{ backgroundColor: v.color + "18" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: v.color }} />
                    </div>
                    <h3 className="text-sm font-medium text-[#F5F5F7] mb-1">
                      {v.title}
                    </h3>
                    <p className="text-xs text-[#52525B] leading-relaxed">
                      {v.description}
                    </p>
                  </SSCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#141419] border-t border-[#27272A] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-14">
            <Badge variant="muted" size="sm" className="mb-4">
              Our journey
            </Badge>
            <h2 className="text-3xl font-bold text-[#F5F5F7]">
              From idea to industry leader
            </h2>
          </FadeUp>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-[#27272A]" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-xs font-semibold text-[#8B5CF6]">
                      {item.year}
                    </span>
                  </div>
                  <div className="relative flex gap-4 flex-1">
                    <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mt-1 shrink-0 relative z-10" />
                    <div className="pb-2">
                      <h3 className="text-sm font-medium text-[#F5F5F7]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#52525B] mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#0B0B0F] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <Badge variant="purple" size="sm" className="mb-4">
              Leadership
            </Badge>
            <h2 className="text-3xl font-bold text-[#F5F5F7]">
              Built by believers
            </h2>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <motion.div whileHover={{ y: -4 }} className="text-center">
                  <div
                    className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${member.gradient[0]}, ${member.gradient[1]})`,
                    }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-[#F5F5F7]">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#8B5CF6] mt-0.5 mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#52525B]">{member.bio}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#141419] border-t border-[#27272A] py-20 px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl font-bold text-[#F5F5F7] mb-4">
            Ready to experience StyleSense?
          </h2>
          <p className="text-[#A1A1AA] mb-8">
            Join 50,000+ clients who transformed their beauty routine.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <SSButton asChild variant="primary" size="lg">
              <Link href="/auth/signup">
                Get started free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </SSButton>
            <SSButton asChild variant="outline" size="lg">
              <Link href="/booking">Book a session</Link>
            </SSButton>
          </div>
        </FadeUp>
      </section>
    </PublicLayout>
  );
}
