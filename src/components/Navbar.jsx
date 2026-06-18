import React, { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking — uses live getBoundingClientRect so it works after dynamic layout shifts
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.slice(1));
    // Trigger: section top crosses above 30% of the viewport height
    const TRIGGER = 0.30;

    const onScroll = () => {
      const threshold = window.innerHeight * TRIGGER;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Once the top of the section is above the trigger line, it becomes active
        if (rect.top <= threshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setDrawerOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`navbar-cyber ${scrolled ? 'scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <div className="container-xxl d-flex align-items-center justify-content-between">
          {/* Logo */}
          <a
            href="#hero"
            className="navbar-logo"
            onClick={e => handleLinkClick(e, '#hero')}
            aria-label="Home"
          >
            <img src="/images/logo.png" alt="Logo" className="navbar-logo-img" />
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links d-none d-lg-flex" >
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-link-cyber ${activeSection === href.slice(1) ? 'active' : ''}`}
                  onClick={e => handleLinkClick(e, href)}
                >
                  <span className="nav-num">{String(navLinks.findIndex(l => l.href === href) + 1).padStart(2, '0')}.</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="d-flex align-items-center gap-3">
            <a
              href="#contact"
              className="btn-cyber btn-cyber-primary d-none d-lg-inline-flex"
              onClick={e => handleLinkClick(e, '#contact')}
            >
              <i className="bi bi-terminal"></i> Hire Me
            </a>
            <button
              className={`hamburger d-lg-none ${drawerOpen ? 'open' : ''}`}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-expanded={drawerOpen}
              aria-label="Toggle navigation"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="drawer-header">
          <img src="/images/logo.png" alt="Logo" className="navbar-logo-img" />
        </div>
        <ul>
          {navLinks.map(({ href, label }, i) => (
            <li key={href} style={{ animationDelay: `${i * 0.06}s` }}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={e => handleLinkClick(e, href)}
              >
                <span className="nav-num">0{i + 1}.</span> {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn-cyber btn-cyber-primary w-100 mt-3 justify-content-center"
          onClick={e => handleLinkClick(e, '#contact')}>
          <i className="bi bi-terminal"></i> Hire Me
        </a>
      </div>
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}