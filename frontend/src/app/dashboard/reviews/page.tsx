"use client";

import { motion } from "framer-motion";
import { Crown, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const REVIEWS = [
  {
    id: 1,
    customer: "Dilhani Perera",
    avatar: "DP",
    stylist: "Shenali Rodrigo",
    service: "Keratin Treatment",
    rating: 5,
    comment:
      "Absolutely loved the result! Shenali is incredibly talented. My hair has never looked this smooth and shiny. Will definitely be coming back!",
    date: "Today",
    helpful: 12,
  },
  {
    id: 2,
    customer: "Sanduni Fernando",
    avatar: "SF",
    stylist: "Dinara Silva",
    service: "Bridal Package",
    rating: 5,
    comment:
      "Dinara made my wedding day absolutely perfect. The attention to detail was impeccable. Highly recommend the bridal package!",
    date: "Yesterday",
    helpful: 28,
  },
  {
    id: 3,
    customer: "Thilini Silva",
    avatar: "TS",
    stylist: "Kasun Perera",
    service: "Balayage Color",
    rating: 4,
    comment:
      "Kasun did an amazing job with my balayage. The color looks natural and beautiful. Just took a little longer than expected.",
    date: "3 days ago",
    helpful: 8,
  },
  {
    id: 4,
    customer: "Nadeesha Wickramasinghe",
    avatar: "NW",
    stylist: "Shenali Rodrigo",
    service: "Hair Cut",
    rating: 5,
    comment:
      "Best haircut I've had in years! Shenali understood exactly what I wanted. The salon atmosphere is luxurious.",
    date: "1 week ago",
    helpful: 6,
  },
  {
    id: 5,
    customer: "Chamari Jayawardena",
    avatar: "CJ",
    stylist: "Dinara Silva",
    service: "Luxury Facial",
    rating: 4,
    comment:
      "Great facial treatment. Skin feels so refreshed. The products used are top quality. Will visit again.",
    date: "1 week ago",
    helpful: 4,
  },
  {
    id: 6,
    customer: "Malsha Bandara",
    avatar: "MB",
    stylist: "Kasun Perera",
    service: "Hair Color",
    rating: 5,
    comment:
      "Kasun is a color genius! Exactly the shade I wanted. Professional, friendly, and the results are stunning!",
    date: "2 weeks ago",
    helpful: 15,
  },
];

const STYLIST_RANKINGS = [
  {
    rank: 1,
    name: "Shenali Rodrigo",
    avatar: "SR",
    rating: 4.9,
    reviews: 124,
    bookings: 48,
    satisfaction: 98,
    badge: "Top Rated",
    gradient: "from-[#F59E0B] to-[#EF4444]",
    aiScore: 96,
  },
  {
    rank: 2,
    name: "Dinara Silva",
    avatar: "DS",
    rating: 4.8,
    reviews: 87,
    bookings: 37,
    satisfaction: 96,
    badge: "Rising Star",
    gradient: "from-[#8B5CF6] to-[#E8B4B8]",
    aiScore: 93,
  },
  {
    rank: 3,
    name: "Kasun Perera",
    avatar: "KP",
    rating: 4.7,
    reviews: 98,
    bookings: 41,
    satisfaction: 94,
    badge: "Color Expert",
    gradient: "from-[#22D3EE] to-[#10B981]",
    aiScore: 91,
  },
];

const RATING_DIST = [
  { label: "5★", value: 72, count: 248 },
  { label: "4★", value: 20, count: 68 },
  { label: "3★", value: 5, count: 17 },
  { label: "2★", value: 2, count: 7 },
  { label: "1★", value: 1, count: 4 },
];

const MONTHLY_RATINGS = [
  { month: "Jan", avg: 4.6 },
  { month: "Feb", avg: 4.7 },
  { month: "Mar", avg: 4.8 },
  { month: "Apr", avg: 4.7 },
  { month: "May", avg: 4.9 },
  { month: "Jun", avg: 4.8 },
  { month: "Jul", avg: 4.9 },
];

function StarRow({
  rating,
  count,
  total,
}: {
  rating: number;
  count: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 w-12 flex-shrink-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-2.5 h-2.5 ${i < rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#27272A]"}`}
          />
        ))}
      </div>
      <div className="flex-1 bg-[#1C1C22] rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-[#F59E0B]"
          style={{ width: `${(count / total) * 100}%` }}
        />
      </div>
      <span className="text-[#52525B] text-xs w-8 text-right">{count}</span>
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[#A1A1AA] text-xs">{label}</p>
      <p className="text-[#F59E0B] text-sm font-bold">{payload[0].value}★</p>
    </div>
  );
}

