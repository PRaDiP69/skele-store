"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Ruler, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export interface ProductDetailItem {
  id: string;
  name: string;
  price: number;
  displayPrice: string;
  tag: string;
  color: string;
  sizes: string[];
  image?: string;
  description?: string;
  specs?: string[];
}

interface ProductDetailModalProps {
  product: ProductDetailItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize || product.sizes[0],
      image: product.image,
    });
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 text-white z-10 overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual Area */}
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 min-h-[350px]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs uppercase">
                    [ {product.name} ]
                  </div>
                )}
                <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-zinc-800 bg-black/80 text-zinc-300">
                  {product.tag}
                </span>
              </div>

              {/* Product Spec Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        {product.color} // SKELE ARCHIVE
                      </span>
                      <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-1">
                        {product.name}
                      </h2>
                    </div>
                    <span className="text-base font-mono font-bold text-zinc-200 shrink-0">
                      {product.displayPrice}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-wider mt-4">
                    Custom tailored cut constructed with ultra-heavyweight combed cotton. Hand-finished distressed detailing with high-density archival prints.
                  </p>

                  {/* Garment Specifications */}
                  <div className="mt-6 pt-5 border-t border-zinc-900 space-y-2.5">
                    <div className="flex items-center gap-2 text-zinc-300 text-xs uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
                      <span>280+ GSM Combed French Terry Cotton</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300 text-xs uppercase tracking-wider">
                      <Ruler className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Boxy Drop-Shoulder Streetwear Silhouette</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300 text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Cold Wash Inside Out // Do Not Iron Print</span>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mt-6">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
                      Select Size
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors border ${
                            selectedSize === s
                              ? "border-white bg-white text-black"
                              : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-8 pt-4 border-t border-zinc-900">
                  <button
                    onClick={handleAdd}
                    className="w-full py-3.5 bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {addedNotice ? "Added to Bag ✓" : `Add to Bag • ${product.displayPrice}`}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}