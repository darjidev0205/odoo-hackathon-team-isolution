"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormField, Input, Select } from "@/components/ui/FormField";
import { deliveries as initialDeliveries, type Delivery } from "@/lib/mockData";

const statusVariant = (s: string) => {
  if (s === "Delivered") return "green";
  if (s === "Shipped") return "blue";
  if (s === "Pending") return "amber";
  return "red";
};

const PRODUCTS = ["Wireless Keyboard", 'Monitor 27"', "Office Chair Pro", "USB Hub 7-Port", "Laptop Stand", "Standing Desk"];

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ customer: "", product: PRODUCTS[0], quantity: "", address: "", shipDate: "", priority: "Standard" });

  const filtered = deliveries.filter(
    (d) =>
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.customer.toLowerCase().includes(search.toLowerCase()) ||
      d.product.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const newD: Delivery = {
      id: `DEL-${String(deliveries.length + 1).padStart(3, "0")}`,
      customer: form.customer || "Unknown Customer",
      product: form.product,
      quantity: parseInt(form.quantity) || 0,
      shipDate: form.shipDate || "TBD",
      address: form.address || "—",
      status: "Pending",
    };
    setDeliveries([newD, ...deliveries]);
    setModalOpen(false);
    setForm({ customer: "", product: PRODUCTS[0], quantity: "", address: "", shipDate: "", priority: "Standard" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-56">
          <Search size={14} className="text-gray-400 flex-shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search delivery orders…" className="border-none outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent flex-1" />
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={15} /> New Delivery
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Order #", "Customer", "Product", "Qty", "Ship Date", "Address", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-sm text-gray-900">{d.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{d.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{d.product}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{d.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{d.shipDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{d.address}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant(d.status)}>{d.status}</Badge></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-gray-400">No deliveries found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Delivery Order">
        <FormField label="Customer Name"><Input placeholder="Customer or company name" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} /></FormField>
        <div className="grid grid-cols-2 gap-x-3">
          <FormField label="Product">
            <Select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
              {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
            </Select>
          </FormField>
          <FormField label="Quantity"><Input type="number" placeholder="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /></FormField>
        </div>
        <FormField label="Delivery Address"><Input placeholder="Full shipping address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></FormField>
        <div className="grid grid-cols-2 gap-x-3">
          <FormField label="Ship Date"><Input type="date" value={form.shipDate} onChange={(e) => setForm({ ...form, shipDate: e.target.value })} /></FormField>
          <FormField label="Priority">
            <Select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              {["Standard", "Express", "Overnight"].map((p) => <option key={p}>{p}</option>)}
            </Select>
          </FormField>
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}><Plus size={14} /> Create Order</Button>
        </div>
      </Modal>
    </div>
  );
}
