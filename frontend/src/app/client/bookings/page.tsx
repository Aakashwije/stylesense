"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import { useBookings } from "@/hooks/useBooking";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  RefreshCw,
  Scissors,
  Star,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const STATUS_TABS = ["All", "Upcoming", "Completed", "Cancelled"];

const BOOKINGS = [
  {
    id: "b1",
    service: "Balayage + Toner",
    stylist: "Shenali Rodrigo",
    stylistId: "st1",
    salon: "Glamour Studio",
    salonId: "s1",
    date: "May 10, 2026",
    time: "2:00 PM",
    duration: "2.5 hrs",
    status: "confirmed",
    totalAmount: "LKR 4,500",
    notes: "Prefer lighter tone at roots",
    canReschedule: true,
    canCancel: true,
  },
  {
    id: "b2",
    service: "Men's Fade Cut",
    stylist: "Kasun Perera",
    stylistId: "st2",
    salon: "Urban Cuts",
    salonId: "s2",
    date: "May 14, 2026",
    time: "10:30 AM",
    duration: "45 min",
    status: "pending",
    totalAmount: "LKR 1,500",
    notes: "",
    canReschedule: true,
    canCancel: true,
  },
  {
    id: "b3",
    service: "Bridal Makeup Trial",
    stylist: "Priya Navaratnam",
    stylistId: "st3",
    salon: "Bloom Beauty Lounge",
    salonId: "s3",
    date: "Apr 28, 2026",
    time: "11:00 AM",
    duration: "3 hrs",
    status: "completed",
    totalAmount: "LKR 8,000",
    notes: "",
    canReschedule: false,
    canCancel: false,
    hasReview: false,
  },
  {
    id: "b4",
    service: "HydraFacial",
    stylist: "Dilini Wijesinghe",
    stylistId: "st5",
    salon: "Serenity Spa & Salon",
    salonId: "s5",
    date: "Apr 20, 2026",
    time: "3:00 PM",
    duration: "1 hr",
    status: "completed",
    totalAmount: "LKR 5,500",
    notes: "",
    canReschedule: false,
    canCancel: false,
    hasReview: true,
    review: { rating: 5, text: "Amazing experience!" },
  },
  {
    id: "b5",
    service: "Gel Extensions",
    stylist: "Nilufar Hashim",
    stylistId: "st4",
    salon: "The Nail Bar",
    salonId: "s4",
    date: "Apr 15, 2026",
    time: "12:00 PM",
    duration: "1.5 hrs",
    status: "cancelled",
    totalAmount: "LKR 3,000",
    notes: "Rescheduled by salon",
    canReschedule: false,
    canCancel: false,
  },
];

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  confirmed: { label: "Confirmed", color: "#22C55E", icon: CheckCircle2 },
  pending: { label: "Pending", color: "#F59E0B", icon: AlertCircle },
  completed: { label: "Completed", color: "#8B5CF6", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "#EF4444", icon: XCircle },
  "in-progress": { label: "In Progress", color: "#22D3EE", icon: Clock },
};

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function formatService(services: unknown): string {
  if (Array.isArray(services) && services.length > 0) {
    const service = services[0];
    if (typeof service === "object" && service !== null && "name" in service) {
      return (service as { name: string }).name;
    }
  }
  return "Service";
}

function formatAmount(amount: number): string {
  return `LKR ${amount.toLocaleString()}`;
}

