"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart, openCart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-black tracking-widest uppercase text-white">
          SKELE
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          <Link href="/#drops" className="hover:text-white transition-colors">
            Drops
          </Link>
          <Link href="/#philosophy" className="hover:text-white transition-colors">
            Philosophy
          </Link>
          <Link href="/lookbook" className="hover:text-white transition-colors">
            Lookbook
          </Link>
        </nav>

        <button
          onClick={openCart}
          className="relative p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}