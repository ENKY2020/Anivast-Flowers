"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, SlidersHorizontal } from "lucide-react";
import { Flower, getFlowers } from "@/lib/database";

export default function FlowersPage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadFlowers() {
      const data = await getFlowers();

      setFlowers(data);
      setLoading(false);
    }

    loadFlowers();
  }, []);

  const categories = [
    "All",
    ...new Set(
      flowers
        .map((flower) => flower.category)
        .filter(Boolean)
    ),
  ];

  const filteredFlowers = flowers.filter((flower) => {
    const matchesSearch = flower.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      flower.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f7f3ee",
        }}
      >
        Loading flowers...
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#f7f3ee",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              color: "#4a3128",
              marginBottom: "0.5rem",
            }}
          >
            Flowers & Bouquets
          </h1>

          <p
            style={{
              color: "#7b6b62",
            }}
          >
            Discover our handcrafted floral creations
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderRadius: "999px",
              padding: "0 1rem",
              border: "1px solid #eee",
            }}
          >
            <Search size={18} color="#777" />

            <input
              type="text"
              placeholder="Search flowers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "0.9rem",
                background: "transparent",
              }}
            />
          </div>

          <button
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: "none",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            overflowX: "auto",
            paddingBottom: "1rem",
            marginBottom: "1rem",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveCategory(category)
              }
              style={{
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                padding: "0.7rem 1rem",
                borderRadius: "999px",
                background:
                  activeCategory === category
                    ? "#b22222"
                    : "#ffffff",
                color:
                  activeCategory === category
                    ? "#ffffff"
                    : "#4a3128",
                fontWeight: 600,
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "1.25rem",
          }}
        >
          {filteredFlowers.map((flower) => (
            <div
              key={flower.id}
              style={{
                background: "#fff",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "260px",
                }}
              >
                <Image
                  src={flower.image_url}
                  alt={flower.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  style={{
                    objectFit: "cover",
                  }}
                />

                <button
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#fff",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                  }}
                >
                  <Heart
                    size={18}
                    color="#b22222"
                  />
                </button>
              </div>

              <div
                style={{
                  padding: "1rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: "#b22222",
                    color: "#fff",
                    fontSize: "0.75rem",
                    padding: "0.3rem 0.7rem",
                    borderRadius: "999px",
                    marginBottom: "0.75rem",
                  }}
                >
                  {flower.category}
                </span>

                <h3
                  style={{
                    color: "#4a3128",
                    marginBottom: "0.5rem",
                    fontSize: "1.4rem",
                  }}
                >
                  {flower.name}
                </h3>

                <p
                  style={{
                    color: "#b22222",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  KES {flower.price.toLocaleString()}
                </p>

                <Link
                  href={`/flowers/${flower.slug}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#b22222",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "0.9rem",
                    borderRadius: "999px",
                    fontWeight: 600,
                  }}
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}