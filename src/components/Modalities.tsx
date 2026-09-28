import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Camera, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type ModalityId = 'pop' | 'black' | 'guard';

interface ModalityConfig {
  id: ModalityId;
  index: string;
  name: string;
  tagline: string;
  description: string;
  carImage: string;
  carAlt: string;
  hasShield?: boolean;
}

const MODALITIES: ModalityConfig[] = [
  {
    id: 'pop',
    index: '01',
    name: 'POP',
    tagline: 'Deslocamento padrão',
    description: 'Praticidade para as corridas do dia a dia.',
    carImage: '/images/pop_car.jpg',
    carAlt: 'Veículo compacto da categoria BahCar POP',
  },
  {
    id: 'black',
    index: '02',
    name: 'BLACK',
    tagline: 'Experiência premium',
    description: 'Veículos e atendimento em uma categoria diferenciada.',
    carImage: '/images/black_car.jpg',
    carAlt: 'Sedan executivo da categoria BahCar BLACK',
  },
  {
    id: 'guard',
    index: '03',
    name: 'GUARD',
    tagline: 'Acompanhamento em tempo real',
    description: 'Videomonitoramento da corrida, sujeito à validação técnica e às regras de privacidade.',
    carImage: '/images/guard_car.jpg',
    carAlt: 'Veículo SUV da categoria BahCar GUARD com monitoramento assistido',
    hasShield: true,
  },
];

