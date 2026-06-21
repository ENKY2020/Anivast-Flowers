import { ImageResponse } from "next/og";
import { getFlowerBySlug } from "@/lib/database";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const flower =
    await getFlowerBySlug(slug);

  if (!flower) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              "#b22222",
            color: "white",
            fontSize: 60,
            fontWeight: 700,
          }}
        >
          Anivast Flowers
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg,#b22222,#7f1d1d)",
          color: "#fff",
          padding: 40,
        }}
      >
        <div
          style={{
            width: "45%",
            height: "100%",
            display: "flex",
          }}
        >
          <img
            src={flower.image_url}
            alt={flower.name}
            width={500}
            height={500}
            style={{
              objectFit: "cover",
              borderRadius: 24,
            }}
          />
        </div>

        <div
          style={{
            width: "55%",
            paddingLeft: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent:
              "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              opacity: 0.9,
            }}
          >
            🌹 Anivast Flowers
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              marginTop: 20,
              lineHeight: 1.1,
            }}
          >
            {flower.name}
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: 30,
            }}
          >
            {flower.category}
          </div>

          <div
            style={{
              marginTop: 30,
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            KES{" "}
            {flower.price.toLocaleString()}
          </div>

          {flower.featured && (
            <div
              style={{
                marginTop: 25,
                fontSize: 26,
              }}
            >
              ⭐ Featured Flower
            </div>
          )}

          {flower.seasonal && (
            <div
              style={{
                marginTop: 10,
                fontSize: 26,
              }}
            >
              🎉 Seasonal Offer
            </div>
          )}
        </div>
      </div>
    ),
    size
  );
}
``