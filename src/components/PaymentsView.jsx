import React, { useState, useMemo } from "react";
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Receipt,
  FileText,
  DollarSign,
  TrendingUp,
  Download,
  AlertCircle,
  Eye
} from "lucide-react";

export default function PaymentsView({
  payments,
  onViewReceipt,
  onGenerateInvoice,
  onMarkPaid
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");

  // Summary Metrics
  const totalRevenue = useMemo(() => {
    return payments
      .filter((p) => p.status === "Paid")
      .reduce((acc, curr) => acc + curr.total, 0);
  }, [payments]);

  const todayRevenue = useMemo(() => {
    return payments
      .filter((p) => p.status === "Paid" && p.date.includes("24 Nov"))
      .reduce((acc, curr) => acc + curr.total, 0);
  }, [payments]);

  const pendingPayments = useMemo(() => {
    return payments
      .filter((p) => p.status === "Pending")
      .reduce((acc, curr) => acc + curr.total, 0);
  }, [payments]);

  const completedCount = useMemo(() => {
    return payments.filter((p) => p.status === "Paid").length;
  }, [payments]);

  const pendingCount = useMemo(() => {
    return payments.filter((p) => p.status === "Pending").length;
  }, [payments]);

  // Filtered List
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        p.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
        (p.customerName && p.customerName.toLowerCase().includes(search.toLowerCase()));

      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      const matchMethod = methodFilter === "All" || p.method === methodFilter;

      return matchSearch && matchStatus && matchMethod;
    });
  }, [payments, search, statusFilter, methodFilter]);

  return (
    <div className="content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <CreditCard size={14} /> REVENUE & BILLING AUDIT
          </div>
          <h1>Payment Management</h1>
          <p>Real-time transaction tracking, automated invoices, and receipt generation.</p>
        </div>
        <div className="header-actions">
          <button
            className="secondary-button"
            onClick={() => {
              const csvContent =
                "data:text/csv;charset=utf-8," +
                ["Invoice,Receipt,Vehicle,Duration,Amount,Status,Method,Date"]
                  .concat(
                    payments.map(
                      (p) =>
                        `${p.invoiceNo},${p.id},${p.vehicleNumber},${p.duration},${p.total},${p.status},${p.method},${p.date}`
                    )
                  )
                  .join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "smartpark-payments-ledger.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download size={14} /> Export Ledger
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon green">
            <TrendingUp size={20} />
          </div>
          <div className="stat-copy">
            <span>Total Revenue</span>
            <strong>₹{totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            <small>Lifetime cumulative earnings</small>
          </div>
          <span className="stat-trend">
            <ArrowUpRight size={13} /> +18.4%
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-icon blue">
            <CreditCard size={20} />
          </div>
          <div className="stat-copy">
            <span>Today's Revenue</span>
            <strong>₹{todayRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            <small>{completedCount} transactions today</small>
          </div>
          <span className="stat-trend">
            <ArrowUpRight size={13} /> +12.6%
          </span>
        </article>

        <article className="stat-card">
          <div className="stat-icon orange">
            <Clock size={20} />
          </div>
          <div className="stat-copy">
            <span>Pending Payments</span>
            <strong>₹{pendingPayments.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            <small>{pendingCount} unpaid tickets</small>
          </div>
          {pendingCount > 0 && (
            <span className="stat-trend down">
              {pendingCount} Due
            </span>
          )}
        </article>

        <article className="stat-card">
          <div className="stat-icon purple">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-copy">
            <span>Completed Payments</span>
            <strong>{completedCount}</strong>
            <small>100% processed without disputes</small>
          </div>
          <span className="stat-trend">
            Settled
          </span>
        </article>
      </section>

      {/* Main Table Panel */}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Transaction Ledger & Billing History</h2>
            <p>Showing {filteredPayments.length} of {payments.length} transactions</p>
          </div>
          <span className="count-pill">Live POS Stream</span>
        </div>

        {/* Toolbar & Filters */}
        <div className="toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vehicle number, receipt ID, or customer..."
            />
          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter payment status"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            className="filter-select"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            aria-label="Filter payment method"
          >
            <option value="All">All Payment Methods</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        {/* Payments Table */}
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Receipt / Invoice</th>
                <th>Vehicle & Bay</th>
                <th>Parking Duration</th>
                <th>Charges (₹)</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Date & Time</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <strong className="mono" style={{ color: "var(--text-heading)", display: "block" }}>
                        {payment.id}
                      </strong>
                      <small style={{ color: "var(--text-dim)", fontSize: "10px" }}>{payment.invoiceNo}</small>
                    </td>
                    <td>
                      <strong className="mono" style={{ fontSize: "12px", color: "var(--text-heading)" }}>
                        {payment.vehicleNumber}
                      </strong>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        {payment.vehicleType} · Slot {payment.slot}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: "600" }}>{payment.duration}</span>
                      <small style={{ display: "block", color: "var(--text-dim)", fontSize: "10px" }}>
                        In: {payment.entryTime}
                      </small>
                    </td>
                    <td>
                      <strong style={{ fontSize: "13px", color: "var(--text-heading)" }}>
                        ₹{payment.total.toFixed(2)}
                      </strong>
                      <small style={{ display: "block", color: "var(--text-dim)", fontSize: "10px" }}>
                        +18% GST incl.
                      </small>
                    </td>
                    <td>
                      <span className={`badge ${payment.status === "Paid" ? "badge-paid" : "badge-pending"}`}>
                        {payment.status === "Paid" ? "● Paid" : "○ Pending"}
                      </span>
                    </td>
                    <td>
                      <span className="method-tag">
                        {payment.method === "UPI" && "⚡"}
                        {payment.method === "Credit Card" && "💳"}
                        {payment.method === "Cash" && "💵"} {payment.method}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: "11px", color: "var(--text-body)", display: "block" }}>{payment.date}</span>
                      <small style={{ color: "var(--text-dim)", fontSize: "10px" }}>{payment.time}</small>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        {payment.status === "Pending" && onMarkPaid && (
                          <button
                            className="primary-button"
                            style={{ padding: "5px 10px", fontSize: "10px", gap: "4px" }}
                            onClick={() => onMarkPaid(payment.id)}
                            title="Collect payment now"
                          >
                            <CheckCircle2 size={12} /> Collect
                          </button>
                        )}
                        <button
                          className="secondary-button"
                          style={{ padding: "5px 10px", fontSize: "10px", gap: "4px" }}
                          onClick={() => onViewReceipt(payment)}
                          title="View thermal receipt"
                        >
                          <Receipt size={12} /> Receipt
                        </button>
                        <button
                          className="secondary-button"
                          style={{ padding: "5px 10px", fontSize: "10px", gap: "4px" }}
                          onClick={() => onGenerateInvoice(payment)}
                          title="Generate tax invoice"
                        >
                          <FileText size={12} /> Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "36px 12px" }}>
                    <div className="empty-state">
                      <div>
                        <CreditCard size={22} />
                      </div>
                      <b>No transactions match your search</b>
                      <span>Try adjusting your filters or search keywords.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
