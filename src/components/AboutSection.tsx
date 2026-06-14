import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ preset: "fadeUp" });
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({
    years: 0,
    projects: 0,
    technologies: 0,
  });

  useEffect(() => {
    const statsEl = statsRef.current;
    if (!statsEl) return;

    const trig = ScrollTrigger.create({
      trigger: statsEl,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const obj = { years: 0, projects: 0, technologies: 0 };
        gsap.to(obj, {
          years: 3,
          projects: 5,
          technologies: 15,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            setCounts({
              years: Math.round(obj.years),
              projects: Math.round(obj.projects),
              technologies: Math.round(obj.technologies),
            });
          },
        });
      },
    });

    return () => trig.kill();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section">
      <div className="container-main">
        <span className="section-label">// About</span>
        <div className="section-divider" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left — Text */}
          <div>
            <h2 className="section-heading">
              Turning ideas into
              <br />
              <span style={{ color: "var(--color-accent)" }}>digital reality</span>
            </h2>
            <p className="about-text">
              I'm a passionate <span className="highlight">MCA student</span> and{" "}
              <span className="highlight">full-stack developer</span> who thrives on turning
              complex problems into elegant solutions through code and design.
            </p>
            <br />
            <p className="about-text">
              Specializing in the <span className="highlight">MERN stack</span>, I create
              seamless web experiences that combine stunning design with powerful
              functionality. My work is driven by a perfect balance of{" "}
              <span className="highlight">form and function</span>.
            </p>
            <br />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
              {[
                "AI Integration",
                "Performance",
                "Accessibility",
                "Mobile First",
                "Clean Code",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.4rem 1rem",
                    fontSize: "0.8rem",
                    borderRadius: "99px",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Stats */}
          <div ref={statsRef}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div className="stat-card" style={{ background: "var(--color-bg-card)", borderRadius: "1rem", border: "1px solid var(--color-border)" }}>
                <div className="stat-number">{counts.years}+</div>
                <div className="stat-label">Years Exp</div>
              </div>
              <div className="stat-card" style={{ background: "var(--color-bg-card)", borderRadius: "1rem", border: "1px solid var(--color-border)" }}>
                <div className="stat-number">{counts.projects}+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-card" style={{ gridColumn: "1 / -1", background: "var(--color-bg-card)", borderRadius: "1rem", border: "1px solid var(--color-border)" }}>
                <div className="stat-number">{counts.technologies}+</div>
                <div className="stat-label">Technologies</div>
              </div>
            </div>

            {/* Core Values */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "2rem",
                background: "var(--color-bg-card)",
                borderRadius: "1rem",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", marginBottom: "1rem", color: "var(--color-text)" }}>
                Core Values
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: "💡", text: "Innovation First" },
                  { icon: "🎯", text: "Pixel Perfect Design" },
                  { icon: "⚡", text: "Performance Driven" },
                ].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "var(--color-text-muted)",
                      fontSize: "0.95rem",
                    }}
                  >
                    <span style={{ fontSize: "1.25rem" }}>{v.icon}</span>
                    <span>{v.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="ambient-glow gold" style={{ width: "400px", height: "400px", top: "-10%", right: "-5%" }} />

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
