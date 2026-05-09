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
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Static service data — in production this would be fetched via useService(id)
const SERVICES_DATA: Record<
  string,
  {
    id: string;
    name: string;
    category: string;
    description: string;
    longDescription: string;
    price: number;
    duration: number;
    rating: number;
    reviews: number;
    gradient: [string, string];
    benefits: string[];
    includes: string[];
    stylists: Array<{
      name: string;
      initials: string;
      rating: number;
      experience: number;
      gradient: [string, string];
    }>;
    testimonials: Array<{
      name: string;
      initials: string;
      text: string;
      rating: number;
      date: string;
    }>;
  }
> = {
  balayage: {
    id: "balayage",
    name: "Balayage & Color",
    category: "Hair Color",
    description: "Natural sun-kissed color blended seamlessly into your hair.",
    longDescription:
      "Our signature balayage treatment creates soft, dimensional color that mimics the natural highlights of sun-kissed hair. Our master colorists hand-paint every strand for a perfectly blended, grow-out-friendly finish that looks beautiful at every stage.",
    price: 12000,
    duration: 180,
    rating: 4.9,
    reviews: 412,
    gradient: ["#D4A849", "#8B3A2A"],
    benefits: [
      "Natural-looking, multi-dimensional color",
      "Gentle on hair — no harsh bleaching at roots",
      "Low maintenance grow-out",
      "Customized to your skin tone and lifestyle",
    ],
    includes: [
      "Hair consultation",
      "Color application",
      "Toner treatment",
      "Hydrating mask",
      "Blowout & style finish",
    ],
    stylists: [
      {
        name: "Maya Chen",
        initials: "MC",
        rating: 4.9,
        experience: 9,
        gradient: ["#8B5CF6", "#22D3EE"],
      },
      {
        name: "Alex Kim",
        initials: "AK",
        rating: 4.7,
        experience: 5,
        gradient: ["#F59E0B", "#EF4444"],
      },
    ],
    testimonials: [
      {
        name: "Sophie T.",
        initials: "ST",
        text: "Maya is an absolute genius with color. My balayage looks completely natural but so much better than anything I've had before.",
        rating: 5,
        date: "May 2025",
      },
      {
        name: "Rachel M.",
        initials: "RM",
        text: "I was nervous about going lighter but the consultation put me completely at ease. The result exceeded my expectations.",
        rating: 5,
        date: "Apr 2025",
      },
    ],
  },
  haircut: {
    id: "haircut",
    name: "Precision Haircut",
    category: "Cut & Style",
    description:
      "Expertly crafted cuts tailored to your face shape and lifestyle.",
    longDescription:
      "A great haircut is the foundation of everything. Our precision stylists analyze your face shape, hair texture, growth patterns, and lifestyle before cutting a single strand. The result: a shape that flatters, moves well, and works with your routine.",
    price: 3500,
    rating: 4.8,
    reviews: 623,
    gradient: ["#8B5CF6", "#22D3EE"],
    benefits: [
      "Face-framing technique customized to you",
      "Works with your natural texture",
      "Styling tips tailored to your routine",
      "Photo-ready finish included",
    ],
    includes: [
      "Consultation & analysis",
      "Shampoo & conditioning",
      "Precision cut",
      "Blowout & finish",
    ],
    stylists: [
      {
        name: "Jordan Rivera",
        initials: "JR",
        rating: 4.8,
        experience: 7,
        gradient: ["#22D3EE", "#10B981"],
      },
      {
        name: "Sam Okafor",
        initials: "SO",
        rating: 4.8,
        experience: 8,
        gradient: ["#10B981", "#22D3EE"],
      },
    ],
    testimonials: [
      {
        name: "James L.",
        initials: "JL",
        text: "Jordan understood exactly what I wanted from a two-sentence description. First time I've left a salon actually happy.",
        rating: 5,
        date: "May 2025",
      },
      {
        name: "Anna K.",
        initials: "AK",
        text: "The best haircut I've had in years. The attention to detail is extraordinary.",
        rating: 5,
        date: "Apr 2025",
      },
    ],
  },
};

