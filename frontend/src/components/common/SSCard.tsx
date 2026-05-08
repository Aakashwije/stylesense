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
        "bg-[#1C1C22] border border-[#27272A] rounded-2xl",
        "relative overflow-hidden",
        paddingMap[padding],
        hover && "cursor-pointer",
        glow && "shadow-[0_0_30px_rgba(139,92,246,0.08)]",
        className,
      )}
      onClick={onClick}
    >
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
        "bg-[#1C1C22]/80 backdrop-blur-sm",
        "border border-[#27272A] rounded-2xl",
        "relative overflow-hidden",
        paddingMap[padding],
        hover && "cursor-pointer transition-colors duration-200",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
