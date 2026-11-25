import React from "react";
import { Menu, Bell, Sun, Moon, ShieldCheck, ArrowRight } from "lucide-react";

export default function Topbar({
  activeTab,
  mobileNav,
  setMobileNav,
  themeMode,
  toggleThemeMode,
  currentThemeName,
  onOpenAddVehicle,
  onOpenReservation
}) {
  const titles = {
    dashboard: "Dashboard Overview",
    slots: "Parking Slot Management",
    vehicles: "Vehicle Registry",
    reservations: "Reservation & Bookings",
    payments: "Payment & Billing",
    analytics: "Analytics & Reports",
    activity: "Live Activity Audit",
    settings: "System & Theme Settings"
  };

  return (
    <header className="topbar">
      <button
        className="icon-button menu-button"
        onClick={() => setMobileNav(!mobileNav)}
        aria-label="Toggle navigation menu"
      >
        <Menu size={20} />
      </button>

      <div className="breadcrumb">
        <span>SmartPark</span>
        <span>/</span>
        <b>{titles[activeTab] || "Dashboard"}</b>
      </div>

      <div className="top-actions">
        <span className="live-status">
          <i /> System Operational · {currentThemeName}
        </span>

        <button
          className="mode-toggle-btn"
          onClick={toggleThemeMode}
          title={`Switch to ${themeMode === "light" ? "Dark" : "Light"} Mode`}
        >
          {themeMode === "light" ? <Moon size={15} /> : <Sun size={15} />}
          <span>{themeMode === "light" ? "Dark" : "Light"}</span>
        </button>

        <button className="icon-button notification" title="Notifications">
          <Bell size={18} />
          <i />
        </button>

        <div className="top-avatar" title="Admin User">
          AD
        </div>
      </div>
    </header>
  );
}
