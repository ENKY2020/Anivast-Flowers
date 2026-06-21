"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  async function loadRentals() {
    setLoading(true);

    const { data, error } = await supabase
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

  async function deleteRental(id: string) {
    const confirmed = window.confirm(
      "Delete this rental?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("rentals")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete rental");
      return;
    }

    loadRentals();
  }

  useEffect(() => {
    loadRentals();
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
            : "+ Add Rental"}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <RentalForm />
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
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {rentals.map(
                (
                  rental
                ) => (
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
                          objectFit:
                            "cover",
                          borderRadius:
                            "10px",
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
                      {rental.price?.toLocaleString()}
                    </td>

                    <td>
                      {rental.featured
                        ? "⭐"
                        : "—"}
                    </td>

                    <td>
                      {rental.active
                        ? "✅"
                        : "❌"}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          deleteRental(
                            rental.id
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