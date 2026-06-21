import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

type CampaignPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CampaignPageProps) {
  const { slug } = await params;

  const { data: campaign } = await supabase
    .from("campaigns")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!campaign) {
    return {
      title: "Campaign Not Found",
    };
  }

  return {
    title: campaign.title,
    description: campaign.description,
    openGraph: {
      title: campaign.title,
      description: campaign.description,
      images: campaign.image_url
        ? [campaign.image_url]
        : [],
    },
  };
}

export default async function CampaignPage({
  params,
}: CampaignPageProps) {
  const { slug } = await params;

  const { data: campaign } = await supabase
    .from("campaigns")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!campaign) {
    notFound();
  }

  const whatsappLink =
    "https://wa.me/254703234167?text=" +
    encodeURIComponent(
      `Hello Anivast, I'm interested in "${campaign.title}". Please send more details.`
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#faf7f2",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#7a1f1f,#c91f1f)",
            borderRadius: "30px",
            overflow: "hidden",
            color: "#ffffff",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.15)",
          }}
        >
          {campaign.image_url && (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "520px",
              }}
            >
              <Image
                src={campaign.image_url}
                alt={campaign.title}
                fill
                priority
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div
            style={{
              padding: "50px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 18px",
                borderRadius: "999px",
                background:
                  "rgba(255,255,255,0.15)",
                marginBottom: "20px",
              }}
            >
              {campaign.tag || "Promotion"}
            </span>

            <h1
              style={{
                fontSize: "3rem",
                marginBottom: "20px",
              }}
            >
              {campaign.title}
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                maxWidth: "800px",
              }}
            >
              {campaign.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                marginTop: "30px",
              }}
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#ffffff",
                  color: "#7a1f1f",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: "999px",
                  fontWeight: "bold",
                }}
              >
                WhatsApp Order
              </a>

              <Link
                href={campaign.button_link || "/flowers"}
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: "999px",
                  border:
                    "2px solid rgba(255,255,255,0.4)",
                }}
              >
                {campaign.button_text || "Explore"}
              </Link>

              <Link
                href="/"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: "999px",
                  border:
                    "2px solid rgba(255,255,255,0.4)",
                }}
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}