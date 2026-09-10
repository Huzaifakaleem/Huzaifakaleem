import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const skills = [
  { name: 'MongoDB', level: 92, color: 'cyan' },
  { name: 'Express.js', level: 88, color: 'cyan' },
  { name: 'React', level: 95, color: 'cyan' },
  { name: 'Node.js', level: 90, color: 'cyan' },
  { name: 'REST APIs', level: 93, color: 'cyan' },
  { name: 'Git', level: 90, color: 'cyan' },
];


const education = [
  {
    degree: 'B.Sc. Information Technology',
    school: 'Virtual University of Pakistan',
    period: '2023 - 2027',
    grade: 'CGPA: 3.1 / 4.0',
  },
  {
    degree: 'Full Stack Web Dev Bootcamp',
    school: 'Brains College, Lahore',
    period: '2025',
    grade: 'Top 5% Completion',
  },
];


export default function About() {
  const [activeTab, setActiveTab] = useState('skills');
  const [barsVisible, setBarsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBarsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="section-intro animate-on-scroll">
          <span className="section-tag">{'// about_me'}</span>
          <h2 className="section-title">Crafting code with
            <span className="custom-accent"> purpose & precision</span></h2>
          <div className="section-divider"></div>
        </div>

        <div className="row g-5 align-items-start">
          {/* Photo Column */}
          <div className="col-lg-4 animate-on-scroll delay-1">
            <div className="about-photo-wrap">
              <div className="photo-frame">
              <img
                  src="/images/Me.JPG"  
                  alt="Huzaifa Kaleem"
                  className="profile-photo"
/>
                <div className="photo-border-glow" aria-hidden="true"></div>
                <div className="photo-scanlines" aria-hidden="true"></div>
              </div>
              {/* Mini stats */}
              <div
                className="mt-2 p-3"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                  }}
                >
                  $ about --me
                </div>

                <div
                  className="mono"
                  style={{
                    fontSize: "13px",
                    color: "var(--accent-cyan)",
                    marginTop: "8px",
                    lineHeight: "1.8",
                  }}
                >
                  &gt; Huzaifa Kaleem <br />
                  &gt; Lahore, Pakistan 🇵🇰 <br />
                  &gt; MERN Stack Developer <br />
                  &gt; 5+ years experience
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-8 animate-on-scroll delay-2">
            <div className="about-bio">
              <h3 className="about-subtitle">
                <span className="accent-cyan">{'<'}</span>
                Full Stack MERN Developer
                <span className="accent-cyan">{' />'}</span>
              </h3>
              <p className="about-text">
                I'm a passionate MERN stack developer with experience in crafting
                scalable web applications. I specialize in building robust backends with
                Node.js & MongoDB, and polished frontends with React.
              </p>
              <p className="about-text">
                When I'm not pushing commits, I'm contributing to open-source, exploring
                cloud architecture, or mentoring junior devs. I believe great software is
                built at the intersection of clean code and empathy for the user.
              </p>

              {/* Tabs */}
              <div className="about-tabs" role="tablist" aria-label="About sections">
                {['skills', 'education'].map(tab => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="tab-content-panel" role="tabpanel">
                {activeTab === 'skills' && (
                  <div className="skills-list">
                    {skills.map(({ name, level, color }) => (
                      <div key={name} className="skill-row">
                        <div className="skill-header">
                          <span className="skill-name mono">{name}</span>
                          <span className="skill-pct mono" style={{ color: "var(--text-muted)" }} >{level}%</span>
                        </div>
                        <div className="skill-bar-bg">
                          <div
                            className={`skill-bar-fill ${color}`}
                            style={{ width: barsVisible && activeTab === 'skills' ? `${level}%` : '0%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

           

                {activeTab === 'education' && (
                  <div className="edu-list">
                    {education.map(({ degree, school, period, grade }) => (
                      <div key={degree} className="edu-card">
                        <div className="edu-icon">
                          <i className="bi bi-mortarboard-fill"></i>
                        </div>
                        <div>
                          <h4 className="edu-degree">{degree}</h4>
                          <p className="edu-school">{school}</p>
                          <div className="d-flex gap-3 flex-wrap">
                            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{period}</span>
                            <span className="tech-badge green">{grade}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
