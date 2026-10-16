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
      className="relative w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-20 bg-[#050608] text-white select-none"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-14">
        
        {/* CABEÇALHO DIRETO E LIMPO */}
        <div
          ref={headerRef}
          className={`max-w-3xl flex flex-col scroll-reveal ${headerVisible ? 'is-revealed' : ''}`}
        >
          <h2
            className="text-[clamp(1.9rem,5.5vw,4.5rem)] italic font-black uppercase tracking-tight leading-[0.98] text-white"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span>TAXA FIXA DE 16%. </span>
            <span className="text-[#B8FF00] drop-shadow-[0_0_30px_rgba(184,255,0,0.35)] block sm:inline">
              O RESTO É SEU.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
            Sem descontos surpresa ou tarifas confusas de até 40%. Você sabe exatamente quanto ganha em cada corrida.
          </p>
        </div>

        {/* CONTAINER DO SIMULADOR EM DESIGN GLASSMORPHISM (100% protegido contra tela branca) */}
        <div
          ref={cockpitRef}
          className="relative w-full rounded-2xl sm:rounded-3xl bg-[#0c0e14] border border-white/12 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-12 overflow-hidden"
          style={{
            backgroundColor: '#0c0e14',
            backgroundImage: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(255, 255, 255, 0.04), transparent 70%)',
          }}
        >
          {/* Brilho interno do vidro através de degradês radiais puros (sem filter: blur para garantir 0 bugs de GPU) */}
          <div 
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_70%)] pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Barra Superior do Ajuste de Valor */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-400 block mb-1">
                Simulador de Rendimento
              </span>
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase text-white"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                Ajuste o Valor da Corrida
              </h3>
            </div>

            {/* Display do Valor no Vidro Fosco */}
            <div className="self-start sm:self-auto flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-[#10131c]/85 backdrop-blur-md border border-white/15">
              <span className="font-mono text-[11px] sm:text-xs text-neutral-400 uppercase tracking-wider">
                Valor:
              </span>
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-black font-mono text-[#B8FF00] drop-shadow-[0_0_12px_rgba(184,255,0,0.35)] tabular-nums"
                style={{ fontFamily: "'Kanit', monospace" }}
              >
                R$ {rideValue},00
              </span>
            </div>
          </div>

          {/* Slider Interativo */}
          <div className="relative z-10 py-5 sm:py-7 flex flex-col gap-3">
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

          {/* CARDS COMPARATIVOS EM GLASSMORPHISM ESCURO */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
            
            {/* Card BahCar Glassmorphism Destaque */}
            <div 
              className="p-5 sm:p-7 lg:p-8 rounded-2xl bg-gradient-to-br from-[#121c12] via-[#0b130e] to-[#080d0a] border border-[#B8FF00]/40 shadow-[0_16px_40px_-10px_rgba(184,255,0,0.18)] flex flex-col justify-between"
              style={{ backgroundColor: '#0b130e' }}
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-[#B8FF00]/20 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF00] shadow-[0_0_8px_rgba(184,255,0,0.9)]" />
                    <span
                      className="text-base sm:text-lg font-black italic uppercase text-white tracking-wide"
                      style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                      BahCar
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#B8FF00] uppercase tracking-wider">
                    Taxa 16% Fixa
                  </span>
                </div>

                <div className="py-1 sm:py-2">
                  <span className="text-[11px] sm:text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Você recebe líquido por viagem:
                  </span>
                  <div
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic text-[#B8FF00] drop-shadow-[0_0_20px_rgba(184,255,0,0.35)] tabular-nums"
                    style={{ fontFamily: "'Kanit', monospace" }}
                  >
                    R$ {formatBRL(bahcarNet)}
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] sm:text-xs text-neutral-300">
                <span>Taxa da plataforma (16%):</span>
                <span className="text-white font-bold tabular-nums">R$ {formatBRL(bahcarCommission)}</span>
              </div>
            </div>

            {/* Card Mercado Tradicional em Vidro Sutil Escuro */}
            <div 
              className="p-5 sm:p-7 lg:p-8 rounded-2xl bg-[#0f121a] border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between opacity-90 hover:opacity-100 transition-opacity"
              style={{ backgroundColor: '#0f121a' }}
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-white/10 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                    <span
                      className="text-base sm:text-lg font-bold italic uppercase text-neutral-300 tracking-wide"
                      style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                      Outros Apps
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
                    Até 35% retenção
                  </span>
                </div>

                <div className="py-1 sm:py-2">
                  <span className="text-[11px] sm:text-xs uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                    Você receberia apenas:
                  </span>
                  <div
                    className="text-3xl sm:text-4xl md:text-5xl font-black italic text-neutral-400 tabular-nums"
                    style={{ fontFamily: "'Kanit', monospace" }}
                  >
                    R$ {formatBRL(competitorNet)}
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] sm:text-xs text-neutral-400">
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
