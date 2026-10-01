import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollPosition';
import { AnimatedCounter } from './AnimatedCounter';

export const ComissaoMotorista: React.FC = () => {
  // Reveal hooks para animação progressiva de fade-in no scroll (aparecimento ágil)
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.01, rootMargin: '0px 0px 200px 0px' });
  const [cockpitRef, cockpitVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.01, rootMargin: '0px 0px 180px 0px' });
  const [cardsRef, cardsVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.01, rootMargin: '0px 0px 150px 0px' });

  // Começando a partir de R$ 10,00
  const [rideValue, setRideValue] = useState<number>(27.50);
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

  const difference = bahcarNet - competitorNet;

  // Percentual para o preenchimento fluido da barra
  const fillPercent = Math.max(0, Math.min(100, ((rideValue - minVal) / (maxVal - minVal)) * 100));

  // Centavos alternados realistas para simulação de corridas reais (0.40, 0.50, 0.30)
  const centsPattern = [0.00, 0.40, 0.50, 0.30, 0.80, 0.20, 0.50, 0.70, 0.40, 0.90];

  // Cálculo de valor suave a partir da posição X com centavos realistas
  const updateValueFromClientX = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = clampedX / rect.width;
    const rawVal = minVal + ratio * (maxVal - minVal);
    
    const integerPart = Math.floor(rawVal);
    const fractionPart = rawVal - integerPart;
    // Seleciona o centavo da tabela alternada com base na proximidade
    const idx = Math.min(centsPattern.length - 1, Math.floor(fractionPart * centsPattern.length));
    const cents = centsPattern[idx];
    const finalVal = Math.min(maxVal, Math.max(minVal, Number((integerPart + cents).toFixed(2))));
    
    setRideValue(finalVal);
  }, [minVal, maxVal]);

  // Pointer down inicia captura direta sem aguardar soltar o dedo
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignorar caso não suportado
    }
    updateValueFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateValueFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignorar caso já liberado
    }
  };

  // Fallback nativo caso use teclado ou acessibilidade
  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = parseFloat(e.target.value);
    if (!isNaN(rawVal)) {
      const integerPart = Math.floor(rawVal);
      const fractionPart = rawVal - integerPart;
      const idx = Math.min(centsPattern.length - 1, Math.floor(fractionPart * centsPattern.length));
      const cents = centsPattern[idx];
      const finalVal = Math.min(maxVal, Math.max(minVal, Number((integerPart + cents).toFixed(2))));
      setRideValue(finalVal);
    }
  };

  return (
    <section
      id="comissao-clara"
      className="relative w-full pt-8 sm:pt-14 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-16 xl:px-20 bg-transparent text-white overflow-hidden select-none"
    >
      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col gap-10 lg:gap-12">
        
        {/* EDITORIAL STATEMENT - DIRETO E PROFISSIONAL */}
        <div
          ref={headerRef}
          className={`max-w-5xl flex flex-col scroll-reveal ${headerVisible ? 'is-revealed' : ''}`}
        >
          <h2
            className="text-[clamp(1.75rem,5.5vw,4.5rem)] italic font-black uppercase tracking-tight sm:tracking-[0.02em] leading-tight text-white whitespace-normal"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span className="inline-block">TAXA FIXA DE 16%.</span>{' '}
            <span className="text-[#B8FF00] inline-block">O RESTANTE FICA NO SEU BOLSO.</span>
          </h2>
        </div>

        {/* CÁLCULOS & SIMULAÇÃO EM TEMPO REAL */}
        <div className="w-full pt-4">
          
          {/* Header do Cockpit: Controle de Simulação */}
          <div
            ref={cockpitRef}
            className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 scroll-reveal scroll-reveal-delay-1 ${cockpitVisible ? 'is-revealed' : ''}`}
          >
            {/* Título de chamada para a simulação */}
            <div className="flex items-center">
              <h3
                className="text-[clamp(1.15rem,3.2vw,1.75rem)] italic font-black uppercase tracking-[0.03em] sm:tracking-[0.05em] text-white leading-tight"
                style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
              >
                Simulação de Ganho Líquido por Corrida
              </h3>
            </div>

            {/* Controle de Simulação Touch Real-Time (integrado sem caixas pesadas) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 py-2 w-full lg:w-auto">
              
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 shrink-0 leading-tight">
                  Valor bruto:
                </span>
                
                {/* Valor Grande e Nítido com centavos reais */}
                <span className="text-[clamp(1.5rem,4vw,2.25rem)] font-black font-mono text-[#B8FF00] tracking-tight min-w-[120px] text-right leading-tight">
                  <AnimatedCounter value={rideValue} prefix="R$ " duration={180} />
                </span>
              </div>

              {/* Slider Tátil com Resposta Contínua Instantânea a cada pixel */}
              <div className="flex items-center gap-3 w-full sm:w-64 md:w-80 select-none">
                <span className="text-[11px] font-mono text-neutral-500 tabular-nums shrink-0">R$ 10</span>
                
                <div
                  ref={trackRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="relative w-full h-11 flex items-center cursor-pointer touch-none"
                  style={{ touchAction: 'none' }}
                >
                  {/* Trilho de Fundo */}
                  <div className="w-full h-2.5 rounded-full bg-white/10 relative overflow-hidden pointer-events-none">
                    {/* Barra Preenchida Verde Neon */}
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-[#B8FF00] rounded-full"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>

                  {/* Thumb / Botão Deslizante com Brilho Neon e Efeito Tátil */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#B8FF00] border-2 border-black shadow-[0_0_16px_rgba(184,255,0,0.8),0_2px_8px_rgba(0,0,0,0.9)] flex items-center justify-center pointer-events-none active:scale-110"
                    style={{ left: `${fillPercent}%` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-black/40" />
                  </div>

                  {/* Input de range nativo transparente sobreposto para suporte tátil perfeito em mobile/tablet */}
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

                <span className="text-[11px] font-mono text-neutral-500 tabular-nums shrink-0">R$ 100</span>
              </div>

            </div>
          </div>

          {/* Cards Lado a Lado: Visual Realista de Extrato de Corrida */}
          <div
            ref={cardsRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 scroll-reveal scroll-reveal-delay-2 ${cardsVisible ? 'is-revealed' : ''}`}
          >
            
            {/* Coluna BahCar - Limpo, Editorial e Aberto */}
            <div className="relative py-6 sm:py-8 border-b md:border-b-0 md:border-r border-white/10 md:pr-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#B8FF00]/20 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B8FF00] block leading-tight">
                      MODELO BAHCAR
                    </span>
                    <span className="text-[clamp(1.125rem,2.8vw,1.25rem)] font-bold text-white font-heading leading-tight">
                      Você recebe líquido:
                    </span>
                  </div>
                  <span className="text-[#B8FF00] text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap leading-tight">
                    16% retenção fixa
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-neutral-300 leading-tight">Corrida de:</span>
                    <span className="text-sm font-mono text-neutral-400 tabular-nums leading-tight">
                      <AnimatedCounter value={rideValue} prefix="R$ " duration={180} />
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-neutral-300 leading-tight">Taxa BahCar (16%):</span>
                    <span className="text-sm font-mono text-neutral-400 tabular-nums leading-tight">
                      <AnimatedCounter value={bahcarCommission} prefix="- R$ " duration={180} />
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider leading-tight">
                      Seu Ganho Líquido:
                    </span>
                    <span className="text-[clamp(1.5rem,4.5vw,2.25rem)] font-black font-mono text-[#B8FF00] tabular-nums leading-tight">
                      <AnimatedCounter value={bahcarNet} prefix="R$ " duration={200} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Concorrência - Tons Neutros Sóbrios */}
            <div className="py-6 sm:py-8 md:pl-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 block leading-tight">
                      OUTRAS PLATAFORMAS
                    </span>
                    <span className="text-[clamp(1.125rem,2.8vw,1.25rem)] font-bold text-neutral-300 font-heading leading-tight">
                      Média de mercado:
                    </span>
                  </div>
                  <span className="text-neutral-400 text-xs font-mono tracking-wider uppercase whitespace-nowrap leading-tight">
                    ~35% retenção
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-neutral-400 leading-tight">Corrida de:</span>
                    <span className="text-sm font-mono text-neutral-400 tabular-nums leading-tight">
                      <AnimatedCounter value={rideValue} prefix="R$ " duration={180} />
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-neutral-400 leading-tight">Retenção (~35%):</span>
                    <span className="text-sm font-mono text-red-500/80 tabular-nums leading-tight">
                      <AnimatedCounter value={competitorCommission} prefix="- R$ " duration={180} />
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm sm:text-base font-bold text-neutral-400 uppercase tracking-wider leading-tight">
                      Seu Ganho Líquido:
                    </span>
                    <span className="text-[clamp(1.5rem,4.5vw,2.25rem)] font-black font-mono text-neutral-400 tabular-nums leading-tight">
                      <AnimatedCounter value={competitorNet} prefix="R$ " duration={200} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400 font-mono leading-tight">
                <span className="leading-tight">Diferença a favor do motorista:</span>
                <span className="font-bold text-[#B8FF00] text-sm tabular-nums whitespace-nowrap leading-tight">
                  + <AnimatedCounter value={difference} prefix="R$ " duration={200} /> / corrida
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ComissaoMotorista;
