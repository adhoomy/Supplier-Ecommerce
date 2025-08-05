import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface AdminCheckResult {
  isAdmin: boolean;
  error?: string;
}

/**
 * Server-side function to check if the current user is an admin
 */
export async function checkAdminStatus(): Promise<AdminCheckResult> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return {
        isAdmin: false,
        error: "Not authenticated"
      };
    }

    if (session.user.role !== "admin") {
      return {
        isAdmin: false,
        error: "Admin privileges required"
      };
    }

    return { isAdmin: true };
  } catch (error) {
    console.error("Error checking admin status:", error);
    return {
      isAdmin: false,
      error: "Failed to verify admin status"
    };
  }
}

/**
 * Client-side function to check if the current user is an admin
 */
export function isAdminClient(session: any): boolean {
  return session?.user?.role === "admin";
}

/**
 * Get admin-only routes that should be protected
 */
export const ADMIN_ROUTES = [
  "/admin",
  "/admin/users",
  "/admin/products",
  "/admin/orders",
  "/admin/analytics"
];

/**
 * Check if a route requires admin access
 */
export function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTES.some(route => pathname.startsWith(route));
} 