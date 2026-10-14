import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SANTA_MARIA_METADATA,
  SANTA_MARIA_MAJOR_STREETS_PATH,
  SANTA_MARIA_MINOR_STREETS_PATH,
  geoToSvg,
  svgToGeo,
} from '../data/santaMariaMapData';
import { SANTA_MARIA_ROUTE } from '../data/santaMariaRoute';

gsap.registerPlugin(ScrollTrigger);

// Exportando utilitários e dados de rota para uso futuro se necessário
export { SANTA_MARIA_METADATA, SANTA_MARIA_ROUTE, geoToSvg, svgToGeo };

interface HeroMapProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const HeroMap: React.FC<HeroMapProps> = ({ containerRef }) => {
  const { viewBox } = SANTA_MARIA_METADATA;
  const { driverPoint, passengerPoint, pathD, totalLength } = SANTA_MARIA_ROUTE;

  const routePathRef = useRef<SVGPathElement>(null);
  const carGroupRef = useRef<SVGGElement>(null);
  const driverLabelRef = useRef<SVGGElement>(null);
  const pulseRingRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const routePath = routePathRef.current;
    const carGroup = carGroupRef.current;
    const driverLabel = driverLabelRef.current;
    const pulseRing = pulseRingRef.current;
    const container = containerRef?.current;

    if (!routePath || !carGroup || !driverLabel || !pulseRing) return;

    // Mede com precisão o comprimento geométrico da rota
    const pathLen = routePath.getTotalLength() || totalLength;

    // Configuração inicial do traço da rota (oculto no início)
    routePath.style.strokeDasharray = `${pathLen}`;
    routePath.style.strokeDashoffset = `${pathLen}`;

    // Posiciona o carro no ponto de partida
    const startAhead = routePath.getPointAtLength(Math.min(pathLen, 1.5));
    const startBehind = routePath.getPointAtLength(0);
    const initialAngle = (Math.atan2(startAhead.y - startBehind.y, startAhead.x - startBehind.x) * 180) / Math.PI;
    carGroup.setAttribute('transform', `translate(${driverPoint.x}, ${driverPoint.y}) rotate(${initialAngle.toFixed(2)})`);
    carGroup.style.opacity = '0';

    // Estado inicial do pulso
    pulseRing.style.opacity = '0';

    // 1. Verificação de Acessibilidade (prefers-reduced-motion) ou Altura insuficiente (< 480px)
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const insufficientHeight = typeof window !== 'undefined' && window.innerHeight < 480;

    if (reduceMotion || insufficientHeight) {
      // Exibe a conexão completa de forma estática sem fixar o scroll
      routePath.style.strokeDashoffset = '0';
      const endAhead = routePath.getPointAtLength(pathLen);
      const endBehind = routePath.getPointAtLength(Math.max(0, pathLen - 1.5));
      const endAngle = (Math.atan2(endAhead.y - endBehind.y, endAhead.x - endBehind.x) * 180) / Math.PI;
      carGroup.setAttribute('transform', `translate(${passengerPoint.x}, ${passengerPoint.y}) rotate(${endAngle.toFixed(2)})`);
      carGroup.style.opacity = '1';
      driverLabel.style.opacity = '1';
      pulseRing.style.opacity = '0';
      return;
    }

    if (!container) return;

