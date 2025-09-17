"use client";

import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import React, { useState } from "react";

import ForgotPasswordModal from "@/components/auth/ForgotPassword";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";
import { allMenus } from "@/utils/demoData";

import VerifyOtpModal from "@/components/auth/VerifyOtpModal";
import ProfileSheet from "@/components/profile/ProfileSheet";
import { useAppSelector } from "@/store/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
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
  // Toggle ProfileSheet visibility
  const toggleProfileSheet = () => setIsSheetOpen((prev) => !prev);

  // Access user from Redux store

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
  // Get today's date
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Languages
  const languages = [
    {
      code: "AU",
      label: "English(AUS)",
      flag: "https://flagcdn.com/w20/au.png",
    },
    { code: "US", label: "English", flag: "https://flagcdn.com/w20/us.png" },
    { code: "UK", label: "English", flag: "https://flagcdn.com/w20/gb.png" },
  ];

  const [selectedLang, setSelectedLang] = useState(languages[0].code);

  return (
    <nav className="w-full bg-bg-cream z-50 text-ink-black border-b border-slight-border">
      <CommonWrapper>
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 md:py-4 lg:py-3">
          {/* Date - Hidden on small screens */}
          <div className="hidden lg:block text-xs lg:text-sm text-gray-600 flex-shrink-0">
            {today}
          </div>

          {/* Mobile hamburger - Left side on mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 focus:outline-none order-1 md:order-none  mr-2"
          >
            {isOpen ? (
              <X className="h-4 w-4 md:h-6 md:w-6" />
            ) : (
              <Menu className="h-4 w-4 md:h-6 md:w-6" />
            )}
          </button>

          {/* Logo/Title - Centered on mobile, normal on desktop */}
          <Link
            href="/"
            className="  flex-1 md:flex-none order-2 md:order-none cursor-pointer"
          >
            <img
              src="/TAC1.png"
              className="h-4 sm:h-6 md:h-8 lg:h-10 xl:h-12"
              alt=""
            />
          </Link>

          {/* Right actions */}
          <div className="flex items-center space-x-2 md:space-x-3 order-3 md:order-none flex-shrink-0">
            {/* Language Switch - Hidden on mobile, visible on medium+ */}
            <div className="relative hidden md:block">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="appearance-none border-none bg-transparent text-sm cursor-pointer pl-6 pr-2 py-2 outline-none"
                style={{
                  backgroundImage: `url(${languages.find((l) => l.code === selectedLang)?.flag
                    })`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "20px 14px",
                  backgroundPosition: "left center",
                }}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional rendering: Show user name or Sign In button */}
            {user ? (
              <div className="flex items-center space-x-2 md:space-x-3">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleProfileSheet}
                >
                  <span className="text-xs md:text-sm">
                    {user?.fullName?.split(" ")[0] || "User"}
                  </span>
                  <span className="text-sm">▼</span>
                </div>
              </div>
            ) : (
              <PrimaryButton
                title="Sign In"
                onClick={() => setSignInOpen(true)}
                className="text-xs md:text-sm px-2 md:px-4 py-1 md:py-2"
              />
            )}

            <PrimaryButton
              title="Subscribe"
              onClick={() => router.push("/subscription")}
              className="text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 bg-blue-primary border-blue-primary hover:bg-blue-primary/90"
            />
          </div>
        </div>

        {/* Search + menu (desktop only) */}
        <div className="hidden lg:block">
          {/* Searchbar */}
          <div className="flex items-center justify-center py-4">
            <div className="flex gap-3 w-full max-w-xl relative items-center">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 pl-10 pr-3 py-2 outline-none bg-white border border-gray-200 text-sm"
              />
              <PrimaryButton
                title="Search"
                className="bg-ink-black text-white border-ink-black h-auto py-2"
              />
            </div>
          </div>

          {/* Menu */}
          <div className="flex justify-center gap-4 xl:gap-6 py-6 flex-wrap">
            {allMenus.slice(0, showMore ? allMenus.length : 7).map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(menu.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  onClick={() => router.push(menu.href)}
                  className="flex items-center text-sm hover:text-brick-red transition-colors duration-200 cursor-pointer"
                >
                  {menu.label}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeMenu === menu.label && menu.submenus?.length > 0 && (
                  <div className="absolute top-full left-0 bg-white shadow-md py-2 min-w-max z-50">
                    {menu.submenus.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setActiveMenu(null)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!showMore && (
              <button
                onClick={() => setShowMore(true)}
                className="flex items-center text-sm hover:text-brick-red transition-colors duration-200 cursor-pointer"
              >
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile & Medium menu overlay */}
        {isOpen && (
          <div className="lg:hidden sticky left-0 right-0 inset-0 top-[80px] z-40 border-t border-gray-200 overflow-y-auto">
            <div className="p-4">
              {/* Mobile Search */}
              <div className="mb-6">
                <div className="flex items-center relative">
                  <span className="absolute left-3 text-gray-500">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 pl-10 pr-3 py-2 border border-gray-300 outline-none focus:border-brick-red transition-colors"
                  />
                  <button className="ml-3 bg-brick-red text-white px-4 py-3 hover:bg-[#7c2d22] transition-colors h-auto">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Language Switch (Mobile only) */}
              <div className="mb-6 md:hidden">
                <h3 className="text-sm font-semibold mb-3 text-gray-700">
                  Language
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code)}
                      className={`flex items-center space-x-2 p-2 border rounded transition-colors ${selectedLang === lang.code
                        ? "bg-brick-red text-white border-brick-red"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                    >
                      <img
                        src={lang.flag}
                        alt={lang.label}
                        className="w-4 h-3"
                      />
                      <span className="text-xs">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu items */}
              <div className="space-y-1">
                {allMenus
                  .slice(0, showMore ? allMenus.length : 7)
                  .map((menu) => (
                    <div key={menu.label}>
                      <button
                        className="flex items-center justify-between w-full text-left p-3 text-sm font-medium text-gray-700 hover:text-brick-red hover:bg-gray-50 transition-colors rounded"
                        onClick={() => {
                          router.push(menu.href);
                          setIsOpen(false);
                        }}
                      >
                        {menu.label}
                        {menu.submenus?.length > 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubmenu(menu.label);
                            }}
                            className="ml-auto"
                          >
                            <ChevronDown
                              className={`h-4 w-4 ${openSubmenus.includes(menu.label)
                                ? "rotate-180"
                                : ""
                                }`}
                            />
                          </button>
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openSubmenus.includes(menu.label) &&
                        menu.submenus?.length > 0 && (
                          <div className="ml-4 space-y-1">
                            {menu.submenus.map((sub) => (
                              <button
                                key={sub.label}
                                onClick={() => {
                                  router.push(sub.href);
                                  setIsOpen(false);
                                }}
                                className="w-full text-left p-3 text-sm text-gray-600 hover:text-brick-red hover:bg-gray-50 rounded"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                {!showMore && (
                  <button
                    onClick={() => setShowMore(true)}
                    className="flex items-center justify-between w-full text-left p-3 text-sm font-medium text-gray-700 hover:text-brick-red hover:bg-gray-50 transition-colors rounded"
                  >
                    More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modals with communication functions */}
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
