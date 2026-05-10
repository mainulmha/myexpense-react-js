# Expense Management System — Frontend Task Board

> React Developer Workflow  
> Stack: React + Vite + Tailwind + React Router + Axios + Zustand

---

# PHASE 1 — PROJECT SETUP

## Setup React Project

- [ ] Initialize Vite project
- [ ] Configure Tailwind CSS

1. Terminal এ Command রান করলেই একটা fresh React app তৈরি হবে with Vite + Tailwind CSS।

```bash
npm create vite@latest my-app -- --template react
```

2. তারপর project folder এ ঢুকো:

```bash
cd my-app
```

3. Dependencies install:

```bash
npm install
```

4. Tailwind install করো:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

5. `vite.config.js` edit করো:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

6. `src/index.css` এ রাখো:

```css
@import "tailwindcss";
```

7. `src/App.jsx` replace করো:

```jsx
function App() {
  return (
    <div className="h-screen bg-black text-white flex items-center justify-center text-4xl font-bold">
      React + Vite + Tailwind CSS
    </div>
  );
}

export default App;
```

8. Run করো:

```bash
npm run dev
```

9. তারপর browser এ open করো:

```txt
http://localhost:5173
```

যদি সব ঠিক থাকে, কালো background এ **React + Vite + Tailwind CSS** দেখাবে।

এক লাইনে shortcut চাইলে (Windows Git Bash):

```bash
npm create vite@latest my-app -- --template react && cd my-app && npm install && npm install -D tailwindcss @tailwindcss/vite
```

Vite + Tailwind setup এখন আগের চেয়ে সহজ—`tailwindcss init` লাগে না নতুন ভার্সনে।

- [ ] Setup folder structure

```
src/
│
├── assets/
│   └── images/
│
├── components/
│   ├── Navbar.jsx
│   ├── Balance.jsx
│   ├── ExpenseItem.jsx
│   ├── ExpenseList.jsx
│   ├── AddExpense.jsx
│
├── pages/
│   └── Dashboard.jsx
│
├── services/
│   └── api.js
│
├── hooks/
│   └── useExpenses.js
│
├── context/
│   └── ExpenseContext.jsx
│
├── utils/
│   ├── formatCurrency.js
│   └── calculateBalance.js
│
├── styles/
│   └── global.css
│
├── App.jsx
├── main.jsx
```

- [ ] Setup path alias (@/)

ঠিক আছে, একদম clean production setup দিচ্ছি React + Vite project এর জন্য।
এটা copy-paste করলেই alias (`@/`) perfectly কাজ করবে।

---

# Step 1 — Install Node Types

```bash id="m2x7pq"
npm i -D @types/node
```

---

# Step 2 — vite.config.js

Project root এ `vite.config.js` file এ এটা রাখো:

```js id="u8k4sn"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

# Step 3 — jsconfig.json

Project root এ নতুন file create করো:

```txt id="x6c2ta"
jsconfig.json
```

এর ভিতরে এটা রাখো:

```json id="y5v9lm"
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "ignoreDeprecations": "6.0"
  }
}
```

---

# Step 4 — VS Code Restart

# Step 5 — Use Alias

এখন import করতে পারবা:

```js id="b7n4ex"
import Navbar from "@/components/Navbar";
import Login from "@/pages/Login";
import Button from "@/components/ui/Button";
```

---

# Final Folder Example

```txt
src/
 ├── components/
 ├── pages/
 ├── layouts/
 ├── routes/
 ├── services/
 ├── store/
 ├── hooks/
 ├── utils/
 └── App.jsx
