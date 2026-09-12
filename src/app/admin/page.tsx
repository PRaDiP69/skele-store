"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { ArrowLeft, RefreshCw, Lock, ShieldCheck, LogOut } from "lucide-react";
import { useInventory, SizeKey } from "../context/InventoryContext";

const MASTER_KEY = "SKELE2026";
const SIZES: SizeKey[] = ["S", "M", "L", "XL"];

export default function AdminPage() {
  const { inventory, updateSizeStock, toggleStockStatus, resetInventory } = useInventory();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("skele_admin_auth");
    if (session === "granted") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === MASTER_KEY) {
      sessionStorage.setItem("skele_admin_auth", "granted");
      setIsAuthenticated(true);
      setErrorMsg("");
      setPasscode("");
    } else {
      setErrorMsg("ACCESS DENIED // INVALID MASTER KEY");
      setPasscode("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("skele_admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md w-full mx-auto px-6 py-20 flex-1 flex flex-col justify-center">
          <div className="border border-zinc-900 bg-zinc-950 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 border border-zinc-800 bg-black text-white">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-mono font-bold tracking-widest uppercase text-white">
                  Restricted Access
                </h1>
                <p className="text-[10px] font-mono text-zinc-500 uppercase">
                  SKELE Terminal Master Key
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5">
                  Enter Security Passkey
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black border border-zinc-800 px-3 py-2 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {errorMsg && (
                <p className="text-[10px] font-mono text-red-400 uppercase tracking-wider">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-widest transition-colors cursor-pointer"
              >
                Authenticate Terminal
              </button>
            </form>

            <div className="pt-4 border-t border-zinc-900 text-center">
              <Link
                href="/"
                className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-300"
              >
                Return to Storefront
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase border border-emerald-950 bg-emerald-950/20 px-2.5 py-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Authenticated
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-white border border-zinc-800 px-2.5 py-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              Exit
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8 border-b border-zinc-900 pb-4">
          <div>
            <h1 className="text-2xl font-mono font-bold uppercase tracking-tight">
              Terminal // SKELE Inventory Control
            </h1>
            <p className="text-xs font-mono text-zinc-500 mt-1 uppercase">
              Independent Size & Color Matrix
            </p>
          </div>
          <button
            onClick={resetInventory}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white border border-zinc-800 px-3 py-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Reset Defaults
          </button>
        </div>

        <div className="border border-zinc-900 bg-zinc-950 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-zinc-900 text-zinc-500 uppercase bg-zinc-900/40">
              <tr>
                <th className="p-4">SKU / Item</th>
                <th className="p-4">Colorway</th>
                <th className="p-4">Master Status</th>
                <th className="p-4">Size Breakdown (S / M / L / XL)</th>
                <th className="p-4 text-right">Total Units</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {inventory.map((item) => {
                const sizeStock = item.sizeStock || { S: 0, M: 0, L: 0, XL: 0 };
                const totalUnits = Object.values(sizeStock).reduce((a, b) => a + b, 0);

                return (
                  <tr key={item.id} className="hover:bg-zinc-900/20">
                    <td className="p-4 font-bold text-white whitespace-nowrap">{item.name}</td>
                    <td className="p-4 text-zinc-400 whitespace-nowrap">{item.color}</td>
                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStockStatus(item.id)}
                        className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider border cursor-pointer ${
                          item.inStock && totalUnits > 0
                            ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-400"
                            : "border-red-500/40 bg-red-950/20 text-red-400"
                        }`}
                      >
                        {item.inStock && totalUnits > 0 ? "Active" : "Archived"}
                      </button>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        {SIZES.map((size) => {
                          const count = sizeStock[size] ?? 0;
                          return (
                            <div
                              key={size}
                              className="flex items-center gap-1.5 border border-zinc-800 bg-black p-1.5"
                            >
                              <span className="font-bold text-zinc-400 w-4 text-center">
                                {size}:
                              </span>
                              <span
                                className={`w-5 text-center font-bold ${
                                  count > 0 ? "text-white" : "text-zinc-600"
                                }`}
                              >
                                {count}
                              </span>
                              <button
                                onClick={() => updateSizeStock(item.id, size, -1)}
                                className="px-1.5 py-0.5 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white cursor-pointer"
                              >
                                -
                              </button>
                              <button
                                onClick={() => updateSizeStock(item.id, size, 1)}
                                className="px-1.5 py-0.5 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    <td className="p-4 text-right font-bold text-white whitespace-nowrap">
                      {totalUnits} Units
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
