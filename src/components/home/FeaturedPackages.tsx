"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import ShareButton from "@/components/shared/ShareButton";

import {
  Package,
  getPackages,
} from "@/lib/database";

import "../../styles/featured-packages.css";

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<
    Package[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    try {
      const data =
        await getPackages();

      setPackages(
        data.filter(
          (pkg) => pkg.featured
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return null;
  }

  return (
    <section className="featured-packages">
      <div className="section-header">
        <h2>Featured Packages</h2>

        <p>
          Beautiful event packages crafted
          for unforgettable moments.
        </p>

        <Link
          href="/packages"
          className="view-all-link"
        >
          View All →
        </Link>
      </div>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            className="package-card"
          >
            <div className="package-image-wrapper">
              <Image
                src={pkg.image_url}
                alt={pkg.name}
                width={600}
                height={500}
                className="package-image"
              />

              <span className="package-badge">
                {pkg.category}
              </span>

              <div className="package-actions">
                <button className="package-heart">
                  <Heart size={18} />
                </button>

                <ShareButton
                  title={pkg.name}
                  text={pkg.description}
                />
              </div>
            </div>

            <div className="package-content">
              <h3>{pkg.name}</h3>

              <p className="package-price">
                KES{" "}
                {pkg.price.toLocaleString()}
              </p>

              <div className="package-buttons">
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="package-btn"
                >
                  View Details
                </Link>

                <a
                  href={`https://wa.me/254703234167?text=Hello%20Anivast,%20I%20am%20interested%20in%20${encodeURIComponent(
                    pkg.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="package-order-btn"
                >
                  Quote
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}