```

- [ ] Install required packages

```bash
npm i react-router-dom axios zustand react-hook-form zod recharts react-hot-toast lucide-react jspdf jspdf-autotable xlsx file-saver
npm i -D prettier
```

### Packages

- react-router-dom
- axios
- zustand
- react-hook-form
- zod
- recharts
- react-hot-toast
- lucide-react
- prettier
- jspdf
- jspdf-autotable
- xlsx
- file-server

---

- [ ] Setup environment variables

চল, এটা আমি তোমাকে একদম real SaaS / production style এ সাজিয়ে দিচ্ছি 😄
এভাবে করলে তুমি পরে dev → staging → production easily manage করতে পারবে।

---

# 1. Multiple Environment Files Setup

Project root এ 3টা `.env` file রাখো:

```txt id="env1"
.env
.env.development
.env.production
```

---

# 2. Development (.env.development)

```env id="dev1"
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Expense Manager (Dev)
```

---

# 3. Production (.env.production)

```env id="prod1"
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=Expense Manager
```

---

# 4. Default (.env) (optional)

```env id="default1"
VITE_APP_NAME=Expense Manager
```

---

# 5. React/Vite এ use করা

```js id="use1"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

---

# 6. Axios Setup (Best Practice)

👉 আলাদা file বানাও:

```txt id="api1"
src/services/api.js
```

```js id="api2"
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default api;
```

---

# 7. Development vs Production Switch (Vite handles automatically)

Vite নিজে environment detect করে:

| Mode          | File             |
| ------------- | ---------------- |
| npm run dev   | .env.development |
| npm run build | .env.production  |

---

# 8. Run Commands

## Dev Mode

```bash id="run1"
npm run dev
```

→ uses `.env.development`

---

## Production Build

```bash id="run2"
npm run build
```

→ uses `.env.production`

---

# 9. Production Deploy Example Flow

```txt id="flow1"
Frontend (Vercel/Netlify)
        ↓
API calls
        ↓
Backend (Render / VPS / Railway)
        ↓
MongoDB Atlas
```

---

# 10. Best SaaS Practice (Important)

## Always do this ✅

```js id="good1"
axios.get(`${import.meta.env.VITE_API_BASE_URL}/api`);
```

---

# 11. Bonus (Professional Upgrade)

## Optional: env validation

```bash id="bonus1"
npm i zod
```

```js id="bonus2"
import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
});

envSchema.parse(import.meta.env);
```

---

# PHASE 2 — CORE ARCHITECTURE

## Layout System

- [ ] Create MainLayout
- [ ] Create AuthLayout
- [ ] Create Sidebar
- [ ] Create Navbar
- [ ] Create Mobile Navigation
- [ ] Responsive Layout Fixes

---

````md id="f4n8kp"
> React Router Architecture  
> Production Grade Layout & Route Structure

---

# APPLICATION FLOW

```txt
main.jsx
   ↓
App.jsx
   ↓
RouterProvider
   ↓
router.jsx
   ↓
Layouts
   ↓
Pages
```
````

---

# 1. main.jsx

## Purpose

Application entry point.

## Responsibilities

- Render React App
- Enable StrictMode
- Load global CSS
- Render App component

---

## Current Structure

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

---

# 2. App.jsx

## Purpose

Global application wrapper.

## Responsibilities

- RouterProvider
- Global Toaster

- Future Providers
  - AuthProvider
  - ThemeProvider
  - QueryClientProvider

---

## Current Structure

```js
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
```

---

# 3. Router System

## File Location

```txt
src/router/router.jsx
```

---

## Purpose

Centralized route management system.

---

# ROUTE STRUCTURE

## Protected Routes

```txt
/dashboard
/analysis
/profile
/settings
/report
```

These routes require authentication.

---

## Public Routes

```txt
/login
/signup
/verify-email
/oauth-success
```

```js
import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import Signin from "@/pages/auth/Signin";
import Signup from "@/pages/auth/Signup";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Dashboard from "@/pages/auth/Dashboard";
import AppLayout from "@/layouts/AppLayout";
import Charts from "@/pages/Charts";
import Profile from "@/pages/Profile";
import Report from "@/pages/Report";
import PrivateRoute from "./PrivateRoute";
import Settings from "@/pages/Settings";

const router = createBrowserRouter([
  // Private Router
  {
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/charts", element: <Charts /> },
      { path: "/profile", element: <Profile /> },
      { path: "/settings", element: <Settings /> },
      { path: "/report", element: <Report /> },
    ],
  },

  // Public Router
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

export default router;
```

Accessible without login.

---

# 4. PrivateRoute

## Purpose

Protect authenticated pages.

If user is not logged in:

