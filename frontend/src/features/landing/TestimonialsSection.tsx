"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import { getInitials } from "@/lib/utils";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ishara Perera",
    role: "Bride",
    rating: 5,
    text: "The AI recommendation was spot on. It suggested a style I'd never considered and I absolutely loved it on my wedding day. The booking experience was so easy.",
    service: "Bridal Package",
  },
  {
    name: "Dinesh Rajapaksa",
    role: "Creative Director",
    rating: 5,
    text: "As someone who's very particular about his hair, StyleSense AI is a game changer. The virtual try-on feature saved me from a bad decision and helped me find my perfect look.",
    service: "Hair Coloring",
  },
  {
    name: "Sanduni Wickramasinghe",
    role: "Fashion Blogger",
    rating: 5,
    text: "Finally a platform built for us. StyleSense AI gives you a premium, personalised experience that feels like you have your own beauty consultant right here in Colombo.",
    service: "Hair Treatment",
  },
  {
    name: "Tharushi De Silva",
    role: "Entrepreneur",
    rating: 5,
    text: "The loyalty program is genuinely rewarding. I've earned enough points for a full spa day just from my regular visits. The app is beautiful and so easy to use.",
    service: "Facial & Spa",
  },
  {
    name: "Kasun Jayawardena",
    role: "Photographer",
    rating: 5,
    text: "My stylist knows exactly what I want based on my AI profile. It's like having a personal stylist who remembers everything. No more awkward salon conversations.",
    service: "Grooming Package",
  },
  {
    name: "Nethmi Fernando",
    role: "Interior Designer",
    rating: 5,
    text: "The beauty reports feature is incredible. I can track my hair health over time and see how treatments are working. This is exactly what Sri Lankan salons have been missing.",
    service: "Hair Analysis",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#141419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-[#8B5CF6] text-sm font-medium tracking-wider uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F5F7] tracking-tight mb-5">
            Loved by thousands
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto">
            Real experiences from our community of beauty enthusiasts.
          </p>
        </FadeUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerDelay={0.07}
        >
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <SSCard hover className="h-full flex flex-col">
                <Quote
                  className="w-7 h-7 text-[#8B5CF6] opacity-50 mb-4"
                  strokeWidth={1.5}
                />
                <p className="text-[#A1A1AA] text-sm leading-relaxed flex-1 mb-5">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-xs font-bold">
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {t.name}
                      </p>
                      <p className="text-[#A1A1AA] text-xs">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StarRating rating={t.rating} />
                    <span className="text-[#A1A1AA] text-[10px]">
                      {t.service}
                    </span>
                  </div>
                </div>
              </SSCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
