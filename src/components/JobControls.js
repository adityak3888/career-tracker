import React from 'react';
import './JobControls.css';

const STATUSES = ['All', 'Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

function JobControls({ search, setSearch, filterStatus, setFilterStatus }) {
  return (
    <div className="job-controls">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          placeholder="Search by title, company, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-search" onClick={() => setSearch('')}>✕</button>
        )}
      </div>
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}

export default JobControls;
