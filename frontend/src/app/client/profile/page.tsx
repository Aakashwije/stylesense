"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  Camera,
  Check,
  Edit3,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";
import { useState } from "react";

const INITIAL_PROFILE = {
  firstName: "Aakash",
  lastName: "Wijesekara",
  email: "aakash.wijesekara@gmail.com",
  phone: "+94 77 123 4567",
  city: "Colombo",
  country: "Sri Lanka",
  bio: "Beauty enthusiast. Always looking for the next great colour transformation.",
  preferredStyles: ["Balayage", "Bob Cut", "Keratin Treatment"],
};

const ALL_STYLES = [
  "Balayage",
  "Bob Cut",
  "Keratin Treatment",
  "Braids",
  "Highlights",
  "Curly Styling",
  "Updos",
  "Men's Fade",
  "Extensions",
  "Facials",
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof typeof draft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const toggleStyle = (style: string) => {
    setDraft((prev) => ({
      ...prev,
      preferredStyles: prev.preferredStyles.includes(style)
        ? prev.preferredStyles.filter((s) => s !== style)
        : [...prev.preferredStyles, style],
    }));
  };

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const fields = [
    { key: "firstName" as const, label: "First Name", icon: User },
    { key: "lastName" as const, label: "Last Name", icon: User },
    { key: "email" as const, label: "Email", icon: Mail, type: "email" },
    { key: "phone" as const, label: "Phone", icon: Phone, type: "tel" },
    { key: "city" as const, label: "City", icon: MapPin },
    { key: "country" as const, label: "Country", icon: Globe },
  ] as const;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <FadeUp className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">My Profile</h1>
          <p className="text-[#A1A1AA] text-sm">
            Keep your information up to date
          </p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 h-9 rounded-xl bg-[#1C1C22] border border-[#38383F] text-[#A1A1AA] text-sm hover:border-[#8B5CF6]/50 hover:text-[#F5F5F7] transition-all"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        )}
      </FadeUp>

      {/* Success banner */}
      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30">
          <Check className="w-4 h-4 text-[#22C55E]" />
          <span className="text-[#22C55E] text-sm">
            Profile saved successfully!
          </span>
        </div>
      )}

      {/* Avatar */}
      <FadeUp delay={0.06}>
        <SSCard>
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#EC4899] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#1C1C22] border border-[#38383F] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#52525B] transition-all">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h2 className="text-[#F5F5F7] font-semibold text-lg">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-[#71717A] text-sm">{profile.email}</p>
              <p className="text-[#52525B] text-xs mt-0.5">
                {profile.city}, {profile.country}
              </p>
            </div>
          </div>
        </SSCard>
      </FadeUp>

      {/* Personal Info */}
      <FadeUp delay={0.09}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#8B5CF6]" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ key, label, icon: Icon, type }) => (
              <div key={key}>
                <label className="flex text-[#71717A] text-xs mb-1.5 items-center gap-1.5">
                  <Icon className="w-3 h-3" />
                  {label}
                </label>
                {editing ? (
                  <input
                    type={type ?? "text"}
                    value={draft[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full bg-[#1C1C22] border border-[#38383F] focus:border-[#8B5CF6]/50 rounded-xl px-4 h-11 text-sm text-[#F5F5F7] outline-none transition-colors"
                  />
                ) : (
                  <p className="text-[#F5F5F7] text-sm py-2.5 px-4 bg-[#1C1C22] rounded-xl border border-[#38383F]">
                    {profile[key]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="mt-4">
            <label className="block text-[#71717A] text-xs mb-1.5">
              Bio (optional)
            </label>
            {editing ? (
              <textarea
                value={draft.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={2}
                className="w-full bg-[#1C1C22] border border-[#38383F] focus:border-[#8B5CF6]/50 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] outline-none resize-none transition-colors"
              />
            ) : (
              <p className="text-[#F5F5F7] text-sm py-2.5 px-4 bg-[#1C1C22] rounded-xl border border-[#38383F]">
                {profile.bio}
              </p>
            )}
          </div>
        </SSCard>
      </FadeUp>

      {/* Style Preferences */}
      <FadeUp delay={0.12}>
        <SSCard>
          <h2 className="text-[#F5F5F7] font-semibold text-sm mb-1 flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-[#EC4899]" />
            Style Preferences
          </h2>
          <p className="text-[#52525B] text-xs mb-4">
            Select the styles you love — we&apos;ll personalize your experience
          </p>
          <StaggerContainer
            className="flex flex-wrap gap-2"
            staggerDelay={0.04}
          >
            {ALL_STYLES.map((style) => {
              const selected = (
                editing ? draft : profile
              ).preferredStyles.includes(style);
              return (
                <StaggerItem key={style}>
                  <button
                    onClick={() => editing && toggleStyle(style)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      selected
                        ? "bg-[#8B5CF6]/20 border-[#8B5CF6]/60 text-[#8B5CF6]"
                        : "bg-[#1C1C22] border-[#38383F] text-[#71717A]"
                    } ${editing ? "cursor-pointer hover:border-[#8B5CF6]/30" : "cursor-default"}`}
                  >
                    {selected && <Check className="w-3 h-3 inline mr-1" />}
                    {style}
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </SSCard>
      </FadeUp>

      {/* Save / Cancel */}
      {editing && (
        <FadeUp delay={0.14}>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-[#8B5CF6] text-white font-semibold text-sm hover:bg-[#7C3AED] transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 h-11 rounded-xl bg-[#1C1C22] border border-[#38383F] text-[#A1A1AA] text-sm hover:border-[#52525B] transition-colors"
            >
              Cancel
            </button>
          </div>
        </FadeUp>
      )}
    </div>
  );
}
