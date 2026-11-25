import React, { useState } from "react";
import {
  ParkingSquare,
  CarFront,
  Zap,
  CheckCircle2,
  Filter,
  Plus,
  ShieldCheck,
  AlertCircle,
  X
} from "lucide-react";

export default function ParkingSlotsView({
  slots,
  vehicles,
  reservations,
  onOpenAddVehicle,
  onVacateSlot
}) {
  const [selectedZone, setSelectedZone] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const vehicleMap = new Map(vehicles.map((v) => [v.slot, v]));
  const reservationMap = new Map(reservations.filter((r) => r.status === "Confirmed").map((r) => [r.slot, r]));

  const filteredSlots = slots.filter((slot) => {
    const isOccupied = vehicleMap.has(slot.id);
    const isReserved = reservationMap.has(slot.id);

    const matchZone = selectedZone === "All" || slot.zone === selectedZone;

    let matchStatus = true;
    if (statusFilter === "Available") matchStatus = !isOccupied && !isReserved;
    else if (statusFilter === "Occupied") matchStatus = isOccupied;
    else if (statusFilter === "Reserved") matchStatus = isReserved;
    else if (statusFilter === "EV") matchStatus = slot.isEV;

    return matchZone && matchStatus;
  });

  const totalSlotsCount = slots.length;
  const occupiedCount = slots.filter((s) => vehicleMap.has(s.id)).length;
  const reservedCount = slots.filter((s) => !vehicleMap.has(s.id) && reservationMap.has(s.id)).length;
  const availableCount = totalSlotsCount - occupiedCount - reservedCount;

  return (
    <div className="content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <ParkingSquare size={14} /> FACILITY BAY ALLOCATION
          </div>
          <h1>Parking Slot Management</h1>
          <p>Multi-zone bay monitoring, EV supercharger allocation, and real-time bay telemetry.</p>
        </div>
        <div className="header-actions">
          <button className="primary-button" onClick={onOpenAddVehicle}>
            <Plus size={16} /> Park Vehicle
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon blue">
            <ParkingSquare size={20} />
          </div>
          <div className="stat-copy">
            <span>Total Bays</span>
            <strong>{totalSlotsCount}</strong>
            <small>Zone A & Zone B combined</small>
          </div>
          <span className="stat-trend">100% Monitored</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-copy">
            <span>Available Now</span>
            <strong>{availableCount}</strong>
            <small>Ready for immediate entry</small>
          </div>
          <span className="stat-trend">{Math.round((availableCount / totalSlotsCount) * 100)}% Free</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon orange">
            <CarFront size={20} />
          </div>
          <div className="stat-copy">
            <span>Occupied</span>
            <strong>{occupiedCount}</strong>
            <small>Active parking sessions</small>
          </div>
          <span className="stat-trend down">{Math.round((occupiedCount / totalSlotsCount) * 100)}% In Use</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon purple">
            <Zap size={20} />
          </div>
          <div className="stat-copy">
            <span>Reserved & EV</span>
            <strong>{reservedCount + slots.filter((s) => s.isEV).length}</strong>
            <small>Priority bays allocated</small>
          </div>
          <span className="stat-trend">VIP & Green</span>
        </article>
      </section>

      {/* Main Slots Grid Panel */}
      <section className="panel slots-panel">
        <div className="panel-heading">
          <div>
            <h2>Interactive Parking Bays</h2>
            <p>Click on any bay to view vehicle details or manage allocation</p>
          </div>
          <div className="slot-legend">
            <span><i className="available-dot" /> Available</span>
            <span><i className="occupied-dot" /> Occupied</span>
            <span><i className="reserved-dot" /> Reserved</span>
            <span style={{ color: "#06b6d4" }}>⚡ EV Fast Charging</span>
          </div>
        </div>

        {/* Filters */}
        <div className="toolbar">
          <div className="mode-toggle-group">
            <button
              className={`mode-pill ${selectedZone === "All" ? "active" : ""}`}
              onClick={() => setSelectedZone("All")}
            >
              All Zones
            </button>
            <button
              className={`mode-pill ${selectedZone === "Zone A" ? "active" : ""}`}
              onClick={() => setSelectedZone("Zone A")}
            >
              Zone A (Standard)
            </button>
            <button
              className={`mode-pill ${selectedZone === "Zone B" ? "active" : ""}`}
              onClick={() => setSelectedZone("Zone B")}
            >
              Zone B (Premium)
            </button>
          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter bay status"
          >
            <option value="All">All Bay Statuses</option>
            <option value="Available">Available Only</option>
            <option value="Occupied">Occupied Only</option>
            <option value="Reserved">Reserved Only</option>
            <option value="EV">EV Charging Bays Only</option>
          </select>
        </div>

        {/* Slots Grid */}
        <div className="slot-grid">
          {filteredSlots.map((slot) => {
            const vehicle = vehicleMap.get(slot.id);
            const reservation = reservationMap.get(slot.id);

            let statusClass = "slot-available";
            let statusText = "Available";

            if (vehicle) {
              statusClass = "slot-occupied";
              statusText = "Occupied";
            } else if (reservation) {
              statusClass = "slot-reserved";
              statusText = "Reserved";
            }

            return (
              <div
                key={slot.id}
                className={`slot ${statusClass}`}
                onClick={() => setSelectedSlot({ ...slot, vehicle, reservation })}
                title={`Slot ${slot.id} · ${statusText}`}
              >
                {slot.isEV && <span className="slot-ev-badge">⚡ EV</span>}
                <span className="slot-car">
                  <CarFront size={18} />
                </span>
                <b>{slot.id}</b>
                <small>{vehicle ? vehicle.number : statusText}</small>
              </div>
            );
          })}
        </div>

        <div className="slot-footnote">
          <span>
            <CheckCircle2 size={14} /> {availableCount} bays vacant and ready for parking
          </span>
          <span>Standard tariff: ₹50 - ₹80/hr</span>
        </div>
      </section>

      {/* Slot Details Modal */}
      {selectedSlot && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedSlot(null); }}>
          <div className="vehicle-modal" style={{ width: "min(100%, 460px)" }}>
            <div className="modal-heading">
              <div>
                <span className="modal-kicker">BAY TELEMETRY</span>
                <h2>Slot {selectedSlot.id} Details</h2>
                <p>{selectedSlot.zone} · Base Rate: ₹{selectedSlot.ratePerHour}/hour</p>
              </div>
              <button className="icon-button" onClick={() => setSelectedSlot(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "grid", gap: "12px", background: "var(--bg-card-subtle)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Current Status:</span>
                <span className={`badge ${selectedSlot.vehicle ? "badge-paid" : selectedSlot.reservation ? "badge-pending" : "badge-confirmed"}`}>
                  {selectedSlot.vehicle ? "● Occupied" : selectedSlot.reservation ? "● Reserved" : "● Available"}
                </span>
              </div>

              {selectedSlot.isEV && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>EV Charging:</span>
                  <strong style={{ color: "#06b6d4" }}>Fast Charger Level 2 (22kW)</strong>
                </div>
              )}

              {selectedSlot.vehicle && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Vehicle Number:</span>
                    <strong className="mono">{selectedSlot.vehicle.number}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Vehicle Type:</span>
                    <strong>{selectedSlot.vehicle.type}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Entry Time:</span>
                    <strong>{selectedSlot.vehicle.time}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Duration:</span>
                    <strong>{selectedSlot.vehicle.duration || "Active"}</strong>
                  </div>
                </>
              )}

              {selectedSlot.reservation && !selectedSlot.vehicle && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Reserved For:</span>
                    <strong className="mono">{selectedSlot.reservation.vehicleNumber}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Customer Name:</span>
                    <strong>{selectedSlot.reservation.customerName}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Time Window:</span>
                    <strong>{selectedSlot.reservation.startTime} - {selectedSlot.reservation.endTime}</strong>
                  </div>
                </>
              )}
            </div>

            <div className="modal-actions">
              {selectedSlot.vehicle ? (
                <button
                  className="secondary-button"
                  style={{ color: "var(--danger)" }}
                  onClick={() => {
                    onVacateSlot(selectedSlot.vehicle.id);
                    setSelectedSlot(null);
                  }}
                >
                  Vacate / Checkout Bay
                </button>
              ) : (
                <button
                  className="primary-button"
                  onClick={() => {
                    setSelectedSlot(null);
                    onOpenAddVehicle();
                  }}
                >
                  <Plus size={16} /> Assign Vehicle Here
                </button>
              )}
              <button className="secondary-button" onClick={() => setSelectedSlot(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
