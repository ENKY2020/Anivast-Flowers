import Image from "next/image";
import Link from "next/link";
import "@/styles/rentals.css";
import {
  Rental,
  getRentals,
} from "@/lib/database";

export const metadata = {
  title: "Event Rentals | Anivast",
  description:
    "Browse premium tents, chairs, tables, décor, lighting and event equipment rentals.",
};

export default async function RentalsPage() {
  const rentals = await getRentals();

  const featuredRentals = rentals.filter(
    (rental) => rental.featured
  );

  return (
    <main className="rentals-page">

      <section className="rentals-header">
        <span className="rentals-badge">
          Event Rentals
        </span>

        <h1>
          Premium Event Rental Collection
        </h1>

        <p>
          Discover premium tents, chairs, tables,
          décor, lighting, facilities and event
          equipment for weddings, birthdays,
          corporate functions and celebrations.
        </p>
      </section>

      {featuredRentals.length > 0 && (
        <section className="rentals-section">
          <div className="section-header">
            <h2>Featured Rentals</h2>
            <p>
              Our most requested rental items for
              weddings, events and celebrations.
            </p>
          </div>

          <div className="rentals-grid">
            {featuredRentals.map((rental) => (
              <RentalCard
                key={rental.id}
                rental={rental}
              />
            ))}
          </div>
        </section>
      )}

      <section className="rentals-section">
        <div className="section-header">
          <h2>Rental Collection</h2>
          <p>
            Browse our complete inventory of rental
            equipment available for your next event.
          </p>
        </div>

        <div className="rentals-grid">
          {rentals.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
            />
          ))}
        </div>
      </section>

      <section className="rentals-bottom-cta">
        <h2>Need Help Planning Your Event?</h2>

        <p>
          Contact Anivast and receive a customized
          quotation based on your event size,
          location and requirements.
        </p>

        <a
          href="https://wa.me/254703234167"
          target="_blank"
          className="rentals-whatsapp-btn"
        >
          Request a Quotation
        </a>
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