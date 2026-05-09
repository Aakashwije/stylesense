"use client";

import { motion } from "framer-motion";
import {
  AtSign,
  Award,
  Camera,
  Clock,
  Edit2,
  Globe,
  MapPin,
  Phone,
  Save,
  Scissors,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const SPECIALTIES = [
  "Balayage",
  "Keratin Treatment",
  "Colour Correction",
  "Curtain Bangs",
  "Wolf Cut",
  "Highlights",
];

const CERTIFICATIONS = [
  { name: "Wella Colour Expert", year: "2023", issuer: "Wella Professionals" },
  { name: "Redken Certified Colourist", year: "2022", issuer: "Redken" },
  {
    name: "Keratin Treatment Specialist",
    year: "2022",
    issuer: "Brazilian Blowout",
  },
  {
    name: "Trichology Diploma",
    year: "2021",
    issuer: "International Trichology Institute",
  },
];

const RECENT_REVIEWS = [
  {
    client: "Dilhani Perera",
    rating: 5,
    comment:
      "Shenali did an amazing balayage — exactly what I wanted! Super gentle and very detailed.",
    date: "20 Jan 2025",
  },
  {
    client: "Sanduni Fernando",
    rating: 5,
    comment:
      "My hair looks incredible. She really listened to what I wanted and delivered perfectly.",
    date: "18 Jan 2025",
  },
  {
    client: "Malsha Bandara",
    rating: 5,
    comment:
      "Best keratin treatment I've ever had. My hair is so smooth — even in Colombo's humidity!",
    date: "15 Jan 2025",
  },
];

const PERFORMANCE = [
  { label: "Total Clients", value: "312", icon: Users, color: "#22D3EE" },
  { label: "Avg Rating", value: "4.9★", icon: Star, color: "#F59E0B" },
  { label: "Repeat Rate", value: "78%", icon: TrendingUp, color: "#10B981" },
  { label: "Avg Session", value: "1h 42m", icon: Clock, color: "#8B5CF6" },
  {
    label: "Tips (Month)",
    value: "LKR 12,400",
    icon: Wallet,
    color: "#22D3EE",
  },
  { label: "Specialties", value: "6", icon: Scissors, color: "#E8B4B8" },
];

export default function StylistProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Shenali Rodrigo",
    title: "Senior Hair Stylist",
    phone: "+94 77 123 4567",
    email: "shenali.r@glamourstudio.lk",
    location: "Colombo 03, Sri Lanka",
    instagram: "@shenali.styles",
    website: "shenali.glamourstudio.lk",
    bio: "Passionate senior hair stylist with 7+ years of experience in colour, keratin treatments, and precision cuts. Specialising in balayage, highlights, and hair health consultation. Trained in Sri Lanka and Singapore.",
    yearsExp: "7",
    salon: "Glamour Studio",
  });
  const [editDraft, setEditDraft] = useState({ ...profile });

  const saveProfile = () => {
    setProfile({ ...editDraft });
    setEditing(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Profile card */}
      <motion.div {...fadeUp(0)}>
        <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-[#22D3EE]/20 via-[#8B5CF6]/15 to-[#22D3EE]/10 relative">
            <div className="absolute inset-0 flex items-end px-6 pb-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] border-4 border-[#141419] flex items-center justify-center text-white text-3xl font-bold translate-y-10 flex-shrink-0">
                SR
              </div>
            </div>
          </div>

          <div className="pt-12 px-6 pb-6">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-[#F5F5F7] text-xl font-bold">
                  {profile.name}
                </h2>
                <p className="text-[#22D3EE] text-sm font-medium">
                  {profile.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3 h-3 text-[#52525B]" />
                  <span className="text-[#52525B] text-xs">
                    {profile.salon} · {profile.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => (editing ? saveProfile() : setEditing(true))}
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${
                  editing
                    ? "bg-[#22D3EE] text-[#0B0B0F] hover:bg-[#22D3EE]/90"
                    : "bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] hover:border-[#3f3f46] hover:text-[#F5F5F7]"
                }`}
              >
                {editing ? (
                  <>
                    <Save className="w-4 h-4" /> Save
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </>
                )}
              </button>
            </div>

            {editing ? (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: "name", label: "Full Name" },
                  { key: "title", label: "Job Title" },
                  { key: "phone", label: "Phone" },
                  { key: "email", label: "Email" },
                  { key: "location", label: "Location" },
                  { key: "instagram", label: "Instagram" },
                  { key: "website", label: "Website" },
                  { key: "yearsExp", label: "Years of Experience" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[#52525B] text-xs mb-1 block">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={editDraft[field.key as keyof typeof editDraft]}
                      onChange={(e) =>
                        setEditDraft((p) => ({
                          ...p,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 transition-colors"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-[#52525B] text-xs mb-1 block">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    value={editDraft.bio}
                    onChange={(e) =>
                      setEditDraft((p) => ({ ...p, bio: e.target.value }))
                    }
                    className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 text-sm text-[#F5F5F7] outline-none focus:border-[#22D3EE]/50 transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={() => setEditing(false)}
                  className="sm:col-span-2 text-center text-[#52525B] text-xs hover:text-[#A1A1AA] transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                    <Phone className="w-3 h-3 text-[#52525B]" />
                    {profile.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                    <AtSign className="w-3 h-3 text-[#52525B]" />
                    {profile.instagram}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                    <Globe className="w-3 h-3 text-[#52525B]" />
                    {profile.website}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                    <Scissors className="w-3 h-3 text-[#52525B]" />
                    {profile.yearsExp} years experience
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex gap-1.5 flex-wrap">
                  {SPECIALTIES.map((s) => (
                    <span
                      key={s}
                      className="bg-[#22D3EE]/8 border border-[#22D3EE]/20 text-[#22D3EE] text-[11px] px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Photo placeholder */}
                <button className="flex items-center gap-2 text-[#52525B] text-xs hover:text-[#22D3EE] transition-colors border border-[#27272A] rounded-xl px-3 py-2 hover:border-[#22D3EE]/30">
                  <Camera className="w-3.5 h-3.5" /> Update profile photo
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Performance stats */}
      <motion.div {...fadeUp(0.1)}>
        <h3 className="text-[#F5F5F7] font-semibold text-sm mb-3">
          Performance Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PERFORMANCE.map((p, i) => (
            <motion.div key={p.label} {...fadeUp(0.05 * i)}>
              <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-4 text-center hover:border-[#3f3f46] transition-colors">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${p.color}15` }}
                >
                  <p.icon
                    className="w-4 h-4"
                    style={{ color: p.color }}
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-[#F5F5F7] font-bold text-sm">{p.value}</p>
                <p className="text-[#52525B] text-[10px] mt-0.5">{p.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certifications */}
        <motion.div {...fadeUp(0.2)}>
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2.5 p-5 border-b border-[#27272A]">
              <Award className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.75} />
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                Certifications
              </h3>
            </div>
            <div className="divide-y divide-[#27272A]">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#1C1C22] transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                    <Award
                      className="w-4 h-4 text-[#F59E0B]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F5F5F7] text-sm font-medium">
                      {cert.name}
                    </p>
                    <p className="text-[#52525B] text-xs">{cert.issuer}</p>
                  </div>
                  <span className="text-[#52525B] text-xs flex-shrink-0">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent reviews */}
        <motion.div {...fadeUp(0.25)}>
          <div className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2.5 p-5 border-b border-[#27272A]">
              <Star className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                Recent Reviews
              </h3>
              <span className="ml-auto text-[#22D3EE] text-xs font-semibold">
                4.9 avg
              </span>
            </div>
            <div className="divide-y divide-[#27272A]">
              {RECENT_REVIEWS.map((review) => (
                <div
                  key={review.client}
                  className="px-5 py-4 hover:bg-[#1C1C22] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[#F5F5F7] text-sm font-medium">
                      {review.client}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed">
                    {review.comment}
                  </p>
                  <p className="text-[#52525B] text-[10px] mt-1.5">
                    {review.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
