import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollPosition';

interface ModalityOption {
  id: 'pop' | 'black' | 'guard';
  name: string;
  tagline: string;
  description: string;
  subDescription?: string;
  imageSrc: string;
  alt: string;
  specs: { label: string; value: string }[];
}

const MODALITIES_DATA: ModalityOption[] = [
  {
    id: 'pop',
    name: 'POP',
    tagline: 'Praticidade para as corridas do dia a dia.',
    description: 'A modalidade mais acessível para circular por toda Santa Maria com agilidade, motoristas próximos e tarifa justa.',
    imageSrc: '/images/pop1.png',
    alt: 'BahCar Modalidade POP - Deslocamento padrão e praticidade no dia a dia',
    specs: [
      { label: 'Capacidade', value: 'Até 4 passageiros' },
      { label: 'Proposta', value: 'Melhor custo-benefício' },
      { label: 'Disponibilidade', value: 'Ampla em toda a cidade' },
    ],
  },
  {
    id: 'black',
    name: 'BLACK',
    tagline: 'Veículos e atendimento em uma categoria diferenciada.',
    description: 'Sedãs e SUVs selecionados de categoria superior, ar-condicionado obrigatório e os motoristas parceiros com as melhores avaliações.',
    imageSrc: '/images/black2.png',
    alt: 'BahCar Modalidade BLACK - Experiência premium em veículos e atendimento',
    specs: [
      { label: 'Veículos', value: 'Sedãs e SUVs selecionados' },
      { label: 'Conforto', value: 'Ar-condicionado e acabamento' },
      { label: 'Atendimento', value: 'Motoristas Top-Rated' },
    ],
  },
  {
    id: 'guard',
    name: 'GUARD',
    tagline: 'Videomonitoramento da corrida e proteção total.',
    subDescription: 'Sujeito à validação técnica e às regras de privacidade vigentes.',
    description: 'Segurança elevada com transmissão assistida, checagem contínua de trajeto e suporte imediato dedicado para você viajar em paz.',
    imageSrc: '/images/guard3.png',
    alt: 'BahCar Modalidade GUARD - Acompanhamento em tempo real e tranquilidade',
    specs: [
      { label: 'Monitoramento', value: 'Trajeto acompanhado' },
      { label: 'Segurança', value: 'Videomonitoramento opcional' },
      { label: 'Suporte', value: 'Canal prioritário dedicado' },
    ],
  },
];

export const Modalities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pop' | 'black' | 'guard'>('pop');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const currentModality = MODALITIES_DATA.find((m) => m.id === activeTab) || MODALITIES_DATA[0];

  const handleSelectTab = (tabId: 'pop' | 'black' | 'guard') => {
    if (tabId === activeTab) return;
    const order = ['pop', 'black', 'guard'];
    const currentIdx = order.indexOf(activeTab);
    const nextIdx = order.indexOf(tabId);
    setDirection(nextIdx > currentIdx ? 'right' : 'left');
    setActiveTab(tabId);
  };

  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const [displayRef, displayVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.10 });

  return (
    <section
      id="modalidades"
      className="relative w-full py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 xl:px-20 bg-[#050505] text-white border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* Background idêntico e contínuo com a página (#050505) com grade sutil */}
      <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none" />

      {/* CABEÇALHO COM A MESMA TIPOGRAFIA DA HERO */}
      <div
        ref={headerRef}
        className={`relative z-10 w-full max-w-[1500px] mx-auto pb-10 sm:pb-14 border-b border-white/[0.08] scroll-reveal ${headerVisible ? 'is-revealed' : ''}`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <div className="mb-3">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#B8FF00] uppercase">
                FROTA HOMOLOGADA EM SANTA MARIA
              </span>
            </div>

            <h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl italic font-black uppercase tracking-[0.02em] leading-none text-white"
              style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
            >
              <span>MODALIDADES</span>{' '}
              <span className="outline-text-hollow inline-block ml-1">
                BAHCAR.
              </span>
            </h2>
          </div>

          {/* Seletor Segmentado Estilo Cockpit / Display Esportivo */}
          <div className="flex items-center gap-1.5 bg-[#0a0a0a] p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto shadow-2xl">
            {MODALITIES_DATA.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex-1 sm:flex-initial px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm italic font-black uppercase tracking-wider transition-all duration-200 active:scale-95 text-center ${
                    isActive
                      ? 'bg-[#B8FF00] text-black shadow-[0_0_20px_rgba(184,255,0,0.3)]'
                      : 'text-neutral-400 hover:text-white bg-transparent'
                  }`}
                  style={{ fontFamily: "'Kanit', 'Saira', sans-serif" }}
                  aria-label={`Selecionar modalidade ${item.name}`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL: Sem quadrados/caixas - 100% integrado diretamente na página */}
      <div
        ref={displayRef}
        className={`relative z-10 w-full max-w-[1500px] mx-auto py-10 sm:py-14 scroll-reveal scroll-reveal-delay-1 ${displayVisible ? 'is-revealed' : ''}`}
      >
        
        {/* --- VISÃO MOBILE & TABLET (< lg): Aberto direto na página, sem quadrado/box e sem textos embaixo dos carros --- */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="w-full flex flex-col">
            
            {/* Título direto da modalidade com a tipografia oficial */}
            <h3
              className="text-5xl sm:text-7xl italic font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Kanit', 'Saira', sans-serif" }}
            >
              {currentModality.name}
            </h3>

            {/* Frase descritiva em destaque verde-limão */}
            <p className="mt-3 text-lg sm:text-2xl font-bold text-[#B8FF00] leading-snug">
              {currentModality.tagline}
            </p>

            {/* Imagem do Veículo / Modalidade Solta e Grande na Página com animação Drive-In */}
            <div className="relative w-full my-6 flex items-center justify-center overflow-hidden">
              <img
                key={`${currentModality.id}-${direction}`}
                src={currentModality.imageSrc}
                alt={currentModality.alt}
                className={`w-full max-w-[550px] h-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.95)] ${
                  direction === 'right' ? 'animate-drive-in-right' : 'animate-drive-in-left'
                }`}
              />
            </div>

          </div>
        </div>

        {/* --- VISÃO DESKTOP (lg+): Solto diretamente na página com animação Drive-In automotiva --- */}
        <div className="hidden lg:block relative w-full aspect-[1490/656] min-h-[500px] max-h-[640px] flex items-center justify-center overflow-hidden">
          {MODALITIES_DATA.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ease-out will-change-[opacity,transform] ${
                  isActive
                    ? `opacity-100 z-10 pointer-events-auto ${
                        direction === 'right' ? 'animate-drive-in-right' : 'animate-drive-in-left'
                      }`
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={item.imageSrc}
                  alt={item.alt}
                  className="w-full h-full object-contain select-none contrast-[1.05] brightness-[1.02]"
                  loading="eager"
                />
              </div>
            );
          })}
        </div>

        {/* Especificações no Rodapé para Desktop (direto na página estilo cockpit) */}
        <div className="hidden lg:grid grid-cols-3 gap-8 pt-10 mt-6 border-t border-white/[0.08]">
          {currentModality.specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-4 py-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B8FF00] shadow-[0_0_12px_#B8FF00] shrink-0" />
              <div>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">{spec.label}</p>
                <p className="text-base font-bold text-white tracking-wide">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Modalities;
