"use client";

import CommonWrapper from "@/common/CommonWrapper";
import ForgotPasswordModal from "@/components/auth/ForgotPassword";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";
import VerifyOtpModal from "@/components/auth/VerifyOtpModal";
import ProfileSheet from "@/components/profile/ProfileSheet";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoryQuery } from "@/store/features/category/category.api";
import { useAppSelector } from "@/store/hook";
import { allMenus } from "@/utils/demoData";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LANGUAGES } from "./Language";

type SubCategory = {
  id: string;
  subname: string;
  subslug: string;
  categoryId: string;
};

type Category = {
  createdAt: string;
  id: string;
  isDeleted: boolean;
  name: string;
  slug: string;
  subCategories: SubCategory[];
};

const staticRoutes = [
  { name: "Live Events", path: "/live-events" },
  { name: "Videos & Podcasts", path: "/video-podcast" },
];

const Navbar: React.FC = () => {
  const { data } = useGetAllCategoryQuery(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state?.auth?.user);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const toggleProfileSheet = () => setIsSheetOpen((prev) => !prev);

  const handleChange = (langCode: string) => {
    setCurrentLang(langCode);
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const openSignUp = () => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  const openSignIn = () => {
    setSignUpOpen(false);
    setSignInOpen(true);
  };

  const openForgot = () => {
    setSignInOpen(false);
    setForgotOpen(true);
  };

  const openReset = () => {
    setSignUpOpen(false);
    setSignInOpen(false);
    setForgotOpen(false);
    setResetOpen(true);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleUserButtonClick = () => {
    if (user?.role === "USER" || user?.role === "CONTIBUTOR") {
      toggleProfileSheet();
    } else if (user?.role === "ADMIN") {
      router.push("/editor");
    } else if (user?.role === "SUPER_ADMIN") {
      router.push("/admin");
    }
  };

  return (
    <nav className="w-full bg-bg-cream z-50 text-ink-black border-b border-slight-border sticky-top-0">
      <CommonWrapper>
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 sm:py-3 md:py-4 lg:py-3">
          {/* Date - Hidden on small screens, visible on md+ */}
          <div className="hidden md:flex text-xs lg:text-sm text-gray-600 flex-shrink-0">
            {today}
          </div>

          {/* Mobile hamburger - Left side on mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none mr-2 sm:mr-3"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" />
            )}
          </button>

          {/* Logo/Title - Centered on mobile, left-aligned on md+ */}
          <Link
            href="/"
            className="flex-1 md:flex-none text-center md:text-left"
          >
            <img
              src="/TAC1.png"
              className="h-6 sm:h-7 md:h-8 lg:h-10 xl:h-12 mx-auto md:mx-0"
              alt="Logo"
            />
          </Link>

          {/* Right actions - Visible only on md+ */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <div className="relative inline-block notranslate">
              <Select value={currentLang} onValueChange={handleChange}>
                <SelectTrigger className="w-[130px] border-gray-300">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>

                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      className="notranslate"
                    >
                      <div className="flex items-center gap-1">
                        <Image
                          src={`https://flagcdn.com/w20/${lang.flag.toLowerCase()}.png`}
                          alt={lang.label}
                          width={20}
                          height={15}
                          className="inline-block"
                        />
                        <span>{lang.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {user ? (
              <div className="flex items-center space-x-1 lg:space-x-2">
                <button
                  className="flex items-center space-x-1 lg:space-x-2 text-xs lg:text-sm hover:text-blue-primary transition-colors duration-200"
                  onClick={handleUserButtonClick}
                >
                  <span>{user?.fullName?.split(" ")[0] || "User"}</span>
                  <span>▼</span>
                </button>
              </div>
            ) : (
              <PrimaryButton
                title="Sign In"
                onClick={() => setSignInOpen(true)}
                className="text-xs lg:text-sm px-2 lg:px-4 py-1 lg:py-2"
              />
            )}

            <PrimaryButton
              title="Subscribe"
              onClick={() => router.push("/subscription")}
              className="text-xs lg:text-sm px-2 lg:px-4 py-1 lg:py-2 bg-blue-primary border-blue-primary hover:bg-blue-primary/90"
            />
          </div>
        </div>

        {/* Desktop Search + Menu - Visible on lg+ */}
        <div className="hidden lg:block">
          {/* Searchbar */}
          <div className="flex justify-center py-4">
            <div className="flex gap-2 w-full max-w-lg relative items-center">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 pl-10 pr-3 py-2 rounded-none bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-primary"
              />
              <PrimaryButton
                title="Search"
                className="bg-ink-black text-white border-ink-black py-2 px-4 text-sm"
              />
            </div>
          </div>

          {/* Menu */}
          <div className="flex justify-center gap-4 xl:gap-6 py-4 flex-wrap">
            {staticRoutes.map((route) => (
              <button
                key={route.path}
                onClick={() => router.push(route.path)}
                className="text-sm font-medium hover:text-blue-primary transition-colors duration-200"
              >
                {route.name}
              </button>
            ))}

            {data?.data
              ?.slice(0, showMore ? allMenus.length : 4)
              ?.map((menu: Category) => (
                <div
                  key={menu?.id}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(menu?.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    onClick={() => router.push(`/${menu?.slug}`)}
                    className="flex items-center text-sm font-medium hover:text-blue-primary transition-colors duration-200"
                  >
                    {menu?.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {activeMenu === menu?.name &&
                    menu?.subCategories?.length > 0 && (
                      <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-50">
                        {menu?.subCategories?.map((sub) => (
                          <Link
                            key={sub?.subname}
                            href={`/${menu?.slug}/${sub?.subslug}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setActiveMenu(null)}
                          >
                            {sub?.subname}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}

            {!showMore && (
              <button
                onClick={() => setShowMore(true)}
                className="flex items-center text-sm font-medium hover:text-blue-primary transition-colors duration-200"
              >
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sidebar - Visible on md and below */}
        {isOpen && (
          <div className="md:hidden fixed left-0 right-0 top-[60px] sm:top-[68px] bottom-0 bg-bg-cream z-40 border-t border-gray-200 overflow-y-auto transition-all duration-300">
            <div className="p-4 sm:p-6">
              {/* Mobile Search */}
              <div className="mb-6">
                <div className="flex items-center relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 pl-10 pr-3 py-2 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-primary"
                  />
                  <button className="ml-2 bg-blue-primary text-white px-4 py-2 rounded-md hover:bg-blue-primary/90 transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Language Switch */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 text-gray-700">
                  Language
                </h3>
                <div className="relative  notranslate">
                  <Select value={currentLang} onValueChange={handleChange}>
                    <SelectTrigger className="w-full border-gray-300 bg-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>

                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem
                          key={lang.code}
                          value={lang.code}
                          className="notranslate"
                        >
                          <div className="flex items-center gap-1">
                            <Image
                              src={`https://flagcdn.com/w20/${lang.flag.toLowerCase()}.png`}
                              alt={lang.label}
                              width={20}
                              height={15}
                              className="inline-block"
                            />
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* User Info */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 text-gray-700">
                  Account
                </h3>
                {user ? (
                  <button
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-primary transition-colors duration-200"
                    onClick={() => {
                      handleUserButtonClick();
                      setIsOpen(false);
                    }}
                  >
                    <span>{user?.fullName?.split(" ")[0] || "User"}</span>
                    <span>▼</span>
                  </button>
                ) : (
                  <PrimaryButton
                    title="Sign In"
                    onClick={() => {
                      setSignInOpen(true);
                      setIsOpen(false);
                    }}
                    className="text-sm px-4 py-2 w-full"
                  />
                )}
              </div>

              {/* Subscribe Button */}
              <div className="mb-6">
                <PrimaryButton
                  title="Subscribe"
                  onClick={() => {
                    router.push("/subscription");
                    setIsOpen(false);
                  }}
                  className="text-sm px-4 py-2 bg-blue-primary border-blue-primary hover:bg-blue-primary/90 w-full"
                />
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                {staticRoutes.map((route) => (
                  <button
                    key={route.path}
                    onClick={() => {
                      router.push(route.path);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-3 text-sm font-medium text-gray-700 hover:text-blue-primary hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {route.name}
                  </button>
                ))}
                {data?.data
                  ?.slice(0, showMore ? allMenus.length : 7)
                  .map((menu: Category) => (
                    <div key={menu?.id}>
                      <button
                        className="flex items-center justify-between w-full text-left p-3 text-sm font-medium text-gray-700 hover:text-blue-primary hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => {
                          router.push(menu?.slug);
                          setIsOpen(false);
                        }}
                      >
                        {menu?.name}
                        {menu?.subCategories?.length > 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubmenu(menu?.name);
                            }}
                            className="ml-auto"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${openSubmenus?.includes(menu?.name)
                                  ? "rotate-180"
                                  : ""
                                }`}
                            />
                          </button>
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openSubmenus?.includes(menu?.name) &&
                        menu?.subCategories?.length > 0 && (
                          <div className="ml-4 space-y-1">
                            {menu?.subCategories?.map((sub) => (
                              <button
                                key={sub?.id}
                                onClick={() => {
                                  router.push(sub?.subslug);
                                  setIsOpen(false);
                                }}
                                className="w-full text-left p-3 text-sm text-gray-600 hover:text-blue-primary hover:bg-gray-50 rounded-md transition-colors"
                              >
                                {sub?.subname}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                {!showMore && (
                  <button
                    onClick={() => setShowMore(true)}
                    className="w-full text-left p-3 text-sm font-medium text-gray-700 hover:text-blue-primary hover:bg-gray-50 rounded-md transition-colors"
                  >
                    More
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <SignInModal
          open={signInOpen}
          onOpenChange={setSignInOpen}
          onSwitchToSignUp={openSignUp}
          onSwitchToForgot={openForgot}
          onSwitchToReset={openReset}
        />
        <SignUpModal
          open={signUpOpen}
          onOpenChange={setSignUpOpen}
          onSwitchToSignIn={() => setSignInOpen(true)}
        />
        <ResetPasswordModal open={resetOpen} onOpenChange={setResetOpen} />
        <ForgotPasswordModal open={forgotOpen} onOpenChange={setForgotOpen} />
        <VerifyOtpModal
          open={otpOpen}
          onOpenChange={setOtpOpen}
          email={otpEmail}
        />
      </CommonWrapper>

      {/* Profile Sheet */}
      <ProfileSheet isOpen={isSheetOpen} onClose={toggleProfileSheet} />
    </nav>
  );
};

export default Navbar;
