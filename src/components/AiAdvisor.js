import React, { useState } from 'react';
import './AiAdvisor.css';

const GROQ_API_KEY = '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';

function AiAdvisor({ jobs }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buildContext = () => {
    if (jobs.length === 0) return 'User has no job applications tracked yet.';
    const sample = jobs.slice(0, 6).map(
      (j) => `${j.title} at ${j.company} (${j.status}${j.location ? ', ' + j.location : ''})`
    );
    return `User has ${jobs.length} job application(s): ${sample.join('; ')}${jobs.length > 6 ? '...' : ''}.`;
  };

  const askGroq = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a helpful career advisor for students and job seekers. Context about the user: ${buildContext()} Give concise, practical, and actionable advice. Keep responses under 300 words.`,
            },
            {
              role: 'user',
              content: query,
            },
          ],
          temperature: 1,
          max_tokens: 512,
          top_p: 1,
          stream: false,
          stop: null,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || `API error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || 'No response received.');
    } catch (e) {
      setError(e.message || 'Something went wrong. Check your API key in .env file.');
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askGroq();
    }
  };

  const suggestions = [
    'How to prepare for DSA interviews?',
    'Tips to write a better resume',
    'How to follow up after applying?',
    'What skills are in demand in 2025?',
  ];

  return (
    <div className="ai-section">
      <h3>
        <span>🤖</span> AI Career Advisor
        <span className="ai-badge">Groq · llama-3.3-70b</span>
      </h3>

      {!response && !loading && (
        <div className="ai-suggestions">
          {suggestions.map((s) => (
            <button key={s} className="suggestion-chip" onClick={() => setQuery(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="ai-input-row">
        <input
          placeholder="Ask anything about your career..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
        />
        <button className="btn btn-primary" onClick={askGroq} disabled={loading || !query.trim()}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      {loading && (
        <div className="ai-loading">
          <span className="loading-dots">⏳</span> Groq is thinking...
        </div>
      )}

      {error && <div className="ai-error">❌ {error}</div>}

      {response && (
        <div className="ai-response fade-in">
          <div className="ai-response-header">
            <span>💡 AI Response</span>
            <button className="clear-btn" onClick={() => { setResponse(''); setQuery(''); }}>
              Clear
            </button>
          </div>
          <div className="ai-response-body">{response}</div>
        </div>
      )}
    </div>
  );
}

export default AiAdvisor;
