import React, { useEffect, useRef, useState, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import TypewriterText from "./components/TypewriterText";
import { Github, Linkedin, Mail, ExternalLink, X } from "lucide-react";
import { Timeline } from "./components/Timeline";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Scene3D from "./components/Scene3D";
import { motion } from "framer-motion";
import Loader from "./components/Loader";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const headerRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counts, setCounts] = useState({
    years: 0,
    projects: 0,
    clients: 0,
    technologies: 0,
  });

  const quickFactsRef = useRef(null);
  const [factsRef, factsInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null as string | null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const [newsletter, setNewsletter] = useState({
    email: "",
    submitting: false,
    success: false,
    error: null as string | null,
  });

  // Add state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add toggle function for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      const cards = document.querySelectorAll(".spotlight-card");

      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const color = (card as HTMLElement).dataset.color || "#ff6b00";

        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        (card as HTMLElement).style.setProperty("--card-color", color);
      });
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Batch animations for better performance
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power3.out",
        },
      });

      tl.from(headerRef.current, {
        y: -100,
        opacity: 0,
      });

      // Batch process fade-in animations
      const fadeElements = gsap.utils.toArray(".fade-in");
      fadeElements.forEach((element: any) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top center+=100",
          toggleActions: "play none none reverse",
          animation: gsap.from(element, {
            opacity: 0,
            y: 50,
          }),
        });
      });

      gsap.utils.toArray(".parallax-card").forEach((card: any) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -50,
          ease: "none",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (factsInView) {
      gsap.to(counts, {
        years: 3,
        projects: 5,
        clients: 3,
        technologies: 15,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          setCounts({
            years: Math.round(counts.years),
            projects: Math.round(counts.projects),
            clients: Math.round(counts.clients),
            technologies: Math.round(counts.technologies),
          });
        },
      });
    }
  }, [factsInView]);

  useEffect(() => {
    // Simulate loading time and hide loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  const skills = [
    {
      name: "React",
      image:
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      level: "80%",
      color: "#61DAFB",
      category: "Frontend",
      experience: "6 months",
    },
    {
      name: "Node.js",
      image:
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      level: "60%",
      color: "#68A063",
      category: "Backend",
      experience: "3 months",
    },
    {
      name: "MongoDB",
      image:
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
      level: "70%",
      color: "#4DB33D",
      category: "Backend",
      experience: "3 months",
    },
    {
      name: "TypeScript",
      image:
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
      level: "80%",
      color: "#3178C6",
      category: "Language",
      experience: "7 months",
    },
    // {
    // name: "Next.js",
    // image:
    // "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    // level: "85%",
    // color: "#000000",
    // category: "Frontend",
    // },
    {
      name: "Tailwind",
      image:
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
      level: "85%",
      color: "#38B2AC",
      category: "Frontend",
      experience: "2+ years",
    },
    {
      name: "C++",
      image:
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
      level: "50%",
      color: "#00599C",
      category: "Language",
      experience: "6 months",
    },
    {
      name: "C",
      image:
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
      level: "60%",
      color: "#A8B9CC",
      category: "Language",
      experience: "1 year",
    },
    {
      name: "JavaScript",
      image:
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      level: "75%",
      color: "#F7DF1E",
      category: "Language",
      experience: "2 years",
    },
  ];

  const projects = [
    {
      title: "Paramprik Swad E-commerce",
      description: "Full-stack MERN application with real-time updates",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
      tags: ["TypeScript", "TailwindCSS", "Ai Chatbot", "React"],
      liveUrl: "https://paramprkswad.vercel.app/",
      githubUrl: "https://github.com/Jatinverma9728/new-paramprikswad",
      color: "#61DAFB",
    },
    {
      title: "One Place E-commerce",
      description:
        "OnePlace is an ecommerce website offering various home services and products.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tags: ["JavaScript", " Typed.js", "TailwindCSS", "GSAP"],
      liveUrl: "https://one-place-one.vercel.app/index.html",
      githubUrl: "https://github.com/Jatinverma9728/one-place",
      color: "#000000",
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website with GSAP animations",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tags: ["React", "GSAP", "Three.js", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      color: "#FF4A4A",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus((prev) => ({ ...prev, submitting: true }));

    try {
      const response = await fetch("https://formspree.io/f/mjkgeejp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New message from ${formData.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormStatus({
        submitted: true,
        submitting: false,
        error: null,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Show success message
      setShowSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        submitted: false,
        submitting: false,
        error: "Failed to send message. Please try again.",
      });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletter.email) {
      setNewsletter((prev) => ({
        ...prev,
        error: "Please enter your email",
      }));
      return;
    }

    setNewsletter((prev) => ({
      ...prev,
      submitting: true,
      error: null,
    }));

    try {
      const response = await fetch("https://formspree.io/f/mjkgeejp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newsletter.email,
          _subject: "New Newsletter Subscription",
          message: `New subscription request from ${newsletter.email}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setNewsletter((prev) => ({
        ...prev,
        submitting: false,
        success: true,
        email: "",
      }));

      // Reset success message after 3 seconds
      setTimeout(() => {
        setNewsletter((prev) => ({
          ...prev,
          success: false,
        }));
      }, 3000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setNewsletter((prev) => ({
        ...prev,
        submitting: false,
        error: "Failed to subscribe. Please try again.",
      }));
    }
  };

  // Define active services with their links
  const activeServices = [
    {
      name: "Web Development",
      link: "#projects",
      description: "Modern web applications with React & Next.js",
    },
    {
      name: "Frontend Development",
      link: "#skills",
      description: "Responsive and interactive user interfaces",
    },
    {
      name: "Backend Development",
      link: "#experience",
      description: "Scalable backend solutions",
    },
  ];

  // Memoize components that don't need frequent updates
  const MemoizedScene3D = React.memo(Scene3D);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#0a0a0a] text-gray-200">
      <ScrollToTopButton />
      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 w-full bg-black/30 backdrop-blur-md z-50 border-b border-orange-500/20 
                   rounded-b-2xl shadow-lg shadow-orange-500/5"
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center gap-3 hover:scale-105 transition-all duration-300"
            >
              <div className="relative w-10 h-10">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full transform group-hover:rotate-12 transition-transform duration-300"
                >
                  {/* Outer Circle with gradient */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="fill-none stroke-orange-500/30"
                    strokeWidth="2"
                  />

                  {/* Animated circle stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="fill-none stroke-orange-500"
                    strokeWidth="2"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    style={{
                      animation: "circle-animation 2s ease-out forwards",
                    }}
                  />

                  {/* J letter */}
                  <path
                    d="M35 25v35c0 8 6 15 15 15s15-7 15-15"
                    className="fill-none stroke-white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      animation: "draw-letter 1s ease-out forwards",
                    }}
                  />

                  {/* V letter overlay */}
                  <path
                    d="M40 25l10 35 10-35"
                    className="fill-none stroke-orange-500"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      animation: "draw-letter 1s ease-out 0.5s forwards",
                      opacity: 0.8,
                    }}
                  />

                  {/* Decorative dots */}
                  <circle
                    cx="30"
                    cy="50"
                    r="3"
                    className="fill-orange-500 animate-pulse"
                  />
                  <circle
                    cx="70"
                    cy="50"
                    r="3"
                    className="fill-orange-500 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 
                                bg-clip-text text-transparent animate-gradient bg-300% group-hover:bg-orange-400 
                                transition-colors"
                >
                  Jatin Verma
                </span>
                <span className="text-xs text-gray-400 group-hover:text-orange-400 transition-colors">
                  Full Stack Developer
                </span>
              </div>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-orange-500 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="hover:text-orange-500 transition-colors"
              >
                About
              </a>
              <a
                href="#experience"
                className="hover:text-orange-500 transition-colors"
              >
                Experience
              </a>
              <a
                href="#skills"
                className="hover:text-orange-500 transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="hover:text-orange-500 transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="hover:text-orange-500 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mobile Menu - Updated with rounded corners */}
          <div
            className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} pt-4 
                          border-t border-orange-500/20 mt-4 rounded-b-xl 
                          bg-black/30 backdrop-blur-md`}
          >
            <div className="flex flex-col space-y-4 px-2 pb-4">
              <a
                href="#about"
                className="hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-orange-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#experience"
                className="hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-orange-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experience
              </a>
              <a
                href="#skills"
                className="hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-orange-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </a>
              <a
                href="#projects"
                className="hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-orange-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#contact"
                className="hover:text-orange-500 transition-colors px-3 py-2 rounded-lg hover:bg-orange-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Updated for better responsiveness */}
      <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MemoizedScene3D />
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8">
              <TypewriterText />
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed 
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              I'm a{" "}
              <span className="text-orange-400">BCA final-year student</span>{" "}
              and
              <span className="text-orange-400">
                {" "}
                full-stack developer
              </span>{" "}
              with expertise in
              <span className="text-orange-400"> React</span>,
              <span className="text-orange-400"> TypeScript</span>, and
              <span className="text-orange-400"> UI/UX design</span>. Passionate
              about creating{" "}
              <span className="text-orange-400">scalable web applications</span>{" "}
              and delivering{" "}
              <span className="text-orange-400">
                exceptional user experiences
              </span>
              .
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="#contact"
                className="bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 
                          transition-all transform hover:scale-105 duration-300 glow text-sm 
                          min-w-[140px] text-center"
              >
                Get in touch
              </a>
              <a
                href="#projects"
                className="border-2 border-orange-500 text-orange-400 px-6 py-2.5 rounded-full 
                          hover:bg-orange-500/10 transition-all transform hover:scale-105 
                          duration-300 text-sm min-w-[140px] text-center"
              >
                View Projects
              </a>
              <a
                href="/path-to-your-resume.pdf"
                download="Jatin_Verma_Resume.pdf"
                className="flex items-center justify-center gap-2 bg-gray-800/50 text-white 
                          px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all transform 
                          hover:scale-105 duration-300 border border-orange-500/20 text-sm
                          min-w-[140px]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 relative"
        onMouseMove={handleMouseMove}
      >
        <div className="container mx-auto px-6">
          <div className="fade-in">
            <h2 className="text-4xl font-bold mb-16 text-center animate-gradient">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="spotlight-card bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="card-spotlight"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-orange-400 mb-4">
                      Who I Am
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      I'm a passionate web developer and designer with a
                      creative mindset and a technical background. I thrive on
                      turning complex problems into elegant solutions through
                      code and design.
                    </p>
                  </div>
                </div>

                <div className="spotlight-card bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="card-spotlight"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-orange-400 mb-4">
                      What I Do
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Specializing in the MERN stack, I create seamless web
                      experiences that combine stunning design with powerful
                      functionality.
                    </p>
                  </div>
                </div>

                <div className="spotlight-card bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="card-spotlight"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-orange-400 mb-4">
                      My Approach
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      I believe in writing clean, maintainable code while
                      creating intuitive user experiences. My work is driven by
                      a perfect balance of form and function.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column - Stats and highlights */}
              <div className="space-y-6">
                <div
                  className="spotlight-card bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  ref={factsRef}
                >
                  <div className="card-spotlight"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-orange-400 mb-6">
                      Quick Facts
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-orange-500 mb-2">
                          {counts.years}+
                        </div>
                        <div className="text-gray-400">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-orange-500 mb-2">
                          {counts.projects}+
                        </div>
                        <div className="text-gray-400">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-orange-500 mb-2">
                          {counts.clients}+
                        </div>
                        <div className="text-gray-400">Happy Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-orange-500 mb-2">
                          {counts.technologies}+
                        </div>
                        <div className="text-gray-400">Technologies</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="spotlight-card bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="card-spotlight"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-orange-400 mb-4">
                      Core Values
                    </h3>
                    <ul className="space-y-4">
                      {[
                        { icon: "💡", text: "Innovation First" },
                        { icon: "🎯", text: "Pixel Perfect Design" },
                        { icon: "⚡", text: "Performance Driven" },
                        // { icon: "🤝", text: "Client Satisfaction" },
                      ].map((value, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-3 text-gray-300"
                        >
                          <span className="text-2xl">{value.icon}</span>
                          <span>{value.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="spotlight-card bg-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="card-spotlight"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-orange-400 mb-4">
                      Current Focus
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "AI Integration",
                        // "Web3",
                        "Performance",
                        "Accessibility",
                        "Mobile First",
                        "Clean Code",
                      ].map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm border border-orange-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <div className="fade-in">
            <h2 className="text-4xl font-bold mb-16 text-center animate-gradient">
              Experience
            </h2>
            <Timeline />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="container mx-auto px-6">
          <div className="fade-in">
            <h2 className="text-4xl font-bold mb-16 text-center animate-gradient">
              Skills & Expertise
            </h2>

            {/* Category Filters */}
            <div className="flex justify-center gap-4 mb-12">
              {["All", "Frontend", "Backend", "Language"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                           ${
                             selectedCategory === category
                               ? "bg-orange-500 text-white"
                               : "bg-gray-800/50 text-gray-300 hover:bg-orange-500/20"
                           }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills
                .filter(
                  (skill) =>
                    selectedCategory === "All" ||
                    skill.category === selectedCategory
                )
                .map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    }}
                    className="relative group"
                  >
                    <div
                      className="spotlight-card relative overflow-hidden bg-gray-900/50 backdrop-blur-sm 
                                rounded-xl p-8 transition-all duration-500 ease-out"
                      style={{
                        "--card-color": skill.color,
                        borderColor: `${skill.color}33`,
                      }}
                      data-color={skill.color}
                    >
                      <div className="card-spotlight"></div>
                      <div className="relative z-10">
                        {/* Icon and Name */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <div
                              className="w-16 h-16 rounded-lg bg-gray-800/50 flex items-center justify-center
                                        group-hover:animate-float"
                            >
                              <img
                                src={skill.image}
                                alt={skill.name}
                                className="w-10 h-10"
                              />
                            </div>
                            {/* Small category badge */}
                            <span
                              className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium
                                         bg-orange-500/20 text-orange-400"
                            >
                              {skill.category}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">
                              {skill.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Proficiency: {skill.level}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: skill.level }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                            }}
                          />
                        </div>

                        {/* Skill Details */}
                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-gray-400">
                              Active Projects
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span className="text-gray-400">
                              {skill.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="fade-in">
            <h2 className="text-4xl font-bold mb-16 text-center animate-gradient">
              Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`group transform transition-all duration-500 hover:scale-[1.02]`}
                >
                  <div className="project-card h-full">
                    {/* Project Image Container */}
                    <div className="relative overflow-hidden rounded-t-xl h-64">
                      <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 
                                   transition-all duration-500 z-10"
                      />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Hover Overlay Content */}
                      <div
                        className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 
                                   group-hover:opacity-100 transition-all duration-500"
                      >
                        <a
                          href={project.liveUrl}
                          className="project-btn bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                          aria-label="View Live Site"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                        <a
                          href={project.githubUrl}
                          className="project-btn bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                          aria-label="View Source Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div
                      className="relative bg-gray-900/50 backdrop-blur-sm p-6 rounded-b-xl border border-t-0 h-full
                                 group-hover:bg-gray-800/50 transition-colors duration-500"
                      style={{ borderColor: `${project.color}33` }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full text-white/80 bg-white/5 
                                       border border-white/10 backdrop-blur-sm transition-all duration-300
                                       group-hover:border-orange-500/20 group-hover:bg-orange-500/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar Indicator */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 overflow-hidden">
                        <motion.div
                          className="h-full project-progress"
                          style={{ backgroundColor: project.color }}
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="fade-in">
            <h2 className="text-4xl font-bold mb-16 text-center animate-gradient">
              Get in Touch
            </h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Contact Form Card */}
              <div className="contact-card bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20">
                <h3 className="text-2xl font-semibold mb-6 text-orange-400">
                  Send a Message
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 
                               focus:outline-none focus:border-orange-500 transition-all duration-300
                               peer text-gray-200"
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-sm text-gray-400"
                    >
                      Your Name
                    </label>
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 
                               focus:outline-none focus:border-orange-500 transition-all duration-300
                               peer text-gray-200"
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-400"
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="form-group">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder=" "
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 
                               focus:outline-none focus:border-orange-500 transition-all duration-300
                               peer text-gray-200 resize-none"
                      required
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute text-sm text-gray-400"
                    >
                      Your Message
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg
                             hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] 
                             transition-all duration-300 relative overflow-hidden group
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {formStatus.submitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 
                                  transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    />
                  </button>

                  {/* Error Message */}
                  {formStatus.error && (
                    <div className="text-red-500 text-sm mt-2">
                      {formStatus.error}
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info Card */}
              <div className="space-y-6">
                {/* Quick Contact Card */}
                <div className="contact-card bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20">
                  <h3 className="text-2xl font-semibold mb-6 text-orange-400">
                    Quick Contact
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:vermajatin447@gmail.com"
                      className="contact-link flex items-center gap-4 p-4 rounded-lg 
                                bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                      <Mail className="w-6 h-6 text-orange-400" />
                      <span>Email</span>
                    </a>
                    <a
                      href="https://github.com/Jatinverma9728"
                      className="contact-link flex items-center gap-4 p-4 rounded-lg 
                                bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                      <Github className="w-6 h-6 text-orange-400" />
                      <span>github</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jatinverma9728/"
                      className="contact-link flex items-center gap-4 p-4 rounded-lg 
                                bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                      <Linkedin className="w-6 h-6 text-orange-400" />
                      <span>linkedin</span>
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="contact-card bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20">
                  <h3 className="text-2xl font-semibold mb-6 text-orange-400">
                    Location
                  </h3>
                  <p className="text-gray-400">Based in Bhiwani, India</p>
                  <p className="text-gray-400">
                    Available for remote work worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 relative overflow-hidden border-t border-orange-500/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full transform group-hover:rotate-12 transition-transform duration-300"
                  >
                    {/* Outer Circle with gradient */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      className="fill-none stroke-orange-500/30"
                      strokeWidth="2"
                    />

                    {/* Animated circle stroke */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      className="fill-none stroke-orange-500"
                      strokeWidth="2"
                      strokeDasharray="283"
                      strokeDashoffset="283"
                      style={{
                        animation: "circle-animation 2s ease-out forwards",
                      }}
                    />

                    {/* J letter */}
                    <path
                      d="M35 25v35c0 8 6 15 15 15s15-7 15-15"
                      className="fill-none stroke-white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        animation: "draw-letter 1s ease-out forwards",
                      }}
                    />

                    {/* V letter overlay */}
                    <path
                      d="M40 25l10 35 10-35"
                      className="fill-none stroke-orange-500"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        animation: "draw-letter 1s ease-out 0.5s forwards",
                        opacity: 0.8,
                      }}
                    />

                    {/* Decorative dots */}
                    <circle
                      cx="30"
                      cy="50"
                      r="3"
                      className="fill-orange-500 animate-pulse"
                    />
                    <circle
                      cx="70"
                      cy="50"
                      r="3"
                      className="fill-orange-500 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 
                                  bg-clip-text text-transparent animate-gradient bg-300% group-hover:bg-orange-400 
                                  transition-colors"
                  >
                    Jatin Verma
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-orange-400 transition-colors">
                    Full Stack Developer
                  </span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Crafting digital experiences with modern web technologies and
                creative solutions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Jatinverma9728"
                  className="social-icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jatinverma9728/"
                  className="social-icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/YourTwitterHandle"
                  className="social-icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter) Profile"
                >
                  <X className="w-5 h-5" />
                </a>
                <a
                  href="mailto:vermajatin447@gmail.com"
                  className="social-icon-link"
                  aria-label="Email Contact"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {["About", "Experience", "Skills", "Projects", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="footer-link group flex items-center text-gray-400 hover:text-orange-400 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .querySelector(`#${item.toLowerCase()}`)
                            ?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }}
                      >
                        <span
                          className="mr-2 opacity-0 group-hover:opacity-100 transform 
                                   group-hover:translate-x-1 transition-all"
                        >
                          →
                        </span>
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                {activeServices.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.link}
                      className="group flex flex-col space-y-1 p-2 rounded-lg hover:bg-gray-800/50 
                                transition-all duration-300"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="h-px w-4 bg-orange-500 transform scale-x-0 
                                     group-hover:scale-x-100 transition-transform origin-left"
                        />
                        <span
                          className="text-gray-400 group-hover:text-orange-400 
                                     transition-colors font-medium"
                        >
                          {service.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 pl-6">
                        {service.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Stay Updated
              </h4>
              <p className="text-gray-400 mb-4">
                Subscribe to my newsletter for the latest updates.
              </p>
              <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletter.email}
                    onChange={(e) =>
                      setNewsletter((prev) => ({
                        ...prev,
                        email: e.target.value,
                        error: null,
                      }))
                    }
                    className={`w-full bg-gray-800/50 border rounded-lg px-4 py-2 
                               focus:outline-none transition-colors
                               ${
                                 newsletter.error
                                   ? "border-red-500 focus:border-red-500"
                                   : "border-gray-700 focus:border-orange-500"
                               }`}
                  />
                  <button
                    type="submit"
                    disabled={newsletter.submitting}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 
                             hover:text-orange-600 transition-colors disabled:opacity-50
                             disabled:cursor-not-allowed"
                  >
                    {newsletter.submitting ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {newsletter.error && (
                  <p className="text-sm text-red-500 mt-1">
                    {newsletter.error}
                  </p>
                )}

                {/* Success Message */}
                {newsletter.success && (
                  <div className="text-sm text-green-500 mt-1 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Successfully subscribed!</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Jatin Verma. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        {/* <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        </div> */}
      </footer>

      {/* Success Message Popup */}
      <div
        className={`fixed bottom-4 right-4 transform transition-all duration-500 ${
          showSuccess ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Message sent successfully!</span>
        </div>
      </div>
    </div>
  );
}

export default App;
