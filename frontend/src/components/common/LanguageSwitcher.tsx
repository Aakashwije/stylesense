"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  LANGUAGE_META,
  SUPPORTED_LANGUAGES,
  type Language,
} from "@/lib/i18n/translations";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const current = LANGUAGE_META[lang];

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-[#141419] border border-[#27272A] rounded-xl px-3 h-9 text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#3f3f46] transition-all"
        aria-label={t.language.chooseLanguage}
      >
        <Globe className="w-4 h-4 shrink-0" />
        <span className="text-sm font-medium hidden sm:block">
          {current.native}
        </span>
        <span className="text-sm font-medium sm:hidden">{current.flag}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 z-50 bg-[#141419] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl w-44"
          >
            <div className="px-3 py-2 border-b border-[#27272A]">
              <p className="text-[#52525B] text-[10px] uppercase tracking-wider font-semibold">
                {t.language.chooseLanguage}
              </p>
            </div>
            <div className="py-1">
              {SUPPORTED_LANGUAGES.map((code) => {
                const meta = LANGUAGE_META[code as Language];
                const active = lang === code;
                return (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code as Language);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-[#22D3EE]/10 text-[#22D3EE]"
                        : "text-[#A1A1AA] hover:bg-[#1C1C22] hover:text-[#F5F5F7]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold w-6 text-center text-[#52525B]">
                        {meta.flag}
                      </span>
                      <span>{meta.native}</span>
                    </span>
                    {active && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
