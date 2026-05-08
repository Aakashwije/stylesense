import type {
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
  SignupInput,
} from "@/schemas";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    token,
    setUser,
    setToken,
    logout: storeLogout,
  } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (response) => {
      setUser(response.user);
      setToken(response.token);
      router.push("/dashboard");
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupInput) => authService.signup(data),
    onSuccess: (response) => {
      setUser(response.user);
      setToken(response.token);
      router.push("/auth/otp");
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordInput) => authService.forgotPassword(data),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordInput & { token: string }) =>
      authService.resetPassword(data),
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  const logout = useCallback(() => {
    storeLogout();
    router.push("/auth/login");
  }, [storeLogout, router]);

  return {
    user,
    isAuthenticated,
    token,
    logout,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    loginLoading: loginMutation.isPending,
    signupLoading: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
}