- Redirect to `/login`

If logged in:

- Render protected content

---

## Flow

```txt
User visits protected route
        ↓
PrivateRoute checks auth
        ↓
If false → /login
If true  → Render page
```

---

## Current Structure

```js
const PrivateRoute = ({ children }) => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};
```

---

# 5. AppLayout

## Purpose

Main application layout for authenticated users.

---

## Responsibilities

- Header/Navbar
- Sidebar
- Footer
- Main Content Area
- Outlet Rendering

---

## Layout Structure

```txt
AppLayout
 ├── Header
 ├── Sidebar
 ├── Main Content (Outlet)
 └── Footer
```

---

# 6. AuthLayout

## Purpose

Layout for authentication pages.

---

## Responsibilities

- Clean auth UI
- Centered auth forms
- Minimal layout

---

## Used For

```txt
/login
/signup
/verify-email
```

---

# 7. Navbar/Header

## Purpose

Global navigation system.

---

## Responsibilities

- Logo
- Navigation Links
- User Profile
- Logout Button
- Mobile Menu

---

# 8. Footer

## Purpose

Global footer component.

---

## Responsibilities

- Copyright
- Links
- Branding

---

# 9. Outlet System

## Purpose

Render child routes inside layouts.

---

## Example

```js
<AppLayout>
  <Outlet />
</AppLayout>
```

When route changes:

- Only Outlet content changes
- Layout remains persistent

---

# 10. Redirect Flow

## Default Redirect

```txt
/
 → /dashboard
```

---

## Login Flow

```txt
User Login Success
      ↓
navigate("/dashboard")
```

---

# 11. Route Matching Flow

## Example

```txt
localhost:5173/dashboard
```

Flow:

```txt
main.jsx
  ↓
App.jsx
  ↓
RouterProvider
  ↓
router.jsx
  ↓
PrivateRoute
  ↓
AppLayout
  ↓
Dashboard Page
```

---

# 12. Current Architecture Type

## Architecture Style

- Modular Architecture
- Layout Based Routing
- Protected Route System
- SaaS/ERP Structure
- Scalable Frontend Architecture

---

# 13. Production Benefits

## Advantages

- Clean structure
- Easy scaling
- Maintainable codebase
- Route separation
- Reusable layouts
- Enterprise friendly
- Better developer experience

---

# 14. Future Improvements

## Planned Additions

- Zustand Auth Store
- Dynamic Sidebar
- Role Based Routing
- Admin Routes
- Lazy Loading
- Route Guards
- Breadcrumb System
- Theme Provider
- Global Modal System

---

# FINAL SUMMARY

## Current Setup Includes

- React Router Setup
- Protected Routes
- Auth Layout
- App Layout
- Navbar/Header
- Footer
- Global App Wrapper
- Route Based Architecture
- Production Ready Structure

```

```

---

## Design System

- [ ] Button Component
- [ ] Input Component
- [ ] Modal Component
- [ ] Card Component
- [ ] Table Component
- [ ] Loader Component
- [ ] Empty State Component
- [ ] Toast Notification Setup

---

হ্যাঁ 😄
তুমি newest Tailwind + Vite setup use করতেছো, তাই এখন অনেক project এ আর `tailwind.config.js` automatically থাকে না।

Especially Tailwind v4 এ setup অনেক simplify হয়েছে।

---

# তোমার এখন কী করা উচিত?

তুমি যেহেতু modern setup use করতেছো, তোমার জন্য best হবে:

- CSS variable theme system
- `dark` class toggle
- custom utility classes
- config-less Tailwind approach

এটাই latest style 😄

---

# Modern Tailwind v4 Theme Setup

## Step 1 — index.css

তোমার `src/index.css` এ এটা রাখো:

