"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, Truck, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-zinc-900 bg-black text-zinc-500 pt-16 pb-12 px-6 text-xs uppercase tracking-widest">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-zinc-900/80">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-zinc-400 shrink-0" />
            <div>
              <p className="text-zinc-200 font-bold tracking-wider">280+ GSM Heavyweight</p>
              <p className="text-[10px] text-zinc-500 normal-case tracking-normal">
                Durable custom milled organic cotton.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-zinc-400 shrink-0" />
            <div>
              <p className="text-zinc-200 font-bold tracking-wider">Pan-India Dispatch</p>
              <p className="text-[10px] text-zinc-500 normal-case tracking-normal">
                Secure door-to-door courier tracking.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-zinc-400 shrink-0" />
            <div>
              <p className="text-zinc-200 font-bold tracking-wider">Direct Concierge</p>
              <p className="text-[10px] text-zinc-500 normal-case tracking-normal">
                Direct WhatsApp verification on every order.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-zinc-950 border border-zinc-900 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-md">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-1">
              Priority Access // Private Dispatch
            </span>
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">
              Join Drop 002 Waitlist
            </h3>
            <p className="text-zinc-400 text-xs normal-case tracking-normal mt-1 leading-relaxed">
              Subscribers receive locked drop passwords 1 hour prior to public release.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs border border-emerald-950 bg-emerald-950/20 p-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>CONFIRMED // INVITATION REGISTERED</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL..."
                  className="bg-black border border-zinc-800 px-3 py-2.5 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-2">
            <span className="text-2xl font-black text-white tracking-widest block">SKELE</span>
            <p className="normal-case text-zinc-400 text-xs tracking-normal max-w-sm leading-relaxed">
              Stripping back conventional fast-fashion to engineer high-density cuts that carry weight, emotion, and longevity.
            </p>
            <div className="pt-2 text-[10px] font-mono text-zinc-600 space-y-1">
              <p>OPERATED BY SKELE APPARELS LLP</p>
              <p>MUMBAI // MAHARASHTRA // INDIA</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-zinc-200 font-bold text-[11px] tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="/#drops" className="hover:text-white transition-colors">
                  Drop 001 Capsule
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-white transition-colors">
                  Editorial Lookbook
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Dispatch
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Garment Care
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-zinc-200 font-bold text-[11px] tracking-wider">Direct Concierge</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a
                  href="https://wa.me/919819660453"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-zinc-400" />
                  <span>WhatsApp Order Desk</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/skele.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>@skele.co</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[10px] font-mono text-zinc-600 block">SUPPORT DESK</span>
                <a
                  href="mailto:support@skele.co"
                  className="text-zinc-400 lowercase text-[11px] hover:text-white transition-colors block"
                >
                  support@skele.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600">
          <p>© {currentYear} SKELE APPARELS LLP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <Link href="/shipping" className="hover:text-zinc-400 transition-colors">SHIPPING</Link>
            <span>//</span>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">TERMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
