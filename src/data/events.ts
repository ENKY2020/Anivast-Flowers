export interface EventItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

export const events: EventItem[] = [
  {
    id: 1,
    slug: "wedding-setup-1",
    name: "Elegant Wedding Setup",
    category: "Wedding",
    price: "Custom Quote",
    image: "/images/events/wedding-setup-1.jpg",
    description:
      "Luxury wedding décor featuring premium floral arrangements, elegant seating, lighting and full venue styling.",
  },

  {
    id: 2,
    slug: "wedding-setup-2",
    name: "Garden Wedding Experience",
    category: "Wedding",
    price: "Custom Quote",
    image: "/images/events/wedding-setup-2.jpg",
    description:
      "Beautiful outdoor wedding setup with floral arches, aisle décor and reception styling.",
  },

  {
    id: 3,
    slug: "birthday-setup-1",
    name: "Birthday Celebration Setup",
    category: "Birthday",
    price: "From KES 15,000",
    image: "/images/events/birthday-setup-1.jpg",
    description:
      "Complete birthday decoration package including flowers, tables, balloons and themed styling.",
  },

  {
    id: 4,
    slug: "birthday-setup-2",
    name: "Premium Birthday Event",
    category: "Birthday",
    price: "From KES 20,000",
    image: "/images/events/birthday-setup-2.jpg",
    description:
      "Premium birthday setup designed for unforgettable celebrations and special moments.",
  },

  {
    id: 5,
    slug: "corporate-setup",
    name: "Corporate Event Setup",
    category: "Corporate",
    price: "Custom Quote",
    image: "/images/events/corporate-setup.jpg",
    description:
      "Professional corporate event styling with elegant décor, seating arrangements and branding support.",
  },

  {
    id: 6,
    slug: "baby-shower",
    name: "Baby Shower Setup",
    category: "Baby Shower",
    price: "From KES 18,000",
    image: "/images/events/baby-shower.jpg",
    description:
      "Beautiful baby shower decorations with floral styling, themed arrangements and memorable photo areas.",
  },

  {
    id: 7,
    slug: "event-setup",
    name: "Special Event Setup",
    category: "Special Event",
    price: "Custom Quote",
    image: "/images/events/event-setup.jpg",
    description:
      "Custom event decoration services tailored for private celebrations, launches and special occasions.",
  },
];