export const Modalities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ModalityId>('pop');

  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    const ctx = gsap.context(() => {
      // Pin section during scroll and cycle activeTab automatically based on scroll progress
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=200%',
        pin: pinSection,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.35) {
            setActiveTab('pop');
          } else if (p < 0.7) {
            setActiveTab('black');
          } else {
            setActiveTab('guard');
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleSelect = (id: ModalityId, index: number) => {
    setActiveTab(id);
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const scrollRange = window.innerHeight * 2.0;
      const targetScroll = containerTop + (index / 2) * scrollRange;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white">
      {/* Pinned Screen Viewport */}
      <section
        ref={pinSectionRef}
        className="w-full h-screen flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-10 lg:px-16 max-w-[1520px] mx-auto overflow-hidden select-none"
      >
        {/* TÍTULO NO TOPO: Alinhado à esquerda */}
        <div className="flex-shrink-0 pt-2 pb-6 border-b border-white/10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight text-left">
            <span className="text-[#B8FF00]">Modalidades</span>{' '}
            <span className="text-white">previstas no aplicativo</span>
          </h2>
        </div>

        {/* ÁREA PRINCIPAL COM AS 3 MODALIDADES E DIVISÓRIAS VERTICAIS */}
        <div className="flex-1 my-auto flex flex-col lg:flex-row items-stretch justify-between w-full h-[72vh] min-h-[500px] border-b border-white/10">
          
          {MODALITIES.map((modality, idx) => {
            const isActive = activeTab === modality.id;
            const isLeft = idx === 0;
            const isCenter = idx === 1;
            const isRight = idx === 2;

            return (
              <div
                key={modality.id}
                onClick={() => handleSelect(modality.id, idx)}
                className={`relative flex flex-col justify-between transition-all duration-700 ease-out cursor-pointer ${
                  // Dividers: vertical border on desktop
                  idx < MODALITIES.length - 1 ? 'lg:border-r lg:border-white/15' : ''
                } ${
                  idx > 0 ? 'border-t lg:border-t-0 border-white/10' : ''
                } ${
                  // Expanded active column vs collapsed inactive column on desktop
                  isActive
                    ? 'lg:flex-[3.2] flex-1 bg-white/[0.015] px-6 sm:px-10 py-6 sm:py-8'
                    : 'lg:flex-[1] flex-none py-4 lg:py-8 px-4 sm:px-6 hover:bg-white/[0.02] opacity-40 hover:opacity-75'
                }`}
              >
                {/* Active glow line on top of active column */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8FF00] to-transparent shadow-[0_0_12px_#B8FF00]" />
                )}

                {/* --- HEADER DO BLOCO / COLUNA --- */}
                <div className="flex-shrink-0">
                  {/* Número de Índice */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs tracking-widest transition-colors duration-500 ${
                        isActive ? 'text-[#B8FF00] font-bold' : 'text-neutral-500'
                      }`}
                    >
                      {modality.index}
                    </span>
                    {isActive && (
                      <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        Em Destaque
                      </span>
                    )}
                  </div>

                  {/* Nome da Modalidade */}
                  <h3
                    className={`font-black font-heading tracking-tight transition-all duration-500 ${
                      isActive
                        ? 'text-4xl sm:text-6xl lg:text-7xl text-[#B8FF00]'
                        : 'text-2xl sm:text-3xl lg:text-4xl text-neutral-500 group-hover:text-neutral-300'
                    }`}
                  >
                    {modality.name}
                  </h3>

                  {/* Tagline / Subtítulo */}
                  <p
                    className={`mt-2 font-heading transition-colors duration-500 ${
                      isActive
                        ? 'text-lg sm:text-xl lg:text-2xl font-bold text-white'
                        : 'text-xs sm:text-sm text-neutral-500'
                    }`}
                  >
                    {modality.tagline}
                  </p>

                  {/* Descrição detalhada da modalidade ativa */}
                  {isActive && (
                    <p className="mt-2 text-xs sm:text-sm lg:text-base text-neutral-300 font-light leading-relaxed max-w-xl animate-fade-in">
                      {modality.description}
                    </p>
                  )}
                </div>

                {/* --- ÁREA CENTRAL / VISUAL DO CARRO EM DESTAQUE --- */}
                {isActive ? (
                  <div className="relative flex-1 w-full my-auto flex items-center justify-center overflow-visible min-h-[200px] sm:min-h-[260px] lg:min-h-[300px]">
                    
                    {/* Caso GUARD: Escudo e Câmera de Videomonitoramento atrás do carro como no PDF */}
                    {modality.hasShield && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        {/* Escudo Geométrico estilizado */}
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center opacity-35">
                          <svg
                            viewBox="0 0 200 240"
                            className="w-full h-full drop-shadow-[0_0_35px_rgba(184,255,0,0.3)]"
                            fill="none"
                          >
                            <path
                              d="M 100 10 L 180 45 C 180 130, 150 190, 100 230 C 50 190, 20 130, 20 45 Z"
                              stroke="#B8FF00"
                              strokeWidth="2"
                              fill="rgba(184,255,0,0.03)"
                            />
                            {/* Anéis de radar e retículo de monitoramento */}
                            <circle cx="100" cy="115" r="45" stroke="#B8FF00" strokeWidth="1" strokeDasharray="4 4" />
                            <circle cx="100" cy="115" r="25" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                            <line x1="100" y1="60" x2="100" y2="170" stroke="rgba(184,255,0,0.25)" strokeWidth="1" />
                            <line x1="45" y1="115" x2="155" y2="115" stroke="rgba(184,255,0,0.25)" strokeWidth="1" />
                          </svg>

                          {/* Ícone de Câmera discreto no centro do escudo */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-[#050505]/80 border border-[#B8FF00]/40 text-[#B8FF00]">
                            <Camera className="w-6 h-6 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Fotografia Studio do Carro em Destaque */}
                    <div className="relative z-10 w-full max-w-[620px] transition-all duration-700 transform hover:scale-[1.02]">
                      {/* Reflexo sutil do chão preto */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-[#B8FF00]/10 blur-xl rounded-full pointer-events-none" />

                      <img
                        src={modality.carImage}
                        alt={modality.carAlt}
                        className="w-full h-auto max-h-[220px] sm:max-h-[300px] lg:max-h-[340px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] rounded-xl"
                      />
                    </div>
                  </div>
                ) : (
                  // Estado Inativo: Silhueta mínima ou indicação discreta
                  <div className="hidden lg:flex flex-1 items-center justify-center my-auto opacity-30">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 rotate-90 transform origin-center whitespace-nowrap">
                      Clique para expandir
                    </span>
                  </div>
                )}

                {/* --- FOOTER DO BLOCO / COLUNA --- */}
                <div className="flex-shrink-0 pt-4 flex items-center justify-between text-xs font-mono">
                  {isActive ? (
                    <div className="flex items-center gap-2 text-[#B8FF00]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                      <span>CATEGORIA SELECIONADA</span>
                    </div>
                  ) : (
                    <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                      {modality.name} • BAHCAR
                    </span>
                  )}

                  <span className="text-neutral-500">
                    {idx + 1} de {MODALITIES.length}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        {/* RODAPÉ INFORMATIVO DA SEÇÃO */}
        <div className="flex-shrink-0 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00]" />
            <span>Role para alternar entre POP, BLACK e GUARD ou clique nas colunas</span>
          </div>
          <span className="text-neutral-400">
            Santa Maria — RS • Mobilidade Urbana
          </span>
        </div>
      </section>
    </div>
  );
};

export default Modalities;
