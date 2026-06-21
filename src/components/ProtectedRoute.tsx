"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    user,
    loading,
    isAdmin,
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (adminOnly && !isAdmin) {
      router.replace("/");
    }
  }, [
    user,
    loading,
    isAdmin,
    adminOnly,
    router,
  ]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#faf7f2",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2>Loading Dashboard...</h2>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (adminOnly && !isAdmin) return null;

  return <>{children}</>;
}