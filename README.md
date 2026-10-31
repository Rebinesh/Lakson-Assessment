
# NexaBank — Banking Products Dashboard

A responsive, high-polish digital banking dashboard built for a Junior / Full-Stack Developer assessment. The application allows users to discover, search, filter, sort, and inspect diverse financial products across savings, credit, loan, and wealth categories from a single unified screen.

---

## 1. Project Overview

**NexaBank** is designed to reflect the standards, visual hierarchy, and interaction design of modern enterprise fintech applications. It provides a cohesive interface for retail banking clients to:
- Monitor their active financial relationships (Savings, Credit Cards, Wealth Portfolios).
- Track in-flight credit applications with step-by-step verification timelines (Personal Flexi Loan).
- Filter and search banking products simultaneously with instant feedback.
- Review detailed account terms, interest rates, credit limits, and benefits in accessible dialogs.

---

## 2. Key Features

- **Summary Metric Cards**: Live calculation of **Total Products**, **Active Products**, and **Pending Applications** derived dynamically from the active mock dataset.
- **Product Categorization**: Filter by **All Products**, **Savings**, **Credit Cards**, **Loans**, and **Wealth** with visual count badges on category pills.
- **Instant Search**: Real-time search across product names, categories, descriptions, and account/reference numbers with instant clear capabilities.
- **Sort Controls**: Genuine sorting options (Alphabetical A–Z, Reverse Z–A, and Status: Active first).
- **Interactive Product Details Modal**:
  - Displays product specifications, masked account numbers, rates/limits, and card benefits.
  - Fully accessible dialog with focus management, backdrop dismissal, and `Escape` key support.
- **Application Tracker Modal**:
  - Visual stage-by-stage progress tracker for products under review (Application Submitted → Document Verification → Underwriting → Sanction → Disbursement).
- **Notification Popover**: Accessible dropdown showing simulated account notifications and alerts.
- **Responsive Layout**: Fluid experience across mobile, tablet, laptop, and ultra-wide desktop monitors, featuring a collapsible mobile navigation drawer.
- **Accessible & Semantic HTML**: Visible focus rings (`:focus-visible`), ARIA dialog roles (`role="dialog"`, `aria-modal="true"`), proper heading hierarchy, and color contrast adherence.

---

## 3. Technology Stack

- **Framework / Library**: React 18 (Functional Components, React Hooks: `useState`, `useMemo`, `useEffect`, `useRef`)
- **Build Tool / Bundler**: Vite 6
- **Styling**: Modern Vanilla CSS (Design tokens, CSS Custom Properties, Flexbox, CSS Grid, media queries)
- **Icons**: Lucide React
- **Language**: JavaScript (ES Modules)

---

## 4. Project Structure

```text
Lakson_Assesment/
├── dist/                      # Production build output
├── node_modules/              # Dependencies
├── public/                    # Static public assets
├── src/
│   ├── components/
│   │   ├── ApplicationTrackerModal.jsx # Loan application timeline modal
│   │   ├── FilterBar.jsx               # Search, category pills, & sort toolbar
│   │   ├── Header.jsx                  # Breadcrumb, title, notification bell & profile
│   │   ├── NotificationPopover.jsx     # Popover panel for alerts
│   │   ├── ProductCard.jsx             # Reusable card component with metrics & CTAs
│   │   ├── ProductDetailsModal.jsx     # Full product details & specifications modal
│   │   ├── Sidebar.jsx                 # Collapsible navigation sidebar
│   │   └── SummaryCards.jsx            # Dynamic summary cards
│   ├── data/
│   │   └── products.js                 # Separated mock banking product data
│   ├── App.jsx                         # Main application container & state orchestration
│   ├── index.css                       # Complete design system & responsive styling
│   └── main.jsx                        # React root entry point
├── index.html                 # HTML template with Google Fonts (Inter)
├── package.json               # Project manifest and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # Project documentation
```

---

## 5. Prerequisites

- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

---

## 6. Installation & Running Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

The application will be served locally (typically at `http://localhost:3000` or `http://localhost:5173`).

### 3. Production Build

```bash
npm run build
```

This compiles optimized production assets into the `dist/` directory.

### 4. Preview the Production Build

```bash
npm run preview
```

---

## 7. Mock Product Data

All mock data is isolated inside `src/data/products.js` to ensure clean separation of data and UI presentation:

1. **Smart Savings Account** (Category: *Savings*, Status: *Active*, Balance: *₹85,400*, Interest: *3.5% p.a.*)
2. **Platinum Credit Card** (Category: *Credit Card*, Status: *Active*, Limit: *₹1,00,000*, Available: *₹75,000*)
3. **Personal Flexi Loan** (Category: *Loan*, Status: *Under Review*, Requested: *₹2,00,000*, Rate: *12.5% p.a.*)
4. **Wealth Growth Portfolio** (Category: *Wealth*, Status: *Active*, Value: *₹5,50,000*, Return: *+8.2% illustrative*)
5. **Advantage Fixed Deposit** (Category: *Savings*, Status: *Active*, Deposit: *₹1,50,000*, Rate: *6.8% p.a.*)
6. **Signature Travel & Dining Card** (Category: *Credit Card*, Status: *Under Review*, Limit: *₹2,50,000*, Rate: *Up to 5% Cashback*)

---

## 8. Compliance & Demonstration Notice

> **Important Notice**: This application was created solely for demonstration and assessment purposes. All financial figures, interest rates, credit limits, account numbers, and investment returns are fictional, illustrative demonstration data. This application does not connect to any actual banking systems, core banking engines, credit bureaus, or financial payment gateways. Fictional investment returns are not indicative of guaranteed future yield.


