"use client";
import { Inter, Playfair_Display, UnifrakturCook } from "next/font/google";
import ReduxProviderWrapper from "@/store/redux-provider/ReduxProviderWrapper";
import { Toaster } from "sonner";
// import type { Metadata } from "next";

import "./globals.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const unifraktur = UnifrakturCook({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-cursive",
});

// export const metadata: Metadata = {
//   title: "The Australian Canvas",
//   description: "Newspaper Website",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY as string;
    document.body.appendChild(script);
    window.googleTranslateElementInit = () => {
      new google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includeLanguages: "en,bn,hi",
          // layout:window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        "google_translate_element"
      );
    };
  }, []);
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${unifraktur.variable}`}
    >
      <body suppressHydrationWarning>
        <ReduxProviderWrapper> {children}</ReduxProviderWrapper>
        <Toaster />
        <div id="google_translate_element"></div>
      </body>
    </html>
  );
}
