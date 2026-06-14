import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealPreset = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "fadeIn";

interface ScrollRevealOptions {
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  start?: string;
  stagger?: number;
  children?: boolean; // animate children instead of the element itself
}

const presetConfigs: Record<RevealPreset, gsap.TweenVars> = {
  fadeUp: { y: 60, opacity: 0 },
  fadeLeft: { x: -80, opacity: 0 },
  fadeRight: { x: 80, opacity: 0 },
  scaleIn: { scale: 0.85, opacity: 0 },
  fadeIn: { opacity: 0 },
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    preset = "fadeUp",
    delay = 0,
    duration = 1,
    start = "top 85%",
    stagger = 0.1,
    children = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = children ? el.children : el;
    const fromVars = presetConfigs[preset];

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...fromVars,
        duration,
        delay,
        stagger: children ? stagger : 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [preset, delay, duration, start, stagger, children]);

  return ref;
}
