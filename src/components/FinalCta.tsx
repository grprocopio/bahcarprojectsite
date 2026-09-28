import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollPosition';

interface FinalCtaProps {
  onOpenLaunch: () => void;
  onOpenPartner: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenLaunch, onOpenPartner }) => {
  const [contentRef, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section
      id="final-cta"
      className="relative w-full py-28 sm:py-36 lg:py-48 bg-[#050505] text-white border-t border-white/[0.08] flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambience: Cinematic glow matching Hero video street vibe */}
      <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#B8FF00]/[0.035] blur-[180px] pointer-events-none" />

      {/* Main Campaign Closing Narrative */}
      <div
        ref={contentRef}
        className={`relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center scroll-reveal ${isVisible ? 'is-revealed' : ''}`}
      >
        
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic font-black uppercase tracking-[0.02em] leading-[1.05] text-balance text-white"
          style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
        >
          <span>SANTA MARIA VAI</span> <br />
          <span className="outline-text-hollow inline-block">
            SE MOVER DIFERENTE.
          </span>
        </h2>

        <p className="mt-6 sm:mt-8 text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
          Feito por quem conhece cada rua, cada esquina e o valor de quem dirige e anda aqui.
        </p>

        {/* Action Buttons: Impeccable Button Discipline */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onOpenLaunch}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm font-black font-heading uppercase tracking-[0.18em] text-black bg-[#B8FF00] hover:bg-[#c9ff2e] rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(184,255,0,0.25)] active:scale-95 group"
          >
            <span>QUERO CONHECER A BAHCAR</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOpenPartner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm font-bold font-heading uppercase tracking-[0.18em] text-white hover:text-white bg-[#0e0e0e] hover:bg-[#161616] border border-white/20 hover:border-[#B8FF00]/50 rounded-xl transition-all duration-200 active:scale-95"
          >
            <span>QUERO SER MOTORISTA</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default FinalCta;
