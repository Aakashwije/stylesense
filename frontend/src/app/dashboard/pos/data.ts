import type { Client, Stylist, TaxConfig, Transaction } from "./types";

export const DEFAULT_TAX_CONFIG: TaxConfig = {
  rate: 8,
  inclusive: false,
  vatNumber: "VAT-LK-123456789",
  tin: "TIN-987654321",
  companyName: "Glamour Studio",
  companyAddress: "No. 42, Galle Road, Colombo 03",
  companyPhone: "+94 11 234 5678",
};

export const QUICK_SERVICES = [
  { id: "qs1", name: "Haircut & Style", price: 2500, type: "service" as const },
  { id: "qs2", name: "Balayage", price: 18000, type: "service" as const },
  { id: "qs3", name: "Blowout", price: 1800, type: "service" as const },
  {
    id: "qs4",
    name: "Keratin Treatment",
    price: 22000,
    type: "service" as const,
  },
  { id: "qs5", name: "Highlights", price: 14000, type: "service" as const },
  {
    id: "qs6",
    name: "Colour (Global)",
    price: 9500,
    type: "service" as const,
  },
  {
    id: "qs7",
    name: "Deep Conditioning",
    price: 3500,
    type: "service" as const,
  },
  {
    id: "qs8",
    name: "Scalp Treatment",
    price: 4000,
    type: "service" as const,
  },
  {
    id: "qs9",
    name: "Brazilian Blowout",
    price: 15000,
    type: "service" as const,
  },
  { id: "qs10", name: "Nail Art", price: 3000, type: "service" as const },
  { id: "qs11", name: "Manicure", price: 1500, type: "service" as const },
  { id: "qs12", name: "Pedicure", price: 2000, type: "service" as const },
];

export const PRODUCTS = [
  {
    id: "pr1",
    name: "Olaplex No.3 150ml",
    price: 7500,
    type: "product" as const,
    stock: 12,
  },
  {
    id: "pr2",
    name: "Tigi Bed Head Shampoo",
    price: 4500,
    type: "product" as const,
    stock: 8,
  },
  {
    id: "pr3",
    name: "L'Oréal Hair Mask",
    price: 5200,
    type: "product" as const,
    stock: 5,
  },
  {
    id: "pr4",
    name: "Keratin Serum 100ml",
    price: 3800,
    type: "product" as const,
    stock: 0,
  },
  {
    id: "pr5",
    name: "Moroccan Oil 100ml",
    price: 6800,
    type: "product" as const,
    stock: 3,
  },
  {
    id: "pr6",
    name: "Color-Safe Conditioner",
    price: 3200,
    type: "product" as const,
    stock: 15,
  },
  {
    id: "pr7",
    name: "Heat Protection Spray",
    price: 2800,
    type: "product" as const,
    stock: 7,
  },
  {
    id: "pr8",
    name: "Scalp Serum 50ml",
    price: 4200,
    type: "product" as const,
    stock: 2,
  },
];

export const CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Dilhani Perera",
    phone: "+94 77 123 4567",
    email: "dilhani@email.com",
    loyaltyPoints: 450,
    memberLevel: "gold",
  },
  {
    id: "c2",
    name: "Sanduni Fernando",
    phone: "+94 71 234 5678",
    email: "sanduni@email.com",
    loyaltyPoints: 120,
    memberLevel: "silver",
  },
  {
    id: "c3",
    name: "Thilini Silva",
    phone: "+94 76 345 6789",
    email: "thilini@email.com",
    loyaltyPoints: 890,
    memberLevel: "platinum",
  },
  {
    id: "c4",
    name: "Nadeesha Wickramasinghe",
    phone: "+94 70 456 7890",
    email: "nadeesha@email.com",
    loyaltyPoints: 30,
    memberLevel: "bronze",
  },
  {
    id: "c5",
    name: "Chamari Jayawardena",
    phone: "+94 72 567 8901",
    email: "chamari@email.com",
    loyaltyPoints: 200,
    memberLevel: "silver",
  },
  {
    id: "walk-in",
    name: "Walk-in Guest",
    phone: "",
    email: "",
    loyaltyPoints: 0,
    memberLevel: null,
  },
];

export const STYLISTS: Stylist[] = [
  { id: "st1", name: "Kamala N." },
  { id: "st2", name: "Roshani P." },
  { id: "st3", name: "Amara S." },
  { id: "st4", name: "Priya D." },
];

export const PROMO_CODES: Record<
  string,
  { type: "percent" | "amount"; value: number; label: string }
> = {
  SAVE10: { type: "percent", value: 10, label: "10% Off — SAVE10" },
  WELCOME20: { type: "percent", value: 20, label: "20% Off — WELCOME20" },
  LKR500: { type: "amount", value: 500, label: "LKR 500 Off — LKR500" },
  GLAM25: { type: "percent", value: 25, label: "25% Off — GLAM25" },
};

