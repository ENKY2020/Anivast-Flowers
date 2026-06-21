"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import WishlistButton from "@/components/shared/WishlistButton";
import ShareButton from "@/components/shared/ShareButton";

import {
  Package,
  getPackages,
} from "@/lib/database";

export default function PackagesPage() {
  const [packages, setPackages] =
    useState<Package[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    activeCategory,
    setActiveCategory,
  ] = useState("All");

  useEffect(() => {
    async function loadPackages() {
      const data =
        await getPackages();

      setPackages(data);
      setLoading(false);
    }

    loadPackages();
  }, []);

  const categories = [
    "All",
    ...new Set(
      packages
        .map(
          (pkg) => pkg.category
        )
        .filter(Boolean)
    ),
  ];

  const filteredPackages =
    packages.filter((pkg) => {
      const matchesSearch =
        pkg.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        activeCategory === "All" ||
        pkg.category ===
          activeCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f3ee",
        }}
      >
        Loading packages...
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#f7f3ee",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize:
                "clamp(2rem,5vw,3.5rem)",
              color: "#4a3128",
              marginBottom:
                ".5rem",
            }}
          >
            Event Packages
          </h1>

          <p
            style={{
              color: "#7b6b62",
            }}
          >
            Beautiful event
            experiences crafted
            for unforgettable
            moments.
          </p>
        </div>

        {/* Search */}

        <div
          style={{
            display: "flex",
            gap: ".75rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderRadius:
                "999px",
              padding:
                "0 1rem",
              border:
                "1px solid #eee",
            }}
          >
            <Search
              size={18}
              color="#777"
            />

            <input
              type="text"
              placeholder="Search packages..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: ".9rem",
                background:
                  "transparent",
              }}
            />
          </div>

          <button
            style={{
              width: "52px",
              height: "52px",
              border: "none",
              borderRadius:
                "50%",
              background:
                "#fff",
              boxShadow:
                "0 4px 12px rgba(0,0,0,.08)",
            }}
          >
            <SlidersHorizontal
              size={18}
            />
          </button>
        </div>

        {/* Categories */}

        <div
          style={{
            display: "flex",
            gap: ".75rem",
            overflowX: "auto",
            marginBottom:
              "1.5rem",
            paddingBottom:
              ".5rem",
          }}
        >
          {categories.map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                style={{
                  border: "none",
                  cursor:
                    "pointer",
                  whiteSpace:
                    "nowrap",
                  padding:
                    ".7rem 1rem",
                  borderRadius:
                    "999px",
                  fontWeight:
                    600,
                  background:
                    activeCategory ===
                    category
                      ? "#c62828"
                      : "#fff",
                  color:
                    activeCategory ===
                    category
                      ? "#fff"
                      : "#4a3128",
                }}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Grid */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredPackages.map(
            (pkg) => (
              <div
                key={pkg.id}
                style={{
                  background:
                    "#fff",
                  borderRadius:
                    "24px",
                  overflow:
                    "hidden",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,.08)",
                }}
              >
                <div
                  style={{
                    position:
                      "relative",
                    height:
                      "280px",
                  }}
                >
                  <Image
                    src={
                      pkg.image_url
                    }
                    alt={pkg.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{
                      objectFit:
                        "cover",
                    }}
                  />

                  <div
                    style={{
                      position:
                        "absolute",
                      top: 12,
                      left: 12,
                      background:
                        "#c62828",
                      color:
                        "#fff",
                      padding:
                        ".35rem .8rem",
                      borderRadius:
                        "999px",
                      fontSize:
                        ".8rem",
                      fontWeight:
                        700,
                    }}
                  >
                    {
                      pkg.category
                    }
                  </div>

                  <div
                    style={{
                      position:
                        "absolute",
                      top: 12,
                      right: 12,
                      display:
                        "flex",
                      gap: ".5rem",
                    }}
                  >
                    <ShareButton
                      title={
                        pkg.name
                      }
                    />

                    <WishlistButton
                      id={pkg.id}
                      name={
                        pkg.name
                      }
                      image={
                        pkg.image_url
                      }
                    />
                  </div>
                </div>

                <div
                  style={{
                    padding:
                      "1.25rem",
                  }}
                >
                  <h2
                    style={{
                      color:
                        "#4a3128",
                      fontSize:
                        "1.6rem",
                      marginBottom:
                        ".75rem",
                    }}
                  >
                    {pkg.name}
                  </h2>

                  <div
                    style={{
                      color:
                        "#c62828",
                      fontWeight:
                        800,
                      fontSize:
                        "1.4rem",
                      marginBottom:
                        ".75rem",
                    }}
                  >
                    KES{" "}
                    {pkg.price.toLocaleString()}
                  </div>

                  <p
                    style={{
                      color:
                        "#666",
                      lineHeight:
                        1.7,
                      marginBottom:
                        "1.25rem",
                    }}
                  >
                    {pkg.description}
                  </p>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    style={{
                      display:
                        "block",
                      textAlign:
                        "center",
                      background:
                        "#c62828",
                      color:
                        "#fff",
                      textDecoration:
                        "none",
                      padding:
                        ".9rem",
                      borderRadius:
                        "999px",
                      fontWeight:
                        700,
                    }}
                  >
                    View Package →
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}