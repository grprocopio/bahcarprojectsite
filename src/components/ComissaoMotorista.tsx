import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const ComissaoMotorista: React.FC = () => {
  const [rideValue, setRideValue] = useState<number>(27.50);

  const bahcarRate = 0.16;
  const competitorRate = 0.35;

  const bahcarCommission = rideValue * bahcarRate;
  const bahcarNet = rideValue - bahcarCommission;

  const competitorCommission = rideValue * competitorRate;
  const competitorNet = rideValue - competitorCommission;

  const difference = bahcarNet - competitorNet;

  return (
    <section
      id="comissao-clara"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-16 xl:px-20 bg-[#050505] text-white border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* Subtle Hairline Grid & Cinematic Ambient */}
      <div className="absolute inset-0 hairline-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#B8FF00]/[0.025] blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col gap-16 lg:gap-24">
        
        {/* 1. HERO-ALIGNED EDITORIAL STATEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] shadow-[0_0_8px_#B8FF00]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#B8FF00] uppercase">
                POLÍTICA DE TRANSPARÊNCIA · SANTA MARIA
              </span>
            </div>

            <h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl italic font-black uppercase tracking-[0.02em] leading-[1.08] text-balance text-white"
              style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
            >
              <span>COMISSÃO CLARA.</span>{' '}
              <br className="hidden sm:inline" />
              <span className="text-white/40">SEM SURPRESAS.</span>{' '}
              <span className="outline-text-hollow inline-block ml-1">
                16% FIXO.
              </span>
            </h2>

            <p className="mt-6 sm:mt-8 text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
              Aplicativos multinacionais retêm até 40% da sua corrida sem aviso prévio. Na BahCar, o acordo é direto e inalterável: <strong className="text-white font-semibold">84% do valor total vai limpo para o motorista parceiro</strong>.
            </p>
          </div>

          {/* Large Stat Box - Mechanical / Instrument Cluster Vibe */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="p-7 sm:p-9 rounded-2xl bg-[#0b0f0b] border border-[#B8FF00]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8FF00]/[0.06] rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#B8FF00]">
                <span>TAXA FIXA BAHCAR</span>
                <span className="text-white/60">SM / RS</span>
              </div>

              <div className="flex items-baseline gap-1 my-4">
                <span
                  className="text-7xl sm:text-8xl font-black italic tracking-tighter text-[#B8FF00] tabular-nums leading-none"
                  style={{ fontFamily: "'Kanit', 'Saira', sans-serif" }}
                >
                  16
                </span>
                <span className="text-4xl sm:text-5xl font-black italic text-[#B8FF00] leading-none">%</span>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-300">
                <span>Motorista fica com:</span>
                <span className="font-mono font-bold text-white text-sm">84%</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. COMPARATIVO REAL / SIMULADOR DINÂMICO ESTILO COCKPIT */}
        <div className="w-full pt-12 border-t border-white/[0.08]">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B8FF00] block mb-1">
                COMPROVAÇÃO MATEMÁTICA
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
                Simule qualquer corrida em Santa Maria
              </h3>
            </div>

            {/* Slider de Precisão Cockpit */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-[#0a0a0a] px-6 py-4 rounded-2xl border border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Valor bruto:
              </span>
              <input
                type="range"
                min="15"
                max="120"
                step="0.5"
                value={rideValue}
                onChange={(e) => setRideValue(parseFloat(e.target.value))}
                className="w-36 sm:w-56 accent-[#B8FF00] cursor-pointer"
                aria-label="Simular valor da corrida"
              />
              <span className="text-xl font-black font-mono text-[#B8FF00] tabular-nums tracking-tight">
                R$ {rideValue.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Cards Lado a Lado: Visual Realista de Extrato de Corrida */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Coluna BahCar - Destaque Neon Preto e Verde */}
            <div className="relative p-8 sm:p-10 rounded-2xl bg-[#060a06] border-2 border-[#B8FF00]/50 shadow-[0_10px_40px_rgba(184,255,0,0.06)] flex flex-col justify-between">
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
                    <span className="text-sm font-mono text-neutral-400 tabular-nums">
                      R$ {rideValue.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-300">Taxa BahCar (16%):</span>
                    <span className="text-sm font-mono text-red-400 tabular-nums">
                      - R$ {bahcarCommission.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-base font-bold text-white uppercase tracking-wider">
                      Seu Ganho Líquido:
                    </span>
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#B8FF00] tabular-nums">
                      R$ {bahcarNet.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#B8FF00]/20 flex items-center justify-between text-xs text-[#B8FF00]/90 font-mono">
                <span>Depósito semanal sem burocracia</span>
                <ArrowUpRight className="w-4 h-4 text-[#B8FF00]" />
              </div>
            </div>

            {/* Coluna Concorrência - Tons Neutros Sóbrios */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#090909] border border-white/10 flex flex-col justify-between">
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
                    <span className="text-sm font-mono text-neutral-400 tabular-nums">
                      R$ {rideValue.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-400">Retenção (~35%):</span>
                    <span className="text-sm font-mono text-red-500/80 tabular-nums">
                      - R$ {competitorCommission.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-base font-bold text-neutral-400 uppercase tracking-wider">
                      Seu Ganho Líquido:
                    </span>
                    <span className="text-3xl sm:text-4xl font-black font-mono text-neutral-400 tabular-nums">
                      R$ {competitorNet.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Diferença a favor do motorista:</span>
                <span className="font-bold text-[#B8FF00] text-sm tabular-nums">
                  + R$ {difference.toFixed(2).replace('.', ',')} / corrida
                </span>
              </div>
            </div>

          </div>

          {/* Destaque de Impacto Mensal */}
          <div className="mt-8 p-6 rounded-2xl bg-[#090909] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 flex items-center justify-center text-[#B8FF00] font-mono font-bold text-sm shrink-0">
                RS
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Economia estimada de mais de R$ 1.200 a R$ 2.000 por mês
                </p>
                <p className="text-xs text-neutral-400">
                  Considerando uma média de 15 a 20 corridas por dia em Santa Maria.
                </p>
              </div>
            </div>
            <a
              href="#final-cta"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#B8FF00] uppercase hover:underline shrink-0"
            >
              <span>QUERO SER PARCEIRO</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ComissaoMotorista;
