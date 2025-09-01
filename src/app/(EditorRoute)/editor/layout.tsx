"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbLogout } from "react-icons/tb";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import {
  ChartNoAxesCombined,
  CopyIcon,
  LayoutDashboardIcon,
  Settings,
  UserRoundCog,
  ChevronDown,
  X,
} from "lucide-react";
import logo from "@/assets/other/mic.svg";
import profile from "@/assets/other/mic.svg";
import { cn } from "@/lib/utils";
import AdminNavBar from "@/components/Admin/shared/AdminNavbar";
import { toast } from "sonner";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { useDispatch } from "react-redux";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/editor/dashboard", icon: LayoutDashboardIcon },
  {
    title: "Content",
    href: "/editor/content",
    icon: CopyIcon,
    subItems: [
      { title: "Articles", href: "/editor/articles" },
      { title: "Videos", href: "/editor/videos" },
      { title: "Podcasts", href: "/editor/podcasts" },
    ],
  },
  {
    title: "Analytics",
    href: "/editor/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Role Management",
    href: "/editor/role",
    icon: UserRoundCog,
  },
  {
    title: "Settings",
    href: "/editor/settings",
    icon: Settings,
  },
];

// Reusable NavMenu component for both desktop and mobile
const NavMenu = ({
  pathname,
  toggleDropdown,
  openDropdown,
  onItemClick,
  isMobile = false,
}: {
  pathname: string;
  toggleDropdown: (title: string) => void;
  openDropdown: string | null;
  onItemClick?: () => void;
  isMobile?: boolean;
}) => (
  <nav className={cn("flex-grow space-y-2")}>
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
            if (item.subItems) {
              toggleDropdown(item.title);
            } else if (isMobile && onItemClick) {
              onItemClick();
            }
          }}
        >
          {item.subItems ? (
            <>
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  pathname.startsWith(item.href) ? "text-white" : ""
                )}
              />
              <span
                className={cn(
                  "font-medium text-[16px] transition-colors",
                  pathname.startsWith(item.href) ? "text-white" : ""
                )}
              >
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 ml-auto transition-transform",
                  openDropdown === item.title ? "rotate-180" : "",
                  pathname.startsWith(item.href) ? "text-white" : ""
                )}
              />
            </>
          ) : (
            <Link
              href={item.href}
              className="flex items-center gap-3 w-full"
              onClick={isMobile && onItemClick ? onItemClick : undefined}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  pathname.startsWith(item.href) ? "text-white" : ""
                )}
              />
              <span
                className={cn(
                  "font-medium text-[16px] transition-colors",
                  pathname.startsWith(item.href) ? "text-white" : ""
                )}
              >
                {item.title}
              </span>
            </Link>
          )}
        </div>
        {item.subItems && (
          <AnimatePresence>
            {openDropdown === item.title && (
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
                    onClick={isMobile && onItemClick ? onItemClick : undefined}
                    className={cn(
                      "block px-4 py-2 rounded text-sm transition-colors",
                      pathname === subItem.href
                        ? "bg-orange-100 text-accent-orange"
                        : "hover:bg-orange-50"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    ))}
  </nav>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();


  const handleLogout = () => {
    dispatch(logout());
    toast.success("Admin Logged out successfully!");
    router.push("/");
  };

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const hideNavBar =
    pathname === "/admin/active-user-details" 

  return (
    <div className="flex flex-col min-h-screen bg-[#ECF4F8] font-Robot">
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
        {/* Sidebar for Desktop */}
        <motion.aside
          initial={false}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-20 bg-pure-white dark:bg-gray-900 shadow-md w-72 p-6 px-10"
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
          />

          <div className="mt-auto mb-10">
            <button
              onClick={handleLogout}
              className={cn(
                "group flex items-center w-full gap-3 px-3 py-2 rounded transition-colors text-white hover:bg-brick-red/90 cursor-pointer bg-brick-red",
                "justify-start"
              )}
            >
              <TbLogout className="h-5 w-5 text-white" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </motion.aside>

        {/* Mobile Top bar */}
        <header className="md:hidden sticky top-0 z-20 bg-pure-white shadow-sm flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 rounded-md hover:bg-orange-100 cursor-pointer"
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt2 className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <Image src={logo} alt="Logo" width={32} height={32} />
              <h1 className="text-xl font-bold font-cursive">
                The Australian Canvas
              </h1>
            </div>
          </div>

          <button className="p-1" onClick={() => setMobileMenuOpen(true)}>
            <Image
              src={profile}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full"
            />
          </button>
        </header>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black/20 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-40 w-72 bg-pure-white shadow-xl overflow-y-auto"
              >
                <div className="flex flex-col h-full p-4">
                  <div className="flex items-center justify-center mb-4 pb-4 border-b border-slight-border relative">
                    <div className="w-24 h-full">
                      <Image
                        src="/logoDashboard.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="mt-6"
                      />
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1 rounded-full hover:bg-orange-50 cursor-pointer absolute top-2 right-2"
                      aria-label="Close menu"
                    >
                      <X />
                    </button>
                  </div>

                  <NavMenu
                    pathname={pathname}
                    toggleDropdown={toggleDropdown}
                    openDropdown={openDropdown}
                    onItemClick={() => setMobileMenuOpen(false)}
                    isMobile
                  />

                  <div className="mt-auto mb-10">
                    <button
                      onClick={handleLogout}
                      className={cn(
                        "group flex items-center w-full gap-3 px-3 py-2 rounded transition-colors text-white hover:bg-brick-red/90 cursor-pointer bg-brick-red",
                        "justify-start"
                      )}
                    >
                      <TbLogout className="h-5 w-5 text-white" />
                      <span className="text-sm font-medium">Log Out</span>
                    </button>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 bg-[#ECF4F8] overflow-y-auto transition-all duration-300",
            "md:ml-[296px]"
          )}
        >
          {!hideNavBar && (
            <div className="hidden md:block sticky top-0 z-10">
              <AdminNavBar />
            </div>
          )}
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
