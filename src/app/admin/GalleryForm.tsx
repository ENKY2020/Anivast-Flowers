"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  featured: boolean;
  active: boolean;
}

interface GalleryFormProps {
  onSuccess: () => void;
  galleryData?: GalleryItem | null;
}

export default function GalleryForm({
  onSuccess,
  galleryData,
}: GalleryFormProps) {
  const isEditing = !!galleryData;

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

  useEffect(() => {
    if (galleryData) {
      setTitle(galleryData.title || "");
      setCategory(
        galleryData.category || "Wedding"
      );
      setFeatured(
        galleryData.featured || false
      );
      setActive(
        galleryData.active ?? true
      );
    }
  }, [galleryData]);

  async function uploadImage() {
    if (!image) {
      return galleryData?.image_url || "";
    }

    const fileName = `${Date.now()}-${
      image.name
    }`;

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

    return publicUrl;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      if (!isEditing && !image) {
        alert(
          "Please select an image"
        );
        return;
      }

      const imageUrl =
        await uploadImage();

      if (isEditing) {
        const { error } =
          await supabase
            .from("gallery")
            .update({
              title,
              category,
              image_url: imageUrl,
              featured,
              active,
            })
            .eq(
              "id",
              galleryData!.id
            );

        if (error) throw error;

        alert(
          "Gallery image updated successfully"
        );
      } else {
        const { error } =
          await supabase
            .from("gallery")
            .insert([
              {
                title,
                category,
                image_url: imageUrl,
                featured,
                active,
              },
            ]);

        if (error) throw error;

        alert(
          "Gallery image added successfully"
        );
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(
        "Gallery save error:",
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
      <h2>
        {isEditing
          ? "Edit Gallery Image"
          : "Add Gallery Image"}
      </h2>

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
        onChange={(e) =>
          setImage(
            e.target.files?.[0] ||
              null
          )
        }
      />

      {isEditing &&
        galleryData?.image_url && (
          <p
            style={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            Leave image empty to keep
            current image.
          </p>
        )}

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
          ? isEditing
            ? "Updating..."
            : "Uploading..."
          : isEditing
          ? "Update Gallery Image"
          : "Save Gallery Image"}
      </button>
    </form>
  );
}