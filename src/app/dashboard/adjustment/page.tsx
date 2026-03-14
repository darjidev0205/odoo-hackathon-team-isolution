"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormField, Input, Select, Textarea } from "@/components/ui/FormField";
import { adjustments as initialAdjustments, LOCATIONS, REASONS, type Adjustment } from "@/lib/mockData";

const PRODUCTS = ["Wireless Keyboard", 'Monitor 27"', "Office Chair Pro", "USB Hub 7-Port", "Laptop Stand", "Desk Organizer"];

export default function AdjustmentPage() {
  const [adjustments, setAdjustments] = useState<Adjustment[]>(initialAdjustments);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ product: PRODUCTS[0], location: LOCATIONS[0], systemQty: "", countedQty: "", reason: REASONS[0], notes: "" });

  const handleAdd = () => {
    const sys = parseInt(form.systemQty) || 0;
    const cnt = parseInt(form.countedQty) || 0;
    const newA: Adjustment = {
      id: `ADJ-${String(adjustments.length + 1).padStart(3, "0")}`,
      product: form.product,
      location: form.location,
      systemQty: sys,
      countedQty: cnt,
      difference: cnt - sys,
      reason: form.reason,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setAdjustments([newA, ...adjustments]);
    setModalOpen(false);
    setForm({ product: PRODUCTS[0], location: LOCATIONS[0], systemQty: "", countedQty: "", reason: REASONS[0], notes: "" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <p className="text-sm text-gray-500">Manually correct stock counts after physical inventory checks.</p>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={15} /> New Adjustment
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Adj #", "Product", "Location", "System Qty", "Counted Qty", "Difference", "Reason", "Date"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adjustments.map((a) => (
                <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-sm text-gray-900">{a.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{a.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{a.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{a.systemQty}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{a.countedQty}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${a.difference > 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {a.difference > 0 ? `+${a.difference}` : a.difference}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{a.reason}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Inventory Adjustment">
        <div className="grid grid-cols-2 gap-x-3">
          <FormField label="Product">
            <Select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
              {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
            </Select>
          </FormField>
          <FormField label="Location">
            <Select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </Select>
          </FormField>
          <FormField label="System Qty"><Input type="number" placeholder="Current system count" value={form.systemQty} onChange={(e) => setForm({ ...form, systemQty: e.target.value })} /></FormField>
          <FormField label="Counted Qty"><Input type="number" placeholder="Physical count" value={form.countedQty} onChange={(e) => setForm({ ...form, countedQty: e.target.value })} /></FormField>
        </div>
        {form.systemQty && form.countedQty && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm">
            Difference:{" "}
            <span className={`font-bold ${parseInt(form.countedQty) - parseInt(form.systemQty) >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {parseInt(form.countedQty) - parseInt(form.systemQty) >= 0 ? "+" : ""}
              {parseInt(form.countedQty) - parseInt(form.systemQty)}
            </span>
          </div>
        )}
        <FormField label="Reason">
          <Select value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}>
            {REASONS.map((r) => <option key={r}>{r}</option>)}
          </Select>
        </FormField>
        <FormField label="Notes"><Textarea rows={2} placeholder="Additional context…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></FormField>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}><Plus size={14} /> Submit Adjustment</Button>
        </div>
      </Modal>
    </div>
  );
}
