import Link from "next/link";
import "@/styles/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-badge">
          Anivast Flowers, Events & Decor
        </span>

        <h1>
          We Design
          <br />
          Moments That
          <br />
          Stay Forever
        </h1>

        <p>
          Elegant flowers, unforgettable events,
          and beautifully planned celebrations
          crafted with love and creativity.
        </p>

        <div className="hero-buttons">
          <Link
            href="/flowers"
            className="hero-primary-btn"
          >
            Explore Flowers
          </Link>

          <Link
            href="/plan-event"
            className="hero-secondary-btn"
          >
            Plan My Event
          </Link>
        </div>

        <div className="hero-stats">
          <div>
            <strong>500+</strong>
            <span>Happy Clients</span>
          </div>

          <div>
            <strong>1000+</strong>
            <span>Floral Designs</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>WhatsApp Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}