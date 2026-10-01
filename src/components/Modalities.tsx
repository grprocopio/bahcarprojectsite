import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalityItem {
  id: 'pop' | 'black' | 'guard';
  name: string;
  tagline: string;
  description: string;
  imageSrc: string;
  mobileImageSrc: string;
  alt: string;
  highlights: string[];
}

const MODALITIES_LIST: ModalityItem[] = [
  {
    id: 'pop',
    name: 'POP',
    tagline: 'Deslocamento prático, ágil e acessível.',
    description: 'A categoria pensada para a dinâmica diária de Santa Maria, unindo alta disponibilidade de motoristas, resposta rápida e o melhor custo por quilômetro rodado.',
    imageSrc: '/images/pop1.png',
    mobileImageSrc: '/images/pop_single.png',
    alt: 'BahCar POP - Mobilidade urbana prática e acessível',
    highlights: ['Até 4 passageiros', 'Maior disponibilidade', 'Melhor custo-benefício'],
  },
  {
    id: 'black',
    name: 'BLACK',
    tagline: 'Sofisticação, conforto e padrão executivo.',
    description: 'Veículos sedãs e SUVs selecionados, ar-condicionado sempre ligado e motoristas parceiros com as pontuações mais altas da plataforma para uma viagem impecável.',
    imageSrc: '/images/black2.png',
    mobileImageSrc: '/images/black_single.png',
    alt: 'BahCar BLACK - Categoria executiva premium',
    highlights: ['Sedãs e SUVs selecionados', 'Acabamento superior', 'Motoristas Top-Rated'],
  },
  {
    id: 'guard',
    name: 'GUARD',
    tagline: 'Segurança reforçada e proteção tecnológica.',
    description: 'Viagens com protocolos dedicados de segurança, supervisão ativa de trajeto e suporte preferencial para passageiros que priorizam tranquilidade total.',
    imageSrc: '/images/guard3.png',
    mobileImageSrc: '/images/guard_single.png',
    alt: 'BahCar GUARD - Proteção e segurança inteligente',
    highlights: ['Rota supervisionada', 'Canal prioritário', 'Protocolo preventivo'],
  },
];

