import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const hellos = [
  "Hello",        // English
  "Bonjour",      // French
  "Hola",         // Spanish
  "Ciao",         // Italian
  "こんにちは",     // Japanese
  "안녕하세요",    // Korean
  "नमस्ते",       // Hindi
  "Hallo",        // German
  "Olá",          // Portuguese
  "Привет",       // Russian
  "Welcome",      // Final
];

export default function CinematicLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create a sequence for the words
      const tl = gsap.timeline({
        onComplete: () => {
          // After the words finish, curtain wipe
          gsap.to(screenRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.9,
            ease: "power3.inOut",
            delay: 0.3, // slight pause on the final "Welcome"
            onComplete,
          });
        },
      });

      // Loop through words rapidly
      hellos.forEach((_, i) => {
        // Fast change for early words, longer for the final word
        const duration = i === hellos.length - 1 ? 0.8 : 0.16;
        
        tl.call(() => {
          setIndex(i);
        }, undefined, i * 0.16);
      });

    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={screenRef} className="loader-screen" style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--color-bg)', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div 
        ref={textRef} 
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 800,
          color: 'var(--color-text)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          letterSpacing: '-0.02em',
        }}
      >
        <div style={{
          width: '12px', height: '12px', 
          background: 'var(--color-accent)', 
          borderRadius: '50%'
        }} />
        {hellos[index]}
      </div>
    </div>
  );
}
