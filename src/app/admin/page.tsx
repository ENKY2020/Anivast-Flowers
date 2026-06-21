"use client";

import Link from "next/link";
import {
  Flower2,
  Package,
  Tent,
  ImageIcon,
  Megaphone,
  Sparkles,
  LogOut,
} from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const { user, logout } = useAuth();

  const sections = [
    {
      title: "Flowers",
      description:
        "Manage flower products, bouquets and featured homepage flowers.",
      href: "/admin/flowers",
      icon: Flower2,
    },
    {
      title: "Packages",
      description:
        "Create and update event packages displayed to customers.",
      href: "/admin/packages",
      icon: Package,
    },
    {
      title: "Rentals",
      description:
        "Manage chairs, tents, backdrops and event rentals.",
      href: "/admin/rentals",
      icon: Tent,
    },
    {
      title: "Gallery",
      description:
        "Upload and manage event photos shown in the public gallery.",
      href: "/admin/gallery",
      icon: ImageIcon,
    },
    {
      title: "Marketing Center",
      description:
        "Manage homepage promotions and customer-facing campaigns.",
      href: "/admin/events",
      icon: Megaphone,
    },
    {
      title: "Seasonal Campaigns",
      description:
        "Valentine's Day, Father's Day, Christmas and special offers.",
      href: "/admin/events",
      icon: Sparkles,
    },
  ];

  return (
    <ProtectedRoute adminOnly>
      <main
        style={{
          minHeight: "100vh",
          background: "#faf7f2",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "50px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2.7rem",
                  color: "#7a1f1f",
                  marginBottom: "10px",
                }}
              >
                Anivast Admin Dashboard
              </h1>

              <p
                style={{
                  color: "#666",
                  fontSize: "1rem",
                }}
              >
                Welcome back {user?.email}
              </p>
            </div>

            <button
              onClick={logout}
              style={{
                background: "#7a1f1f",
                color: "#fff",
                border: "none",
                padding: "14px 24px",
                borderRadius: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: 600,
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Quick Notice */}
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "20px",
              marginBottom: "40px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                color: "#7a1f1f",
                marginBottom: "10px",
              }}
            >
              Marketing Tips
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: 1.7,
              }}
            >
              Featured flowers appear on the homepage.
              Featured packages appear in promotions.
              Featured gallery images appear inside
              "Memories We've Created".
              Use Seasonal Campaigns to plan Valentine's,
              Father's Day, Mother's Day, Christmas and
              other special offers.
            </p>
          </div>

          {/* Modules */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "24px",
            }}
          >
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.title}
                  href={section.href}
                  style={{
                    background: "#fff",
                    borderRadius: "22px",
                    padding: "28px",
                    textDecoration: "none",
                    color: "inherit",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.06)",
                    transition: "all .3s ease",
                  }}
                >
                  <Icon
                    size={42}
                    color="#7a1f1f"
                    style={{
                      marginBottom: "18px",
                    }}
                  />

                  <h3
                    style={{
                      color: "#7a1f1f",
                      marginBottom: "12px",
                    }}
                  >
                    {section.title}
                  </h3>

                  <p
                    style={{
                      color: "#666",
                      lineHeight: 1.7,
                    }}
                  >
                    {section.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}