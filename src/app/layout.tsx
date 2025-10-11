"use client";

import { Inter, Playfair_Display, UnifrakturCook } from "next/font/google";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

import { persistor, store } from "@/store/store";
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY as string;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includeLanguages: "en,bn,hi",
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
        {/* ✅ Redux Provider should wrap PersistGate */}
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>

        <Toaster richColors/>
        {/* <div id="google_translate_element"></div> */}
      </body>
    </html>
  );
}