export default function ClientBookingsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const { data: bookingsData, isLoading, error } = useBookings();

  const bookings = bookingsData?.appointments || [];

  const filtered = bookings.filter((b) => {
    if (activeTab === "All") return true;
    if (activeTab === "Upcoming")
      return b.status === "confirmed" || b.status === "pending";
    if (activeTab === "Completed") return b.status === "completed";
    if (activeTab === "Cancelled") return b.status === "cancelled";
    return true;
  });

  const upcoming = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending",
  ).length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <FadeUp className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">
            My Bookings
          </h1>
          <p className="text-[#A1A1AA] text-sm">
            {upcoming} upcoming · {completed} completed · All synced with salon
            dashboards
          </p>
        </div>
        <Link
          href="/client/stylists"
          className="flex items-center gap-2 px-4 h-10 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors"
        >
          <Calendar className="w-4 h-4" />
          New Booking
        </Link>
      </FadeUp>

      {/* Summary Cards */}
      <StaggerContainer
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        staggerDelay={0.06}
      >
        {[
          { label: "Total", value: bookings.length, color: "#8B5CF6" },
          { label: "Upcoming", value: upcoming, color: "#22D3EE" },
          { label: "Completed", value: completed, color: "#22C55E" },
          {
            label: "Cancelled",
            value: bookings.filter((b) => b.status === "cancelled").length,
            color: "#EF4444",
          },
        ].map((s) => (
          <StaggerItem key={s.label}>
            <SSCard padding="sm" className="text-center h-full">
              <p
                className="text-2xl font-bold mb-0.5"
                style={{ color: s.color }}
              >
                {s.value}
              </p>
              <p className="text-[#71717A] text-xs">{s.label}</p>
            </SSCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Tabs */}
      <FadeUp delay={0.1}>
        <div className="flex gap-1 p-1 bg-[#1C1C22] border border-[#38383F] rounded-xl w-fit">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#8B5CF6] text-white"
                  : "text-[#71717A] hover:text-[#F5F5F7]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Loading State */}
      {isLoading && (
        <FadeUp className="text-center py-12">
          <p className="text-[#A1A1AA]">Loading bookings...</p>
        </FadeUp>
      )}

      {/* Error State */}
      {error && (
        <FadeUp className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
          <p className="text-red-400 text-sm">Failed to load bookings</p>
        </FadeUp>
      )}

      {/* Empty State */}
      {!isLoading && !error && filtered.length === 0 && (
        <FadeUp className="text-center py-12">
          <Scissors className="w-12 h-12 text-[#3f3f46] mx-auto mb-4" />
          <p className="text-[#A1A1AA] text-sm">
            {bookings.length === 0
              ? "No bookings yet. Ready to book?"
              : "No bookings match this filter."}
          </p>
          {bookings.length === 0 && (
            <Link
              href="/booking"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </Link>
          )}
        </FadeUp>
      )}

      {/* Bookings List */}
      {!isLoading && !error && filtered.length > 0 && (
        <StaggerContainer className="space-y-4" staggerDelay={0.06}>
          {filtered.map((booking) => {
            const sc = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
            const StatusIcon = sc.icon;
            const serviceName = formatService(booking.services);
            const formattedDate = formatDate(booking.date);

            return (
              <StaggerItem key={booking.id}>
                <SSCard hover>
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${sc.color}15`,
                        border: `1px solid ${sc.color}25`,
                      }}
                    >
                      <Scissors
                        className="w-5 h-5"
                        style={{ color: sc.color }}
                        strokeWidth={1.75}
                      />
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-[#F5F5F7] font-semibold text-sm">
                            {serviceName}
                          </h3>
                          <p className="text-[#71717A] text-xs mt-0.5">
                            Stylist ID: {booking.stylistId}
                          </p>
                        </div>
                        <span
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold shrink-0"
                          style={{
                            color: sc.color,
                            background: `${sc.color}20`,
                          }}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {sc.label}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#71717A] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {booking.startTime}
                        </span>
                      </div>

                      {booking.notes && (
                        <p className="text-[#52525B] text-xs italic mb-3">
                          Note: {booking.notes}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-[#F5F5F7] text-sm font-semibold">
                          {formatAmount(booking.totalAmount)}
                        </span>
                        <div className="flex items-center gap-2">
                          {booking.status === "completed" && (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] text-xs font-medium hover:bg-[#F59E0B]/25 transition-colors">
                              <Star className="w-3 h-3" />
                              Leave Review
                            </button>
                          )}
                          {booking.status === "confirmed" && (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27272A] text-[#A1A1AA] text-xs font-medium hover:bg-[#3f3f46] hover:text-[#F5F5F7] transition-colors">
                              <RefreshCw className="w-3 h-3" />
                              Reschedule
                            </button>
                          )}
                          {booking.status !== "completed" && booking.status !== "cancelled" && (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-xs font-medium hover:bg-[#EF4444]/20 transition-colors">
                              <XCircle className="w-3 h-3" />
                              Cancel
                            </button>
                          )}
                          <Link
                            href={`/booking?id=${booking.id}`}
                            className="flex items-center gap-1 text-[#8B5CF6] text-xs hover:text-[#7C3AED] transition-colors"
                          >
                            Details <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sync note */}
                  <div className="mt-3 pt-3 border-t border-[#38383F] flex items-center gap-2 text-[10px] text-[#52525B]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    Booking confirmed · {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </SSCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
