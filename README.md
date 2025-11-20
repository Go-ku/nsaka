# Nsaka

A minimalist, mobile-first real estate control room tailored for Zambia. The app is built on Next.js 15 server components (app router) with Tailwind CSS and shadcn-inspired primitives, React Table, and MongoDB-ready data models.

## Features
- Role-aware workspace for system admin, manager, landlord, property manager, maintenance team, and tenants.
- Log rent payments, issue receipts, and track which ones are outstanding.
- Send invoices/reminders with Zambian currency formatting.
- Lease tracking with upcoming rental increase visibility.
- Maintenance intake and prioritisation with a live queue.
- Mobile-first layout that also scales to desktop.

## Tech
- Next.js 15 (app router, server components preferred)
- React 18
- Tailwind CSS with minimalist modern styling
- shadcn-style primitives (buttons, badges, cards) and React Table for data grids
- MongoDB-ready models (data currently mocked for quick demos)

## Getting started
1. Install dependencies (requires npm access):
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to access the dashboard.

> If package downloads are blocked in your environment, the source still includes all pages and UI wiring—you can install later when registry access is available.
