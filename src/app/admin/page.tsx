"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Package, 
  Plus, 
  Trash2, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  X 
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  stock: number;
  status: "Active" | "Sold Out";
}

const INITIAL_PRODUCTS: ProductItem[] = [
  { id: "prod-red-flag", name: "Red Flag", price: 2499, category: "Signature", color: "Blood Crimson", stock: 25, status: "Active" },
  { id: "prod-hooked", name: "Hooked", price: 2699, category: "Heavyweight", color: "Onyx Black", stock: 18, status: "Active" },
  { id: "prod-done-playing-blue", name: "Done Playing", price: 2799, category: "Washed Cut", color: "Cobalt Blue", stock: 15, status: "Active" },
  { id: "prod-ulterior-motive-green", name: "Ulterior Motive", price: 2899, category: "Limited", color: "Forest Green", stock: 10, status: "Active" },
  { id: "prod-transcend", name: "Transcend", price: 3199, category: "Raw Hem", color: "Acid Stone", stock: 8, status: "Active" },
  { id: "prod-disaster-black", name: "Disaster", price: 2999, category: "Boxy Fit", color: "Washed Black", stock: 0, status: "Sold Out" },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Signature");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");

  const handleToggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Active" ? "Sold Out" : "Active";
          return {
            ...item,
            status: nextStatus,
            stock: nextStatus === "Sold Out" ? 0 : item.stock || 10,
          };
        }
        return item;
      })
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    const newProduct: ProductItem = {
      id: `prod-${name.toLowerCase().replace(/\s+/g, "-")}`,
      name,
      price: Number(price),
      category,
      color: color || "Monochrome",
      stock: Number(stock),
      status: Number(stock) > 0 ? "Active" : "Sold Out",
    };

    setProducts([newProduct, ...products]);
    setName("");
    setPrice("");
    setColor("");
    setStock("");
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const activeCount = products.filter((p) => p.status === "Active").length;
  const soldOutCount = products.filter((p) => p.status === "Sold Out").length;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Storefront
              </Link>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white mt-2">
              SKELE // Admin Portal
            </h1>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              SKELE Apparels LLP Content &amp; Inventory Management
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-black px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Drop
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Drops</span>
              <Package className="w-4 h-4 text-zinc-400" />
            </div>
            <p className="text-2xl font-black font-mono text-white mt-2">{activeCount}</p>
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1 block">Live for purchase</span>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Archived / Sold Out</span>
              <AlertCircle className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-2xl font-black font-mono text-zinc-400 mt-2">{soldOutCount}</p>
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1 block">Unavailable</span>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-5">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Estimated Valuation</span>
              <TrendingUp className="w-4 h-4 text-zinc-400" />
            </div>
            <p className="text-2xl font-black font-mono text-white mt-2">₹{totalValue.toLocaleString("en-IN")}</p>
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1 block">Current live inventory</span>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Current Release Catalog</h2>
            <span className="text-xs font-mono text-zinc-500">{products.length} Products Tracked</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-widest text-zinc-500 bg-zinc-900/30">
                  <th className="py-3 px-4 sm:px-6">Product</th>
                  <th className="py-3 px-4">Colorway</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Units</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-xs">
                {products.map((item) => {
                  const isActive = item.status === "Active";
                  return (
                    <tr key={item.id} className="hover:bg-zinc-900/20 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                        <div>{item.name}</div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{item.category}</span>
                      </td>
                      <td className="py-4 px-4 text-zinc-400">{item.color}</td>
                      <td className="py-4 px-4 font-mono text-zinc-200">₹{item.price.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-4 font-mono text-zinc-300">{item.stock}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border cursor-pointer transition-colors ${
                            isActive
                              ? "bg-zinc-900 text-zinc-200 border-zinc-700 hover:border-zinc-500"
                              : "bg-black text-zinc-600 border-zinc-900 hover:border-zinc-800"
                          }`}
                        >
                          {isActive ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-zinc-600" />
                          )}
                          {item.status}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="text-zinc-600 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Add New Drop Piece</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Piece Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phantom Heavyweight"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-hidden focus:border-zinc-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="2999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-hidden focus:border-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    placeholder="20"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-hidden focus:border-zinc-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Tag / Cut</label>
                  <input
                    type="text"
                    placeholder="e.g. Raw Hem"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-hidden focus:border-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Colorway</label>
                  <input
                    type="text"
                    placeholder="e.g. Vintage Wash"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-hidden focus:border-zinc-600"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Create SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}