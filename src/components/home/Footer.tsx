import Image from "next/image";
import Link from "next/link";
import InstallAppButton from "@/components/shared/InstallAppButton";

import "@/styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* Brand */}

        <div className="footer-brand">

          <div className="footer-logo">
            <Image
              src="/logos.png"
              alt="Anivast"
              width={70}
              height={70}
            />
          </div>

          <h2>Anivast</h2>

          <span>Flowers, Events & Decor</span>

          <p>
            Designing moments, crafting memories.
            Premium flowers, event styling,
            rentals and unforgettable celebrations.
          </p>

          <div className="footer-pwa">
            <InstallAppButton />
          </div>

        </div>

        {/* Explore */}

        <div className="footer-column">

          <h3>Explore</h3>

          <Link href="/">Home</Link>
          <Link href="/flowers">Flowers</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/rentals">Rentals</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/plan-event">Plan Event</Link>

        </div>

        {/* Services */}

        <div className="footer-column">

          <h3>Services</h3>

          <span>Wedding Decor</span>
          <span>Birthday Setups</span>
          <span>Corporate Events</span>
          <span>Funeral Arrangements</span>
          <span>Flower Delivery</span>
          <span>Event Rentals</span>

        </div>

        {/* Contact */}

        <div className="footer-column">

          <h3>Contact</h3>

          <span>📞 +254 703 234 167</span>

          <span>✉️ anivasts@gmail.com</span>

          <span>📍Kamae Garage Centre, Opposite Kenyatta University, Refferal - Nairobi, Kenya</span>

          <a
            href="https://wa.me/254703234167"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp"
          >
            WhatsApp Us
          </a>

          <div className="footer-socials">

            <a
              href="https://www.facebook.com/share/1G7z3vjcJp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://www.tiktok.com/@anivastevents"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>

          </div>

        </div>

      </div>

      {/* Trust Bar */}

      <div className="footer-features">

        <div>🚚 Same Day Delivery</div>

        <div>🌹 Fresh Flowers</div>

        <div>🎉 Event Planning</div>

        <div>🎨 Custom Designs</div>

        <div>🛡️ Trusted Service</div>

      </div>

      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © 2026 Anivast Flowers, Events & Decor.
          All Rights Reserved.
        </p>

        <p>
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/evans-mugendi-126125203"
            target="_blank"
            rel="noopener noreferrer"
          >
            Evans Mugendi
          </a>
        </p>

      </div>

    </footer>
  );
}