"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSetupRedirect() {
  const [isChecking, setIsChecking] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const response = await fetch("/api/admin/check-setup");
        const data = await response.json();
        
        if (data.needsSetup) {
          setNeedsSetup(true);
          router.push("/setup-admin");
        }
      } catch (error) {
        console.error("Failed to check admin setup:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkSetup();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking system setup...</p>
        </div>
      </div>
    );
  }

  return null;
}
