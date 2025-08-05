"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminProtectedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AdminProtected({ children, fallback }: AdminProtectedProps) {
  const { session, isAuthenticated, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (session?.user?.role !== "admin") {
      router.push("/");
      return;
    }
  }, [isAuthenticated, session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || session?.user?.role !== "admin") {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-2">
            Access Denied
          </div>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 