import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./components/Providers";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skele-store.vercel.app"),
  title: {
    default: "SKELE APPARELS | Drop 001 Capsule",
    template: "%s | SKELE APPARELS",
  },
  description:
    "Heavyweight 280+ GSM luxury streetwear engineered with boxy silhouettes and raw aesthetics. Limited capsule run operated by SKELE Apparels LLP, Mumbai.",
  keywords: [
    "SKELE",
    "SKELE Apparels",
    "streetwear India",
    "heavyweight t-shirt",
    "luxury streetwear Mumbai",
    "oversized tees",
    "drop 001 capsule",
  ],
  authors: [{ name: "SKELE Apparels LLP" }],
  creator: "SKELE Apparels LLP",
  publisher: "SKELE Apparels LLP",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SKELE APPARELS | Drop 001 Capsule",
    description:
      "Heavyweight 280+ GSM luxury streetwear. Limited batch releases with direct concierge fulfillment.",
    url: "https://skele-store.vercel.app",
    siteName: "SKELE Apparels",
    images: [
      {
        url: "/products/Hooked.png",
        width: 1200,
        height: 630,
        alt: "SKELE Apparels Capsule 001",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKELE APPARELS | Drop 001 Capsule",
    description:
      "Heavyweight 280+ GSM streetwear engineered for structured silhouettes. Direct order dispatch.",
    images: ["/products/Hooked.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black text-white selection:bg-white selection:text-black">
      <body className="min-h-screen bg-black text-white antialiased flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}