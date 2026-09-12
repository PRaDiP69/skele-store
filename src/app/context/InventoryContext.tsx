"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SizeKey = "S" | "M" | "L" | "XL";

export interface GarmentItem {
  id: string;
  name: string;
  price: number;
  displayPrice: string;
  tag: string;
  color: string;
  image: string;
  inStock: boolean;
  sizeStock: Record<SizeKey, number>;
}

export const INITIAL_INVENTORY: GarmentItem[] = [
  {
    id: "prod-red-flag",
    name: "Red Flag",
    price: 2499,
    displayPrice: "₹2,499",
    tag: "Signature",
    color: "Blood Crimson",
    image: "/products/red-flag.png",
    inStock: true,
    sizeStock: { S: 2, M: 3, L: 2, XL: 1 },
  },
  {
    id: "prod-hooked",
    name: "Hooked",
    price: 2699,
    displayPrice: "₹2,699",
    tag: "Heavyweight",
    color: "Onyx Black",
    image: "/products/Hooked.png",
    inStock: true,
    sizeStock: { S: 1, M: 2, L: 2, XL: 0 },
  },
  {
    id: "prod-done-playing-blue",
    name: "Done Playing",
    price: 2799,
    displayPrice: "₹2,799",
    tag: "Washed Cut",
    color: "Cobalt Blue",
    image: "/products/done-playing-blue.png",
    inStock: true,
    sizeStock: { S: 3, M: 4, L: 3, XL: 2 },
  },
  {
    id: "prod-ulterior-motive-green",
    name: "Ulterior Motive",
    price: 2899,
    displayPrice: "₹2,899",
    tag: "Limited",
    color: "Forest Green",
    image: "/products/Ulterior-motive-green.png",
    inStock: true,
    sizeStock: { S: 1, M: 1, L: 1, XL: 1 },
  },
  {
    id: "prod-transcend",
    name: "Transcend",
    price: 3199,
    displayPrice: "₹3,199",
    tag: "Raw Hem",
    color: "Acid Stone",
    image: "/products/transcend.png",
    inStock: true,
    sizeStock: { S: 1, M: 1, L: 1, XL: 0 },
  },
  {
    id: "prod-disaster-black",
    name: "Disaster",
    price: 2999,
    displayPrice: "₹2,999",
    tag: "Boxy Fit",
    color: "Washed Black",
    image: "/products/disaster-black.png",
    inStock: false,
    sizeStock: { S: 0, M: 0, L: 0, XL: 0 },
  },
];

interface InventoryContextType {
  inventory: GarmentItem[];
  updateSizeStock: (id: string, size: SizeKey, delta: number) => void;
  toggleStockStatus: (id: string) => void;
  resetInventory: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [inventory, setInventory] = useState<GarmentItem[]>(INITIAL_INVENTORY);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("skele_size_inventory");
      if (saved) {
        setInventory(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveInventory = (data: GarmentItem[]) => {
    setInventory(data);
    try {
      localStorage.setItem("skele_size_inventory", JSON.stringify(data));
    } catch {}
  };

  const updateSizeStock = (id: string, size: SizeKey, delta: number) => {
    const updated = inventory.map((item) => {
      if (item.id !== id) return item;
      const current = item.sizeStock[size] ?? 0;
      const nextCount = Math.max(0, current + delta);
      const nextSizeStock = { ...item.sizeStock, [size]: nextCount };
      const totalUnits = Object.values(nextSizeStock).reduce((a, b) => a + b, 0);

      return {
        ...item,
        sizeStock: nextSizeStock,
        inStock: totalUnits > 0,
      };
    });
    saveInventory(updated);
  };

  const toggleStockStatus = (id: string) => {
    const updated = inventory.map((item) => {
      if (item.id !== id) return item;
      const willBeActive = !item.inStock;
      const nextSizeStock = willBeActive
        ? { S: 2, M: 2, L: 2, XL: 2 }
        : { S: 0, M: 0, L: 0, XL: 0 };

      return {
        ...item,
        inStock: willBeActive,
        sizeStock: nextSizeStock,
      };
    });
    saveInventory(updated);
  };

  const resetInventory = () => {
    saveInventory(INITIAL_INVENTORY);
  };

  return (
    <InventoryContext.Provider
      value={{ inventory, updateSizeStock, toggleStockStatus, resetInventory }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error("useInventory must be used within an InventoryProvider");
  return context;
}
