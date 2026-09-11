"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" onClick={closeMenu} className="text-lg font-black tracking-widest uppercase text-white">
            SKELE
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Cart Trigger */}
        <button
  onClick={() => {
    console.log("Cart button clicked!");
    openCart();
  }}
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-zinc-900 px-6 py-6 flex flex-col gap-5 text-sm font-bold uppercase tracking-widest text-zinc-300">
          <Link href="/#drops" onClick={closeMenu} className="hover:text-white transition-colors">
            Drops
          </Link>
          <Link href="/#philosophy" onClick={closeMenu} className="hover:text-white transition-colors">
            Philosophy
          </Link>
          <Link href="/lookbook" onClick={closeMenu} className="hover:text-white transition-colors">
            Lookbook
          </Link>
        </div>
      )}
    </header>
  );
}