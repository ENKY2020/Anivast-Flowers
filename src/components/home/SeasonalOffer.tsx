"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import "@/styles/seasonal-offer.css";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  tag: string;
  description: string;
  image_url: string;
  button_text: string;
  button_link: string;
  active: boolean;
}

export default function SeasonalOffer() {
  const [campaigns, setCampaigns] = useState<
    Campaign[]
  >([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  useEffect(() => {
    if (campaigns.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === campaigns.length - 1
          ? 0
          : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [campaigns]);

  async function loadCampaigns() {
    try {
      const { data, error } =
        await supabase
          .from("campaigns")
          .select("*")
          .eq("active", true)
          .order("created_at", {
            ascending: false,
          });

      if (!error && data) {
        setCampaigns(data);
      }
    } catch (error) {
      console.error(
        "Campaign loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const campaign =
    campaigns[currentIndex];

  function nextCampaign() {
    setCurrentIndex((prev) =>
      prev === campaigns.length - 1
        ? 0
        : prev + 1
    );
  }

  function previousCampaign() {
    setCurrentIndex((prev) =>
      prev === 0
        ? campaigns.length - 1
        : prev - 1
    );
  }

  async function shareCampaign() {
    if (!campaign) return;

    const url =
      window.location.origin +
      "/campaigns/" +
      campaign.slug;

    try {
      if (navigator.share) {
        await navigator.share({
          title: campaign.title,
          text: campaign.description,
          url,
        });
      } else {
        await navigator.clipboard.writeText(
          url
        );

        alert(
          "Campaign link copied successfully."
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return null;

  if (!campaign) return null;

  const whatsappLink =
    "https://wa.me/254703234167?text=" +
    encodeURIComponent(
      `Hello Anivast, I'm interested in "${campaign.title}". Please send more details.`
    );

  return (
    <section className="seasonal-offer">
      <div className="seasonal-content">
        <span className="seasonal-tag">
          {campaign.tag ||
            "✨ Seasonal Promotion"}
        </span>

        <h2>{campaign.title}</h2>

        <p>{campaign.description}</p>

        <div className="seasonal-features">
          <div>🌹 Premium Flowers</div>
          <div>🎉 Event Styling</div>
          <div>🚚 Fast Delivery</div>
          <div>💎 Luxury Packages</div>
        </div>

        <div className="seasonal-buttons">
          <Link
            href={`/campaigns/${campaign.slug}`}
            className="seasonal-primary-btn"
          >
            Explore Campaign
          </Link>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="seasonal-secondary-btn"
          >
            WhatsApp Order
          </a>
        </div>

        {campaigns.length > 1 && (
          <div className="campaign-navigation">
            <button
              onClick={previousCampaign}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="campaign-dots">
              {campaigns.map(
                (_, index) => (
                  <span
                    key={index}
                    onClick={() =>
                      setCurrentIndex(index)
                    }
                    className={
                      index === currentIndex
                        ? "dot active"
                        : "dot"
                    }
                  />
                )
              )}
            </div>

            <button
              onClick={nextCampaign}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="offer-card">
        {campaign.image_url && (
          <div className="offer-image-wrapper">
            <Image
              src={campaign.image_url}
              alt={campaign.title}
              width={1200}
              height={800}
              className="offer-image"
              priority
            />
          </div>
        )}

        <div className="offer-badge">
          🔥 Active Campaign
        </div>

        <h3 className="offer-title">
          {campaign.title}
        </h3>

        <p>{campaign.description}</p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href={`/campaigns/${campaign.slug}`}
            className="offer-btn"
          >
            View Campaign
          </Link>

          <button
            onClick={shareCampaign}
            className="offer-btn"
            style={{
              background: "#fff",
              color: "#7a1f1f",
              border:
                "2px solid #7a1f1f",
            }}
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}