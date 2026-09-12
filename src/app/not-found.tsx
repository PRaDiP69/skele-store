import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-800 bg-zinc-950 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5" />
          <span>Error 404 // Route Terminated</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
          VOID
        </h1>

        <p className="max-w-md mx-auto text-xs font-mono text-zinc-400 uppercase tracking-widest leading-relaxed">
          The requested coordinate does not exist in Drop 001 archives or has been decommissioned.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Capsule Storefront</span>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
