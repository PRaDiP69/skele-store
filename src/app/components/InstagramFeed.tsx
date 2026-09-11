"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
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

const LOOKBOOK_ITEMS = [
  {
    id: 1,
    caption: "RED FLAG // HEAVYWEIGHT SILHOUETTE",
    tag: "#SkeleCrew",
    image: "/products/look1.jpg",
  },
  {
    id: 2,
    caption: "RAW ESSENCE // WEAR YOUR STORY",
    tag: "#SkeleApparels",
    image: "/products/look2.jpg",
  },
  {
    id: 3,
    caption: "DONE PLAYING // OVERSIZED DROP",
    tag: "#WearYourStory",
    image: "/products/look3.jpg",
  },
  {
    id: 4,
    caption: "THE SKELETON WITHIN // UNFILTERED",
    tag: "#SkeleCo",
    image: "/products/look4.jpg",
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-24 px-6 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
              <InstagramIcon className="w-4 h-4" /> Community &amp; Lookbook
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
              Follow @skele.co
            </h2>
          </div>
          <Link
            href="https://instagram.com/skele.co"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-300 hover:text-white border-b border-zinc-700 pb-1 hover:border-white transition-colors"
          >
            Join the Movement <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <motion.a
              key={item.id}
              href="https://instagram.com/skele.co"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col justify-end p-4"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="relative z-10">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400">
                  {item.tag}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-white mt-0.5 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}