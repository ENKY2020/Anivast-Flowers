import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Anivast Flowers, Events & Decor",

  description:
    "Elegant flowers, unforgettable events and premium rentals.",

  manifest: "/manifest.json",

  keywords: [
    "flowers",
    "bouquets",
    "events",
    "decor",
    "rentals",
    "wedding flowers",
    "Anivast",
  ],

  themeColor: "#b22222",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Anivast",
  },

  icons: {
    icon: [
      {
        url: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/icons/icon-192.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />

          <main>{children}</main>

          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}