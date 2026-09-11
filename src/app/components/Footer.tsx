import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#09090b] text-zinc-500 py-16 px-6 text-xs uppercase tracking-widest">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-3 md:col-span-2">
          <span className="text-xl font-black text-white tracking-widest">SKELE</span>
          <p className="normal-case text-zinc-400 text-xs tracking-normal max-w-sm">
            Stripping back conventional style to highlight pieces that resonate with real emotions. Wear your story with pride.
          </p>
          <p className="text-[11px] text-zinc-600">
            &copy; {new Date().getFullYear()} SKELE Apparels LLP. All rights reserved.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-zinc-200 font-bold mb-3">Navigation</h4>
          <p><Link href="#drops" className="hover:text-white transition-colors">Drops</Link></p>
          <p><Link href="#about" className="hover:text-white transition-colors">Manifesto</Link></p>
          <p><Link href="/admin" className="hover:text-white transition-colors">Admin Gateway</Link></p>
        </div>

        <div className="space-y-2">
          <h4 className="text-zinc-200 font-bold mb-3">Direct Connect</h4>
          <p>
            <a href="https://instagram.com/skele.co" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram // @skele.co
            </a>
          </p>
          <p className="text-zinc-600 normal-case">Inquiries: contact@skele.co</p>
        </div>
      </div>
    </footer>
  );
}