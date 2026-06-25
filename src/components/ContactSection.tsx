import { useState, FormEvent } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { socialLinks } from "../data";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ContactSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ preset: "fadeUp" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    error: null as string | null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitting: true, error: null });

    try {
      const response = await fetch("https://formspree.io/f/mjkgeejp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New message from ${formData.name}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to send");

      setFormData({ name: "", email: "", message: "" });
      setFormStatus({ submitting: false, error: null });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch {
      setFormStatus({
        submitting: false,
        error: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section">
      <div className="container-main">
        <span className="section-label">// Contact</span>
        <div className="section-divider" />

        <div className="contact-grid">
          {/* Left — CTA */}
          <div>
            <h2 className="contact-heading">
              Let's create something{" "}
              <span className="accent">remarkable</span>
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Have a project in mind or want to collaborate? I'd love to hear from you.
              Let's build something exceptional together.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href={`mailto:${socialLinks.email}`}
                className="contact-info-card hoverable"
              >
                <Mail />
                <span>vermajatin447@gmail.com</span>
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card hoverable"
              >
                <Github />
                <span>github.com/Jatinverma9728</span>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card hoverable"
              >
                <Linkedin />
                <span>linkedin.com/in/jatinverma9728</span>
              </a>
              <div className="contact-info-card" style={{ cursor: "default" }}>
                <MapPin />
                <span>Bhiwani, India · Remote Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="contact-name" className="sr-only">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email" className="sr-only">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message" className="sr-only">Your message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={formStatus.submitting}
                className="btn-primary hoverable"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  opacity: formStatus.submitting ? 0.6 : 1,
                  cursor: formStatus.submitting ? "not-allowed" : "pointer",
                }}
              >
                {formStatus.submitting ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4" fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              {formStatus.error && (
                <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.75rem" }}>
                  {formStatus.error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <div className={`success-popup ${showSuccess ? "show" : ""}`}>
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Message sent successfully!
      </div>

      {/* Ambient glow */}
      <div className="ambient-glow gold" style={{ width: "400px", height: "400px", top: "-15%", left: "-5%" }} />
    </section>
  );
}
