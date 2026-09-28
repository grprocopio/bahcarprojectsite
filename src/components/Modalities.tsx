import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Compass, ArrowRight, Info, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Modality {
  id: 'pop' | 'black' | 'guard';
  name: string;
  tagline: string;
  description: string;
  pillColor: string;
  attributes: string[];
  routeExample: {
    origin: string;
    destination: string;
    estimate: string;
  };
  note?: string;
}

const MODALITIES: Modality[] = [
  {
    id: 'pop',
    name: 'POP',
    tagline: 'Praticidade para o dia a dia.',
    description: 'Deslocamentos ágeis para a sua rotina em Santa Maria. Conexão rápida com motoristas parceiros próximos para você nunca perder tempo.',
    pillColor: '#B8FF00',
    attributes: ['Embarque rápido', 'Rotina urbana', 'Motoristas locais avaliados'],
    routeExample: {
      origin: 'Calçadão Salvador Isaia, Centro',
      destination: 'Campus UFSM, Camobi',
      estimate: '14 min',
    },
  },
  {
    id: 'black',
    name: 'BLACK',
    tagline: 'Uma experiência diferenciada.',
    description: 'Carros com maior espaço interno, acabamento refinado e conforto térmico. O padrão ideal para reuniões, eventos e viagens que pedem algo especial.',
    pillColor: '#FFFFFF',
    attributes: ['Veículos premium', 'Conforto acústico e espaço', 'Atendimento de alto padrão'],
    routeExample: {
      origin: 'Avenida Medianeira',
      destination: 'Aeroporto de Santa Maria (RIA)',
      estimate: '18 min',
    },
  },
  {
    id: 'guard',
    name: 'GUARD',
    tagline: 'Mais acompanhamento durante a corrida.',
    description: 'Uma categoria projetada com camadas adicionais de tranquilidade, possibilitando o compartilhamento de rota em tempo real com contatos de confiança.',
    pillColor: '#B8FF00',
    attributes: ['Rota monitorada', 'Botão de assistência dedicado', 'Protocolo preventivo'],
    routeExample: {
      origin: 'Av. Presidente Vargas',
      destination: 'Bairro Dores',
      estimate: '11 min',
    },
    note: 'Nota de conformidade: qualquer menção a recursos de videomonitoramento está sujeita à validação técnica de equipamentos homologados e à estrita observância das regras de privacidade (LGPD).',
  },
];

interface ModalitiesProps {
  onOpenPrivacy: () => void;
  onOpenLaunch: () => void;
}

export const Modalities: React.FC<ModalitiesProps> = ({ onOpenPrivacy, onOpenLaunch }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const currentModality = MODALITIES[activeTab];

  useEffect(() => {
    // Subtle cross-fade animation when tab changes
    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0.6, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <section
      id="modalidades"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 bg-[#050505] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Background glow tailored to active modality */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#B8FF00]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.25em] text-[#B8FF00] font-semibold">
            <span>03 · Modalidades</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.12]">
            Uma BahCar para cada momento.
          </h2>
        </div>

        {/* 
          Premium Segmented Selector (Not generic cards side by side)
        */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-6 mb-12 sm:mb-16 overflow-x-auto no-scrollbar">
          {MODALITIES.map((modality, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={modality.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-6 py-3 rounded-xl font-heading font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 flex items-center gap-3 whitespace-nowrap ${
                  isActive
                    ? 'text-black bg-[#B8FF00] shadow-[0_0_20px_rgba(184,255,0,0.3)]'
                    : 'text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{modality.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* 
          Main Spotlight Stage (Editorial Split View)
        */}
        <div
          ref={stageRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left Column: Big typography & narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8FF00] font-mono">
              <span>Modalidade {currentModality.name}</span>
            </div>

            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
              {currentModality.tagline}
            </h3>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
              {currentModality.description}
            </p>

            {/* Key attributes */}
            <div className="pt-4 space-y-3">
              {currentModality.attributes.map((attr, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-neutral-200">
                  <div className="w-5 h-5 rounded-full bg-[#B8FF00]/10 flex items-center justify-center text-[#B8FF00] shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{attr}</span>
                </div>
              ))}
            </div>

            {/* Note for GUARD if applicable */}
            {currentModality.note && (
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-400 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#B8FF00] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span>{currentModality.note}</span>
                  <div>
                    <button
                      onClick={onOpenPrivacy}
                      className="text-[#B8FF00] hover:underline font-medium inline-flex items-center gap-1 mt-1"
                    >
                      Ler detalhes de privacidade
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6">
              <button
                onClick={onOpenLaunch}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-heading font-bold text-black bg-[#B8FF00] hover:bg-[#c9ff2e] px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(184,255,0,0.2)] hover:shadow-[0_0_25px_rgba(184,255,0,0.35)]"
              >
                <span>Experimentar {currentModality.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage / App Interface Simulation */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-[#0d0d0d] border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl">
              {/* Subtle map / radar grid background */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#B8FF00_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-lg text-white">
                      BAH<span className="text-[#B8FF00]">CAR</span>
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white font-mono uppercase">
                      {currentModality.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                    <Compass className="w-3.5 h-3.5 text-[#B8FF00]" />
                    <span>Santa Maria · Ao vivo</span>
                  </div>
                </div>

                {/* Simulated Santa Maria Route Card */}
                <div className="bg-[#141414] rounded-xl p-5 border border-white/5 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#B8FF00] mt-1 shrink-0" />
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono">Partida</div>
                        <div className="text-sm font-medium text-white">{currentModality.routeExample.origin}</div>
                      </div>
                    </div>

                    <div className="w-[1px] h-4 bg-white/20 ml-1" />

                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-white mt-1 shrink-0" />
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono">Destino</div>
                        <div className="text-sm font-medium text-white">{currentModality.routeExample.destination}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Tempo estimado</span>
                    <span className="text-white font-mono font-bold text-sm">~{currentModality.routeExample.estimate}</span>
                  </div>
                </div>

                {/* Guarantee badge */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B8FF00]" />
                    <span>Plataforma local com suporte em Santa Maria</span>
                  </div>
                  <span className="text-[#B8FF00] font-mono text-[11px]">100% RS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
