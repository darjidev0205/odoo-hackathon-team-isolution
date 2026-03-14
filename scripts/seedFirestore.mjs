// scripts/seedFirestore.mjs
// ─────────────────────────────────────────────────────────────
// Run this ONE TIME to load your mock data into Firestore.
//
// HOW TO RUN:
//   node scripts/seedFirestore.mjs
//
// BEFORE RUNNING:
//   1. npm install firebase
//   2. Replace the firebaseConfig values with your own
// ─────────────────────────────────────────────────────────────

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// ⚠️  PASTE YOUR FIREBASE CONFIG HERE  ⚠️
const firebaseConfig = {
  apiKey: "AIzaSyDg2ZmdAXUm1GIyqu3R3g09n0mjM0za1tE",
  authDomain: "odoo-hackathon-50dec.firebaseapp.com",
  projectId: "odoo-hackathon-50dec",
  storageBucket: "odoo-hackathon-50dec.firebasestorage.app",
  messagingSenderId: "322591866415",
  appId: "1:322591866415:web:25090c62eb2edca2e190da",
  measurementId: "G-CC085G7SK1"
};


const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── SEED DATA ─────────────────────────────────────────────────

const products = [
  { name: "Wireless Keyboard", sku: "WK-2201", category: "Electronics", stock: 187, location: "Warehouse A", price: 49.99, status: "In Stock" },
  { name: 'Monitor 27"',       sku: "MN-2702", category: "Electronics", stock: 42,  location: "Cold Storage", price: 329.99, status: "In Stock" },
  { name: "Office Chair Pro",  sku: "OC-5501", category: "Furniture",    stock: 28,  location: "Warehouse B", price: 249.99, status: "Low Stock" },
  { name: "USB Hub 7-Port",    sku: "UH-0701", category: "Accessories",  stock: 320, location: "Store Front", price: 29.99,  status: "In Stock" },
  { name: "Laptop Stand",      sku: "LS-1101", category: "Accessories",  stock: 80,  location: "Warehouse B", price: 39.99,  status: "In Stock" },
  { name: "Standing Desk",     sku: "SD-7701", category: "Furniture",    stock: 8,   location: "Warehouse A", price: 549.99, status: "Low Stock" },
  { name: "Desk Organizer",    sku: "DO-3301", category: "Office Supplies", stock: 140, location: "Warehouse A", price: 19.99, status: "In Stock" },
  { name: "Webcam HD Pro",     sku: "WC-4401", category: "Electronics",  stock: 0,   location: "Warehouse B", price: 89.99,  status: "Out of Stock" },
];

const receipts = [
  { supplier: "TechSupply Co.", product: "Wireless Keyboard", quantity: 200, expectedDate: "Jan 15, 2025", location: "Warehouse A", status: "Received" },
  { supplier: "OfficeMart",     product: "Office Chair Pro",  quantity: 50,  expectedDate: "Jan 16, 2025", location: "Warehouse B", status: "Pending" },
  { supplier: "GlobalElec Ltd.",product: 'Monitor 27"',       quantity: 30,  expectedDate: "Jan 17, 2025", location: "Cold Storage", status: "Pending" },
  { supplier: "FurniCorp",      product: "Standing Desk",     quantity: 15,  expectedDate: "Jan 18, 2025", location: "Warehouse A", status: "In Transit" },
];

const deliveries = [
  { customer: "Acme Corp",       product: "Wireless Keyboard", quantity: 12, shipDate: "Jan 14, 2025", address: "123 Main St, New York, NY",       status: "Shipped" },
  { customer: "Bright Solutions",product: 'Monitor 27"',       quantity: 5,  shipDate: "Jan 15, 2025", address: "456 Oak Ave, San Francisco, CA",  status: "Pending" },
  { customer: "TechStart LLC",   product: "Office Chair Pro",  quantity: 8,  shipDate: "Jan 16, 2025", address: "789 Pine Rd, Austin, TX",         status: "Pending" },
  { customer: "Global Ventures", product: "USB Hub 7-Port",    quantity: 25, shipDate: "Jan 13, 2025", address: "321 Elm St, Miami, FL",           status: "Delivered" },
];

const transfers = [
  { product: "USB Hub 7-Port",   from: "Warehouse A", to: "Warehouse B", quantity: 30, status: "In Transit" },
  { product: "Desk Organizer",   from: "Warehouse B", to: "Store Front", quantity: 20, status: "Completed" },
  { product: "Wireless Keyboard",from: "Cold Storage",to: "Warehouse A", quantity: 50, status: "Completed" },
];

const warehouses = [
  { name: "Warehouse A", address: "456 Industrial Blvd, Chicago, IL 60601", capacity: 5000, used: 312, type: "Standard",     status: "Active" },
  { name: "Warehouse B", address: "789 Freight Ave, Dallas, TX 75201",      capacity: 3500, used: 241, type: "Standard",     status: "Active" },
  { name: "Cold Storage",address: "123 Cryo Ln, Seattle, WA 98101",         capacity: 1200, used: 1056,type: "Cold Storage", status: "Near Full" },
  { name: "Store Front", address: "321 Retail Row, New York, NY 10001",     capacity: 800,  used: 188, type: "Retail Front", status: "Active" },
];

const moveHistory = [
  { type: "Transfer",   product: "USB Hub 7-Port",   from: "Warehouse A", to: "Warehouse B", quantity: 30,  user: "Alex K." },
  { type: "Receipt",    product: "Office Chair Pro",  from: "Supplier",    to: "Warehouse A", quantity: 50,  user: "Maria S." },
  { type: "Delivery",   product: "Wireless Keyboard", from: "Store Front", to: "Customer",    quantity: 12,  user: "Alex K." },
  { type: "Adjustment", product: "Laptop Stand",       from: "Warehouse B", to: "—",           quantity: -3,  user: "John D." },
];

// ── SEED FUNCTION ─────────────────────────────────────────────

async function seedCollection(name, items) {
  console.log(`\nSeeding "${name}"...`);
  for (const item of items) {
    await addDoc(collection(db, name), { ...item, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    process.stdout.write(".");
  }
  console.log(` ✅ ${items.length} documents added`);
}

async function main() {
  console.log("🚀 Starting Firestore seed...");
  try {
    await seedCollection("products",    products);
    await seedCollection("receipts",    receipts);
    await seedCollection("deliveries",  deliveries);
    await seedCollection("transfers",   transfers);
    await seedCollection("warehouses",  warehouses);
    await seedCollection("moveHistory", moveHistory);
    console.log("\n✅ All done! Your Firestore database is loaded.\n");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
  process.exit(0);
}

main();
