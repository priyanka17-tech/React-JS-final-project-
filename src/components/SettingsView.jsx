import React, { useState } from "react";
import {
  Settings,
  Palette,
  Sun,
  Moon,
  Check,
  ShieldCheck,
  DollarSign,
  Building2,
  Bell,
  Save,
  RotateCcw
} from "lucide-react";

export default function SettingsView({
  currentTheme,
  setTheme,
  themeMode,
  setThemeMode,
  onSaveNotice
}) {
  const [rates, setRates] = useState({
    car: 50,
    suv: 70,
    bike: 30,
    ev: 80,
    gst: 18
  });

  const [facilityInfo, setFacilityInfo] = useState({
    name: "SmartPark Central Mall & Business Tower",
    zoneCount: 2,
    totalBays: 100,
    address: "Tower 4, Commercial District, Ring Road"
  });

  const themes = [
    {
      id: "blue",
      name: "Premium Blue",
      desc: "Corporate Sapphire & Slate",
      primary: "#2563eb",
      palette: ["#2563eb", "#60a5fa", "#0f172a", "#f8fafc"]
    },
    {
      id: "purple",
      name: "Royal Purple",
      desc: "Imperial Violet & Amethyst",
      primary: "#7c3aed",
      palette: ["#7c3aed", "#a78bfa", "#1e1b4b", "#f5f3ff"]
    },
    {
      id: "emerald",
      name: "Emerald Green",
      desc: "Executive Jade & Forest",
      primary: "#059669",
      palette: ["#059669", "#34d399", "#064e3b", "#ecfdf5"]
    },
    {
      id: "midnight",
      name: "Dark Midnight",
      desc: "Obsidian Cyber & Electric Cyan",
      primary: "#06b6d4",
      palette: ["#06b6d4", "#3b82f6", "#060911", "#162033"]
    }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (onSaveNotice) onSaveNotice("Settings and pricing rules saved successfully.");
  };

  return (
    <div className="content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <Settings size={14} /> FACILITY PREFERENCES & THEMES
          </div>
          <h1>System Settings & Customization</h1>
          <p>Personalize your workspace aesthetic, calibrate tariff structures, and configure facility profile.</p>
        </div>
      </div>

      {/* Theme Customization Panel */}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Theme Customization & Visual Appearance</h2>
            <p>Select your preferred theme accent and color mode. Updates apply across the entire application.</p>
          </div>
          <span className="count-pill">
            <Palette size={12} style={{ verticalAlign: "middle", marginRight: "4px" }} />
            4 Color Themes
          </span>
        </div>

        {/* 4 Theme Selection Cards */}
        <div className="theme-selector-grid">
          {themes.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <div
                key={t.id}
                className={`theme-card-option ${isSelected ? "active" : ""}`}
                onClick={() => setTheme(t.id)}
              >
                <div className="theme-preview-palette">
                  {t.palette.map((color, i) => (
                    <div key={i} style={{ backgroundColor: color }} />
                  ))}
                </div>
                <div>
                  <b>
                    <span>{t.name}</span>
                    {isSelected && (
                      <span
                        style={{
                          background: "var(--primary)",
                          color: "#fff",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center"
                        }}
                      >
                        <Check size={11} />
                      </span>
                    )}
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>
                    {t.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Light / Dark Mode Toggle */}
        <div className="mode-switch-row">
          <div>
            <strong style={{ fontSize: "13px", color: "var(--text-heading)", display: "block" }}>
              Color Mode Appearance
            </strong>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              Switch between Light Mode (clean daylight) and Dark Mode (high-contrast night)
            </span>
          </div>

          <div className="mode-toggle-group">
            <button
              type="button"
              className={`mode-pill ${themeMode === "light" ? "active" : ""}`}
              onClick={() => setThemeMode("light")}
            >
              <Sun size={14} /> Light Mode
            </button>
            <button
              type="button"
              className={`mode-pill ${themeMode === "dark" ? "active" : ""}`}
              onClick={() => setThemeMode("dark")}
            >
              <Moon size={14} /> Dark Mode
            </button>
          </div>
        </div>
      </section>

      {/* Tariff & Facility Configuration */}
      <div className="middle-grid">
        {/* Hourly Tariff Rates */}
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Tariff & Hourly Parking Rates</h2>
              <p>Configure automated billing rates applied at barrier gates</p>
            </div>
            <DollarSign size={18} className="muted-icon" />
          </div>

          <form onSubmit={handleSave} style={{ display: "grid", gap: "14px" }}>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Car Rate (₹/Hour)</label>
                <input
                  type="number"
                  className="form-input"
                  value={rates.car}
                  onChange={(e) => setRates({ ...rates, car: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>SUV Rate (₹/Hour)</label>
                <input
                  type="number"
                  className="form-input"
                  value={rates.suv}
                  onChange={(e) => setRates({ ...rates, suv: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Bike Rate (₹/Hour)</label>
                <input
                  type="number"
                  className="form-input"
                  value={rates.bike}
                  onChange={(e) => setRates({ ...rates, bike: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>EV Fast Charging Rate (₹/Hour)</label>
                <input
                  type="number"
                  className="form-input"
                  value={rates.ev}
                  onChange={(e) => setRates({ ...rates, ev: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Applicable GST / VAT Rate (%)</label>
              <input
                type="number"
                className="form-input"
                value={rates.gst}
                onChange={(e) => setRates({ ...rates, gst: Number(e.target.value) })}
              />
              <small>Auto-applied on all generated receipts & invoices (9% CGST + 9% SGST)</small>
            </div>

            <button type="submit" className="primary-button" style={{ justifySelf: "flex-start", marginTop: "6px" }}>
              <Save size={15} /> Save Tariff Rules
            </button>
          </form>
        </section>

        {/* Facility Information */}
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Facility Metadata</h2>
              <p>Location & capacity configuration</p>
            </div>
            <Building2 size={18} className="muted-icon" />
          </div>

          <div style={{ display: "grid", gap: "14px" }}>
            <div className="form-group">
              <label>Facility Name</label>
              <input
                className="form-input"
                value={facilityInfo.name}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, name: e.target.value })}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Total Capacity (Bays)</label>
                <input
                  type="number"
                  className="form-input"
                  value={facilityInfo.totalBays}
                  onChange={(e) => setFacilityInfo({ ...facilityInfo, totalBays: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>Monitored Zones</label>
                <input
                  type="number"
                  className="form-input"
                  value={facilityInfo.zoneCount}
                  onChange={(e) => setFacilityInfo({ ...facilityInfo, zoneCount: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Physical Address</label>
              <input
                className="form-input"
                value={facilityInfo.address}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, address: e.target.value })}
              />
            </div>

            <div className="modal-note">
              <ShieldCheck size={16} /> Central API Sync Enabled · Cloud-linked to ANPR sensors
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
