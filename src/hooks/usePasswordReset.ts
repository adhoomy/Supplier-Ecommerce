import { useState } from "react";

interface PasswordResetState {
  isLoading: boolean;
  message: string;
  error: string;
  resetUrl?: string;
}

export const usePasswordReset = () => {
  const [state, setState] = useState<PasswordResetState>({
    isLoading: false,
    message: "",
    error: "",
  });

  const requestPasswordReset = async (email: string) => {
    setState({
      isLoading: true,
      message: "",
      error: "",
    });

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setState({
          isLoading: false,
          message: data.message,
          error: "",
          resetUrl: data.resetUrl,
        });
        return { success: true, data };
      } else {
        setState({
          isLoading: false,
          message: "",
          error: data.error || "An error occurred",
        });
        return { success: false, error: data.error };
      }
    } catch (error) {
      setState({
        isLoading: false,
        message: "",
        error: "An error occurred. Please try again.",
      });
      return { success: false, error: "Network error" };
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setState({
      isLoading: true,
      message: "",
      error: "",
    });

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setState({
          isLoading: false,
          message: data.message,
          error: "",
        });
        return { success: true, data };
      } else {
        setState({
          isLoading: false,
          message: "",
          error: data.error || "An error occurred",
        });
        return { success: false, error: data.error };
      }
    } catch (error) {
      setState({
        isLoading: false,
        message: "",
        error: "An error occurred. Please try again.",
      });
      return { success: false, error: "Network error" };
    }
  };

  const clearState = () => {
    setState({
      isLoading: false,
      message: "",
      error: "",
    });
  };

  return {
    ...state,
    requestPasswordReset,
    resetPassword,
    clearState,
  };
};
