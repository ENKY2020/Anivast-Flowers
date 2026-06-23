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
  ArrowRight,
} from "lucide-react";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

import "@/styles/admin.css";

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
        "Valentine's Day, Christmas, Father's Day and special offers.",
      href: "/admin/events",
      icon: Sparkles,
    },
  ];

  return (
    <ProtectedRoute adminOnly>
      <main className="admin-dashboard">
        <div className="admin-container">

          <div className="admin-hero">
            <div>
              <h1>Anivast Admin</h1>
              <p>
                Welcome back {user?.email}
              </p>
            </div>

            <button
              onClick={logout}
              className="admin-logout-btn"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <div className="admin-tip-card">
            <h2>Marketing Tips</h2>

            <p>
              Featured flowers appear on the homepage.
              Featured packages appear in promotions.
              Featured gallery images appear in Memories
              We've Created. Use Seasonal Campaigns for
              Valentine's Day, Father's Day, Christmas and
              special offers.
            </p>
          </div>

          <div className="admin-quick-actions">
            <Link href="/admin/flowers">
              + Flower
            </Link>

            <Link href="/admin/packages">
              + Package
            </Link>

            <Link href="/admin/rentals">
              + Rental
            </Link>

            <Link href="/admin/events">
              + Campaign
            </Link>
          </div>

          <div className="admin-grid">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="admin-module-card"
                >
                  <div className="admin-module-icon">
                    <Icon size={34} />
                  </div>

                  <h3>{section.title}</h3>

                  <p>{section.description}</p>

                  <span className="admin-module-link">
                    Open
                    <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </main>
    </ProtectedRoute>
  );
}