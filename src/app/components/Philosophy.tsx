"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Flame } from "lucide-react";

export default function Philosophy() {
  return (
    <section id="about" className="py-28 px-6 border-t border-zinc-900 bg-[#09090b]">
      <div className="max-w-6xl mx-auto">
        {/* Editorial Subtitle */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-px bg-zinc-600" />
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium">
            Manifesto // SKELE Apparels LLP
          </span>
        </div>

        {/* Core Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Stripped Back to the Bone. <br />
            <span className="text-zinc-500">Woven With Emotion.</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed tracking-wide max-w-3xl">
            SKELE isn&apos;t just a name; it&apos;s a statement. We delve into the essence of fashion with designs that are unique, meaningful, &amp; boldly authentic. Stripping back conventional style, SKELE highlights pieces that resonate with real emotions &amp; individual stories. In a world full of pretense, we stand for authenticity &amp; the power of personal expression.
          </p>

          <p className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase pt-2">
            Each creation is a narrative. Wear your story with pride.
          </p>
        </motion.div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-zinc-900/80">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Flame className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Raw Authenticity</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wider">
              No filler, no trends. Only pieces cut and tailored to outlast seasonal noise.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Emotional Resonance</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wider">
              Every garment reflects personal battles, growth, and real narratives.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Engineered Silhouette</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wider">
              Custom-milled heavyweight textiles tailored for structured, relaxed boxy fits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}