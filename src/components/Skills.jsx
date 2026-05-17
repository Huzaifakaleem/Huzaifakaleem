import React, { useEffect } from "react";
import "./Skills.css";

const Skills = () => {
  const frontendSkills = [
    { icon: "⚛️", name: "React" },
    { icon: "🔷", name: "TypeScript" },
    { icon: "▲", name: "Next.js" },
    { icon: "🎨", name: "Figma" },
    { icon: "🅱️", name: "Bootstrap" },
    { icon: "💠", name: "Redux" },
  ];

  const backendSkills = [
    { icon: "🟢", name: "Node.js" },
    { icon: "🚀", name: "Express" },
    { icon: "🍃", name: "MongoDB" },
    { icon: "🐳", name: "Docker" },
    { icon: "☁️", name: "AWS" },
    { icon: "🟠", name: "Git" },
  ];

  useEffect(() => {
    const cards = document.querySelectorAll(".skill-icon-card");

    cards.forEach((card, index) => {
      card.style.animationDuration = `${3 + index * 0.2}s`;
    });
  }, []);

  return (
    <section id="skills">
      <div className="container">
        <span className="section-tag">{'// Skills'}</span>

        <h2 className="section-title">
          Tools I <span className="gradient-text">master</span>
        </h2>

        <div className="section-line"></div>

        {/* Frontend */}
        <div className="skills-category">Frontend</div>

        <div className="skills-grid">
          {frontendSkills.map((skill, index) => (
            <div className="skill-icon-card" key={index}>
              <span className="skill-icon">{skill.icon}</span>
              <div className="skill-name">{skill.name}</div>
            </div>
          ))}
        </div>

        {/* Backend */}
        <div className="skills-category">Backend</div>

        <div className="skills-grid">
          {backendSkills.map((skill, index) => (
            <div className="skill-icon-card" key={index}>
              <span className="skill-icon">{skill.icon}</span>
              <div className="skill-name">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;