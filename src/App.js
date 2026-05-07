import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import AiAdvisor from './components/AiAdvisor';
import JobControls from './components/JobControls';
import JobList from './components/JobList';
import Pagination from './components/Pagination';
import JobModal from './components/JobModal';
import './App.css';

const PER_PAGE = 5;

export const defaultForm = {
  title: '',
  company: '',
  location: '',
  status: 'Applied',
  date: '',
  salary: '',
  link: '',
  notes: '',
};

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('ct_dark') === 'true';
  });

  const [jobs, setJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ct_jobs') || '[]');
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    localStorage.setItem('ct_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('ct_dark', dark);
  }, [dark]);

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      (j.location || '').toLowerCase().includes(q);
    const matchS = filterStatus === 'All' || j.status === filterStatus;
    return matchQ && matchS;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === 'Applied').length,
    interview: jobs.filter((j) => j.status === 'Interview').length,
    offer: jobs.filter((j) => j.status === 'Offer').length,
    rejected: jobs.filter((j) => j.status === 'Rejected').length,
  };

  const openAdd = () => {
    setForm(defaultForm);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (job) => {
    setForm({ ...job });
    setEditId(job.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm(defaultForm);
  };

  const saveJob = () => {
    if (!form.title.trim() || !form.company.trim()) return;
    if (editId) {
      setJobs((prev) => prev.map((j) => (j.id === editId ? { ...form, id: editId } : j)));
    } else {
      setJobs((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    closeModal();
    setPage(1);
  };

  const deleteJob = (id) => {
    if (window.confirm('Delete this application?')) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  return (
    <div className={dark ? 'dark' : ''} style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="app-container">
        <Header dark={dark} setDark={setDark} onAddJob={openAdd} />
        <StatsBar stats={stats} />
        <AiAdvisor jobs={jobs} />
        <JobControls
          search={search}
          setSearch={(v) => { setSearch(v); setPage(1); }}
          filterStatus={filterStatus}
          setFilterStatus={(v) => { setFilterStatus(v); setPage(1); }}
        />
        <JobList jobs={paginated} totalJobs={jobs.length} onEdit={openEdit} onDelete={deleteJob} />
        <Pagination page={safePage} totalPages={totalPages} setPage={setPage} />
        {showModal && (
          <JobModal
            form={form}
            setForm={setForm}
            editId={editId}
            onSave={saveJob}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
