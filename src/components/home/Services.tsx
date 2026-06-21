import Link from "next/link";
import "@/styles/services.css";

const services = [
  {
    icon: "🌹",
    title: "Fresh Flowers",
    description:
      "Beautiful bouquets, sympathy flowers, funeral flowers and custom floral arrangements.",
    link: "/flowers",
  },
  {
    icon: "🎉",
    title: "Event Packages",
    description:
      "Wedding, birthday, baby shower, graduation and corporate event packages.",
    link: "/packages",
  },
  {
    icon: "🏕️",
    title: "Event Rentals",
    description:
      "Tents, chairs, tables, backdrops, lighting and event equipment rentals.",
    link: "/rentals",
  },
  {
    icon: "✨",
    title: "Plan My Event",
    description:
      "Use our planning wizard and receive a customized quotation for your event.",
    link: "/plan-event",
  },
];

export default function Services() {
  return (
    <section className="services-section">
      <div className="services-header">
        <h2>Everything You Need For Your Event</h2>

        <p>
          From flowers and décor to rentals and complete
          event planning, we help create unforgettable
          experiences.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.link}
            className="service-card"
          >
            <div className="service-icon">
              {service.icon}
            </div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <span className="service-link">
              Explore →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}