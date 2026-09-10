import React, { useState } from "react";
import "./Projects.css";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "Dr Shiza Naeem | Plastic, Reconstructive & Aesthetic Surgeon",
      desc: "Developed a responsive and modern portfolio website for a plastic surgeon using the MERN stack. The platform showcases the surgeon’s services,  patient reviews, and contact functionality.",
      icon: "/images/Drshizanaeem.jpg",
      category: "fullstack",
      featured: true,
      tech: ["React.js", "Express.js", "MongoDB", "Node.js"],
    }
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects">
      <div className="container">
        <span className="section-tag">{'// projects'}</span>
        <h2 className="section-title">
          Things I've <span className="gradient-text">shipped</span>
        </h2>
        <div className="section-line"></div>

        <div className="filter-btns">
          {["all", "fullstack", "frontend", "backend"].map((item) => (
            <button
              key={item}
              className={`filter-btn ${filter === item ? "active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item === "all"
                ? "All"
                : item === "fullstack"
                  ? "Full Stack"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filteredProjects.map((project, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="project-card">

                <div className="project-card-img">
                  <span className="project-card-img-icon">
                    <img src={project.icon} alt={project.title} />
                  </span>
                </div>

                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>

                  <div>
                    {project.tech.map((tech, i) => (
                      <span className="tech-badge" key={i}>
                        {tech}
                      </span>
                    ))}
                  </div>


                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;