```css id="tw1"
@import "tailwindcss";

/* =========================
   LIGHT THEME
========================= */

:root {
  --bg: #ffffff;
  --surface: #f8fafc;
  --card: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
}

/* =========================
   DARK THEME
========================= */

.dark {
  --bg: #020617;
  --surface: #0f172a;
  --card: #111827;
  --text: #e5e7eb;
  --muted: #94a3b8;
  --border: rgba(31, 41, 55, 0.5);
}

/* =========================
   REUSABLE COMPONENTS
========================= */

@layer components {
  .app-page {
    @apply min-h-screen bg-[var(--bg)] text-[var(--text)] transition-all;
  }

  .app-card {
    @apply bg-[var(--card)]
    border
    border-[var(--border)]
    rounded-2xl
    shadow-xl;
  }

  .app-input {
    @apply bg-[var(--surface)]
    border
    border-[var(--border)]
    rounded-xl
    text-[var(--text)]
    outline-none;
  }

  .app-button {
    @apply bg-blue-600
    hover:bg-blue-500
    text-white
    rounded-xl
    transition-all
    active:scale-95;
  }
}
```

---

# Step 2 — App.jsx

```jsx id="tw2"
function App() {
  return (
    <div className="app-page">
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </div>
  );
}
```

---

# Step 3 — Theme Toggle

```jsx id="tw3"
const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};
```

---

# Step 4 — Use Anywhere

```jsx id="tw4"
<div className="app-card p-6">
  <h1 className="text-xl font-bold">Dashboard</h1>
</div>
```

---

# Important

তোমার latest Tailwind setup এ:

```css id="tw5"
@import "tailwindcss";
```

এইটাই enough 😄

আগের মতো:

- tailwind.config.js
- postcss.config.js
  সবসময় লাগে না এখন।

---

# Result

এখন তোমার app এ থাকবে:

✅ Dark mode
✅ Light mode
✅ Reusable design system
✅ Production-grade architecture
✅ SaaS-style theme system
✅ Centralized colors
✅ Easy future customization

Dark mode check দিতে খুব easy 😄

তুমি যেহেতু `.dark` class based system use করতেছো, তাই browser এ manually class add করলেই dark mode কাজ করবে।

---

# Method 1 — Simple Button Toggle (Best)

## App.jsx

```jsx id="dm1"
import { useState } from "react";

function App() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="app-page">
      <button onClick={toggleTheme} className="app-button px-4 py-2 m-4">
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="app-card p-6 m-4">Dashboard Card</div>
    </div>
  );
}

export default App;
```

---

# কী হবে?

Button click করলে:

```js id="dm2"
document.documentElement.classList.toggle("dark");
```

এটা HTML tag এ:

```html id="dm3"
<html class="dark"></html>
```

add/remove করবে।

---

# তখন CSS variables change হবে

```css id="dm4"
.dark {
  --bg: #020617;
}
```

activate হবে 😄

---

change হলেই পুরো app theme change হয়ে যাবে।

হ্যাঁ, অবশ্যই 😄
Production app এ theme logic আলাদা করাই best practice।
তাহলে `App.jsx` clean থাকবে।

---

# Best Structure

```txt id="th1"
src/
├── context/
│    └── ThemeProvider.jsx
│
├── hooks/
│    └── useTheme.js
│
├── App.jsx
└── main.jsx
```

---

# Step 1 — ThemeProvider বানাও

## src/context/ThemeProvider.jsx

```jsx id="th2"
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
```

---

# Step 2 — Custom Hook

## src/hooks/useTheme.js

```js id="th3"
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeProvider";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
```

---

# Step 3 — Wrap App

## App.jsx

```jsx id="th4"
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="app-page">
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

---

# Step 4 — Use Anywhere

## Example Navbar.jsx

```jsx id="th5"
import useTheme from "@/hooks/useTheme";

const Navbar = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="app-button px-4 py-2">
      {dark ? "Light" : "Dark"}
    </button>
  );
};

