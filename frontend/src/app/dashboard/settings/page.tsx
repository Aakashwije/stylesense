"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Camera,
  Check,
  CreditCard,
  Eye,
  EyeOff,
  Moon,
  Palette,
  Shield,
  Sun,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const NOTIFICATION_PREFS = [
  {
    id: "booking_reminders",
    label: "Booking reminders",
    description: "Get notified 24h before your appointment",
  },
  {
    id: "ai_ready",
    label: "AI analysis ready",
    description: "When your hair analysis or style is complete",
  },
  {
    id: "offers",
    label: "Promotions & offers",
    description: "Exclusive deals and limited-time discounts",
  },
  {
    id: "loyalty",
    label: "Loyalty milestones",
    description: "When you earn or reach a new tier",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_PREFS.map((n) => [n.id, true])),
  );
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showPhone, setShowPhone] = useState(false);

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleNotif = (id: string) =>
    setNotifPrefs((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="p-8">
      <FadeUp className="mb-8">
        <h1 className="text-2xl font-bold text-[#F5F5F7]">Settings</h1>
        <p className="text-[#A1A1AA] mt-1">
          Manage your account, preferences, and privacy.
        </p>
      </FadeUp>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar nav */}
        <FadeUp>
          <nav className="space-y-1">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    activeSection === s.id
                      ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20"
                      : "text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-[#1C1C22]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                  {activeSection === s.id && (
                    <motion.div
                      layoutId="settings-active"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </FadeUp>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {/* ── Profile ── */}
            {activeSection === "profile" && (
              <div className="space-y-6">
                <SSCard className="p-6">
                  <h2 className="text-base font-semibold text-[#F5F5F7] mb-5">
                    Personal information
                  </h2>
                  {/* Avatar */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-xl font-bold">
                        AK
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1C1C22] border border-[#27272A] flex items-center justify-center">
                        <Camera className="w-3 h-3 text-[#A1A1AA]" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium text-[#F5F5F7]">Aakash Kumar</p>
                      <p className="text-sm text-[#52525B]">Premium member</p>
                    </div>
                  </div>
                  {/* Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "First name", value: "Aakash", type: "text" },
                      { label: "Last name", value: "Kumar", type: "text" },
                      {
                        label: "Email",
                        value: "aakash@example.com",
                        type: "email",
                      },
                    ].map((f) => (
                      <div key={f.label} className="space-y-1.5">
                        <label className="text-xs font-medium text-[#A1A1AA]">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          defaultValue={f.value}
                          className="w-full bg-[#141419] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#8B5CF6] transition-all"
                        />
                      </div>
                    ))}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#A1A1AA]">
                        Phone
                      </label>
                      <div className="relative">
                        <input
                          type={showPhone ? "text" : "password"}
                          defaultValue="+1 (555) 123-4567"
                          className="w-full bg-[#141419] border border-[#27272A] rounded-xl pl-4 pr-10 py-2.5 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#8B5CF6] transition-all"
                        />
                        <button
                          onClick={() => setShowPhone(!showPhone)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-[#A1A1AA] transition-colors"
                        >
                          {showPhone ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <SSButton
                      variant="primary"
                      size="sm"
                      onClick={handleSave}
                      leftIcon={
                        saved ? <Check className="w-4 h-4" /> : undefined
                      }
                    >
                      {saved ? "Saved!" : "Save changes"}
                    </SSButton>
                  </div>
                </SSCard>

                {/* Danger zone */}
                <SSCard className="p-6 border-[#EF4444]/20">
                  <h2 className="text-base font-semibold text-[#EF4444] mb-1">
                    Danger zone
                  </h2>
                  <p className="text-xs text-[#52525B] mb-4">
                    Permanently delete your account and all associated data.
                  </p>
                  <SSButton
                    variant="danger"
                    size="sm"
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Delete account
                  </SSButton>
                </SSCard>
              </div>
            )}

            {/* ── Notifications ── */}
            {activeSection === "notifications" && (
              <SSCard className="p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#F5F5F7]">
                  Notification preferences
                </h2>
                {NOTIFICATION_PREFS.map((pref) => (
                  <div
                    key={pref.id}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#F5F5F7]">
                        {pref.label}
                      </p>
                      <p className="text-xs text-[#52525B] mt-0.5">
                        {pref.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotif(pref.id)}
                      className={`relative w-10 h-5.5 rounded-full transition-colors shrink-0 ${
                        notifPrefs[pref.id] ? "bg-[#8B5CF6]" : "bg-[#27272A]"
                      }`}
                      style={{ height: 22, minWidth: 40 }}
                    >
                      <motion.div
                        animate={{ x: notifPrefs[pref.id] ? 18 : 2 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                      />
                    </button>
                  </div>
                ))}
              </SSCard>
            )}

            {/* ── Privacy ── */}
            {activeSection === "privacy" && (
              <div className="space-y-4">
                <SSCard className="p-6">
                  <h2 className="text-base font-semibold text-[#F5F5F7] mb-4">
                    Security
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Two-factor authentication",
                        status: "Disabled",
                        action: "Enable",
                        color: "text-[#EF4444]",
                      },
                      {
                        label: "Active sessions",
                        status: "1 device",
                        action: "Manage",
                        color: "text-[#A1A1AA]",
                      },
                      {
                        label: "Password",
                        status: "Last changed 60 days ago",
                        action: "Change",
                        color: "text-[#A1A1AA]",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-3 border-b border-[#27272A] last:border-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#F5F5F7]">
                            {item.label}
                          </p>
                          <p className={`text-xs mt-0.5 ${item.color}`}>
                            {item.status}
                          </p>
                        </div>
                        <SSButton variant="outline" size="sm">
                          {item.action}
                        </SSButton>
                      </div>
                    ))}
                  </div>
                </SSCard>
              </div>
            )}

            {/* ── Billing ── */}
            {activeSection === "billing" && (
              <SSCard className="p-6 space-y-6">
                <h2 className="text-base font-semibold text-[#F5F5F7]">
                  Payment methods
                </h2>
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 rounded-md bg-[#141419] border border-[#27272A] flex items-center justify-center text-xs font-bold text-[#F5F5F7]">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#F5F5F7]">
                        Visa ending 4242
                      </p>
                      <p className="text-xs text-[#52525B]">Expires 08/28</p>
                    </div>
                  </div>
                  <Badge variant="green" size="sm">
                    Default
                  </Badge>
                </div>
                <SSButton variant="outline" size="sm" className="w-full">
                  + Add payment method
                </SSButton>
              </SSCard>
            )}

            {/* ── Appearance ── */}
            {activeSection === "appearance" && (
              <SSCard className="p-6 space-y-6">
                <h2 className="text-base font-semibold text-[#F5F5F7]">
                  Appearance
                </h2>
                <div>
                  <p className="text-sm text-[#A1A1AA] mb-3">Theme</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(["dark", "light"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                          theme === t
                            ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6]"
                            : "border-[#27272A] text-[#A1A1AA] hover:text-[#F5F5F7]"
                        }`}
                      >
                        {t === "dark" ? (
                          <Moon className="w-4 h-4" />
                        ) : (
                          <Sun className="w-4 h-4" />
                        )}
                        {t} mode
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[#52525B] mt-2">
                    Note: StyleSense is designed for dark mode.
                  </p>
                </div>
              </SSCard>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
