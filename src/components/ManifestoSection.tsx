import React, { useEffect, useRef, useState } from 'react';

export const ManifestoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-24 px-5 sm:px-10 lg:px-16 xl:px-20 bg-[#050608] text-white flex items-center justify-center select-none touch-pan-y scroll-mt-12"
    >

      <div
        className={`relative z-10 w-full max-w-6xl mx-auto text-left transition-all duration-700 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic font-black uppercase tracking-tight leading-[1.08] sm:leading-[1.04] text-white"
          style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
        >
          <span>A plataforma gaúcha de mobilidade urbana que conecta motoristas e passageiros com </span>
          <span className="text-[#B8FF00] drop-shadow-[0_0_28px_rgba(184,255,0,0.4)]">
            transparência
          </span>
          <span>, </span>
          <span className="text-white">
            tecnologia
          </span>
          <span> e </span>
          <span className="text-stroke-lime inline-block">
            respeito à nossa cidade.
          </span>
        </h2>
      </div>
    </section>
  );
};

export default ManifestoSection;
