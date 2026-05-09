"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

// ─── AI-generated insights (mocked) ──────────────────────────────────────────

const AI_DIGEST = {
  lastUpdated: "Today, 7:00 AM",
  summary:
    "You had a strong week — your booking rate is up 12% and client satisfaction scores are at an all-time high of 4.9★. Fridays and Thursdays are your peak revenue days. Two loyal clients haven't booked in over 30 days — a personalised re-engagement message could recover them.",
};

const PREDICTIONS = [
  { day: "Mon", predicted: 4, confidence: 72 },
  { day: "Tue", predicted: 6, confidence: 85 },
  { day: "Wed", predicted: 3, confidence: 68 },
  { day: "Thu", predicted: 8, confidence: 91 },
  { day: "Fri", predicted: 9, confidence: 94 },
  { day: "Sat", predicted: 7, confidence: 88 },
  { day: "Sun", predicted: 0, confidence: 99 },
];

const RETENTION_ALERTS = [
  {
    client: "Nadeesha Wickramasinghe",
    lastVisit: "Dec 12, 2025",
    daysAgo: 58,
    risk: "high" as const,
    tip: "Nadeesha typically books every 5–6 weeks for highlights. She is now 2 weeks overdue — send a personalised re-booking nudge.",
    service: "Highlights",
  },
  {
    client: "Chamari Jayawardena",
    lastVisit: "Jan 3, 2026",
    daysAgo: 37,
    risk: "medium" as const,
    tip: "Chamari's last keratin treatment is approaching its 6-week refresh window. A quick reminder could secure a booking.",
    service: "Keratin Treatment",
  },
  {
    client: "Kushani Rajapaksa",
    lastVisit: "Jan 18, 2026",
    daysAgo: 22,
    risk: "low" as const,
    tip: "Kushani is within normal re-visit range, but she missed her usual 3-week haircut cycle. A gentle check-in would help.",
    service: "Cut & Style",
  },
];

const REVENUE_TIPS = [
  {
    icon: TrendingUp,
    color: "#22D3EE",
    title: "Upsell Toning after Balayage",
    description:
      "Only 38% of your balayage clients booked a toning session. Adding a LKR 2,500 toner offer at checkout could add ~LKR 20,000/month.",
    impact: "+LKR 20,000/mo",
  },
  {
    icon: Clock,
    color: "#F59E0B",
    title: "Fill your Wednesday gaps",
    description:
      "Wednesdays average only 3 bookings vs your 7-session daily peak. Consider a mid-week loyalty discount to fill those slots.",
    impact: "+3–4 sessions/wk",
  },
  {
    icon: Star,
    color: "#10B981",
    title: "Bridal package this quarter",
    description:
      "Wedding season peaks March–May in Sri Lanka. You have 6 VIP clients who got bridal styling last year — reach out now to secure early bookings.",
    impact: "+LKR 54,000 potential",
  },
  {
    icon: Users,
    color: "#8B5CF6",
    title: "Referral programme",
    description:
      "Your 4.9★ rating and 78% repeat rate make you a great candidate. Ask your top 5 loyal clients to refer a friend for a LKR 500 discount.",
    impact: "+2–5 new clients",
  },
];

const STYLE_RECS = [
  {
    trend: "Octopus Cut",
    match: "High",
    reason:
      "Your Wolf Cut clients (24 sessions) are most likely to love the Octopus Cut — a natural next evolution. Trending +18% in Asia.",
    colour: "#22D3EE",
  },
  {
    trend: "Glass Hair Technique",
    match: "High",
    reason:
      "Your keratin client base perfectly suits this look. Only 2 of Colombo's salons offer it — a first-mover advantage for Glamour Studio.",
    colour: "#10B981",
  },
  {
    trend: "Lived-in Brunette",
    match: "Medium",
    reason:
      "Low-maintenance colour is trending with working professionals. 34% of your client base fits the profile.",
    colour: "#F59E0B",
  },
];

// ─── Chat ─────────────────────────────────────────────────────────────────────

const PRESET_PROMPTS = [
  "Which clients should I re-engage this week?",
  "How can I increase my average session value?",
  "What services should I pitch on Saturdays?",
  "Summarise my performance this month",
];

