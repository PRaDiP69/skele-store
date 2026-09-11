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
  X 
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "Active" | "Sold Out" | "Draft";
}

const INITIAL_PRODUCTS: ProductItem[] = [
  { id: "SKU-001", name: "Heavyweight Boxy Tee", price: 2499, category: "Tees", stock: 45, status: "Active" },
  { id: "SKU-002", name: "Acid-Wash Hoodie", price: 4999, category: "Hoodies", stock: 12, status: "Active" },
  { id: "SKU-003", name: "Technical Cargo Pant", price: 3999, category: "Pants", stock: 0, status: "Sold Out" },
  { id: "SKU-004", name: "Raw Edge Oversized Cap", price: 1499, category: "Headwear", stock: 80, status: "Active" },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Tees");
  const [stock, setStock] = useState("");

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    const newProduct: ProductItem = {
      id: `SKU-00${products.length + 1}`,
      name,
      price: Number(price),
      category,
      stock: Number(stock),
      status: Number(stock) > 0 ? "Active" : "Sold Out",
    };

    setProducts([newProduct, ...products]);
    setName("");
    setPrice("");
    setStock("");
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((item) => item.id !== id));
  };

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
            className="flex items-center gap-2 bg-white text-black px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Drop
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-none">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Inventory</span>
              <Package className="w-4 h-4 text-zinc-400" />
            </div>
            <p className="text-2xl font-black text-white mt-2">
              {products.reduce((acc, curr) => acc + curr.stock, 0)} Units
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-none">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Catalog Items</span>
              <TrendingUp className="w-4 h-4 text-zinc-400" />
            </div>
            <p className="text-2xl font-black text-white mt-2">{products.length} SKUs</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-none">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Low/Out of Stock</span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-500 mt-2">
              {products.filter((p) => p.stock < 15).length} Items
            </p>
          </div>
        </div>

        {/* Product Inventory Table */}
        <div className="bg-zinc-950 border border-zinc-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-widest border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">SKU</th>
                <th className="py-3.5 px-4 font-semibold">Product Name</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Stock</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3.5 px-4 text-zinc-500">{item.id}</td>
                  <td className="py-3.5 px-4 font-sans font-bold uppercase text-white">{item.name}</td>
                  <td className="py-3.5 px-4 text-zinc-400 font-sans uppercase">{item.category}</td>
                  <td className="py-3.5 px-4 text-zinc-200">₹{item.price.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-zinc-300">{item.stock}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-sans font-semibold border ${
                        item.status === "Active"
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                          : "border-red-500/30 text-red-400 bg-red-500/10"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      title="Delete SKU"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal to Add New Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-black uppercase tracking-wider text-white">Create New Drop Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-semibold uppercase tracking-wider">
              <div>
                <label className="block text-zinc-400 mb-2">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skele Raw Cut Hoodie"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-zinc-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-2">Price (INR)</label>
                  <input
                    type="number"
                    required
                    placeholder="2999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-zinc-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-2">Quantity</label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-zinc-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-zinc-500 font-sans"
                >
                  <option value="Tees">Tees</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Pants">Pants</option>
                  <option value="Headwear">Headwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 text-zinc-300 hover:border-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                >
                  Publish Drop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}