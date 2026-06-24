"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const DEFAULT_CATEGORIES = [
  "Birthday",
  "Funeral",
  "Premium",
  "Custom",
];

interface PackageData {
  id?: string;
  name: string;
  slug?: string;
  category: string;
  price: number;
  description?: string;
  image_url?: string;
  featured?: boolean;
  active?: boolean;
}

interface PackageFormProps {
  packageData?: PackageData | null;
  onSuccess?: () => void;
}

export default function PackageForm({
  packageData = null,
  onSuccess,
}: PackageFormProps) {
  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState(
      packageData?.name || ""
    );

  const [category, setCategory] =
  useState(
    packageData?.category ||
      "Birthday"
  );

  const [
    customCategory,
    setCustomCategory,
  ] = useState("");

  const [price, setPrice] =
    useState(
      packageData?.price
        ? String(
            packageData.price
          )
        : ""
    );

  const [
    description,
    setDescription,
  ] = useState(
    packageData?.description ||
      ""
  );

  const [featured, setFeatured] =
    useState(
      packageData?.featured ??
        false
    );

  const [active, setActive] =
    useState(
      packageData?.active ??
        true
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
        packageData?.image_url ||
        "";

      if (imageFile) {
        const fileName =
          `${Date.now()}-${imageFile.name}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("packages")
          .upload(
            fileName,
            imageFile
          );

        if (uploadError) {
          throw uploadError;
        }

        const { data } =
          supabase.storage
            .from("packages")
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
      };

      if (packageData?.id) {
        const { error } =
          await supabase
            .from("packages")
            .update(payload)
            .eq(
              "id",
              packageData.id
            );

        if (error)
          throw error;

        alert(
          "Package updated successfully 🎉"
        );
      } else {
        const { error } =
          await supabase
            .from("packages")
            .insert([
              payload,
            ]);

        if (error)
          throw error;

        alert(
          "Package created successfully 🎉"
        );
      }

      if (onSuccess) {
        onSuccess();
        return;
      }

      setName("");
      setCategory(
  "Birthday"
);
      setCustomCategory("");
      setPrice("");
      setDescription("");
      setFeatured(false);
      setActive(true);
      setImageFile(null);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save package"
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
        {packageData
          ? "Edit Package"
          : "Add New Package"}
      </h2>

      <div className="form-group">
        <label>
          Package Name
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
          Package Image
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
          Featured Package
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
          : packageData
          ? "Update Package"
          : "Save Package"}
      </button>
    </form>
  );
}