"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const DEFAULT_CATEGORIES = [
  "Bouquet",
  "Premium Bouquet",
  "Rose Bouquet",
  "Lily Bouquet",
  "Money Bouquet",
  "Basket Arrangement",
  "Gift Bouquet",
  "Custom",
];

export default function FlowerForm() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] =
    useState("Bouquet");

  const [customCategory, setCustomCategory] =
    useState("");

  const [price, setPrice] = useState("");

  const [description, setDescription] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

  const [seasonal, setSeasonal] =
    useState(false);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const createSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const finalCategory =
        category === "Custom"
          ? customCategory
          : category;

      const slug = createSlug(name);

      let imageUrl = "";

      if (imageFile) {
        const fileName =
          `${Date.now()}-${imageFile.name}`;

        const { error: uploadError } =
          await supabase.storage
            .from("flowers")
            .upload(fileName, imageFile);

        if (uploadError)
          throw uploadError;

        const { data } =
          supabase.storage
            .from("flowers")
            .getPublicUrl(fileName);

        imageUrl =
          data.publicUrl;
      }

      const { error } =
        await supabase
          .from("flowers")
          .insert([
            {
              name,
              slug,
              category:
                finalCategory,
              price:
                Number(price),
              description,
              image_url:
                imageUrl,
              featured,
              active,
              seasonal,
            },
          ]);

      if (error) throw error;

      alert(
        "Flower added successfully 🌹"
      );

      setName("");
      setCategory("Bouquet");
      setCustomCategory("");
      setPrice("");
      setDescription("");

      setFeatured(false);
      setSeasonal(false);
      setActive(true);

      setImageFile(null);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save flower"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="admin-form"
      onSubmit={handleSubmit}
    >
      <h2>Add New Flower</h2>

      <div className="form-group">
        <label>
          Flower Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />
      </div>

      <div className="form-group">
        <label>
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          {DEFAULT_CATEGORIES.map(
            (cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            )
          )}
        </select>
      </div>

      {category ===
        "Custom" && (
        <div className="form-group">
          <label>
            Custom Category
          </label>

          <input
            type="text"
            value={
              customCategory
            }
            onChange={(e) =>
              setCustomCategory(
                e.target.value
              )
            }
            required
          />
        </div>
      )}

      <div className="form-group">
        <label>
          Price (KES)
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          required
        />
      </div>

      <div className="form-group">
        <label>
          Description
        </label>

        <textarea
          rows={4}
          value={
            description
          }
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>
          Flower Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target
                .files?.[0] ||
                null
            )
          }
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={
              active
            }
            onChange={(e) =>
              setActive(
                e.target.checked
              )
            }
          />{" "}
          Active
          (show in Flowers
          catalog)
        </label>

        <label>
          <input
            type="checkbox"
            checked={
              featured
            }
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />{" "}
          Featured
          (homepage featured
          flowers)
        </label>

        <label>
          <input
            type="checkbox"
            checked={
              seasonal
            }
            onChange={(e) =>
              setSeasonal(
                e.target.checked
              )
            }
          />{" "}
          Seasonal Offer
          (Valentine,
          Mother's Day,
          Christmas, etc.)
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="admin-submit-btn"
      >
        {loading
          ? "Uploading..."
          : "Save Flower"}
      </button>
    </form>
  );
}