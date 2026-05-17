import React, { useEffect } from "react";
import "./Experience.css";

const Experience = () => {
  const experienceData = [
    {
      date: "2022 – PRESENT",
      role: "Senior Full-Stack Developer",
      company: "TechCorp Solutions, Lahore",
      points: [
        "Architected microservices reducing API latency by 40%",
        "Led a team of 4 devs shipping 3 enterprise SaaS products",
        "Implemented CI/CD pipelines cutting deployment time by 60%",
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
    },
    {
      date: "2020 – 2021",
      role: "Backend Developer",
      company: "CloudNest, Lahore",
      points: [
        "Designed RESTful APIs consumed by 3 mobile apps",
        "Optimized MongoDB queries, improving response time by 55%",
        "Implemented JWT + refresh-token authentication system",
      ],
    },
    {
      date: "2019 – 2020",
      role: "Junior Web Developer",
      company: "StartupHive, Lahore",
      points: [
        "Contributed to React dashboard used by 10,000+ users",
        "Wrote unit and integration tests (Jest, Mocha)",
        "Maintained MongoDB schemas and wrote migration scripts",
      ],
    },
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