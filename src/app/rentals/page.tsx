"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";

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
  const [selectedRental, setSelectedRental] =
    useState<Rental | null>(null);

  useEffect(() => {
    loadRentals();
  }, []);

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

  function openCreateModal() {
    setSelectedRental(null);
    setShowForm(true);
  }

  function openEditModal(rental: Rental) {
    setSelectedRental(rental);
    setShowForm(true);
  }

  function closeModal() {
    setSelectedRental(null);
    setShowForm(false);
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">
            Rentals Management
          </h1>

          <p className="admin-subtitle">
            Manage rental inventory,
            pricing, promotions and availability.
          </p>
        </div>

        <button
          className="admin-btn admin-btn-primary"
          onClick={openCreateModal}
        >
          <Plus size={18} />
          Add Rental
        </button>
      </div>

      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>
                {selectedRental
                  ? "Edit Rental"
                  : "Add Rental"}
              </h2>

              <button
                className="admin-close-btn"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <RentalForm
              rentalData={selectedRental}
              onSuccess={() => {
                closeModal();
                loadRentals();
              }}
            />
          </div>
        </div>
      )}

      <div className="admin-table-wrapper">
        {loading ? (
          <p>Loading rentals...</p>
        ) : rentals.length === 0 ? (
          <p>No rentals found.</p>
        ) : (
          <table className="admin-table">
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
              {rentals.map((rental) => (
                <tr key={rental.id}>
                  <td>
                    <Image
                      src={rental.image_url}
                      alt={rental.name}
                      width={70}
                      height={70}
                      className="admin-thumb"
                    />
                  </td>

                  <td>{rental.name}</td>

                  <td>{rental.category}</td>

                  <td>
                    KES{" "}
                    {rental.price?.toLocaleString()}
                  </td>

                  <td>
                    {rental.featured ? (
                      <span className="badge badge-featured">
                        Featured
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td>
                    {rental.active ? (
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
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button
                        className="admin-btn admin-btn-edit"
                        onClick={() =>
                          openEditModal(rental)
                        }
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="admin-btn admin-btn-delete"
                        onClick={() =>
                          deleteRental(rental.id)
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}