    // 2. Função de renderização de cada frame da animação conforme o scroll
    const renderFrame = (progress: number) => {
      // Passo 1: Na primeira metade do progresso (0 a 0.50), desenha a rota verde
      const routeProgress = Math.min(1, Math.max(0, progress / 0.50));
      routePath.style.strokeDashoffset = `${pathLen * (1 - routeProgress)}`;

      // Rótulo MOTORISTA: visível no ponto inicial e desaparece suavemente quando o carro parte (0.50 a 0.62)
      if (progress < 0.50) {
        driverLabel.style.opacity = '1';
      } else {
        const fadeProgress = Math.min(1, (progress - 0.50) / 0.12);
        driverLabel.style.opacity = `${(1 - fadeProgress).toFixed(3)}`;
      }

      // Passo 2: Na segunda metade do progresso (0.50 a 0.94), o carro percorre a rota
      if (progress < 0.48) {
        carGroup.style.opacity = '0';
        carGroup.setAttribute('transform', `translate(${driverPoint.x}, ${driverPoint.y}) rotate(${initialAngle.toFixed(2)})`);
      } else {
        // Carro surge suavemente entre 0.48 e 0.52
        const carOpacity = progress < 0.52 ? (progress - 0.48) / 0.04 : 1;
        carGroup.style.opacity = carOpacity.toFixed(3);

        const carProgress = Math.max(0, Math.min(1, (progress - 0.50) / 0.44));
        const currentDistance = carProgress * pathLen;

        const currentPt = routePath.getPointAtLength(currentDistance);
        const ptAhead = routePath.getPointAtLength(Math.min(pathLen, currentDistance + 1.8));
        const ptBehind = routePath.getPointAtLength(Math.max(0, currentDistance - 1.8));

        // Ângulo tangencial contínuo sem saltos bruscos nem giros de 360°
        const angleRad = Math.atan2(ptAhead.y - ptBehind.y, ptAhead.x - ptBehind.x);
        const angleDeg = (angleRad * 180) / Math.PI;

        carGroup.setAttribute(
          'transform',
          `translate(${currentPt.x.toFixed(2)}, ${currentPt.y.toFixed(2)}) rotate(${angleDeg.toFixed(2)})`
        );
      }

      // Passo 3: Ao chegar (0.94 a 1.0), pulso discreto único no marcador do passageiro
      if (progress >= 0.94) {
        const pulseProgress = Math.min(1, (progress - 0.94) / 0.06);
        const radius = 6.5 + pulseProgress * 15;
        const opacity = (1 - pulseProgress) * 0.85;
        pulseRing.setAttribute('r', radius.toFixed(1));
        pulseRing.style.opacity = opacity.toFixed(3);
      } else {
        pulseRing.style.opacity = '0';
      }
    };

