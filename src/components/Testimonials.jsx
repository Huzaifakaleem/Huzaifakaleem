import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CTO',
    company: 'CloudStack Inc.',
    avatar: 'SM',
    color: 'cyan',
    quote: "Huzaifa delivered our entire backend infrastructure in 3 weeks — clean code, well-documented APIs, and zero downtime deployment. Easily the best developer I've worked with.",
  },
  {
    name: 'Bilal Hassan',
    role: 'Product Manager',
    company: 'DevBridge Labs',
    avatar: 'BH',
    color: 'green',
    quote: "The real-time features he built — live cursors, presence indicators — were exactly what we envisioned. He proactively solved edge cases we hadn't even considered.",
  },
  {
    name: 'Jennifer Zhao',
    role: 'Founder',
    company: 'ShopForge',
    avatar: 'JZ',
    color: 'cyan',
    quote: "Our e-commerce platform handles 10x the traffic since Huzaifa optimized the database queries and implemented caching. ROI was immediate and measurable.",
  },
  {
    name: 'Marcus Osei',
    role: 'Lead Engineer',
    company: 'Axiom Systems',
    avatar: 'MO',
    color: 'green',
    quote: "He has a rare combination: strong technical depth AND the ability to communicate clearly with stakeholders. His code reviews alone elevated our entire team's quality.",
  },
  {
    name: 'Aisha Reyes',
    role: 'Tech Lead',
    company: 'Fintech Nexus',
    avatar: 'AR',
    color: 'cyan',
    quote: "Built our payment integration from scratch — Stripe, PayPal, multi-currency — all bulletproof. The man writes tests, which alone puts him in the top 10% of devs I've hired.",
  },
  {
    name: 'David Park',
    role: 'CEO',
    company: 'LaunchPad Studios',
    avatar: 'DP',
    color: 'green',
    quote: "Huzaifa took our MVP from concept to launch in 6 weeks. The code is clean enough that our in-house team could extend it without any handholding. Outstanding work.",
  },
];

export default function Testimonials() {
  const track = [...testimonials, ...testimonials]; // duplicate for seamless loop

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-intro animate-on-scroll">
          <span className="section-tag">{'// testimonials'}</span>
          <h2 className="section-title">What My  <span className="custom-accent">Clients Say</span></h2>
          <div className="section-divider"></div>
        </div>
      </div>

      {/* Full-width carousel — outside container */}
      <div className="testimonials-carousel" aria-label="Client testimonials carousel">
        <div className="carousel-track">
          {track.map((t, i) => (
            <div key={i} className="testimonial-card" aria-label={`Testimonial from ${t.name}`}>
              <div className="testimonial-stars" aria-label="5 star rating">
                {[...Array(5)].map((_, s) => (
                  <i key={s} className="bi bi-star-fill" aria-hidden="true"></i>
                ))}
              </div>
              <blockquote className="testimonial-quote">
                "{t.quote}"
              </blockquote>
              <div className="testimonial-author">
                <div className={`testimonial-avatar ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="author-name">{t.name}</p>
                  <p className="author-role mono">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
