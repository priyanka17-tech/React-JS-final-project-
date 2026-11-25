import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardView from "./components/DashboardView";
import ParkingSlotsView from "./components/ParkingSlotsView";
import VehiclesView from "./components/VehiclesView";
import ReservationsView from "./components/ReservationsView";
import PaymentsView from "./components/PaymentsView";
import AnalyticsView from "./components/AnalyticsView";
import ActivityLogView from "./components/ActivityLogView";
import SettingsView from "./components/SettingsView";
import ReceiptModal from "./components/ReceiptModal";
import InvoiceModal from "./components/InvoiceModal";
import AddVehicleModal from "./components/AddVehicleModal";
import ReservationModal from "./components/ReservationModal";
import Toast from "./components/Toast";

import {
  TOTAL_SLOTS,
  INITIAL_SLOTS,
  INITIAL_VEHICLES,
  INITIAL_PAYMENTS,
  INITIAL_RESERVATIONS,
  INITIAL_ACTIVITIES
} from "./data/initialData";

const SLOT_IDS = Array.from({ length: 20 }, (_, i) => `A-${String(i + 1).padStart(2, "0")}`);

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);

  // Core Data States
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [activity, setActivity] = useState(INITIAL_ACTIVITIES);

  // Theme & Appearance States
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("smartpark_theme") || "blue";
  });
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("smartpark_mode") || "light";
  });

  // Modal States
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [receiptPayment, setReceiptPayment] = useState(null);
  const [invoicePayment, setInvoicePayment] = useState(null);
  const [notice, setNotice] = useState("");

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("smartpark_theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", themeMode);
    localStorage.setItem("smartpark_mode", themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const notify = (msg) => {
    setNotice(msg);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setNotice(""), 3500);
  };

  // Occupancy metrics
  const occupiedSlots = useMemo(() => new Set(vehicles.map((v) => v.slot)), [vehicles]);
  const availableSlotsList = useMemo(() => {
    return slots.filter((s) => !occupiedSlots.has(s.id)).map((s) => s.id);
  }, [slots, occupiedSlots]);

  const pendingPaymentsCount = useMemo(() => {
    return payments.filter((p) => p.status === "Pending").length;
  }, [payments]);

  const upcomingReservationsCount = useMemo(() => {
    return reservations.filter((r) => r.status === "Confirmed" || r.status === "Arriving Soon").length;
  }, [reservations]);

  // Actions: Add vehicle
  const handleAddVehicle = (form) => {
    const number = form.number.trim().toUpperCase();
    const slot = form.slot.trim().toUpperCase();

    if (!/^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{1,4}$/.test(number)) {
      notify({ type: "error", message: "Enter a valid registration number, e.g. MH12AB1234." });
      return;
    }

    if (vehicles.some((v) => v.number === number)) {
      notify({ type: "error", message: `Vehicle ${number} is already checked in.` });
      return;
    }

    if (occupiedSlots.has(slot)) {
      notify({ type: "error", message: `Slot ${slot} is currently occupied.` });
      return;
    }

    if (vehicles.length >= TOTAL_SLOTS) {
      notify({ type: "error", message: "Facility parking is at 100% capacity." });
      return;
    }

    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const newVehicle = {
      id: Date.now(),
      number,
      type: form.type,
      slot,
      time: now,
      duration: "0h 01m (Active)",
      owner: form.owner || "Visitor",
      phone: form.phone || "—"
    };

    setVehicles((prev) => [newVehicle, ...prev]);

    // Create activity entry
    const newAct = {
      id: Date.now(),
      text: `${number} (${form.type}) entered and parked in Slot ${slot}`,
      type: "entry",
      time: now,
      actor: "Barrier In Gate 1"
    };
    setActivity((prev) => [newAct, ...prev]);

    // Create pending payment ticket
    const ratePerHour = form.type === "EV" ? 80 : form.type === "SUV" ? 70 : form.type === "Bike" ? 30 : 50;
    const newPayment = {
      id: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleNumber: number,
      vehicleType: form.type,
      customerName: form.owner || "Walk-in Visitor",
      phone: form.phone || "+91 98000 00000",
      slot,
      entryTime: now,
      exitTime: "—",
      duration: "Active Session",
      ratePerHour,
      subtotal: ratePerHour,
      tax: ratePerHour * 0.18,
      total: ratePerHour * 1.18,
      status: "Pending",
      method: "UPI",
      transactionId: `AUTH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      date: "24 Nov 2026",
      time: now
    };
    setPayments((prev) => [newPayment, ...prev]);

    setShowAddVehicleModal(false);
    notify(`Vehicle ${number} assigned to Slot ${slot}.`);
  };

  // Actions: Delete / Vacate vehicle
  const handleDeleteVehicle = (id) => {
    const vehicle = vehicles.find((v) => v.id === id);
    if (!vehicle) return;

    setVehicles((prev) => prev.filter((v) => v.id !== id));
    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

    const newAct = {
      id: Date.now(),
      text: `${vehicle.number} exited from Slot ${vehicle.slot}`,
      type: "exit",
      time: now,
      actor: "Barrier Exit Gate"
    };
    setActivity((prev) => [newAct, ...prev]);
    notify(`${vehicle.number} exited and Slot ${vehicle.slot} is now vacant.`);
  };

  // Actions: Quick checkout with automated bill and receipt display
  const handleQuickCheckout = (vehicle) => {
    handleDeleteVehicle(vehicle.id);

    // Find or create payment and mark as paid
    const existing = payments.find((p) => p.vehicleNumber === vehicle.number && p.status === "Pending");
    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

    if (existing) {
      const updated = {
        ...existing,
        exitTime: now,
        duration: "2h 15m",
        status: "Paid",
        transactionId: `TXN-POS-${Math.floor(100000 + Math.random() * 900000)}`
      };
      setPayments((prev) => prev.map((p) => (p.id === existing.id ? updated : p)));
      setReceiptPayment(updated);
    } else {
      const ratePerHour = vehicle.type === "EV" ? 80 : vehicle.type === "SUV" ? 70 : vehicle.type === "Bike" ? 30 : 50;
      const subtotal = ratePerHour * 2;
      const tax = subtotal * 0.18;
      const newPay = {
        id: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
        invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        vehicleNumber: vehicle.number,
        vehicleType: vehicle.type,
        customerName: vehicle.owner || "Walk-in Visitor",
        phone: vehicle.phone || "+91 98000 00000",
        slot: vehicle.slot,
        entryTime: vehicle.time,
        exitTime: now,
        duration: "2h 00m",
        ratePerHour,
        subtotal,
        tax,
        total: subtotal + tax,
        status: "Paid",
        method: "UPI",
        transactionId: `TXN-POS-${Math.floor(100000 + Math.random() * 900000)}`,
        date: "24 Nov 2026",
        time: now
      };
      setPayments((prev) => [newPay, ...prev]);
      setReceiptPayment(newPay);
    }

    notify(`Checkout completed for ${vehicle.number}. Receipt generated.`);
  };

  // Actions: Mark payment as paid
  const handleMarkPaid = (paymentId) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: "Paid" } : p))
    );
    if (receiptPayment && receiptPayment.id === paymentId) {
      setReceiptPayment((prev) => ({ ...prev, status: "Paid" }));
    }
    const payment = payments.find((p) => p.id === paymentId);
    if (payment) {
      const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      setActivity((prev) => [
        {
          id: Date.now(),
          text: `Payment of ₹${payment.total.toFixed(2)} received for ${payment.vehicleNumber} (${payment.method})`,
          type: "payment",
          time: now,
          actor: "POS Terminal Central"
        },
        ...prev
      ]);
    }
    notify(`Payment ${paymentId} marked as Paid.`);
  };

  // Actions: Advance reservations
  const handleAddReservation = (newRes) => {
    setReservations((prev) => [newRes, ...prev]);
    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setActivity((prev) => [
      {
        id: Date.now(),
        text: `New advance reservation ${newRes.id} for ${newRes.vehicleNumber} in Slot ${newRes.slot}`,
        type: "reservation",
        time: now,
        actor: "Online Portal"
      },
      ...prev
    ]);
    setShowReservationModal(false);
    notify(`Reservation ${newRes.id} confirmed for Slot ${newRes.slot}.`);
  };

  const handleCancelReservation = (id) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r))
    );
    notify(`Reservation ${id} has been cancelled.`);
  };

  const handleCheckInReservation = (res) => {
    if (occupiedSlots.has(res.slot)) {
      notify({ type: "error", message: `Slot ${res.slot} is currently occupied by another vehicle.` });
      return;
    }
    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const newVehicle = {
      id: Date.now(),
      number: res.vehicleNumber,
      type: res.vehicleType,
      slot: res.slot,
      time: now,
      duration: "0h 01m (Active)",
      owner: res.customerName,
      phone: res.phone
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    setReservations((prev) =>
      prev.map((r) => (r.id === res.id ? { ...r, status: "Completed" } : r))
    );
    notify(`Checked in reservation ${res.id}. ${res.vehicleNumber} parked in ${res.slot}.`);
  };

  const themeDisplayNames = {
    blue: "Premium Blue",
    purple: "Royal Purple",
    emerald: "Emerald Green",
    midnight: "Dark Midnight"
  };

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        availableCount={TOTAL_SLOTS - vehicles.length}
        pendingPaymentsCount={pendingPaymentsCount}
        upcomingReservationsCount={upcomingReservationsCount}
      />

      {/* Main App Container */}
      <main className="main-area">
        <Topbar
          activeTab={activeTab}
          mobileNav={mobileNav}
          setMobileNav={setMobileNav}
          themeMode={themeMode}
          toggleThemeMode={toggleThemeMode}
          currentThemeName={themeDisplayNames[theme]}
          onOpenAddVehicle={() => setShowAddVehicleModal(true)}
          onOpenReservation={() => setShowReservationModal(true)}
        />

        {/* View Switcher */}
        {activeTab === "dashboard" && (
          <DashboardView
            totalSlots={TOTAL_SLOTS}
            slotIds={SLOT_IDS}
            vehicles={vehicles}
            payments={payments}
            activity={activity}
            onOpenAddVehicle={() => setShowAddVehicleModal(true)}
            onDeleteVehicle={handleDeleteVehicle}
            onClearActivity={() => setActivity([])}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === "slots" && (
          <ParkingSlotsView
            slots={slots}
            vehicles={vehicles}
            reservations={reservations}
            onOpenAddVehicle={() => setShowAddVehicleModal(true)}
            onVacateSlot={handleDeleteVehicle}
          />
        )}

        {activeTab === "vehicles" && (
          <VehiclesView
            vehicles={vehicles}
            onOpenAddVehicle={() => setShowAddVehicleModal(true)}
            onDeleteVehicle={handleDeleteVehicle}
            onQuickCheckout={handleQuickCheckout}
          />
        )}

        {activeTab === "reservations" && (
          <ReservationsView
            reservations={reservations}
            onOpenBookingModal={() => setShowReservationModal(true)}
            onCancelReservation={handleCancelReservation}
            onCheckInReservation={handleCheckInReservation}
          />
        )}

        {activeTab === "payments" && (
          <PaymentsView
            payments={payments}
            onViewReceipt={(p) => setReceiptPayment(p)}
            onGenerateInvoice={(p) => setInvoicePayment(p)}
            onMarkPaid={handleMarkPaid}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsView
            payments={payments}
            vehicles={vehicles}
          />
        )}

        {activeTab === "activity" && (
          <ActivityLogView
            activities={activity}
            onClearActivity={() => setActivity([])}
          />
        )}

        {activeTab === "settings" && (
          <SettingsView
            currentTheme={theme}
            setTheme={setTheme}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            onSaveNotice={(msg) => notify(msg)}
          />
        )}
      </main>

      {/* Modals */}
      {showAddVehicleModal && (
        <AddVehicleModal
          onClose={() => setShowAddVehicleModal(false)}
          onAddVehicle={handleAddVehicle}
          availableSlots={availableSlotsList}
        />
      )}

      {showReservationModal && (
        <ReservationModal
          onClose={() => setShowReservationModal(false)}
          onAddReservation={handleAddReservation}
          availableSlots={availableSlotsList}
        />
      )}

      {receiptPayment && (
        <ReceiptModal
          payment={receiptPayment}
          onClose={() => setReceiptPayment(null)}
          onMarkPaid={handleMarkPaid}
        />
      )}

      {invoicePayment && (
        <InvoiceModal
          payment={invoicePayment}
          onClose={() => setInvoicePayment(null)}
        />
      )}

      {/* Global Notification Toast */}
      <Toast notice={notice} onClose={() => setNotice("")} />
    </div>
  );
}
