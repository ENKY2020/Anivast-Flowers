"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Flower2,
  Gift,
  Tent,
  MessageCircle,
} from "lucide-react";

import "@/styles/mobile-bottom-nav.css";

export default function MobileBottomNav() {
  const pathname = usePathname();

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
      href: "https://wa.me/254700000000",
      label: "Chat",
      icon: MessageCircle,
      external: true,
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
              className="mobile-nav-item whatsapp-item"
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`mobile-nav-item ${
              pathname === item.href ? "active" : ""
            }`}
          >
            <Icon size={22} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}