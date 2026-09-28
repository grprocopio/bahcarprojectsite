import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollPosition';
import { AnimatedCounter } from './AnimatedCounter';

export const ComissaoMotorista: React.FC = () => {
  // Reveal hooks para animação progressiva de fade-in no scroll
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [cockpitRef, cockpitVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [cardsRef, cardsVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

  // Começando a partir de R$ 10,00
  const [rideValue, setRideValue] = useState<number>(27.50);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const minVal = 10;
  const maxVal = 120;

  const bahcarRate = 0.16;
  const competitorRate = 0.35;

  const bahcarCommission = rideValue * bahcarRate;
  const bahcarNet = rideValue - bahcarCommission;

  const competitorCommission = rideValue * competitorRate;
  const competitorNet = rideValue - competitorCommission;

  const difference = bahcarNet - competitorNet;

  // Percentual para o preenchimento fluido da barra
  const fillPercent = Math.max(0, Math.min(100, ((rideValue - minVal) / (maxVal - minVal)) * 100));

  // Predefinições rápidas para conveniência
  const quickPicks = [10.00, 15.50, 27.50, 42.00, 65.00, 95.00];

  // Cálculo de valor a partir da posição X na tela com requestAnimationFrame
  const updateValueFromClientX = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = clampedX / rect.width;
    const rawVal = minVal + ratio * (maxVal - minVal);
    // Arredonda para centavos múltiplos de 10 centavos
    const rounded = Math.round(rawVal * 10) / 10;
    setRideValue(Math.max(minVal, Math.min(maxVal, rounded)));
  }, [minVal, maxVal]);

  // Pointer down inicia captura direta sem aguardar soltar o dedo
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    isDraggingRef.current = true;
    updateValueFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current && e.buttons !== 1) return;
    updateValueFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignorar caso já liberado
    }
  };

  // Fallback nativo caso use teclado ou acessibilidade
  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setRideValue(val);
  };

  return (
    <section
      id="comissao-clara"
      className="relative w-full py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-20 bg-[#050505] text-white border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* Subtle Hairline Grid & Cinematic Ambient */}
      <div className="absolute inset-0 hairline-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#B8FF00]/[0.025] blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col gap-10 lg:gap-12">
        
        {/* EDITORIAL STATEMENT - DIRETO E PROFISSIONAL */}
        <div
          ref={headerRef}
          className={`max-w-4xl flex flex-col scroll-reveal ${headerVisible ? 'is-revealed' : ''}`}
        >
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl italic font-black uppercase tracking-[0.02em] leading-[1.08] text-balance text-white"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span>TAXA FIXA DE 16%.</span>{' '}
            <br className="hidden sm:inline" />
            <span className="text-[#B8FF00] drop-shadow-[0_0_24px_rgba(184,255,0,0.35)]">O RESTANTE FICA NO SEU BOLSO.</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl">
            Aqui a regra é transparente e sem surpresas: a BahCar cobra apenas <strong className="text-[#B8FF00] font-bold">16% fixos</strong> por corrida. Sem tarifas ocultas, sem descontos misteriosos no fim da semana.
          </p>
        </div>

        {/* TAXA 16% + SLIDER TOUCH ULTRA-RESPONSIVO EM TEMPO REAL */}
        <div className="w-full pt-8 border-t border-white/[0.08]">
          
          {/* Header do Cockpit: Taxa 16% + Controle de Simulação */}
          <div
            ref={cockpitRef}
            className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 scroll-reveal scroll-reveal-delay-1 ${cockpitVisible ? 'is-revealed' : ''}`}
          >
            
            {/* Bloco compacto da Taxa 16% */}
            <div className="flex items-center gap-4 bg-[#0b0f0b] px-5 py-3 rounded-2xl border border-[#B8FF00]/30 shadow-lg self-start">
              <div className="flex items-baseline gap-0.5">
                <span
                  className="text-4xl sm:text-5xl font-black italic tracking-tighter text-[#B8FF00] tabular-nums leading-none"
                  style={{ fontFamily: "'Kanit', 'Saira', sans-serif" }}
                >
                  16
                </span>
                <span className="text-2xl font-black italic text-[#B8FF00] leading-none">%</span>
              </div>
              <div className="border-l border-white/10 pl-4 text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B8FF00] block">
                  TAXA FIXA BAHCAR
                </span>
                <span className="text-xs text-neutral-300 font-medium">
                  Retenção mínima e <strong>previsível</strong>
                </span>
              </div>
            </div>

            {/* Controle de Simulação Touch Real-Time (sem delay, muda na hora enquanto o dedo corre) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#0a0a0a] px-5 sm:px-6 py-4 rounded-2xl border border-white/10 shadow-xl w-full lg:w-auto">
              
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 shrink-0">
                  Valor bruto:
                </span>
                
                {/* Valor Grande e Nítido com centavos reais e efeito tacômetro digital */}
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#B8FF00] tracking-tight min-w-[130px] text-right">
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

                  {/* Input invisível para total acessibilidade e suporte de teclado */}
                  <input
                    type="range"
                    min={minVal}
                    max={maxVal}
                    step="0.10"
                    value={rideValue}
                    onChange={handleNativeChange}
                    className="sr-only"
                    aria-label="Simular valor da corrida com centavos"
                  />
                </div>

                <span className="text-[11px] font-mono text-neutral-500 tabular-nums shrink-0">R$ 120</span>
              </div>

              {/* Atalhos rápidos com centavos realistas de corridas */}
              <div className="hidden xl:flex items-center gap-1.5 pl-2 border-l border-white/10">
                {quickPicks.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRideValue(val)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                      Math.abs(rideValue - val) < 0.2
                        ? 'bg-[#B8FF00] text-black shadow-[0_0_10px_rgba(184,255,0,0.4)]'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    R${val.toFixed(val % 1 === 0 ? 0 : 2)}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Cards Lado a Lado: Visual Realista de Extrato de Corrida */}
          <div
            ref={cardsRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 scroll-reveal scroll-reveal-delay-2 ${cardsVisible ? 'is-revealed' : ''}`}
          >
            
            {/* Coluna BahCar - Destaque Neon Preto e Verde */}
            <div className="relative p-7 sm:p-9 rounded-2xl bg-[#060a06] border-2 border-[#B8FF00]/50 shadow-[0_10px_40px_rgba(184,255,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#B8FF00]/25 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B8FF00] block">
                      MODELO BAHCAR
                    </span>
                    <span className="text-xl font-bold text-white font-heading">
                      Você recebe líquido:
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#B8FF00]/15 border border-[#B8FF00]/40 text-[#B8FF00] text-xs font-mono font-bold">
                    16% retenção
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-300">Corrida de:</span>
                    <span className="text-sm font-mono text-neutral-400">
                      <AnimatedCounter value={rideValue} prefix="R$ " duration={180} />
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-300">Taxa BahCar (16%):</span>
                    <span className="text-sm font-mono text-red-400">
                      <AnimatedCounter value={bahcarCommission} prefix="- R$ " duration={180} />
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-base font-bold text-white uppercase tracking-wider">
                      Seu Ganho Líquido:
                    </span>
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#B8FF00] drop-shadow-[0_0_12px_rgba(184,255,0,0.2)]">
                      <AnimatedCounter value={bahcarNet} prefix="R$ " duration={200} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Concorrência - Tons Neutros Sóbrios */}
            <div className="p-7 sm:p-9 rounded-2xl bg-[#090909] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 block">
                      OUTRAS PLATAFORMAS
                    </span>
                    <span className="text-xl font-bold text-neutral-300 font-heading">
                      Média de mercado:
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono">
                    ~35% retenção
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-400">Corrida de:</span>
                    <span className="text-sm font-mono text-neutral-400">
                      <AnimatedCounter value={rideValue} prefix="R$ " duration={180} />
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-400">Retenção (~35%):</span>
                    <span className="text-sm font-mono text-red-500/80">
                      <AnimatedCounter value={competitorCommission} prefix="- R$ " duration={180} />
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-base font-bold text-neutral-400 uppercase tracking-wider">
                      Seu Ganho Líquido:
                    </span>
                    <span className="text-3xl sm:text-4xl font-black font-mono text-neutral-400">
                      <AnimatedCounter value={competitorNet} prefix="R$ " duration={200} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Diferença a favor do motorista:</span>
                <span className="font-bold text-[#B8FF00] text-sm">
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
