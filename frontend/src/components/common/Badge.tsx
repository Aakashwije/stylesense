"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "cyan" | "rose" | "green" | "yellow" | "red" | "muted";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const variantStyles = {
  purple: "bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/25",
  cyan: "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/25",
  rose: "bg-[#E8B4B8]/15 text-[#E8B4B8] border-[#E8B4B8]/25",
  green: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25",
  yellow: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25",
  red: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/25",
  muted: "bg-[#27272A] text-[#A1A1AA] border-[#27272A]",
};

const sizeStyles = {
  sm: "text-[10px] px-2 py-0.5 gap-1 rounded-md",
  md: "text-xs px-2.5 py-1 gap-1.5 rounded-lg",
};

const dotColors = {
  purple: "bg-[#8B5CF6]",
  cyan: "bg-[#22D3EE]",
  rose: "bg-[#E8B4B8]",
  green: "bg-[#10B981]",
  yellow: "bg-[#F59E0B]",
  red: "bg-[#EF4444]",
  muted: "bg-[#A1A1AA]",
};

export function Badge({
  children,
  variant = "purple",
  size = "md",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}
