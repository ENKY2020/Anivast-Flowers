"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Megaphone,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

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
import CampaignForm from "../CampaignForm";


export default function CampaignManagerPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadCampaigns() {
    setLoading(true);

    const { data } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setCampaigns(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function toggleCampaign(
    id: string,
    active: boolean
  ) {
    await supabase
      .from("campaigns")
      .update({
        active: !active,
      })
      .eq("id", id);

    loadCampaigns();
  }

  async function deleteCampaign(id: string) {
    const confirmed = window.confirm(
      "Delete this campaign?"
    );

    if (!confirmed) return;

    await supabase
      .from("campaigns")
      .delete()
      .eq("id", id);

    loadCampaigns();
  }

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
        {/* HERO */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#7a1f1f,#c62828)",
            color: "#fff",
            borderRadius: "28px",
            padding: "50px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <Megaphone size={30} />

            <span
              style={{
                fontWeight: 700,
              }}
            >
              Campaign Manager
            </span>
          </div>

          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "20px",
            }}
          >
            Seasonal Marketing Campaigns
          </h1>

          <p
            style={{
              maxWidth: "700px",
              lineHeight: 1.8,
              opacity: 0.95,
            }}
          >
            Create campaigns for Father's Day,
            Valentine's, Christmas, Weddings,
            Graduation Season and special
            promotions.
          </p>
        </div>

        {/* QUICK STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "20px",
            }}
          >
            <h3>Total Campaigns</h3>
            <h2>{campaigns.length}</h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "20px",
            }}
          >
            <h3>Active Campaigns</h3>
            <h2>
              {
                campaigns.filter(
                  (c) => c.active
                ).length
              }
            </h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "20px",
            }}
          >
            <h3>Homepage Status</h3>
            <h2>Ready</h2>
          </div>
        </div>

        {/* CREATE CAMPAIGN */}

<CampaignForm onSuccess={loadCampaigns} />

        {/* CAMPAIGNS */}

        <h2
          style={{
            marginBottom: "20px",
            color: "#7a1f1f",
          }}
        >
          Existing Campaigns
        </h2>

        {loading ? (
          <p>Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "24px",
            }}
          >
            No campaigns found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "24px",
            }}
          >
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <span
                    style={{
                      background: campaign.active
                        ? "#dcfce7"
                        : "#fee2e2",
                      padding:
                        "6px 12px",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {campaign.active
                      ? "Active"
                      : "Inactive"}
                  </span>

                  <Sparkles
                    size={18}
                    color="#f59e0b"
                  />
                </div>

                <h3
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {campaign.title}
                </h3>

                <p
                  style={{
                    color: "#666",
                    marginBottom: "12px",
                  }}
                >
                  {campaign.description}
                </p>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#999",
                    marginBottom: "20px",
                  }}
                >
                  /campaigns/{campaign.slug}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() =>
                      toggleCampaign(
                        campaign.id,
                        campaign.active
                      )
                    }
                    style={{
                      border: "none",
                      cursor: "pointer",
                      background:
                        "#7a1f1f",
                      color: "#fff",
                      padding:
                        "10px 16px",
                      borderRadius:
                        "12px",
                    }}
                  >
                    {campaign.active
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    style={{
                      border: "none",
                      cursor: "pointer",
                      background:
                        "#2563eb",
                      color: "#fff",
                      padding:
                        "10px 16px",
                      borderRadius:
                        "12px",
                    }}
                  >
                    <ExternalLink
                      size={16}
                    />
                  </button>

                  <button
                    onClick={() =>
                      deleteCampaign(
                        campaign.id
                      )
                    }
                    style={{
                      border: "none",
                      cursor: "pointer",
                      background:
                        "#dc2626",
                      color: "#fff",
                      padding:
                        "10px 16px",
                      borderRadius:
                        "12px",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}