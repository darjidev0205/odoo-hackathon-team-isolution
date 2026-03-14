// ─── TYPES ────────────────────────────────────────────────────────────────────

export type Status = "In Stock" | "Low Stock" | "Out of Stock";
export type ReceiptStatus = "Received" | "Pending" | "In Transit" | "Cancelled";
export type DeliveryStatus = "Shipped" | "Pending" | "Delivered" | "Cancelled";
export type TransferStatus = "In Transit" | "Completed" | "Pending";
export type MoveType = "Transfer" | "Receipt" | "Delivery" | "Adjustment";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  location: string;
  price: number;
  status: Status;
  description?: string;
}

export interface Receipt {
  id: string;
  supplier: string;
  product: string;
  quantity: number;
  expectedDate: string;
  location: string;
  status: ReceiptStatus;
}

export interface Delivery {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  shipDate: string;
  address: string;
  status: DeliveryStatus;
}

export interface Transfer {
  id: string;
  product: string;
  from: string;
  to: string;
  quantity: number;
  initiated: string;
  status: TransferStatus;
}

export interface Adjustment {
  id: string;
  product: string;
  location: string;
  systemQty: number;
  countedQty: number;
  difference: number;
  reason: string;
  date: string;
}

export interface MoveHistory {
  id: string;
  type: MoveType;
  product: string;
  from: string;
  to: string;
  quantity: number;
  user: string;
  dateTime: string;
}

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  capacity: number;
  used: number;
  type: string;
  status: string;
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export const products: Product[] = [
  { id: "p1", name: "Wireless Keyboard", sku: "WK-2201", category: "Electronics", stock: 187, location: "Warehouse A", price: 49.99, status: "In Stock" },
  { id: "p2", name: 'Monitor 27"', sku: "MN-2702", category: "Electronics", stock: 42, location: "Cold Storage", price: 329.99, status: "In Stock" },
  { id: "p3", name: "Office Chair Pro", sku: "OC-5501", category: "Furniture", stock: 28, location: "Warehouse B", price: 249.99, status: "Low Stock" },
  { id: "p4", name: "USB Hub 7-Port", sku: "UH-0701", category: "Accessories", stock: 320, location: "Store Front", price: 29.99, status: "In Stock" },
  { id: "p5", name: "Laptop Stand", sku: "LS-1101", category: "Accessories", stock: 80, location: "Warehouse B", price: 39.99, status: "In Stock" },
  { id: "p6", name: "Standing Desk", sku: "SD-7701", category: "Furniture", stock: 8, location: "Warehouse A", price: 549.99, status: "Low Stock" },
  { id: "p7", name: "Desk Organizer", sku: "DO-3301", category: "Office Supplies", stock: 140, location: "Warehouse A", price: 19.99, status: "In Stock" },
  { id: "p8", name: "Webcam HD Pro", sku: "WC-4401", category: "Electronics", stock: 0, location: "Warehouse B", price: 89.99, status: "Out of Stock" },
  { id: "p9", name: "Mechanical Mouse", sku: "MM-5502", category: "Electronics", stock: 95, location: "Store Front", price: 59.99, status: "In Stock" },
  { id: "p10", name: "Ergonomic Pad", sku: "EP-0901", category: "Office Supplies", stock: 12, location: "Cold Storage", price: 14.99, status: "Low Stock" },
  { id: "p11", name: "Cable Management Kit", sku: "CM-1201", category: "Accessories", stock: 55, location: "Warehouse A", price: 24.99, status: "In Stock" },
  { id: "p12", name: "Monitor Arm", sku: "MA-3301", category: "Accessories", stock: 18, location: "Warehouse B", price: 79.99, status: "Low Stock" },
];

// ─── RECEIPTS ─────────────────────────────────────────────────────────────────

