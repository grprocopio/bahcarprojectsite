import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollPosition';

interface ComissaoMotoristaProps {
  onOpenPartner?: () => void;
}

export const ComissaoMotorista: React.FC<ComissaoMotoristaProps> = () => {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const [cockpitRef, cockpitVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  const [rideValue, setRideValue] = useState<number>(35);

  const minVal = 10;
  const maxVal = 100;

  const bahcarNet = rideValue * 0.84;
  const competitorNet = rideValue * 0.65;

  const fillPercent = Math.max(0, Math.min(100, ((rideValue - minVal) / (maxVal - minVal)) * 100));

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <section
      id="comissao-clara"
      className="relative w-full py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 xl:px-20 bg-[#050608] text-white select-none"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* Cabeçalho Minimalista e Direto */}
        <div
          ref={headerRef}
          className={`max-w-3xl flex flex-col scroll-reveal ${headerVisible ? 'is-revealed' : ''}`}
        >
          <h2
            className="text-[clamp(2.2rem,6vw,4.5rem)] italic font-black uppercase tracking-tight leading-[0.98] text-white"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span>TAXA FIXA DE 16%. </span>
            <span className="text-[#B8FF00] drop-shadow-[0_0_30px_rgba(184,255,0,0.35)] block sm:inline">
              O RESTO É SEU.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
            Sem tarifas confusas ou descontos de até 40%. Você fica com 84% de cada viagem.
          </p>
        </div>

        {/* Card em Vidro Ultra-Clean */}
        <div
          ref={cockpitRef}
          className={`relative w-full rounded-3xl bg-[#0c0e14]/90 border border-white/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] p-6 sm:p-10 lg:p-12 scroll-reveal scroll-reveal-delay-1 ${
            cockpitVisible ? 'is-revealed' : ''
          }`}
        >
          {/* Seletor de Valor */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                Valor da corrida
              </span>
              <span
                className="text-4xl sm:text-5xl font-black font-mono text-white tabular-nums"
                style={{ fontFamily: "'Kanit', monospace" }}
              >
                R$ {rideValue},00
              </span>
            </div>

            <span className="text-xs sm:text-sm uppercase font-mono tracking-widest text-[#B8FF00] font-bold">
              Simulador de Ganhos
            </span>
          </div>

          {/* Slider Clean */}
          <div className="py-8">
            <div className="relative w-full h-3 rounded-full bg-white/10 flex items-center">
              <div
                className="absolute top-0 bottom-0 left-0 bg-[#B8FF00] rounded-full shadow-[0_0_16px_rgba(184,255,0,0.6)]"
                style={{ width: `${fillPercent}%` }}
              />
              <input
                type="range"
                min={minVal}
                max={maxVal}
                step={1}
                value={rideValue}
                onChange={(e) => setRideValue(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Simular valor da corrida"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#B8FF00] border-2 border-black shadow-[0_0_15px_rgba(184,255,0,0.8)] pointer-events-none transition-transform"
                style={{ left: `${fillPercent}%` }}
              />
            </div>
          </div>

          {/* Comparativo Direto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            
            {/* BahCar */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121c12] via-[#0b130e] to-[#080d0a] border border-[#B8FF00]/40 shadow-[0_12px_30px_-10px_rgba(184,255,0,0.15)] flex flex-col justify-between">
              <div>
                <span
                  className="text-lg font-black italic uppercase text-white tracking-wide block"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  BahCar (Taxa 16%)
                </span>
                <span className="text-xs font-mono text-neutral-400 mt-1 block">
                  Você recebe líquido:
                </span>
              </div>
              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-black italic text-[#B8FF00] drop-shadow-[0_0_20px_rgba(184,255,0,0.35)] tabular-nums mt-4"
                style={{ fontFamily: "'Kanit', monospace" }}
              >
                R$ {formatBRL(bahcarNet)}
              </div>
            </div>

            {/* Outros Apps */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0f121a] border border-white/10 flex flex-col justify-between">
              <div>
                <span
                  className="text-lg font-bold italic uppercase text-neutral-300 tracking-wide block"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  Outros Apps (~35%)
                </span>
                <span className="text-xs font-mono text-neutral-500 mt-1 block">
                  Você recebe líquido:
                </span>
              </div>
              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-black italic text-neutral-500 tabular-nums mt-4"
                style={{ fontFamily: "'Kanit', monospace" }}
              >
                R$ {formatBRL(competitorNet)}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ComissaoMotorista;
