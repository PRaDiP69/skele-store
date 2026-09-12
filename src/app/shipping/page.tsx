import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, Truck, Clock, ShieldCheck } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white uppercase mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Dispatch & Shipping
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
            SKELE APPARELS LLP // Pan-India Logistics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-900 bg-zinc-950 p-5 space-y-2">
            <Truck className="w-5 h-5 text-zinc-300" />
            <h3 className="text-xs font-mono font-bold uppercase text-white">Pan-India Courier</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Standard door-to-door surface & air dispatch with end-to-end consignment tracking.
            </p>
          </div>
          <div className="border border-zinc-900 bg-zinc-950 p-5 space-y-2">
            <Clock className="w-5 h-5 text-zinc-300" />
            <h3 className="text-xs font-mono font-bold uppercase text-white">Dispatch Timelines</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Drop 001 capsules dispatch within 24-48 hours of concierge payment verification.
            </p>
          </div>
          <div className="border border-zinc-900 bg-zinc-950 p-5 space-y-2">
            <ShieldCheck className="w-5 h-5 text-zinc-300" />
            <h3 className="text-xs font-mono font-bold uppercase text-white">Verified Packaging</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Reinforced tamper-evident mailers safeguarding custom 280+ GSM textiles.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 space-y-6 text-xs text-zinc-400 font-mono leading-relaxed">
          <h2 className="text-sm font-bold uppercase text-white">Transit Schedules</h2>
          <p>
            • Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad): 2 - 4 business days.
            <br />
            • Tier 2 & Rest of India: 4 - 7 business days depending on regional hub access.
          </p>
          <h2 className="text-sm font-bold uppercase text-white">Tracking Notice</h2>
          <p>
            Tracking numbers are delivered directly to your verified WhatsApp contact number immediately after package pickup.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
