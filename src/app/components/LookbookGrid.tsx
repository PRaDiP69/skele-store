"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LookbookItem {
  id: string;
  image: string;
  alt: string;
  span?: "full" | "half";
  caption?: string;
}

const LOOKBOOK_IMAGES: LookbookItem[] = [
  {
    id: "look1",
    image: "/products/look1.jpg",
    alt: "Styled SKELE silhouette detail shot",
    span: "half",
    caption: "A01 // TEXTURE FOCUS",
  },
  {
    id: "look2",
    image: "/products/look2.jpg",
    alt: "Model wearing SKELE full outfit, street setting",
    span: "half",
    caption: "A02 // URBAN SILHOUETTE",
  },
  {
    id: "look3",
    image: "/products/look3.jpg",
    alt: "SKELE branding detail on garment, editorial",
    span: "full",
    caption: "A03 // BRAND IDENTITY",
  },
  {
    id: "look4",
    image: "/products/look4.jpg",
    alt: "Behind the scenes / lifestyle photography",
    span: "half",
    caption: "A04 // CONTEXT // BTS",
  },
  {
    id: "look5",
    image: "/products/red-flag.png",
    alt: "Signature Graphic Construction",
    span: "half",
    caption: "A05 // GRAPHIC CONSTRUCTION",
  },
];

export default function LookbookGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {LOOKBOOK_IMAGES.map((look, idx) => {
        const isFullWidth = look.span === "full";

        return (
          <motion.div
            key={look.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className={`group relative overflow-hidden bg-zinc-950 border border-zinc-900 ${
              isFullWidth ? "md:col-span-2 aspect-[16/9]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={look.image}
              alt={look.alt}
              fill
              unoptimized
              sizes={isFullWidth ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hover Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                SKELE // LOOKBOOK 001
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-white mt-1">
                {look.caption}
              </p>
            </div>

            {/* Permanent Tag Badge */}
            <div className="absolute top-4 left-4 z-10 text-[9px] font-mono uppercase tracking-widest text-zinc-400 px-2 py-0.5 border border-zinc-800 bg-black/80 backdrop-blur-xs">
              {look.id.toUpperCase()}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}