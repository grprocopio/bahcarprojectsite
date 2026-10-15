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
    if (!text) return;

    const ctx = gsap.context(() => {
      // Suave entrada da imagem de fundo
      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        );
      }

      // Suave entrada do título
      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-[100vh] min-h-[660px] flex flex-col justify-start select-none bg-[#050608] overflow-hidden z-10"
    >
      {/* IMAGEM CARROMATE OFICIAL EM ALTA DEFINIÇÃO */}
      <div className="absolute inset-0 w-full h-full bg-[#050608] overflow-hidden">
        <img
          ref={imageRef}
          src="/carromate.jpg"
          alt="BahCar Mobilidade"
          className="absolute inset-0 w-full h-full object-cover object-center select-none will-change-transform"
          style={{
            imageRendering: '-webkit-optimize-contrast',
          }}
          loading="eager"
        />

        {/* Degradês suaves para legibilidade e transição sem costura */}
        <div
          className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#050608]/90 via-[#050608]/40 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#050608] via-[#050608]/85 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-1 inset-x-0 h-4 bg-[#050608] pointer-events-none z-20"
          aria-hidden="true"
        />
      </div>

      {/* TIPOGRAFIA OFICIAL DA HERO */}
      <div
        ref={textRef}
        className="relative z-20 w-full flex flex-col justify-start pt-28 sm:pt-32 md:pt-36 lg:pt-40 pl-6 sm:pl-10 md:pl-14 lg:pl-20 pr-6 shrink-0"
      >
        <div className="max-w-3xl text-left pointer-events-auto">
          {/* Headline Principal com Destaque e Fonte Contornada */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic font-black uppercase tracking-tight leading-[0.98] drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
          >
            <span className="text-white block pb-1">
              Pessoas movem
            </span>
            <span className="text-white block pb-1">
              a cidade.
            </span>
            <div className="mt-1 flex items-baseline flex-wrap gap-x-3 sm:gap-x-4">
              <span className="text-white">
                A BAH
              </span>
              <span
                className="text-stroke-lime inline-block transform translate-y-0.5 tracking-wider font-black italic uppercase"
                style={{ fontFamily: "'Kanit', 'Saira', sans-serif", fontWeight: 900 }}
              >
                CONECTA.
              </span>
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
