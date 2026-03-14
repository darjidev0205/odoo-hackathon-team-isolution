# 🔥 Firebase Setup Guide for Beginners
# Complete step-by-step — no experience needed!

---

## What is Firebase?
Firebase is Google's free backend service. It gives you:
- ✅ A database (Firestore) — stores all your inventory data
- ✅ Authentication — handles login/logout securely
- ✅ Hosting — deploy your app online for free
- ✅ No server needed — Firebase IS the backend!

---

## STEP 1 — Create a Firebase Account & Project

1. Go to → https://console.firebase.google.com
2. Sign in with your Google account (Gmail)
3. Click **"Add project"** (big blue button)
4. Enter a project name: e.g. `invenpro-app`
5. Click **Continue**
6. Turn OFF Google Analytics (not needed) → click **Create project**
7. Wait ~30 seconds, then click **Continue**

   ✅ You now have a Firebase project!

---

## STEP 2 — Enable Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click the blue **"Create database"** button
3. Choose **"Start in test mode"** (easier for development)
   > ⚠️ Test mode lets anyone read/write for 30 days.
   > After testing, switch to the security rules in `firestore.rules`.
4. Choose a server location (pick the one closest to you)
5. Click **Enable**

   ✅ Your database is ready!

---

## STEP 3 — Enable Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Under "Sign-in method", click **"Email/Password"**
4. Toggle **Enable** to ON
5. Click **Save**

   ✅ Login/signup now works!

---

## STEP 4 — Create Your First User (Admin Account)

1. Still in Authentication, click the **"Users"** tab
2. Click **"Add user"**
3. Enter your email and a password (min 6 characters)
4. Click **Add user**

   ✅ You can now log in to InvenPro!

---

## STEP 5 — Get Your Firebase Config Keys

1. Click the **gear icon ⚙️** (top left) → "Project settings"
2. Scroll down to **"Your apps"** section
3. Click the **</>** (Web) icon
4. Enter app nickname: `invenpro-web`
5. Click **"Register app"**
6. You'll see a code block like this:

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",              // from console
  authDomain:        "odoo-hackathon-50dec.firebaseapp.com",
  projectId:         "odoo-hackathon-50dec",
  storageBucket:     "odoo-hackathon-50dec.appspot.com",
  messagingSenderId: "322591866415",
  appId:             "1:322591866415:web:...", // from console
};
```

7. **Copy all of this** — you'll need it in the next step!
8. Click **Continue to console**

---

## STEP 6 — Add Config to Your Project

Open the file: `src/lib/firebase.ts`

Replace the placeholder values with YOUR values from Step 5:

```ts
const firebaseConfig = {
  apiKey:            "AIzaSyXXXXXXXX",        // ← paste yours
  authDomain:        "invenpro-app.firebaseapp.com",
  projectId:         "invenpro-app",
  storageBucket:     "invenpro-app.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abcdef",
};
```

Also open `scripts/seedFirestore.mjs` and paste the same config there.

---

## STEP 7 — Install Dependencies & Run

Open your terminal in the project folder and run:

```bash
# Install all packages (including Firebase)
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000 — you should see the login page!

---

## STEP 8 — Load Sample Data into Firestore

Run the seed script to pre-fill your database with sample products, warehouses, receipts, etc.:

```bash
npm run seed
```

You should see:
```
🚀 Starting Firestore seed...
Seeding "products"... ✅ 8 documents added
Seeding "receipts"... ✅ 4 documents added
...
✅ All done! Your Firestore database is loaded.
```

Now go to the Firebase Console → Firestore Database and you'll see all your data!

---

## STEP 9 — Log In and Test!

1. Go to http://localhost:3000
2. Enter the email/password you created in Step 4
3. Click **Sign in**
4. You should see the Dashboard with real data from Firestore! 🎉

---

## STEP 10 — Deploy to the Internet (Optional)

To put your app online for free:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting
# → Choose your project
# → Public directory: .next (or "out" if static)
# → Single-page app: Yes

# Build and deploy
npm run build
firebase deploy
```

Your app will be live at: `https://invenpro-app.web.app`

---

## 🗂️ How Your Data is Stored in Firestore

Firestore organizes data like folders (called "collections"):

```
Firestore Database
├── products/          ← All products
│   ├── abc123         ← One product document
│   │   ├── name: "Wireless Keyboard"
│   │   ├── sku: "WK-2201"
│   │   ├── stock: 187
│   │   └── ...
├── receipts/
├── deliveries/
├── transfers/
├── adjustments/
├── warehouses/
└── moveHistory/
```

---

## ❓ Common Problems & Fixes

### "Permission denied" error
→ Go to Firestore → Rules → change to test mode temporarily

### "Firebase not initialized" error
→ Check that your config in `src/lib/firebase.ts` has real values (not the placeholder text)

### Login says "user not found"
→ Create a user first in Firebase Console → Authentication → Users → Add user

### Seed script fails
→ Make sure you pasted the Firebase config into `scripts/seedFirestore.mjs` too

### Data not showing up
→ Check the browser console (F12) for errors. Most likely a config issue.

---

## 🔐 Security (Before Going Live)

When ready for production, deploy the security rules:

```bash
firebase deploy --only firestore:rules
```

This ensures only logged-in users can read/write data.

---

## 📁 New Files Added

| File | Purpose |
|------|---------|
| `src/lib/firebase.ts` | Firebase connection config |
| `src/lib/authService.ts` | Login, logout, register functions |
| `src/lib/dbService.ts` | All database read/write operations |
| `scripts/seedFirestore.mjs` | Load sample data into Firestore |
| `firestore.rules` | Database security rules |
| `src/app/register/page.tsx` | New user registration page |

---

That's it! You now have a full backend powered by Firebase. 🚀
