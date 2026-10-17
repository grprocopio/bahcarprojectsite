import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollPosition';

interface ModalityItem {
  id: 'pop' | 'plus' | 'confort' | 'black';
  name: string;
  yearRule: string;
  summary: string;
  highlights: string[];
  imageSrc: string;
  alt: string;
  models?: string[];
}

const MODALITIES_LIST: ModalityItem[] = [
  {
    id: 'pop',
    name: 'POP',
    yearRule: '2011 em diante',
    summary: 'Mobilidade ágil, prática e acessível para o dia a dia em Santa Maria.',
    highlights: ['Carros a partir de 2011', '4 portas com ar-condicionado'],
    imageSrc: '/images/bahcar_real_pop.jpg',
    alt: 'BahCar POP - Carros a partir de 2011',
  },
  {
    id: 'plus',
    name: 'PLUS',
    yearRule: 'Hatch e Elétrico (2023 em diante)',
    summary: 'Veículos hatch e elétricos modernos, confortáveis e eficientes.',
    highlights: ['Hatch e Elétrico', 'Ano 2023 em diante'],
    imageSrc: '/images/bahcar_real_plus.jpg',
    alt: 'BahCar PLUS - Hatch e Elétrico',
  },
  {
    id: 'confort',
    name: 'CONFORT SEDAN',
    yearRule: 'Sedans 2019 em diante',
    summary: 'Porta-malas espaçoso e conforto extra para viagens, compras e famílias.',
    highlights: ['Sedãs a partir de 2019', 'Porta-malas amplo'],
    imageSrc: '/images/bahcar_real_confort.jpg',
    alt: 'BahCar CONFORT SEDAN - Sedãs a partir de 2019',
    models: [
      'Onix Plus',
      'Versa',
      'Virtus',
      'Cronos',
      'Yaris Sedan',
      'HB20S',
      'Kicks',
      'Duster',
      'Peugeot 2008',
    ],
  },
  {
    id: 'black',
    name: 'BLACK',
    yearRule: 'Modelos Homologados',
    summary: 'Padrão executivo premium com os motoristas parceiros mais bem avaliados.',
    highlights: ['Modelos homologados', 'Motoristas Top-Rated'],
    imageSrc: '/images/bahcar_real_black.jpg',
    alt: 'BahCar BLACK - Categoria executiva',
    models: [
      'Corolla',
      'Creta',
      'BYD Dolphin',
      'Tracker',
      'Sentra 25/26',
      'Duster 24/25/26',
      'Cerato',
      'Jetta',
      'Kicks',
    ],
  },
];

