import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "../data";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ProjectsSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ preset: "fadeUp" });

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="container-main">
        <span className="section-label">// Projects</span>
        <div className="section-divider" />
        <h2 className="section-heading">Featured Work</h2>

        {projects.map((project, i) => {
          const isReverse = i % 2 !== 0;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className={`project-showcase ${isReverse ? "reverse" : ""}`}
            >
              {/* Image */}
              <div className="project-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />
                <div className="project-image-overlay" />
              </div>

              {/* Content */}
              <div className="project-content">
                <div className="project-number">
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link hoverable"
                  >
                    <ExternalLink />
                    Live Site
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link hoverable"
                  >
                    <Github />
                    Source
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Ambient glows */}
      <div className="ambient-glow blue" style={{ width: "400px", height: "400px", top: "10%", right: "-10%" }} />
      <div className="ambient-glow gold" style={{ width: "350px", height: "350px", bottom: "10%", left: "-8%" }} />
    </section>
  );
}
