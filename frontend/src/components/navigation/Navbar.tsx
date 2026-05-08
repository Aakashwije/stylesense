"use client";

import { SSButton } from "@/components/common/SSButton";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0B0B0F]/90 backdrop-blur-xl border-b border-[#27272A]/70 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-[#8B5CF6] rounded-lg blur-sm opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="relative w-8 h-8 bg-[#8B5CF6] rounded-lg flex items-center justify-center">
                  <Sparkles
                    className="w-4.5 h-4.5 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <span className="text-[#F5F5F7] font-semibold text-lg tracking-tight">
                StyleSense <span className="text-gradient-purple">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200",
                      isActive
                        ? "text-[#F5F5F7]"
                        : "text-[#A1A1AA] hover:text-[#F5F5F7]",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-[#1C1C22] border border-[#27272A] rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors duration-200 px-3 py-2"
              >
                Sign in
              </Link>
              <SSButton size="md" variant="primary" asChild>
                <Link href="/booking">Book Now</Link>
              </SSButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0B0B0F]/98 backdrop-blur-xl border-b border-[#27272A] overflow-hidden lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200",
                      pathname === link.href
                        ? "bg-[#1C1C22] text-[#F5F5F7] border border-[#27272A]"
                        : "text-[#A1A1AA] hover:bg-[#141419] hover:text-[#F5F5F7]",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 pb-2 flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  className="block px-4 py-3 text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F7] rounded-xl hover:bg-[#141419] transition-colors"
                >
                  Sign in
                </Link>
                <SSButton size="lg" variant="primary" fullWidth asChild>
                  <Link href="/booking">Book Now</Link>
                </SSButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
