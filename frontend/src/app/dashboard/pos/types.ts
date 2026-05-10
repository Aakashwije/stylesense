export type PaymentMethodType =
  | "cash"
  | "card"
  | "gift_voucher"
  | "loyalty"
  | "bank_transfer";

export type TransactionStatus =
  | "paid"
  | "partial"
  | "refunded"
  | "voided"
  | "cancelled";

export type DiscountType =
  | "amount"
  | "percent"
  | "promo"
  | "member"
  | "bundle"
  | "happy_hour";

export interface LineItem {
  id: string;
  name: string;
  type: "service" | "product";
  price: number;
  qty: number;
  stylistId?: string;
  stylistName?: string;
}

export interface PaymentEntry {
  id: string;
  method: PaymentMethodType;
  amount: number;
  reference?: string;
  cardLast4?: string;
}

export interface DiscountConfig {
  type: DiscountType;
  value: number;
  code?: string;
  label: string;
  approvedBy?: string;
}

export interface TaxConfig {
  rate: number; // percent e.g. 8
  inclusive: boolean; // is tax already included in price?
  vatNumber: string;
  tin: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
}

export interface RefundEntry {
  id: string;
  itemIds: string[]; // empty = full refund
  amount: number;
  reason: string;
  method: PaymentMethodType;
  timestamp: Date;
  authorizedBy: string;
}

export interface Transaction {
  id: string;
  receiptNumber: string;
  status: TransactionStatus;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  isWalkIn: boolean;
  items: LineItem[];
  subtotal: number;
  discountConfig: DiscountConfig | null;
  discountAmount: number;
  serviceCharge: number;
  tipAmount: number;
  taxAmount: number;
  taxRate: number;
  taxInclusive: boolean;
  total: number;
  payments: PaymentEntry[];
  amountPaid: number;
  balance: number;
  staffName: string;
  cashierName: string;
  notes: string;
  nextService: string;
  rebookDate: string;
  loyaltyPointsEarned: number;
  loyaltyPointsRedeemed: number;
  refunds: RefundEntry[];
  timestamp: Date;
}

export interface SuspendedBill {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientLoyaltyPoints: number;
  items: LineItem[];
  discountConfig: DiscountConfig | null;
  tipAmount: number;
  serviceChargeEnabled: boolean;
  notes: string;
  payments: PaymentEntry[];
  loyaltyRedeemed: number;
  suspendedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  memberLevel: "bronze" | "silver" | "gold" | "platinum" | null;
}

export interface Stylist {
  id: string;
  name: string;
}

export interface CatalogProduct extends LineItem {
  stock: number;
}
