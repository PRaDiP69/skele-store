import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://skele-store-tau.vercel.app"),
  title: "SKELE // UNFRAMED VOL. 1",
  description:
    "Stripping back conventional style to highlight pieces that resonate with low-profile noise and heavy presence.",
  keywords: ["SKELE", "Streetwear", "Brutalist Fashion", "Oversized Tees", "Drop 001"],
  openGraph: {
    title: "SKELE // Drop 001 Archive",
    description:
      "Limited run apparel. Handcrafted silhouettes, raw textures, and understated graphics.",
    url: "https://skele-store-tau.vercel.app",
    siteName: "SKELE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SKELE Editorial - Drop 001",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SKELE // Drop 001",
    description:
      "Stripping back conventional style to highlight pieces that resonate with low-profile noise.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-white selection:text-black`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}