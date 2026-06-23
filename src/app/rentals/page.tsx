"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { rentals } from "@/data/rentals";
import "@/styles/rentals.css";

export default function RentalsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        rentals
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ],
    []
  );

  const filteredRentals = useMemo(() => {
    return rentals.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory;

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [search, activeCategory]);

  return (
    <main className="rentals-page">
      <section className="rentals-header">
        <span className="rentals-badge">
          Premium Event Rentals
        </span>

        <h1>
          Luxury Equipment & Event Rentals
        </h1>

        <p>
          Browse premium tents, chairs,
          tables, décor, lighting,
          facilities and event equipment
          for weddings, corporate events,
          birthdays and celebrations.
        </p>
      </section>

      <section className="rentals-filters">
        <div className="rentals-search">
          <input
            type="text"
            placeholder="Search rentals..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="rentals-toolbar">
          <div className="rentals-count">
            {filteredRentals.length} Rental
            {filteredRentals.length !== 1
              ? "s"
              : ""}
          </div>

          <div className="rentals-categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                className={`category-pill ${
                  activeCategory ===
                  category
                    ? " active"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rentals-section">
        {filteredRentals.length === 0 ? (
          <div className="rentals-empty">
            No rentals found.
          </div>
        ) : (
          <div className="rentals-grid">
            {filteredRentals.map(
              (rental) => (
                <article
                  key={rental.id}
                  className="rental-card"
                >
                  <div className="rental-image">
                    <Image
  src={rental.image}
  alt={rental.name}
  width={800}
  height={600}
/>
                      
                      alt={rental.name}
                      width={800}
                      height={600}
                    
                  </div>

                  <div className="rental-content">
                    <span className="rental-category">
                      {
                        rental.category
                      }
                    </span>

                    <h3>
                      {rental.name}
                    </h3>

                    <p>
                      {
                        rental.description
                      }
                    </p>

                    <div className="rental-footer">
                      <span className="rental-price">
                         {
                          rental.price
                        }
                      </span>

                      <div className="rental-actions">
                        <Link
                          href={`/rentals/${rental.slug}`}
                          className="rental-btn rental-btn-secondary"
                        >
                          View Details
                        </Link>

                        <a
                          href={`https://wa.me/254703234167?text=Hello%20Anivast,%20I%20would%20like%20a%20quotation%20for%20${encodeURIComponent(
                            rental.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rental-btn rental-btn-primary"
                        >
                          Request Quote
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      <section className="rentals-bottom-cta">
        <h2>
          Planning a Special Event?
        </h2>

        <p>
          Let our team help you create
          the perfect event setup with
          tailored rental packages and
          professional support.
        </p>

        <a
          href="https://wa.me/254703234167"
          target="_blank"
          rel="noopener noreferrer"
          className="rentals-whatsapp-btn"
        >
          Get a Custom Quotation
        </a>
      </section>
    </main>
  );
}