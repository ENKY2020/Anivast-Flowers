"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Flower2,
  X,
} from "lucide-react";

import FlowerForm from "../FlowerForm";
import { supabase } from "@/lib/supabase";

interface Flower {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image_url?: string;
  featured: boolean;
  active: boolean;
  seasonal?: boolean;
}

export default function FlowersAdminPage() {
  const [showForm, setShowForm] =
    useState(false);

  const [selectedFlower, setSelectedFlower] =
    useState<Flower | null>(null);

  const [flowers, setFlowers] =
    useState<Flower[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadFlowers();
  }, []);

  async function loadFlowers() {
    setLoading(true);

    const { data, error } =
      await supabase
        .from("flowers")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
    } else {
      setFlowers(data || []);
    }

    setLoading(false);
  }

  async function deleteFlower(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this flower?"
      );

    if (!confirmed) return;

    const { error } =
      await supabase
        .from("flowers")
        .delete()
        .eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    await loadFlowers();
  }

  function openCreateModal() {
    setSelectedFlower(null);
    setShowForm(true);
  }

  function openEditModal(
    flower: Flower
  ) {
    setSelectedFlower(flower);
    setShowForm(true);
  }

  function closeModal() {
    setSelectedFlower(null);
    setShowForm(false);
  }

  return (
    <div className="admin-section">
      <div className="admin-header">
        <div>
          <h1>
            Flowers Management
          </h1>

          <p>
            Manage flower
            products, pricing,
            featured campaigns
            and seasonal offers.
          </p>
        </div>

        <button
          className="admin-add-btn"
          onClick={
            openCreateModal
          }
        >
          <Plus size={18} />
          Add Flower
        </button>
      </div>

      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>
                {selectedFlower
                  ? "Edit Flower"
                  : "Add New Flower"}
              </h2>

              <button
                type="button"
                className="admin-close-btn"
                onClick={
                  closeModal
                }
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                padding: "2rem",
              }}
            >
              <FlowerForm
                flowerData={
                  selectedFlower
                }
                onSuccess={() => {
                  closeModal();
                  loadFlowers();
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="admin-table-card">
        {loading ? (
          <p>
            Loading flowers...
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Flower</th>
                <th>Category</th>
                <th>Price</th>
                <th>Featured</th>
                <th>Seasonal</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {flowers.map(
                (flower) => (
                  <tr
                    key={
                      flower.id
                    }
                  >
                    <td>
                      <div className="flower-cell">
                        {flower.image_url ? (
                          <img
                            src={
                              flower.image_url
                            }
                            alt={
                              flower.name
                            }
                            style={{
                              width:
                                60,
                              height:
                                60,
                              borderRadius:
                                12,
                              objectFit:
                                "cover",
                            }}
                          />
                        ) : (
                          <Flower2 />
                        )}

                        <span>
                          {
                            flower.name
                          }
                        </span>
                      </div>
                    </td>

                    <td>
                      {
                        flower.category
                      }
                    </td>

                    <td>
                      KES{" "}
                      {flower.price.toLocaleString()}
                    </td>

                    <td>
                      <span
                        style={{
                          padding:
                            "6px 12px",
                          borderRadius:
                            999,
                          background:
                            flower.featured
                              ? "#22c55e"
                              : "#e5e7eb",
                          color:
                            flower.featured
                              ? "#fff"
                              : "#444",
                          fontWeight:
                            600,
                        }}
                      >
                        {flower.featured
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          padding:
                            "6px 12px",
                          borderRadius:
                            999,
                          background:
                            flower.seasonal
                              ? "#3b82f6"
                              : "#e5e7eb",
                          color:
                            flower.seasonal
                              ? "#fff"
                              : "#444",
                          fontWeight:
                            600,
                        }}
                      >
                        {flower.seasonal
                          ? "Yes"
                          : "No"}
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          padding:
                            "6px 12px",
                          borderRadius:
                            999,
                          background:
                            flower.active
                              ? "#22c55e"
                              : "#ef4444",
                          color:
                            "#fff",
                          fontWeight:
                            600,
                        }}
                      >
                        {flower.active
                          ? "Active"
                          : "Hidden"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          title="Edit"
                          onClick={() =>
                            openEditModal(
                              flower
                            )
                          }
                        >
                          <Pencil
                            size={18}
                          />
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          onClick={() =>
                            deleteFlower(
                              flower.id
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