    // 3. ScrollTrigger: fixação curta de 60% da viewport no desktop e 40% no celular
    const isMobile = window.innerWidth < 768;
    const pinDistance = Math.round(window.innerHeight * (isMobile ? 0.40 : 0.60));

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${pinDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.15,
        anticipatePin: 1,
        onUpdate: (self) => {
          renderFrame(self.progress);
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [containerRef, totalLength, driverPoint, passengerPoint]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#050608]"
      aria-label="Mapa das ruas centrais de Santa Maria, RS com conexão entre motorista e passageiro"
    >
      {/* 
        Container do SVG Geográfico:
        - Alinhado com as proporções exatas de Santa Maria
        - Ambas as pontas da rota visíveis tanto no desktop quanto no celular
      */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center transform-gpu">
        <svg
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover transform-gpu md:translate-x-[9%] lg:translate-x-[12%] scale-[1.06] sm:scale-100 translate-y-[10%] sm:translate-y-0"
          style={{ willChange: 'transform' }}
        >
          <defs>
            {/* Brilho discreto e suave na rota verde BahCar (sem neon excessivo) */}
            <filter id="route-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor="#B8FF00" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* 1. Malha Viária Secundária / Residencial (Cinza escuro discreto) */}
          <path
            d={SANTA_MARIA_MINOR_STREETS_PATH}
            fill="none"
            stroke="#1c252a"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            vectorEffect="non-scaling-stroke"
          />

          {/* 2. Avenidas e Vias Arteriais Principais de Santa Maria */}
          <path
            d={SANTA_MARIA_MAJOR_STREETS_PATH}
            fill="none"
            stroke="#3a4b53"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
            vectorEffect="non-scaling-stroke"
          />

          {/* 3. Guia da Rota de Fundo (traçado bem sutil demarcando a conexão nas ruas) */}
          <path
            d={pathD}
            fill="none"
            stroke="#152119"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />

          {/* 4. Linha Ativa da Rota Verde #B8FF00 (animada pelo scroll do motorista ao passageiro) */}
          <path
            ref={routePathRef}
            d={pathD}
            fill="none"
            stroke="#B8FF00"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#route-subtle-glow)"
          />

          {/* 5. Pulso Único e Discreto no Marcador do Passageiro ao Chegar */}
          <circle
            ref={pulseRingRef}
            cx={passengerPoint.x}
            cy={passengerPoint.y}
            r="6.5"
            fill="none"
            stroke="#B8FF00"
            strokeWidth="1.2"
            style={{ opacity: 0 }}
          />

          {/* 6. Marcador do PASSAGEIRO (Ponto Final: Rua General Neto) */}
          <g transform={`translate(${passengerPoint.x}, ${passengerPoint.y})`}>
            {/* Halo sutil */}
            <circle cx="0" cy="0" r="7.5" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
            {/* Ponto central */}
            <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />

            {/* Rótulo PASSAGEIRO com fundo escuro discreto */}
            <g transform="translate(0, -18)">
              <rect
                x="-39"
                y="-9"
                width="78"
                height="16"
                rx="4"
                fill="#050608"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="0.8"
                fillOpacity="0.94"
              />
              <text
                x="0"
                y="2.5"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="8.5"
                fontWeight="800"
                letterSpacing="0.08em"
                fontFamily="Inter, sans-serif"
              >
                PASSAGEIRO
              </text>
            </g>
          </g>

          {/* 7. Marcador do MOTORISTA (Ponto Inicial: Av. Fernando Ferrari) */}
          <g transform={`translate(${driverPoint.x}, ${driverPoint.y})`}>
            {/* Halo sutil verde */}
            <circle cx="0" cy="0" r="7.5" fill="none" stroke="#B8FF00" strokeWidth="1" strokeOpacity="0.45" />
            {/* Ponto central */}
            <circle cx="0" cy="0" r="3.5" fill="#B8FF00" />

            {/* Rótulo MOTORISTA com fade suave ao partir */}
            <g ref={driverLabelRef} transform="translate(0, -18)" style={{ willChange: 'opacity' }}>
              <rect
                x="-37"
                y="-9"
                width="74"
                height="16"
                rx="4"
                fill="#050608"
                stroke="rgba(184, 255, 0, 0.35)"
                strokeWidth="0.8"
                fillOpacity="0.94"
              />
              <text
                x="0"
                y="2.5"
                textAnchor="middle"
                fill="#B8FF00"
                fontSize="8.5"
                fontWeight="800"
                letterSpacing="0.08em"
                fontFamily="Inter, sans-serif"
              >
                MOTORISTA
              </text>
            </g>
          </g>

          {/* 8. Ícone Vetorial de Carro Visto de Cima (percorre a rota no scroll) */}
          <g
            ref={carGroupRef}
            id="vector-car"
            style={{ willChange: 'transform, opacity', opacity: 0 }}
          >
            {/* Sombra sutil sob o veículo */}
            <rect x="-8.5" y="-4.5" width="17" height="9" rx="2.5" fill="rgba(0,0,0,0.8)" />
            {/* Chassi elegante escuro com borda verde BahCar */}
            <rect x="-8" y="-4.5" width="16" height="9" rx="2.2" fill="#121a15" stroke="#B8FF00" strokeWidth="0.85" />
            {/* Teto */}
            <rect x="-3" y="-3" width="7" height="6" rx="1.2" fill="#090e0b" />
            {/* Para-brisa dianteiro */}
            <path d="M-2.5 -3.2 L4.5 -2.4 L4.5 2.4 L-2.5 3.2 Z" fill="#050608" opacity="0.85" />
            {/* Vidro traseiro */}
            <rect x="-5.2" y="-2.5" width="1.8" height="5" rx="0.5" fill="#050608" />
            {/* Faróis dianteiros (fachos luminosos verde BahCar apontando para a frente) */}
            <circle cx="7" cy="-2.8" r="0.9" fill="#B8FF00" />
            <circle cx="7" cy="2.8" r="0.9" fill="#B8FF00" />
            {/* Lanternas traseiras */}
            <circle cx="-7.2" cy="-2.8" r="0.75" fill="#e11d48" opacity="0.85" />
            <circle cx="-7.2" cy="2.8" r="0.75" fill="#e11d48" opacity="0.85" />
          </g>
        </svg>
      </div>

      {/* Degradê Escuro à Esquerda (Desktop) para preservar leitura dos textos */}
      <div
        className="hidden md:block absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-[54%] bg-gradient-to-r from-[#050608] via-[#050608]/92 via-40% to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Degradê Superior (Mobile) para garantir que a navbar fique limpa e legível */}
      <div
        className="md:hidden absolute inset-0 bg-gradient-to-b from-[#050608] via-[#050608]/75 via-42% to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <div
        className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050608] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050608] via-[#050608]/80 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Crédito Obrigatório e Legível do OpenStreetMap */}
      <div className="absolute bottom-3 right-4 z-20 pointer-events-auto">
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#050608]/90 border border-white/20 text-neutral-300 hover:text-white transition-colors text-[10px] sm:text-xs font-mono shadow-lg"
          title="Dados cartográficos de Santa Maria fornecidos por OpenStreetMap"
        >
          <span>© OpenStreetMap contributors</span>
        </a>
      </div>
    </div>
  );
};

export default HeroMap;
