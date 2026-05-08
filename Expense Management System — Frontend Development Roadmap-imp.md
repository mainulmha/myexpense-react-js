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

### VS Code এ:

```txt id="v1d8pr"
Ctrl + Shift + P
```

তারপর search:

```txt id="r9f3ku"
TypeScript: Restart TS Server
```

---

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

- [ ] Setup environment variables

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

# PHASE 2 — CORE ARCHITECTURE

## Layout System

- [ ] Create MainLayout
- [ ] Create AuthLayout
- [ ] Create Sidebar
- [ ] Create Navbar
- [ ] Create Mobile Navigation
- [ ] Responsive Layout Fixes

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
