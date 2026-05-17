import React, { useEffect } from "react";
import "./Hero.css";

const Hero = () => {
  useEffect(() => {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        // Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.6)";
        ctx.fill();

        // Connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          const distance = Math.hypot(
            p.x - p2.x,
            p.y - p2.y
          );

          if (distance < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.strokeStyle = `rgba(0, 212, 255, ${
              0.12 - distance / 1400
            })`;

            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section id="hero">
      {/* Background Canvas */}
      <canvas id="particles"></canvas>

      {/* Content */}
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Available for freelance & full-time
          </div>

          <h1 className="hero-title">
           Huzaifa <br />
            <span>Kaleem</span>
          </h1>

          <p className="hero-desc">
            Full-stack engineer specializing in the MERN ecosystem.
            I architect performant APIs, craft seamless React UIs,
            and ship products that users love.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              View My Work
            </button>

            <button className="btn-secondary">
              Download CV
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <h2>5+</h2>
              <p>Years Exp.</p>
            </div>

            <div className="stat-box">
              <h2>42</h2>
              <p>Projects</p>
            </div>

            <div className="stat-box">
              <h2>18</h2>
              <p>Clients</p>
            </div>

            <div className="stat-box">
              <h2>99%</h2>
              <p>On Time Delivery</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-right">
          <div className="hero-ring ring1"></div>
          <div className="hero-ring ring2"></div>

          <div className="hero-avatar">
            HK
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;