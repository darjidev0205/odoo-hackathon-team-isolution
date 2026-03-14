"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormField, Input, Select, Textarea } from "@/components/ui/FormField";
import { CATEGORIES, LOCATIONS, UNITS } from "@/lib/mockData";
import { subscribeToProducts, addProduct, deleteProduct, type ProductData } from "@/lib/dbService";
import type { DocumentData } from "firebase/firestore";

const statusVariant = (s: string) => s === "In Stock" ? "green" : s === "Low Stock" ? "amber" : "red";
const calcStatus = (stock: number): ProductData["status"] => stock === 0 ? "Out of Stock" : stock < 20 ? "Low Stock" : "In Stock";

export default function ProductsPage() {
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", sku: "", category: CATEGORIES[0], unit: UNITS[0], stock: "", price: "", location: LOCATIONS[0], description: "" });

  useEffect(() => {
    const unsub = subscribeToProducts((data) => { setProducts(data); setLoading(false); });
    return () => unsub();
  }, []);

  const filtered = products.filter((p) =>
    (p.name?.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase())) &&
    (!cat || p.category === cat)
  );

  const handleAdd = async () => {
    if (!form.name || !form.sku) { alert("Name and SKU are required."); return; }
    setSaving(true);
    const stock = parseInt(form.stock) || 0;
    await addProduct({ name: form.name, sku: form.sku, category: form.category, stock, location: form.location, price: parseFloat(form.price) || 0, status: calcStatus(stock), description: form.description });
    setSaving(false);
    setModalOpen(false);
    setForm({ name: "", sku: "", category: CATEGORIES[0], unit: UNITS[0], stock: "", price: "", location: LOCATIONS[0], description: "" });
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-indigo-600" size={32} />
      <span className="ml-3 text-gray-500">Loading from Firebase…</span>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-56">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or SKU…" className="border-none outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent flex-1" />
          </div>
          <Select value={cat} onChange={(e) => setCat(e.target.value)} className="w-auto">
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </div>
        <Button onClick={() => setModalOpen(true)}><Plus size={15} /> Add Product</Button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Product Name","SKU","Category","Stock","Location","Unit Price","Status","Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-sm text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-400">{p.sku}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{p.category}</td>
                  <td className="px-4 py-3"><span className={`text-sm font-bold ${p.stock === 0 ? "text-red-600" : p.stock < 20 ? "text-amber-600" : "text-gray-900"}`}>{p.stock}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{p.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">${Number(p.price).toFixed(2)}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant(p.status) as "green"|"amber"|"red"}>{p.status}</Badge></td>
                  <td className="px-4 py-3"><Button variant="secondary" size="sm">Edit</Button></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={8} className="px-4 py-16 text-center text-sm text-gray-400">No products found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add New Product">
        <div className="grid grid-cols-2 gap-x-3">
          <FormField label="Product Name"><Input placeholder="e.g. Wireless Mouse" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} /></FormField>
          <FormField label="SKU"><Input placeholder="e.g. WM-001" value={form.sku} onChange={(e) => setForm({...form,sku:e.target.value})} /></FormField>
          <FormField label="Category"><Select value={form.category} onChange={(e) => setForm({...form,category:e.target.value})}>{CATEGORIES.map((c)=><option key={c}>{c}</option>)}</Select></FormField>
          <FormField label="Unit"><Select value={form.unit} onChange={(e) => setForm({...form,unit:e.target.value})}>{UNITS.map((u)=><option key={u}>{u}</option>)}</Select></FormField>
          <FormField label="Initial Stock"><Input type="number" placeholder="0" value={form.stock} onChange={(e) => setForm({...form,stock:e.target.value})} /></FormField>
          <FormField label="Unit Price ($)"><Input type="number" placeholder="0.00" value={form.price} onChange={(e) => setForm({...form,price:e.target.value})} /></FormField>
        </div>
        <FormField label="Location"><Select value={form.location} onChange={(e) => setForm({...form,location:e.target.value})}>{LOCATIONS.map((l)=><option key={l}>{l}</option>)}</Select></FormField>
        <FormField label="Description"><Textarea rows={2} placeholder="Optional…" value={form.description} onChange={(e) => setForm({...form,description:e.target.value})} /></FormField>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} disabled={saving}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            {saving ? "Saving…" : "Add Product"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
