"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Flower2,
  Gift,
  Tent,
  Menu,
  MessageCircle,
  LayoutDashboard,
  LogOut,
  LogIn,
  X,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import "../styles/mobile-bottom-nav.css";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const { user, isAdmin, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

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
  ];

  return (
    <>
      <nav className="mobile-bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

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

        <button
          type="button"
          className="mobile-nav-item mobile-menu-trigger"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
          <span>Menu</span>
        </button>
      </nav>

      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="mobile-menu-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <h3>Anivast</h3>

              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-menu-links">
              <a
                href="https://wa.me/254703234167"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-link"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="mobile-menu-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
              )}

              {user ? (
                <button
                  type="button"
                  onClick={logout}
                  className="mobile-menu-link"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="mobile-menu-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}