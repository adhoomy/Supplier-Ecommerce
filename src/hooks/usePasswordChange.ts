import { useState } from "react";

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

interface PasswordChangeResult {
  success: boolean;
  message: string;
}

export function usePasswordChange() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const changePassword = async (data: PasswordChangeData): Promise<PasswordChangeResult> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to change password");
        return { success: false, message: result.error || "Failed to change password" };
      }

      setSuccess(result.message || "Password changed successfully");
      return { success: true, message: result.message || "Password changed successfully" };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    changePassword,
    isLoading,
    error,
    success,
    resetState,
  };
}
