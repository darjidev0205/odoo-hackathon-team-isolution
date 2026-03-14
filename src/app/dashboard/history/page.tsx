"use client";
import { useState } from "react";
import { Search, Download } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { moveHistory } from "@/lib/mockData";
import type { MoveType } from "@/lib/mockData";

const typeBadgeVariant = (t: MoveType) => {
  if (t === "Transfer") return "purple";
  if (t === "Receipt") return "green";
  if (t === "Delivery") return "blue";
  return "amber";
};

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = moveHistory.filter(
    (h) =>
      (h.product.toLowerCase().includes(search.toLowerCase()) ||
        h.from.toLowerCase().includes(search.toLowerCase()) ||
        h.to.toLowerCase().includes(search.toLowerCase()) ||
        h.user.toLowerCase().includes(search.toLowerCase())) &&
      (!typeFilter || h.type === typeFilter)
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-56">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search history…" className="border-none outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent flex-1" />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Types</option>
            {["Transfer", "Receipt", "Delivery", "Adjustment"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <Button variant="secondary">
          <Download size={15} /> Export CSV
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Type", "Product", "From", "To", "Qty", "User", "Date & Time"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3"><Badge variant={typeBadgeVariant(h.type as MoveType)}>{h.type}</Badge></td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{h.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{h.from}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{h.to}</td>
                  <td className={`px-4 py-3 text-sm font-bold ${h.quantity < 0 ? "text-red-600" : "text-gray-900"}`}>
                    {h.quantity > 0 ? `+${h.quantity}` : h.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{h.user}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{h.dateTime}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-gray-400">No history found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
