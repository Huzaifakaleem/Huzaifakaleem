import React, { useEffect } from "react";
import "./Experience.css";

const Experience = () => {
  const experienceData = [
    {
      date: "2022 – 2023",
      role: "Senior MERN Developer",
      company: "TechSolutions , Lahore",
      points: [
      'Architected microservices serving 500k+ users with 99.9% uptime',
      'Reduced API response times by 60% via Redis caching & query optimization',
      'Led a team of 5 engineers using Agile/Scrum methodology',
      ],
    },
    {
      date: "2021 – 2022",
      role: "Full-Stack Developer",
      company: "PixelForge Agency, Remote",
      points: [
        "Delivered 15+ client projects on time and on budget",
        "Built real-time features with Socket.IO and WebRTC",
        "Integrated payment gateways: Stripe, PayFast, JazzCash",
      ],
    }
  ];

  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience">
      <div className="container">
        <span className="section-tag">{'// experience'}</span>

        <h2 className="section-title">
          My <span className="gradient-text">journey</span>
        </h2>

        <div className="section-line"></div>

        <div className="timeline">
          {experienceData.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>

                <div className="timeline-role">{item.role}</div>

                <div className="timeline-company">
                  {item.company}
                </div>

                <ul className="timeline-bullets">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;