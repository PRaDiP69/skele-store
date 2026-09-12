import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Background Ambience / Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Top Header */}
      <header className="flex justify-between items-center z-10 border-b border-zinc-900 pb-6">
        <span className="font-black text-sm tracking-[0.3em] uppercase text-white">
          SKELE
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          Status // 404
        </span>
      </header>

      {/* Center Error Callout */}
      <div className="max-w-2xl my-auto py-16 z-10">
        <div className="inline-flex items-center gap-2 border border-zinc-800 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-6 bg-zinc-950">
          <AlertTriangle className="w-3 h-3 text-red-500" />
          <span>Index Not Found</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
          Void // 404
        </h1>

        <p className="text-zinc-400 text-xs md:text-sm uppercase tracking-widest mt-6 max-w-md leading-relaxed font-mono">
          The requested coordinate or archive item does not exist or has been retired from Drop 001.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Link>

          <Link
            href="/lookbook"
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-widest hover:border-zinc-500 hover:text-white transition-colors bg-zinc-950/60"
          >
            Explore Lookbook
          </Link>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <footer className="z-10 border-t border-zinc-900 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-mono uppercase tracking-widest text-zinc-600 gap-2">
        <span>SKELE Apparels LLP // Mumbai</span>
        <span>Secure Protocol 001</span>
      </footer>
    </main>
  );
}