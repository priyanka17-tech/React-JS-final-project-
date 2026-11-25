import React from "react";
import { X, Printer, Download, CheckCircle2, AlertCircle, Share2, ShieldCheck } from "lucide-react";

export default function ReceiptModal({ payment, onClose, onMarkPaid }) {
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptText = `
SMARTPARK COMMERCIAL FACILITIES LTD.
RECEIPT: ${payment.id}
INVOICE REF: ${payment.invoiceNo}
DATE: ${payment.date} ${payment.time}
----------------------------------------
VEHICLE: ${payment.vehicleNumber} (${payment.vehicleType})
PARKING SLOT: ${payment.slot}
ENTRY TIME: ${payment.entryTime}
EXIT TIME: ${payment.exitTime}
DURATION: ${payment.duration}
----------------------------------------
BASE CHARGE: ₹${payment.subtotal.toFixed(2)}
GST (18%): ₹${payment.tax.toFixed(2)}
TOTAL AMOUNT: ₹${payment.total.toFixed(2)}
STATUS: ${payment.status.toUpperCase()}
PAYMENT METHOD: ${payment.method}
TRANSACTION ID: ${payment.transactionId}
----------------------------------------
Thank you for parking with SmartPark!
    `.trim();

    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt-${payment.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="receipt-container" role="dialog" aria-modal="true">
        <header className="receipt-header">
          <button className="receipt-close-btn" onClick={onClose} aria-label="Close receipt">
            <X size={16} />
          </button>
          <div className="receipt-brand">SMARTPARK COMMERCIAL</div>
          <p>Terminal 1 · Multi-Level Automated Parking Facility</p>
          <p style={{ fontSize: "9px", opacity: 0.8 }}>GSTIN: 27AABCS1429B1Z8 · Support: 1800-PARK-SMART</p>
        </header>

        <div className="receipt-body">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span className={`receipt-status-stamp ${payment.status === "Paid" ? "paid" : "pending"}`}>
              {payment.status === "Paid" ? "PAYMENT SUCCESSFUL" : "PAYMENT PENDING"}
            </span>
            <span className="mono" style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>
              #{payment.id}
            </span>
          </div>

          <div className="receipt-meta-grid">
            <div>
              <span>Vehicle Number</span>
              <strong className="mono">{payment.vehicleNumber}</strong>
            </div>
            <div>
              <span>Vehicle Type</span>
              <strong>{payment.vehicleType}</strong>
            </div>
            <div>
              <span>Parking Slot</span>
              <strong style={{ color: "var(--primary)" }}>{payment.slot}</strong>
            </div>
            <div>
              <span>Owner / Driver</span>
              <strong>{payment.customerName || "Walk-in Visitor"}</strong>
            </div>
            <div>
              <span>Check-in Time</span>
              <strong>{payment.entryTime}</strong>
            </div>
            <div>
              <span>Check-out Time</span>
              <strong>{payment.exitTime}</strong>
            </div>
            <div>
              <span>Parking Duration</span>
              <strong>{payment.duration}</strong>
            </div>
            <div>
              <span>Hourly Rate</span>
              <strong>₹{payment.ratePerHour}/hr</strong>
            </div>
          </div>

          <table className="receipt-items-table">
            <tbody>
              <tr>
                <td className="item-label">Parking Services ({payment.duration})</td>
                <td className="item-val">₹{payment.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="item-label">CGST @ 9.0%</td>
                <td className="item-val">₹{(payment.tax / 2).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="item-label">SGST @ 9.0%</td>
                <td className="item-val">₹{(payment.tax / 2).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="item-label">Security & Automated Barrier Fee</td>
                <td className="item-val" style={{ color: "#10b981" }}>INCLUDED</td>
              </tr>
            </tbody>
          </table>

          <div className="receipt-total-row">
            <div>
              <span>TOTAL CHARGES</span>
              <small style={{ display: "block", fontSize: "10px", color: "#64748b" }}>Inclusive of all statutory taxes</small>
            </div>
            <strong>₹{payment.total.toFixed(2)}</strong>
          </div>

          <div style={{ background: "#f8fafc", padding: "10px 14px", borderRadius: "8px", fontSize: "11px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ color: "#64748b" }}>Payment Mode:</span>
              <strong style={{ color: "#0f172a" }}>{payment.method}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Transaction Ref:</span>
              <span className="mono" style={{ fontSize: "10px", color: "#0f172a" }}>{payment.transactionId}</span>
            </div>
          </div>

          <div className="receipt-barcode-wrap">
            <div className="barcode-lines" />
            <span className="mono" style={{ fontSize: "9px", letterSpacing: "2px", color: "#64748b" }}>
              *{payment.id}-{payment.vehicleNumber}*
            </span>
          </div>
        </div>

        <div className="receipt-footer-actions">
          {payment.status === "Pending" && onMarkPaid ? (
            <button
              className="primary-button"
              style={{ padding: "8px 14px", fontSize: "11px" }}
              onClick={() => { onMarkPaid(payment.id); }}
            >
              <CheckCircle2 size={14} /> Mark as Paid
            </button>
          ) : (
            <button className="secondary-button" style={{ padding: "8px 12px", fontSize: "11px" }} onClick={handleDownload}>
              <Download size={14} /> Download
            </button>
          )}

          <div style={{ display: "flex", gap: "8px" }}>
            <button className="secondary-button" style={{ padding: "8px 12px", fontSize: "11px" }} onClick={handlePrint}>
              <Printer size={14} /> Print
            </button>
            <button className="secondary-button" style={{ padding: "8px 14px", fontSize: "11px" }} onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
