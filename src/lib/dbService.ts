// src/lib/dbService.ts
// ─────────────────────────────────────────────────────────────
// This file talks to Firestore (your database).
// Each function does one job: Create, Read, Update, or Delete.
//
// Firestore stores data in "collections" (like tables in SQL).
// Each item in a collection is a "document" (like a row).
//
// Collections we use:
//   products, receipts, deliveries, transfers, adjustments,
//   moveHistory, warehouses
// ─────────────────────────────────────────────────────────────

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
  type DocumentData,
  type QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// ════════════════════════════════════════════════════════════════
// GENERIC HELPERS  (used by all the specific functions below)
// ════════════════════════════════════════════════════════════════

/** Add a new document to any collection. Returns the new doc's ID. */
export async function addDocument(collectionName: string, data: object): Promise<string> {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(), // auto-set creation time
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Get all documents from a collection, newest first. */
export async function getAll(collectionName: string): Promise<DocumentData[]> {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/** Get a single document by its ID. */
export async function getById(collectionName: string, id: string): Promise<DocumentData | null> {
  const snap = await getDoc(doc(db, collectionName, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Update specific fields of a document. */
export async function updateDocument(collectionName: string, id: string, data: object): Promise<void> {
  await updateDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Delete a document permanently. */
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

/** Listen to real-time changes in a collection. Returns unsubscribe function. */
export function subscribeToCollection(
  collectionName: string,
  callback: (data: DocumentData[]) => void
) {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot: QuerySnapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
}

// ════════════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════════════

export interface ProductData {
  name: string;
  sku: string;
  category: string;
  stock: number;
  location: string;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  description?: string;
}

/** Add a new product to Firestore */
export async function addProduct(data: ProductData): Promise<string> {
  return addDocument("products", data);
}

/** Get all products */
export async function getProducts(): Promise<DocumentData[]> {
  return getAll("products");
}

/** Update a product */
export async function updateProduct(id: string, data: Partial<ProductData>): Promise<void> {
  return updateDocument("products", id, data);
}

/** Delete a product */
export async function deleteProduct(id: string): Promise<void> {
  return deleteDocument("products", id);
}

/** Listen to products in real time */
export function subscribeToProducts(callback: (products: DocumentData[]) => void) {
  return subscribeToCollection("products", callback);
}

// ════════════════════════════════════════════════════════════════
// RECEIPTS
// ════════════════════════════════════════════════════════════════

export interface ReceiptData {
  supplier: string;
  product: string;
  quantity: number;
  expectedDate: string;
  location: string;
  status: "Received" | "Pending" | "In Transit" | "Cancelled";
  notes?: string;
}

export async function addReceipt(data: ReceiptData): Promise<string> {
  return addDocument("receipts", data);
}

export async function getReceipts(): Promise<DocumentData[]> {
  return getAll("receipts");
}

export async function updateReceipt(id: string, data: Partial<ReceiptData>): Promise<void> {
  return updateDocument("receipts", id, data);
}

export function subscribeToReceipts(callback: (data: DocumentData[]) => void) {
  return subscribeToCollection("receipts", callback);
}

// ════════════════════════════════════════════════════════════════
// DELIVERIES
// ════════════════════════════════════════════════════════════════

export interface DeliveryData {
  customer: string;
  product: string;
  quantity: number;
  shipDate: string;
  address: string;
  status: "Shipped" | "Pending" | "Delivered" | "Cancelled";
}

export async function addDelivery(data: DeliveryData): Promise<string> {
  return addDocument("deliveries", data);
}

export async function getDeliveries(): Promise<DocumentData[]> {
  return getAll("deliveries");
}

export async function updateDelivery(id: string, data: Partial<DeliveryData>): Promise<void> {
  return updateDocument("deliveries", id, data);
}

export function subscribeToDeliveries(callback: (data: DocumentData[]) => void) {
  return subscribeToCollection("deliveries", callback);
}

// ════════════════════════════════════════════════════════════════
// TRANSFERS
// ════════════════════════════════════════════════════════════════

export interface TransferData {
  product: string;
  from: string;
  to: string;
  quantity: number;
  status: "In Transit" | "Completed" | "Pending";
  notes?: string;
}

export async function addTransfer(data: TransferData): Promise<string> {
  return addDocument("transfers", data);
}

export async function getTransfers(): Promise<DocumentData[]> {
  return getAll("transfers");
}

export async function updateTransfer(id: string, data: Partial<TransferData>): Promise<void> {
  return updateDocument("transfers", id, data);
}

export function subscribeToTransfers(callback: (data: DocumentData[]) => void) {
  return subscribeToCollection("transfers", callback);
}

// ════════════════════════════════════════════════════════════════
// ADJUSTMENTS
// ════════════════════════════════════════════════════════════════

export interface AdjustmentData {
  product: string;
  location: string;
  systemQty: number;
  countedQty: number;
  difference: number;
  reason: string;
  notes?: string;
}

export async function addAdjustment(data: AdjustmentData): Promise<string> {
  return addDocument("adjustments", data);
}

export async function getAdjustments(): Promise<DocumentData[]> {
  return getAll("adjustments");
}

export function subscribeToAdjustments(callback: (data: DocumentData[]) => void) {
  return subscribeToCollection("adjustments", callback);
}

// ════════════════════════════════════════════════════════════════
// WAREHOUSES
// ════════════════════════════════════════════════════════════════

export interface WarehouseData {
  name: string;
  address: string;
  capacity: number;
  used: number;
  type: string;
  status: string;
}

export async function addWarehouse(data: WarehouseData): Promise<string> {
  return addDocument("warehouses", data);
}

export async function getWarehouses(): Promise<DocumentData[]> {
  return getAll("warehouses");
}

export async function updateWarehouse(id: string, data: Partial<WarehouseData>): Promise<void> {
  return updateDocument("warehouses", id, data);
}

export function subscribeToWarehouses(callback: (data: DocumentData[]) => void) {
  return subscribeToCollection("warehouses", callback);
}

// ════════════════════════════════════════════════════════════════
// MOVE HISTORY
// ════════════════════════════════════════════════════════════════

export interface MoveHistoryData {
  type: "Transfer" | "Receipt" | "Delivery" | "Adjustment";
  product: string;
  from: string;
  to: string;
  quantity: number;
  user: string;
}

export async function addMoveHistory(data: MoveHistoryData): Promise<string> {
  return addDocument("moveHistory", data);
}

export async function getMoveHistory(): Promise<DocumentData[]> {
  return getAll("moveHistory");
}

export function subscribeToMoveHistory(callback: (data: DocumentData[]) => void) {
  return subscribeToCollection("moveHistory", callback);
}

// ════════════════════════════════════════════════════════════════
// DASHBOARD KPIs  (aggregate counts from Firestore)
// ════════════════════════════════════════════════════════════════

export async function getDashboardStats() {
  const [products, receipts, deliveries, transfers] = await Promise.all([
    getDocs(collection(db, "products")),
    getDocs(query(collection(db, "receipts"), where("status", "==", "Pending"))),
    getDocs(query(collection(db, "deliveries"), where("status", "==", "Pending"))),
    getDocs(query(collection(db, "transfers"), where("status", "in", ["Pending", "In Transit"]))),
  ]);

  const allProducts = products.docs.map((d) => d.data());
  const lowStock = allProducts.filter((p) => p.status === "Low Stock" || p.status === "Out of Stock").length;

  return {
    totalProducts:     products.size,
    lowStockItems:     lowStock,
    pendingReceipts:   receipts.size,
    pendingDeliveries: deliveries.size,
    internalTransfers: transfers.size,
  };
}
