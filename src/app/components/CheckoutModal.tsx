"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment / order processing
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 p-6 md:p-8 z-10 text-white shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Order Dispatched // SKELE
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto uppercase tracking-widest leading-relaxed">
                  Confirmation receipt and tracking ID sent to your email. Thank you for securing the drop.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200"
                  >
                    Return to Drops
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                    Secure Shipping
                  </span>
                  <h2 className="text-xl font-black uppercase tracking-tight mt-1">
                    Checkout Details
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Pradip Pawara"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98196 60453"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="pradip@skele.co"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                      Street Address
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Apt, Suite, Street name"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                        City
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                        PIN Code
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="400001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex justify-between items-center text-xs">
                    <span className="text-zinc-500 uppercase tracking-widest">Total Amount</span>
                    <span className="font-mono font-bold text-base text-white">₹{cartTotal.toLocaleString()}</span>
                  </div>

                  <button
                    disabled={loading || cart.length === 0}
                    type="submit"
                    className="w-full py-3 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing Order...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" /> Place Test Order
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}