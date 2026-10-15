import React from 'react';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 xl:px-20 bg-[#050608] text-white flex items-center justify-center select-none touch-pan-y">
      {/* Luz ambiente suave de transição (radial-gradient puro sem blur filter para eliminar qualquer artefato de listra GPU na borda) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_650px_380px_at_50%_50%,rgba(184,255,0,0.04),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-left">
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
