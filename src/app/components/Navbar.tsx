"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Total quantity of items in the cart
  const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/80 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-black text-xl tracking-tighter text-white group-hover:text-zinc-300 transition-colors uppercase">
            SKELE
          </span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            // ARCHIVE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          <Link href="#drops" className="hover:text-white transition-colors">
            Drops
          </Link>
          <Link href="#philosophy" className="hover:text-white transition-colors">
            Philosophy
          </Link>
          <Link href="https://instagram.com/skele.co" target="_blank" className="hover:text-white transition-colors">
            Lookbook
          </Link>
        </nav>

        {/* Actions (Cart & Mobile Menu Trigger) */}
        <div className="flex items-center gap-5">
          <button
            onClick={openCart}
            aria-label="Shopping Bag"
            className="relative p-2 text-zinc-300 hover:text-white transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-6 space-y-4">
          <Link
            href="#drops"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white"
          >
            Drops
          </Link>
          <Link
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white"
          >
            Philosophy
          </Link>
          <Link
            href="https://instagram.com/skele.co"
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white"
          >
            Lookbook
          </Link>
        </div>
      )}
    </header>
  );
}