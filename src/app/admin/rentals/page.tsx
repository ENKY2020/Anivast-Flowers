"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import RentalForm from "../RentalForm";
import { supabase } from "@/lib/supabase";

interface Rental {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  featured: boolean;
  active: boolean;
}

export default function RentalsAdminPage() {
  const [rentals, setRentals] =
    useState<Rental[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [selectedRental, setSelectedRental] =
    useState<Rental | null>(null);

  useEffect(() => {
    loadRentals();
  }, []);

  async function loadRentals() {
    setLoading(true);

    const { data, error } =
      await supabase
        .from("rentals")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
    } else {
      setRentals(data || []);
    }

    setLoading(false);
  }

  async function deleteRental(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this rental?"
      );

    if (!confirmed) return;

    const { error } =
      await supabase
        .from("rentals")
        .delete()
        .eq("id", id);

    if (error) {
      alert(
        "Failed to delete rental"
      );
      return;
    }

    await loadRentals();
  }

  function openCreateModal() {
    setSelectedRental(null);
    setShowForm(true);
  }

  function openEditModal(
    rental: Rental
  ) {
    setSelectedRental(rental);
    setShowForm(true);
  }

  function closeModal() {
    setSelectedRental(null);
    setShowForm(false);
  }

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
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1>
            Rentals Management
          </h1>

          <p>
            Manage rental inventory,
            pricing, promotions and
            availability.
          </p>
        </div>

        <button
          onClick={
            openCreateModal
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
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Plus size={18} />
          Add Rental
        </button>
      </div>

      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background:
                "#ffffff",
              width: "100%",
              maxWidth:
                "850px",
              borderRadius:
                "24px",
              maxHeight:
                "90vh",
              overflowY:
                "auto",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                padding:
                  "20px",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <h2>
                {selectedRental
                  ? "Edit Rental"
                  : "Add Rental"}
              </h2>

              <button
                onClick={
                  closeModal
                }
                style={{
                  background:
                    "transparent",
                  border:
                    "none",
                  cursor:
                    "pointer",
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div
              style={{
                padding:
                  "20px",
              }}
            >
              <RentalForm
                rentalData={
                  selectedRental
                }
                onSuccess={() => {
                  closeModal();
                  loadRentals();
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          background: "#fff",
          borderRadius:
            "24px",
          padding: "1.5rem",
          overflowX: "auto",
        }}
      >
        {loading ? (
          <p>
            Loading rentals...
          </p>
        ) : rentals.length ===
          0 ? (
          <p>
            No rentals found.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Image</th>
                <th>Rental</th>
                <th>Category</th>
                <th>Price</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {rentals.map(
                (rental) => (
                  <tr
                    key={
                      rental.id
                    }
                  >
                    <td>
                      <Image
                        src={
                          rental.image_url
                        }
                        alt={
                          rental.name
                        }
                        width={
                          70
                        }
                        height={
                          70
                        }
                        style={{
                          borderRadius:
                            "12px",
                          objectFit:
                            "cover",
                        }}
                      />
                    </td>

                    <td>
                      {
                        rental.name
                      }
                    </td>

                    <td>
                      {
                        rental.category
                      }
                    </td>

                    <td>
                      KES{" "}
                      {Number(
                        rental.price
                      ).toLocaleString()}
                    </td>

                    <td>
                      {rental.featured
                        ? "Yes"
                        : "—"}
                    </td>

                    <td>
                      {rental.active
                        ? "Active"
                        : "Hidden"}
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
                          onClick={() =>
                            openEditModal(
                              rental
                            )
                          }
                          style={{
                            border:
                              "none",
                            background:
                              "transparent",
                            cursor:
                              "pointer",
                          }}
                        >
                          <Pencil
                            size={18}
                          />
                        </button>

                        <button
                          onClick={() =>
                            deleteRental(
                              rental.id
                            )
                          }
                          style={{
                            border:
                              "none",
                            background:
                              "transparent",
                            cursor:
                              "pointer",
                          }}
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