const CANNED_RESPONSES: Record<string, string> = {
  "Which clients should I re-engage this week?":
    "Based on visit patterns, Nadeesha Wickramasinghe (last visit 58 days ago) and Chamari Jayawardena (37 days) are most at risk. A personalised WhatsApp message mentioning their usual service tends to convert at ~65% for loyal-tier clients. I'd suggest reaching out Tuesday morning when open rates are highest.",
  "How can I increase my average session value?":
    "Your current avg is LKR 2,069. Three quick wins: (1) Offer a LKR 1,200 glossing treatment add-on after colour services — takes only 10 min. (2) Bundle cut + treatment for LKR 3,500 vs separate pricing of LKR 4,200 — clients feel value, you upsell. (3) Mention Olaplex as an upgrade during the consultation — 42% acceptance rate industry-wide.",
  "What services should I pitch on Saturdays?":
    "Saturdays are your highest footfall day. Data shows your Saturday clients skew younger (22–30) and social-event-driven. Pitch: Blow-dry + style combos (LKR 2,800), Curtain Bang touch-ups (LKR 1,500), and quick gloss treatments (LKR 1,200). These are fast, high-margin, and suit the going-out crowd perfectly.",
  "Summarise my performance this month":
    "January 2026 — you completed 89 sessions with a net earnings of LKR 141,340 (after 30% commission + tips). Your highest-revenue service was Balayage (LKR 68,400). Client satisfaction sits at 4.9★ with a 78% repeat rate. Compared to December, your gross is down 6.3% but your tips are down significantly (LKR 12,400 vs LKR 18,600) — December holiday season boosted tips. Your bookings are on track for a stronger February.",
};

