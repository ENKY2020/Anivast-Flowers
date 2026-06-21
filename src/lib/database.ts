import { supabase } from "./supabase";

import { flowers as fallbackFlowers } from "@/data/flowers";
import { packages as fallbackPackages } from "@/data/packages";
import { rentals as fallbackRentals } from "@/data/rentals";

export type UserRole = "admin" | "staff";

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  created_at: string;
}

/* =========================
   FLOWERS
========================= */

export interface Flower {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  featured: boolean;
  active: boolean;
  seasonal?: boolean;
  created_at: string;
}

/* =========================
   PACKAGES
========================= */

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  featured: boolean;
  active: boolean;
  created_at: string;
}

/* =========================
   RENTALS
========================= */

export interface Rental {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  featured: boolean;
  active: boolean;
  created_at: string;
}

/* =========================
   GALLERY
========================= */

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  featured: boolean;
  created_at: string;
}

/* =========================
   EVENT REQUESTS
========================= */

export interface EventRequest {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  event_type: string;
  event_date: string;
  location: string;
  guests: number;
  budget: string;
  notes?: string;
  status:
    | "new"
    | "contacted"
    | "quoted"
    | "completed";
  created_at: string;
}

/* =========================
   ORDERS
========================= */

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  item_type:
    | "flower"
    | "package"
    | "rental";
  item_id: string;
  total_amount: number;
  status:
    | "pending"
    | "paid"
    | "completed"
    | "cancelled";
  created_at: string;
}

/* =========================
   FALLBACK CONVERTERS
========================= */

function convertFallbackFlower(
  flower: (typeof fallbackFlowers)[number]
): Flower {
  return {
    id: `fallback-${flower.id}`,
    name: flower.name,
    slug: flower.slug,
    description: "",
    category: flower.category,
    price:
      Number(
        String(flower.price).replace(
          /[^0-9]/g,
          ""
        )
      ) || 0,
    image_url: flower.image,
    featured: false,
    active: true,
    seasonal: false,
    created_at: "2025-01-01",
  };
}

function convertFallbackPackage(
  pkg: (typeof fallbackPackages)[number]
): Package {
  return {
    id: `fallback-${pkg.id}`,
    name: pkg.name,
    slug: pkg.slug,
    description: pkg.description || "",
    category: pkg.category || "Package",
    price:
      Number(
        String(pkg.price).replace(
          /[^0-9]/g,
          ""
        )
      ) || 0,
    image_url: pkg.image,
    featured:
      (pkg as any).featured || false,
    active:
      (pkg as any).active ?? true,
    created_at: "2025-01-01",
  };
}

function convertFallbackRental(
  rental: (typeof fallbackRentals)[number]
): Rental {
  return {
    id: `fallback-${rental.id}`,
    name: rental.name,
    slug: rental.slug,
    description: rental.description,
    category: rental.category,
    price:
      Number(
        String(rental.price).replace(
          /[^0-9]/g,
          ""
        )
      ) || 0,
    image_url: rental.image,
    featured: rental.featured,
    active: rental.active,
    created_at: "2025-01-01",
  };
}

/* =========================
   FLOWERS
========================= */

export async function getFlowers(): Promise<Flower[]> {
  const { data, error } = await supabase
    .from("flowers")
    .select("*")
    .eq("active", true)
    .order("created_at", {
      ascending: false,
    });

  const fallbackData =
    fallbackFlowers.map(
      convertFallbackFlower
    );

  if (error) {
    console.error(
      "❌ Error fetching flowers:",
      error
    );

    return fallbackData;
  }

  return [
    ...((data as Flower[]) || []),
    ...fallbackData,
  ];
}

export async function getFlowerBySlug(
  slug: string
): Promise<Flower | null> {
  const { data } = await supabase
    .from("flowers")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (data) {
    return data as Flower;
  }

  const fallbackFlower =
    fallbackFlowers.find(
      (flower) =>
        flower.slug === slug
    );

  return fallbackFlower
    ? convertFallbackFlower(
        fallbackFlower
      )
    : null;
}

/* =========================
   PACKAGES
========================= */

export async function getPackages(): Promise<Package[]> {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("active", true)
    .order("created_at", {
      ascending: false,
    });

  const fallbackData =
    fallbackPackages.map(
      convertFallbackPackage
    );

  if (error) {
    console.error(
      "❌ Error fetching packages:",
      error
    );

    return fallbackData;
  }

  return [
    ...((data as Package[]) || []),
    ...fallbackData,
  ];
}

export async function getPackageBySlug(
  slug: string
): Promise<Package | null> {
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (data) {
    return data as Package;
  }

  const fallbackPackage =
    fallbackPackages.find(
      (pkg) =>
        pkg.slug === slug
    );

  return fallbackPackage
    ? convertFallbackPackage(
        fallbackPackage
      )
    : null;
}

/* =========================
   RENTALS
========================= */

export async function getRentals(): Promise<Rental[]> {
  const { data, error } = await supabase
    .from("rentals")
    .select("*")
    .eq("active", true)
    .order("created_at", {
      ascending: false,
    });

  const fallbackData =
    fallbackRentals.map(
      convertFallbackRental
    );

  if (error) {
    console.error(
      "❌ Error fetching rentals:",
      error
    );

    return fallbackData;
  }

  return [
    ...((data as Rental[]) || []),
    ...fallbackData,
  ];
}

export async function getRentalBySlug(
  slug: string
): Promise<Rental | null> {
  const { data } = await supabase
    .from("rentals")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (data) {
    return data as Rental;
  }

  const fallbackRental =
    fallbackRentals.find(
      (rental) =>
        rental.slug === slug
    );

  return fallbackRental
    ? convertFallbackRental(
        fallbackRental
      )
    : null;
}