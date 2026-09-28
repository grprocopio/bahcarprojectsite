import React, { useState } from 'react';
import { TrendingUp, Check } from 'lucide-react';

export const ComissaoMotorista: React.FC = () => {
  // Simulação baseada no caso real de R$ 27,48
  const [rideValue, setRideValue] = useState<number>(27.48);

  const bahcarRate = 0.16;
  const competitorRate = 0.3515;

  const bahcarCommission = rideValue * bahcarRate;
  const bahcarNet = rideValue - bahcarCommission;

  const competitorCommission = rideValue * competitorRate;
  const competitorNet = rideValue - competitorCommission;

  const difference = bahcarNet - competitorNet;

  return (
    <section
      id="comissao-clara"
      className="relative w-full min-h-screen flex flex-col justify-center py-14 sm:py-18 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-20 bg-[#050505] text-white border-t border-white/5 select-none"
    >
      {/* Background Cinematográfico Noturno Full-Bleed integrado ao scroll (sem formatos circulares) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/comissao_motorista.jpg"
          alt="Atmosfera BahCar"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]" />
        
        {/* Iluminação ambiente sutil */}
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-[#B8FF00]/[0.04] blur-[180px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#B8FF00]/[0.03] blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-10 lg:gap-12">
        
        {/* 1. TOPO: Headline Corporativa + Bloco Métrico de Alta Precisão (Sem círculos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Lado Esquerdo: Textos Corporativos e Proposta de Valor */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Comissão Clara <br />
              <span className="text-white font-normal">em </span>
              <span className="text-[#B8FF00] drop-shadow-[0_0_35px_rgba(184,255,0,0.4)]">
                Cada Corrida
              </span>
            </h2>
            
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl">
              Taxa percentual fixa. Mais transparência, previsibilidade e retorno financeiro no seu dia a dia.
            </p>

            {/* Barra Visual de Proporção: Didática, Limpa e Executiva (Sem formatos circulares) */}
            <div className="mt-7 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md max-w-xl">
              <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-3">
                <span className="text-[#B8FF00] flex items-center gap-1.5 font-semibold">
                  <Check className="w-4 h-4 stroke-[2.5]" /> 84% Repasse ao Motorista
                </span>
                <span className="text-neutral-400">16% Taxa BahCar</span>
              </div>
              
              {/* Barra segmentada de distribuição linear */}
              <div className="w-full h-3 rounded-md bg-neutral-800/80 overflow-hidden flex p-0.5 border border-white/10">
                <div 
                  className="h-full rounded-sm bg-gradient-to-r from-[#B8FF00] to-[#9ee800] shadow-[0_0_15px_rgba(184,255,0,0.5)] transition-all duration-300" 
                  style={{ width: '84%' }} 
                />
                <div 
                  className="h-full rounded-sm bg-neutral-600/70 ml-1.5 transition-all duration-300" 
                  style={{ width: '16%' }} 
                />
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-normal leading-normal">
                A cada <strong className="text-white font-medium">R$ 100,00</strong> faturados, <strong className="text-[#B8FF00] font-semibold">R$ 84,00 vão direto para você</strong>. Apenas R$ 16,00 sustentam a infraestrutura e a plataforma.
              </p>
            </div>
          </div>

          {/* Lado Direito: Painel Executivo do 16% (Estrutura Moderna, Sem Círculos) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#141d14] via-[#0b100b] to-[#050805] border border-[#B8FF00]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              {/* Luz de fundo ambiental no card */}
              <div className="absolute inset-0 bg-[#B8FF00]/[0.02] rounded-2xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center text-center pb-4 border-b border-white/10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.18em] sm:tracking-[0.22em] text-[#B8FF00] uppercase font-display drop-shadow-[0_2px_12px_rgba(184,255,0,0.35)]">
                    TAXA BAH CAR
                  </h3>
                </div>

                <div className="flex items-baseline justify-center gap-2 py-1">
                  <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#B8FF00] tracking-tight drop-shadow-[0_0_25px_rgba(184,255,0,0.5)] leading-none tabular-nums">
                    16
                  </span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#B8FF00] opacity-90 leading-none">
                    %
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-col items-center text-center gap-1">
                  <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                    A menor comissão da categoria
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                    84% do valor total das corridas permanece integralmente com você.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 2. DEMONSTRATIVO FINANCEIRO: Apresentação Executiva e Precisa (Sem Círculos ou Pontos) */}
        <div className="w-full bg-[#080c0e]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/15 p-6 sm:p-8 lg:p-9 shadow-[0_20px_80px_rgba(0,0,0,0.85)]">
          
          {/* Cabeçalho do Demonstrativo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-[#B8FF00] uppercase tracking-wider block mb-1">
                Demonstrativo de Repasse
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Simulação Real: Corrida de <span className="text-[#B8FF00] tabular-nums font-extrabold">R$ {rideValue.toFixed(2).replace('.', ',')}</span>
              </h3>
            </div>

            {/* Controle interativo suave de simulação */}
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
              <span className="text-xs sm:text-sm font-medium text-neutral-300">Simular valor:</span>
              <input
                type="range"
                min="15"
                max="80"
                step="0.5"
                value={rideValue}
                onChange={(e) => setRideValue(parseFloat(e.target.value))}
                className="w-28 sm:w-40 accent-[#B8FF00] cursor-pointer"
                aria-label="Simular valor da corrida"
              />
              <span className="text-xs sm:text-sm font-bold text-[#B8FF00] tabular-nums min-w-[70px] text-right">
                R$ {rideValue.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* As Duas Colunas Comparativas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-6">
            
            {/* Coluna BahCar (Destaque Principal com 16%) */}
            <div className="relative bg-gradient-to-b from-[#B8FF00]/[0.12] to-[#B8FF00]/[0.03] border-2 border-[#B8FF00] rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(184,255,0,0.12)]">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <span className="inline-flex items-center self-start px-3.5 py-1.5 rounded-lg bg-[#B8FF00] text-black font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(184,255,0,0.4)]">
                  BahCar 16% Fixo
                </span>
                <span className="text-xs sm:text-sm text-[#B8FF00] font-semibold">
                  84% líquido para você
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-1 text-sm sm:text-base text-neutral-300 font-normal">
                  <span>Taxa da plataforma (16% fixo):</span>
                  <span className="text-neutral-200 font-semibold tabular-nums">
                    R$ {bahcarCommission.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex flex-col xs:flex-row justify-between xs:items-baseline gap-1.5 text-base sm:text-lg font-bold text-white pt-3.5 border-t border-[#B8FF00]/25">
                  <span className="leading-snug">Repasse líquido ao motorista:</span>
                  <span className="text-[#B8FF00] text-2xl sm:text-3xl font-black tabular-nums drop-shadow-[0_0_15px_rgba(184,255,0,0.4)]">
                    R$ {bahcarNet.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            {/* Coluna Outra Plataforma (Mais Neutra, Tom Cinza) */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <span className="inline-flex items-center self-start px-3.5 py-1.5 rounded-lg bg-white/10 text-neutral-300 font-semibold text-xs sm:text-sm tracking-wider">
                  Outras Plataformas (Média de 35,15%)
                </span>
                <span className="text-xs sm:text-sm text-neutral-400 font-normal">
                  Retenção elevada
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-1 text-sm sm:text-base text-neutral-400 font-normal">
                  <span>Taxa média retida:</span>
                  <span className="text-neutral-300 font-medium tabular-nums">
                    R$ {competitorCommission.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex flex-col xs:flex-row justify-between xs:items-baseline gap-1.5 text-base sm:text-lg font-bold text-neutral-300 pt-3.5 border-t border-white/10">
                  <span className="leading-snug">Repasse líquido estimado:</span>
                  <span className="text-neutral-200 text-xl sm:text-2xl font-bold tabular-nums">
                    R$ {competitorNet.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Barra de Ganho Extra em Destaque */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 bg-[#B8FF00]/15 text-[#B8FF00] px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base tracking-wide border border-[#B8FF00]/40 shadow-[0_0_25px_rgba(184,255,0,0.2)]">
              <TrendingUp className="w-5 h-5 text-[#B8FF00] shrink-0" />
              <span>Diferença a seu favor: + R$ {difference.toFixed(2).replace('.', ',')} nesta corrida com a BahCar</span>
            </div>

            <span className="text-xs text-neutral-400 font-normal">
              *As taxas de outras plataformas podem variar de acordo com trajeto, dinâmica e região.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ComissaoMotorista;
