import React from 'react';
import './JobList.css';

const getBadgeClass = (s) => {
  if (s === 'Applied') return 'badge-applied';
  if (s === 'Interview') return 'badge-interview';
  if (s === 'Offer') return 'badge-offer';
  if (s === 'Rejected') return 'badge-rejected';
  if (s === 'Saved') return 'badge-saved';
  return 'badge-default';
};

function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="job-card fade-in">
      <div className="job-card-top">
        <div className="job-info">
          <div className="job-title">{job.title}</div>
          <div className="job-company">
            {job.company}
            {job.location ? ` · ${job.location}` : ''}
          </div>
        </div>
        <span className={`badge ${getBadgeClass(job.status)}`}>{job.status}</span>
      </div>

      <div className="job-meta">
        {job.date && <span className="meta-text">📅 {job.date}</span>}
        {job.salary && <span className="meta-text">💰 {job.salary}</span>}
        {job.link && (
          <a href={job.link} target="_blank" rel="noreferrer" className="meta-link">
            🔗 Job Link
          </a>
        )}
      </div>

      {job.notes && (
        <div className="job-notes">"{job.notes}"</div>
      )}

      <div className="job-actions">
        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(job)}>
          ✏️ Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(job.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

function JobList({ jobs, totalJobs, onEdit, onDelete }) {
  if (totalJobs === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No applications yet</h3>
        <p>Click "+ Add Job" to start tracking your first application!</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔎</div>
        <h3>No results found</h3>
        <p>Try changing your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default JobList;
