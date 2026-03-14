"use client";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/products": "Products",
  "/dashboard/receipts": "Receipts",
  "/dashboard/deliveries": "Delivery Orders",
  "/dashboard/transfers": "Internal Transfers",
  "/dashboard/adjustment": "Inventory Adjustment",
  "/dashboard/history": "Move History",
  "/dashboard/warehouse": "Warehouse",
  "/dashboard/profile": "Profile",
};

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="text-base font-bold text-gray-900 leading-none">{title}</h1>
          <p className="text-xs text-gray-400 mt-0.5">InvenPro / {title}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
          <Search size={16} />
        </button>
        <button className="relative w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold cursor-pointer">
          AK
        </div>
      </div>
    </header>
  );
}