const DEFAULT_SERVICE = {
  id: "service",
  name: "Premium Hair Service",
  category: "Hair Care",
  description: "A transformative salon experience tailored just for you.",
  longDescription:
    "Each service at StyleSense is a fully personalized experience. Our stylists use AI-powered insights combined with expert technique to deliver results you'll love.",
  price: 6500,
  duration: 90,
  rating: 4.8,
  reviews: 200,
  gradient: ["#8B5CF6", "#E8B4B8"] as [string, string],
  benefits: [
    "Personalized consultation",
    "Premium products only",
    "Expert technique",
    "Guaranteed satisfaction",
  ],
  includes: ["Consultation", "Treatment", "Finish & style"],
  stylists: [
    {
      name: "Maya Chen",
      initials: "MC",
      rating: 4.9,
      experience: 9,
      gradient: ["#8B5CF6", "#22D3EE"] as [string, string],
    },
  ],
  testimonials: [
    {
      name: "Client",
      initials: "C",
      text: "An incredible experience from start to finish.",
      rating: 5,
      date: "2025",
    },
  ],
};

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const service = SERVICES_DATA[id] ?? { ...DEFAULT_SERVICE, id };

  return (
    <PublicLayout>
      {/* Breadcrumb */}
      <div className="bg-[#141419] border-b border-[#27272A] px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-[#52525B] hover:text-[#F5F5F7] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            All Services
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${service.gradient[0]}18 0%, #0B0B0F 60%)`,
        }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <Badge variant="muted" size="sm" className="mb-4">
              {service.category}
            </Badge>
            <h1 className="text-4xl font-bold text-[#F5F5F7] mb-4">
              {service.name}
            </h1>
            <p className="text-[#A1A1AA] leading-relaxed mb-6">
              {service.longDescription}
            </p>
            <div className="flex items-center gap-5 mb-8 text-sm">
              <div className="flex items-center gap-1.5 text-[#F5F5F7]">
                <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                <span className="font-medium">{service.rating}</span>
                <span className="text-[#52525B]">({service.reviews})</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#A1A1AA]">
                <Clock className="w-4 h-4" />
                {service.duration} min
              </div>
              <div className="flex items-center gap-1.5 text-[#F5F5F7]">
                <span className="font-semibold">
                  LKR {service.price.toLocaleString()}
                </span>
              </div>
            </div>
            <SSButton
              asChild
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              <Link href="/booking">Book this service</Link>
            </SSButton>
          </FadeUp>

          {/* Visual card */}
          <FadeUp delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="h-56 rounded-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]})`,
              }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-5 left-5">
                <Badge
                  variant="muted"
                  className="backdrop-blur-sm bg-black/40 border-white/10 text-white"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Recommended
                </Badge>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#0B0B0F] py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Left — details */}
          <div className="md:col-span-2 space-y-10">
            {/* Benefits */}
            <FadeUp>
              <h2 className="text-xl font-semibold text-[#F5F5F7] mb-5">
                Why you'll love it
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.benefits.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-2.5 p-4 card-3d bg-[#141419] border border-[#27272A] rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#A1A1AA]">{b}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Includes */}
            <FadeUp>
              <h2 className="text-xl font-semibold text-[#F5F5F7] mb-5">
                What's included
              </h2>
              <SSCard className="p-5">
                <ul className="space-y-3">
                  {service.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-[#A1A1AA]"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: service.gradient[0] }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </SSCard>
            </FadeUp>

            {/* Testimonials */}
            <FadeUp>
              <h2 className="text-xl font-semibold text-[#F5F5F7] mb-5">
                Client reviews
              </h2>
              <StaggerContainer className="space-y-4">
                {service.testimonials.map((t, i) => (
                  <StaggerItem key={i}>
                    <SSCard className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-white text-sm font-semibold"
                          style={{
                            background: `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]})`,
                          }}
                        >
                          {t.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#F5F5F7]">
                            {t.name}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {Array.from({ length: t.rating }).map((_, j) => (
                              <Star
                                key={j}
                                className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]"
                              />
                            ))}
                            <span className="text-xs text-[#52525B] ml-1">
                              {t.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Quote className="w-4 h-4 text-[#27272A] mb-1" />
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">
                        {t.text}
                      </p>
                    </SSCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeUp>
          </div>

          {/* Right — sidebar */}
          <div className="space-y-5">
            {/* Book CTA */}
            <FadeUp>
              <SSCard className="p-5 border-[#8B5CF6]/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#52525B]">Starting from</span>
                  <span className="text-2xl font-bold text-[#F5F5F7]">
                    LKR {service.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA] mb-5">
                  <Clock className="w-3.5 h-3.5" />
                  {service.duration} minute appointment
                </div>
                <SSButton
                  asChild
                  variant="primary"
                  size="md"
                  className="w-full"
                  rightIcon={<Calendar className="w-4 h-4" />}
                >
                  <Link href="/booking">Book Now</Link>
                </SSButton>
                <p className="text-xs text-center text-[#52525B] mt-3">
                  Free cancellation up to 24 hours before
                </p>
              </SSCard>
            </FadeUp>

            {/* Stylists */}
            <FadeUp delay={0.1}>
              <SSCard className="p-5">
                <h3 className="text-sm font-medium text-[#F5F5F7] mb-4">
                  Stylists for this service
                </h3>
                <div className="space-y-3">
                  {service.stylists.map((stylist) => (
                    <div key={stylist.name} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-bold"
                        style={{
                          background: `linear-gradient(135deg, ${stylist.gradient[0]}, ${stylist.gradient[1]})`,
                        }}
                      >
                        {stylist.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#F5F5F7]">{stylist.name}</p>
                        <p className="text-xs text-[#52525B]">
                          {stylist.experience}y · ★ {stylist.rating}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SSCard>
            </FadeUp>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