export const SERVICE_CHARGE_RATE = 5; // 5%
export const LOYALTY_EARN_RATE = 1; // 1 point per 100 LKR spent
export const LOYALTY_REDEEM_RATE = 1; // 1 point = 1 LKR
export const MANAGER_PIN = "1234";
export const LOW_STOCK_THRESHOLD = 3;
export const LARGE_DISCOUNT_THRESHOLD = 20; // % — above this needs manager approval

let txnCounter = 1002;
let receiptCounter = 2002;

export function generateTxnId(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  txnCounter++;
  return `TXN-${date}-${txnCounter}`;
}

export function generateReceiptNumber(): string {
  receiptCounter++;
  return `INV-${receiptCounter}`;
}

export function fmtLKR(n: number): string {
  return `LKR ${Math.round(n).toLocaleString("en-LK")}`;
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function fmtDateTime(d: Date): string {
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-20260510-1001",
    receiptNumber: "INV-2001",
    status: "paid",
    clientName: "Dilhani Perera",
    clientPhone: "+94 77 123 4567",
    clientEmail: "dilhani@email.com",
    isWalkIn: false,
    items: [
      {
        id: "qs1",
        name: "Haircut & Style",
        type: "service",
        price: 2500,
        qty: 1,
        stylistName: "Kamala N.",
      },
      {
        id: "qs3",
        name: "Blowout",
        type: "service",
        price: 1800,
        qty: 1,
        stylistName: "Kamala N.",
      },
    ],
    subtotal: 4300,
    discountConfig: null,
    discountAmount: 0,
    serviceCharge: 0,
    tipAmount: 500,
    taxAmount: 344,
    taxRate: 8,
    taxInclusive: false,
    total: 5144,
    payments: [{ id: "p1", method: "card", amount: 5144, cardLast4: "4242" }],
    amountPaid: 5144,
    balance: 0,
    staffName: "Kamala N.",
    cashierName: "Admin",
    notes: "",
    nextService: "Deep Conditioning",
    rebookDate: "2026-05-24",
    loyaltyPointsEarned: 51,
    loyaltyPointsRedeemed: 0,
    refunds: [],
    timestamp: new Date("2026-05-10T09:30:00"),
  },
  {
    id: "TXN-20260510-1002",
    receiptNumber: "INV-2002",
    status: "refunded",
    clientName: "Sanduni Fernando",
    clientPhone: "+94 71 234 5678",
    clientEmail: "sanduni@email.com",
    isWalkIn: false,
    items: [
      {
        id: "qs5",
        name: "Highlights",
        type: "service",
        price: 14000,
        qty: 1,
        stylistName: "Roshani P.",
      },
    ],
    subtotal: 14000,
    discountConfig: {
      type: "member",
      value: 10,
      label: "10% Member Discount",
    },
    discountAmount: 1400,
    serviceCharge: 0,
    tipAmount: 0,
    taxAmount: 1012,
    taxRate: 8,
    taxInclusive: false,
    total: 13612,
    payments: [{ id: "p2", method: "cash", amount: 13612 }],
    amountPaid: 13612,
    balance: 0,
    staffName: "Roshani P.",
    cashierName: "Admin",
    notes: "Client dissatisfied with result",
    nextService: "",
    rebookDate: "",
    loyaltyPointsEarned: 136,
    loyaltyPointsRedeemed: 0,
    refunds: [
      {
        id: "ref1",
        itemIds: [],
        amount: 13612,
        reason: "Service quality issue",
        method: "cash",
        timestamp: new Date("2026-05-10T11:00:00"),
        authorizedBy: "Manager",
      },
    ],
    timestamp: new Date("2026-05-10T08:00:00"),
  },
  {
    id: "TXN-20260510-1003",
    receiptNumber: "INV-2003",
    status: "paid",
    clientName: "Thilini Silva",
    clientPhone: "+94 76 345 6789",
    clientEmail: "thilini@email.com",
    isWalkIn: false,
    items: [
      {
        id: "qs2",
        name: "Balayage",
        type: "service",
        price: 18000,
        qty: 1,
        stylistName: "Amara S.",
      },
      {
        id: "pr1",
        name: "Olaplex No.3 150ml",
        type: "product",
        price: 7500,
        qty: 1,
      },
    ],
    subtotal: 25500,
    discountConfig: {
      type: "promo",
      value: 25,
      label: "25% Off — GLAM25",
      code: "GLAM25",
    },
    discountAmount: 6375,
    serviceCharge: 954,
    tipAmount: 1000,
    taxAmount: 1686,
    taxRate: 8,
    taxInclusive: false,
    total: 22765,
    payments: [
      { id: "p3", method: "card", amount: 15000, cardLast4: "1234" },
      { id: "p4", method: "cash", amount: 7765 },
    ],
    amountPaid: 22765,
    balance: 0,
    staffName: "Amara S.",
    cashierName: "Admin",
    notes: "Platinum member — VIP treatment",
    nextService: "Olaplex Treatment",
    rebookDate: "2026-06-07",
    loyaltyPointsEarned: 227,
    loyaltyPointsRedeemed: 0,
    refunds: [],
    timestamp: new Date("2026-05-10T10:45:00"),
  },
];
