import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, ShieldAlert, Sparkles, RefreshCcw } from "lucide-react";

export default function TermsPage() {
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
            Terms & Care
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
            Garment Longevity // Purchase Guidelines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-900 bg-zinc-950 p-5 space-y-2">
            <Sparkles className="w-5 h-5 text-zinc-300" />
            <h3 className="text-xs font-mono font-bold uppercase text-white">280+ GSM Care</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cold wash inside out. Do not tumble dry. Do not iron directly on graphic prints.
            </p>
          </div>
          <div className="border border-zinc-900 bg-zinc-950 p-5 space-y-2">
            <RefreshCcw className="w-5 h-5 text-zinc-300" />
            <h3 className="text-xs font-mono font-bold uppercase text-white">Exchange Policy</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Size exchanges accepted within 48 hours of delivery provided tags are intact and unworn.
            </p>
          </div>
          <div className="border border-zinc-900 bg-zinc-950 p-5 space-y-2">
            <ShieldAlert className="w-5 h-5 text-zinc-300" />
            <h3 className="text-xs font-mono font-bold uppercase text-white">Capsule Integrity</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All drops are limited numbered batches. Once an item is archived, restocks are never produced.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 space-y-6 text-xs text-zinc-400 font-mono leading-relaxed">
          <h2 className="text-sm font-bold uppercase text-white">Legal Notice</h2>
          <p>
            SKELE Apparels LLP operates out of Mumbai, Maharashtra. By reserving an order through our concierge desk, you agree to our verification workflow and dispatch terms.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
