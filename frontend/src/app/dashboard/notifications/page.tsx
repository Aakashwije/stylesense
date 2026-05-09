"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Check, CheckCheck, Calendar, CreditCard,
  Star, AlertTriangle, Scissors, X, Crown,
} from "lucide-react";

const NOTIFS = [
  { id: 1, type: "booking", icon: Calendar, color: "#8B5CF6", title: "New Booking Received", body: "Dilhani Perera booked Keratin Treatment with Shenali Rodrigo for May 10, 10:00 AM", time: "2 min ago", read: false, urgent: false },
  { id: 2, type: "cancellation", icon: X, color: "#EF4444", title: "Booking Cancelled", body: "Chamari Jayawardena cancelled her Hair Cut appointment scheduled for May 9, 4:00 PM.", time: "15 min ago", read: false, urgent: false },
  { id: 3, type: "review", icon: Star, color: "#F59E0B", title: "New 5★ Review", body: 'Sanduni Fernando left a 5-star review: "Dinara made my wedding day absolutely perfect!"', time: "1 hr ago", read: false, urgent: false },
  { id: 4, type: "subscription", icon: Crown, color: "#22D3EE", title: "Subscription Renewing Soon", body: "Your Base plan renews on June 1, 2025 for LKR 1,500. Update payment details if needed.", time: "2 hr ago", read: false, urgent: true },
  { id: 5, type: "booking", icon: Calendar, color: "#8B5CF6", title: "New Booking Received", body: "Malsha Bandara booked Balayage Color with Kasun Perera for May 11, 3:00 PM", time: "3 hr ago", read: true, urgent: false },
  { id: 6, type: "payment", icon: CreditCard, color: "#10B981", title: "Payment Confirmed", body: "LKR 12,000 received from Sanduni Fernando for the Bridal Package. Invoice #INV-1097 generated.", time: "5 hr ago", read: true, urgent: false },
  { id: 7, type: "availability", icon: AlertTriangle, color: "#F59E0B", title: "Low Slot Availability", body: "Saturday May 17 is nearly full — only 2 slots left across all stylists. Consider adding capacity.", time: "Yesterday", read: true, urgent: true },
  { id: 8, type: "review", icon: Star, color: "#F59E0B", title: "New 4★ Review", body: 'Thilini Silva rated Kasun Perera 4 stars: "Great coloring, took a bit longer than expected."', time: "Yesterday", read: true, urgent: false },
  { id: 9, type: "booking", icon: Calendar, color: "#8B5CF6", title: "Booking Rescheduled", body: "Nadeesha Wickramasinghe rescheduled her Manicure appointment to May 14, 2:00 PM.", time: "2 days ago", read: true, urgent: false },
  { id: 10, type: "payment", icon: CreditCard, color: "#10B981", title: "Monthly Subscription Paid", body: "Your May subscription of LKR 1,500 was successfully charged. Receipt sent to owner@salon.com.", time: "May 1", read: true, urgent: false },
];

const FILTERS = ["All", "Bookings", "Payments", "Reviews", "Alerts"];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [notifs, setNotifs] = useState(NOTIFS);

  const typeMap: Record<string, string> = {
    booking: "Bookings", cancellation: "Bookings", payment: "Payments",
    review: "Reviews", subscription: "Alerts", availability: "Alerts",
  };

  const filtered = notifs.filter((n) => filter === "All" || typeMap[n.type] === filter);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: number) => setNotifs((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="p-6 lg:p-8 max-w-[900px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="bg-[#8B5CF6] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{unreadCount} new</span>
          )}
        </div>
        <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors">
          <CheckCheck className="w-4 h-4" />Mark all read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 h-8 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              filter === f ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30" : "bg-[#141419] border border-[#27272A] text-[#52525B] hover:text-[#A1A1AA]"
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((n, i) => (
            <motion.div key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20, scale: 0.97 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-[#141419] border rounded-2xl p-4 flex items-start gap-4 group hover:border-[#3f3f46] transition-all ${
                !n.read ? "border-[#8B5CF6]/20" : "border-[#27272A]"
              } ${n.urgent && !n.read ? "bg-[#F59E0B]/[0.03]" : ""}`}
            >
              {/* Unread dot */}
              <div className="flex-shrink-0 mt-1">
                {!n.read ? (
                  <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-transparent" />
                )}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${n.color}15` }}>
                <n.icon className="w-5 h-5" style={{ color: n.color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className={`text-sm font-medium ${!n.read ? "text-[#F5F5F7]" : "text-[#A1A1AA]"}`}>{n.title}</p>
                  <span className="text-[#52525B] text-xs flex-shrink-0">{n.time}</span>
                </div>
                <p className="text-[#52525B] text-xs leading-relaxed">{n.body}</p>
                {n.urgent && !n.read && (
                  <span className="mt-2 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                    Action needed
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                {!n.read && (
                  <button onClick={() => markRead(n.id)} className="w-7 h-7 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center hover:text-[#10B981] transition-colors" title="Mark as read">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
                <button onClick={() => dismiss(n.id)} className="w-7 h-7 rounded-lg bg-[#1C1C22] text-[#A1A1AA] flex items-center justify-center hover:text-[#EF4444] transition-colors" title="Dismiss">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-10 h-10 text-[#27272A] mx-auto mb-3" />
            <p className="text-[#52525B] text-sm">No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
