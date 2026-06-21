"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import GalleryForm from "../GalleryForm";
import { supabase } from "@/lib/supabase";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  featured: boolean;
  active: boolean;
}

export default function GalleryAdminPage() {
  const [gallery, setGallery] =
    useState<GalleryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  async function loadGallery() {
    setLoading(true);

    const { data, error } =
      await supabase
        .from("gallery")
        .select("*")
        .order(
          "created_at",
          {
            ascending:
              false,
          }
        );

  if (error) {
  console.error("Gallery fetch error:", error);
  alert(JSON.stringify(error));
} else {
  console.log("Gallery data:", data);
  setGallery(data || []);
}

    setLoading(false);
  }

  async function deleteImage(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Delete image?"
      );

    if (!confirmed) return;

    const { error } =
      await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

    if (error) {
      alert(
        "Failed to delete image"
      );
      return;
    }

    loadGallery();
  }

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom:
            "2rem",
        }}
      >
        <div>
          <h1>
            Gallery Management
          </h1>

          <p>
            Manage gallery
            images, featured
            content and
            categories.
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm(
              !showForm
            )
          }
          style={{
            background:
              "#b22222",
            color: "#fff",
            border: "none",
            borderRadius:
              "999px",
            padding:
              "1rem 1.5rem",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {showForm
            ? "Close"
            : "+ Add Image"}
        </button>
      </div>

      {showForm && (
        <GalleryForm
          onSuccess={
            loadGallery
          }
        />
      )}

      <div
        style={{
          background: "#fff",
          borderRadius:
            "24px",
          padding: "1.5rem",
          marginTop: "2rem",
          overflowX: "auto",
        }}
      >
        {loading ? (
          <p>
            Loading gallery...
          </p>
        ) : gallery.length ===
          0 ? (
          <p>
            No gallery images
            found.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {gallery.map(
                (item) => (
                  <tr
                    key={
                      item.id
                    }
                  >
                    <td>
                      <Image
                        src={
                          item.image_url
                        }
                        alt={
                          item.title
                        }
                        width={
                          70
                        }
                        height={
                          70
                        }
                        style={{
                          objectFit:
                            "cover",
                          borderRadius:
                            "10px",
                        }}
                      />
                    </td>

                    <td>
                      {
                        item.title
                      }
                    </td>

                    <td>
                      {
                        item.category
                      }
                    </td>

                    <td>
                      {item.featured
                        ? "⭐"
                        : "—"}
                    </td>

                    <td>
                      {item.active
                        ? "✅"
                        : "❌"}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          deleteImage(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}