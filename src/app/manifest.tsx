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
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/products/look3.jpg",
        sizes: "1920x1080",
        type: "image/jpeg",
        form_factor: "wide",
        label: "SKELE Drop 001 Editorial Lookbook",
      },
      {
        src: "/products/look1.jpg",
        sizes: "1080x1440",
        type: "image/jpeg",
        form_factor: "narrow",
        label: "SKELE Heavyweight Silhouette Preview",
      },
    ],
  };
}