import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "SKELE Apparels // Engineered Streetwear",
  description: "Stripping back conventional style to highlight pieces that resonate with real emotions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-zinc-100 antialiased selection:bg-white selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}