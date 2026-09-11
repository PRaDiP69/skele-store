"use client";

import Navbar from "../components/Navbar";
import LookbookGrid from "../components/LookbookGrid";
import Footer from "../components/Footer";

export default function LookbookPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-700">
      <Navbar />

      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-zinc-900 pb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Visual Archive
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mt-1">
              Lookbook // 001
            </h1>
          </div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mt-4 md:mt-0 max-w-xs leading-relaxed">
            A curated sequence showcasing the &quot;UNFRAMED&quot; drop in native environments.
            Styled for the bold, engineered for the street.
          </p>
        </div>

        <LookbookGrid />
      </div>

      <Footer />
    </main>
  );
}