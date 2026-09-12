"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `SKL-${Date.now().toString().slice(-5)}`;
    const itemsList = cart
      .map(
        (item) =>
          `• *${item.name}* [${item.size}]\n  Qty: ${item.quantity} × ₹${item.price.toLocaleString("en-IN")} = ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
      )
      .join("\n\n");

    const message =
      `*ORDER REQUEST // ${orderId}*\n` +
      `─────────────────────────\n` +
      `*CUSTOMER DETAILS*\n` +
      `Name: ${formData.name}\n` +
      `Contact: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `City/PIN: ${formData.city} - ${formData.pincode}\n` +
      `─────────────────────────\n` +
      `*ORDER ITEMS*\n` +
      `${itemsList}\n` +
      `─────────────────────────\n` +
      `*TOTAL PAYABLE:* ₹${cartTotal.toLocaleString("en-IN")}\n` +
      `*DISPATCH:* Standard Express (Pan-India)\n` +
      `─────────────────────────\n` +
      `_Awaiting payment confirmation & dispatch slot._`;

    const brandNumber = "919819660453";
    const whatsappUrl = `https://wa.me/${brandNumber}?text=${encodeURIComponent(message)}`;

    setIsSubmitted(true);
    window.open(whatsappUrl, "_blank");
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 p-6 md:p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-white mx-auto stroke-1" />
            <h3 className="text-xl font-bold uppercase tracking-wider">Order Dispatched</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Your order summary has been redirected to our concierge. We will confirm your delivery slot shortly.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Secure Checkout // Drop 001
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight mt-1">
                Delivery Details
              </h2>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Pradip Pawara"
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98196 60453"
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                  Shipping Address
                </label>
                <textarea
                  required
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street name, building, apartment"
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    PIN Code
                  </label>
                  <input
                    required
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="400001"
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 uppercase tracking-widest">Total Payable</span>
                <span className="text-base font-bold text-white">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Place Order via Concierge
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}