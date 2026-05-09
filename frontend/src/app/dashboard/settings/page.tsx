"use client";

import { motion } from "framer-motion";
import {
  AtSign,
  Camera,
  CreditCard,
  Globe,
  Link2,
  Save,
  Shield,
} from "lucide-react";
import { useState } from "react";

const SECTIONS = [
  "Salon Profile",
  "Opening Hours",
  "Notifications",
  "Payment",
  "Branding",
  "Security",
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultHours: Record<
  string,
  { open: boolean; from: string; to: string }
> = {
  Monday: { open: true, from: "09:00", to: "20:00" },
  Tuesday: { open: true, from: "09:00", to: "20:00" },
  Wednesday: { open: true, from: "09:00", to: "20:00" },
  Thursday: { open: true, from: "09:00", to: "20:00" },
  Friday: { open: true, from: "09:00", to: "21:00" },
  Saturday: { open: true, from: "08:00", to: "21:00" },
  Sunday: { open: false, from: "10:00", to: "18:00" },
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Salon Profile");
  const [hours, setHours] = useState(defaultHours);
  const [notifPrefs, setNotifPrefs] = useState({
    newBooking: true,
    cancellation: true,
    payment: true,
    review: true,
    subscription: true,
    lowSlots: true,
    smsAlerts: false,
    emailDigest: true,
  });

  const toggleHour = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: !prev[day].open },
    }));
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar nav */}
        <div className="lg:w-56 flex-shrink-0">
          <nav className="space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === s
                    ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/20"
                    : "text-[#52525B] hover:text-[#A1A1AA] hover:bg-[#1C1C22]"
                }`}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Salon Profile */}
          {activeSection === "Salon Profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6">
                <p className="text-[#F5F5F7] font-semibold mb-5">
                  Salon Information
                </p>
                {/* Logo upload */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-2xl font-bold relative">
                    S
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1C1C22] border border-[#27272A] flex items-center justify-center">
                      <Camera className="w-3 h-3 text-[#A1A1AA]" />
                    </button>
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] text-sm font-medium">
                      Salon Logo
                    </p>
                    <p className="text-[#52525B] text-xs">
                      JPG or PNG, max 2MB
                    </p>
                    <button className="text-[#8B5CF6] text-xs mt-1 hover:underline">
                      Upload logo
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Salon Name",
                      defaultValue: "Glow & Grace Salon",
                      type: "text",
                    },
                    {
                      label: "Owner Name",
                      defaultValue: "Salon Owner",
                      type: "text",
                    },
                    {
                      label: "Phone",
                      defaultValue: "+94 77 123 4567",
                      type: "tel",
                    },
                    {
                      label: "Email",
                      defaultValue: "owner@glowgrace.lk",
                      type: "email",
                    },
                    { label: "City", defaultValue: "Colombo", type: "text" },
                    { label: "Postal Code", defaultValue: "00300", type: "text" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-[#52525B] text-xs mb-1 block">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        defaultValue={f.defaultValue}
                        className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Full Address
                  </label>
                  <textarea
                    rows={2}
                    defaultValue="No. 45, Galle Road, Kollupitiya, Colombo — 00300"
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2.5 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors resize-none"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-[#52525B] text-xs mb-1 block">
                    About Salon
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Luxury beauty salon offering premium hair, skin and nail services in the heart of Colombo."
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2.5 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Social links */}
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6">
                <p className="text-[#F5F5F7] font-semibold mb-4">
                  Social Media Links
                </p>
                <div className="space-y-3">
                  {[
                    {
                      label: "Instagram",
                      icon: AtSign,
                      placeholder: "@glowgrace_salon",
                      color: "#E8B4B8",
                    },
                    {
                      label: "Website",
                      icon: Globe,
                      placeholder: "https://glowgrace.lk",
                      color: "#22D3EE",
                    },
                    {
                      label: "Facebook",
                      icon: Link2,
                      placeholder: "facebook.com/glowgrace",
                      color: "#3B82F6",
                    },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${s.color}15` }}
                      >
                        <s.icon
                          className="w-4 h-4"
                          style={{ color: s.color }}
                        />
                      </div>
                      <input
                        placeholder={s.placeholder}
                        className="flex-1 bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9 text-sm text-[#F5F5F7] placeholder:text-[#3f3f46] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </motion.div>
          )}

          {/* Opening Hours */}
          {activeSection === "Opening Hours" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6">
                <p className="text-[#F5F5F7] font-semibold mb-5">
                  Weekly Opening Hours
                </p>
                <div className="space-y-3">
                  {DAYS.map((day) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-28 flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleHour(day)}
                          className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${hours[day].open ? "bg-[#8B5CF6]" : "bg-[#27272A]"}`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${hours[day].open ? "translate-x-[18px]" : "translate-x-0.5"}`}
                          />
                        </button>
                        <span
                          className={`text-sm font-medium ${hours[day].open ? "text-[#F5F5F7]" : "text-[#52525B]"}`}
                        >
                          {day.slice(0, 3)}
                        </span>
                      </div>
                      {hours[day].open ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            defaultValue={hours[day].from}
                            className="bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                          />
                          <span className="text-[#52525B] text-sm">to</span>
                          <input
                            type="time"
                            defaultValue={hours[day].to}
                            className="bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-9 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                          />
                        </div>
                      ) : (
                        <span className="text-[#52525B] text-sm">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                  <Save className="w-4 h-4" />
                  Save Hours
                </button>
              </div>
            </motion.div>
          )}

          {/* Notifications */}
          {activeSection === "Notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6">
                <p className="text-[#F5F5F7] font-semibold mb-5">
                  Notification Preferences
                </p>
                <div className="space-y-4">
                  {[
                    {
                      key: "newBooking",
                      label: "New Bookings",
                      desc: "Alert when a customer places a booking",
                    },
                    {
                      key: "cancellation",
                      label: "Cancellations",
                      desc: "Alert when a booking is cancelled",
                    },
                    {
                      key: "payment",
                      label: "Payments",
                      desc: "Confirm when payment is received",
                    },
                    {
                      key: "review",
                      label: "New Reviews",
                      desc: "Alert when a customer leaves a review",
                    },
                    {
                      key: "subscription",
                      label: "Subscription Alerts",
                      desc: "Renewal reminders and billing notifications",
                    },
                    {
                      key: "lowSlots",
                      label: "Low Availability Warnings",
                      desc: "Alert when slots are almost full",
                    },
                    {
                      key: "smsAlerts",
                      label: "SMS Alerts",
                      desc: "Send notifications via SMS (charges may apply)",
                    },
                    {
                      key: "emailDigest",
                      label: "Daily Email Digest",
                      desc: "Summary of the day's activity at 9 PM",
                    },
                  ].map((n) => (
                    <div
                      key={n.key}
                      className="flex items-center justify-between py-3 border-b border-[#27272A]/50 last:border-0"
                    >
                      <div>
                        <p className="text-[#F5F5F7] text-sm font-medium">
                          {n.label}
                        </p>
                        <p className="text-[#52525B] text-xs">{n.desc}</p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifPrefs((p) => ({
                            ...p,
                            [n.key]: !p[n.key as keyof typeof p],
                          }))
                        }
                        className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${notifPrefs[n.key as keyof typeof notifPrefs] ? "bg-[#8B5CF6]" : "bg-[#27272A]"}`}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${notifPrefs[n.key as keyof typeof notifPrefs] ? "translate-x-[22px]" : "translate-x-0.5"}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Payment Settings */}
          {activeSection === "Payment" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6">
                <p className="text-[#F5F5F7] font-semibold mb-1">
                  Payment Method
                </p>
                <p className="text-[#52525B] text-xs mb-5">
                  Used for subscription billing
                </p>
                <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl p-4 flex items-center gap-4 mb-4">
                  <CreditCard className="w-8 h-8 text-[#8B5CF6]" />
                  <div>
                    <p className="text-[#F5F5F7] text-sm font-medium">
                      Visa ending in 4242
                    </p>
                    <p className="text-[#52525B] text-xs">Expires 08/2027</p>
                  </div>
                  <span className="ml-auto text-[10px] bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full font-semibold">
                    Default
                  </span>
                </div>
                <button className="text-sm text-[#8B5CF6] hover:underline">
                  + Add new payment method
                </button>
              </div>
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6">
                <p className="text-[#F5F5F7] font-semibold mb-4">
                  UPI / Bank Details (for payouts)
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      UPI ID
                    </label>
                    <input
                      defaultValue="glowgrace@dialog"
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      Account Holder Name
                    </label>
                    <input
                      defaultValue="Glow & Grace Salon"
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    />
                  </div>
                </div>
                <button className="flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                  <Save className="w-4 h-4" />
                  Save Payment Info
                </button>
              </div>
            </motion.div>
          )}

          {/* Branding */}
          {activeSection === "Branding" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6">
                <p className="text-[#F5F5F7] font-semibold mb-2">
                  Branding Customization
                </p>
                <p className="text-[#52525B] text-xs mb-5">
                  Customize how your salon appears to customers
                </p>
                <div className="space-y-5">
                  <div>
                    <label className="text-[#52525B] text-xs mb-2 block">
                      Primary Color
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        "#8B5CF6",
                        "#22D3EE",
                        "#10B981",
                        "#F59E0B",
                        "#EF4444",
                        "#E8B4B8",
                      ].map((c) => (
                        <button
                          key={c}
                          className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white/30 transition-colors"
                          style={{ background: c }}
                        />
                      ))}
                      <input
                        type="color"
                        className="w-8 h-8 rounded-full cursor-pointer bg-transparent border border-[#27272A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      Booking Page Tagline
                    </label>
                    <input
                      defaultValue="Beauty is not a look, it's a feeling."
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    />
                  </div>
                </div>
                <button className="flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                  <Save className="w-4 h-4" />
                  Save Branding
                </button>
              </div>
            </motion.div>
          )}

          {/* Security */}
          {activeSection === "Security" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6 space-y-4">
                <p className="text-[#F5F5F7] font-semibold">
                  Security Settings
                </p>
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 h-10 text-sm text-[#F5F5F7] outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors">
                  <Shield className="w-4 h-4" />
                  Update Password
                </button>
                <div className="pt-4 border-t border-[#27272A]">
                  <p className="text-[#F5F5F7] text-sm font-medium mb-1">
                    Two-Factor Authentication
                  </p>
                  <p className="text-[#52525B] text-xs mb-3">
                    Secure your account with OTP verification on login.
                  </p>
                  <button className="px-4 py-2 rounded-xl bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] text-sm hover:text-[#F5F5F7] transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
