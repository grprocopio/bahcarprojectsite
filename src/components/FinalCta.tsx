import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollPosition';

interface FinalCtaProps {
  onOpenLaunch: () => void;
  onOpenPartner: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenLaunch, onOpenPartner }) => {
  const [contentRef, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.04 });

  return (
    <section
      id="final-cta"
      className="relative w-full py-24 sm:py-32 lg:py-40 bg-[#050608] text-white flex items-center justify-center overflow-hidden"
    >
      {/* Luz ambiente de fundo sutil sem blur filter */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_600px_350px_at_50%_50%,rgba(184,255,0,0.03),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className={`relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center scroll-reveal ${
          isVisible ? 'is-revealed' : ''
        }`}
      >
        {/* Título Principal */}
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic font-black uppercase tracking-[0.02em] leading-[0.98] text-balance text-white"
          style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
        >
          <span>SANTA MARIA VAI</span> <br />
          <span className="text-[#B8FF00] drop-shadow-[0_0_35px_rgba(184,255,0,0.4)] inline-block mt-2">
            SE MOVER DIFERENTE.
          </span>
        </h2>

        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mx-auto">
          Um ecossistema local feito para valorizar de verdade quem dirige e oferecer aos passageiros a resposta mais rápida e segura de Santa Maria.
        </p>

        {/* Botões de Ação Clean: Motorista e Passageiro */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenPartner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 text-sm sm:text-base font-black italic uppercase tracking-wider text-black bg-[#B8FF00] hover:bg-[#caff33] rounded-2xl transition-all duration-200 shadow-[0_0_25px_rgba(184,255,0,0.35)] hover:shadow-[0_0_35px_rgba(184,255,0,0.55)] hover:scale-105 active:scale-95 group cursor-pointer"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            <span>QUERO SER MOTORISTA</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOpenLaunch}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 text-sm sm:text-base font-bold italic uppercase tracking-wider text-white hover:text-[#B8FF00] bg-[#0d0f17]/85 backdrop-blur-md border border-white/15 hover:border-[#B8FF00]/50 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            <span>QUERO SER PASSAGEIRO</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default FinalCta;
