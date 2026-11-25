import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({ notice, onClose }) {
  if (!notice) return null;

  const isError = typeof notice === "object" && notice.type === "error";
  const message = typeof notice === "object" ? notice.message : notice;

  return (
    <div className="toast" role="alert">
      {isError ? <AlertCircle size={18} style={{ color: "#ef4444" }} /> : <CheckCircle2 size={18} />}
      <span>{message}</span>
      <button onClick={onClose} aria-label="Close notification">
        <X size={15} />
      </button>
    </div>
  );
}
