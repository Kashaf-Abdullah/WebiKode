import { useEffect, useRef, useState } from 'react';
import Button from './ui/Button.jsx';
import Field from './ui/Field.jsx';
import { submitSubmission } from '../lib/submissions.js';

function getMinimumDateTime() {
  const date = new Date(Date.now() + 30 * 60 * 1000);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

export default function ProjectBookingModal({ projectName, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', description: '', startAt: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('input')?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && status !== 'submitting') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose, status]);

  const submit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitSubmission({
        type: 'booking',
        project: projectName,
        ...form,
        startAt: new Date(form.startAt).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      setStatus('success');
    } catch (submissionError) {
      if (submissionError.bookingCreated) setStatus('partial');
      else {
        setStatus('idle');
        setError(submissionError.message || 'We could not book this call. Please try again.');
      }
    }
  };

  return (
    <div
      className="booking-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && status !== 'submitting') onClose();
      }}
    >
      <section className="booking-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title" ref={dialogRef}>
        <div className="booking-dialog__header">
          <div>
            <h2 id="booking-title">Book a call</h2>
            <p>Discuss {projectName} and your requirements.</p>
          </div>
          <button className="booking-dialog__close" type="button" aria-label="Close booking form" onClick={onClose} disabled={status === 'submitting'}>×</button>
        </div>

        {status === 'success' ? (
          <div className="stack" role="status">
            <p className="notice">Your call has been added to the calendar. A calendar invitation and email confirmation have been sent.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : status === 'partial' ? (
          <div className="stack" role="status">
            <p className="notice">Your call was added to the calendar, but the notification email could not be sent. Please contact us if you need confirmation.</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={submit}>
            <p className="muted">Choose a preferred time in your local timezone. Calls are 30 minutes; availability is checked when you submit.</p>
            <Field label="Name"><input type="text" required maxLength="120" autoComplete="name" value={form.name} onChange={set('name')} /></Field>
            <Field label="Email"><input type="email" required maxLength="254" autoComplete="email" value={form.email} onChange={set('email')} /></Field>
            <Field label="Phone number"><input type="tel" required maxLength="32" autoComplete="tel" value={form.phone} onChange={set('phone')} /></Field>
            <Field label="Preferred date and time"><input type="datetime-local" required min={getMinimumDateTime()} value={form.startAt} onChange={set('startAt')} /></Field>
            <Field label="What would you like to discuss?"><textarea required maxLength="5000" rows="4" value={form.description} onChange={set('description')} /></Field>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="row">
              <Button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Booking…' : 'Book this call'}
              </Button>
              <Button variant="outline" onClick={onClose} disabled={status === 'submitting'}>Cancel</Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