export const receipts: Receipt[] = [
  { id: "REC-001", supplier: "TechSupply Co.", product: "Wireless Keyboard", quantity: 200, expectedDate: "Jan 15, 2025", location: "Warehouse A", status: "Received" },
  { id: "REC-002", supplier: "OfficeMart", product: "Office Chair Pro", quantity: 50, expectedDate: "Jan 16, 2025", location: "Warehouse B", status: "Pending" },
  { id: "REC-003", supplier: "GlobalElec Ltd.", product: 'Monitor 27"', quantity: 30, expectedDate: "Jan 17, 2025", location: "Cold Storage", status: "Pending" },
  { id: "REC-004", supplier: "FurniCorp", product: "Standing Desk", quantity: 15, expectedDate: "Jan 18, 2025", location: "Warehouse A", status: "In Transit" },
  { id: "REC-005", supplier: "TechSupply Co.", product: "USB Hub 7-Port", quantity: 300, expectedDate: "Jan 19, 2025", location: "Store Front", status: "Received" },
  { id: "REC-006", supplier: "AccessPro", product: "Laptop Stand", quantity: 80, expectedDate: "Jan 20, 2025", location: "Warehouse B", status: "Cancelled" },
];

// ─── DELIVERIES ───────────────────────────────────────────────────────────────

export const deliveries: Delivery[] = [
  { id: "DEL-001", customer: "Acme Corp", product: "Wireless Keyboard", quantity: 12, shipDate: "Jan 14, 2025", address: "123 Main St, New York, NY", status: "Shipped" },
  { id: "DEL-002", customer: "Bright Solutions", product: 'Monitor 27"', quantity: 5, shipDate: "Jan 15, 2025", address: "456 Oak Ave, San Francisco, CA", status: "Pending" },
  { id: "DEL-003", customer: "TechStart LLC", product: "Office Chair Pro", quantity: 8, shipDate: "Jan 16, 2025", address: "789 Pine Rd, Austin, TX", status: "Pending" },
  { id: "DEL-004", customer: "Global Ventures", product: "USB Hub 7-Port", quantity: 25, shipDate: "Jan 13, 2025", address: "321 Elm St, Miami, FL", status: "Delivered" },
  { id: "DEL-005", customer: "CityOffice Inc", product: "Laptop Stand", quantity: 10, shipDate: "Jan 17, 2025", address: "654 Birch Ln, Seattle, WA", status: "Delivered" },
  { id: "DEL-006", customer: "NextGen Corp", product: "Standing Desk", quantity: 3, shipDate: "Jan 18, 2025", address: "987 Maple Dr, Chicago, IL", status: "Cancelled" },
];

// ─── TRANSFERS ────────────────────────────────────────────────────────────────

export const transfers: Transfer[] = [
  { id: "TRF-001", product: "USB Hub 7-Port", from: "Warehouse A", to: "Warehouse B", quantity: 30, initiated: "Jan 14, 2025", status: "In Transit" },
  { id: "TRF-002", product: "Desk Organizer", from: "Warehouse B", to: "Store Front", quantity: 20, initiated: "Jan 13, 2025", status: "Completed" },
  { id: "TRF-003", product: "Wireless Keyboard", from: "Cold Storage", to: "Warehouse A", quantity: 50, initiated: "Jan 12, 2025", status: "Completed" },
  { id: "TRF-004", product: 'Monitor 27"', from: "Warehouse A", to: "Store Front", quantity: 8, initiated: "Jan 15, 2025", status: "Pending" },
  { id: "TRF-005", product: "Office Chair Pro", from: "Warehouse B", to: "Cold Storage", quantity: 12, initiated: "Jan 11, 2025", status: "Completed" },
];

// ─── ADJUSTMENTS ──────────────────────────────────────────────────────────────

export const adjustments: Adjustment[] = [
  { id: "ADJ-001", product: "Laptop Stand", location: "Warehouse B", systemQty: 83, countedQty: 80, difference: -3, reason: "Damaged goods", date: "Jan 14, 2025" },
  { id: "ADJ-002", product: "USB Hub 7-Port", location: "Store Front", systemQty: 95, countedQty: 100, difference: 5, reason: "Recount error", date: "Jan 13, 2025" },
  { id: "ADJ-003", product: "Desk Organizer", location: "Warehouse A", systemQty: 152, countedQty: 140, difference: -12, reason: "Theft / Shrinkage", date: "Jan 12, 2025" },
  { id: "ADJ-004", product: "Office Chair Pro", location: "Warehouse B", systemQty: 28, countedQty: 30, difference: 2, reason: "Vendor over-ship", date: "Jan 11, 2025" },
  { id: "ADJ-005", product: "Wireless Keyboard", location: "Cold Storage", systemQty: 210, countedQty: 205, difference: -5, reason: "Damaged in transit", date: "Jan 10, 2025" },
];

// ─── MOVE HISTORY ─────────────────────────────────────────────────────────────

