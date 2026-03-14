"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard, Package, FileText, Truck, ArrowLeftRight,
  ClipboardEdit, History, Warehouse, User, LogOut, X,
} from "lucide-react";

const navItems = [
  { label: "Overview", items: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ]},
  { label: "Inventory", items: [
    { href: "/dashboard/products", label: "Products", icon: Package },
    { href: "/dashboard/adjustment", label: "Inventory Adjustment", icon: ClipboardEdit },
    { href: "/dashboard/history", label: "Move History", icon: History, badge: "24" },
  ]},
  { label: "Operations", items: [
    { href: "/dashboard/receipts", label: "Receipts", icon: FileText, badge: "3" },
    { href: "/dashboard/deliveries", label: "Delivery Orders", icon: Truck },
    { href: "/dashboard/transfers", label: "Internal Transfers", icon: ArrowLeftRight },
  ]},
  { label: "Settings", items: [
    { href: "/dashboard/warehouse", label: "Warehouse", icon: Warehouse },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ]},
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={clsx(
        "fixed lg:static inset-y-0 left-0 z-50 w-60 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">IN</div>
            <div>
              <div className="font-bold text-gray-900 text-sm">InvenPro</div>
              <div className="text-xs text-gray-400">v2.4 · Admin</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navItems.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-1.5">
                {section.label}
              </p>
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all mb-0.5",
                      active
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon size={16} className="flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-indigo-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-2 py-3 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
}
