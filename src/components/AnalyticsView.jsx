import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  CarFront,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Calendar
} from "lucide-react";
import { ANALYTICS_DATA } from "../data/initialData";

export default function AnalyticsView({ payments, vehicles }) {
  const [activeRange, setActiveRange] = useState("week");
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const { dailyRevenue, monthlyRevenue, hourlyOccupancy, vehicleDistribution, topSlots } = ANALYTICS_DATA;

  // Max values for chart scaling
  const maxDailyRevenue = Math.max(...dailyRevenue.map((d) => d.revenue));
  const maxMonthlyRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));
  const totalAnnual = monthlyRevenue.reduce((acc, m) => acc + m.revenue, 0);
  const avgDaily = Math.round(dailyRevenue.reduce((acc, d) => acc + d.revenue, 0) / dailyRevenue.length);

  return (
    <div className="content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <BarChart3 size={14} /> INTELLIGENCE & PERFORMANCE
          </div>
          <h1>Analytics & Financial Insights</h1>
          <p>Comprehensive telemetry on occupancy, turnover rates, vehicle classes, and earnings.</p>
        </div>
        <div className="header-actions">
          <div className="mode-toggle-group">
            <button
              className={`mode-pill ${activeRange === "week" ? "active" : ""}`}
              onClick={() => setActiveRange("week")}
            >
              Last 7 Days
            </button>
            <button
              className={`mode-pill ${activeRange === "month" ? "active" : ""}`}
              onClick={() => setActiveRange("month")}
            >
              Year-to-Date
            </button>
          </div>
        </div>
      </div>

      {/* Top Metric Highlights */}
      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon green">
            <TrendingUp size={20} />
          </div>
          <div className="stat-copy">
            <span>Total Earnings (YTD)</span>
            <strong>₹{(totalAnnual / 100000).toFixed(2)} Lakhs</strong>
            <small>₹{totalAnnual.toLocaleString("en-IN")} net</small>
          </div>
          <span className="stat-trend">
            <ArrowUpRight size={13} /> +24.8% YoY
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-icon blue">
            <DollarSign size={20} />
          </div>
          <div className="stat-copy">
            <span>Daily Average Revenue</span>
            <strong>₹{avgDaily.toLocaleString("en-IN")}</strong>
            <small>Across 100 available bays</small>
          </div>
          <span className="stat-trend">
            <ArrowUpRight size={13} /> +14.2%
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-icon purple">
            <Clock size={20} />
          </div>
          <div className="stat-copy">
            <span>Average Dwell Time</span>
            <strong>2h 24m</strong>
            <small>Optimal turnover rate 4.8x</small>
          </div>
          <span className="stat-trend">
            Steady
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-icon cyan">
            <Zap size={20} />
          </div>
          <div className="stat-copy">
            <span>Peak Occupancy</span>
            <strong>96%</strong>
            <small>Recorded at 06:00 PM</small>
          </div>
          <span className="stat-trend">
            Prime Slot
          </span>
        </article>
      </section>

      {/* Primary Revenue Charts Grid */}
      <div className="middle-grid">
        {/* Daily Revenue Chart */}
        <article className="panel chart-card">
          <div className="chart-header">
            <div>
              <h2>Daily Revenue Trend</h2>
              <p>Earnings breakdown for the past 7 days</p>
            </div>
            <div className="chart-metric-callout">
              <span>This Week</span>
              <strong>₹{dailyRevenue.reduce((a, b) => a + b.revenue, 0).toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="bar-chart-container">
            {dailyRevenue.map((item, idx) => {
              const heightPct = Math.round((item.revenue / maxDailyRevenue) * 88);
              return (
                <div
                  key={item.day}
                  className="bar-col"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="bar-tooltip">
                    ₹{item.revenue.toLocaleString("en-IN")} ({item.vehicles} vehicles)
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: item.day.includes("Today") ? "var(--primary)" : "rgba(var(--primary-rgb), 0.65)"
                      }}
                    />
                  </div>
                  <span className="bar-label">{item.day}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px", fontSize: "11px", color: "var(--text-muted)" }}>
            <span>* Peak collection on weekends (Sat-Sun)</span>
            <span style={{ color: "var(--primary)", fontWeight: "700" }}>✦ High Turnover Zone A</span>
          </div>
        </article>

        {/* Monthly Revenue Trend (SVG Curved Area Chart) */}
        <article className="panel chart-card">
          <div className="chart-header">
            <div>
              <h2>Monthly Revenue Trajectory</h2>
              <p>Jan – Dec 2026 commercial revenue (₹ in Thousands)</p>
            </div>
            <div className="chart-metric-callout">
              <span>Projected Annual</span>
              <strong>₹56.0L</strong>
            </div>
          </div>

          <div className="svg-chart-wrap">
            <svg viewBox="0 0 500 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="45" x2="500" y2="45" stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <line x1="0" y1="135" x2="500" y2="135" stroke="var(--border-subtle)" strokeDasharray="3 3" />

              {/* Smooth Area & Path */}
              {(() => {
                const points = monthlyRevenue.map((m, i) => {
                  const x = (i / (monthlyRevenue.length - 1)) * 480 + 10;
                  const y = 160 - (m.revenue / maxMonthlyRevenue) * 130;
                  return { x, y, ...m };
                });

                const dPath = points.reduce((acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.y}`, "");
                const areaPath = `${dPath} L ${points[points.length - 1].x} 175 L ${points[0].x} 175 Z`;

                return (
                  <>
                    <path d={areaPath} fill="url(#areaGradient)" />
                    <path d={dPath} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
                    {points.map((p, idx) => (
                      <circle
                        key={p.month}
                        cx={p.x}
                        cy={p.y}
                        r={hoveredMonth === idx ? "6" : "3.5"}
                        fill="var(--bg-card)"
                        stroke="var(--primary)"
                        strokeWidth="2.5"
                        onMouseEnter={() => setHoveredMonth(idx)}
                        onMouseLeave={() => setHoveredMonth(null)}
                        style={{ cursor: "pointer", transition: "r 0.15s" }}
                      />
                    ))}
                  </>
                );
              })()}
            </svg>

            {/* X Axis Labels */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10px", color: "var(--text-muted)" }}>
              {monthlyRevenue.map((m) => (
                <span key={m.month}>{m.month.split(" ")[0]}</span>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* Hourly Occupancy Wave & Vehicle Distribution */}
      <div className="middle-grid">
        {/* Hourly Occupancy */}
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>24-Hour Parking Occupancy Graph</h2>
              <p>Facility utilization rate across daily business hours</p>
            </div>
            <span className="soft-tag">Peak: 06:00 PM (96%)</span>
          </div>

          <div className="svg-chart-wrap" style={{ height: "190px" }}>
            <svg viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="occGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area path for occupancy */}
              {(() => {
                const points = hourlyOccupancy.map((h, i) => {
                  const x = (i / (hourlyOccupancy.length - 1)) * 480 + 10;
                  const y = 145 - (h.occupancy / 100) * 125;
                  return { x, y, ...h };
                });

                const d = points.reduce((acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.y}`, "");
                const area = `${d} L ${points[points.length - 1].x} 150 L ${points[0].x} 150 Z`;

                return (
                  <>
                    <path d={area} fill="url(#occGradient)" />
                    <path d={d} fill="none" stroke="#10b981" strokeWidth="2.5" />
                    {points.map((p) => (
                      <circle key={p.time} cx={p.x} cy={p.y} r="3" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
                    ))}
                  </>
                );
              })()}
            </svg>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "10px", color: "var(--text-muted)" }}>
              {hourlyOccupancy.map((h) => (
                <span key={h.time}>{h.time}</span>
              ))}
            </div>
          </div>
        </article>

        {/* Vehicle Type Statistics */}
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Vehicle Type Statistics</h2>
              <p>Fleet breakdown & revenue contribution by vehicle class</p>
            </div>
            <span className="count-pill">86 Parked Today</span>
          </div>

          <div style={{ paddingTop: "8px" }}>
            {vehicleDistribution.map((item) => (
              <div key={item.type} className="progress-row-item">
                <div className="progress-row-meta">
                  <b>{item.type} ({item.percentage}%)</b>
                  <span>{item.count} vehicles · ₹{(item.revenueShare * 480).toFixed(0)} avg/day</span>
                </div>
                <div className="meter-track">
                  <div
                    className="meter-fill"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      {/* Top Slots Ranking Table */}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Most Frequently Used Parking Slots</h2>
            <p>High-yield bays ranked by occupancy turnover and cumulative revenue</p>
          </div>
          <span className="soft-tag">Top 5 Slots</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Bay Identification</th>
                <th>Zone Classification</th>
                <th>Monthly Turnarounds</th>
                <th>Average Dwell</th>
                <th style={{ textAlign: "right" }}>Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              {topSlots.map((slot, idx) => (
                <tr key={slot.slot}>
                  <td>
                    <div className="rank-badge">{idx + 1}</div>
                  </td>
                  <td>
                    <strong className="mono" style={{ fontSize: "13px", color: "var(--text-heading)" }}>
                      Slot {slot.slot}
                    </strong>
                  </td>
                  <td>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{slot.zone}</span>
                  </td>
                  <td>
                    <strong style={{ color: "var(--text-heading)" }}>{slot.count} vehicles</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: "11px", color: "var(--text-body)" }}>{slot.avgDuration}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <strong style={{ color: "var(--primary)", fontSize: "13px" }}>
                      ₹{slot.revenue.toLocaleString("en-IN")}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
