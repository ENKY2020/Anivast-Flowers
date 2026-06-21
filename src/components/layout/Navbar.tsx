"use client";

import Link from "next/link";
import Image from "next/image";

import { User, LayoutDashboard, LogOut } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import "../../styles/navbar.css";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link href="/" className="logo">
          <Image
            src="/logos.png"
            alt="Anivast Flowers"
            width={65}
            height={65}
            priority
          />

          <div className="logo-text">
            <h2>Anivast</h2>
            <span>Flowers, Events & Decor</span>
          </div>
        </Link>

        <nav>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/flowers">Flowers</Link></li>
            <li><Link href="/packages">Packages</Link></li>
            <li><Link href="/rentals">Rentals</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/plan-event">Plan Event</Link></li>
          </ul>
        </nav>

        <div className="navbar-actions">

          {!user && (
            <Link
              href="/login"
              className="login-btn"
            >
              <User size={18} />
              Login
            </Link>
          )}

          {user && (
            <div className="account-menu">

              {isAdmin && (
                <Link
                  href="/admin"
                  className="dashboard-btn"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="logout-btn"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}

          <a
            href="https://wa.me/254703234167"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            WhatsApp Order
          </a>

        </div>
      </div>
    </header>
  );
}