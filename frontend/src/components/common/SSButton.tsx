"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface SSButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode | false;
  rightIcon?: React.ReactNode | false;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#8B5CF6] text-white border border-[#8B5CF6]",
    "hover:bg-[#7C3AED] hover:border-[#7C3AED]",
    "shadow-[0_0_20px_rgba(139,92,246,0.3)]",
    "hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]",
  ].join(" "),
  secondary: [
    "bg-[#1C1C22] text-[#F5F5F7] border border-[#27272A]",
    "hover:bg-[#27272A] hover:border-[#3f3f46]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[#A1A1AA] border border-transparent",
    "hover:bg-[#1C1C22] hover:text-[#F5F5F7]",
  ].join(" "),
  outline: [
    "bg-transparent text-[#F5F5F7] border border-[#27272A]",
    "hover:border-[#8B5CF6] hover:text-[#8B5CF6]",
  ].join(" "),
  danger: [
    "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30",
    "hover:bg-[#EF4444]/20 hover:border-[#EF4444]/50",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-sm gap-2.5 rounded-xl",
  xl: "h-14 px-8 text-base gap-3 rounded-2xl",
};

export const SSButton = forwardRef<HTMLButtonElement | null, SSButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const buttonClass = cn(
      "inline-flex items-center justify-center font-medium",
      "transition-all duration-200 cursor-pointer",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0F]",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className,
    );

    const content = (
      <>
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </>
    );

    if (asChild) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(buttonClass, child.props?.className),
      });
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={buttonClass}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </motion.button>
    );
  },
);

SSButton.displayName = "SSButton";
