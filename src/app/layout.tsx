import { Inter, Playfair_Display, UnifrakturCook } from "next/font/google";
import ReduxProviderWrapper from "@/store/redux-provider/ReduxProviderWrapper";
import { Toaster } from "sonner";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${unifraktur.variable}`}
    >
      <body suppressHydrationWarning>
        <ReduxProviderWrapper>{children}</ReduxProviderWrapper>
        <Toaster />
      </body>
    </html>
  );
}


