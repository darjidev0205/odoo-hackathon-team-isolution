"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormField, Input, Select, Textarea } from "@/components/ui/FormField";
import { transfers as initialTransfers, LOCATIONS, type Transfer } from "@/lib/mockData";

const statusVariant = (s: string) => {
  if (s === "Completed") return "green";
  if (s === "In Transit") return "amber";
  return "blue";
};

const PRODUCTS = ["Wireless Keyboard", 'Monitor 27"', "Office Chair Pro", "USB Hub 7-Port", "Laptop Stand", "Desk Organizer"];

export default function TransfersPage() {
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ product: PRODUCTS[0], from: LOCATIONS[0], to: LOCATIONS[1], quantity: "", notes: "" });

  const filtered = transfers.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.product.toLowerCase().includes(search.toLowerCase()) ||
      t.from.toLowerCase().includes(search.toLowerCase()) ||
      t.to.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const newT: Transfer = {
      id: `TRF-${String(transfers.length + 1).padStart(3, "0")}`,
      product: form.product,
      from: form.from,
      to: form.to,
      quantity: parseInt(form.quantity) || 0,
      initiated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Pending",
    };
    setTransfers([newT, ...transfers]);
    setModalOpen(false);
    setForm({ product: PRODUCTS[0], from: LOCATIONS[0], to: LOCATIONS[1], quantity: "", notes: "" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-56">
          <Search size={14} className="text-gray-400 flex-shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transfers…" className="border-none outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent flex-1" />
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={15} /> New Transfer
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Transfer #", "Product", "From", "To", "Qty", "Initiated", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-sm text-gray-900">{t.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.from}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.to}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{t.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.initiated}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant(t.status)}>{t.status}</Badge></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-gray-400">No transfers found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Internal Transfer">
        <div className="grid grid-cols-2 gap-x-3">
          <FormField label="From Location">
            <Select value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })}>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </Select>
          </FormField>
          <FormField label="To Location">
            <Select value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })}>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </Select>
          </FormField>
          <FormField label="Product">
            <Select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
              {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
            </Select>
          </FormField>
          <FormField label="Quantity"><Input type="number" placeholder="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /></FormField>
        </div>
        <FormField label="Reason / Notes"><Textarea rows={2} placeholder="Reason for this transfer…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></FormField>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}><Plus size={14} /> Initiate Transfer</Button>
        </div>
      </Modal>
    </div>
  );
}
