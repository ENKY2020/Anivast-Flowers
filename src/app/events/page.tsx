"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart } from "lucide-react";
import { events } from "@/data/events";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Wedding",
    "Birthday",
    "Corporate",
    "Baby Shower",
    "Special Event",
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main
      style={{
        background: "#f7f3ee",
        minHeight: "100vh",
        padding: "2rem 1rem 6rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
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
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#4a3128",
              marginBottom: "0.5rem",
            }}
          >
            Events & Setups
          </h1>

          <p
            style={{
              color: "#7b6b62",
              fontSize: "1.1rem",
            }}
          >
            Weddings, birthdays, corporate events and unforgettable celebrations
          </p>
        </div>

        {/* Search */}

        <div
          style={{
            position: "relative",
            marginBottom: "1.5rem",
          }}
        >
          <Search
            size={20}
            style={{
              position: "absolute",
              left: "20px",
              top: "18px",
              color: "#999",
            }}
          />

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "18px 18px 18px 55px",
              borderRadius: "999px",
              border: "none",
              outline: "none",
              fontSize: "1rem",
            }}
          />
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
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              style={{
                border: "none",
                cursor: "pointer",
                padding: "0.8rem 1.2rem",
                borderRadius: "999px",
                whiteSpace: "nowrap",
                fontWeight: 600,
                background:
                  category === item ? "#b22222" : "#ffffff",
                color:
                  category === item ? "#ffffff" : "#4a3128",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Grid */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                background: "#fff",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "280px",
                }}
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />

                <button
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "12px",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <Heart size={20} />
                </button>
              </div>

              <div style={{ padding: "1.25rem" }}>
                <span
                  style={{
                    background: "#b22222",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "0.8rem",
                  }}
                >
                  {event.category}
                </span>

                <h3
                  style={{
                    color: "#4a3128",
                    marginTop: "1rem",
                    fontSize: "1.7rem",
                  }}
                >
                  {event.name}
                </h3>

                <p
                  style={{
                    color: "#b22222",
                    fontWeight: 700,
                    margin: "0.75rem 0",
                  }}
                >
                  {event.price}
                </p>

                <Link
                  href={`/events/${event.slug}`}
                  style={{
                    display: "inline-block",
                    background: "#b22222",
                    color: "#fff",
                    padding: "14px 22px",
                    borderRadius: "999px",
                    textDecoration: "none",
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