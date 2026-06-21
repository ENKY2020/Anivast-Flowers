import Link from "next/link";
import "@/styles/contact-cta.css";

export default function ContactCTA() {
  return (
    <section className="contact-cta">

      <div className="contact-overlay" />

      <div className="contact-cta-container">

        <div className="contact-content">

          <span className="contact-badge">
            🌹 Let's Create Something Beautiful
          </span>

          <h2>
            Ready To Plan
            <br />
            Your Dream Event?
          </h2>

          <p>
            Whether you're ordering flowers,
            planning a wedding, organizing a birthday,
            or renting event equipment, our team is
            ready to help bring your vision to life.
          </p>

          <div className="contact-buttons">

            <Link
              href="/plan-event"
              className="contact-primary-btn"
            >
              Plan My Event
            </Link>

            <a
              href="https://wa.me/254703234167"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-secondary-btn"
            >
              WhatsApp Us
            </a>

          </div>

          <div className="contact-features">

            <span>✓ Same Day Delivery</span>

            <span>✓ Custom Designs</span>

            <span>✓ Event Experts</span>

          </div>

        </div>

        <div className="contact-card">

          <h3>Need Help Fast?</h3>

          <div className="contact-item">
            <strong>WhatsApp</strong>
            <span>+254 703 234 167</span>
          </div>

          <div className="contact-item">
            <strong>Email</strong>
            <span>anivasts@gmail.com</span>
          </div>

          <div className="contact-item">
            <strong>Coverage</strong>
            <span>Nairobi & Surrounding Areas</span>
          </div>

          <div className="contact-item">
            <strong>Services</strong>
            <span>
              Flowers • Events • Rentals • Decor
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}