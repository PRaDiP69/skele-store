"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { X, ArrowLeft } from "lucide-react";

const LOOKS = [
  { id: 1, src: "/products/look1.jpg", title: "Drop 001 // Cut 01", desc: "Heavyweight Boxy Silhouette in Cobalt" },
  { id: 2, src: "/products/look2.jpg", title: "Drop 001 // Cut 02", desc: "Onyx Black Raw Edge Form" },
  { id: 3, src: "/products/look3.jpg", title: "Drop 001 // Cut 03", desc: "Blood Crimson Acid Form" },
];

export default function LookbookPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white uppercase mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Lookbook // Capsule 001
            </h1>
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
            Mumbai // 280+ GSM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOOKS.map((look) => (
            <div
              key={look.id}
              onClick={() => setActiveImage(look.src)}
              className="group cursor-pointer border border-zinc-900 bg-zinc-950 p-3 space-y-3 hover:border-zinc-700 transition-colors"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900">
                <Image
                  src={look.src}
                  alt={look.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider">{look.title}</h3>
                <p className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">{look.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-3xl max-h-[85vh] w-full h-full">
            <Image
              src={activeImage}
              alt="Expanded preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
