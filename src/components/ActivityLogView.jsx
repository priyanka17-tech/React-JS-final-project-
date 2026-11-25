import React, { useState } from "react";
import {
  Activity,
  Search,
  Filter,
  CarFront,
  CreditCard,
  CalendarCheck,
  Download,
  Trash2,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function ActivityLogView({ activities, onClearActivity }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredActivities = activities.filter((act) => {
    const matchSearch =
      act.text.toLowerCase().includes(search.toLowerCase()) ||
      (act.actor && act.actor.toLowerCase().includes(search.toLowerCase()));

    const matchType = typeFilter === "All" || act.type === typeFilter;
    return matchSearch && matchType;
  });

  const getIcon = (type) => {
    if (type === "payment") return CreditCard;
    if (type === "reservation") return CalendarCheck;
    return CarFront;
  };

  return (
    <div className="content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <Activity size={14} /> SECURITY & BARRIER TELEMETRY
          </div>
          <h1>System Activity Log</h1>
          <p>Immutable audit trail of vehicle entry/exit, payments, and gate operations.</p>
        </div>
        <div className="header-actions">
          <button
            className="secondary-button"
            onClick={() => {
              const text = activities
                .map((a) => `[${a.time}] ${a.text} (Source: ${a.actor || "System"})`)
                .join("\n");
              const blob = new Blob([text], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `SmartPark-Activity-Audit.log`;
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download size={14} /> Export Audit Log
          </button>
          {activities.length > 0 && (
            <button className="secondary-button" onClick={onClearActivity} style={{ color: "var(--danger)" }}>
              <Trash2 size={14} /> Clear Log
            </button>
          )}
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Real-time Event Stream</h2>
            <p>Monitored via Automatic Number Plate Recognition (ANPR) cameras</p>
          </div>
          <span className="soft-tag">
            <i /> Live Syncing
          </span>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event descriptions or terminal names..."
            />
          </div>

          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter activity type"
          >
            <option value="All">All Event Types</option>
            <option value="entry">Vehicle Entry</option>
            <option value="exit">Vehicle Exit</option>
            <option value="payment">Payment Transactions</option>
            <option value="reservation">Reservations</option>
          </select>
        </div>

        <div className="activity-list">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((item) => {
              const Icon = getIcon(item.type);
              return (
                <div className="activity-item" key={item.id} style={{ padding: "14px 6px" }}>
                  <div className={`activity-icon ${item.type || item.kind}`}>
                    <Icon size={16} />
                  </div>
                  <div className="activity-text">
                    <b style={{ fontSize: "13px" }}>{item.text}</b>
                    <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span>Source: {item.actor || "ANPR Barrier 1"}</span>
                      <span>·</span>
                      <span style={{ textTransform: "capitalize" }}>Event: {item.type || "System"}</span>
                    </span>
                  </div>
                  <time className="mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    {item.time}
                  </time>
                </div>
              );
            })
          ) : (
            <div className="activity-empty">No activity records match your criteria.</div>
          )}
        </div>

        <div className="activity-footer">
          <span>
            <i /> Connected to Central Access Controller · 99.98% uptime
          </span>
        </div>
      </section>
    </div>
  );
}
