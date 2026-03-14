# InvenPro — Inventory Management System

A modern, full-featured SaaS-style Inventory Management System dashboard built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework & routing |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| React useState | State management |

---

## Pages

| Route | Page |
|---|---|
| `/` | Login |
| `/dashboard` | Dashboard (KPIs, charts, activity) |
| `/dashboard/products` | Products (searchable table + add modal) |
| `/dashboard/receipts` | Receipts (incoming stock) |
| `/dashboard/deliveries` | Delivery Orders |
| `/dashboard/transfers` | Internal Transfers |
| `/dashboard/adjustment` | Inventory Adjustment |
| `/dashboard/history` | Move History |
| `/dashboard/warehouse` | Warehouse Management |
| `/dashboard/profile` | User Profile |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx              ← Root layout
│   ├── page.tsx                ← Login page
│   └── dashboard/
│       ├── layout.tsx          ← Sidebar + Topbar shell
│       ├── page.tsx            ← Dashboard
│       ├── products/page.tsx
│       ├── receipts/page.tsx
│       ├── deliveries/page.tsx
│       ├── transfers/page.tsx
│       ├── adjustment/page.tsx
│       ├── history/page.tsx
│       ├── warehouse/page.tsx
│       └── profile/page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── FormField.tsx
└── lib/
    └── mockData.ts             ← All dummy JSON data
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

Use the pre-filled demo credentials on the login page.

---

## Build for Production

```bash
npm run build
npm start
```

---

## Key Features

- **Login page** with form validation and loading state
- **Dashboard** with KPI cards, bar chart, inventory health bars, and recent activity table
- **Products** with live search + category filter + Add Product modal (adds to table)
- **Receipts** with status badges and Create Receipt modal
- **Delivery Orders** with New Delivery modal
- **Internal Transfers** with New Transfer modal
- **Inventory Adjustment** with live difference calculator
- **Move History** with type filter and export button
- **Warehouse** with capacity progress bars and Add Warehouse modal
- **Profile** with Save Changes feedback and Sign Out
- **Responsive** — mobile sidebar with overlay, responsive grid layouts
- **All data is mock** — no backend required

---

## Customization

All dummy data lives in `src/lib/mockData.ts`. Edit that file to change:
- Products list
- Receipts, deliveries, transfers
- Warehouse names and capacities
- KPI numbers
- Chart data

To add a real backend, replace the mock arrays with API calls inside each page component.
