import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Only do horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const totalScroll = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // Animate cards
      const cards = track.querySelectorAll(".experience-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          y: 30,
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 80%",
            toggleActions: "play none none none",
          },
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
        });
      });
    });

    // Mobile: vertical layout with simple scroll reveals
    mm.add("(max-width: 768px)", () => {
      const cards = section.querySelectorAll(".experience-card");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section" style={{ overflow: "hidden" }}>
      <div className="container-main" style={{ marginBottom: "2rem" }}>
        <span className="section-label">// Experience</span>
        <div className="section-divider" />
        <h2 className="section-heading">The Journey</h2>
      </div>

      {/* Horizontal Track (desktop) / Vertical Stack (mobile) */}
      <div
        ref={trackRef}
        className="experience-track"
        style={{ paddingLeft: "clamp(1.5rem, 4vw, 3rem)", paddingRight: "4rem" }}
      >
        {experiences.map((exp, i) => (
          <div key={i} className="experience-card">
            <div className="card-date">{exp.date}</div>
            <div className="card-title">{exp.title}</div>
            {exp.company && <div className="card-company">{exp.company}</div>}
            <div
              style={{
                width: "30px",
                height: "2px",
                background: "var(--color-accent)",
                marginTop: "1.25rem",
                borderRadius: "99px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="container-main">
        <div className="experience-progress">
          <div
            ref={progressRef}
            className="experience-progress-fill"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .experience-track {
            flex-direction: column !important;
            padding-right: clamp(1.5rem, 4vw, 3rem) !important;
          }
          .experience-card {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
