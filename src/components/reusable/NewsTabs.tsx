"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types";

interface NewsTabsProps {
  category: MenuItem;
  activeSubcategory?: string;
}

const NewsTabs: React.FC<NewsTabsProps> = ({ category, activeSubcategory }) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center space-x-6 mb-6 border-b border-[#EDEFF0]">
      {category.submenus.map((submenu) => {
        const isActive =
          pathname === submenu.href ||
          submenu.href === `/${category.href.split("/")[1]}/${activeSubcategory}`;

        return (
          <Link
            key={submenu.href}
            href={submenu.href}
            className={`py-2 text-sm text-nowrap transition-colors duration-200 ${
              isActive
                ? "text-accent-orange font-semibold border-b-2 border-accent-orange"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {submenu.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NewsTabs;
