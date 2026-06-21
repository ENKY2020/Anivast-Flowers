"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface WishlistItem {
  id: string;
  name: string;
  image?: string;
}

interface WishlistButtonProps {
  id: string;
  name: string;
  image?: string;
}

export default function WishlistButton({
  id,
  name,
  image,
}: WishlistButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const wishlist: WishlistItem[] = JSON.parse(
      localStorage.getItem("anivast-wishlist") || "[]"
    );

    setSaved(
      wishlist.some((item) => item.id === id)
    );
  }, [id]);

  const toggleWishlist = () => {
    const wishlist: WishlistItem[] = JSON.parse(
      localStorage.getItem("anivast-wishlist") || "[]"
    );

    const exists = wishlist.some(
      (item) => item.id === id
    );

    let updatedWishlist: WishlistItem[];

    if (exists) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== id
      );

      setSaved(false);
    } else {
      updatedWishlist = [
        ...wishlist,
        {
          id,
          name,
          image,
        },
      ];

      setSaved(true);
    }

    localStorage.setItem(
      "anivast-wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <button
      onClick={toggleWishlist}
      aria-label="Add to wishlist"
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        border: saved
          ? "none"
          : "2px solid #b22222",
        background: saved
          ? "#b22222"
          : "#ffffff",
        color: saved
          ? "#ffffff"
          : "#b22222",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.25s ease",
      }}
    >
      <Heart
        size={22}
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}