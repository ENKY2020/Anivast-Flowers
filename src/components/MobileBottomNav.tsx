"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Flower2,
  Gift,
  Tent,
  MessageCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import "../styles/mobile-bottom-nav.css";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const { user, isAdmin, logout } = useAuth();

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: House,
    },
    {
      href: "/flowers",
      label: "Flowers",
      icon: Flower2,
    },
    {
      href: "/packages",
      label: "Packages",
      icon: Gift,
    },
    {
      href: "/rentals",
      label: "Rentals",
      icon: Tent,
    },
    {
      href: "https://wa.me/254703234167",
      label: "Chat",
      icon: MessageCircle,
      external: true,
    },
  ];

  return (
    <>
      <nav className="mobile-bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-item"
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </a>
            );
          }

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`mobile-nav-item ${
                isActive ? "active" : ""
              }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="mobile-account-fab">
          {isAdmin && (
            <Link
              href="/admin"
              className="mobile-account-btn"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          )}

          <button
            type="button"
            onClick={logout}
            className="mobile-logout-btn"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </>
  );
}