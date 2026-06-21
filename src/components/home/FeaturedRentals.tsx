"use client";

import "@/styles/featured-rentals.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Rental,
  getRentals,
} from "@/lib/database";

export default function FeaturedRentals() {
  const [rentals, setRentals] = useState<
    Rental[]
  >([]);

  useEffect(() => {
    async function loadRentals() {
      const data = await getRentals();

      const featured = data.filter(
        (r) => r.featured
      );

      setRentals(
        featured.length > 0
          ? featured
          : data.slice(0, 6)
      );
    }

    loadRentals();
  }, []);

  if (!rentals.length) return null;

  return (
    <section className="featured-rentals">
      <div className="featured-rentals-header">
        <h2>Featured Rentals</h2>

        <p>
          Premium event rentals for
          weddings, parties and corporate
          events.
        </p>
      </div>

      <div className="featured-rentals-scroll">
        {rentals.map((rental) => (
          <div
            key={rental.id}
            className="featured-rental-card"
          >
            <div className="featured-rental-image">
              <Image
                src={rental.image_url}
                alt={rental.name}
                fill
              />
            </div>

            <div className="featured-rental-content">
              <span className="featured-rental-badge">
                {rental.category}
              </span>

              <h3 className="featured-rental-title">
                {rental.name}
              </h3>

              <div className="featured-rental-price">
                KES{" "}
                {Number(
                  rental.price
                ).toLocaleString()}
              </div>

              <p className="featured-rental-description">
                {rental.description}
              </p>

              <div className="featured-rental-actions">
                <Link
                  href={`/rentals/${rental.slug}`}
                  className="featured-rental-btn primary"
                >
                  View Details
                </Link>

                <Link
                  href="/plan-event"
                  className="featured-rental-btn secondary"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}