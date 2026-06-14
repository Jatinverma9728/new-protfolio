import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { socialLinks } from "../data";

const texts = [
  "JATIN VERMA",
  "INNOVATOR",
  "UI/UX DESIGNER",
  "CREATIVE DEV", // Shorter than FULL STACK DEV to look bolder
];

class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
  active: boolean;
  angle: number;
  velocity: number;
  friction: number;
  offsetRandomX: number;
  offsetRandomY: number;

  constructor(x: number, y: number, color: string) {
    this.x = x + (Math.random() - 0.5) * 800;
    this.y = y + (Math.random() - 0.5) * 800;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * 1.5 + 1;
    this.density = Math.random() * 40 + 10;
    this.color = color;
    this.active = true;
    
    // For creative fluid movement
    this.angle = Math.random() * 360;
    this.velocity = Math.random() * 0.5;
    this.friction = Math.random() * 0.04 + 0.08;
    this.offsetRandomX = Math.random() * 10000;
    this.offsetRandomY = Math.random() * 10000;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse: { x: number; y: number; radius: number }, time: number) {
    if (!this.active) return;

    // Organic drift when sitting still
    const swayX = Math.sin(time * 0.001 + this.offsetRandomX) * 2;
    const swayY = Math.cos(time * 0.0012 + this.offsetRandomY) * 2;
    const targetX = this.baseX + swayX;
    const targetY = this.baseY + swayY;

    // Distance to mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouse.radius) {
      // Repel violently but smoothly
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;
      
      this.x -= directionX;
      this.y -= directionY;
    } else {
      // Spring back to target with friction
      let dxTarget = targetX - this.x;
      let dyTarget = targetY - this.y;
      
      this.x += dxTarget * this.friction;
      this.y += dyTarget * this.friction;
    }
  }
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas Text Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let textIndex = 0;
    let timeoutId: number;
    let time = 0;
    
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120 // Larger area of effect
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const getTextCoordinates = (text: string) => {
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      const oCtx = offscreenCanvas.getContext("2d");
      if (!oCtx) return [];

      // Determine max font size that fits the width
      let fontSize = Math.min(canvas.width * 0.16, 200); // Start large
      oCtx.font = `900 ${fontSize}px "Syne", sans-serif`;
      
      let textWidth = oCtx.measureText(text).width;
      
      // If it crops (wider than 90% of screen), shrink font size
      if (textWidth > canvas.width * 0.9) {
        fontSize = fontSize * ((canvas.width * 0.9) / textWidth);
        oCtx.font = `900 ${fontSize}px "Syne", sans-serif`;
      }

      oCtx.fillStyle = "white";
      oCtx.textAlign = "center";
      oCtx.textBaseline = "middle";
      
      // Draw slightly higher than center to leave room for CTAs
      oCtx.fillText(text, offscreenCanvas.width / 2, offscreenCanvas.height / 2.3);

      const textCoordinates = [];
      const imageData = oCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      const data = imageData.data;

      // Adjust particle step dynamically. Less pixels on mobile = lower step.
      const step = canvas.width < 768 ? 4 : 5; 

      for (let y = 0; y < offscreenCanvas.height; y += step) {
        for (let x = 0; x < offscreenCanvas.width; x += step) {
          const index = (y * offscreenCanvas.width + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 128) {
            textCoordinates.push({ x, y });
          }
        }
      }
      return textCoordinates;
    };

    const morphToText = (text: string) => {
      const coords = getTextCoordinates(text);
      
      if (coords.length > particles.length) {
        const diff = coords.length - particles.length;
        for (let i = 0; i < diff; i++) {
          const randomCoord = coords[Math.floor(Math.random() * coords.length)];
          // Color logic: mix of Sage Green, White, and a subtle Teal for a creative tech look
          const rand = Math.random();
          let color = "rgba(232, 228, 221, 0.8)"; // Whiteish
          if (rand > 0.6) color = "var(--color-accent)"; // Sage Green
          if (rand > 0.9) color = "#0d9488"; // Subtle Teal
          
          particles.push(new Particle(randomCoord.x, randomCoord.y, color));
        }
      }

      // Assign new targets and add some explosive randomization on word change
      for (let i = 0; i < particles.length; i++) {
        if (i < coords.length) {
          particles[i].active = true;
          particles[i].baseX = coords[i].x;
          particles[i].baseY = coords[i].y;
          
          // Explosion effect when transitioning
          particles[i].x += (Math.random() - 0.5) * 150;
          particles[i].y += (Math.random() - 0.5) * 150;
        } else {
          particles[i].active = false;
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      morphToText(texts[textIndex]);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 16; // Approx 60fps time increment
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouse, time);
        particles[i].draw(ctx);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const cycleText = () => {
      textIndex = (textIndex + 1) % texts.length;
      morphToText(texts[textIndex]);
      timeoutId = window.setTimeout(cycleText, 4500); // Stay on text slightly longer
    };

    // Delay initialization slightly to let custom fonts load
    setTimeout(() => {
      resizeCanvas();
      animate();
      timeoutId = window.setTimeout(cycleText, 4500);
    }, 500);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  // GSAP Bottom Elements Reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.0 }); 

      tl.from(
        ctaRef.current?.children || [],
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      tl.from(
        scrollRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="hero" 
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        background: 'var(--color-bg)',
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'auto', 
        }}
      />

      {/* Film grain */}
      <div className="hero-grain" style={{ zIndex: 2, opacity: 0.35, pointerEvents: 'none' }} />

      {/* CTAs at the bottom of the hero */}
      <div className="hero-content" style={{ zIndex: 4, position: 'relative', pointerEvents: 'none', paddingBottom: '10vh' }}>
        <div ref={ctaRef} className="hero-cta-group" style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'center' }}>
          <a href="#contact" className="btn-primary hoverable">
            Let's Talk
          </a>
          <a href="#projects" className="btn-outline hoverable">
            View Work
          </a>
          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hoverable"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="scroll-indicator" style={{ zIndex: 4, position: 'absolute', bottom: '2rem' }}>
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
