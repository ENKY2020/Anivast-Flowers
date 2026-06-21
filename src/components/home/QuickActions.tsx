import Link from "next/link";
import {
  Flower2,
  Gift,
  Tent,
  Images,
} from "lucide-react";

import "@/styles/quick-actions.css";

export default function QuickActions() {
const actions = [
  {
    label: "Flowers",
    href: "/flowers",
    icon: Flower2,
  },
  {
    label: "Packages",
    href: "/packages",
    icon: Gift,
  },
  {
    label: "Rentals",
    href: "/rentals",
    icon: Tent,
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: Images,
  },
];

  return (
    <section className="quick-actions">
      <div className="quick-actions-container">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
<Link
  key={action.label}
  href={action.href}
  className="quick-action"
>
  <div className="quick-action-icon">
    <Icon size={24} />
  </div>

  <span>{action.label}</span>
</Link>
          );
        })}
      </div>
    </section>
  );
}