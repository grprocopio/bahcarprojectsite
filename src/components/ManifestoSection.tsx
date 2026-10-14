import React from 'react';
import { useScrollReveal } from '../hooks/useScrollPosition';

export const ManifestoSection: React.FC = () => {
  const [contentRef, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="relative w-full -mt-2 pt-2 py-24 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#050608] text-white flex items-center justify-center overflow-hidden select-none">
      {/* Luz ambiente suave de transição (usando radial-gradient puro sem blur filter para eliminar qualquer artefato de listra GPU na borda) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_650px_380px_at_50%_50%,rgba(184,255,0,0.04),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className={`relative z-10 w-full max-w-6xl mx-auto text-left scroll-reveal ${
          isVisible ? 'is-revealed' : ''
        }`}
      >
        <h2
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl italic font-black uppercase tracking-tight leading-[1.04] text-white"
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
