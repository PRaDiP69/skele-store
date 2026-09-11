"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-radial from-zinc-800/30 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase border border-zinc-700 text-zinc-400 rounded-full"
        >
          Drop 001 // Now Live
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-white leading-none"
        >
          SKELE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-zinc-400 tracking-widest text-sm sm:text-base uppercase max-w-xl mx-auto"
        >
          Engineered Streetwear & Minimalist Silhouettes. Designed for the bold.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#drops"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            Explore Drop
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#about"
            className="w-full sm:w-auto px-8 py-3.5 border border-zinc-700 text-white font-bold text-xs uppercase tracking-widest hover:border-white transition-colors"
          >
            Our Philosophy
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}