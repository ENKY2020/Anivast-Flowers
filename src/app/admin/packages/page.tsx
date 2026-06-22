"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Gift,
  X,
} from "lucide-react";

import PackageForm from "../PackageForm";
import { supabase } from "@/lib/supabase";

interface Package {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  description?: string;
  featured: boolean;
  active: boolean;
}

export default function PackagesAdminPage() {
  const [showForm, setShowForm] =
    useState(false);

  const [selectedPackage, setSelectedPackage] =
    useState<Package | null>(null);

  const [packages, setPackages] =
    useState<Package[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    setLoading(true);

    const { data, error } =
      await supabase
        .from("packages")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
    } else {
      setPackages(data || []);
    }

    setLoading(false);
  }

  async function deletePackage(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this package?"
      );

    if (!confirmed) return;

    const { error } =
      await supabase
        .from("packages")
        .delete()
        .eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    await loadPackages();
  }

  function openCreateModal() {
    setSelectedPackage(null);
    setShowForm(true);
  }

  function openEditModal(
    pkg: Package
  ) {
    setSelectedPackage(pkg);
    setShowForm(true);
  }

  function closeModal() {
    setSelectedPackage(null);
    setShowForm(false);
  }

  return (
    <div className="admin-section">
      <div className="admin-header">
        <div>
          <h1>
            Packages Management
          </h1>

          <p>
            Manage package
            offerings, pricing,
            featured promotions
            and availability.
          </p>
        </div>

        <button
          className="admin-add-btn"
          onClick={openCreateModal}
        >
          <Plus size={18} />
          Add Package
        </button>
      </div>

      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>
                {selectedPackage
                  ? "Edit Package"
                  : "Create Package"}
              </h2>

              <button
                type="button"
                className="admin-close-btn"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                padding: "2rem",
              }}
            >
              <PackageForm
                packageData={
                  selectedPackage
                }
                onSuccess={() => {
                  closeModal();
                  loadPackages();
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="admin-table-card">
        {loading ? (
          <p>
            Loading packages...
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Category</th>
                <th>Price</th>
                <th>Featured</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {packages.map(
                (pkg) => (
                  <tr
                    key={pkg.id}
                  >
                    <td>
                      <div className="flower-cell">
                        {pkg.image_url ? (
                          <img
                            src={
                              pkg.image_url
                            }
                            alt={
                              pkg.name
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
                          <Gift />
                        )}

                        <span>
                          {pkg.name}
                        </span>
                      </div>
                    </td>

                    <td>
                      {
                        pkg.category
                      }
                    </td>

                    <td>
                      KES{" "}
                      {pkg.price.toLocaleString()}
                    </td>

                    <td>
                      <span
                        style={{
                          padding:
                            "6px 12px",
                          borderRadius:
                            999,
                          background:
                            pkg.featured
                              ? "#22c55e"
                              : "#e5e7eb",
                          color:
                            pkg.featured
                              ? "#fff"
                              : "#444",
                          fontWeight:
                            600,
                        }}
                      >
                        {pkg.featured
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
                            pkg.active
                              ? "#22c55e"
                              : "#ef4444",
                          color:
                            "#fff",
                          fontWeight:
                            600,
                        }}
                      >
                        {pkg.active
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
                              pkg
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
                            deletePackage(
                              pkg.id
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