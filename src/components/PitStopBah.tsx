import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, ShieldCheck, Wrench, MessageSquare, Zap, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BenefitItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BENEFITS: BenefitItem[] = [
  {
    id: 'pausa',
    number: '01',
    title: 'PAUSA',
    description: 'Um lugar para descansar entre as corridas.',
    icon: ShieldCheck,
  },
  {
    id: 'cuidado',
    number: '02',
    title: 'CUIDADO',
    description: 'Mais praticidade para cuidar do carro.',
    icon: Wrench,
  },
  {
    id: 'cafe',
    number: '03',
    title: 'CAFÉ',
    description: 'Uma pausa rápida para seguir a jornada.',
    icon: Coffee,
  },
  {
    id: 'atendimento',
    number: '04',
    title: 'ATENDIMENTO',
    description: 'Equipe próxima para ouvir e orientar.',
    icon: MessageSquare,
  },
];

export const PitStopBah: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const benefitsListRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGPathElement>(null);
  const pulseNodesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Title line by line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from([titleLine1Ref.current, titleLine2Ref.current], {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      })
      // 2. Badge & Subtitle enter with fade + translateY
      .from(
        [badgeRef.current, subtitleRef.current],
        {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      // 3. Green path line drawn in composition
      .fromTo(
        svgLineRef.current,
        { strokeDashoffset: 1200, strokeDasharray: 1200 },
        { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' },
        '-=0.5'
      )
      // 4. Benefits appear one by one
      .from(
        benefitsListRef.current ? benefitsListRef.current.children : [],
        {
          opacity: 0,
          x: -24,
          stagger: 0.14,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=1.0'
      )
      // 5. Future note reveal
      .from(
        noteRef.current,
        {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      // 6. Pulse nodes glowing
      .from(
        pulseNodesRef.current ? pulseNodesRef.current.querySelectorAll('.pulse-node') : [],
        {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        '-=0.8'
      );

      // Light parallax on the visual side
      gsap.to(visualContainerRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: -30,
        ease: 'none',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pit-stop"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-[#050505] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Background radial ambient illumination */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#B8FF00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#B8FF00]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LADO ESQUERDO: Conteúdo Editorial */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Título Grande (Linha por linha) */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.08] text-white">
              <span ref={titleLine1Ref} className="block">
                Não é só um app.
              </span>
              <span ref={titleLine2Ref} className="block text-neutral-400 font-medium">
                É presença de verdade.
              </span>
            </h2>

            {/* Destaque PIT STOP Bah */}
            <div ref={badgeRef} className="mt-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#B8FF00]/10 text-[#B8FF00] border border-[#B8FF00]/30 shadow-[0_0_20px_rgba(184,255,0,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                PIT STOP Bah
              </span>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                Santa Maria • Ponto Físico
              </span>
            </div>

            {/* Subtexto Curto */}
            <p ref={subtitleRef} className="mt-4 text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
              Um ponto de apoio pensado para a rotina de quem dirige.
            </p>

            {/* Lista Editorial dos Quatro Benefícios */}
            <div ref={benefitsListRef} className="mt-10 sm:mt-12 space-y-6 sm:space-y-7">
              {BENEFITS.map((b) => {
                const IconComponent = b.icon;
                return (
                  <div
                    key={b.id}
                    className="group relative flex items-start gap-4 sm:gap-5 pb-6 border-b border-white/5 last:border-b-0 last:pb-0 transition-colors duration-300"
                  >
                    {/* Número discreto + Ícone linear */}
                    <div className="flex-shrink-0 flex items-center gap-2 pt-0.5">
                      <span className="font-mono text-xs text-neutral-600 group-hover:text-[#B8FF00] transition-colors">
                        {b.number}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-white/[0.03] group-hover:bg-[#B8FF00]/10 border border-white/10 group-hover:border-[#B8FF00]/40 flex items-center justify-center text-neutral-400 group-hover:text-[#B8FF00] transition-all duration-300">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Título & Descrição */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold font-heading uppercase tracking-wider text-white group-hover:text-[#B8FF00] transition-colors">
                          {b.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Observação Discreta Final */}
            <div
              ref={noteRef}
              className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2.5 text-xs text-neutral-400 font-mono"
            >
              <Zap className="w-3.5 h-3.5 text-[#B8FF00]/70 flex-shrink-0" />
              <span>
                Projeto futuro: estrutura para carregamento de veículos elétricos.
              </span>
            </div>

          </div>

          {/* LADO DIREITO: Composição Visual Conceitual do Pit Stop Bah */}
          <div ref={visualContainerRef} className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl bg-[#090D10]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              
              {/* Grid arquitetônico de fundo */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '36px 36px',
                }}
              />

              {/* Tag Superior do Hub */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                  <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-300">
                    HUB FÍSICO BAHCAR • SANTA MARIA
                  </span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500 hidden sm:inline">
                  COORD -29.6842, -53.8069
                </span>
              </div>

              {/* Ilustração Arquitetônica Vetorial / Blueprint Conceitual */}
              <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 500 300"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="hubGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B8FF00" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#B8FF00" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="planeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(184,255,0,0.15)" />
                      <stop offset="100%" stopColor="rgba(184,255,0,0.01)" />
                    </linearGradient>
                    <filter id="hubBlur" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Linhas estruturais do solo / Baías de descanso */}
                  <g opacity="0.35" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                    {/* Baia 1 */}
                    <line x1="60" y1="230" x2="160" y2="230" strokeDasharray="3 3" />
                    <line x1="60" y1="230" x2="100" y2="180" />
                    <line x1="160" y1="230" x2="200" y2="180" />
                    <line x1="100" y1="180" x2="200" y2="180" strokeDasharray="3 3" />

                    {/* Baia 2 */}
                    <line x1="190" y1="230" x2="290" y2="230" strokeDasharray="3 3" />
                    <line x1="190" y1="230" x2="230" y2="180" />
                    <line x1="290" y1="230" x2="330" y2="180" />
                    <line x1="230" y1="180" x2="330" y2="180" strokeDasharray="3 3" />

                    {/* Baia 3 - Carregamento EV Futuro */}
                    <line x1="320" y1="230" x2="420" y2="230" strokeDasharray="3 3" />
                    <line x1="320" y1="230" x2="360" y2="180" />
                    <line x1="420" y1="230" x2="460" y2="180" />
                    <line x1="360" y1="180" x2="460" y2="180" strokeDasharray="3 3" />
                  </g>

                  {/* Cobertura Arquitetônica Geométrica Minimalista (Canopy Pavilion) */}
                  <polygon
                    points="70,110 390,70 450,120 130,160"
                    fill="url(#planeGrad)"
                    stroke="rgba(184,255,0,0.4)"
                    strokeWidth="1.5"
                  />

                  {/* Pilares Estruturais Finos */}
                  <line x1="130" y1="160" x2="130" y2="230" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <line x1="450" y1="120" x2="450" y2="190" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <line x1="390" y1="70" x2="390" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="70" y1="110" x2="70" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Linha Verde Animada de Entrada / Rota para o Pit Stop */}
                  <path
                    ref={svgLineRef}
                    d="M 20 260 C 100 260, 140 240, 210 210 C 260 190, 270 170, 310 145 C 340 125, 370 115, 410 100"
                    stroke="#B8FF00"
                    strokeWidth="2.5"
                    fill="none"
                    filter="url(#hubBlur)"
                  />

                  {/* Pontos de Apoio / Waypoints Luminosos */}
                  <g ref={pulseNodesRef}>
                    {/* Node 1: Lounge / Pausa */}
                    <g className="pulse-node" transform="translate(130, 160)">
                      <circle r="12" fill="#B8FF00" fillOpacity="0.12" className="animate-ping" style={{ animationDuration: '3s' }} />
                      <circle r="5" fill="#B8FF00" />
                      <circle r="2" fill="#050505" />
                      <text x="10" y="4" fill="#B8FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">01 LOUNGE</text>
                    </g>

                    {/* Node 2: Ponto Café & Cuidado */}
                    <g className="pulse-node" transform="translate(260, 135)">
                      <circle r="10" fill="#B8FF00" fillOpacity="0.12" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                      <circle r="4.5" fill="#B8FF00" />
                      <circle r="1.5" fill="#050505" />
                      <text x="10" y="4" fill="#FFFFFF" fontSize="9" fontFamily="monospace" opacity="0.8">02 ESPAÇO CAFÉ</text>
                    </g>

                    {/* Node 3: Atendimento Parceiro */}
                    <g className="pulse-node" transform="translate(390, 70)">
                      <circle r="10" fill="#B8FF00" fillOpacity="0.12" className="animate-ping" style={{ animationDuration: '3.5s' }} />
                      <circle r="4.5" fill="#B8FF00" />
                      <circle r="1.5" fill="#050505" />
                      <text x="-95" y="4" fill="#B8FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">03 ATENDIMENTO</text>
                    </g>

                    {/* Node 4: Futuro Eletroposto */}
                    <g className="pulse-node" transform="translate(410, 190)">
                      <circle r="4" fill="none" stroke="#B8FF00" strokeWidth="1" strokeDasharray="2 2" />
                      <circle r="2" fill="#B8FF00" opacity="0.6" />
                      <text x="-80" y="16" fill="#888888" fontSize="8" fontFamily="monospace">FUTURO EV</text>
                    </g>
                  </g>
                </svg>
              </div>

              {/* Informações de rodapé da maquete visual */}
              <div className="relative z-10 pt-4 mt-2 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-[#B8FF00]">
                  <MapPin className="w-3 h-3" />
                  Presença Física na Cidade
                </span>
                <span className="text-neutral-500">
                  Exclusivo para Motoristas Parceiros
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PitStopBah;
