"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

import "@/styles/campaign-form.css";

interface CampaignFormProps {
  onSuccess?: () => void;
}

export default function CampaignForm({
  onSuccess,
}: CampaignFormProps) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] =
    useState("");

  const [buttonText, setButtonText] =
    useState("Explore");

  const [buttonLink, setButtonLink] =
    useState("/flowers");

  const [active, setActive] =
    useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  function createSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  const slug = useMemo(() => {
    return createSlug(title);
  }, [title]);

  const imagePreview = useMemo(() => {
    if (!image) return null;

    return URL.createObjectURL(image);
  }, [image]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const fileName = `${Date.now()}-${
        image.name
      }`;

      const { error: uploadError } =
        await supabase.storage
          .from("gallery")
          .upload(fileName, image);

      if (uploadError)
        throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      const { error: insertError } =
        await supabase
          .from("campaigns")
          .insert([
            {
              title,
              slug,
              tag,
              description,
              image_url: publicUrl,
              button_text:
                buttonText,
              button_link:
                buttonLink,
              active,
            },
          ]);

      if (insertError)
        throw insertError;

      alert(
        "Campaign created successfully"
      );

      setTitle("");
      setTag("");
      setDescription("");
      setButtonText("Explore");
      setButtonLink("/flowers");
      setActive(true);
      setImage(null);

      onSuccess?.();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create campaign"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="campaign-form-wrapper">
      <div className="campaign-form-header">
        <h2>
          📣 Create Marketing Campaign
        </h2>

        <p>
          Create seasonal promotions,
          Father's Day offers, wedding
          campaigns, graduation packages
          and special event announcements.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="campaign-grid">
          {/* LEFT SIDE */}

          <div className="campaign-fields">
            <div className="campaign-row">
              <input
                className="campaign-input"
                type="text"
                placeholder="Campaign Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                required
              />

              <input
                className="campaign-input"
                type="text"
                placeholder="Tag (🎄 Christmas)"
                value={tag}
                onChange={(e) =>
                  setTag(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="slug-preview">
              🔗 Campaign Slug:
              {" "}
              {slug || "your-campaign"}
            </div>

            <textarea
              className="campaign-textarea"
              placeholder="Describe your promotion..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <div className="upload-box">
              <strong>
                Upload Campaign Image
              </strong>

              <br />

              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] ||
                      null
                  )
                }
              />
            </div>

            <div className="campaign-row">
              <input
                className="campaign-input"
                type="text"
                value={buttonText}
                onChange={(e) =>
                  setButtonText(
                    e.target.value
                  )
                }
                placeholder="Button Text"
              />

              <select
                className="campaign-select"
                value={buttonLink}
                onChange={(e) =>
                  setButtonLink(
                    e.target.value
                  )
                }
              >
                <option value="/flowers">
                  Flowers
                </option>

                <option value="/packages">
                  Packages
                </option>

                <option value="/rentals">
                  Rentals
                </option>

                <option value="/gallery">
                  Gallery
                </option>

                <option value="/plan-event">
                  Plan Event
                </option>
              </select>
            </div>

            <div className="share-preview">
              Share URL:
              {" "}
              /campaigns/
              {slug ||
                "your-campaign"}
            </div>

            <label className="campaign-toggle">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) =>
                  setActive(
                    e.target.checked
                  )
                }
              />
              Active Campaign
            </label>

            <button
              type="submit"
              disabled={loading}
              className="campaign-submit"
            >
              {loading
                ? "Saving Campaign..."
                : "Create Campaign"}
            </button>
          </div>

          {/* RIGHT SIDE PREVIEW */}

          <div className="campaign-preview">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                width={800}
                height={600}
                className="preview-image"
              />
            ) : (
              <div className="preview-placeholder">
                Campaign Image Preview
              </div>
            )}

            <div className="preview-content">
              <div className="preview-tag">
                {tag ||
                  "✨ Seasonal Promotion"}
              </div>

              <h3 className="preview-title">
                {title ||
                  "Your Campaign Title"}
              </h3>

              <p className="preview-description">
                {description ||
                  "Campaign description preview will appear here."}
              </p>

              <div className="preview-button">
                {buttonText}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}