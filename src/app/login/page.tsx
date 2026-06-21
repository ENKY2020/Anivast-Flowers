"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";

import "@/styles/login.css";

export default function LoginPage() {
  const router = useRouter();

  const {
    user,
    loading,
    isAdmin,
    signInWithGoogle,
  } = useAuth();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.push("/admin");
    }
  }, [user, loading, isAdmin, router]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      alert("Unable to sign in with Google.");
    }
  };

  return (
    <section className="login-page">
      <div className="login-container">

        <div className="login-hero">
          <div className="login-overlay">
            <span className="login-badge">
              Anivast Flowers, Events & Decor
            </span>

            <h1>
              Design Beautiful
              <br />
              Moments.
            </h1>

            <p>
              Manage flowers, event packages,
              rentals, gallery content and
              customer requests from one
              premium dashboard.
            </p>
          </div>
        </div>

        <div className="login-card">

          <div className="login-header">
            <h2>Administrator Login</h2>

            <p>
              Secure access for approved
              Anivast administrators.
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="google-login-btn"
            disabled={loading}
          >
            <FcGoogle size={22} />
            {loading
              ? "Connecting..."
              : "Continue with Google"}
          </button>

          <div className="login-footer-note">
            Only approved administrator
            accounts can access the dashboard.
          </div>

        </div>

      </div>
    </section>
  );
}