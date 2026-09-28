import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutBahcar: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      // Fade in title & text
      gsap.from([titleRef.current, textRef.current], {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Stagger reveal of the 3 large words
      const wordElements = wordsRef.current?.querySelectorAll('.big-word');
      if (wordElements && wordElements.length > 0) {
        gsap.from(wordElements, {
          scrollTrigger: {
            trigger: wordsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 70,
          scale: 0.95,
          stagger: 0.22,
          duration: 1,
          ease: 'power4.out',
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-[#050505] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Subtle ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#B8FF00]/[0.025] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Title & Text */}
        <div className="max-w-3xl">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.12] text-balance text-white"
          >
            Mobilidade feita perto de quem vive a cidade.
          </h2>

          <p
            ref={textRef}
            className="mt-8 text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl"
          >
            A BahCar nasce em Santa Maria para aproximar tecnologia, motoristas e passageiros em uma experiência mais próxima, simples e humana.
          </p>
        </div>

        {/* 
          Three Giant Editorial Words:
          MOBILIDADE / PROXIMIDADE / CONEXÃO
          No cards, generous negative space, sleek typography
        */}
        <div
          ref={wordsRef}
          className="mt-20 sm:mt-28 lg:mt-36 flex flex-col gap-6 sm:gap-10 border-t border-white/10 pt-16 sm:pt-24"
        >
          {/* Word 1 */}
          <div className="big-word group flex items-baseline justify-between border-b border-white/5 pb-6 sm:pb-8 transition-colors duration-300 hover:border-[#B8FF00]/40">
            <span className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading font-extrabold tracking-tighter text-white group-hover:text-[#B8FF00] transition-colors duration-500">
              MOBILIDADE
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-mono">
              01
            </span>
          </div>

          {/* Word 2 */}
          <div className="big-word group flex items-baseline justify-between border-b border-white/5 pb-6 sm:pb-8 transition-colors duration-300 hover:border-[#B8FF00]/40">
            <span className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading font-extrabold tracking-tighter text-neutral-200 group-hover:text-[#B8FF00] transition-colors duration-500">
              PROXIMIDADE
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-mono">
              02
            </span>
          </div>

          {/* Word 3 */}
          <div className="big-word group flex items-baseline justify-between border-b border-white/5 pb-6 sm:pb-8 transition-colors duration-300 hover:border-[#B8FF00]/40">
            <span className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading font-extrabold tracking-tighter text-neutral-200 group-hover:text-[#B8FF00] transition-colors duration-500">
              CONEXÃO
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-neutral-500 font-mono">
              03
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
