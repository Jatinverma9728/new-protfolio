import { useEffect, useState } from "react";
import { navItems } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container-main" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hoverable"
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "var(--color-text)",
                letterSpacing: "-0.03em",
              }}
            >
              JV<span style={{ color: "var(--color-accent)" }}>.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center" style={{ gap: "2rem" }}>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link hoverable"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.toLowerCase());
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden hoverable flex flex-col"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              padding: "0.5rem",
              cursor: "pointer",
              gap: "5px",
              zIndex: 1001,
            }}
          >
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text)",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none",
              }}
            />
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text)",
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text)",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="mobile-link hoverable"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(item.toLowerCase());
            }}
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.4s ease ${i * 0.08}s`,
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}
