"use client";

import { motion } from "framer-motion";
import {
  Download,
  Mail,
  MessageCircle,
  Printer,
  RotateCcw,
  X,
} from "lucide-react";
import { useRef } from "react";
import { fmtDateTime } from "../data";
import type { Transaction } from "../types";

interface Props {
  transaction: Transaction;
  taxConfig: {
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    vatNumber: string;
    tin: string;
  };
  onClose: () => void;
  onReprint?: () => void;
}

const METHOD_LABEL: Record<string, string> = {
  cash: "Cash",
  card: "Card",
  gift_voucher: "Gift Voucher",
  loyalty: "Loyalty Points",
  bank_transfer: "Bank Transfer",
};

function ReceiptBody({
  t,
  taxConfig,
}: {
  t: Transaction;
  taxConfig: Props["taxConfig"];
}) {
  return (
    <div
      id="receipt-printable"
      style={{
        fontFamily: "'Courier New', monospace",
        background: "#fff",
        color: "#000",
        padding: "24px",
        width: "320px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          borderBottom: "1px dashed #ccc",
          paddingBottom: "12px",
          marginBottom: "12px",
        }}
      >
        <h1 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
          {taxConfig.companyName}
        </h1>
        <p style={{ fontSize: "11px", margin: "4px 0 0", color: "#555" }}>
          {taxConfig.companyAddress}
        </p>
        <p style={{ fontSize: "11px", margin: "2px 0 0", color: "#555" }}>
          {taxConfig.companyPhone}
        </p>
        {taxConfig.vatNumber && (
          <p style={{ fontSize: "10px", margin: "2px 0 0", color: "#888" }}>
            VAT: {taxConfig.vatNumber}
          </p>
        )}
        {taxConfig.tin && (
          <p style={{ fontSize: "10px", margin: "2px 0 0", color: "#888" }}>
            TIN: {taxConfig.tin}
          </p>
        )}
      </div>

      {/* Meta */}
      <div style={{ fontSize: "11px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#555" }}>Invoice:</span>
          <span style={{ fontWeight: "bold" }}>{t.receiptNumber}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#555" }}>Transaction:</span>
          <span>{t.id}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#555" }}>Date:</span>
          <span>{fmtDateTime(t.timestamp)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#555" }}>Client:</span>
          <span>{t.clientName}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#555" }}>Cashier:</span>
          <span>{t.cashierName}</span>
        </div>
        {t.staffName && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#555" }}>Stylist:</span>
            <span>{t.staffName}</span>
          </div>
        )}
      </div>

      {/* Items */}
      <div
        style={{
          borderTop: "1px dashed #ccc",
          borderBottom: "1px dashed #ccc",
          padding: "10px 0",
          marginBottom: "10px",
        }}
      >
        {t.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              marginBottom: "4px",
            }}
          >
            <div style={{ flex: 1 }}>
              <span>{item.name}</span>
              {item.qty > 1 && (
                <span style={{ color: "#888", fontSize: "10px" }}>
                  {" "}
                  × {item.qty}
                </span>
              )}
              {item.stylistName && (
                <div style={{ fontSize: "10px", color: "#888" }}>
                  ({item.stylistName})
                </div>
              )}
            </div>
            <span style={{ fontWeight: "bold" }}>
              LKR {(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ fontSize: "12px", marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "3px",
          }}
        >
          <span style={{ color: "#555" }}>Subtotal</span>
          <span>LKR {t.subtotal.toLocaleString()}</span>
        </div>
        {t.discountAmount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "3px",
            }}
          >
            <span style={{ color: "#555" }}>
              Discount
              {t.discountConfig?.label ? ` (${t.discountConfig.label})` : ""}
            </span>
            <span style={{ color: "#16a34a" }}>
              − LKR {t.discountAmount.toLocaleString()}
            </span>
          </div>
        )}
        {t.loyaltyPointsRedeemed > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "3px",
            }}
          >
            <span style={{ color: "#555" }}>Loyalty Redemption</span>
            <span style={{ color: "#16a34a" }}>
              − LKR {t.loyaltyPointsRedeemed.toLocaleString()}
            </span>
          </div>
        )}
        {t.serviceCharge > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "3px",
            }}
          >
            <span style={{ color: "#555" }}>Service Charge (5%)</span>
            <span>LKR {t.serviceCharge.toLocaleString()}</span>
          </div>
        )}
        {t.tipAmount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "3px",
            }}
          >
            <span style={{ color: "#555" }}>Tip</span>
            <span>LKR {t.tipAmount.toLocaleString()}</span>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "3px",
          }}
        >
          <span style={{ color: "#555" }}>
            Tax ({t.taxRate}%{t.taxInclusive ? " incl." : ""})
          </span>
          <span>LKR {t.taxAmount.toLocaleString()}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "14px",
            borderTop: "1px solid #000",
            paddingTop: "6px",
            marginTop: "6px",
          }}
        >
          <span>TOTAL</span>
          <span>LKR {t.total.toLocaleString()}</span>
        </div>
      </div>

      {/* Payments */}
      <div
        style={{
          borderTop: "1px dashed #ccc",
          paddingTop: "10px",
          marginBottom: "12px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "#888",
            marginBottom: "4px",
            fontWeight: "bold",
          }}
        >
          PAYMENT BREAKDOWN
        </p>
        {t.payments.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              marginBottom: "3px",
            }}
          >
            <span>
              {METHOD_LABEL[p.method] ?? p.method}
              {p.cardLast4 ? ` ••••${p.cardLast4}` : ""}
              {p.reference ? ` (${p.reference})` : ""}
            </span>
            <span>LKR {p.amount.toLocaleString()}</span>
          </div>
        ))}
        {t.balance < 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            <span>Change</span>
            <span>LKR {Math.abs(t.balance).toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Loyalty */}
      {t.loyaltyPointsEarned > 0 && (
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "6px",
            padding: "8px",
            fontSize: "11px",
            marginBottom: "12px",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>
            🎉 +{t.loyaltyPointsEarned} loyalty points earned
          </p>
          {t.nextService && (
            <p style={{ margin: "4px 0 0", color: "#555" }}>
              Recommended next: {t.nextService}
            </p>
          )}
          {t.rebookDate && (
            <p style={{ margin: "2px 0 0", color: "#555" }}>
              Book again: {t.rebookDate}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "#888",
          borderTop: "1px dashed #ccc",
          paddingTop: "12px",
        }}
      >
        <p style={{ margin: 0 }}>
          Thank you for visiting {taxConfig.companyName}!
        </p>
        <p style={{ margin: "4px 0 0" }}>This is your official receipt.</p>
        {t.status === "refunded" && (
          <p
            style={{ margin: "8px 0 0", color: "#dc2626", fontWeight: "bold" }}
          >
            ** REFUNDED **
          </p>
        )}
        {t.status === "voided" && (
          <p
            style={{ margin: "8px 0 0", color: "#dc2626", fontWeight: "bold" }}
          >
            ** VOIDED **
          </p>
        )}
      </div>
    </div>
  );
}

export default function ReceiptModal({
  transaction: t,
  taxConfig,
  onClose,
  onReprint,
}: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current?.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank", "width=400,height=700");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${t.receiptNumber} — ${taxConfig.companyName}</title>
          <style>
            body { margin: 0; padding: 16px; }
            @page { size: 80mm auto; margin: 0; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(
      `Receipt ${t.receiptNumber} — ${taxConfig.companyName}`,
    );
    const body = encodeURIComponent(
      `Dear ${t.clientName},\n\nThank you for visiting ${taxConfig.companyName}.\n\n` +
        `Receipt: ${t.receiptNumber}\nDate: ${fmtDateTime(t.timestamp)}\n` +
        t.items
          .map(
            (i) =>
              `${i.name} × ${i.qty} — LKR ${(i.price * i.qty).toLocaleString()}`,
          )
          .join("\n") +
        `\n\nTotal: LKR ${t.total.toLocaleString()}\n\nSee you again soon!`,
    );
    const to = t.clientEmail ? encodeURIComponent(t.clientEmail) : "";
    window.open(`mailto:${to}?subject=${subject}&body=${body}`);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `*${taxConfig.companyName} — Receipt ${t.receiptNumber}*\n` +
        `Date: ${fmtDateTime(t.timestamp)}\nClient: ${t.clientName}\n\n` +
        t.items
          .map(
            (i) =>
              `• ${i.name} × ${i.qty}: LKR ${(i.price * i.qty).toLocaleString()}`,
          )
          .join("\n") +
        `\n\n*Total: LKR ${t.total.toLocaleString()}*\nThank you for visiting us! 💇‍♀️`,
    );
    const phone = t.clientPhone?.replace(/\D/g, "");
    window.open(
      `https://api.whatsapp.com/send?${phone ? `phone=${phone}&` : ""}text=${msg}`,
      "_blank",
    );
  };

  const statusColors: Record<string, string> = {
    paid: "#10B981",
    partial: "#F59E0B",
    refunded: "#EF4444",
    voided: "#EF4444",
    cancelled: "#52525B",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141419] border border-[#27272A] rounded-2xl w-full max-w-sm flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#27272A] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[#F5F5F7] font-bold text-sm">
                {t.receiptNumber}
              </h3>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase"
                style={{
                  background: `${statusColors[t.status]}20`,
                  color: statusColors[t.status],
                }}
              >
                {t.status}
              </span>
            </div>
            <p className="text-[#52525B] text-xs">{t.id}</p>
          </div>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-[#52525B] hover:text-[#F5F5F7]" />
          </button>
        </div>

        {/* Scrollable receipt preview */}
        <div className="overflow-y-auto flex-1 bg-white rounded-xl m-4 mb-3 shadow-inner">
          <div ref={printRef}>
            <ReceiptBody t={t} taxConfig={taxConfig} />
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 pb-4 shrink-0 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="h-9 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs hover:border-[#8B5CF6]/40 flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={handlePrint}
              className="h-9 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs hover:border-[#8B5CF6]/40 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
            <button
              onClick={handleEmail}
              className="h-9 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs hover:border-[#8B5CF6]/40 flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </button>
            <button
              onClick={handleWhatsApp}
              className="h-9 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs hover:border-[#8B5CF6]/40 flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </button>
          </div>
          <div className="flex gap-2">
            {onReprint && (
              <button
                onClick={onReprint}
                className="flex-1 h-9 rounded-xl border border-[#27272A] text-[#A1A1AA] text-xs hover:border-[#8B5CF6]/40 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reprint Last
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 h-9 rounded-xl bg-[#8B5CF6] text-white text-xs font-semibold hover:bg-[#7C3AED]"
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
