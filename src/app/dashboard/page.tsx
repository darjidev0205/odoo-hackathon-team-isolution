import { Package, AlertTriangle, FileText, Truck, ArrowLeftRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { kpiData, chartData, recentActivity } from "@/lib/mockData";

const kpiCards = [
  { label: "Total Products", value: kpiData.totalProducts, icon: Package, color: "blue", trend: "↑ 12 added this week", trendUp: true },
  { label: "Low Stock Items", value: kpiData.lowStockItems, icon: AlertTriangle, color: "red", trend: "↑ 5 from yesterday", trendUp: false },
  { label: "Pending Receipts", value: kpiData.pendingReceipts, icon: FileText, color: "amber", trend: "3 awaiting today", trendUp: null },
  { label: "Pending Deliveries", value: kpiData.pendingDeliveries, icon: Truck, color: "green", trend: "8 shipped today", trendUp: true },
  { label: "Internal Transfers", value: kpiData.internalTransfers, icon: ArrowLeftRight, color: "purple", trend: "2 in transit", trendUp: null },
];

const iconBg: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-600",
  amber: "bg-amber-100 text-amber-600",
  green: "bg-emerald-100 text-emerald-600",
  purple: "bg-indigo-100 text-indigo-600",
};

const activityBadge = (status: string) => {
  if (["Completed", "Delivered"].includes(status)) return <Badge variant="green">{status}</Badge>;
  if (["Shipped"].includes(status)) return <Badge variant="blue">{status}</Badge>;
  if (["In Transit", "Pending"].includes(status)) return <Badge variant="amber">{status}</Badge>;
  return <Badge variant="gray">{status}</Badge>;
};

const typeBadge = (type: string) => {
  if (type === "Receipt") return <Badge variant="purple">{type}</Badge>;
  if (type === "Delivery") return <Badge variant="blue">{type}</Badge>;
  if (type === "Transfer") return <Badge variant="amber">{type}</Badge>;
  return <Badge variant="gray">{type}</Badge>;
};

const maxVal = Math.max(...chartData.map((d) => d.value));

export default function DashboardPage() {
  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {kpiCards.map((card) => (
          <div key={card.label} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-medium text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg[card.color]}`}>
                <card.icon size={20} />
              </div>
            </div>
            <p className={`text-xs font-semibold ${card.trendUp === true ? "text-emerald-600" : card.trendUp === false ? "text-red-500" : "text-gray-400"}`}>
              {card.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Stock by Category</h2>
            <span className="text-xs text-gray-400">This month</span>
          </div>
          <div className="flex items-end gap-3 h-32">
            {chartData.map((d) => {
              const pct = Math.round((d.value / maxVal) * 100);
              return (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-indigo-50 rounded-t-md overflow-hidden" style={{ height: "120px" }}>
                    <div
                      className="w-full bg-indigo-500 rounded-t-md transition-all"
                      style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{d.label}</span>
                  <span className="text-xs font-semibold text-gray-700">{d.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inventory Health */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Inventory Health</h2>
          {[
            { label: "In Stock", pct: 72, color: "bg-emerald-500" },
            { label: "Low Stock", pct: 18, color: "bg-amber-400" },
            { label: "Out of Stock", pct: 10, color: "bg-red-500" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-500 w-28">{row.label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
              </div>
              <span className="text-sm font-bold text-gray-900 w-10 text-right">{row.pct}%</span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Top Locations</p>
            <div className="flex flex-wrap gap-2">
              {["Warehouse A · 312", "Warehouse B · 241", "Store Front · 188", "Cold Storage · 106"].map((t) => (
                <span key={t} className="text-xs bg-gray-100 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-md font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">Recent Activity</h2>
          <span className="text-xs text-gray-400">Last 24 hours</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {["Type", "Product", "Location", "Qty", "Time", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((row, i) => (
                <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">{typeBadge(row.type)}</td>
                  <td className="px-5 py-3 font-semibold text-sm text-gray-900">{row.product}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{row.location}</td>
                  <td className={`px-5 py-3 text-sm font-bold ${row.qty.startsWith("+") ? "text-emerald-600" : row.qty.startsWith("-") ? "text-red-500" : "text-gray-900"}`}>
                    {row.qty}
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">{row.time}</td>
                  <td className="px-5 py-3">{activityBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
