"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { gallery as fallbackGallery } from "@/data/gallery";

import "@/styles/gallery-preview.css";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  featured: boolean;
  active: boolean;
}

export default function GalleryPreview() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("active", true)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      if (data && data.length > 0) {
        setGalleryItems(data);
      } else {
        setGalleryItems(
          fallbackGallery.map((item) => ({
            id: String(item.id),
            title: item.title,
            category: item.category,
            image_url: item.image,
            featured: true,
            active: true,
          }))
        );
      }
    } catch (error) {
      console.error("Gallery preview error:", error);

      setGalleryItems(
        fallbackGallery.map((item) => ({
          id: String(item.id),
          title: item.title,
          category: item.category,
          image_url: item.image,
          featured: true,
          active: true,
        }))
      );
    } finally {
      setLoading(false);
    }
  }

  const featuredItems = galleryItems
    .filter((item) => item.featured)
    .slice(0, 10);

  return (
    <section className="home-gallery">
      <div className="home-gallery-header">
        <span className="home-gallery-label">
          Event Showcase
        </span>

        <h2>
          Memories We've Created
        </h2>

        <p>
          Weddings, birthdays, corporate
          events, proposals and celebrations
          brought to life by Anivast.
        </p>
      </div>

      {loading ? (
        <div className="home-gallery-loading">
          Loading gallery...
        </div>
      ) : (
        <>
          <div className="home-gallery-scroll">

            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="home-gallery-card"
              >
                <div className="home-gallery-image">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="400px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="home-gallery-content">

                  <div className="home-gallery-top">

                    <span className="home-gallery-category">
                      {item.category}
                    </span>

                    {item.featured && (
                      <span className="home-gallery-featured">
                        <Star size={14} />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="home-gallery-footer">
            <Link
              href="/gallery"
              className="home-gallery-btn"
            >
              Explore Full Gallery
              <ArrowRight size={18} />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}