type ChatMessage = { role: "user" | "ai"; text: string };

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StylistAIInsightsPage() {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Hi Shenali! I've analysed your recent bookings, client data, and trending styles. Ask me anything about your performance, clients, or how to grow your earnings.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const sendMessage = (text?: string) => {
    const query = text ?? input.trim();
    if (!query) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: query }]);
    setThinking(true);
    setTimeout(() => {
      const reply =
        CANNED_RESPONSES[query] ??
        "Great question! Based on your data, I'd recommend focusing on your top-performing services — Balayage and Keratin — and scheduling outreach to clients who are due for a re-visit. Want me to dig deeper into any specific area?";
      setMessages((m) => [...m, { role: "ai", text: reply }]);
      setThinking(false);
    }, 1200);
  };

  const maxPred = Math.max(...PREDICTIONS.map((p) => p.predicted));

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-[#22D3EE]" strokeWidth={1.75} />
        </div>
        <div>
          <h1 className="text-[#F5F5F7] text-xl font-bold">AI Insights</h1>
          <p className="text-[#52525B] text-sm">
            Powered by StyleSense AI · Updated {AI_DIGEST.lastUpdated}
          </p>
        </div>
      </motion.div>

      {/* AI Weekly Digest */}
      <motion.div {...fadeUp(0.05)}>
        <div className="bg-gradient-to-br from-[#22D3EE]/8 via-[#141419] to-[#8B5CF6]/5 border border-[#22D3EE]/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.75} />
            <p className="text-[#22D3EE] text-xs font-semibold uppercase tracking-wider">
              Weekly AI Digest
            </p>
          </div>
          <p className="text-[#F5F5F7] text-sm leading-relaxed">
            {AI_DIGEST.summary}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Predictions */}
        <motion.div {...fadeUp(0.1)}>
          <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <TrendingUp
                  className="w-4 h-4 text-[#22D3EE]"
                  strokeWidth={1.75}
                />
                <h3 className="text-[#F5F5F7] font-semibold text-sm">
                  Next Week Booking Predictions
                </h3>
              </div>
              <p className="text-[#52525B] text-xs mt-0.5">
                AI-predicted sessions per day
              </p>
            </div>
            <div className="p-5 space-y-3">
              {PREDICTIONS.map((pred, i) => (
                <div key={pred.day} className="flex items-center gap-3">
                  <span className="text-[#52525B] text-xs w-8 shrink-0">
                    {pred.day}
                  </span>
                  <div className="flex-1 h-7 bg-[#1C1C22] rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          maxPred > 0
                            ? `${(pred.predicted / maxPred) * 100}%`
                            : "0%",
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.06 * i,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-lg flex items-center justify-end pr-2"
                      style={{
                        background:
                          pred.predicted === 0
                            ? "#1C1C22"
                            : pred.predicted >= 8
                              ? "linear-gradient(to right, #22D3EE40, #22D3EE)"
                              : "linear-gradient(to right, #8B5CF640, #8B5CF6)",
                      }}
                    >
                      {pred.predicted > 0 && (
                        <span className="text-white text-[10px] font-bold">
                          {pred.predicted}
                        </span>
                      )}
                    </motion.div>
                    {pred.predicted === 0 && (
                      <span className="absolute inset-0 flex items-center pl-2 text-[#52525B] text-[10px]">
                        Day off
                      </span>
                    )}
                  </div>
                  <div className="w-12 text-right shrink-0">
                    <span
                      className={`text-[10px] font-medium ${pred.confidence >= 90 ? "text-[#10B981]" : pred.confidence >= 80 ? "text-[#22D3EE]" : "text-[#52525B]"}`}
                    >
                      {pred.confidence}%
                    </span>
                  </div>
                </div>
              ))}
              <p className="text-[#52525B] text-[10px] pt-1">
                Confidence % shown on right · Based on your 90-day booking
                history
              </p>
            </div>
          </div>
        </motion.div>

        {/* Client Retention Alerts */}
        <motion.div {...fadeUp(0.15)}>
          <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <AlertCircle
                  className="w-4 h-4 text-[#F59E0B]"
                  strokeWidth={1.75}
                />
                <h3 className="text-[#F5F5F7] font-semibold text-sm">
                  Client Retention Alerts
                </h3>
              </div>
              <p className="text-[#52525B] text-xs mt-0.5">
                Clients who may be at risk of churning
              </p>
            </div>
            <div className="divide-y divide-[#27272A]">
              {RETENTION_ALERTS.map((alert) => (
                <div key={alert.client} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                        alert.risk === "high"
                          ? "bg-[#EF4444]"
                          : alert.risk === "medium"
                            ? "bg-[#F59E0B]"
                            : "bg-[#22D3EE]"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-[#F5F5F7] text-sm font-medium">
                          {alert.client}
                        </p>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                            alert.risk === "high"
                              ? "bg-[#EF4444]/10 text-[#EF4444]"
                              : alert.risk === "medium"
                                ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                                : "bg-[#22D3EE]/10 text-[#22D3EE]"
                          }`}
                        >
                          {alert.risk} risk · {alert.daysAgo}d ago
                        </span>
                      </div>
                      <p className="text-[#52525B] text-[10px] mt-0.5">
                        Last: {alert.service} · {alert.lastVisit}
                      </p>
                      <p className="text-[#A1A1AA] text-xs mt-1.5 leading-relaxed">
                        {alert.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revenue Optimisation Tips */}
      <motion.div {...fadeUp(0.2)}>
        <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#10B981]" strokeWidth={1.75} />
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                Revenue Optimisation Tips
              </h3>
            </div>
            <p className="text-[#52525B] text-xs mt-0.5">
              AI-identified opportunities tailored to your booking history
            </p>
          </div>
          <div className="divide-y divide-[#27272A]">
            {REVENUE_TIPS.map((tip, i) => (
              <div key={tip.title}>
                <button
                  onClick={() => setExpandedTip(expandedTip === i ? null : i)}
                  className="w-full text-left px-5 py-4 hover:bg-[#1C1C22] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${tip.color}15` }}
                    >
                      <tip.icon
                        className="w-4 h-4"
                        style={{ color: tip.color }}
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F7] text-sm font-medium">
                        {tip.title}
                      </p>
                      <p className="text-[#10B981] text-[10px] font-semibold">
                        {tip.impact}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#52525B] shrink-0 transition-transform duration-200 ${expandedTip === i ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {expandedTip === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pl-17">
                        <p className="text-[#A1A1AA] text-sm leading-relaxed ml-12">
                          {tip.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Style Trend Recommendations */}
      <motion.div {...fadeUp(0.25)}>
        <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                Style Recommendations for Your Clients
              </h3>
            </div>
            <p className="text-[#52525B] text-xs mt-0.5">
              Based on your client profiles + global trend data
            </p>
          </div>
          <div className="divide-y divide-[#27272A]">
            {STYLE_RECS.map((rec) => (
              <div
                key={rec.trend}
                className="flex items-start gap-4 px-5 py-4 hover:bg-[#1C1C22] transition-colors"
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: rec.colour }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[#F5F5F7] text-sm font-medium">
                      {rec.trend}
                    </p>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: `${rec.colour}15`,
                        color: rec.colour,
                      }}
                    >
                      {rec.match} match
                    </span>
                  </div>
                  <p className="text-[#A1A1AA] text-xs mt-1 leading-relaxed">
                    {rec.reason}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#52525B] shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Chat */}
      <motion.div {...fadeUp(0.3)}>
        <div className="bg-[#141419] border border-[#27272A] rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.75} />
              <h3 className="text-[#F5F5F7] font-semibold text-sm">
                Ask the AI
              </h3>
              <span className="ml-auto text-[10px] text-[#10B981] font-semibold bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="p-5 space-y-3 max-h-80 overflow-y-auto">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                    msg.role === "ai"
                      ? "bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] text-white"
                      : "bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA]"
                  }`}
                >
                  {msg.role === "ai" ? <Zap className="w-3.5 h-3.5" /> : "SR"}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "ai"
                      ? "bg-[#1C1C22] text-[#F5F5F7] rounded-tl-sm"
                      : "bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#F5F5F7] rounded-tr-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2.5"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-[#1C1C22] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 0.8, delay, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Preset prompts */}
          <div className="px-5 pb-3 flex gap-2 overflow-x-auto">
            {PRESET_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="shrink-0 text-[11px] text-[#A1A1AA] bg-[#1C1C22] border border-[#27272A] rounded-xl px-3 py-1.5 hover:border-[#22D3EE]/40 hover:text-[#22D3EE] transition-colors whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 pb-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && sendMessage()
                }
                placeholder="Ask anything about your clients, earnings, or styling trends..."
                className="flex-1 bg-[#1C1C22] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-[#F5F5F7] placeholder:text-[#52525B] outline-none focus:border-[#22D3EE]/50 transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || thinking}
                className="w-10 h-10 rounded-xl bg-[#22D3EE] flex items-center justify-center text-[#0B0B0F] hover:bg-[#22D3EE]/90 transition-colors disabled:opacity-40 shrink-0"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
