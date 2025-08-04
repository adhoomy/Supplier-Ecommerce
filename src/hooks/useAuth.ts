"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return {
    session,
    status,
    isAuthenticated: !!session,
    user: session?.user,
    logout,
  };
} 