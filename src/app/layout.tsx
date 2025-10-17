"use client";

import { Inter, Playfair_Display, UnifrakturCook } from "next/font/google";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

import { persistor, store } from "@/store/store";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const hideGoogleBar = () => {
      const frame = document.querySelector(
        "iframe.skiptranslate"
      ) as HTMLIFrameElement;
      if (frame) frame.style.display = "none";
      document.body.style.top = "0px";
    };

    // Observe DOM changes and hide again if it reappears
    const observer = new MutationObserver(hideGoogleBar);
    observer.observe(document.body, { childList: true, subtree: true });

    hideGoogleBar();
    return () => observer.disconnect();
  }, []);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${unifraktur.variable}`}
    >
      <body suppressHydrationWarning>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}> {children}
            </PersistGate>
          </Provider>
        </GoogleOAuthProvider>

        <Toaster richColors />
        {/* Hidden element for Google Translate */}
        <div id="google_translate_element" style={{ display: "none" }}></div>
      </body>
    </html>
  );
}
