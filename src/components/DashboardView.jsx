import React, { useState, useMemo } from "react";
import {
  ParkingSquare,
  CarFront,
  CheckCircle2,
  Activity,
  Plus,
  SlidersHorizontal,
  ArrowUpRight,
  TrendingUp,
  Search,
  Clock3,
  Trash2,
  Bike,
  Truck,
  Zap,
  CreditCard,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

function StatCard({ label, value, note, icon: Icon, tone, trend }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon size={20} />
      </div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
      {trend && (
        <span className="stat-trend">
          <TrendingUp size={13} /> {trend}
        </span>
      )}
    </article>
  );
}

function ParkingCard({ vehicle, onDelete }) {
  const Icon = vehicle.type === "Bike" ? Bike : vehicle.type === "SUV" ? Truck : vehicle.type === "EV" ? Zap : CarFront;
  return (
    <article className="vehicle-card">
      <div className="vehicle-icon">
        <Icon size={21} />
      </div>
      <div className="vehicle-main">
        <strong className="mono">{vehicle.number}</strong>
        <span>
          {vehicle.type} <i /> Slot {vehicle.slot} <i /> {vehicle.owner || "Visitor"}
        </span>
      </div>
      <div className="vehicle-time">
        <Clock3 size={13} /> {vehicle.time} ({vehicle.duration || "Active"})
      </div>
      <button
        className="icon-button delete-button"
        title={`Remove ${vehicle.number}`}
        onClick={() => onDelete(vehicle.id)}
      >
        <Trash2 size={16} />
      </button>
    </article>
  );
}

