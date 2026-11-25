import React, { useState } from "react";
import {
  CalendarCheck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  CarFront,
  ShieldCheck,
  Calendar,
  X,
  User,
  Phone,
  Sparkles,
  Ticket
} from "lucide-react";

export default function ReservationsView({
  reservations,
  onOpenBookingModal,
  onCancelReservation,
  onCheckInReservation
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPass, setSelectedPass] = useState(null);

  const filteredReservations = reservations.filter((res) => {
    const matchSearch =
      res.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      res.customerName.toLowerCase().includes(search.toLowerCase()) ||
      res.id.toLowerCase().includes(search.toLowerCase()) ||
      res.slot.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || res.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <CalendarCheck size={14} /> VALET & ADVANCE ALLOCATIONS
          </div>
          <h1>Parking Reservations</h1>
          <p>Manage advance bookings, VIP allocations, and arrival schedules.</p>
        </div>
        <div className="header-actions">
          <button className="primary-button" onClick={onOpenBookingModal}>
            <Plus size={16} /> New Reservation
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon blue">
            <CalendarCheck size={20} />
          </div>
          <div className="stat-copy">
            <span>Total Bookings</span>
            <strong>{reservations.length}</strong>
            <small>Active and upcoming passes</small>
          </div>
          <span className="stat-trend">Guaranteed Bay</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-copy">
            <span>Confirmed</span>
            <strong>{reservations.filter((r) => r.status === "Confirmed").length}</strong>
            <small>Slot reserved and locked</small>
          </div>
          <span className="stat-trend">Ready</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon orange">
            <Clock size={20} />
          </div>
          <div className="stat-copy">
            <span>Arriving Soon</span>
            <strong>{reservations.filter((r) => r.status === "Arriving Soon").length}</strong>
            <small>Due within the next 2 hours</small>
          </div>
          <span className="stat-trend down">Gate Ready</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon purple">
            <Ticket size={20} />
          </div>
          <div className="stat-copy">
            <span>Expected Revenue</span>
            <strong>
              ₹{reservations.reduce((acc, r) => acc + (r.estimatedAmount || 0), 0).toLocaleString("en-IN")}
            </strong>
            <small>Pre-authorized billings</small>
          </div>
          <span className="stat-trend">₹ Avg 250</span>
        </article>
      </section>

      {/* Reservations Table */}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Upcoming Reservations & Bookings</h2>
            <p>Showing {filteredReservations.length} scheduled reservations</p>
          </div>
          <span className="count-pill">{reservations.length} Total</span>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vehicle, reservation ID, or customer..."
            />
          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter reservation status"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Arriving Soon">Arriving Soon</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Vehicle & Customer</th>
                <th>Reserved Slot</th>
                <th>Date & Schedule</th>
                <th>Duration & Est. Charge</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <tr key={res.id}>
                    <td>
                      <strong className="mono" style={{ color: "var(--text-heading)", display: "block" }}>
                        {res.id}
                      </strong>
                      <small style={{ color: "var(--text-dim)", fontSize: "10px" }}>Instant QR Pass</small>
                    </td>
                    <td>
                      <strong className="mono" style={{ fontSize: "12px", color: "var(--text-heading)" }}>
                        {res.vehicleNumber}
                      </strong>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        {res.customerName} · {res.vehicleType}
                      </div>
                    </td>
                    <td>
                      <span className="count-pill" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
                        Slot {res.slot}
                      </span>
                    </td>
                    <td>
                      <strong style={{ fontSize: "11px", color: "var(--text-heading)", display: "block" }}>
                        {res.displayDate}
                      </strong>
                      <small style={{ color: "var(--text-muted)", fontSize: "10px" }}>
                        {res.startTime} - {res.endTime}
                      </small>
                    </td>
                    <td>
                      <strong style={{ color: "var(--text-heading)", display: "block" }}>
                        ₹{res.estimatedAmount}
                      </strong>
                      <small style={{ color: "var(--text-dim)", fontSize: "10px" }}>
                        {res.durationHours} hrs duration
                      </small>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          res.status === "Confirmed"
                            ? "badge-confirmed"
                            : res.status === "Arriving Soon"
                            ? "badge-arriving"
                            : res.status === "Cancelled"
                            ? "badge-cancelled"
                            : "badge-paid"
                        }`}
                      >
                        ● {res.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <button
                          className="secondary-button"
                          style={{ padding: "5px 10px", fontSize: "10px" }}
                          onClick={() => setSelectedPass(res)}
                          title="View Digital Pass"
                        >
                          Pass
                        </button>

                        {res.status !== "Cancelled" && res.status !== "Completed" && (
                          <>
                            {onCheckInReservation && (
                              <button
                                className="primary-button"
                                style={{ padding: "5px 10px", fontSize: "10px" }}
                                onClick={() => onCheckInReservation(res)}
                                title="Check in vehicle to active parking"
                              >
                                Check-in
                              </button>
                            )}
                            <button
                              className="secondary-button"
                              style={{ padding: "5px 8px", fontSize: "10px", color: "var(--danger)" }}
                              onClick={() => onCancelReservation(res.id)}
                              title="Cancel reservation"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "36px 12px" }}>
                    <div className="empty-state">
                      <div>
                        <CalendarCheck size={22} />
                      </div>
                      <b>No reservations match your search</b>
                      <span>Click 'New Reservation' to schedule an advance parking bay.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reservation Pass Modal */}
      {selectedPass && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedPass(null); }}>
          <div className="receipt-container" role="dialog">
            <header className="receipt-header">
              <button className="receipt-close-btn" onClick={() => setSelectedPass(null)}>
                <X size={16} />
              </button>
              <div className="receipt-brand">SMARTPARK RESERVATION PASS</div>
              <p>Automated ANPR Gate Clearance Pass</p>
            </header>

            <div className="receipt-body">
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <span className="receipt-status-stamp paid">VALID CONFIRMATION</span>
                <h3 className="mono" style={{ fontSize: "20px", marginTop: "6px", color: "#0f172a" }}>
                  {selectedPass.id}
                </h3>
              </div>

              <div className="receipt-meta-grid">
                <div>
                  <span>Vehicle Number</span>
                  <strong className="mono">{selectedPass.vehicleNumber}</strong>
                </div>
                <div>
                  <span>Vehicle Type</span>
                  <strong>{selectedPass.vehicleType}</strong>
                </div>
                <div>
                  <span>Reserved Slot</span>
                  <strong style={{ color: "var(--primary)" }}>{selectedPass.slot}</strong>
                </div>
                <div>
                  <span>Customer Name</span>
                  <strong>{selectedPass.customerName}</strong>
                </div>
                <div>
                  <span>Date</span>
                  <strong>{selectedPass.displayDate}</strong>
                </div>
                <div>
                  <span>Time Window</span>
                  <strong>{selectedPass.startTime} – {selectedPass.endTime}</strong>
                </div>
              </div>

              <div className="receipt-total-row">
                <span>ESTIMATED FARE</span>
                <strong>₹{selectedPass.estimatedAmount}</strong>
              </div>

              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", fontSize: "11px", border: "1px solid #e2e8f0" }}>
                <p style={{ margin: 0, color: "#64748b" }}>
                  <strong>Notes:</strong> {selectedPass.notes}
                </p>
              </div>

              <div className="receipt-barcode-wrap">
                <div className="barcode-lines" />
                <span className="mono" style={{ fontSize: "10px", color: "#64748b" }}>
                  SCAN AT GATE BARRIER {selectedPass.id}
                </span>
              </div>
            </div>

            <div className="receipt-footer-actions">
              <button className="secondary-button" onClick={() => window.print()}>
                Print Pass
              </button>
              <button className="primary-button" onClick={() => setSelectedPass(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
