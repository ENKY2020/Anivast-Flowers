import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";

import FeaturedFlowers from "@/components/home/FeaturedFlowers";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import FeaturedRentals from "@/components/home/FeaturedRentals";

import GalleryPreview from "@/components/home/GalleryPreview";

import SeasonalOffer from "@/components/home/SeasonalOffer";

import Services from "@/components/home/Services";

import ContactCTA from "@/components/home/ContactCTA";

import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <QuickActions />

      <FeaturedFlowers />

      <FeaturedPackages />

      <FeaturedRentals />

      <GalleryPreview />

      <SeasonalOffer />

      <Services />

      <ContactCTA />

      <Footer />
    </main>
  );
}