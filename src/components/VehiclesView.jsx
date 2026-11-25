import React, { useState, useMemo } from "react";
import {
  CarFront,
  Plus,
  Search,
  Filter,
  Trash2,
  Clock,
  Bike,
  Truck,
  Zap,
  CheckCircle2,
  FileText,
  CreditCard
} from "lucide-react";

export default function VehiclesView({
  vehicles,
  onOpenAddVehicle,
  onDeleteVehicle,
  onQuickCheckout
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchSearch =
        v.number.toLowerCase().includes(search.toLowerCase()) ||
        v.slot.toLowerCase().includes(search.toLowerCase()) ||
        (v.owner && v.owner.toLowerCase().includes(search.toLowerCase()));

      const matchType = typeFilter === "All" || v.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [vehicles, search, typeFilter]);

  const getVehicleIcon = (type) => {
    if (type === "Bike") return Bike;
    if (type === "SUV") return Truck;
    if (type === "EV") return Zap;
    return CarFront;
  };

  return (
    <div className="content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <CarFront size={14} /> LIVE PARKING ROSTER
          </div>
          <h1>Vehicle Management</h1>
          <p>Monitor all active parked vehicles, assign bays, and process checkouts.</p>
        </div>
        <div className="header-actions">
          <div className="mode-toggle-group">
            <button
              className={`mode-pill ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              Table View
            </button>
            <button
              className={`mode-pill ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              Card Grid
            </button>
          </div>
          <button className="primary-button" onClick={onOpenAddVehicle}>
            <Plus size={16} /> Register Vehicle
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon blue">
            <CarFront size={20} />
          </div>
          <div className="stat-copy">
            <span>Parked Vehicles</span>
            <strong>{vehicles.length}</strong>
            <small>Active in bays right now</small>
          </div>
          <span className="stat-trend">Live</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon purple">
            <CarFront size={20} />
          </div>
          <div className="stat-copy">
            <span>Cars & SUVs</span>
            <strong>{vehicles.filter((v) => v.type === "Car" || v.type === "SUV").length}</strong>
            <small>Standard & large bays</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">
            <Bike size={20} />
          </div>
          <div className="stat-copy">
            <span>Two-Wheelers</span>
            <strong>{vehicles.filter((v) => v.type === "Bike").length}</strong>
            <small>Dedicated bike bays</small>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon cyan">
            <Zap size={20} />
          </div>
          <div className="stat-copy">
            <span>Electric Vehicles</span>
            <strong>{vehicles.filter((v) => v.type === "EV").length}</strong>
            <small>Fast charging bays</small>
          </div>
        </article>
      </section>

      {/* Vehicles Container */}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Active Parked Fleet</h2>
            <p>Showing {filteredVehicles.length} of {vehicles.length} vehicles</p>
          </div>
          <span className="count-pill">{vehicles.length} Active Records</span>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by license plate, bay number, or owner name..."
            />
          </div>

          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter vehicle type"
          >
            <option value="All">All Vehicle Types</option>
            <option value="Car">Car</option>
            <option value="SUV">SUV</option>
            <option value="Bike">Bike</option>
            <option value="EV">EV (Electric)</option>
          </select>
        </div>

        {viewMode === "table" ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vehicle Number</th>
                  <th>Type</th>
                  <th>Assigned Bay</th>
                  <th>Entry Timestamp</th>
                  <th>Duration</th>
                  <th>Driver / Contact</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => {
                    const Icon = getVehicleIcon(vehicle.type);
                    return (
                      <tr key={vehicle.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div className="vehicle-icon" style={{ width: "32px", height: "32px" }}>
                              <Icon size={16} />
                            </div>
                            <div>
                              <strong className="mono" style={{ fontSize: "13px", color: "var(--text-heading)", display: "block" }}>
                                {vehicle.number}
                              </strong>
                              <small style={{ color: "var(--text-dim)", fontSize: "10px" }}>ID #{vehicle.id}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="count-pill" style={{ background: "var(--bg-card-subtle)", color: "var(--text-body)" }}>
                            {vehicle.type}
                          </span>
                        </td>
                        <td>
                          <strong className="mono" style={{ color: "var(--primary)", fontSize: "12px" }}>
                            {vehicle.slot}
                          </strong>
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-body)" }}>
                            <Clock size={12} style={{ color: "var(--text-muted)" }} />
                            <span>{vehicle.time}</span>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: "600", color: "var(--text-heading)" }}>
                            {vehicle.duration || "Active"}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: "11px", color: "var(--text-body)", display: "block" }}>
                            {vehicle.owner || "Visitor"}
                          </span>
                          <small style={{ color: "var(--text-dim)", fontSize: "10px" }}>
                            {vehicle.phone || "—"}
                          </small>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            {onQuickCheckout && (
                              <button
                                className="primary-button"
                                style={{ padding: "5px 10px", fontSize: "10px" }}
                                onClick={() => onQuickCheckout(vehicle)}
                                title="Process checkout & bill"
                              >
                                Checkout
                              </button>
                            )}
                            <button
                              className="btn-icon-sm"
                              onClick={() => onDeleteVehicle(vehicle.id)}
                              title="Remove without billing"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "36px 12px" }}>
                      <div className="empty-state">
                        <div>
                          <CarFront size={22} />
                        </div>
                        <b>No parked vehicles found</b>
                        <span>{vehicles.length === 0 ? "No vehicles are currently parked." : "Try different filter or search parameters."}</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="vehicle-list">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => {
                const Icon = getVehicleIcon(vehicle.type);
                return (
                  <article className="vehicle-card" key={vehicle.id}>
                    <div className="vehicle-icon">
                      <Icon size={20} />
                    </div>
                    <div className="vehicle-main">
                      <strong className="mono">{vehicle.number}</strong>
                      <span>
                        {vehicle.type} <i /> Slot {vehicle.slot} <i /> {vehicle.owner || "Walk-in Visitor"}
                      </span>
                    </div>
                    <div className="vehicle-time">
                      <Clock size={13} /> {vehicle.time} ({vehicle.duration || "Active"})
                    </div>
                    <div style={{ display: "flex", gap: "6px", marginLeft: "10px" }}>
                      {onQuickCheckout && (
                        <button
                          className="secondary-button"
                          style={{ padding: "4px 8px", fontSize: "10px" }}
                          onClick={() => onQuickCheckout(vehicle)}
                        >
                          Checkout
                        </button>
                      )}
                      <button
                        className="icon-button delete-button"
                        onClick={() => onDeleteVehicle(vehicle.id)}
                        title="Remove vehicle"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="empty-state">
                <div><CarFront size={24} /></div>
                <b>No vehicles found</b>
                <span>Try clearing search criteria.</span>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
