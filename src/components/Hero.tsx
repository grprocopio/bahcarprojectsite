import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenPartner?: () => void;
  onOpenLaunch?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [hasVideoError, setHasVideoError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Pré-carregamento inteligente do vídeo usando 'canplaythrough'
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    let isDisposed = false;

    const handleReady = () => {
      if (isDisposed) return;
      setIsVideoReady(true);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const unlock = () => {
            video.play().catch(() => {});
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('scroll', unlock);
            window.removeEventListener('click', unlock);
          };
          window.addEventListener('touchstart', unlock, { passive: true, once: true });
          window.addEventListener('scroll', unlock, { passive: true, once: true });
          window.addEventListener('click', unlock, { passive: true, once: true });
        });
      }
    };

    if (video.readyState >= 4) {
      handleReady();
    } else {
      video.addEventListener('canplaythrough', handleReady, { once: true });
      video.addEventListener('playing', handleReady, { once: true });

      const fallbackTimer = setTimeout(() => {
        if (!isDisposed && !isVideoReady) {
          handleReady();
        }
      }, 2200);

      return () => {
        isDisposed = true;
        clearTimeout(fallbackTimer);
        video.removeEventListener('canplaythrough', handleReady);
        video.removeEventListener('playing', handleReady);
      };
    }

    return () => {
      isDisposed = true;
    };
  }, []);

  // 2. Animação de Scroll Cinematográfico
  useEffect(() => {
    if (!isVideoReady) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const text = textRef.current;
    const overlay = overlayRef.current;
    if (!section || !text) return;

    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? 800 : 1300;

    const ctx = gsap.context(() => {
      // Entrada dos textos
      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          delay: 0.15,
          ease: 'power3.out',
        }
      );

      // ScrollTrigger timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Zoom orgânico de scale 1 para 1.04
      if (video) {
        scrollTl.fromTo(
          video,
          { scale: 1 },
          {
            scale: 1.04,
            ease: 'power1.inOut',
            duration: 1,
          },
          0
        );
      }

      // Frase permanece visível até cerca de 38% do scroll antes de suavizar
      scrollTl.to(
        text,
        {
          opacity: 0,
          y: -40,
          ease: 'power1.out',
          duration: 0.38,
        },
        0.38
      );

      // Transição imperceptível escurecendo para o fundo da próxima seção
      if (overlay) {
        scrollTl.fromTo(
          overlay,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'sine.inOut',
            duration: 0.45,
          },
          0.55
        );
      }

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [isVideoReady]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await fetch('/api/upload-hero-video', {
        method: 'POST',
        body: file,
      });
      if (res.ok) {
        setHasVideoError(false);
        setIsUploading(false);
        setIsVideoReady(false);
        if (videoRef.current) {
          videoRef.current.load();
        }
      } else {
        setIsUploading(false);
      }
    } catch {
      setIsUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className="relative w-full h-[100vh] min-h-[660px] flex flex-col justify-between select-none bg-[#050608] overflow-hidden z-10"
    >
      {/* VÍDEO FULLSCREEN EM ALTA RESOLUÇÃO */}
      <div className="absolute inset-0 w-full h-full bg-[#050608] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setHasVideoError(true)}
          poster="/images/hero_poster.jpg"
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transform-gpu will-change-transform transition-opacity duration-700 ease-out ${
            isVideoReady ? 'opacity-100' : 'opacity-80'
          }`}
          style={{
            imageRendering: '-webkit-optimize-contrast',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/hero.mp4" type="video/mp4" />
          <source src="/videos/carro.mp4" type="video/mp4" />
          <source src="/carro.mp4" type="video/mp4" />
        </video>

        {/* Overlay Dinâmico de Fusão no Scroll */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#050608] pointer-events-none opacity-0 z-10"
          aria-hidden="true"
        />

        {/* Degradês de iluminação e legibilidade */}
        <div
          className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#050608]/90 via-[#050608]/40 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#050608] via-[#050608]/85 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Barreira sólida absoluta na base para impedir qualquer vazamento de subpixel do vídeo */}
        <div
          className="absolute -bottom-2 inset-x-0 h-8 bg-[#050608] pointer-events-none z-20"
          aria-hidden="true"
        />
      </div>

      {/* Selo sólido inferior da seção Hero */}
      <div
        className="absolute -bottom-2 inset-x-0 h-8 bg-[#050608] pointer-events-none z-30"
        aria-hidden="true"
      />

      {/* TIPOGRAFIA E AÇÕES DA HERO */}
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

      {/* Helper de Drag & Drop para o Vídeo */}
      {(hasVideoError || isDragging || isUploading) && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragging
              ? 'bg-black/80 backdrop-blur-md border-2 border-dashed border-[#B8FF00]'
              : 'bg-black/50 hover:bg-black/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
          <div className="flex flex-col items-center space-y-3 px-6 py-4 rounded-2xl bg-black/80 border border-white/10 shadow-2xl text-center">
            <Upload className="w-8 h-8 text-[#B8FF00] animate-bounce" />
            <p className="text-sm font-semibold text-white">
              {isUploading
                ? 'Aplicando vídeo na Hero...'
                : 'Solte ou selecione o arquivo de vídeo do carro aqui'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
