"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

const MARQUEE_ITEMS = [
  "DROP 001 LIVE",
  "HEAVYWEIGHT 280+ GSM",
  "ACID WASHED TEXTURES",
  "LIMITED RUNS",
  "DIRECT DISPATCH VIA CONCIERGE",
  "SKELE APPARELS LLP",
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between items-center text-center px-6 pt-24 pb-8 overflow-hidden border-b border-zinc-900">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(39,39,42,0.35)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-4xl z-10 my-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 text-[10px] sm:text-xs font-mono tracking-widest uppercase border border-zinc-800 bg-zinc-950/80 text-zinc-300"
        >
          <Sparkles className="w-3 h-3 text-zinc-400" />
          <span>Release 001 // Curated Capsule</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl sm:text-9xl md:text-[11rem] font-black uppercase tracking-tighter text-white leading-none select-none"
        >
          SKELE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xs sm:text-sm md:text-base text-zinc-400 uppercase tracking-[0.25em] max-w-xl mx-auto mt-4 font-light"
        >
          Heavyweight silhouettes engineered for the unconfined.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="#drops"
            className="px-8 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2 group"
          >
            <span>Explore Capsule</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
          </Link>
          <Link
            href="/lookbook"
            className="px-8 py-3.5 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-widest hover:border-zinc-500 hover:text-white transition-all"
          >
            View Lookbook
          </Link>
        </motion.div>
      </div>

      {/* Infinite Editorial Marquee */}
      <div className="w-full relative z-10 overflow-hidden py-3 border-t border-zinc-900 bg-black/60 backdrop-blur-xs">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
          className="flex whitespace-nowrap gap-8 text-[11px] font-mono tracking-widest text-zinc-500 uppercase"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>{text}</span>
              <span className="text-zinc-700">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}