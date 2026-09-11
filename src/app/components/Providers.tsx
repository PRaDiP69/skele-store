"use client";

import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}