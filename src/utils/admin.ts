import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: ObjectId;
  userId: ObjectId;
  items: Array<{
    productId: ObjectId;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

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