import { apiClient } from "@/services/api/client";

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export interface PaymentIntent {
  clientSecret: string;
  intentId: string;
  amount: number;
  currency: string;
}

export const paymentsService = {
  createPaymentIntent: async (
    amount: number,
    bookingId: string,
  ): Promise<PaymentIntent> => {
    const res = await apiClient.post<PaymentIntent>("/payments/intent", {
      amount,
      bookingId,
    });
    return res.data;
  },

  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const res = await apiClient.get<PaymentMethod[]>("/payments/methods");
    return res.data;
  },

  addPaymentMethod: async (paymentMethodId: string): Promise<PaymentMethod> => {
    const res = await apiClient.post<PaymentMethod>("/payments/methods", {
      paymentMethodId,
    });
    return res.data;
  },

  removePaymentMethod: async (
    methodId: string,
  ): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(
      `/payments/methods/${methodId}`,
    );
    return res.data;
  },

  setDefaultPaymentMethod: async (
    methodId: string,
  ): Promise<{ message: string }> => {
    const res = await apiClient.patch<{ message: string }>(
      `/payments/methods/${methodId}/default`,
    );
    return res.data;
  },

  getTransactionHistory: async (): Promise<{
    transactions: Array<{
      id: string;
      amount: number;
      currency: string;
      description: string;
      date: string;
      status: "succeeded" | "pending" | "failed";
    }>;
  }> => {
    const res = await apiClient.get("/payments/history");
    return res.data;
  },
};
