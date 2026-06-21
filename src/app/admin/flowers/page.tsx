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
  id: string | number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  featured: boolean;
  active: boolean;
  seasonal?: boolean;
}

export default function FlowersAdminPage() {
  const [showForm, setShowForm] =
    useState(false);

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

    loadFlowers();
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
          onClick={() =>
            setShowForm(true)
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
                Add New Flower
              </h2>

              <button
                type="button"
                className="admin-close-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <FlowerForm />

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
                              ? "#f59e0b"
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
                          ? "Seasonal"
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
    String(flower.id)
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