import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin routes
        if (req.nextUrl?.pathname?.startsWith("/admin")) {
          return token?.role === "admin";
        }
        // Protect checkout and orders routes - requires authentication
        if (req.nextUrl?.pathname?.startsWith("/checkout") || req.nextUrl?.pathname?.startsWith("/orders")) {
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
     * Only apply middleware to specific protected routes
     */
    "/admin/:path*",
    "/checkout/:path*", 
    "/orders/:path*",
    "/profile/:path*",
    "/cart/:path*"
  ],
}; 