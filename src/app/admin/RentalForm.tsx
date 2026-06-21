"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RentalForm() {
  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState("");

  const [category, setCategory] =
    useState("Chairs");

  const [price, setPrice] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!image) {
      alert(
        "Please select an image"
      );
      return;
    }

    try {
      setLoading(true);

      const fileName = `${Date.now()}-${image.name}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("rentals")
        .upload(
          fileName,
          image
        );

      if (uploadError) {
        throw uploadError;
      }

      const imageUrl =
        supabase.storage
          .from("rentals")
          .getPublicUrl(
            fileName
          ).data.publicUrl;

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

      const {
        error,
      } = await supabase
        .from("rentals")
        .insert([
          {
            name,
            slug,
            category,
            description,
            price:
              Number(price),
            image_url:
              imageUrl,
            featured,
            active,
          },
        ]);

      if (error) {
        console.error(error);
        alert(
          "Failed to save rental"
        );
        return;
      }

      alert(
        "Rental saved successfully 🎉"
      );

      setName("");
      setCategory(
        "Chairs"
      );
      setPrice("");
      setDescription("");
      setFeatured(
        false
      );
      setActive(true);
      setImage(null);
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
      onSubmit={
        handleSubmit
      }
      style={{
        background:
          "#fff",
        padding:
          "2rem",
        borderRadius:
          "24px",
        maxWidth:
          "700px",
        margin:
          "0 auto",
      }}
    >
      <h2
        style={{
          textAlign:
            "center",
          marginBottom:
            "2rem",
          color:
            "#4a3128",
        }}
      >
        Add New Rental
      </h2>

      <div
        style={{
          display:
            "grid",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Rental Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target
                .value
            )
          }
          required
        />

        <select
          value={
            category
          }
          onChange={(e) =>
            setCategory(
              e.target
                .value
            )
          }
        >
          <option>
            Chairs
          </option>
          <option>
            Tables
          </option>
          <option>
            Tents
          </option>
          <option>
            Decor
          </option>
          <option>
            Lighting
          </option>
        </select>

        <input
          type="number"
          placeholder="Price (KES)"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target
                .value
            )
          }
          required
        />

        <textarea
          rows={5}
          placeholder="Description"
          value={
            description
          }
          onChange={(e) =>
            setDescription(
              e.target
                .value
            )
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target
                .files?.[0] ||
                null
            )
          }
          required
        />

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
          Featured Rental
        </label>

        <label>
          <input
            type="checkbox"
            checked={
              active
            }
            onChange={(e) =>
              setActive(
                e.target
                  .checked
              )
            }
          />{" "}
          Active
        </label>

        <button
          type="submit"
          disabled={
            loading
          }
          style={{
            background:
              "#b22222",
            color:
              "#fff",
            border:
              "none",
            padding:
              "1rem",
            borderRadius:
              "999px",
            cursor:
              "pointer",
            fontWeight:
              700,
          }}
        >
          {loading
            ? "Uploading..."
            : "Save Rental"}
        </button>
      </div>
    </form>
  );
}