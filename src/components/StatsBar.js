import React from 'react';
import './StatsBar.css';

function StatCard({ num, label, colorClass }) {
  return (
    <div className="stat-card">
      <div className={`stat-num ${colorClass}`}>{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function StatsBar({ stats }) {
  return (
    <div className="stats-bar">
      <StatCard num={stats.total} label="Total" colorClass="num-total" />
      <StatCard num={stats.applied} label="Applied" colorClass="num-applied" />
      <StatCard num={stats.interview} label="Interview" colorClass="num-interview" />
      <StatCard num={stats.offer} label="Offers" colorClass="num-offer" />
      <StatCard num={stats.rejected} label="Rejected" colorClass="num-rejected" />
    </div>
  );
}

export default StatsBar;
