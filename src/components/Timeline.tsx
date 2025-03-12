import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Timeline.css";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  title: string;
  company: string;
  date: string;
  position: "left" | "right";
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  company,
  date,
  position,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`flex items-center ${
        position === "left" ? "flex-row-reverse" : "flex-row"
      } w-full mb-8`}
    >
      <div
        className={`w-5/12 ${
          inView
            ? position === "left"
              ? "animate-slide-left"
              : "animate-slide-right"
            : "opacity-0"
        }`}
      >
        <div className="bg-orange-500 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-200 mb-1">{company}</p>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
      </div>
      <div className="w-2/12 flex justify-center">
        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
      </div>
      <div className="w-5/12"></div>
    </div>
  );
};

export const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    const glow = glowRef.current;

    if (timeline && line && glow) {
      // Set initial states
      gsap.set([line, glow], {
        height: 0,
      });

      // Animate the main line
      gsap.to(line, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // Animate the glow effect - slightly delayed to follow the line
      gsap.to(glow, {
        height: "15%", // Shorter height for the glow
        ease: "power1.out",
        scrollTrigger: {
          trigger: timeline,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            // Update glow position to follow the line's end
            const progress = self.progress;
            const maxScroll = timeline.offsetHeight - glow.offsetHeight;
            const newPosition = maxScroll * progress;
            glow.style.top = `${newPosition}px`;
          },
        },
      });
    }
  }, []);

  const experiences = [
    {
      title: "Frontend Development",
      // company: "Techoverflows",
      date: "June 23 - Present",
      position: "right" as const,
    },
    {
      title: "Backend Development",
      // company: "Tech Solutions",
      date: "Nov 2023 - Present",
      position: "left" as const,
    },
    {
      title: "UI Library Development",
      // company: "Multiple UI Libraries",
      date: "Jan 24 - Present",
      position: "right" as const,
    },
    {
      title: "MERN Stack",
      company: "Full Stack Development",
      date: "June 24 - Present",
      position: "left" as const,
    },
    {
      title: "Internship",
      company: "Small Fare",
      date: "March 25 - Present",
      position: "right" as const,
    },
  ];

  // Add mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll(".timeline-card");

    cards.forEach((card) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <div
      ref={timelineRef}
      className="relative max-w-3xl mx-auto"
      onMouseMove={handleMouseMove}
    >
      {/* Timeline line container */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: "24px", bottom: "24px" }}
      >
        {/* Base line */}
        <div
          ref={lineRef}
          className="absolute inset-0 w-0.5 bg-blue-500/30"
        ></div>

        {/* Glowing overlay */}
        <div
          ref={glowRef}
          className="absolute w-0.5 timeline-glow"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #60a5fa, #3b82f6, #60a5fa, transparent)",
            filter: "blur(3px)",
            opacity: 1,
            width: "5px",
            transform: "translateX(-2px)",
            boxShadow: `
              0 0 10px rgb(43, 122, 248),
              0 0 20px #3b82f6,
              0 0 30px #3b82f6,
              0 0 40px #3b82f6
            `,
          }}
        ></div>
      </div>

      {/* Timeline items */}
      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            <div className="flex items-center">
              {exp.position === "left" ? (
                <div className="w-1/2 pr-8 text-right">
                  <div
                    className="timeline-card relative overflow-hidden bg-gray-900/50 backdrop-blur-sm 
                              border border-orange-500/20 rounded-xl p-6 transform 
                              hover:scale-105 transition-all duration-300"
                  >
                    <div className="card-spotlight"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-orange-400">
                        {exp.title}
                      </h3>
                      <p className="text-gray-400">{exp.date}</p>
                      <p className="text-gray-300 mt-2">{exp.company}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-1/2 pl-8"></div>
              )}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900"></div>
              </div>
              {exp.position === "right" ? (
                <div className="w-1/2 pl-8">
                  <div
                    className="timeline-card relative overflow-hidden bg-gray-900/50 backdrop-blur-sm 
                              border border-orange-500/20 rounded-xl p-6 transform 
                              hover:scale-105 transition-all duration-300"
                  >
                    <div className="card-spotlight"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-orange-400">
                        {exp.title}
                      </h3>
                      <p className="text-gray-400">{exp.date}</p>
                      <p className="text-gray-300 mt-2">{exp.company}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
