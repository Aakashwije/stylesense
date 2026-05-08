"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { motion } from "framer-motion";
import {
  Crown,
  Flower2,
  Palette,
  Scissors,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "haircut",
    label: "Haircuts",
    icon: Scissors,
    color: "#8B5CF6",
    from: 45,
  },
  {
    id: "coloring",
    label: "Coloring",
    icon: Palette,
    color: "#22D3EE",
    from: 95,
  },
  { id: "bridal", label: "Bridal", icon: Crown, color: "#E8B4B8", from: 299 },
  {
    id: "facial",
    label: "Facials",
    icon: Sparkles,
    color: "#10B981",
    from: 75,
  },
  { id: "spa", label: "Spa", icon: Flower2, color: "#F59E0B", from: 120 },
  { id: "nails", label: "Nails", icon: Star, color: "#EC4899", from: 35 },
  { id: "grooming", label: "Grooming", icon: User, color: "#6366F1", from: 55 },
];

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#141419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <p className="text-[#8B5CF6] text-sm font-medium tracking-wider uppercase mb-4">
            Services
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F7] tracking-tight mb-5">
            Every service, perfected
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto">
            From quick trims to full bridal transformations — we do it all with
            precision.
          </p>
        </FadeUp>

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4"
          staggerDelay={0.06}
        >
          {SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <Link href={`/services/${service.id}`}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-[#1C1C22] border border-[#27272A] rounded-2xl p-5 text-center cursor-pointer hover:border-[#3f3f46] transition-colors duration-200 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${service.color}15`,
                      border: `1px solid ${service.color}28`,
                    }}
                  >
                    <service.icon
                      className="w-5 h-5"
                      style={{ color: service.color }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-[#F5F5F7] font-medium text-sm mb-1">
                    {service.label}
                  </p>
                  <p className="text-[#A1A1AA] text-xs">From ${service.from}</p>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
