import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, Sparkles, Navigation, Clock, CheckCircle2, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ModalityData {
  id: 'pop' | 'black' | 'guard';
  index: string;
  name: string;
  headline: string;
  description: string;
  accentColor: string;
  badge: string;
}

const MODALITIES: ModalityData[] = [
  {
    id: 'pop',
    index: '01',
    name: 'POP',
    headline: 'Praticidade para as corridas do dia a dia.',
    description: 'A forma mais ágil de circular por Santa Maria. Deslocamentos rápidos, tarifa justa e conexão imediata com motoristas parceiros em todos os bairros.',
    accentColor: '#B8FF00',
    badge: 'Urbano & Prático',
  },
  {
    id: 'black',
    index: '02',
    name: 'BLACK',
    headline: 'Uma experiência diferenciada.',
    description: 'Mais conforto, cuidado e refinamento para seus trajetos. Espaço ampliado, veículos selecionados e climatização ideal para compromissos que exigem tranquilidade.',
    accentColor: '#E2E8F0',
    badge: 'Conforto & Refinamento',
  },
  {
    id: 'guard',
    index: '03',
    name: 'GUARD',
    headline: 'Mais acompanhamento durante a corrida.',
    description: 'Camadas pensadas para maior serenidade no trajeto. Compartilhamento de rota em tempo real com quem você confia e suporte focado no seu bem-estar.',
    accentColor: '#B8FF00',
    badge: 'Acompanhamento & Cuidado',
  },
];

