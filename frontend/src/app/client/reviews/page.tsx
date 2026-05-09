"use client";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { SSCard } from "@/components/common/SSCard";
import {
  Calendar,
  Edit3,
  MessageSquare,
  Plus,
  Star,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MY_REVIEWS = [
  {
    id: "r1",
    stylistName: "Shenali Rodrigo",
    stylistInitials: "SR",
    avatarGrad: "from-[#8B5CF6] to-[#6D28D9]",
    salon: "Glamour Studio",
    service: "Balayage + Toner",
    rating: 5,
    date: "May 10, 2026",
    text: "Absolutely loved the result. Shenali really listened to what I wanted and the colour came out even better than the reference photos. The salon atmosphere was also very relaxing.",
    helpful: 14,
  },
  {
    id: "r2",
    stylistName: "Kasun Perera",
    stylistInitials: "KP",
    avatarGrad: "from-[#F59E0B] to-[#D97706]",
    salon: "Urban Cuts",
    service: "High Fade + Line Up",
    rating: 4,
    date: "Apr 22, 2026",
    text: "Clean fade, great attention to detail around the edges. Would definitely go back. The wait time was a bit longer than expected but overall a great experience.",
    helpful: 7,
  },
  {
    id: "r3",
    stylistName: "Dilini Wijesinghe",
    stylistInitials: "DW",
    avatarGrad: "from-[#22D3EE] to-[#0EA5E9]",
    salon: "Serenity Spa & Salon",
    service: "HydraFacial",
    rating: 5,
    date: "Apr 5, 2026",
    text: "My skin felt incredible after. Dilini is so knowledgeable and explained every step. Will definitely be a regular here.",
    helpful: 22,
  },
];

const PENDING_REVIEW = {
  bookingId: "b4",
  stylistName: "Priya Navaratnam",
  salon: "Bloom Beauty Lounge",
  service: "Bridal Trial Makeup",
  date: "May 15, 2026",
};

function StarRow({
  rating,
  setRating,
}: {
  rating: number;
  setRating?: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => setRating?.(n)}
          className={setRating ? "cursor-pointer" : "cursor-default"}
          tabIndex={setRating ? 0 : -1}
        >
          <Star
            className={`w-4 h-4 ${n <= rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#3F3F46]"}`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [pendingRating, setPendingRating] = useState(0);
  const [pendingText, setPendingText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [helpedIds, setHelpedIds] = useState<string[]>([]);

  const submitReview = () => {
    if (pendingRating === 0 || !pendingText.trim()) return;
    setSubmitted(true);
  };

  const toggleHelpful = (id: string) =>
    setHelpedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <FadeUp>
        <h1 className="text-2xl font-bold text-[#F5F5F7] mb-1">My Reviews</h1>
        <p className="text-[#A1A1AA] text-sm">
          {MY_REVIEWS.length} reviews posted · Helping the StyleSense community
        </p>
      </FadeUp>

      {/* Pending review prompt */}
      {!submitted && (
        <FadeUp delay={0.07}>
          <SSCard glow>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-[#F5F5F7] font-semibold text-sm">
                  Rate your recent appointment
                </p>
                <p className="text-[#52525B] text-xs">
                  {PENDING_REVIEW.service} with {PENDING_REVIEW.stylistName}
                </p>
              </div>
              <span className="ml-auto flex items-center gap-1 text-[#52525B] text-xs">
                <Calendar className="w-3 h-3" />
                {PENDING_REVIEW.date}
              </span>
            </div>

            <StarRow rating={pendingRating} setRating={setPendingRating} />

            <textarea
              value={pendingText}
              onChange={(e) => setPendingText(e.target.value)}
              placeholder="Tell others about your experience — what did you love? Any tips?"
              rows={3}
              className="mt-3 w-full bg-[#1C1C22] border border-[#38383F] focus:border-[#8B5CF6]/50 rounded-xl px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none resize-none transition-colors"
            />

            <div className="flex justify-end mt-3">
              <button
                onClick={submitReview}
                disabled={pendingRating === 0 || !pendingText.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#8B5CF6] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#7C3AED] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Submit Review
              </button>
            </div>
          </SSCard>
        </FadeUp>
      )}

      {submitted && (
        <FadeUp delay={0.07}>
          <SSCard>
            <div className="flex items-center gap-3 text-[#22C55E]">
              <ThumbsUp className="w-5 h-5" />
              <p className="font-semibold text-sm">
                Review submitted — thank you!
              </p>
            </div>
          </SSCard>
        </FadeUp>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        <FadeUp delay={0.1}>
          <h2 className="text-[#F5F5F7] font-semibold text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
            Posted Reviews
          </h2>
        </FadeUp>

        <StaggerContainer className="space-y-4" staggerDelay={0.07}>
          {MY_REVIEWS.map((review) => (
            <StaggerItem key={review.id}>
              <SSCard hover>
                {/* Top row */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-linear-to-br ${review.avatarGrad} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                  >
                    {review.stylistInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F5F5F7] font-semibold text-sm">
                      {review.stylistName}
                    </p>
                    <p className="text-[#71717A] text-xs truncate">
                      {review.salon} · {review.service}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <StarRow rating={review.rating} />
                    <p className="text-[#52525B] text-[10px] mt-0.5">
                      {review.date}
                    </p>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-3">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Footer */}
                <div className="border-t border-[#38383F] pt-3 flex items-center justify-between">
                  <button
                    onClick={() => toggleHelpful(review.id)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      helpedIds.includes(review.id)
                        ? "text-[#22C55E]"
                        : "text-[#52525B] hover:text-[#A1A1AA]"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful (
                    {review.helpful + (helpedIds.includes(review.id) ? 1 : 0)})
                  </button>
                  <Link
                    href={`/client/stylists/${review.id}`}
                    className="text-[#8B5CF6] text-xs hover:underline"
                  >
                    View stylist
                  </Link>
                </div>
              </SSCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
