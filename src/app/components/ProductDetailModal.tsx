"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Sparkles } from "lucide-react";
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
  image: string;
  inStock?: boolean;
  soldOutSizes?: string[];
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

  const isEntirelySoldOut = product.inStock === false;
  const isSizeSoldOut = (size: string) => product.soldOutSizes?.includes(size) ?? false;
  const isCurrentSelectionUnavailable = isEntirelySoldOut || isSizeSoldOut(selectedSize);

  const handleAdd = () => {
    if (isCurrentSelectionUnavailable) return;

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
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
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
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-600">
                    NO PREVIEW AVAILABLE
                  </div>
                )}
              </div>

              {/* Product Details Area */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border border-zinc-800 text-zinc-400">
                      {product.tag}
                    </span>
                    <span className="text-[10px] uppercase font-medium tracking-widest text-zinc-500">
                      {product.color}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
                    {product.name}
                  </h2>

                  <p className="text-lg font-mono font-bold text-zinc-200 mt-2">
                    ₹{product.price.toLocaleString()}
                  </p>

                  {/* Size Selection */}
                  <div className="mt-6">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
                      Select Size
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((s) => {
                        const unavailable = isEntirelySoldOut || isSizeSoldOut(s);
                        return (
                          <button
                            key={s}
                            disabled={unavailable}
                            onClick={() => setSelectedSize(s)}
                            className={`px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors border ${
                              unavailable
                                ? "border-zinc-800 text-zinc-600 bg-zinc-900/40 cursor-not-allowed line-through"
                                : selectedSize === s
                                ? "border-white bg-white text-black cursor-pointer"
                                : "border-zinc-800 text-zinc-400 hover:border-zinc-600 cursor-pointer"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Trust Details */}
                  <div className="mt-6 space-y-2 border-t border-zinc-900 pt-4 text-[11px] text-zinc-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                      <span>100% Heavyweight French Terry Cotton</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Screenprinted in Limited Batches</span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart / Sold Out Button */}
                <div className="mt-8 pt-4 border-t border-zinc-900">
                  <button
                    onClick={handleAdd}
                    disabled={isCurrentSelectionUnavailable}
                    className={`w-full py-3.5 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
                      isCurrentSelectionUnavailable
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : "bg-white hover:bg-zinc-200 text-black cursor-pointer"
                    }`}
                  >
                    {isCurrentSelectionUnavailable
                      ? "Sold Out"
                      : addedNotice
                      ? "Added to Bag ✓"
                      : `Add to Bag • ₹${product.price.toLocaleString()}`}
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