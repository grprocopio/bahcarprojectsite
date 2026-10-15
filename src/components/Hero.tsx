import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  onOpenPartner?: () => void;
  onOpenLaunch?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const image = imageRef.current;
    if (!text || !image) return;

    const ctx = gsap.context(() => {
      // Entrada cinematográfica e suave
      gsap.fromTo(
        image,
        { opacity: 0, scale: 1.04 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(image, { clearProps: 'transform' });
          },
        }
      );
      gsap.fromTo(
        text,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.15,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(text, { clearProps: 'transform' });
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100svh] min-h-[100dvh] lg:min-h-screen flex flex-col justify-start lg:justify-center bg-[#050608] z-10 touch-pan-y overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {/* BACKGROUND DA HERO:
          - No mobile (telas < 1024px): hero-mobile.jpg preenche 100% da tela em tela cheia (object-cover),
            com a cena ajustada para exibir a imagem inteira (cuia, celular e carro) e o topo/base esticados
            seguindo o padrão da imagem (fumaça/atmosfera no topo, asfalto molhado com reflexos verdes embaixo).
          - No desktop (lg): carromate.jpg original em 16:9 tela cheia (lg:object-cover). */}
      <div className="absolute inset-0 w-full h-full bg-[#050608] overflow-hidden pointer-events-none">
        <picture className="absolute inset-0 w-full h-full block">
          {/* Mobile: imagem ajustada em tela cheia contendo todos os elementos e esticada verticalmente no padrão */}
          <source
            media="(max-width: 1023px)"
            srcSet="/hero-mobile.jpg?v=4"
          />
          {/* Desktop */}
          <img
            ref={imageRef}
            src="/carromate.jpg"
            alt="BahCar Mobilidade"
            className="w-full h-full object-cover object-center select-none"
            style={{
              imageRendering: '-webkit-optimize-contrast',
            }}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </picture>

        {/* Degradê escuro suave: ~55% no topo, transparente no meio (preserva o carro e os faróis), ~70% na base */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5, 6, 8, 0.55) 0%, rgba(5, 6, 8, 0.20) 20%, rgba(5, 6, 8, 0) 42%, rgba(5, 6, 8, 0) 65%, rgba(5, 6, 8, 0.40) 85%, rgba(5, 6, 8, 0.70) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* 5 & 7. TIPOGRAFIA OFICIAL DA HERO:
          Título sobre a imagem, alinhado à esquerda, com respiro do topo para a navbar centralizada
          e dimensões svh/dvh para nada ficar cortado pelas barras dos navegadores mobile. */}
      <div
        ref={textRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-12 pt-28 sm:pt-32 md:pt-36 lg:pt-0 lg:-mt-12 xl:-mt-16 pointer-events-none"
      >
        <div className="max-w-4xl text-left pointer-events-auto lg:-translate-x-6 xl:-translate-x-10">
          {/* Headline Principal: PESSOAS MOVEM A CIDADE. A BAH CONECTA. */}
          <h1
            className="text-[clamp(2.6rem,8.8vw,3.75rem)] sm:text-6xl md:text-7xl lg:text-8xl italic font-black uppercase tracking-tight leading-[0.93] sm:leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span className="text-white block pb-1">
              Pessoas movem
            </span>
            <span className="text-white block pb-1">
              a cidade.
            </span>
            <div className="mt-2 flex items-baseline flex-wrap gap-x-3 sm:gap-x-4">
              <span className="text-white">
                A BAH
              </span>
              <span
                className="text-stroke-lime inline-block transform translate-y-1 tracking-wider font-black italic uppercase"
                style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
              >
                CONECTA.
              </span>
            </div>
          </h1>
        </div>
      </div>


      {/* Linha invisível de transição com a próxima seção */}
      <div
        className="absolute -bottom-1 inset-x-0 h-2 bg-[#050608] pointer-events-none z-20"
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
