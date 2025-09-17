"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TbLogout } from "react-icons/tb";
import {
  CopyIcon,
  LayoutDashboardIcon,
  Settings,
  UserRoundCog,
  ChevronDown,
  X,
  CreditCard,
  FileChartLine,
  Settings2,
  Megaphone,
  ChartPie,
} from "lucide-react";
import { AiOutlineOpenAI } from "react-icons/ai";
import { cn } from "@/lib/utils";
import AdminNavBar from "@/components/Admin/shared/AdminNavbar";
import { toast } from "sonner";
import { logoutUser } from "@/store/Slices/AuthSlice/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboardIcon },
  { title: "Analytics", href: "/admin/analytics", icon: ChartPie },
  {
    title: "Content",
    href: "/admin/content",
    icon: CopyIcon,
    subItems: [
      { title: "Articles", href: "/admin/articles" },
      { title: "Videos", href: "/admin/videos" },
      { title: "Podcasts", href: "/admin/podcasts" },
      { title: "Live Events", href: "/admin/live-events" },
      { title: "Category Management", href: "/admin/category-management" },
      { title: "Content Moderation", href: "/admin/content-moderation" },
    ],
  },
  {
    title: "User Management",
    href: "/admin/user-management",
    icon: UserRoundCog,
  },
  {
    title: "Site Settings",
    href: "/admin/website-management",
    icon: Settings2,
    subItems: [
      { title: "Privacy Policy", href: "/admin/privacy-policy" },
      { title: "Terms & Conditions", href: "/admin/terms" },
      { title: "FAQ Management", href: "/admin/faq" },
      { title: "Language Setting", href: "/admin/languages" },
    ],
  },
  {
    title: "Ad Management",
    href: "/admin/ad-management",
    icon: Megaphone,
  },
  {
    title: "AI Options",
    href: "/admin/ai-management",
    icon: AiOutlineOpenAI,
    subItems: [
      { title: "LLM Management", href: "/admin/llm-option" },
      { title: "Laws & Regulation", href: "/admin/law-regulation" },
    ],
  },
  {
    title: "Manage Plan",
    href: "/admin/manage-plan",
    icon: CreditCard,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileChartLine,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const NavMenu = ({
  pathname,
  toggleDropdown,
  openDropdown,
  closeSidebar, // Added closeSidebar prop to close the sidebar when an item is clicked
}: {
  pathname: string;
  toggleDropdown: (title: string) => void;
  openDropdown: string | null;
  closeSidebar: () => void; // Function to close sidebar
}) => (
  <nav className="flex-grow space-y-2">
    {navItems.map((item) => (
      <div key={item.href}>
        <div
          className={cn(
            "group flex items-center gap-3 px-4 py-2 rounded transition-all",
            pathname.startsWith(item.href)
              ? "bg-accent-orange text-white"
              : "hover:bg-orange-50 cursor-pointer"
          )}
          onClick={() => {
            if (item.subItems) toggleDropdown(item.title);
            if (!item.subItems) closeSidebar(); // Close sidebar when an item is clicked
          }}
        >
          {item.subItems ? (
            <>
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  pathname.startsWith(item.href) ? "text-white" : ""
                )}
              />
              <span className="font-medium text-[16px]">{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 ml-auto transition-transform",
                  openDropdown === item.title ? "rotate-180" : ""
                )}
              />
            </>
          ) : (
            <Link href={item.href} className="flex items-center gap-3 w-full">
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  pathname.startsWith(item.href) ? "text-white" : ""
                )}
              />
              <span className="font-medium text-[16px]">{item.title}</span>
            </Link>
          )}
        </div>

        {/* Dropdown SubItems */}
        {item.subItems && openDropdown === item.title && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-6 mt-1 space-y-1"
          >
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={cn(
                  "block px-4 py-2 rounded text-sm transition-colors",
                  pathname === subItem.href
                    ? "bg-orange-100 text-accent-orange"
                    : "hover:bg-orange-50"
                )}
                onClick={() => closeSidebar()} // Close sidebar when a sub-item is clicked
              >
                {subItem.title}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    ))}
  </nav>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser()).unwrap();
    toast.success("Admin Logged out successfully!");
    router.push("/");
  };

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const hideNavBar = pathname === "/admin/active-user-details";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#ECF4F8] font-Robot">
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
        {/* Sidebar - visible only on lg+ */}
        <motion.aside
          initial={false}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden lg:flex flex-col fixed top-0 left-0 h-screen z-20 bg-pure-white shadow-md w-72 p-6 px-10"
        >
          <div className="flex items-center justify-center mb-5 pb-5 border-b border-slight-border">
            <Link href="/" className="w-24 h-full">
              <Image
                src="/logoDashboard.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <NavMenu
            pathname={pathname}
            toggleDropdown={toggleDropdown}
            openDropdown={openDropdown}
            closeSidebar={() => setSidebarOpen(false)} // Pass closeSidebar function
          />

          <div className="mt-auto mb-10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded bg-brick-red text-white hover:bg-brick-red/90 w-full"
            >
              <TbLogout className="h-5 w-5" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </motion.aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {sidebarOpen && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 h-screen bg-white shadow-md w-64 z-50 p-6"
          >
            <div className="flex items-center justify-center mb-5 pb-5 border-b border-slight-border relative">
              <Link href="/" className="w-24 h-full">
                <Image
                  src="/logoDashboard.png"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 absolute top-0 right-0"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <NavMenu
              pathname={pathname}
              toggleDropdown={toggleDropdown}
              openDropdown={openDropdown}
              closeSidebar={() => setSidebarOpen(false)} // Pass closeSidebar function
            />
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded bg-brick-red text-white hover:bg-brick-red/90 w-full"
              >
                <TbLogout className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.aside>
        )}

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 bg-[#ECF4F8] overflow-y-auto transition-all duration-300",
            "lg:ml-[288px]" // margin for sidebar
          )}
        >
          {/* Top Navbar (only below lg) */}
          {!hideNavBar && (
            <div className="sticky top-0 z-10">
              <AdminNavBar
                role="admin"
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
            </div>
          )}

          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
