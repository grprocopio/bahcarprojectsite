import React, { useState } from 'react';

interface ModalityOption {
  id: 'pop' | 'black' | 'guard';
  name: string;
  imageSrc: string;
  alt: string;
}

const MODALITIES_DATA: ModalityOption[] = [
  {
    id: 'pop',
    name: 'POP',
    imageSrc: '/images/pop1.png',
    alt: 'BahCar Modalidade POP - Deslocamento padrão e praticidade no dia a dia',
  },
  {
    id: 'black',
    name: 'BLACK',
    imageSrc: '/images/black2.png',
    alt: 'BahCar Modalidade BLACK - Experiência premium em veículos e atendimento',
  },
  {
    id: 'guard',
    name: 'GUARD',
    imageSrc: '/images/guard3.png',
    alt: 'BahCar Modalidade GUARD - Acompanhamento em tempo real e tranquilidade',
  },
];

export const Modalities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pop' | 'black' | 'guard'>('pop');

  return (
    <section
      id="modalidades"
      className="relative w-full py-12 sm:py-20 bg-[#050505] text-white overflow-hidden"
    >
      {/* Luz ambiente de fundo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#B8FF00]/[0.025] rounded-full blur-[140px] pointer-events-none" />

      {/* Container expandido para visualização máxima */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quadradinho / Box expandido com as modalidades e os seletores internos */}
        <div className="relative w-full aspect-[1490/656] min-h-[280px] sm:min-h-[420px] lg:min-h-[540px] rounded-2xl sm:rounded-3xl bg-[#040709] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-center">
          
          {/* Seletor posicionado DENTRO do quadradinho (sem números, apenas POP / BLACK / GUARD) */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-6 lg:top-7 lg:right-8 z-30">
            <div className="flex items-center gap-1 sm:gap-2 bg-[#050505]/80 hover:bg-[#050505]/95 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.8)] transition-all">
              {MODALITIES_DATA.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-heading font-black tracking-wider uppercase transition-all duration-300 active:scale-95 ${
                      isActive
                        ? 'bg-[#B8FF00] text-black shadow-[0_0_20px_rgba(184,255,0,0.4)]'
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

          {/* Iluminação de borda interna verde BahCar super sutil */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl border border-[#B8FF00]/15 shadow-[inset_0_0_40px_rgba(184,255,0,0.02)] z-20" />

          {/* Imagens das Modalidades com transição suave ao clicar */}
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
                  className="w-full h-full object-contain select-none contrast-[1.04] brightness-[1.01]"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                  loading="eager"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Modalities;