export default Navbar;
```

---

# Result

এখন:

- App.jsx clean ✅
- Theme centralized ✅
- Reusable anywhere ✅
- Production-grade ✅
- ERP/SaaS architecture ✅

---

# Future Upgrade Easily Possible

এখন খুব সহজে add করতে পারবা:

- localStorage theme save
- system theme detect
- multiple themes
- custom color palettes
- dynamic branding

এই architecture long-term এর জন্য অনেক better 😄

# PHASE 3 — AUTHENTICATION

## Authentication Pages

- [ ] Login Page
- [ ] Signup Page
- [ ] Forgot Password Page
- [ ] Reset Password Page

---

## Authentication Logic

- [ ] JWT Token Handling
- [ ] Protected Routes
- [ ] Persist Login
- [ ] Logout System
- [ ] Axios Interceptor Setup

---

## OAuth Integration

- [ ] Google Login Button
- [ ] OAuth Redirect Handling
- [ ] OAuth Error Handling

---

# PHASE 4 — DASHBOARD

## Dashboard UI

- [ ] Summary Cards
- [ ] Income Overview
- [ ] Expense Overview
- [ ] Recent Transactions
- [ ] Quick Action Buttons

---

## Dashboard Charts

- [ ] Monthly Expense Chart
- [ ] Income vs Expense Chart
- [ ] Category Pie Chart

---

# PHASE 5 — TRANSACTION MANAGEMENT

## Transaction CRUD

- [ ] Add Transaction Modal
- [ ] Transaction Form
- [ ] Edit Transaction
- [ ] Delete Transaction
- [ ] Transaction List Table

---

## Transaction Features

- [ ] Pagination
- [ ] Search Transactions
- [ ] Filter by Category
- [ ] Filter by Date
- [ ] Sorting System

---

# PHASE 6 — CATEGORY MANAGEMENT

## Category CRUD

- [ ] Create Category
- [ ] Edit Category
- [ ] Delete Category
- [ ] Category Color Picker
- [ ] Category Icon Picker

---

# PHASE 7 — ANALYTICS

## Analytics Page

- [ ] Monthly Analytics
- [ ] Expense Breakdown
- [ ] Spending Trends
- [ ] Top Expense Categories

---

## Reports

- [ ] Generate Monthly Report
- [ ] Export CSV
- [ ] Export PDF

---

# PHASE 8 — BUDGET SYSTEM

## Budget Features

- [ ] Set Monthly Budget
- [ ] Remaining Balance UI
- [ ] Budget Progress Bar
- [ ] Budget Alert Notification

---

# PHASE 9 — SETTINGS

## User Settings

- [ ] Profile Update
- [ ] Change Password
- [ ] Currency Settings
- [ ] Theme Toggle
- [ ] Notification Preferences

---

# PHASE 10 — STATE MANAGEMENT

## Zustand Store

- [ ] Auth Store
- [ ] Transaction Store
- [ ] Category Store
- [ ] Analytics Store

---

# PHASE 11 — API INTEGRATION

## API Setup

- [ ] Axios Base Config
- [ ] API Error Handling
- [ ] Loading States
- [ ] Retry Handling

---

# PHASE 12 — PERFORMANCE

## Optimization

- [ ] Lazy Loading
- [ ] Route Code Splitting
- [ ] Skeleton Loader
- [ ] Memoization
- [ ] Image Optimization

---

# PHASE 13 — TESTING

## QA & Testing

- [ ] Responsive Testing
- [ ] Form Validation Testing
- [ ] Authentication Testing
- [ ] Edge Case Testing

---

# PHASE 14 — DEPLOYMENT

## Production Deployment

- [ ] Build Optimization
- [ ] Environment Config
- [ ] Deploy Frontend
- [ ] Setup Domain
- [ ] Setup HTTPS

---

# FUTURE FEATURES

## Advanced Features

- [ ] Multi Currency Support
- [ ] Recurring Transactions
- [ ] AI Expense Insights
- [ ] Receipt Scanner
- [ ] Dark Mode
- [ ] PWA Support
- [ ] Offline Support

---

# PROJECT STATUS

| Module       | Status |
| ------------ | ------ |
| Setup        | ⏳     |
| Auth         | ⏳     |
| Dashboard    | ⏳     |
| Transactions | ⏳     |
| Categories   | ⏳     |
| Analytics    | ⏳     |
| Budget       | ⏳     |
| Settings     | ⏳     |
| Optimization | ⏳     |
| Deployment   | ⏳     |

---

# NOTES

- Use reusable components
- Keep API logic separated
- Use responsive-first design
- Maintain clean folder structure
- Use centralized constants/configs
