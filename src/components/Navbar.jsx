import React, { useState, useEffect, useRef } from 'react';
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
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
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
            <span className="logo-bracket">[</span>
            <span className="logo-initials">HK</span>
            <span className={`logo-cursor ${blink ? 'visible' : ''}`}>_</span>
            <span className="logo-bracket">]</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links d-none d-lg-flex" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-link-cyber ${activeSection === href.slice(1) ? 'active' : ''}`}
                  onClick={e => handleLinkClick(e, href)}
                >
                  <span className="nav-num">{navLinks.indexOf({ href, label }) < 9 ? `0${navLinks.findIndex(l=>l.href===href)+1}` : navLinks.findIndex(l=>l.href===href)+1}.</span>
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
          <span className="logo-bracket">[</span>
          <span className="logo-initials">HK</span>
          <span className="logo-cursor visible">_</span>
          <span className="logo-bracket">]</span>
        </div>
        <ul role="list">
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
