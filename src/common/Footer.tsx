import Link from "next/link";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import CommonWrapper from "@/common/CommonWrapper";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "News",
    links: [
      { label: "Home Page", href: "/" },
      { label: "Business", href: "/business" },
      { label: "Technology", href: "/technology" },
      { label: "Cultural", href: "/cultural" },
      { label: "Entertainment", href: "/entertainment" },
      { label: "Sports", href: "/sports" },
    ],
  },
  {
    title: "Lifestyle",
    links: [
      { label: "Health", href: "/health" },
      { label: "Movies", href: "/movies" },
      { label: "Travel", href: "/travel" },
      { label: "City", href: "/city" },
      { label: "Food", href: "/food" },
    ],
  },
  {
    title: "Opinion",
    links: [
      { label: "Columnists", href: "/columnists" },
      { label: "Guest Essays", href: "/essays" },
      { label: "Climate", href: "/climate" },
      { label: "Business", href: "/opinion-business" },
      { label: "Tech", href: "/opinion-tech" },
      { label: "World", href: "/world" },
    ],
  },
  {
    title: "Overview",
    links: [
      { label: "Manage account", href: "/account-settings" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Write an article", href: "/write" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#1D1D1F] text-white  py-10">
      <CommonWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {/* Logo + Newsletter (larger column) */}
          <div className="sm:col-span-2">
            <img src="/TAC2.png" className="h-5 sm:h-8 mb-4" alt="" />
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Write your email here"
                className="px-4 py-2 max-w-sm text-black focus:outline-none border border-gray-300 bg-bg-cream text-xs md:text-sm"
              />
              <PrimaryButton
                title="Subscribe"
                className="w-fit border-brick-red md:text-base"
              />
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3 text-gray-300">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-xs">Copyright © 2025 Matador Solutions, LLC</p>
        </div>
      </CommonWrapper>
    </footer>
  );
};

export default Footer;
