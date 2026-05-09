"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function SSCard({
  className,
  children,
  hover = false,
  glow = false,
  padding = "md",
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: glow
                ? "0 20px 60px rgba(139,92,246,0.2), 0 0 0 1px rgba(139,92,246,0.15)"
                : "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "card-3d bg-[#141419] border border-[#27272A] rounded-2xl",
        "relative overflow-hidden",
        paddingMap[padding],
        hover && "cursor-pointer",
        glow && "shadow-[0_0_30px_rgba(139,92,246,0.12)]",
        className,
      )}
      onClick={onClick}
    >
      {/* Top-half bright sheen — simulates overhead light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 38%, transparent 62%)",
        }}
      />
      {/* Strong top-left corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 -left-6 h-28 w-28 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Left-edge bright bevel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] rounded-l-2xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)",
        }}
      />
      {/* Top-edge bright bevel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)",
        }}
      />
      {/* Bottom-edge shadow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 rounded-b-2xl"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 100%)",
        }}
      />
      {children}
    </motion.div>
  );
}

export function SSCardGlass({
  className,
  children,
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -3,
              borderColor: "rgba(139,92,246,0.4)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "bg-[#232329]/85 backdrop-blur-sm",
        "border border-[#38383F] rounded-2xl",
        "relative overflow-hidden",
        "shadow-[0_4px_28px_rgba(0,0,0,0.55)]",
        paddingMap[padding],
        hover && "cursor-pointer transition-colors duration-200",
        className,
      )}
    >
      {/* Top-half bright sheen — simulates overhead light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 38%, transparent 62%)",
        }}
      />
      {/* Strong top-left corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 -left-6 h-28 w-28 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Left-edge bright bevel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] rounded-l-2xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)",
        }}
      />
      {/* Top-edge bright bevel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)",
        }}
      />
      {/* Bottom-edge shadow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 rounded-b-2xl"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 100%)",
        }}
      />
      {children}
    </motion.div>
  );
}
