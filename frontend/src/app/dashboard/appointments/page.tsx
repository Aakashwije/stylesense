"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { SSCard } from "@/components/common/SSCard";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Scissors,
  Search,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";

const APPOINTMENTS = [
  {
    id: "1",
    service: "Balayage + Gloss Treatment",
    stylist: "Kasun Perera",
    date: "2026-05-15",
    time: "10:30 AM",
    duration: 180,
    price: 220,
    status: "upcoming" as const,
    location: "StyleSense — Downtown",
    image: "MC",
  },
  {
    id: "2",
    service: "Precision Haircut + Blowout",
    stylist: "Jordan Rivera",
    date: "2026-04-28",
    time: "2:00 PM",
    duration: 75,
    price: 85,
    status: "completed" as const,
    location: "StyleSense — Midtown",
    image: "JR",
    rating: 5,
  },
  {
    id: "3",
    service: "Hydration Facial",
    stylist: "Shenali Rodrigo",
    date: "2026-04-10",
    time: "11:00 AM",
    duration: 60,
    price: 110,
    status: "completed" as const,
    location: "StyleSense — Downtown",
    image: "PS",
    rating: 4,
  },
  {
    id: "4",
    service: "Root Touch-Up",
    stylist: "Alex Kim",
    date: "2026-03-22",
    time: "3:30 PM",
    duration: 90,
    price: 95,
    status: "completed" as const,
    location: "StyleSense — Uptown",
    image: "AK",
    rating: 5,
  },
  {
    id: "5",
    service: "Scalp Treatment + Massage",
    stylist: "Kasun Perera",
    date: "2026-03-05",
    time: "9:00 AM",
    duration: 45,
    price: 65,
    status: "cancelled" as const,
    location: "StyleSense — Downtown",
    image: "MC",
  },
];

type FilterStatus = "all" | "upcoming" | "completed" | "cancelled";

export default function AppointmentsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingModal, setRatingModal] = useState<string | null>(null);
  const [pendingRating, setPendingRating] = useState(0);

  const filtered = APPOINTMENTS.filter((a) => {
    const matchesStatus = filterStatus === "all" || a.status === filterStatus;
    const matchesSearch =
      a.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.stylist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusColors: Record<string, "green" | "muted" | "red"> = {
    upcoming: "green",
    completed: "muted",
    cancelled: "red",
  };

  const upcoming = APPOINTMENTS.filter((a) => a.status === "upcoming").length;
  const completed = APPOINTMENTS.filter((a) => a.status === "completed").length;
  const totalSpend = APPOINTMENTS.filter(
    (a) => a.status === "completed",
  ).reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <FadeUp>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F5F7]">Appointments</h1>
            <p className="text-[#A1A1AA] mt-1">
              Track your booking history and upcoming sessions.
            </p>
          </div>
          <SSButton
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => (window.location.href = "/booking")}
          >
            Book new
          </SSButton>
        </div>
      </FadeUp>

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-3 gap-4">
        {[
          { label: "Upcoming", value: upcoming, color: "text-[#10B981]" },
          { label: "Completed", value: completed, color: "text-[#8B5CF6]" },
          {
            label: "Total Spent",
            value: `LKR ${totalSpend.toLocaleString()}`,
            color: "text-[#22D3EE]",
          },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <SSCard className="p-5 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-[#A1A1AA] mt-1">{stat.label}</p>
            </SSCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Filters */}
      <FadeUp>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or stylists…"
              className="w-full bg-[#1C1C22] border border-[#27272A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6] transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-2">
            {(
              ["all", "upcoming", "completed", "cancelled"] as FilterStatus[]
            ).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                  filterStatus === s
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-[#1C1C22] text-[#A1A1AA] hover:text-[#F5F5F7] border border-[#27272A]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Appointments list */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Scissors className="w-12 h-12 text-[#27272A] mx-auto mb-4" />
            <p className="text-[#52525B]">No appointments found.</p>
          </motion.div>
        ) : (
          <motion.div key="list" className="space-y-3">
            {filtered.map((appt, i) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <SSCard className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {appt.image}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-[#F5F5F7] truncate">
                            {appt.service}
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">
                            with {appt.stylist}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={statusColors[appt.status]} size="sm">
                            {appt.status}
                          </Badge>
                          <button className="text-[#52525B] hover:text-[#A1A1AA] transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#52525B]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(appt.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {appt.time} · {appt.duration}min
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {appt.location}
                        </span>
                        <span className="font-medium text-[#F5F5F7]">
                          LKR {appt.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        {appt.status === "upcoming" && (
                          <>
                            <SSButton variant="outline" size="sm">
                              Reschedule
                            </SSButton>
                            <SSButton variant="ghost" size="sm">
                              Cancel
                            </SSButton>
                          </>
                        )}
                        {appt.status === "completed" && (
                          <>
                            {appt.rating ? (
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < appt.rating!
                                        ? "text-[#F59E0B] fill-[#F59E0B]"
                                        : "text-[#27272A]"
                                    }`}
                                  />
                                ))}
                              </div>
                            ) : (
                              <SSButton
                                variant="outline"
                                size="sm"
                                onClick={() => setRatingModal(appt.id)}
                              >
                                Leave review
                              </SSButton>
                            )}
                            <SSButton variant="ghost" size="sm">
                              Rebook
                            </SSButton>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </SSCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating modal */}
      <AnimatePresence>
        {ratingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setRatingModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="card-3d bg-[#1C1C22] border border-[#27272A] rounded-2xl p-8 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#F5F5F7]">
                  Rate your visit
                </h3>
                <button
                  onClick={() => setRatingModal(null)}
                  className="text-[#52525B] hover:text-[#A1A1AA] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2 justify-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPendingRating(star)}
                    className="text-2xl"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= pendingRating
                          ? "text-[#F59E0B] fill-[#F59E0B]"
                          : "text-[#27272A]"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              <SSButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setRatingModal(null)}
              >
                Submit review
              </SSButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
