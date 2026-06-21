"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Share2 } from "lucide-react";

import { flowers as fallbackFlowers } from "@/data/flowers";
import { supabase } from "@/lib/supabase";

import "@/styles/featured-flowers.css";

interface Flower {
  id?: string | number;
  name: string;
  slug: string;
  category: string;
  price: number | string;
  image_url?: string;
  image?: string;
  featured?: boolean;
  active?: boolean;
}

export default function FeaturedFlowers() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedFlowers();
  }, []);

  async function loadFeaturedFlowers() {
    try {
      const { data, error } = await supabase
        .from("flowers")
        .select("*")
        .eq("featured", true)
        .eq("active", true)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

     const supabaseFlowers =
  data?.map((flower: Flower) => ({
          ...flower,
          image:
            flower.image_url ||
            flower.image,
        })) || [];

      const mergedFlowers = [
        ...supabaseFlowers,
        ...fallbackFlowers,
      ];

      const uniqueFlowers =
        mergedFlowers.filter(
          (flower, index, self) =>
            index ===
            self.findIndex(
              (f) =>
                f.slug ===
                flower.slug
            )
        );

      setFlowers(
        uniqueFlowers.slice(0, 8)
      );
    } catch (error) {
      console.error(
        "Featured flowers error:",
        error
      );

      setFlowers(
        fallbackFlowers.slice(0, 8)
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return null;
  }

  return (
    <section className="featured-flowers">
      <div className="section-header">
        <div>
          <h2>Featured Flowers</h2>

          <p>
            Discover our most loved floral
            creations.
          </p>
        </div>

        <Link
          href="/flowers"
          className="view-all-link"
        >
          View All →
        </Link>
      </div>

      <div className="flowers-grid">
        {flowers.map((flower) => {
          const image =
            flower.image_url ||
            flower.image ||
            "/images/placeholder.jpg";

          const price =
            typeof flower.price ===
            "number"
              ? `KES ${flower.price.toLocaleString()}`
              : flower.price;

          return (
            <div
              key={
                flower.id ||
                flower.slug
              }
              className="flower-card"
            >
              <div className="flower-image-wrapper">
                <img
                  src={image}
                  alt={flower.name}
                  className="flower-image"
                />

                <span className="flower-badge">
                  {flower.category}
                </span>

                <div className="flower-actions">
                  <button className="flower-heart">
                    <Heart size={18} />
                  </button>

                  <button
                    className="flower-share"
                    onClick={() => {
                      if (
                        navigator.share
                      ) {
                        navigator.share({
                          title:
                            flower.name,
                          text:
                            flower.name,
                          url: `${window.location.origin}/flowers/${flower.slug}`,
                        });
                      }
                    }}
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flower-content">
                <h3>
                  {flower.name}
                </h3>

                <p className="flower-price">
                  {price}
                </p>

                <div className="flower-buttons">
                  <Link
                    href={`/flowers/${flower.slug}`}
                    className="flower-btn"
                  >
                    View Details
                  </Link>

                  <a
                    href={`https://wa.me/254703234167?text=${encodeURIComponent(
                      `Hello Anivast, I am interested in ${flower.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flower-order-btn"
                  >
                    Order
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}