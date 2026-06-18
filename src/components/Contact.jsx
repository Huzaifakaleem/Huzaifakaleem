import React, { useState } from 'react';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const socials = [
  { icon: 'bi-github',        label: 'GitHub',   href: 'https://github.com/Huzaifakaleem',      color: 'cyan' },
  { icon: 'bi-linkedin',      label: 'LinkedIn', href: 'https://www.linkedin.com/in/huzaifa-kaleem/', color: 'cyan' },
  { icon: 'bi-instagram',    label: 'Instagram',  href: 'https://www.instagram.com/huzaifakaleem02?igsh=MWkwYjY3YzZvN2IxNQ==',     color: 'cyan' },
  
];

// ── Contact Info Panel ────────────────────────────────────────────────────────
function ContactInfo() {
  const [copied, setCopied] = useState(false);
  const email = 'huzaifakaleem08@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="contact-info-panel">
      <h3 className="contact-info-title" style={{ color: '#e6e8f5' }}>
        Let's Build Something <span className="gradient-text">Great Together</span>
      </h3>
      <p className="contact-info-desc">
        Open to full-time roles, freelance contracts, and interesting side projects.
        I respond within 24 hours — usually much faster.
      </p>

      <div className="contact-items">
        {[
          { icon: 'bi-geo-alt-fill',   label: 'Location',      value: 'Lahore, Pakistan (Remote OK)', color: 'cyan' },
          { icon: 'bi-clock-fill',     label: 'Response Time', value: 'Within 24 hours',              color: 'cyan' },
          { icon: 'bi-briefcase-fill', label: 'Availability',  value: 'Open to Opportunities',        color: 'cyan' },
        ].map(({ icon, label, value, color }) => (
          <div key={label} className="contact-item">
            <div className={`contact-item-icon ${color}`}>
              <i className={`bi ${icon}`} aria-hidden="true"></i>
            </div>
            <div>
              <p className="contact-item-label mono">{label}</p>
              <p className="contact-item-value">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Email copy */}
      <div className="email-copy-wrap">
        <span className="mono email-text">{email}</span>
        <button
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={copyEmail}
          aria-label="Copy email to clipboard"
        >
          <i className={`bi ${copied ? 'bi-check-lg' : 'bi-clipboard'}`} aria-hidden="true"></i>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Social Links */}
      <div className="social-links">
        {socials.map(({ icon, label, href, color }) => (
          <a
            key={label}
            href={href}
            className={`social-link ${color}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <i className={`bi ${icon}`} aria-hidden="true"></i>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    // Clear server error on any change
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation first
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Server returned field-level validation errors → show inline
        if (data.errors) {
          setErrors(data.errors);
          setStatus(null);
          return;
        }
        // Generic server error
        throw new Error(data.message || 'Submission failed. Please try again.');
      }

      // ✅ Success
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);

    } catch (err) {
      console.error('[ContactForm]', err);
      setServerError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
      setTimeout(() => { setStatus(null); setServerError(''); }, 6000);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">

      <div className="form-row">
        {/* Name */}
        <div className="form-field">
          <label htmlFor="cf-name" className="mono">Name</label>
          <input
            type="text"
            id="cf-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="field-error" id="cf-name-err" role="alert">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="cf-email" className="mono">Email</label>
          <input
            type="email"
            id="cf-email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="field-error" id="cf-email-err" role="alert">{errors.email}</span>}
        </div>
      </div>

      {/* Subject */}
      <div className="form-field">
        <label htmlFor="cf-subject" className="mono">Subject</label>
        <input
          type="text"
          id="cf-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'cf-subject-err' : undefined}
          className={errors.subject ? 'error' : ''}
        />
        {errors.subject && <span className="field-error" id="cf-subject-err" role="alert">{errors.subject}</span>}
      </div>

      {/* Message */}
      <div className="form-field">
        <label htmlFor="cf-message" className="mono">Message</label>
        <textarea
          id="cf-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project, timeline, and budget..."
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          className={errors.message ? 'error' : ''}
        />
        {errors.message && <span className="field-error" id="cf-message-err" role="alert">{errors.message}</span>}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className={`btn-cyber btn-cyber-primary w-100 justify-content-center ${status === 'sending' ? 'loading' : ''}`}
        disabled={status === 'sending'}
        aria-busy={status === 'sending'}
      >
        {status === 'sending' && <span className="spinner" aria-hidden="true" />}
        {status === 'sent'    && <i className="bi bi-check-circle-fill" aria-hidden="true"></i>}
        {status === 'error'   && <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>}
        {!status              && <i className="bi bi-send-fill" aria-hidden="true"></i>}

        {status === 'sending' ? 'Sending...'      :
         status === 'sent'    ? 'Message Sent!'   :
         status === 'error'   ? 'Failed to Send'  :
         'Send Message'}
      </button>

      {/* Success banner */}
      {status === 'sent' && (
        <div className="success-msg" role="status">
          <i className="bi bi-check-circle-fill"></i>
          Thanks! I'll get back to you within 24 hours.
        </div>
      )}

      {/* Error banner */}
      {status === 'error' && serverError && (
        <div className="error-msg" role="alert">
          <i className="bi bi-exclamation-circle-fill"></i>
          {serverError}
        </div>
      )}

    </form>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-intro animate-on-scroll">
          <span className="section-tag">{'// get_in_touch'}</span>
          <h2 className="section-title">Contact <span className="custom-accent">Me</span></h2>
          <div className="section-divider"></div>
        </div>

        <div className="row g-4 g-lg-5">
          <div className="col-lg-5 animate-on-scroll delay-1">
            <ContactInfo />
          </div>
          <div className="col-lg-7 animate-on-scroll delay-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}