"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, Flame, AlertCircle, Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useInventory, GarmentItem, SizeKey } from "../context/InventoryContext";
import ProductDetailModal from "./ProductDetailModal";

const DEFAULT_SIZES: SizeKey[] = ["S", "M", "L", "XL"];

const COLOR_CATEGORIES = [
  { label: "All Colors", value: "all" },
  { label: "Black / Charcoal", value: "black" },
  { label: "Crimson", value: "crimson" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Stone", value: "stone" },
];

export default function ProductGrid() {
  const { addToCart, openCart } = useCart();
  const { inventory } = useInventory();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState("all");

  const [selectedSizes, setSelectedSizes] = useState<Record<string, SizeKey>>({
    "prod-red-flag": "M",
    "prod-hooked": "M",
    "prod-done-playing-blue": "M",
    "prod-ulterior-motive-green": "M",
    "prod-transcend": "M",
    "prod-disaster-black": "M",
  });

  const [inspectProduct, setInspectProduct] = useState<any | null>(null);

  const handleSelectSize = (productId: string, size: SizeKey) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: GarmentItem) => {
    const chosenSize = selectedSizes[product.id] || "M";
    const available = product.sizeStock?.[chosenSize] ?? 0;
    if (available <= 0 || !product.inStock) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: chosenSize,
      image: product.image,
    });
    openCart();
  };

  const filteredProducts = useMemo(() => {
    return (inventory || []).filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.color.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesColor =
        selectedColor === "all" || item.color.toLowerCase().includes(selectedColor);

      return matchesSearch && matchesColor;
    });
  }, [inventory, searchQuery, selectedColor]);

  const isFiltering = searchQuery.trim() !== "" || selectedColor !== "all";

  return (
    <section id="drops" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
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

      <div className="mb-8 pb-6 border-b border-zinc-900 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search capsule by name, color, or cut..."
            className="w-full bg-zinc-950 border border-zinc-800 pl-9 pr-8 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {COLOR_CATEGORIES.map((cat) => {
            const isActive = selectedColor === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedColor(cat.value)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors border cursor-pointer ${
                  isActive
                    ? "border-white bg-white text-black font-bold"
                    : "border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
        <span>
          {isFiltering
            ? `Showing ${filteredProducts.length} of ${inventory.length} Garments`
            : `Showing All ${inventory.length} Garments`}
        </span>
        {isFiltering && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedColor("all");
            }}
            className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center border border-zinc-900 bg-zinc-950/40 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            No garments match the current query
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedColor("all");
            }}
            className="text-xs font-mono uppercase tracking-widest text-white underline underline-offset-4 hover:text-zinc-300 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => {
            const sizeStock = product.sizeStock || { S: 0, M: 0, L: 0, XL: 0 };
            const totalStock = Object.values(sizeStock).reduce((a, b) => a + b, 0);
            const isAllSoldOut = !product.inStock || totalStock === 0;
            const currentChosenSize = selectedSizes[product.id] || "M";
            const chosenSizeUnits = sizeStock[currentChosenSize] ?? 0;
            const isChosenSizeSoldOut = chosenSizeUnits === 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col justify-between border border-zinc-900 bg-zinc-950/40 p-4"
              >
                <div>
                  <div
                    onClick={() =>
                      setInspectProduct({
                        ...product,
                        sizes: DEFAULT_SIZES,
                        stockCount: totalStock,
                        soldOutSizes: DEFAULT_SIZES.filter((s) => (sizeStock[s] ?? 0) === 0),
                      })
                    }
                    className="aspect-[3/4] bg-zinc-900/60 border border-zinc-800/80 relative overflow-hidden flex items-center justify-center mb-4 cursor-pointer"
                  >
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
                          isAllSoldOut ? "grayscale opacity-40" : ""
                        }`}
                      />
                    ) : (
                      <span className="text-zinc-700 font-bold uppercase tracking-widest text-xs text-center">
                        [ {product.name} ]
                      </span>
                    )}

                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                      <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 border border-zinc-800 bg-black/80 text-zinc-300">
                        {isAllSoldOut ? "ARCHIVED" : product.tag}
                      </span>
                      {!isAllSoldOut && totalStock <= 6 && (
                        <span className="text-[9px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 border border-amber-500/40 bg-black/90 text-amber-400 flex items-center gap-1">
                          <AlertCircle className="w-2.5 h-2.5" />
                          Only {totalStock} Total Left
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-3 right-3 z-10 p-1.5 bg-black/70 border border-zinc-800 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div
                      onClick={() =>
                        setInspectProduct({
                          ...product,
                          sizes: DEFAULT_SIZES,
                          stockCount: totalStock,
                          soldOutSizes: DEFAULT_SIZES.filter((s) => (sizeStock[s] ?? 0) === 0),
                        })
                      }
                      className="cursor-pointer"
                    >
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

                <div className="mt-6 pt-4 border-t border-zinc-900 space-y-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {DEFAULT_SIZES.map((size) => {
                      const count = sizeStock[size] ?? 0;
                      const isOutOfStock = isAllSoldOut || count === 0;
                      const isSelected = currentChosenSize === size;

                      return (
                        <button
                          key={size}
                          disabled={isOutOfStock}
                          onClick={() => handleSelectSize(product.id, size)}
                          className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors border cursor-pointer ${
                            isOutOfStock
                              ? "border-zinc-900 text-zinc-700 cursor-not-allowed line-through"
                              : isSelected
                              ? "border-white bg-white text-black"
                              : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
                          }`}
                          title={isOutOfStock ? `${size} Sold Out` : `${size} (${count} units)`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={isAllSoldOut || isChosenSizeSoldOut}
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-2.5 text-xs font-mono tracking-widest uppercase transition-all ${
                      isAllSoldOut || isChosenSizeSoldOut
                        ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                        : "bg-white text-black hover:bg-zinc-200 cursor-pointer"
                    }`}
                  >
                    {isAllSoldOut
                      ? "Entire Capsule Sold Out"
                      : isChosenSizeSoldOut
                      ? `Size ${currentChosenSize} Sold Out`
                      : `Acquire [${currentChosenSize}] // Quick Add`}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <ProductDetailModal
        product={inspectProduct}
        isOpen={inspectProduct !== null}
        onClose={() => setInspectProduct(null)}
      />
    </section>
  );
}