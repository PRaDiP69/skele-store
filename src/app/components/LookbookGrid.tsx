"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LookbookItem {
  id: string;
  image: string;
  alt: string;
  span?: "full" | "half"; // Layout hint
  caption?: string;
}

// Data Array - matching the .jpg images we verified earlier
const LOOKBOOK_IMAGES: LookbookItem[] = [
  {
    id: "look1",
    image: "/products/look1.jpg", // Verified local filename
    alt: "Styled SKELE silhouette detail shot",
    span: "half",
    caption: "A01 // TEXTURE FOCUS",
  },
  {
    id: "look2",
    image: "/products/look2.jpg", // Verified local filename
    alt: "Model wearing SKELE full outfit, street setting",
    span: "half",
    caption: "A02 // URBAN SILHOUETTE",
  },
  {
    id: "look3",
    image: "/products/look3.jpg", // Verified local filename
    alt: "SKELE branding detail on garment, editorial",
    span: "full", // Wide cinematic shot
    caption: "A03 // BRAND IDENTITY",
  },
  {
    id: "look4",
    image: "/products/look4.jpg", // Verified local filename
    alt: "Behind the scenes / lifestyle photography",
    span: "half",
    caption: "A04 // CONTEXT // BTS",
  },
    {
    id: "look5", // Adding a placeholder for the final missing look
    image: "/products/red-flag.png", // Temporarily reusing product art as a placeholder
    alt: "Placeholder graphic",
    span: "half",
    caption: "A05 // FUTURE ADDITION",
  },
];

export default function LookbookGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {LOOKBOOK_IMAGES.map((look, idx) => {
        const isFullWidth = look.span === "full";
        
        return (
          <motion.div
            key={look.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            className={`group relative overflow-hidden bg-zinc-950 border border-zinc-900 ${
              isFullWidth ? "md:col-span-2 aspect-[16/9]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={look.image}
              alt={look.alt}
              fill
              unoptimized // Standardizing unoptimized loading for now
              sizes={isFullWidth ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Subtle Overlay with Caption */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">
                SKELE // LOOKBOOK 001
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-white mt-1">
                {look.caption}
              </p>
            </div>
            
            {/* ID tag (always visible) */}
            <div className="absolute top-4 left-4 z-10 text-[9px] font-mono uppercase tracking-widest text-zinc-600 px-2 py-0.5 border border-zinc-900 bg-black/70">
              {look.id.toUpperCase()}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}