export const moveHistory: MoveHistory[] = [
  { id: "H1", type: "Transfer", product: "USB Hub 7-Port", from: "Warehouse A", to: "Warehouse B", quantity: 30, user: "Alex K.", dateTime: "Jan 14 · 09:32" },
  { id: "H2", type: "Receipt", product: "Office Chair Pro", from: "Supplier", to: "Warehouse A", quantity: 50, user: "Maria S.", dateTime: "Jan 14 · 08:15" },
  { id: "H3", type: "Delivery", product: "Wireless Keyboard", from: "Store Front", to: "Customer", quantity: 12, user: "Alex K.", dateTime: "Jan 13 · 16:44" },
  { id: "H4", type: "Adjustment", product: "Laptop Stand", from: "Warehouse B", to: "—", quantity: -3, user: "John D.", dateTime: "Jan 13 · 14:22" },
  { id: "H5", type: "Receipt", product: 'Monitor 27"', from: "Supplier", to: "Cold Storage", quantity: 20, user: "Maria S.", dateTime: "Jan 12 · 11:05" },
  { id: "H6", type: "Transfer", product: "Desk Organizer", from: "Warehouse B", to: "Store Front", quantity: 20, user: "John D.", dateTime: "Jan 12 · 10:30" },
  { id: "H7", type: "Delivery", product: "USB Hub 7-Port", from: "Store Front", to: "Customer", quantity: 25, user: "Alex K.", dateTime: "Jan 11 · 15:18" },
  { id: "H8", type: "Adjustment", product: "Desk Organizer", from: "Warehouse A", to: "—", quantity: -12, user: "Maria S.", dateTime: "Jan 11 · 09:45" },
];

// ─── WAREHOUSES ───────────────────────────────────────────────────────────────

export const warehouses: Warehouse[] = [
  { id: "wh1", name: "Warehouse A", address: "456 Industrial Blvd, Chicago, IL 60601", capacity: 5000, used: 312, type: "Standard", status: "Active" },
  { id: "wh2", name: "Warehouse B", address: "789 Freight Ave, Dallas, TX 75201", capacity: 3500, used: 241, type: "Standard", status: "Active" },
  { id: "wh3", name: "Cold Storage", address: "123 Cryo Ln, Seattle, WA 98101", capacity: 1200, used: 1056, type: "Cold Storage", status: "Near Full" },
  { id: "wh4", name: "Store Front", address: "321 Retail Row, New York, NY 10001", capacity: 800, used: 188, type: "Retail Front", status: "Active" },
];

// ─── KPI DATA ─────────────────────────────────────────────────────────────────

export const kpiData = {
  totalProducts: 847,
  lowStockItems: 23,
  pendingReceipts: 18,
  pendingDeliveries: 31,
  internalTransfers: 7,
};

export const chartData = [
  { label: "Elec.", value: 72 },
  { label: "Furn.", value: 36 },
  { label: "Office", value: 58 },
  { label: "Access.", value: 89 },
  { label: "Other", value: 24 },
];

export const recentActivity = [
  { type: "Receipt", product: "Office Chair Pro", location: "Warehouse A", qty: "+50", time: "2 min ago", status: "Completed" },
  { type: "Delivery", product: "Wireless Keyboard", location: "Store Front", qty: "-12", time: "15 min ago", status: "Shipped" },
  { type: "Transfer", product: "USB Hub 7-Port", location: "WH-A → WH-B", qty: "30", time: "1 hr ago", status: "In Transit" },
  { type: "Adjustment", product: "Laptop Stand", location: "Warehouse B", qty: "-3", time: "2 hrs ago", status: "Adjusted" },
  { type: "Receipt", product: 'Monitor 27"', location: "Cold Storage", qty: "+20", time: "3 hrs ago", status: "Completed" },
  { type: "Delivery", product: "Desk Organizer", location: "Store Front", qty: "-8", time: "4 hrs ago", status: "Pending" },
];

export const CATEGORIES = ["Electronics", "Furniture", "Office Supplies", "Accessories"];
export const LOCATIONS = ["Warehouse A", "Warehouse B", "Cold Storage", "Store Front"];
export const UNITS = ["Piece", "Box", "Set", "Kg"];
export const REASONS = ["Damaged goods", "Recount error", "Theft / Shrinkage", "Vendor over-ship", "Damaged in transit", "Other"];
