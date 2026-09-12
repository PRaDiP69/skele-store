"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  
  const [step, setStep] = useState<"bag" | "details" | "success">("bag");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerCity, setCustomerCity] = useState("");

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const itemsList = cart
      .map((i) => `- ${i.name} (Size: ${i.size}) x${i.quantity} @ ₹${i.price * i.quantity}`)
      .join("%0A");

    const text = 
      `*ORDER DISPATCH // SKELE APPARELS*%0A%0A` +
      `*CUSTOMER DETAILS:*%0A` +
      `Name: ${customerName}%0A` +
      `Contact: ${customerPhone}%0A` +
      `Address: ${customerAddress}, ${customerCity}%0A%0A` +
      `*ORDERED ITEMS:*%0A` +
      `${itemsList}%0A%0A` +
      `*TOTAL AMOUNT:* ₹${cartTotal.toLocaleString("en-IN")}%0A%0A` +
      `Please confirm stock allocation and share UPI / payment link.`;

    window.open(`https://wa.me/919819660453?text=${text}`, "_blank");
    clearCart();
    setStep("success");
  };

  const handleClose = () => {
    closeCart();
    setStep("bag");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-900 h-full flex flex-col z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {step === "details" && (
                  <button
                    onClick={() => setStep("bag")}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                  {step === "bag" && `Bag [${cart.length}]`}
                  {step === "details" && "Dispatch Details"}
                  {step === "success" && "Transmission Logged"}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Cart Items */}
            {step === "bag" && (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20">
                      <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                        Your bag is empty
                      </p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex gap-4 p-3 border border-zinc-900 bg-black/40"
                      >
                        <div className="w-16 h-20 bg-zinc-900 relative shrink-0 border border-zinc-800">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-zinc-600 hover:text-red-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">
                              Size: {item.size}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-zinc-800">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="p-1 text-zinc-400 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-[10px] font-mono text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="p-1 text-zinc-400 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-xs font-mono font-semibold text-white">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-5 border-t border-zinc-900 bg-zinc-950 space-y-4">
                    <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-zinc-400">
                      <span>Subtotal</span>
                      <span className="text-white font-bold">
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <button
                      onClick={() => setStep("details")}
                      className="w-full py-3 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Proceed To Checkout</span>
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Step 2: Customer Details Form */}
            {step === "details" && (
              <form onSubmit={handleWhatsAppCheckout} className="flex-1 flex flex-col justify-between">
                <div className="p-5 space-y-4 overflow-y-auto">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-zinc-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Pradip Pawara"
                      className="w-full bg-black border border-zinc-800 p-2.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-zinc-400">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. +91 98196 60453"
                      className="w-full bg-black border border-zinc-800 p-2.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-zinc-400">
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Building, Flat No., Street, Landmark, Pin Code..."
                      className="w-full bg-black border border-zinc-800 p-2.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-zinc-400">
                      City & State *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="e.g. Mumbai, Maharashtra"
                      className="w-full bg-black border border-zinc-800 p-2.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>

                <div className="p-5 border-t border-zinc-900 bg-zinc-950 space-y-4">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-zinc-400">
                    <span>Final Amount</span>
                    <span className="text-white font-bold">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Dispatch Order to WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Confirmation / Thank You State */}
            {step === "success" && (
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-6 pt-6">
                  <div className="w-12 h-12 border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                      Transmission Successful
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">
                      Order Queued With Concierge
                    </h3>
                    <p className="text-xs text-zinc-400 normal-case leading-relaxed">
                      Your capsule reservation has been routed to our WhatsApp verification desk. Our team will review stock allocation and reply with your payment link.
                    </p>
                  </div>

                  <div className="border border-zinc-900 bg-black/60 p-4 space-y-2 font-mono text-[11px] text-zinc-400">
                    <p className="text-white font-bold uppercase">Next Steps:</p>
                    <p>1. Keep the WhatsApp chat open.</p>
                    <p>2. Send the pre-formatted text prompt.</p>
                    <p>3. Complete UPI verification upon receipt.</p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
