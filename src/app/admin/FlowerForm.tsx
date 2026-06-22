"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const FLOWER_CATEGORIES = [
  "Rose Bouquet",
  "Lily Bouquet",
  "Money Bouquet",
  "Snack Bouquet",
  "Luxury Bouquet",
  "Artificial Flowers",
  "Funeral Flowers",
  "Custom",
];

interface FlowerData {
  id?: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image_url?: string;
  featured?: boolean;
  active?: boolean;
  seasonal?: boolean;
}

interface FlowerFormProps {
  flowerData?: FlowerData | null;
  onSuccess?: () => void;
}

export default function FlowerForm({
  flowerData = null,
  onSuccess,
}: FlowerFormProps) {
  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState(
      flowerData?.name || ""
    );

  const [category, setCategory] =
    useState(
      flowerData?.category ||
        "Rose Bouquet"
    );

  const [
    customCategory,
    setCustomCategory,
  ] = useState("");

  const [price, setPrice] =
    useState(
      flowerData?.price
        ? String(
            flowerData.price
          )
        : ""
    );

  const [
    description,
    setDescription,
  ] = useState(
    flowerData?.description ||
      ""
  );

  const [featured, setFeatured] =
    useState(
      flowerData?.featured ??
        false
    );

  const [active, setActive] =
    useState(
      flowerData?.active ??
        true
    );

  const [seasonal, setSeasonal] =
    useState(
      flowerData?.seasonal ??
        false
    );

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const createSlug = (
    text: string
  ) =>
    text
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9\s-]/g,
        ""
      )
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

      const slug =
        createSlug(name);

      let imageUrl =
        flowerData?.image_url ||
        "";

      if (imageFile) {
        const fileName =
          `${Date.now()}-${imageFile.name}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("flowers")
          .upload(
            fileName,
            imageFile
          );

        if (uploadError)
          throw uploadError;

        const { data } =
          supabase.storage
            .from("flowers")
            .getPublicUrl(
              fileName
            );

        imageUrl =
          data.publicUrl;
      }

      const payload = {
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
      };

      if (flowerData?.id) {
        const { error } =
          await supabase
            .from("flowers")
            .update(payload)
            .eq(
              "id",
              flowerData.id
            );

        if (error)
          throw error;

        alert(
          "Flower updated successfully 🌹"
        );
      } else {
        const { error } =
          await supabase
            .from("flowers")
            .insert([
              payload,
            ]);

        if (error)
          throw error;

        alert(
          "Flower added successfully 🌹"
        );
      }

      if (onSuccess) {
        onSuccess();
        return;
      }

      setName("");
      setCategory(
        "Rose Bouquet"
      );
      setCustomCategory("");
      setPrice("");
      setDescription("");
      setFeatured(false);
      setActive(true);
      setSeasonal(false);
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
      <h2>
        {flowerData
          ? "Edit Flower"
          : "Add New Flower"}
      </h2>

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
          {FLOWER_CATEGORIES.map(
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
          rows={5}
          value={description}
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
          display: "flex",
          gap: "1.5rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={
              featured
            }
            onChange={(e) =>
              setFeatured(
                e.target
                  .checked
              )
            }
          />{" "}
          Featured
        </label>

        <label>
          <input
            type="checkbox"
            checked={seasonal}
            onChange={(e) =>
              setSeasonal(
                e.target
                  .checked
              )
            }
          />{" "}
          Seasonal
        </label>

        <label>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(
                e.target
                  .checked
              )
            }
          />{" "}
          Active
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="admin-submit-btn"
      >
        {loading
          ? "Saving..."
          : flowerData
          ? "Update Flower"
          : "Save Flower"}
      </button>
    </form>
  );
}