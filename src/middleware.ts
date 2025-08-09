import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Next.js middleware for route protection
 * Uses NextAuth.js withAuth wrapper for authentication
 */
export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl?.pathname;
        
        // Protect admin routes - requires admin role
        if (pathname?.startsWith("/admin")) {
          return token?.role === "admin";
        }
        
        // Protect checkout and orders routes - requires authentication
        if (pathname?.startsWith("/checkout") || pathname?.startsWith("/orders")) {
          return !!token; // Must be authenticated
        }
        
        // Allow all other routes
        return true;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Apply middleware to protected routes only
     * This improves performance by not running middleware on public routes
     */
    "/admin/:path*",    // Admin panel routes
    "/checkout/:path*", // Checkout process
    "/orders/:path*",   // Order management
    "/profile/:path*",  // User profile
    "/cart/:path*"      // Shopping cart
  ],
}; 