import React, { useState } from "react";
import { X, CalendarCheck, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReservationModal({
  onClose,
  onAddReservation,
  availableSlots = []
}) {
  const [form, setForm] = useState({
    vehicleNumber: "",
    vehicleType: "Car",
    customerName: "",
    phone: "",
    slot: availableSlots[0] || "A-04",
    date: "2026-11-24",
    startTime: "14:00",
    endTime: "17:00",
    notes: ""
  });

  // Calculate estimated duration & charges
  const startHour = parseInt(form.startTime.split(":")[0], 10) || 14;
  const endHour = parseInt(form.endTime.split(":")[0], 10) || 17;
  const durationHours = Math.max(1, endHour - startHour);
  const hourlyRate = form.vehicleType === "EV" ? 80 : form.vehicleType === "SUV" ? 70 : form.vehicleType === "Bike" ? 30 : 50;
  const subtotal = durationHours * hourlyRate;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.vehicleNumber.trim()) return;

    const newRes = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleNumber: form.vehicleNumber.trim().toUpperCase(),
      vehicleType: form.vehicleType,
      customerName: form.customerName.trim() || "Visitor Guest",
      phone: form.phone.trim() || "+91 98000 12345",
      slot: form.slot,
      date: form.date,
      displayDate: form.date === "2026-11-24" ? "Today, 24 Nov" : form.date === "2026-11-25" ? "Tomorrow, 25 Nov" : form.date,
      startTime: formatTime(form.startTime),
      endTime: formatTime(form.endTime),
      durationHours,
      estimatedAmount: total,
      status: "Confirmed",
      notes: form.notes || "Standard reserved slot"
    };

    onAddReservation(newRes);
  };

  const formatTime = (timeStr) => {
    const [h, m] = timeStr.split(":");
    let hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${String(hour).padStart(2, "0")}:${m} ${ampm}`;
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="vehicle-modal" style={{ width: "min(100%, 540px)" }} onSubmit={handleSubmit}>
        <div className="modal-heading">
          <div>
            <span className="modal-kicker">ADVANCE BOOKING</span>
            <h2>Book parking slot</h2>
            <p>Reserve an available bay ahead of time for guaranteed parking.</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            <X size={19} />
          </button>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="res-num">Vehicle Number</label>
            <input
              id="res-num"
              className="form-input mono"
              autoFocus
              value={form.vehicleNumber}
              onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value.toUpperCase() })}
              placeholder="e.g. MH12AB9988"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="res-type">Vehicle Type</label>
            <select
              id="res-type"
              className="form-select"
              value={form.vehicleType}
              onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
            >
              <option value="Car">Car (Standard)</option>
              <option value="SUV">SUV (Large)</option>
              <option value="Bike">Bike (Two-Wheeler)</option>
              <option value="EV">EV (Fast Charging Bay)</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="res-name">Customer Name</label>
            <input
              id="res-name"
              className="form-input"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              placeholder="e.g. Anita Deshmukh"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="res-phone">Phone Number</label>
            <input
              id="res-phone"
              className="form-input"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98200 XXXXX"
              required
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="res-slot">Select Parking Slot</label>
            <select
              id="res-slot"
              className="form-select mono"
              value={form.slot}
              onChange={(e) => setForm({ ...form, slot: e.target.value })}
            >
              {availableSlots.length > 0 ? (
                availableSlots.map((s) => (
                  <option key={s} value={s}>{s} (Available)</option>
                ))
              ) : (
                <option value="A-04">A-04</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="res-date">Reservation Date</label>
            <input
              id="res-date"
              type="date"
              className="form-input"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="res-start">Arrival Time</label>
            <input
              id="res-start"
              type="time"
              className="form-input"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="res-end">Departure Time</label>
            <input
              id="res-end"
              type="time"
              className="form-input"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />
          </div>
        </div>

        <div className="rate-estimate-box">
          <div>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>
              Duration: {durationHours} hour(s) · Rate: ₹{hourlyRate}/hr
            </span>
            <small style={{ fontSize: "10px", color: "var(--text-dim)" }}>
              Includes 18% GST (₹{tax}) · Free cancellation up to 1h prior
            </small>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "10px", textTransform: "uppercase", color: "var(--text-muted)", display: "block" }}>
              Total Estimate
            </span>
            <strong>₹{total}</strong>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button" type="submit">
            <CalendarCheck size={16} /> Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}
