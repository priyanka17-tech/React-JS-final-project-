import React from "react";
import { X, Printer, Download, Building2, CheckCircle2, ShieldCheck, FileText } from "lucide-react";

export default function InvoiceModal({ payment, onClose }) {
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const invoiceSummary = `
TAX INVOICE: ${payment.invoiceNo}
SMARTPARK COMMERCIAL FACILITIES LTD.
Corporate Office: BKC Tower 4, Mumbai, MH - 400051
GSTIN: 27AABCS1429B1Z8 | CIN: U74999MH2021PTC368921

BILL TO:
Client: ${payment.customerName || "Corporate Parking Client"}
Phone: ${payment.phone || "+91 98200 XXXXX"}
Vehicle No: ${payment.vehicleNumber} (${payment.vehicleType})
Assigned Bay: ${payment.slot}

ITEMIZED CHARGES:
1. Commercial Slot Bay Lease (${payment.duration}) - ₹${payment.subtotal.toFixed(2)}
2. CGST (9%) - ₹${(payment.tax / 2).toFixed(2)}
3. SGST (9%) - ₹${(payment.tax / 2).toFixed(2)}
--------------------------------------------------------
NET PAYABLE: ₹${payment.total.toFixed(2)}
PAYMENT STATUS: ${payment.status.toUpperCase()}
PAYMENT INSTRUMENT: ${payment.method} (${payment.transactionId})
DATE: ${payment.date}
    `.trim();

    const blob = new Blob([invoiceSummary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-${payment.invoiceNo}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="invoice-container" role="dialog" aria-modal="true">
        <header className="invoice-header-bar">
          <div>
            <span className="modal-kicker">COMMERCIAL TAX INVOICE</span>
            <h2 style={{ margin: "4px 0 0", fontSize: "18px", color: "var(--text-heading)", fontWeight: "800" }}>
              {payment.invoiceNo}
            </h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close invoice">
            <X size={18} />
          </button>
        </header>

        <div className="invoice-body">
          <div className="invoice-parties-grid">
            <div className="invoice-party-box">
              <h4>ISSUER / SERVICE PROVIDER</h4>
              <strong>SmartPark Facilities Pvt Ltd</strong>
              <p>Commercial Hub, Zone 1, Airport Link Rd</p>
              <p>GSTIN: 27AABCS1429B1Z8</p>
              <p>PAN: AABCS1429B · support@smartpark.io</p>
            </div>

            <div className="invoice-party-box">
              <h4>BILLED TO / CUSTOMER</h4>
              <strong>{payment.customerName || "Commercial Fleet Client"}</strong>
              <p>Phone: {payment.phone || "+91 98000 00000"}</p>
              <p className="mono">Vehicle: {payment.vehicleNumber} ({payment.vehicleType})</p>
              <p>Bay Allocation: Slot {payment.slot}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", fontSize: "11px" }}>
            <div style={{ background: "var(--bg-card-subtle)", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Invoice Date</span>
              <strong style={{ color: "var(--text-heading)" }}>{payment.date}</strong>
            </div>
            <div style={{ background: "var(--bg-card-subtle)", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Payment Status</span>
              <strong style={{ color: payment.status === "Paid" ? "var(--success)" : "var(--warning)" }}>
                {payment.status.toUpperCase()}
              </strong>
            </div>
            <div style={{ background: "var(--bg-card-subtle)", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Payment Mode</span>
              <strong style={{ color: "var(--text-heading)" }}>{payment.method}</strong>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Rate/Hr</th>
                  <th>Duration</th>
                  <th>Taxable Amt</th>
                  <th>GST (18%)</th>
                  <th style={{ textAlign: "right" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Commercial Parking Facility Usage</strong>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                      Slot {payment.slot} · Entry {payment.entryTime} to {payment.exitTime}
                    </div>
                  </td>
                  <td>₹{payment.ratePerHour}</td>
                  <td>{payment.duration}</td>
                  <td>₹{payment.subtotal.toFixed(2)}</td>
                  <td>₹{payment.tax.toFixed(2)}</td>
                  <td style={{ textAlign: "right", fontWeight: "700" }}>₹{payment.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", maxWidth: "300px" }}>
              <ShieldCheck size={16} style={{ color: "var(--success)", verticalAlign: "middle", marginRight: "4px" }} />
              Electronically generated invoice compliant with commercial GST regulations.
            </div>

            <div style={{ textAlign: "right", minWidth: "200px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
                <span>Subtotal:</span>
                <span>₹{payment.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>
                <span>GST (18%):</span>
                <span>₹{payment.tax.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "800", color: "var(--text-heading)", borderTop: "2px solid var(--border-color)", paddingTop: "6px" }}>
                <span>Grand Total:</span>
                <span style={{ color: "var(--primary)" }}>₹{payment.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="receipt-footer-actions">
          <button className="secondary-button" onClick={handleDownload}>
            <Download size={14} /> Download File
          </button>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="secondary-button" onClick={handlePrint}>
              <Printer size={14} /> Print Invoice
            </button>
            <button className="primary-button" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
