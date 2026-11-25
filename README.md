# SmartPark — Parking Slot Management System

A responsive React JS case-study project built with Vite, functional components, props, `useState`, array methods, and CSS.

## Features
- Dashboard statistics update dynamically from React state.
- Add vehicles with registration number, vehicle type, and slot.
- Delete vehicles and update occupancy instantly.
- Reusable `ParkingCard` component receives vehicle data and delete handler through props.
- Duplicate vehicle numbers and occupied slots are rejected.
- Search by registration number and filter by vehicle type.
- Visual Zone A parking layout, occupancy progress, and recent activity.
- Responsive desktop, tablet, and mobile layout.
- Empty state when no matching vehicles are shown.

## Run on your Mac
1. Install Node.js (LTS) if it is not installed: https://nodejs.org/
2. Extract the ZIP and open the `SmartPark` folder in VS Code.
3. Open Terminal in that folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL shown by Vite (usually http://localhost:5173).

## Build check
```bash
npm run build
```

## Case-study mapping
1. Form: vehicle number, vehicle type, parking slot number.
2. Reusable component: `ParkingCard` in `src/App.jsx`, receives `vehicle` and `onDelete` props.
3. State: `useState` stores vehicles, form, filters, activity and UI state.
4. Add/Delete: `addVehicle` and `deleteVehicle` functions.
5. Dynamic list and empty state: `visibleVehicles.map(...)` and the conditional empty state.

## Notes
- This is a front-end college case study. It does not use a backend or database.
- The initial six vehicles are sample demo data. Changes remain in React state while the app is open and reset on page refresh.
- The parking overview shows 100 total spaces; the visual grid displays the first 20 spaces in Zone A.
