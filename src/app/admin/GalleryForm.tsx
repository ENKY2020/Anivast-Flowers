"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface GalleryFormProps {
  onSuccess?: () => void;
}

export default function GalleryForm({
  onSuccess,
}: GalleryFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState("Wedding");

  const [featured, setFeatured] =
    useState(false);

  const [active, setActive] =
    useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

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

      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("gallery")
          .upload(fileName, image);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      const { error: insertError } =
        await supabase
          .from("gallery")
          .insert([
            {
              title,
              category,
              image_url: publicUrl,
              featured,
              active,
            },
          ]);

      if (insertError) {
        throw insertError;
      }

      alert(
        "Gallery image added successfully"
      );

      setTitle("");
      setCategory("Wedding");
      setFeatured(false);
      setActive(true);
      setImage(null);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(
        "Gallery upload error:",
        error
      );

      alert(
        "Failed to save gallery image"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="admin-form"
    >
      <h2>Add Gallery Image</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
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
        <option value="Wedding">
          Wedding
        </option>
        <option value="Birthday">
          Birthday
        </option>
        <option value="Corporate">
          Corporate
        </option>
        <option value="Graduation">
          Graduation
        </option>
        <option value="Proposal">
          Proposal
        </option>
        <option value="Baby Shower">
          Baby Shower
        </option>
        <option value="Decor">
          Decor
        </option>
      </select>

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

      <label>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) =>
            setFeatured(
              e.target.checked
            )
          }
        />
        Featured Image
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
        />
        Active
      </label>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Uploading..."
          : "Save Gallery Image"}
      </button>
    </form>
  );
}