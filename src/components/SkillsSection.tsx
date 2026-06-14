import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "../data";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function SkillsSection() {
  const sectionRef = useScrollReveal<HTMLElement>({ preset: "fadeUp" });
  
  // For parallax effect on the bento boxes
  const { scrollYProgress } = useScroll({
    target: sectionRef as any,
    offset: ["start end", "end start"]
  });

  const getSkillsByCategory = (category: string) => {
    return skills.filter((s) => s.category === category);
  };

  const frontendSkills = getSkillsByCategory("Frontend");
  const backendSkills = getSkillsByCategory("Backend");
  const databaseSkills = getSkillsByCategory("Database");
  const devopsSkills = getSkillsByCategory("DevOps");

  return (
    <section ref={sectionRef} id="skills" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container-main relative z-10">
        <span className="section-label">// Expertise</span>
        <div className="section-divider" />
        <h2 className="section-heading mb-12">Technical Arsenal</h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Frontend Bento Box (Span 7) */}
          <motion.div 
            className="lg:col-span-7 bento-box"
            style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)]">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L12 19m-4.5-4.5L3 12l4.5-4.5M14.25 17l4.5-4.5-4.5-4.5M12 5l-2.25 2.25"></path></svg>
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">Frontend</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {frontendSkills.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300 group-hover:border-[var(--color-accent)]/40" style={{ boxShadow: `0 0 20px ${skill.color}10` }}>
                    <img src={skill.image} alt={skill.name} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-200">{skill.name}</span>
                      <span className="text-sm text-gray-500 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}80` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backend Bento Box (Span 5) */}
          <motion.div 
            className="lg:col-span-5 bento-box"
            style={{ y: useTransform(scrollYProgress, [0, 1], [80, -20]) }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)]">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">Backend</h3>
            </div>
            
            <div className="flex flex-col gap-5">
              {backendSkills.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 group-hover:bg-white/10 transition-colors">
                    <img src={skill.image} alt={skill.name} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-semibold text-gray-200">{skill.name}</span>
                      <span className="text-sm text-[var(--color-accent)]">{skill.experience}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-white/40"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Database Bento Box (Span 4) */}
          <motion.div 
            className="lg:col-span-4 bento-box"
            style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
          >
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-bold font-heading text-white">Databases</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {databaseSkills.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors gap-3">
                  <img src={skill.image} alt={skill.name} className="w-10 h-10 object-contain" loading="lazy" />
                  <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* DevOps Bento Box (Span 8) */}
          <motion.div 
            className="lg:col-span-8 bento-box overflow-hidden relative group"
            style={{ y: useTransform(scrollYProgress, [0, 1], [60, -40]) }}
          >
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <h3 className="text-xl font-bold font-heading text-white">Cloud & DevOps</h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>

            {/* Scrolling Marquee for DevOps tools */}
            <div className="relative w-full overflow-hidden flex items-center py-4">
              <div className="flex whitespace-nowrap gap-8 animate-marquee group-hover:[animation-play-state:paused]">
                {/* Double the array for seamless infinite scroll */}
                {[...devopsSkills, ...devopsSkills, ...devopsSkills].map((skill, i) => (
                  <div key={`${skill.name}-${i}`} className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shrink-0 hover:bg-[var(--color-accent-dim)] hover:border-[var(--color-accent)]/50 transition-all cursor-default">
                    <img src={skill.image} alt={skill.name} className="w-6 h-6 object-contain" loading="lazy" />
                    <span className="font-semibold text-gray-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[var(--color-accent)] opacity-5 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>

        </div>
      </div>

      {/* Tailwind specific custom styles injected safely */}
      <style>{`
        .bento-box {
          background: rgba(18, 18, 26, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 2.5rem;
          transition: border-color 0.3s ease;
        }
        .bento-box:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Translates exactly 1 width of the original array */
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