export default function ReviewsPage() {
  const [filter, setFilter] = useState("All");
  const totalReviews = 344;
  const overallRating = 4.82;

  const filtered =
    filter === "All"
      ? REVIEWS
      : REVIEWS.filter((r) => r.stylist.split(" ")[0] === filter);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
      {/* Overview + Rating distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center mb-3">
            <Star className="w-8 h-8 fill-[#F59E0B] text-[#F59E0B]" />
          </div>
          <p className="text-[#F5F5F7] text-5xl font-bold mb-1">
            {overallRating}
          </p>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
          <p className="text-[#52525B] text-sm">{totalReviews} total reviews</p>
          <div className="mt-4 flex gap-3 text-center">
            <div className="bg-[#1C1C22] rounded-xl px-3 py-2">
              <p className="text-[#10B981] font-bold">+18</p>
              <p className="text-[#52525B] text-xs">This month</p>
            </div>
            <div className="bg-[#1C1C22] rounded-xl px-3 py-2">
              <p className="text-[#8B5CF6] font-bold">96%</p>
              <p className="text-[#52525B] text-xs">Positive</p>
            </div>
          </div>
        </motion.div>

        {/* Rating distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6"
        >
          <p className="text-[#F5F5F7] font-semibold mb-4">
            Rating Distribution
          </p>
          <div className="space-y-2.5">
            {RATING_DIST.map((r) => (
              <StarRow
                key={r.label}
                rating={parseInt(r.label)}
                count={r.count}
                total={totalReviews}
              />
            ))}
          </div>
        </motion.div>

        {/* Rating trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-6"
        >
          <p className="text-[#F5F5F7] font-semibold mb-1">Rating Trend</p>
          <p className="text-[#52525B] text-xs mb-4">Monthly average</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={MONTHLY_RATINGS}
              barSize={18}
              margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272A"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#52525B", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[4, 5]}
                tick={{ fill: "#52525B", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="avg" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <div>
        <p className="text-[#F5F5F7] font-semibold mb-4">Stylist Rankings</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {STYLIST_RANKINGS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`bg-[#141419] border rounded-2xl p-5 relative overflow-hidden ${i === 0 ? "border-[#F59E0B]/30" : "border-[#27272A]"}`}
            >
              {i === 0 && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              )}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white font-bold relative`}
                  >
                    {s.avatar}
                    {i === 0 && (
                      <Crown className="w-3.5 h-3.5 text-[#F59E0B] absolute -top-1.5 -right-1.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] font-semibold">{s.name}</p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${i === 0 ? "bg-[#F59E0B]/15 text-[#F59E0B]" : "bg-[#8B5CF6]/10 text-[#8B5CF6]"}`}
                    >
                      #{s.rank} {s.badge}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#F5F5F7] text-xl font-bold">
                    {s.rating}★
                  </p>
                  <p className="text-[#52525B] text-xs">{s.reviews} reviews</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#1C1C22] rounded-xl p-2.5 text-center">
                  <p className="text-[#F5F5F7] text-sm font-bold">
                    {s.bookings}
                  </p>
                  <p className="text-[#52525B] text-[10px]">Bookings</p>
                </div>
                <div className="bg-[#1C1C22] rounded-xl p-2.5 text-center">
                  <p className="text-[#10B981] text-sm font-bold">
                    {s.satisfaction}%
                  </p>
                  <p className="text-[#52525B] text-[10px]">Satisfied</p>
                </div>
                <div className="bg-[#1C1C22] rounded-xl p-2.5 text-center">
                  <p className="text-[#22D3EE] text-sm font-bold">
                    {s.aiScore}
                  </p>
                  <p className="text-[#52525B] text-[10px]">AI Score</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#F5F5F7] font-semibold">Customer Reviews</p>
          <div className="flex gap-2">
            {["All", "Shenali", "Kasun", "Dinara"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 h-7 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30" : "bg-[#141419] border border-[#27272A] text-[#52525B] hover:text-[#A1A1AA]"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-3d bg-[#141419] border border-[#27272A] rounded-2xl p-5 hover:border-[#3f3f46] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-[#F5F5F7] font-medium text-sm">
                        {r.customer}
                      </p>
                      <p className="text-[#52525B] text-xs">
                        {r.stylist} · {r.service} · {r.date}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= r.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#27272A]"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">
                    {r.comment}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex items-center gap-1.5 text-xs text-[#52525B] hover:text-[#A1A1AA] transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {r.helpful} Helpful
                    </button>
                    <button className="text-xs text-[#8B5CF6] hover:underline">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