export const Modalities: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartXRef = useRef<number>(0);
  const touchDeltaXRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentModality = MODALITIES_LIST[activeIndex];

  // Troca de modalidade rápida e fluida (duração total da transição ~320ms)
  const selectModality = useCallback((index: number) => {
    if (index === activeIndex || isAnimating) return;
    setDirection(index > activeIndex ? 'right' : 'left');
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 320);
  }, [activeIndex, isAnimating]);

  const nextModality = useCallback(() => {
    const nextIdx = (activeIndex + 1) % MODALITIES_LIST.length;
    selectModality(nextIdx);
  }, [activeIndex, selectModality]);

  const prevModality = useCallback(() => {
    const prevIdx = (activeIndex - 1 + MODALITIES_LIST.length) % MODALITIES_LIST.length;
    selectModality(prevIdx);
  }, [activeIndex, selectModality]);

  // Transição automática suave a cada 7 segundos caso o usuário não interaja
  useEffect(() => {
    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MODALITIES_LIST.length);
    }, 7000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [activeIndex]);

  const resetAutoTimer = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % MODALITIES_LIST.length);
      }, 7000);
    }
  };

  // Gestos de toque horizontal (Swipe rápido no celular e tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    resetAutoTimer();
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    isSwipingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipingRef.current) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current) return;
    isSwipingRef.current = false;
    const delta = touchDeltaXRef.current;
    if (delta < -40) {
      nextModality();
    } else if (delta > 40) {
      prevModality();
    }
  };

  return (
    <section
      id="modalidades"
      className="relative w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 bg-transparent text-white overflow-hidden select-none"
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center"
      >
        {/* TÍTULO MODALIDADES PREVISTAS NO APLICATIVO COM FONTE GROSSA E IMPACTANTE */}
        <div className="w-full text-center pb-6 sm:pb-8">
          <h2
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl italic font-black uppercase tracking-[0.03em] leading-tight text-white"
            style={{ fontFamily: "'Kanit', 'Montserrat', sans-serif", fontWeight: 900 }}
          >
            <span>MODALIDADES PREVISTAS </span>
            <span className="text-[#B8FF00]">
              NO APLICATIVO
            </span>
          </h2>
        </div>

        {/* NAVEGAÇÃO PRINCIPAL DAS MODALIDADES: POP | BLACK | GUARD */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-12">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-2xl">
            {MODALITIES_LIST.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    resetAutoTimer();
                    selectModality(idx);
                  }}
                  className={`relative px-6 sm:px-10 md:px-12 py-3 sm:py-3.5 rounded-xl font-black italic tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#B8FF00] text-black shadow-[0_0_28px_rgba(184,255,0,0.5)] scale-[1.03]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  style={{ fontFamily: "'Kanit', 'Saira', sans-serif" }}
                  aria-label={`Selecionar modalidade ${item.name}`}
                >
                  <span className="text-xl sm:text-2xl md:text-3xl leading-none">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTAINER PRINCIPAL DA EXPERIÊNCIA INTERATIVA (EXPANDIDO PARA MOBILE) */}
        <div className="relative w-full px-1 sm:px-16 lg:px-20 py-2 sm:py-6 overflow-visible flex flex-col items-center">
          
          {/* Botões de navegação lateral para desktop e tablet - posicionados bem nas pontas externas para nunca sobrepor o conteúdo */}
          <button
            onClick={() => {
              resetAutoTimer();
              prevModality();
            }}
            className="hidden md:flex absolute -left-2 lg:-left-6 xl:-left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#B8FF00]/60 text-white hover:text-[#B8FF00] transition-all duration-200 cursor-pointer active:scale-95 shadow-2xl backdrop-blur-md"
            aria-label="Modalidade anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              resetAutoTimer();
              nextModality();
            }}
            className="hidden md:flex absolute -right-2 lg:-right-6 xl:-right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#B8FF00]/60 text-white hover:text-[#B8FF00] transition-all duration-200 cursor-pointer active:scale-95 shadow-2xl backdrop-blur-md"
            aria-label="Próxima modalidade"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* ÁREA CENTRAL: O CARRO DA MODALIDADE ATIVA (EXPANDIDO EM MOBILE E DESKTOP) */}
          <div className="relative w-full flex items-center justify-center min-h-[200px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[640px] my-2 sm:my-6 transform-gpu overflow-visible">
            <picture className="w-full flex items-center justify-center">
              {/* No mobile (telas até 640px), carrega o card dedicado ampliado da modalidade selecionada */}
              <source
                media="(max-width: 640px)"
                srcSet={currentModality.mobileImageSrc}
              />
              {/* Em tablets e desktops, carrega a visão expandida completa */}
              <img
                key={currentModality.id}
                src={currentModality.imageSrc}
                alt={currentModality.alt}
                width={1488}
                height={518}
                className={`relative z-10 w-full max-w-[96vw] sm:max-w-[750px] md:max-w-[960px] lg:max-w-[1180px] xl:max-w-[1360px] 2xl:max-w-[1450px] h-auto object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.96)] select-none transform-gpu transition-all duration-300 ease-out ${
                  direction === 'right' ? 'animate-drive-in-right' : 'animate-drive-in-left'
                }`}
                loading="eager"
              />
            </picture>
          </div>

          {/* Destaques Rápidos da Categoria (limpo, sem blocos de texto compridos) */}
          <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center mt-3 sm:mt-5">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {currentModality.highlights.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Indicador Minimalista Inferior (Toque / Mobile) */}
            <div className="mt-6 sm:mt-8 flex items-center gap-2.5">
              {MODALITIES_LIST.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    resetAutoTimer();
                    selectModality(dotIdx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === dotIdx
                      ? 'w-8 bg-[#B8FF00] shadow-[0_0_10px_rgba(184,255,0,0.8)]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir para slide ${dotIdx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Modalities;
