import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PitStopBah: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const electricNoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. O título “PIT STOP Bah” entra com fade + leve translateY
      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      })
      // 2. A frase curta aparece logo depois
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.45'
      )
      // 3. A imagem revela com fade + leve scale-in
      .from(
        visualWrapperRef.current,
        {
          opacity: 0,
          scale: 0.98,
          y: 25,
          duration: 1.0,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      // 5. Os destaques “PAUSA · CAFÉ · CUIDADO · ATENDIMENTO” aparecem em sequência discreta
      .from(
        highlightsRef.current ? highlightsRef.current.children : [],
        {
          opacity: 0,
          y: 12,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      // 6. A frase “Em breve: estrutura para veículos elétricos.” aparece por último
      .from(
        electricNoteRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      );

      // 4. Parallax vertical muito sutil durante o scroll
      if (imageRef.current && visualWrapperRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: visualWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: 30,
          ease: 'none',
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pit-stop"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 lg:py-40 bg-[#050505] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Glow ambiente sutil e profundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-[#B8FF00]/[0.035] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white uppercase leading-[1.05]"
          >
            PIT STOP <span className="text-[#B8FF00]">Bah</span>
          </h2>

          <p
            ref={subtitleRef}
            className="mt-3 sm:mt-4 text-base sm:text-xl text-neutral-300 font-light tracking-wide"
          >
            Presença real na rotina de quem dirige.
          </p>
        </div>

        {/* Imagem Real do Local (Protagonista da Seção) */}
        <div
          ref={visualWrapperRef}
          className="relative w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#080B0E] shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
        >
          {/* Container com proporção natural e altura controlada */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[640px] overflow-hidden">
            <img
              ref={imageRef}
              src="/images/pitsop.png"
              alt="Local oficial PIT STOP Bah com ponto de recarga elétrica"
              className="w-full h-full object-cover object-center scale-[1.03] transition-all duration-700 contrast-[1.04] brightness-[1.01]"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                filter: 'contrast(1.04) brightness(1.01)',
              }}
              loading="lazy"
            />

            {/* Máscara e gradientes suaves para acabamento e integração com o fundo preto */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl sm:rounded-3xl" />
          </div>
        </div>

        {/* Destaques Editoriais Discretos */}
        <div
          ref={highlightsRef}
          className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300"
        >
          <span className="hover:text-white transition-colors">PAUSA</span>
          <span className="text-[#B8FF00] select-none font-bold">·</span>
          <span className="hover:text-white transition-colors">CAFÉ</span>
          <span className="text-[#B8FF00] select-none font-bold">·</span>
          <span className="hover:text-white transition-colors">CUIDADO</span>
          <span className="text-[#B8FF00] select-none font-bold">·</span>
          <span className="hover:text-white transition-colors">ATENDIMENTO</span>
        </div>

        {/* Observação Discreta sobre Mobilidade Elétrica */}
        <div
          ref={electricNoteRef}
          className="mt-4 sm:mt-5 text-center text-xs sm:text-sm font-mono text-neutral-500 tracking-wider flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00]/70 inline-block" />
          <span>Em breve: estrutura para veículos elétricos.</span>
        </div>

      </div>
    </section>
  );
};

export default PitStopBah;
