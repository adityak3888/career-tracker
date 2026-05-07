import React from 'react';
import './JobModal.css';

const STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

function JobModal({ form, setForm, editId, onSave, onClose }) {
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const isValid = form.title.trim() && form.company.trim();

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>{editId ? '✏️ Edit Application' : '➕ New Application'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Job Title *</label>
            <input
              placeholder="e.g. Frontend Developer"
              value={form.title}
              onChange={update('title')}
            />
          </div>

          <div className="form-group">
            <label>Company *</label>
            <input
              placeholder="e.g. Google, Amazon"
              value={form.company}
              onChange={update('company')}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              placeholder="e.g. Remote / Bengaluru"
              value={form.location}
              onChange={update('location')}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={update('status')}>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date Applied</label>
            <input
              type="date"
              value={form.date}
              onChange={update('date')}
            />
          </div>

          <div className="form-group">
            <label>Salary / CTC</label>
            <input
              placeholder="e.g. ₹8 LPA / $80k"
              value={form.salary}
              onChange={update('salary')}
            />
          </div>

          <div className="form-group full">
            <label>Job Link / URL</label>
            <input
              placeholder="https://..."
              value={form.link}
              onChange={update('link')}
            />
          </div>

          <div className="form-group full">
            <label>Notes</label>
            <textarea
              placeholder="Referral, key skills needed, interview rounds, follow-up date..."
              value={form.notes}
              onChange={update('notes')}
            />
          </div>
        </div>

        {!isValid && (
          <p className="form-hint">* Title and Company are required</p>
        )}

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSave} disabled={!isValid}>
            {editId ? 'Save Changes' : 'Add Job'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobModal;
