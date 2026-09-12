"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, Flame, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductDetailModal, { ProductDetailItem } from "./ProductDetailModal";

interface ExtendedProductDetailItem extends ProductDetailItem {
  stockCount?: number;
}

const PRODUCTS: ExtendedProductDetailItem[] = [
  {
    id: "prod-red-flag",
    name: "Red Flag",
    price: 2499,
    displayPrice: "₹2,499",
    tag: "Signature",
    color: "Blood Crimson",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/red-flag.png",
    inStock: true,
    stockCount: 8,
  },
  {
    id: "prod-hooked",
    name: "Hooked",
    price: 2699,
    displayPrice: "₹2,699",
    tag: "Heavyweight",
    color: "Onyx Black",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/Hooked.png",
    inStock: true,
    stockCount: 5,
  },
  {
    id: "prod-done-playing-blue",
    name: "Done Playing",
    price: 2799,
    displayPrice: "₹2,799",
    tag: "Washed Cut",
    color: "Cobalt Blue",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/done-playing-blue.png",
    inStock: true,
    stockCount: 12,
  },
  {
    id: "prod-ulterior-motive-green",
    name: "Ulterior Motive",
    price: 2899,
    displayPrice: "₹2,899",
    tag: "Limited",
    color: "Forest Green",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/Ulterior-motive-green.png",
    inStock: true,
    stockCount: 4,
  },
  {
    id: "prod-transcend",
    name: "Transcend",
    price: 3199,
    displayPrice: "₹3,199",
    tag: "Raw Hem",
    color: "Acid Stone",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/transcend.png",
    soldOutSizes: ["XL"],
    inStock: true,
    stockCount: 3,
  },
  {
    id: "prod-disaster-black",
    name: "Disaster",
    price: 2999,
    displayPrice: "₹2,999",
    tag: "Boxy Fit",
    color: "Washed Black",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/disaster-black.png",
    inStock: false,
    stockCount: 0,
  },
];

export default function ProductGrid() {
  const { addToCart, openCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "prod-red-flag": "M",
    "prod-hooked": "M",
    "prod-done-playing-blue": "M",
    "prod-ulterior-motive-green": "M",
    "prod-transcend": "M",
    "prod-disaster-black": "M",
  });

  const [inspectProduct, setInspectProduct] = useState<ProductDetailItem | null>(null);

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: ExtendedProductDetailItem) => {
    if (product.inStock === false) return;
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: chosenSize,
      image: product.image,
    });
    openCart();
  };

  return (
    <section id="drops" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900">
      {/* Drop Header & Status Ticker */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-emerald-400">
              Drop 001 Active // Limited Batch
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            Featured Drop
          </h2>
        </div>

        <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-950/80 px-4 py-2 text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>280+ GSM Custom Milled</span>
          </div>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-500 uppercase tracking-widest">No Restocks</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product, idx) => {
          const isSoldOut = product.inStock === false;
          const isLowStock = !isSoldOut && typeof product.stockCount === "number" && product.stockCount <= 5;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group flex flex-col justify-between border border-zinc-900 bg-zinc-950/40 p-4"
            >
              <div>
                {/* Image Container */}
                <div
                  onClick={() => setInspectProduct(product)}
                  className="aspect-[3/4] bg-zinc-900/60 border border-zinc-800/80 relative overflow-hidden flex items-center justify-center mb-4 cursor-pointer"
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
                        isSoldOut ? "grayscale opacity-40" : ""
                      }`}
                    />
                  ) : (
                    <span className="text-zinc-700 font-bold uppercase tracking-widest text-xs text-center">
                      [ {product.name} ]
                    </span>
                  )}

                  {/* Primary Status Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 border border-zinc-800 bg-black/80 text-zinc-300">
                      {isSoldOut ? "ARCHIVED" : product.tag}
                    </span>
                    {isLowStock && (
                      <span className="text-[9px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 border border-amber-500/40 bg-black/90 text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5" />
                        Only {product.stockCount} Left
                      </span>
                    )}
                  </div>

                  {/* Expand Icon */}
                  <span className="absolute bottom-3 right-3 z-10 p-1.5 bg-black/70 border border-zinc-800 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Info */}
                <div className="flex justify-between items-start">
                  <div onClick={() => setInspectProduct(product)} className="cursor-pointer">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-zinc-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest mt-0.5">
                      {product.color}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-200">
                    {product.displayPrice}
                  </span>
                </div>
              </div>

              {/* Sizes & Action Button */}
              <div className="mt-6 pt-4 border-t border-zinc-900 space-y-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSizes[product.id] === size;
                    const isSizeUnavailable =
                      isSoldOut || (product.soldOutSizes?.includes(size) ?? false);

                    return (
                      <button
                        key={size}
                        disabled={isSizeUnavailable}
                        onClick={() => handleSelectSize(product.id, size)}
                        className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors border ${
                          isSizeUnavailable
                            ? "border-zinc-900 text-zinc-700 cursor-not-allowed line-through"
                            : isSelected
                            ? "border-white bg-white text-black cursor-pointer"
                            : "border-zinc-800 text-zinc-400 hover:border-zinc-600 cursor-pointer"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={isSoldOut}
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-2.5 text-xs font-mono tracking-widest uppercase transition-all ${
                    isSoldOut
                      ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                      : "bg-white text-black hover:bg-zinc-200 cursor-pointer"
                  }`}
                >
                  {isSoldOut ? "Sold Out" : "Acquire // Quick Add"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={inspectProduct}
        isOpen={inspectProduct !== null}
        onClose={() => setInspectProduct(null)}
      />
    </section>
  );
}