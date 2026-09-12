import Link from "next/link";
import { MessageCircle, ShieldCheck, Truck, RefreshCw } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-black text-zinc-500 pt-16 pb-12 px-6 text-xs uppercase tracking-widest">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Value Props Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-zinc-900/80">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-zinc-400 shrink-0" />
            <div>
              <p className="text-zinc-200 font-bold tracking-wider">280+ GSM Heavyweight</p>
              <p className="text-[10px] text-zinc-500 normal-case tracking-normal">Durable custom milled organic cotton.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-zinc-400 shrink-0" />
            <div>
              <p className="text-zinc-200 font-bold tracking-wider">Pan-India Dispatch</p>
              <p className="text-[10px] text-zinc-500 normal-case tracking-normal">Secure door-to-door courier tracking.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-zinc-400 shrink-0" />
            <div>
              <p className="text-zinc-200 font-bold tracking-wider">Direct Concierge</p>
              <p className="text-[10px] text-zinc-500 normal-case tracking-normal">Direct WhatsApp verification on every order.</p>
            </div>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <span className="text-2xl font-black text-white tracking-widest block">SKELE</span>
            <p className="normal-case text-zinc-400 text-xs tracking-normal max-w-sm leading-relaxed">
              Stripping back conventional fast-fashion to engineer high-density cuts that carry weight, emotion, and longevity.
            </p>
            <div className="pt-2 text-[10px] font-mono text-zinc-600 space-y-1">
              <p>OPERATED BY SKELE APPARELS LLP</p>
              <p>MUMBAI // MAHARASHTRA // INDIA</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-zinc-200 font-bold text-[11px] tracking-wider">Collections</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="#drops" className="hover:text-white transition-colors">
                  Drop 001 Capsule
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-white transition-colors">
                  Editorial Lookbook
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-zinc-500">
                  Inventory Terminal
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Social */}
          <div className="space-y-3">
            <h4 className="text-zinc-200 font-bold text-[11px] tracking-wider">Direct Concierge</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-zinc-400" />
                  <span>WhatsApp Order Desk</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/skele.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>@skele.co</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[10px] font-mono text-zinc-600 block">SUPPORT DESK</span>
                <span className="text-zinc-400 lowercase text-[11px]">concierge@skele.co</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600">
          <p>© {currentYear} SKELE APPARELS LLP. ALL RIGHTS RESERVED.</p>
          <p className="uppercase tracking-widest text-zinc-600">
            ENGINEERED FOR HEAVYWEIGHT SILHOUETTES
          </p>
        </div>
      </div>
    </footer>
  );
}