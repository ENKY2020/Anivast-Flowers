import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  const event = events.find(
    (item) => item.slug === slug
  );

  if (!event) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Anivast Flowers, Events & Decor.

I would like a quotation for:

${event.name}

Category: ${event.category}

Please share pricing, availability and package details.

Thank you.`
  );

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
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "2rem",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(400px,1fr))",
          alignItems: "center",
        }}
      >
        {/* Image */}

        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: "600px",
            borderRadius: "28px",
            overflow: "hidden",
          }}
        >
          <Image
            src={event.image}
            alt={event.name}
            fill
            priority
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {/* Content */}

        <div>
          <span
            style={{
              color: "#b22222",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            {event.category}
          </span>

          <h1
            style={{
              fontSize: "clamp(2.5rem,5vw,4.5rem)",
              color: "#4a3128",
              margin: "1rem 0",
            }}
          >
            {event.name}
          </h1>

          <p
            style={{
              color: "#b22222",
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            {event.price}
          </p>

          <p
            style={{
              color: "#666",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              marginBottom: "2rem",
            }}
          >
            {event.description}
          </p>

          {/* Features */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(160px,1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              ✨ Premium Decor
            </div>

            <div
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              🌸 Fresh Flowers
            </div>

            <div
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              🚚 Setup Included
            </div>

            <div
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              💎 Custom Styling
            </div>
          </div>

          {/* Buttons */}

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href={`https://wa.me/254700000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                color: "#fff",
                padding: "16px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Request Quote on WhatsApp
            </a>

            <Link
              href="/plan-event"
              style={{
                background: "#b22222",
                color: "#fff",
                padding: "16px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Plan This Event
            </Link>

            <Link
              href="/events"
              style={{
                background: "#4a3128",
                color: "#fff",
                padding: "16px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}