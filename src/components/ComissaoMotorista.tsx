import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export const ComissaoMotorista: React.FC = () => {
  // Simulador interativo de ganhos para engajar o motorista e reforçar a vantagem de 16%
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
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between py-12 lg:py-16 px-6 sm:px-10 lg:px-16 xl:px-24 bg-[#050505] text-white border-t border-white/5 overflow-hidden select-none"
    >
      {/* Background Cinematográfico Noturno Full-Bleed (sem caixas ou molduras) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Imagem de atmosfera em full-bleed com opacidade sutil */}
        <img
          src="/images/comissao_motorista.jpg"
          alt="Atmosfera BahCar"
          className="w-full h-full object-cover object-center opacity-20 mix-blend-screen scale-105 blur-[1px]"
        />
        {/* Vinheta atmosférica profunda para fusão perfeita */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-[#050505]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/70 to-[#050505]" />
        
        {/* Glows de luz neon verde-limão sutis */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#B8FF00]/[0.035] rounded-full blur-[180px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#B8FF00]/[0.04] rounded-full blur-[160px]" />
      </div>

      {/* 1. TOPO: Headline Forte e Direta (sem caixas) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-4 lg:pt-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#B8FF00] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] shadow-[0_0_10px_#B8FF00]" />
              <span>Transparência Real para o Motorista</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-heading tracking-tight text-white uppercase leading-[1.02]">
              comissão clara <br />
              <span className="text-white">em </span>
              <span className="text-[#B8FF00] drop-shadow-[0_0_35px_rgba(184,255,0,0.35)]">
                cada corrida
              </span>
            </h2>
            
            <p className="mt-3 text-base sm:text-xl text-neutral-300 font-light tracking-wide max-w-xl">
              taxa percentual fixa, sem surpresas.
            </p>
          </div>

          {/* Tag de posicionamento rápido no desktop */}
          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Padrão BahCar</span>
            <span className="text-lg font-bold text-white tracking-wide">84% Líquido para Você</span>
            <span className="text-xs text-neutral-400 mt-1">Valores creditados sem descontos abusivos</span>
          </div>
        </div>
      </div>

      {/* 2. CENTRO: O Grande Selo 3D de 16% + Mockup de Navegação em Tela Cheia */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Selo 3D Metálico Iluminado 16% (O Protagonista da Seção) */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <div className="relative group shrink-0">
            {/* Anéis de brilho radial e glow volumétrico */}
            <div className="absolute -inset-4 bg-[#B8FF00]/25 rounded-full blur-2xl group-hover:bg-[#B8FF00]/40 transition-all duration-700 pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#B8FF00] via-white/50 to-[#B8FF00] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Medalhão 3D Metálico */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-b from-[#141A14] via-[#090D09] to-[#040604] border-2 border-[#B8FF00]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_2px_20px_rgba(184,255,0,0.3)] flex flex-col items-center justify-center text-center p-4">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#B8FF00] uppercase">
                Taxa Fixa
              </span>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black font-heading text-[#B8FF00] tracking-tighter drop-shadow-[0_0_25px_rgba(184,255,0,0.6)] leading-none my-1">
                16%
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-neutral-300 uppercase tracking-wider">
                BahCar Oficial
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              A menor taxa do mercado gaúcho.
            </h3>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-md">
              Enquanto outras plataformas chegam a reter mais de 35% do seu esforço, a BahCar mantém a taxa transparente e fixa em 16%. O restante é todo seu.
            </p>
          </div>
        </div>

        {/* Smartphone com Rota em Modo Escuro (integrado fluidamente sem parecer colado) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-[#0c1014] rounded-[2.5rem] p-3 border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)]">
            
            {/* Tela do Celular com Mapa GPS */}
            <div className="relative w-full aspect-[9/16] max-h-[380px] rounded-[2rem] overflow-hidden bg-[#07090b] flex flex-col justify-between p-4 border border-white/10">
              
              {/* Mapa de fundo com rota neon */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1a261a_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Rota GPS Verde Limão */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 400" fill="none">
                <path
                  d="M 50 320 C 70 260, 110 240, 150 180 C 190 120, 220 140, 250 80"
                  stroke="#B8FF00"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  className="animate-pulse"
                />
                {/* Ponto de partida */}
                <circle cx="50" cy="320" r="6" fill="#FFFFFF" />
                {/* Ponto de chegada com marcador */}
                <circle cx="250" cy="80" r="8" fill="#B8FF00" />
                <circle cx="250" cy="80" r="14" fill="#B8FF00" fillOpacity="0.3" className="animate-ping" />
              </svg>

              {/* Topo do App: Status */}
              <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                <span className="text-xs font-mono font-bold text-white tracking-wider">CORRIDA CONCLUÍDA</span>
                <span className="text-xs font-mono text-[#B8FF00]">R$ {rideValue.toFixed(2)}</span>
              </div>

              {/* Rodapé da tela: Confirmação com Check Verde */}
              <div className="relative z-10 bg-black/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#B8FF00]/20 flex items-center justify-center text-[#B8FF00] shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#B8FF00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">Corrida finalizada com sucesso</p>
                    <p className="text-[11px] text-[#B8FF00] font-mono">Você recebeu: R$ {bahcarNet.toFixed(2)}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* 3. BASE: Painel Comparativo Fluido em Tela Cheia (sem parecer imagem colada) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-4">
        <div className="w-full bg-[#080c0e]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/15 p-5 sm:p-6 lg:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.85)]">
          
          {/* Cabeçalho do Comparativo com Simulação Interativa */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Demonstrativo Financeiro</span>
              <h4 className="text-base sm:text-xl font-bold font-heading text-white">
                caso real: corrida de <span className="text-[#B8FF00]">R$ {rideValue.toFixed(2)}</span>
              </h4>
            </div>

            {/* Controle interativo suave de simulação */}
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-neutral-400">Simular valor:</span>
              <input
                type="range"
                min="15"
                max="80"
                step="0.5"
                value={rideValue}
                onChange={(e) => setRideValue(parseFloat(e.target.value))}
                className="w-24 sm:w-36 accent-[#B8FF00] cursor-pointer"
                aria-label="Simular valor da corrida"
              />
              <span className="text-xs font-mono font-bold text-[#B8FF00] min-w-[65px] text-right">
                R$ {rideValue.toFixed(2)}
              </span>
            </div>
          </div>

          {/* As Duas Colunas Comparativas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4">
            
            {/* Coluna BahCar (Destaque Principal em Verde) */}
            <div className="bg-[#B8FF00]/[0.06] border border-[#B8FF00]/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8FF00] text-black font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(184,255,0,0.4)]">
                  16% BahCar
                </span>
                <span className="text-xs font-mono text-neutral-300">Menos desconto</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm text-neutral-300 font-mono">
                  <span>Comissão:</span>
                  <span className="text-neutral-400">R$ {bahcarCommission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold font-mono text-white pt-1 border-t border-white/10">
                  <span>Líquido do motorista:</span>
                  <span className="text-[#B8FF00] text-base sm:text-lg">R$ {bahcarNet.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Coluna Outra Plataforma (Mais Neutra, Tom Cinza) */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-neutral-300 font-heading font-semibold text-xs uppercase tracking-wider">
                  35,15% outra plataforma
                </span>
                <span className="text-xs font-mono text-neutral-500">Desconto pesado</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm text-neutral-400 font-mono">
                  <span>Comissão:</span>
                  <span className="text-neutral-400">R$ {competitorCommission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold font-mono text-neutral-300 pt-1 border-t border-white/10">
                  <span>Líquido do motorista:</span>
                  <span className="text-neutral-200 text-base sm:text-lg">R$ {competitorNet.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Barra de Ganho Extra em Destaque */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 bg-[#B8FF00]/15 text-[#B8FF00] px-4 py-2 rounded-xl font-heading font-black text-sm sm:text-base tracking-wide border border-[#B8FF00]/30 shadow-[0_0_20px_rgba(184,255,0,0.15)]">
              <TrendingUp className="w-5 h-5 text-[#B8FF00]" />
              <span>+ R$ {difference.toFixed(2)} para o motorista nesta corrida</span>
            </div>

            <span className="text-[11px] font-mono text-neutral-500 tracking-wider">
              *Taxas de outras plataformas podem variar conforme a região e a demanda.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComissaoMotorista;
