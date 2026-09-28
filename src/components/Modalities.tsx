import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Info, Sparkles, Navigation, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ModalityItem {
  id: 'pop' | 'black' | 'guard';
  index: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  carImage: string;
  carAlt: string;
  themeColor: string;
  atmosphere: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MODALITIES_DATA: ModalityItem[] = [
  {
    id: 'pop',
    index: '01',
    name: 'POP',
    tagline: 'Praticidade para o dia a dia.',
    description: 'A categoria essencial da BahCar. Carros ágeis e acessíveis para seus deslocamentos cotidianos por toda Santa Maria, com embarque rápido e conexão direta.',
    badge: 'Urbano & Acessível',
    carImage: '/images/bahcar_pop_car_1790556191193.jpg',
    carAlt: 'Veículo categoria BahCar POP em cenário urbano',
    themeColor: '#B8FF00',
    atmosphere: 'Ritmo da Cidade',
    icon: Navigation,
  },
  {
    id: 'black',
    index: '02',
    name: 'BLACK',
    tagline: 'Uma experiência diferenciada.',
    description: 'Veículos de categoria superior com maior espaço interno, acabamento sofisticado e conforto acústico. O padrão ideal para compromissos executivos e ocasiões especiais.',
    badge: 'Conforto & Refinamento',
    carImage: '/images/bahcar_black_car_1790556200632.jpg',
    carAlt: 'Sedan executivo categoria BahCar BLACK',
    themeColor: '#E2E8F0',
    atmosphere: 'Padrão Superior',
    icon: Sparkles,
  },
  {
    id: 'guard',
    index: '03',
    name: 'GUARD',
    tagline: 'Mais acompanhamento durante a corrida.',
    description: 'A tranquilidade de viajar com suporte e atenção dedicados. Compartilhamento do trajeto em tempo real com contatos de confiança para você se deslocar com total serenidade.',
    badge: 'Acompanhamento & Cuidado',
    carImage: '/images/bahcar_guard_car_1790556208798.jpg',
    carAlt: 'Veículo categoria BahCar GUARD em rodovia ao entardecer',
    themeColor: '#B8FF00',
    atmosphere: 'Atenção Dedicada',
    icon: ShieldCheck,
  },
];

export const Modalities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for texts & images
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

      // Initial state: Item 0 is 100% visible, Items 1 and 2 are hidden
      items.forEach((item, idx) => {
        if (idx === 0) {
          gsap.set(item, { opacity: 1, pointerEvents: 'auto', zIndex: 10 });
          gsap.set(item.querySelector('.mod-car-img'), { scale: 1 });
          gsap.set(item.querySelector('.mod-text-block'), { opacity: 1, y: 0 });
        } else {
          gsap.set(item, { opacity: 0, pointerEvents: 'none', zIndex: 1 });
          gsap.set(item.querySelector('.mod-car-img'), { scale: 1.06 });
          gsap.set(item.querySelector('.mod-text-block'), { opacity: 0, y: 30 });
        }
      });

      // Master ScrollTrigger timeline pinned for 220% of viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=240%',
          pin: pinSection,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              setActiveIndex(0);
            } else if (p < 0.7) {
              setActiveIndex(1);
            } else {
              setActiveIndex(2);
            }
          },
        },
      });

      // Segment 1: Hold POP
      tl.to({}, { duration: 1 });

      // Transition 1: POP -> BLACK (crossfade cinematográfico)
      tl.to(items[0], { opacity: 0, pointerEvents: 'none', duration: 0.8, ease: 'power2.inOut' }, 't1')
        .to(items[0].querySelector('.mod-text-block'), { opacity: 0, y: -20, duration: 0.7, ease: 'power2.inOut' }, 't1')
        .to(items[1], { opacity: 1, pointerEvents: 'auto', zIndex: 10, duration: 0.8, ease: 'power2.inOut' }, 't1+=0.1')
        .to(items[1].querySelector('.mod-car-img'), { scale: 1, duration: 1, ease: 'power2.out' }, 't1+=0.1')
        .to(items[1].querySelector('.mod-text-block'), { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 't1+=0.2');

      // Segment 2: Hold BLACK
      tl.to({}, { duration: 1 });

      // Transition 2: BLACK -> GUARD (crossfade cinematográfico)
      tl.to(items[1], { opacity: 0, pointerEvents: 'none', duration: 0.8, ease: 'power2.inOut' }, 't2')
        .to(items[1].querySelector('.mod-text-block'), { opacity: 0, y: -20, duration: 0.7, ease: 'power2.inOut' }, 't2')
        .to(items[2], { opacity: 1, pointerEvents: 'auto', zIndex: 10, duration: 0.8, ease: 'power2.inOut' }, 't2+=0.1')
        .to(items[2].querySelector('.mod-car-img'), { scale: 1, duration: 1, ease: 'power2.out' }, 't2+=0.1')
        .to(items[2].querySelector('.mod-text-block'), { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 't2+=0.2');

      // Segment 3: Hold GUARD
      tl.to({}, { duration: 1 });
    }, container);

    return () => ctx.revert();
  }, []);

  // Jump smoothly by clicking indicators
  const handleSelectModality = (idx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollDistance = window.innerHeight * 2.4;
    const targetScroll = containerTop + (idx / 2) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white">
      {/* Sticky Pinned Viewport */}
      <section
        ref={pinSectionRef}
        className="w-full h-screen flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden relative"
      >
        {/* Topo: Título da Seção & Seletor de Categoria */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-[#B8FF00]">
              EXPERIÊNCIAS DE MOBILIDADE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight mt-1 text-white uppercase">
              Modalidades
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
              Três experiências pensadas para diferentes formas de se mover.
            </p>
          </div>

          {/* Navegador Discreto de Categorias */}
          <div className="flex items-center gap-2 bg-white/[0.04] p-1 rounded-full border border-white/10 backdrop-blur-md">
            {MODALITIES_DATA.map((m, i) => (
              <button
                key={m.id}
                onClick={() => handleSelectModality(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeIndex === i
                    ? 'bg-[#B8FF00] text-black shadow-[0_0_25px_rgba(184,255,0,0.4)]'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                <span>{m.index}</span>
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Palco Central: 3 Apresentações de Produto com Veículo e Atmosfera Própria */}
        <div className="relative flex-1 w-full my-4 flex items-center justify-center">
          {MODALITIES_DATA.map((m, idx) => {
            const IconComponent = m.icon;
            const isGuard = m.id === 'guard';
            const isBlack = m.id === 'black';

            return (
              <div
                key={m.id}
                ref={(el) => { itemRefs.current[idx] = el; }}
                className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14"
              >
                {/* LADO ESQUERDO: Tipografia e Identidade da Modalidade */}
                <div className="mod-text-block w-full lg:w-5/12 flex flex-col justify-center z-10">
                  
                  {/* Badge de Atmosfera */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: m.themeColor }}
                    />
                    <span
                      className="font-mono text-xs uppercase tracking-widest"
                      style={{ color: m.themeColor }}
                    >
                      {m.badge}
                    </span>
                  </div>

                  {/* Nome Gigante da Categoria */}
                  <h3 className="text-6xl sm:text-7xl lg:text-8xl font-black font-heading tracking-tighter text-white uppercase leading-none">
                    {m.name}
                  </h3>

                  {/* Frase Curta Marcante */}
                  <p
                    className="mt-4 text-xl sm:text-2xl font-heading font-medium tracking-tight"
                    style={{ color: isBlack ? '#FFFFFF' : '#B8FF00' }}
                  >
                    "{m.tagline}"
                  </p>

                  {/* Descrição Concisa */}
                  <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-lg">
                    {m.description}
                  </p>

                  {/* Destaque sutil com ícone */}
                  <div className="mt-6 flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span>Categoria projetada para o padrão BahCar em Santa Maria</span>
                  </div>

                  {/* Observação Discreta Obrigatória para GUARD */}
                  {isGuard && (
                    <div className="mt-5 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-[11px] text-neutral-400 max-w-md">
                      <Info className="w-4 h-4 text-[#B8FF00] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        Acompanhamento preventivo de rota. Recursos de videomonitoramento dependem de validação técnica e das normas locais de privacidade.
                      </span>
                    </div>
                  )}
                </div>

                {/* LADO DIREITO: Apresentação Visual do Veículo (Editorial / Campanha) */}
                <div className="w-full lg:w-7/12 h-[260px] sm:h-[340px] lg:h-[440px] relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] bg-[#080B0E] group">
                  
                  {/* Fotografia Automotiva de Alta Resolução do Carro */}
                  <img
                    src={m.carImage}
                    alt={m.carAlt}
                    referrerPolicy="no-referrer"
                    className="mod-car-img w-full h-full object-cover object-center brightness-95 contrast-105 transition-transform duration-700"
                  />

                  {/* Vinhetas & Gradientes para Integração Cinematográfica com o Fundo Preto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent" />

                  {/* Linha de acabamento na base da foto */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${m.themeColor}80, transparent)`,
                    }}
                  />

                  {/* Selo no canto da imagem */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-wider text-neutral-300">
                    BAHCAR • {m.name}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Rodapé da Seção Pinned */}
        <div className="relative z-20 border-t border-white/5 pt-3 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Role para navegar pelas experiências</span>
          <span className="text-[#B8FF00] font-bold">
            0{activeIndex + 1} / 03 • {MODALITIES_DATA[activeIndex].name}
          </span>
        </div>
      </section>
    </div>
  );
};

export default Modalities;
