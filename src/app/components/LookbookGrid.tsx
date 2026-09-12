"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductDetailModal, { ProductDetailItem } from "./ProductDetailModal";

interface LookbookItem {
  id: string;
  image: string;
  alt: string;
  span?: "full" | "half";
  caption?: string;
  associatedProduct?: ProductDetailItem;
}

const LOOKBOOK_IMAGES: LookbookItem[] = [
  {
    id: "look1",
    image: "/products/look1.jpg",
    alt: "Styled SKELE silhouette detail shot",
    span: "half",
    caption: "A01 // HOOKED SILHOUETTE",
    associatedProduct: {
      id: "hooked-tee",
      name: "Hooked Heavyweight Tee",
      price: 2499,
      displayPrice: "₹2,499",
      tag: "Drop 001",
      color: "Washed Black",
      sizes: ["S", "M", "L", "XL"],
      image: "/products/Hooked.png",
      inStock: true,
    },
  },
  {
    id: "look2",
    image: "/products/look2.jpg",
    alt: "Model wearing SKELE full outfit, street setting",
    span: "half",
    caption: "A02 // URBAN SILHOUETTE",
    associatedProduct: {
      id: "red-flag-tee",
      name: "Red Flag Heavyweight Tee",
      price: 2499,
      displayPrice: "₹2,499",
      tag: "Drop 001",
      color: "Vintage Charcoal",
      sizes: ["S", "M", "L", "XL"],
      image: "/products/red-flag.png",
      inStock: true,
    },
  },
  {
    id: "look3",
    image: "/products/look3.jpg",
    alt: "SKELE branding detail on garment, editorial",
    span: "full",
    caption: "A03 // CAPSULE ARCHIVE // 280+ GSM",
    associatedProduct: {
      id: "hooked-tee",
      name: "Hooked Heavyweight Tee",
      price: 2499,
      displayPrice: "₹2,499",
      tag: "Drop 001",
      color: "Washed Black",
      sizes: ["S", "M", "L", "XL"],
      image: "/products/Hooked.png",
      inStock: true,
    },
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
    associatedProduct: {
      id: "red-flag-tee",
      name: "Red Flag Heavyweight Tee",
      price: 2499,
      displayPrice: "₹2,499",
      tag: "Drop 001",
      color: "Vintage Charcoal",
      sizes: ["S", "M", "L", "XL"],
      image: "/products/red-flag.png",
      inStock: true,
    },
  },
];

export default function LookbookGrid() {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetailItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {LOOKBOOK_IMAGES.map((look, idx) => {
          const isFullWidth = look.span === "full";
          const hasProduct = Boolean(look.associatedProduct);

          return (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => {
                if (look.associatedProduct) {
                  setSelectedProduct(look.associatedProduct);
                }
              }}
              className={`group relative overflow-hidden bg-zinc-950 border border-zinc-900 ${
                isFullWidth ? "md:col-span-2 aspect-[16/9]" : "aspect-[3/4]"
              } ${hasProduct ? "cursor-pointer" : ""}`}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      SKELE // LOOKBOOK 001
                    </span>
                    <p className="text-xs font-bold uppercase tracking-wider text-white mt-1">
                      {look.caption}
                    </p>
                  </div>
                  {hasProduct && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 border border-white text-black bg-white">
                      Inspect <ArrowUpRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              {/* Permanent Tag Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 px-2 py-0.5 border border-zinc-800 bg-black/80 backdrop-blur-xs">
                  {look.id.toUpperCase()}
                </span>
                {hasProduct && (
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white px-2 py-0.5 border border-zinc-700 bg-zinc-900/90 backdrop-blur-xs">
                    Garment Linked
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}