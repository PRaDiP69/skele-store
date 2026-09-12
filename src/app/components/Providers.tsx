"use client";

import { CartProvider } from "../context/CartContext";
import { InventoryProvider } from "../context/InventoryContext";
import CartDrawer from "./CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <InventoryProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </InventoryProvider>
  );
}
