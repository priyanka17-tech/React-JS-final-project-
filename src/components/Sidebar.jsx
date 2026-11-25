import React from "react";
import {
  LayoutDashboard,
  ParkingSquare,
  CarFront,
  CalendarCheck,
  CreditCard,
  BarChart3,
  Activity,
  Settings,
  CircleParking,
  CircleHelp,
  ArrowUpRight,
  ChevronDown,
  Sparkles
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileNav,
  setMobileNav,
  availableCount,
  pendingPaymentsCount,
  upcomingReservationsCount
}) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "slots", label: "Parking Slots", icon: ParkingSquare, count: availableCount },
    { id: "vehicles", label: "Vehicles", icon: CarFront },
    { id: "reservations", label: "Reservations", icon: CalendarCheck, badge: upcomingReservationsCount > 0 ? `${upcomingReservationsCount} new` : null },
    { id: "payments", label: "Payments", icon: CreditCard, badge: pendingPaymentsCount > 0 ? `${pendingPaymentsCount} due` : null },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "activity", label: "Activity Log", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileNav) setMobileNav(false);
  };

  return (
    <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
      <div className="brand" onClick={() => handleNavClick("dashboard")} style={{ cursor: "pointer" }}>
        <div className="brand-mark">
          <CircleParking size={24} />
        </div>
        <div>
          <b>smart<span>park</span></b>
          <small>COMMERCIAL SUITE</small>
        </div>
      </div>

      <div className="side-label">WORKSPACE</div>

      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => handleNavClick(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.count !== undefined && <span className="nav-count">{item.count}</span>}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon">
            <Sparkles size={16} />
          </div>
          <b>Commercial Pro</b>
          <p>Multi-zone parking management & automated billing active.</p>
          <a href="#help" onClick={(e) => { e.preventDefault(); handleNavClick("settings"); }}>
            Manage facility <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="user-profile">
          <div className="avatar">AD</div>
          <div>
            <b>Admin User</b>
            <small>Senior Parking Manager</small>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </aside>
  );
}
