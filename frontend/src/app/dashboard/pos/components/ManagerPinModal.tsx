"use client";

import { motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import { useRef, useState } from "react";
import { MANAGER_PIN } from "../data";

interface Props {
  title?: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function ManagerPinModal({
  title = "Manager Approval Required",
  onSuccess,
  onClose,
}: Props) {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState("");
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (idx: number, val: string) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = v;
    setDigits(next);
    setError("");
    if (v && idx < 3) refs[idx + 1].current?.focus();
    if (next.every((d) => d !== "") && next.join("").length === 4) {
      setTimeout(() => {
        if (next.join("") === MANAGER_PIN) {
          onSuccess();
        } else {
          setError("Incorrect PIN. Try again.");
          setDigits(["", "", "", ""]);
          refs[0].current?.focus();
        }
      }, 100);
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-xs p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <h3 className="text-[#F5F5F7] font-semibold text-sm">{title}</h3>
          </div>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        <p className="text-[#52525B] text-xs text-center mb-5">
          Enter the 4-digit manager PIN to proceed
        </p>

        <div className="flex gap-3 justify-center mb-4">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
              className="w-12 h-12 rounded-xl border border-[#27272A] bg-[#1C1C22] text-[#F5F5F7] text-xl text-center outline-none focus:border-[#F59E0B]/60 transition-colors"
            />
          ))}
        </div>

        {error && (
          <p className="text-[#EF4444] text-xs text-center mb-3">{error}</p>
        )}

        <p className="text-[#3f3f46] text-[10px] text-center">Demo PIN: 1234</p>
      </motion.div>
    </div>
  );
}
