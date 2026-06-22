import Image from "next/image";
import Link from "next/link";

import {
  Rental,
  getRentals,
} from "@/lib/database";

export const metadata = {
  title: "Event Rentals | Anivast",
  description:
    "Browse premium tents, chairs, tables, stages, décor and event equipment rentals.",
};

export default async function RentalsPage() {
  const rentals = await getRentals();

  const featuredRentals = rentals.filter(
    (rental) => rental.featured
  );

  return (
    <main className="rentals-page">
      <section className="rentals-hero">
        <div className="container">
          <span className="hero-badge">
            Event Rentals
          </span>

          <h1>
            Premium Event
            <br />
            Rental Collection
          </h1>

          <p>
            Tents, chairs, tables,
            stages, décor and event
            equipment for weddings,
            birthdays, corporate events
            and special celebrations.
          </p>
        </div>
      </section>

      {featuredRentals.length > 0 && (
        <section className="featured-rentals">
          <div className="container">
            <h2>Featured Rentals</h2>

            <div className="rentals-grid">
              {featuredRentals.map((rental) => (
                <RentalCard
                  key={rental.id}
                  rental={rental}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="all-rentals">
        <div className="container">
          <h2>All Rentals</h2>

          <div className="rentals-grid">
            {rentals.map((rental) => (
              <RentalCard
                key={rental.id}
                rental={rental}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function RentalCard({
  rental,
}: {
  rental: Rental;
}) {
  return (
    <article className="rental-card">
      <div className="rental-image">
        <Image
          src={rental.image_url}
          alt={rental.name}
          width={800}
          height={600}
        />
      </div>

      <div className="rental-content">
        <span className="rental-category">
          {rental.category}
        </span>

        <h3>{rental.name}</h3>

        <p>{rental.description}</p>

        <div className="rental-footer">
          <span className="rental-price">
            KES {rental.price.toLocaleString()}
          </span>

          <Link
            href={`https://wa.me/254703234167?text=${encodeURIComponent(
              `Hello Anivast, I am interested in renting ${rental.name}`
            )}`}
            target="_blank"
            className="rental-btn"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}