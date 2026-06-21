import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import ShareButton from "@/components/shared/ShareButton";

import {
  getPackageBySlug,
} from "@/lib/database";

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pkg =
    await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const whatsappMessage =
    encodeURIComponent(
      `Hello Anivast 🎉

I would like a quotation for:

${pkg.name}

Category:
${pkg.category}

Price:
KES ${pkg.price.toLocaleString()}

Please share more details.`
    );

  return (
    <main
      style={{
        background: "#f7f3ee",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/packages"
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
          ← Back to Packages
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
                src={pkg.image_url}
                alt={pkg.name}
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
                title={pkg.name}
              />
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
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
                }}
              >
                {pkg.category}
              </span>

              {pkg.featured && (
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
                  }}
                >
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize:
                  "clamp(2.2rem,5vw,4rem)",
                color: "#4a3128",
                marginBottom:
                  ".75rem",
              }}
            >
              {pkg.name}
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
              {pkg.price.toLocaleString()}
            </div>

            <p
              style={{
                color: "#666",
                lineHeight: 1.8,
                marginBottom:
                  "2rem",
              }}
            >
              {pkg.description}
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
                    "#fff",
                  padding:
                    "1rem",
                  borderRadius:
                    "18px",
                  textAlign:
                    "center",
                }}
              >
                Premium Setup
              </div>

              <div
                style={{
                  background:
                    "#fff",
                  padding:
                    "1rem",
                  borderRadius:
                    "18px",
                  textAlign:
                    "center",
                }}
              >
                Custom Design
              </div>

              <div
                style={{
                  background:
                    "#fff",
                  padding:
                    "1rem",
                  borderRadius:
                    "18px",
                  textAlign:
                    "center",
                }}
              >
                Professional Team
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
                Request Quote
              </a>

              <ShareButton
                title={pkg.name}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}