export const Modalities: React.FC = () => {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.02 });
  const [showroomRef, showroomVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.02 });
  const [detailsRef, detailsVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.02 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const touchStartXRef = useRef<number>(0);
  const touchDeltaXRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentModality = MODALITIES_LIST[activeIndex];

  const selectModality = useCallback((index: number) => {
    if (index === activeIndex || isAnimating) return;
    setDirection(index > activeIndex ? 'right' : 'left');
    setIsAnimating(true);
    setActiveIndex(index);
    setShowModels(false);
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

  useEffect(() => {
    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MODALITIES_LIST.length);
      setShowModels(false);
    }, 10000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [activeIndex]);

  const resetAutoTimer = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % MODALITIES_LIST.length);
        setShowModels(false);
      }, 10000);
    }
  };

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
      className="relative w-full py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-16 bg-[#050608] text-white overflow-hidden select-none"
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center"
      >
        {/* TÍTULO E NAVEGAÇÃO DA SEÇÃO */}
        <div
          ref={headerRef}
          className={`w-full flex flex-col items-center scroll-reveal ${headerVisible ? 'is-revealed' : ''}`}
        >
          <div className="w-full text-center pb-8 sm:pb-12">
            <h2
              className="text-[clamp(2rem,5.5vw,4.5rem)] italic font-black uppercase tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
            >
              <span>MODALIDADES </span>
              <span className="text-[#B8FF00] drop-shadow-[0_0_28px_rgba(184,255,0,0.35)]">
                BAH CAR
              </span>
            </h2>
          </div>

          {/* NAVEGAÇÃO ENTRE AS 4 MODALIDADES */}
          <div className="w-full flex items-center justify-center pb-6 sm:pb-10">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-[#0d0f17]/85 backdrop-blur-md border border-white/10 max-w-full">
              {MODALITIES_LIST.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      resetAutoTimer();
                      selectModality(idx);
                    }}
                    className={`relative px-3 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-black italic tracking-wide uppercase transition-all duration-300 cursor-pointer text-xs sm:text-base md:text-xl leading-none ${
                      isActive
                        ? 'bg-[#B8FF00] text-black shadow-[0_0_25px_rgba(184,255,0,0.5)] scale-105'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                    style={{ fontFamily: "'Kanit', 'Saira', sans-serif" }}
                    aria-label={`Ver categoria ${item.name}`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SHOWROOM DO VEÍCULO COM FOTOS REALISTAS NACIONAIS (Sem cortar o carro no mobile/tablet) */}
        <div
          ref={showroomRef}
          className={`relative w-full flex items-center justify-center py-1 sm:py-4 scroll-reveal scroll-reveal-delay-1 ${showroomVisible ? 'is-revealed' : ''}`}
        >
          <button
            onClick={() => {
              resetAutoTimer();
              prevModality();
            }}
            className="hidden lg:flex absolute left-0 xl:-left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-[#0d0f17]/85 border border-white/15 hover:border-[#B8FF00] text-white hover:text-[#B8FF00] transition-all cursor-pointer shadow-2xl backdrop-blur-md"
            aria-label="Modalidade anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              resetAutoTimer();
              nextModality();
            }}
            className="hidden lg:flex absolute right-0 xl:-right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-[#0d0f17]/85 border border-white/15 hover:border-[#B8FF00] text-white hover:text-[#B8FF00] transition-all cursor-pointer shadow-2xl backdrop-blur-md"
            aria-label="Próxima modalidade"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-[1180px] aspect-[16/9] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-[#06080e] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            <img
              key={currentModality.id}
              src={currentModality.imageSrc}
              alt={currentModality.alt}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = 'true';
                  target.src = '/images/bahcar_pop.jpg';
                }
              }}
              className={`w-full h-full object-cover object-center select-none transform-gpu transition-all duration-500 ease-out ${
                direction === 'right' ? 'animate-drive-in-right' : 'animate-drive-in-left'
              }`}
              loading="eager"
            />
            {/* Suave degradê inferior apenas na base extrema (sem cobrir rodas/chassi no mobile) */}
            <div className="absolute inset-x-0 bottom-0 h-10 sm:h-16 lg:h-24 bg-gradient-to-t from-[#050608] via-[#050608]/40 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CONTEÚDO EDITORIAL BREVE E PROFISSIONAL */}
        <div
          ref={detailsRef}
          className={`w-full max-w-5xl mx-auto mt-5 sm:mt-8 pt-2 scroll-reveal scroll-reveal-delay-1 ${detailsVisible ? 'is-revealed' : ''}`}
        >
          
          {/* Header da Categoria com Nome e Regra */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-4 pb-4 border-b border-white/10">
            <div className="flex items-baseline gap-2.5 sm:gap-5 flex-wrap">
              <h3
                className="text-3xl sm:text-5xl md:text-7xl italic font-black uppercase tracking-tight text-white leading-none"
                style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
              >
                {currentModality.name}
              </h3>
              <span
                className="text-sm sm:text-lg md:text-2xl font-bold italic tracking-wide text-[#B8FF00]"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                {currentModality.yearRule}
              </span>
            </div>

            {/* Destaques sem pílulas artificiais (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300 flex-wrap shrink-0">
              {currentModality.highlights.map((h, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-[#B8FF00]/60 font-bold" aria-hidden="true">·</span>}
                  <span>{h}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Resumo Breve & Botão de Veículos Disponíveis */}
          <div className="pt-3 sm:pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-medium max-w-xl leading-relaxed">
              {currentModality.summary}
            </p>

            {/* Botão: Veja os veículos disponíveis */}
            {currentModality.models && (
              <div className="flex flex-col items-start md:items-end">
                <button
                  onClick={() => setShowModels((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold italic uppercase tracking-wider bg-[#0d0f17]/85 border border-white/15 hover:border-[#B8FF00]/60 text-white hover:text-[#B8FF00] transition-all cursor-pointer shadow-md active:scale-95"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  <span>{showModels ? 'Ocultar veículos' : 'Veja os veículos disponíveis'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showModels ? 'rotate-180 text-[#B8FF00]' : 'text-neutral-400'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Lista Revelada dos Veículos Homologados quando clicado */}
          {showModels && currentModality.models && (
            <div className="mt-4 sm:mt-5 p-4 sm:p-6 rounded-2xl bg-[#0c0e14]/90 backdrop-blur-xl border border-white/10 shadow-xl animate-fadeIn">
              <span className="block text-xs uppercase font-mono tracking-widest text-[#B8FF00] mb-2.5 sm:mb-3">
                Modelos Pré-Aprovados:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                {currentModality.models.map((model, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold italic uppercase tracking-wider bg-[#111420]/80 border border-white/10 text-neutral-200"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navegação Inferior Sutil */}
          <div className="w-full flex justify-center items-center mt-8 gap-2">
            {MODALITIES_LIST.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  resetAutoTimer();
                  selectModality(dotIdx);
                }}
                className={`h-1 transition-all duration-300 cursor-pointer ${
                  activeIndex === dotIdx
                    ? 'w-10 bg-[#B8FF00]'
                    : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ir para categoria ${dotIdx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Modalities;
