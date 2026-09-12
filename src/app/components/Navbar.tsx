"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { openCart, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-widest uppercase text-white">
          SKELE
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase font-mono tracking-widest text-zinc-400">
          <Link href="/#drops" className="hover:text-white transition-colors">
            Drop 001
          </Link>
          <Link href="/lookbook" className="hover:text-white transition-colors">
            Lookbook
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:border-zinc-600 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="bg-white text-black px-1.5 py-0.2 text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 md:hidden text-zinc-400 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-black px-6 py-6 space-y-4 text-xs font-mono uppercase tracking-widest">
          <Link
            href="/#drops"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white"
          >
            Drop 001 Capsule
          </Link>
          <Link
            href="/lookbook"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-300 hover:text-white"
          >
            Lookbook
          </Link>
        </div>
      )}
    </header>
  );
}
