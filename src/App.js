import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SplashCursor from "./components/SplashCursor";

/* ─── Loading Screen ─── */
const BOOT_LINES = [
  { prompt: "$", text: "init portfolio --mode=production", delay: 100 },
  { prompt: ">", text: "loading MERN stack modules...", ok: "OK", delay: 400 },
  { prompt: ">", text: "compiling React components...", ok: "OK", delay: 700 },
  { prompt: ">", text: "connecting to MongoDB...", ok: "CONNECTED", delay: 1000 },
  { prompt: "✓", text: "All systems ready. Welcome!", delay: 1300 },
];

function LoadingScreen({ hidden }) {
  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`} role="status" aria-label="Loading portfolio">
      <div className="loading-terminal" aria-live="polite">
        <div
          style={{
            marginBottom: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
          }}>
          huzaifa@portfolio:~
        </div>
        {BOOT_LINES.map(({ prompt, text, ok }, i) => (
          <div key={i} className="loading-line">
            <span className="prompt">{prompt}</span>
            <span>{text}</span>
            {ok && <span className="ok ms-auto">[{ok}]</span>}
          </div>
        ))}
        <div className="loading-bar-wrap" style={{ marginTop: "1.2rem" }}>
          <div className="loading-bar" />
        </div>
      </div>
    </div>
  );
}

/* ─── Intersection Observer Hook ─── */
function useScrollAnimations() {
  useEffect(() => {
    const els = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

/* ─── Back to Top Hook ─── */
function useBackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return show;
}

/* ─── App ─── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const showTop = useBackToTop();
  useScrollAnimations();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <LoadingScreen hidden={loaded} />

      <div id="app-root" style={{ visibility: loaded ? "visible" : "hidden" }}>
        <a href="#main-content" className="skip-link" tabIndex="0">
          Skip to main content
        </a>
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#00d4ff"
        />

        <Navbar />

        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Testimonials />
          <Contact />
        </main>

        <Footer />

        {/* Back to top */}
        <button
          className={`back-to-top ${showTop ? "visible" : ""}`}
          onClick={scrollTop}
          aria-label="Back to top"
          title="Back to top">
          <i className="bi bi-chevron-up" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
}
