"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { Globe, Music, Sparkles } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Services", href: "/services" },
    { label: "Stylists", href: "/stylists" },
    { label: "Book Now", href: "/booking" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  "AI Features": [
    { label: "Hair Analysis", href: "/ai/analysis" },
    { label: "Virtual Try-On", href: "/ai/virtual-tryon" },
    { label: "AI Chatbot", href: "/ai/chatbot" },
    { label: "AI Demo", href: "/ai-demo" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0B0B0F] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <FadeUp>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 group mb-5"
              >
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-[#8B5CF6] rounded-lg blur-sm opacity-60" />
                  <div className="relative w-8 h-8 bg-[#8B5CF6] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-[#F5F5F7] font-semibold text-lg">
                  StyleSense <span className="text-gradient-purple">AI</span>
                </span>
              </Link>
              <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-xs">
                The future of beauty is intelligent. AI-powered salon
                experiences that understand you.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {[Globe, Music].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-xl bg-[#1C1C22] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <FadeUp key={category} delay={i * 0.05}>
              <h4 className="text-[#F5F5F7] font-medium text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#A1A1AA] text-sm hover:text-[#F5F5F7] transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1AA] text-sm">
            © {new Date().getFullYear()} StyleSense AI. All rights reserved.
          </p>
          <p className="text-[#A1A1AA] text-sm">
            Crafted with precision for the beauty industry.
          </p>
        </div>
      </div>
    </footer>
  );
}
