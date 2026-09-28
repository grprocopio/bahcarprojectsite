import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const NeonScrollPath: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carGroupRef = useRef<SVGGElement>(null);

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 1200,
    height: 3000,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const fullHeight = containerRef.current.scrollHeight || containerRef.current.offsetHeight;
        setDimensions({
          width: window.innerWidth,
          height: fullHeight || 3200,
        });
      }
    };

    updateSize();
    const timer = setTimeout(updateSize, 300);
    window.addEventListener('resize', updateSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const { width, height } = dimensions;
  const isMobile = width < 768;

  // Pontos de ancoragem que contornam as laterais sem bloquear visualizações
  const p0x = isMobile ? width * 0.88 : width * 0.88;
  const p1x = isMobile ? width * 0.12 : width * 0.08;
  const p2x = isMobile ? width * 0.88 : width * 0.92;
  const p3x = isMobile ? width * 0.12 : width * 0.07;
  const p4x = isMobile ? width * 0.82 : width * 0.82;

  // Segmentação vertical proporcional
  const y0 = 60;
  const y1 = height * 0.25;
  const y2 = height * 0.50;
  const y3 = height * 0.75;
  const y4 = height - 100;

  // Traçado sinuoso contínuo
  const pathD = `
    M ${p0x} ${y0}
    C ${p0x} ${y0 + (y1 - y0) * 0.45}, ${p1x} ${y1 - (y1 - y0) * 0.45}, ${p1x} ${y1}
    C ${p1x} ${y1 + (y2 - y1) * 0.45}, ${p2x} ${y2 - (y2 - y1) * 0.45}, ${p2x} ${y2}
    C ${p2x} ${y2 + (y3 - y2) * 0.45}, ${p3x} ${y3 - (y3 - y2) * 0.45}, ${p3x} ${y3}
    C ${p3x} ${y3 + (y4 - y3) * 0.45}, ${p4x} ${y4 - (y4 - y3) * 0.45}, ${p4x} ${y4}
  `;

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const car = carGroupRef.current;
    if (!container || !path || !car) return;

    let totalLength = 0;
    try {
      totalLength = path.getTotalLength();
    } catch {
      return;
    }

    if (!totalLength || isNaN(totalLength)) return;

    let rafId: number | null = null;
    let targetProgress = 0;

    const renderCar = () => {
      if (!path || !car) return;

      if (targetProgress > 0.005) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const distance = Math.max(0, Math.min(totalLength, targetProgress * totalLength));
      const pt = path.getPointAtLength(distance);

      const delta = 4;
      const nextDistance = Math.min(totalLength, distance + delta);
      const nextPt = path.getPointAtLength(nextDistance);
      const prevPt = distance > delta ? path.getPointAtLength(distance - delta) : pt;

      const angle = Math.atan2(nextPt.y - prevPt.y, nextPt.x - prevPt.x) * (180 / Math.PI);

      car.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
      rafId = null;
    };

    const updateCarPosition = (progress: number) => {
      targetProgress = progress;
      if (rafId === null) {
        rafId = requestAnimationFrame(renderCar);
      }
    };

    updateCarPosition(0);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      // Em mobile scrub: true evita atrito ou retardo no touch
      scrub: true,
      onUpdate: (self) => {
        updateCarPosition(self.progress);
      },
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      st.kill();
    };
  }, [pathD, height, width]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease-out',
      }}
    >
      <svg
        className="w-full h-full"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradiente de fade nas extremidades para integração com o preto do fundo */}
          <linearGradient id="neonSubtleTrack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8FF00" stopOpacity="0" />
            <stop offset="5%" stopColor="#B8FF00" stopOpacity="0.22" />
            <stop offset="90%" stopColor="#B8FF00" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#B8FF00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Traço suave sem SVG filter pesado para 60FPS estável no mobile */}
        <path
          d={pathD}
          stroke="#B8FF00"
          strokeWidth="3.5"
          strokeOpacity="0.08"
          strokeLinecap="round"
        />

        {/* 2. Traço da rota com exposição baixa e linhas pontilhadas elegantes */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="url(#neonSubtleTrack)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6 10"
        />

        {/* 3. Desenho Minimalista do Carro: Todo em Verde Neon (#B8FF00) com Baixa Exposição */}
        <g ref={carGroupRef} opacity="0.55" className="will-change-transform">
          {/* Silhueta Minimalista do Carro (Top-down Clean Outline) */}
          <path
            d="M 12 0 C 12 -4.5, 8 -7, 2 -7 L -8 -7 C -12 -7, -13.5 -4.5, -13.5 0 C -13.5 4.5, -12 7, -8 7 L 2 7 C 8 7, 12 4.5, 12 0 Z"
            fill="none"
            stroke="#B8FF00"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Cabine / Vidro Dianteiro e Traseiro simplificado */}
          <path
            d="M 4 -4.5 C 6 -2.5, 6 2.5, 4 4.5 L -4 4 C -6 2.5, -6 -2.5, -4 -4 Z"
            fill="none"
            stroke="#B8FF00"
            strokeWidth="0.8"
            strokeOpacity="0.8"
          />

          {/* Rodas minimalistas */}
          <line x1="-9" y1="-8.5" x2="-4" y2="-8.5" stroke="#B8FF00" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="4" y1="-8.5" x2="8" y2="-8.5" stroke="#B8FF00" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="-9" y1="8.5" x2="-4" y2="8.5" stroke="#B8FF00" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="4" y1="8.5" x2="8" y2="8.5" stroke="#B8FF00" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />

          {/* Pontos de iluminação do farol dianteiro */}
          <circle cx="11" cy="-2.5" r="0.75" fill="#B8FF00" />
          <circle cx="11" cy="2.5" r="0.75" fill="#B8FF00" />
        </g>
      </svg>
    </div>
  );
};

export default NeonScrollPath;
