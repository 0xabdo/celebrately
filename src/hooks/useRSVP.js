import { useState } from 'react';

export function useRSVP(eventId = 'default') {
  const [submissions, setSubmissions] = useState(() => {
    try {
      const stored = localStorage.getItem(`rsvp-${eventId}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  async function submitRSVP(data) {
    setStatus('loading');
    try {
      // Simulate API call - replace with real endpoint
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const entry = {
        id: Date.now(),
        ...data,
        submittedAt: new Date().toISOString(),
        eventId,
      };

      const updated = [...submissions, entry];
      setSubmissions(updated);
      localStorage.setItem(`rsvp-${eventId}`, JSON.stringify(updated));
      setStatus('success');
      return { success: true, data: entry };
    } catch (err) {
      setStatus('error');
      return { success: false, error: err.message };
    }
  }

  function resetStatus() {
    setStatus('idle');
  }

  function exportToCSV() {
    if (!submissions.length) return;
    const headers = ['Name', 'Email', 'Phone', 'Guests', 'Status', 'Message', 'Date'];
    const rows = submissions.map(s => [
      s.name, s.email, s.phone, s.guestCount, s.attendance, s.message, s.submittedAt
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvp-${eventId}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return { submissions, submitRSVP, status, resetStatus, exportToCSV };
}
