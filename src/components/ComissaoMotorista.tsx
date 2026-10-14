import React, { useState, useRef, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollPosition';

interface ComissaoMotoristaProps {
  onOpenPartner?: () => void;
}

export const ComissaoMotorista: React.FC<ComissaoMotoristaProps> = () => {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const [cockpitRef, cockpitVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  const [rideValue, setRideValue] = useState<number>(35);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const minVal = 10;
  const maxVal = 100;

  const bahcarRate = 0.16;
  const competitorRate = 0.35;

  const bahcarCommission = rideValue * bahcarRate;
  const bahcarNet = rideValue - bahcarCommission;

  const competitorCommission = rideValue * competitorRate;
  const competitorNet = rideValue - competitorCommission;

  const fillPercent = Math.max(0, Math.min(100, ((rideValue - minVal) / (maxVal - minVal)) * 100));

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const updateValueFromClientX = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = clampedX / rect.width;
    const rawVal = minVal + ratio * (maxVal - minVal);
    setRideValue(Math.round(rawVal));
  }, [minVal, maxVal]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updateValueFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateValueFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
  };

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = parseFloat(e.target.value);
    if (!isNaN(rawVal)) {
      setRideValue(Math.round(rawVal));
    }
  };

  return (
    <section
      id="comissao-clara"
      className="relative w-full -mt-1 py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 xl:px-20 bg-[#050608] text-white overflow-hidden select-none"
    >
      {/* Luz ambiente suave de fundo (radial-gradient puro sem blur filter para evitar artefatos de listra GPU) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_700px_450px_at_50%_50%,rgba(184,255,0,0.035),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-10 lg:gap-14">
        
        {/* CABEÇALHO DIRETO E LIMPO (sem a tag 'TRANSPARÊNCIA COM QUEM DIRIGE') */}
        <div
          ref={headerRef}
          className={`max-w-3xl flex flex-col scroll-reveal ${headerVisible ? 'is-revealed' : ''}`}
        >
          <h2
            className="text-[clamp(2.2rem,5vw,4.5rem)] italic font-black uppercase tracking-tight leading-[0.98] text-white"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span>TAXA FIXA DE 16%. </span>
            <span className="text-[#B8FF00] drop-shadow-[0_0_30px_rgba(184,255,0,0.35)]">
              O RESTO É SEU.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            Sem descontos surpresa ou tarifas confusas de até 40%. Você sabe exatamente quanto ganha em cada corrida.
          </p>
        </div>

        {/* CONTAINER DO SIMULADOR EM DESIGN GLASSMORPHISM */}
        <div
          ref={cockpitRef}
          className={`relative w-full rounded-3xl glass-panel p-6 sm:p-10 lg:p-12 overflow-hidden scroll-reveal scroll-reveal-delay-1 ${
            cockpitVisible ? 'is-revealed' : ''
          }`}
        >
          {/* Brilho interno do vidro */}
          <div 
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#B8FF00]/[0.06] blur-2xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/[0.02] blur-2xl pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Barra Superior do Ajuste de Valor */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 block mb-1">
                Simulador de Rendimento
              </span>
              <h3
                className="text-2xl sm:text-3xl font-black italic uppercase text-white"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                Ajuste o Valor da Corrida
              </h3>
            </div>

            {/* Display do Valor no Vidro Fosco */}
            <div className="self-start sm:self-auto flex items-center gap-3 px-6 py-3 rounded-2xl glass-card-subtle border-white/15">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                Valor:
              </span>
              <span
                className="text-3xl sm:text-4xl font-black font-mono text-[#B8FF00] drop-shadow-[0_0_12px_rgba(184,255,0,0.35)] tabular-nums"
                style={{ fontFamily: "'Kanit', monospace" }}
              >
                R$ {rideValue},00
              </span>
            </div>
          </div>

          {/* Slider Interativo */}
          <div className="relative z-10 py-6 sm:py-8 flex flex-col gap-3">
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full h-12 flex items-center cursor-pointer touch-none"
              style={{ touchAction: 'none' }}
            >
              {/* Trilho */}
              <div className="w-full h-3 rounded-full bg-white/10 relative overflow-hidden pointer-events-none backdrop-blur-md">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#B8FF00]/70 to-[#B8FF00] rounded-full shadow-[0_0_16px_rgba(184,255,0,0.7)]"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>

              {/* Botão de Arraste (Thumb) */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#B8FF00] border-2 border-black shadow-[0_0_20px_rgba(184,255,0,0.8),0_4px_12px_rgba(0,0,0,0.8)] flex items-center justify-center pointer-events-none active:scale-110 transition-transform"
                style={{ left: `${fillPercent}%` }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-black" />
              </div>

              <input
                type="range"
                min={minVal}
                max={maxVal}
                step="1"
                value={rideValue}
                onChange={handleNativeChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 touch-none"
                aria-label="Simular valor da corrida"
              />
            </div>
          </div>

          {/* CARDS COMPARATIVOS EM GLASSMORPHISM */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2">
            
            {/* Card BahCar Glassmorphism Destaque */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card-accent flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#B8FF00]/20 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF00] shadow-[0_0_8px_rgba(184,255,0,0.9)]" />
                    <span
                      className="text-lg font-black italic uppercase text-white tracking-wide"
                      style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                      BahCar
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#B8FF00] uppercase tracking-wider">
                    Taxa 16% Fixa
                  </span>
                </div>

                <div className="py-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Você recebe líquido por viagem:
                  </span>
                  <div
                    className="text-4xl sm:text-5xl lg:text-6xl font-black italic text-[#B8FF00] drop-shadow-[0_0_20px_rgba(184,255,0,0.35)] tabular-nums"
                    style={{ fontFamily: "'Kanit', monospace" }}
                  >
                    R$ {formatBRL(bahcarNet)}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-300">
                <span>Taxa da plataforma (16%):</span>
                <span className="text-white font-bold tabular-nums">R$ {formatBRL(bahcarCommission)}</span>
              </div>
            </div>

            {/* Card Mercado Tradicional em Vidro Sutil */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card-subtle flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                    <span
                      className="text-lg font-bold italic uppercase text-neutral-300 tracking-wide"
                      style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                      Outros Apps
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
                    Até 35% retenção
                  </span>
                </div>

                <div className="py-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                    Você receberia apenas:
                  </span>
                  <div
                    className="text-4xl sm:text-5xl font-black italic text-neutral-400 tabular-nums"
                    style={{ fontFamily: "'Kanit', monospace" }}
                  >
                    R$ {formatBRL(competitorNet)}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-400">
                <span>Desconto de terceiros (~35%):</span>
                <span className="text-neutral-300 font-semibold tabular-nums">R$ {formatBRL(competitorCommission)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ComissaoMotorista;
