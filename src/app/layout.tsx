import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "SKELE APPARELS | Drop 001",
  description:
    "Limited-run luxury streetwear engineered with heavyweight cuts and washed aesthetics. Designed by SKELE Apparels LLP.",
  metadataBase: new URL("https://skele-store.vercel.app"),
  openGraph: {
    title: "SKELE APPARELS | Drop 001",
    description:
      "Limited-run luxury streetwear engineered with heavyweight cuts and washed aesthetics.",
    url: "https://skele-store.vercel.app",
    siteName: "SKELE Apparels",
    images: [
      {
        url: "/products/Hooked.png",
        width: 1200,
        height: 630,
        alt: "SKELE Apparels - Curated Streetwear",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKELE APPARELS | Drop 001",
    description:
      "Curated luxury streetwear drops. Direct dispatch via concierge.",
    images: ["/products/Hooked.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}