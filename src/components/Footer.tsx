import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { socialLinks } from "../data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container-main">
        <div className="footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} Jatin Verma. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div className="footer-socials">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link hoverable"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link hoverable"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="footer-social-link hoverable"
                aria-label="Email"
              >
                <Mail />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="footer-social-link hoverable"
              aria-label="Back to top"
              style={{ cursor: "pointer", background: "none" }}
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
