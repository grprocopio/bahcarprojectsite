import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  { label: 'Pausa', desc: 'Descanso entre viagens' },
  { label: 'Café', desc: 'Pausa na jornada' },
  { label: 'Cuidado', desc: 'Praticidade com o carro' },
  { label: 'Atendimento', desc: 'Equipe próxima e real' },
];

export const PitStopBah: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const visualBoxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const accentsRef = useRef<HTMLDivElement>(null);
  const footerNoteRef = useRef<HTMLDivElement>(null);

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

      // 1. Título principal entra com presença
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
      })
      // 2. Frase de apoio entra suavemente
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      // 3. Grande composição visual revela com fade
      .from(
        visualBoxRef.current,
        {
          opacity: 0,
          scale: 0.97,
          duration: 1.1,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      // 4. Pequenos acentos editoriais entram com atraso suave
      .from(
        accentsRef.current ? accentsRef.current.children : [],
        {
          opacity: 0,
          y: 15,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      // 5. Nota discreta
      .from(
        footerNoteRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Parallax sutil na imagem do hub
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: visualBoxRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: 25,
        ease: 'none',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pit-stop"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-[#050505] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Glow ambiente verde profundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#B8FF00]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Cabeçalho Editorial com Presença de Marca */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B8FF00] inline-block mb-3">
            CONCEITO BAHCAR • APOIO AO MOTORISTA
          </span>

          <h2
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white uppercase leading-[1.05]"
          >
            PIT STOP <span className="text-[#B8FF00]">Bah</span>
          </h2>

          <p
            ref={subtitleRef}
            className="mt-4 sm:mt-5 text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed text-balance"
          >
            Presença real na rotina de quem move a cidade.
          </p>
        </div>

        {/* Grande Composição Visual de Campanha (Sem blueprint, sem cards feios) */}
        <div
          ref={visualBoxRef}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#090D10] shadow-[0_30px_90px_rgba(0,0,0,0.85)] group"
        >
          {/* Imagem Fotográfica de Campanha do Hub */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[560px] overflow-hidden">
            <img
              ref={imageRef}
              src="/images/bahcar_pitstop_hub_1790556219826.jpg"
              alt="Espaço Físico PIT STOP Bah"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 group-hover:scale-110 brightness-90 contrast-105"
            />

            {/* Vinheta cinematográfica & overlays de profundidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

            {/* Linha de horizonte verde sutil */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8FF00]/50 to-transparent" />

            {/* Tag flutuante de localização institucional */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
              <span className="text-white font-medium">SANTA MARIA — RS</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">PONTO FÍSICO</span>
            </div>

            {/* Manifesto curto integrado à imagem */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-lg z-10">
              <p className="text-white text-base sm:text-xl font-heading font-medium tracking-wide leading-snug drop-shadow-md">
                Mais do que um aplicativo. Um espaço feito para acolher quem vive ao volante.
              </p>
            </div>
          </div>

          {/* Destaques Discretos / Acentos Editoriais ao Redor (Sem parecer lista pesada de cards) */}
          <div
            ref={accentsRef}
            className="p-6 sm:p-8 bg-[#07090C]/90 backdrop-blur-md border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center"
          >
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00]/80 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-white">
                    {h.label}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Observação Discreta Final sobre Carregamento Elétrico */}
        <div
          ref={footerNoteRef}
          className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-neutral-500 text-center"
        >
          <Zap className="w-3.5 h-3.5 text-[#B8FF00]/70 flex-shrink-0" />
          <span>
            Projeto futuro: estrutura para carregamento de veículos elétricos.
          </span>
        </div>

      </div>
    </section>
  );
};

export default PitStopBah;