export const Modalities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for texts & visuals to crossfade
  const popTextRef = useRef<HTMLDivElement>(null);
  const blackTextRef = useRef<HTMLDivElement>(null);
  const guardTextRef = useRef<HTMLDivElement>(null);

  const popVisualRef = useRef<HTMLDivElement>(null);
  const blackVisualRef = useRef<HTMLDivElement>(null);
  const guardVisualRef = useRef<HTMLDivElement>(null);

  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    const ctx = gsap.context(() => {
      const texts = [popTextRef.current, blackTextRef.current, guardTextRef.current];
      const visuals = [popVisualRef.current, blackVisualRef.current, guardVisualRef.current];

      // Initial state: POP active, others hidden
      gsap.set([texts[1], texts[2]], { opacity: 0, y: 30, pointerEvents: 'none' });
      gsap.set([visuals[1], visuals[2]], { opacity: 0, scale: 0.96, pointerEvents: 'none' });
      gsap.set(texts[0], { opacity: 1, y: 0, pointerEvents: 'auto' });
      gsap.set(visuals[0], { opacity: 1, scale: 1, pointerEvents: 'auto' });

      // Master scrubbed timeline across pinned scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=220%',
          pin: pinSection,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveIndex(0);
            } else if (p < 0.68) {
              setActiveIndex(1);
            } else {
              setActiveIndex(2);
            }
          },
        },
      });

      scrollTriggerInstanceRef.current = tl.scrollTrigger || null;

      // 0.0 -> 0.33: POP visible
      tl.to({}, { duration: 1 });

      // Transition 1: POP -> BLACK (at around 33% - 50%)
      tl.to(texts[0], { opacity: 0, y: -24, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'none' }, 't1')
        .to(visuals[0], { opacity: 0, scale: 0.96, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'none' }, 't1')
        .to(texts[1], { opacity: 1, y: 0, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'auto' }, 't1+=0.3')
        .to(visuals[1], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'auto' }, 't1+=0.3');

      // Hold BLACK
      tl.to({}, { duration: 1 });

      // Transition 2: BLACK -> GUARD (at around 66% - 85%)
      tl.to(texts[1], { opacity: 0, y: -24, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'none' }, 't2')
        .to(visuals[1], { opacity: 0, scale: 0.96, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'none' }, 't2')
        .to(texts[2], { opacity: 1, y: 0, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'auto' }, 't2+=0.3')
        .to(visuals[2], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'auto' }, 't2+=0.3');

      // Hold GUARD until end
      tl.to({}, { duration: 1 });
    }, container);

    return () => ctx.revert();
  }, []);

  // Allow clicking indicators to smoothly scroll to that modality
  const handleSelectModality = (idx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollDistance = window.innerHeight * 2.2;
    const targetScroll = containerTop + (idx / 2) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white">
      {/* Pinned Viewport Container */}
      <section
        ref={pinSectionRef}
        className="w-full h-screen flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Header Superior da Seção */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#B8FF00]">
              EXPERIÊNCIAS DE VIAGEM
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mt-1 text-white">
              Uma BahCar para cada momento.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light mt-1">
              Escolha a experiência que combina com a sua viagem.
            </p>
          </div>

          {/* Seletor / Indicador de Progresso Interativo */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/[0.03] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {MODALITIES.map((m, i) => (
              <button
                key={m.id}
                onClick={() => handleSelectModality(i)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  activeIndex === i
                    ? 'bg-[#B8FF00] text-black shadow-[0_0_20px_rgba(184,255,0,0.35)]'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                <span>{m.index}</span>
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Corpo Central: Lado Esquerdo (Texto da Modalidade) & Lado Direito (Interface Visual) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center flex-1 my-auto">
          
          {/* LADO ESQUERDO: Tipografia e Descrição da Modalidade Ativa */}
          <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] flex items-center">
            
            {/* 01. POP */}
            <div ref={popTextRef} className="absolute inset-0 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#B8FF00]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#B8FF00]">
                  MODALIDADE 01 • URBANA
                </span>
              </div>
              <h3 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading tracking-tighter text-white">
                POP
              </h3>
              <p className="mt-3 text-lg sm:text-xl font-medium text-[#B8FF00]">
                Praticidade para as corridas do dia a dia.
              </p>
              <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-md">
                A resposta ágil para o ritmo de Santa Maria. Carros sempre por perto com foco em velocidade de embarque e rota descomplicada.
              </p>
              <div className="mt-6 flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B8FF00]" />
                  Embarque rápido
                </span>
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#B8FF00]" />
                  Rota urbana inteligente
                </span>
              </div>
            </div>

            {/* 02. BLACK */}
            <div ref={blackTextRef} className="absolute inset-0 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-white/70" />
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                  MODALIDADE 02 • REFINAMENTO
                </span>
              </div>
              <h3 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading tracking-tighter text-white">
                BLACK
              </h3>
              <p className="mt-3 text-lg sm:text-xl font-medium text-white">
                Uma experiência diferenciada.
              </p>
              <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-md">
                Ambiente refinado para viagens onde o silêncio, a amplitude interna e o cuidado com cada detalhe fazem toda a diferença.
              </p>
              <div className="mt-6 flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white/80" />
                  Conforto acústico
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/80" />
                  Veículos selecionados
                </span>
              </div>
            </div>

            {/* 03. GUARD */}
            <div ref={guardTextRef} className="absolute inset-0 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#B8FF00]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#B8FF00]">
                  MODALIDADE 03 • ACOMPANHAMENTO
                </span>
              </div>
              <h3 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading tracking-tighter text-white">
                GUARD
              </h3>
              <p className="mt-3 text-lg sm:text-xl font-medium text-[#B8FF00]">
                Mais acompanhamento durante a corrida.
              </p>
              <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-md">
                Uma experiência orientada a tranquilidade e serenidade. Compartilhe seu trajeto com quem quiser e viaje com total atenção dedicada.
              </p>
              <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs text-neutral-400 max-w-md">
                <Info className="w-4 h-4 text-[#B8FF00] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Recursos complementares como videomonitoramento dependem de validações técnicas operacionais e estrito respeito às diretrizes de privacidade locais.
                </span>
              </div>
            </div>

          </div>

          {/* LADO DIREITO: Composição Visual Correspondente (Crossfade Suave) */}
          <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] flex items-center justify-center">
            
            {/* Visual 01: POP (Simples, Urbana, Rota Rápida, Verde Presente) */}
            <div
              ref={popVisualRef}
              className="absolute inset-0 w-full h-full rounded-2xl bg-[#090D10] border border-[#B8FF00]/25 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(184,255,0,0.08)] overflow-hidden"
            >
              {/* Grid minimalista */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(184,255,0,0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(184,255,0,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Topo do Card POP */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF00] animate-ping" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#B8FF00]">
                    BAHCAR POP • EM TEMPO REAL
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  Agilidade Urbana
                </span>
              </div>

              {/* Rota Minimalista Vetorial POP */}
              <div className="relative z-10 my-4 flex-1 flex items-center justify-center">
                <svg className="w-full h-44" viewBox="0 0 400 160" fill="none">
                  {/* Linha de fundo cinza */}
                  <path
                    d="M 30 130 Q 120 130 180 80 T 360 40"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3"
                  />
                  {/* Linha da rota POP verde vibrante */}
                  <path
                    d="M 30 130 Q 120 130 180 80 T 360 40"
                    stroke="#B8FF00"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  {/* Ponto de Origem */}
                  <circle cx="30" cy="130" r="5" fill="#B8FF00" />
                  <text x="30" y="152" fill="#B8FF00" fontSize="10" fontFamily="monospace" textAnchor="middle">CENTRO</text>
                  
                  {/* Veículo em Trânsito */}
                  <g transform="translate(180, 80)">
                    <circle r="12" fill="#B8FF00" fillOpacity="0.2" className="animate-pulse" />
                    <circle r="5" fill="#B8FF00" />
                    <circle r="2" fill="#000" />
                  </g>

                  {/* Ponto de Destino */}
                  <circle cx="360" cy="40" r="5" fill="#FFFFFF" />
                  <text x="360" y="24" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle">DESTINO</text>
                </svg>
              </div>

              {/* Rodapé Card POP */}
              <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-[#B8FF00]">Disponibilidade constante</span>
                <span>Santa Maria — RS</span>
              </div>
            </div>

            {/* Visual 02: BLACK (Mais escuro, Conforto, Refinamento, Menos verde) */}
            <div
              ref={blackVisualRef}
              className="absolute inset-0 w-full h-full rounded-2xl bg-[#070708] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Gradiente escuro sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

              {/* Topo do Card BLACK */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-white">
                    BAHCAR BLACK • ALTO PADRÃO
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  Conforto Superior
                </span>
              </div>

              {/* Silhueta e Composição Elegante Monocromática */}
              <div className="relative z-10 my-4 flex-1 flex flex-col items-center justify-center">
                <svg className="w-full h-36" viewBox="0 0 380 120" fill="none">
                  {/* Linhas aerodinâmicas minimalistas do veículo */}
                  <path
                    d="M 40 85 C 90 85, 120 45, 190 40 C 260 35, 290 65, 340 85"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 70 85 C 100 85, 130 55, 185 52 C 240 50, 260 70, 310 85"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Rodas minimalistas */}
                  <circle cx="100" cy="85" r="14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="#070708" />
                  <circle cx="100" cy="85" r="5" fill="rgba(255,255,255,0.8)" />
                  <circle cx="280" cy="85" r="14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="#070708" />
                  <circle cx="280" cy="85" r="5" fill="rgba(255,255,255,0.8)" />
                </svg>
                <div className="flex items-center gap-6 mt-1 text-xs font-mono text-neutral-400">
                  <span className="text-white">Climatização selecionada</span>
                  <span>•</span>
                  <span>Espaço ampliado</span>
                  <span>•</span>
                  <span>Condutores experientes</span>
                </div>
              </div>

              {/* Rodapé Card BLACK */}
              <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="text-neutral-300">Padrão Executivo</span>
                <span>Viagens discretas e pontuais</span>
              </div>
            </div>

            {/* Visual 03: GUARD (Acompanhamento em tempo real, proteção discreta, rota compartilhada) */}
            <div
              ref={guardVisualRef}
              className="absolute inset-0 w-full h-full rounded-2xl bg-[#060A0D] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Radar circular sutil de fundo */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-72 h-72 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />

              {/* Topo do Card GUARD */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B8FF00]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#B8FF00]">
                    BAHCAR GUARD • ROTA COMPARTILHADA
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  Protocolo Ativo
                </span>
              </div>

              {/* Visual de Acompanhamento em Rota */}
              <div className="relative z-10 my-4 flex-1 flex flex-col justify-center">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Status da Viagem:</span>
                    <span className="text-[#B8FF00] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                      Em percurso assistido
                    </span>
                  </div>
                  
                  {/* Linha de progresso assistido */}
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#B8FF00] h-full w-2/3 rounded-full shadow-[0_0_10px_#B8FF00]" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
                    <span>Acesso compartilhado com contatos de confiança</span>
                    <span className="text-neutral-400">Previsão 8 min</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF00]" />
                  <span>Tranquilidade do embarque até o destino final</span>
                </div>
              </div>

              {/* Rodapé Card GUARD */}
              <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="text-[#B8FF00]/80">Suporte Dedicado</span>
                <span>Privacidade Respeitada</span>
              </div>
            </div>

          </div>

        </div>

        {/* Rodapé Sutil da Seção */}
        <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs font-mono text-neutral-600">
          <span>Role para alternar entre as modalidades</span>
          <span className="text-[#B8FF00]">0{activeIndex + 1} / 03</span>
        </div>
      </section>
    </div>
  );
};

export default Modalities;
