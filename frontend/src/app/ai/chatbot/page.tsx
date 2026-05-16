"use client";

import { cn } from "@/lib/utils";
import { aiService } from "@/services/ai";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "What hairstyle suits an oval face?",
  "Recommend a low-maintenance color",
  "How often should I deep condition?",
  "Best haircut for fine hair?",
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "0",
    role: "assistant",
    content:
      "Hi! I'm your StyleSense AI beauty advisor 💜 Ask me anything about hairstyles, hair care, color trends, or book a service.",
  },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(
    undefined,
  );
  const endRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(1);

  const createMessageId = (suffix?: string) => {
    const id = nextMessageId.current;
    nextMessageId.current += 1;
    return suffix ? `${id}-${suffix}` : id.toString();
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: createMessageId(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await aiService.chatMessage(text, conversationId);
      setConversationId(res.conversationId);
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId("bot"),
          role: "assistant",
          content: res.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId("err"),
          role: "assistant",
          content:
            "Sorry — I couldn't reach the AI service. Please check that the backend is running and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0B0B0F]">
      {/* Header */}
      <div className="border-b border-[#27272A] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
        </div>
        <div>
          <p className="text-[#F5F5F7] font-semibold text-sm">StyleSense AI</p>
          <p className="text-[#10B981] text-xs">● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "flex-row-reverse" : "",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  msg.role === "assistant"
                    ? "bg-[#8B5CF6]/15 border border-[#8B5CF6]/25"
                    : "bg-[#27272A]",
                )}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-4 h-4 text-[#8B5CF6]" />
                ) : (
                  <User className="w-4 h-4 text-[#A1A1AA]" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "assistant"
                    ? "bg-[#1C1C22] border border-[#27272A] text-[#F5F5F7]"
                    : "bg-[#8B5CF6] text-white",
                )}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <div className="card-3d bg-[#1C1C22] border border-[#27272A] rounded-2xl px-4 py-3 flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-[#52525B]"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-[#1C1C22] border border-[#27272A] text-[#A1A1AA] hover:border-[#8B5CF6]/50 hover:text-[#8B5CF6] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-[#27272A] px-4 py-3">
        <div className="flex items-center gap-3 card-3d bg-[#1C1C22] border border-[#27272A] rounded-2xl px-4 py-2 focus-within:border-[#8B5CF6]/50 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && sendMessage(input)
            }
            placeholder="Ask about styles, services, or hair care…"
            className="flex-1 bg-transparent text-[#F5F5F7] text-sm outline-none placeholder:text-[#52525B]"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-xl bg-[#8B5CF6] disabled:opacity-40 flex items-center justify-center flex-shrink-0 hover:bg-[#7C3AED] transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
