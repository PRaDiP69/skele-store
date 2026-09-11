"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, cartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    closeCart();
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-999 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Drawer */}
            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-[1000]">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md h-full bg-zinc-950 border-l border-zinc-800 flex flex-col pointer-events-auto"
              >
                {/* Header */}
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Your Bag</h2>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">SKELE Apparels LLP</span>
                  </div>
                  <button onClick={closeCart} className="p-1 text-zinc-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 divide-y divide-zinc-900 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                      <p className="text-xs uppercase tracking-widest text-zinc-500">Your bag is empty</p>
                      <button
                        onClick={closeCart}
                        className="text-xs uppercase tracking-widest text-white border-b border-white pb-1"
                      >
                        Explore Latest Drop
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="pt-4 first:pt-0 flex items-center gap-4">
                        <div className="relative w-16 h-20 bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover object-center"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-600 uppercase font-mono">
                              SKELE
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-white truncate">
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1">
                            Size: {item.size} // Qty: {item.quantity}
                          </p>
                          <p className="text-xs text-zinc-300 mt-2 font-mono">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 space-y-4">
                    <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                      <span className="text-zinc-400">Estimated Total</span>
                      <span className="text-white font-mono font-bold text-sm">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      Free express delivery across India
                    </p>
                    <button
                      onClick={handleOpenCheckout}
                      className="w-full py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}