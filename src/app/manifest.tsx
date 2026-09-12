import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "SKELE APPARELS",
    short_name: "SKELE",
    description:
      "Limited-run luxury streetwear engineered with heavyweight cuts and raw aesthetics.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait",
    icons: [
      {
        src: "/products/Hooked.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/products/Hooked.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}