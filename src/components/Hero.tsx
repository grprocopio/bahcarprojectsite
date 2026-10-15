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
      className="relative w-full min-h-[100svh] lg:min-h-screen flex flex-col justify-start lg:justify-center bg-[#050608] z-10 touch-pan-y"
      style={{ touchAction: 'pan-y' }}
    >
      {/* IMAGEM CARROMATE DE FUNDO:
          - No desktop (lg): exatamente como estava no computador (object-cover tela cheia).
          - No celular e tablet: imagem 100% visível sem cortes (object-contain na base integrada ao fundo preto), 
            exibindo a cuia com mate, celular com rota e o carro neon completo. */}
      <div className="absolute inset-0 w-full h-full bg-[#050608] overflow-hidden pointer-events-none">
        <img
          ref={imageRef}
          src="/carromate.jpg"
          alt="BahCar Mobilidade"
          className="w-full h-full object-contain object-bottom sm:object-contain sm:object-bottom lg:object-cover lg:object-center select-none"
          style={{
            imageRendering: '-webkit-optimize-contrast',
          }}
          loading="eager"
        />

        {/* Degradê superior suave para legibilidade da navbar */}
        <div
          className="absolute top-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-b from-[#050608] via-[#050608]/50 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Degradê inferior suave para transição com a próxima seção */}
        <div
          className="absolute bottom-0 inset-x-0 h-16 sm:h-24 lg:h-48 bg-gradient-to-t from-[#050608] via-[#050608]/50 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* TIPOGRAFIA OFICIAL DA HERO:
          Exatamente a mesma estrutura do desktop, sobreposta organicamente à composição */}
      <div
        ref={textRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-12 pt-[9.5rem] sm:pt-28 md:pt-32 lg:pt-0 lg:-mt-12 xl:-mt-16 pointer-events-none"
      >
        <div className="max-w-4xl text-left pointer-events-auto lg:-translate-x-6 xl:-translate-x-10">
          {/* Headline Principal com Destaque e Fonte Contornada */}
          <h1
            className="text-[clamp(2.85rem,9.6vw,3.75rem)] sm:text-6xl md:text-7xl lg:text-8xl italic font-black uppercase tracking-tight leading-[0.93] sm:leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
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
