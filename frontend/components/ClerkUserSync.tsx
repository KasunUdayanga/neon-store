"use client";

import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export default function ClerkUserSync() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const lastSyncedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId || !user) {
      return;
    }

    if (lastSyncedUserId.current === userId) {
      return;
    }

    lastSyncedUserId.current = userId;

    const syncUser = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

        await fetch(`${backendUrl}/api/auth/clerk-sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: userId,
            email: user.primaryEmailAddress?.emailAddress || "",
            name:
              user.fullName ||
              [user.firstName, user.lastName].filter(Boolean).join(" ") ||
              user.username ||
              user.primaryEmailAddress?.emailAddress ||
              "Customer",
            imageUrl: user.imageUrl || "",
            provider: "clerk",
          }),
        });
      } catch {
        // Ignore sync errors so sign-in still works even if the API is down.
      }
    };

    void syncUser();
  }, [isLoaded, isSignedIn, user, userId]);

  return null;
}
