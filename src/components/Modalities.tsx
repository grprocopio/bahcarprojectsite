import React, { useState } from 'react';

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
  const currentModality = MODALITIES_DATA.find((m) => m.id === activeTab) || MODALITIES_DATA[0];

  return (
    <section
      id="modalidades"
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 bg-[#050505] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Background idêntico e contínuo com a página (#050505) */}

      {/* CABEÇALHO */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pb-6 sm:pb-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white uppercase leading-none">
              MODALIDADES <span className="text-[#B8FF00]">BAHCAR</span>
            </h2>
          </div>

          {/* Seletor Segmentado Fluido */}
          <div className="flex items-center gap-1 sm:gap-2 bg-[#0d1210] p-1.5 rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] w-full sm:w-auto">
            {MODALITIES_DATA.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-1 sm:flex-initial px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-heading font-black tracking-wider uppercase transition-all duration-300 active:scale-95 text-center ${
                    isActive
                      ? 'bg-[#B8FF00] text-black shadow-[0_0_25px_rgba(184,255,0,0.45)]'
                      : 'text-neutral-400 hover:text-white bg-transparent'
                  }`}
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
      <div className="relative z-10 w-full max-w-7xl mx-auto py-8 sm:py-12">
        
        {/* --- VISÃO MOBILE & TABLET (< lg): Aberto direto na página, sem quadrado/box e sem textos embaixo dos carros --- */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="w-full flex flex-col">
            
            {/* Título direto da modalidade */}
            <h3 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              {currentModality.name}
            </h3>

            {/* Frase descritiva em destaque verde-limão */}
            <p className="mt-3 text-xl sm:text-2xl font-bold text-[#B8FF00] leading-snug">
              {currentModality.tagline}
            </p>

            {/* Imagem do Veículo / Modalidade Solta e Grande na Página (sem texto embaixo) */}
            <div className="relative w-full my-4 flex items-center justify-center">
              <img
                key={currentModality.id}
                src={currentModality.imageSrc}
                alt={currentModality.alt}
                className="w-full max-w-[500px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-300"
              />
            </div>

          </div>
        </div>

        {/* --- VISÃO DESKTOP (lg+): Solto diretamente na página, sem borda de card --- */}
        <div className="hidden lg:block relative w-full aspect-[1490/656] min-h-[500px] max-h-[640px] flex items-center justify-center overflow-hidden">
          {MODALITIES_DATA.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out will-change-[opacity,transform] ${
                  isActive
                    ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                    : 'opacity-0 scale-[0.985] z-0 pointer-events-none'
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

        {/* Especificações no Rodapé para Desktop (direto na página) */}
        <div className="hidden lg:grid grid-cols-3 gap-8 pt-8 mt-6 border-t border-white/10">
          {currentModality.specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-4 py-2">
              <div className="w-3 h-3 rounded-full bg-[#B8FF00] shadow-[0_0_12px_#B8FF00] shrink-0" />
              <div>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{spec.label}</p>
                <p className="text-lg font-bold text-white">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Modalities;
