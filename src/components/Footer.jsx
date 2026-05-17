import React from 'react';
import './Footer.css';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container-xxl">
        <div className="footer-inner">
          {/* Logo + tagline */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo" onClick={e => handleClick(e, '#hero')}>
              <span className="logo-bracket">[</span>
              <span>HK</span>
              <span className="logo-bracket">]</span>
            </a>

          </div>

          {/* Nav */}
          <nav className="footer-nav" aria-label="Footer navigation">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={e => handleClick(e, href)}>
                {label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="footer-social">
            {[
              { icon: 'bi-github', href: 'https://github.com/huzaifakaleem', label: 'GitHub' },
              { icon: 'bi-linkedin', href: 'https://linkedin.com/in/huzaifakaleem', label: 'LinkedIn' },
              { icon: 'bi-twitter-x', href: 'https://twitter.com/huzaifakaleem', label: 'Twitter' },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <i className={`bi ${icon}`} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mono">

            &nbsp;— &copy; {year} Huzaifa Kaleem. All rights reserved.
          </p>
          <p className="footer-status mono">
            <span className="status-dot" aria-hidden="true"></span>
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
