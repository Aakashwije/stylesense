"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  Bell,
  Calendar,
  ChevronRight,
  Eye,
  Gift,
  Globe,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  Shield,
  Smartphone,
  Star,
  Trash2,
  Volume2,
} from "lucide-react";
import { useState } from "react";

type ToggleProps = { on: boolean; onToggle: () => void; color?: string };
function Toggle({ on, onToggle, color = "#8B5CF6" }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-6 rounded-full transition-all duration-300 shrink-0"
      style={{ background: on ? color : "#3F3F46" }}
      role="switch"
      aria-checked={on}
    >
      <span
        className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
        style={{ transform: on ? "translateX(16px)" : "translateX(0)" }}
      />
    </button>
  );
}

const NOTIF_SETTINGS = [
  {
    key: "bookingReminders",
    label: "Booking Reminders",
    desc: "24h & 2h before each appointment",
    icon: Calendar,
    color: "#8B5CF6",
  },
  {
    key: "promotions",
    label: "Promotions & Offers",
    desc: "Exclusive deals and seasonal discounts",
    icon: Gift,
    color: "#EC4899",
  },
  {
    key: "reviewRequests",
    label: "Review Requests",
    desc: "Prompt after each completed service",
    icon: Star,
    color: "#F59E0B",
  },
  {
    key: "loyaltyUpdates",
    label: "Loyalty Points",
    desc: "When you earn or redeem points",
    icon: Volume2,
    color: "#22D3EE",
  },
  {
    key: "messageAlerts",
    label: "Stylist Messages",
    desc: "Direct messages from your stylists",
    icon: MessageSquare,
    color: "#22C55E",
  },
] as const;

const CHANNEL_SETTINGS = [
  {
    key: "pushNotifications",
    label: "Push Notifications",
    icon: Smartphone,
    color: "#8B5CF6",
  },
  {
    key: "emailNotifications",
    label: "Email Notifications",
    icon: Mail,
    color: "#22D3EE",
  },
  {
    key: "smsNotifications",
    label: "SMS Notifications",
    icon: Bell,
    color: "#F59E0B",
  },
] as const;

const PRIVACY_SETTINGS = [
  {
    key: "profileVisible",
    label: "Public Profile",
    desc: "Allow stylists to view your review history",
    icon: Eye,
  },
  {
    key: "shareActivity",
    label: "Share Activity",
    desc: "Help improve recommendations with your booking data",
    icon: Globe,
  },
  {
    key: "darkMode",
    label: "Dark Mode",
    desc: "Always on for the best StyleSense experience",
    icon: Moon,
  },
] as const;

type NotifKey = (typeof NOTIF_SETTINGS)[number]["key"];
type ChannelKey = (typeof CHANNEL_SETTINGS)[number]["key"];
type PrivacyKey = (typeof PRIVACY_SETTINGS)[number]["key"];

export default function SettingsPage() {
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({
    bookingReminders: true,
    promotions: false,
    reviewRequests: true,
    loyaltyUpdates: true,
    messageAlerts: true,
  });

  const [channels, setChannels] = useState<Record<ChannelKey, boolean>>({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [privacy, setPrivacy] = useState<Record<PrivacyKey, boolean>>({
    profileVisible: true,
    shareActivity: true,
    darkMode: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <FadeUp>
        <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">Settings</h1>
        <p className="text-[#A1A1AA] text-sm">
          Manage your notifications, privacy, and account
        </p>
      </FadeUp>

      {/* Notification Types */}
      <FadeUp delay={0.06}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#8B5CF6]" />
            Notification Preferences
          </h2>
          <div className="space-y-0 divide-y divide-[#27272A]">
            {NOTIF_SETTINGS.map(({ key, label, desc, icon: Icon, color }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}20` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] text-sm font-medium">
                      {label}
                    </p>
                    <p className="text-[#52525B] text-xs">{desc}</p>
                  </div>
                </div>
                <Toggle
                  on={notifs[key]}
                  onToggle={() => setNotifs((p) => ({ ...p, [key]: !p[key] }))}
                  color={color}
                />
              </div>
            ))}
          </div>
        </SSCard>
      </FadeUp>

      {/* Channels */}
      <FadeUp delay={0.09}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#22D3EE]" />
            Notification Channels
          </h2>
          <StaggerContainer
            className="space-y-0 divide-y divide-[#27272A]"
            staggerDelay={0.05}
          >
            {CHANNEL_SETTINGS.map(({ key, label, icon: Icon, color }) => (
              <StaggerItem key={key}>
                <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                    <span className="text-[#F5F5F7] text-sm">{label}</span>
                  </div>
                  <Toggle
                    on={channels[key]}
                    onToggle={() =>
                      setChannels((p) => ({ ...p, [key]: !p[key] }))
                    }
                    color={color}
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SSCard>
      </FadeUp>

      {/* Privacy */}
      <FadeUp delay={0.12}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#22C55E]" />
            Privacy & Preferences
          </h2>
          <div className="space-y-0 divide-y divide-[#27272A]">
            {PRIVACY_SETTINGS.map(({ key, label, desc, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#71717A] shrink-0" />
                  <div>
                    <p className="text-[#F5F5F7] text-sm">{label}</p>
                    <p className="text-[#52525B] text-xs">{desc}</p>
                  </div>
                </div>
                <Toggle
                  on={privacy[key]}
                  onToggle={() => setPrivacy((p) => ({ ...p, [key]: !p[key] }))}
                />
              </div>
            ))}
          </div>
        </SSCard>
      </FadeUp>

      {/* Security */}
      <FadeUp delay={0.14}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#F59E0B]" />
            Security
          </h2>
          <div className="space-y-2">
            {[
              { label: "Change Password", desc: "Last changed 3 months ago" },
              { label: "Two-Factor Authentication", desc: "Not enabled" },
              { label: "Active Sessions", desc: "1 device signed in" },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1C1C22] border border-[#38383F] hover:border-[#52525B] transition-colors text-left"
              >
                <div>
                  <p className="text-[#F5F5F7] text-sm">{item.label}</p>
                  <p className="text-[#52525B] text-xs">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#52525B]" />
              </button>
            ))}
          </div>
        </SSCard>
      </FadeUp>

      {/* Account Actions */}
      <FadeUp delay={0.16}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4">Account</h2>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#1C1C22] border border-[#38383F] hover:border-[#52525B] transition-colors text-left">
              <LogOut className="w-4 h-4 text-[#71717A]" />
              <span className="text-[#F5F5F7] text-sm">Sign Out</span>
            </button>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 hover:border-[#EF4444]/40 transition-colors text-left"
              >
                <Trash2 className="w-4 h-4 text-[#EF4444]" />
                <span className="text-[#EF4444] text-sm">Delete Account</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 space-y-3">
                <p className="text-[#EF4444] text-sm font-semibold">
                  Are you sure?
                </p>
                <p className="text-[#71717A] text-xs leading-relaxed">
                  This will permanently delete your account, all booking
                  history, loyalty points, and saved stylists. This action
                  cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 h-9 rounded-xl bg-[#EF4444] text-white text-xs font-semibold hover:bg-[#DC2626] transition-colors">
                    Yes, delete my account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 h-9 rounded-xl bg-[#1C1C22] border border-[#38383F] text-[#A1A1AA] text-xs hover:border-[#52525B] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </SSCard>
      </FadeUp>

      <FadeUp delay={0.18}>
        <p className="text-center text-[#3F3F46] text-xs">
          StyleSense v1.0.0 · Terms · Privacy
        </p>
      </FadeUp>
    </div>
  );
}
