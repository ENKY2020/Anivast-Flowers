"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

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

  const [selectedImage, setSelectedImage] =
    useState<GalleryItem | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      setLoading(true);

      const { data, error } =
        await supabase
          .from("gallery")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) throw error;

      setGallery(data || []);
    } catch (error) {
      console.error(
        "Gallery fetch error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(id: string) {
  const confirmed = window.confirm(
    "Delete this gallery image?"
  );

  if (!confirmed) return;

  try {
    const { data, error } =
      await supabase
        .from("gallery")
        .delete()
        .eq("id", id)
        .select();

    console.log(
      "Deleted rows:",
      data
    );

    console.log(
      "Delete error:",
      error
    );

    if (error) {
      alert(
        JSON.stringify(error)
      );
      return;
    }

    if (!data || data.length === 0) {
      alert(
        "Delete executed but no rows were removed."
      );
      return;
    }

    await loadGallery();
  } catch (err) {
    console.error(err);
  }
}
    

  function openCreateModal() {
    setSelectedImage(null);
    setShowForm(true);
  }

  function openEditModal(
    image: GalleryItem
  ) {
    setSelectedImage(image);
    setShowForm(true);
  }

  function closeModal() {
    setSelectedImage(null);
    setShowForm(false);
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">
            Gallery Management
          </h1>

          <p className="admin-subtitle">
            Manage gallery images,
            featured content and
            categories.
          </p>
        </div>

        <button
          className="admin-btn admin-btn-primary"
          onClick={
            openCreateModal
          }
        >
          <Plus size={18} />
          Add Image
        </button>
      </div>

      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>
                {selectedImage
                  ? "Edit Gallery Image"
                  : "Add Gallery Image"}
              </h2>

              <button
                onClick={closeModal}
                className="admin-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <GalleryForm
              galleryData={
                selectedImage
              }
              onSuccess={() => {
                closeModal();
                loadGallery();
              }}
            />
          </div>
        </div>
      )}

      <div className="admin-table-wrapper">
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
          <table className="admin-table">
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
                    key={item.id}
                  >
                    <td>
                      <Image
                        src={
                          item.image_url
                        }
                        alt={
                          item.title
                        }
                        width={70}
                        height={70}
                        className="admin-thumb"
                      />
                    </td>

                    <td>
                      {item.title}
                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td>
                      {item.featured ? (
                        <span className="badge badge-featured">
                          Featured
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td>
                      {item.active ? (
                        <span className="badge badge-active">
                          Active
                        </span>
                      ) : (
                        <span className="badge badge-inactive">
                          Hidden
                        </span>
                      )}
                    </td>

                    <td>
                      <div
                        style={{
                          display:
                            "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          className="admin-btn admin-btn-edit"
                          onClick={() =>
                            openEditModal(
                              item
                            )
                          }
                        >
                          <Pencil
                            size={18}
                          />
                        </button>

                        <button
                          className="admin-btn admin-btn-delete"
                          onClick={() =>
                            deleteImage(
                              item.id
                            )
                          }
                        >
                          <Trash2
                            size={18}
                          />
                        </button>
                      </div>
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