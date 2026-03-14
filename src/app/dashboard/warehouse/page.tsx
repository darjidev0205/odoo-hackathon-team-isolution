"use client";
import { useState } from "react";
import { Plus, Warehouse as WarehouseIcon } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FormField, Input, Select } from "@/components/ui/FormField";
import { warehouses as initialWarehouses, type Warehouse } from "@/lib/mockData";

const capacityColor = (pct: number) => {
  if (pct >= 85) return "bg-red-500";
  if (pct >= 65) return "bg-amber-400";
  return "bg-emerald-500";
};

const statusVariant = (s: string) =>
  s === "Active" ? "green" : s === "Near Full" ? "amber" : "red";

const iconColors = [
  "bg-indigo-100 text-indigo-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-blue-100 text-blue-600",
];

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", capacity: "", type: "Standard" });

  const handleAdd = () => {
    const cap = parseInt(form.capacity) || 0;
    const newW: Warehouse = {
      id: `wh${Date.now()}`,
      name: form.name || "New Warehouse",
      address: form.address || "—",
      capacity: cap,
      used: 0,
      type: form.type,
      status: "Active",
    };
    setWarehouses([...warehouses, newW]);
    setModalOpen(false);
    setForm({ name: "", address: "", capacity: "", type: "Standard" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <p className="text-sm text-gray-500">Manage warehouse locations and storage capacity.</p>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={15} /> Add Warehouse
        </Button>
      </div>

      <div className="space-y-3">
        {warehouses.map((wh, i) => {
          const pct = wh.capacity > 0 ? Math.round((wh.used / wh.capacity) * 100) : 0;
          return (
            <div key={wh.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-5 hover:shadow-sm transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColors[i % iconColors.length]}`}>
                <WarehouseIcon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-gray-900">{wh.name}</h3>
                  <Badge variant={statusVariant(wh.status)}>{wh.status}</Badge>
                  <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md">{wh.type}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{wh.address}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${capacityColor(pct)}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {wh.used.toLocaleString()} / {wh.capacity.toLocaleString()} units
                  </span>
                  <span className={`text-xs font-bold ${pct >= 85 ? "text-red-600" : pct >= 65 ? "text-amber-600" : "text-gray-900"}`}>
                    {pct}%
                  </span>
                </div>
              </div>
              <Button variant="secondary" size="sm">Edit</Button>
            </div>
          );
        })}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Warehouse">
        <FormField label="Warehouse Name"><Input placeholder="e.g. Warehouse C" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></FormField>
        <FormField label="Address"><Input placeholder="Full address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></FormField>
        <div className="grid grid-cols-2 gap-x-3">
          <FormField label="Capacity (units)"><Input type="number" placeholder="0" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></FormField>
          <FormField label="Type">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {["Standard", "Cold Storage", "Retail Front"].map((t) => <option key={t}>{t}</option>)}
            </Select>
          </FormField>
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}><Plus size={14} /> Add Warehouse</Button>
        </div>
      </Modal>
    </div>
  );
}
