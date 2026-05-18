import React, { useEffect } from "react";
import "./Skills.css";

const Skills = () => {
  const frontendSkills = [
    {
      icon: <i className="fa-brands fa-react" style={{ color: "#00d8ff" }}></i>,
      name: "React",
    },
    {
      icon: <i className="fa-brands fa-html5" style={{ color: "#3178c6" }}></i>,
      name: "Html",
    },
    {
      icon: <i className="fa-brands fa-css3-alt" style={{ color: "#00cef7" }}></i>,
      name: "CSS",
    },
    {
      icon: <i className="fa-brands fa-js" style={{ color: "#00cef7" }}></i>,
      name: "JavaScript",
    },
    {
      icon: <i className="fa-brands fa-bootstrap" style={{ color: "#00cef7" }}></i>,
      name: "Bootstrap",
    },
    {
      icon: <i className="fa-solid fa-layer-group" style={{ color: "#00cef7" }}></i>,
      name: "Redux",
    },
  ];

  const backendSkills = [
    {
      icon: <i className="fa-brands fa-node-js" style={{ color: "#00cef7" }}></i>,
      name: "Node.js",
    },
    {
      icon: <i className="fa-solid fa-server" style={{ color: "#00cef7" }}></i>,
      name: "Express",
    },
    {
      icon: <i className="fa-solid fa-database" style={{ color: "#00cef7" }}></i>,
      name: "MongoDB",
    },
    {
      icon: <i className="fa-brands fa-docker" style={{ color: "#00cef7" }}></i>,
      name: "Docker",
    },
    {
      icon: <i className="fa-brands fa-aws" style={{ color: "#00cef7" }}></i>,
      name: "AWS",
    },
    {
      icon: <i className="fa-brands fa-github" style={{ color: "#00cef7" }}></i>,
      name: "Github",
    },
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