export const APP_NAME = "StyleSense AI";
export const APP_TAGLINE = "The future of beauty, powered by AI";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Stylists", href: "/stylists" },
  { label: "AI Demo", href: "/ai-demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export const SERVICE_CATEGORIES = [
  { id: "haircut", label: "Haircuts", icon: "Scissors", color: "#8B5CF6" },
  { id: "coloring", label: "Coloring", icon: "Palette", color: "#22D3EE" },
  { id: "bridal", label: "Bridal", icon: "Crown", color: "#E8B4B8" },
  { id: "facial", label: "Facials", icon: "Sparkles", color: "#10B981" },
  { id: "spa", label: "Spa", icon: "Flower2", color: "#F59E0B" },
  { id: "nails", label: "Nails", icon: "Star", color: "#EC4899" },
  { id: "grooming", label: "Grooming", icon: "User", color: "#6366F1" },
] as const;

export const MEMBERSHIP_TIERS = {
  free: { label: "Free", color: "#A1A1AA" },
  essential: { label: "Essential", color: "#22D3EE" },
  premium: { label: "Premium", color: "#8B5CF6" },
  elite: { label: "Elite", color: "#E8B4B8" },
} as const;

export const BOOKING_STATUS_LABELS = {
  pending: { label: "Pending", color: "#F59E0B" },
  confirmed: { label: "Confirmed", color: "#22D3EE" },
  "in-progress": { label: "In Progress", color: "#8B5CF6" },
  completed: { label: "Completed", color: "#10B981" },
  cancelled: { label: "Cancelled", color: "#EF4444" },
  rescheduled: { label: "Rescheduled", color: "#A1A1AA" },
} as const;

export const FACE_SHAPES = [
  "Oval",
  "Round",
  "Square",
  "Heart",
  "Diamond",
  "Oblong",
] as const;

export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

export const STAGGER_DELAY = 0.08;

export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  ABOUT: "/about",
  PRICING: "/pricing",
  AI_DEMO: "/ai-demo",
  GALLERY: "/gallery",
  CONTACT: "/contact",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  OTP: "/auth/otp",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  DASHBOARD: "/dashboard",
  APPOINTMENTS: "/dashboard/appointments",
  AI_RECOMMENDATIONS: "/dashboard/ai-recommendations",
  FAVORITES: "/dashboard/favorites",
  LOYALTY: "/dashboard/loyalty",
  MEMBERSHIP: "/dashboard/membership",
  SAVED_HAIRSTYLES: "/dashboard/saved-hairstyles",
  NOTIFICATIONS: "/dashboard/notifications",
  BEAUTY_REPORTS: "/dashboard/beauty-reports",
  BOOKING: "/booking",
  AI_ANALYSIS: "/ai/analysis",
  AI_CHATBOT: "/ai/chatbot",
  VIRTUAL_TRYON: "/ai/virtual-tryon",
  ANALYTICS: "/analytics",
} as const;
