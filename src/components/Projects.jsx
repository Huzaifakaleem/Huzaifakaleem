import React, { useState } from "react";
import "./Projects.css";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "NexChat — Real-Time Chat App",
      desc: "Full-stack messaging platform with rooms, presence, and encryption.",
      icon: "💬",
      category: "fullstack",
      featured: true,
      tech: ["React", "Socket.IO", "MongoDB", "Node.js"],
    },
    {
      title: "DataViz — Dashboard",
      desc: "Interactive analytics dashboard with charts and dark mode.",
      icon: "📊",
      category: "frontend",
      featured: false,
      tech: ["React", "TypeScript", "Charts"],
    },
    {
      title: "TaskFlow API",
      desc: "REST API with JWT auth, RBAC, rate limiting, and docs.",
      icon: "⚙️",
      category: "backend",
      featured: false,
      tech: ["Node.js", "Express", "MongoDB"],
    },
    {
      title: "CloudSync — File Storage Platform",
      desc: "Secure cloud storage platform with drag & drop uploads, sharing, and folder management.",
      icon: "☁️",
      category: "fullstack",
      featured: true,
      tech: ["React", "Node.js", "MongoDB", "AWS"],
    },
    {
      title: "CodeSphere — Developer Social App",
      desc: "Social platform for developers with posts, comments, likes, and GitHub integration.",
      icon: "👨‍💻",
      category: "frontend",
      featured: false,
      tech: ["React", "Firebase", "Tailwind", "GitHub API"],
    },
    {
      title: "AI Resume Analyzer",
      desc: "AI-powered resume screening system with keyword matching and ATS score generation.",
      icon: "🤖",
      category: "backend",
      featured: false,
      tech: ["Node.js", "Express", "OpenAI API", "MongoDB"],
    },
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
                {project.featured && (
                  <div className="featured-ribbon">FEATURED</div>
                )}

                <div className="project-card-img">
                  <span className="project-card-img-icon">
                    {project.icon}
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