export default function DashboardView({
  totalSlots,
  slotIds,
  vehicles,
  payments,
  activity,
  onOpenAddVehicle,
  onDeleteVehicle,
  onClearActivity,
  onNavigate
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const occupied = vehicles.length;
  const available = totalSlots - occupied;
  const occupancy = Math.round((occupied / totalSlots) * 100);

  // Revenue metrics
  const todayRevenue = useMemo(() => {
    return payments
      .filter((p) => p.status === "Paid")
      .reduce((acc, curr) => acc + curr.total, 0);
  }, [payments]);

  const pendingCount = useMemo(() => {
    return payments.filter((p) => p.status === "Pending").length;
  }, [payments]);

  const visibleVehicles = useMemo(
    () =>
      vehicles.filter(
        (v) =>
          (filter === "All" || v.type === filter) &&
          v.number.toLowerCase().includes(search.toLowerCase())
      ),
    [vehicles, filter, search]
  );

  const usedSlots = new Set(vehicles.map((v) => v.slot));

  return (
    <div className="content">
      {/* Welcome Banner */}
      <section className="welcome-row">
        <div>
          <div className="eyebrow">
            <ShieldCheck size={14} /> SMART PARKING CONTROL · COMMERCIAL SUITE
          </div>
          <h1>
            Good afternoon, Admin <span>✦</span>
          </h1>
          <p>Here's what's happening across your commercial parking facility today.</p>
        </div>
        <div className="header-actions">
          <button className="primary-button" onClick={onOpenAddVehicle}>
            <Plus size={18} /> Add vehicle
          </button>
        </div>
      </section>

      {/* Upgraded Stats Grid with Revenue Card & Payment Status Indicators */}
      <section className="stats-grid">
        <StatCard
          label="Total parking slots"
          value={totalSlots}
          note="Across all zones"
          icon={ParkingSquare}
          tone="blue"
        />

        <StatCard
          label="Occupied slots"
          value={occupied}
          note="Currently parked"
          icon={CarFront}
          tone="orange"
          trend={`${occupancy}%`}
        />

        <StatCard
          label="Available slots"
          value={available}
          note="Ready for parking"
          icon={CheckCircle2}
          tone="green"
        />

        {/* Beautiful Revenue Summary Card */}
        <article className="stat-card" style={{ cursor: "pointer" }} onClick={() => onNavigate("payments")}>
          <div className="stat-icon purple">
            <CreditCard size={20} />
          </div>
          <div className="stat-copy">
            <span>Today's Revenue</span>
            <strong style={{ color: "var(--primary)" }}>
              ₹{todayRevenue.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </strong>
            <small style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {pendingCount > 0 ? (
                <span style={{ color: "var(--warning)", fontWeight: "600" }}>
                  ● {pendingCount} Pending Payments
                </span>
              ) : (
                <span style={{ color: "var(--success)" }}>● All dues cleared</span>
              )}
            </small>
          </div>
          <span className="stat-trend">
            <ArrowUpRight size={13} /> Ledger
          </span>
        </article>
      </section>

      {/* Occupancy Donut & Quick Operations */}
      <section className="middle-grid">
        <article className="panel occupancy-panel">
          <div className="panel-heading">
            <div>
              <h2>Parking occupancy</h2>
              <p>Live overview of your facility</p>
            </div>
            <span className="soft-tag">
              <i /> Live data
            </span>
          </div>
          <div className="occupancy-body">
            <div className="donut-wrap">
              <div className="donut" style={{ "--progress": `${occupancy * 3.6}deg` }}>
                <div className="donut-inner">
                  <strong>{occupancy}%</strong>
                  <span>Occupied</span>
                </div>
              </div>
            </div>
            <div className="occupancy-legend">
              <div>
                <i className="legend-dot occupied-dot" />
                <span>Occupied</span>
                <b>{occupied}</b>
              </div>
              <div>
                <i className="legend-dot available-dot" />
                <span>Available</span>
                <b>{available}</b>
              </div>
              <div className="legend-total">
                Total capacity <strong>{totalSlots} slots</strong>
              </div>
            </div>
          </div>
          <div className="progress-track">
            <div style={{ width: `${occupancy}%` }} />
          </div>
          <div className="progress-caption">
            <span>Capacity used</span>
            <b>
              {occupied} of {totalSlots} slots
            </b>
          </div>
        </article>

        <article className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <h2>Quick actions</h2>
              <p>Common parking operations</p>
            </div>
            <SlidersHorizontal size={18} className="muted-icon" />
          </div>
          <button className="quick-action" onClick={onOpenAddVehicle}>
            <div className="quick-icon quick-blue">
              <Plus size={19} />
            </div>
            <div>
              <b>Register a vehicle</b>
              <span>Add a new vehicle to an available slot</span>
            </div>
            <ArrowUpRight size={16} />
          </button>
          <button className="quick-action" onClick={() => onNavigate("vehicles")}>
            <div className="quick-icon quick-green">
              <CarFront size={19} />
            </div>
            <div>
              <b>View parked vehicles</b>
              <span>Manage active parking records</span>
            </div>
            <ArrowUpRight size={16} />
          </button>
          <button className="quick-action" onClick={() => onNavigate("slots")}>
            <div className="quick-icon quick-purple">
              <ParkingSquare size={19} />
            </div>
            <div>
              <b>Check slot availability</b>
              <span>Explore multi-zone parking layout</span>
            </div>
            <ArrowUpRight size={16} />
          </button>
          <button className="quick-action" onClick={() => onNavigate("payments")}>
            <div className="quick-icon quick-amber">
              <CreditCard size={19} />
            </div>
            <div>
              <b>Payment & Revenue</b>
              <span>View collection ledger and receipts</span>
            </div>
            <ArrowUpRight size={16} />
          </button>
        </article>
      </section>

      {/* Parking Slot Overview */}
      <section className="panel slots-panel">
        <div className="panel-heading">
          <div>
            <h2>Parking slot overview</h2>
            <p>Zone A · First 20 of {totalSlots} parking spaces</p>
          </div>
          <div className="slot-legend">
            <span>
              <i className="available-dot" /> Available
            </span>
            <span>
              <i className="occupied-dot" /> Occupied
            </span>
            <button
              className="text-button"
              style={{ padding: "0 4px" }}
              onClick={() => onNavigate("slots")}
            >
              View all zones →
            </button>
          </div>
        </div>

        <div className="slot-grid">
          {slotIds.map((slot) => {
            const vehicle = vehicles.find((v) => v.slot === slot);
            return (
              <div
                className={`slot ${vehicle ? "slot-occupied" : "slot-available"}`}
                key={slot}
                onClick={() => onNavigate("slots")}
                title={vehicle ? `${vehicle.number} · ${vehicle.type}` : "Available"}
              >
                <span className="slot-car">
                  <CarFront size={18} />
                </span>
                <b>{slot}</b>
                <small>{vehicle ? "Occupied" : "Available"}</small>
              </div>
            );
          })}
        </div>

        <div className="slot-footnote">
          <span>
            <CheckCircle2 size={14} /> {20 - slotIds.filter((s) => usedSlots.has(s)).length} available in Zone A
          </span>
          <span>Showing 20 / {totalSlots} slots</span>
        </div>
      </section>

      {/* Parked Vehicles & Recent Activity Feed */}
      <section className="bottom-grid">
        <article className="panel vehicles-panel">
          <div className="panel-heading vehicle-heading">
            <div>
              <h2>Parked vehicles</h2>
              <p>Manage currently parked vehicles</p>
            </div>
            <span className="count-pill">{vehicles.length} vehicles</span>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vehicle number..."
              />
            </div>
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter vehicle type"
            >
              <option>All</option>
              <option>Car</option>
              <option>Bike</option>
              <option>SUV</option>
              <option>EV</option>
            </select>
          </div>

          <div className="vehicle-list">
            {visibleVehicles.length ? (
              visibleVehicles.map((vehicle) => (
                <ParkingCard key={vehicle.id} vehicle={vehicle} onDelete={onDeleteVehicle} />
              ))
            ) : (
              <div className="empty-state">
                <div>
                  <CarFront size={24} />
                </div>
                <b>No vehicles found</b>
                <span>
                  {vehicles.length === 0
                    ? "No vehicles are currently parked. Add your first vehicle."
                    : "Try changing your search or filter."}
                </span>
                <button className="primary-button" onClick={onOpenAddVehicle}>
                  <Plus size={15} /> Add vehicle
                </button>
              </div>
            )}
          </div>
        </article>

        <article className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent activity</h2>
              <p>Latest parking updates</p>
            </div>
            <button className="text-button" onClick={onClearActivity}>
              Clear
            </button>
          </div>

          <div className="activity-list">
            {activity.length ? (
              activity.slice(0, 6).map((item) => (
                <div className="activity-item" key={item.id}>
                  <div className={`activity-icon ${item.kind || item.type || "in"}`}>
                    <CarFront size={16} />
                  </div>
                  <div className="activity-text">
                    <b>{item.text}</b>
                    <span>
                      {item.kind === "in" || item.type === "entry" ? "Vehicle entry" : "Vehicle exit / operation"}
                    </span>
                  </div>
                  <time>{item.time}</time>
                </div>
              ))
            ) : (
              <div className="activity-empty">No recent activity.</div>
            )}
          </div>

          <div className="activity-footer">
            <span>
              <i /> Updates appear instantly
            </span>
          </div>
        </article>
      </section>

      <footer>
        <div>© 2026 SmartPark Commercial Management Suite</div>
        <span>React 18 · Multi-Theme SaaS Architecture</span>
      </footer>
    </div>
  );
}
