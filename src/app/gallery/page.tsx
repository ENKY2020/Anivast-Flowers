"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import "@/styles/gallery.css";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  featured: boolean;
  active: boolean;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState("All");

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

      setGallery(data || []);
    } catch (error) {
      console.error(
        "Gallery fetch error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    "All",
    ...new Set(
      gallery.map(
        (item) => item.category
      )
    ),
  ];

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter(
          (item) =>
            item.category === activeCategory
        );

  return (
    <main className="gallery-page">
      <div className="gallery-container">

        <div className="gallery-header">
          <h1>Event Gallery</h1>

          <p>
            Explore weddings, birthdays,
            proposals, corporate events,
            flowers and unforgettable
            celebrations.
          </p>
        </div>

        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveCategory(category)
              }
              className={
                activeCategory === category
                  ? "gallery-filter-btn active"
                  : "gallery-filter-btn"
              }
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="gallery-empty">
            Loading gallery...
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="gallery-empty">
            No gallery images found.
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="gallery-card"
              >
                <div className="gallery-image-wrapper">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="gallery-image"
                  />
                </div>

                <div className="gallery-content">

                  <div className="gallery-top">
                    <span className="category">
                      {item.category}
                    </span>

                    {item.featured && (
                      <span className="featured">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}