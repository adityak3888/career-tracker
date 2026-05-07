import React from 'react';
import './Header.css';

function Header({ dark, setDark, onAddJob }) {
  return (
    <div className="header">
      <div className="header-left">
        <h1>career_tracker.js</h1>
        <p>track your job hunt 🚀</p>
      </div>
      <div className="header-right">
        <button className="toggle-dark" onClick={() => setDark((d) => !d)} title="Toggle dark mode">
          {dark ? '☀️' : '🌙'}
        </button>
        <button className="btn btn-primary" onClick={onAddJob}>
          + Add Job
        </button>
      </div>
    </div>
  );
}

export default Header;
