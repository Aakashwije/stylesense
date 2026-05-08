import type {
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
  SignupInput,
} from "@/schemas";
import { apiClient } from "@/services/api/client";
import type { User } from "@/types";

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>("/auth/login", data);
    return res.data;
  },

  signup: async (data: SignupInput): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>("/auth/signup", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    return res.data;
  },

  verifyOtp: async (
    email: string,
    otp: string,
  ): Promise<{ verified: boolean }> => {
    const res = await apiClient.post<{ verified: boolean }>(
      "/auth/verify-otp",
      {
        email,
        otp,
      },
    );
    return res.data;
  },

  forgotPassword: async (
    data: ForgotPasswordInput,
  ): Promise<{ message: string }> => {
    const res = await apiClient.post<{ message: string }>(
      "/auth/forgot-password",
      data,
    );
    return res.data;
  },

  resetPassword: async (
    data: ResetPasswordInput & { token: string },
  ): Promise<{ message: string }> => {
    const res = await apiClient.post<{ message: string }>(
      "/auth/reset-password",
      {
        token: data.token,
        password: data.password,
      },
    );
    return res.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    const res = await apiClient.get<User>("/auth/me");
    return res.data;
  },
};
