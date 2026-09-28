import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeartHandshake, ShieldCheck, Smartphone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DifferentialItem {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DIFFERENTIALS: DifferentialItem[] = [
  {
    number: '01',
    title: 'Atendimento humanizado',
    description: 'Suporte com pessoas reais, acessível e presente para resolver o que você precisa sem mensagens automáticas sem fim.',
    icon: HeartHandshake,
  },
  {
    number: '02',
    title: 'Valorização do motorista',
    description: 'Relação baseada em transparência contínua, respeito à rotina e escuta ativa de quem faz a cidade girar todos os dias.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Tecnologia simples',
    description: 'Um aplicativo direto ao ponto. Conexão rápida entre chamada e embarque, sem passos desnecessários ou complexidade.',
    icon: Smartphone,
  },
  {
    number: '04',
    title: 'Identidade local',
    description: 'Pensada, criada e operada a partir da realidade de Santa Maria, conhecendo cada rota, bairro e necessidade da região.',
    icon: MapPin,
  },
];

export const Differentials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      const items = itemsContainerRef.current?.querySelectorAll('.diff-item');
      if (items && items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: itemsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="motoristas"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#050505] text-white border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.25em] text-[#B8FF00] font-semibold">
            <span>02 · Diferenciais</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.12] text-balance">
            Mais próxima de quem move a cidade.
          </h2>
        </div>

        {/* 
          Editorial Composition (Not generic cards)
          Hairline grid dividers, typography-first, minimal icons & subtle lines
        */}
        <div
          ref={itemsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-b border-white/10"
        >
          {DIFFERENTIALS.slice(0, 2).map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="diff-item group relative p-8 sm:p-12 lg:p-14 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                {/* Subtle top indicator line on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#B8FF00] transition-all duration-500 group-hover:w-full" />
                
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs sm:text-sm font-mono tracking-widest text-[#B8FF00]">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-[#B8FF00] group-hover:border-[#B8FF00]/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight mb-4 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
          {DIFFERENTIALS.slice(2, 4).map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="diff-item group relative p-8 sm:p-12 lg:p-14 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#B8FF00] transition-all duration-500 group-hover:w-full" />

                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs sm:text-sm font-mono tracking-widest text-[#B8FF00]">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-[#B8FF00] group-hover:border-[#B8FF00]/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight mb-4 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
