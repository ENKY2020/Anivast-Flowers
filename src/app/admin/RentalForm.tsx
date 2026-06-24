"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface RentalData {
  id?: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  featured: boolean;
  active: boolean;
}

interface RentalFormProps {
  rentalData?: RentalData | null;
  onSuccess?: () => void;
}

export default function RentalForm({
  rentalData,
  onSuccess,
}: RentalFormProps) {
  const isEditing = !!rentalData;

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] =
    useState("Tents");
  const [price, setPrice] = useState("");
  const [description, setDescription] =
    useState("");
  const [featured, setFeatured] =
    useState(false);
  const [active, setActive] =
    useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  useEffect(() => {
    if (!rentalData) return;

    setName(rentalData.name || "");
    setCategory(
      rentalData.category || "Chairs"
    );
    setPrice(
      String(rentalData.price || "")
    );
    setDescription(
      rentalData.description || ""
    );
    setFeatured(
      rentalData.featured || false
    );
    setActive(
      rentalData.active ?? true
    );
  }, [rentalData]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl =
        rentalData?.image_url || "";

      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("rentals")
          .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        imageUrl =
          supabase.storage
            .from("rentals")
            .getPublicUrl(fileName)
            .data.publicUrl;
      }

      const slug = name
        .toLowerCase()
        .trim()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /(^-|-$)/g,
          ""
        );

      if (isEditing) {
        const { error } =
          await supabase
            .from("rentals")
            .update({
              name,
              slug,
              category,
              description,
              price: Number(price),
              image_url: imageUrl,
              featured,
              active,
            })
            .eq(
              "id",
              rentalData.id
            );

        if (error) {
          throw error;
        }

        alert(
          "Rental updated successfully"
        );
      } else {
        if (!imageUrl) {
          alert(
            "Please upload an image"
          );
          return;
        }

        const { error } =
          await supabase
            .from("rentals")
            .insert([
              {
                name,
                slug,
                category,
                description,
                price: Number(price),
                image_url: imageUrl,
                featured,
                active,
              },
            ]);

        if (error) {
          throw error;
        }

        alert(
          "Rental created successfully"
        );
      }

      if (onSuccess) {
        onSuccess();
      }

      if (!isEditing) {
        setName("");
        setCategory("Chairs");
        setPrice("");
        setDescription("");
        setFeatured(false);
        setActive(true);
        setImage(null);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save rental"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "24px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#4a3128",
        }}
      >
        {isEditing
          ? "Edit Rental"
          : "Add Rental"}
      </h2>

      <div
        style={{
          display: "grid",
          gap: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Rental Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option>Tents</option>
<option>Chairs</option>
<option>Tables</option>
<option>Backdrops & Decor</option>
<option>Facilities</option>
<option>Lighting & Effects</option>
<option>Custom</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          required
        />

        <textarea
          rows={5}
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target
                .files?.[0] || null
            )
          }
        />

        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />{" "}
          Featured Rental
        </label>

        <label>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(
                e.target.checked
              )
            }
          />{" "}
          Active Rental
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#b22222",
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: "999px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Rental"
            : "Save Rental"}
        </button>
      </div>
    </form>
  );
}