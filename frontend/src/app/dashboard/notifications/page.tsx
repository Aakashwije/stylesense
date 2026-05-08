"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { Badge } from "@/components/common/Badge";
import { SSButton } from "@/components/common/SSButton";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Calendar,
  Check,
  Gift,
  Settings,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";

type NotificationType = "booking" | "promo" | "review" | "ai" | "loyalty";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const ICON_MAP: Record<
  NotificationType,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  booking: Calendar,
  promo: Gift,
  review: Star,
  ai: Sparkles,
  loyalty: Bell,
};

const COLOR_MAP: Record<NotificationType, string> = {
  booking: "#8B5CF6",
  promo: "#E8B4B8",
  review: "#F59E0B",
  ai: "#22D3EE",
  loyalty: "#10B981",
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "Appointment confirmed",
    body: "Your Balayage session with Maya Chen is confirmed for May 15 at 10:30 AM.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "ai",
    title: "Your analysis is ready",
    body: "We found 3 new style recommendations based on your latest hair analysis.",
    time: "Yesterday",
    read: false,
  },
  {
    id: "3",
    type: "loyalty",
    title: "220 points earned!",
    body: "You earned loyalty points from your last Precision Haircut visit.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "4",
    type: "promo",
    title: "Weekend deal: 20% off facials",
    body: "Book any facial this weekend and save 20%. Use code GLOW20 at checkout.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "5",
    type: "review",
    title: "How was your last visit?",
    body: "Your Hydration Facial session ended recently. Leave a review to earn 50 bonus points.",
    time: "Apr 11",
    read: true,
  },
  {
    id: "6",
    type: "booking",
    title: "Reminder: tomorrow's appointment",
    body: "You have a Root Touch-Up at 3:30 PM tomorrow with Alex Kim at StyleSense Uptown.",
    time: "Apr 9",
    read: true,
  },
];

type FilterOption = "all" | "unread";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS,
  );
  const [filter, setFilter] = useState<FilterOption>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const displayed = notifications.filter((n) =>
    filter === "unread" ? !n.read : true,
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <FadeUp>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-[#F5F5F7]">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <Badge variant="purple" size="sm">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <p className="text-[#A1A1AA]">
              Stay up to date with appointments, offers, and AI insights.
            </p>
          </div>
          <div className="flex gap-2">
            <SSButton
              variant="ghost"
              size="sm"
              leftIcon={<Settings className="w-4 h-4" />}
            >
              Preferences
            </SSButton>
            {unreadCount > 0 && (
              <SSButton
                variant="outline"
                size="sm"
                onClick={markAllRead}
                leftIcon={<Check className="w-4 h-4" />}
              >
                Mark all read
              </SSButton>
            )}
          </div>
        </div>
      </FadeUp>

      {/* Filter */}
      <FadeUp>
        <div className="flex gap-2">
          {(["all", "unread"] as FilterOption[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#1C1C22] text-[#A1A1AA] border border-[#27272A] hover:text-[#F5F5F7]"
              }`}
            >
              {f}
              {f === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 opacity-80">({unreadCount})</span>
              )}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* List */}
      <AnimatePresence>
        {displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Bell className="w-12 h-12 text-[#27272A] mx-auto mb-4" />
            <p className="text-[#52525B]">No notifications here.</p>
          </motion.div>
        ) : (
          <motion.div className="space-y-2">
            {displayed.map((notif, i) => {
              const Icon = ICON_MAP[notif.type];
              const color = COLOR_MAP[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => markRead(notif.id)}
                  className={`relative flex gap-4 p-4 rounded-2xl border cursor-pointer transition-all hover:border-[#8B5CF6]/30 ${
                    !notif.read
                      ? "bg-[#1C1C22] border-[#27272A]"
                      : "bg-[#141419] border-[#27272A]/50 opacity-70"
                  }`}
                >
                  {/* Unread dot */}
                  {!notif.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  )}

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: color + "18" }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-6">
                    <p className="text-sm font-medium text-[#F5F5F7]">
                      {notif.title}
                    </p>
                    <p className="text-xs text-[#A1A1AA] mt-0.5 leading-relaxed">
                      {notif.body}
                    </p>
                    <p className="text-[10px] text-[#52525B] mt-2">
                      {notif.time}
                    </p>
                  </div>

                  {/* Dismiss */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismiss(notif.id);
                    }}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-[#52525B] hover:text-[#A1A1AA] transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
