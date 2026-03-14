"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormField, Input, Select, Textarea } from "@/components/ui/FormField";
import { receipts as initialReceipts, LOCATIONS, type Receipt } from "@/lib/mockData";

const statusVariant = (s: string) => {
  if (s === "Received") return "green";
  if (s === "Pending") return "amber";
  if (s === "In Transit") return "blue";
  return "red";
};

const PRODUCTS = ["Wireless Keyboard", 'Monitor 27"', "Office Chair Pro", "USB Hub 7-Port", "Laptop Stand", "Standing Desk"];

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>(initialReceipts);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ supplier: "", product: PRODUCTS[0], quantity: "", expectedDate: "", location: LOCATIONS[0], notes: "" });

  const filtered = receipts.filter(
    (r) =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.supplier.toLowerCase().includes(search.toLowerCase()) ||
      r.product.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const newR: Receipt = {
      id: `REC-${String(receipts.length + 1).padStart(3, "0")}`,
      supplier: form.supplier || "Unknown Supplier",
      product: form.product,
      quantity: parseInt(form.quantity) || 0,
      expectedDate: form.expectedDate || "TBD",
      location: form.location,
      status: "Pending",
    };
    setReceipts([newR, ...receipts]);
    setModalOpen(false);
    setForm({ supplier: "", product: PRODUCTS[0], quantity: "", expectedDate: "", location: LOCATIONS[0], notes: "" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-56">
          <Search size={14} className="text-gray-400 flex-shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search receipts…" className="border-none outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent flex-1" />
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={15} /> New Receipt
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Receipt #", "Supplier", "Product", "Qty", "Expected Date", "Location", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-sm text-gray-900">{r.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.supplier}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.product}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{r.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{r.expectedDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{r.location}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant(r.status)}>{r.status}</Badge></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-gray-400">No receipts found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Receipt">
        <FormField label="Supplier"><Input placeholder="Supplier or vendor name" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} /></FormField>
        <div className="grid grid-cols-2 gap-x-3">
          <FormField label="Product">
            <Select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
              {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
            </Select>
          </FormField>
          <FormField label="Quantity"><Input type="number" placeholder="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /></FormField>
          <FormField label="Expected Date"><Input type="date" value={form.expectedDate} onChange={(e) => setForm({ ...form, expectedDate: e.target.value })} /></FormField>
          <FormField label="Location">
            <Select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </Select>
          </FormField>
        </div>
        <FormField label="Notes"><Textarea rows={2} placeholder="Optional notes…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></FormField>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}><Plus size={14} /> Create Receipt</Button>
        </div>
      </Modal>
    </div>
  );
}
