// ─── User & Auth ───────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: "user" | "stylist" | "admin";
  loyaltyPoints: number;
  membershipTier: MembershipTier;
  createdAt: string;
}

export type MembershipTier = "free" | "essential" | "premium" | "elite";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Services ──────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: number; // minutes
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  addOns: ServiceAddOn[];
  isPopular?: boolean;
  isFeatured?: boolean;
}

export type ServiceCategory =
  | "haircut"
  | "coloring"
  | "bridal"
  | "facial"
  | "spa"
  | "nails"
  | "grooming";

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  duration: number;
}

// ─── Booking ───────────────────────────────────────────────────────────────
export interface Booking {
  id: string;
  userId: string;
  stylistId: string;
  services: Service[];
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalAmount: number;
  notes?: string;
  createdAt: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "rescheduled";

// ─── Stylist ───────────────────────────────────────────────────────────────
export interface Stylist {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  bio: string;
  specialties: ServiceCategory[];
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  isAvailable: boolean;
  portfolio: string[];
  bookingCount: number;
}

// ─── Review ────────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  stylistId: string;
  bookingId: string;
  rating: number;
  comment: string;
  beforeImage?: string;
  afterImage?: string;
  createdAt: string;
  likes: number;
}

// ─── Payments ──────────────────────────────────────────────────────────────
export interface PaymentMethod {
  id: string;
  type: "card" | "wallet" | "bank";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  bookingId: string;
  amount: number;
  tax: number;
  discount: number;
  total: number;
  status: "paid" | "pending" | "failed" | "refunded";
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: MembershipTier;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: string[];
  isPopular?: boolean;
}

// ─── AI Features ───────────────────────────────────────────────────────────
export interface HairstyleRecommendation {
  id: string;
  name: string;
  image: string;
  matchScore: number;
  faceShapes: string[];
  description: string;
  difficulty: "easy" | "medium" | "professional";
  maintenanceLevel: "low" | "medium" | "high";
}

export interface SkinAnalysis {
  skinType: string;
  concerns: string[];
  hydrationLevel: number;
  recommendations: string[];
  products: ProductRecommendation[];
}

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

// ─── Analytics ─────────────────────────────────────────────────────────────
export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
  newClients: number;
}

export interface BookingHeatmap {
  day: string;
  hour: number;
  count: number;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalBookings: number;
  bookingsChange: number;
  newClients: number;
  clientsChange: number;
  avgRating: number;
  ratingChange: number;
}

// ─── Notifications ─────────────────────────────────────────────────────────
export interface Notification {
  id: string;
  type: "booking" | "payment" | "review" | "promotion" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// ─── UI State ──────────────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
}
