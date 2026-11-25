import React, { useState } from "react";
import { X, Plus, ShieldCheck, CarFront } from "lucide-react";

export default function AddVehicleModal({
  onClose,
  onAddVehicle,
  availableSlots = []
}) {
  const [form, setForm] = useState({
    number: "",
    type: "Car",
    slot: availableSlots.length > 0 ? availableSlots[0] : "A-02",
    owner: "",
    phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVehicle(form);
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="vehicle-modal" onSubmit={handleSubmit}>
        <div className="modal-heading">
          <div>
            <span className="modal-kicker">PARKING REGISTRATION</span>
            <h2>Register vehicle</h2>
            <p>Assign a bay and register vehicle details for automated billing.</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            <X size={19} />
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="veh-num">Vehicle Registration Number</label>
          <input
            id="veh-num"
            className="form-input mono"
            autoFocus
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value.toUpperCase() })}
            placeholder="e.g. MH12AB1234"
            maxLength={13}
            required
          />
          <small>Enter standard state format without spaces or hyphens.</small>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="veh-type">Vehicle Type</label>
            <select
              id="veh-type"
              className="form-select"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="Car">Car (Standard)</option>
              <option value="SUV">SUV (Large)</option>
              <option value="Bike">Bike (2-Wheeler)</option>
              <option value="EV">EV (Electric)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="veh-slot">Parking Slot</label>
            {availableSlots.length > 0 ? (
              <select
                id="veh-slot"
                className="form-select mono"
                value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value })}
              >
                {availableSlots.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : (
              <input
                id="veh-slot"
                className="form-input mono"
                value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value.toUpperCase() })}
                placeholder="e.g. A-02"
                required
              />
            )}
            <small>Slot availability is checked before saving.</small>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="veh-owner">Driver / Owner Name (Optional)</label>
            <input
              id="veh-owner"
              className="form-input"
              value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div className="form-group">
            <label htmlFor="veh-phone">Mobile Number (Optional)</label>
            <input
              id="veh-phone"
              className="form-input"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98XXX XXXXX"
            />
          </div>
        </div>

        <div className="modal-note">
          <ShieldCheck size={16} /> Automated barrier clearance & billing slip activated on save.
        </div>

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button" type="submit">
            <Plus size={17} /> Confirm Entry
          </button>
        </div>
      </form>
    </div>
  );
}
