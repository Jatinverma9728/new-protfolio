import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      gsap.to(ring, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => {
      ring.classList.add("hovering");
    };

    const onMouseLeave = () => {
      ring.classList.remove("hovering");
    };

    window.addEventListener("mousemove", onMouseMove);

    // Track hoverable elements
    const observer = new MutationObserver(() => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], .hoverable'
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial scan
    const hoverables = document.querySelectorAll(
      'a, button, [role="button"], .hoverable'
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
