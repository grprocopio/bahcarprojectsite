import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onOpenLaunch: () => void;
  onOpenPartner: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenLaunch, onOpenPartner }) => {
  return (
    <section id="final-cta" className="relative w-full py-32 sm:py-44 lg:py-52 bg-[#050505] text-white overflow-hidden border-t border-white/10 flex items-center justify-center">
      {/* 
        Large BahCar Wordmark Silhouette in Background (Low Opacity, Clipped)
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.035]">
        <span className="font-heading font-black text-[22vw] tracking-tighter text-white whitespace-nowrap transform translate-y-12">
          BAHCAR
        </span>
      </div>

      {/* 
        Animated Green GPS Route Line
        Inspired by a satellite / GPS navigation trace with glowing stroke & waypoint
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8FF00" stopOpacity="0" />
              <stop offset="30%" stopColor="#B8FF00" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#B8FF00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#B8FF00" stopOpacity="0.1" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background trace path */}
          <path
            d="M -100 450 C 300 480, 500 220, 750 320 C 1000 420, 1200 180, 1600 240"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="3"
            fill="none"
          />

          {/* Animated flowing GPS path */}
          <path
            d="M -100 450 C 300 480, 500 220, 750 320 C 1000 420, 1200 180, 1600 240"
            stroke="url(#routeGradient)"
            strokeWidth="2.5"
            strokeDasharray="16 12"
            fill="none"
            filter="url(#neonGlow)"
            className="animate-route-flow"
          />

          {/* GPS Waypoint Node with Radar Ping */}
          <g transform="translate(750, 320)">
            <circle r="14" fill="#B8FF00" fillOpacity="0.15" className="animate-radar-ping" />
            <circle r="6" fill="#B8FF00" />
            <circle r="2.5" fill="#050505" />
          </g>
        </svg>
      </div>

      {/* Main Campaign Closing Narrative */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08] text-balance">
          Santa Maria vai se mover diferente.
        </h2>

        <p className="mt-6 sm:mt-8 text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-xl mx-auto">
          Vem construir esse caminho com a BahCar.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenLaunch}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold font-heading uppercase tracking-wider text-black bg-[#B8FF00] hover:bg-[#c9ff2e] rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(184,255,0,0.35)] hover:shadow-[0_0_40px_rgba(184,255,0,0.55)] active:scale-95 group"
          >
            <span>Quero conhecer a BahCar</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOpenPartner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold font-heading uppercase tracking-wider text-white hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 rounded-xl backdrop-blur-sm transition-all duration-200 active:scale-95"
          >
            <span>Quero ser motorista parceiro</span>
          </button>
        </div>
      </div>
    </section>
  );
};
