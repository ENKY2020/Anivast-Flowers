import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import ShareButton from "@/components/shared/ShareButton";
import { getFlowerBySlug } from "@/lib/database";
import WishlistButton from "@/components/shared/WishlistButton";

export default async function FlowerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const flower =
    await getFlowerBySlug(slug);

  if (!flower) {
    notFound();
  }

  const whatsappMessage =
    encodeURIComponent(
      `Hello Anivast 🌹

I would like to order:

${flower.name}

Category:
${flower.category}

Price:
KES ${flower.price.toLocaleString()}

Please share more details.`
    );

  return (
    <main
      style={{
        background: "#f7f3ee",
        minHeight: "100vh",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/flowers"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".5rem",
            marginBottom: "2rem",
            color: "#4a3128",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ← Back to Flowers
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* IMAGE */}

          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "28px",
                overflow: "hidden",
                background: "#fff",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src={flower.image_url}
                alt={flower.name}
                fill
                priority
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              <ShareButton
                title={flower.name}
              />
            </div>
          </div>

          {/* CONTENT */}

          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: ".5rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  background:
                    "#b22222",
                  color: "#fff",
                  padding:
                    ".45rem .9rem",
                  borderRadius:
                    "999px",
                  fontWeight: 600,
                  fontSize: ".9rem",
                }}
              >
                {flower.category}
              </span>

              {flower.featured && (
                <span
                  style={{
                    background:
                      "#f59e0b",
                    color: "#fff",
                    padding:
                      ".45rem .9rem",
                    borderRadius:
                      "999px",
                    fontWeight: 600,
                    fontSize: ".9rem",
                  }}
                >
                  ⭐ Featured
                </span>
              )}

              {flower.seasonal && (
                <span
                  style={{
                    background:
                      "#ec4899",
                    color: "#fff",
                    padding:
                      ".45rem .9rem",
                    borderRadius:
                      "999px",
                    fontWeight: 600,
                    fontSize: ".9rem",
                  }}
                >
                  🎉 Seasonal Offer
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize:
                  "clamp(2.2rem,5vw,4rem)",
                color: "#4a3128",
                lineHeight: 1.1,
                marginBottom:
                  ".75rem",
              }}
            >
              {flower.name}
            </h1>

            <div
              style={{
                color: "#b22222",
                fontWeight: 800,
                fontSize:
                  "clamp(1.6rem,4vw,2.5rem)",
                marginBottom:
                  "1.5rem",
              }}
            >
              KES{" "}
              {flower.price.toLocaleString()}
            </div>

            <p
              style={{
                color: "#666",
                lineHeight: 1.9,
                marginBottom:
                  "2rem",
                fontSize: "1rem",
              }}
            >
              {flower.description ||
                "✨ Custom Pricing Available. Each money bouquet is uniquely crafted based on your preferred amount, presentation style and occasion. Perfect for birthdays, graduations, anniversaries, celebrations and special gifts. Contact us for a personalised quotation."}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(150px,1fr))",
                gap: "1rem",
                marginBottom:
                  "2rem",
              }}
            >
              <div
                style={{
                  background:
                    "#ffffff",
                  padding:
                    "1rem",
                  borderRadius:
                    "18px",
                  textAlign:
                    "center",
                  fontWeight:
                    600,
                }}
              >
                🚚 Same Day Delivery
              </div>

              <div
                style={{
                  background:
                    "#ffffff",
                  padding:
                    "1rem",
                  borderRadius:
                    "18px",
                  textAlign:
                    "center",
                  fontWeight:
                    600,
                }}
              >
                🌹 Fresh Flowers
              </div>

              <div
                style={{
                  background:
                    "#ffffff",
                  padding:
                    "1rem",
                  borderRadius:
                    "18px",
                  textAlign:
                    "center",
                  fontWeight:
                    600,
                }}
              >
                📍 Nairobi Wide
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <a
                href={`https://wa.me/254703234167?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:
                    "#25D366",
                  color: "#fff",
                  textDecoration:
                    "none",
                  padding:
                    "1rem 2rem",
                  borderRadius:
                    "999px",
                  fontWeight: 700,
                }}
              >
                Order on WhatsApp
              </a>

              <ShareButton
                title={flower.name}
              />

       <WishlistButton
  id={flower.id}
  name={flower.name}
  image={flower.image_url}
/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}