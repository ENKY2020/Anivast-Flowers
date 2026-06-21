"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, SlidersHorizontal } from "lucide-react";
import { rentals } from "@/data/rentals";

export default function RentalsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Tents",
    "Chairs",
    "Tables",
    "Decor",
    "Stages",
    "Facilities",
  ];

  const filteredRentals = rentals.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

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
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              color: "#4a3128",
            }}
          >
            Event Rentals
          </h1>

          <p
            style={{
              color: "#7b6b62",
            }}
          >
            Tents, chairs, tables and event essentials
          </p>
        </div>

        {/* Search */}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              padding: "0 1rem",
            }}
          >
            <Search size={18} />

            <input
              type="text"
              placeholder="Search rentals..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "1rem",
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
            }}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Categories */}

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            overflowX: "auto",
            marginBottom: "2rem",
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
                padding: "0.75rem 1rem",
                borderRadius: "999px",
                background:
                  activeCategory === category
                    ? "#b22222"
                    : "#fff",
                color:
                  activeCategory === category
                    ? "#fff"
                    : "#4a3128",
                fontWeight: 600,
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredRentals.map((item) => (
            <div
              key={item.id}
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
                  height: "240px",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
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
                    padding:
                      "0.35rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.8rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.category}
                </span>

                <h3
                  style={{
                    color: "#4a3128",
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.name}
                </h3>

                <p
                  style={{
                    color: "#b22222",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  {item.price}
                </p>

                <Link
                  href={`/rentals/${item.slug}`}
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